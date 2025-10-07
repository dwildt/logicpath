/**
 * @jest-environment jsdom
 */

import { dispatchEvent, addEventListener, addEventListenerOnce } from '../../src/utils/events.js';

describe('events utils', () => {
  describe('dispatchEvent', () => {
    test('should dispatch custom event with detail', () => {
      const handler = jest.fn();
      window.addEventListener('test-event', handler);

      dispatchEvent('test-event', { foo: 'bar' });

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail).toEqual({ foo: 'bar' });

      window.removeEventListener('test-event', handler);
    });

    test('should dispatch event on custom target', () => {
      const target = document.createElement('div');
      const handler = jest.fn();
      target.addEventListener('custom-event', handler);

      dispatchEvent('custom-event', { data: 123 }, target);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail).toEqual({ data: 123 });
    });

    test('should create bubbling event', () => {
      const handler = jest.fn();
      window.addEventListener('bubble-test', handler);

      dispatchEvent('bubble-test');

      const event = handler.mock.calls[0][0];
      expect(event.bubbles).toBe(true);

      window.removeEventListener('bubble-test', handler);
    });

    test('should create cancelable event', () => {
      const handler = jest.fn();
      window.addEventListener('cancel-test', handler);

      dispatchEvent('cancel-test');

      const event = handler.mock.calls[0][0];
      expect(event.cancelable).toBe(true);

      window.removeEventListener('cancel-test', handler);
    });
  });

  describe('addEventListener', () => {
    test('should add event listener and return cleanup function', () => {
      const handler = jest.fn();
      const cleanup = addEventListener('test-add', handler);

      window.dispatchEvent(new CustomEvent('test-add'));
      expect(handler).toHaveBeenCalledTimes(1);

      cleanup();
      window.dispatchEvent(new CustomEvent('test-add'));
      expect(handler).toHaveBeenCalledTimes(1); // Should not be called again
    });

    test('should add listener to custom target', () => {
      const target = document.createElement('div');
      const handler = jest.fn();
      const cleanup = addEventListener('custom-add', handler, target);

      target.dispatchEvent(new CustomEvent('custom-add'));
      expect(handler).toHaveBeenCalledTimes(1);

      cleanup();
    });
  });

  describe('addEventListenerOnce', () => {
    test('should only fire handler once', () => {
      const handler = jest.fn();
      addEventListenerOnce('once-test', handler);

      window.dispatchEvent(new CustomEvent('once-test'));
      window.dispatchEvent(new CustomEvent('once-test'));
      window.dispatchEvent(new CustomEvent('once-test'));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should work with custom target', () => {
      const target = document.createElement('div');
      const handler = jest.fn();
      addEventListenerOnce('once-custom', handler, target);

      target.dispatchEvent(new CustomEvent('once-custom'));
      target.dispatchEvent(new CustomEvent('once-custom'));

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
