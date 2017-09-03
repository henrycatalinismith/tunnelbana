import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { createSelect } from 'bo-selecta';

import {
  reducer as connectionsReducer,
  selectors as connectionSelectors,
} from './connections';

import {
  reducer as journeysReducer,
  selectors as journeySelectors,
} from './journeys';

import {
  reducer as linesReducer,
  selectors as lineSelectors,
} from './lines';

import {
  reducer as mapReducer,
} from './map';

import {
  reducer as stationsReducer,
  selectors as stationSelectors,
} from './stations';

import {
  reducer as terminalsReducer,
  selectors as terminalSelectors,
} from './terminals';

import {
  reducer as tracksReducer,
  selectors as trackSelectors,
} from './tracks';

import {
  reducer as trainsReducer,
  selectors as trainSelectors,
} from './trains';

import middlewares from '../middlewares';

const reducer = combineReducers({
  connections: connectionsReducer,
  journeys: journeysReducer,
  lines: linesReducer,
  map: mapReducer,
  stations: stationsReducer,
  terminals: terminalsReducer,
  tracks: tracksReducer,
  trains: trainsReducer,
});

const selectors = {
  connections: connectionSelectors,
  journeys: journeySelectors,
  lines: lineSelectors,
  stations: stationSelectors,
  terminals: terminalSelectors,
  tracks: trackSelectors,
  trains: trainSelectors,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  undefined,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
);

export default store;

export const select = createSelect(selectors, {
  stateAccessor(s, entity) {
    return s.get(entity);
  }
});
