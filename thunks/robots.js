const actions = require("../actions").default;
const select = require("../reducers/selectors").default;

let id = 0;

export default {
  createRobot(x, y, z) {
    return (dispatch, getState) => {
      const robot = { id, x, y, z };
      const action = actions.createRobot({ robot });
      dispatch(action);
      id++;
    }
  }
};
