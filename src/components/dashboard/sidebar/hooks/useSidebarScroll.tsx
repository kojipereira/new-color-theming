
import { useState, useEffect, RefObject } from 'react';
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
  const checkPositioning = () => {
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
  };

  // Function to manually show the sticky advanced settings
  const showStickyPanel = () => {
    setShowStickyAdvancedSettings(true);
  };

  // Function to handle scroll and determine which Advanced Settings to show
  useEffect(() => {
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollElement) return;
    
    // Initial check
    setTimeout(checkPositioning, 200);
    
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
    
    return () => {
      scrollElement.removeEventListener('scroll', handleScrollThrottled);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };
  }, [showStickyAdvancedSettings, isLocked]); // Include state dependencies to ensure effect updates properly

  // Add window resize listener with debounce
  useEffect(() => {
    let resizeTimeout: number | null = null;
    
    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      resizeTimeout = window.setTimeout(() => {
        checkPositioning();
        resizeTimeout = null;
      }, 200); // 200ms debounce
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, [showStickyAdvancedSettings, isLocked]); // Include state dependencies

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
  }, [showStickyAdvancedSettings, isLocked]); // Include dependencies

  return { showStickyAdvancedSettings, showStickyPanel };
};
