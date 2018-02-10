const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;
let selection;

export const reducer = createReducer(initialState, {
  [actions.CREATE_ROBOT](robots, action) {
    return robots.set(
      action.robot.id,
      Immutable.fromJS({
        id: action.robot.id,
        w: 0,
        x: action.robot.x,
        y: action.robot.y,
        z: action.robot.z,
      })
    );
  },
});

export const selectors = {
  all(robots) {
    return robots.toList();
  },

  byId(robots, id) {
    return robots.get(id);
  },

  at(robots, w, x, y, z) {
    const hexagonId = [w, x, y, z].join(",");
    return robots.filter(r => {
      const sameW = r.get("w") === w;
      const sameX = r.get("x") === x;
      const sameY = r.get("y") === y;
      const sameZ = r.get("z") === z;
      const isMatch = sameW && sameX && sameY && sameZ;
      return isMatch;
    }).first();
  },
};
