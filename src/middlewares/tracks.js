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
        const angle = points.angle(source, destination);
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

        const diff = (primaryDistance - secondaryDistance) / 2;

        console.log(source.id, destination.id, angle.toFixed(2), type, primaryDistance, secondaryDistance, diff)

        if (Math.abs(secondaryDistance) < 0.000001) {
          store.dispatch(actions.addTrack({
            id: uuid(),
            connectionId: action.connection.id,
            x1: source.x,
            y1: source.y,
            x2: destination.x,
            y2: destination.y,
          }))
        }

        break;
    }

    return next(action);
  }
}
