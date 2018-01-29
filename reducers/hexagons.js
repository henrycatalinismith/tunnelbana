const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = {};

let selection;

export const reducer = createReducer(initialState, {
  [actions.CREATE_CELL](hexagons, action) {
    return {
      ...hexagons,
      ...action.hexagons,
    };
  },

  [actions.SELECT_HEXAGON](state, { hexagon }) {
    const oldSelection = selection;
    selection = hexagon.id;
    return state;
    return {
      ...state,
      [oldSelection]: {
        ...state[oldSelection],
        isSelected: false,
      },
      [hexagon.id]: {
        ...state[hexagon.id],
        isSelected: true,
      }
    };
  },
});

export const selectors = {
  all: hexagons => {
    return Object.keys(hexagons).map(id => hexagons[id]);
  },
  byGrid: (hexagons, x, y, z) => {
    const matchId = Object.keys(hexagons).filter(id => {
      const isMatch = (
        hexagons[id].x === x &&
        hexagons[id].y === y &&
        hexagons[id].z === z
      );
      return isMatch;
    })[0];
    return hexagons[matchId];
  }
};

const flatten = arr => arr.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

