
import { useCallback } from 'react';

export function useColorInteraction() {
  // Start dragging
  const startDrag = useCallback(
    (
      handler: (e: MouseEvent | TouchEvent) => void,
      event: React.MouseEvent | React.TouchEvent
    ) => {
      // Call handler immediately with the initial event
      if ('touches' in event) {
        handler(event.nativeEvent);
      } else {
        handler(event.nativeEvent);
      }
      
      // Add event listeners for move and end events
      const handleMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        handler(e);
      };
      
      const handleEnd = () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };
      
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    },
    []
  );

  return { startDrag };
}
