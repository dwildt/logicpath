/**
 * @jest-environment jsdom
 */

import { Cell } from '../../src/atoms/Cell.js';

describe('Cell', () => {
  let cell;

  afterEach(() => {
    if (cell) {
      cell.destroy();
    }
  });

  describe('initialization', () => {
    test('should create cell with correct row and col', () => {
      cell = new Cell(2, 3, { type: 'grass', walkable: true });

      expect(cell.row).toBe(2);
      expect(cell.col).toBe(3);
    });

    test('should render grass cell', () => {
      cell = new Cell(0, 0, { type: 'grass', walkable: true });
      const element = cell.getElement();

      expect(element.className).toContain('cell-grass');
      expect(element.dataset.row).toBe('0');
      expect(element.dataset.col).toBe('0');
      expect(element.dataset.walkable).toBe('true');
    });

    test('should render water cell', () => {
      cell = new Cell(1, 1, { type: 'water', walkable: false });
      const element = cell.getElement();

      expect(element.className).toContain('cell-water');
      expect(element.dataset.walkable).toBe('false');
    });

    test('should set grid position on render', () => {
      cell = new Cell(2, 3, { type: 'grass', walkable: true });
      const element = cell.getElement();

      expect(element.style.gridRowStart).toBe('3'); // row + 1
      expect(element.style.gridColumnStart).toBe('4'); // col + 1
    });
  });

  describe('setStart', () => {
    test('should add start class', () => {
      cell = new Cell(0, 0, { type: 'grass', walkable: true });
      cell.setStart();

      expect(cell.getElement().classList.contains('start')).toBe(true);
    });
  });

  describe('setGoal', () => {
    test('should add goal class and marker', () => {
      cell = new Cell(2, 2, { type: 'grass', walkable: true });
      cell.setGoal();

      const element = cell.getElement();
      expect(element.classList.contains('goal')).toBe(true);
      expect(element.innerHTML).toContain('goal-marker');
      expect(element.innerHTML).toContain('🎯');
    });
  });

  describe('highlight', () => {
    test('should add highlighted class', () => {
      cell = new Cell(1, 1, { type: 'grass', walkable: true });
      cell.highlight();

      expect(cell.getElement().classList.contains('highlighted')).toBe(true);
    });
  });

  describe('unhighlight', () => {
    test('should remove highlighted class', () => {
      cell = new Cell(1, 1, { type: 'grass', walkable: true });
      cell.highlight();
      cell.unhighlight();

      expect(cell.getElement().classList.contains('highlighted')).toBe(false);
    });
  });

  describe('destroy', () => {
    test('should remove element from DOM', () => {
      cell = new Cell(0, 0, { type: 'grass', walkable: true });
      document.body.appendChild(cell.getElement());

      expect(document.querySelector('.cell')).toBeTruthy();

      cell.destroy();

      expect(document.querySelector('.cell')).toBeFalsy();
      cell = null; // Prevent double cleanup
    });
  });
});
