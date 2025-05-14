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
  return;
};
export default PanelSection;