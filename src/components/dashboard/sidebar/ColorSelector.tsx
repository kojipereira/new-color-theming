
import React, { useState, useRef, useEffect } from 'react';

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onColorChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hue, setHue] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentColor, setCurrentColor] = useState(selectedColor);
  
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);

  // Convert hex to HSL to initialize the picker
  useEffect(() => {
    const rgb = hexToRgb(selectedColor);
    if (!rgb) return;
    
    const hslColor = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHue(hslColor.h * 360);
    
    if (colorPaletteRef.current) {
      const width = colorPaletteRef.current.clientWidth;
      const height = colorPaletteRef.current.clientHeight;
      
      setPosition({
        x: width * hslColor.s,
        y: height * (1 - hslColor.l)
      });
    }
  }, [selectedColor]);

  // Update color palette gradient based on selected hue
  useEffect(() => {
    if (colorPaletteRef.current) {
      colorPaletteRef.current.style.background = 
        `linear-gradient(to top, #000, transparent), 
         linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`;
    }
    
    // Update the selected color when hue changes
    if (colorPaletteRef.current) {
      const rect = colorPaletteRef.current.getBoundingClientRect();
      const saturation = position.x / rect.width;
      const lightness = 1 - (position.y / rect.height);
      
      // Convert HSL to hex
      const rgb = hslToRgb(hue / 360, saturation, lightness);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      
      setCurrentColor(hex);
    }
  }, [hue, position]);

  // Handle color palette click/drag
  const handleColorPaletteInteraction = (e: React.MouseEvent | React.TouchEvent) => {
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
    
    // Calculate position
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    
    // Constrain to palette bounds
    x = Math.max(0, Math.min(rect.width, x));
    y = Math.max(0, Math.min(rect.height, y));
    
    setPosition({ x, y });
    
    // Calculate color from position
    const saturation = x / rect.width;
    const lightness = 1 - (y / rect.height);
    
    // Convert HSL to hex
    const rgb = hslToRgb(hue / 360, saturation, lightness);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    
    setCurrentColor(hex);
  };
  
  // Handle hue slider click/drag
  const handleHueSliderInteraction = (e: React.MouseEvent | React.TouchEvent) => {
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
    let x = clientX - rect.left;
    
    // Constrain to slider bounds
    x = Math.max(0, Math.min(rect.width, x));
    
    // Calculate hue from position
    const newHue = (x / rect.width) * 360;
    setHue(newHue);
  };
  
  // Start dragging
  const startDrag = (
    handler: (e: MouseEvent | TouchEvent) => void,
    event: React.MouseEvent | React.TouchEvent
  ) => {
    // Call handler immediately with the initial event
    if ('touches' in event) {
      handler(event.nativeEvent);
    } else {
      handler(event.nativeEvent);
    }
    
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
      onColorChange(currentColor);
    };
    
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
  };

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-xs text-neutral-500 mb-2">Select a color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => onColorChange(color)}
              className={`w-6 h-6 rounded-full border ${selectedColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-neutral-200'}`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>
      
      {showPicker && (
        <div className="mt-4">
          {/* Color display and hex input */}
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-10 h-10 rounded-md border border-gray-200" 
              style={{ backgroundColor: currentColor }} 
            />
            <div className="flex-1">
              <div className="text-sm font-medium mb-1">Color value</div>
              <div className="relative">
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  onBlur={() => {
                    // Validate if input is a valid hex color
                    if (/^#[0-9A-F]{6}$/i.test(currentColor)) {
                      onColorChange(currentColor);
                    }
                  }}
                  className="px-2 h-8 w-full border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Color palette */}
          <div 
            ref={colorPaletteRef}
            className="relative w-full h-48 rounded-md cursor-crosshair"
            onMouseDown={(e) => startDrag((ev) => handleColorPaletteInteraction(ev as any), e)}
            onTouchStart={(e) => startDrag((ev) => handleColorPaletteInteraction(ev as any), e)}
          >
            {/* Color selector thumb */}
            <div
              className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-md"
              style={{ 
                left: position.x, 
                top: position.y,
                backgroundColor: currentColor
              }}
            />
          </div>
          
          {/* Hue slider */}
          <div 
            ref={hueSliderRef}
            className="relative w-full h-8 rounded-md cursor-pointer mt-4"
            style={{ 
              background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' 
            }}
            onMouseDown={(e) => startDrag((ev) => handleHueSliderInteraction(ev as any), e)}
            onTouchStart={(e) => startDrag((ev) => handleHueSliderInteraction(ev as any), e)}
          >
            {/* Hue slider thumb */}
            <div
              className="absolute top-0 w-2 h-8 border-2 border-white -translate-x-1/2 shadow-md"
              style={{ 
                left: (hue / 360) * 100 + '%',
              }}
            />
          </div>
        </div>
      )}
      
      <button
        className="mt-4 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md text-sm flex items-center justify-center w-full"
        onClick={() => setShowPicker(prev => !prev)}
      >
        {showPicker ? 'Hide Color Picker' : 'Custom Color'}
      </button>
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
