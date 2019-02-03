// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv")
  .then(function(healthData) {
    console.log(healthData)
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    healthData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.num_hits = +data.healthcare;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      // .domain([d3.min(healthData, d => d.poverty)-1, d3.max(healthData, d => d.poverty)])
      .domain([9,22])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      // .domain([d3.min(healthData, d => d.healthcare)-4, d3.max(healthData, d => d.healthcare)+4])
      .domain([3,30])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
      

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    
    .enter()
    

    circlesGroup.append("circle")
    // .classed("global", true)
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .attr("opacity", ".5");

    // var textGroup = chartGroup.selectAll(".stateText")
    // .data(healthData)
    
    // .enter()
    circlesGroup.append("text")
    // .classed("global", true)
    .attr("dx", d => xLinearScale(d.poverty)-10)
    .attr("dy", d => yLinearScale(d.healthcare))
    .text(function (d){return d.abbr})
    .attr("font-size", 15)
    .attr("stroke", "black")
    .attr("fill", "black");
    


    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}<br>poverty: ${d.poverty}<br>Hits: ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // // Step 8: Create event listeners to display and hide the tooltip
    // // ==============================
    // circlesGroup.on("click", function(data) {
    //   toolTip.show(data, this);
    // })
    //   // onmouseout event
    //   .on("mouseout", function(data, index) {
    //     toolTip.hide(data);
    //   });

    // Create axes labels
      
chartGroup.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left + 40)
     .attr("x", 0 - (height / 2))
     .attr("dy", "1em")
     .attr("class", "axisText")
     .text("Lacks Healthcare (%)");

chartGroup.append("text")
     .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
     .attr("class", "axisText")
     .text("In Poverty (%)");


 
  

 });
  





