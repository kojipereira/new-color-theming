import React from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SettingsHeader from "./SettingsHeader";
interface TableStyleSectionProps {
  onRemove?: () => void;
}
const TableStyleSection: React.FC<TableStyleSectionProps> = ({
  onRemove
}) => {
  return <div className="bg-white w-full px-3 py-4 max-w-[280px] mb-2 rounded-md">
      <SettingsHeader title="Table Style" onRemove={onRemove} />
      
      <div className="space-y-6 px-[8px]">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-xs">Style preset</span>
          <div className="flex gap-2 items-center">
            <span className="text-xs">Spreadsheet</span>
            <span className="text-gray-500">▼</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-xs">Cell spacing</span>
          <div className="flex gap-2 items-center">
            <span className="text-xs">Extra small</span>
            <span className="text-gray-500">▼</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-xs">Grid lines</span>
          <div className="flex gap-2">
            <div className="border border-blue-500 bg-blue-50 w-8 h-8 flex items-center justify-center rounded-md">
              <span className="text-blue-500 text-lg">⫶</span>
            </div>
            <div className="border border-gray-300 w-8 h-8 flex items-center justify-center rounded-md">
              <span className="text-gray-500 text-lg">⫶</span>
            </div>
            <div className="border border-gray-300 w-8 h-8 flex items-center justify-center rounded-md">
              <span className="text-gray-500 text-lg">⫶</span>
            </div>
            <div className="border border-gray-300 w-8 h-8 flex items-center justify-center rounded-md">
              <span className="text-gray-500 text-lg">⫶</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-xs">Show banding</span>
          <Switch />
        </div>
        
        <div className="h-px border-dotted border-t border-gray-200 w-full my-4"></div>
        
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 p-2 rounded-md">
            <div className="w-6 h-6 relative">
              <div className="absolute w-6 h-2 border border-black top-0"></div>
              <div className="absolute w-2 h-4 border border-black bottom-0 left-0"></div>
              <div className="absolute w-1 h-1 bg-blue-500 rounded-full bottom-0 left-0"></div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-bold text-sm">Header styling</p>
            <p className="text-gray-500 text-sm">custom</p>
          </div>
          <MoreHorizontal size={20} className="text-gray-500" />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 p-2 rounded-md">
            <div className="w-6 h-6 grid grid-cols-2 grid-rows-2 gap-0.5">
              <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-800 text-sm">Cell styling</p>
            <p className="text-gray-500 text-sm">default</p>
          </div>
          <MoreHorizontal size={20} className="text-gray-500" />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 p-2 rounded-md">
            <div className="w-6 h-6 grid grid-cols-2 grid-rows-2 gap-0.5">
              <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-800 text-sm">Cell styling</p>
            <p className="text-gray-500 text-sm">default</p>
          </div>
          <MoreHorizontal size={20} className="text-gray-500" />
        </div>
      </div>
    </div>;
};
export default TableStyleSection;