import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import BaseColumnsSection from "./BaseColumnsSection";
import AdvancedSettings from "./AdvancedSettings";
import AdvancedSectionRenderer from "./AdvancedSectionRenderer";
import SidebarSections from "./SidebarSections";
import ColorPicker from "./ColorPicker";
import { useSidebarState } from "./hooks/useSidebarState";
import { useSidebarDragDrop } from "./hooks/useSidebarDragDrop";
import { useSidebarScroll } from "./hooks/useSidebarScroll";

const SidebarMain: React.FC = () => {
  // Get state from our custom hook
  const sidebarState = useSidebarState();
  
  // Get drag and drop handlers from our custom hook
  const dragDrop = useSidebarDragDrop({
    setPivotRowItems: sidebarState.setPivotRowItems,
    setPivotColumnItems: sidebarState.setPivotColumnItems,
    setValuesItems: sidebarState.setValuesItems,
    setBaseColumnItems: sidebarState.setBaseColumnItems,
    pivotRowItems: sidebarState.pivotRowItems,
    pivotColumnItems: sidebarState.pivotColumnItems,
    valuesItems: sidebarState.valuesItems,
    baseColumnItems: sidebarState.baseColumnItems
  });
  
  // Refs for scroll positioning
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const baseColumnsRef = useRef<HTMLDivElement>(null);

  // Use custom hook for scroll behavior
  const { showStickyAdvancedSettings, showStickyPanel } = useSidebarScroll(scrollAreaRef, baseColumnsRef);

  // Run this effect only once on mount to force initial calculation
  useEffect(() => {
    // Force layout recalculation immediately
    if (baseColumnsRef.current && scrollAreaRef.current) {
      const height = baseColumnsRef.current.getBoundingClientRect().height;
      
      // Force an initial show of sticky panel if needed based on viewport height
      if (window.innerHeight < height + 100) { // Reduced padding for faster action
        showStickyPanel();
      }
    }
    
    // Check again after a short delay to ensure DOM is fully rendered
    const immediateTimeout = setTimeout(() => {
      if (baseColumnsRef.current) {
        const height = baseColumnsRef.current.getBoundingClientRect().height;
        if (window.innerHeight < height + 100) {
          showStickyPanel();
        }
      }
    }, 10);
    
    // And check one final time after layout might have settled
    const finalTimeout = setTimeout(() => {
      if (baseColumnsRef.current) {
        const height = baseColumnsRef.current.getBoundingClientRect().height;
        if (window.innerHeight < height + 100) {
          showStickyPanel();
        }
      }
    }, 100);
    
    return () => {
      clearTimeout(immediateTimeout);
      clearTimeout(finalTimeout);
    };
  }, [showStickyPanel]);

  return (
    <div className="bg-[rgba(238,238,238,1)] w-[280px] flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 w-full" ref={scrollAreaRef}>
          <div className="pb-16 w-full max-w-[280px]"> 
            <SidebarSections 
              pivotRowItems={sidebarState.pivotRowItems}
              pivotColumnItems={sidebarState.pivotColumnItems}
              valuesItems={sidebarState.valuesItems}
              addToPivotRows={sidebarState.addToPivotRows}
              addToPivotColumns={sidebarState.addToPivotColumns}
              addToValues={sidebarState.addToValues}
              handleDrop={dragDrop.handleDrop}
              handleSectionDragStart={dragDrop.handleSectionDragStart}
            />

            <div ref={baseColumnsRef}>
              <BaseColumnsSection
                visibleBaseColumnItems={sidebarState.visibleBaseColumnItems}
                baseColumnsExpanded={sidebarState.baseColumnsExpanded}
                setBaseColumnsExpanded={sidebarState.setBaseColumnsExpanded}
                handleDragStart={dragDrop.handleDragStart}
                onDrop={(e) => dragDrop.handleDrop(e, "baseColumns")}
                showStickyPanel={showStickyPanel}
              />
              
              {/* Add the ColorPicker component here */}
              <ColorPicker />
              
              {!showStickyAdvancedSettings && (
                <AdvancedSettings 
                  advancedMenuOpen={sidebarState.advancedMenuOpen}
                  setAdvancedMenuOpen={sidebarState.setAdvancedMenuOpen}
                  addAdvancedSection={sidebarState.addAdvancedSection}
                  isSticky={false}
                />
              )}
            </div>

            <AdvancedSectionRenderer 
              advancedSections={sidebarState.advancedSections} 
              onRemoveSection={sidebarState.removeAdvancedSection}
              lastAddedIndex={sidebarState.lastAddedSectionIndex}
            />
          </div>
        </ScrollArea>
      </div>

      {showStickyAdvancedSettings && (
        <AdvancedSettings 
          advancedMenuOpen={sidebarState.advancedMenuOpen}
          setAdvancedMenuOpen={sidebarState.setAdvancedMenuOpen}
          addAdvancedSection={sidebarState.addAdvancedSection}
          isSticky={true}
        />
      )}
    </div>
  );
};

export default SidebarMain;
