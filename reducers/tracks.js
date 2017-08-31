import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer({}, {
  [actions.ADD_TRACK](state, action) {
    const id = action.track.id;
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
  }
});

export function tracks(state) {
  return Object.keys(state).map(id => state[id]);
}

export function track(state, id) {
  return state[id];
}

export function getTracksByConnection(state, connectionId) {
  return tracks(state).filter(t => t.connectionId === connectionId);
}

export function getTracksByConnectionOneWay(state, connectionId, sourceId, destinationId) {
  return tracks(state).filter(t =>
    t.connectionId === connectionId
    && t.sourceId === sourceId
    && t.destinationId === destinationId
  ).sort(t => t.ordinality);
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
