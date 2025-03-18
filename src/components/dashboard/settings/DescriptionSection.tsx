import React from "react";
import { Minus, MoreHorizontal } from "lucide-react";
const DescriptionSection = () => {
  return <div className="bg-white w-full p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">Description</h3>
        <div className="flex gap-2">
          <button className="text-gray-700">
            <MoreHorizontal size={20} />
          </button>
          <button className="text-gray-700">
            <Minus size={20} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="w-full border border-gray-300 rounded-md p-3 h-36 flex items-start">
          <span className="text-gray-400">Textarea placeholder</span>
        </div>
        
        <div className="flex justify-end">
          <span className="text-gray-500 text-sm">## / ##</span>
        </div>
        
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="bg-blue-100 w-16 h-10 flex items-center justify-center rounded-md">
              <span className="font-bold text-blue-600">B</span>
            </div>
            <div className="w-16 h-10 flex items-center justify-center rounded-md border border-gray-300">
              <span className="font-bold underline">A</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="w-20 h-10 flex items-center justify-center rounded-md border border-gray-300">
              <span>14 ▼</span>
            </div>
            <div className="w-20 h-10 flex items-center justify-center rounded-md border border-gray-300">
              <span>Auto ▼</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default DescriptionSection;