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
  },

  [actions.DRAGON_MOVE](state, action) {
    if (action.entity !== "station") return state;

    return state.filter(track => {
      const sourceId = track.get("sourceId");
      const destinationId = track.get("destinationId");
      return sourceId !== action.id && destinationId !== action.id;
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

  byConnectionId(state, connectionId) {
    return state.filter(t => t.get("connectionId") === connectionId).toList();
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
      .sort((a, b) => {
        const aOrdinality = a.get("ordinality");
        const bOrdinality = b.get("ordinality");
        if (aOrdinality === bOrdinality) {
          return 0;
        } else if (aOrdinality > bOrdinality) {
          return 1;
        } else {
          return -1;
        }
      });
  }
};
