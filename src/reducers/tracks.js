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
