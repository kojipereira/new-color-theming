/**
 * Generates 12 color slots based on a given color
 * Inspired by Material 3 color system with tonal palettes
 * The provided color will be positioned in slot 6 (index 5)
 * with progressive variations in lightness, saturation, and tone
 * 
 * @param baseColor - The hex color string to base the slots on
 * @returns Array of 12 hex color strings
 */
export function generateColorSlots(baseColor: string): string[] {
  // Special case for pure white: generate grayscale palette
  if (baseColor.toLowerCase() === "#ffffff") {
    return [
      "#FFFFFF", // Pure white - 100
      "#F8F9FA", // 98
      "#F1F3F4", // 95
      "#E8EAED", // 90
      "#DADCE0", // 80
      "#C5C9CE", // 70
      "#AAAFB6", // 60
      "#8E949E", // 50
      "#70767E", // 40
      "#5A6066", // 30
      "#444A50", // 20
      "#202124"  // 10 - Very dark gray
    ];
  }
  
  // Special case for pure black: generate grayscale palette
  if (baseColor.toLowerCase() === "#000000") {
    return [
      "#FFFFFF", // Pure white - 100
      "#F8F9FA", // 98
      "#F1F3F4", // 95
      "#E8EAED", // 90
      "#DADCE0", // 80
      "#C5C9CE", // 70
      "#AAAFB6", // 60
      "#8E949E", // 50
      "#70767E", // 40
      "#5A6066", // 30
      "#444A50", // 20
      "#202124"  // 10 - Very dark gray
    ];
  }

  // Convert the base color to HSL
  const rgb = hexToRgb(baseColor);
  if (!rgb) return Array(12).fill(baseColor);
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // In Material 3, colors are distributed across a tonal range
  // We'll use slot 6 (index 5) as our primary color position
  const baseSlot = 5;
  
  // Create the slots array
  const slots = new Array(12).fill('');
  slots[baseSlot] = baseColor; // Place the base color in slot 6
  
  // Material 3-inspired tonal mappings (approximate lightness values)
  // These values create more distinct steps between slots
  const tonalLightness = [
    0.98, // Slot 1 - Near white (but not pure white)
    0.95, // Slot 2 - Very light
    0.90, // Slot 3 - Light
    0.80, // Slot 4 - Medium light
    0.70, // Slot 5 - Below medium light
    hsl.l, // Slot 6 - Base color (unchanged)
    Math.max(0.05, hsl.l * 0.85), // Slot 7
    Math.max(0.05, hsl.l * 0.70), // Slot 8
    Math.max(0.05, hsl.l * 0.55), // Slot 9
    Math.max(0.05, hsl.l * 0.40), // Slot 10
    Math.max(0.05, hsl.l * 0.25), // Slot 11
    Math.max(0.05, hsl.l * 0.15)  // Slot 12 - Very dark but not pure black
  ];
  
  // Saturation adjustments for more variation
  // For lighter colors, we'll reduce saturation
  // For darker colors, we'll boost saturation to maintain vibrancy
  const tonalSaturation = [
    Math.max(0.05, hsl.s * 0.25), // Slot 1 - Much less saturated
    Math.max(0.05, hsl.s * 0.40), // Slot 2 - Less saturated
    Math.max(0.05, hsl.s * 0.55), // Slot 3
    Math.max(0.05, hsl.s * 0.70), // Slot 4
    Math.max(0.05, hsl.s * 0.85), // Slot 5
    hsl.s,                        // Slot 6 - Base color saturation
    Math.min(1.0, hsl.s * 1.05),  // Slot 7
    Math.min(1.0, hsl.s * 1.10),  // Slot 8
    Math.min(1.0, hsl.s * 1.15),  // Slot 9
    Math.min(1.0, hsl.s * 1.10),  // Slot 10 - Slightly reduce saturation from peak
    Math.min(1.0, hsl.s * 1.05),  // Slot 11 - Even less saturation
    Math.min(1.0, hsl.s * 0.90)   // Slot 12 - Less saturated for dark colors
  ];
  
  // Subtle hue shifts to create more interesting palettes
  // Material 3 uses slight hue shifts to make the palette more dynamic
  const hueShift = [
    -0.02, // Slot 1 - Slightly cooler
    -0.015, // Slot 2
    -0.01, // Slot 3
    -0.005, // Slot 4
    -0.0025, // Slot 5
    0,      // Slot 6 - Base color hue
    0.0025, // Slot 7
    0.005, // Slot 8
    0.01, // Slot 9
    0.015, // Slot 10
    0.02, // Slot 11
    0.025  // Slot 12 - Slightly warmer
  ];
  
  // Generate all color slots
  for (let i = 0; i < 12; i++) {
    if (i === baseSlot) continue; // Skip the base slot as we already set it
    
    // Apply the adjusted hue, saturation and lightness
    let adjustedHue = hsl.h + hueShift[i];
    // Normalize hue to be between 0 and 1
    adjustedHue = adjustedHue < 0 ? adjustedHue + 1 : adjustedHue > 1 ? adjustedHue - 1 : adjustedHue;
    
    const rgb = hslToRgb(
      adjustedHue,
      tonalSaturation[i], 
      tonalLightness[i]
    );
    
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
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => Math.round(x).toString(16).padStart(2, '0'))
    .join('');
}