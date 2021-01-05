import { Nullable } from 'commons/types';
import { Logger } from 'commons/utils/Logger';
import { Observable, Subscription, PartialObserver } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

export enum SupportedStorage {
  LOCAL_STORAGE,
  SESSION_STORAGE
}

export interface GetStorageItemOptions<T> {
  /**
   * @see SupportedStorage
   * Defaults to `SupportedStorage.LOCAL_STORAGE`
   */
  storage: SupportedStorage;
  /**
   * An optional synchronous validation of the hydrated item:
   * Discards the item if the output **is not** null or undefined.
   */
  validateHydratedItem?: <V = unknown>(hydrated: T) => V | undefined | null;
  /**
   * Deserializes the value acquired from the local storage,
   * defaults to `JSON.parse`
   */
  hydrateFunction: (val: string) => T;
}

export interface SetStorageItemOptions<T> {
  /**
   * @see SupportedStorage
   * Defaults to `SupportedStorage.LOCAL_STORAGE`
   */
  storage: SupportedStorage;
  /**
   * Converts the value provided to `string`,
   * defaults to `JSON.stringify`.
   */
  serializeFunction: (val: T) => string;
}

function processSerializedItem<T>(
  serialized: Nullable<string>,
  options: GetStorageItemOptions<T>
): Nullable<T> {
  let output: Nullable<T> = null;

  if (serialized != null) {
    try {
      output = options.hydrateFunction(serialized);
    } catch (hydrateFunctionError) {
      Logger.error('storage', 'getStorageItem', 'hydration error', hydrateFunctionError);
      return null;
    }
  }

  if (typeof options.validateHydratedItem === 'function' && output !== null) {
    try {
      const validationOutput = options.validateHydratedItem(output);

      if (validationOutput != null) {
        throw validationOutput;
      }
    } catch (validationError) {
      Logger.error('storage', 'getStorageItem', 'validation error', validationError);
      return null;
    }
  }

  return output;
}

function selectStorage(supportedStorage: SupportedStorage): Storage {
  switch (supportedStorage) {
    case SupportedStorage.LOCAL_STORAGE:
      return window.localStorage;
    case SupportedStorage.SESSION_STORAGE:
      return window.sessionStorage;
    default: {
      throw new Error(`unsupported storage provided, '${supportedStorage}'`);
    }
  }
}

/**
 * Retrieves and hydrates an item from the selected `Storage`.
 * @param storageKey
 * @param options
 * @param options.storage defaults to `SupportedStorage.LOCAL_STORAGE`.
 * @param options.hydrateFunction defaults to `JSON.parse`.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
export function getStorageItem<T>(
  storageKey: string,
  options?: Nullable<Partial<GetStorageItemOptions<T>>>
): Nullable<T> {
  const opt: GetStorageItemOptions<T> = {
    storage: SupportedStorage.LOCAL_STORAGE,
    hydrateFunction: JSON.parse,
    ...options
  };

  let storage: Storage;
  let output: Nullable<T> = null;

  try {
    storage = selectStorage(opt.storage);

    const serialized: string | null = storage.getItem(storageKey);

    output = processSerializedItem(serialized, opt);
  } catch (err) {
    Logger.error('storage', 'getStorageItem', err);
  }

  return output;
}

/**
 * Sets and serializes an item to the selected `Storage`.
 * @param storageKey
 * @param value
 * @param options
 * @param options.storage defaults to `SupportedStorage.LOCAL_STORAGE`.
 * @param options.serializeFunction defaults to `JSON.stringify`.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
export function setStorageItem<T>(
  storageKey: string,
  value: T,
  options?: Nullable<Partial<SetStorageItemOptions<T>>>
): void {
  const opt: SetStorageItemOptions<T> = {
    storage: SupportedStorage.LOCAL_STORAGE,
    serializeFunction: JSON.stringify,
    ...options
  };

  let storage: Storage;

  try {
    storage = selectStorage(opt.storage);

    const serialized: string = opt.serializeFunction(value);

    storage.setItem(storageKey, serialized);
  } catch (err) {
    Logger.error('storage', 'setStorageItem', err);
  }
}

export interface CreatePersistToStorageSubscriptionOptions<T>
  extends Omit<PartialObserver<T>, 'next'> {
  setStorageItemOptions?: Partial<SetStorageItemOptions<T>>;
  debounceTimeMs?: number;
}

const defaultOptions = {
  debounceTimeMs: 300,
  error: Logger.error.bind(null, 'storage', 'createPersistToStorageSubscription', 'error')
};

/**
 * Asynchronously persists values emitted by 'observable$' in 'Storage'
 * according to the options provided.
 *
 * Returns a 'Subscription' object:
 * use 'subscription.unsubscribe()' to stop the synchronization.
 * @param observable$
 * @param storageKey
 * @param options
 */
export function createPersistToStorageSubscription<T>(
  observable$: Observable<T>,
  storageKey: string,
  options?: Nullable<CreatePersistToStorageSubscriptionOptions<T>>
): Subscription {
  const { debounceTimeMs, error, complete } = { ...defaultOptions, ...options };

  return observable$.pipe(distinctUntilChanged(), debounceTime(debounceTimeMs)).subscribe({
    next: (value: T) => setStorageItem<T>(storageKey, value, options?.setStorageItemOptions),
    error: error,
    complete: complete
  });
}
