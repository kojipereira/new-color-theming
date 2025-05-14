
import { useState, useCallback, useEffect } from "react";
import { generateColorSlots } from "@/lib/colors";
import { meetsAccessibilityStandards } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function useColorState() {
  const [color, setColor] = useState("#ffffff");  // Starting with white as default color
  const [colorSlots, setColorSlots] = useState<string[]>([]);
  const [baseSlotIndex, setBaseSlotIndex] = useState<number>(-1);
  const [hasContrastIssue, setHasContrastIssue] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
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

  }, [checkColorThemeContrast]);

  // Check contrast when slots change
  useEffect(() => {
    setHasContrastIssue(checkColorThemeContrast(colorSlots));
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
    setHasContrastIssue(checkColorThemeContrast(slots));
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

export function useHighlightColorState() {
  const [highlightColor, setHighlightColor] = useState("#7E69AB"); // Default highlight color
  const [highlightColorSlots, setHighlightColorSlots] = useState<string[]>([]);
  const [highlightBaseSlotIndex, setHighlightBaseSlotIndex] = useState<number>(-1);
  const [hasHighlightContrastIssue, setHasHighlightContrastIssue] = useState(false);
  const [isHighlightOpen, setIsHighlightOpen] = useState(false);
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
    const highlightBaseIndex = initialHighlightSlots.findIndex(
      slot => slot.toLowerCase() === highlightColor.toLowerCase()
    );
    setHighlightBaseSlotIndex(highlightBaseIndex);
    
    // Check highlight contrast
    setHasHighlightContrastIssue(checkHighlightContrast(initialHighlightSlots, highlightBaseIndex));
  }, [checkHighlightContrast]);

  // Handle highlight color change
  const handleHighlightColorChange = useCallback((newColor: string) => {
    setHighlightColor(newColor);
    
    // Find closest color in the current palette if color match is enabled
    if (colorMatch && highlightColorSlots.length > 0) {
      const closestIndex = findClosestColorIndex(highlightColorSlots, newColor);
      setClosestColorIndex(closestIndex);
      
      // Create a new palette by modifying the closest color
      const newPalette = [...highlightColorSlots];
      newPalette[closestIndex] = newColor;
      setHighlightColorSlots(newPalette);
      
      // Show toast notification
      toast({
        title: "Color Match",
        description: `Replaced color at position ${closestIndex + 1} with your selection`,
      });
      
      // Apply the highlight colors to the system
      document.documentElement.style.setProperty('--highlight-color', newColor);
      // CHANGED: Use a brighter color for hover (index - 1 instead of index + 1)
      document.documentElement.style.setProperty(
        '--highlight-hover-color', 
        newPalette[Math.max(0, closestIndex - 1)] || newPalette[0]
      );
      document.documentElement.style.setProperty(
        '--highlight-darker', 
        newPalette[7] || newPalette[closestIndex + 2] || newPalette[newPalette.length - 1]
      );
      document.documentElement.style.setProperty('--highlight-foreground-color', '#FFFFFF');
      
      // Check contrast with the new color
      setHasHighlightContrastIssue(checkHighlightContrast(newPalette, closestIndex));
    } else {
      // Standard behavior when color match is disabled
      const slots = generateColorSlots(newColor);
      setHighlightColorSlots(slots);
      
      // Find the base slot for the new highlight color
      const baseIndex = slots.findIndex(slot => slot.toLowerCase() === newColor.toLowerCase());
      setHighlightBaseSlotIndex(baseIndex);
      setClosestColorIndex(-1); // Reset closest color index

      // Apply the highlight colors to the system
      if (colorMatch) {
        // Use exact color when color match is enabled
        document.documentElement.style.setProperty('--highlight-color', newColor);
        // CHANGED: Use a brighter color for hover (index - 1 instead of index + 1)
        document.documentElement.style.setProperty(
          '--highlight-hover-color', 
          slots[Math.max(0, baseIndex - 1)] || slots[0]
        ); // Use brighter slot or first slot for hover
        document.documentElement.style.setProperty(
          '--highlight-darker', 
          slots[7] || slots[baseIndex + 2] || slots[slots.length - 1]
        ); // Slot 7 for darker hover effects
      } else {
        // Use optimized slots for better contrast
        document.documentElement.style.setProperty('--highlight-color', slots[5]); // Medium-bright color for highlights
        // CHANGED: Use a brighter color for hover (slot 4 instead of slot 6)
        document.documentElement.style.setProperty('--highlight-hover-color', slots[4]); // Slightly brighter for hover states
        document.documentElement.style.setProperty('--highlight-darker', slots[7]); // Even darker for stronger hover effects
      }
      document.documentElement.style.setProperty('--highlight-foreground-color', '#FFFFFF'); // White text on highlight color

      // Check contrast after changing color
      setHasHighlightContrastIssue(checkHighlightContrast(slots, colorMatch ? baseIndex : 5));
    }
  }, [colorMatch, checkHighlightContrast, highlightColorSlots, findClosestColorIndex, toast]);

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
        
        // CHANGED: Find the brighter slot (previous index) or use the first one
        const brighterSlotIndex = Math.max(0, closestIndex - 1);
        const hoverColor = newPalette[brighterSlotIndex];
          
        document.documentElement.style.setProperty('--highlight-hover-color', hoverColor);
        
        // Use slot 7 or next available darker slot for even darker hover effects
        const darkerSlotIndex = 7;
        document.documentElement.style.setProperty(
          '--highlight-darker', 
          newPalette[darkerSlotIndex] || 
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
        // CHANGED: Use slot 4 (brighter) for hover instead of slot 6 (darker)
        document.documentElement.style.setProperty('--highlight-hover-color', slots[4]);
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
    isHighlightOpen,
    setIsHighlightOpen,
    closestColorIndex,
    colorMatch,
    setColorMatch,
    handleHighlightColorChange
  };
}
