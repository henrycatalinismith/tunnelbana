import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer({}, {
  [actions.ADD_LINE](state, action) {
    const id = action.line.id;
    return {...state, [id]: {
      id,
      color: action.line.color,
      isSelected: false,
    }};
  },

  [actions.SELECT_TERMINAL](state, action) {
    const id = action.lineId;
    return {...state, [id]: {
      ...state[id],
      isSelected: true,
    }};
  },

  [actions.DESELECT_TERMINAL](state, action) {
    const id = action.lineId;
    return {...state, [id]: {
      ...state[id],
      isSelected: false,
    }};
  }
});

export function lines(state) {
  return Object.keys(state).map(id => state[id]);
}

export function line(state, id) {
  return state[id];
}
