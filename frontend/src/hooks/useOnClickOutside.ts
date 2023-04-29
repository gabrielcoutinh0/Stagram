import { RefObject, MouseEventHandler, useEffect } from "react";

export const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };

    const exitWithEscape = (event: any) => {
      if (ref.current)
        if (ref.current.contains(event.target) && event.key === "Escape")
          return handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keydown", exitWithEscape);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keydown", exitWithEscape);
    };
  }, [ref, handler]);
};
