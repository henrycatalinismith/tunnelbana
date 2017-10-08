import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.CREATE_LINE](state, action) {
    return state.set(
      action.line.id,
      Immutable.fromJS({
        id: action.line.id,
        color: action.line.color,
        isSelected: false
      })
    );
  },

  [actions.GRAB_TERMINAL](state, action) {
    return state.setIn([action.lineId, "isSelected"], true);
  },

  [actions.DROP_TERMINAL](state, action) {
    return state.setIn([action.lineId, "isSelected"], false);
  }
});

export const selectors = {
  all(state) {
    return state.toList();
  },

  byId(state, id) {
    return state.get(id);
  }
};
