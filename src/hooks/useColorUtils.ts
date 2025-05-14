
import { useCallback } from "react";
import { ColorUtils } from "@/lib/colorUtils";
import { meetsAccessibilityStandards } from "@/lib/utils";

// Find the closest color in the palette to the target color
export const useFindClosestColorIndex = () => {
  return useCallback((palette: string[], targetColor: string): number => {
    const targetRgb = ColorUtils.hexToRgb(targetColor);
    if (!targetRgb || !palette.length) return -1;
    
    let closestIndex = 0;
    let smallestDistance = Number.MAX_VALUE;
    
    palette.forEach((color, index) => {
      const paletteRgb = ColorUtils.hexToRgb(color);
      if (!paletteRgb) return;
      
      // Calculate color distance using Euclidean distance in RGB space
      const distance = Math.sqrt(
        Math.pow(targetRgb.r - paletteRgb.r, 2) +
        Math.pow(targetRgb.g - paletteRgb.g, 2) +
        Math.pow(targetRgb.b - paletteRgb.b, 2)
      );
      
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    });
    
    return closestIndex;
  }, []);
};

// Check contrast ratio against accessibility standards
export const useContrastChecker = () => {
  return useCallback((slots: string[], checkIndex: number): boolean => {
    if (!slots.length) return false;
    // Check if the text color and background color meet accessibility standards
    return !meetsAccessibilityStandards("#000000", slots[checkIndex]);
  }, []);
};

// Check highlight contrast ratio against accessibility standards
export const useHighlightContrastChecker = () => {
  return useCallback((slots: string[], index: number = 5, colorMatch: boolean = false): boolean => {
    if (!slots.length) return false;
    // Check contrast between white text (#FFFFFF) and highlight color
    // When color match is on, use the selected color directly (baseIndex)
    const colorToCheck = colorMatch && index !== 5 ? slots[index] : slots[5];
    return !meetsAccessibilityStandards("#FFFFFF", colorToCheck);
  }, []);
};
