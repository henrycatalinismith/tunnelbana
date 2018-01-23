import { createActions } from "signalbox";

export default createActions(["RESIZE_VIEWPORT"], types => ({
  resizeViewport: (width, height) => ({
    type: types.RESIZE_VIEWPORT,
    viewport: { width, height }
  })
}));


