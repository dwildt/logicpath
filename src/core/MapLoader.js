/**
 * MapLoader - loads map JSON files
 */

import { Map } from './Map.js';

export class MapLoader {
  constructor(mapsPath = './maps') {
    this.mapsPath = mapsPath;
    this.maps = new Map();
    this.currentMap = null;
  }

  /**
   * Load a map by ID
   * @param {string} mapId
   * @returns {Promise<Map>}
   */
  async loadMap(mapId) {
    try {
      const response = await fetch(`${this.mapsPath}/${mapId}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load map: ${mapId}`);
      }
      const mapData = await response.json();
      const map = new Map(mapData);
      this.maps.set(mapId, map);
      this.currentMap = map;
      return map;
    } catch (error) {
      console.error('Error loading map:', error);
      throw error;
    }
  }

  /**
   * Load all available maps metadata
   * @returns {Promise<Array>}
   */
  async loadMapList() {
    // For now, we'll hardcode the available maps
    // In the future, this could fetch a manifest file
    const mapIds = ['map1', 'map2', 'map3'];

    const mapMetadata = [];
    for (const mapId of mapIds) {
      try {
        const response = await fetch(`${this.mapsPath}/${mapId}.json`);
        if (response.ok) {
          const data = await response.json();
          mapMetadata.push({
            id: data.id,
            name: data.name,
            description: data.description
          });
        }
      } catch (error) {
        console.error(`Error loading metadata for ${mapId}:`, error);
      }
    }

    return mapMetadata;
  }

  /**
   * Get currently loaded map
   * @returns {Map|null}
   */
  getCurrentMap() {
    return this.currentMap;
  }

  /**
   * Check if a map is loaded
   * @param {string} mapId
   * @returns {boolean}
   */
  hasMap(mapId) {
    return this.maps.has(mapId);
  }

  /**
   * Get a cached map
   * @param {string} mapId
   * @returns {Map|undefined}
   */
  getMap(mapId) {
    return this.maps.get(mapId);
  }
}
