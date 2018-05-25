export default function buildGridData(numRows, numCols, treasureRow, treasureCol, dim) {
  const data = new Array()
  let xpos = 0
  let ypos = 0
  const click = 0

  for (let row = 0; row < numRows; row++) {
    data.push(new Array())

    for (let col = 0; col < numCols; col ++) {
      const options = {
        x: xpos,
        y: ypos,
        row,
        col,
        width: dim,
        height: dim,
        click: click
      }
      if (row === treasureRow && col === treasureCol) {
        options.treasure = true
        // options.fill = '#6ab04c'
      }

      // if (((row * numCols) + col) % 365 === 0) {
      //   options.fill = 'green'
      // }
      data[row].push(options)
      xpos += dim
    }
    xpos = 0
    ypos += dim
  }
  return data
}
