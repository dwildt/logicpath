/**
 * @jest-environment jsdom
 */

import { MapLoader } from '../../src/core/MapLoader.js';

// Mock fetch globally
global.fetch = jest.fn();

describe('MapLoader', () => {
  let mapLoader;

  beforeEach(() => {
    mapLoader = new MapLoader('./maps');
    fetch.mockClear();
  });

  describe('loadMap', () => {
    test('should load map data and create Map instance', async () => {
      const mockMapData = {
        id: 'test-map',
        name: 'Test Map',
        description: 'A test map',
        gridSize: { rows: 3, cols: 3 },
        tiles: [
          { row: 0, col: 0, type: 'grass', walkable: true }
        ],
        robot: {
          startPosition: { row: 0, col: 0 },
          startDirection: 'east'
        },
        goal: { row: 2, col: 2 }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockMapData
      });

      const map = await mapLoader.loadMap('test-map');

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('./maps/test-map.json'));
      expect(map.id).toBe('test-map');
      expect(map.name).toBe('Test Map');
    });

    test('should cache loaded maps', async () => {
      const mockMapData = {
        id: 'cached-map',
        name: 'Cached Map',
        description: 'Test caching',
        gridSize: { rows: 2, cols: 2 },
        tiles: [],
        robot: { startPosition: { row: 0, col: 0 }, startDirection: 'east' },
        goal: { row: 1, col: 1 }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockMapData
      });

      await mapLoader.loadMap('cached-map');

      expect(mapLoader.hasMap('cached-map')).toBe(true);
      expect(mapLoader.getMap('cached-map')).toBeDefined();
    });

    test('should set current map after loading', async () => {
      const mockMapData = {
        id: 'current-map',
        name: 'Current',
        description: 'Test current',
        gridSize: { rows: 2, cols: 2 },
        tiles: [],
        robot: { startPosition: { row: 0, col: 0 }, startDirection: 'east' },
        goal: { row: 1, col: 1 }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockMapData
      });

      const map = await mapLoader.loadMap('current-map');

      expect(mapLoader.getCurrentMap()).toBe(map);
    });

    test('should throw error when map fails to load', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(mapLoader.loadMap('missing-map'))
        .rejects
        .toThrow('Failed to load map: missing-map');
    });

    test('should add cache-busting parameter to URL', async () => {
      const mockMapData = {
        id: 'cache-test',
        name: 'Cache Test',
        description: 'Test',
        gridSize: { rows: 2, cols: 2 },
        tiles: [],
        robot: { startPosition: { row: 0, col: 0 }, startDirection: 'east' },
        goal: { row: 1, col: 1 }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockMapData
      });

      await mapLoader.loadMap('cache-test');

      const fetchUrl = fetch.mock.calls[0][0];
      expect(fetchUrl).toMatch(/\?v=\d+$/);
    });
  });

  describe('loadMapList', () => {
    test('should load metadata for all available maps', async () => {
      const mockMaps = [
        { id: 'map1', name: 'Map 1', description: 'First map' },
        { id: 'map2', name: 'Map 2', description: 'Second map' },
        { id: 'map3', name: 'Map 3', description: 'Third map' }
      ];

      fetch
        .mockResolvedValueOnce({ ok: true, json: async () => mockMaps[0] })
        .mockResolvedValueOnce({ ok: true, json: async () => mockMaps[1] })
        .mockResolvedValueOnce({ ok: true, json: async () => mockMaps[2] });

      const mapList = await mapLoader.loadMapList();

      expect(mapList).toHaveLength(3);
      expect(mapList[0]).toEqual({ id: 'map1', name: 'Map 1', description: 'First map' });
    });

    test('should skip maps that fail to load', async () => {
      fetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'map1', name: 'Map 1', description: 'First' }) })
        .mockResolvedValueOnce({ ok: false, status: 404 })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'map3', name: 'Map 3', description: 'Third' }) });

      const mapList = await mapLoader.loadMapList();

      expect(mapList).toHaveLength(2);
      expect(mapList.map(m => m.id)).toEqual(['map1', 'map3']);
    });
  });

  describe('getCurrentMap', () => {
    test('should return null when no map is loaded', () => {
      expect(mapLoader.getCurrentMap()).toBeNull();
    });
  });

  describe('hasMap', () => {
    test('should return false for uncached map', () => {
      expect(mapLoader.hasMap('unknown')).toBe(false);
    });
  });

  describe('getMap', () => {
    test('should return undefined for uncached map', () => {
      expect(mapLoader.getMap('unknown')).toBeUndefined();
    });
  });
});
