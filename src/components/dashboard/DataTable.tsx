
import React, { useState, useRef, useEffect } from "react";
import { Plus, Pencil, Save } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FormulaPanel from "./FormulaPanel";
import SearchInput from "./SearchInput";
import FilterInterface from "./FilterInterface";

interface ColumnFormula {
  isActive: boolean;
  formula: string;
}

const DataTable: React.FC = () => {
  const [formulaColumn, setFormulaColumn] = useState<ColumnFormula>({
    isActive: false,
    formula: ""
  });
  const [title, setTitle] = useState<string>("Order details by order number");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  const generateRandomValue = () => {
    return (Math.random() * 100).toFixed(2);
  };
  
  const handleCalcClick = () => {
    setFormulaColumn({
      isActive: true,
      formula: "SUM([Quantity]) * AVERAGE([Product]) BY [Calc]"
    });
  };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    // Auto save happens here (already saved to state)
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleAddTitleClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  // CSS styles for table elements using CSS variables
  const headerBgStyle = { background: "var(--table-color)" };
  const leftColumnStyle = { background: "var(--table-color)" };

  return (
    <>
      <SearchInput 
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search orders..."
      />
      
      <Card className="w-[600px] shadow-sm">
        <CardHeader className={`${title ? 'pb-2' : isHovering ? 'pb-2' : 'p-0'}`}>
          {isEditing ? (
            <input
              ref={titleInputRef}
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              className="text-xl font-medium bg-transparent border border-neutral-200 rounded outline-none w-full focus:ring-0 px-2 py-0.5"
              autoFocus
              placeholder="Enter title here"
            />
          ) : (
            <>
              {title ? (
                <div 
                  onClick={handleTitleClick} 
                  className="cursor-text" 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <CardTitle className="text-xl font-medium">{title}</CardTitle>
                </div>
              ) : (
                <div 
                  className="cursor-text absolute top-0 left-0 right-0 z-10" 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {isHovering && (
                    <div className="flex items-center gap-2 py-2 px-4">
                      <button onClick={handleAddTitleClick} className="flex items-center gap-1 text-neutral-500 hover:text-blue-600">
                        <Plus className="w-4 h-4" />
                        <span className="text-xl font-medium text-neutral-400">Enter title here</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </CardHeader>
        <CardContent className="p-0 relative">
          <div className="flex min-h-[268px] w-full overflow-hidden text-[11px] text-neutral-900 font-normal leading-[1.2]">
            <div style={leftColumnStyle} className="overflow-hidden w-[195px]">
              <div style={headerBgStyle} className="border-neutral-200 flex w-full items-center gap-1 text-xs font-bold pl-5 pr-3 py-3 border-b-2">
                <div className="self-stretch flex items-center gap-1 my-auto">
                  <div className="self-stretch gap-2.5 my-auto">Primary Account</div>
                  <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/1d2d5e969d6289a867288e29f0b4f8e84d33496e?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto" alt="Sort" />
                </div>
              </div>
              {Array(8).fill(0).map((_, index) => <div key={`cell-1-${index}`} style={leftColumnStyle} className="border-neutral-200 min-h-7 w-full whitespace-nowrap pl-5 pr-3 border-b">
                    142676
                  </div>)}
            </div>
            <div className="bg-white w-[130px]">
              <div style={headerBgStyle} className="border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold whitespace-nowrap text-right px-3 py-[13px] border-b-2">
                <div className="self-stretch flex items-center gap-1 my-auto">
                  <div className="self-stretch gap-2.5 my-auto">Date</div>
                </div>
              </div>
              {Array(8).fill(0).map((_, index) => <div key={`cell-2-${index}`} className="bg-white border-neutral-200 min-h-7 w-full px-3 border-b">
                    2021-09-26
                  </div>)}
            </div>
            <div className="bg-white text-right w-[118px]">
              <div style={headerBgStyle} className="border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold px-3 py-[13px] border-b-2">
                <div className="self-stretch flex items-center gap-1 my-auto">
                  <div className="self-stretch gap-2.5 my-auto">Quantity</div>
                </div>
              </div>
              {Array(8).fill(0).map((_, index) => <div key={`cell-3-${index}`} className="bg-white border-neutral-200 min-h-7 w-full whitespace-nowrap px-3 border-b">
                    {index === 3 || index === 7 ? "2" : "1"}
                  </div>)}
            </div>
            <div className="bg-white w-[95px]">
              <div style={headerBgStyle} className="border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold px-3 py-[13px] border-b-2">
                <div className="self-stretch flex items-center gap-1 my-auto">
                  <div className="self-stretch gap-2.5 my-auto">Product</div>
                </div>
              </div>
              {Array(8).fill(0).map((_, index) => <div key={`cell-4-${index}`} className="bg-white border-neutral-200 min-h-7 w-full whitespace-nowrap px-3 border-b">
                    Photography
                  </div>)}
            </div>
            <div className="bg-white w-[93px]">
              <div style={headerBgStyle} className="border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold px-3 py-[13px] border-b-2">
                <div className="self-stretch flex items-center gap-1 my-auto">
                  <Popover>
                    <PopoverTrigger>
                      <div className="self-stretch gap-2.5 my-auto cursor-pointer hover:text-blue-600">Calc</div>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-auto p-0">
                      <FormulaPanel onClose={handleCalcClick} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {Array(8).fill(0).map((_, index) => <div key={`cell-5-${index}`} className="bg-white border-neutral-200 min-h-7 w-full whitespace-nowrap px-3 border-b">
                    {index === 3 ? "West" : index === 7 ? "East" : "Midwest"}
                  </div>)}
            </div>
            <div className="bg-white w-[40px] border-l border-neutral-200">
              <div style={headerBgStyle} className="border-neutral-200 flex min-h-10 w-full items-center justify-center text-xs font-bold px-3 py-[13px] border-b-2">
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
              {Array(8).fill(0).map((_, index) => <div key={`cell-6-${index}`} className="bg-white border-neutral-200 min-h-7 w-full whitespace-nowrap px-3 border-b flex items-center justify-center">
                  {formulaColumn.isActive ? generateRandomValue() : ''}
                </div>)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add FilterInterface below the table */}
      <FilterInterface />
    </>
  );
};

export default DataTable;
