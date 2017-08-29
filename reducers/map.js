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
    case actions.WINDOW_RESIZE:
      return { ...state, viewBox: {
        ...state.viewBox,
        width: action.window.width,
        height: action.window.height,
      }};

    default:
      return state;
  }
}
