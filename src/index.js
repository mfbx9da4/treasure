import WriteGrid from './writeGrid'
import buildGridData from './buildGridData'
import Solver from './solve'
import { consts, Game } from './game'

function onClickCell(game, cell) {
  console.log('cell', cell)
  const code = game.guess(cell.row, cell.col)
  const div = document.querySelector('.click-info')
  div.innerHTML = `<code><strong>${game.codeToString(
    code
  )}</strong></code> Guess count <strong>${game.totalGuesses}</strong> `
  if (code === 0) {
    setTimeout(function() {
      $('#myModal').modal()
    }, 200)
  }
  return { totalGuesses: game.totalGuesses, code }
}

function onGuess(grid, row, col, res) {
  grid.drawGuess(row, col, res)
}

function onChangeBounds(lo, hi) {
  grid.drawBounds(lo, hi)
}

function createGame(config) {
  // console.log('🎁', config)
  const {
    selector,
    numRows,
    numCols,
    treasureRow,
    treasureCol,
    dim,
    targetWidth,
    targetHeight,
    shouldSolve,
  } = config
  window.game = new Game(numRows, numCols, treasureRow, treasureCol)
  window.gridData = buildGridData(
    numRows,
    numCols,
    treasureRow,
    treasureCol,
    dim
  )
  window.grid = new WriteGrid(
    selector,
    targetWidth,
    targetHeight,
    gridData,
    onClickCell.bind(null, game)
  )
  if (shouldSolve) {
    const solver = new Solver(game, numRows, numCols, onGuess.bind(null, grid))
    const ans = solver.solve()
    const expected = [treasureRow, treasureCol]
    if (ans[0] !== expected[0] && ans[1] !== expected[1]) {
      const message = `Wrong answer for Treasure ${treasureRow}, ${treasureCol}`
      throw new Error(message)
    }
  }
}

function writeInfo(numRows, numCols) {
  // TODO: double check
  const actualCells = numRows * numCols
  const expectedMax = Math.ceil(2 * Math.log2(actualCells))
  const expectedMin = Math.ceil(Math.log2(actualCells))
  // console.log('Optimal Guesses', expectedMin, expectedMax)

  const info = document.querySelector('.info')
  info.innerHTML = `<div>Squares <strong>${actualCells}</strong> Optimal guesses <strong>${expectedMin} to ${expectedMax}</strong></div>`
}

function calcDimensionsFromWindow(cells, dim) {
  const windowWidth = $(window).width()
  let targetWidth = windowWidth - 100
  let numCols = Math.floor(targetWidth / dim)
  let numRows = Math.floor(cells / numCols)
  if (cells < numCols) {
    // If the screen is wider than the number for cells
    numRows = 1
    numCols = cells
  }
  targetWidth = dim * numCols
  const targetHeight = numRows * dim
  const actualCells = numCols * numRows
  // console.log('🎬')
  // console.log('numCols, numRows', numCols, numRows)
  // console.log('actual years', actualCells / 365)
  // console.log('squares', actualCells)
  return { targetWidth, targetHeight, numRows, numCols, actualCells }
}

function basicGame(
  selector,
  cells,
  dim,
  treasureRow = null,
  treasureCol = null,
  shouldSolve
) {
  const {
    targetWidth,
    targetHeight,
    numRows,
    numCols,
    actualCells,
  } = calcDimensionsFromWindow(cells, dim)

  const random = randomTreasure(numRows, numCols)

  if (treasureRow === null || treasureRow > numRows - 1) {
    treasureRow = random[0]
  } else if (treasureCol === null || treasureCol > numCols - 1) {
    treasureCol = random[1]
  }

  writeInfo(numRows, numCols)
  const config = {
    selector,
    numRows,
    numCols,
    treasureRow,
    treasureCol,
    dim,
    targetWidth,
    targetHeight,
    shouldSolve,
  }
  createGame(config)
}

function basic2DGame(config) {
  config.targetWidth = config.numCols * config.dim
  config.targetHeight = config.numRows * config.dim
  writeInfo(config.numRows, config.numCols)
  createGame(config)
}

function randomTreasure(numRows, numCols) {
  return [
    Math.floor(Math.random() * numRows),
    Math.floor(Math.random() * numCols),
  ]
}

function bigGame() {
  const config = {
    selector: '#grid',
    numRows: 50,
    numCols: 50,
    dim: 13,
  }
  var [row, col] = randomTreasure(config.numRows, config.numCols)
  config.treasureRow = row
  config.treasureCol = col
  basic2DGame(config)
}

