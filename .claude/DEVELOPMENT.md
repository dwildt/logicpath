# LogicPath - Development Guide

## Prerequisites

- Node.js 18.x or 20.x
- npm (comes with Node.js)
- Git

## Setup

1. **Clone the repository**
```bash
git clone https://github.com/dwildt/logicpath.git
cd logicpath
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

This starts a local server at `http://localhost:8080`

## Project Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (copies files to public/)
- `npm test` - Run Jest unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run test:e2e` - Open Cypress for E2E testing
- `npm run test:e2e:headless` - Run Cypress tests in CI mode
- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Auto-fix ESLint issues

## Development Workflow

### 1. Creating New Components

Follow Atomic Design principles:

**Atoms** (basic elements):
```javascript
// src/atoms/ExampleAtom.js
export class ExampleAtom {
  constructor(options) {
    this.element = this.render();
  }

  render() {
    const el = document.createElement('div');
    el.className = 'example-atom';
    return el;
  }
}
```

**Molecules** (simple combinations):
```javascript
// src/molecules/ExampleMolecule.js
import { ExampleAtom } from '../atoms/ExampleAtom.js';

export class ExampleMolecule {
  constructor(options) {
    this.atom = new ExampleAtom();
    this.element = this.render();
  }

  render() {
    const el = document.createElement('div');
    el.className = 'example-molecule';
    el.appendChild(this.atom.element);
    return el;
  }
}
```

### 2. Writing Tests

**Unit tests** (Jest):
```javascript
// tests/unit/ExampleAtom.test.js
import { ExampleAtom } from '../../src/atoms/ExampleAtom.js';

describe('ExampleAtom', () => {
  it('should create an element', () => {
    const atom = new ExampleAtom();
    expect(atom.element).toBeInstanceOf(HTMLElement);
  });
});
```

**E2E tests** (Cypress):
```javascript
// tests/e2e/game.cy.js
describe('Game Flow', () => {
  it('should complete a simple level', () => {
    cy.visit('/');
    cy.get('[data-block="forward"]').click();
    cy.get('[data-button="play"]').click();
    cy.get('[data-robot]').should('have.attr', 'data-position', '0,1');
  });
});
```

### 3. Creating New Maps

Maps are JSON files in the `/maps` folder:

```json
{
  "id": "custom-map",
  "name": "My Custom Map",
  "description": "A fun puzzle",
  "gridSize": { "rows": 8, "cols": 8 },
  "tiles": [
    { "row": 0, "col": 0, "type": "grass", "walkable": true },
    { "row": 0, "col": 1, "type": "water", "walkable": false },
    { "row": 0, "col": 2, "type": "grass", "walkable": true }
  ],
  "robot": {
    "startPosition": { "row": 0, "col": 0 },
    "startDirection": "north"
  },
  "goal": { "row": 7, "col": 7 }
}
```

**Tile Types**:
- `grass` - Walkable ground
- `water` - Not walkable
- `sand` - Walkable
- `forest` - Walkable with trees
- `mountain` - Not walkable
- `path` - Walkable path

**Directions**: `north`, `east`, `south`, `west`

After adding a map JSON file, it will automatically appear in the map selector.

## Code Style

- Use ES6+ features
- Follow ESLint rules (see `.eslintrc.json`)
- Use single quotes for strings
- 2-space indentation
- Semicolons required
- Class names: PascalCase
- Function/variable names: camelCase
- Constants: UPPER_SNAKE_CASE

## Testing Guidelines

- Write tests for all core logic (Robot, Map, etc.)
- Test components in isolation
- Aim for 70%+ code coverage
- E2E tests for critical user flows
- Test edge cases (empty command panel, invalid moves, etc.)

## Git Workflow

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -m "Add my feature"`
3. Push: `git push origin feature/my-feature`
4. Create Pull Request on GitHub
5. Wait for CI to pass (tests, linting)
6. Merge when approved

## Deployment

The project automatically deploys to GitHub Pages when you push to `main`:

1. GitHub Actions runs tests and linting
2. If passing, builds the project
3. Deploys `public/` folder to `gh-pages` branch
4. Available at: https://dwildt.github.io/logicpath

## Adding Related Products

Edit `related-products.json` to add educational coding toys:

```json
{
  "products": [
    {
      "name": "Qobo",
      "description": "Snail coding robot",
      "url": "https://amzn.to/46NQMhF",
      "image": "qobo-thumbnail.jpg"
    }
  ]
}
```

## Debugging Tips

1. **Check browser console** for errors
2. **Use breakpoints** in DevTools
3. **Run individual tests**: `npm test -- ExampleAtom.test.js`
4. **Check ESLint**: `npm run lint`
5. **Visual debugging**: Add `data-*` attributes to elements

## Performance Considerations

- Keep animations under 500ms for responsiveness
- Limit map size to 10x10 for performance
- Use CSS transforms for animations (GPU accelerated)
- Debounce user input if needed

## Browser Support

Targeting modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with ES6 support

## Contributing

1. Check existing issues or create a new one
2. Fork the repository
3. Create your feature branch
4. Write tests
5. Submit Pull Request

## Resources

- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Cubetto FAQ](https://primotoys.com/faq/)
- [Jest Documentation](https://jestjs.io/)
- [Cypress Documentation](https://www.cypress.io/)
- [ESLint Rules](https://eslint.org/docs/rules/)

## Built With Claude Code

This project was developed with assistance from Claude Code, Anthropic's AI-powered development tool. For questions or issues, please visit the GitHub repository.
