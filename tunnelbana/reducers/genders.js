import Immutable from "immutable";
import { createReducer } from "signalbox";
import actions from "../actions";

const initialState = Immutable.fromJS({
  circle: {
    id: "circle"
  },
  square: {
    id: "square"
  }
});

export const reducer = createReducer(initialState, {});

export const selectors = {
  all(state) {
    return state;
  },

  byId(state, id) {
    return state.get(id);
  }
};
