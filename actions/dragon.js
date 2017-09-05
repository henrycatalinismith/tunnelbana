export const DRAGON_GRAB = "DRAGON_GRAB";
export const DRAGON_MOVE = "DRAGON_MOVE";
export const DRAGON_DROP = "DRAGON_DROP";

export function dragonGrab(entity, id) {
  return {
    type: DRAGON_GRAB,
    entity,
    id
  };
}

export function dragonMove(x, y) {
  return {
    type: DRAGON_MOVE,
    x,
    y
  };
}

export function dragonDrop(entity, id) {
  return {
    type: DRAGON_DROP,
    entity,
    id
  };
}
