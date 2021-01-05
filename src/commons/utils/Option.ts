export class Option<T> {
  private readonly _value: NonNullable<T> | null;

  static some<U>(value: U): Option<U> {
    return new Option<U>(value);
  }

  static none<U>(): Option<U> {
    return new Option<U>(null);
  }

  private constructor(value: T | undefined | null) {
    if (value == null) {
      this._value = null;
    } else {
      this._value = value as NonNullable<T>;
    }

    if (typeof Object.freeze === 'function') {
      Object.freeze(this);
    }
  }

  isPresent(): boolean {
    return this._value != null;
  }

  isEmpty(): boolean {
    return !this.isPresent();
  }

  orElse<U>(otherVal: T | U): T | U {
    if (this._value == null) {
      return otherVal;
    }
    return this._value;
  }

  orElseThrow(errorMessage: string): NonNullable<T> {
    if (this._value != null) {
      return this._value;
    }

    throw new Error(errorMessage);
  }

  map<U>(func: (arg: NonNullable<T>) => U): Option<NonNullable<U>> {
    if (this._value == null) {
      return (this as unknown) as Option<NonNullable<U>>;
    }

    return new Option(func(this._value)) as Option<NonNullable<U>>;
  }

  flatMap<U>(func: (arg: NonNullable<T>) => Option<U>): Option<U> {
    if (this._value == null) {
      return (this as unknown) as Option<U>;
    }

    const output = func(this._value);

    if (output instanceof Option) {
      return output as Option<NonNullable<U>>;
    } else {
      return new Option<U>(output) as Option<NonNullable<U>>;
    }
  }
}
