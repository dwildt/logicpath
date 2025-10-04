# LogicPath - Project Overview

## Description

LogicPath is an educational coding game inspired by [Cubetto](https://primotoys.com), designed to teach programming logic and computational thinking to children and beginners. Players use visual programming blocks to guide a robot avatar through a grid-based map.

## Inspiration

The game is based on the Cubetto physical programming toy, which uses wooden blocks to teach coding concepts without screens. LogicPath brings this concept to the web, making it accessible to anyone with a browser.

## Core Concept

- **Command Blocks**: Players have three types of blocks:
  - **Forward** (Green): Moves the robot one space forward
  - **Turn Left** (Yellow): Rotates the robot 90° left
  - **Turn Right** (Blue): Rotates the robot 90° right

- **Command Panel**: A sequence of 4 slots where players place blocks to create a program

- **Execution**: When the player presses "Run", the robot executes the commands in sequence

- **Goal**: Navigate the robot from start to finish on various themed maps

## Educational Goals

1. **Sequencing**: Understanding that commands execute in order
2. **Planning**: Thinking ahead to solve puzzles
3. **Debugging**: Identifying and fixing incorrect sequences
4. **Spatial Reasoning**: Visualizing movement and rotation
5. **Problem Solving**: Finding efficient paths

## Target Audience

- Children (ages 5+)
- Programming beginners
- Educators teaching computational thinking
- Parents looking for educational games

## Technical Goals

- Vanilla JavaScript (no frameworks)
- Atomic Design pattern for maintainability
- Fully accessible and icon-based (language-agnostic)
- GitHub Pages deployment
- Comprehensive testing (Jest + Cypress)

## Built With

This project was created with assistance from [Claude Code](https://claude.com/claude-code), Anthropic's AI-powered development tool.

## Repository

https://github.com/dwildt/logicpath

## Live Demo

https://dwildt.github.io/logicpath

## License

MIT License - See LICENSE file for details
