import Snap from 'snapsvg';
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
        t = train(state.trains, action.departure.trainId);
        source = station(state.stations, action.departure.sourceId);
        destination = station(state.stations, action.departure.destinationId);
        l = line(state.lines, action.departure.lineId);

        const width = 15;
        const height = 30;

        const from = new Point(source.x, source.y);
        from.add({ x: state.map.viewBox.width / 2, y: state.map.viewBox.height / 2});
        from.add({ x: state.map.center.x, y: state.map.center.y });
        from.add({ x: 0 - width / 2, y: 0 - height / 2 });

        const to = new Point(destination.x, destination.y);
        to.add({ x: state.map.viewBox.width / 2, y: state.map.viewBox.height / 2});
        to.add({ x: state.map.center.x, y: state.map.center.y });
        to.add({ x: 0 - width / 2, y: 0 - height / 2 });

        const speed = 0.1;
        const distance = from.distance(to);
        const time = distance / speed;
        const angle = from.angle(to);

        const el = Snap(document.querySelector(`#train-${t.id}`))
        console.log(`rotate(${Math.degrees(Math.sin(angle))})`);
        var bbox = el.getBBox(); //bounding box, get coords and centre
        //el.transform(`rotate(${Math.degrees(angle)+275}deg)`, 1);
        const degrees = Math.degrees(angle);

        // to.rotateAround(from, degrees);

        el.transform(`r${degrees}`, 1);
        setTimeout(() => {
          el.animate({
            x: to.x,
            y: to.y,
          }, time);
        }, 10);

        setTimeout(() => {
          store.dispatch(actions.arrival({
            destinationId: destination.id,
            lineId: l.id,
            sourceId: source.id,
            trainId: t.id,
          }));
        }, time);
        break;

      case actions.ARRIVAL:
        state = store.getState();
        const nextDestinationId = nextStop(
          state.connections,
          action.arrival.sourceId,
          action.arrival.destinationId,
          action.arrival.lineId
        );

        setTimeout(() => {
          store.dispatch(actions.departure({
            sourceId: action.arrival.destinationId,
            destinationId: nextDestinationId,
            trainId: action.arrival.trainId,
            lineId: action.arrival.lineId,
          }));
        }, 100);
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
