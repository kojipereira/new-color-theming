import { useState, useCallback, useEffect } from "react";
import { generateColorSlots } from "@/lib/colors";
import { meetsAccessibilityStandards } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function useHighlightColor(initialColor: string = "#7E69AB") {
  const [highlightColor, setHighlightColor] = useState(initialColor);
  const [highlightColorSlots, setHighlightColorSlots] = useState<string[]>([]);
  const [highlightBaseSlotIndex, setHighlightBaseSlotIndex] = useState<number>(-1);
  const [hasHighlightContrastIssue, setHasHighlightContrastIssue] = useState(false);
  const [colorMatch, setColorMatch] = useState(false);
  const [closestColorIndex, setClosestColorIndex] = useState<number>(-1);
  const { toast } = useToast();

  const checkHighlightContrast = useCallback((slots: string[], index: number = 5) => {
    if (!slots.length) return false;
    // Check contrast between white text (#FFFFFF) and highlight color (Slot 6, index 5 by default)
    // When color match is on, use the selected color directly (baseIndex)
    const colorToCheck = colorMatch && index !== 5 ? slots[index] : slots[5];
    return !meetsAccessibilityStandards("#FFFFFF", colorToCheck);
  }, [colorMatch]);

  // Find the closest color in the palette to the target color
  const findClosestColorIndex = useCallback((palette: string[], targetColor: string): number => {
    const targetRgb = hexToRgb(targetColor);
    if (!targetRgb || !palette.length) return -1;
    
    let closestIndex = 0;
    let smallestDistance = Number.MAX_VALUE;
    
    palette.forEach((color, index) => {
      const paletteRgb = hexToRgb(color);
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
  
  // Hex to RGB helper function
  const hexToRgb = (hex: string) => {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Parse hex values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    
    return { r, g, b };
  };

  // Generate highlight color slots
  useEffect(() => {
    const initialHighlightSlots = generateColorSlots(highlightColor);
    setHighlightColorSlots(initialHighlightSlots);
    
    // Find the base slot for highlight color
    const highlightBaseIndex = initialHighlightSlots.findIndex(slot => slot.toLowerCase() === highlightColor.toLowerCase());
    setHighlightBaseSlotIndex(highlightBaseIndex);
    
    // Check highlight contrast
    setHasHighlightContrastIssue(checkHighlightContrast(initialHighlightSlots, highlightBaseIndex));
  }, [highlightColor, checkHighlightContrast]);

  // Check highlight contrast when slots or color match changes
  useEffect(() => {
    setHasHighlightContrastIssue(checkHighlightContrast(
      highlightColorSlots, 
      colorMatch ? highlightBaseSlotIndex : 5
    ));
  }, [highlightColorSlots, checkHighlightContrast, colorMatch, highlightBaseSlotIndex]);

  const handleHighlightColorChange = useCallback((newColor: string) => {
    setHighlightColor(newColor);
    
    // Turn off color match when highlight color changes
    if (colorMatch) {
      setColorMatch(false);
      toast({
        title: "Color Match Disabled",
        description: "Color Match was turned off due to highlight color change.",
      });
    }
    
    // Standard behavior when color match is disabled
    const slots = generateColorSlots(newColor);
    setHighlightColorSlots(slots);
    
    // Find the base slot for the new highlight color
    const baseIndex = slots.findIndex(slot => slot.toLowerCase() === newColor.toLowerCase());
    setHighlightBaseSlotIndex(baseIndex);
    setClosestColorIndex(-1); // Reset closest color index

    // Apply the highlight colors to the system
    // Use a BRIGHTER color for hover effect (use slot with lower index than the base color)
    const hoverSlotIndex = Math.max(0, baseIndex - 1); // Use one step brighter for hover
    
    document.documentElement.style.setProperty('--highlight-color', slots[5]); // Medium-bright color for highlights
    document.documentElement.style.setProperty('--highlight-hover-color', slots[hoverSlotIndex]); // Brighter for hover states
    document.documentElement.style.setProperty('--highlight-darker', slots[7]); // Keep darker slot available for other effects
    document.documentElement.style.setProperty('--highlight-foreground-color', '#FFFFFF'); // White text on highlight color

    // Check contrast after changing color
    setHasHighlightContrastIssue(checkHighlightContrast(slots, 5));
  }, [colorMatch, checkHighlightContrast, toast]);

  // Update highlight colors when color match toggle changes
  useEffect(() => {
    if (highlightColorSlots.length > 0) {
      if (colorMatch) {
        // Find the closest color to the current highlight color
        const closestIndex = findClosestColorIndex(highlightColorSlots, highlightColor);
        setClosestColorIndex(closestIndex);
        
        // Create a new palette with the highlight color replacing the closest color
        const newPalette = [...highlightColorSlots];
        newPalette[closestIndex] = highlightColor;
        setHighlightColorSlots(newPalette);
        
        // Use exact color when color match is enabled
        document.documentElement.style.setProperty('--highlight-color', highlightColor);
        
        // Use a BRIGHTER slot for hover effect (use a slot with lower index)
        const hoverSlotIndex = Math.max(0, closestIndex - 1); // One step brighter for hover
        document.documentElement.style.setProperty('--highlight-hover-color', newPalette[hoverSlotIndex]);
        
        // Use slot 7 for even darker hover effects (keep this for other potential effects)
        document.documentElement.style.setProperty(
          '--highlight-darker', 
          newPalette[7] || 
            newPalette[closestIndex + 2] || 
            newPalette[newPalette.length - 1]
        );
        
        // Show toast notification
        toast({
          title: "Color Match Enabled",
          description: `Replaced color at position ${closestIndex + 1} with your highlight color`,
        });
      } else {
        // Reset closest color index when turning off color match
        setClosestColorIndex(-1);
        
        // Regenerate the original color slots
        const slots = generateColorSlots(highlightColor);
        setHighlightColorSlots(slots);
        
        // Find the base slot for the highlight color
        const baseIndex = slots.findIndex(slot => slot.toLowerCase() === highlightColor.toLowerCase());
        setHighlightBaseSlotIndex(baseIndex);
        
        // Use optimized slots for better contrast
        document.documentElement.style.setProperty('--highlight-color', slots[5]);
        
        // Use a BRIGHTER slot for hover effect (slot with lower index)
        const hoverSlotIndex = Math.max(0, 4); // Use slot 4 which is brighter than slot 5
        document.documentElement.style.setProperty('--highlight-hover-color', slots[hoverSlotIndex]);
        
        document.documentElement.style.setProperty('--highlight-darker', slots[7]);
      }
      
      // Check contrast when toggling color match
      setHasHighlightContrastIssue(checkHighlightContrast(
        highlightColorSlots, 
        colorMatch ? (closestColorIndex !== -1 ? closestColorIndex : highlightBaseSlotIndex) : 5
      ));
    }
  }, [colorMatch, highlightColor, highlightColorSlots, highlightBaseSlotIndex, checkHighlightContrast, findClosestColorIndex, closestColorIndex, toast]);

  return {
    highlightColor,
    highlightColorSlots,
    highlightBaseSlotIndex,
    hasHighlightContrastIssue,
    colorMatch,
    setColorMatch,
    closestColorIndex,
    handleHighlightColorChange
  };
}
