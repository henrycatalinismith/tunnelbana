const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = {
  cellId: undefined,
  x: 0,
  y: 0,
};

export const reducer = createReducer(initialState, {
  [actions.CREATE_CELL](camera, action) {
    return {
      ...camera,
      cellId: action.cell.id,
    };
  },

  [actions.SELECT_HEXAGON](camera, action) {
    return {
      ...camera,
      x: action.camera.x,
      y: action.camera.y,
    };
  }
});

export const selectors = {
  all: camera => camera,
};



