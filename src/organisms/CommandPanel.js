/**
 * CommandPanel organism - programming interface
 */

import { Block } from '../atoms/Block.js';
import { BlockSlot } from '../molecules/BlockSlot.js';
import { COMMAND_TYPES } from '../core/CommandExecutor.js';

export class CommandPanel {
  constructor(slotCount = 4) {
    this.slotCount = slotCount;
    this.slots = [];
    this.availableBlocks = [];
    this.element = this.render();
    this.setupEventListeners();
  }

  render() {
    const panel = document.createElement('div');
    panel.className = 'command-panel';

    // Available blocks section
    const blocksSection = document.createElement('div');
    blocksSection.className = 'available-blocks';

    const blocksTitle = document.createElement('h3');
    blocksTitle.textContent = 'Commands';
    blocksSection.appendChild(blocksTitle);

    const blocksContainer = document.createElement('div');
    blocksContainer.className = 'blocks-container';

    // Create available blocks
    [COMMAND_TYPES.FORWARD, COMMAND_TYPES.TURN_LEFT, COMMAND_TYPES.TURN_RIGHT].forEach(type => {
      const block = new Block(type);
      this.availableBlocks.push(block);
      blocksContainer.appendChild(block.getElement());
    });

    blocksSection.appendChild(blocksContainer);
    panel.appendChild(blocksSection);

    // Command slots section
    const slotsSection = document.createElement('div');
    slotsSection.className = 'command-slots';

    const slotsTitle = document.createElement('h3');
    slotsTitle.textContent = 'Program';
    slotsSection.appendChild(slotsTitle);

    const slotsContainer = document.createElement('div');
    slotsContainer.className = 'slots-container';

    // Create slots
    for (let i = 0; i < this.slotCount; i++) {
      const slot = new BlockSlot(i);
      this.slots.push(slot);
      slotsContainer.appendChild(slot.getElement());
    }

    slotsSection.appendChild(slotsContainer);
    panel.appendChild(slotsSection);

    return panel;
  }

  setupEventListeners() {
    // Handle block placement
    window.addEventListener('block-placed', (e) => {
      const { slotIndex, commandType } = e.detail;
      const slot = this.slots[slotIndex];
      if (slot) {
        const block = new Block(commandType);
        slot.setBlock(block);
      }
    });

    // Handle block click (for mobile)
    window.addEventListener('block-clicked', (e) => {
      const { commandType } = e.detail;
      const emptySlot = this.slots.find(slot => !slot.hasBlock());
      if (emptySlot) {
        const block = new Block(commandType);
        emptySlot.setBlock(block);
      }
    });
  }

  getCommands() {
    return this.slots
      .filter(slot => slot.hasBlock())
      .map(slot => slot.getBlock().getCommandType());
  }

  clear() {
    this.slots.forEach(slot => slot.removeBlock());
  }

  highlightSlot(index) {
    if (this.slots[index]) {
      this.slots[index].highlight();
    }
  }

  unhighlightAll() {
    this.slots.forEach(slot => slot.unhighlight());
  }

  getElement() {
    return this.element;
  }

  destroy() {
    this.availableBlocks.forEach(block => block.destroy());
    this.slots.forEach(slot => slot.destroy());
    this.element.remove();
  }
}
