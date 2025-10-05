/**
 * Debug script for Map 2 movement issue
 */

import { Map as GameMap } from './public/core/Map.js';
import { Robot } from './public/core/Robot.js';
import { CommandExecutor, COMMAND_TYPES } from './public/core/CommandExecutor.js';
import { readFileSync } from 'fs';

const map2Data = JSON.parse(readFileSync('./public/maps/map2.json', 'utf8'));

// Create map and robot
const map = new GameMap(map2Data);
const robot = new Robot(map.getStartPosition(), map.getStartDirection());

console.log('=== Map 2 Debug ===');
console.log('Grid size:', map.gridSize);
console.log('Robot start:', robot.getPosition(), 'facing:', robot.getDirection());
console.log('Goal:', map.getGoal());

// Check specific tiles
console.log('\n=== Tile Walkability ===');
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 6; col++) {
    const pos = { row, col };
    const tile = map.getTile(pos);
    const walkable = map.isWalkable(pos);
    console.log(`(${row},${col}):`, tile?.type, '- walkable:', walkable);
  }
}

// Test movement sequence
console.log('\n=== Movement Test ===');
console.log('Position:', robot.getPosition(), 'Direction:', robot.getDirection());

// Turn right (should face south)
robot.rotateRight();
console.log('After Turn Right - Position:', robot.getPosition(), 'Direction:', robot.getDirection());

// Try forward twice
for (let i = 1; i <= 2; i++) {
  const nextPos = robot.getNextPosition();
  const canMove = map.isWalkable(nextPos);
  console.log(`\nForward ${i}:`);
  console.log('  Next position would be:', nextPos);
  console.log('  Is walkable:', canMove);

  if (canMove) {
    robot.moveForward();
    console.log('  Moved to:', robot.getPosition());
  } else {
    console.log('  BLOCKED - cannot move');
    const tile = map.getTile(nextPos);
    console.log('  Tile at next pos:', tile);
  }
}
