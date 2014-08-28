var tau = 2*Math.PI,
    width = 260,
    height = 260,
    innerRadius = 70,
    outerRadius = 100,
    percent = 75,
    opens = 25,
    reach = 50,

    //Selectors for individual graphs
    e1_opens    = d3.select("#donut_opens_1"),
    e1_clicks   = d3.select("#donut_clicks_1"),
    e1_bounces  = d3.select("#donut_bounces_1"),
    e1_unsubs   = d3.select("#donut_unsub_1"),
    e2_opens    = d3.select("#donut_opens_2"),
    e2_clicks   = d3.select("#donut_clicks_2"),
    e2_bounces  = d3.select("#donut_bounces_2"),
    e2_unsubs   = d3.select("#donut_unsub_2");

var donuts = d3.select("#donut_opens_1")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var circle = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0)
    .endAngle( tau );

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0)
    .endAngle( tau*(percent/100) );

donuts.append("path")
    .attr("d", circle)
    .attr("class", "circle");

donuts.append("path")
    .attr("d", arc)
    .attr("class", "arc");

donuts.append("text")
    .attr("x", 0)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .attr("class", "percent")
    .style({'fill':'#444444' , 'font-size':'24px'})
    .text( percent + "%");

donuts.append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("class", "type")
    .style({'fill':'#848484' , 'font-size':'18px'})
    .text( "Opens");

donuts.append("text")
    .attr("x", 0)
    .attr("y", 37)
    .attr("text-anchor", "middle")
    .attr("class", "count")
    .style({'fill':'rgb(126, 126, 126)' , 'font-size':'12px', 'font-family': 'Arial'})
    .text( opens + "/" + reach);

