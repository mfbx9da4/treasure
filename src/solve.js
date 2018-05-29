class Solver {
  constructor(game, numRows, numCols, onGuess) {
    this.game = game
    this.numRows = numRows
    this.numCols = numCols
    this.onGuess = onGuess
  }

  solve = () => {
    // this.bruteForce()
    return this.binarySearch()
  }

  guess = (row, col) => {
    const code = game.guess(row, col)
    const res = {code, totalGuesses: game.totalGuesses}
    this.onGuess(row, col, res)
    return code
  }

  binarySearch = () => {
    const firstRow = 0
    const firstCol = 0

    const guessCol = (col) => {
      return this.guess(firstRow, col)
    }
    // guess in first row
    return this.bisect(firstCol, this.numCols - 1, guessCol)
  }

  bisect (lo, hi, guess) {
    let prevWasColder = true
    let prevWasAtLo = false
    let ans, isOdd, guessAt, mid, prev, prevWasBelow, width, other, prevWasAbove
    const codes = this.game.codes
    let count = 0

    while (lo < hi) {
      width = (hi - lo)

      mid = Math.floor(width / 2) + lo

      if (this.game.totalGuesses > 12) {
        throw new Error('Solver: Too many guesses')
      }

      // TODO: simplify
      // if (!prevWasColder && (prevWasAtLo || !prevWasBelow)) {
      //   prevWasAtLo = false
      //   guessAt = hi
      // } else {
      //   prevWasAtLo = true
      //   guessAt = lo
      //   console.log((this.game.totalGuesses + 1).toString(), 'guessAt lo', guessAt)
      // }

      // || prevWasAbove
      // if (prevWasColder || !(prevWasAtLo || prevWasAbove)) {

      if (prevWasColder || !prevWasAtLo) {
        // If the previous was colder or
        // the previous was at hi bound
        // guess lo
        prevWasAtLo = true
        guessAt = lo
        console.log((this.game.totalGuesses + 1).toString(), 'guessAt lo', guessAt)
      } else {
        prevWasAtLo = false
        guessAt = hi
      }

      ans = guess(guessAt)

      if (ans === codes.hit) {
        console.log(this.game.totalGuesses.toString(), 'guessAt', guessAt, 'hit')
        return guessAt
      }

      if (prevWasColder) {
        console.log('prevWasColder', prevWasColder)
        prevWasColder = false
        prev = guessAt
        continue
      }

      isOdd = (hi - lo + 1) % 2 !== 0
      prevWasBelow = prev < guessAt
      prevWasAbove = !prevWasBelow
      console.log('prevWasBelow', prevWasBelow, prev, guessAt)

      if (prevWasBelow) {
        if (ans === codes.warmer) {
          lo = isOdd ? mid : mid + 1
          console.log(this.game.totalGuesses.toString(), 'guessAt', guessAt, prevWasBelow ? 'prevWasBelow' : 'prevWasAbove', 'warmer |', 'lo is now', lo)
        } else if (ans === codes.colder) {
          prevWasColder = true
          hi = isOdd ? mid - 1 : mid
          console.log(this.game.totalGuesses.toString(), 'guessAt', guessAt, prevWasBelow ? 'prevWasBelow' : 'prevWasAbove', 'colder | hi is now', hi)
        }
      } else {
        if (ans === codes.warmer) {
          hi = mid
          console.log(this.game.totalGuesses.toString(), 'guessAt', guessAt, prevWasBelow ? 'prevWasBelow' : 'prevWasAbove', 'warmer |', 'hi is now', hi)
        } else if (ans === codes.colder) {
          prevWasColder = true
          lo = mid + 1
          console.log(this.game.totalGuesses.toString(), 'guessAt', guessAt, prevWasBelow ? 'prevWasBelow' : 'prevWasAbove', 'colder | lo is now', lo)
        }
      }
      prev = guessAt
    }
    throw new Error('not found')
    return lo
  }

  bruteForce = () => {
    for (let row = 0; row < this.numRows; row ++) {
      for (let col = 0; col < this.numCols; col ++) {
        const ans = this.guess(row, col)
        if (ans === 0) {
          break
        }
      }
    }
  }

  calcLoHi = (prevWasBelow, ans, mid, guessAt, codes) => {

    return lo, hi
  }
}



export default Solver
