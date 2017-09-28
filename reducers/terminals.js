import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.ADD_TERMINAL](state, action) {
    return state.set(
      action.terminal.id,
      Immutable.fromJS({
        id: action.terminal.id,
        connectionId: action.terminal.connectionId,
        lineId: action.terminal.lineId,
        stationId: action.terminal.stationId,
        isSelected: false
      })
    );
  },

  [actions.ADD_CONNECTION](state, action) {
    const { lineId, sourceId, destinationId } = action.connection;
    const newSource = selectors.byLineAndStation(state, lineId, sourceId);
    const newDestination = selectors.byLineAndStation(
      state,
      lineId,
      destinationId
    );

    if (newSource && !newDestination) {
      return state.setIn(
        [newSource.id, "stationId"],
        action.connection.destinationId
      );
    }

    return state;
  },

  [actions.SELECT_TERMINAL](state, action) {
    const terminalId = action.terminalId;
    return state.setIn([terminalId, "isSelected"], true);
  },

  [actions.DESELECT_TERMINAL](state, action) {
    return state.update(action.terminalId, terminal => {
      return terminal.merge(
        Immutable.fromJS({
          isSelected: false,
          x: undefined,
          y: undefined
        })
      );
    });
  },

  [actions.DRAGON_MOVE](state, action) {
    if (action.entity !== "terminal") return state;
    return state.update(action.id, terminal => {
      return terminal.merge(
        Immutable.fromJS({
          x: action.x,
          y: action.y
        })
      );
    });
  },

  [actions.DRAGON_DROP](state, action) {
    if (action.entity !== "terminal") return state;
    return state.update(action.id, terminal => {
      return terminal.merge(
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
  },

  byLineAndStation(state, lineId, destinationId) {
    return state
      .filter(t => {
        return (
          t.get("lineId") === lineId && t.get("stationId") === destinationId
        );
      })
      .first();
  }
};
