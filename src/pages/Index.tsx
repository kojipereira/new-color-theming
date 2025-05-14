
import { useEffect } from "react";
import Dashboard from "@/components/dashboard/Dashboard";

const Index = () => {
  // Set initial highlight color on mount
  useEffect(() => {
    // Set default highlight color values
    document.documentElement.style.setProperty('--highlight-color', '#7E69AB'); // Default highlight
    document.documentElement.style.setProperty('--highlight-hover-color', '#6A5792'); // Slightly darker for hover
    document.documentElement.style.setProperty('--highlight-foreground-color', '#FFFFFF'); // White text on highlight
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard />
    </div>
  );
};

export default Index;
