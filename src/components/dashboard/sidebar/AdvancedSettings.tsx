
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Paintbrush, Type, FileType, Table, BarChart3, List } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AdvancedSettingsProps {
  advancedMenuOpen: boolean;
  setAdvancedMenuOpen: (open: boolean) => void;
  addAdvancedSection: (sectionType: string) => void;
  isSticky?: boolean;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  advancedMenuOpen,
  setAdvancedMenuOpen,
  addAdvancedSection,
  isSticky = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const containerClasses = isSticky 
    ? "sticky bottom-0 z-10 bg-[rgba(238,238,238,1)] transition-all duration-300 ease-in-out will-change-transform shadow-[0_-2px_6px_rgba(0,0,0,0.05)]" 
    : "bg-[rgba(238,238,238,1)] transition-all duration-300 ease-in-out";
  
  // Use useLayoutEffect to force repaints before visual updates
  useLayoutEffect(() => {
    if (isSticky && containerRef.current) {
      // Force layout recalculation and better compositing
      containerRef.current.style.transform = 'translateZ(0)';
      containerRef.current.style.willChange = 'transform';
      
      // Apply styles that trigger hardware acceleration
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.backfaceVisibility = 'hidden';
          containerRef.current.style.perspective = '1000px';
        }
      });
    }
  }, [isSticky]);
  
  // Additional effect for visibility changes
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Force repaint on sticky state changes
    const forceRepaint = () => {
      if (!containerRef.current) return;
      
      // Apply minimal style changes to force a repaint
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.opacity = '0.99';
          
          // Reset opacity in the next frame
          requestAnimationFrame(() => {
            if (containerRef.current) {
              containerRef.current.style.opacity = '1';
            }
          });
        }
      });
    };
    
    // Run immediately and after a short delay
    forceRepaint();
    const timeout = setTimeout(forceRepaint, 50);
    
    return () => clearTimeout(timeout);
  }, [isSticky]);

  return (
    <div className={containerClasses} ref={containerRef}>
      <Separator className="h-[2px] bg-gray-200" />
      <div className="rounded-md bg-white w-full overflow-hidden py-4 mb-2 px-[8px]">
        <div className="flex min-h-6 w-full items-center gap-2 px-2">
          <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
            Advanced Settings
          </div>
          <DropdownMenu open={advancedMenuOpen} onOpenChange={setAdvancedMenuOpen}>
            <DropdownMenuTrigger asChild>
              <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1 cursor-pointer hover:bg-gray-100">
                <Plus className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48">
              <DropdownMenuItem onClick={() => addAdvancedSection("ElementStyle")}>
                <Paintbrush className="mr-2 h-4 w-4" />
                <span>Element Style</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addAdvancedSection("Title")}>
                <Type className="mr-2 h-4 w-4" />
                <span>Title</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addAdvancedSection("Description")}>
                <FileType className="mr-2 h-4 w-4" />
                <span>Description</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addAdvancedSection("TableStyle")}>
                <Table className="mr-2 h-4 w-4" />
                <span>Table Style</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addAdvancedSection("Totals")}>
                <BarChart3 className="mr-2 h-4 w-4" />
                <span>Totals</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addAdvancedSection("Format")}>
                <FileType className="mr-2 h-4 w-4" />
                <span>Format</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addAdvancedSection("CustomMenu")}>
                <List className="mr-2 h-4 w-4" />
                <span>Custom Menu</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;
