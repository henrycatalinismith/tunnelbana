const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;

export const reducer = createReducer(initialState, {
  [actions.CREATE_CONNECTION](connections, action) {
    return connections.setIn(
      [action.connection.id],
      Immutable.fromJS(action.connection)
    );
  }
});

export const selectors = {
  all(connections) {
    return connections.toList();
  },

  byId(connections, id) {
    return connections.get(id);
  },
};
