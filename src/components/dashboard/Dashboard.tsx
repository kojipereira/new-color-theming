
import React from "react";
import Header from "./Header";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-[rgba(247,247,247,1)] overflow-hidden rounded-lg flex flex-col h-screen">
      <Header />
      <div className="bg-neutral-200 w-full h-px" />
      <div className="flex flex-1 overflow-hidden">
        <Canvas />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
