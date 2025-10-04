/**
 * Button atom - reusable button component
 */

import { Icon } from './Icon.js';

export class Button {
  constructor(options = {}) {
    this.icon = options.icon;
    this.label = options.label || '';
    this.onClick = options.onClick || (() => {});
    this.className = options.className || '';
    this.disabled = options.disabled || false;
    this.element = this.render();
  }

  render() {
    const button = document.createElement('button');
    button.className = `btn ${this.className}`;
    button.type = 'button';
    button.disabled = this.disabled;

    if (this.icon) {
      const iconComponent = new Icon(this.icon);
      button.appendChild(iconComponent.getElement());
    }

    if (this.label) {
      const span = document.createElement('span');
      span.textContent = this.label;
      button.appendChild(span);
    }

    button.addEventListener('click', (e) => {
      if (!this.disabled) {
        this.onClick(e);
      }
    });

    return button;
  }

  getElement() {
    return this.element;
  }

  setDisabled(disabled) {
    this.disabled = disabled;
    this.element.disabled = disabled;
  }

  setLabel(label) {
    this.label = label;
    const span = this.element.querySelector('span');
    if (span) {
      span.textContent = label;
    }
  }

  destroy() {
    this.element.remove();
  }
}
