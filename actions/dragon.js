export const MOVE_DRAGON = "MOVE_DRAGON";

export function moveDragon(x, y) {
  return {
    type: MOVE_DRAGON,
    x,
    y
  };
}
