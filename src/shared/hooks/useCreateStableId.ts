import { Nullable } from 'commons/types';
import React from 'react';
import uniqueId from 'lodash/uniqueId';

const prefix = 'fr-id';

/**
 * Outputs a unique string that is stable, hence it is the same string,
 * during the lifecycle of the component this hooks is invoked in.
 */
export function useCreateStableId(): string {
  const idRef = React.useRef<Nullable<string>>(null);

  if (idRef.current === null) {
    const rand = Math.random().toString(16).slice(2);

    idRef.current = uniqueId(`${prefix}-${rand}-`);
  }

  return idRef.current;
}
