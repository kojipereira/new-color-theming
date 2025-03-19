
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
  const [draggedItem, setDraggedItem] = useState<{ item: PivotItem; sourceSection: string; sourceIndex: number } | null>(null);

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
    setDraggedItem({ item, sourceSection: section, sourceIndex: index });
  };

  // Handle drop on a specific section
  const handleDrop = (e: React.DragEvent, targetSection: string) => {
    e.preventDefault();
    try {
      const item = JSON.parse(e.dataTransfer.getData("item"));
      const sourceSection = e.dataTransfer.getData("sourceSection");
      const sourceIndex = parseInt(e.dataTransfer.getData("sourceIndex"), 10);
      
      // Remove item from source section if it's not being dropped back to the same place
      if (sourceSection && sourceSection !== targetSection) {
        switch (sourceSection) {
          case "pivotRows":
            setPivotRowItems(prev => prev.filter((_, i) => i !== sourceIndex));
            break;
          case "pivotColumns":
            setPivotColumnItems(prev => prev.filter((_, i) => i !== sourceIndex));
            break;
          case "values":
            setValuesItems(prev => prev.filter((_, i) => i !== sourceIndex));
            break;
          case "baseColumns":
            // Don't remove from base columns when dragging elsewhere
            break;
          default:
            break;
        }
      }
      
      // Add the item to the target section if it's not already there
      switch (targetSection) {
        case "pivotRows":
          if (sourceSection !== targetSection || targetSection === "baseColumns") {
            setPivotRowItems(prev => [...prev, item]);
          }
          break;
        case "pivotColumns":
          if (sourceSection !== targetSection || targetSection === "baseColumns") {
            setPivotColumnItems(prev => [...prev, item]);
          }
          break;
        case "values":
          if (sourceSection !== targetSection || targetSection === "baseColumns") {
            setValuesItems(prev => [...prev, item]);
          }
          break;
        case "baseColumns":
          // When dropping back to base columns, only add if it's not already there
          if (sourceSection !== "baseColumns") {
            const exists = baseColumnItems.some(i => i.label === item.label);
            if (!exists) {
              setBaseColumnItems(prev => [...prev, item]);
            }
          }
          break;
        default:
          break;
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
