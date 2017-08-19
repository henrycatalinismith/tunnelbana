import actions from '../actions';

export default function(store) {
  return next => action => {
    switch (action.type) {
      case actions.APP_STARTUP:
        store.dispatch(actions.updateViewBox(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        ))
        break;
    }

    return next(action);
  }
}
