import actions from '../../actions';
import reducer from '../connections';
import * as selectors from '../connections';

describe('connections', () => {
  describe('reducer', () => {
    it('adds a connection to the store on ADD_CONNECTION', () => {
      const state = {};
      const action = actions.addConnection({
        id: 'Norr Mälarstrand',
        sourceId: 'T-Centralen',
        destinationId: 'Rådhuset',
        lineId: 'Blue',
      });
      const newState = reducer(state, action);

      expect(newState).toEqual({
        'Norr Mälarstrand': {
          id: 'Norr Mälarstrand',
          sourceId: 'T-Centralen',
          destinationId: 'Rådhuset',
          lineId: 'Blue',
        }
      });
    });
  });

  describe('selectors', () => {
    test('connections() returns an array of connections', () => {
      const state = { 'Connection 1': {}, 'Connection 2': {} };
      const output = selectors.connections(state);
      expect(output).toEqual([{}, {}]);
    });

    test('connection() returns a single connection', () => {
      const state = { 'C1': {id: 'C1'}, 'C2': {id: 'C2'} };
      const output = selectors.connection(state, 'C1');
      expect(output).toEqual({ id: 'C1' });
    });

    test('getConnectionsByLine() returns only connections on the given line', () => {
      const state = {
        'R1': { id: 'R1', lineId: 'Red' },
        'B1': { id: 'B1', lineId: 'Blue' },
      };
      const output = selectors.getConnectionsByLine(state, 'Red');
      expect(output).toEqual([{ id: 'R1', lineId: 'Red' }]);
    });

    test('fakeConnections() returns connections to terminals', () => {
      const state = {
        'R1': { id: 'R1', sourceId: 'Slussen', destinationId: 'Gamla Stan' },
        'R2': { id: 'R2', sourceId: 'Gamla Stan', terminalId: 'T1' },
      };
      const output = selectors.fakeConnections(state);
      expect(output).toEqual([{ id: 'R2', sourceId: 'Gamla Stan', terminalId: 'T1' }]);
    });

    test('nextStop() returns the next destinationId for a train', () => {
      const state = {
        'R1': { id: 'R1', sourceId: 'Slussen', destinationId: 'Gamla Stan', lineId: 'Red' },
        'R2': { id: 'R2', sourceId: 'Gamla Stan', destinationId: 'T-Centralen', lineId: 'Red' },
      };
      const output = selectors.nextStop(state, 'Slussen', 'Gamla Stan', 'Red');
      expect(output).toEqual({'connectionId': 'R2', 'destinationId': 'T-Centralen'});
    });
  });
});
