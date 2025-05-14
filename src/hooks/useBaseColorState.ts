
import { useState, useCallback, useEffect } from "react";
import { generateColorSlots } from "@/lib/colors";
import { useContrastChecker } from "./useColorUtils";

export function useBaseColorState() {
  const [color, setColor] = useState("#ffffff");  // Starting with white as default color
  const [colorSlots, setColorSlots] = useState<string[]>([]);
  const [baseSlotIndex, setBaseSlotIndex] = useState<number>(-1);
  const [hasContrastIssue, setHasContrastIssue] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const checkColorThemeContrast = useContrastChecker();

  // Generate initial color slots on mount
  useEffect(() => {
    const initialSlots = generateColorSlots(color);
    setColorSlots(initialSlots);
    setHasContrastIssue(checkColorThemeContrast(initialSlots, 2));
    
    // Find the base slot (where the selected color appears)
    const baseIndex = initialSlots.findIndex(slot => slot.toLowerCase() === color.toLowerCase());
    setBaseSlotIndex(baseIndex);

  }, [checkColorThemeContrast]);

  // Check contrast when slots change
  useEffect(() => {
    setHasContrastIssue(checkColorThemeContrast(colorSlots, 2));
  }, [colorSlots, checkColorThemeContrast]);

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
    document.documentElement.style.setProperty('--outline-color', slots[4]); // Use slot 4 for outlines

    // Check contrast after changing color
    setHasContrastIssue(checkColorThemeContrast(slots, 2));
  }, [checkColorThemeContrast]);

  return {
    color,
    colorSlots,
    baseSlotIndex,
    hasContrastIssue,
    isOpen,
    setIsOpen,
    handleColorChange
  };
}
