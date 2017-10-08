import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.CREATE_STATION](state, action) {
    return state.set(
      action.station.id,
      Immutable.fromJS({
        id: action.station.id,
        x: action.station.x,
        y: action.station.y,
        isSelected: false
      })
    );
  },

  [actions.IMPORT_STATION](state, action) {
    return state.set(
      action.station.id,
      Immutable.fromJS({
        id: action.station.id,
        x: action.station.x,
        y: action.station.y
      })
    );
  },

  [actions.DRAGON_GRAB](state, action) {
    if (action.entity !== "station") return state;
    return state.update(action.id, station => {
      return station.merge(
        Immutable.fromJS({
          isSelected: true
        })
      );
    });
  },

  [actions.DRAGON_MOVE_STATION](state, action) {
    return state.update(action.id, station => {
      return station.merge(
        Immutable.fromJS({
          x: action.x,
          y: action.y
        })
      );
    });
  },

  [actions.DRAGON_DROP](state, action) {
    if (action.entity !== "station") return state;
    return state.update(action.dragon.id, station => {
      return station.merge(
        Immutable.fromJS({
          isSelected: false
        })
      );
    });
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
