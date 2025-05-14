
import React from "react";
import PanelItem from "../PanelItem";
import { SidebarItem } from "./hooks/useSidebarState";
import { useIsMobile } from "@/hooks/use-mobile";
import PanelSection from "../PanelSection";

interface BaseColumnsSectionProps {
  visibleBaseColumnItems: SidebarItem[];
  baseColumnsExpanded: boolean;
  setBaseColumnsExpanded: (expanded: boolean) => void;
  handleDragStart: (e: React.DragEvent, item: SidebarItem) => void;
  onDrop: (e: React.DragEvent) => void;
  showStickyPanel?: () => void; // Optional function to show sticky panel
}

const BaseColumnsSection: React.FC<BaseColumnsSectionProps> = ({
  visibleBaseColumnItems,
  baseColumnsExpanded,
  setBaseColumnsExpanded,
  handleDragStart,
  onDrop,
  showStickyPanel
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const isMobile = useIsMobile();
  
  const handleShowMoreClick = () => {
    // Toggle the expanded state
    setBaseColumnsExpanded(!baseColumnsExpanded);

    // If expanding and on mobile, show the sticky panel
    if (!baseColumnsExpanded && isMobile && showStickyPanel) {
      showStickyPanel();
    }
  };
  
  return (
    <div 
      className="mb-2"
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      <PanelSection
        title="Base Columns"
        expanded={baseColumnsExpanded}
      >
        <div className="space-y-1">
          {visibleBaseColumnItems.map((item) => (
            <PanelItem
              key={item.id}
              item={item}
              onDragStart={(e) => handleDragStart(e, item)}
              draggable
            />
          ))}
          
          {visibleBaseColumnItems.length === 0 && (
            <div className="text-sm text-neutral-500 py-1">
              No base columns available
            </div>
          )}
          
          <button
            onClick={handleShowMoreClick}
            className="text-xs text-blue-500 hover:text-blue-700 mt-2"
          >
            {baseColumnsExpanded ? "Show Less" : "Show More"}
          </button>
        </div>
      </PanelSection>
    </div>
  );
};

export default BaseColumnsSection;
