import React, { useState, useCallback, useEffect } from "react";
import { AlertTriangle, Anchor } from "lucide-react";
import { generateColorSlots } from "@/lib/colors";
import { meetsAccessibilityStandards } from "@/lib/utils";
import { ColorSelector } from "./ColorSelector";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import ThemeToggle from "./ThemeToggle";
import { useThemeMode } from "@/hooks/useThemeMode";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState("#898989");
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
  const { mode } = useThemeMode();

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

  // Apply color slots based on theme mode
  useEffect(() => {
    if (colorSlots.length > 0) {
      if (mode === 'light') {
        // Light mode - use original slots
        document.documentElement.style.setProperty('--background-color', colorSlots[0]);
        document.documentElement.style.setProperty('--card-color', colorSlots[1]);
        document.documentElement.style.setProperty('--table-color', colorSlots[2]);
        document.documentElement.style.setProperty('--outline-color', colorSlots[3]);
      } else {
        // Dark mode - use specified alternative slots
        // Ensure we have enough slots before accessing
        if (colorSlots.length >= 12) {
          document.documentElement.style.setProperty('--background-color', colorSlots[11]); // Slot 12
          document.documentElement.style.setProperty('--card-color', colorSlots[10]); // Slot 11
          document.documentElement.style.setProperty('--table-color', colorSlots[9]); // Slot 10
          document.documentElement.style.setProperty('--outline-color', colorSlots[3]); // Slot 4
        }
      }
    }
  }, [mode, colorSlots]);

  const handleColorChange = useCallback((newColor: string) => {
    setColor(newColor);
    const slots = generateColorSlots(newColor);
    setColorSlots(slots);
    
    // Find the base slot for the new color
    const baseIndex = slots.findIndex(slot => slot.toLowerCase() === newColor.toLowerCase());
    setBaseSlotIndex(baseIndex);

    // Apply the colors to the system using the appropriate slots
    if (mode === 'light') {
      // Light mode - use original slots
      document.documentElement.style.setProperty('--background-color', slots[0]);
      document.documentElement.style.setProperty('--card-color', slots[1]);
      document.documentElement.style.setProperty('--table-color', slots[2]);
      document.documentElement.style.setProperty('--outline-color', slots[3]);
    } else {
      // Dark mode - use specified alternative slots
      document.documentElement.style.setProperty('--background-color', slots[11]); // Slot 12
      document.documentElement.style.setProperty('--card-color', slots[10]); // Slot 11
      document.documentElement.style.setProperty('--table-color', slots[9]); // Slot 10
      document.documentElement.style.setProperty('--outline-color', slots[3]); // Slot 4
    }

    // Check contrast after changing color
    setHasContrastIssue(checkColorThemeContrast(slots));
  }, [checkColorThemeContrast, mode]);

  const handleHighlightColorChange = useCallback((newColor: string) => {
    setHighlightColor(newColor);
    const slots = generateColorSlots(newColor);
    setHighlightColorSlots(slots);
    
    // Find the base slot for the new highlight color
    const baseIndex = slots.findIndex(slot => slot.toLowerCase() === newColor.toLowerCase());
    setHighlightBaseSlotIndex(baseIndex);

    // Apply the highlight colors to the system
    if (colorMatch) {
      // Use exact color when color match is enabled
      document.documentElement.style.setProperty('--highlight-color', newColor);
      document.documentElement.style.setProperty('--highlight-hover-color', slots[baseIndex + 1] || slots[slots.length - 1]); // Use next slot or last slot for hover
    } else {
      // Use optimized slots for better contrast
      document.documentElement.style.setProperty('--highlight-color', slots[5]); // Medium-bright color for highlights
      document.documentElement.style.setProperty('--highlight-hover-color', slots[6]); // Slightly darker for hover states
    }
    document.documentElement.style.setProperty('--highlight-foreground-color', '#FFFFFF'); // White text on highlight color

    // Check contrast after changing color
    setHasHighlightContrastIssue(checkHighlightContrast(slots, colorMatch ? baseIndex : 5));
  }, [colorMatch, checkHighlightContrast]);

  // Update highlight colors when color match toggle changes
  useEffect(() => {
    if (highlightColorSlots.length > 0) {
      if (colorMatch) {
        // Use exact color when color match is enabled
        document.documentElement.style.setProperty('--highlight-color', highlightColor);
        
        // Find the next darker slot or use the last one
        const nextSlotIndex = highlightBaseSlotIndex + 1;
        const hoverColor = nextSlotIndex < highlightColorSlots.length 
          ? highlightColorSlots[nextSlotIndex] 
          : highlightColorSlots[highlightColorSlots.length - 1];
          
        document.documentElement.style.setProperty('--highlight-hover-color', hoverColor);
      } else {
        // Use optimized slots for better contrast
        document.documentElement.style.setProperty('--highlight-color', highlightColorSlots[5]);
        document.documentElement.style.setProperty('--highlight-hover-color', highlightColorSlots[6]);
      }
      
      // Check contrast when toggling color match
      setHasHighlightContrastIssue(checkHighlightContrast(
        highlightColorSlots, 
        colorMatch ? highlightBaseSlotIndex : 5
      ));
    }
  }, [colorMatch, highlightColor, highlightColorSlots, highlightBaseSlotIndex, checkHighlightContrast]);

  return <div className="rounded-md bg-white dark:bg-black w-full overflow-hidden py-4 mb-2 px-[8px]">
      <div className="flex min-h-6 w-full items-center gap-2 px-2">
        <div className="self-stretch gap-2 text-sm text-neutral-900 dark:text-white font-bold leading-none flex-1 shrink basis-[0%] my-auto">
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
          
          <ThemeToggle />
          
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
      
      {/* Color Slots */}
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
        <div className="self-stretch gap-2 text-sm text-neutral-900 dark:text-white font-bold leading-none flex-1 shrink basis-[0%] my-auto">
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
      
      {/* Highlight Color Slots */}
      {highlightColorSlots.length > 0 && <div className="mt-2 px-2">
          <div className="flex gap-1 overflow-x-auto py-1">
            {highlightColorSlots.map((slotColor, index) => (
              <div 
                key={`highlight-slot-${index}`} 
                className={`w-5 h-5 rounded-full border border-gray-300 flex-shrink-0 relative ${
                  (colorMatch && index === highlightBaseSlotIndex && hasHighlightContrastIssue) || 
                  (!colorMatch && index === 5 && hasHighlightContrastIssue) 
                    ? 'ring-2 ring-amber-500' : ''
                }`} 
                style={{ backgroundColor: slotColor }} 
                title={`Slot ${index + 1}: ${slotColor}`}
              >
                {index === highlightBaseSlotIndex && (
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
        
      {/* Color Match Toggle */}
      <div className="flex items-center justify-between mt-4 px-2">
        <span className="text-sm text-neutral-900 dark:text-white font-medium">Color Match</span>
        <Switch 
          checked={colorMatch}
          onCheckedChange={setColorMatch}
          className="data-[state=checked]:bg-highlight"
        />
      </div>
    </div>;
};

export default ColorPicker;
