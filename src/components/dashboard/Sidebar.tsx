
import React, { useState, useRef, useEffect } from "react";
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
  
  // Scroll position tracking - add buffer to prevent flickering
  const [showStickyAdvancedSettings, setShowStickyAdvancedSettings] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const baseColumnsRef = useRef<HTMLDivElement>(null);

  // Function to check positioning and update visibility
  const checkPositioning = () => {
    if (!scrollAreaRef.current || !baseColumnsRef.current) return;
    
    const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollElement) return;
    
    const baseColumnRect = baseColumnsRef.current.getBoundingClientRect();
    const baseColumnsBottom = baseColumnRect.bottom;
    const baseColumnsTop = baseColumnRect.top;
    const viewportHeight = window.innerHeight;
    
    // Add a buffer zone to prevent flickering
    // Only switch visibility when the element is well into view or out of view
    const buffer = 20; // pixels of buffer to prevent flicker

    if (baseColumnsBottom < viewportHeight - buffer) {
      // Base columns section is fully visible and above the bottom of the viewport with buffer
      setShowStickyAdvancedSettings(false);
    } else if (baseColumnsBottom > viewportHeight + buffer || baseColumnsTop > viewportHeight) {
      // Base columns section is below the viewport or partially visible at the bottom
      setShowStickyAdvancedSettings(true);
    }
    // If we're in the buffer zone, maintain the current state to prevent flickering
  };

  // Function to handle scroll and determine which Advanced Settings to show
  useEffect(() => {
    const handleScroll = () => {
      checkPositioning();
    };
    
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      
      // Use requestAnimationFrame to throttle scroll events
      let ticking = false;
      const scrollListener = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
      
      scrollElement.addEventListener('scroll', scrollListener, { passive: true });
      
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
        scrollElement.removeEventListener('scroll', scrollListener);
      };
    }
  }, []);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      // Use throttling for resize events as well
      checkPositioning();
    };

    // Add debounce/throttle for better performance
    let resizeTimeout: number;
    const throttledResize = () => {
      if (!resizeTimeout) {
        resizeTimeout = window.setTimeout(() => {
          resizeTimeout = 0;
          handleResize();
        }, 100); // 100ms throttle for resize
      }
    };

    window.addEventListener('resize', throttledResize);
    
    // Initial check on mount
    checkPositioning();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, []);

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
    <div className="bg-[rgba(238,238,238,1)] w-[280px] flex flex-col h-full border-r border-neutral-200 overflow-hidden">
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 w-full" ref={scrollAreaRef}>
          <div className="pb-16 w-full max-w-[280px]"> 
            <SidebarHeader />
            
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

            <div ref={baseColumnsRef}>
              <BaseColumnsSection
                visibleBaseColumnItems={visibleBaseColumnItems}
                baseColumnsExpanded={baseColumnsExpanded}
                setBaseColumnsExpanded={setBaseColumnsExpanded}
                handleDragStart={handleDragStart}
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

            <AdvancedSectionRenderer advancedSections={advancedSections} />
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

export default Sidebar;
