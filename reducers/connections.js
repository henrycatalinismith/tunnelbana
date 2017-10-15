import Immutable from "immutable";
import { createReducer } from "signalbox";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.CREATE_CONNECTION](state, action) {
    return state.set(
      action.connection.id,
      Immutable.fromJS({
        id: action.connection.id,
        sourceId: action.source.id,
        destinationId: action.destination.id,
        lineId: action.line.id,
        terminalId: undefined
      })
    );
  },

  [actions.IMAGINE_CONNECTION](state, action) {
    return state.set(
      action.connection.id,
      Immutable.fromJS({
        id: action.connection.id,
        sourceId: action.source.id,
        lineId: action.line.id,
        terminalId: action.destinationTerminal.id
      })
    );
  },

  [actions.REALIZE_CONNECTION](state, action) {
    return state.update(action.connection.id, connection => {
      return connection.merge(
        Immutable.fromJS({
          destinationId: action.destination.id,
          terminalId: undefined
        })
      );
    });
  },

  [actions.ABANDON_CONNECTION](state, action) {
    return state.delete(action.connection.id);
  }
});

export function getConnection(state, lineId, sourceId, destinationId) {
  return state
    .filter(c => {
      const sameLine = c.get("lineId") === lineId;
      const forwardsMatch =
        c.get("sourceId") === sourceId &&
        c.get("destinationId") === destinationId;
      const backwardsMatch =
        c.get("sourceId") === destinationId &&
        c.get("destinationId") === sourceId;
      const isMatch = sameLine && (forwardsMatch || backwardsMatch);
      return isMatch;
    })
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

  lineSiblings(state, id, lineId) {
    return state
      .filter(c => {
        const sameLine = c.get("lineId") === lineId;
        const differentConnection = c.get("id") !== id;
        const isSibling = sameLine && differentConnection;
        return isSibling;
      })
      .toList();
  },

  byStationId(state, stationId) {
    return state
      .filter(
        c =>
          c.get("sourceId") === stationId ||
          c.get("destinationId") === stationId
      )
      .toList();
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
        connection: onwardsJourney.first(),
        connectionId: onwardsJourney.first().get("id"),
        destinationId:
          onwardsJourney.first().get("sourceId") !== currentStationId
            ? onwardsJourney.first().get("sourceId")
            : onwardsJourney.first().get("destinationId")
      };
    }

    return {
      connection: sameLine.first(),
      connectionId: sameLine.first().get("id"),
      destinationId:
        sameLine.first().get("sourceId") !== currentStationId
          ? sameLine.first().get("sourceId")
          : sameLine.first().get("destinationId")
    };
  },

  imaginary(state) {
    return state.filter(c => c.get("destinationId") === undefined).first();
  }
};
