/**
 * @jest-environment jsdom
 */

import { wait, animateWithClass, transitionTo, rotateTo } from '../../src/utils/animations.js';

describe('animations utils', () => {
  describe('wait', () => {
    test('should wait for specified milliseconds', async () => {
      const start = Date.now();
      await wait(100);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(95); // Allow small margin
    });

    test('should return a promise', () => {
      const result = wait(10);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('animateWithClass', () => {
    test('should add class, wait, then remove class', async () => {
      const element = document.createElement('div');

      const animatePromise = animateWithClass(element, 'test-class', 50);

      // Class should be added immediately
      expect(element.classList.contains('test-class')).toBe(true);

      await animatePromise;

      // Class should be removed after duration
      expect(element.classList.contains('test-class')).toBe(false);
    });

    test('should work with custom duration', async () => {
      const element = document.createElement('div');
      const start = Date.now();

      await animateWithClass(element, 'animate', 100);

      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(95);
    });
  });

  describe('transitionTo', () => {
    test('should set transition and transform styles', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      transitionTo(element, { x: 100, y: 50 }, 300);

      expect(element.style.transition).toContain('transform');
      expect(element.style.transition).toContain('300ms');
      expect(element.style.transform).toBe('translate(100px, 50px)');

      element.remove();
    });

    test('should return a promise that resolves on transitionend', async () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const promise = transitionTo(element, { x: 10, y: 20 }, 10);

      // Manually trigger transitionend event
      element.dispatchEvent(new Event('transitionend'));

      await expect(promise).resolves.toBeUndefined();

      element.remove();
    });
  });

  describe('rotateTo', () => {
    test('should set rotation transform', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      rotateTo(element, 90, 300);

      expect(element.style.transition).toContain('transform');
      expect(element.style.transition).toContain('300ms');
      expect(element.style.transform).toBe('rotate(90deg)');

      element.remove();
    });

    test('should return a promise that resolves on transitionend', async () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const promise = rotateTo(element, 180, 10);

      // Manually trigger transitionend event
      element.dispatchEvent(new Event('transitionend'));

      await expect(promise).resolves.toBeUndefined();

      element.remove();
    });
  });
});
