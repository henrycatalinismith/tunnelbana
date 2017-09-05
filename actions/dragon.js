export const DRAGON_GRAB = "DRAGON_GRAB";
export const DRAGON_MOVE = "DRAGON_MOVE";
export const DRAGON_DROP = "DRAGON_DROP";

export function dragonGrab() {
  return {
    type: DRAGON_MOVE
  };
}

export function dragonMove(x, y) {
  return {
    type: DRAGON_MOVE,
    x,
    y
  };
}

export function dragonDrop() {
  return {
    type: DRAGON_DROP
  };
}
