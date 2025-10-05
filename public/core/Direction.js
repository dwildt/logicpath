/**
 * Direction enum and utility functions
 */

export const DIRECTIONS = {
  NORTH: 'north',
  EAST: 'east',
  SOUTH: 'south',
  WEST: 'west'
};

export const DIRECTION_VECTORS = {
  [DIRECTIONS.NORTH]: { row: -1, col: 0 },
  [DIRECTIONS.EAST]: { row: 0, col: 1 },
  [DIRECTIONS.SOUTH]: { row: 1, col: 0 },
  [DIRECTIONS.WEST]: { row: 0, col: -1 }
};

export const DIRECTION_DEGREES = {
  [DIRECTIONS.NORTH]: 0,
  [DIRECTIONS.EAST]: 90,
  [DIRECTIONS.SOUTH]: 180,
  [DIRECTIONS.WEST]: 270
};

const DIRECTION_ORDER = [
  DIRECTIONS.NORTH,
  DIRECTIONS.EAST,
  DIRECTIONS.SOUTH,
  DIRECTIONS.WEST
];

/**
 * Turn left from current direction
 * @param {string} currentDirection
 * @returns {string} New direction
 */
export function turnLeft(currentDirection) {
  const currentIndex = DIRECTION_ORDER.indexOf(currentDirection);
  const newIndex = (currentIndex - 1 + 4) % 4;
  return DIRECTION_ORDER[newIndex];
}

/**
 * Turn right from current direction
 * @param {string} currentDirection
 * @returns {string} New direction
 */
export function turnRight(currentDirection) {
  const currentIndex = DIRECTION_ORDER.indexOf(currentDirection);
  const newIndex = (currentIndex + 1) % 4;
  return DIRECTION_ORDER[newIndex];
}

/**
 * Get the movement vector for a direction
 * @param {string} direction
 * @returns {{row: number, col: number}}
 */
export function getDirectionVector(direction) {
  return DIRECTION_VECTORS[direction];
}

/**
 * Get rotation degrees for a direction
 * @param {string} direction
 * @returns {number}
 */
export function getDirectionDegrees(direction) {
  return DIRECTION_DEGREES[direction];
}
