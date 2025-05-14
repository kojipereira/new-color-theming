
import React from 'react';
import { ColorDisplay } from './ColorDisplay';
import { ColorPalette } from './ColorPalette';
import { HueSlider } from './HueSlider';
import { ColorUtils } from '@/lib/colorUtils';

interface ColorSelectorProps {
  color: string;
  onChange: (color: string) => void;
  onClose?: () => void;
}

export const ColorSelectorMain: React.FC<ColorSelectorProps> = ({ color, onChange, onClose }) => {
  const [hue, setHue] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState(color);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  
  const colorPaletteRef = React.useRef<HTMLDivElement>(null);
  const isInitialRender = React.useRef(true);

  // Convert hex to HSL to initialize the picker - only on mount or color prop change
  React.useEffect(() => {
    const rgb = ColorUtils.hexToRgb(color);
    if (!rgb) return;
    
    const hslColor = ColorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHue(hslColor.h * 360);
    setSelectedColor(color);
    
    if (colorPaletteRef.current) {
      const width = colorPaletteRef.current.clientWidth;
      const height = colorPaletteRef.current.clientHeight;
      
      setPosition({
        x: width * hslColor.s,
        y: height * (1 - hslColor.l)
      });
    }
  }, [color]);

  // Update color palette gradient based on selected hue
  React.useEffect(() => {
    if (colorPaletteRef.current) {
      colorPaletteRef.current.style.background = 
        `linear-gradient(to top, #000, transparent), 
         linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`;
    }
  }, [hue]);
    
  // Update the selected color when hue or position changes
  React.useEffect(() => {
    if (!colorPaletteRef.current || isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    
    const rect = colorPaletteRef.current.getBoundingClientRect();
    const saturation = position.x / rect.width;
    const lightness = 1 - (position.y / rect.height);
    
    // Convert HSL to hex
    const rgb = ColorUtils.hslToRgb(hue / 360, saturation, lightness);
    const hex = ColorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
    
    setSelectedColor(hex);
    // Re-enable live preview so colors change as user drags
    onChange(hex);
  }, [hue, position, onChange]);

  // Handle apply button click
  const handleApply = () => {
    onChange(selectedColor);
    if (onClose) onClose();
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Color display and hex input */}
      <ColorDisplay 
        selectedColor={selectedColor} 
        setSelectedColor={setSelectedColor} 
        onChange={onChange} 
      />
      
      {/* Color palette */}
      <ColorPalette
        colorPaletteRef={colorPaletteRef}
        position={position}
        selectedColor={selectedColor}
        setPosition={setPosition}
      />
      
      {/* Hue slider */}
      <HueSlider 
        hue={hue}
        setHue={setHue}
      />
      
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
