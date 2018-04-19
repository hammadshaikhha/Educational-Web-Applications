// Initialize variables
var drawpoint = false;
var unif_draw = 0;
var ycord = 320;
var draw_array = [];
var draw_ballwidth = 8;
var button;
var story_clicks = 0;
var sample_mean;
var sample_stdev;

// Set seed
var seedval = 123456;


// Setup page
function setup() {

  randomSeed(seedval);

  // Title page
  createElement("h1", "Continuous Random Variable");
  UnifHeading = select("h1");
  UnifHeading.position(750,0);
  //UnifHeading.style("padding", "12px");


  // Create canvas
  createCanvas (650,720);

  // Uniform Distribution Description

  // First paragraph
  DescPara1 = createElement("p","The Uniform distribution on the left can used to draw a random number \
  from 0 to 100. The uniform distribution in this case is denoted by U[0,100]. \
  This is a continuous distribution because the range of draws is infinite.");

  DescPara1.position(610,50);

  DescPara2 = createElement("p", "The mean of U[0,100] is 50 and the standard deviation is 29.")

  DescPara2.position(610,160);


  DescPara3 = createElement("p", "The key property of the uniform distribution is that the probability \
  of drawing a number from any equal size interval is the same.")

  DescPara3.position(610,205);


  // Illustrate uniform property
  keyprop_button = createButton('Illustrate key property');
  keyprop_button.size(150,40);
  keyprop_button.position(610,300);
  keyprop_button.mousePressed(UnifKeyProp);



  // Animate draw button
  // draw_button = createButton('Draw Point');
  // draw_button.position(490, 335);
  // draw_button.size(50,35);
  // draw_button.mousePressed(DrawUnifPoint);

}

// Looping forever
function draw() {




  // On going buttons

  // Background color
  background(255);

  // Sample moments
  // SampleMean = createElement("p", "Sample Mean: " + round(sample_mean));
  // SampleMean.position(100,580);
  // SampleStdev = createElement("p", "Sample Standard Deviation: " + round(sample_stdev));
  // SampleStdev.position(100,630);
  if (story_clicks >= 2){
    fill(0,0,0);
    textSize(20);
    text("Sample Mean: " + round(sample_mean), 100, 590);
    text("Sample Standard Deviation: " + round(sample_stdev), 100, 630);
 }


  // Text Setup
  //textSize(30);
  fill(0);
  //text("Uniform Distribution", 130,40);

  // Description
  //description = createElement("h1","Description:");
  //description.position(800,25);

  // Change font size for paragraphs
  UnifDescription = selectAll("p");
  for (paragraph of UnifDescription){
    // Font size
    paragraph.style('font-size', '18pt')
  }




  // Instructions heading

  textSize(18);

  // Labels
  text("Density", 70,50);


  // Label points on density
  text("0",100,340);
  text("100",390,340);
  text("1/100", 45,205);

  if (story_clicks >= 2){

  // Label points on sample
  text("Drawn Sample", 430,525);
  text("0",100,540);
  text("100",390,540);

  // Sample draw
  line(100,520,400,520);
  }

  // Sample average
  //text("0",100,675);
  //text("100",390,675);
  //text("Sample Average", 430,660);




  // Draw Uniform density
  strokeWeight(2);

  // y-axis
  line(100,70,100,320);

  // x-axis
  line(100,320,400,320);

  // density
  line(100,200,400,200);

  // Mean draw
  //line(100,655,400,655);


  // Ball color
  fill(255,0,0);

  // Illustrate key Points
  if (story_clicks >= 1){

    // Axis labels
    fill(0);
    text("10",140,340);
    text("20",190,340);
    text("90",340,340);

    // Draw shaded rectangles
    fill(0,255,255);
    rect(150, 200, 50, 120);
    rect(350, 200, 50, 120);
    fill(255,0,0);
    text("10%", 160,260);
    text("10%", 360,260);

  }

  // Points already drawn
  for (var index = 0; index < draw_array.length; index++){
    ellipse(draw_array[index],520,draw_ballwidth,draw_ballwidth);
  }

  // Animate draw from uniform
  if (drawpoint == true && ycord < 520){
    // Move ball vertically down
    ellipse(unif_draw,ycord,draw_ballwidth,draw_ballwidth);
    ycord = ycord + 5;
  }

  // Add drawn point to list
  if (ycord == 520){
    drawpoint = false;
  }


}

function UnifKeyProp(){

  if (story_clicks == 0){

    // Move button down
    keyprop_button.position(610,400);
    keyprop_button.html("Click to continue");

    // Explain key property
    DescPara3 = createElement("p", "Example: The probability (indicated by blue area) of generating a number between [10,20] and \
    [90,100] is both 10%.")
    DescPara3.position(610, 280);

    // Move onto next step
    story_clicks += 1;
  }
  else if (story_clicks == 1){

    // Draw samples
    DescPara4 = createElement("p", "Let us draw five data points from U[0,100]. Click button below to draw a point.")
    DescPara4.position(610, 360);


    // Move button down
    keyprop_button.position(610,450);
    keyprop_button.html("Draw a point");

    story_clicks += 1;
  }
  else if (story_clicks >= 2 && story_clicks <= 6){

    if (drawpoint == false){
    // Draw uniform point
    DrawUnifPoint();

    // Increment if point is drawn
    story_clicks += 1;
  }

//  print(d3.deviation(draw_array.map(ConvertToUnif)));

  }
  else if (story_clicks == 7){

    DescPara5 = createElement("p", "Now let us draw 35 more random points together. Only need to click once.")
    DescPara5.position(610, 410);

    // Move button down
    keyprop_button.position(610,500);
    keyprop_button.html("Draw 35 points at once");

    story_clicks += 1;
  }
  else if (story_clicks == 8){

    // Draw many uniform Points
    for (var draws = 0; draws <= 35; draws += 1){
      // Add each drawn point to list
      draw_array.push(random(100,400));
    }

    // Make balls smaller
    draw_ballwidth = 5;

    // text
    DescPara6 = createElement("p","Now we have a sample of n = 40 data points that are drawn from the U[0,100] population distribution. \
    Here are some key points to take away:")
    DescPara6.position(610, 460);

    // Move button down
    keyprop_button.position(610,560);
    keyprop_button.html("List key points");

    story_clicks += 1;

  }
  else if (story_clicks == 9){

    // text
    DescPara7 = createElement("p","1) The sample is roughly evenly spread accross [0,100]")
    DescPara7.position(610, 530);
    DescPara8 = createElement("p", "2) Sample mean and the sample standard deviation are close to the corresponding theortical values of U[0,100]");
    DescPara8.position(610, 560);

    // Move button down
    keyprop_button.position(610,670);
    keyprop_button.html("Continue to conclusion");

    story_clicks += 1;



  }
  else{

    // text
    DescPara9 = createElement("p","We expect large random samples to be representative of the population.")
    DescPara9.position(610, 635);

    // Move button down
    keyprop_button.position(610,700);
    keyprop_button.html("The End");


  }

    // Compute sample mean and sample stdev
    sample_mean = d3.mean(draw_array.map(ConvertToUnif));
    sample_stdev = d3.deviation(draw_array.map(ConvertToUnif));
    console.log(draw_array);

}

// Convert pixels to match uniform drawn on screen
function ConvertToUnif(value){

  return (value - 100)/3;

}


function DrawUnifPoint(){

  if (drawpoint == false){

    // Draw from uniform distribution after click
    unif_draw = random(100,400);
    drawpoint = true;
    ycord = 350;
    draw_array.push(unif_draw);

  }

}
