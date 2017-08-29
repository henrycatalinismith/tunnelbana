import uuid from 'uuid/v1';
import actions from '../actions';

export default function(state = {}, action) {
  let id;
  switch (action.type) {
    case actions.ADD_LINE:
      id = action.line.id || uuid();
      return {...state, [id]: {
        id,
        color: action.line.color,
        isSelected: false,
      }};

    case actions.SELECT_TERMINAL:
      id = action.lineId;
      return {...state, [id]: {
        ...state[id],
        isSelected: true,
      }};

    case actions.DESELECT_TERMINAL:
      id = action.lineId;
      return {...state, [id]: {
        ...state[id],
        isSelected: false,
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
