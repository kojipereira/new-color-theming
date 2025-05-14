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
  const containerClasses = isSticky ? "sticky bottom-0 z-10 bg-[rgba(238,238,238,1)] transition-all duration-300 ease-in-out will-change-transform shadow-[0_-2px_6px_rgba(0,0,0,0.05)]" : "bg-[rgba(238,238,238,1)] transition-all duration-300 ease-in-out";

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
  return <div className={containerClasses} ref={containerRef}>
      <Separator className="h-[2px] bg-gray-200" />
      
    </div>;
};
export default AdvancedSettings;