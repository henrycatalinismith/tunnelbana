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

  at(tracks, x, y, z) {
    return tracks.filter(t => {
      const sameX = t.get("x2") === x;
      const sameY = t.get("y2") === y;
      const sameZ = t.get("z2") === z;
      const isMatch = sameX && sameY && sameZ;
      return isMatch;
    }).toList();
  },

  byConnection(tracks, connectionId) {
    return tracks
      .filter(s => {
        const isMatch = s.get("connectionId") === connectionId;
        return isMatch;
      })
      .toList()
      .sort((a, b) => {
        const aOrdinality = a.get("ordinality");
        const bOrdinality = b.get("ordinality");
        if (aOrdinality > bOrdinality) return 1;
        if (aOrdinality < bOrdinality) return -1;
        return 0;
      })
  },
};
