
import React from "react";
import PanelSection from "../PanelSection";
import PanelItem from "../PanelItem";
import { SidebarItem } from "./hooks/useSidebarState";

interface DraggableSectionProps {
  title: string;
  items: SidebarItem[];
  onAddItem: () => void;
  onDrop: (e: React.DragEvent) => void;
  actionIcons?: string[];
  onDragStart?: (e: React.DragEvent, item: SidebarItem, index: number) => void;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  title,
  items,
  onAddItem,
  onDrop,
  actionIcons = [],
  onDragStart
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDrop={onDrop}
      className="border-2 border-transparent"
    >
      <PanelSection
        title={title}
        onAddItem={onAddItem}
        actionIcons={actionIcons}
      >
        {items.map((item, index) => (
          <PanelItem 
            key={`${title.toLowerCase().replace(/\s+/g, '-')}-${index}`} 
            icon={item.icon} 
            label={item.label} 
            draggable={true}
            onDragStart={(e) => onDragStart && onDragStart(e, item, index)}
          />
        ))}
      </PanelSection>
    </div>
  );
};

export default DraggableSection;
