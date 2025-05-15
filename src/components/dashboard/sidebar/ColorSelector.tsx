
import React, { useState, useRef, useEffect } from 'react';

interface ColorSelectorProps {
  color: string;
  onChange: (color: string) => void;
  onClose?: () => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ color, onChange, onClose }) => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [selectedColor, setSelectedColor] = useState(color);
  
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);

  // Initialize from the provided color
  useEffect(() => {
    const rgb = hexToRgb(color);
    if (!rgb) return;
    
    const hslColor = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHue(Math.round(hslColor.h * 360));
    setSaturation(Math.round(hslColor.s * 100));
    setLightness(Math.round(hslColor.l * 100));
  }, [color]);

  // Update selected color whenever HSL values change
  useEffect(() => {
    const rgb = hslToRgb(hue / 360, saturation / 100, lightness / 100);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setSelectedColor(hex);
  }, [hue, saturation, lightness]);

  // Handle color palette click/drag
  const handleColorPaletteInteraction = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!colorPaletteRef.current) return;
    
    const rect = colorPaletteRef.current.getBoundingClientRect();
    let clientX: number, clientY: number;
    
    // Check if it's a touch or mouse event
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // Calculate position relative to the container
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    
    // Convert position to saturation and lightness
    const newSaturation = Math.round((x / rect.width) * 100);
    const newLightness = Math.round(100 - (y / rect.height) * 100);
    
    setSaturation(newSaturation);
    setLightness(newLightness);
  };

  // Handle hue slider click/drag
  const handleHueSliderInteraction = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!hueSliderRef.current) return;
    
    const rect = hueSliderRef.current.getBoundingClientRect();
    let clientX: number;
    
    // Check if it's a touch or mouse event
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    // Calculate position
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    
    // Calculate hue from position (0-360)
    const newHue = Math.round((x / rect.width) * 360);
    setHue(newHue);
  };
  
  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedColor(value);
  };

  // Apply hex input
  const applyHexInput = () => {
    if (/^#[0-9A-F]{6}$/i.test(selectedColor)) {
      const rgb = hexToRgb(selectedColor);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        setHue(Math.round(hsl.h * 360));
        setSaturation(Math.round(hsl.s * 100));
        setLightness(Math.round(hsl.l * 100));
      }
    }
  };

  // Start dragging
  const startDrag = (
    handler: (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => void,
    event: React.MouseEvent | React.TouchEvent
  ) => {
    // Call handler immediately with the initial event
    handler(event);
    
    // Add event listeners for move and end events
    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      handler(e);
    };
    
    const handleEnd = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
      
      // Apply final color when drag ends
      onChange(selectedColor);
    };
    
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
  };

  // Apply button handler
  const handleApply = () => {
    onChange(selectedColor);
    if (onClose) onClose();
  };

  // Calculate the position of the selector thumb based on saturation and lightness
  const thumbPosition = {
    x: `${saturation}%`,
    y: `${100 - lightness}%`
  };
  
  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Color display and hex input */}
      <div className="flex items-center gap-2">
        <div 
          className="w-10 h-10 rounded-md border border-gray-200" 
          style={{ backgroundColor: selectedColor }} 
        />
        <div className="flex-1">
          <div className="text-sm font-medium mb-1">Color value</div>
          <div className="relative">
            <input
              type="text"
              value={selectedColor}
              onChange={handleHexChange}
              onBlur={applyHexInput}
              className="px-2 h-8 w-full border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Color palette - uses CSS variables for dynamic coloring */}
      <div 
        ref={colorPaletteRef}
        className="relative w-full h-48 rounded-md cursor-crosshair"
        style={{
          background: `linear-gradient(to top, #000, transparent), 
                      linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
        }}
        onMouseDown={(e) => startDrag(handleColorPaletteInteraction, e)}
        onTouchStart={(e) => startDrag(handleColorPaletteInteraction, e)}
      >
        {/* Color selector thumb */}
        <div
          className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-md"
          style={{ 
            left: thumbPosition.x, 
            top: thumbPosition.y,
            backgroundColor: selectedColor
          }}
        />
      </div>
      
      {/* Hue slider */}
      <div 
        ref={hueSliderRef}
        className="relative w-full h-8 rounded-md cursor-pointer"
        style={{ 
          background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' 
        }}
        onMouseDown={(e) => startDrag(handleHueSliderInteraction, e)}
        onTouchStart={(e) => startDrag(handleHueSliderInteraction, e)}
      >
        {/* Hue slider thumb */}
        <div
          className="absolute top-0 w-2 h-8 border-2 border-white -translate-x-1/2 shadow-md"
          style={{ 
            left: `${(hue / 360) * 100}%`,
          }}
        />
      </div>
      
      {/* Apply button */}
      <button 
        className="bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
        onClick={handleApply}
      >
        Apply Color
      </button>

      {/* HSL Debug info */}
      <div className="text-xs text-gray-500">
        HSL: {hue}°, {saturation}%, {lightness}%
      </div>
    </div>
  );
};

// Color conversion utilities
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + [r, g, b]
    .map(x => Math.round(x).toString(16).padStart(2, '0'))
    .join('');
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
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
};

const hslToRgb = (h: number, s: number, l: number) => {
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
};
