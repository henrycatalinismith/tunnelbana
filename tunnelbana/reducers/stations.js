import Immutable from "immutable";
import { createReducer } from "signalbox";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.CREATE_STATION](state, action) {
    return state.set(
      action.station.id,
      Immutable.fromJS({
        id: action.station.id,
        x: action.station.x,
        y: action.station.y,
        genderId: action.gender.id,
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
    if (action.dragon.entity !== "station") return state;
    return state.update(action.dragon.id, station => {
      return station.merge(
        Immutable.fromJS({
          isSelected: true
        })
      );
    });
  },

  [actions.DRAGON_DROP](state, action) {
    if (action.dragon.entity !== "station") return state;
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
