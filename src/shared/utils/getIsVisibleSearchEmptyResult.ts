export function getIsVisibleSearchEmptyResult(
  childElementCount: number | undefined,
  valueLength: number
) {
  return childElementCount === 0 && valueLength > 2 ? true : false;
}
