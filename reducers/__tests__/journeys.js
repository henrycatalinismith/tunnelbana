import actions from '../../actions';
import reducer from '../journeys';
import * as selectors from '../journeys';

describe('journeys', () => {
  describe('reducer', () => {
    it('adds a journey to the store on DEPARTURE', () => {
      const state = {};
      const action = actions.departure({
        id: 'Example Departure',
        sourceId: 'Gamla Stan',
        destinationId: 'Slussen',
        lineId: 'Red Line',
        trainId: 'Thomas',
      });
      const newState = reducer(state, action);

      expect(newState).toEqual({
        'Example Departure': {
          id: 'Example Departure',
          sourceId: 'Gamla Stan',
          destinationId: 'Slussen',
          lineId: 'Red Line',
          trainId: 'Thomas',
          isComplete: false,
        }
      });
    });

    it('deletes the journey on ARRIVAL', () => {
      const state = {
        'Example Departure': {
          isComplete: false,
        }
      };
      const action = actions.arrival({ id: 'Example Departure' });
      const newState = reducer(state, action);

      expect(newState).toEqual({});
    });
  });

  describe('selectors', () => {
    it('journeys() returns an array of journeys', () => {
      const state = { 'Journey 1': {}, 'Journey 2': {} };
      const output = selectors.journeys(state);
      expect(output).toEqual([{}, {}]);
    });

    it('journey() returns a single journey', () => {
      const state = { 'Journey 1': {id: 'Journey 1'}, 'Journey 2': {id: 'Journey 2'} };
      const output = selectors.journey(state, 'Journey 1');
      expect(output).toEqual({ id: 'Journey 1' });
    });
  });
});
