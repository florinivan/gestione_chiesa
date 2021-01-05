/**
 *
 * @param referenceClass
 * @param obj
 *
 * @description casts an object to a specific Class
 */
export function castTo(referenceClass: Function, obj: Record<string, unknown>) {
  return Object.setPrototypeOf(obj, referenceClass.prototype);
}
