
import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleData, fieldMap, processPivotData, DataItem } from '../services/DataService';

interface PivotItem {
  icon: string;
  label: string;
}

interface PivotContextType {
  pivotRowItems: PivotItem[];
  setPivotRowItems: React.Dispatch<React.SetStateAction<PivotItem[]>>;
  pivotColumnItems: PivotItem[];
  setPivotColumnItems: React.Dispatch<React.SetStateAction<PivotItem[]>>;
  valuesItems: PivotItem[];
  setValuesItems: React.Dispatch<React.SetStateAction<PivotItem[]>>;
  baseColumnItems: PivotItem[];
  setBaseColumnItems: React.Dispatch<React.SetStateAction<PivotItem[]>>;
  processedData: Record<string, any>[];
  handleDragStart: (e: React.DragEvent, item: PivotItem, index: number, section: string) => void;
  handleDrop: (e: React.DragEvent, targetSection: string) => void;
}

export const PivotContext = createContext<PivotContextType | undefined>(undefined);

export const usePivotContext = () => {
  const context = useContext(PivotContext);
  if (!context) {
    throw new Error('usePivotContext must be used within a PivotProvider');
  }
  return context;
};

// Define section types for type safety
type SectionType = 'pivotRows' | 'pivotColumns' | 'values' | 'baseColumns';

interface PivotProviderProps {
  children: React.ReactNode;
  initialPivotRowItems: PivotItem[];
  initialPivotColumnItems: PivotItem[];
  initialValuesItems: PivotItem[];
  initialBaseColumnItems: PivotItem[];
}

export const PivotProvider: React.FC<PivotProviderProps> = ({
  children,
  initialPivotRowItems,
  initialPivotColumnItems,
  initialValuesItems,
  initialBaseColumnItems
}) => {
  const [pivotRowItems, setPivotRowItems] = useState<PivotItem[]>(initialPivotRowItems);
  const [pivotColumnItems, setPivotColumnItems] = useState<PivotItem[]>(initialPivotColumnItems);
  const [valuesItems, setValuesItems] = useState<PivotItem[]>(initialValuesItems);
  const [baseColumnItems, setBaseColumnItems] = useState<PivotItem[]>(initialBaseColumnItems);
  const [processedData, setProcessedData] = useState<Record<string, any>[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ item: PivotItem; sourceSection: SectionType; sourceIndex: number } | null>(null);

  // Process data whenever pivot configuration changes
  useEffect(() => {
    const rowFields = pivotRowItems.map(item => fieldMap[item.label] || '');
    const columnFields = pivotColumnItems.map(item => fieldMap[item.label] || '');
    const valueFields = valuesItems.map(item => fieldMap[item.label] || '');
    
    const result = processPivotData(
      sampleData,
      rowFields.filter(Boolean) as string[],
      columnFields.filter(Boolean) as string[],
      valueFields.filter(Boolean) as string[]
    );
    
    setProcessedData(result);
  }, [pivotRowItems, pivotColumnItems, valuesItems]);

  // Handle drag start from a specific section
  const handleDragStart = (e: React.DragEvent, item: PivotItem, index: number, section: string) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
    e.dataTransfer.setData("sourceSection", section);
    e.dataTransfer.setData("sourceIndex", index.toString());
    setDraggedItem({ 
      item, 
      sourceSection: section as SectionType, 
      sourceIndex: index 
    });
  };

  // Handle drop on a specific section
  const handleDrop = (e: React.DragEvent, targetSection: string) => {
    e.preventDefault();
    try {
      const item = JSON.parse(e.dataTransfer.getData("item")) as PivotItem;
      const sourceSection = e.dataTransfer.getData("sourceSection");
      const sourceIndex = parseInt(e.dataTransfer.getData("sourceIndex"), 10);
      
      // Remove item from source section if it's not being dropped back to the same place
      if (sourceSection && sourceSection !== targetSection) {
        if (sourceSection === "pivotRows") {
          setPivotRowItems(prev => prev.filter((_, i) => i !== sourceIndex));
        } else if (sourceSection === "pivotColumns") {
          setPivotColumnItems(prev => prev.filter((_, i) => i !== sourceIndex));
        } else if (sourceSection === "values") {
          setValuesItems(prev => prev.filter((_, i) => i !== sourceIndex));
        }
        // Don't remove from base columns when dragging elsewhere
      }
      
      // Add the item to the target section if it's not already there
      if (targetSection === "pivotRows") {
        // Check if sourceSection is baseColumns or not the same as targetSection
        const isFromBaseColumns = sourceSection === "baseColumns";
        const isFromDifferentSection = sourceSection !== targetSection;
        
        if (isFromDifferentSection || isFromBaseColumns) {
          setPivotRowItems(prev => [...prev, item]);
        }
      } else if (targetSection === "pivotColumns") {
        // Check if sourceSection is baseColumns or not the same as targetSection
        const isFromBaseColumns = sourceSection === "baseColumns";
        const isFromDifferentSection = sourceSection !== targetSection;
        
        if (isFromDifferentSection || isFromBaseColumns) {
          setPivotColumnItems(prev => [...prev, item]);
        }
      } else if (targetSection === "values") {
        // Check if sourceSection is baseColumns or not the same as targetSection
        const isFromBaseColumns = sourceSection === "baseColumns";
        const isFromDifferentSection = sourceSection !== targetSection;
        
        if (isFromDifferentSection || isFromBaseColumns) {
          setValuesItems(prev => [...prev, item]);
        }
      } else if (targetSection === "baseColumns") {
        // When dropping back to base columns, only add if it's not already there
        const isFromBaseColumns = sourceSection === "baseColumns";
        
        if (!isFromBaseColumns) {
          const exists = baseColumnItems.some(i => i.label === item.label);
          if (!exists) {
            setBaseColumnItems(prev => [...prev, item]);
          }
        }
      }
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  return (
    <PivotContext.Provider
      value={{
        pivotRowItems,
        setPivotRowItems,
        pivotColumnItems,
        setPivotColumnItems,
        valuesItems,
        setValuesItems,
        baseColumnItems,
        setBaseColumnItems,
        processedData,
        handleDragStart,
        handleDrop
      }}
    >
      {children}
    </PivotContext.Provider>
  );
};
