/**
 * Sets the correct `position` value for sorting.
 * This trick is necessary because sorting works this way:
 * - Smallest value (other then 0) goes first.
 * - Biggest value (other then 0) goes second-last.
 * - 0 goes last.
 */
export function getPositionForSorting(position: number): number {
  return position !== 0 ? position : 1_000_000;
}

/**
 * Selects from an object a position that is suitable
 * to be ordered according to the BE sorting clauses.
 * @see getPositionForSorting
 * @param obj
 */
export function selectPositionForSortingFrom<T extends { position: number }>(obj: T): number {
  return getPositionForSorting(obj.position);
}
