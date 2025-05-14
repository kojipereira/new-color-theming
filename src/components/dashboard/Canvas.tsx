
import React from "react";
import DataTable from "./DataTable";
import { useColorStore } from "../ColorStore";

const Canvas: React.FC = () => {
  const { colorSlots } = useColorStore();
  const backgroundColor = colorSlots[2]; // Slot 3 (index 2)
  
  return (
    <div className="min-w-60 flex-1 overflow-hidden">
      <div 
        className="h-full w-full flex flex-col p-6 overflow-auto"
        style={{ backgroundColor }}
      >
        <DataTable />
      </div>
    </div>
  );
};

export default Canvas;
