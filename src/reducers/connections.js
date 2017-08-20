import actions from '../actions';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_CONNECTION:
      return [...state, action.connection];
    default:
      return [...state];
  }
}
