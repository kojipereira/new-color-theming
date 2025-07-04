import React from "react";
import SettingsHeader from "./SettingsHeader";
interface DescriptionSectionProps {
  onRemove?: () => void;
}
const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  onRemove
}) => {
  return <div className="bg-white w-full px-3 py-4 max-w-[280px] mb-2 rounded-md">
      <SettingsHeader title="Description" onRemove={onRemove} />
      
      <div className="space-y-4 px-[8px]">
        <div className="w-full border border-gray-300 rounded-md p-3 h-36 flex items-start">
          <span className="text-gray-400 text-sm">Textarea placeholder</span>
        </div>
        
        <div className="flex justify-end">
          <span className="text-gray-500 text-sm">## / ##</span>
        </div>
        
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="bg-blue-100 w-12 h-10 flex items-center justify-center rounded-md">
              <span className="font-bold text-blue-600">B</span>
            </div>
            <div className="w-12 h-10 flex items-center justify-center rounded-md border border-gray-300">
              <span className="font-bold underline">A</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="w-12 h-10 flex items-center justify-center rounded-md border border-gray-300">
              <span className="text-sm">14 ▼</span>
            </div>
            <div className="w-18 h-10 flex items-center justify-center border border-gray-300 rounded-sm">
              <span className="text-sm">Auto ▼</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default DescriptionSection;