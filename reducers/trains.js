const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;
let selection;

export const reducer = createReducer(initialState, {
  [actions.CREATE_TRAIN](trains, action) {
    console.log(action);
    return trains.set(
      action.train.id,
      Immutable.fromJS({
        id: action.train.id,
        cellId: action.cell.id,
        terrainId: action.terrain.id,
        x: action.hexagon.x,
        y: action.hexagon.y,
        z: action.hexagon.z,
      })
    );
  },
});

export const selectors = {
  all(trains) {
    return trains.toList();
  },

  byId(trains, id) {
    return trains.get(id);
  },

  byCell(trains, cellId) {
    return trains.filter(t => {
      const isMatch = t.get("cellId") === cellId;
      return isMatch;
    }).toList();
  },
};
