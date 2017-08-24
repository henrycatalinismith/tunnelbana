export const ADD_TERMINAL = 'ADD_TERMINAL';

export function addTerminal(terminal) {
  return {
    type: ADD_TERMINAL,
    terminal,
  };
}
