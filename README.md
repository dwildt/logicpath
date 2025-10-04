# 🤖 LogicPath

A Cubetto-inspired visual programming game that teaches coding concepts through play. Guide a robot through grid-based puzzles using simple command blocks.

[![Deploy to GitHub Pages](https://github.com/dwildt/logicpath/actions/workflows/deploy.yml/badge.svg)](https://github.com/dwildt/logicpath/actions/workflows/deploy.yml)
[![CI](https://github.com/dwildt/logicpath/actions/workflows/ci.yml/badge.svg)](https://github.com/dwildt/logicpath/actions/workflows/ci.yml)

## 🎮 Play Now

**[https://dwildt.github.io/logicpath](https://dwildt.github.io/logicpath)**

## ✨ Features

- 🎯 **Visual Programming** - No typing required, just drag and drop blocks
- 🗺️ **Multiple Maps** - Progressively challenging levels
- 🌐 **Language-Agnostic** - Icon-based interface works in any language
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🎨 **Beautiful UI** - Clean, modern design with smooth animations
- 🧪 **Well-Tested** - Comprehensive unit and E2E tests

## 🎯 How to Play

1. **Place command blocks** in the program slots:
   - 🟢 **Forward** - Move one space ahead
   - 🟡 **Turn Left** - Rotate 90° left
   - 🔵 **Turn Right** - Rotate 90° right

2. **Press Play** ▶️ to execute your program

3. **Reach the goal** 🎯 to complete the level!

4. **Use Restart** 🔄 to reset and try again

## 🛠️ Technology Stack

- **Vanilla JavaScript (ES6+)** - No frameworks, pure JS
- **Atomic Design** - Component-based architecture
- **Jest** - Unit testing
- **Cypress** - End-to-end testing
- **ESLint** - Code quality
- **GitHub Pages** - Deployment

## 🚀 Development

### Prerequisites

- Node.js 18.x or 20.x
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/dwildt/logicpath.git
cd logicpath

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:8080` to see the game.

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm test                 # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Open Cypress for E2E testing
npm run lint             # Check code with ESLint
npm run lint:fix         # Auto-fix ESLint issues
```

## 🗺️ Creating Custom Maps

Maps are JSON files stored in the `/maps` folder. Here's the structure:

```json
{
  "id": "my-map",
  "name": "My Custom Map",
  "description": "A fun puzzle!",
  "gridSize": { "rows": 6, "cols": 6 },
  "tiles": [
    { "row": 0, "col": 0, "type": "grass", "walkable": true },
    { "row": 0, "col": 1, "type": "water", "walkable": false }
  ],
  "robot": {
    "startPosition": { "row": 0, "col": 0 },
    "startDirection": "north"
  },
  "goal": { "row": 5, "col": 5 }
}
```

**Tile Types**: `grass`, `water`, `sand`, `forest`, `mountain`
**Directions**: `north`, `east`, `south`, `west`

See `.claude/DEVELOPMENT.md` for detailed documentation.

## 🏗️ Architecture

The project follows [Atomic Design](https://atomicdesign.bradfrost.com/) principles:

```
src/
├── atoms/          # Basic UI elements (Block, Cell, Button, Icon)
├── molecules/      # Simple components (BlockSlot, MapThumbnail)
├── organisms/      # Complex components (GameBoard, CommandPanel)
├── core/           # Game logic (Robot, Map, CommandExecutor)
└── utils/          # Helpers (events, animations)
```

See `.claude/ARCHITECTURE.md` for detailed architecture documentation.

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Related Projects

Interested in physical coding toys? Check these out:

- [**Qobo**](https://amzn.to/46NQMhF) - Snail-shaped coding robot for kids 3+
- [**Cubetto**](https://primotoys.com) - The wooden robot that inspired this project

## 💖 Support

If you find this project useful, consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs or requesting features
- 💰 [Sponsoring the project](https://github.com/sponsors/dwildt)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Cubetto](https://primotoys.com) by Primo Toys
- Built with [Claude Code](https://claude.com/claude-code) - AI-powered development assistant
- Icon design based on Feather Icons

## 📖 Documentation

- [Project Overview](.claude/PROJECT_OVERVIEW.md)
- [Architecture Guide](.claude/ARCHITECTURE.md)
- [Development Guide](.claude/DEVELOPMENT.md)

---

**Made with ❤️ and Claude Code**
