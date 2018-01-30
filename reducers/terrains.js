const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = {};

export const reducer = createReducer(initialState, {});

export const selectors = {
  all: terrains => terrains,
  byId: (terrains, id) => terrains[id],
};


