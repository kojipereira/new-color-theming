import React from "react";
import SettingsHeader from "./SettingsHeader";
interface FormatSectionProps {
  onRemove?: () => void;
}
const FormatSection: React.FC<FormatSectionProps> = ({
  onRemove
}) => {
  return <div className="bg-white w-full px-3 py-4 max-w-[280px] mb-2 rounded-md">
      <SettingsHeader title="Format" onRemove={onRemove} />
      
      <div className="space-y-4">
        <div className="flex flex-col mx-[8px]">
          <span className="text-gray-700 mb-2 text-sm">Empty cell display value</span>
          <span className="text-gray-500 text-sm">*Please add description</span>
        </div>
        
        <div className="h-px bg-gray-200 w-full my-4"></div>
      </div>
    </div>;
};
export default FormatSection;