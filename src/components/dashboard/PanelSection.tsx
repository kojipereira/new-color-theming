
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
  return <div className="bg-white w-full px-1 py-3 max-w-[280px] overflow-hidden">
      <div className="relative flex min-h-6 w-full items-center gap-2 px-2">
        <div className="self-stretch z-0 gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 truncate shrink basis-[0%] my-auto">
          {title}
        </div>
        {onAddItem && <div className="rounded self-stretch z-0 flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1 cursor-pointer hover:bg-gray-100" onClick={onAddItem}>
            <Plus className="h-4 w-4" />
          </div>}
        {actionIcons.map((icon, index) => (
          <div key={`icon-${index}`} className="rounded self-stretch z-0 flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
            <img src={icon} className="aspect-[1] object-contain w-4 self-stretch my-auto" alt="Action icon" />
          </div>
        ))}
        <div className="absolute z-0 flex w-2 shrink-0 h-4 -left-1 bottom-1" />
      </div>
      {expanded && <div className="w-full overflow-hidden mt-1">{children}</div>}
    </div>;
};
export default PanelSection;
