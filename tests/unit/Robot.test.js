import { Robot } from '../../src/core/Robot.js';
import { DIRECTIONS } from '../../src/core/Direction.js';

describe('Robot', () => {
  let robot;

  beforeEach(() => {
    robot = new Robot({ row: 0, col: 0 }, DIRECTIONS.NORTH);
  });

  describe('constructor', () => {
    it('should initialize with start position and direction', () => {
      expect(robot.getPosition()).toEqual({ row: 0, col: 0 });
      expect(robot.getDirection()).toBe(DIRECTIONS.NORTH);
    });
  });

  describe('moveForward', () => {
    it('should move north correctly', () => {
      robot.setDirection(DIRECTIONS.NORTH);
      robot.moveForward();
      expect(robot.getPosition()).toEqual({ row: -1, col: 0 });
    });

    it('should move east correctly', () => {
      robot.setDirection(DIRECTIONS.EAST);
      robot.moveForward();
      expect(robot.getPosition()).toEqual({ row: 0, col: 1 });
    });

    it('should move south correctly', () => {
      robot.setDirection(DIRECTIONS.SOUTH);
      robot.moveForward();
      expect(robot.getPosition()).toEqual({ row: 1, col: 0 });
    });

    it('should move west correctly', () => {
      robot.setDirection(DIRECTIONS.WEST);
      robot.moveForward();
      expect(robot.getPosition()).toEqual({ row: 0, col: -1 });
    });
  });

  describe('rotateLeft', () => {
    it('should turn left', () => {
      robot.setDirection(DIRECTIONS.NORTH);
      robot.rotateLeft();
      expect(robot.getDirection()).toBe(DIRECTIONS.WEST);
    });
  });

  describe('rotateRight', () => {
    it('should turn right', () => {
      robot.setDirection(DIRECTIONS.NORTH);
      robot.rotateRight();
      expect(robot.getDirection()).toBe(DIRECTIONS.EAST);
    });
  });

  describe('getNextPosition', () => {
    it('should return next position without moving', () => {
      robot.setDirection(DIRECTIONS.EAST);
      const nextPos = robot.getNextPosition();
      expect(nextPos).toEqual({ row: 0, col: 1 });
      expect(robot.getPosition()).toEqual({ row: 0, col: 0 });
    });
  });

  describe('reset', () => {
    it('should reset to initial position and direction', () => {
      robot.moveForward();
      robot.rotateRight();
      robot.reset();
      expect(robot.getPosition()).toEqual({ row: 0, col: 0 });
      expect(robot.getDirection()).toBe(DIRECTIONS.NORTH);
    });
  });
});
