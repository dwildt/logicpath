/**
 * @jest-environment jsdom
 */

import { CommandPanel } from '../../src/organisms/CommandPanel.js';
import { COMMAND_TYPES } from '../../src/core/CommandExecutor.js';

describe('CommandPanel', () => {
  let commandPanel;

  beforeEach(() => {
    commandPanel = new CommandPanel(4);
    document.body.appendChild(commandPanel.getElement());
  });

  afterEach(() => {
    commandPanel.destroy();
  });

  describe('initialization', () => {
    test('should create correct number of slots', () => {
      const slots = commandPanel.getElement().querySelectorAll('.block-slot');
      expect(slots).toHaveLength(4);
    });

    test('should create available blocks for all command types', () => {
      const blocks = commandPanel.getElement().querySelectorAll('.available-blocks .block');
      expect(blocks).toHaveLength(3); // forward, left, right
    });
  });

  describe('getCommands', () => {
    test('should return empty array when no blocks placed', () => {
      expect(commandPanel.getCommands()).toEqual([]);
    });

    test('should return commands in correct order', () => {
      // Simulate adding blocks via event
      window.dispatchEvent(new CustomEvent('block-placed', {
        detail: { slotIndex: 0, commandType: COMMAND_TYPES.FORWARD }
      }));
      window.dispatchEvent(new CustomEvent('block-placed', {
        detail: { slotIndex: 1, commandType: COMMAND_TYPES.TURN_LEFT }
      }));
      window.dispatchEvent(new CustomEvent('block-placed', {
        detail: { slotIndex: 2, commandType: COMMAND_TYPES.FORWARD }
      }));

      const commands = commandPanel.getCommands();
      expect(commands).toEqual([
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.TURN_LEFT,
        COMMAND_TYPES.FORWARD
      ]);
    });

    test('should skip empty slots in command sequence', () => {
      window.dispatchEvent(new CustomEvent('block-placed', {
        detail: { slotIndex: 0, commandType: COMMAND_TYPES.FORWARD }
      }));
      // Skip slot 1
      window.dispatchEvent(new CustomEvent('block-placed', {
        detail: { slotIndex: 2, commandType: COMMAND_TYPES.TURN_RIGHT }
      }));

      const commands = commandPanel.getCommands();
      expect(commands).toEqual([
        COMMAND_TYPES.FORWARD,
        COMMAND_TYPES.TURN_RIGHT
      ]);
    });
  });

  describe('clear', () => {
    test('should remove all blocks from slots', () => {
      // Add blocks
      window.dispatchEvent(new CustomEvent('block-placed', {
        detail: { slotIndex: 0, commandType: COMMAND_TYPES.FORWARD }
      }));
      window.dispatchEvent(new CustomEvent('block-placed', {
        detail: { slotIndex: 1, commandType: COMMAND_TYPES.TURN_LEFT }
      }));

      expect(commandPanel.getCommands()).toHaveLength(2);

      commandPanel.clear();

      expect(commandPanel.getCommands()).toEqual([]);
    });
  });

  describe('block placement via events', () => {
    test('should handle block-placed event', () => {
      window.dispatchEvent(new CustomEvent('block-placed', {
        detail: { slotIndex: 0, commandType: COMMAND_TYPES.FORWARD }
      }));

      expect(commandPanel.slots[0].hasBlock()).toBe(true);
    });

    test('should ignore placement for invalid slot index', () => {
      window.dispatchEvent(new CustomEvent('block-placed', {
        detail: { slotIndex: 99, commandType: COMMAND_TYPES.FORWARD }
      }));

      expect(commandPanel.getCommands()).toEqual([]);
    });

    test('should handle block-clicked event by finding first empty slot', () => {
      // Fill first two slots
      window.dispatchEvent(new CustomEvent('block-placed', {
        detail: { slotIndex: 0, commandType: COMMAND_TYPES.FORWARD }
      }));
      window.dispatchEvent(new CustomEvent('block-placed', {
        detail: { slotIndex: 1, commandType: COMMAND_TYPES.TURN_LEFT }
      }));

      // Trigger block-clicked (should go to slot 2)
      window.dispatchEvent(new CustomEvent('block-clicked', {
        detail: { commandType: COMMAND_TYPES.TURN_RIGHT }
      }));

      expect(commandPanel.slots[2].hasBlock()).toBe(true);
      expect(commandPanel.slots[2].getBlock().getCommandType()).toBe(COMMAND_TYPES.TURN_RIGHT);
    });

    test('should not add block when all slots are full', () => {
      // Fill all slots
      for (let i = 0; i < 4; i++) {
        window.dispatchEvent(new CustomEvent('block-placed', {
          detail: { slotIndex: i, commandType: COMMAND_TYPES.FORWARD }
        }));
      }

      // Try to add one more
      window.dispatchEvent(new CustomEvent('block-clicked', {
        detail: { commandType: COMMAND_TYPES.TURN_LEFT }
      }));

      // Should still only have 4 commands
      expect(commandPanel.getCommands()).toHaveLength(4);
    });
  });

  describe('highlighting', () => {
    test('should highlight specific slot by index', () => {
      commandPanel.highlightSlot(1);

      const slot = commandPanel.getElement().querySelectorAll('.block-slot')[1];
      expect(slot.classList.contains('active')).toBe(true);
    });

    test('should unhighlight all slots', () => {
      commandPanel.highlightSlot(0);
      commandPanel.highlightSlot(1);

      commandPanel.unhighlightAll();

      const slots = commandPanel.getElement().querySelectorAll('.block-slot');
      slots.forEach(slot => {
        expect(slot.classList.contains('active')).toBe(false);
      });
    });
  });
});
