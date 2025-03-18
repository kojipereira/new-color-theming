
import React from "react";
import ElementStyleSection from "../settings/ElementStyleSection";
import TitleSection from "../settings/TitleSection";
import DescriptionSection from "../settings/DescriptionSection";
import TableStyleSection from "../settings/TableStyleSection";
import TotalsSection from "../settings/TotalsSection";
import FormatSection from "../settings/FormatSection";
import CustomMenuSection from "../settings/CustomMenuSection";

interface AdvancedSectionRendererProps {
  advancedSections: string[];
}

const AdvancedSectionRenderer: React.FC<AdvancedSectionRendererProps> = ({ advancedSections }) => {
  const renderAdvancedSection = (sectionType: string, index: number) => {
    switch (sectionType) {
      case "ElementStyle":
        return <ElementStyleSection key={`element-style-${index}`} />;
      case "Title":
        return <TitleSection key={`title-${index}`} />;
      case "Description":
        return <DescriptionSection key={`description-${index}`} />;
      case "TableStyle":
        return <TableStyleSection key={`table-style-${index}`} />;
      case "Totals":
        return <TotalsSection key={`totals-${index}`} />;
      case "Format":
        return <FormatSection key={`format-${index}`} />;
      case "CustomMenu":
        return <CustomMenuSection key={`custom-menu-${index}`} />;
      default:
        return null;
    }
  };

  return (
    <>
      {advancedSections.map((section, index) => renderAdvancedSection(section, index))}
    </>
  );
};

export default AdvancedSectionRenderer;
