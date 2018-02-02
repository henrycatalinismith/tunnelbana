const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;

export const reducer = createReducer(initialState, {
  [actions.CREATE_STATION](state, action) {
    return state.set(
      action.station.id,
      Immutable.fromJS({
        id: action.station.id,
        cellId: action.station.cellId,
        hexagonId: action.station.hexagonId,
      })
    );
  }
});

export const selectors = {
  all(state) {
    return state.toList();
  },

  byId(state, id) {
    return state.get(id);
  },

  byCell(state, cellId) {
    return state.filter(s => {
      const isMatch = s.get("cellId") === cellId;
      return isMatch;
    }).toList();
  },
};
