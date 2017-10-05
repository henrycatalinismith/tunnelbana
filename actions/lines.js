export const CREATE_LINE = "CREATE_LINE";

export function createLine(line) {
  return {
    type: CREATE_LINE,
    line
  };
}
