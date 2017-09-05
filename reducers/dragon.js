import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

const initialState = Immutable.fromJS({
  x: 0,
  y: 0
});

export const reducer = createReducer(initialState, {
  [actions.MOVE_DRAGON](state, action) {
    return state.merge(
      Immutable.fromJS({
        x: action.x,
        y: action.y
      })
    );
  }
});

export const selectors = {
  dragon(state) {
    return state;
  }
};
