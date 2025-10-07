/**
 * @jest-environment jsdom
 */

import { Button } from '../../src/atoms/Button.js';

describe('Button', () => {
  let button;

  afterEach(() => {
    if (button) {
      button.destroy();
    }
  });

  describe('initialization', () => {
    test('should create button with icon', () => {
      button = new Button({ icon: 'play' });
      const element = button.getElement();

      expect(element.tagName).toBe('BUTTON');
      expect(element.querySelector('.icon')).toBeTruthy();
    });

    test('should apply custom className', () => {
      button = new Button({ icon: 'play', className: 'btn-custom' });
      const element = button.getElement();

      expect(element.classList.contains('btn')).toBe(true);
      expect(element.classList.contains('btn-custom')).toBe(true);
    });

    test('should have default btn class', () => {
      button = new Button({ icon: 'restart' });
      const element = button.getElement();

      expect(element.classList.contains('btn')).toBe(true);
    });
  });

  describe('onClick', () => {
    test('should call onClick handler when clicked', () => {
      const mockOnClick = jest.fn();
      button = new Button({ icon: 'play', onClick: mockOnClick });

      button.getElement().click();

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('should work without onClick handler', () => {
      button = new Button({ icon: 'play' });

      expect(() => {
        button.getElement().click();
      }).not.toThrow();
    });
  });

  describe('setDisabled', () => {
    test('should disable button', () => {
      button = new Button({ icon: 'play' });
      button.setDisabled(true);

      expect(button.getElement().disabled).toBe(true);
    });

    test('should enable button', () => {
      button = new Button({ icon: 'play' });
      button.setDisabled(true);
      button.setDisabled(false);

      expect(button.getElement().disabled).toBe(false);
    });

    test('should not trigger onClick when disabled', () => {
      const mockOnClick = jest.fn();
      button = new Button({ icon: 'play', onClick: mockOnClick });

      button.setDisabled(true);
      button.getElement().click();

      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('destroy', () => {
    test('should remove button from DOM', () => {
      button = new Button({ icon: 'play' });
      document.body.appendChild(button.getElement());

      expect(document.querySelector('.btn')).toBeTruthy();

      button.destroy();

      expect(document.querySelector('.btn')).toBeFalsy();
      button = null; // Prevent double cleanup
    });
  });
});
