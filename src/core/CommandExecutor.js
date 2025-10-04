/**
 * CommandExecutor - executes command sequences
 */

export const COMMAND_TYPES = {
  FORWARD: 'forward',
  TURN_LEFT: 'left',
  TURN_RIGHT: 'right'
};

export class CommandExecutor {
  constructor(robot, map, animationDelay = 500) {
    this.robot = robot;
    this.map = map;
    this.animationDelay = animationDelay;
    this.isExecuting = false;
    this.currentCommandIndex = -1;
  }

  /**
   * Execute a sequence of commands
   * @param {Array<string>} commands - Array of command types
   * @returns {Promise<Object>} Execution result
   */
  async execute(commands) {
    if (this.isExecuting) {
      throw new Error('Already executing commands');
    }

    if (!commands || commands.length === 0) {
      return { success: false, message: 'No commands to execute' };
    }

    this.isExecuting = true;
    const results = [];

    try {
      for (let i = 0; i < commands.length; i++) {
        this.currentCommandIndex = i;
        const command = commands[i];

        this.dispatchEvent('command-start', {
          command,
          index: i,
          total: commands.length
        });

        const result = await this.executeCommand(command);
        results.push(result);

        this.dispatchEvent('command-complete', {
          command,
          index: i,
          result
        });

        if (!result.success) {
          this.isExecuting = false;
          this.currentCommandIndex = -1;
          return {
            success: false,
            message: result.message,
            commandIndex: i,
            results
          };
        }

        // Check if goal reached
        if (this.map.isGoal(this.robot.getPosition())) {
          this.dispatchEvent('goal-reached', {
            position: this.robot.getPosition()
          });
          this.isExecuting = false;
          this.currentCommandIndex = -1;
          return {
            success: true,
            goalReached: true,
            message: 'Goal reached!',
            results
          };
        }

        // Wait for animation
        await this.wait(this.animationDelay);
      }

      this.isExecuting = false;
      this.currentCommandIndex = -1;

      return {
        success: true,
        goalReached: false,
        message: 'All commands executed',
        results
      };
    } catch (error) {
      this.isExecuting = false;
      this.currentCommandIndex = -1;
      throw error;
    }
  }

  /**
   * Execute a single command
   * @param {string} command
   * @returns {Promise<Object>}
   */
  async executeCommand(command) {
    switch (command) {
    case COMMAND_TYPES.FORWARD: {
      const nextPos = this.robot.getNextPosition();
      if (!this.map.isWalkable(nextPos)) {
        return {
          success: false,
          message: 'Cannot move forward - obstacle or boundary',
          command
        };
      }
      this.robot.moveForward();
      return {
        success: true,
        command,
        position: this.robot.getPosition()
      };
    }

    case COMMAND_TYPES.TURN_LEFT:
      this.robot.rotateLeft();
      return {
        success: true,
        command,
        direction: this.robot.getDirection()
      };

    case COMMAND_TYPES.TURN_RIGHT:
      this.robot.rotateRight();
      return {
        success: true,
        command,
        direction: this.robot.getDirection()
      };

    default:
      return {
        success: false,
        message: `Unknown command: ${command}`,
        command
      };
    }
  }

  /**
   * Wait for specified milliseconds
   * @param {number} ms
   * @returns {Promise}
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Dispatch custom event
   * @param {string} eventName
   * @param {Object} detail
   */
  dispatchEvent(eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }

  /**
   * Stop execution
   */
  stop() {
    this.isExecuting = false;
    this.currentCommandIndex = -1;
  }

  /**
   * Get execution state
   * @returns {boolean}
   */
  isRunning() {
    return this.isExecuting;
  }

  /**
   * Set animation delay
   * @param {number} delay
   */
  setAnimationDelay(delay) {
    this.animationDelay = delay;
  }
}
