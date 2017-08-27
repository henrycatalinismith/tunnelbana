import * as points from '../points';

describe('points', () => {
  describe('add()', () => {
    it('adds two points', () => {
      const origin = { x: 10, y: 20 };
      const point = { x: 1, y: 2 };
      const output = points.add(origin, point);
      expect(output).toEqual({
        x: 11,
        y: 22,
      })
    });
  });

  describe('angle()', () => {
    it('calculates the angle between two points', () => {
      const origin = { x: 4, y: 5 };
      const point = { x: 2, y: 7 };
      const output = points.angle(origin, point);
      expect(output.toFixed(2)).toEqual('2.36')
    });
  });

  describe('distance()', () => {
    it('calculates the distance between two points', () => {
      const origin = { x: 0, y: 10 };
      const point = { x: 10, y: 10 };
      const output = points.distance(origin, point);
      expect(output.toFixed(2)).toEqual('10.00')
    });
  });
});
