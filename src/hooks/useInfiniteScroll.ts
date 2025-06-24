import { useEffect, useRef } from "react";

export function useInfiniteScroll<T>(onTrigger: () => void) {
  const ref = useRef(null);

  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;

      onTrigger();
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onTrigger]);

  return { ref };
}
