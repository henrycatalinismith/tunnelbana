export const CREATE_TERMINAL = "CREATE_TERMINAL";
export const DELETE_TERMINAL = "DELETE_TERMINAL";

export const SELECT_TERMINAL = "SELECT_TERMINAL";
export const DESELECT_TERMINAL = "DESELECT_TERMINAL";
export const MOVE_TERMINAL = "MOVE_TERMINAL";

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

export function selectTerminal(selection) {
  return {
    type: SELECT_TERMINAL,
    ...selection
  };
}

export function deselectTerminal(selection) {
  return {
    type: DESELECT_TERMINAL,
    ...selection
  };
}

export function moveTerminal(terminalId, x, y) {
  return {
    type: MOVE_TERMINAL,
    terminalId,
    x,
    y
  };
}
