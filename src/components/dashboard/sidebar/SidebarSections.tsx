import React from "react";
import DraggableSection from "./DraggableSection";
import { SidebarItem } from "./hooks/useSidebarState";
interface SidebarSectionsProps {
  pivotRowItems: SidebarItem[];
  pivotColumnItems: SidebarItem[];
  valuesItems: SidebarItem[];
  addToPivotRows: () => void;
  addToPivotColumns: () => void;
  addToValues: () => void;
  handleDrop: (e: React.DragEvent, targetSection: string) => void;
  handleSectionDragStart: (e: React.DragEvent, item: SidebarItem, index: number, section: string) => void;
}
const SidebarSections: React.FC<SidebarSectionsProps> = ({
  pivotRowItems,
  pivotColumnItems,
  valuesItems,
  addToPivotRows,
  addToPivotColumns,
  addToValues,
  handleDrop,
  handleSectionDragStart
}) => {
  // Combine all items into one array for the Groupings section
  const allItems = [...pivotRowItems.map(item => ({
    ...item,
    section: "pivotRows"
  })), ...pivotColumnItems.map(item => ({
    ...item,
    section: "pivotColumns"
  })), ...valuesItems.map(item => ({
    ...item,
    section: "values"
  }))];

  // Handler for adding items to Groupings
  const addToGroupings = () => {
    // Default to adding to pivot rows
    addToPivotRows();
  };

  // Modified drag start handler that preserves the section information
  const handleGroupingsDragStart = (e: React.DragEvent, item: SidebarItem & {
    section?: string;
  }, index: number) => {
    const section = item.section || "pivotRows";
    handleSectionDragStart(e, item, index, section);
  };
  return <div className="w-full overflow-hidden mt-1 my-0 py-0">
      <DraggableSection title="Groupings" items={allItems} onAddItem={addToGroupings} onDrop={e => handleDrop(e, "pivotRows")} onDragStart={handleGroupingsDragStart} />

      <div className="w-full">
        
      </div>
    </div>;
};
export default SidebarSections;