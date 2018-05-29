import WriteGrid from './writeGrid'
import buildGridData from './buildGridData'
import Solver from './solve'
import {consts, Game} from './game'

function onClickCell(game, cell) {
  console.log('cell', cell)
  const code = game.guess(cell.row, cell.col)
  const div = document.querySelector('.click-info')
  div.innerHTML = `<code><strong>${game.codeToString(code)}</strong></code> Guess count <strong>${game.totalGuesses}</strong> `
  if (code === 0) {
    setTimeout(function() {
      $('#myModal').modal()
    }, 200)
  }
  return {totalGuesses: game.totalGuesses, code}
}

function onGuess (grid, row, col, res) {
  grid.drawGuess(row, col, res)
}

function onChangeBounds (lo, hi) {
  grid.drawBounds(lo, hi)
}

function createGame (selector, numRows, numCols, treasureRow, treasureCol, dim, targetWidth, targetHeight, shouldSolve) {
  window.game = new Game(numRows, numCols, treasureRow, treasureCol)
  window.gridData = buildGridData(numRows, numCols, treasureRow, treasureCol, dim)
  window.grid = new WriteGrid(selector, targetWidth, targetHeight, gridData, onClickCell.bind(null, game))
  console.log('shouldSolve', shouldSolve)
  if (shouldSolve) {
    const solver = new Solver(game, numRows, numCols, onGuess.bind(null, grid))
    const ans = solver.solve()
    console.log('🏁', ans)
    if (ans === undefined) {
      throw new Error('undefined')
    }
  }
}

function writeInfo (actualCells, expectedMin, expectedMax) {
  const info = document.querySelector('.info')
  info.innerHTML = `<div>Sqaures <strong>${actualCells}</strong> Optimal guesses <strong>${expectedMin} to ${expectedMax}</strong></div>`
}

function calcDimensionsFromWindow (cells, dim) {
  const windowWidth = $(window).width()
  let targetWidth = windowWidth - 100
  let numCols = Math.floor(targetWidth / dim)
  let numRows = Math.floor(cells / numCols)
  if (cells < numCols) {
    // If the screen is wider than the number for cells
    numRows = 1
    numCols = cells
  }
  targetWidth  = dim * numCols
  const targetHeight = numRows * dim
  const actualCells = numCols * numRows
  console.log('🎬')
  console.log('numCols, numRows', numCols, numRows)
  console.log('actual years', actualCells / 365)
  console.log('sqaures', actualCells)
  return { targetWidth, targetHeight, numRows, numCols, actualCells }
}

function basicGame (selector, cells, dim, treasureRow = null, treasureCol = null, shouldSolve) {
  const { targetWidth, targetHeight, numRows, numCols, actualCells } = calcDimensionsFromWindow(cells, dim)

  const random = randomTreasure(numRows, numCols)

  if (treasureRow === null || treasureRow > numRows - 1) {
    treasureRow = random[0]
  } else if (treasureCol === null || treasureCol > numCols - 1) {
    treasureCol = random[1]
  }

  // TODO: double check
  const expectedMax = Math.ceil(2 * Math.log2(actualCells))
  const expectedMin = Math.ceil(Math.log2(actualCells))
  console.log('🎁', treasureRow, treasureCol)
  console.log('Optimal Guesses', expectedMin, expectedMax)

  writeInfo(actualCells, expectedMin, expectedMax)
  createGame(selector, numRows, numCols, treasureRow, treasureCol, dim, targetWidth, targetHeight, shouldSolve)
}

function randomTreasure (numRows, numCols) {
  return [
    Math.floor(Math.random() * numRows),
    Math.floor(Math.random() * numCols)
  ]
}

function bigGame () {
  basicGame('#grid', 9, 50, 0, 5, false)
}

function createElement (htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function main () {
  bigGame()
  if (location.search.indexOf('dev=1') === -1) return
  let cells
  let dim = 50
  for (let testN = 9; testN < 17; testN ++) {
    for (let i = 0; i < testN; i ++) {
      var id = `grid-${testN}-${i}`
      var elem = createElement(`<div id="${id}" class="grid"></div>`)
      document.body.appendChild(elem)
      basicGame(`#${id}`, testN, dim, 0, i, true)
    }
  }
  return
  cells = 3
  for (let i = 0; i < cells; i ++) {
    var elem = document.createElement('div')
    var id = `grid${i}`
    elem.id = id
    elem.className = 'grid'
    document.body.appendChild(elem)
    basicGame(`#${id}`, cells, dim, 0, i, true)
  }
  // cells = 11
  // for (let i = 0; i < cells; i ++) {
  //   var elem = document.createElement('div')
  //   var id = `grid2-${i}`
  //   elem.id = id
  //   elem.className = 'grid'
  //   document.body.appendChild(elem)
  //   basicGame(`#${id}`, cells, dim, 0, i, 0, i)
  // }
}

main()

//javascript, jQuery
window.changeGif = function() {
  var xhr = fetch("http://api.giphy.com/v1/gifs/random?api_key=miQBaqnQCA7W6xeKNXZqT6BHlEJRQhlv&tag=funny");
  return xhr.then(response => response.json())
  .then(response => {
    var image = new Image()
    image.src = response.data.embed_url
    $('.congrats-image').attr('src', image.src)
    return response
  })
}

changeGif()
