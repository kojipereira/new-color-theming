
import React from 'react';
import { ColorPickerButton } from './ColorPickerButton';
import { ColorSlots } from './ColorSlots';

interface BaseColorPickerProps {
  title: string;
  color: string;
  colorSlots: string[];
  baseSlotIndex: number;
  hasContrastIssue: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onColorChange: (color: string) => void;
  contrastWarning?: string;
  contrastCheckIndex?: number;
}

export const BaseColorPicker: React.FC<BaseColorPickerProps> = ({
  title,
  color,
  colorSlots,
  baseSlotIndex,
  hasContrastIssue,
  isOpen,
  setIsOpen,
  onColorChange,
  contrastWarning = "Poor contrast ratio with black text on table color (Slot 3)",
  contrastCheckIndex = 2
}) => {
  return (
    <div>
      <div className="flex min-h-6 w-full items-center gap-2 px-2">
        <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
          {title}
        </div>
        
        <ColorPickerButton
          color={color}
          hasContrastIssue={hasContrastIssue}
          contrastWarning={contrastWarning}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onColorChange={onColorChange}
        />
      </div>
      
      <ColorSlots
        slots={colorSlots}
        baseIndex={baseSlotIndex}
        hasContrastIssue={hasContrastIssue}
        contrastCheckIndex={contrastCheckIndex}
      />
    </div>
  );
};
