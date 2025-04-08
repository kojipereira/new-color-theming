
import { useState, useEffect, RefObject } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const useSidebarScroll = (
  scrollAreaRef: RefObject<HTMLDivElement>,
  baseColumnsRef: RefObject<HTMLDivElement>
) => {
  // Scroll position tracking with state
  const [showStickyAdvancedSettings, setShowStickyAdvancedSettings] = useState(true);
  const isMobile = useIsMobile();
  
  // Create a ref to store the last state to prevent unnecessary re-renders
  const lastStateRef = useRef<boolean>(true);
  
  // Add a buffer zone to prevent flickering (in pixels)
  const STICKY_THRESHOLD_BUFFER = 80; // Increased buffer zone

  // Function to check positioning and update visibility
  const checkPositioning = () => {
    if (!scrollAreaRef.current || !baseColumnsRef.current) return;
    
    const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollElement) return;
    
    const baseColumnRect = baseColumnsRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Determine if the base columns section is below the viewport with buffer
    // Only change state if it's definitively above or below the threshold
    const shouldShowSticky = baseColumnRect.bottom > viewportHeight - STICKY_THRESHOLD_BUFFER;
    
    // Only update state if needed (prevents unnecessary re-renders)
    if (shouldShowSticky !== lastStateRef.current) {
      lastStateRef.current = shouldShowSticky;
      setShowStickyAdvancedSettings(shouldShowSticky);
    }
  };

  // Function to manually show the sticky advanced settings
  const showStickyPanel = () => {
    lastStateRef.current = true;
    setShowStickyAdvancedSettings(true);
    
    // Timeout to ensure the DOM has updated before checking position
    setTimeout(() => {
      checkPositioning();
    }, 200); // Increased timeout for more reliable checking
  };

  // Function to handle scroll and determine which Advanced Settings to show
  useEffect(() => {
    const handleScroll = () => {
      checkPositioning();
    };
    
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollElement) {
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
        scrollElement.removeEventListener('scroll', scrollListener);
      };
    }
  }, []);

  // Add window resize listener with debounce
  useEffect(() => {
    let resizeTimeout: number;
    
    const handleResize = () => {
      checkPositioning();
    };

    // Add debounce for better performance
    const debouncedResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      resizeTimeout = window.setTimeout(() => {
        handleResize();
      }, 200); // 200ms debounce for resize
    };

    window.addEventListener('resize', debouncedResize);
    
    // Initial check on mount with delay to ensure DOM is ready
    setTimeout(() => {
      checkPositioning();
    }, 200);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, []);

  // Additional effect to handle DOM mutations with debounce
  useEffect(() => {
    let mutationTimeout: number;
    
    // MutationObserver to detect changes in the DOM that might affect positioning
    const observer = new MutationObserver(() => {
      if (mutationTimeout) {
        window.clearTimeout(mutationTimeout);
      }
      
      mutationTimeout = window.setTimeout(() => {
        checkPositioning();
      }, 200);
    });
    
    // Observe the baseColumnsRef and scrollAreaRef for changes
    if (baseColumnsRef.current) {
      observer.observe(baseColumnsRef.current, { 
        subtree: true, 
        childList: true,
        attributes: true,
        characterData: true 
      });
    }
    
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
      if (mutationTimeout) {
        window.clearTimeout(mutationTimeout);
      }
    };
  }, [baseColumnsRef.current, scrollAreaRef.current]);

  return { showStickyAdvancedSettings, showStickyPanel };
};
