const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;

export const reducer = createReducer(initialState, {
  [actions.CREATE_CELL](cameras, action) {
    return cameras.updateIn(["main"], c => {
      return c.merge({
        cellId: action.cell.id,
        hexagonId: [action.cell.id, 0, 0, 0].join(","),
      });
    });
  },

  [actions.SELECT_HEXAGON](cameras, action) {
    return cameras.updateIn(["main"], c => {
      return c.merge(Immutable.fromJS({
        hexagonId: action.hexagon.id,
        x: action.camera.x,
        y: action.camera.y,
      }));
    });
  },
});

export const selectors = {
  all: cameras => cameras,
  byId: (cameras, id) => cameras.get(id),
};



