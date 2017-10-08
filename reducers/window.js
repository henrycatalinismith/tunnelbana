import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

const initialState = Immutable.fromJS({
  width: 0,
  height: 0
});

export const reducer = createReducer(initialState, {
  [actions.RESIZE_WINDOW](state, action) {
    return state.merge({
      width: action.window.width,
      height: action.window.height
    });
  }
});

export const selectors = {
  all(state) {
    return state;
  }
};
