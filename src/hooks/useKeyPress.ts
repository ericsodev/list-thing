import { useCallback, useEffect, useState } from "react";

export function useKeyPress(listenKey: string, cb: () => unknown, onKeyUp: boolean = false) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === listenKey) {
        cb();
      }
    },
    [listenKey, cb],
  );

  useEffect(() => {
    window.addEventListener(onKeyUp ? "keyup" : "keydown", handler);
    return () => {
      window.removeEventListener(onKeyUp ? "keyup" : "keydown", handler);
    };
  }, [onKeyUp, handler]);
}
