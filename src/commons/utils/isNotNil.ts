export default function isNotNil<T>(t: T | null | undefined): t is T {
  return t != null;
}
