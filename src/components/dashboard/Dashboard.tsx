import React from "react";
import Sidebar from "./Sidebar";
import DashboardLayout from "./DashboardLayout";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 h-full bg-sidebar border-r border-sidebar-border">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <DashboardLayout />
      </div>
    </div>
  );
};

export default Dashboard;
