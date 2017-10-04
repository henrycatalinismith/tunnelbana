export const DRAGON_GRAB = "DRAGON_GRAB";
export const DRAGON_GRAB_STATION = "DRAGON_GRAB_STATION";
export const DRAGON_GRAB_TERMINAL = "DRAGON_GRAB_TERMINAL";
export const DRAGON_MOVE = "DRAGON_MOVE";
export const DRAGON_MOVE_STATION = "DRAGON_MOVE_STATION";
export const DRAGON_MOVE_TERMINAL = "DRAGON_MOVE_TERMINAL";
export const DRAGON_DROP = "DRAGON_DROP";
export const DRAGON_DROP_TERMINAL = "DRAGON_DROP_TERMINAL";

export function dragonGrab(entity, id) {
  return {
    type: DRAGON_GRAB,
    entity,
    id
  };
}

export function dragonGrabStation(id) {
  return {
    type: DRAGON_GRAB_STATION,
    station: { id }
  };
}

export function dragonGrabTerminal(id) {
  return {
    type: DRAGON_GRAB_TERMINAL,
    terminal: { id }
  };
}

export function dragonMove(x, y) {
  return {
    type: DRAGON_MOVE,
    x,
    y
  };
}

export function dragonMoveStation(x, y, id) {
  return {
    type: DRAGON_MOVE_STATION,
    x,
    y,
    id
  };
}

export function dragonMoveTerminal(x, y, id) {
  return {
    type: DRAGON_MOVE_TERMINAL,
    x,
    y,
    id
  };
}

export function dragonDrop(entity, id) {
  return {
    type: DRAGON_DROP,
    entity,
    id
  };
}

export function dragonDropTerminal(id) {
  return {
    type: DRAGON_DROP_TERMINAL,
    terminal: { id }
  };
}
