
import React, { useRef, useEffect } from "react";
import ElementStyleSection from "../settings/ElementStyleSection";
import TitleSection from "../settings/TitleSection";
import DescriptionSection from "../settings/DescriptionSection";
import TableStyleSection from "../settings/TableStyleSection";
import TotalsSection from "../settings/TotalsSection";
import FormatSection from "../settings/FormatSection";
import CustomMenuSection from "../settings/CustomMenuSection";

interface AdvancedSectionRendererProps {
  advancedSections: string[];
  onRemoveSection?: (index: number) => void;
  lastAddedIndex: number | null;
}

const AdvancedSectionRenderer: React.FC<AdvancedSectionRendererProps> = ({ 
  advancedSections, 
  onRemoveSection,
  lastAddedIndex 
}) => {
  // Create a ref for the last added section
  const lastSectionRef = useRef<HTMLDivElement>(null);

  // Scroll to the last added section when it changes
  useEffect(() => {
    if (lastAddedIndex !== null && lastSectionRef.current) {
      lastSectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [lastAddedIndex]);

  const renderAdvancedSection = (sectionType: string, index: number) => {
    // Determine if this is the last added section
    const isLastAdded = index === lastAddedIndex;
    // Create a ref for the last added section
    const ref = isLastAdded ? lastSectionRef : null;

    // Render appropriate section component based on type
    let SectionComponent;
    switch (sectionType) {
      case "ElementStyle":
        SectionComponent = ElementStyleSection;
        break;
      case "Title":
        SectionComponent = TitleSection;
        break;
      case "Description":
        SectionComponent = DescriptionSection;
        break;
      case "TableStyle":
        SectionComponent = TableStyleSection;
        break;
      case "Totals":
        SectionComponent = TotalsSection;
        break;
      case "Format":
        SectionComponent = FormatSection;
        break;
      case "CustomMenu":
        SectionComponent = CustomMenuSection;
        break;
      default:
        return null;
    }

    return (
      <div key={`${sectionType}-${index}`} ref={ref}>
        <SectionComponent onRemove={onRemoveSection ? () => onRemoveSection(index) : undefined} />
      </div>
    );
  };

  return (
    <>
      {advancedSections.map((section, index) => renderAdvancedSection(section, index))}
    </>
  );
};

export default AdvancedSectionRenderer;
