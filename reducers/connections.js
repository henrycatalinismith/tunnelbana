import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.ADD_CONNECTION](state, action) {
    return state.set(
      action.connection.id,
      Immutable.fromJS({
        id: action.connection.id,
        sourceId: action.connection.sourceId,
        destinationId: action.connection.destinationId,
        lineId: action.connection.lineId,
        terminalId: undefined,
        tracks: new Immutable.List()
      })
    );
  },

  [actions.ADD_TRACK](state, action) {
    const id = action.track.connectionId;
    return state.updateIn([id, "tracks"], tracks => {
      return tracks.push(Immutable.fromJS(action.track));
    });
  }
});

export function getConnection(state, lineId, sourceId, destinationId) {
  return state
    .filter(
      c =>
        c.get("lineId") === lineId &&
        ((c.get("sourceId") === sourceId &&
          c.get("destinationId") === destinationId) ||
          (c.get("sourceId") === destinationId &&
            c.get("destinationId") === sourceId))
    )
    .first()
    .toJS();
}

export const selectors = {
  all(state) {
    return state.toList();
  },

  byId(state, id) {
    return state.get(id);
  },

  byLineId(state, lineId) {
    return state.filter(c => c.get("lineId") === lineId).toList();
  },

  forNextStop(state, previousStationId, currentStationId, lineId) {
    const isReal = state.filter(
      c => !!c.get("sourceId") && !!c.get("destinationId")
    );
    const goesHere = isReal.filter(
      c =>
        c.get("sourceId") === currentStationId ||
        c.get("destinationId") === currentStationId
    );

    const sameLine = goesHere.filter(c => {
      return c.get("lineId") == lineId;
    });

    const onwardsJourney = sameLine.filter(c => {
      const hasNewSource =
        c.get("sourceId") !== currentStationId &&
        c.get("sourceId") !== previousStationId;
      const hasNewDestination =
        c.get("destinationId") !== currentStationId &&
        c.get("destinationId") !== previousStationId;
      return hasNewSource || hasNewDestination;
    });
    if (onwardsJourney.size > 0) {
      return {
        connectionId: onwardsJourney.first().get("id"),
        destinationId:
          onwardsJourney.first().get("sourceId") !== currentStationId
            ? onwardsJourney.first().get("sourceId")
            : onwardsJourney.first().get("destinationId")
      };
    }

    return {
      connectionId: sameLine.first().get("id"),
      destinationId:
        sameLine.first().get("sourceId") !== currentStationId
          ? sameLine.first().get("sourceId")
          : sameLine.first().get("destinationId")
    };
  }
};
