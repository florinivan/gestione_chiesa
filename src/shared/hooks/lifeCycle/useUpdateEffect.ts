import { useEffect } from 'react';
import { useFirstMountState } from 'shared/hooks/lifeCycle/useFirstMountState';

/**
 * 
 * @param effect : EffectCallback
 * @param deps 
 * @example
 *  useUpdateEffect(() => {
    console.log('count', count) // will only show 1 and beyond

    return () => { // *OPTIONAL*
      // do something on unmount
    }
  }) // you can include deps array if necessary

 */
export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  }, [deps, effect, isFirstMount]);
};
