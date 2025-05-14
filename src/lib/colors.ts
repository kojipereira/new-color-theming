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
      "#F8F8F8", // Nearly white
      "#F5F5F5", // Very light gray
      "#EEEEEE", // Light gray
      "#E6E6E6", 
      "#D9D9D9",
      "#C8C8C9", // Light gray
      "#B0B0B0", 
      "#9F9EA1", // Silver gray
      "#8A898C", // Medium gray
      "#666666", 
      "#444444"  // Dark gray
    ];
  }
  
  // Special case for pure black: generate grayscale palette
  if (baseColor.toLowerCase() === "#000000") {
    return [
      "#FFFFFF", // Pure white
      "#F9F9F9", // Nearly white
      "#F0F0F0", // Very light gray
      "#E6E6E6",
      "#D0D0D0", // Light gray
      "#AAADB0", // Cool gray
      "#9F9EA1", // Silver gray
      "#8A898C", // Medium gray
      "#666666",
      "#444444",
      "#222222", // Dark gray
      "#000000"  // Pure black
    ];
  }

  // Convert the base color to HSL
  const rgb = hexToRgb(baseColor);
  if (!rgb) return Array(12).fill(baseColor);
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Determine the best slot based on perceived brightness
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
    baseSlot = Math.round(10 - (hsl.l - 0.1) * (9 / 0.8)) + 1;
  }
  
  // Create the slots array
  const slots = new Array(12).fill('');
  slots[baseSlot] = baseColor; // Place the base color in its optimal slot
  
  // Generate brighter colors for slots before the base slot
  for (let i = baseSlot - 1; i >= 0; i--) {
    // Calculate brightness multiplier based on position
    const positionFactor = (baseSlot - i) / baseSlot;
    
    // Apply different multipliers for different color types
    let lightnessIncrease: number;
    let saturationChange: number;
    
    // For vibrant colors (high saturation), preserve more saturation while increasing lightness
    if (hsl.s > 0.7) {
      lightnessIncrease = 0.08 + (positionFactor * 0.07); // Gentler lightness increase
      saturationChange = -0.05 * positionFactor; // Slight decrease in saturation
    }
    // For medium saturation colors
    else if (hsl.s > 0.3) {
      lightnessIncrease = 0.09 + (positionFactor * 0.08);
      saturationChange = -0.1 * positionFactor; // More decrease in saturation
    }
    // For muted colors (low saturation)
    else {
      lightnessIncrease = 0.1 + (positionFactor * 0.09);
      saturationChange = 0; // Keep saturation similar for already muted colors
    }
    
    // Apply exponential curve to lightness for more natural progression
    const exponentialFactor = Math.pow(positionFactor, 0.8); // Less aggressive curve
    lightnessIncrease = lightnessIncrease * exponentialFactor;
    
    // Extra boost for first two slots to ensure they're bright enough
    if (i < 2) {
      lightnessIncrease += 0.05;
    }
    
    // Ensure we never go over 1.0 lightness
    const newLightness = Math.min(0.98, hsl.l + lightnessIncrease);
    
    // Apply saturation changes based on color type
    let newSaturation = Math.max(0, Math.min(1, hsl.s + saturationChange));
    
    // For very light colors, reduce saturation more aggressively
    if (newLightness > 0.9) {
      newSaturation = Math.max(0.02, newSaturation * 0.7);
    }
    
    const rgb = hslToRgb(hsl.h, newSaturation, newLightness);
    slots[i] = rgbToHex(rgb.r, rgb.g, rgb.b);
  }
  
  // Generate darker colors for slots after the base slot
  for (let i = baseSlot + 1; i < 12; i++) {
    // Calculate darkness multiplier based on position
    const positionFactor = (i - baseSlot) / (12 - baseSlot);
    
    // Apply different multipliers for different color types
    let lightnessFactor: number;
    let saturationChange: number;
    
    // For vibrant colors (high saturation)
    if (hsl.s > 0.7) {
      lightnessFactor = hsl.l * (1 - (positionFactor * 0.8)); // Less aggressive darkening
      saturationChange = 0.05 * positionFactor; // Slight increase in saturation for darker tones
    }
    // For medium saturation colors
    else if (hsl.s > 0.3) {
      lightnessFactor = hsl.l * (1 - (positionFactor * 0.85));
      saturationChange = 0.1 * positionFactor; // More increase in saturation
    }
    // For muted colors (low saturation)
    else {
      lightnessFactor = hsl.l * (1 - (positionFactor * 0.9));
      saturationChange = 0.15 * positionFactor; // Even more increase in saturation for muted colors
    }
    
    // Apply logarithmic curve for more natural darkening
    const logCurveFactor = 1 - (Math.log(positionFactor * 9 + 1) / Math.log(10));
    lightnessFactor = Math.max(0.05, hsl.l * logCurveFactor);
    
    // For very dark colors, increase saturation to keep colors vibrant even when dark
    let newSaturation = Math.min(1, hsl.s + saturationChange);
    
    // Lower saturation slightly for very dark colors (near black)
    if (lightnessFactor < 0.15) {
      newSaturation = Math.min(newSaturation, newSaturation * 0.9);
    }
    
    const rgb = hslToRgb(hsl.h, newSaturation, lightnessFactor);
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
