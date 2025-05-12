
import React from "react";
import DataTable from "./DataTable";

const Canvas: React.FC = () => {
  return (
    <div className="min-w-60 flex-1 overflow-hidden">
      <div className="bg-[rgba(247,247,247,1)] h-full w-full flex flex-col p-6 overflow-auto">
        <DataTable />
      </div>
    </div>
  );
};

export default Canvas;
