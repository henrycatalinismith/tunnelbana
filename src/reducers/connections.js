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
