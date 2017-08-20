import Snap from 'snapsvg';
import actions from '../actions';
import { train } from '../reducers/trains';
import { station } from '../reducers/stations';

export default function(store) {
  return next => action => {
    switch (action.type) {
      case actions.DEPART:
        const state = store.getState();
        const t = train(state.trains, action.departure.trainId);
        const source = station(state.stations, t.stationId);
        const destination = station(state.stations, action.departure.destinationId);

        const width = 15;
        const height = 30;
        const to = {
          x: state.map.viewBox.width / 2
            + state.map.center.x
            + destination.x
            - (width / 2),
          y: state.map.viewBox.height / 2
            + state.map.center.y
            + destination.y
            - (height / 2),
        };

        const el = Snap(document.querySelector(`#train-${t.id}`))
        el.animate({
          x: to.x,
          y: to.y,
        }, 1000);

        console.log(action.departure, t, source);
        console.log('departure middleware');
        break;
    }

    return next(action);
  }
}
