const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = {
};

let selection;

export const reducer = createReducer(initialState, {
  [actions.CREATE_HEXAGON](state, { hexagon }) {
    return {
      ...state,
      [hexagon.id]: hexagon
    };
  },

  [actions.SELECT_HEXAGON](state, { hexagon }) {
    const oldSelection = selection;
    selection = hexagon.id;
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
  all: state => state,
  byId: (state, id) => state[id],
};


