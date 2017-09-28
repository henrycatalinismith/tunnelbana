exports.createMiddleware = cb => {
  const befores = {};
  const afters = {};

  const middleware = store => {
    return next => action => {
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

  const addBefore = actionType => {
    (befores[actionType] = befores[actionType] || []).push(undefined);
    return `before.${actionType}.${befores[actionType].length}`;
  };
  const addAfter = actionType => {
    (afters[actionType] = afters[actionType] || []).push(undefined);
    return `after.${actionType}.${afters[actionType].length}`;
  };

  const middlewares = cb.call(null, addBefore, addAfter);

  Object.keys(middlewares).forEach(key => {
    const [, timing, actionType, index] = key.match(
      /^(before|after)\.(.*)+\.(\d+)$/
    );
    ({ before: befores, after: afters }[timing][actionType][index - 1] =
      middlewares[key]);
  });

  return [middleware];
};

