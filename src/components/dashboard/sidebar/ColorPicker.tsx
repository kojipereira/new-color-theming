
import React, { useEffect } from "react";
import { BaseColorPicker } from "./color-picker/BaseColorPicker";
import { HighlightColorPicker } from "./color-picker/HighlightColorPicker";
import { ColorMatchToggle } from "./color-picker/ColorMatchToggle";
import { useBaseColorState, useHighlightColorState } from "@/hooks/useColorState";

const ColorPicker: React.FC = () => {
  // Use our custom hooks to manage state
  const {
    color,
    colorSlots,
    baseSlotIndex,
    hasContrastIssue,
    isOpen,
    setIsOpen,
    handleColorChange
  } = useBaseColorState();
  
  const {
    highlightColor,
    highlightColorSlots,
    highlightBaseSlotIndex,
    hasHighlightContrastIssue,
    isHighlightOpen,
    setIsHighlightOpen,
    closestColorIndex,
    colorMatch,
    setColorMatch,
    handleHighlightColorChange
  } = useHighlightColorState();

  // Apply the initial colors to the system
  useEffect(() => {
    if (colorSlots.length > 0) {
      document.documentElement.style.setProperty('--background-color', colorSlots[1]); // Use slot 1 for background
      document.documentElement.style.setProperty('--card-color', colorSlots[0]); // Use slot 0 for cards
      document.documentElement.style.setProperty('--table-color', colorSlots[2]); // Use slot 2 for tables
      document.documentElement.style.setProperty('--outline-color', colorSlots[4]); // Use slot 4 for outlines
    }
  }, [colorSlots]);

  return (
    <div className="rounded-md bg-white w-full overflow-hidden py-4 mb-2 px-[8px]">
      <BaseColorPicker
        title="Color Theme"
        color={color}
        colorSlots={colorSlots}
        baseSlotIndex={baseSlotIndex}
        hasContrastIssue={hasContrastIssue}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onColorChange={handleColorChange}
      />
        
      <HighlightColorPicker
        highlightColor={highlightColor}
        highlightColorSlots={highlightColorSlots}
        highlightBaseSlotIndex={highlightBaseSlotIndex}
        hasHighlightContrastIssue={hasHighlightContrastIssue}
        isHighlightOpen={isHighlightOpen}
        setIsHighlightOpen={setIsHighlightOpen}
        handleHighlightColorChange={handleHighlightColorChange}
        colorMatch={colorMatch}
        closestColorIndex={closestColorIndex}
      />
      
      <ColorMatchToggle
        colorMatch={colorMatch}
        setColorMatch={setColorMatch}
      />
    </div>
  );
};

export default ColorPicker;
