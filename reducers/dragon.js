import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

const initialState = Immutable.fromJS({
  entity: undefined,
  id: undefined,
  x: 0,
  y: 0
});

export const reducer = createReducer(initialState, {
  [actions.DRAGON_GRAB](state, action) {
    return state.merge(
      Immutable.fromJS({
        entity: action.entity,
        id: action.id
      })
    );
  },

  [actions.DRAGON_MOVE](state, action) {
    return state.merge(
      Immutable.fromJS({
        x: action.x,
        y: action.y
      })
    );
  },

  [actions.DRAGON_DROP](state, action) {
    return state.merge(
      Immutable.fromJS({
        entity: undefined,
        id: undefined
      })
    );
  }
});

export const selectors = {
  dragon(state) {
    return state;
  }
};
