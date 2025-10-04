import { Map } from '../../src/core/Map.js';

describe('Map', () => {
  let mapData;
  let map;

  beforeEach(() => {
    mapData = {
      id: 'test-map',
      name: 'Test Map',
      description: 'A test map',
      gridSize: { rows: 3, cols: 3 },
      tiles: [
        { row: 0, col: 0, type: 'grass', walkable: true },
        { row: 0, col: 1, type: 'water', walkable: false },
        { row: 0, col: 2, type: 'grass', walkable: true },
        { row: 1, col: 0, type: 'grass', walkable: true },
        { row: 1, col: 1, type: 'grass', walkable: true },
        { row: 1, col: 2, type: 'grass', walkable: true },
        { row: 2, col: 0, type: 'grass', walkable: true },
        { row: 2, col: 1, type: 'grass', walkable: true },
        { row: 2, col: 2, type: 'grass', walkable: true }
      ],
      robot: {
        startPosition: { row: 0, col: 0 },
        startDirection: 'north'
      },
      goal: { row: 2, col: 2 }
    };
    map = new Map(mapData);
  });

  describe('constructor', () => {
    it('should initialize with map data', () => {
      expect(map.id).toBe('test-map');
      expect(map.name).toBe('Test Map');
      expect(map.gridSize).toEqual({ rows: 3, cols: 3 });
    });
  });

  describe('isInBounds', () => {
    it('should return true for valid positions', () => {
      expect(map.isInBounds({ row: 0, col: 0 })).toBe(true);
      expect(map.isInBounds({ row: 2, col: 2 })).toBe(true);
    });

    it('should return false for out of bounds positions', () => {
      expect(map.isInBounds({ row: -1, col: 0 })).toBe(false);
      expect(map.isInBounds({ row: 0, col: 3 })).toBe(false);
      expect(map.isInBounds({ row: 3, col: 0 })).toBe(false);
    });
  });

  describe('isWalkable', () => {
    it('should return true for walkable tiles', () => {
      expect(map.isWalkable({ row: 0, col: 0 })).toBe(true);
    });

    it('should return false for non-walkable tiles', () => {
      expect(map.isWalkable({ row: 0, col: 1 })).toBe(false);
    });

    it('should return false for out of bounds', () => {
      expect(map.isWalkable({ row: -1, col: 0 })).toBe(false);
    });
  });

  describe('isGoal', () => {
    it('should return true for goal position', () => {
      expect(map.isGoal({ row: 2, col: 2 })).toBe(true);
    });

    it('should return false for non-goal position', () => {
      expect(map.isGoal({ row: 0, col: 0 })).toBe(false);
    });
  });

  describe('getTile', () => {
    it('should return tile data for valid position', () => {
      const tile = map.getTile({ row: 0, col: 0 });
      expect(tile).toEqual({ type: 'grass', walkable: true });
    });

    it('should return null for out of bounds', () => {
      expect(map.getTile({ row: -1, col: 0 })).toBeNull();
    });
  });
});
