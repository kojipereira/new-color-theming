import React, { useState, useCallback, useEffect } from "react";
import { AlertTriangle, Anchor } from "lucide-react";
import { generateColorSlots } from "@/lib/colors";
import { meetsAccessibilityStandards } from "@/lib/utils";
import { ColorSelector } from "./ColorSelector";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState("#ffffff");  // Starting with white as default color
  const [highlightColor, setHighlightColor] = useState("#7E69AB"); // Default highlight color
  const [colorSlots, setColorSlots] = useState<string[]>([]);
  const [highlightColorSlots, setHighlightColorSlots] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHighlightOpen, setIsHighlightOpen] = useState(false);
  const [hasContrastIssue, setHasContrastIssue] = useState(false);
  const [hasHighlightContrastIssue, setHasHighlightContrastIssue] = useState(false);
  const [baseSlotIndex, setBaseSlotIndex] = useState<number>(-1);
  const [highlightBaseSlotIndex, setHighlightBaseSlotIndex] = useState<number>(-1);
  const [colorMatch, setColorMatch] = useState(false);
  const [closestColorIndex, setClosestColorIndex] = useState<number>(-1);
  const { toast } = useToast();

  const checkColorThemeContrast = useCallback((slots: string[]) => {
    if (!slots.length) return false;
    // Check contrast between black text (#000000) and table color (Slot 3, index 2)
    return !meetsAccessibilityStandards("#000000", slots[2]);
  }, []);

  const checkHighlightContrast = useCallback((slots: string[], index: number = 5) => {
    if (!slots.length) return false;
    // Check contrast between white text (#FFFFFF) and highlight color (Slot 6, index 5 by default)
    // When color match is on, use the selected color directly (baseIndex)
    const colorToCheck = colorMatch && index !== 5 ? slots[index] : slots[5];
    return !meetsAccessibilityStandards("#FFFFFF", colorToCheck);
  }, [colorMatch]);

  // Find the closest color in the palette to the target color
  const findClosestColorIndex = useCallback((palette: string[], targetColor: string): number => {
    const targetRgb = hexToRgb(targetColor);
    if (!targetRgb || !palette.length) return -1;
    
    let closestIndex = 0;
    let smallestDistance = Number.MAX_VALUE;
    
    palette.forEach((color, index) => {
      const paletteRgb = hexToRgb(color);
      if (!paletteRgb) return;
      
      // Calculate color distance using Euclidean distance in RGB space
      const distance = Math.sqrt(
        Math.pow(targetRgb.r - paletteRgb.r, 2) +
        Math.pow(targetRgb.g - paletteRgb.g, 2) +
        Math.pow(targetRgb.b - paletteRgb.b, 2)
      );
      
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    });
    
    return closestIndex;
  }, []);
  
  // Hex to RGB helper function
  const hexToRgb = (hex: string) => {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Parse hex values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    
    return { r, g, b };
  };

  // Generate initial color slots on mount
  useEffect(() => {
    const initialSlots = generateColorSlots(color);
    setColorSlots(initialSlots);
    setHasContrastIssue(checkColorThemeContrast(initialSlots));
    
    // Find the base slot (where the selected color appears)
    const baseIndex = initialSlots.findIndex(slot => slot.toLowerCase() === color.toLowerCase());
    setBaseSlotIndex(baseIndex);

    // Generate highlight color slots
    const initialHighlightSlots = generateColorSlots(highlightColor);
    setHighlightColorSlots(initialHighlightSlots);
    
    // Find the base slot for highlight color
    const highlightBaseIndex = initialHighlightSlots.findIndex(slot => slot.toLowerCase() === highlightColor.toLowerCase());
    setHighlightBaseSlotIndex(highlightBaseIndex);
    
    // Check highlight contrast
    setHasHighlightContrastIssue(checkHighlightContrast(initialHighlightSlots, highlightBaseIndex));
  }, [checkColorThemeContrast, checkHighlightContrast]);

  // Check contrast when slots change
  useEffect(() => {
    setHasContrastIssue(checkColorThemeContrast(colorSlots));
  }, [colorSlots, checkColorThemeContrast]);

  // Check highlight contrast when slots or color match changes
  useEffect(() => {
    setHasHighlightContrastIssue(checkHighlightContrast(
      highlightColorSlots, 
      colorMatch ? highlightBaseSlotIndex : 5
    ));
  }, [highlightColorSlots, checkHighlightContrast, colorMatch, highlightBaseSlotIndex]);

  const handleColorChange = useCallback((newColor: string) => {
    setColor(newColor);
    const slots = generateColorSlots(newColor);
    setColorSlots(slots);
    
    // Find the base slot for the new color
    const baseIndex = slots.findIndex(slot => slot.toLowerCase() === newColor.toLowerCase());
    setBaseSlotIndex(baseIndex);

    // Apply the colors to the system using the brighter slots
    document.documentElement.style.setProperty('--background-color', slots[1]); // Use slot 1 (almost white) for background
    document.documentElement.style.setProperty('--card-color', slots[0]); // Use slot 0 (brightest) for cards
    document.documentElement.style.setProperty('--table-color', slots[2]); // Use slot 2 for tables
    document.documentElement.style.setProperty('--outline-color', slots[4]); // Use slot 4 for outlines

    // Check contrast after changing color
    setHasContrastIssue(checkColorThemeContrast(slots));
  }, [checkColorThemeContrast]);

  const handleHighlightColorChange = useCallback((newColor: string) => {
    setHighlightColor(newColor);
    
    // Find closest color in the current palette if color match is enabled
    if (colorMatch && highlightColorSlots.length > 0) {
      const closestIndex = findClosestColorIndex(highlightColorSlots, newColor);
      setClosestColorIndex(closestIndex);
      
      // Create a new palette by modifying the closest color
      const newPalette = [...highlightColorSlots];
      newPalette[closestIndex] = newColor;
      setHighlightColorSlots(newPalette);
      
      // Show toast notification
      toast({
        title: "Color Match",
        description: `Replaced color at position ${closestIndex + 1} with your selection`,
      });
      
      // Apply the highlight colors to the system
      document.documentElement.style.setProperty('--highlight-color', newColor);
      document.documentElement.style.setProperty('--highlight-hover-color', newPalette[closestIndex + 1] || newPalette[newPalette.length - 1]);
      document.documentElement.style.setProperty('--highlight-darker', newPalette[7] || newPalette[closestIndex + 2] || newPalette[newPalette.length - 1]);
      document.documentElement.style.setProperty('--highlight-foreground-color', '#FFFFFF');
      
      // Check contrast with the new color
      setHasHighlightContrastIssue(checkHighlightContrast(newPalette, closestIndex));
    } else {
      // Standard behavior when color match is disabled
      const slots = generateColorSlots(newColor);
      setHighlightColorSlots(slots);
      
      // Find the base slot for the new highlight color
      const baseIndex = slots.findIndex(slot => slot.toLowerCase() === newColor.toLowerCase());
      setHighlightBaseSlotIndex(baseIndex);
      setClosestColorIndex(-1); // Reset closest color index

      // Apply the highlight colors to the system
      if (colorMatch) {
        // Use exact color when color match is enabled
        document.documentElement.style.setProperty('--highlight-color', newColor);
        document.documentElement.style.setProperty('--highlight-hover-color', slots[baseIndex + 1] || slots[slots.length - 1]); // Use next slot or last slot for hover
        document.documentElement.style.setProperty('--highlight-darker', slots[7] || slots[baseIndex + 2] || slots[slots.length - 1]); // Slot 7 for darker hover effects
      } else {
        // Use optimized slots for better contrast
        document.documentElement.style.setProperty('--highlight-color', slots[5]); // Medium-bright color for highlights
        document.documentElement.style.setProperty('--highlight-hover-color', slots[6]); // Slightly darker for hover states
        document.documentElement.style.setProperty('--highlight-darker', slots[7]); // Even darker for stronger hover effects
      }
      document.documentElement.style.setProperty('--highlight-foreground-color', '#FFFFFF'); // White text on highlight color

      // Check contrast after changing color
      setHasHighlightContrastIssue(checkHighlightContrast(slots, colorMatch ? baseIndex : 5));
    }
  }, [colorMatch, checkHighlightContrast, highlightColorSlots, findClosestColorIndex, toast]);

  // Update highlight colors when color match toggle changes
  useEffect(() => {
    if (highlightColorSlots.length > 0) {
      if (colorMatch) {
        // Find the closest color to the current highlight color
        const closestIndex = findClosestColorIndex(highlightColorSlots, highlightColor);
        setClosestColorIndex(closestIndex);
        
        // Create a new palette with the highlight color replacing the closest color
        const newPalette = [...highlightColorSlots];
        newPalette[closestIndex] = highlightColor;
        setHighlightColorSlots(newPalette);
        
        // Use exact color when color match is enabled
        document.documentElement.style.setProperty('--highlight-color', highlightColor);
        
        // Find the next darker slot or use the last one
        const nextSlotIndex = closestIndex + 1;
        const hoverColor = nextSlotIndex < newPalette.length 
          ? newPalette[nextSlotIndex] 
          : newPalette[newPalette.length - 1];
          
        document.documentElement.style.setProperty('--highlight-hover-color', hoverColor);
        
        // Use slot 7 or next available darker slot for even darker hover effects
        const darkerSlotIndex = 7;
        document.documentElement.style.setProperty(
          '--highlight-darker', 
          newPalette[darkerSlotIndex] || 
            newPalette[closestIndex + 2] || 
            newPalette[newPalette.length - 1]
        );
        
        // Show toast notification
        toast({
          title: "Color Match Enabled",
          description: `Replaced color at position ${closestIndex + 1} with your highlight color`,
        });
      } else {
        // Reset closest color index when turning off color match
        setClosestColorIndex(-1);
        
        // Regenerate the original color slots
        const slots = generateColorSlots(highlightColor);
        setHighlightColorSlots(slots);
        
        // Find the base slot for the highlight color
        const baseIndex = slots.findIndex(slot => slot.toLowerCase() === highlightColor.toLowerCase());
        setHighlightBaseSlotIndex(baseIndex);
        
        // Use optimized slots for better contrast
        document.documentElement.style.setProperty('--highlight-color', slots[5]);
        document.documentElement.style.setProperty('--highlight-hover-color', slots[6]);
        document.documentElement.style.setProperty('--highlight-darker', slots[7]);
      }
      
      // Check contrast when toggling color match
      setHasHighlightContrastIssue(checkHighlightContrast(
        highlightColorSlots, 
        colorMatch ? (closestColorIndex !== -1 ? closestColorIndex : highlightBaseSlotIndex) : 5
      ));
    }
  }, [colorMatch, highlightColor, highlightColorSlots, highlightBaseSlotIndex, checkHighlightContrast, findClosestColorIndex, closestColorIndex, toast]);

  return <div className="rounded-md bg-white w-full overflow-hidden py-4 mb-2 px-[8px]">
      <div className="flex min-h-6 w-full items-center gap-2 px-2">
        <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
          Color Theme
        </div>
        
        <div className="flex items-center gap-2">
          {hasContrastIssue && <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Poor contrast ratio with black text on table color (Slot 3)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>}
          
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <div className="w-5 h-5 rounded-full border border-gray-300" style={{
                background: color
              }} />
                <span className="sr-only">Open color picker</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-0" align="end">
              <ColorSelector color={color} onChange={handleColorChange} onClose={() => setIsOpen(false)} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {colorSlots.length > 0 && <div className="mt-2 px-2">
          <div className="flex gap-1 overflow-x-auto py-1">
            {colorSlots.map((slotColor, index) => (
              <div 
                key={`color-slot-${index}`} 
                className={`w-5 h-5 rounded-full border border-gray-300 flex-shrink-0 relative ${index === 2 && hasContrastIssue ? 'ring-2 ring-amber-500' : ''}`} 
                style={{ backgroundColor: slotColor }} 
                title={`Slot ${index + 1}: ${slotColor}`}
              >
                {index === baseSlotIndex && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Anchor className="h-3 w-3 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Base color position</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            ))}
          </div>
        </div>}

      {/* Highlight Color Section */}
      <div className="flex min-h-6 w-full items-center gap-2 px-2 mt-4">
        <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
          Highlight Color
        </div>
        
        <div className="flex items-center gap-2">
          {hasHighlightContrastIssue && <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Poor contrast ratio with white text on highlight color</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>}
            
          <DropdownMenu open={isHighlightOpen} onOpenChange={setIsHighlightOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <div className="w-5 h-5 rounded-full border border-gray-300" style={{
                background: highlightColor
              }} />
                <span className="sr-only">Open highlight color picker</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-0" align="end">
              <ColorSelector color={highlightColor} onChange={handleHighlightColorChange} onClose={() => setIsHighlightOpen(false)} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {highlightColorSlots.length > 0 && <div className="mt-2 px-2">
          <div className="flex gap-1 overflow-x-auto py-1">
            {highlightColorSlots.map((slotColor, index) => (
              <div 
                key={`highlight-slot-${index}`} 
                className={`w-5 h-5 rounded-full border border-gray-300 flex-shrink-0 relative ${
                  (colorMatch && index === closestColorIndex && hasHighlightContrastIssue) || 
                  (!colorMatch && index === 5 && hasHighlightContrastIssue) 
                    ? 'ring-2 ring-amber-500' : ''
                } ${
                  index === 7 ? 'ring-1 ring-blue-500' : ''
                } ${
                  colorMatch && index === closestColorIndex ? 'ring-2 ring-highlight-hover' : ''
                }`} 
                style={{ backgroundColor: slotColor }} 
                title={`Slot ${index + 1}: ${slotColor}${index === 7 ? ' (Darker Hover Effect)' : ''}${colorMatch && index === closestColorIndex ? ' (Color Match)' : ''}`}
              >
                {(index === highlightBaseSlotIndex && !colorMatch) || (colorMatch && index === closestColorIndex) ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Anchor className="h-3 w-3 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{colorMatch && index === closestColorIndex ? 'Color Match position' : 'Base color position'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
              </div>
            ))}
          </div>
        </div>}
        
      {/* Color Match Toggle */}
      <div className="flex items-center justify-between mt-4 px-2">
        <span className="text-sm text-neutral-900 font-medium">Color Match</span>
        <Switch 
          checked={colorMatch}
          onCheckedChange={setColorMatch}
          className="data-[state=checked]:bg-highlight"
        />
      </div>
    </div>;
};

export default ColorPicker;
