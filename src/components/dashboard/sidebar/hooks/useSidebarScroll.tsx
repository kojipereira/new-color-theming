
import { useState, useEffect, RefObject } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const useSidebarScroll = (
  scrollAreaRef: RefObject<HTMLDivElement>,
  baseColumnsRef: RefObject<HTMLDivElement>
) => {
  // Scroll position tracking - add buffer to prevent flickering
  const [showStickyAdvancedSettings, setShowStickyAdvancedSettings] = useState(true);
  const isMobile = useIsMobile();

  // Function to check positioning and update visibility
  const checkPositioning = () => {
    if (!scrollAreaRef.current || !baseColumnsRef.current) return;
    
    const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollElement) return;
    
    const baseColumnRect = baseColumnsRef.current.getBoundingClientRect();
    const baseColumnsBottom = baseColumnRect.bottom;
    const baseColumnsTop = baseColumnRect.top;
    const viewportHeight = window.innerHeight;
    
    // Add a buffer zone to prevent flickering
    // Only switch visibility when the element is well into view or out of view
    const buffer = 20; // pixels of buffer to prevent flicker

    if (baseColumnsBottom < viewportHeight - buffer) {
      // Base columns section is fully visible and above the bottom of the viewport with buffer
      setShowStickyAdvancedSettings(false);
    } else if (baseColumnsBottom > viewportHeight + buffer || baseColumnsTop > viewportHeight) {
      // Base columns section is below the viewport or partially visible at the bottom
      setShowStickyAdvancedSettings(true);
    }
    // If we're in the buffer zone, maintain the current state to prevent flickering
  };

  // Function to manually show the sticky advanced settings
  const showStickyPanel = () => {
    setShowStickyAdvancedSettings(true);
  };

  // Function to handle scroll and determine which Advanced Settings to show
  useEffect(() => {
    const handleScroll = () => {
      checkPositioning();
    };
    
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      
      // Use requestAnimationFrame to throttle scroll events
      let ticking = false;
      const scrollListener = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
      
      scrollElement.addEventListener('scroll', scrollListener, { passive: true });
      
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
        scrollElement.removeEventListener('scroll', scrollListener);
      };
    }
  }, []);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      // Use throttling for resize events as well
      checkPositioning();
    };

    // Add debounce/throttle for better performance
    let resizeTimeout: number;
    const throttledResize = () => {
      if (!resizeTimeout) {
        resizeTimeout = window.setTimeout(() => {
          resizeTimeout = 0;
          handleResize();
        }, 100); // 100ms throttle for resize
      }
    };

    window.addEventListener('resize', throttledResize);
    
    // Initial check on mount
    checkPositioning();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, []);

  return { showStickyAdvancedSettings, showStickyPanel };
};
