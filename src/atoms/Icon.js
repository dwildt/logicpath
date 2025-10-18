/**
 * Icon atom - SVG icon wrapper
 */

export class Icon {
  constructor(iconName, size = 24) {
    this.iconName = iconName;
    this.size = size;
    this.element = this.render();
  }

  render() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', this.size);
    svg.setAttribute('height', this.size);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.classList.add('icon', `icon-${this.iconName}`);

    const path = this.getIconPath(this.iconName);
    if (path) {
      svg.innerHTML = path;
    }

    return svg;
  }

  getIconPath(iconName) {
    const icons = {
      'play': '<polygon points="5 3 19 12 5 21 5 3"></polygon>',
      'restart': '<polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>',
      'map': '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>',
      'info': '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
      'forward': '<polyline points="12 19 12 5"></polyline><polyline points="5 12 12 5 19 12"></polyline>',
      'left': '<path d="M19 12H5M12 19l-7-7 7-7"></path>',
      'right': '<path d="M5 12h14M12 5l7 7-7 7"></path>',
      'close': '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
      'check': '<polyline points="20 6 9 17 4 12"></polyline>',
      'robot': '<rect x="4" y="4" width="16" height="16" rx="2"></rect><circle cx="9" cy="10" r="1"></circle><circle cx="15" cy="10" r="1"></circle><path d="M9 15h6"></path>',
      'clear': '<path d="M3 6h18M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>'
    };

    return icons[iconName] || '';
  }

  getElement() {
    return this.element;
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('width', size);
    this.element.setAttribute('height', size);
  }
}
