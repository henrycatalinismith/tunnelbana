import actions from '../actions';

export default function(state = {}, action) {
  let id;

  switch (action.type) {
    case actions.ADD_TRACK:
      id = action.track.id;
      return {...state, [id]: {
        id,
        connectionId: action.track.connectionId,
        lineId: action.track.lineId,
        sourceId: action.track.sourceId,
        destinationId: action.track.destinationId,
        ordinality: action.track.ordinality,
        x1: action.track.x1,
        y1: action.track.y1,
        x2: action.track.x2,
        y2: action.track.y2,
      }};

    default:
      return state;
  }
}

export function tracks(state) {
  return Object.keys(state).map(id => state[id]);
}

export function track(state, id) {
  return state[id];
}

export function getTracksByConnection(state, connectionId) {
  return tracks(state).filter(t => t.connectionId === connectionId);
}

export function getTracksForJourney(state, journey) {
  return tracks(state)
    .filter(t => (
      t.connectionId === journey.connectionId
      && t.sourceId === journey.sourceId
      && t.destinationId === journey.destinationId
    ))
    .sort(t => t.ordinality);
}
