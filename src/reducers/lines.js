import uuid from 'uuid/v1';
import actions from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case actions.ADD_LINE:
      const id = action.line.id || uuid();
      console.log(action.line);
      return {...state, [id]: {
        id,
        color: action.line.color,
      }};

    default:
      return state;
  }
}

export function lines(state) {
  return Object.keys(state).map(id => state[id]);
}

export function line(state, id) {
  return state[id];
}
