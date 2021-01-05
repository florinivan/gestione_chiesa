import { Nullable } from 'commons/types';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  getStorageItem,
  GetStorageItemOptions,
  createPersistToStorageSubscription,
  CreatePersistToStorageSubscriptionOptions
} from 'shared/utils/storage';
import { skip } from 'rxjs/operators';

export interface PersistedStateOptions<T> extends CreatePersistToStorageSubscriptionOptions<T> {
  getStorageItemOptions?: Partial<GetStorageItemOptions<T>>;
}

export class PersistedState<T> {
  readonly behaviorSubject: BehaviorSubject<T>;

  private _storageSubscription: Subscription | null = null;
  private readonly _persistStateOptions: Nullable<PersistedStateOptions<T>>;
  private readonly _storageKey: string;

  constructor(fallbackInitialState: T, storageKey: string, options?: PersistedStateOptions<T>) {
    const initialState =
      getStorageItem(storageKey, options?.getStorageItemOptions) ?? fallbackInitialState;

    this.behaviorSubject = new BehaviorSubject<T>(initialState);
    this._storageKey = storageKey;
    this._storageSubscription = null;
    this._persistStateOptions = options ?? null;

    this.persistStateUpdates({ skipFirst: initialState !== fallbackInitialState });
  }

  /**
   * Initialize synchronization of updates of `this.behaviorSubject`
   * to the selected `Storage`.
   * If a synchronization is already up, this method has no effect.
   * @param opt
   */
  persistStateUpdates(opt?: Partial<{ skipFirst: boolean }>) {
    if (this._storageSubscription) {
      return;
    }

    const obs$ = opt?.skipFirst ? this.behaviorSubject.pipe(skip(1)) : this.behaviorSubject;

    this._storageSubscription = createPersistToStorageSubscription(
      obs$,
      this._storageKey,
      this._persistStateOptions
    );
  }

  /**
   * Stops synchronization to the selected `Storage`, if necessary.
   */
  stopPersistingStateUpdates() {
    if (this._storageSubscription) {
      this._storageSubscription.unsubscribe();
    }

    this._storageSubscription = null;
  }

  /**
   * Returns `true` if we are synchronizing values to the desired `Storage`.
   */
  isPersistingUpdates = (): boolean => {
    return !!this._storageSubscription;
  };
}
