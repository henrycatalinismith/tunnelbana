export const UPDATE_VIEWBOX = "UPDATE_VIEWBOX";

export function updateViewbox(minX, minY, width, height) {
  return {
    type: UPDATE_VIEWBOX,
    viewbox: {
      minX,
      minY,
      width,
      height
    }
  };
}
