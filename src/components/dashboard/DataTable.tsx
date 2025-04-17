
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import FormulaPanel from "./FormulaPanel";

interface ColumnFormula {
  isActive: boolean;
  formula: string;
}

const DataTable: React.FC = () => {
  const [formulaColumn, setFormulaColumn] = useState<ColumnFormula>({
    isActive: false,
    formula: ""
  });
  
  // Generate random values for each row based on the formula
  const generateRandomValue = () => {
    return (Math.random() * 100).toFixed(2);
  };
  
  return (
    <div className="bg-white border absolute z-0 flex min-h-[268px] w-[576px] max-w-full overflow-hidden text-[11px] text-neutral-900 font-normal leading-[1.2] h-[268px] rounded-lg border-[rgba(0,89,235,1)] border-solid left-6 top-[57px]">
      <div className="bg-[rgba(238,238,238,1)] overflow-hidden w-[195px]">
        <div className="border-neutral-200 flex w-full items-center gap-1 text-xs font-bold pl-5 pr-3 py-3 border-b-2">
          <div className="self-stretch flex items-center gap-1 my-auto">
            <div className="self-stretch gap-2.5 my-auto">Primary Account</div>
            <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/1d2d5e969d6289a867288e29f0b4f8e84d33496e?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto" alt="Sort" />
          </div>
        </div>
        {Array(8).fill(0).map((_, index) => <div key={`cell-1-${index}`} className="bg-[rgba(238,238,238,1)] border-neutral-200 min-h-7 w-full whitespace-nowrap pl-5 pr-3 border-b">
              142676
            </div>)}
      </div>
      <div className="bg-white w-[130px]">
        <div className="bg-[rgba(238,238,238,1)] border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold whitespace-nowrap text-right px-3 py-[13px] border-b-2">
          <div className="self-stretch flex items-center gap-1 my-auto">
            <div className="self-stretch gap-2.5 my-auto">Date</div>
          </div>
        </div>
        {Array(8).fill(0).map((_, index) => <div key={`cell-2-${index}`} className="bg-white border-neutral-200 min-h-7 w-full px-3 border-b">
              2021-09-26
            </div>)}
      </div>
      <div className="bg-white text-right w-[118px]">
        <div className="bg-[rgba(238,238,238,1)] border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold px-3 py-[13px] border-b-2">
          <div className="self-stretch flex items-center gap-1 my-auto">
            <div className="self-stretch gap-2.5 my-auto">Quantity</div>
          </div>
        </div>
        {Array(8).fill(0).map((_, index) => <div key={`cell-3-${index}`} className="bg-white border-neutral-200 min-h-7 w-full whitespace-nowrap px-3 border-b">
              {index === 3 || index === 7 ? "2" : "1"}
            </div>)}
      </div>
      <div className="bg-white w-[95px]">
        <div className="bg-[rgba(238,238,238,1)] border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold px-3 py-[13px] border-b-2">
          <div className="self-stretch flex items-center gap-1 my-auto">
            <div className="self-stretch gap-2.5 my-auto">Product</div>
          </div>
        </div>
        {Array(8).fill(0).map((_, index) => <div key={`cell-4-${index}`} className="bg-white border-neutral-200 min-h-7 w-full whitespace-nowrap px-3 border-b">
              Photography
            </div>)}
      </div>
      <div className="bg-white w-[93px]">
        <div className="bg-[rgba(238,238,238,1)] border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold px-3 py-[13px] border-b-2">
          <div className="self-stretch flex items-center gap-1 my-auto">
            <div className="self-stretch gap-2.5 my-auto">Calc</div>
          </div>
        </div>
        {Array(8).fill(0).map((_, index) => <div key={`cell-5-${index}`} className="bg-white border-neutral-200 min-h-7 w-full whitespace-nowrap px-3 border-b">
              {index === 3 ? "West" : index === 7 ? "East" : "Midwest"}
            </div>)}
      </div>
      <div className="bg-white w-[40px] border-l border-neutral-200">
        <div className="bg-[rgba(238,238,238,1)] border-neutral-200 flex min-h-10 w-full items-center justify-center text-xs font-bold px-3 py-[13px] border-b-2">
          <Popover>
            <PopoverTrigger>
              <Plus className="w-4 h-4 cursor-pointer text-blue-600 hover:text-blue-700" />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <FormulaPanel onClose={() => {
                setFormulaColumn({
                  isActive: true,
                  formula: "New Formula"
                });
              }} />
            </PopoverContent>
          </Popover>
        </div>
        {Array(8).fill(0).map((_, index) => (
          <div key={`cell-6-${index}`} className="bg-white border-neutral-200 min-h-7 w-full whitespace-nowrap px-3 border-b flex items-center justify-center">
            {formulaColumn.isActive ? generateRandomValue() : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
