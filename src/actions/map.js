export const UPDATE_VIEW_BOX = 'UPDATE_VIEW_BOX';

export function updateViewBox(minX, minY, width, height) {
  return {
    type: UPDATE_VIEW_BOX,
    viewBox: {
      minX,
      minY,
      width,
      height,
    },
  };
}
