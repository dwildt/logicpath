/**
 * MapSelector organism - map selection modal
 */

import { MapThumbnail } from '../molecules/MapThumbnail.js';
import { Icon } from '../atoms/Icon.js';

export class MapSelector {
  constructor(onSelectMap) {
    this.onSelectMap = onSelectMap || (() => {});
    this.maps = [];
    this.element = this.render();
    this.isOpen = false;
  }

  render() {
    const modal = document.createElement('div');
    modal.className = 'modal map-selector-modal';
    modal.style.display = 'none';

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.addEventListener('click', () => this.close());

    const content = document.createElement('div');
    content.className = 'modal-content';

    const header = document.createElement('div');
    header.className = 'modal-header';

    const title = document.createElement('h2');
    title.textContent = 'Select a Map';

    const closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    const closeIcon = new Icon('close');
    closeButton.appendChild(closeIcon.getElement());
    closeButton.addEventListener('click', () => this.close());

    header.appendChild(title);
    header.appendChild(closeButton);

    this.mapsContainer = document.createElement('div');
    this.mapsContainer.className = 'maps-container';

    content.appendChild(header);
    content.appendChild(this.mapsContainer);

    modal.appendChild(overlay);
    modal.appendChild(content);

    return modal;
  }

  async loadMaps(mapLoader) {
    const mapList = await mapLoader.loadMapList();
    this.maps = mapList;
    this.renderMaps();
  }

  renderMaps() {
    this.mapsContainer.innerHTML = '';

    this.maps.forEach(mapData => {
      const thumbnail = new MapThumbnail(mapData, (mapId) => {
        this.onSelectMap(mapId);
        this.close();
      });
      this.mapsContainer.appendChild(thumbnail.getElement());
    });
  }

  open() {
    this.isOpen = true;
    this.element.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    this.element.style.display = 'none';
    document.body.style.overflow = '';
  }

  getElement() {
    return this.element;
  }

  destroy() {
    this.element.remove();
  }
}
