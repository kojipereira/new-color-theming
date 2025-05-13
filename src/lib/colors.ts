
/**
 * Generates 12 color slots based on a given color
 * The provided color will be slot 9, slots 1-8 will have increasing brightness,
 * and slots 10-12 will have decreasing brightness
 * 
 * @param baseColor - The hex color string to base the slots on
 * @returns Array of 12 hex color strings
 */
export function generateColorSlots(baseColor: string): string[] {
  // Convert the base color to HSL
  const rgb = hexToRgb(baseColor);
  if (!rgb) return Array(12).fill(baseColor);
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Base color will be slot 9 (index 8)
  const slots = new Array(12).fill('');
  slots[8] = baseColor; // Slot 9
  
  // Generate brighter colors for slots 1-8
  for (let i = 0; i < 8; i++) {
    // Calculate lightness, increasing from slot 8 to slot 1
    // We'll want a range from the base lightness up to near 1.0 (but not quite white)
    const lightnessFactor = hsl.l + (0.95 - hsl.l) * ((8 - i) / 8);
    // For very dark colors, also reduce saturation as we get lighter
    const saturationFactor = hsl.l < 0.2 
      ? Math.max(0.1, hsl.s * (1 - ((8 - i) / 16)))
      : hsl.s;
    
    const rgb = hslToRgb(hsl.h, saturationFactor, lightnessFactor);
    slots[i] = rgbToHex(rgb.r, rgb.g, rgb.b);
  }
  
  // Generate darker colors for slots 10-12
  for (let i = 9; i < 12; i++) {
    // Calculate lightness, decreasing from slot 10 to slot 12
    // We'll want a range from the base lightness down to near 0.0 (but not quite black)
    const lightnessFactor = hsl.l * (1 - ((i - 8) / 5));
    
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
