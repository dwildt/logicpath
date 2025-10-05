/**
 * Robot class - represents the player's avatar
 */

import { DIRECTIONS, turnLeft, turnRight, getDirectionVector } from './Direction.js';

export class Robot {
  constructor(startPosition, startDirection = DIRECTIONS.NORTH) {
    this.position = { ...startPosition };
    this.direction = startDirection;
    this.initialPosition = { ...startPosition };
    this.initialDirection = startDirection;
  }

  /**
   * Move robot forward in current direction
   * @returns {{row: number, col: number}} New position
   */
  moveForward() {
    const vector = getDirectionVector(this.direction);
    this.position.row += vector.row;
    this.position.col += vector.col;
    return { ...this.position };
  }

  /**
   * Turn robot left
   * @returns {string} New direction
   */
  rotateLeft() {
    this.direction = turnLeft(this.direction);
    return this.direction;
  }

  /**
   * Turn robot right
   * @returns {string} New direction
   */
  rotateRight() {
    this.direction = turnRight(this.direction);
    return this.direction;
  }

  /**
   * Get next position if robot moves forward (without actually moving)
   * @returns {{row: number, col: number}}
   */
  getNextPosition() {
    const vector = getDirectionVector(this.direction);
    return {
      row: this.position.row + vector.row,
      col: this.position.col + vector.col
    };
  }

  /**
   * Reset robot to initial state
   */
  reset() {
    this.position = { ...this.initialPosition };
    this.direction = this.initialDirection;
  }

  /**
   * Get current position
   * @returns {{row: number, col: number}}
   */
  getPosition() {
    return { ...this.position };
  }

  /**
   * Get current direction
   * @returns {string}
   */
  getDirection() {
    return this.direction;
  }

  /**
   * Set position manually (useful for testing)
   * @param {{row: number, col: number}} position
   */
  setPosition(position) {
    this.position = { ...position };
  }

  /**
   * Set direction manually (useful for testing)
   * @param {string} direction
   */
  setDirection(direction) {
    if (Object.values(DIRECTIONS).includes(direction)) {
      this.direction = direction;
    }
  }
}
