
import { useState, useCallback, useEffect } from "react";
import { generateColorSlots } from "@/lib/colors";
import { meetsAccessibilityStandards } from "@/lib/utils";

export function useColorTheme(initialColor: string = "#ffffff") {
  const [color, setColor] = useState(initialColor);
  const [colorSlots, setColorSlots] = useState<string[]>([]);
  const [baseSlotIndex, setBaseSlotIndex] = useState<number>(-1);
  const [hasContrastIssue, setHasContrastIssue] = useState(false);

  const checkColorThemeContrast = useCallback((slots: string[]) => {
    if (!slots.length) return false;
    // Check contrast between black text (#000000) and table color (Slot 3, index 2)
    return !meetsAccessibilityStandards("#000000", slots[2]);
  }, []);

  // Generate initial color slots on mount
  useEffect(() => {
    const initialSlots = generateColorSlots(color);
    setColorSlots(initialSlots);
    setHasContrastIssue(checkColorThemeContrast(initialSlots));
    
    // Find the base slot (where the selected color appears)
    const baseIndex = initialSlots.findIndex(slot => slot.toLowerCase() === color.toLowerCase());
    setBaseSlotIndex(baseIndex);
  }, [color, checkColorThemeContrast]);

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
    document.documentElement.style.setProperty('--outline-color', slots[2]); // Use slot 2 for outlines

    // Check contrast after changing color
    setHasContrastIssue(checkColorThemeContrast(slots));
  }, [checkColorThemeContrast]);

  return {
    color,
    colorSlots,
    baseSlotIndex,
    hasContrastIssue,
    handleColorChange
  };
}
