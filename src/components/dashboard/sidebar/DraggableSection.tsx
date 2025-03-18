
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
      className="border-2 border-transparent hover:border-blue-200 border-dashed overflow-hidden"
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
