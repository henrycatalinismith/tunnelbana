import uuid from 'uuid/v1';
import actions from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case actions.ADD_CONNECTION:
      const connectionId = action.connection.id || uuid();
      return {...state, [connectionId]: {
        connectionId,
        ...action.connection,
      }};

    default:
      return state;
  }
}

export function connections(state) {
  return Object.keys(state).map(connectionId => state[connectionId]);
}

export function connection(state, connectionId) {
  return state[connectionId];
}
