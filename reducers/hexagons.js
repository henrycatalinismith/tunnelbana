const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = {
};

export const reducer = createReducer(initialState, {
  [actions.CREATE_HEXAGON](state, { hexagon }) {
    return {
      ...state,
      [hexagon.id]: hexagon
    };
  },

  [actions.SELECT_HEXAGON](state, { hexagon }) {
    return {
      ...state,
      [hexagon.id]: {
        ...state[hexagon.id],
        isSelected: true,
      }
    };
  },
});

export const selectors = {
  all: state => state,
  byId: (state, id) => state[id],
};


