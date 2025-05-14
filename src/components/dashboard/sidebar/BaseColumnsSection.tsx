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
  return;
};
export default BaseColumnsSection;