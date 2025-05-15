
import React from "react";
import { useColorTheme } from "@/hooks/useColorTheme";
import { useHighlightColor } from "@/hooks/useHighlightColor";
import ColorThemeSection from "./ColorThemeSection";
import HighlightColorSection from "./HighlightColorSection";

const ColorPicker: React.FC = () => {
  const {
    color,
    colorSlots,
    baseSlotIndex,
    hasContrastIssue,
    handleColorChange
  } = useColorTheme("#ffffff");  // Starting with white as default color

  const {
    highlightColor,
    highlightColorSlots,
    highlightBaseSlotIndex,
    hasHighlightContrastIssue,
    colorMatch,
    setColorMatch,
    closestColorIndex,
    handleHighlightColorChange
  } = useHighlightColor("#7E69AB"); // Default highlight color

  return (
    <div className="rounded-md bg-white w-full overflow-hidden py-4 mb-2 px-[8px]">
      <ColorThemeSection
        color={color}
        colorSlots={colorSlots}
        baseSlotIndex={baseSlotIndex}
        hasContrastIssue={hasContrastIssue}
        onColorChange={handleColorChange}
      />

      <HighlightColorSection
        highlightColor={highlightColor}
        highlightColorSlots={highlightColorSlots}
        highlightBaseSlotIndex={highlightBaseSlotIndex}
        hasHighlightContrastIssue={hasHighlightContrastIssue}
        colorMatch={colorMatch}
        closestColorIndex={closestColorIndex}
        onHighlightColorChange={handleHighlightColorChange}
        onColorMatchChange={setColorMatch}
      />
    </div>
  );
};

export default ColorPicker;
