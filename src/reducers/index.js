import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import connections from './connections';
import lines from './lines';
import map from './map';
import stations from './stations';
import middlewares from '../middlewares';

const reducer = combineReducers({
  connections,
  lines,
  map,
  stations,
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
