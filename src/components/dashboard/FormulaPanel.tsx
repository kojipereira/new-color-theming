
import React from "react";
import { Check, X, Settings } from "lucide-react";

const FormulaPanel = () => {
  return (
    <div className="w-[400px]">
      <div className="border-2 border-blue-600 rounded-lg p-3 flex items-center shadow-sm">
        <div className="bg-gray-100 text-gray-600 font-bold px-2 py-1 rounded mr-3">
          FX
        </div>
        <div className="flex-grow text-base">
          Sum(<span className="text-blue-600">[Profit (1)]</span>)
        </div>
        <div className="flex gap-3 ml-2">
          <Check className="w-5 h-5 text-green-600 cursor-pointer" />
          <X className="w-5 h-5 text-red-600 cursor-pointer" />
          <Settings className="w-5 h-5 text-blue-600 cursor-pointer" />
        </div>
      </div>
      
      <div className="mt-3 py-2 border-t border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">$</button>
            <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">%</button>
            <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">.0_</button>
            <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">.00</button>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>123</span>
              <span>▼</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>≡</span>
              <span>▼</span>
            </div>
            <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">|≠|</button>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>A</span>
              <span>▼</span>
            </div>
            <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">⌥</button>
          </div>
          <X className="w-5 h-5 text-gray-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default FormulaPanel;
