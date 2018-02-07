const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;

export const reducer = createReducer(initialState, {
  [actions.DEPARTURE](journeys, action) {
    return journeys.set(
      action.journey.id,
      Immutable.fromJS({
        id: action.journey.id,
        duration: action.journey.duration,
      })
    );
  },
});

export const selectors = {
  all(journeys) {
    return journeys.toList();
  },

  byId(journeys, id) {
    return journeys.get(id);
  },
};
