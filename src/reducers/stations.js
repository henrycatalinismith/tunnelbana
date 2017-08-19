import actions from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case actions.ADD_STATION:
      return [...state, action.station];
    default:
      return [...state];
  }
}
