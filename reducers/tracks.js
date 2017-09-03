import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.ADD_TRACK](state, action) {
    return state.set(
      action.track.id,
      Immutable.fromJS({
        id: action.track.id,
        connectionId: action.track.connectionId,
        lineId: action.track.lineId,
        sourceId: action.track.sourceId,
        destinationId: action.track.destinationId,
        ordinality: action.track.ordinality,
        x1: action.track.x1,
        y1: action.track.y1,
        x2: action.track.x2,
        y2: action.track.y2
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

  forJourney(state, journey) {
    return state
      .filter(
        track =>
          track.get("connectionId") === journey.connectionId &&
          track.get("sourceId") === journey.sourceId &&
          track.get("destinationId") === journey.destinationId
      )
      .toList()
      .sort(track => {
        return track.get("ordinality");
      });
  }
};
