import React from "react";
import { Minus } from "lucide-react";
const ElementStyleSection = () => {
  return <div className="bg-white w-full p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">Element Style</h3>
        <button className="text-gray-700">
          <Minus size={20} />
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs">Border</span>
          <div className="flex gap-2">
            <div className="border border-gray-300 w-8 h-8 flex items-center justify-center rounded-md">
              <span className="text-gray-700">□</span>
            </div>
            <div className="border border-gray-300 w-8 h-8 flex items-center justify-center rounded-md">
              <span className="text-gray-700">◯</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-normal text-xs">Shadow</span>
          <div className="flex gap-2">
            <div className="border border-gray-300 w-8 h-8 flex items-center justify-center rounded-md">
              <span className="text-gray-700">⬒</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-xs">Width</span>
          <div className="w-20 h-8 flex items-center justify-between rounded-md border border-gray-300 px-2">
            <span className="text-xs">Auto</span>
            <span className="text-gray-500">▼</span>
          </div>
        </div>
      </div>
    </div>;
};
export default ElementStyleSection;