var itter = 1;
var n_submits = 1;
var interval_wait = 3000;

// Refresh thermometer every few seconds
var intervalID = setInterval(function(){



  // Make API call to canvas
  function getThumbnail(vurl,callback) {
              data = $.getJSON(vurl,function(returndata){
              callback(returndata);
          });

          return data;
      }

quiz_url = 'https://www.freecodecamp.org/api/users/get-public-profile?username=mphul'

getThumbnail(quiz_url,function(returndata){
        //received data!
        ParseQuizStat = returndata;
        n_submits = ParseQuizStat["entities"]["user"]["mphul"]["points"];
        //n_submits = n_submits + 1;
        currentTemp = n_submits;
        //console.log(n_submits);


// Get score from freecodecamp
//profile_json = 'https://www.freecodecamp.org/api/users/get-public-profile?username=mphul'
//data_mun = $.getJSON(profile_json, function(data){});
//json_data = JSON.parse(data_mun["responseText"])
//n_submits = conver_json["entities"]["user"]["mphul"]["points"]
//currentTemp = Math.round((n_submits/196)*100);
//console.log(n_submits);

// Remove previous thermometer
d3.select("svg").remove();


// Math.round(currentTemp)

// Unique submission_stat/count in canvas API contains completion data

var width = 250,
    height = 450,
    maxTemp = 160.0, // set target here maxTemp
    minTemp = 0.0;
    //currentTemp = 51 + itter;

if (currentTemp < maxTemp) {
  var bottomY = height - 5,
      topY = 5,
      bulbRadius = 40,
      tubeWidth = 40,
      tubeBorderWidth = 1,
      mercuryColor = "rgb(230,0,0)",
      innerBulbColor = "rgb(230, 200, 200)",
      tubeBorderColor = "#999999";
}
else {
  var bottomY = height - 5,
      topY = 5,
      bulbRadius = 40,
      tubeWidth = 40,
      tubeBorderWidth = 1,
      mercuryColor = "rgba(255, 99, 71, 0.5)",
      innerBulbColor = "rgba(255, 99, 71, 0.5)",
      tubeBorderColor = "#999999";
}

var bulb_cy = bottomY - bulbRadius,
    bulb_cx = width/2,
    top_cy = topY + tubeWidth/2;


var svg = d3.select("#thermo")
  .append("svg")
  .attr("width", width)
  .attr("height", height);


var defs = svg.append("defs");

// Define the radial gradient for the bulb fill colour
var bulbGradient = defs.append("radialGradient")
  .attr("id", "bulbGradient")
  .attr("cx", "50%")
  .attr("cy", "50%")
  .attr("r", "50%")
  .attr("fx", "50%")
  .attr("fy", "50%");

bulbGradient.append("stop")
  .attr("offset", "0%")
  .style("stop-color", innerBulbColor);

bulbGradient.append("stop")
  .attr("offset", "90%")
  .style("stop-color", mercuryColor);


// Circle element for rounded tube top
svg.append("circle")
  .attr("r", tubeWidth/2)
  .attr("cx", width/2)
  .attr("cy", top_cy)
  .style("fill", "#FFFFFF")
  .style("stroke", tubeBorderColor)
  .style("stroke-width", tubeBorderWidth + "px");


// Rect element for tube
svg.append("rect")
  .attr("x", width/2 - tubeWidth/2)
  .attr("y", top_cy)
  .attr("height", bulb_cy - top_cy)
  .attr("width", tubeWidth)
  .style("shape-rendering", "crispEdges")
  .style("fill", "#FFFFFF")
  .style("stroke", tubeBorderColor)
  .style("stroke-width", tubeBorderWidth + "px");


// White fill for rounded tube top circle element
// to hide the border at the top of the tube rect element
svg.append("circle")
  .attr("r", tubeWidth/2 - tubeBorderWidth/2)
  .attr("cx", width/2)
  .attr("cy", top_cy)
  .style("fill", "#FFFFFF")
  .style("stroke", "none")



// Main bulb of thermometer (empty), white fill
svg.append("circle")
  .attr("r", bulbRadius)
  .attr("cx", bulb_cx)
  .attr("cy", bulb_cy)
  .style("fill", "#FFFFFF")
  .style("stroke", tubeBorderColor)
  .style("stroke-width", tubeBorderWidth + "px");


// Rect element for tube fill colour
svg.append("rect")
  .attr("x", width/2 - (tubeWidth - tubeBorderWidth)/2)
  .attr("y", top_cy)
  .attr("height", bulb_cy - top_cy)
  .attr("width", tubeWidth - tubeBorderWidth)
  .style("shape-rendering", "crispEdges")
  .style("fill", "#FFFFFF")
  .style("stroke", "none");


// Scale step size
var step = 20;

// Range of thermometer
var domain = [0, 240]

// Determine a suitable range of the temperature scale
/*var domain = [
  step * Math.floor(minTemp / step),
  step * Math.ceil(maxTemp / step)
  ];

if (minTemp - domain[0] < 0.66 * step)
  domain[0] -= step;

if (domain[1] - maxTemp < 0.66 * step)
  domain[1] += step;*/


// D3 scale object
var scale = d3.scale.linear()
  .range([bulb_cy - bulbRadius/2 - 8.5, top_cy])
  .domain(domain);


// Max and min temperature lines
[maxTemp].forEach(function(t) {

  var isMax = (t == maxTemp),

        label = (isMax ? "Target" : ""),
        textCol = (isMax ? "rgb(230, 0, 0)" : "rgb(0, 0, 230)"),
        textOffset = (isMax ? -4 : 4);

  svg.append("line")
    .attr("id", label + "Line")
    .attr("x1", width/2 - tubeWidth/2)
    .attr("x2", width/2 + tubeWidth/2+75)
    .attr("y1", scale(t))
    .attr("y2", scale(t))
    .style("stroke", tubeBorderColor)
    .style("stroke-width", "1px")
    .style("shape-rendering", "crispEdges");

  svg.append("text")
    .attr("x", width/2 + tubeWidth/2 + 2)
    .attr("y", scale(t) + textOffset)
    .attr("dy", isMax ? null : "0.75em")
    .text(label)
    .style("fill", textCol)
    .style("font-size", "20px")

});


var tubeFill_bottom = bulb_cy,
    tubeFill_top = scale(currentTemp);

// Rect element for the red mercury column
svg.append("rect")
  .attr("x", width/2 - (tubeWidth - 10)/2)
  .attr("y", tubeFill_top)
  .attr("width", tubeWidth - 10)
  .attr("height", tubeFill_bottom - tubeFill_top)
  .style("shape-rendering", "crispEdges")
  .style("fill", mercuryColor)


// Main thermometer bulb fill
svg.append("circle")
  .attr("r", bulbRadius - 6)
  .attr("cx", bulb_cx)
  .attr("cy", bulb_cy)
  .style("fill", "url(#bulbGradient)")
  .style("stroke", mercuryColor)
  .style("stroke-width", "2px");


// Values to use along the scale ticks up the thermometer
var tickValues = d3.range((domain[1] - domain[0])/step + 1).map(function(v) { return domain[0] + v * step; });


// D3 axis object for the temperature scale
var axis = d3.svg.axis()
  .scale(scale)
  .innerTickSize(10)
  .outerTickSize(0)
  .tickValues(tickValues)
  .orient("left");

// Add the axis to the image
var svgAxis = svg.append("g")
  .attr("id", "tempScale")
  .attr("transform", "translate(" + (width/2 - tubeWidth/2) + ",0)")
  .call(axis);

// Format text labels
svgAxis.selectAll(".tick text")
    .style("fill", "#777777")
    .style("font-size", "16px");

// Set main axis line to no stroke or fill
svgAxis.select("path")
  .style("stroke", "none")
  .style("fill", "none")

// Set the style of the ticks
svgAxis.selectAll(".tick line")
  .style("stroke", tubeBorderColor)
  .style("shape-rendering", "crispEdges")
  .style("stroke-width", "1px");

  // Add text with current rate
  // Change color when odd or even
  if (currentTemp % 2 == 0) {
  	svg.append("text")
      .attr("x", 0.42*width)
      .attr("y", height - bulbRadius*0.85)
      .text(currentTemp)
      .style("font-size", "24px")
      .style("font-weight", "bold")
  	.style("fill", "blue");
  }
  else {
  	svg.append("text")
      .attr("x", 0.42*width)
      .attr("y", height - bulbRadius*0.85)
      .text(currentTemp)
      .style("font-size", "24px")
      .style("font-weight", "bold")
  	.style("fill", "black");
  }



// Change API call speed after first loading
//if (itter > 1) {
//  clearInterval(intervalID);
//}

//console.log(interval_wait);

// Increment counter
itter += 1

})

// firebase end
//}


}, interval_wait);
