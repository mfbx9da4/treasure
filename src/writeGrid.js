class WriteGrid {
  constructor(selector, targetWidth, targetHeight, gridData, onClick) {
    this.selector = selector
    this.onClick = onClick
    this.grid = this.writeGrid(targetWidth, targetHeight, gridData)
  }

  writeGrid = (targetWidth, targetHeight, gridData) => {
    const self = this
    const grid = d3.select(this.selector)
      .append("svg")
      .attr("width", targetWidth + "px")
      .attr("height", targetHeight + "px");

    const row = grid.selectAll(".row")
      .data(gridData)
      .enter().append("g")
      .attr("class", "row");

    const column = row.selectAll(".square")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("class","square")
      .attr("row", d => d.row)
      .attr("col", d => d.col)
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("treasure", d => d.treasure || false)
      .attr("width", d => d.width)
      .attr("height", d => d.height)
      .style("fill", d => d.fill || "#fff")
      .style("stroke", d => d.fill || "#222")
      .on('click', this.onSquareClick);

    return grid
  }

  onSquareClick = square => {
    console.log('onSquareClick')
    const res = this.onClick(square)
    this.drawClick(square, res)
  }

  drawGuess = (row, col, res) => {
    const query = `.square[row="${row}"][col="${col}"]`
    const square = this.grid.select(query)
    this.drawClick(square.data()[0], res)
  }

  drawClick = (square, res) => {
    const self = this
    square.click ++;

    const dim = square.width
    const x = square.x
    const y = square.y

    const circleX = (dim / 2) + x
    const circleY = (dim / 2) + y
    const circleR = (dim / 2) - Math.floor(dim * 0.075)
    const label = res.totalGuesses.toString()
    const textSize = dim * 0.32
    const textDx = -(dim / 13) * label.length
    const textDy = dim / 8.3

    const data = [{"x": circleX, "y": circleY, "r": circleR, "label": label}]
    /* Define the data for the circles */
    const elem = this.grid.selectAll("g myCircleText")
      .data(data)

    /*Create and place the "blocks" containing the circle and the text */
    const circleContainer = elem.enter()
      .append("g")
      .attr("class", "circle")
      .attr("row", square.row)
      .attr("col", square.col)
      .attr("transform", function(circle){return "translate(" + circle.x + "," + circle.y + ")"})

    let fill, stroke
    if (res.code === 1) {
      // warmer
      fill = '#F56C4E'
      stroke = 'rgb(153, 0, 0)'
    } else if (res.code === 2) {
      // colder
      fill = '#2C93E8'
      stroke = 'rgb(0, 0, 153)'
    } else {
      // hit
      fill = '#6ab04c'
      stroke = 'rgb(0, 153, 0)'
    }

    /*Create the circle for each block */
    const circle = circleContainer.append("circle")
      .attr("r", circle => circle.r)
      .attr("stroke", stroke)
      .attr("fill", fill)

    /* Create the text for each block */
    circleContainer.append("text")
      .attr("dx", textDx)
      .attr("dy", textDy)
      .attr("style", circle => `font-size: ${textSize}px`)
      .text(function(circle){return circle.label})

    circleContainer.on('click', () => {
      this.onSquareClick(square)
    })

    // if ((square.click) % 2 == 0 ) { d3.select(this).style("fill","#F56C4E"); }
    // if ((square.click) % 2 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
    // if (square.treasure) { d3.select(this).style("fill","blue"); }

  }
}



export default WriteGrid
