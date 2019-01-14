import Square from "./square";

export default class {
  constructor(w, h) {
    this.w = w
    this.h = h
    this.element = document.getElementById('grid')
    this.grid = this.createGrid(w, h)
    this.fillShape([0,2],[1,1],[1,2],[1,3])
    this.draw()
  }

  /**
   * Creates a 2-dimensional array filled with Squares, representing a grid.
   */
  createGrid(w, h) {
    let result = []
    for (let column = 0; column < w; column++) {
      result.push([])
      for (let row = 0; row < h; row++) {
        result[column].push(new Square())
      }
    }
    return result
  }

  /**
   * Finds Square at given point in grid.
   */
  square(x, y) {
    return this.grid[x][y]
  }

  /**
   * Fills squares that match given coordinates.
   * @param  {...[int, int]} coordinates - separate arrays of squares to fill.
   */
  fillShape(...coordinates) {
    coordinates.forEach(c => {
      this.square(c[0], c[1]).fill()
    })
  }

  /**
   * Draws the current grid to the DOM.
   */
  draw() {
    this.clear()
    this.grid.forEach((column, x) => {
      this.element.appendChild(this.createColumn(x))
      column.forEach((square, y) => {
        this.element.lastChild.appendChild(this.createSquare(x, y))
      })
    })
  }

  createColumn(x) {
    const columnDiv = document.createElement('div')
    columnDiv.className = 'column'
    columnDiv.id = 'column_' + x
    return columnDiv
  }

  createSquare(x, y) {
    const squareDiv = document.createElement('div')
    squareDiv.className = 'square'
    squareDiv.id = 'row_' + y
    squareDiv.innerHTML = x
    if (this.square(x, y).filled) {
      squareDiv.classList.add('filled')
    }
    return squareDiv
  }

  /**
   * Clears all contents in DOM #grid element.
   */
  clear() {
    while (this.element.firstChild) this.element.removeChild(this.element.firstChild)
  }
}