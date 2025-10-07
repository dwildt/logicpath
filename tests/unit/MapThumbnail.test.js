/**
 * @jest-environment jsdom
 */

import { MapThumbnail } from '../../src/molecules/MapThumbnail.js';

describe('MapThumbnail', () => {
  let thumbnail;
  let mockMapData;
  let mockOnSelect;

  beforeEach(() => {
    mockMapData = {
      id: 'test-map',
      name: 'Test Map',
      description: 'A test map for testing'
    };
    mockOnSelect = jest.fn();
    thumbnail = new MapThumbnail(mockMapData, mockOnSelect);
    document.body.appendChild(thumbnail.getElement());
  });

  afterEach(() => {
    thumbnail.destroy();
  });

  describe('initialization', () => {
    test('should create thumbnail element', () => {
      const element = thumbnail.getElement();
      expect(element.classList.contains('map-thumbnail')).toBe(true);
    });

    test('should display map name', () => {
      const element = thumbnail.getElement();
      const name = element.querySelector('h3');
      expect(name.textContent).toBe('Test Map');
    });

    test('should display map description', () => {
      const element = thumbnail.getElement();
      const description = element.querySelector('p');
      expect(description.textContent).toBe('A test map for testing');
    });
  });

  describe('interaction', () => {
    test('should call onSelect with map id when clicked', () => {
      thumbnail.getElement().click();

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith('test-map');
    });
  });

  describe('destroy', () => {
    test('should remove element from DOM', () => {
      expect(document.querySelector('.map-thumbnail')).toBeTruthy();

      thumbnail.destroy();

      expect(document.querySelector('.map-thumbnail')).toBeFalsy();
    });
  });
});
