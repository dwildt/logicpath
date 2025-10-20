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

    it('should fail forward command when hitting boundary', async () => {
      // Move robot to edge
      robot = new Robot({ row: 0, col: 5 }, DIRECTIONS.EAST);
      executor = new CommandExecutor(robot, map, 0);

      const result = await executor.executeCommand(COMMAND_TYPES.FORWARD);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Cannot move forward');
    });

    it('should execute backward command', async () => {
      // Move forward first so we can go backward
      await executor.executeCommand(COMMAND_TYPES.FORWARD);
      robot.setDirection(DIRECTIONS.WEST);

      const result = await executor.executeCommand(COMMAND_TYPES.BACKWARD);
      expect(result.success).toBe(true);
      expect(robot.getPosition()).toEqual({ row: 0, col: 2 });
    });

    it('should fail backward command when hitting boundary', async () => {
      robot = new Robot({ row: 0, col: 0 }, DIRECTIONS.EAST);
      executor = new CommandExecutor(robot, map, 0);

      const result = await executor.executeCommand(COMMAND_TYPES.BACKWARD);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Cannot move backward');
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

    it('should fail for unknown command', async () => {
      const result = await executor.executeCommand('invalid-command');
      expect(result.success).toBe(false);
      expect(result.message).toContain('Unknown command');
    });
  });

  describe('error handling', () => {
    it('should throw error if already executing', async () => {
      const commands = [COMMAND_TYPES.FORWARD];

      // Start execution (don't await)
      const promise1 = executor.execute(commands);

      // Try to execute again
      await expect(executor.execute(commands)).rejects.toThrow('Already executing commands');

      // Clean up
      await promise1;
    });

    it('should return error for empty command array', async () => {
      const result = await executor.execute([]);
      expect(result.success).toBe(false);
      expect(result.message).toContain('No commands to execute');
    });

    it('should return error for null commands', async () => {
      const result = await executor.execute(null);
      expect(result.success).toBe(false);
      expect(result.message).toContain('No commands to execute');
    });

    it('should stop execution when reaching goal', async () => {
      // Create a map where robot reaches goal before hitting obstacle
      const obstacleMapData = {
        id: 'obstacle-test',
        name: 'Obstacle Test',
        description: 'Test map with obstacle',
        gridSize: { rows: 3, cols: 3 },
        tiles: [
          { row: 0, col: 0, type: 'grass', walkable: true },
          { row: 0, col: 1, type: 'grass', walkable: true },
          { row: 0, col: 2, type: 'water', walkable: false }
        ],
        robot: {
          startPosition: { row: 0, col: 0 },
          startDirection: 'east'
        },
        goal: { row: 0, col: 1 }
      };
      const obstacleMap = new Map(obstacleMapData);
      robot = new Robot({ row: 0, col: 0 }, DIRECTIONS.EAST);
      executor = new CommandExecutor(robot, obstacleMap, 0);

      const commands = [
        COMMAND_TYPES.FORWARD, // Move to (0, 1) - goal
        COMMAND_TYPES.FORWARD, // Should not execute
        COMMAND_TYPES.FORWARD
      ];

      const result = await executor.execute(commands);

      expect(result.success).toBe(true);
      expect(result.goalReached).toBe(true);
      expect(result.results.length).toBe(1); // Stops after reaching goal
    });

    it('should stop execution on obstacle before goal', async () => {
      // Create a map where robot hits obstacle before reaching goal
      const obstacleMapData = {
        id: 'obstacle-test-2',
        name: 'Obstacle Test 2',
        description: 'Test map with obstacle before goal',
        gridSize: { rows: 3, cols: 3 },
        tiles: [
          { row: 0, col: 0, type: 'grass', walkable: true },
          { row: 0, col: 1, type: 'water', walkable: false },
          { row: 0, col: 2, type: 'grass', walkable: true }
        ],
        robot: {
          startPosition: { row: 0, col: 0 },
          startDirection: 'east'
        },
        goal: { row: 0, col: 2 }
      };
      const obstacleMap = new Map(obstacleMapData);
      robot = new Robot({ row: 0, col: 0 }, DIRECTIONS.EAST);
      executor = new CommandExecutor(robot, obstacleMap, 0);

      const commands = [
        COMMAND_TYPES.FORWARD, // Try to move to (0, 1) - water, will fail
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.FORWARD
      ];

      const result = await executor.execute(commands);

      expect(result.success).toBe(false);
      expect(result.goalReached).toBeUndefined();
      expect(result.commandIndex).toBe(0);
      expect(result.results.length).toBe(1);
    });

    it('should handle error in try-catch block', async () => {
      // Mock executeCommand to throw an error
      const originalExecuteCommand = executor.executeCommand;
      executor.executeCommand = jest.fn().mockRejectedValue(new Error('Test error'));

      await expect(executor.execute([COMMAND_TYPES.FORWARD])).rejects.toThrow('Test error');
      expect(executor.isRunning()).toBe(false);

      // Restore original method
      executor.executeCommand = originalExecuteCommand;
    });
  });

  describe('execution control', () => {
    it('should return true when executing', async () => {
      const commands = [COMMAND_TYPES.FORWARD];

      // Start execution (don't await)
      const promise = executor.execute(commands);

      expect(executor.isRunning()).toBe(true);

      // Clean up
      await promise;
    });

    it('should return false when not executing', () => {
      expect(executor.isRunning()).toBe(false);
    });

    it('should allow stopping execution', () => {
      executor.isExecuting = true;
      executor.stop();
      expect(executor.isRunning()).toBe(false);
    });

    it('should allow setting animation delay', () => {
      executor.setAnimationDelay(1000);
      expect(executor.animationDelay).toBe(1000);
    });
  });

  describe('return no goal when commands complete without reaching goal', () => {
    it('should return goalReached false when goal not reached', async () => {
      const commands = [COMMAND_TYPES.FORWARD, COMMAND_TYPES.FORWARD];

      const result = await executor.execute(commands);

      expect(result.success).toBe(true);
      expect(result.goalReached).toBe(false);
      expect(result.message).toBe('All commands executed');
    });
  });
});
