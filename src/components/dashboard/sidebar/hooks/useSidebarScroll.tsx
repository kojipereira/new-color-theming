
import { useState, useEffect, RefObject, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const useSidebarScroll = (
  scrollAreaRef: RefObject<HTMLDivElement>,
  baseColumnsRef: RefObject<HTMLDivElement>
) => {
  // State for showing the sticky advanced settings
  const [showStickyAdvancedSettings, setShowStickyAdvancedSettings] = useState(false);
  // Track last position to avoid unnecessary state changes
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const isMobile = useIsMobile();

  // Create a locked state to prevent rapid toggling when near the threshold
  const [isLocked, setIsLocked] = useState(false);
  
  // Add buffer to prevent flickering - separate thresholds for showing/hiding
  const BUFFER_SHOW = 50;  // Buffer when deciding to show
  const BUFFER_HIDE = 70;  // Larger buffer when deciding to hide (hysteresis)
  
  // Function to check positioning and update visibility
  const checkPositioning = useCallback(() => {
    if (!scrollAreaRef.current || !baseColumnsRef.current) return;
    
    const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollElement) return;
    
    const baseColumnRect = baseColumnsRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const currentPosition = scrollElement.scrollTop;

    // Don't check if we just checked recently (debounce-like behavior)
    if (Math.abs(currentPosition - lastScrollPosition) < 10) return;
    setLastScrollPosition(currentPosition);

    // If the lock is active, don't change state
    if (isLocked) return;

    // Determine if the base columns section is below or near the viewport bottom
    if (showStickyAdvancedSettings) {
      // If already showing sticky, use the hide threshold (more scrolling required to hide)
      if (baseColumnRect.bottom < viewportHeight - BUFFER_HIDE) {
        setIsLocked(true);
        setShowStickyAdvancedSettings(false);
        setTimeout(() => setIsLocked(false), 300); // Keep locked for 300ms to prevent toggling back
      }
    } else {
      // If not showing sticky, use the show threshold
      if (baseColumnRect.bottom > viewportHeight - BUFFER_SHOW) {
        setIsLocked(true);
        setShowStickyAdvancedSettings(true);
        setTimeout(() => setIsLocked(false), 300); // Keep locked for 300ms to prevent toggling back
      }
    }
  }, [showStickyAdvancedSettings, isLocked, scrollAreaRef, baseColumnsRef, lastScrollPosition]);

  // Function to manually show the sticky advanced settings
  const showStickyPanel = useCallback(() => {
    setShowStickyAdvancedSettings(true);
  }, []);

  // Helper function to ensure multiple checks are run on load
  const runInitialChecks = useCallback(() => {
    // Immediate check
    checkPositioning();
    
    // Check after a short delay (DOM fully rendered)
    setTimeout(checkPositioning, 100);
    
    // Check after slightly longer delay (styles applied)
    setTimeout(checkPositioning, 300);
    
    // Check after layout shifts may have occurred
    setTimeout(checkPositioning, 500);
    
    // Use RAF for smooth timing with the browser's render cycle
    requestAnimationFrame(() => {
      checkPositioning();
      // Double RAF ensures we run after the next paint
      requestAnimationFrame(checkPositioning);
    });
  }, [checkPositioning]);

  // Function to handle scroll and determine which Advanced Settings to show
  useEffect(() => {
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollElement) return;
    
    // Throttled scroll event handler
    let scrollTimeout: number | null = null;
    const handleScrollThrottled = () => {
      if (scrollTimeout === null) {
        scrollTimeout = window.setTimeout(() => {
          checkPositioning();
          scrollTimeout = null;
        }, 100);
      }
    };
    
    scrollElement.addEventListener('scroll', handleScrollThrottled, { passive: true });
    
    // Run initial check on mount
    runInitialChecks();
    
    return () => {
      scrollElement.removeEventListener('scroll', handleScrollThrottled);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };
  }, [checkPositioning, runInitialChecks, scrollAreaRef]);

  // Initial load check - run after component is fully mounted
  useEffect(() => {
    // Set up the load event listener
    window.addEventListener('load', runInitialChecks, { once: true });
    
    // Use DOMContentLoaded as a backup if load hasn't fired yet
    if (document.readyState === 'complete') {
      runInitialChecks();
    } else {
      document.addEventListener('DOMContentLoaded', runInitialChecks, { once: true });
    }
    
    return () => {
      window.removeEventListener('load', runInitialChecks);
      document.removeEventListener('DOMContentLoaded', runInitialChecks);
    };
  }, [runInitialChecks]);

  // Add window resize listener with debounce
  useEffect(() => {
    let resizeTimeout: number | null = null;
    
    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      // Immediate check for faster response
      checkPositioning();
      
      // Additional check after animation frames have settled
      resizeTimeout = window.setTimeout(() => {
        checkPositioning();
        resizeTimeout = null;
      }, 150); // 150ms debounce
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, [checkPositioning]);

  // Add MutationObserver for DOM changes
  useEffect(() => {
    // Don't update the state too frequently
    let updateTimeout: number | null = null;
    const debouncedPositionCheck = () => {
      if (updateTimeout) return;
      
      updateTimeout = window.setTimeout(() => {
        checkPositioning();
        updateTimeout = null;
      }, 200);
    };
    
    const observer = new MutationObserver(debouncedPositionCheck);
    
    if (baseColumnsRef.current) {
      observer.observe(baseColumnsRef.current, { 
        subtree: true, 
        childList: true,
        attributes: true,
      });
    }
    
    if (scrollAreaRef.current) {
      observer.observe(scrollAreaRef.current, { 
        subtree: true, 
        childList: true,
        attributes: true,
      });
    }
    
    return () => {
      observer.disconnect();
      if (updateTimeout) {
        window.clearTimeout(updateTimeout);
      }
    };
  }, [checkPositioning, baseColumnsRef, scrollAreaRef]);

  return { showStickyAdvancedSettings, showStickyPanel };
};
