import Immutable from 'immutable';
import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer(new Immutable.Map, {
  [actions.ADD_LINE](state, action) {
    return state.set(action.line.id, Immutable.fromJS({
      id: action.line.id,
      color: action.line.color,
      isSelected: false,
    }));
  },

  [actions.SELECT_TERMINAL](state, action) {
    return state.setIn([action.lineId, 'isSelected'], true);
  },

  [actions.DESELECT_TERMINAL](state, action) {
    return state.setIn([action.lineId, 'isSelected'], false);
  }
});

export function lines(state) {
  return state.toList();
}

export function line(state, id) {
  return state.get(id);
}