function vbigGame() {
  const config = {
    selector: '#grid',
    numRows: 170,
    numCols: 170,
    dim: 6,
  }
  var [row, col] = randomTreasure(config.numRows, config.numCols)
  config.treasureRow = row
  config.treasureCol = col
  basic2DGame(config)
}

function medGame() {
  const config = {
    selector: '#grid',
    numRows: 9,
    numCols: 9,
    dim: 50,
  }
  var [row, col] = randomTreasure(config.numRows, config.numCols)
  config.treasureRow = row
  config.treasureCol = col
  basic2DGame(config)
}

function easyGame() {
  const config = {
    selector: '#grid',
    numRows: 1,
    numCols: 9,
    dim: 50,
  }
  var [row, col] = randomTreasure(config.numRows, config.numCols)
  config.treasureRow = row
  config.treasureCol = col
  basic2DGame(config)
}

function vbigGameTest() {
  const config = {
    shouldSolve: 1,
    dim: 6,
  }
  config.numRows = 170
  config.numCols = 170
  var [row, col] = randomTreasure(config.numRows, config.numCols)
  var id = `grid-2d-test-T-${row}-${col}`
  var elem = createElement(`<div id="${id}" class="grid"></div>`)
  document.body.appendChild(elem)
  config.selector = `#${id}`
  config.treasureRow = row
  config.treasureCol = col
  basic2DGame(config)
}

function bigGameTest() {
  const config = {
    shouldSolve: 1,
    dim: 13,
  }
  config.numRows = 50
  config.numCols = 50
  var [row, col] = randomTreasure(config.numRows, config.numCols)
  var id = `grid-2d-test-T-${row}-${col}`
  var elem = createElement(`<div id="${id}" class="grid"></div>`)
  document.body.appendChild(elem)
  config.selector = `#${id}`
  config.treasureRow = row
  config.treasureCol = col
  basic2DGame(config)
}

function createElement(htmlString) {
  const div = document.createElement('div')
  div.innerHTML = htmlString.trim()
  return div.firstChild
}

function main() {
  if (location.search === '?about') {
    document.querySelector('.about').style.display = 'block'
    document.querySelector('.instructions').style.display = 'none'
    return
  }

  if (!unitTestCases()) {
    let hasGame = false
    if (location.search.indexOf('easy') > -1) {
      easyGame()
      hasGame = true
    }
    if (location.search.indexOf('hard') > -1) {
      bigGame()
      hasGame = true
    }
    if (location.search.indexOf('extreme') > -1) {
      vbigGame()
      hasGame = true
    }

    if (!hasGame) {
      medGame()
    }
  }
}

function unitTestCases() {
  if (location.search.indexOf('test') === -1) return

  let squareSize = 50
  let config = {
    dim: squareSize,
    shouldSolve: true,
  }

  if (location.search.indexOf('1d') > -1) {
    // One dimension
    for (let testN = 2; testN < 15; testN++) {
      for (let i = 0; i < testN; i++) {
        let id = `grid-1d-${testN}-${i}`
        let elem = createElement(`<div id="${id}" class="grid"></div>`)
        document.body.appendChild(elem)
        setTimeout(
          basicGame.bind(null, `#${id}`, testN, squareSize, 0, i, true)
        )
      }
    }
  }

  if (location.search.indexOf('2d') > -1) {
    // Two dimension
    for (let testN = 2; testN < 9; testN++) {
      config.numRows = testN
      config.numCols = testN
      for (let row = 0; row < testN; row++) {
        for (let col = 0; col < testN; col++) {
          var id = `grid-2d-${testN}-T-${row}-${col}`
          var elem = createElement(`<div id="${id}" class="grid"></div>`)
          document.body.appendChild(elem)
          config.selector = `#${id}`
          config.treasureRow = row
          config.treasureCol = col
          let copy = Object.assign({}, config)
          setTimeout(basic2DGame.bind(null, copy))
        }
      }
    }
  }

  if (location.search.indexOf('big') > -1) {
    bigGameTest()
  }
  if (location.search.indexOf('huge') > -1) {
    vbigGameTest()
  }

  return true
}

main()

//javascript, jQuery
window.changeGif = function() {
  setTimeout(function() {
    var xhr = fetch(
      'https://api.giphy.com/v1/gifs/random?api_key=miQBaqnQCA7W6xeKNXZqT6BHlEJRQhlv&tag=funny'
    )
    return xhr
      .then((response) => response.json())
      .then((response) => {
        var image = new Image()
        image.src = response.data.embed_url
        $('.congrats-image').attr('src', image.src)
        return response
      })
  })
}

changeGif()
