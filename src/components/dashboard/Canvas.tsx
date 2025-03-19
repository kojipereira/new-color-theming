
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { usePivotContext } from "@/contexts/PivotContext";

const Canvas: React.FC = () => {
  const { pivotRowItems, pivotColumnItems, valuesItems, processedData } = usePivotContext();
  const [updateCounter, setUpdateCounter] = useState(0);
  
  // Force re-render when pivot configuration changes
  useEffect(() => {
    setUpdateCounter(prev => prev + 1);
  }, [pivotRowItems, pivotColumnItems, valuesItems, processedData]);
  
  return (
    <div className="min-w-60 flex-1 overflow-hidden">
      <div className="bg-[rgba(247,247,247,1)] h-full w-full flex flex-col overflow-auto">
        <DataTable key={updateCounter} />
      </div>
    </div>
  );
};

export default Canvas;
