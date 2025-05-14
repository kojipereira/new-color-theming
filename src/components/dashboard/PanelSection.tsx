
import React, { ReactNode } from "react";
import { Plus } from "lucide-react";

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
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between px-2 py-1 bg-[rgba(243,243,243,1)] rounded-md">
        <div className="text-sm font-medium text-neutral-800">{title}</div>
        <div className="flex items-center gap-1">
          {actionIcons.map((icon, index) => (
            <img
              key={index}
              src={icon}
              className="w-4 h-4 cursor-pointer"
              alt={`Action ${index + 1}`}
            />
          ))}
          {onAddItem && (
            <button 
              onClick={onAddItem} 
              className="rounded-full w-5 h-5 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
      {expanded && <div className="flex flex-col gap-1 w-full px-1">{children}</div>}
    </div>
  );
};

export default PanelSection;
