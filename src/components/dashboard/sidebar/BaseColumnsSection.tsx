import React from "react";
import PanelItem from "../PanelItem";
import { SidebarItem } from "./hooks/useSidebarState";
interface BaseColumnsSectionProps {
  visibleBaseColumnItems: SidebarItem[];
  baseColumnsExpanded: boolean;
  setBaseColumnsExpanded: (expanded: boolean) => void;
  handleDragStart: (e: React.DragEvent, item: SidebarItem) => void;
  onDrop: (e: React.DragEvent) => void;
}
const BaseColumnsSection: React.FC<BaseColumnsSectionProps> = ({
  visibleBaseColumnItems,
  baseColumnsExpanded,
  setBaseColumnsExpanded,
  handleDragStart,
  onDrop
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  return <div onDragOver={handleDragOver} onDrop={onDrop} className="rounded-md bg-white w-full overflow-hidden mt-1 mb-2 px-[8px] py-[8px] my-[2px]">
      <div className="flex min-h-6 w-full items-center gap-1 px-2">
        <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">Columns</div>
        
        <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
          <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/cb1292c171f906e91c44d3be493b675ac9675368?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch my-auto" alt="Action" />
        </div>
      </div>
      <div className="w-full overflow-hidden mt-1">
        {visibleBaseColumnItems.map((item, index) => <PanelItem key={`base-column-${index}`} icon={item.icon} label={item.label} draggable={true} onDragStart={e => handleDragStart(e, item)} />)}
        
        <div className="w-full text-center py-2 text-blue-600 hover:text-blue-800 cursor-pointer font-medium text-sm" onClick={() => setBaseColumnsExpanded(!baseColumnsExpanded)}>
          {baseColumnsExpanded ? "Show less" : "Show more"}
        </div>
      </div>
    </div>;
};
export default BaseColumnsSection;