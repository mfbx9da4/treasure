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

    var dim = square.width
    var x = square.x
    var y = square.y

    var circleX = (dim / 2) + x
    var circleY = (dim / 2) + y
    var circleR = (dim / 2) - 4

    var data = [{"x": circleX, "y": circleY, "r": circleR, "label": res.totalGuesses}]
    /* Define the data for the circles */
    var elem = this.grid.selectAll("g myCircleText")
      .data(data)

    /*Create and place the "blocks" containing the circle and the text */
    var elemEnter = elem.enter()
      .append("g")
      .attr("transform", function(circle){return "translate(" + circle.x + "," + circle.y + ")"})

    var fill
    if (res.code === 1) {
      fill = '#F56C4E'
    } else if (res.code === 2) {
      fill = '#2C93E8'
    } else {
      fill = '#6ab04c'
    }

    /*Create the circle for each block */
    var circle = elemEnter.append("circle")
      .attr("r", function(circle){return circle.r} )
      .attr("stroke", "black")
      .attr("fill", fill)

    /* Create the text for each block */
    elemEnter.append("text")
      .attr("dx", function(circle){return 3.9 * -(circle.label.toString().length)})
      .attr("dy", function(circle){return (6)})
      .text(function(circle){return circle.label})

    elemEnter.on('click', () => {
      this.onSquareClick(square)
    })

    // if ((square.click) % 2 == 0 ) { d3.select(this).style("fill","#F56C4E"); }
    // if ((square.click) % 2 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
    // if (square.treasure) { d3.select(this).style("fill","blue"); }

  }
}






export default WriteGrid
