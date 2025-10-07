/**
 * @jest-environment jsdom
 */

import { ControlBar } from '../../src/organisms/ControlBar.js';

describe('ControlBar', () => {
  let controlBar;
  let mockHandlers;

  beforeEach(() => {
    mockHandlers = {
      onPlay: jest.fn(),
      onRestart: jest.fn(),
      onClear: jest.fn(),
      onMapSelect: jest.fn(),
      onAbout: jest.fn()
    };

    controlBar = new ControlBar(mockHandlers);
    document.body.appendChild(controlBar.getElement());
  });

  afterEach(() => {
    controlBar.destroy();
  });

  describe('initialization', () => {
    test('should create all control buttons', () => {
      const element = controlBar.getElement();
      expect(element.querySelectorAll('.btn')).toHaveLength(5);
    });

    test('should have play button', () => {
      expect(controlBar.playButton).toBeDefined();
    });

    test('should have restart button', () => {
      expect(controlBar.restartButton).toBeDefined();
    });

    test('should have clear button', () => {
      expect(controlBar.clearButton).toBeDefined();
    });

    test('should have map button', () => {
      expect(controlBar.mapButton).toBeDefined();
    });

    test('should have about button', () => {
      expect(controlBar.aboutButton).toBeDefined();
    });
  });

  describe('button interactions', () => {
    test('should call onPlay when play button clicked', () => {
      controlBar.playButton.getElement().click();
      expect(mockHandlers.onPlay).toHaveBeenCalledTimes(1);
    });

    test('should call onRestart when restart button clicked', () => {
      controlBar.restartButton.getElement().click();
      expect(mockHandlers.onRestart).toHaveBeenCalledTimes(1);
    });

    test('should call onClear when clear button clicked', () => {
      controlBar.clearButton.getElement().click();
      expect(mockHandlers.onClear).toHaveBeenCalledTimes(1);
    });

    test('should call onMapSelect when map button clicked', () => {
      controlBar.mapButton.getElement().click();
      expect(mockHandlers.onMapSelect).toHaveBeenCalledTimes(1);
    });

    test('should call onAbout when about button clicked', () => {
      controlBar.aboutButton.getElement().click();
      expect(mockHandlers.onAbout).toHaveBeenCalledTimes(1);
    });
  });

  describe('setPlayDisabled', () => {
    test('should disable play button', () => {
      controlBar.setPlayDisabled(true);
      expect(controlBar.playButton.getElement().disabled).toBe(true);
    });

    test('should enable play button', () => {
      controlBar.setPlayDisabled(true);
      controlBar.setPlayDisabled(false);
      expect(controlBar.playButton.getElement().disabled).toBe(false);
    });
  });

  describe('setRestartDisabled', () => {
    test('should disable restart button', () => {
      controlBar.setRestartDisabled(true);
      expect(controlBar.restartButton.getElement().disabled).toBe(true);
    });
  });

  describe('setClearDisabled', () => {
    test('should disable clear button', () => {
      controlBar.setClearDisabled(true);
      expect(controlBar.clearButton.getElement().disabled).toBe(true);
    });
  });

  describe('destroy', () => {
    test('should remove all buttons', () => {
      expect(document.querySelectorAll('.btn').length).toBeGreaterThan(0);

      controlBar.destroy();

      expect(document.querySelectorAll('.btn')).toHaveLength(0);
    });
  });
});
