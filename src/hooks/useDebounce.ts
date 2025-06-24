import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [state, setState] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return state;
}
