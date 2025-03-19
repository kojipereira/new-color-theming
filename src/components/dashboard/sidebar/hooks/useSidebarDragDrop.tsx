
import { SidebarItem } from "./useSidebarState";

export interface UseSidebarDragDropProps {
  setPivotRowItems: React.Dispatch<React.SetStateAction<SidebarItem[]>>;
  setPivotColumnItems: React.Dispatch<React.SetStateAction<SidebarItem[]>>;
  setValuesItems: React.Dispatch<React.SetStateAction<SidebarItem[]>>;
  setBaseColumnItems: React.Dispatch<React.SetStateAction<SidebarItem[]>>;
  pivotRowItems: SidebarItem[];
  pivotColumnItems: SidebarItem[];
  valuesItems: SidebarItem[];
  baseColumnItems: SidebarItem[];
}

export const useSidebarDragDrop = ({
  setPivotRowItems,
  setPivotColumnItems,
  setValuesItems,
  setBaseColumnItems,
  pivotRowItems,
  pivotColumnItems,
  valuesItems,
  baseColumnItems
}: UseSidebarDragDropProps) => {
  // Function to handle drag and drop
  const handleDragStart = (e: React.DragEvent, item: SidebarItem) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  // Function to handle drag start from a specific section
  const handleSectionDragStart = (e: React.DragEvent, item: SidebarItem, index: number, section: string) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
    e.dataTransfer.setData("sourceSection", section);
    e.dataTransfer.setData("sourceIndex", index.toString());
  };

  const handleDrop = (e: React.DragEvent, targetSection: string) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("item"));
    const sourceSection = e.dataTransfer.getData("sourceSection");
    const sourceIndex = e.dataTransfer.getData("sourceIndex");
    
    // Handle removing from source section if it came from a draggable section
    if (sourceSection) {
      if (sourceSection === "pivotRows" && sourceSection !== targetSection) {
        const newItems = [...pivotRowItems];
        newItems.splice(parseInt(sourceIndex), 1);
        setPivotRowItems(newItems);
      } else if (sourceSection === "pivotColumns" && sourceSection !== targetSection) {
        const newItems = [...pivotColumnItems];
        newItems.splice(parseInt(sourceIndex), 1);
        setPivotColumnItems(newItems);
      } else if (sourceSection === "values" && sourceSection !== targetSection) {
        const newItems = [...valuesItems];
        newItems.splice(parseInt(sourceIndex), 1);
        setValuesItems(newItems);
      }
    }
    
    // Add the dragged item to the appropriate section
    switch (targetSection) {
      case "pivotRows":
        setPivotRowItems([...pivotRowItems, item]);
        break;
      case "pivotColumns":
        setPivotColumnItems([...pivotColumnItems, item]);
        break;
      case "values":
        setValuesItems([...valuesItems, item]);
        break;
      case "baseColumns":
        setBaseColumnItems([...baseColumnItems, item]);
        break;
      default:
        break;
    }
  };

  return {
    handleDragStart,
    handleSectionDragStart,
    handleDrop
  };
};
