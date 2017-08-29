import uuid from 'uuid/v1';
import actions from '../actions';
import { getConnectionsByLine } from '../reducers/connections';
import { station } from '../reducers/stations';

export default function(store) {
  return next => action => {
    switch (action.type) {
      case actions.ADD_CONNECTION:
        const { lineId, sourceId, destinationId } = action.connection;
        const { connections, stations } = store.getState();
        const source = station(stations, sourceId);
        const destination = station(stations, destinationId);
        const siblings = getConnectionsByLine(connections, lineId)
        if (siblings.length === 0) {
          store.dispatch(actions.addTerminal({
            id: uuid(),
            connectionId: action.connection.id,
            lineId,
            stationId: action.connection.sourceId,
            x: source.x,
            y: source.y,
          }));

          store.dispatch(actions.addTerminal({
            id: uuid(),
            connectionId: action.connection.id,
            lineId,
            stationId: action.connection.destinationId,
            x: destination.x,
            y: destination.y,
          }));
        }
        break;
    }

    return next(action);
  }
}
