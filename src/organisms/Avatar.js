/**
 * Avatar organism - the robot character
 */

import { Icon } from '../atoms/Icon.js';
import { getDirectionDegrees } from '../core/Direction.js';

export class Avatar {
  constructor(robot) {
    this.robot = robot;
    this.element = this.render();
    this.updatePosition();
    this.updateRotation();
  }

  render() {
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.setAttribute('data-robot', 'true');

    // Set initial grid position immediately to prevent grid auto-flow
    const pos = this.robot.getPosition();
    avatar.style.gridRowStart = pos.row + 1;
    avatar.style.gridColumnStart = pos.col + 1;

    const icon = new Icon('robot', 40);
    avatar.appendChild(icon.getElement());

    return avatar;
  }

  updatePosition() {
    const pos = this.robot.getPosition();
    this.element.setAttribute('data-row', pos.row);
    this.element.setAttribute('data-col', pos.col);
    this.element.style.gridRowStart = pos.row + 1;
    this.element.style.gridColumnStart = pos.col + 1;
  }

  updateRotation() {
    const direction = this.robot.getDirection();
    const degrees = getDirectionDegrees(direction);
    this.element.style.transform = `rotate(${degrees}deg)`;
  }

  async animateMove() {
    this.element.classList.add('moving');
    this.updatePosition();
    await this.wait(300);
    this.element.classList.remove('moving');
  }

  async animateRotate() {
    this.element.classList.add('rotating');
    this.updateRotation();
    await this.wait(300);
    this.element.classList.remove('rotating');
  }

  async celebrate() {
    this.element.classList.add('celebrating');
    await this.wait(1000);
    this.element.classList.remove('celebrating');
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getElement() {
    return this.element;
  }

  reset() {
    this.updatePosition();
    this.updateRotation();
  }

  destroy() {
    this.element.remove();
  }
}
