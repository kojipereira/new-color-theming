import { useState, useEffect, RefObject } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const useSidebarScroll = (
  scrollAreaRef: RefObject<HTMLDivElement>,
  baseColumnsRef: RefObject<HTMLDivElement>
) => {
  // Scroll position tracking - add buffer to prevent flickering
  const [showStickyAdvancedSettings, setShowStickyAdvancedSettings] = useState(true);
  const isMobile = useIsMobile();
  
  // Debounce mechanism for state updates to prevent flickering
  const debouncedSetShowSticky = (shouldShow: boolean) => {
    // Only update state if it's different to avoid unnecessary re-renders
    if (showStickyAdvancedSettings !== shouldShow) {
      // Add a small delay to debounce rapid changes (prevents flickering)
      setTimeout(() => {
        setShowStickyAdvancedSettings(shouldShow);
      }, 50);
    }
  };

  // Function to check positioning and update visibility with buffer
  const checkPositioning = () => {
    if (!scrollAreaRef.current || !baseColumnsRef.current) return;
    
    const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollElement) return;
    
    const baseColumnRect = baseColumnsRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Add a buffer zone (20px) to prevent flickering around the threshold
    const bufferZone = 20;
    
    // If currently showing sticky and base column is above threshold + buffer, hide sticky
    if (showStickyAdvancedSettings && baseColumnRect.bottom < viewportHeight - bufferZone) {
      debouncedSetShowSticky(false);
    } 
    // If currently not showing sticky and base column is below threshold - buffer, show sticky
    else if (!showStickyAdvancedSettings && baseColumnRect.bottom > viewportHeight + bufferZone) {
      debouncedSetShowSticky(true);
    }
    // Otherwise maintain current state to prevent rapid toggling
  };

  // Function to manually show the sticky advanced settings
  const showStickyPanel = () => {
    debouncedSetShowSticky(true);
    
    // Timeout to ensure the DOM has updated before checking position
    setTimeout(() => {
      checkPositioning();
    }, 150); // Increased timeout for more reliable checking
  };

  // Function to handle scroll and determine which Advanced Settings to show
  useEffect(() => {
    // Throttle mechanism
    let isThrottled = false;
    
    const handleScroll = () => {
      if (!isThrottled) {
        checkPositioning();
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
          // Check again after throttle period to catch any missed updates
          checkPositioning();
        }, 100);
      }
    };
    
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      
      // Initial check
      setTimeout(handleScroll, 100);
      
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scrollAreaRef.current]);

  // Add window resize listener
  useEffect(() => {
    let resizeTimeout: number;
    
    const handleResize = () => {
      checkPositioning();
    };

    // Throttled resize handler
    const throttledResize = () => {
      if (!resizeTimeout) {
        resizeTimeout = window.setTimeout(() => {
          resizeTimeout = 0;
          handleResize();
        }, 100);
      }
    };

    window.addEventListener('resize', throttledResize);
    
    // Initial check on mount with delay to ensure DOM is ready
    setTimeout(checkPositioning, 200);
    
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, []);

  // Additional effect to handle DOM mutations that might affect positioning
  useEffect(() => {
    // Using a more robust approach with MutationObserver
    const observer = new MutationObserver(() => {
      // Delay the check to ensure the DOM has settled
      setTimeout(checkPositioning, 100);
    });
    
    // Observe both relevant refs with comprehensive options
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
    };
  }, [baseColumnsRef.current, scrollAreaRef.current]);

  return { showStickyAdvancedSettings, showStickyPanel };
};
