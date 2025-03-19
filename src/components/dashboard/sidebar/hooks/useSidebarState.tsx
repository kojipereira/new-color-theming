
import { useState } from "react";
import { 
  initialPivotRowItems, 
  initialPivotColumnItems, 
  initialValuesItems, 
  initialBaseColumnItems,
} from "../SidebarData";

export interface SidebarItem {
  icon: string;
  label: string;
}

export const useSidebarState = () => {
  // State for the panels
  const [pivotRowItems, setPivotRowItems] = useState(initialPivotRowItems);
  const [pivotColumnItems, setPivotColumnItems] = useState(initialPivotColumnItems);
  const [valuesItems, setValuesItems] = useState(initialValuesItems);
  const [baseColumnItems, setBaseColumnItems] = useState(initialBaseColumnItems);

  // State for base columns expand/collapse
  const [baseColumnsExpanded, setBaseColumnsExpanded] = useState(false);

  // Advanced settings sections
  const [advancedSections, setAdvancedSections] = useState<string[]>([]);
  const [advancedMenuOpen, setAdvancedMenuOpen] = useState(false);
  const [lastAddedSectionIndex, setLastAddedSectionIndex] = useState<number | null>(null);

  // Display 10 items when contracted, 20 when expanded
  const displayCount = baseColumnsExpanded ? 20 : 10;
  const visibleBaseColumnItems = baseColumnItems.slice(0, displayCount);

  // Functions to add new items to each section
  const addToPivotRows = () => {
    setPivotRowItems([...pivotRowItems, { 
      icon: "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/ff7d1a25dd04025ed706057304583c1d5c5540fa?placeholderIfAbsent=true", 
      label: "New Pivot Row" 
    }]);
  };

  const addToPivotColumns = () => {
    setPivotColumnItems([...pivotColumnItems, { 
      icon: "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/ff7d1a25dd04025ed706057304583c1d5c5540fa?placeholderIfAbsent=true", 
      label: "New Pivot Column" 
    }]);
  };

  const addToValues = () => {
    setValuesItems([...valuesItems, { 
      icon: "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/a197f4fe5dd2df7c3fb64605c54231dc1d5f1df7?placeholderIfAbsent=true", 
      label: "New Value" 
    }]);
  };

  // Function to add advanced section
  const addAdvancedSection = (sectionType: string) => {
    const newSections = [...advancedSections, sectionType];
    setAdvancedSections(newSections);
    setLastAddedSectionIndex(newSections.length - 1);
    setAdvancedMenuOpen(false);
  };

  // Function to remove advanced section
  const removeAdvancedSection = (index: number) => {
    const newSections = [...advancedSections];
    newSections.splice(index, 1);
    setAdvancedSections(newSections);
    setLastAddedSectionIndex(null);
  };

  return {
    pivotRowItems,
    setPivotRowItems,
    pivotColumnItems,
    setPivotColumnItems,
    valuesItems,
    setValuesItems,
    baseColumnItems,
    setBaseColumnItems,
    baseColumnsExpanded,
    setBaseColumnsExpanded,
    visibleBaseColumnItems,
    advancedSections,
    advancedMenuOpen,
    setAdvancedMenuOpen,
    lastAddedSectionIndex,
    addToPivotRows,
    addToPivotColumns,
    addToValues,
    addAdvancedSection,
    removeAdvancedSection
  };
};
