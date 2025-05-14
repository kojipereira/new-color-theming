
import React from "react";
import PanelItem from "../PanelItem";
import { SidebarItem } from "./hooks/useSidebarState";
import { useIsMobile } from "@/hooks/use-mobile";

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
    <div className="w-full py-0 my-0" onDragOver={handleDragOver} onDrop={onDrop}>
      <div className="flex items-center justify-between px-2 py-1 bg-[rgba(243,243,243,1)] rounded-md">
        <div className="text-sm font-medium text-neutral-800">Base Columns</div>
        <div className="flex items-center">
          <button 
            onClick={handleShowMoreClick} 
            className="text-xs text-blue-600 hover:underline"
          >
            {baseColumnsExpanded ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full px-1 mt-1">
        {visibleBaseColumnItems.map((item, index) => (
          <PanelItem
            key={`base-column-${index}`}
            icon={item.icon}
            label={item.label}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, item)}
          />
        ))}
      </div>
    </div>
  );
};

export default BaseColumnsSection;
