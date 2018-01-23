const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = {};

export const reducer = createReducer(initialState, {
  [actions.CREATE_ACTOR](actors, action) {
    actors[action.actor.id] = action.actor;
    return actors;
  },
});

export const selectors = {
  all: actors => actors,
};


