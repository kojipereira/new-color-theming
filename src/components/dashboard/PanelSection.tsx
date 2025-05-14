
import React, { ReactNode, useState } from "react";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PanelSectionProps {
  title: string;
  children: ReactNode;
  actionIcons?: string[];
  expanded?: boolean;
  onAddItem?: () => void;
}

const PanelSection: React.FC<PanelSectionProps> = ({
  title,
  children,
  actionIcons = [],
  expanded = true,
  onAddItem
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleExpanded}
            className="text-xs text-neutral-500 hover:text-neutral-700"
          >
            {isExpanded ? "▼" : "►"}
          </button>
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
        <div className="flex items-center">
          {actionIcons.map((icon, index) => (
            <span key={index} className="text-xs mx-1">{icon}</span>
          ))}
          {onAddItem && (
            <button 
              onClick={onAddItem}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>
      
      <Separator className="my-2" />
      
      {isExpanded && (
        <div className="px-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default PanelSection;
