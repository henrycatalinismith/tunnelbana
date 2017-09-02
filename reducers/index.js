import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { createSelect } from 'bo-selecta';
import connections from './connections';
import journeys from './journeys';
import lines from './lines';
import map from './map';
import stations from './stations';
import terminals from './terminals';
import tracks from './tracks';
import trains from './trains';
import middlewares from '../middlewares';

const reducer = combineReducers({
  connections,
  journeys,
  lines,
  map,
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

import { select as connectionSelectors } from './connections';

const selectors = {
  connections: connectionSelectors,
};

export const select = createSelect(selectors, {
  stateAccessor(s, entity) {
    return s.get(entity);
  }
});
