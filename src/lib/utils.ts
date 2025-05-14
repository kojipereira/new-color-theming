
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates the contrast ratio between two colors
 * @param color1 - First color in hex format
 * @param color2 - Second color in hex format
 * @returns The contrast ratio (1 to 21)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hexColor: string): number => {
    // Remove # if present
    const hex = hexColor.replace(/^#/, '');
    
    // Convert hex to rgb
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    // Calculate luminance
    const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };
  
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  
  // Calculate contrast ratio
  const ratio = l1 > l2 
    ? (l1 + 0.05) / (l2 + 0.05)
    : (l2 + 0.05) / (l1 + 0.05);
    
  return ratio;
}

/**
 * Checks if a color combination meets WCAG AA contrast requirements
 * @param textColor - Text color in hex format
 * @param backgroundColor - Background color in hex format
 * @returns Boolean indicating if the combination passes AA contrast standards
 */
export function meetsAccessibilityStandards(textColor: string, backgroundColor: string): boolean {
  const ratio = calculateContrastRatio(textColor, backgroundColor);
  return ratio >= 4.5; // WCAG AA standard for normal text
}
