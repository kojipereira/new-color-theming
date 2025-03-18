import React from "react";
import { Minus, Plus } from "lucide-react";
const CustomMenuSection = () => {
  return <div className="bg-white w-full p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">Custom Menu</h3>
        <button className="text-gray-700">
          <Minus size={20} />
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="border border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center">
          <button className="flex items-center gap-2 text-blue-600">
            <Plus size={16} />
            <span>Add menu item</span>
          </button>
        </div>
      </div>
    </div>;
};
export default CustomMenuSection;