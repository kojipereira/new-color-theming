
import Dashboard from "@/components/dashboard/Dashboard";
import { PivotProvider } from "@/contexts/PivotContext";
import { 
  initialPivotRowItems, 
  initialPivotColumnItems, 
  initialValuesItems, 
  initialBaseColumnItems
} from "@/components/dashboard/sidebar/SidebarData";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <PivotProvider
        initialPivotRowItems={initialPivotRowItems}
        initialPivotColumnItems={initialPivotColumnItems}
        initialValuesItems={initialValuesItems}
        initialBaseColumnItems={initialBaseColumnItems}
      >
        <Dashboard />
      </PivotProvider>
    </div>
  );
};

export default Index;
