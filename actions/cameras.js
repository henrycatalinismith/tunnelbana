import { createActions } from "signalbox";

export default createActions(["MOVE_CAMERA", "ZOOM_CAMERA"], types => ({
  moveCamera: camera => ({
    type: types.MOVE_CAMERA,
    camera: camera
  }),

  zoomCamera: camera => ({
    type: types.ZOOM_CAMERA,
    camera: camera
  }),
}));



