const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = Immutable.fromJS({
  main: {
    cellId: undefined,
    x: 0,
    y: 0,
  }
});

export const reducer = createReducer(initialState, {
  [actions.CREATE_CELL](cameras, action) {
    return cameras.updateIn(["main"], c => {
      return c.merge({
        cellId: action.cell.id,
      });
    });
  },

  [actions.SELECT_HEXAGON](cameras, action) {
    return cameras;
    return {
      ...cameras,
      main: {
        ...cameras.main,
        x: action.camera.x,
        y: action.camera.y,
      }
    };
  }
});

export const selectors = {
  all: cameras => cameras,
  byId: (cameras, id) => cameras.get(id),
};



