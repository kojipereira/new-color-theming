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
  return <div className="w-full overflow-hidden mt-1">
      <DraggableSection title="Pivot Rows" items={pivotRowItems} onAddItem={addToPivotRows} onDrop={e => handleDrop(e, "pivotRows")} onDragStart={(e, item, index) => handleSectionDragStart(e, item, index, "pivotRows")} actionIcons={["https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/e820ab38758ad106d1eec29a70763f66ca2e10fc?placeholderIfAbsent=true"]} />

      <div className="w-full">
        <div className="" />
      </div>

      <DraggableSection title="Pivot Columns" items={pivotColumnItems} onAddItem={addToPivotColumns} onDrop={e => handleDrop(e, "pivotColumns")} onDragStart={(e, item, index) => handleSectionDragStart(e, item, index, "pivotColumns")} />

      <div className="w-full">
        <div className="border-neutral-200 border shrink-0 h-px border-solid" />
      </div>

      <DraggableSection title="Values" items={valuesItems} onAddItem={addToValues} onDrop={e => handleDrop(e, "values")} onDragStart={(e, item, index) => handleSectionDragStart(e, item, index, "values")} />
    </div>;
};
export default SidebarSections;