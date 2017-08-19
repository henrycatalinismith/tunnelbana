import { combineReducers, createStore } from 'redux';
import stations from './stations';

const reducer = combineReducers({
  stations,
});

const store = createStore(reducer);

export default store;
