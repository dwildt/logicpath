import { DIRECTIONS, turnLeft, turnRight, getDirectionVector, getDirectionDegrees } from '../../src/core/Direction.js';

describe('Direction', () => {
  describe('turnLeft', () => {
    it('should turn left from north to west', () => {
      expect(turnLeft(DIRECTIONS.NORTH)).toBe(DIRECTIONS.WEST);
    });

    it('should turn left from west to south', () => {
      expect(turnLeft(DIRECTIONS.WEST)).toBe(DIRECTIONS.SOUTH);
    });

    it('should turn left from south to east', () => {
      expect(turnLeft(DIRECTIONS.SOUTH)).toBe(DIRECTIONS.EAST);
    });

    it('should turn left from east to north', () => {
      expect(turnLeft(DIRECTIONS.EAST)).toBe(DIRECTIONS.NORTH);
    });
  });

  describe('turnRight', () => {
    it('should turn right from north to east', () => {
      expect(turnRight(DIRECTIONS.NORTH)).toBe(DIRECTIONS.EAST);
    });

    it('should turn right from east to south', () => {
      expect(turnRight(DIRECTIONS.EAST)).toBe(DIRECTIONS.SOUTH);
    });

    it('should turn right from south to west', () => {
      expect(turnRight(DIRECTIONS.SOUTH)).toBe(DIRECTIONS.WEST);
    });

    it('should turn right from west to north', () => {
      expect(turnRight(DIRECTIONS.WEST)).toBe(DIRECTIONS.NORTH);
    });
  });

  describe('getDirectionVector', () => {
    it('should return correct vector for north', () => {
      expect(getDirectionVector(DIRECTIONS.NORTH)).toEqual({ row: -1, col: 0 });
    });

    it('should return correct vector for east', () => {
      expect(getDirectionVector(DIRECTIONS.EAST)).toEqual({ row: 0, col: 1 });
    });

    it('should return correct vector for south', () => {
      expect(getDirectionVector(DIRECTIONS.SOUTH)).toEqual({ row: 1, col: 0 });
    });

    it('should return correct vector for west', () => {
      expect(getDirectionVector(DIRECTIONS.WEST)).toEqual({ row: 0, col: -1 });
    });
  });

  describe('getDirectionDegrees', () => {
    it('should return 0 degrees for north', () => {
      expect(getDirectionDegrees(DIRECTIONS.NORTH)).toBe(0);
    });

    it('should return 90 degrees for east', () => {
      expect(getDirectionDegrees(DIRECTIONS.EAST)).toBe(90);
    });

    it('should return 180 degrees for south', () => {
      expect(getDirectionDegrees(DIRECTIONS.SOUTH)).toBe(180);
    });

    it('should return 270 degrees for west', () => {
      expect(getDirectionDegrees(DIRECTIONS.WEST)).toBe(270);
    });
  });
});
