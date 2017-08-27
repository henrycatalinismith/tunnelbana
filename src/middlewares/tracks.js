import uuid from 'uuid/v1';
import actions from '../actions';
import { station } from '../reducers/stations';
import * as points from '../geometry/points';

export default function(store) {
  return next => action => {
    switch (action.type) {
      case actions.ADD_CONNECTION:
        const { lineId, sourceId, destinationId } = action.connection;
        const { connections, stations } = store.getState();
        const source = station(stations, sourceId);
        const destination = station(stations, destinationId);
        const angle = Math.abs(points.angle(source, destination));
        const π = Math.PI;

        let type = 'dunno lol';

        if (angle > π / 4 && angle < 3 / 4 * π) {
          type = 'latitudinal'; // northerly track
        } else if (angle > 3 / 4 * π && angle < 5 / 4 * π) {
          type = 'longitudinal'; // westerly track
        } else if (angle > 5 / 4 * π && angle < 7 / 4 * π) {
          type = 'latitudinal'; // southerly track
        } else {
          type = 'longitudinal'; // easterly track
        }

        let primaryDistance;
        let secondaryDistance;
        if (type === 'latitudinal') {
          primaryDistance = source.y - destination.y;
          secondaryDistance = source.x - destination.x;
        } else {
          primaryDistance = source.x - destination.x;
          secondaryDistance = source.y - destination.y;
        }
        primaryDistance = Math.abs(primaryDistance);
        secondaryDistance = Math.abs(secondaryDistance);
        const remainder = (primaryDistance - secondaryDistance);


        if (Math.abs(secondaryDistance) < 0.000001) {
          store.dispatch(actions.addTrack({
            id: uuid(),
            connectionId: action.connection.id,
            lineId,
            x1: source.x,
            y1: source.y,
            x2: destination.x,
            y2: destination.y,
          }))
        } else {
          let p1, p2;

          const addTrack = (p1, p2) => {
            store.dispatch(actions.addTrack({
              id: uuid(),
              connectionId: action.connection.id,
              lineId,
              x1: p1.x,
              y1: p1.y,
              x2: p2.x,
              y2: p2.y,
            }))

          }

          let a, b;
          if (type === 'latitudinal') {
            a = { x: source.x, y: source.y };
            b = { x: destination.x, y: destination.y}
            a.y += source.y < destination.y ? remainder / 2 : 0 - remainder / 2;
            b.y += source.y > destination.y ? remainder / 2 : 0 - remainder / 2;

            addTrack(source, a);
            addTrack(a, b);
            addTrack(b, destination);
          }

          if (type === 'longitudinal') {
            a = { x: source.x, y: source.y };
            b = { x: destination.x, y: destination.y}
            a.x += source.x < destination.x ? remainder / 2 : 0 - remainder / 2;
            b.x += source.x > destination.x ? remainder / 2 : 0 - remainder / 2;

            addTrack(source, a);
            addTrack(a, b);
            addTrack(b, destination);
          }
        }

        break;
    }

    return next(action);
  }
}
