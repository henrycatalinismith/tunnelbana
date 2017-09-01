import Immutable from 'immutable';
import actions from '../../actions';
import reducer from '../terminals';
import * as selectors from '../terminals';

describe('terminals', () => {
  describe('reducer', () => {
    it('adds a terminal to the store on ADD_TERMINAL', () => {
      const state = new Immutable.Map;
      const action = actions.addTerminal({
        id: 'Example Terminal',
        connectionId: 'Connection 1',
        lineId: 'Red',
        stationId: 'Liljeholmen',
      });
      const newState = reducer(state, action);

      expect(newState.toJS()).toEqual({
        'Example Terminal': {
          id: 'Example Terminal',
          connectionId: 'Connection 1',
          lineId: 'Red',
          stationId: 'Liljeholmen',
          isSelected: false,
        }
      });
    });
  });

  describe('selectors', () => {
    it('terminals() returns an array of terminals', () => {
      const state = Immutable.fromJS({
        'Terminal 1': {},
        'Terminal 2': {},
      });
      const output = selectors.terminals(state);
      expect(output.toJS()).toEqual([{}, {}]);
    });

    it('terminal() returns a single terminal', () => {
      const state = Immutable.fromJS({
        'Terminal 1': {id: 'Terminal 1'},
        'Terminal 2': {id: 'Terminal 2'},
      });
      const output = selectors.terminal(state, 'Terminal 1');
      expect(output.toJS()).toEqual({ id: 'Terminal 1' });
    });
  });
});
