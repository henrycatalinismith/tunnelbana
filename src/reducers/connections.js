import uuid from 'uuid/v1';
import actions from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case actions.ADD_CONNECTION:
      const id = action.connection.id || uuid();
      return {...state, [id]: {
        id,
        sourceId: action.connection.sourceId,
        destinationId: action.connection.destinationId,
        lineId: action.connection.lineId,
      }};

    default:
      return state;
  }
}

export function connections(state) {
  return Object.keys(state).map(id => state[id]);
}

export function connection(state, id) {
  return state[id];
}

export function nextStop(state, previousStationId, currentStationId, lineId) {
  const goesHere = connections(state).filter(c => (
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
    return onwardsJourney[0].sourceId !== currentStationId
      ? onwardsJourney[0].sourceId
      : onwardsJourney[0].destinationId;
  }

  return sameLine[0].sourceId !== currentStationId
    ? sameLine[0].sourceId
    : sameLine[0].destinationId;
}

export function getConnectionsByLine(state, lineId) {
  return connections(state).filter(c => c.lineId === lineId);
}
