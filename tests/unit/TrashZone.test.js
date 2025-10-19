/**
 * @jest-environment jsdom
 */

import { TrashZone } from '../../src/molecules/TrashZone.js';

// Mock DataTransfer for jsdom
class MockDataTransfer {
  constructor() {
    this.data = {};
  }
  setData(format, data) {
    this.data[format] = data;
  }
  getData(format) {
    return this.data[format] || '';
  }
}

describe('TrashZone', () => {
  let trashZone;

  beforeEach(() => {
    trashZone = new TrashZone();
    document.body.appendChild(trashZone.getElement());
  });

  afterEach(() => {
    trashZone.destroy();
  });

  test('should create trash zone element', () => {
    const element = trashZone.getElement();
    expect(element).toBeDefined();
    expect(element.classList.contains('trash-zone')).toBe(true);
  });

  test('should have trash icon and label', () => {
    const element = trashZone.getElement();
    expect(element.querySelector('.icon')).toBeDefined();
    expect(element.querySelector('.trash-zone-label')).toBeDefined();
    expect(element.querySelector('.trash-zone-label').textContent).toBe('Drag here to remove');
  });

  test('should add drag-over class on dragover', () => {
    const element = trashZone.getElement();
    const event = new Event('dragover', { bubbles: true, cancelable: true });
    element.dispatchEvent(event);

    expect(element.classList.contains('drag-over')).toBe(true);
  });

  test('should remove drag-over class on dragleave', () => {
    const element = trashZone.getElement();

    const dragoverEvent = new Event('dragover', { bubbles: true, cancelable: true });
    element.dispatchEvent(dragoverEvent);
    expect(element.classList.contains('drag-over')).toBe(true);

    const dragleaveEvent = new Event('dragleave', { bubbles: true });
    element.dispatchEvent(dragleaveEvent);
    expect(element.classList.contains('drag-over')).toBe(false);
  });

  test('should dispatch trash-block-removed event on drop with slot index', (done) => {
    const element = trashZone.getElement();

    window.addEventListener('trash-block-removed', (e) => {
      expect(e.detail.slotIndex).toBe(5);
      done();
    }, { once: true });

    const dataTransfer = new MockDataTransfer();
    dataTransfer.setData('slotIndex', '5');
    const dropEvent = new Event('drop', { bubbles: true, cancelable: true });
    dropEvent.dataTransfer = dataTransfer;
    element.dispatchEvent(dropEvent);
  });

  test('should add trash-activated class briefly after drop', (done) => {
    const element = trashZone.getElement();

    const dataTransfer = new MockDataTransfer();
    dataTransfer.setData('slotIndex', '3');
    const dropEvent = new Event('drop', { bubbles: true, cancelable: true });
    dropEvent.dataTransfer = dataTransfer;
    element.dispatchEvent(dropEvent);

    expect(element.classList.contains('trash-activated')).toBe(true);

    setTimeout(() => {
      expect(element.classList.contains('trash-activated')).toBe(false);
      done();
    }, 400);
  });

  test('should not dispatch event if no slotIndex in drop data', () => {
    const element = trashZone.getElement();
    let eventFired = false;

    window.addEventListener('trash-block-removed', () => {
      eventFired = true;
    });

    const dataTransfer = new MockDataTransfer();
    const dropEvent = new Event('drop', { bubbles: true, cancelable: true });
    dropEvent.dataTransfer = dataTransfer;
    element.dispatchEvent(dropEvent);

    expect(eventFired).toBe(false);
  });
});
