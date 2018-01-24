const { combineReducers, createStore, applyMiddleware, compose } = require("redux");
const { createSelectors } = require("signalbox");

const middleware = require("../middlewares").default;

const actors = require("./actors");
const hexagons = require("./hexagons");
const viewport = require("./viewport");

export const reducers = {
  actors: actors.reducer,
  hexagons: hexagons.reducer,
  viewport: viewport.reducer,
};

export const selectors = createSelectors({
  actors: actors.selectors,
  hexagons: hexagons.selectors,
  viewport: viewport.selectors,
});

export default function (initialState) {
  const reducer = combineReducers(reducers);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(middleware))
  );

  return store;
}

