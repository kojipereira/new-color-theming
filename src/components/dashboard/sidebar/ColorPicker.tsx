
import React, { useState, useCallback } from "react";
import { Paintbrush, Circle } from "lucide-react";
import { generateColorSlots } from "@/lib/colors";
import { ColorSelector } from "./ColorSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState("#898989");
  const [colorSlots, setColorSlots] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = useCallback((newColor: string) => {
    setColor(newColor);
    const slots = generateColorSlots(newColor);
    setColorSlots(slots);
    
    // Apply the colors to the system
    document.documentElement.style.setProperty('--outline-color', slots[4]); // Slot 5 (index 4) for outlines
    document.documentElement.style.setProperty('--background-color', slots[2]); // Slot 3 (index 2) for backgrounds

    toast({
      title: "Color palette updated",
      description: "New color palette has been applied to the dashboard",
    });
  }, []);

  return (
    <div className="rounded-md bg-white w-full overflow-hidden py-4 mb-2 px-[8px]">
      <div className="flex min-h-6 w-full items-center gap-2 px-2">
        <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
          Color Theme
        </div>
        
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <div 
                className="w-5 h-5 rounded-full border border-gray-300" 
                style={{ background: color }}
              />
              <span className="sr-only">Open color picker</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] p-0" align="end">
            <ColorSelector color={color} onChange={handleColorChange} onClose={() => setIsOpen(false)} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {colorSlots.length > 0 && (
        <div className="mt-2 px-2">
          <div className="flex gap-1 overflow-x-auto py-1">
            {colorSlots.map((slotColor, index) => (
              <div 
                key={`color-slot-${index}`} 
                className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0"
                style={{ backgroundColor: slotColor }}
                title={`Slot ${index + 1}: ${slotColor}`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Outlines: Slot 5 • Background: Slot 3
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
