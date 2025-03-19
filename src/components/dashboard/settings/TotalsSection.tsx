import React from "react";
import { Switch } from "@/components/ui/switch";
import SettingsHeader from "./SettingsHeader";
interface TotalsSectionProps {
  onRemove?: () => void;
}
const StylingButtons = () => <div className="flex gap-2">
    <div className="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-md">
      <span className="font-bold text-blue-600">B</span>
    </div>
    <div className="w-8 h-8 flex items-center justify-center rounded-md">
      <span className="font-bold underline">A</span>
    </div>
    <div className="w-8 h-8 flex items-center justify-center rounded-md">
      <span className="font-bold">⟲</span>
    </div>
  </div>;
const TotalsSection: React.FC<TotalsSectionProps> = ({
  onRemove
}) => {
  return <div className="bg-white w-full px-3 py-4 max-w-[280px] mb-2">
      <SettingsHeader title="Totals" onRemove={onRemove} />
      
      <div className="space-y-6 mx-[8px]">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-xs">Subtotals</span>
          <Switch />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-xs">Styling</span>
          <StylingButtons />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-sm">Grand Totals</span>
          <Switch />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-xs">Styling</span>
          <StylingButtons />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-xs">Position</span>
          <div className="flex gap-2 items-center">
            <span className="text-xs">Last</span>
            <span className="text-gray-500">▼</span>
          </div>
        </div>
      </div>
    </div>;
};
export default TotalsSection;