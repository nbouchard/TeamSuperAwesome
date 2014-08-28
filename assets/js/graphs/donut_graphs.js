
var donuts = d3.selectAll(".donut_graph svg");

var circle = d3.svg.arc()
    .innerRadius(75)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(2*Math.PI);

var arc = d3.svg.arc()
    .innerRadius(75)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(1.5*Math.PI);

donuts.append("path")
    .attr("d", circle)
    .attr("class", "circle")
    .attr("transform", "translate(130,130)");

donuts.append("path")
    .attr("d", arc)
    .attr("class", "arc")
    .attr("transform", "translate(130,130)");