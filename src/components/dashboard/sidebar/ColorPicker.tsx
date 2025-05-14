
import React, { useState, useCallback, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { generateColorSlots } from "@/lib/colors";
import { meetsAccessibilityStandards } from "@/lib/utils";
import { ColorSelector } from "./ColorSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState("#898989");
  const [colorSlots, setColorSlots] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasContrastIssue, setHasContrastIssue] = useState(false);

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
  }, [checkContrastIssue]);

  // Check contrast when slots change
  useEffect(() => {
    setHasContrastIssue(checkContrastIssue(colorSlots));
  }, [colorSlots, checkContrastIssue]);

  const handleColorChange = useCallback((newColor: string) => {
    setColor(newColor);
    const slots = generateColorSlots(newColor);
    setColorSlots(slots);
    
    // Apply the colors to the system using the appropriate slots
    document.documentElement.style.setProperty('--card-color', slots[0]);
    document.documentElement.style.setProperty('--background-color', slots[1]);
    document.documentElement.style.setProperty('--table-color', slots[2]);
    document.documentElement.style.setProperty('--outline-color', slots[4]);

    toast({
      title: "Color palette updated",
      description: "New color palette has been applied to the dashboard",
    });
  }, []);

  return (
    <div className="rounded-md bg-white w-full overflow-hidden py-4 mb-2 px-[8px]">
      <div className="flex min-h-6 w-full items-center gap-2 px-2">
        <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
          Color Theme
        </div>
        
        <div className="flex items-center gap-2">
          {hasContrastIssue && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Poor contrast ratio with black text on table color</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <div 
                  className="w-5 h-5 rounded-full border border-gray-300" 
                  style={{ background: color }}
                />
                <span className="sr-only">Open color picker</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-0" align="end">
              <ColorSelector color={color} onChange={handleColorChange} onClose={() => setIsOpen(false)} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {colorSlots.length > 0 && (
        <div className="mt-2 px-2">
          <div className="flex gap-1 overflow-x-auto py-1">
            {colorSlots.map((slotColor, index) => (
              <div 
                key={`color-slot-${index}`} 
                className={`w-5 h-5 rounded-full border border-gray-300 flex-shrink-0 ${index === 3 && hasContrastIssue ? 'ring-2 ring-amber-500' : ''}`}
                style={{ backgroundColor: slotColor }}
                title={`Slot ${index + 1}: ${slotColor}`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Cards: Slot 1 • Background: Slot 3 • Tables: Slot 4 • Outlines: Slot 5
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
