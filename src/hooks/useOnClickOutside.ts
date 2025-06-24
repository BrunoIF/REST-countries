import { useEffect } from "react";

export function useOnClickOutside(
  ref: React.RefObject<Element>,
  callback: () => void
) {
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current.contains(e.target)) {
        callback();
      }
    };

    if (ref.current) {
      document.addEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, []);
}
