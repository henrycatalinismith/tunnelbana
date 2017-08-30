import uuid from 'uuid/v1';
import actions from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case actions.ADD_STATION:
    case actions.IMPORT_STATION:
      const id = action.station.id || uuid();
      return {...state, [id]: {
        id,
        x: action.station.x,
        y: action.station.y,
      }};

    default:
      return state;
  }
}

export function stations(state) {
  return Object.keys(state).map(id => state[id]);
}

export function station(state, id) {
  return state[id];
}
