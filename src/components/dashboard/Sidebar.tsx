
import React from "react";
import SidebarMain from "./sidebar/SidebarMain";
import { PivotProvider } from "@/contexts/PivotContext";
import { 
  initialPivotRowItems, 
  initialPivotColumnItems, 
  initialValuesItems, 
  initialBaseColumnItems
} from "./sidebar/SidebarData";

const Sidebar: React.FC = () => {
  return (
    <PivotProvider
      initialPivotRowItems={initialPivotRowItems}
      initialPivotColumnItems={initialPivotColumnItems}
      initialValuesItems={initialValuesItems}
      initialBaseColumnItems={initialBaseColumnItems}
    >
      <SidebarMain />
    </PivotProvider>
  );
};

export default Sidebar;
