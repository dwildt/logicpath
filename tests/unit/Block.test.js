/**
 * @jest-environment jsdom
 */

import { Block } from '../../src/atoms/Block.js';
import { COMMAND_TYPES } from '../../src/core/CommandExecutor.js';

describe('Block', () => {
  let block;

  beforeEach(() => {
    block = new Block(COMMAND_TYPES.FORWARD);
    document.body.appendChild(block.getElement());
  });

  afterEach(() => {
    block.destroy();
  });

  test('should create block with correct command type', () => {
    expect(block.getCommandType()).toBe(COMMAND_TYPES.FORWARD);
  });

  test('should have correct CSS class', () => {
    const element = block.getElement();
    expect(element.classList.contains('block')).toBe(true);
    expect(element.classList.contains('block-forward')).toBe(true);
  });

  test('should be draggable', () => {
    const element = block.getElement();
    expect(element.draggable).toBe(true);
  });

  test('should get icon name for forward', () => {
    const forwardBlock = new Block(COMMAND_TYPES.FORWARD);
    expect(forwardBlock.getIconName()).toBe('forward');
  });

  test('should get icon name for backward', () => {
    const backwardBlock = new Block(COMMAND_TYPES.BACKWARD);
    expect(backwardBlock.getIconName()).toBe('backward');
  });

  test('should get icon name for left', () => {
    const leftBlock = new Block(COMMAND_TYPES.TURN_LEFT);
    expect(leftBlock.getIconName()).toBe('left');
  });

  test('should get icon name for right', () => {
    const rightBlock = new Block(COMMAND_TYPES.TURN_RIGHT);
    expect(rightBlock.getIconName()).toBe('right');
  });

  test('should return default icon for unknown command', () => {
    const unknownBlock = new Block('unknown');
    expect(unknownBlock.getIconName()).toBe('forward');
  });

  test('should clone block', () => {
    const clonedBlock = block.clone();
    expect(clonedBlock.getCommandType()).toBe(block.getCommandType());
    expect(clonedBlock).not.toBe(block);
  });

  test('should handle dragstart event', () => {
    const element = block.getElement();
    const mockDataTransfer = {
      data: {},
      setData: function(key, value) {
        this.data[key] = value;
      },
      getData: function(key) {
        return this.data[key];
      }
    };

    const dragstartEvent = new Event('dragstart', {
      bubbles: true,
      cancelable: true
    });
    dragstartEvent.dataTransfer = mockDataTransfer;

    element.dispatchEvent(dragstartEvent);

    expect(element.classList.contains('dragging')).toBe(true);
    expect(mockDataTransfer.getData('commandType')).toBe(COMMAND_TYPES.FORWARD);
  });

  test('should include slot index in dragstart when in slot', () => {
    const slot = document.createElement('div');
    slot.className = 'block-slot';
    slot.setAttribute('data-slot-index', '3');
    document.body.appendChild(slot);

    const blockInSlot = new Block(COMMAND_TYPES.FORWARD);
    slot.appendChild(blockInSlot.getElement());

    const mockDataTransfer = {
      data: {},
      setData: function(key, value) {
        this.data[key] = value;
      },
      getData: function(key) {
        return this.data[key];
      }
    };

    const dragstartEvent = new Event('dragstart', {
      bubbles: true,
      cancelable: true
    });
    dragstartEvent.dataTransfer = mockDataTransfer;

    blockInSlot.getElement().dispatchEvent(dragstartEvent);

    expect(mockDataTransfer.getData('slotIndex')).toBe('3');

    blockInSlot.destroy();
    slot.remove();
  });

  test('should handle dragend event', () => {
    const element = block.getElement();
    element.classList.add('dragging');

    const dragendEvent = new Event('dragend', {
      bubbles: true
    });

    element.dispatchEvent(dragendEvent);

    expect(element.classList.contains('dragging')).toBe(false);
  });

  test('should dispatch block-clicked event when clicked outside slot', (done) => {
    const element = block.getElement();

    window.addEventListener('block-clicked', (e) => {
      expect(e.detail.commandType).toBe(COMMAND_TYPES.FORWARD);
      done();
    }, { once: true });

    element.click();
  });

  test('should not dispatch block-clicked event when in slot', () => {
    const slot = document.createElement('div');
    slot.className = 'block-slot';
    document.body.appendChild(slot);

    const blockInSlot = new Block(COMMAND_TYPES.FORWARD);
    slot.appendChild(blockInSlot.getElement());

    let eventFired = false;
    window.addEventListener('block-clicked', () => {
      eventFired = true;
    });

    blockInSlot.getElement().click();

    expect(eventFired).toBe(false);

    blockInSlot.destroy();
    slot.remove();
  });

  test('should remove element on destroy', () => {
    const element = block.getElement();
    expect(document.body.contains(element)).toBe(true);

    block.destroy();

    expect(document.body.contains(element)).toBe(false);
  });
});
