
import React from "react";
import SidebarMain from "./sidebar/SidebarMain";
import SidebarHeader from "./sidebar/SidebarHeader";

const Sidebar: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <SidebarHeader />
      <div className="flex-1 overflow-hidden">
        <SidebarMain />
      </div>
    </div>
  );
};

export default Sidebar;
