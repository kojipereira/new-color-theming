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
  
  // Function to check positioning and update visibility - much more aggressive
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

  // Force a check on small screens - immediate action taken
  const checkScreenSize = useCallback(() => {
    if (!baseColumnsRef.current || !scrollAreaRef.current) return;
    
    // Get base columns height to compare against viewport
    const baseColumnRect = baseColumnsRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // If base columns extend below viewport, immediately show the sticky panel
    if (baseColumnRect.bottom > viewportHeight - 20) { // smaller buffer for immediate action
      setShowStickyAdvancedSettings(true);
    }
  }, [baseColumnsRef]);

  // Immediate check as soon as component mounts
  useEffect(() => {
    // Try to force it immediately
    checkScreenSize();
    
    // Check after a short delay to ensure DOM measurements are accurate
    const timeoutId = setTimeout(checkScreenSize, 10);
    
    return () => clearTimeout(timeoutId);
  }, [checkScreenSize]);

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
    
    // Check multiple times during load to catch any timing issues
    checkPositioning();
    setTimeout(checkPositioning, 0);
    setTimeout(checkPositioning, 50);
    setTimeout(checkPositioning, 100);
    
    // Set up a forced check after a delay
    const checkTimeout = setTimeout(() => {
      checkScreenSize();
    }, 250);
    
    return () => {
      scrollElement.removeEventListener('scroll', handleScrollThrottled);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      clearTimeout(checkTimeout);
    };
  }, [checkPositioning, checkScreenSize, scrollAreaRef]);

  // Run a screen size check when document is ready - more aggressive approach
  useEffect(() => {
    // Check immediately
    requestAnimationFrame(() => {
      checkScreenSize();
      // Run another check to be sure
      requestAnimationFrame(checkScreenSize);
    });
    
    // Set up load event listeners
    const handleLoad = () => {
      checkScreenSize();
      setTimeout(checkScreenSize, 100);
    };
    
    // If document is already loaded, run check now
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Otherwise wait for load events
      window.addEventListener('load', handleLoad);
      document.addEventListener('DOMContentLoaded', handleLoad);
    }
    
    return () => {
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', handleLoad);
    };
  }, [checkScreenSize]);

  // Add window resize listener with debounce
  useEffect(() => {
    let resizeTimeout: number | null = null;
    
    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      // Immediate check for faster response
      checkScreenSize();
      
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
  }, [checkPositioning, checkScreenSize]);

  // Add MutationObserver for DOM changes
  useEffect(() => {
    // Don't update the state too frequently
    let updateTimeout: number | null = null;
    const debouncedPositionCheck = () => {
      if (updateTimeout) return;
      
      updateTimeout = window.setTimeout(() => {
        checkPositioning();
        checkScreenSize(); // Also check screen size when DOM changes
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
  }, [checkPositioning, checkScreenSize, baseColumnsRef, scrollAreaRef]);

  return { showStickyAdvancedSettings, showStickyPanel };
};
