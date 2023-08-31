import { useCallback, useEffect } from "react";

type Opts = {
  onKeyUp?: boolean;
  preventDefault?: boolean;
  stopProp?: boolean;
};

export function useKeyPress(
  listenKey: string,
  cb: () => unknown,
  { onKeyUp = false, preventDefault = false, stopProp = false }: Opts = {},
) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === listenKey) {
        if (preventDefault) {
          e.preventDefault();
        }
        if (stopProp) {
          e.stopPropagation();
        }
        cb();
      }
    },
    [listenKey, cb, preventDefault, stopProp],
  );

  useEffect(() => {
    window.addEventListener(onKeyUp ? "keyup" : "keydown", handler);
    return () => {
      window.removeEventListener(onKeyUp ? "keyup" : "keydown", handler);
    };
  }, [onKeyUp, handler]);
}
