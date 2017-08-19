import actions from '../actions';

const initialState = {
  center: {
    x: 0,
    y: 0,
  },

  viewBox: {
    minX: 0,
    minY: 0,
    width: 0,
    height: 0,
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_VIEW_BOX:
      return { ...state, viewBox: action.viewBox };

    default:
      return state;
  }
}
