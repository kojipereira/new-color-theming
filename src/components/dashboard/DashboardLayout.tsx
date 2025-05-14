
import React from "react";
import DataTable from "./DataTable";
import TableControls from "./TableControls";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="md:flex-1">
        <DataTable />
      </div>
      <div className="mt-6 md:mt-0">
        <TableControls />
      </div>
    </div>
  );
};

export default DashboardLayout;
