import Immutable from 'immutable';
import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer(new Immutable.Map, {
  [actions.ADD_TRACK](state, action) {
    return state.set(action.track.id, Immutable.fromJS({
      id: action.track.id,
      connectionId: action.track.connectionId,
      lineId: action.track.lineId,
      sourceId: action.track.sourceId,
      destinationId: action.track.destinationId,
      ordinality: action.track.ordinality,
      x1: action.track.x1,
      y1: action.track.y1,
      x2: action.track.x2,
      y2: action.track.y2,
    }));
  }
});

export function tracks(state) {
  return state.toList();
}

export function track(state, id) {
  return state.get(id);
}

export function getTracksByConnection(state, connectionId) {
  return state.filter(t => t.connectionId === connectionId);
}

export function getTracksByConnectionOneWay(state, connectionId, sourceId, destinationId) {
  return state.filter(t =>
    t.connectionId === connectionId
    && t.sourceId === sourceId
    && t.destinationId === destinationId
  ).sort(t => t.ordinality);
}

export function getTracksForJourney(state, journey) {
  return state
    .filter(t => (
      t.connectionId === journey.connectionId
      && t.sourceId === journey.sourceId
      && t.destinationId === journey.destinationId
    ))
    .sort(t => t.ordinality);
}
