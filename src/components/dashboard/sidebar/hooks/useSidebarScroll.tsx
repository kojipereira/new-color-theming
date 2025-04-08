
import { useState, useEffect, RefObject, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const useSidebarScroll = (
  scrollAreaRef: RefObject<HTMLDivElement>,
  baseColumnsRef: RefObject<HTMLDivElement>
) => {
  // Scroll position tracking with state
  const [showStickyAdvancedSettings, setShowStickyAdvancedSettings] = useState(true);
  const isMobile = useIsMobile();
  
  // Create a ref to store the last state to prevent unnecessary re-renders
  // Explicitly type the ref as boolean to avoid TypeScript inference issues
  const lastStateRef = useRef<boolean>(true);
  
  // Add a significant buffer zone to prevent flickering (in pixels)
  const STICKY_THRESHOLD_BUFFER = 120; // Increased buffer zone further
  
  // Add hysteresis thresholds to prevent rapid toggling
  const SHOW_THRESHOLD = window.innerHeight - STICKY_THRESHOLD_BUFFER;
  const HIDE_THRESHOLD = window.innerHeight - (STICKY_THRESHOLD_BUFFER - 40); // Different threshold for hiding
  
  // Track whether we're currently processing a state change
  const isProcessingRef = useRef<boolean>(false);
  
  // Function to check positioning and update visibility with hysteresis
  const checkPositioning = () => {
    if (isProcessingRef.current) return; // Skip if already processing
    if (!scrollAreaRef.current || !baseColumnsRef.current) return;
    
    const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollElement) return;
    
    const baseColumnRect = baseColumnsRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // If we're currently showing the sticky settings
    if (lastStateRef.current) {
      // Only hide if it's clearly above the HIDE threshold
      if (baseColumnRect.bottom < HIDE_THRESHOLD) {
        if (lastStateRef.current === true) { // Fix: use strict equality comparison
          isProcessingRef.current = true;
          lastStateRef.current = false;
          setShowStickyAdvancedSettings(false);
          
          // Reset processing flag after animation completes
          setTimeout(() => {
            isProcessingRef.current = false;
          }, 300);
        }
      }
    } else {
      // Only show if it's clearly below the SHOW threshold
      if (baseColumnRect.bottom > SHOW_THRESHOLD) {
        if (lastStateRef.current === false) { // Fix: use strict equality comparison
          isProcessingRef.current = true;
          lastStateRef.current = true;
          setShowStickyAdvancedSettings(true);
          
          // Reset processing flag after animation completes
          setTimeout(() => {
            isProcessingRef.current = false;
          }, 300);
        }
      }
    }
  };

  // Function to manually show the sticky advanced settings
  const showStickyPanel = () => {
    if (isProcessingRef.current) return;
    
    isProcessingRef.current = true;
    lastStateRef.current = true;
    setShowStickyAdvancedSettings(true);
    
    // Reset processing flag after animation completes
    setTimeout(() => {
      isProcessingRef.current = false;
      checkPositioning();
    }, 300);
  };

  // Function to handle scroll with improved throttling
  useEffect(() => {
    let scrollTicking = false;
    let scrollTimeout: number;
    
    const handleScroll = () => {
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          checkPositioning();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
      
      // Additional debounce to ensure a stable state after scrolling stops
      scrollTimeout = window.setTimeout(() => {
        checkPositioning();
      }, 200);
    };
    
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
        if (scrollTimeout) {
          window.clearTimeout(scrollTimeout);
        }
      };
    }
  }, []);

  // Add window resize listener with improved debounce
  useEffect(() => {
    let resizeTimeout: number;
    let isResizing = false;
    
    const handleResize = () => {
      if (!isResizing) {
        isResizing = true;
        
        // Update thresholds when window size changes
        const viewportHeight = window.innerHeight;
        
        window.requestAnimationFrame(() => {
          checkPositioning();
          isResizing = false;
        });
      }
      
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      // Final check after resizing stops
      resizeTimeout = window.setTimeout(() => {
        checkPositioning();
      }, 300);
    };

    window.addEventListener('resize', handleResize);
    
    // Initial check on mount with delay to ensure DOM is ready
    setTimeout(() => {
      checkPositioning();
    }, 300);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, []);

  // Additional effect to handle DOM mutations with improved strategy
  useEffect(() => {
    let mutationTimeout: number;
    
    // MutationObserver to detect changes in the DOM that might affect positioning
    const observer = new MutationObserver(() => {
      if (mutationTimeout) {
        window.clearTimeout(mutationTimeout);
      }
      
      // Use a longer timeout for DOM mutations to avoid rapid recalculations
      mutationTimeout = window.setTimeout(() => {
        checkPositioning();
      }, 300);
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
    
    // Additional check periodically during initial loading
    const initialStabilityCheck = setInterval(() => {
      checkPositioning();
    }, 500);
    
    // Clear periodic check after 2 seconds
    setTimeout(() => {
      clearInterval(initialStabilityCheck);
    }, 2000);
    
    return () => {
      observer.disconnect();
      if (mutationTimeout) {
        window.clearTimeout(mutationTimeout);
      }
      clearInterval(initialStabilityCheck);
    };
  }, [baseColumnsRef.current, scrollAreaRef.current]);

  return { showStickyAdvancedSettings, showStickyPanel };
};
