export function compare<T>(target: Array<T>, arr?: Array<T>) {
  if (target.length === 0) {
    return false;
  }
  return target.some((v) => arr?.includes(v));
}
