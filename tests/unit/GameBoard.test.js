/**
 * @jest-environment jsdom
 */

import { GameBoard } from '../../src/organisms/GameBoard.js';
import { Robot } from '../../src/core/Robot.js';
import { Map as GameMap } from '../../src/core/Map.js';

describe('GameBoard', () => {
  let gameBoard;
  let map;
  let robot;

  beforeEach(() => {
    const mapData = {
      id: 'test',
      name: 'Test Map',
      description: 'Test',
      gridSize: { rows: 3, cols: 3 },
      tiles: [
        { row: 0, col: 0, type: 'grass', walkable: true },
        { row: 0, col: 1, type: 'grass', walkable: true },
        { row: 0, col: 2, type: 'water', walkable: false },
        { row: 1, col: 0, type: 'grass', walkable: true },
        { row: 1, col: 1, type: 'grass', walkable: true },
        { row: 1, col: 2, type: 'grass', walkable: true },
        { row: 2, col: 0, type: 'grass', walkable: true },
        { row: 2, col: 1, type: 'grass', walkable: true },
        { row: 2, col: 2, type: 'grass', walkable: true }
      ],
      robot: {
        startPosition: { row: 0, col: 0 },
        startDirection: 'east'
      },
      goal: { row: 2, col: 2 }
    };

    map = new GameMap(mapData);
    robot = new Robot(map.getStartPosition(), map.getStartDirection());
    gameBoard = new GameBoard(map, robot);
    document.body.appendChild(gameBoard.getElement());
  });

  afterEach(() => {
    gameBoard.destroy();
  });

  describe('initialization', () => {
    test('should create correct number of cells', () => {
      expect(gameBoard.cells).toHaveLength(9); // 3x3 grid
    });

    test('should set grid template based on map size', () => {
      const element = gameBoard.getElement();
      expect(element.style.gridTemplateRows).toBe('repeat(3, 1fr)');
      expect(element.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
    });

    test('should mark start position', () => {
      const startCell = gameBoard.cells.find(c => c.row === 0 && c.col === 0);
      expect(startCell.getElement().classList.contains('start')).toBe(true);
    });

    test('should mark goal position', () => {
      const goalCell = gameBoard.cells.find(c => c.row === 2 && c.col === 2);
      expect(goalCell.getElement().classList.contains('goal')).toBe(true);
    });

    test('should create avatar', () => {
      expect(gameBoard.getAvatar()).toBeDefined();
    });
  });

  describe('highlightCell', () => {
    test('should highlight cell at given position', () => {
      gameBoard.highlightCell({ row: 1, col: 1 });

      const cell = gameBoard.cells.find(c => c.row === 1 && c.col === 1);
      expect(cell.getElement().classList.contains('highlighted')).toBe(true);
    });

    test('should not throw error for invalid position', () => {
      expect(() => {
        gameBoard.highlightCell({ row: 99, col: 99 });
      }).not.toThrow();
    });
  });

  describe('unhighlightAll', () => {
    test('should unhighlight all cells', () => {
      // Highlight some cells
      gameBoard.highlightCell({ row: 0, col: 0 });
      gameBoard.highlightCell({ row: 1, col: 1 });

      // Unhighlight all
      gameBoard.unhighlightAll();

      gameBoard.cells.forEach(cell => {
        expect(cell.getElement().classList.contains('highlighted')).toBe(false);
      });
    });
  });

  describe('getElement', () => {
    test('should return game board element', () => {
      const element = gameBoard.getElement();
      expect(element.className).toBe('game-board');
    });
  });

  describe('getAvatar', () => {
    test('should return avatar instance', () => {
      const avatar = gameBoard.getAvatar();
      expect(avatar).toBeDefined();
      expect(avatar.robot).toBe(robot);
    });
  });

  describe('destroy', () => {
    test('should remove all cells and avatar', () => {
      const initialCellCount = document.querySelectorAll('.cell').length;
      expect(initialCellCount).toBeGreaterThan(0);

      gameBoard.destroy();

      expect(document.querySelectorAll('.cell')).toHaveLength(0);
      expect(document.querySelectorAll('.avatar')).toHaveLength(0);
    });
  });
});
