const Immutable = require("immutable");
const thunk = require("redux-thunk").default;
const { createStore, applyMiddleware, compose } = require("redux");
const { combineReducers } = require("redux-immutable");
const { createSelectors } = require("signalbox");

const middleware = require("../middlewares").default;

const cameras = require("./cameras");
const cells = require("./cells");
const hexagons = require("./hexagons");
const stations = require("./stations");
const terrains = require("./terrains");
const viewport = require("./viewport");

export const selectors = require("./selectors").default;

export const reducers = {
  cameras: cameras.reducer,
  cells: cells.reducer,
  hexagons: hexagons.reducer,
  stations: stations.reducer,
  terrains: terrains.reducer,
  viewport: viewport.reducer,
};


export default function (initialState) {
  const reducer = combineReducers(reducers);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    Immutable.fromJS(initialState),
    composeEnhancers(applyMiddleware(middleware, thunk))
  );

  return store;
}

