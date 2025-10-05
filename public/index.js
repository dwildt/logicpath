/**
 * LogicPath - Main entry point
 */

import { MapLoader } from './core/MapLoader.js';
import { Robot } from './core/Robot.js';
import { CommandExecutor } from './core/CommandExecutor.js';
import { GameBoard } from './organisms/GameBoard.js';
import { CommandPanel } from './organisms/CommandPanel.js';
import { ControlBar } from './organisms/ControlBar.js';
import { MapSelector } from './organisms/MapSelector.js';
import { AboutModal } from './organisms/AboutModal.js';

class LogicPath {
  constructor() {
    this.mapLoader = new MapLoader('./maps');
    this.currentMap = null;
    this.robot = null;
    this.executor = null;
    this.gameBoard = null;
    this.commandPanel = null;
    this.controlBar = null;
    this.mapSelector = null;
    this.aboutModal = null;

    this.init();
  }

  async init() {
    // Create UI components
    this.commandPanel = new CommandPanel(8);
    this.controlBar = new ControlBar({
      onPlay: () => this.handlePlay(),
      onRestart: () => this.handleRestart(),
      onClear: () => this.handleClear(),
      onMapSelect: () => this.handleMapSelect(),
      onAbout: () => this.handleAbout()
    });
    this.mapSelector = new MapSelector((mapId) => this.loadMap(mapId));
    this.aboutModal = new AboutModal();

    // Append to DOM
    const app = document.getElementById('app');

    this.gameBoardContainer = document.createElement('div');
    this.gameBoardContainer.id = 'game-board-container';
    app.appendChild(this.gameBoardContainer);

    app.appendChild(this.controlBar.getElement());
    app.appendChild(this.commandPanel.getElement());
    app.appendChild(this.mapSelector.getElement());
    app.appendChild(this.aboutModal.getElement());

    // Load maps for selector
    await this.mapSelector.loadMaps(this.mapLoader);

    // Load first map
    await this.loadMap('map1');

    // Setup event listeners
    this.setupEventListeners();
  }

  async loadMap(mapId) {
    try {
      // Clear existing board
      if (this.gameBoard) {
        this.gameBoard.destroy();
      }

      // Load new map
      this.currentMap = await this.mapLoader.loadMap(mapId);

      // Create robot
      this.robot = new Robot(
        this.currentMap.getStartPosition(),
        this.currentMap.getStartDirection()
      );

      // Create executor
      this.executor = new CommandExecutor(this.robot, this.currentMap);

      // Create game board
      this.gameBoard = new GameBoard(this.currentMap, this.robot);
      this.gameBoardContainer.innerHTML = '';
      this.gameBoardContainer.appendChild(this.gameBoard.getElement());

      // Clear command panel
      this.commandPanel.clear();

      console.log(`Loaded map: ${this.currentMap.name}`);
    } catch (error) {
      console.error('Error loading map:', error);
      alert('Failed to load map. Please try again.');
    }
  }

  setupEventListeners() {
    // Command execution events
    window.addEventListener('command-start', (e) => {
      this.commandPanel.highlightSlot(e.detail.index);
    });

    window.addEventListener('command-complete', async (e) => {
      this.commandPanel.unhighlightAll();

      if (e.detail.result.success) {
        const avatar = this.gameBoard.getAvatar();
        if (e.detail.command === 'forward') {
          await avatar.animateMove();
        } else {
          await avatar.animateRotate();
        }
      }
    });

    window.addEventListener('goal-reached', async () => {
      const avatar = this.gameBoard.getAvatar();
      await avatar.celebrate();
      setTimeout(() => {
        alert('🎉 Congratulations! You reached the goal!');
      }, 500);
    });
  }

  async handlePlay() {
    const commands = this.commandPanel.getCommands();

    if (commands.length === 0) {
      alert('Please add some commands first!');
      return;
    }

    console.log('Executing commands:', commands);
    this.controlBar.setPlayDisabled(true);

    try {
      const result = await this.executor.execute(commands);
      console.log('Execution result:', result);

      if (!result.success && !result.goalReached) {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Execution error:', error);
      alert('An error occurred during execution.');
    }

    this.controlBar.setPlayDisabled(false);
  }

  handleRestart() {
    this.robot.reset();
    this.gameBoard.getAvatar().reset();
    this.commandPanel.clear();
    this.gameBoard.unhighlightAll();
  }

  handleClear() {
    this.commandPanel.clear();
  }

  handleMapSelect() {
    this.mapSelector.open();
  }

  handleAbout() {
    this.aboutModal.open();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new LogicPath());
} else {
  new LogicPath();
}
