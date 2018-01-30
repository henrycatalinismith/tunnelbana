const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;

export const reducer = createReducer(initialState, {});

export const selectors = {
  all: terrains => terrains.toList(),
  byId: (terrains, id) => terrains.get(id),
};


