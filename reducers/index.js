const { combineReducers, createStore, applyMiddleware, compose } = require("redux");
const { createSelectors } = require("signalbox");

const middleware = require("../middlewares").default;

const actors = require("./actors");
const camera = require("./camera");
const cells = require("./cells");
const hexagons = require("./hexagons");
const viewport = require("./viewport");

export const selectors = require("./selectors").default;

export const reducers = {
  actors: actors.reducer,
  cells: cells.reducer,
  hexagons: hexagons.reducer,
  viewport: viewport.reducer,
  camera: camera.reducer,
};

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

