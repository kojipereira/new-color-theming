
import React, { useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import SidebarHeader from "./SidebarHeader";
import DraggableSection from "./DraggableSection";
import BaseColumnsSection from "./BaseColumnsSection";
import AdvancedSettings from "./AdvancedSettings";
import AdvancedSectionRenderer from "./AdvancedSectionRenderer";
import { 
  initialPivotRowItems, 
  initialPivotColumnItems, 
  initialValuesItems, 
  initialBaseColumnItems,
  dateIcon,
  priceIcon
} from "./SidebarData";
import { useSidebarScroll } from "./hooks/useSidebarScroll";

const SidebarMain: React.FC = () => {
  // State for the panels
  const [pivotRowItems, setPivotRowItems] = useState(initialPivotRowItems);
  const [pivotColumnItems, setPivotColumnItems] = useState(initialPivotColumnItems);
  const [valuesItems, setValuesItems] = useState(initialValuesItems);
  const [baseColumnItems, setBaseColumnItems] = useState(initialBaseColumnItems);

  // State for base columns expand/collapse
  const [baseColumnsExpanded, setBaseColumnsExpanded] = useState(false);
  
  // Display 10 items when contracted, 20 when expanded
  const displayCount = baseColumnsExpanded ? 20 : 10;
  const visibleBaseColumnItems = baseColumnItems.slice(0, displayCount);

  // Advanced settings sections
  const [advancedSections, setAdvancedSections] = useState<string[]>([]);
  const [advancedMenuOpen, setAdvancedMenuOpen] = useState(false);
  const [lastAddedSectionIndex, setLastAddedSectionIndex] = useState<number | null>(null);
  
  // Refs for scroll positioning
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const baseColumnsRef = useRef<HTMLDivElement>(null);

  // Use custom hook for scroll behavior
  const { showStickyAdvancedSettings } = useSidebarScroll(scrollAreaRef, baseColumnsRef);

  // Function to handle drag and drop
  const handleDragStart = (e: React.DragEvent, item: { icon: string; label: string }, source: string) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
    e.dataTransfer.setData("source", source);
  };

  const handleDrop = (e: React.DragEvent, targetSection: string) => {
    e.preventDefault();
    try {
      const item = JSON.parse(e.dataTransfer.getData("item"));
      const sourceSection = e.dataTransfer.getData("source");
      
      // If the item is being dropped to the same section, do nothing
      if (sourceSection === targetSection) {
        return;
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
      
      // Remove the item from the source section
      if (sourceSection === "pivotRows") {
        setPivotRowItems(pivotRowItems.filter(i => i.label !== item.label));
      } else if (sourceSection === "pivotColumns") {
        setPivotColumnItems(pivotColumnItems.filter(i => i.label !== item.label));
      } else if (sourceSection === "values") {
        setValuesItems(valuesItems.filter(i => i.label !== item.label));
      } else if (sourceSection === "baseColumns") {
        // We don't remove from base columns when dragging to other sections
        // This allows for multiple uses of the same base column
      }
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  // Functions to add new items to each section
  const addToPivotRows = () => {
    setPivotRowItems([...pivotRowItems, { icon: dateIcon, label: "New Pivot Row" }]);
  };

  const addToPivotColumns = () => {
    setPivotColumnItems([...pivotColumnItems, { icon: dateIcon, label: "New Pivot Column" }]);
  };

  const addToValues = () => {
    setValuesItems([...valuesItems, { icon: priceIcon, label: "New Value" }]);
  };

  // Function to add advanced section
  const addAdvancedSection = (sectionType: string) => {
    const newSections = [...advancedSections, sectionType];
    setAdvancedSections(newSections);
    setLastAddedSectionIndex(newSections.length - 1);
    setAdvancedMenuOpen(false);
  };

  // Function to remove advanced section
  const removeAdvancedSection = (index: number) => {
    const newSections = [...advancedSections];
    newSections.splice(index, 1);
    setAdvancedSections(newSections);
    setLastAddedSectionIndex(null);
  };

  // Handle base columns drag over
  const handleBaseColumnsDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle base columns drop
  const handleBaseColumnsDrop = (e: React.DragEvent) => {
    handleDrop(e, "baseColumns");
  };

  return (
    <div className="bg-[rgba(238,238,238,1)] w-[280px] flex flex-col h-full border-r border-neutral-200 overflow-hidden">
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 w-full" ref={scrollAreaRef}>
          <div className="pb-16 w-full max-w-[280px]"> 
            <SidebarHeader />
            
            <SidebarSections 
              pivotRowItems={pivotRowItems}
              pivotColumnItems={pivotColumnItems}
              valuesItems={valuesItems}
              addToPivotRows={addToPivotRows}
              addToPivotColumns={addToPivotColumns}
              addToValues={addToValues}
              handleDrop={handleDrop}
              handleDragStart={handleDragStart}
            />

            <div 
              ref={baseColumnsRef} 
              onDragOver={handleBaseColumnsDragOver}
              onDrop={handleBaseColumnsDrop}
            >
              <BaseColumnsSection
                visibleBaseColumnItems={visibleBaseColumnItems}
                baseColumnsExpanded={baseColumnsExpanded}
                setBaseColumnsExpanded={setBaseColumnsExpanded}
                handleDragStart={(e, item) => handleDragStart(e, item, "baseColumns")}
              />
              
              {/* Inline Advanced Settings (shown when scrolled to base columns) */}
              {!showStickyAdvancedSettings && (
                <AdvancedSettings 
                  advancedMenuOpen={advancedMenuOpen}
                  setAdvancedMenuOpen={setAdvancedMenuOpen}
                  addAdvancedSection={addAdvancedSection}
                  isSticky={false}
                />
              )}
            </div>

            <AdvancedSectionRenderer 
              advancedSections={advancedSections} 
              onRemoveSection={removeAdvancedSection}
              lastAddedIndex={lastAddedSectionIndex}
            />
          </div>
        </ScrollArea>
      </div>

      {/* Sticky Advanced Settings (hidden when scrolled to base columns) */}
      {showStickyAdvancedSettings && (
        <AdvancedSettings 
          advancedMenuOpen={advancedMenuOpen}
          setAdvancedMenuOpen={setAdvancedMenuOpen}
          addAdvancedSection={addAdvancedSection}
          isSticky={true}
        />
      )}
    </div>
  );
};

interface SidebarSectionsProps {
  pivotRowItems: Array<{ icon: string; label: string }>;
  pivotColumnItems: Array<{ icon: string; label: string }>;
  valuesItems: Array<{ icon: string; label: string }>;
  addToPivotRows: () => void;
  addToPivotColumns: () => void;
  addToValues: () => void;
  handleDrop: (e: React.DragEvent, targetSection: string) => void;
  handleDragStart: (e: React.DragEvent, item: { icon: string; label: string }, source: string) => void;
}

const SidebarSections: React.FC<SidebarSectionsProps> = ({
  pivotRowItems,
  pivotColumnItems,
  valuesItems,
  addToPivotRows,
  addToPivotColumns,
  addToValues,
  handleDrop,
  handleDragStart
}) => {
  return (
    <div className="w-full overflow-hidden mt-1">
      <DraggableSection
        title="Pivot Rows"
        items={pivotRowItems}
        onAddItem={addToPivotRows}
        onDrop={(e) => handleDrop(e, "pivotRows")}
        actionIcons={[
          "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/e820ab38758ad106d1eec29a70763f66ca2e10fc?placeholderIfAbsent=true",
        ]}
      />

      <div className="w-full">
        <div className="border-neutral-200 border shrink-0 h-px border-solid" />
      </div>

      <DraggableSection
        title="Pivot Columns"
        items={pivotColumnItems}
        onAddItem={addToPivotColumns}
        onDrop={(e) => handleDrop(e, "pivotColumns")}
      />

      <div className="w-full">
        <div className="border-neutral-200 border shrink-0 h-px border-solid" />
      </div>

      <DraggableSection
        title="Values"
        items={valuesItems}
        onAddItem={addToValues}
        onDrop={(e) => handleDrop(e, "values")}
      />
    </div>
  );
};

export default SidebarMain;
