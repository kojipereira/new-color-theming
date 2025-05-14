
import React, { useRef } from 'react';
import { useColorInteraction } from './useColorInteraction';

interface HueSliderProps {
  hue: number;
  setHue: (hue: number) => void;
}

export const HueSlider: React.FC<HueSliderProps> = ({ hue, setHue }) => {
  const hueSliderRef = useRef<HTMLDivElement>(null);
  const { startDrag } = useColorInteraction();
  
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
    let x = clientX - rect.left;
    
    // Constrain to slider bounds
    x = Math.max(0, Math.min(rect.width, x));
    
    // Calculate hue from position
    const newHue = (x / rect.width) * 360;
    setHue(newHue);
  };
  
  return (
    <div 
      ref={hueSliderRef}
      className="relative w-full h-8 rounded-md cursor-pointer"
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
  );
};
