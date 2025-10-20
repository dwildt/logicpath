/**
 * @jest-environment jsdom
 */

import { BlockSlot } from '../../src/molecules/BlockSlot.js';
import { Block } from '../../src/atoms/Block.js';
import { COMMAND_TYPES } from '../../src/core/CommandExecutor.js';

describe('BlockSlot', () => {
  let blockSlot;

  beforeEach(() => {
    blockSlot = new BlockSlot(0);
    document.body.appendChild(blockSlot.getElement());
  });

  afterEach(() => {
    blockSlot.destroy();
  });

  test('should create empty slot', () => {
    expect(blockSlot.hasBlock()).toBe(false);
    expect(blockSlot.getBlock()).toBe(null);
  });

  test('should add block to slot', () => {
    const block = new Block(COMMAND_TYPES.FORWARD);
    blockSlot.setBlock(block);

    expect(blockSlot.hasBlock()).toBe(true);
    expect(blockSlot.getBlock()).toBe(block);
    expect(blockSlot.getElement().classList.contains('filled')).toBe(true);
  });

  test('should not remove block when clicked (removal via trash zone)', () => {
    const block = new Block(COMMAND_TYPES.FORWARD);
    blockSlot.setBlock(block);

    expect(blockSlot.hasBlock()).toBe(true);

    // Click on the slot (should not remove - need to drag to trash)
    blockSlot.getElement().click();

    // Block should still be there
    expect(blockSlot.hasBlock()).toBe(true);
    expect(blockSlot.getBlock()).toBe(block);
    expect(blockSlot.getElement().classList.contains('filled')).toBe(true);
  });

  test('should dispatch block-removed event when block is removed programmatically', (done) => {
    const block = new Block(COMMAND_TYPES.FORWARD);
    blockSlot.setBlock(block);

    window.addEventListener('block-removed', (e) => {
      expect(e.detail.slotIndex).toBe(0);
      done();
    }, { once: true });

    blockSlot.removeBlock();
  });

  test('should not dispatch block-clicked event when clicking block in slot', (done) => {
    const block = new Block(COMMAND_TYPES.FORWARD);
    blockSlot.setBlock(block);

    let blockClickedFired = false;

    const blockClickedHandler = () => {
      blockClickedFired = true;
    };

    window.addEventListener('block-clicked', blockClickedHandler);

    // Click on the block element inside the slot
    const blockElement = blockSlot.getElement().querySelector('.block');
    blockElement.click();

    // Wait a bit to see if event fires
    setTimeout(() => {
      expect(blockClickedFired).toBe(false);
      window.removeEventListener('block-clicked', blockClickedHandler);
      done();
    }, 100);
  });

  test('should remove block via programmatic call', () => {
    const block = new Block(COMMAND_TYPES.FORWARD);
    blockSlot.setBlock(block);

    expect(blockSlot.hasBlock()).toBe(true);

    // Remove block programmatically (e.g., via trash zone)
    blockSlot.removeBlock();

    expect(blockSlot.hasBlock()).toBe(false);
  });

  test('should handle dragover event', () => {
    const element = blockSlot.getElement();
    const dragoverEvent = new Event('dragover', {
      bubbles: true,
      cancelable: true
    });

    element.dispatchEvent(dragoverEvent);

    expect(element.classList.contains('drag-over')).toBe(true);
  });

  test('should handle dragleave event', () => {
    const element = blockSlot.getElement();

    // First add drag-over class
    element.classList.add('drag-over');

    const dragleaveEvent = new Event('dragleave', {
      bubbles: true
    });

    element.dispatchEvent(dragleaveEvent);

    expect(element.classList.contains('drag-over')).toBe(false);
  });

  test('should handle drop event with command type', (done) => {
    const element = blockSlot.getElement();

    window.addEventListener('block-placed', (e) => {
      expect(e.detail.slotIndex).toBe(0);
      expect(e.detail.commandType).toBe(COMMAND_TYPES.FORWARD);
      done();
    }, { once: true });

    const mockDataTransfer = {
      data: {},
      setData: function(key, value) {
        this.data[key] = value;
      },
      getData: function(key) {
        return this.data[key];
      }
    };
    mockDataTransfer.setData('commandType', COMMAND_TYPES.FORWARD);

    const dropEvent = new Event('drop', {
      bubbles: true,
      cancelable: true
    });
    dropEvent.dataTransfer = mockDataTransfer;

    element.dispatchEvent(dropEvent);
  });

  test('should not dispatch event on drop without command type', (done) => {
    const element = blockSlot.getElement();
    let eventFired = false;

    window.addEventListener('block-placed', () => {
      eventFired = true;
    });

    const mockDataTransfer = {
      data: {},
      setData: function(key, value) {
        this.data[key] = value;
      },
      getData: function(key) {
        return this.data[key];
      }
    };
    // Don't set commandType

    const dropEvent = new Event('drop', {
      bubbles: true,
      cancelable: true
    });
    dropEvent.dataTransfer = mockDataTransfer;

    element.dispatchEvent(dropEvent);

    setTimeout(() => {
      expect(eventFired).toBe(false);
      done();
    }, 100);
  });

  test('should highlight slot', () => {
    blockSlot.highlight();
    expect(blockSlot.getElement().classList.contains('active')).toBe(true);
  });

  test('should unhighlight slot', () => {
    blockSlot.highlight();
    blockSlot.unhighlight();
    expect(blockSlot.getElement().classList.contains('active')).toBe(false);
  });

  test('should replace existing block when setting new block', () => {
    const block1 = new Block(COMMAND_TYPES.FORWARD);
    const block2 = new Block(COMMAND_TYPES.TURN_LEFT);

    blockSlot.setBlock(block1);
    expect(blockSlot.getBlock()).toBe(block1);

    blockSlot.setBlock(block2);
    expect(blockSlot.getBlock()).toBe(block2);
    expect(blockSlot.hasBlock()).toBe(true);
  });

  test('should not dispatch event when removing null block', () => {
    let eventFired = false;

    window.addEventListener('block-removed', () => {
      eventFired = true;
    });

    // Remove when no block exists
    blockSlot.removeBlock();

    expect(eventFired).toBe(false);
  });
});
