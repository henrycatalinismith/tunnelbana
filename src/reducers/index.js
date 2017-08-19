import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import stations from './stations';
import viewBox from './viewBox';
import middlewares from '../middlewares';

const reducer = combineReducers({
  stations,
  viewBox,
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
