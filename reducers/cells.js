const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = {};

export const reducer = createReducer(initialState, {
  [actions.CREATE_CELL](cells, action) {
    cells[action.cell.id] = action.cell;
    return cells;
  },
});

export const selectors = {
  all: cells => cells,
};


