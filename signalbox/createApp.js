const { bindActionCreators } = require("redux");

exports.createApp = (store, actions, middlewares, selectors, thunks) => {
  const actionCreators = {};
  const actionTypes = {};
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === 'function') {
      actionCreators[key] = actions[key];
    } else if (typeof actions[key] === 'string') {
      actionTypes[key] = actions[key];
    }
  });

  const app = {};
  app.actions = actionTypes;
  app.dispatch = bindActionCreators(actionCreators, store.dispatch);
  app.select = selectors.bindStore(store);
  app.before = (actionType, m) => middlewares.befores[actionType].push(m);
  app.after = (actionType, m) => middlewares.afters[actionType].push(m);
  app.cancel = (actionType, m) => middlewares.cancels[actionType].push(m);
  app.thunks = bindActionCreators(thunks, store.dispatch);

  return app;
};

