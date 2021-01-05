export interface PositionSortable {
  position: number;
}

export function comparePositionSortable(a: PositionSortable, b: PositionSortable) {
  return a.position - b.position;
}
