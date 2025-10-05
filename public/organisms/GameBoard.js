/**
 * GameBoard organism - the game grid
 */

import { Cell } from '../atoms/Cell.js';
import { Avatar } from './Avatar.js';

export class GameBoard {
  constructor(map, robot) {
    this.map = map;
    this.robot = robot;
    this.cells = [];
    this.avatar = new Avatar(robot);
    this.element = this.render();
  }

  render() {
    const board = document.createElement('div');
    board.className = 'game-board';
    board.style.gridTemplateRows = `repeat(${this.map.gridSize.rows}, 1fr)`;
    board.style.gridTemplateColumns = `repeat(${this.map.gridSize.cols}, 1fr)`;

    // Create cells
    for (let row = 0; row < this.map.gridSize.rows; row++) {
      for (let col = 0; col < this.map.gridSize.cols; col++) {
        const tileData = this.map.getTile({ row, col });
        const cell = new Cell(row, col, tileData);

        // Mark start and goal
        if (row === this.map.startPosition.row && col === this.map.startPosition.col) {
          cell.setStart();
        }
        if (row === this.map.goal.row && col === this.map.goal.col) {
          cell.setGoal();
        }

        this.cells.push(cell);
        board.appendChild(cell.getElement());
      }
    }

    // Add avatar
    board.appendChild(this.avatar.getElement());

    return board;
  }

  getElement() {
    return this.element;
  }

  getAvatar() {
    return this.avatar;
  }

  highlightCell(position) {
    const cell = this.cells.find(
      c => c.row === position.row && c.col === position.col
    );
    if (cell) {
      cell.highlight();
    }
  }

  unhighlightAll() {
    this.cells.forEach(cell => cell.unhighlight());
  }

  destroy() {
    this.cells.forEach(cell => cell.destroy());
    this.avatar.destroy();
    this.element.remove();
  }
}
