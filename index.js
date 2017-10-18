const { createActions } = require("./src/createActions");
const { createApp } = require("./src/createApp");
const { createMiddleware } = require("./src/createMiddleware");

const defaultOptions = {
  stateAccessor(state, entity) {
    return state && state[entity];
  }
};

exports.createReducer = (initialState, actionHandlers) => {
  const reducer = (state, action) => {
    if (state === undefined) {
      state = initialState;
    }
    if (actionHandlers.hasOwnProperty(action.type)) {
      state = actionHandlers[action.type](state, action);
    }
    return state;
  };

  return reducer;
};

exports.createSelect = (selectors, options = defaultOptions) => {
  const select = entity => {
    return {
      from(state) {
        return new Proxy({}, {
          get(target, name) {
            const stateParam = options.stateAccessor(state, entity);
            return selectors[entity][name].bind(null, stateParam);
          }
        });
      }
    }
  };

  select.bindStore = store => {
    const boundSelect = {};

    for (let entity in selectors) {
      boundSelect[entity] = {};
      for (let name in selectors[entity]) {
        boundSelect[entity][name] = () => {
          const state = store.getState();
          const stateParam = options.stateAccessor(state, entity);
          return selectors[entity][name].call(null, stateParam);
        };
      }
    }
    return boundSelect;
  }

  return select;
}
