/**
 * ControlBar organism - main control buttons
 */

import { Button } from '../atoms/Button.js';

export class ControlBar {
  constructor(options = {}) {
    this.onPlay = options.onPlay || (() => {});
    this.onRestart = options.onRestart || (() => {});
    this.onClear = options.onClear || (() => {});
    this.onMapSelect = options.onMapSelect || (() => {});
    this.onAbout = options.onAbout || (() => {});
    this.element = this.render();
  }

  render() {
    const controlBar = document.createElement('div');
    controlBar.className = 'control-bar';

    this.playButton = new Button({
      icon: 'play',
      className: 'btn-play',
      onClick: this.onPlay
    });

    this.restartButton = new Button({
      icon: 'restart',
      className: 'btn-restart',
      onClick: this.onRestart
    });

    this.clearButton = new Button({
      icon: 'clear',
      className: 'btn-clear',
      onClick: this.onClear
    });

    this.mapButton = new Button({
      icon: 'map',
      className: 'btn-map',
      onClick: this.onMapSelect
    });

    this.aboutButton = new Button({
      icon: 'info',
      className: 'btn-about',
      onClick: this.onAbout
    });

    controlBar.appendChild(this.playButton.getElement());
    controlBar.appendChild(this.restartButton.getElement());
    controlBar.appendChild(this.clearButton.getElement());
    controlBar.appendChild(this.mapButton.getElement());
    controlBar.appendChild(this.aboutButton.getElement());

    return controlBar;
  }

  getElement() {
    return this.element;
  }

  setPlayDisabled(disabled) {
    this.playButton.setDisabled(disabled);
  }

  setRestartDisabled(disabled) {
    this.restartButton.setDisabled(disabled);
  }

  setClearDisabled(disabled) {
    this.clearButton.setDisabled(disabled);
  }

  destroy() {
    this.playButton.destroy();
    this.restartButton.destroy();
    this.clearButton.destroy();
    this.mapButton.destroy();
    this.aboutButton.destroy();
    this.element.remove();
  }
}
