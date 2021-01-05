import React from 'react';

interface Size {
  width: number;
  height: number;
}

export default function useOffsetSize<E extends HTMLElement>(ref: React.RefObject<E | null>) {
  const [size, setSize] = React.useState<Size | null>(null);

  React.useLayoutEffect(() => {
    let ignore = false;
    let rafId: number | null = null;

    function update() {
      if (!ignore) {
        rafId = requestAnimationFrame(update);

        if (ref.current != null) {
          const width = ref.current.offsetWidth;
          const height = ref.current.offsetHeight;

          setSize(size =>
            size == null || size.width !== width || size.height !== height
              ? { width, height }
              : size
          );
        }
      }
    }

    update();

    return () => {
      ignore = true;

      if (rafId != null) {
        cancelAnimationFrame(rafId);
      }
    };
  });

  return size;
}
