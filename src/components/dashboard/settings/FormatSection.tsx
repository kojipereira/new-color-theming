import React from "react";
import { Minus } from "lucide-react";
const FormatSection = () => {
  return <div className="bg-white w-full p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">Format</h3>
        <button className="text-gray-700">
          <Minus size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col">
          <span className="text-gray-700 mb-2 text-sm">Empty cell display value</span>
          <span className="text-gray-500 text-sm">*Please add description</span>
        </div>
        
        <div className="h-px bg-gray-200 w-full my-4"></div>
      </div>
    </div>;
};
export default FormatSection;