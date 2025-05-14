
import React from 'react';
import { Anchor } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ColorSlotProps {
  color: string;
  index: number;
  baseIndex: number | null;
  hasContrastIssue: boolean;
  contrastCheckIndex: number;
  tooltip?: string;
  isColorMatch?: boolean;
  hasDarkHover?: boolean;
}

export const ColorSlot: React.FC<ColorSlotProps> = ({
  color,
  index,
  baseIndex,
  hasContrastIssue,
  contrastCheckIndex,
  tooltip = "Base color position",
  isColorMatch = false,
  hasDarkHover = false
}) => {
  // Determine if this slot has a contrast issue
  const hasSlotContrastIssue = index === contrastCheckIndex && hasContrastIssue;
  
  // Determine rings classes
  let ringClasses = '';
  
  if (hasSlotContrastIssue) {
    ringClasses = 'ring-2 ring-amber-500';
  } else if (index === 7 && hasDarkHover) {
    ringClasses = 'ring-1 ring-blue-500';
  } else if (isColorMatch && index === baseIndex) {
    ringClasses = 'ring-2 ring-highlight-hover';
  }

  return (
    <div 
      className={`w-5 h-5 rounded-full border border-gray-300 flex-shrink-0 relative ${ringClasses}`}
      style={{ backgroundColor: color }}
      title={`Slot ${index + 1}: ${color}${index === 7 ? ' (Darker Hover Effect)' : ''}${isColorMatch && index === baseIndex ? ' (Color Match)' : ''}`}
    >
      {index === baseIndex && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute inset-0 flex items-center justify-center">
                <Anchor className="h-3 w-3 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

interface ColorSlotsProps {
  slots: string[];
  baseIndex: number;
  hasContrastIssue: boolean;
  contrastCheckIndex: number;
  tooltip?: string;
  isColorMatch?: boolean;
  closestColorIndex?: number;
  hasDarkHover?: boolean;
}

export const ColorSlots: React.FC<ColorSlotsProps> = ({
  slots,
  baseIndex,
  hasContrastIssue,
  contrastCheckIndex,
  tooltip = "Base color position",
  isColorMatch = false,
  closestColorIndex = -1,
  hasDarkHover = false
}) => {
  if (!slots.length) return null;

  return (
    <div className="mt-2 px-2">
      <div className="flex gap-1 overflow-x-auto py-1">
        {slots.map((slotColor, index) => (
          <ColorSlot
            key={`color-slot-${index}`}
            color={slotColor}
            index={index}
            baseIndex={isColorMatch && closestColorIndex >= 0 ? closestColorIndex : baseIndex}
            hasContrastIssue={hasContrastIssue}
            contrastCheckIndex={contrastCheckIndex}
            tooltip={tooltip}
            isColorMatch={isColorMatch}
            hasDarkHover={hasDarkHover && index === 7}
          />
        ))}
      </div>
    </div>
  );
};
