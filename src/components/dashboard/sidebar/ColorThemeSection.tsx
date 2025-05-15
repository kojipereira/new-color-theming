
import React, { useState } from "react";
import { AlertTriangle, Anchor } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ColorSelector } from "./ColorSelector";

interface ColorThemeSectionProps {
  color: string;
  colorSlots: string[];
  baseSlotIndex: number;
  hasContrastIssue: boolean;
  onColorChange: (color: string) => void;
}

const ColorThemeSection: React.FC<ColorThemeSectionProps> = ({
  color,
  colorSlots,
  baseSlotIndex,
  hasContrastIssue,
  onColorChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
                  <p>Poor contrast ratio with black text on table color (Slot 3)</p>
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
              <ColorSelector 
                color={color} 
                onChange={onColorChange} 
                onClose={() => setIsOpen(false)} 
              />
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
        </div>
      )}
    </>
  );
};

export default ColorThemeSection;
