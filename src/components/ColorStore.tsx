
import { create } from "zustand";
import { generateColorSlots } from "@/lib/colors";

interface ColorState {
  selectedColor: string;
  colorSlots: string[];
  setSelectedColor: (color: string) => void;
}

// Initialize with a default color
const defaultColor = "#9b87f5"; // Primary Purple

export const useColorStore = create<ColorState>((set) => ({
  selectedColor: defaultColor,
  colorSlots: generateColorSlots(defaultColor),
  setSelectedColor: (color: string) => {
    set({ 
      selectedColor: color,
      colorSlots: generateColorSlots(color)
    });
  }
}));
