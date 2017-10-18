const defaultOptions = {
  stateAccessor(state, entity) {
    return state && state[entity];
  }
};

exports.createSelectors = (selectors, options = defaultOptions) => {
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
