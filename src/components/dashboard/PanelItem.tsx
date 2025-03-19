
import React, { useState } from "react";
import { GripVertical } from "lucide-react";

interface PanelItemProps {
  icon: string;
  label: string;
  actionIcon?: string;
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
}

const PanelItem: React.FC<PanelItemProps> = ({
  icon,
  label,
  actionIcon = "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/182fe5157336973a37cf0dedd2701321f28ee286?placeholderIfAbsent=true",
  draggable = false,
  onDragStart,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`rounded flex w-full items-center gap-2 px-2 h-7 border-2 border-transparent hover:border-blue-400 ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
      draggable={draggable}
      onDragStart={onDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="self-stretch flex min-h-6 items-center gap-2 text-xs text-neutral-900 font-normal whitespace-nowrap leading-none flex-1 shrink basis-[0%] my-auto">
        {isHovered && draggable ? (
          <GripVertical className="w-4 h-4 text-gray-400" />
        ) : (
          <img
            src={icon}
            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
            alt={label}
          />
        )}
        <div className="text-ellipsis self-stretch flex-1 shrink basis-[0%] my-auto">
          {label}
        </div>
      </div>
      <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
        <img
          src={actionIcon}
          className="aspect-[1] object-contain w-4 self-stretch my-auto"
          alt="Action"
        />
      </div>
    </div>
  );
};

export default PanelItem;
