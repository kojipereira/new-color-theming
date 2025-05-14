
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { useThemeMode } from '@/hooks/useThemeMode';

const ThemeToggle: React.FC = () => {
  const { mode, toggleMode } = useThemeMode();
  
  return (
    <Toggle
      pressed={mode === 'dark'}
      onPressedChange={toggleMode}
      aria-label="Toggle dark mode"
      className="h-8 w-8 p-0"
    >
      {mode === 'dark' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
