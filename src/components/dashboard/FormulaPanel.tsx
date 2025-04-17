
import React, { useState } from "react";
import FormulaEditor from "./FormulaEditor";

interface FormulaPanelProps {
  onClose?: () => void;
}

const FormulaPanel: React.FC<FormulaPanelProps> = ({ onClose }) => {
  const [formula, setFormula] = useState<string>("Sum([Profit (1)])");

  const handleConfirm = (value: string) => {
    setFormula(value);
    if (onClose) onClose();
  };

  return <FormulaEditor initialValue={formula} onConfirm={handleConfirm} onCancel={onClose} />;
};

export default FormulaPanel;
