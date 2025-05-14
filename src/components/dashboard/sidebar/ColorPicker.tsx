
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Triangle } from "lucide-react";
import { ColorSelector } from "./ColorSelector";
import { baseColors, generateColorSlots } from "@/lib/colors";

const ColorPicker: React.FC = () => {
  const { toast } = useToast();
  const [currentColor, setCurrentColor] = useState(baseColors[0]);
  const [colorSlots, setColorSlots] = useState<string[]>([]);
  const [poorContrast, setPoorContrast] = useState(false);

  useEffect(() => {
    // Initialize colors on first load
    handleColorChange(currentColor);
  }, []);

  const handleColorChange = (hexColor: string) => {
    setCurrentColor(hexColor);
    const slots = generateColorSlots(hexColor);
    setColorSlots(slots);
    
    // Apply the colors to the system using the appropriate slots
    document.documentElement.style.setProperty('--card-color', slots[0]);
    document.documentElement.style.setProperty('--background-color', slots[1]);
    document.documentElement.style.setProperty('--table-color', slots[2]);
    document.documentElement.style.setProperty('--outline-color', slots[4]);

    toast({
      title: "Color palette updated",
      description: "Your dashboard's color theme has been updated.",
    });
    
    // Basic contrast check - could be improved with proper WCAG calculations
    setPoorContrast(false);
  };

  return (
    <div className="rounded-md bg-white w-full mb-2 px-[8px] py-4">
      <div className="flex min-h-6 w-full items-center gap-2 px-2 mb-2">
        <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
          Dashboard Theme
          {poorContrast && (
            <div className="ml-2 inline-block">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="text-amber-500 inline-flex items-center">
                      <Triangle className="h-4 w-4 fill-current" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Poor contrast ratio with black text on table color</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>
      
      <Separator className="my-3" />
      
      <div className="px-2">
        <ColorSelector 
          colors={baseColors}
          selectedColor={currentColor}
          onColorChange={handleColorChange}
        />
      </div>
      
      {colorSlots.length > 0 && (
        <div className="mt-3 px-2">
          <p className="text-xs text-neutral-500 mb-2">Generated Color Palette:</p>
          <div className="flex gap-2">
            {colorSlots.map((color, index) => (
              <div 
                key={index}
                className="h-5 w-5 rounded-full border border-neutral-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
