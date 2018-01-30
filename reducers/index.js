const { combineReducers, createStore, applyMiddleware, compose } = require("redux");
const { createSelectors } = require("signalbox");

const middleware = require("../middlewares").default;

const actors = require("./actors");
const cameras = require("./cameras");
const cells = require("./cells");
const hexagons = require("./hexagons");
const stations = require("./stations");
const terrain = require("./terrain");
const viewport = require("./viewport");

export const selectors = require("./selectors").default;

export const reducers = {
  actors: actors.reducer,
  cameras: cameras.reducer,
  cells: cells.reducer,
  hexagons: hexagons.reducer,
  stations: stations.reducer,
  terrain: terrain.reducer,
  viewport: viewport.reducer,
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

