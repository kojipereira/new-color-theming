
import React from "react";
import { Check, X, Settings } from "lucide-react";

const FormulaEditor: React.FC = () => {
  return (
    <div className="bg-white w-[600px] p-4 rounded-lg shadow-lg border border-neutral-200">
      <div className="flex items-center h-12 border border-neutral-200 rounded mb-3 overflow-hidden">
        <div className="flex items-center justify-center w-12 h-full bg-neutral-50 border-r border-neutral-200 font-bold text-neutral-600">
          fx
        </div>
        <input 
          type="text" 
          defaultValue="Sum([Profit (1)])" 
          className="flex-1 h-full px-3 text-sm outline-none"
        />
        <div className="flex items-center gap-1 px-2">
          <button className="p-1.5 hover:bg-neutral-100 rounded-sm text-emerald-600">
            <Check className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-neutral-100 rounded-sm text-red-600">
            <X className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-neutral-100 rounded-sm text-blue-600">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center h-10 border border-neutral-200 rounded text-sm">
        <button className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50">$</button>
        <button className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50">%</button>
        <button className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50">.0</button>
        <button className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50">.00</button>
        <button className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50 flex items-center gap-1">
          123 <span className="text-xs">▾</span>
        </button>
        <button className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50 flex items-center gap-1">
          ≡ <span className="text-xs">▾</span>
        </button>
        <button className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50">|ƒ|</button>
        <button className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50 flex items-center gap-1">
          A <span className="text-xs">▾</span>
        </button>
        <button className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50">⚲</button>
        <button className="h-full px-3 ml-auto hover:bg-neutral-50">×</button>
      </div>
    </div>
  );
};

export default FormulaEditor;
