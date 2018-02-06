const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;

export const reducer = createReducer(initialState, {
  [actions.CREATE_CONNECTION](tracks, action) {
    return tracks.merge(Immutable.fromJS(action.tracks));
  }
});

export const selectors = {
  all(tracks) {
    return tracks.toList();
  },

  byId(tracks, id) {
    return tracks.get(id);
  },

  byConnection(tracks, connectionId) {
    return tracks.filter(s => {
      const isMatch = s.get("connectionId") === connectionId;
      return isMatch;
    }).toList();
  },
};
