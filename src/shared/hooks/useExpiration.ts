import { useState, useEffect } from 'react';

const _increment = (count: number): number => {
  return count + 1;
};

export const useExpiration = (timestamp: number | null | undefined): boolean => {
  const visible = timestamp != null && Date.now() <= timestamp;
  const [, forceRerender] = useState(0);
  useEffect(() => {
    if (visible && timestamp != null) {
      const timeoutId = setTimeout(forceRerender, Math.max(0, timestamp - Date.now()), _increment);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return;
  }, [visible, timestamp]);
  return visible;
};
