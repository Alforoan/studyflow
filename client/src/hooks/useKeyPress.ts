// hooks/useKeyPress.ts
import { useEffect } from "react";

const useKeyPress = (targetKey: string, callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetKey, callback]);
};

export default useKeyPress;
