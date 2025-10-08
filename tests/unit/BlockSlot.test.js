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

  test('should remove block when clicked', () => {
    const block = new Block(COMMAND_TYPES.FORWARD);
    blockSlot.setBlock(block);

    expect(blockSlot.hasBlock()).toBe(true);

    // Click on the slot (which contains the block)
    blockSlot.getElement().click();

    expect(blockSlot.hasBlock()).toBe(false);
    expect(blockSlot.getBlock()).toBe(null);
    expect(blockSlot.getElement().classList.contains('filled')).toBe(false);
  });

  test('should dispatch block-removed event when block is removed', (done) => {
    const block = new Block(COMMAND_TYPES.FORWARD);
    blockSlot.setBlock(block);

    window.addEventListener('block-removed', (e) => {
      expect(e.detail.slotIndex).toBe(0);
      done();
    }, { once: true });

    blockSlot.getElement().click();
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

  test('should remove block when clicking on slot with block', () => {
    const block = new Block(COMMAND_TYPES.FORWARD);
    blockSlot.setBlock(block);

    expect(blockSlot.hasBlock()).toBe(true);

    // Click on the slot element (not the block)
    blockSlot.getElement().click();

    expect(blockSlot.hasBlock()).toBe(false);
  });
});
