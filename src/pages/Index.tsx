import { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { generateColorSlots } from "@/lib/colors";

const Index = () => {
  const [initialized, setInitialized] = useState(false);

  // Set initial highlight color on mount
  useEffect(() => {
    if (!initialized) {
      // Use white as the base color
      const baseColor = "#ffffff";
      const colorSlots = generateColorSlots(baseColor);
      
      // Set default highlight color values (keep the purple highlight)
      document.documentElement.style.setProperty('--highlight-color', '#7E69AB'); // Default highlight
      document.documentElement.style.setProperty('--highlight-hover-color', '#6A5792'); // Slightly darker for hover
      document.documentElement.style.setProperty('--highlight-foreground-color', '#FFFFFF'); // White text on highlight
      
      // Set the background colors based on generated color slots from white
      document.documentElement.style.setProperty('--background-color', colorSlots[1]); // Use slot 1 for background
      document.documentElement.style.setProperty('--card-color', colorSlots[0]); // Use slot 0 for cards
      document.documentElement.style.setProperty('--table-color', colorSlots[2]); // Use slot 2 for tables
      document.documentElement.style.setProperty('--outline-color', colorSlots[4]); // Use slot 4 for outlines
      
      setInitialized(true);
    }
  }, [initialized]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard />
    </div>
  );
};

export default Index;
