import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.ADD_STATION](state, action) {
    return state.set(
      action.station.id,
      Immutable.fromJS({
        id: action.station.id,
        x: action.station.x,
        y: action.station.y,
        isSelected: false
      })
    );
  },

  [actions.IMPORT_STATION](state, action) {
    return state.set(
      action.station.id,
      Immutable.fromJS({
        id: action.station.id,
        x: action.station.x,
        y: action.station.y
      })
    );
  },

  [actions.SELECT_STATION](state, action) {
    return state.setIn([action.id, "isSelected"], true);
  },

  [actions.DESELECT_STATION](state, action) {
    return state.setIn([action.id, "isSelected"], false);
  },

  [actions.MOVE_STATION](state, action) {
    return state.update(action.stationId, station => {
      console.log(action);
      return station.merge(
        Immutable.fromJS({
          x: action.x,
          y: action.y
        })
      );
    });
  }
});

export const selectors = {
  all(state) {
    return state.toList();
  },

  byId(state, id) {
    return state.get(id);
  }
};
