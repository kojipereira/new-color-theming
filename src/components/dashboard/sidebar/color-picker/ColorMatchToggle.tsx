
import React from 'react';
import { Switch } from "@/components/ui/switch";

interface ColorMatchToggleProps {
  colorMatch: boolean;
  setColorMatch: (checked: boolean) => void;
}

export const ColorMatchToggle: React.FC<ColorMatchToggleProps> = ({
  colorMatch,
  setColorMatch
}) => {
  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <span className="text-sm text-neutral-900 font-medium">Color Match</span>
      <Switch 
        checked={colorMatch}
        onCheckedChange={setColorMatch}
        className="data-[state=checked]:bg-highlight"
      />
    </div>
  );
};
