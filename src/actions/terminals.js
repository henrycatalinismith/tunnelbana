export const ADD_TERMINAL = 'ADD_TERMINAL';
export const SELECT_TERMINAL = 'SELECT_TERMINAL';
export const DESELECT_TERMINAL = 'DESELECT_TERMINAL';

export function addTerminal(terminal) {
  return {
    type: ADD_TERMINAL,
    terminal,
  };
}

export function selectTerminal(terminalId) {
  return {
    type: SELECT_TERMINAL,
    terminalId,
  };
}

export function deselectTerminal(terminalId) {
  return {
    type: DESELECT_TERMINAL,
    terminalId,
  };
}
