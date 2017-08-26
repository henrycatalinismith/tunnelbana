import actions from '../actions';
import clock from '../clock';
import {TweenMax, TweenLite} from 'gsap';

export default function(store) {
  return next => action => {
    switch (action.type) {
      case actions.APP_STARTUP:
        window.addEventListener('blur', () => {
          store.dispatch(actions.windowBlur());
          clock.pause();
          TweenMax.pauseAll(true, true);
        })

        window.addEventListener('focus', () => {
          console.log('focus')
          store.dispatch(actions.windowFocus());
          clock.resume();
          TweenMax.resumeAll(true, true);
        })

        window.addEventListener('resize', () => {
          store.dispatch(actions.windowResize());
        })

        store.dispatch(actions.updateViewBox(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        ));
        break;
    }

    return next(action);
  }
}
