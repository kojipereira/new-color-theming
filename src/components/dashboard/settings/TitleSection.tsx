import React from "react";
import { Minus, MoreHorizontal } from "lucide-react";
const TitleSection = () => {
  return <div className="bg-white w-full p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">Title</h3>
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
        <div className="w-full border border-gray-300 rounded-md p-3">
          <span className="text-gray-400 text-sm">Input placeholder</span>
        </div>
        
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="bg-blue-100 w-24 h-10 flex items-center justify-center rounded-md">
              <span className="font-bold text-blue-600">B A |¶|</span>
            </div>
            <div className="w-24 h-10 flex items-center justify-center rounded-md border border-gray-300">
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