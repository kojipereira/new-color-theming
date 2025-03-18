import React from "react";
import Header from "./Header";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-[rgba(247,247,247,1)] overflow-hidden rounded-lg">
      <Header />
      <div className="bg-neutral-200 flex min-h-px w-full max-md:max-w-full" />
      <div className="flex w-full items-stretch flex-1 flex-wrap h-full max-md:max-w-full">
        <Canvas />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
