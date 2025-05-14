
import React from "react";
import DataTable from "./DataTable";

const Canvas: React.FC = () => {
  return (
    <div className="min-w-60 flex-1 overflow-hidden">
      <div className="h-full w-full flex flex-col p-6 overflow-auto" style={{ background: "var(--background-color)" }}>
        <DataTable />
      </div>
    </div>
  );
};

export default Canvas;
