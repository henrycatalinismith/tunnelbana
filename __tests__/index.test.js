const { createSelect } = require('../index');

describe('signalbox', () => {
  describe('createSelect()', () => {
    it('returns select()', () => {
      const select = createSelect();
      expect(typeof select).toBe('function');
    })
  })

  describe('select()', () => {
    it('returns from()', () => {
      const select = createSelect();
      expect(typeof select().from).toBe('function');
    })
  })

  describe('from()', () => {
    it('returns a selector function', () => {
      const select = createSelect({
        users: {
          byId: () => {}
        }
      });
      expect(typeof select('users').from().byId).toBe('function');
    })

    it('binds store state as the 1st param to the selector', () => {
      return new Promise(resolve => {
        const state = { users: {} };
        const select = createSelect({ users: { byId: (s) => {
          expect(s).toBe(state.users);
          resolve();
        }}});
        select('users').from(state).byId();
      });
    })

    it('runs the selector', () => {
      const state = {
        users: {
          1: {
            name: 'First User'
          }
        }
      };

      const selectors = {
        users: {
          byId: (s, id) => {
            return s[id];
          }
        }
      };

      const select = createSelect(selectors);
      const user = select('users').from(state).byId(1);
      expect(user).toBe(state.users[1]);
    })

    it('applies the optional stateAccessor if present', () => {
      const state = {
        USERS: {
          1: {
            name: 'First User'
          }
        }
      };

      const selectors = {
        users: {
          byId: (s, id) => {
            return s[id];
          }
        }
      };

      const select = createSelect(selectors, {
        stateAccessor(s, entity) {
          return s[entity.toUpperCase()];
        }
      });
      const user = select('users').from(state).byId(1);
      expect(user).toBe(state.USERS[1]);
    })
  })
})
