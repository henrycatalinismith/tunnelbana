export const DRAGON_DROP = "DRAGON_DROP";
export const DRAGON_GRAB = "DRAGON_GRAB";
export const DRAGON_MOVE = "DRAGON_MOVE";

export function dragonDrop(entity, id) {
  return {
    type: DRAGON_DROP,
    dragon: { entity, id }
  };
}

export function dragonGrab(entity, id) {
  return {
    type: DRAGON_GRAB,
    dragon: { entity, id }
  };
}

export function dragonMove(x, y) {
  return {
    type: DRAGON_MOVE,
    dragon: { x, y }
  };
}
