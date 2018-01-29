import Immutable from "immutable";
import { createReducer } from "signalbox";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.DEPARTURE](state, action) {
    return state.set(
      action.journey.id,
      Immutable.fromJS({
        id: action.journey.id,
        sourceId: action.journey.sourceId,
        destinationId: action.journey.destinationId,
        connectionId: action.journey.connectionId,
        lineId: action.journey.lineId,
        trainId: action.journey.trainId,
        isComplete: false
      })
    );
  },

  [actions.ARRIVAL](state, action) {
    return state.delete(action.journey.id);
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
