exports.createMiddleware = cb => {
  const befores = {};
  const afters = {};
  const cancels = {};

  const middleware = store => {
    return next => action => {
      befores[action.type] &&
        befores[action.type].forEach(before => {
          before.call(null, store, action);
        });

      if (cancels[action.type]) {
        for (let cancel of cancels[action.type]) {
          const shouldCancel = cancel.call(null, store, action);
          if (shouldCancel === true) {
            return null;
          }
        }
      }

      const result = next(action);

      afters[action.type] &&
        afters[action.type].forEach(after => {
          after.call(null, store, action);
        });

      return result;
    };
  };

  const addBefore = actionType => {
    (befores[actionType] = befores[actionType] || []).push(undefined);
    return `before.${actionType}.${befores[actionType].length}`;
  };

  const addAfter = actionType => {
    (afters[actionType] = afters[actionType] || []).push(undefined);
    return `after.${actionType}.${afters[actionType].length}`;
  };

  const addCancel = actionType => {
    (cancels[actionType] = cancels[actionType] || []).push(undefined);
    return `cancel.${actionType}.${cancels[actionType].length}`;
  };

  const middlewares = cb.call(null, addBefore, addAfter, addCancel);

  Object.keys(middlewares).forEach(key => {
    const [, timing, actionType, index] = key.match(
      /^(before|after|cancel)\.(.*)+\.(\d+)$/
    );
    ({ before: befores, after: afters, cancel: cancels }[timing][actionType][index - 1] =
      middlewares[key]);
  });

  return [middleware];
};


const defaultOptions = {
  stateAccessor(state, entity) {
    return state && state[entity];
  }
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
