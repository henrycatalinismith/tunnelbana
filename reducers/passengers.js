import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.ADD_PASSENGER](state, action) {
    return state.set(
      action.passenger.id,
      Immutable.fromJS({
        id: action.passenger.id,
        stationId: action.passenger.stationId
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

  byStationId(state, stationId) {
    return state.filter(t => t.get("stationId") === stationId).toList();
  }
};
