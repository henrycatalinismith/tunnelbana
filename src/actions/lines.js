export const ADD_LINE = 'ADD_LINE';

export function addLine(line) {
  return {
    type: ADD_LINE,
    line,
  };
}
