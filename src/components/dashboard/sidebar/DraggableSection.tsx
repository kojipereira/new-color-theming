
import React from "react";
import PanelSection from "../PanelSection";
import PanelItem from "../PanelItem";

interface DraggableSectionProps {
  title: string;
  items: Array<{ icon: string; label: string }>;
  onAddItem: () => void;
  onDrop: (e: React.DragEvent) => void;
  actionIcons?: string[];
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  title,
  items,
  onAddItem,
  onDrop,
  actionIcons = []
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDrop={onDrop}
      className="hover:bg-gray-50 transition-colors"
    >
      <PanelSection
        title={title}
        onAddItem={onAddItem}
        actionIcons={actionIcons}
      >
        {items.map((item, index) => (
          <PanelItem key={`${title.toLowerCase().replace(/\s+/g, '-')}-${index}`} icon={item.icon} label={item.label} />
        ))}
      </PanelSection>
    </div>
  );
};

export default DraggableSection;
