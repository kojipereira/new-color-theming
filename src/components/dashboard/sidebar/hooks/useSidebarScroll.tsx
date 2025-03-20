
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
    const viewportHeight = window.innerHeight;


    // Determine if the base columns section is below the viewport
if (baseColumnRect.bottom > viewportHeight - 80) {
      // Base columns section is below or partially below the viewport
      // Show the sticky version
      setShowStickyAdvancedSettings(true);
    } else {
      // Base columns section is fully visible within the viewport
      // Hide the sticky version, show the inline version
      setShowStickyAdvancedSettings(false);
    }
  };

  // Function to manually show the sticky advanced settings
  const showStickyPanel = () => {
    setShowStickyAdvancedSettings(true);
    
    // Timeout to ensure the DOM has updated before checking position
    setTimeout(() => {
      checkPositioning();
    }, 100); // Increased timeout for more reliable checking
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
    setTimeout(() => {
      checkPositioning();
    }, 100); // Delayed initial check to ensure DOM is fully rendered
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, []);

  // Additional effect to handle window changes that might affect positioning
  useEffect(() => {
    // MutationObserver to detect changes in the DOM that might affect positioning
    const observer = new MutationObserver(() => {
      setTimeout(() => {
        checkPositioning();
      }, 50);
    });
    
    // Observe the baseColumnsRef for changes
    if (baseColumnsRef.current) {
      observer.observe(baseColumnsRef.current, { 
        subtree: true, 
        childList: true,
        attributes: true,
        characterData: true 
      });
    }
    
    // Observe the scrollAreaRef for changes
    if (scrollAreaRef.current) {
      observer.observe(scrollAreaRef.current, { 
        subtree: true, 
        childList: true,
        attributes: true,
        characterData: true 
      });
    }
    
    return () => {
      observer.disconnect();
    };
  }, [baseColumnsRef.current, scrollAreaRef.current]);

  return { showStickyAdvancedSettings, showStickyPanel };
};
