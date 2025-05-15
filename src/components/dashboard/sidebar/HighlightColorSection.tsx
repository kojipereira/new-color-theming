
import React, { useState } from "react";
import { AlertTriangle, Anchor } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { ColorSelector } from "./ColorSelector";

interface HighlightColorSectionProps {
  highlightColor: string;
  highlightColorSlots: string[];
  highlightBaseSlotIndex: number;
  hasHighlightContrastIssue: boolean;
  colorMatch: boolean;
  closestColorIndex: number;
  onHighlightColorChange: (color: string) => void;
  onColorMatchChange: (value: boolean) => void;
}

const HighlightColorSection: React.FC<HighlightColorSectionProps> = ({
  highlightColor,
  highlightColorSlots,
  highlightBaseSlotIndex,
  hasHighlightContrastIssue,
  colorMatch,
  closestColorIndex,
  onHighlightColorChange,
  onColorMatchChange
}) => {
  const [isHighlightOpen, setIsHighlightOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-6 w-full items-center gap-2 px-2 mt-4">
        <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
          Highlight Color
        </div>
        
        <div className="flex items-center gap-2">
          {hasHighlightContrastIssue && (
            <TooltipProvider>
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
            </TooltipProvider>
          )}
            
          <DropdownMenu open={isHighlightOpen} onOpenChange={setIsHighlightOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <div 
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{background: highlightColor}} 
                />
                <span className="sr-only">Open highlight color picker</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-0" align="end">
              <ColorSelector 
                color={highlightColor} 
                onChange={onHighlightColorChange} 
                onClose={() => setIsHighlightOpen(false)} 
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {highlightColorSlots.length > 0 && (
        <div className="mt-2 px-2">
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
        </div>
      )}
        
      {/* Color Match Toggle */}
      <div className="flex items-center justify-between mt-4 px-2">
        <span className="text-sm text-neutral-900 font-medium">Color Match</span>
        <Switch 
          checked={colorMatch}
          onCheckedChange={onColorMatchChange}
          className="data-[state=checked]:bg-highlight"
        />
      </div>
    </>
  );
};

export default HighlightColorSection;
