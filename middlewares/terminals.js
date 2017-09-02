import uuid from 'uuid/v1';
import actions from '../actions';
import { station } from '../reducers/stations';
import { select } from '../reducers';

export default function(store) {
  return next => action => {
    switch (action.type) {
      case actions.ADD_CONNECTION:
        const { lineId, sourceId, destinationId } = action.connection;
        const state = store.getState();
        const connections = state.get('connections');
        const stations = store.getState().get('stations');
        const source = station(stations, sourceId);
        const destination = station(stations, destinationId);
        const siblings = select('connections').from(state).byLineId(lineId);
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
