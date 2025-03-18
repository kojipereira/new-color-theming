
import React, { useState } from "react";
import { Minus } from "lucide-react";
import { Input } from "@/components/ui/input";

const FormatSection = () => {
  const [emptyValue, setEmptyValue] = useState("");

  return (
    <div className="bg-white w-full p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Format</h3>
        <button className="text-gray-700">
          <Minus size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col">
          <span className="text-gray-700 mb-2">Empty cell display value</span>
          <Input 
            type="text"
            value={emptyValue}
            onChange={(e) => setEmptyValue(e.target.value)}
            placeholder="N/A"
            className="w-full border border-gray-300 rounded-md h-10"
          />
          <span className="text-gray-500 text-sm mt-1">Value displayed in empty cells</span>
        </div>
        
        <div className="h-px bg-gray-200 w-full my-4"></div>
      </div>
    </div>
  );
};

export default FormatSection;
