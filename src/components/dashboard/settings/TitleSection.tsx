import React from "react";
import { MoreHorizontal } from "lucide-react";
import SettingsHeader from "./SettingsHeader";
interface TitleSectionProps {
  onRemove?: () => void;
}
const TitleSection: React.FC<TitleSectionProps> = ({
  onRemove
}) => {
  return <div className="bg-white w-full px-3 py-4 max-w-[280px] mb-2">
      <SettingsHeader title="Title" onRemove={onRemove} />
      
      <div className="space-y-4 px-[8px]">
        <div className="w-full border border-gray-300 rounded-md p-3">
          <span className="text-gray-400 text-sm">Input placeholder</span>
        </div>
        
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="bg-blue-100 w-24 h-10 flex items-center justify-center rounded-md">
              <span className="font-bold text-blue-600">B A |¶|</span>
            </div>
            <div className="w-12 h-10 flex items-center justify-center rounded-md border border-gray-300">
              <span>≡ ≡ ≡</span>
            </div>
          </div>
          
          <div className="w-20 h-10 flex items-center justify-center rounded-md border border-gray-300">
            <span className="text-xs">12px ▼</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="text-gray-700 mr-4 text-xs">Color</span>
          <div className="w-20 h-10 flex items-center justify-between rounded-md border border-gray-300 px-2">
            <div className="w-6 h-6 bg-purple-600 rounded"></div>
            <span>▼</span>
          </div>
        </div>
      </div>
    </div>;
};
export default TitleSection;