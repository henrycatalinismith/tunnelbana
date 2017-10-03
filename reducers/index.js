import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux-immutable";
import { createSelect } from "signalbox";

import {
  reducer as connectionsReducer,
  selectors as connectionSelectors
} from "./connections";

import {
  reducer as dragonReducer,
  selectors as dragonSelectors
} from "./dragon";

import {
  reducer as journeysReducer,
  selectors as journeySelectors
} from "./journeys";

import { reducer as linesReducer, selectors as lineSelectors } from "./lines";

import {
  reducer as passengersReducer,
  selectors as passengerSelectors
} from "./passengers";

import {
  reducer as stationsReducer,
  selectors as stationSelectors
} from "./stations";

import {
  reducer as terminalsReducer,
  selectors as terminalSelectors
} from "./terminals";

import {
  reducer as tracksReducer,
  selectors as trackSelectors
} from "./tracks";

import {
  reducer as trainsReducer,
  selectors as trainSelectors
} from "./trains";

import {
  reducer as viewboxReducer,
  selectors as viewboxSelectors
} from "./viewbox";

import middlewares from "../middlewares";

const reducer = combineReducers({
  connections: connectionsReducer,
  dragon: dragonReducer,
  journeys: journeysReducer,
  lines: linesReducer,
  passengers: passengersReducer,
  stations: stationsReducer,
  terminals: terminalsReducer,
  tracks: tracksReducer,
  trains: trainsReducer,
  viewbox: viewboxReducer
});

const selectors = {
  connections: connectionSelectors,
  dragon: dragonSelectors,
  journeys: journeySelectors,
  lines: lineSelectors,
  passengers: passengerSelectors,
  stations: stationSelectors,
  terminals: terminalSelectors,
  tracks: trackSelectors,
  trains: trainSelectors,
  viewbox: viewboxSelectors
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  undefined,
  composeEnhancers(applyMiddleware(middlewares))
);

export default store;

export const select = createSelect(selectors, {
  stateAccessor(s, entity) {
    return s.get(entity);
  }
});
