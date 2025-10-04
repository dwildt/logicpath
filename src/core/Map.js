/**
 * Map class - represents the game board
 */

export class Map {
  constructor(mapData) {
    this.id = mapData.id;
    this.name = mapData.name;
    this.description = mapData.description;
    this.gridSize = mapData.gridSize;
    this.tiles = this.buildTileGrid(mapData.tiles);
    this.startPosition = mapData.robot.startPosition;
    this.startDirection = mapData.robot.startDirection;
    this.goal = mapData.goal;
  }

  /**
   * Build 2D grid from tile array
   * @param {Array} tileArray
   * @returns {Array<Array>}
   */
  buildTileGrid(tileArray) {
    const grid = Array(this.gridSize.rows)
      .fill(null)
      .map(() => Array(this.gridSize.cols).fill(null));

    tileArray.forEach(tile => {
      grid[tile.row][tile.col] = {
        type: tile.type,
        walkable: tile.walkable
      };
    });

    return grid;
  }

  /**
   * Check if a position is within bounds
   * @param {{row: number, col: number}} position
   * @returns {boolean}
   */
  isInBounds(position) {
    return (
      position.row >= 0 &&
      position.row < this.gridSize.rows &&
      position.col >= 0 &&
      position.col < this.gridSize.cols
    );
  }

  /**
   * Check if a position is walkable
   * @param {{row: number, col: number}} position
   * @returns {boolean}
   */
  isWalkable(position) {
    if (!this.isInBounds(position)) {
      return false;
    }
    const tile = this.tiles[position.row][position.col];
    return tile && tile.walkable;
  }

  /**
   * Get tile at position
   * @param {{row: number, col: number}} position
   * @returns {Object|null}
   */
  getTile(position) {
    if (!this.isInBounds(position)) {
      return null;
    }
    return this.tiles[position.row][position.col];
  }

  /**
   * Check if position is the goal
   * @param {{row: number, col: number}} position
   * @returns {boolean}
   */
  isGoal(position) {
    return position.row === this.goal.row && position.col === this.goal.col;
  }

  /**
   * Get map metadata
   * @returns {Object}
   */
  getMetadata() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      gridSize: this.gridSize
    };
  }

  /**
   * Get start position for robot
   * @returns {{row: number, col: number}}
   */
  getStartPosition() {
    return { ...this.startPosition };
  }

  /**
   * Get start direction for robot
   * @returns {string}
   */
  getStartDirection() {
    return this.startDirection;
  }

  /**
   * Get goal position
   * @returns {{row: number, col: number}}
   */
  getGoal() {
    return { ...this.goal };
  }
}
