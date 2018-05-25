import writeGrid from './writeGrid'
import buildGridData from './buildGridData'
import {consts, Game} from './game'

const lifeYears = 0.4
const cells = lifeYears * 365
// const cells = 8
const dim = 50

const windowWidth = $(window).width()
const targetWidth = windowWidth - 100
const numCols = Math.floor(targetWidth / dim)
const numRows = Math.floor(cells / numCols)

const treasureRow = Math.floor(Math.random() * numRows)
const treasureCol = Math.floor(Math.random() * numCols)

const targetHeight = numRows * dim
const actualCells = numCols * numRows
const expected = Math.ceil(Math.log2(actualCells))
console.log(numCols, numRows)
console.log('actual years', actualCells / 365)
console.log('sqaures', actualCells)
console.log('Optimal Guesses', expected)

const info = document.querySelector('.info')
info.innerHTML = `<div>Sqaures <strong>${actualCells}</strong> Optimal guesses <strong>${expected}</strong>
<code class="click-info"></code></div>`


const game = new Game(numRows, numCols, treasureRow, treasureCol)

function onClickCell(cell) {
  const code = game.guess(cell.row, cell.col)
  const div = document.querySelector('.click-info')
  div.innerHTML = `<strong>${game.codeToString(code)}</strong> ${game.totalGuesses} guess count`
  if (code === 0) {
    setTimeout(function() {
      $('#myModal').modal()
    }, 200)
  }
  return {totalGuesses: game.totalGuesses, code}
}

const gridData = buildGridData(numRows, numCols, treasureRow, treasureCol, dim)
writeGrid(targetWidth, targetHeight, gridData, onClickCell)


//javascript, jQuery
window.changeGif = function() {
  var xhr = fetch("http://api.giphy.com/v1/gifs/random?api_key=miQBaqnQCA7W6xeKNXZqT6BHlEJRQhlv&tag=funny");
  xhr.then(response=>{return response.json()})
  .then(response=>{
    var image = new Image()
    image.src = response.data.embed_url
    console.log('image.src', image.src)
    $('.congrats-image').attr('src', image.src)
    return console.log(response)
  })
}

changeGif()
