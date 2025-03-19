import React from "react";
import SettingsHeader from "./SettingsHeader";
interface ElementStyleSectionProps {
  onRemove?: () => void;
}
const ElementStyleSection: React.FC<ElementStyleSectionProps> = ({
  onRemove
}) => {
  return <div className="bg-white w-full py-4 max-w-[280px] mb-2 rounded-md px-[8px]">
      <SettingsHeader title="Element Style" onRemove={onRemove} />
      
      <div className="space-y-4">
        <p className="text-xs text-gray-500 px-[8px]">Configure the visual style of this element</p>
      </div>
    </div>;
};
export default ElementStyleSection;