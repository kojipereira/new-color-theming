
import React from 'react';
import { useColorInteraction } from './useColorInteraction';

interface ColorPaletteProps {
  colorPaletteRef: React.RefObject<HTMLDivElement>;
  position: { x: number; y: number };
  selectedColor: string;
  setPosition: (position: { x: number; y: number }) => void;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  colorPaletteRef,
  position,
  selectedColor,
  setPosition
}) => {
  const { startDrag } = useColorInteraction();
  
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
    
    // Calculate position
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    
    // Constrain to palette bounds (ensure we don't exceed the palette dimensions)
    x = Math.max(0, Math.min(rect.width, x));
    y = Math.max(0, Math.min(rect.height, y));
    
    // Update the position state to reflect the exact point clicked
    setPosition({ x, y });
  };
  
  return (
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
          backgroundColor: selectedColor
        }}
      />
    </div>
  );
};
