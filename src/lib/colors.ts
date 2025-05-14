

/**
 * Generates 12 color slots based on a given color
 * The provided color will be positioned in a dynamic slot based on its brightness,
 * with brighter colors placed in lower slots and darker colors in higher slots
 * 
 * @param baseColor - The hex color string to base the slots on
 * @returns Array of 12 hex color strings
 */
export function generateColorSlots(baseColor: string): string[] {
  // Special case for pure white: generate grayscale palette
  if (baseColor.toLowerCase() === "#ffffff") {
    return [
      "#FFFFFF", // Pure white
      "#F7F7F7", // Almost white
      "#F2F2F2", // Very very light gray
      "#EEEEEE", // Very light gray
      "#E5E5E5", // Light gray
      "#D2D2D2", 
      "#A4A4A4",
      "#898989", // Medium light gray
      "#666666", 
      "#434343", // Silver gray
      "#151515", // Medium gray
      "#666666"  // Darker gray
    ];
  }
  
  // Special case for pure black: generate grayscale palette
  if (baseColor.toLowerCase() === "#000000") {
    return [
      "#FFFFFF", // Pure white
      "#F7F7F7", // Almost white
      "#F2F2F2", // Very very light gray
      "#EEEEEE", // Very light gray
      "#E5E5E5", // Light gray
      "#D2D2D2", 
      "#A4A4A4",
      "#898989", // Medium light gray
      "#666666", 
      "#434343", // Silver gray
      "#151515", // Medium gray
      "#666666"  // Darker gray
    ];
  }

  // Convert the base color to HSL
  const rgb = hexToRgb(baseColor);
  if (!rgb) return Array(12).fill(baseColor);
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Determine the best slot based on lightness
  // For very light colors (L > 0.9), use slot 1
  // For very dark colors (L < 0.1), use slot 12
  // Otherwise, map lightness to slots 2 through 11
  let baseSlot: number;
  
  if (hsl.l > 0.9) {
    baseSlot = 0; // Slot 1 (index 0) for very bright colors
  } else if (hsl.l < 0.1) {
    baseSlot = 11; // Slot 12 (index 11) for very dark colors
  } else {
    // Map lightness from 0.1-0.9 to slots 2-11 (indices 1-10)
    // Higher lightness = lower slot number
    baseSlot = Math.round(10 - (hsl.l - 0.1) * (9 / 0.8)) + 1;
  }
  
  // Create the slots array
  const slots = new Array(12).fill('');
  slots[baseSlot] = baseColor; // Place the base color in its optimal slot
  
  // Generate brighter colors for slots before the base slot
  for (let i = baseSlot - 1; i >= 0; i--) {
    // Calculate how much brighter this slot should be compared to the base
    const brightnessStep = (baseSlot - i) / baseSlot;
    
    // Start with much brighter colors, max out at 0.99 (almost white but not quite)
    const lightnessFactor = Math.min(0.99, hsl.l + (0.99 - hsl.l) * brightnessStep);
    
    // For darker base colors, also reduce saturation as we get lighter
    const saturationFactor = hsl.l < 0.3 
      ? Math.max(0.05, hsl.s * (1 - brightnessStep / 1.5))
      : Math.max(0.05, hsl.s * (1 - brightnessStep / 3));
    
    const rgb = hslToRgb(hsl.h, saturationFactor, lightnessFactor);
    slots[i] = rgbToHex(rgb.r, rgb.g, rgb.b);
  }
  
  // Generate darker colors for slots after the base slot
  for (let i = baseSlot + 1; i < 12; i++) {
    // Calculate how much darker this slot should be compared to the base
    const darknessStep = (i - baseSlot) / (12 - baseSlot);
    // Decrease lightness proportionally, reaching near 0.0 (but not quite black)
    const lightnessFactor = Math.max(0.05, hsl.l * (1 - darknessStep));
    
    const rgb = hslToRgb(hsl.h, hsl.s, lightnessFactor);
    slots[i] = rgbToHex(rgb.r, rgb.g, rgb.b);
  }
  
  return slots;
}

// Helper functions for color conversions
function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }
  
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number } {
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => Math.round(x).toString(16).padStart(2, '0'))
    .join('');
}
