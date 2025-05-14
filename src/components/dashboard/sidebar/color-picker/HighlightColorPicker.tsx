
import React from 'react';
import { ColorPickerButton } from './ColorPickerButton';
import { ColorSlots } from './ColorSlots';

interface HighlightColorPickerProps {
  highlightColor: string;
  highlightColorSlots: string[];
  highlightBaseSlotIndex: number;
  hasHighlightContrastIssue: boolean;
  isHighlightOpen: boolean;
  setIsHighlightOpen: (open: boolean) => void;
  handleHighlightColorChange: (color: string) => void;
  colorMatch: boolean;
  closestColorIndex: number;
}

export const HighlightColorPicker: React.FC<HighlightColorPickerProps> = ({
  highlightColor,
  highlightColorSlots,
  highlightBaseSlotIndex,
  hasHighlightContrastIssue,
  isHighlightOpen,
  setIsHighlightOpen,
  handleHighlightColorChange,
  colorMatch,
  closestColorIndex
}) => {
  // Use the actual selected color, not a slot from the palette
  const displayColor = highlightColor;
  const contrastCheckIndex = colorMatch ? closestColorIndex : 5;
  const contrastWarning = "Poor contrast ratio with white text on highlight color";
  
  return (
    <div className="mt-4">
      <div className="flex min-h-6 w-full items-center gap-2 px-2">
        <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
          Highlight Color
        </div>
        
        <ColorPickerButton
          color={displayColor}
          hasContrastIssue={hasHighlightContrastIssue}
          contrastWarning={contrastWarning}
          isOpen={isHighlightOpen}
          setIsOpen={setIsHighlightOpen}
          onColorChange={handleHighlightColorChange}
        />
      </div>
      
      <ColorSlots
        slots={highlightColorSlots}
        baseIndex={colorMatch ? closestColorIndex : highlightBaseSlotIndex}
        hasContrastIssue={hasHighlightContrastIssue}
        contrastCheckIndex={contrastCheckIndex}
        tooltip={colorMatch ? "Color Match position" : "Base color position"}
        isColorMatch={colorMatch}
        closestColorIndex={closestColorIndex}
        hasDarkHover={true}
      />
    </div>
  );
};
