
import React, { useState, useRef, useEffect } from 'react';

interface ColorSelectorProps {
  color: string;
  onChange: (color: string) => void;
  onClose?: () => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ color, onChange, onClose }) => {
  const [hue, setHue] = useState(0);
  const [selectedColor, setSelectedColor] = useState(color);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);
  const colorThumbRef = useRef<HTMLDivElement>(null);
  const hueThumbRef = useRef<HTMLDivElement>(null);

  // Convert hex to HSL to initialize the picker
  useEffect(() => {
    const rgb = hexToRgb(color);
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
  }, [color]);

  // Update color palette background based on selected hue
  useEffect(() => {
    if (colorPaletteRef.current) {
      // Use a pure hue color for the gradient
      const pureHueColor = `hsl(${hue}, 100%, 50%)`;
      colorPaletteRef.current.style.background = `
        linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)),
        linear-gradient(to right, rgba(255,255,255,1), ${pureHueColor})
      `;
    }
    
    // Calculate color based on current position and hue
    updateColorFromPosition();
  }, [hue]);

  // Update color based on current position
  const updateColorFromPosition = () => {
    if (!colorPaletteRef.current) return;
    
    const rect = colorPaletteRef.current.getBoundingClientRect();
    const saturation = Math.max(0, Math.min(1, position.x / rect.width));
    const lightness = Math.max(0, Math.min(1, 1 - (position.y / rect.height)));
    
    // Convert HSL to hex
    const rgb = hslToRgb(hue / 360, saturation, lightness);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    
    setSelectedColor(hex);
  };

  // Update position when color changes
  useEffect(() => {
    updateColorFromPosition();
  }, [position]);
  
  // Handle color palette click/drag
  const handleColorPaletteInteraction = (e: MouseEvent | TouchEvent) => {
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
    let x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    let y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    
    setPosition({ x, y });
    
    // Move the thumb
    if (colorThumbRef.current) {
      colorThumbRef.current.style.left = `${x}px`;
      colorThumbRef.current.style.top = `${y}px`;
    }
  };
  
  // Handle hue slider click/drag
  const handleHueSliderInteraction = (e: MouseEvent | TouchEvent) => {
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
    let x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    
    // Calculate hue from position
    const newHue = (x / rect.width) * 360;
    setHue(newHue);
    
    // Move the hue thumb
    if (hueThumbRef.current) {
      hueThumbRef.current.style.left = `${x}px`;
    }
  };
  
  // Start dragging
  const startDrag = (
    handler: (e: MouseEvent | TouchEvent) => void,
    event: React.MouseEvent | React.TouchEvent
  ) => {
    // Call handler immediately with the initial event
    handler(event.nativeEvent);
    
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

  // Update when selected color changes
  useEffect(() => {
    // Live preview the color as user drags
    const previewDebounce = setTimeout(() => {
      onChange(selectedColor);
    }, 100);
    
    return () => clearTimeout(previewDebounce);
  }, [selectedColor, onChange]);
  
  // Update position when hex input changes
  const updatePositionFromHex = (hex: string) => {
    if (!/^#[0-9A-F]{6}$/i.test(hex)) return;
    
    const rgb = hexToRgb(hex);
    if (!rgb || !colorPaletteRef.current) return;
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHue(hsl.h * 360);
    
    const width = colorPaletteRef.current.clientWidth;
    const height = colorPaletteRef.current.clientHeight;
    
    setPosition({
      x: width * hsl.s,
      y: height * (1 - hsl.l)
    });
    
    // Move the thumbs
    if (colorThumbRef.current) {
      colorThumbRef.current.style.left = `${width * hsl.s}px`;
      colorThumbRef.current.style.top = `${height * (1 - hsl.l)}px`;
    }
    
    if (hueThumbRef.current) {
      hueThumbRef.current.style.left = `${(hsl.h * 360 / 360) * hueSliderRef.current!.clientWidth}px`;
    }
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
              onChange={(e) => setSelectedColor(e.target.value)}
              onBlur={() => {
                // Validate and update picker position if valid hex
                if (/^#[0-9A-F]{6}$/i.test(selectedColor)) {
                  onChange(selectedColor);
                  updatePositionFromHex(selectedColor);
                }
              }}
              className="px-2 h-8 w-full border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Color palette */}
      <div className="relative">
        <div 
          ref={colorPaletteRef}
          className="relative w-full h-48 rounded-md cursor-crosshair overflow-hidden"
          onMouseDown={(e) => startDrag((ev) => handleColorPaletteInteraction(ev), e)}
          onTouchStart={(e) => startDrag((ev) => handleColorPaletteInteraction(ev), e)}
        />
        {/* Color selector thumb - positioned absolutely */}
        <div
          ref={colorThumbRef}
          className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-md pointer-events-none"
          style={{ 
            left: position.x, 
            top: position.y,
            backgroundColor: selectedColor
          }}
        />
      </div>
      
      {/* Hue slider */}
      <div className="relative">
        <div 
          ref={hueSliderRef}
          className="relative w-full h-8 rounded-md cursor-pointer"
          style={{ 
            background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' 
          }}
          onMouseDown={(e) => startDrag((ev) => handleHueSliderInteraction(ev), e)}
          onTouchStart={(e) => startDrag((ev) => handleHueSliderInteraction(ev), e)}
        />
        {/* Hue slider thumb - positioned absolutely */}
        <div
          ref={hueThumbRef}
          className="absolute top-0 w-2 h-8 border-2 border-white -translate-x-1/2 shadow-md pointer-events-none"
          style={{ 
            left: (hue / 360) * 100 + '%',
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
    </div>
  );
};

// Color conversion utilities
const hexToRgb = (hex: string) => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Handle both 3-digit and 6-digit formats
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
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
