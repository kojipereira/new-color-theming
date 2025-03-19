
import React from "react";
import { Plus } from "lucide-react";
import SettingsHeader from "./SettingsHeader";

interface CustomMenuSectionProps {
  onRemove?: () => void;
}

const CustomMenuSection: React.FC<CustomMenuSectionProps> = ({ onRemove }) => {
  return (
    <div className="bg-white w-full px-3 py-4 max-w-[280px] mb-2 rounded-md">
      <SettingsHeader title="Custom Menu" onRemove={onRemove} />
      
      <div className="space-y-6">
        <div className="border border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center">
          <button className="flex items-center gap-2 text-blue-600">
            <Plus size={16} />
            <span>Add menu item</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomMenuSection;
