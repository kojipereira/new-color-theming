
import React from 'react';
import { ColorSelectorMain } from './color-selector/ColorSelectorMain';

interface ColorSelectorProps {
  color: string;
  onChange: (color: string) => void;
  onClose?: () => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ color, onChange, onClose }) => {
  return <ColorSelectorMain color={color} onChange={onChange} onClose={onClose} />;
};
