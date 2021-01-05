export default function without<T>(array: T[] = [], item: T): T[] {
  const filtered = array.filter((i) => i !== item);
  if (filtered.length !== array.length) {
    return filtered;
  } else {
    return array;
  }
}
