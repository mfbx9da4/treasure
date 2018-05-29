const codes = {
  hit: 0,
  warmer: 1,
  colder: 2
}

class Game {
  constructor(numRows, numCols, treasureRow, treasureCol) {
    this.numCols = numCols;
    this.numRows = numRows;
    this.treasureRow = treasureRow
    this.treasureCol = treasureCol
    this.totalGuesses = 0
    this.codes = codes
    this.inRange(treasureRow, treasureCol)
  }

  inRange (row, col) {
    if (row > this.numRows - 1 || col > this.numCols - 1 || row < 0 || col < 0) {
      throw new Error('Game: Out Of Bounds')
    }
    return true
  }

  guess (row, col) {
    this.inRange(row, col)
    const deltaRow = Math.abs(this.treasureRow - row)
    const deltaCol = Math.abs(this.treasureCol - col)
    const deltaTotal = deltaRow + deltaCol
    let res
    if (deltaTotal === 0) {
      res = codes.hit
    } else if (!this.prevDeltaTotal) {
      res = codes.warmer
    } else if (deltaTotal <= this.prevDeltaTotal) {
      res = codes.warmer
    } else {
      res = codes.colder
    }
    this.prevDeltaTotal = deltaTotal;
    this.totalGuesses ++
    return res
  }

  codeToString = (code) => {
    const strings = {}
    for (let key in codes) {
      strings[codes[key]] = key
    }
    return strings[code]
  }
}

export {
  codes,
  Game
}

export default Game
