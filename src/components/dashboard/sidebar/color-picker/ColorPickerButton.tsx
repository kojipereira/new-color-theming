
import React from 'react';
import { AlertTriangle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ColorSelector } from "../ColorSelector";

interface ColorPickerButtonProps {
  color: string;
  hasContrastIssue?: boolean;
  contrastWarning?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onColorChange: (color: string) => void;
}

export const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({
  color,
  hasContrastIssue = false,
  contrastWarning = "Poor contrast ratio",
  isOpen,
  setIsOpen,
  onColorChange
}) => {
  return (
    <div className="flex items-center gap-2">
      {hasContrastIssue && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{contrastWarning}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <div 
              className="w-5 h-5 rounded-full border border-gray-300" 
              style={{ background: color }} 
            />
            <span className="sr-only">Open color picker</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px] p-0" align="end">
          <ColorSelector 
            color={color} 
            onChange={onColorChange} 
            onClose={() => setIsOpen(false)} 
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
