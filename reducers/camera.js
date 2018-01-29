const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = {
  cellId: undefined,
};

export const reducer = createReducer(initialState, {
  [actions.CREATE_CELL](camera, action) {
    console.log('ee', action);
    return {
      ...camera,
      cellId: action.cell.id,
    };
  },
});

export const selectors = {
  all: camera => camera,
};



