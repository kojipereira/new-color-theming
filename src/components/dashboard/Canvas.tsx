import React from "react";
import DataTable from "./DataTable";
import Chart from "./Chart";

const Canvas: React.FC = () => {
  return (
    <div className="min-w-60 flex-1 shrink basis-[0%] max-md:max-w-full">
      <div className="bg-[rgba(247,247,247,1)] relative flex min-h-[933px] w-full flex-col overflow-hidden pb-8 max-md:max-w-full">
        <DataTable />
        <Chart />
      </div>
    </div>
  );
};

export default Canvas;
