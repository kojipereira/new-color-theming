import React from "react";
import { Switch } from "@/components/ui/switch";
import { Minus } from "lucide-react";
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
const TotalsSection = () => {
  return <div className="bg-white w-full p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">Totals</h3>
        <button className="text-gray-700">
          <Minus size={20} />
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Subtotals</span>
          <Switch />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Styling</span>
          <StylingButtons />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Grand Totals</span>
          <Switch />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Styling</span>
          <StylingButtons />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Position</span>
          <div className="flex gap-2 items-center">
            <span>Last</span>
            <span className="text-gray-500">▼</span>
          </div>
        </div>
      </div>
    </div>;
};
export default TotalsSection;