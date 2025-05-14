
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeMode } from "@/hooks/useThemeMode";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeMode();
  
  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <span className="text-sm text-neutral-900 font-medium dark:text-neutral-200">Dark Mode</span>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme} 
        className="h-8 w-8 p-0"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-amber-300" />
        ) : (
          <Moon className="h-5 w-5 text-neutral-500" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default ThemeToggle;
