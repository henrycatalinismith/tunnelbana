import uuid from 'uuid/v1';
import actions from '../actions';
import { station } from '../reducers/stations';

export default function(store) {
  return next => action => {
    switch (action.type) {
      case actions.ADD_CONNECTION:
        const { lineId, sourceId, destinationId } = action.connection;
        const { connections, stations } = store.getState();
        const source = station(stations, sourceId);
        const destination = station(stations, destinationId);

        store.dispatch(actions.addTrack({
          id: uuid(),
          connectionId: action.connection.id,
          x1: source.x,
          y1: source.y,
          x2: destination.x,
          y2: destination.y,
        }))

        break;
    }

    return next(action);
  }
}
