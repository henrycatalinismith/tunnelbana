const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;

export const reducer = createReducer(initialState, {
  [actions.CREATE_CELL](cells, action) {
    return cells.set(
      action.cell.id,
      Immutable.fromJS({
        id: action.cell.id,
        radius: action.cell.radius,
      })
    );
  },
});

export const selectors = {
  all: cells => cells,
};


