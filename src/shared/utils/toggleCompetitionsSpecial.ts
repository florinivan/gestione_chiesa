import without from 'shared/utils/without';

export default function toggleCompetitionsSpecial<T>(
  array: T[] = [],
  item: T,
  state?: boolean
): T[] {
  if (state === undefined) {
    state = !array.includes(item);
  } else if (state === array.includes(item)) {
    return array;
  }

  return state ? [item, ...array] : without(array, item);
}
