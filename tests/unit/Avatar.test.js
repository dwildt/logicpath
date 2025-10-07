/**
 * @jest-environment jsdom
 */

import { Avatar } from '../../src/organisms/Avatar.js';
import { Robot } from '../../src/core/Robot.js';
import { DIRECTIONS } from '../../src/core/Direction.js';

describe('Avatar', () => {
  let avatar;
  let robot;

  beforeEach(() => {
    robot = new Robot({ row: 0, col: 0 }, DIRECTIONS.EAST);
    avatar = new Avatar(robot);
    document.body.appendChild(avatar.getElement());
  });

  afterEach(() => {
    avatar.destroy();
  });

  describe('initialization', () => {
    test('should create avatar element', () => {
      const element = avatar.getElement();
      expect(element.classList.contains('avatar')).toBe(true);
    });

    test('should set initial position on grid', () => {
      const element = avatar.getElement();
      expect(element.style.gridRowStart).toBe('1'); // row 0 + 1
      expect(element.style.gridColumnStart).toBe('1'); // col 0 + 1
    });

    test('should set initial rotation based on direction', () => {
      const element = avatar.getElement();
      expect(element.style.transform).toContain('rotate(90deg)'); // EAST = 90deg
    });

    test('should set data attributes for position', () => {
      const element = avatar.getElement();
      expect(element.dataset.row).toBe('0');
      expect(element.dataset.col).toBe('0');
    });
  });

  describe('updatePosition', () => {
    test('should update grid position when robot moves', () => {
      robot.moveForward(); // Move to (0, 1)
      avatar.updatePosition();

      const element = avatar.getElement();
      expect(element.style.gridRowStart).toBe('1'); // row 0 + 1
      expect(element.style.gridColumnStart).toBe('2'); // col 1 + 1
      expect(element.dataset.row).toBe('0');
      expect(element.dataset.col).toBe('1');
    });
  });

  describe('updateRotation', () => {
    test('should update rotation when robot turns left', () => {
      robot.rotateLeft(); // EAST -> NORTH
      avatar.updateRotation();

      const element = avatar.getElement();
      expect(element.style.transform).toContain('rotate(0deg)'); // NORTH = 0deg
    });

    test('should update rotation when robot turns right', () => {
      robot.rotateRight(); // EAST -> SOUTH
      avatar.updateRotation();

      const element = avatar.getElement();
      expect(element.style.transform).toContain('rotate(180deg)'); // SOUTH = 180deg
    });
  });

  describe('animateMove', () => {
    test('should add moving class during animation', async () => {
      const element = avatar.getElement();

      const movePromise = avatar.animateMove();
      expect(element.classList.contains('moving')).toBe(true);

      await movePromise;
      expect(element.classList.contains('moving')).toBe(false);
    });
  });

  describe('animateRotate', () => {
    test('should add rotating class during animation', async () => {
      const element = avatar.getElement();

      const rotatePromise = avatar.animateRotate();
      expect(element.classList.contains('rotating')).toBe(true);

      await rotatePromise;
      expect(element.classList.contains('rotating')).toBe(false);
    });
  });

  describe('celebrate', () => {
    test('should add celebrating class during animation', async () => {
      const element = avatar.getElement();

      const celebratePromise = avatar.celebrate();
      expect(element.classList.contains('celebrating')).toBe(true);

      await celebratePromise;
      expect(element.classList.contains('celebrating')).toBe(false);
    });
  });

  describe('reset', () => {
    test('should reset to initial position and rotation', () => {
      // Move and rotate robot
      robot.moveForward();
      robot.rotateLeft();
      avatar.updatePosition();
      avatar.updateRotation();

      // Reset
      robot.reset();
      avatar.reset();

      const element = avatar.getElement();
      expect(element.style.gridRowStart).toBe('1'); // back to (0,0)
      expect(element.style.gridColumnStart).toBe('1');
      expect(element.style.transform).toContain('rotate(90deg)'); // back to EAST
    });
  });

  describe('destroy', () => {
    test('should remove avatar element from DOM', () => {
      expect(document.querySelector('.avatar')).toBeTruthy();

      avatar.destroy();

      expect(document.querySelector('.avatar')).toBeFalsy();
    });
  });
});
