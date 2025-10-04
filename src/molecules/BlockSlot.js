/**
 * BlockSlot molecule - slot for placing command blocks
 */

export class BlockSlot {
  constructor(index) {
    this.index = index;
    this.block = null;
    this.element = this.render();
  }

  render() {
    const slot = document.createElement('div');
    slot.className = 'block-slot';
    slot.setAttribute('data-slot-index', this.index);

    // Drop zone events
    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      slot.classList.add('drag-over');
    });

    slot.addEventListener('dragleave', () => {
      slot.classList.remove('drag-over');
    });

    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over');

      const commandType = e.dataTransfer.getData('commandType');
      if (commandType) {
        this.dispatchBlockPlaced(commandType);
      }
    });

    // Click to remove block
    slot.addEventListener('click', () => {
      if (this.block) {
        this.removeBlock();
      }
    });

    return slot;
  }

  setBlock(block) {
    this.removeBlock();
    this.block = block;
    this.element.appendChild(block.getElement());
    this.element.classList.add('filled');
  }

  removeBlock() {
    if (this.block) {
      this.block.destroy();
      this.block = null;
      this.element.classList.remove('filled');
      this.dispatchBlockRemoved();
    }
  }

  getBlock() {
    return this.block;
  }

  hasBlock() {
    return this.block !== null;
  }

  getElement() {
    return this.element;
  }

  dispatchBlockPlaced(commandType) {
    const event = new CustomEvent('block-placed', {
      detail: { slotIndex: this.index, commandType }
    });
    window.dispatchEvent(event);
  }

  dispatchBlockRemoved() {
    const event = new CustomEvent('block-removed', {
      detail: { slotIndex: this.index }
    });
    window.dispatchEvent(event);
  }

  highlight() {
    this.element.classList.add('active');
  }

  unhighlight() {
    this.element.classList.remove('active');
  }

  destroy() {
    this.removeBlock();
    this.element.remove();
  }
}
