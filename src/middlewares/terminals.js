import uuid from 'uuid/v1';
import actions from '../actions';
import { getConnectionsByLine } from '../reducers/connections';

export default function(store) {
  return next => action => {
    switch (action.type) {
      case actions.ADD_CONNECTION:
        const { lineId } = action.connection;
        const { connections } = store.getState();
        const siblings = getConnectionsByLine(connections, lineId)
        if (siblings.length === 0) {
          store.dispatch(actions.addTerminal({
            id: uuid(),
            connectionId: action.connection.id,
            lineId,
            stationId: action.connection.sourceId,
          }));

          store.dispatch(actions.addTerminal({
            id: uuid(),
            connectionId: action.connection.id,
            lineId,
            stationId: action.connection.destinationId,
          }));
        }
        break;
    }

    return next(action);
  }
}
