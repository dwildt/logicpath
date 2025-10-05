import { CommandExecutor, COMMAND_TYPES } from '../../src/core/CommandExecutor.js';
import { Robot } from '../../src/core/Robot.js';
import { Map } from '../../src/core/Map.js';
import { DIRECTIONS } from '../../src/core/Direction.js';

describe('CommandExecutor', () => {
  let robot;
  let map;
  let executor;
  let mapData;

  beforeEach(() => {
    mapData = {
      id: 'test-map',
      name: 'Test Map',
      description: 'A test map',
      gridSize: { rows: 6, cols: 6 },
      tiles: [
        { row: 0, col: 0, type: 'grass', walkable: true },
        { row: 0, col: 1, type: 'grass', walkable: true },
        { row: 0, col: 2, type: 'grass', walkable: true },
        { row: 0, col: 3, type: 'grass', walkable: true },
        { row: 0, col: 4, type: 'grass', walkable: true },
        { row: 0, col: 5, type: 'grass', walkable: true }
      ],
      robot: {
        startPosition: { row: 0, col: 0 },
        startDirection: 'east'
      },
      goal: { row: 0, col: 4 }
    };
    map = new Map(mapData);
    robot = new Robot({ row: 0, col: 0 }, DIRECTIONS.EAST);
    executor = new CommandExecutor(robot, map, 0); // 0ms delay for tests
  });

  describe('execute with goal at position (0,4)', () => {
    it('should execute all 4 forward commands and reach goal', async () => {
      const commands = [
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.FORWARD
      ];

      const result = await executor.execute(commands);

      expect(result.success).toBe(true);
      expect(result.goalReached).toBe(true);
      expect(result.results.length).toBe(4); // ALL 4 commands should execute
      expect(robot.getPosition()).toEqual({ row: 0, col: 4 });
    });

    it('should execute exactly 3 commands when goal is at position (0,3)', async () => {
      // Change goal to col 3
      mapData.goal = { row: 0, col: 3 };
      map = new Map(mapData);
      executor = new CommandExecutor(robot, map, 0);

      const commands = [
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.FORWARD
      ];

      const result = await executor.execute(commands);

      expect(result.success).toBe(true);
      expect(result.goalReached).toBe(true);
      expect(result.results.length).toBe(3); // Only 3 commands needed
      expect(robot.getPosition()).toEqual({ row: 0, col: 3 });
    });

    it('should not stop early if goal is at final position', async () => {
      const commands = [
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.FORWARD
      ];

      const result = await executor.execute(commands);

      console.log('Test result:', result);
      console.log('Robot final position:', robot.getPosition());
      console.log('Goal position:', map.getGoal());
      console.log('Number of commands executed:', result.results.length);

      expect(result.results.length).toBe(4);
    });
  });

  describe('executeCommand', () => {
    it('should execute forward command', async () => {
      const result = await executor.executeCommand(COMMAND_TYPES.FORWARD);
      expect(result.success).toBe(true);
      expect(robot.getPosition()).toEqual({ row: 0, col: 1 });
    });

    it('should execute turn left command', async () => {
      const result = await executor.executeCommand(COMMAND_TYPES.TURN_LEFT);
      expect(result.success).toBe(true);
      expect(robot.getDirection()).toBe(DIRECTIONS.NORTH);
    });

    it('should execute turn right command', async () => {
      const result = await executor.executeCommand(COMMAND_TYPES.TURN_RIGHT);
      expect(result.success).toBe(true);
      expect(robot.getDirection()).toBe(DIRECTIONS.SOUTH);
    });
  });
});
