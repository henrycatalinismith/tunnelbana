const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = []; 

let selection;

export const reducer = createReducer(initialState, {
  [actions.CREATE_HEXAGON](hexagons, { hexagon }) {
    const { x, y, z } = hexagon;
    const newState = [ ...hexagons ];

    if (!newState[x]) {
      newState[x] = [];
      newState[x][y] = [];
    } else if (!newState[x][y]) {
      newState[x][y] = [];
    }

    newState[x][y][z] = { x, y, z };

    return newState;
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
  all: state => {
    console.log(state);
    return flatten(state);
  },
  byGrid: (state, x, y, z) => state[x][y][z],
};

const flatten = arr => arr.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

