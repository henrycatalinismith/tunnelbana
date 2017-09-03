export const WINDOW_BLUR = "WINDOW_BLUR";
export const WINDOW_FOCUS = "WINDOW_FOCUS";
export const WINDOW_RESIZE = "WINDOW_RESIZE";

export function windowBlur() {
  return {
    type: WINDOW_BLUR
  };
}

export function windowFocus() {
  return {
    type: WINDOW_FOCUS
  };
}

export function windowResize(window) {
  return {
    type: WINDOW_RESIZE,
    window
  };
}
