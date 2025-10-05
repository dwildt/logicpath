/**
 * Block atom - command block component
 */

import { Icon } from './Icon.js';
import { COMMAND_TYPES } from '../core/CommandExecutor.js';

export class Block {
  constructor(commandType) {
    this.commandType = commandType;
    this.element = this.render();
  }

  render() {
    const block = document.createElement('div');
    block.className = `block block-${this.commandType}`;
    block.setAttribute('data-command', this.commandType);
    block.draggable = true;

    const icon = new Icon(this.getIconName(), 32);
    block.appendChild(icon.getElement());

    // Drag event listeners
    block.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('commandType', this.commandType);
      block.classList.add('dragging');
    });

    block.addEventListener('dragend', () => {
      block.classList.remove('dragging');
    });

    // Click for mobile - add to panel
    // Only dispatch block-clicked if NOT in a slot (Commands area only)
    block.addEventListener('click', (e) => {
      const isInSlot = block.closest('.block-slot');
      if (isInSlot) {
        // Let the slot handle the click (for removal)
        return;
      }
      const event = new CustomEvent('block-clicked', {
        detail: { commandType: this.commandType }
      });
      window.dispatchEvent(event);
    });

    return block;
  }

  getIconName() {
    const iconMap = {
      [COMMAND_TYPES.FORWARD]: 'forward',
      [COMMAND_TYPES.TURN_LEFT]: 'left',
      [COMMAND_TYPES.TURN_RIGHT]: 'right'
    };
    return iconMap[this.commandType] || 'forward';
  }

  getElement() {
    return this.element;
  }

  getCommandType() {
    return this.commandType;
  }

  clone() {
    return new Block(this.commandType);
  }

  destroy() {
    this.element.remove();
  }
}
