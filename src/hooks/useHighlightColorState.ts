
import { useState, useCallback, useEffect } from "react";
import { generateColorSlots } from "@/lib/colors";
import { useHighlightContrastChecker, useFindClosestColorIndex } from "./useColorUtils";
import { useToast } from "@/hooks/use-toast";

export function useHighlightColorState() {
  const [highlightColor, setHighlightColor] = useState("#7E69AB"); // Default highlight color
  const [highlightColorSlots, setHighlightColorSlots] = useState<string[]>([]);
  const [highlightBaseSlotIndex, setHighlightBaseSlotIndex] = useState<number>(-1);
  const [hasHighlightContrastIssue, setHasHighlightContrastIssue] = useState(false);
  const [isHighlightOpen, setIsHighlightOpen] = useState(false);
  const [colorMatch, setColorMatch] = useState(false);
  const [closestColorIndex, setClosestColorIndex] = useState<number>(-1);
  const { toast } = useToast();

  const checkHighlightContrast = useHighlightContrastChecker();
  const findClosestColorIndex = useFindClosestColorIndex();

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
    setHasHighlightContrastIssue(checkHighlightContrast(initialHighlightSlots, highlightBaseIndex, false));
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
      // Use a brighter color for hover (index - 1 instead of index + 1)
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
      setHasHighlightContrastIssue(checkHighlightContrast(newPalette, closestIndex, true));
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
        // Use a brighter color for hover (index - 1 instead of index + 1)
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
        // Use a brighter color for hover (slot 4 instead of slot 6)
        document.documentElement.style.setProperty('--highlight-hover-color', slots[4]); // Slightly brighter for hover states
        document.documentElement.style.setProperty('--highlight-darker', slots[7]); // Even darker for stronger hover effects
      }
      document.documentElement.style.setProperty('--highlight-foreground-color', '#FFFFFF'); // White text on highlight color

      // Check contrast after changing color
      setHasHighlightContrastIssue(checkHighlightContrast(slots, colorMatch ? baseIndex : 5, colorMatch));
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
        
        // Find the brighter slot (previous index) or use the first one
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
        // Use slot 4 (brighter) for hover instead of slot 6 (darker)
        document.documentElement.style.setProperty('--highlight-hover-color', slots[4]);
        document.documentElement.style.setProperty('--highlight-darker', slots[7]);
      }
      
      // Check contrast when toggling color match
      setHasHighlightContrastIssue(checkHighlightContrast(
        highlightColorSlots, 
        colorMatch ? (closestColorIndex !== -1 ? closestColorIndex : highlightBaseSlotIndex) : 5,
        colorMatch
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
