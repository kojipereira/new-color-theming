
import React from 'react';

interface ColorDisplayProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  onChange: (color: string) => void;
}

export const ColorDisplay: React.FC<ColorDisplayProps> = ({ 
  selectedColor, 
  setSelectedColor,
  onChange
}) => {
  return (
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
              // Validate if input is a valid hex color
              if (/^#[0-9A-F]{6}$/i.test(selectedColor)) {
                onChange(selectedColor);
              }
            }}
            className="px-2 h-8 w-full border border-gray-300 rounded text-sm"
          />
        </div>
      </div>
    </div>
  );
};
