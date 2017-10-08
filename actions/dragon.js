// keep
export const DRAGON_DROP = "DRAGON_DROP";
export const DRAGON_GRAB = "DRAGON_GRAB";
export const DRAGON_MOVE = "DRAGON_MOVE";

// deprecate
export const DRAGON_MOVE_STATION = "DRAGON_MOVE_STATION";
export const DRAGON_DRAG_TERMINAL = "DRAGON_DRAG_TERMINAL";
export const DRAGON_GRAB_STATION = "DRAGON_GRAB_STATION";
export const DRAGON_GRAB_TERMINAL = "DRAGON_GRAB_TERMINAL";
export const DRAGON_DROP_TERMINAL = "DRAGON_DROP_TERMINAL";
export const DRAGON_CREATE_CONNECTION = "DRAGON_CREATE_CONNECTION";

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
    type: DRAGON_DRAG_TERMINAL,
    x,
    y,
    id
  };
}

export function dragonDropTerminal(id) {
  return {
    type: DRAGON_DROP_TERMINAL,
    terminal: { id }
  };
}

export function dragonCreateConnection(destinationId) {
  return {
    type: DRAGON_CREATE_CONNECTION,
    connection: { destinationId }
  };
}
