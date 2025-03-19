
import React from "react";
import { Minus } from "lucide-react";

interface SettingsHeaderProps {
  title: string;
  onRemove?: () => void;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ title, onRemove }) => {
  return (
    <div className="flex justify-between items-center mb-3 px-2">
      <h3 className="text-sm font-semibold">{title}</h3>
      {onRemove && (
        <div 
          className="rounded hover:bg-gray-100 p-1 cursor-pointer transition-colors"
          onClick={onRemove}
          title="Remove section"
        >
          <Minus className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default SettingsHeader;
