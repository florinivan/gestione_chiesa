/**
 * Returns `true` if value greater or equal `lowerBound`
 * and lower or equal `upperBound`.
 * @param value
 * @param lowerBound
 * @param uppperBound
 */
export function isBetween(
  value: Date | number,
  lowerBound: Date | number,
  uppperBound: Date | number
): boolean {
  const instant = typeof value === 'number' ? value : value.getTime();
  const from = typeof lowerBound === 'number' ? lowerBound : lowerBound.getTime();
  const until = typeof uppperBound === 'number' ? uppperBound : uppperBound.getTime();

  return instant >= from && instant <= until;
}
