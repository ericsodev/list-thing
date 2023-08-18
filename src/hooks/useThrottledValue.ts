import { useEffect, useRef, useState } from "react";

export default function useThrottled<T>(value: T, limit: number = 200) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      function () {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      },
      limit - (Date.now() - lastRan.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}
