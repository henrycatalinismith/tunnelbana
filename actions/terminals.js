export const CREATE_TERMINAL = "CREATE_TERMINAL";
export const DELETE_TERMINAL = "DELETE_TERMINAL";
export const UPDATE_TERMINAL = "UPDATE_TERMINAL";

export const DRAG_TERMINAL = "DRAG_TERMINAL";
export const DROP_TERMINAL = "DROP_TERMINAL";
export const GRAB_TERMINAL = "GRAB_TERMINAL";

export function createTerminal(terminal) {
  return {
    type: CREATE_TERMINAL,
    terminal
  };
}

export function deleteTerminal(id) {
  return {
    type: DELETE_TERMINAL,
    terminal: { id }
  };
}

export function updateTerminal(terminal) {
  return {
    type: UPDATE_TERMINAL,
    terminal
  };
}

export function dropTerminal(selection) {
  return {
    type: DROP_TERMINAL,
    ...selection
  };
}

export function dragTerminal(terminalId, x, y) {
  return {
    type: DRAG_TERMINAL,
    terminalId,
    x,
    y
  };
}

export function grabTerminal(selection) {
  return {
    type: GRAB_TERMINAL,
    ...selection
  };
}
