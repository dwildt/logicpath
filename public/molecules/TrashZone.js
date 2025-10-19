/**
 * TrashZone molecule - drop zone for removing blocks
 */

import { Icon } from '../atoms/Icon.js';

export class TrashZone {
  constructor() {
    this.element = this.render();
  }

  render() {
    const zone = document.createElement('div');
    zone.className = 'trash-zone';

    const icon = new Icon('clear', 32);
    zone.appendChild(icon.getElement());

    const label = document.createElement('span');
    label.className = 'trash-zone-label';
    label.textContent = 'Drag here to remove';
    zone.appendChild(label);

    // Drop zone events
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');

      const slotIndex = e.dataTransfer.getData('slotIndex');
      if (slotIndex !== '') {
        this.dispatchBlockRemoved(parseInt(slotIndex));
        zone.classList.add('trash-activated');
        setTimeout(() => {
          zone.classList.remove('trash-activated');
        }, 300);
      }
    });

    return zone;
  }

  dispatchBlockRemoved(slotIndex) {
    const event = new CustomEvent('trash-block-removed', {
      detail: { slotIndex }
    });
    window.dispatchEvent(event);
  }

  getElement() {
    return this.element;
  }

  destroy() {
    this.element.remove();
  }
}
