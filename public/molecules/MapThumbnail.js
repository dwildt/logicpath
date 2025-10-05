/**
 * MapThumbnail molecule - preview of a map
 */

export class MapThumbnail {
  constructor(mapMetadata, onClick) {
    this.mapMetadata = mapMetadata;
    this.onClick = onClick || (() => {});
    this.element = this.render();
  }

  render() {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'map-thumbnail';
    thumbnail.setAttribute('data-map-id', this.mapMetadata.id);

    const nameEl = document.createElement('h3');
    nameEl.textContent = this.mapMetadata.name;

    const descEl = document.createElement('p');
    descEl.textContent = this.mapMetadata.description;

    thumbnail.appendChild(nameEl);
    thumbnail.appendChild(descEl);

    thumbnail.addEventListener('click', () => {
      this.onClick(this.mapMetadata.id);
    });

    return thumbnail;
  }

  getElement() {
    return this.element;
  }

  setActive(active) {
    if (active) {
      this.element.classList.add('active');
    } else {
      this.element.classList.remove('active');
    }
  }

  destroy() {
    this.element.remove();
  }
}
