
import { useEffect } from 'react';

/**
 * A custom hook for handling global events
 * @param eventName The name of the event to listen for
 * @param handler The callback function to execute when the event occurs
 * @param element The DOM element to attach the event to (defaults to window)
 */
const useEvent = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: EventTarget = window
) => {
  useEffect(() => {
    // Add event listener when the component mounts
    element.addEventListener(eventName, handler as EventListener);

    // Clean up the event listener when the component unmounts
    return () => {
      element.removeEventListener(eventName, handler as EventListener);
    };
  }, [eventName, handler, element]);
};

export default useEvent;
