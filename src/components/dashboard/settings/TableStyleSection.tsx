import React from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch";
const TableStyleSection = () => {
  return <div className="bg-white w-full p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">Table Style</h3>
        <button className="text-gray-700">
          <Plus size={20} />
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className=" text-ellipsis text-xs font-normal leading-none self-stretch flex-1 shrink basis-[0%] my-auto">Style preset</span>
          <div className="flex gap-2 items-center">
            <span className=" text-ellipsis text-xs font-normal leading-none self-stretch flex-1 shrink basis-[0%] my-auto">Spreadsheet</span>
            <span className="text-gray-500">▼</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className=" text-ellipsis text-xs font-normal leading-none self-stretch flex-1 shrink basis-[0%] my-auto">Cell spacing</span>
          <div className="flex gap-2 items-center">
            <span>Extra small</span>
            <span className="text-gray-500">▼</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className=" text-ellipsis text-xs font-normal leading-none self-stretch flex-1 shrink basis-[0%] my-auto">Grid lines</span>
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
        
        <div className=" text-ellipsis text-xs font-normal leading-none self-stretch flex-1 shrink basis-[0%] my-auto">
          <span className="text-gray-700">Show banding</span>
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
            <p className="font-bold text-gray-800">Header styling</p>
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
            <p className="font-bold text-gray-800">Cell styling</p>
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
            <p className="font-bold text-gray-800">Cell styling</p>
            <p className="text-gray-500 text-sm">default</p>
          </div>
          <MoreHorizontal size={20} className="text-gray-500" />
        </div>
      </div>
    </div>;
};
export default TableStyleSection;