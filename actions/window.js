export const BLUR_WINDOW = "BLUR_WINDOW";
export const FOCUS_WINDOW = "FOCUS_WINDOW";
export const RESIZE_WINDOW = "RESIZE_WINDOW";

export function blurWindow() {
  return {
    type: BLUR_WINDOW
  };
}

export function focusWindow() {
  return {
    type: FOCUS_WINDOW
  };
}

export function resizeWindow(width, height) {
  return {
    type: RESIZE_WINDOW,
    window: { width, height }
  };
}
