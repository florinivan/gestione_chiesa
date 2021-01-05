import React from 'react';

export default function useDebounceSearch(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return function cleanup() {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}
