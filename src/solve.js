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
    let hit, ansCol, ansRow

    const guessCol = (col) => {
      return this.guess(firstRow, col)
    }

    const guessRow = (fixedCol, row) => {
      return this.guess(row, fixedCol)
    }

    // guess in first row
    [hit, ansCol] = this.bisect(firstCol, this.numCols - 1, guessCol)
    if (hit) {
      return [firstRow, ansCol]
    }
    [hit, ansRow] = this.bisect(firstRow, this.numRows - 1, guessRow.bind(null, ansCol))
    if (!hit) {
      throw new Error('Solver could not find treasure')
    }
    return [ansRow, ansCol]
  }

  bisect (lo, hi, guess) {
    let prevWasColder = true
    let prevWasAtLo = false
    let ans, isOdd, guessAt, mid, prev,
      prevWasBelow, width, other, prevWasAbove,
      isWarmer, isColder
    const codes = this.game.codes
    let count = 0
    const verbose = true

    while (lo < hi) {
      if (this.game.totalGuesses > this.maxGuesses) {
        throw new Error('Solver: Too many guesses')
      }

      if (prevWasAtLo) {
        // Alternate guess at lo or hi bound
        prevWasAtLo = false
        guessAt = hi
      } else {
        prevWasAtLo = true
        guessAt = lo
        if (verbose) { console.log((this.game.totalGuesses + 1).toString(), 'guessAt lo', guessAt) }
      }

      ans = guess(guessAt)

      if (ans === codes.hit) {
        if (verbose) { console.log(this.game.totalGuesses.toString(), 'guessAt', guessAt, 'hit') }
        return [true, guessAt]
      }

      if (prevWasColder) {
        // If prev was colder, next guess must be hotter.
        // So we have no info to adjust bounds.
        prevWasColder = false
        prev = guessAt
        continue
      }

      width = (hi - lo)
      isOdd = width % 2 === 0
      mid = Math.floor(width / 2) + lo
      prevWasBelow = prev < guessAt
      prevWasAbove = !prevWasBelow
      isWarmer = ans === codes.warmer
      isColder = ans === codes.colder

      if (isWarmer && prevWasBelow) {
        // [1 m 2]    odd
        // [1 m _ 2]  even
        lo = isOdd ? mid : mid + 1
        if (verbose) { console.log(this.game.totalGuesses.toString(), 'guessAt', guessAt, 'isWarmer lo is now', lo) }
      } else if (isWarmer && prevWasAbove) {
        // [2 m 1]    odd
        // [2 m _ 1]  even
        hi = mid
        if (verbose) { console.log(this.game.totalGuesses.toString(), 'guessAt', guessAt, 'isWarmer hi is now', hi) }
      } else if (isColder && prevWasBelow) {
        // [1 m 2]    odd
        // [1 m _ 2]  even
        hi = isOdd ? mid - 1 : mid
        if (verbose) { console.log(this.game.totalGuesses.toString(), 'guessAt', guessAt, 'isColder hi is now', hi) }
      } else if (isColder && prevWasAbove) {
        // [2 m 1]    odd
        // [2 m _ 1]  even
        lo = mid + 1
        if (verbose) { console.log(this.game.totalGuesses.toString(), 'guessAt', guessAt, 'isColder lo is now', lo) }
      }

      prev = guessAt
      prevWasColder = isColder
    }
    return [false, lo]
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
