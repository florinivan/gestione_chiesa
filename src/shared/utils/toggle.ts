import without from 'shared/utils/without';

export default function toggle<T>(array: T[] = [], item: T, state?: boolean): T[] {
  if (state === undefined) {
    state = !array.includes(item);
  } else if (state === array.includes(item)) {
    return array;
  }

  return state ? array.concat(item) : without(array, item);
}
