const actions = require("../actions").default;
const select = require("../reducers/selectors").default;
const cube = require("../geometry/cube").default;

export default {
  zoom(delta) {
    return (dispatch, getState) => {
      const camera = select("cameras")
        .from(getState())
        .byId("main")
        .toJS();

      camera.zoom += delta * 0.01;

      const action = actions.zoomCamera(camera);
      dispatch(action);
    };
  }
};



