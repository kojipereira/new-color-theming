
import React, { useState } from 'react';
import { ColorSelector } from './ColorSelector';
import { useColorStore } from '../../ColorStore';

const ColorPicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedColor, colorSlots, setSelectedColor } = useColorStore();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="px-3 py-2 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Theme Color</div>
        <button
          className="flex items-center space-x-1"
          onClick={handleToggle}
        >
          <div
            className="w-5 h-5 rounded border border-gray-300"
            style={{ backgroundColor: selectedColor }}
          ></div>
          <span className="text-xs text-gray-600">
            {isOpen ? "Close" : "Change"}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="mt-2 border rounded-md shadow-lg bg-white">
          <ColorSelector
            color={selectedColor}
            onChange={handleColorChange}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}

      <div className="mt-2 grid grid-cols-6 gap-1">
        {colorSlots.map((color, index) => (
          <div
            key={index}
            className="w-full aspect-square rounded-sm border border-gray-200"
            style={{ backgroundColor: color }}
            title={`Slot ${index + 1}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
