
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import SidebarHeader from "./sidebar/SidebarHeader";
import DraggableSection from "./sidebar/DraggableSection";
import BaseColumnsSection from "./sidebar/BaseColumnsSection";
import AdvancedSettings from "./sidebar/AdvancedSettings";
import AdvancedSectionRenderer from "./sidebar/AdvancedSectionRenderer";
import { 
  initialPivotRowItems, 
  initialPivotColumnItems, 
  initialValuesItems, 
  initialBaseColumnItems,
  dateIcon,
  priceIcon
} from "./sidebar/SidebarData";

const Sidebar: React.FC = () => {
  // State for the panels
  const [pivotRowItems, setPivotRowItems] = useState(initialPivotRowItems);
  const [pivotColumnItems, setPivotColumnItems] = useState(initialPivotColumnItems);
  const [valuesItems, setValuesItems] = useState(initialValuesItems);
  const [baseColumnItems] = useState(initialBaseColumnItems);

  // State for base columns expand/collapse
  const [baseColumnsExpanded, setBaseColumnsExpanded] = useState(false);
  
  // Display 10 items when contracted, 20 when expanded
  const displayCount = baseColumnsExpanded ? 20 : 10;
  const visibleBaseColumnItems = baseColumnItems.slice(0, displayCount);

  // Advanced settings sections
  const [advancedSections, setAdvancedSections] = useState<string[]>([]);
  const [advancedMenuOpen, setAdvancedMenuOpen] = useState(false);

  // Function to handle drag and drop
  const handleDragStart = (e: React.DragEvent, item: { icon: string; label: string }) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleDrop = (e: React.DragEvent, targetSection: string) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("item"));
    
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
      default:
        break;
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
    setAdvancedSections([...advancedSections, sectionType]);
    setAdvancedMenuOpen(false);
  };

  return (
    <div className="bg-[rgba(238,238,238,1)] min-w-60 w-[280px] flex flex-col h-full">
      {/* Header */}
      <SidebarHeader />

      {/* Scrollable content area with proper layout for sticky footer */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1">
          <div className="pb-16"> {/* Added padding at the bottom to ensure content doesn't get hidden behind the sticky footer */}
            <div className="rounded w-full overflow-hidden mt-1">
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

            {/* Base Columns Section */}
            <BaseColumnsSection
              visibleBaseColumnItems={visibleBaseColumnItems}
              baseColumnsExpanded={baseColumnsExpanded}
              setBaseColumnsExpanded={setBaseColumnsExpanded}
              handleDragStart={handleDragStart}
            />

            {/* Advanced settings sections */}
            <AdvancedSectionRenderer advancedSections={advancedSections} />
          </div>
        </ScrollArea>
      </div>

      {/* Advanced Settings - Fixed at bottom */}
      <AdvancedSettings 
        advancedMenuOpen={advancedMenuOpen}
        setAdvancedMenuOpen={setAdvancedMenuOpen}
        addAdvancedSection={addAdvancedSection}
      />
    </div>
  );
};

export default Sidebar;
