
import { useEffect } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { generateColorSlots } from "@/lib/colors";

const Index = () => {
  // Set initial highlight color and base color on mount
  useEffect(() => {
    // Set default highlight color values
    document.documentElement.style.setProperty('--highlight-color', '#7E69AB'); // Default highlight
    document.documentElement.style.setProperty('--highlight-hover-color', '#6A5792'); // Slightly darker for hover
    document.documentElement.style.setProperty('--highlight-foreground-color', '#FFFFFF'); // White text on highlight
    
    // Set initial base color to white (#ffffff) and generate palette
    const baseColor = '#ffffff';
    const colorSlots = generateColorSlots(baseColor);
    
    document.documentElement.style.setProperty('--background-color', colorSlots[1]); // Use slot 1 for background
    document.documentElement.style.setProperty('--card-color', colorSlots[0]); // Use slot 0 for cards
    document.documentElement.style.setProperty('--table-color', colorSlots[1]); // Use slot 1 for tables
    document.documentElement.style.setProperty('--outline-color', colorSlots[2]); // Use slot 2 for outlines
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard />
    </div>
  );
};

export default Index;
