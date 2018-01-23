const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = {
  width: undefined,
  height: undefined,
};

export const reducer = createReducer(initialState, {
  [actions.RESIZE_VIEWPORT](viewport, action) {
    return action.viewport;
  },
});

export const selectors = {
  dimensions: viewport => ({
    width: viewport.width,
    height: viewport.height,
  })
};


