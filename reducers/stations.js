const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;
let selection;

export const reducer = createReducer(initialState, {
  [actions.CREATE_STATION](state, action) {
    return state.set(
      action.station.id,
      Immutable.fromJS({
        id: action.station.id,
        cellId: action.station.cellId,
        hexagonId: action.station.hexagonId,
        isSelected: false,
      })
    );
  },

  [actions.SELECT_STATION](state, { station }) {
    const oldSelection = selection;
    selection = station.id;
    let newState = state;
    if (oldSelection) {
      newState = newState.updateIn([oldSelection], s => {
        return s.merge(Immutable.fromJS({
          isSelected: false,
        }));
      });
    }
    newState = newState.updateIn([station.id], s => {
      return s.merge(Immutable.fromJS({
        isSelected: true,
      }));
    });
    return newState;
  },
});

export const selectors = {
  all(state) {
    return state.toList();
  },

  byId(state, id) {
    return state.get(id);
  },

  at(state, cellId, x, y, z) {
    const hexagonId = [cellId, x, y, z].join(",");
    return state.filter(s => {
      const isMatch = s.get("hexagonId") === hexagonId;
      return isMatch;
    }).first();
  },

  byCell(state, cellId) {
    return state.filter(s => {
      const isMatch = s.get("cellId") === cellId;
      return isMatch;
    }).toList();
  },
};
