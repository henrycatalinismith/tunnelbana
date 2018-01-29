exports.createMiddleware = cb => {
  const befores = {};
  const afters = {};
  const cancels = {};

  const middleware = store => {
    return next => action => {
      if (cancels[action.type]) {
        for (let cancel of cancels[action.type]) {
          const shouldCancel = cancel.call(null, store, action);
          if (shouldCancel === true) {
            return null;
          }
        }
      }

      befores[action.type] &&
        befores[action.type].forEach(before => {
          before.call(null, store, action);
        });

      const result = next(action);

      afters[action.type] &&
        afters[action.type].forEach(after => {
          after.call(null, store, action);
        });

      return result;
    };
  };

  const addCancel = actionType => {
    (cancels[actionType] = cancels[actionType] || []).push(undefined);
    return `cancel.${actionType}.${cancels[actionType].length}`;
  };

  const addBefore = actionType => {
    (befores[actionType] = befores[actionType] || []).push(undefined);
    return `before.${actionType}.${befores[actionType].length}`;
  };

  const addAfter = actionType => {
    (afters[actionType] = afters[actionType] || []).push(undefined);
    return `after.${actionType}.${afters[actionType].length}`;
  };

  let middlewares;

  if (typeof cb === 'function') {
    middlewares = cb.call(null, addCancel, addBefore, addAfter);
  } else if (typeof cb === 'object') {
    middlewares = {};
    for (let m of cb) {
      for (let b in m.befores) {
        befores[b] = (befores[b] || []).concat(m.befores[b][0]);
      }
      for (let a in m.afters) {
        afters[a] = (afters[a] || []).concat(m.afters[a][0]);
      }
      for (let c in m.cancels) {
        cancels[c] = (cancels[c] || []).concat(m.cancels[c][0]);
      }
    }
  }

  Object.keys(middlewares).forEach(key => {
    const [, timing, actionType, index] = key.match(
      /^(before|after|cancel)\.(.*)+\.(\d+)$/
    );
    ({ before: befores, after: afters, cancel: cancels }[timing][actionType][index - 1] =
      middlewares[key]);
  });

  middleware.befores = befores;
  middleware.afters = afters;
  middleware.cancels = cancels;
  return middleware;
};

