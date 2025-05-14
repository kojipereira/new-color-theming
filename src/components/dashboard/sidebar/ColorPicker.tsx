
import React, { useState, useCallback, useEffect } from "react";
import { AlertTriangle, Anchor } from "lucide-react";
import { generateColorSlots } from "@/lib/colors";
import { meetsAccessibilityStandards } from "@/lib/utils";
import { ColorSelector } from "./ColorSelector";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState("#898989");
  const [highlightColor, setHighlightColor] = useState("#7E69AB"); // Default highlight color
  const [colorSlots, setColorSlots] = useState<string[]>([]);
  const [highlightColorSlots, setHighlightColorSlots] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHighlightOpen, setIsHighlightOpen] = useState(false);
  const [hasContrastIssue, setHasContrastIssue] = useState(false);
  const [baseSlotIndex, setBaseSlotIndex] = useState<number>(-1);
  const [highlightBaseSlotIndex, setHighlightBaseSlotIndex] = useState<number>(-1);

  const checkContrastIssue = useCallback((slots: string[]) => {
    if (!slots.length) return false;
    // Check contrast between black text (#000000) and table color (Slot 4, index 3)
    return !meetsAccessibilityStandards("#000000", slots[3]);
  }, []);

  // Generate initial color slots on mount
  useEffect(() => {
    const initialSlots = generateColorSlots(color);
    setColorSlots(initialSlots);
    setHasContrastIssue(checkContrastIssue(initialSlots));
    
    // Find the base slot (where the selected color appears)
    const baseIndex = initialSlots.findIndex(slot => slot.toLowerCase() === color.toLowerCase());
    setBaseSlotIndex(baseIndex);

    // Generate highlight color slots
    const initialHighlightSlots = generateColorSlots(highlightColor);
    setHighlightColorSlots(initialHighlightSlots);
    
    // Find the base slot for highlight color
    const highlightBaseIndex = initialHighlightSlots.findIndex(slot => slot.toLowerCase() === highlightColor.toLowerCase());
    setHighlightBaseSlotIndex(highlightBaseIndex);
  }, [checkContrastIssue]);

  // Check contrast when slots change
  useEffect(() => {
    setHasContrastIssue(checkContrastIssue(colorSlots));
  }, [colorSlots, checkContrastIssue]);

  const handleColorChange = useCallback((newColor: string) => {
    setColor(newColor);
    const slots = generateColorSlots(newColor);
    setColorSlots(slots);
    
    // Find the base slot for the new color
    const baseIndex = slots.findIndex(slot => slot.toLowerCase() === newColor.toLowerCase());
    setBaseSlotIndex(baseIndex);

    // Apply the colors to the system using the appropriate slots
    // For medium brightness colors, use similar slots as before
    // For very light or very dark colors, adapt accordingly

    document.documentElement.style.setProperty('--background-color', slots[0]); // Always use lightest color for background
    document.documentElement.style.setProperty('--card-color', slots[0]); // Light color for cards
    document.documentElement.style.setProperty('--table-color', slots[2]); // Light-medium color for tables
    document.documentElement.style.setProperty('--outline-color', slots[3]); // Medium color for outlines

    // Toast notification removed as requested
  }, []);

  const handleHighlightColorChange = useCallback((newColor: string) => {
    setHighlightColor(newColor);
    const slots = generateColorSlots(newColor);
    setHighlightColorSlots(slots);
    
    // Find the base slot for the new highlight color
    const baseIndex = slots.findIndex(slot => slot.toLowerCase() === newColor.toLowerCase());
    setHighlightBaseSlotIndex(baseIndex);

    // Apply the highlight colors to the system
    document.documentElement.style.setProperty('--highlight-color', slots[5]); // Medium-bright color for highlights
    document.documentElement.style.setProperty('--highlight-hover-color', slots[6]); // Slightly darker for hover states
    document.documentElement.style.setProperty('--highlight-foreground-color', '#FFFFFF'); // White text on highlight color
  }, []);

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
                  <p>Poor contrast ratio with black text on table color (Slot 4)</p>
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
                className={`w-5 h-5 rounded-full border border-gray-300 flex-shrink-0 relative ${index === 3 && hasContrastIssue ? 'ring-2 ring-amber-500' : ''}`} 
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
                className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0 relative" 
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
    </div>;
};

export default ColorPicker;
