import actions from '../../actions';
import reducer from '../lines';
import * as selectors from '../lines';

describe('lines', () => {
  describe('reducer', () => {
    it('adds a line to the store on ADD_LINE', () => {
      const state = {};
      const action = actions.addLine({
        id: 'Röda Linjen',
        color: '#ff0000',
      });
      const newState = reducer(state, action);

      expect(newState).toEqual({
        'Röda Linjen': {
          id: 'Röda Linjen',
          color: '#ff0000',
          isSelected: false,
        }
      });
    });

    it('marks the line as selected on SELECT_TERMINAL', () => {
      const state = {
        'Röda Linjen': {
          id: 'Röda Linjen',
          color: '#ff0000',
          isSelected: false,
        }
      };
      const action = actions.selectTerminal({ lineId: 'Röda Linjen' })
      const newState = reducer(state, action);
      expect(newState['Röda Linjen'].isSelected).toEqual(true);
    });

    it('marks the line as not selected on DESELECT_TERMINAL', () => {
      const state = {
        'Röda Linjen': {
          id: 'Röda Linjen',
          color: '#ff0000',
          isSelected: true,
        }
      };
      const action = actions.deselectTerminal({ lineId: 'Röda Linjen' })
      const newState = reducer(state, action);
      expect(newState['Röda Linjen'].isSelected).toEqual(false);
    });
  });

  describe('selectors', () => {
    it('lines() returns an array of lines', () => {
      const state = { 'Line 1': {}, 'Line 2': {} };
      const output = selectors.lines(state);
      expect(output).toEqual([{}, {}]);
    });

    it('line() returns a single line', () => {
      const state = { 'Line 1': {id: 'Line 1'}, 'Line 2': {id: 'Line 2'} };
      const output = selectors.line(state, 'Line 1');
      expect(output).toEqual({ id: 'Line 1' });
    });
  });
});
