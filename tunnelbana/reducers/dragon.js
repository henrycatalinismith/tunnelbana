import Immutable from "immutable";
import { createReducer } from "signalbox";
import actions from "../actions";

export const reducer = createReducer(
  Immutable.fromJS({
    entity: undefined,
    id: undefined,
    x: 0,
    y: 0
  }),
  {
    [actions.DRAGON_GRAB](state, action) {
      return state.merge(
        Immutable.fromJS({
          entity: action.dragon.entity,
          id: action.dragon.id
        })
      );
    },

    [actions.IMAGINE_CONNECTION](state, action) {
      return state.merge(
        Immutable.fromJS({
          entity: "terminal",
          id: action.destinationTerminal.id
        })
      );
    },

    [actions.ABANDON_CONNECTION](state, action) {
      return state.merge(
        Immutable.fromJS({
          entity: undefined,
          id: undefined
        })
      );
    },

    [actions.DRAGON_MOVE](state, action) {
      return state.merge(
        Immutable.fromJS({
          x: action.dragon.x,
          y: action.dragon.y
        })
      );
    },

    [actions.DRAG_TERMINAL](state, action) {
      return state.merge(
        Immutable.fromJS({
          x: action.terminal.x,
          y: action.terminal.y
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
  }
);

export const selectors = {
  all(state) {
    return state;
  },

  // deprecated
  dragon(state) {
    return state;
  }
};
