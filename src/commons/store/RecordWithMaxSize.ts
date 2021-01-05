import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

/**
 * A Map-like data structure with a max size,
 * It holds at most `maxSize` values.
 * if the record `size` exceed `maxSize` oldest entries
 * are removed until `size` is at most `maxSize`.
 */
export class RecordWithMaxSize<V, K extends string = string> {
  private readonly maxSize: number;
  private _data$: BehaviorSubject<Readonly<Record<K, V>>>;
  private _keysQueue: K[];

  /**
   * Constructs a record with a specific `maxSize`.
   *
   * Throws error if `maxSize` is not a valid safe integer greater or equal `0`.
   * @param maxSize
   */
  constructor(maxSize: number) {
    if (typeof maxSize !== 'number' || maxSize < 0 || !Number.isSafeInteger(maxSize)) {
      throw new TypeError(
        `RecordWithMaxSize: expected max size to be an integer >= 0, got ${maxSize} instead`
      );
    }

    this.maxSize = maxSize;

    this._keysQueue = [];

    this._data$ = new BehaviorSubject<Record<K, V>>({} as Readonly<Record<K, V>>);
  }

  private updateKeysQueue(newKey: K): void {
    if (this._keysQueue.length > 0) {
      this._keysQueue = this._keysQueue.filter(storedKey => newKey !== storedKey);
    }

    this._keysQueue.unshift(newKey);

    if (this._keysQueue.length > this.maxSize) {
      this._keysQueue = this._keysQueue.slice(0, this.maxSize);
    }
  }

  private updateData$(key: K, value: V) {
    const previousData = this._data$.getValue();
    const nextData = Object.fromEntries(this._keysQueue.map(k => [k, previousData[k]])) as Record<
      K,
      V
    >;
    nextData[key] = value;

    this._data$.next(nextData);
  }

  get size(): number {
    return this._keysQueue.length;
  }

  /**
   * Adds `key` -> `value` entry.
   * If the maxSize is reached oldest entries are removed
   * until the amount of entries is `maxSize`.
   * Returns `this`.
   * @param key
   * @param value
   */
  set(key: K, value: V): this {
    this.updateKeysQueue(key);
    this.updateData$(key, value);
    return this;
  }

  /**
   * Removes the entry [key, record.get(key)], if present.
   * Returns this.
   * @param key
   */
  remove(key: K): this {
    const withoutKey = this._keysQueue.filter(k => key !== k);

    if (withoutKey.length !== this._keysQueue.length) {
      this._keysQueue = withoutKey;
      const previousData = this._data$.getValue();

      this._data$.next(
        Object.fromEntries(this._keysQueue.map(k => [k, previousData[k]])) as Record<K, V>
      );
    }

    return this;
  }

  /**
   * Erases all data and returns `this`.
   */
  clear = (): this => {
    if (this._keysQueue.length !== 0) {
      this._keysQueue = [];
      this._data$.next({} as Record<K, V>);
    }

    return this;
  };

  /**
   * Extracts `value` using `key`.
   * @param key
   */
  get(key: K): V | undefined {
    const value = this._data$.getValue()[key];

    return value;
  }

  /**
   * Creates an observable that emits the latest value indexed by `key`.
   * @param key
   */
  get$(key: K): Observable<V | undefined> {
    return this._data$.pipe(pluck(key));
  }

  /**
   * Returns all values of the record as an array.
   */
  values(): V[] {
    return Object.values(this._data$.getValue());
  }

  /**
   * Returns all keys of the record as an array
   */
  keys(): K[] {
    return Object.keys(this._data$.getValue()) as K[];
  }

  /**
   * Returns all entries of the record as an array
   */
  entries(): [K, V][] {
    return Object.entries(this._data$.getValue()) as [K, V][];
  }
}
