
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = {};

export const reducer = createReducer(initialState, {
  [actions.CREATE_STATION](stations, action) {
    return {
      ...stations,
      [action.station.id]: {
        ...action.station,
        hexagonId: action.hexagon.id,
      }
    };
  },
});

export const selectors = {
  all: stations => {
    return Object.keys(stations).map(id => stations[id]);
  },

  byId: (stations, id) => {
    return stations[id];
  },
};



