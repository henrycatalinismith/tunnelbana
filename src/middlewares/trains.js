import Snap from 'snapsvg';
import uuid from 'uuid/v1';
import {TweenMax, TweenLite, Power2, TimelineLite} from 'gsap';
import actions from '../actions';
import { nextStop } from '../reducers/connections';
import { line } from '../reducers/lines';
import { train } from '../reducers/trains';
import { station } from '../reducers/stations';

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};
// http://cwestblog.com/2012/11/12/javascript-degree-and-radian-conversion/

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

        const from = new Point(source.x, source.y);
        from.add({ x: 0 - height / 2, y: 0 - width / 2 });

        const to = new Point(destination.x, destination.y);
        to.add({ x: 0 - height / 2, y: 0 - width / 2 });

        const speed = 0.1;
        const distance = from.distance(to);
        const time = distance / speed;
        const angle = to.angle(from);

        const pathId = `#connection-${source.id}-${destination.id}-${l.id}`;
        const path = document.querySelector(pathId);
        const el = Snap(document.querySelector(`#train-${t.id}`))
        const degrees = Math.degrees(angle);
        // console.log(source.id, destination.id, el);
        TweenLite.to(`#train-${t.id}`, 0.1, {
          rotation:degrees,
          //transformOrigin:"center center",
          svgOrigin: `${source.x} ${source.y}`
        });

        console.log(from, source);
        TweenLite.fromTo(`#train-${t.id}`, time / 1000, from, to);


        // el.animate({ x: to.x, y: to.y }, time);
        // el.transform(`r${degrees}`, 1);
        // console.log(from, to);

        setTimeout(() => {
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

        setTimeout(() => {
          store.dispatch(actions.departure({
            id: uuid(),
            sourceId: action.journey.destinationId,
            destinationId: nextDestinationId,
            trainId: action.journey.trainId,
            lineId: action.journey.lineId,
          }));
        }, 1000);
        break;
    }

    return next(action);
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add ({ x = 0, y = 0}) {
    this.x += x;
    this.y += y;
    return this;
  }

  angle (point) {
    return Math.atan2(
      point.y - this.y,
      point.x - this.x
    );
  }

  distance ({ x, y }) {
    const a = Math.abs(this.x - x);
    const b = Math.abs(this.y - y);
    return Math.sqrt(
      Math.abs((a * a) + (b * b))
    );
  }

  rotateAround({ x, y }, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (this.x - x)) + (sin * (this.y - y)) + x,
        ny = (cos * (this.y - y)) - (sin * (this.x - x)) + y;
    this.x = nx;
    this.y = ny;
  }
}
