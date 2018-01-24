const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = {};

export const reducer = createReducer(initialState, {
  [actions.CREATE_HEXAGON](hexagons, action) {
    return {
      ...hexagons,
      [action.hexagon.id]: action.hexagon
    };
  },
});

export const selectors = {
  all: hexagons => hexagons,
  byId: (hexagons, id) => hexagons[id],
};


