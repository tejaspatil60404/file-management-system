// frontend/src/hooks/useScrollAnimation.js

import { useEffect, useState, useRef } from 'react';

export const useScrollAnimation = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // If the element is intersecting (visible)
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Stop observing once it's visible to prevent re-triggering
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};
