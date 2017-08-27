import Snap from 'snapsvg';
import uuid from 'uuid/v1';
import {TweenMax, TweenLite, Power2, TimelineLite} from 'gsap';
import actions from '../actions';
import { nextStop } from '../reducers/connections';
import { line } from '../reducers/lines';
import { train } from '../reducers/trains';
import { station } from '../reducers/stations';
import clock from '../clock';
import * as points from '../geometry/points';

export default function(store) {
  return next => action => {
    let state;
    let t, source, destination, l;

    switch (action.type) {
      case actions.DEPARTURE:
        state = store.getState();
        t = train(state.trains, action.journey.trainId);
        source = station(state.stations, action.journey.sourceId);
        destination = station(state.stations, action.journey.destinationId);
        l = line(state.lines, action.journey.lineId);

        const width = 15;
        const height = 30;

        const halfTrain = { x: 0 - height / 2, y: 0 - width / 2 };
        const from = points.add(source, halfTrain);
        const to = points.add(destination, halfTrain);

        const speed = 0.1;
        const distance = points.distance(from, to);
        const time = distance / speed;
        const angle = points.angle(to, from);

        const pathId = `#connection-${source.id}-${destination.id}-${l.id}`;
        const path = document.querySelector(pathId);
        const el = Snap(document.querySelector(`#train-${t.id}`))
        const degrees = angle * 180 / Math.PI;

        TweenLite.to(`#train-${t.id}`, 0.1, {
          rotation:degrees,
          svgOrigin: `${source.x} ${source.y}`
        });

        TweenLite.fromTo(`#train-${t.id}`, time / 1000, from, to);

        clock.setTimeout(() => {
          store.dispatch(actions.arrival({
            destinationId: destination.id,
            lineId: l.id,
            sourceId: source.id,
            trainId: t.id,
          }));
        }, time );
        break;

      case actions.ARRIVAL:
        state = store.getState();
        const nextDestinationId = nextStop(
          state.connections,
          action.journey.sourceId,
          action.journey.destinationId,
          action.journey.lineId
        );

        clock.setTimeout(() => {
          store.dispatch(actions.departure({
            id: uuid(),
            sourceId: action.journey.destinationId,
            destinationId: nextDestinationId,
            trainId: action.journey.trainId,
            lineId: action.journey.lineId,
          }));
        }, 300);
        break;
    }

    return next(action);
  }
}
