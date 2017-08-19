import actions from '../actions';

const initialState = {
  minX: 0,
  minY: 0,
  width: 0,
  height: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_VIEW_BOX:
      return action.viewBox;

    default:
      return state;
  }
}
