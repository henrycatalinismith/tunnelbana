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

import stations from './stations';
import terminals from './terminals';
import tracks from './tracks';
import trains from './trains';
import middlewares from '../middlewares';

const reducer = combineReducers({
  connections: connectionsReducer,
  journeys: journeysReducer,
  lines: linesReducer,
  map: mapReducer,
  stations,
  terminals,
  tracks,
  trains,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  undefined,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
);

export default store;

const selectors = {
  connections: connectionSelectors,
  journeys: journeySelectors,
  lines: lineSelectors,
};

export const select = createSelect(selectors, {
  stateAccessor(s, entity) {
    return s.get(entity);
  }
});
