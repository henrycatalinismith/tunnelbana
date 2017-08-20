import actions from '../actions';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TRAIN:
      return [...state, action.train];
    default:
      return state;
  }
}
