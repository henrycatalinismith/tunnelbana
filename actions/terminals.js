export const ADD_TERMINAL = "ADD_TERMINAL";
export const SELECT_TERMINAL = "SELECT_TERMINAL";
export const DESELECT_TERMINAL = "DESELECT_TERMINAL";
export const MOVE_TERMINAL = "MOVE_TERMINAL";

export function addTerminal(terminal) {
  return {
    type: ADD_TERMINAL,
    terminal
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
