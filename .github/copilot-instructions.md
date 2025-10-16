# GitHub Copilot Instructions for LogicPath

## Project Overview

LogicPath is an educational coding game inspired by Cubetto, designed to teach programming logic and computational thinking. It's a vanilla JavaScript application that uses visual programming blocks to guide a robot through grid-based puzzles.

**Key Technologies:**
- Vanilla JavaScript (ES6+) - No frameworks
- Atomic Design pattern for component architecture
- Jest for unit testing
- Cypress for E2E testing
- ESLint for code quality
- GitHub Pages for deployment

## Architecture Pattern: Atomic Design

This project strictly follows Brad Frost's Atomic Design methodology. When creating or modifying components, always respect this hierarchy:

### Component Layers

1. **Atoms** (`src/atoms/`): Basic building blocks
   - `Block.js` - Individual command block
   - `Cell.js` - Single grid cell
   - `Button.js` - Reusable button
   - `Icon.js` - SVG icon wrapper

2. **Molecules** (`src/molecules/`): Simple combinations
   - `BlockSlot.js` - Container for a block
   - `GridCell.js` - Board cell with styling
   - `MapThumbnail.js` - Map preview

3. **Organisms** (`src/organisms/`): Complex components
   - `CommandPanel.js` - Programming interface
   - `GameBoard.js` - Playable grid
   - `Avatar.js` - Robot character
   - `MapSelector.js` - Map chooser
   - `AboutModal.js` - Info dialog
   - `ControlBar.js` - Control buttons

4. **Core Logic** (`src/core/`): Game mechanics
   - `Robot.js` - Robot state and movement
   - `Map.js` - Grid and tile data
   - `MapLoader.js` - JSON map loading
   - `CommandExecutor.js` - Command execution
   - `Direction.js` - Direction utilities

## Code Style Guidelines

### JavaScript Standards
- Use ES6+ features (classes, arrow functions, template literals)
- Follow ESLint rules in `.eslintrc.json`
- Use single quotes for strings
- 2-space indentation
- Semicolons required
- No console.log in production code (use for debugging only)

### Naming Conventions
- Classes: `PascalCase` (e.g., `CommandPanel`)
- Functions/variables: `camelCase` (e.g., `executeCommand`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_COMMANDS`)
- Private methods: prefix with underscore `_methodName`
- Files: Match class names (e.g., `CommandPanel.js`)

### Component Structure
```javascript
export class ComponentName {
  constructor(options = {}) {
    // Initialize properties
    this.property = options.property || defaultValue;
    
    // Create element
    this.element = this.render();
    
    // Attach event listeners
    this.attachEventListeners();
  }

  render() {
    const element = document.createElement('div');
    element.className = 'component-name';
    // Build DOM structure
    return element;
  }

  attachEventListeners() {
    // Add event listeners
  }

  destroy() {
    // Cleanup
  }
}
```

## Testing Guidelines

### Unit Tests (Jest)
- Test files: `tests/unit/ComponentName.test.js`
- Test all core logic components
- Test component rendering and behavior
- Aim for 70%+ code coverage
- Use descriptive test names

```javascript
import { ComponentName } from '../../src/path/ComponentName.js';

describe('ComponentName', () => {
  it('should create an element', () => {
    const component = new ComponentName();
    expect(component.element).toBeInstanceOf(HTMLElement);
  });
  
  it('should handle user interaction', () => {
    // Test behavior
  });
});
```

### E2E Tests (Cypress)
- Test files: `tests/e2e/*.cy.js`
- Test critical user flows
- Use data attributes for selectors (e.g., `data-block`, `data-button`)
- Test game completion scenarios

## Map System

Maps are JSON files in the `/maps` folder. When creating or modifying maps:

### Map JSON Schema
```json
{
  "id": "unique-map-id",
  "name": "Display Name",
  "description": "Brief description",
  "gridSize": { "rows": 6, "cols": 6 },
  "tiles": [
    { "row": 0, "col": 0, "type": "grass", "walkable": true }
  ],
  "robot": {
    "startPosition": { "row": 0, "col": 0 },
    "startDirection": "north"
  },
  "goal": { "row": 5, "col": 5 }
}
```

**Tile Types:**
- `grass` - Walkable ground (green)
- `water` - Not walkable (blue)
- `sand` - Walkable (yellow)
- `forest` - Walkable with trees (dark green)
- `mountain` - Not walkable (gray)
- `path` - Walkable path (brown)

**Directions:** `north`, `east`, `south`, `west`

## Common Tasks

### Adding a New Component
1. Choose correct layer (Atom, Molecule, or Organism)
2. Create file in appropriate directory
3. Follow component structure pattern
4. Export as ES6 module
5. Write unit tests
6. Import and use in parent component

### Adding a New Command Type
1. Update `Block.js` with new command type
2. Add command logic to `CommandExecutor.js`
3. Update `Robot.js` if needed
4. Add tests for new command
5. Update UI in `CommandPanel.js`

### Creating a New Map
1. Create JSON file in `/maps` folder
2. Follow map schema exactly
3. Test map is loadable and solvable
4. Add to map list (auto-discovered)

## Event System

The project uses custom events for component communication:
- `block-placed` - Block added to command panel
- `block-removed` - Block removed from panel
- `command-executed` - Single command completed
- `sequence-complete` - All commands executed
- `goal-reached` - Robot reached destination
- `map-changed` - New map loaded

When adding features that need cross-component communication, use these events or add new ones following the same pattern.

## Performance Considerations

- Keep animations under 500ms
- Limit map size to 10x10 for performance
- Use CSS transforms for animations (GPU accelerated)
- Avoid memory leaks - always cleanup event listeners in `destroy()` methods
- Debounce user input when necessary

## Best Practices

1. **No Framework Dependencies**: Keep the project vanilla JavaScript
2. **Component Isolation**: Components should be self-contained and reusable
3. **Accessibility**: Use semantic HTML and ARIA attributes when appropriate
4. **Icon-Based UI**: Keep interface language-agnostic with icons
5. **Mobile-First**: Ensure responsive design works on all devices
6. **Clean Code**: Write readable, maintainable code with clear intent
7. **Documentation**: Add JSDoc comments for complex functions
8. **Git Commits**: Use clear, descriptive commit messages

## Deployment

- Main branch auto-deploys to GitHub Pages via GitHub Actions
- Public folder is deployed to https://dwildt.github.io/logicpath
- All build artifacts go in `public/` directory
- Never commit `node_modules/` or temporary files

## Resources

- [Atomic Design](https://atomicdesign.bradfrost.com/)
- [Cubetto FAQ](https://primotoys.com/faq/)
- [Project Documentation](.claude/)

## Questions?

Refer to:
- `.claude/PROJECT_OVERVIEW.md` - Project goals and concept
- `.claude/ARCHITECTURE.md` - Detailed architecture
- `.claude/DEVELOPMENT.md` - Development workflow
- `README.md` - Quick start and features
