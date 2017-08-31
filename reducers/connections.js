import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer({}, {
  [actions.ADD_CONNECTION](state, action) {
    const id = action.connection.id;
    return {...state, [id]: {
      id,
      sourceId: action.connection.sourceId,
      destinationId: action.connection.destinationId,
      lineId: action.connection.lineId,
      terminalId: undefined,
      tracks: [],
    }};
  },

  [actions.ADD_TRACK](state, action) {
    const id = action.track.connectionId;
    return {...state, [id]: {
      ...state[id],
      tracks: [
        ...state[id].tracks,
        action.track,
      ],
    }};
  }

});

export function connections(state) {
  return Object.keys(state).map(id => state[id]);
}

export function connection(state, id) {
  return state[id];
}

export function nextStop(state, previousStationId, currentStationId, lineId) {
  const isReal = connections(state).filter(c => (
    !!c.sourceId && !!c.destinationId
  ));
  const goesHere = isReal.filter(c => (
    c.sourceId === currentStationId
    || c.destinationId === currentStationId
  ));

  const sameLine = goesHere.filter(c => {
    return c.lineId == lineId;
  });

  const onwardsJourney = sameLine.filter(c => {
    const hasNewSource = (
      c.sourceId !== currentStationId
      && c.sourceId !== previousStationId
    );
    const hasNewDestination = (
      c.destinationId !== currentStationId
      && c.destinationId !== previousStationId
    );
    return hasNewSource || hasNewDestination;
  });
  if (onwardsJourney.length > 0) {
    return {
      connectionId: onwardsJourney[0].id,
      destinationId: onwardsJourney[0].sourceId !== currentStationId
        ? onwardsJourney[0].sourceId
        : onwardsJourney[0].destinationId,
    };
  }

  return {
    connectionId: sameLine[0].id,
    destinationId: sameLine[0].sourceId !== currentStationId
      ? sameLine[0].sourceId
      : sameLine[0].destinationId,
  };
}

export function getConnectionsByLine(state, lineId) {
  return connections(state).filter(c => c.lineId === lineId);
}

export function fakeConnections(state) {
  return connections(state).filter(c => !!c.terminalId);
}

export function getConnection(state, lineId, sourceId, destinationId) {
  return connections(state).filter(c => (
    c.lineId === lineId && (
      (c.sourceId === sourceId && c.destinationId === destinationId)
      || (c.sourceId === destinationId && c.destinationId === sourceId)
    )
  ))[0];
}
