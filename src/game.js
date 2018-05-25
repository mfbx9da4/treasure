const consts = {
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
  }

  guess(row, col) {
    const deltaRow = Math.abs(this.treasureRow - row)
    const deltaCol = Math.abs(this.treasureCol - col)
    const deltaTotal = deltaRow + deltaCol
    let res
    if (deltaTotal === 0) {
      res = consts.hit
    } else if (!this.prevDeltaTotal) {
      res = consts.warmer
    } else if (deltaTotal <= this.prevDeltaTotal) {
      res = consts.warmer
    } else {
      res = consts.colder
    }
    this.prevDeltaTotal = deltaTotal;
    this.totalGuesses ++
    return res
  }

  codeToString = (code) => {
    const strings = {}
    for (let key in consts) {
      strings[consts[key]] = key
    }
    return strings[code]
  }
}

export {
  consts,
  Game
}

export default Game
