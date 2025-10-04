/**
 * Cell atom - grid cell component
 */

export class Cell {
  constructor(row, col, tileData) {
    this.row = row;
    this.col = col;
    this.tileData = tileData;
    this.element = this.render();
  }

  render() {
    const cell = document.createElement('div');
    cell.className = `cell cell-${this.tileData.type}`;
    cell.setAttribute('data-row', this.row);
    cell.setAttribute('data-col', this.col);
    cell.setAttribute('data-walkable', this.tileData.walkable);

    return cell;
  }

  getElement() {
    return this.element;
  }

  highlight() {
    this.element.classList.add('highlighted');
  }

  unhighlight() {
    this.element.classList.remove('highlighted');
  }

  setGoal() {
    this.element.classList.add('goal');
    this.element.innerHTML = '<div class="goal-marker">🎯</div>';
  }

  setStart() {
    this.element.classList.add('start');
  }

  destroy() {
    this.element.remove();
  }
}
