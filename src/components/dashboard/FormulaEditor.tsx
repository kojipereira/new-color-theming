
import React, { useState } from "react";
import { Check, X, Settings, DollarSign, Percent } from "lucide-react";

interface FormulaEditorProps {
  initialValue?: string;
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
}

const FormulaEditor: React.FC<FormulaEditorProps> = ({
  initialValue = "Sum([Profit (1)])",
  onConfirm,
  onCancel
}) => {
  const [formula, setFormula] = useState(initialValue);
  
  const handleConfirm = () => {
    if (onConfirm) onConfirm(formula);
  };
  
  const handleCancel = () => {
    if (onCancel) onCancel();
  };
  
  const insertAtCursor = (text: string) => {
    setFormula(prev => prev + text);
  };
  
  const formatAsNumber = (format: "currency" | "percent" | "decimal" | "decimal2") => {
    try {
      const numericValue = parseFloat(formula);
      if (isNaN(numericValue)) return;
      
      switch (format) {
        case "currency":
          setFormula(`$${numericValue.toFixed(2)}`);
          break;
        case "percent":
          setFormula(`${(numericValue * 100).toFixed(2)}%`);
          break;
        case "decimal":
          setFormula(numericValue.toFixed(1));
          break;
        case "decimal2":
          setFormula(numericValue.toFixed(2));
          break;
        default:
          break;
      }
    } catch (e) {
      console.error("Could not format as number", e);
    }
  };

  return (
    <div className="bg-white w-[600px] p-4 rounded-lg shadow-lg border border-neutral-200">
      <div className="flex items-center h-12 border border-neutral-200 rounded mb-3 overflow-hidden">
        <div className="flex items-center justify-center w-12 h-full bg-neutral-50 border-r border-neutral-200 font-bold text-neutral-600">
          fx
        </div>
        <input 
          type="text" 
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          className="flex-1 h-full px-3 text-sm outline-none"
        />
        <div className="flex items-center gap-1 px-2">
          <button 
            className="p-1.5 hover:bg-neutral-100 rounded-sm text-emerald-600"
            onClick={handleConfirm}
          >
            <Check className="h-4 w-4" />
          </button>
          <button 
            className="p-1.5 hover:bg-neutral-100 rounded-sm text-red-600"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-neutral-100 rounded-sm text-blue-600">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center h-10 border border-neutral-200 rounded text-sm">
        <button 
          className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50"
          onClick={() => formatAsNumber("currency")}
        >
          <DollarSign className="h-4 w-4" />
        </button>
        <button 
          className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50"
          onClick={() => formatAsNumber("percent")}
        >
          <Percent className="h-4 w-4" />
        </button>
        <button 
          className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50"
          onClick={() => formatAsNumber("decimal")}
        >
          .0
        </button>
        <button 
          className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50"
          onClick={() => formatAsNumber("decimal2")}
        >
          .00
        </button>
        <button 
          className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50 flex items-center gap-1"
          onClick={() => insertAtCursor("123")}
        >
          123 <span className="text-xs">▾</span>
        </button>
        <button 
          className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50 flex items-center gap-1"
          onClick={() => insertAtCursor("=")}
        >
          ≡ <span className="text-xs">▾</span>
        </button>
        <button 
          className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50"
          onClick={() => insertAtCursor("|ƒ|")}
        >
          |ƒ|
        </button>
        <button 
          className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50 flex items-center gap-1"
          onClick={() => insertAtCursor("A")}
        >
          A <span className="text-xs">▾</span>
        </button>
        <button 
          className="h-full px-3 border-r border-neutral-200 hover:bg-neutral-50"
          onClick={() => insertAtCursor("⚲")}
        >
          ⚲
        </button>
        <button 
          className="h-full px-3 ml-auto hover:bg-neutral-50"
          onClick={handleCancel}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default FormulaEditor;
