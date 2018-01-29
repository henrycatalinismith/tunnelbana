import { createActions } from "signalbox";

export const actions = createActions(
  ["BLUR_WINDOW", "FOCUS_WINDOW", "RESIZE_WINDOW"],
  types => ({
    blurWindow: () => ({ type: types.BLUR_WINDOW }),
    focusWindow: () => ({ type: types.FOCUS_WINDOW }),
    resizeWindow: (width, height) => ({
      type: types.RESIZE_WINDOW,
      window: { width, height }
    })
  })
);
