# LogicPath - Architecture

## Design Pattern: Atomic Design

This project follows Brad Frost's Atomic Design methodology, organizing UI components from smallest to largest:

### Atoms (`src/atoms/`)
Basic building blocks that can't be broken down further:
- `Block.js` - Individual command block (Forward, Left, Right)
- `Cell.js` - Single grid cell on the game board
- `Button.js` - Reusable button component
- `Icon.js` - SVG icon wrapper

### Molecules (`src/molecules/`)
Simple combinations of atoms:
- `BlockSlot.js` - Container for a single block in command panel
- `GridCell.js` - Board cell with styling and state
- `MapThumbnail.js` - Small preview of a map

### Organisms (`src/organisms/`)
Complex components that form distinct sections:
- `CommandPanel.js` - The 4-slot programming interface
- `GameBoard.js` - The playable grid with robot
- `Avatar.js` - The robot character
- `MapSelector.js` - Interface for choosing maps
- `AboutModal.js` - Information and credits dialog
- `ControlBar.js` - Play, restart, map, about buttons

### Templates
Page-level structures combining organisms (if needed)

### Pages
Specific instances of templates (if needed)

## Core Logic (`src/core/`)

### Map System
- **MapLoader.js**: Loads JSON maps from `/maps` folder
- **Map.js**: Represents the game grid and tile data
- **MapSchema**: JSON format for defining maps

#### Map JSON Format
```json
{
  "id": "map1",
  "name": "Getting Started",
  "description": "Learn the basics",
  "gridSize": { "rows": 6, "cols": 6 },
  "tiles": [
    { "row": 0, "col": 0, "type": "grass" },
    { "row": 0, "col": 1, "type": "water" }
  ],
  "robot": {
    "startPosition": { "row": 0, "col": 0 },
    "startDirection": "north"
  },
  "goal": { "row": 5, "col": 5 }
}
```

### Game Logic
- **Robot.js**: Robot state (position, direction), movement methods
- **CommandExecutor.js**: Executes command sequences with animation
- **Direction.js**: Direction enum and rotation logic

## State Management

Since this is vanilla JavaScript, state is managed through:
1. **Class instances**: Robot, Map hold their own state
2. **DOM state**: Component state reflected in DOM attributes
3. **Event system**: Custom events for component communication

## File Structure

```
src/
├── atoms/
│   ├── Block.js
│   ├── Cell.js
│   ├── Button.js
│   └── Icon.js
├── molecules/
│   ├── BlockSlot.js
│   ├── GridCell.js
│   └── MapThumbnail.js
├── organisms/
│   ├── CommandPanel.js
│   ├── GameBoard.js
│   ├── Avatar.js
│   ├── MapSelector.js
│   ├── AboutModal.js
│   └── ControlBar.js
├── core/
│   ├── Robot.js
│   ├── Map.js
│   ├── MapLoader.js
│   ├── CommandExecutor.js
│   └── Direction.js
├── utils/
│   ├── events.js
│   └── animations.js
└── index.js
```

## Data Flow

1. User selects/places blocks in CommandPanel
2. User clicks "Run" button
3. CommandExecutor receives block sequence
4. Executor calls Robot methods (moveForward, turnLeft, turnRight)
5. Robot updates position/direction
6. Events trigger UI updates (Avatar animation, cell highlighting)
7. Check if goal reached

## Event System

Custom events for communication:
- `block-placed`: Block added to command panel
- `block-removed`: Block removed from panel
- `command-executed`: Single command completed
- `sequence-complete`: All commands executed
- `goal-reached`: Robot reached destination
- `map-changed`: New map loaded

## Animation Strategy

- CSS transitions for smooth movements
- JavaScript coordinates animation timing
- Command execution is sequential (wait for one to finish before next)
- Speed can be adjusted (future feature)

## Extensibility

The architecture supports future features:
- **Function blocks**: Reusable subroutines (like Cubetto's blue function block)
- **More commands**: Jump, wait, repeat
- **Obstacles**: Walls, locked doors
- **Collectibles**: Items to pick up along the way
- **Multi-step goals**: Visit multiple locations
- **Map editor**: Create custom maps in the browser
