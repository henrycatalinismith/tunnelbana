import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.CREATE_PASSENGER](state, action) {
    return state.set(
      action.passenger.id,
      Immutable.fromJS({
        id: action.passenger.id,
        stationId: action.passenger.stationId,
        trainId: undefined
      })
    );
  },

  [actions.ALIGHT](state, action) {
    return state.update(action.passenger.id, passenger => {
      return passenger.merge(
        Immutable.fromJS({
          stationId: action.station.id,
          trainId: undefined
        })
      );
    });
  },

  [actions.BOARD](state, action) {
    return state.update(action.passenger.id, passenger => {
      return passenger.merge(
        Immutable.fromJS({
          stationId: undefined,
          trainId: action.train.id
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
  },

  byStationId(state, stationId) {
    return state.filter(t => t.get("stationId") === stationId).toList();
  },

  byTrainId(state, trainId) {
    return state
      .filter(t => {
        return t.get("trainId") === trainId;
      })
      .toList();
  }
};
