let x,y;
let gif;


function setup() {
  createCanvas(400, 400);
  gif = p5Gif.capture();
  gif.start();
  //gif.startUntil({frame:30});
  x = 200;
  y = 200;
}

function draw() {
  background(220);
  x += random(-5,5);
  y += random(-5,5);
  fill(0);
  ellipse(x, y, 50, 50);
  
  if (frameCount == 60) {
    console.log('save');
    //gif.stop();
    gif.save().then(g => g.download());
    //save('test.png');
  }
  
}

let myGif = null;

function setup() {
  createCanvas(400, 400);
	x = 10
  vel = 1
  gif = p5Gif.capture()
  gif.startUntil({frame: 30})
  setTimeout(() => {
    gif.save().then(g => {myGif = g})
  }, 3000)
}

function draw() {
  background(220);
  ellipse(x, height/2, 10, 10)
  x += vel
	if (x >= width - 10) vel *= -1
  else if (x <= 10) vel *= -1
  if (myGif) {
  }
}let apple1;
let bowl1;
let score = 0;

function setup() {
  createCanvas(800, 600);
  apple1 = new Apple(300, 100);
  apple2 = new Apple(499, 0);
  apple3 = new Apple(200, 300);
  apple4 = new Apple(80, 200);
  apple5 = new Apple(390, 400);
  apple6 = new Apple(250, 30);
  apple7 = new Apple(650, 200);
  apple8 = new Apple(700, 500);
}

function draw() {
  background(110, 99, 135);
  apple1.display();
  apple1.move();
  apple2.display();
  apple2.move();
  apple3.display();
  apple3.move();
  apple4.display();
  apple4.move();
  apple5.display();
  apple5.move();
  apple6.display();
  apple6.move();
  apple7.display();
  apple7.move();
  apple8.display();
  apple8.move();

  fill(232, 140, 0);

  //bowl Bottom
  arc(mouseX, mouseY, 200, 200, 0, PI, PI + QUARTER_PI, OPEN);

  //bowl Top
  ellipse(mouseX, mouseY, 200, 60)
  
  
  textSize(72);
  fill(255);
  text(score, 10, 100);
}let data;
function preload() {
  data = loadTable('test.csv');
}
function setup() {
  console.log(data.getRow(0));
}

// step 0: global variable(s) *
var circlex = 0; // *
//Step 1: Create canvas


function setup() {
  createCanvas(500, 500)
}


function planets() {
   
  fill(100, 150, 9);
  ellipse(50, 250, 350, 350);


// 1
  fill(50, 150, 150)
  ellipse(100, 250, 25, 25)


  // 2
  fill(100, 150, 196)
  ellipse(150, 250, 25, 25)

  // 3
  fill(85, 150, 98)
  ellipse(200, 250, 25, 25)


  // 4
  fill(75, 190, 175)
  ellipse(250, 250, 25, 25)

  // 5
  fill(60, 75, 105)
  ellipse(300, 250, 25, 25)


  // 6
  fill(95)
  ellipse(350, 250, 25, 25)

  // 7
  fill(175)
  ellipse(400, 250, 25, 25)


  // 8
  fill(145, 9, 17)
  ellipse(450, 250, 25, 25)

  // Mars
  fill(145, 9, 17)
  ellipse(500, 250, 150, 150)
}


//Step 3: Create automatic stars

function draw() {
  planets();

  let x = random(width);
  let y = random(height);


  let r = random(0);
  let g = random(50);
  let b = random(100);

  background(r, g, b, 10);

  // stars
  noStroke();
  fill(255, 200, 0);
  ellipse(x, y, 5, 5);

  //Step 4: Create hand moving shooting star


  // hand star
  fill(250, 250, 0);
  stroke(250, 250, 250);
  ellipse(mouseX, mouseY, 5, 5);

  // shooting star *
  fill(mouseX, 200, 150, 200); //* 
  ellipse(circlex, mouseY, 25, 25); //*
  circlex = circlex + 5; //*

}

//Step 5: Create automatic shooting star once clicked

function mousePressed() {
  circlex = mouseX; // *
  //shooting star
  //var circlex = 0 *

  //fill(mouseX, 200, 150, 200); *
  //ellipse = (circlex, mouseY, 25, 25); *
  //circlex = circlex + 1 *

}let img;
let classifier = ml5.imageClassifier('MobileNet', modelReady);

function preload() {
  img = createImg("images/bird.jpg");
  img.elt.crossOrigin = "Anonymous";
}

function setup() {
  createCanvas(400, 300);
  image(img, 0, 0, width, height);
  img.hide();
}

function modelReady() {
  console.log('model ready');
  classifier.predict(img, gotResult);
}

function gotResult(err, results) {
  // Display error in the console
  if (err) {
    console.error(err);
  } else {
    console.log(results);
  }
}let classifier;
let video;

function setup() {
  createCanvas(320, 240);
  // Create a camera input
  video = createCapture(VIDEO);
  video.hide();
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);
}


function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
  classifyVideo();
}// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>


let shape1;

function setup() {
  createCanvas(640, 360);
  shape1 = new Draggable(100, 100, 50, 50);
}

function draw() {
  background(255);
  shape1.rollover();
  shape1.update();
  shape1.show();

}

function mousePressed() {
  shape1.pressed();
}

function mouseReleased() {
  shape1.released();
}

// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Draggable {
  constructor(x, y, w, h) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  rollover() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    rect(this.x, this.y, this.w, this.h);
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}// Click and Drag an object

let shape1;
let shape2;

function setup() {
  createCanvas(640, 360);
  shape1 = new Draggable(100, 100, 50, 50);
  shape2 = new Draggable(150, 100, 50, 50);
}

function draw() {
  background(255);
  shape1.over();
  shape1.update();
  shape1.show();
  shape2.over();
  shape2.update();
  shape2.show();

}

function mousePressed() {
  shape1.pressed();
  shape2.pressed();
}

function mouseReleased() {
  shape1.released();
  shape2.released();
}var api = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=rainbow";


function setup() {
  noCanvas();
  var url = api + apiKey + query;
  loadJSON(url, gotData);
}

function gotData(giphy) {
  for (var i = 0; i < giphy.data.length; i++) {
    createImg(giphy.data[i].images.original.url);
  }

}// Daniel Shiffman
// http://codingtra.in

// Recursion
// Edited Video: https://www.youtube.com/watch?v=jPsZwrV9ld0

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  drawCircle(300, 200, 400);
  noLoop();
}

function drawCircle(x, y, d) {
  ellipse(x, y, d);
  if (d > 2) {
    let newD = d * 0.5;
    drawCircle(x + newD, y, newD);
    drawCircle(x - newD, y, newD);
    //drawCircle(x, y + d * 0.5, d * 0.5);
  }
}
var video;

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

}

function draw() {
  image(video, 0, 0);
}let curves = [];
let curveImages = [];

function preload() {
	for (let i = 0; i < 5; i++) {
		curveImages[i] = loadImage('Curve' + (i+1) + '.png');
	}

	// curve[0] = loadImage('Curve1.png');
	// curve[1] = loadImage('Curve2.png');
	// curve[2] = loadImage('Curve3.png');
	// curve[3] = loadImage('Curve4.png');
	// curve[4] = loadImage('Curve5.png');
}

function setup() {
	createCanvas(1000, 1000);
}

function mousePressed() {
	let r = floor(random(0, curveImages.length));
	let c = new Curve(mouseX, mouseY, curveImages[r]);
	curves.push(c);
}


function draw() {
	background(255);
  for (let curve of curves) {
    curve.display();
    curve.update();
  }

}let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(7);
  snake = new Snake();
  foodLocation();

}


function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}
//KEY FUNCTION
function keyPressed() {
  if (keycode === LEFT_ARROW) {
    snake.setDir(-1, 0)
  } else if (keycode === RIGHT_ARROW) {
    snake.setDir(1, 0)
  } else if (keycode === DOWN_ARROW) {
    snake.setDir(0, 1)
  } else if (keycode === UP_ARROW) {
    snake.setDir(0, -1)
  } else if (key == ' ') {
    snake.grow();
  }
}

function draw() {
  scale(rez);
  background(220);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0)
  rect(food.x, food.y, 1, 1)
}
function setup() {
  createCanvas(400, 400);
	star = new Star(random(width),random(height));
  
}

function draw() {
  background(0);
	star.display();  
  star.blink();
}function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw() {
  background(100,255,255);
  fill(200,255,255);
  rect(0,0,200,400);
  let a = map(mouseX, 0, width, 0, 1);
  fill(0,255,255, a);
  rect(150,100,100,200);
}function setup() {
  createCanvas(400, 400);
  let user = new User("Milk");
  user.price();
}

class User {
  constructor(item) {
    this.item = item;
  }
  price() {
    alert(this.item);
    alert("costs infinite money");
  }

}// Jazmin Jinnah
function setup() {
  createCanvas(400, 350);
  square = new Square();
}

function draw() {
  background(0);
  // square.show();
  square.move();
}let rings1;
let logo1;

function setup() {
  createCanvas(640, 350);
  print('test');
  rings1 = new Rings(10, 100, 100);
  logo1 = new Logo(320, 175);
}

function draw() {
  background(32, 32, 42);
  rings1.show();
  rings1.move();
  logo1.show();
}let angle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let x = 100 * cos(angle);
  let y = 100 * sin(angle);
  ellipse(x + width/2, y + height/2, 50);
  angle += 0.03;
}let rings;

function setup() {
  createCanvas(640, 350);
  Rings = new Rings();
}

function draw() {
  background(23, 32, 42);
  fill(255);
  textSize(150);
  stroke(23, 32, 42);
  strokeWeight(6);
  textFont('Georgia');
  text('N', 270, 225);
  textFont('Georgia');
  text('Y', 282, 225);
}
// Daniel Shiffman
// Snowfall
// https://youtu.be/cl-mHFCGzYk

let snow = [];
let gravity;

let zOff = 0;


let spritesheet;
let textures = [];

function preload() {
  spritesheet = loadImage('flakes32.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.3);
  for (let x = 0; x < spritesheet.width; x += 32) {
    for (let y = 0; y < spritesheet.height; y += 32) {
      let img = spritesheet.get(x, y, 32, 32);
      image(img, x, y);
      textures.push(img);
    }
  }


  for (let i = 0; i < 400; i++) {
    let x = random(width);
    let y = random(height);
    let design = random(textures);
    snow.push(new Snowflake(x, y, design));
  }





}

function draw() {
  background(0);
  //snow.push(new Snowflake());

  zOff += 0.1;

  for (flake of snow) {
    let xOff = flake.pos.x / width;
    let yOff = flake.pos.y / height;
    let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
    let wind = p5.Vector.fromAngle(wAngle);
    wind.mult(0.1);

    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
  }

  // for (let i = snow.length - 1; i >= 0; i--) {
  //   if (snow[i].offScreen()) {
  //     snow.splice(i, 1);
  //   }
  // }

}// Daniel Shiffman
// Simple Particle System
// https://www.youtube.com/watch?v=UcdigVaIYAk

particles = [];

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  for (let i = 0; i < 5; i++) {
    let p = new Particle();
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
}let spot;
let button;

function setup() {
  createCanvas(500, 500);
  background(255);
  spot = new Spot();
  button = new Button();
}

function draw() {

  let r = random(1);
  // I'm not sure how necessary it was to pass arguments through c
  spot.display(r);
  spot.update();
  if (!spot.on) {
    button.display();
  }
}


function mousePressed() {
  if (button.pressed() && !spot.on) {
    background(255);
    spot.reset();
  }
}let angle;
let slider;
let tree1;

function setup() {
  createCanvas(600, 400);
  angle = PI / 4;
  //slider = createSlider(0, TWO_PI, PI / 4, 0.01);
  tree1 = new Tree(100, height);
  tree2 = new Tree(400, 200);
  //print(tree.x, tree.y);
}

function draw() {
  background(30, 30, 150);
  //tree.branch();
  tree1.display();
  tree2.display();
  //angle = slider.value();
}
// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 9-8: A snake following the mouse

// Declare an array
let points = []; 

function setup() {
  createCanvas(480, 270);
}

function draw() {
  background(255);
  
  // New location
  let point = {
    x: mouseX,
    y: mouseY
  };
  points.push(point); // Update the last spot in the array with the mouse location.

  if (points.length > 50) {
    points.splice(0,1);
  }
  
  // Draw everything
  for (let i = 0; i < points.length; i++) {
     // Draw an ellipse for each element in the arrays. 
     // Color and size are tied to the loop's counter: i.
    noStroke();
    fill(255-i*5);
    ellipse(points[i].x,points[i].y,i,i);
  }
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 9-8: A snake following the mouse

// Declare an array
var points = []; 

function setup() {
  createCanvas(480, 270);
}

function draw() {
  background(255);
  
  // New location
  let point = {
    x: mouseX,
    y: mouseY
  };
  points.push(point); // Update the last spot in the array with the mouse location.

  if (points.length > 50) {
    points.splice(0,1);
  }
  
  // Draw everything
  for (var i = 0; i < points.length; i++) {
     // Draw an ellipse for each element in the arrays. 
     // Color and size are tied to the loop's counter: i.
    noStroke();
    fill(255-i*5);
    ellipse(points[i].x,points[i].y,i,i);
  }
}/*
JH: Naming your variables helpfully makes your code a lot easier to understand.
Names like 'c', 'r', 'sg', etc may make sense to you right now, but revisiting your
code later could be confusing
*/

var c;
var r;

// DS: Moved variables to do with button to button class


let circuitsBeforeReset = 13 // Explanation @ line 155

function setup() {
  createCanvas(500, 500);
  c = new Spot();
  background(255);

  b = new Button();
}

function draw() {
  r = random(1);
  // I'm not sure how necessary it was to pass arguments through c

  /*
  JH: 
  
  Since generating this random number is specifically for the display() function 
  of the spots Objects, it could be cleaner to move the random generation into that 
  display() function. 
  
  This is outside of the content of week 3, so it's not vital at this point, but since you're
  pushing yourself I'll mention it here:
  
  One of the great things about splitting your code up into different functions (called
  'refactoring') is that it allows you to separate different areas of functionality. 
  
  For example, in this case you've creates one function (the 'display()' function) to handle
  EVERYTHING that has to do with drawing circles onto the screen. The only problem is, this
  'r = random(1);' above is something that ONLY relates to drawing circles on the screen. 
  That means that it would make more sense to go inside the display() function. 
  
  It's not /wrong/ - your code still works. Refactoring code is not about making it work 
  /better/, but making it more readable to humans. This has many benefits including
  making it easier to share your code, easier to modify later, and easier to document!
  */
  c.display(r);
  if (c.spotson == false) {
    b.display();
  }
}

// I didn't really need this function but I wanted to make sure
// it wouldn't appear unless the spots were done generatin!
// DS: Made a class instead of function!
class Button {

  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.bw = 40;
    this.bh = 40;
  }

  clicked() {
    if (mouseX >= (width / 2) - (this.bw / 2) && mouseX <= (width / 2) + (this.bw / 2)) {
      if (mouseY >= (height / 2) - (this.bh / 2) && mouseY <= (height / 2) + (this.bh / 2)) {
        if (c.spotson == false) {
          // resets the pattern (idk if this is good practice to manipulate
          // an objects variables like this. Probably should have created
          // a c.clicked() function within the spots() function)
          // since this is the only thing you can click however it makes
          // some sense for it to appear here too?? I'm not sure

          background(255);

          /* 
          This is something to chat to Dan about, he'll know the p5 specifics of 
          best practices. One thing you could do to make things a bit cleaner 
          is move all of these into a "reset()" function inside of "spots()"
          */
          // DS: Yes!
          c.reset();


        }
      }
    }
  }

  display() {
    push();
    fill(255);
    strokeWeight(2);
    stroke(0);
    rectMode(CENTER);
    rect(this.x, this.y, this.bw, this.bh);
    strokeWeight(0);
    fill(0);
    textSize(14);
    textAlign(CENTER);
    text('reset', 250, 250);
    pop();
  }
}

function mousePressed() {
  // DS: Button functionality in button class!
  b.clicked();
}


// DS: convention is to capitalize constructor functions
// DS: Renamed from "Spots" to "Spot" b/c it really describes just one
class Spot {
  // JH: These variables are a lot more helpfully named!

  constructor() {
    this.x = 0;
    this.y = 0;
    this.counter = 0;
    this.spotson = true;
    // DS: Moved global variables here!
    this.r = 255;
    this.b = 0;
    this.g = 0;

  }




  /* 
  JH: Here I am not sure what 'r' is supposed to do until I dig through your code a bit.
  It would be a lot more helpful if the name was, for example, 'randomNumber'
  */

  // DS: Moved functionality to object
  reset() {
    this.dir = "down";
    this.counter = 0;
    this.y = 0;
    this.x = 0;
    this.spotson = true;
  }


  display(r) {
    strokeWeight(0);
    ellipseMode(CENTER);
    // if spotson that means spots are meant to be drawn rn
    if (this.spotson) {
      if (r < 0.4) {
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, 10);
      } else {
        fill(this.b, this.g, this.r);
        ellipse(this.x, this.y, 5);
      }

    }

    // Check Direction
    if (this.x == (this.counter * 20) && this.y < height - (this.counter * 20)) {
      this.dir = "down";
    } else if (this.y == (height - this.counter * 20) && this.x < width - (this.counter * 20)) {
      this.dir = "right";
    } else if (this.x == (width - this.counter * 20) && this.y >= height - (this.counter * 20)) {
      this.dir = "up";
    } else if (this.y == (this.counter * 20) && this.x >= width - (this.counter * 20)) {
      this.dir = "left";
    }
    // Whenever it completes the circuit the counter increases
    if (this.x == (this.counter * 20) && this.y == (this.counter * 20)) {
      this.counter++;
    }
    // end the loop 
    // CHANGE COUNTER FOR DIFFERENT CANVAS SIZES
    // I don't know how to calculate a formula to figure out what counter is needed

    /* JH: You had 'hard coded' 13 in here, which is your trial-and-error value
    for the number of circuits. These types of specific numbers are often called "Magic Numbers"
    because there's no real explanation as to why they are that number exactly (to be fair you
    at least explained it in your comments). I've replaced this with a variable that is declared
    at the top of the sketch - this means if you change the canvas size you're more 
    likely to remember to change the value, as it's not buried deep within your code!
    */

    if (this.counter == circuitsBeforeReset) {
      this.dir = 0;
      this.spotson = false;
    }
    // different directions
    // didn't really have to do a switch statement for this (probs could have
    // combined with my if statements above) but the switch statement  makes
    // it look neater 

    /*
    JH: 
    It's great you're pushing yourself beyond the class content! 
    */
    switch (this.dir) {
      case "down":
        this.y += 20;
        break;
      case "right":
        this.x += 20;
        break;
      case "up":
        this.y -= 20;
        break;
      case "left":
        this.x -= 20;
        break;
      default:
        break;
    }

  }


}let a = 0;
let b = 0;
let c = 0;
let d = 0;

function setup() {
	createCanvas(400, 400);
	// Hue Saturation Brightness
	// Hue has range: 0 - 360
  // Saturation and Brightness: 0-100
	colorMode(HSB);
}

function draw() {
	background(43, 199, 184);
}


function draw() {
	background(100, 200, 100);

	if (mouseX < 200 && mouseY < 200) {
		a = 100;
	} else if (mouseX > 200 && mouseY < 200) {
		b = 100;
	} else if (mouseX < 200 && mouseY > 200) {
		c = 100;
	} else if (mouseX > 200 && mouseY > 200) {
		d = 100;
	}

	a = a - 2;
	b = b - 2;
	c = c - 2;
	d = d - 2;
	
	noStroke();
	// Top left
	// Hue Saturation Brightness
	// Hue has range: 0 - 360
  // Saturation and Brightness: 0-100
  fill(0, 100, a);
	rect(0, 0, 200, 200);
  
  // Top right
	fill(100, 100, b);
	rect(200, 0, 400, 200);
  
  // Bottom left
	fill(200, 100, c);
	rect(0, 200, 200, 400);
  
  // Button right
	fill(300, 100, d);
	rect(200, 200, 400, 400);

}var c;
var r;
var sr = 255;
var sb = 0;
var sg = 0;
var bw = 40;
var bh = 40;

function setup() {
  createCanvas(500, 500);
  c = new spots();
  background(255);
  b = new button();
}

function draw() {

  r = random(1);
  // I'm not sure how necessary it was to pass arguments through c
	c.display(r);
  if (c.spotson == false){
		b.display();
  }
}
// I didn't really need this function but I wanted to make sure
// it wouldn't appear unless the spots were done generating
function showButton(){
    push();
    fill(255);
  	strokeWeight(2);
  	stroke(0);
  	rectMode(CENTER);
    rect(width/2,height/2,bw,bh);
    strokeWeight(0);
    fill(0);
    textSize(14);
    textAlign(CENTER);
		text('reset', 250, 250);
  	pop();
}

function mousePressed() {
	if (mouseX >= (width/2)-(bw/2) && mouseX <= (width/2)+(bw/2)){
    if (mouseY >= (height/2)-(bh/2) && mouseY <= (height/2)+(bh/2)){
    	if (c.spotson == false){
        // resets the pattern (idk if this is good practice to manipulate
        // an objects variables like this. Probably should have created
        // a c.clicked() function within the spots() function)
        // since this is the only thing you can click however it makes
        // some sense for it to appear here too?? I'm not sure
        background(255);
        c.dir = "down";
        c.counter = 0;
        c.y = 0;
        c.x = 0;
        c.spotson = true;
        sr = random(255);
        sb = random(255);
        sg = random(255);
        
      }
    }
  }
}


function spots(){
  this.x = 0;
	this.y = 0;
	this.counter = 0;
	this.spotson = true;
  
  strokeWeight(0);
  ellipseMode(CENTER);
  
  this.display = function(r){
    
    // if spotson that means spots are meant to be drawn rn
    if (this.spotson){
      if (r < 0.4){
        fill(sr,sg,sb);
    		ellipse(this.x,this.y,10);
  		}
  		else{
        fill(sb,sg,sr);
    		ellipse(this.x,this.y,5);
  		}
  	}
  // Check Direction
    	if( this.x == (this.counter*20) && this.y < height - (this.counter*20)){
    		 this.dir = "down";
    	} 
    	else if(this.y == (height - this.counter*20) && this.x < width - (this.counter*20)){
      	this.dir = "right";
        }
    	else if ( this.x == (width - this.counter*20) && this.y >= height - (this.counter*20)){
      	this.dir = "up";
    	}else if (this.y == (this.counter*20) && this.x >=width - (this.counter*20)){
      	this.dir = "left";
    	}
	// Whenever it completes the circuit the counter increases
  if (this.x == (this.counter*20) && this.y == (this.counter*20)){
    this.counter++;
  }
  // end the loop 
    // CHANGE COUNTER FOR DIFFERENT CANVAS SIZES
    // I don't know how to calculate a formula to figure out what counter is needed
  if (this.counter == 13){
    this.dir = 0;
    this.spotson = false;
  }
  // different directions
  // didn't really have to do a switch statement for this (probs could have
  // combined with my if statements above) but the switch statement  makes
  // it look neater 
    switch(this.dir){
    case "down": this.y+=20;break;
    case "right": this.x+=20;break;
    case "up": this.y-=20;break;
    case "left": this.x-=20;break;
      default: break;
    }
  
  }
	

}function make2DArray(cols, rows) {
  var arr = new Array(cols); //like arr[]; but with number of columns hardcoded
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let angle = 0;
let rez = 60;
let cols, rows;

let curves = [];

function setup() {
  createCanvas(600, 600);
  cols = floor((width - rez) / rez);
  rows = floor((height - rez) / rez);

  curves = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      curves[i][j] = new Curve(rez + i * rez + rez / 2, rez + j * rez + rez / 2);
    }
  }
}

function draw() {
  background(0);
  let d = rez - 20;

  for (let i = 0; i < cols; i++) {
    let cx = rez + i * rez + rez / 2;
    let cy = rez / 2;
    let x = d / 2 * cos(angle * (i + 1) - PI / 2);
    let y = d / 2 * sin(angle * (i + 1) - PI / 2);
    strokeWeight(1);
    stroke(255);
    noFill();
    ellipse(cx, cy, d, d);
    strokeWeight(8);
    point(cx + x, cy + y);

    for (let j = 0; j < rows; j++) {
      curves[i][j].setX(cx + x);
    }

    stroke(255, 100);
    strokeWeight(1);
    line(x + cx, 0, x + cx, height);
  }

  for (let j = 0; j < rows; j++) {
    let cy = rez + j * rez + rez / 2;
    let cx = rez / 2;
    let x = d / 2 * cos(angle * (j + 1) - PI / 2);
    let y = d / 2 * sin(angle * (j + 1) - PI / 2);
    strokeWeight(1);
    stroke(255);
    noFill();
    ellipse(cx, cy, d, d);
    strokeWeight(8);
    point(cx + x, cy + y);

    for (let i = 0; i < rows; i++) {
      curves[i][j].setY(cy + y);
    }

    stroke(255, 100);
    strokeWeight(1);
    line(0, y + cy, width, y + cy);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      curves[i][j].update();
      curves[i][j].show();
    }
  }

  angle -= 0.01;

  if (angle < -TWO_PI) {
    angle = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        curves[i][j] = new Curve(rez + i * rez + rez / 2, rez + j * rez + rez / 2);
      }
    }
  }
}// Daniel Shiffman
// Code for: https://youtu.be/0jjeOYMjmDU

let angle = 0;
let slider;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}

function draw() {
  background(51);
  angle = slider.value();
  stroke(255);
  translate(200, height);
  branch(100);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }
}const words = [];
const elts = [];
let counter = 0;
for (let i = 0; i < 100; i++) {
  words.push('' + i);
}


function setup() {
  noCanvas();
  for (let i = 0; i < words.length; i++) {
    elts[i] = new Word(words[i]);
    elts[i].init(i);
  }
}
function setup() {
  createCanvas(400, 400);
  background(100);
  let button = createButton('hello');
  button.mousePressed(() => background(255, 0, 0));
  loadJSON('data.json',  data => ellipse(data.x, data.y, 100));
  
  // button.mousePressed(() => {
  //   background(255, 0, 0);
  // });

  
  // button.mousePressed(function() {
  //   background(255, 0, 0);
  // });
}let words = [];
for (let i = 0; i < 3000; i++) {
  words.push('' + i);
}


function setup() {

  noCanvas();


  // createCanvas(200, 200);
  // background(100);
  // let button = createButton('hello');
  // button.mousePressed(() => background(random(255)));

  let i = 0;
  for (let i = 0; i < words.length; i++) {
    setTimeout(function() {
      let word = words[i];
      let s = createSpan(word);
      s.mouseOver(() => s.style('background-color', '#AAA'));
      s.mouseOut(() => s.style('background-color', '#'));
      createSpan(' ');
    }, i * 1);
  }
}function setup() {
  var c = createCanvas(100, 100);
  background(200);
  textAlign(CENTER);
  text('drop image', width / 2, height / 2);
  c.dragOver(test);
  c.drop(gotFile);
}

function test() {
  background(255,0,0);
}

function gotFile(file) {
  var img = createImg(file.data);
}function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  noFill();
  strokeWeight(4);
  arc(200, 200, 100, 100, 0, 180);
}// Daniel Shiffman
// http://codingtra.in

// Clock
// Video: https://youtu.be/E4RyStef-gY

 function setup() {
   createCanvas(400, 400);
   angleMode(DEGREES);
 }

 function draw() {
   background(0);
   translate(200, 200);
   rotate(-90);

   let hr = hour();
   let mn = minute();
   let sc = second();

   strokeWeight(8);
   stroke(255, 100, 150);
   noFill();
   let secondAngle = map(sc, 0, 60, 0, 360);
   //arc(0, 0, 300, 300, 0, secondAngle);

   stroke(150, 100, 255);
   let minuteAngle = map(mn, 0, 60, 0, 360);
   //arc(0, 0, 280, 280, 0, minuteAngle);

   stroke(150, 255, 100);
   let hourAngle = map(hr % 12, 0, 12, 0, 360);
   //arc(0, 0, 260, 260, 0, hourAngle);

   push();
   rotate(secondAngle);
   stroke(255, 100, 150);
   line(0, 0, 100, 0);
   pop();

   push();
   rotate(minuteAngle);
   stroke(150, 100, 255);
   line(0, 0, 75, 0);
   pop();

   push();
   rotate(hourAngle);
   stroke(150, 255, 100);
   line(0, 0, 50, 0);
   pop();

   stroke(255);
   point(0, 0);


   //  fill(255);
   //  noStroke();
   //  text(hr + ':' + mn + ':' + sc, 10, 200);
 }let txt;

function preload() {
  txt = loadStrings('license_test.txt');
}

function setup() {
  noCanvas();
  //console.log();
  
  let alltxt = join(txt, ' ');
  //let words = split(alltxt, ' ');
  words = alltxt.split(' ');
  
  console.log(words);
  words = words.reverse();
  alltxt = join(words, ' ');
  createP(alltxt);
  
//   for (let w of words) {
//     createP(w);
    
//   }
  
  //createP(join(txt, '<br/>'));
  

  
  
  
  
//   let p1 = createP("Hello");
//   p1.style("background-color", "#AAF");
  
//   let p2 = select("#blueberry");
//   p2.style("background-color", "#FAA");
  
  
  
//   let elt = document.createElement("p");
//   elt.innerHTML = "hello again";
//   document.body.appendChild(elt);
    
}

/*
 * @name Video Capture
 * @frame 710,240
 * @description <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.dom">p5.dom library</a>
 * at least one video file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p><br><br>
 * Capture video from the webcam and display
 * on the canvas as well with invert filter. Note that by
 * default the capture feed shows up, too. You can hide the
 * feed by uncommenting the capture.hide() line.
 */
var capture;

function setup() {
  createCanvas(390, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  //capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, 320, 240);
  filter('INVERT');
}
/*
 * @name Video Capture
 * @frame 710,240
 * @description <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.dom">p5.dom library</a>
 * at least one video file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p><br><br>
 * Capture video from the webcam and display
 * on the canvas as well with invert filter. Note that by
 * default the capture feed shows up, too. You can hide the
 * feed by uncommenting the capture.hide() line.
 */
var capture;

function setup() {
  createCanvas(390, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  //capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, 320, 240);
  filter('INVERT');
}
function setup() {
  createCanvas(400, 400);  
}

function draw() {
  
  // This draws the background color
  background(255,200,100);
  
  // This draws my beautiful 
  fill(255,0,0);
  stroke(0,0,255);
  strokeWeight(10);
  ellipse(100, 300, 100, 200);
  
  fill(0,255,0);
  ellipse(200, 300, 50, 50);
  
}function setup() {
  createCanvas(400, 400);
}

function draw() {}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    background(0);
  } else if (keyCode === RIGHT_ARROW) {
    background(255);
  }
}let dropdown;
let video;
let button;
let shot;
let img;
let dropdownCountry;
let dropdownGender;
let images = {};





var dragging = false;
var rollover = false;
var x, y, w, h;
var offsetX, offsetY;











function preload() {
	images = {
		"ChileMale": loadImage('Chile.Male.png'),
		"ChileFemale": loadImage('Chile.Female.png'),

		"CubaFemale": loadImage('Cuba.Female.png'),
		"CubaMale": loadImage('Cuba.Male.png'),


		"PeruFemale": loadImage('Peru.Female.png'),
		"PeruMale": loadImage('Peru.Male.png'),


		"MexicoFemale": loadImage('Mexico.Female.png'),
		"MexicoMale": loadImage('Mexico.Male.png'),


		"BoliviaFemale": loadImage('Bolivia.Female.png'),
		"BoliviaMale": loadImage('Bolivia.Male.png'),


		"ArgentinaFemale": loadImage('Argentina.Female.png'),
		"ArgentinaMale": loadImage('Argentina.Male.png'),


		"BrazilFemale": loadImage('Brazil.Female.png'),
		"BrazilMale": loadImage('Brazil.Male.png'),


		"EcuadorFemale": loadImage('Ecuador.Female.png'),
		"EcuadorMale": loadImage('Ecuador.Male.png'),


		"ColombiaFemale": loadImage('Colombia.Female.png'),
		"ColombiaMale": loadImage('Colombia.Male.png'),


		"AlgeriaFemale": loadImage('Algeria.Female.png'),
		"AlgeriaMale": loadImage('Algeria.Male.png'),


		"SouthAfricaFemale": loadImage('SouthAfrica.Female.png'),
		"SouthAfricaMale": loadImage('SouthAfrica.Male.png'),


		"TunisiaFemale": loadImage('Tunisia.Female.png'),
		"TunisiaMale": loadImage('Tunisia.Male.png'),


		"UgandaFemale": loadImage('Uganda.Female.png'),
		"UgandaMale": loadImage('Uganda.Male.png'),


		"KenyaFemale": loadImage('Kenya.Female.png'),
		"KenyaMale": loadImage('Kenya.Male.png'),


		"TanzaniaFemale": loadImage('Tanzania.Female.png'),
		"TanzaniaMale": loadImage('Tanzania.Male.png'),


		"IsraelFemale": loadImage('Israel.Female.png'),
		"IsraelMale": loadImage('Israel.Male.png'),


		"YemenFemale": loadImage('Yemen.Female.png'),
		"YemenMale": loadImage('Yemen.Male.png'),


		"MoroccoFemale": loadImage('Morocco.Female.png'),
		"MoroccoMale": loadImage('Morocco.Male.png'),

		"CanadaFemale": loadImage('Canada.Female.png'),
		"CanadaMale": loadImage('Canada.Male.png'),

		"FranceFemale": loadImage('France.Female.png'),
		"FranceMale": loadImage('France.Male.png'),

		"HangaryFemale": loadImage('Hangary.Female.png'),
		"HangaryMale": loadImage('Hangary.Male.png'),

		"PortugalFemale": loadImage('Portugal.Female.png'),


		"SpainFemale": loadImage('Spain.Female.png'),
		"SpainMale": loadImage('Spain.Male.png'),

		"SwitzerlandFemale": loadImage('Switzerland.Female.png'),
		"SwitzerlandMale": loadImage('Switzerland.Male.png'),

		"U.S.A20SFemale": loadImage('U.S.A20S.Female.png'),
		"U.S.A20SMale": loadImage('U.S.A20S.Male.png'),

		"UKVictorianFemale": loadImage('UKVictorian.Female.png'),
		"UKVictorianMale": loadImage('UKVictorian.Male.png'),

		"WalesFemale": loadImage('Wales.Female.png'),
		"WalesMale": loadImage('Wales.Male.png'),


	}
}

function setup() {
	createCanvas(600, 600);
	background(0);

	video = createCapture(VIDEO);
	video.size(700, 700);
	video.hide();
	createP("");

	button = createButton('snap');
	button.mousePressed(takesnap);
	createP("");

	button = createButton('Select Country');
	dropdownCountry = createSelect();
	dropdownCountry.option('Chile');
	dropdownCountry.option('Cuba');
	dropdownCountry.option('Peru');
	dropdownCountry.option('Mexico');
	dropdownCountry.option('Bolivia');
	dropdownCountry.option('Argentina');
	dropdownCountry.option('Brazil');
	dropdownCountry.option('Ecuador');
	dropdownCountry.option('Colombia');
	dropdownCountry.option('Algeria');
	dropdownCountry.option('SouthAfrica');
	dropdownCountry.option('Tunisia');
	dropdownCountry.option('Uganda');
	dropdownCountry.option('Kenya');
	dropdownCountry.option('Tanzania');
	dropdownCountry.option('Israel');
	dropdownCountry.option('Yemen');
	dropdownCountry.option('Morocco');
	dropdownCountry.option('Canada');
	dropdownCountry.option('France');
	dropdownCountry.option('Hangary');
	dropdownCountry.option('Italy');
	dropdownCountry.option('Portugal');
	dropdownCountry.option('Spain');
	dropdownCountry.option('Switzerland');
	dropdownCountry.option('U.S.A20S');
	dropdownCountry.option('UKVictorian');
	dropdownCountry.option('Wales');

	createP("");

	button = createButton('Select Gender');
	dropdownGender = createSelect();
	dropdownGender.option('Male');
	dropdownGender.option('Female');
	createP("");

	button = createButton('Apply Outfit');
	button.mousePressed(addImage);
} {
	// Starting location
	x = 150;
	y = 30;
	// Dimensions150, 30, 2600, 2600);
	w = 2600;
	h = 2600;
}

function addImage() {
	let country = dropdownCountry.value();
	let gender = dropdownGender.value();

	let imageKey = country + gender;
	console.log("imageKey: ", imageKey);

	// ChileMale
	img = images[imageKey];
}

function takesnap() {
	shot = video.get();
}

function draw() {
	if (shot) {
		image(shot, 0, 0);
	}
	if (img) {
		image(img, x, y, w, h);
	}

	if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
		rollover = true;
	} else {
		rollover = false;
	}


	if (dragging) {
		x = mouseX + offsetX;
		y = mouseY + offsetY;

	}
}

function mousePressed() {

	if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
		dragging = true;
		offsetX = x - mouseX;
		offsetY = y - mouseY;
		console.log(dragging);
	}
}

function mouseReleased() {
	// Quit dragging
	dragging = false;

}let a = 0;
let z = 0;

function setup() { 
  createCanvas(400, 400, WEBGL);
} 

function draw() { 
  background(220);
	ambientLight(255,0,0);
  // fill(0);
  // rect(-200,-200,100,100);
  
  rect(-50,75,10,10);

  stroke(0);
  noFill();
  //box(200,100,350);
  //translate(-50,75, z);
  rotateX(a);
  sphere(50);
  
  z -= 5;
  if (z < -500) {
    z = 0;
  }
  a += 0.01;
}function setup() { 
  createCanvas(400, 400);
  background(220);
} 

function draw() { 
  ellipse(mouseX,mouseY, 20, 20);
}var kinectron = null;


function preload() {

}


function setup() {
  createCanvas(640, 480);
  var address = {
    host: '172.16.216.84',
    port: 9001,
    path: '/'
  };
  kinectron = new Kinectron('kinectron', address);
  kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  background(0);
  //set the callback function name to be called when stuff comes from kinect
}

function draw() {

}

function trackBody(body) {
  console.log("hello");
  console.log(body.joints[kinectron.HANDRIGHT].depthZ);
  if (body.joints[kinectron.HANDRIGHT].depthZ < 0.5 ) {
    background(0);
    var val;
    val = body.joints[kinectron.HANDRIGHT].depthX;
    var rightHandX = map(val, 0, 1, 0, width);
    val = body.joints[kinectron.HANDRIGHT].depthY;
    var rightHandY = map(val, 0, 1, 0, height);
    val = body.joints[kinectron.HANDLEFT].depthX;
    var leftHandX = map(val, 0, 1, 0, width);
    val = body.joints[kinectron.HANDLEFT].depthY;
    var leftHandY = map(val, 0, 1, 0, height);

    fill(255);
    ellipse(rightHandX, rightHandY, 20, 20);
    ellipse(leftHandX, leftHandY, 20, 20);
  }

}var story = {
  "start": ['Once upon a time, there was a #adj# #hero#'],
  "hero": ['fairy', 'unicorn', 'dragon', 'bear'],
  "adj": ['smart', 'pretty', 'smelly', 'funny', 'angry']
}
var grammar;

function setup() {
  createCanvas(400, 400);
  grammar = tracery.createGrammar(story);
  var expansion = grammar.flatten('#start#');
  print(expansion);
}

function draw() {
  background(220);
}let img;

function setup() {
  createCanvas(400, 400);
  img = createImg('http://cobaroundthecorner.org/wp-content/uploads/2016/12/Original-popcorn-300x300.png');
  img.size(50, 50);
  background(255);

}

function draw() {
  if (img) {
    for (let i = 0; i < 10; i++) {
      let offsetx = random(-50, 50);
      let offsety = random(-50, 50);
      image(img, mouseX + offsetx, mouseY + offsety);
    }
  }
}let video;
let button;
let snapshot;

function setup() {
  createCanvas(320, 240);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  button = createButton('snap');
  button.mousePressed(takesnap);
}

function takesnap() {
  snapshot = video.get();
}

function draw() {
  if (snapshot) {
    image(snapshot,0,0);
  }
}let img;
let x, y;

function setup() {
  createCanvas(640, 480);
  x = width / 2;
  y = height / 2;
  background(0);
  img = createCapture(VIDEO);
  //img.hide();
}

function draw() {
  //image(img,0,0);
  for (let i = 0; i < 25; i++) {
    let x = floor(random(width));
    let y = floor(random(height));
    let col = img.get(x, y);
    col[3] = 50;
    //console.log(col);
    fill(col);
    noStroke();
    ellipse(x, y, 30);
  }

  // x += random(-50, 50);
  // y += random(-50, 50);
  // x = constrain(x, 0, width);
  // y = constrain(y, 0, height);



}let img;

function preload() {
  //img = createImg('http://turtlebackzoo.com/wp-content/uploads/2017/03/exhibit-headers_sea-turtles-600x400.jpg');
  img = loadImage("turtle.jpg");
} 
function setup() { 
  createCanvas(600, 400);
  background(0);
  //img.hide();
} 

function draw() {
  //image(img,0,0);

  let col = img.get(mouseX, mouseY);
  fill(col);
  noStroke();
  ellipse(mouseX, mouseY, 60);
  
  
}
let weather;
let x = 36;
let y = 36;
let xdirection = 1;
let ydirection = 1;

let api = 'https://api.openweathermap.org/data/2.5/weather?q=';
let city = 'NewYork';
let apiKey = '&APPID=3a6c728f7ad54686e4fda6ce19821184';
let units = '&units=metric';

let input;
let button;
function preload() {
  leaf = loadImage("leaf.png");
}

function setup() {
  createCanvas(600, 400);
  input = createInput('New York');
  button = createButton('submit');
  button.mousePressed(weatherAsk);
}

function weatherAsk() {
  city = input.value();
  let url = api + city + apiKey + units;
  console.log(encodeURI(url));
  loadJSON(encodeURI(url), gotData);
}

function gotData(data) {
  weather = data;
  console.log(weather.wind.speed);
}

function draw() {
  background(207, 242, 255);
  image(leaf, x, y, 70, 70);
  
  if (frameCount % 60 == 0) {
    weatherAsk();
  }

  if (weather) {
    let windspeed = weather.wind.speed;
//    let ywindspeed = weather.wind.speed;
    x += windspeed * xdirection;
    y += windspeed * ydirection;
//    y += ywindspeed;
    if (x > width - 70 || x < 0) {
    	xdirection *= -1;
  	}
    if (y > height - 70 || y < 0) {
    	ydirection *= -1;
      
  	}
    
  }
}let img;

// function preload() {
//    img = loadImage('turtle.jpg');
// }
function setup() { 
  createCanvas(600, 400);
  img = createCapture(VIDEO);
   background(0);
}

function draw() {
  //image(img,0,0);
  let col = img.get(mouseX, mouseY);
  fill(col, 100);
  noStroke();
  ellipse(mouseX,mouseY,24);
  
}
let img;

function preload() {
   img = loadImage('turtle.jpg');
}
function setup() { 
  createCanvas(600, 400);
   background(0);
}

function draw() {
  //image(img,0,0);
  let col = img.get(mouseX, mouseY);
  fill(col, 100);
  noStroke();
  ellipse(mouseX,mouseY,24);
  
}
let img;

function preload() {
   img = createImg('http://turtlebackzoo.com/wp-content/uploads/2017/03/exhibit-headers_sea-turtles-600x400.jpg');
}
function setup() { 
  createCanvas(400, 400);
  img.hide();
  background(0);
  image(img,0,0);
} 
// Daniel Shiffman
// Code for: https://youtu.be/2O3nm0Nvbi4

var song;
var fft;
var button;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('beat.mp3');
}

function setup() {
  createCanvas(512, 256);
  colorMode(HSB);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.9, 64);
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  var w = width / spectrum.length;
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    fill(i, 255, 255);
    stroke(i, 255, 255);
    //line(0, 0, x, y);
    //vertex(x, y);
    var x = i*w;
    var y = map(amp, 0, 256, height, 0);
    rect(x, y, w - 2, height - y);
  }
  

}
// Daniel Shiffman
// Code for: https://youtu.be/q2IDNkUws-A

var mic;

function setup() {
  createCanvas(200, 200);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);
  let vol = mic.getLevel();
  stroke(255);
  fill(175);
  ellipse(100, 100, 200, 1 + vol * 200);
}var video;

var vScale = 16;
var slider;

var cols = 40;
var rows = 30;

var boxes = [];

function setup() {
  noCanvas();
  pixelDensity(1);
  createP('test');
  video = createCapture(VIDEO);
  video.size(cols, rows);
  slider = createSlider(0, 255, 77);

  for (var y = 0; y < rows; y++) {
    // noprotect
    for (var x = 0; x < cols; x++) {
      var box = createCheckbox();
      box.style('display', 'inline');
      box.parent('mirror');
      boxes.push(box);
    }
    var linebreak = createSpan('<br/>');
    linebreak.parent('mirror');
  }

}

function draw() {
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var bright = (r+g+b)/3;

      var threshold = slider.value();

      var checkIndex = x + y * cols;

      if (bright > threshold) {
        boxes[checkIndex].checked(false);
      } else {
        boxes[checkIndex].checked(true);
      }
    }
  }
 
}


var video;

var x = 0;

function setup() {
  createCanvas(800, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(320, 240);
  background(51);
}

function draw() {
  video.loadPixels();
  // image(video, 0, 0);

  var w = video.width;
  var h = video.height;

  copy(video, w/2, 0, 1, h, x, 0, 1, h);

  x = x + 1;
  
  if (x > width) {
    x = 0;
  }


}

// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 16-6: Drawing a grid of squares

// Size of each cell in the grid, ratio of window size to video size
// 40 * 16 = 640
// 30 * 16 = 480
var videoScale = 16;

// Number of columns and rows in our system
var cols, rows;

function setup() {
  createCanvas(640, 480);

  // Initialize columns and rows
  cols = width/videoScale;
  rows = height/videoScale;

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
  //video.hide();
}

function mousePressed() {
}

function draw() {
  background(0);
  video.loadPixels();

  // Begin loop for columns
  for (var i = 0; i < cols; i++) {
    // Begin loop for rows
    for (var j = 0; j < rows; j++) {
      // Reversing x to mirror the image
      // In order to mirror the image, the column is reversed with the following formula:
      // mirrored column = width - column - 1
      var loc = ((cols - i - 1) + j * cols) * 4;
      
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r = video.pixels[loc   ]; 
      var g = video.pixels[loc + 1];
      var b = video.pixels[loc + 2];

      // A rectangle size is calculated as a function of the pixel's brightness. 
      // A bright pixel is a large rectangle, and a dark pixel is a small one.
      var sz = map((r+g+b)/3, 0, 255, 0, videoScale);
      rectMode(CENTER);
      fill(255);
      noStroke();
      // For every column and row, a rectangle is drawn at an (x,y) location scaled and sized by videoScale.
      var x = i*videoScale;
      var y = j*videoScale;
      rect(x + videoScale/2, y + videoScale/2, sz, sz);
    }
  }
}

var video;
var button;
var snapshots = [];

function setup() {
  createCanvas(400, 300);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  button = createButton('snap');
  button.mousePressed(takesnap);
}

function takesnap() {
  snapshots.push(video.get());
  if (snapshots.length > 25) {
    snapshots.splice(0, 1);
  }
}

function draw() {
  if (frameCount % 20 == 0){ 
  takesnap();
  }
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;

  for (var i = 0; i < snapshots.length; i++) {
    image(snapshots[i], x, y, w, h);
    x = x + w;
    if (x >= width) {
      x = 0;
      y = y + h;
    }
  }
}var video;
var button;
var snapshots = [];

function setup() {
  createCanvas(400, 300);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  button = createButton('snap');
  button.mousePressed(takesnap);
}

function takesnap() {
  snapshots.push(video.get());
  if (snapshots.length > 25) {
    snapshots.splice(0, 1);
  }
}

function draw() {
  if (frameCount % 20 == 0){ 
  takesnap();
  }
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;

  for (var i = 0; i < snapshots.length; i++) {
    image(snapshots[i], x, y, w, h);
    x = x + w;
    if (x >= width) {
      x = 0;
      y = y + h;
    }
  }
}var video;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  // The above function actually makes a separate video
  // element on the page.  The line below hides it since we are
  // drawing the video to the canvas
  video.hide();
}

function draw() {
  background(0);
  // Step 5. Display the video image.
  image(video, 0, 0, width, height);
}
let angle = 45;
let xradius = 200;
let yradius = 100;
let stepsize = 15;
let slider;

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  slider = createSlider(5, 100, 5);
}


function draw() {
  background(220);
  translate(width / 2, height / 2);
  strokeWeight(1);
  noFill();
  stepsize = slider.value();
  beginShape();
  let a = 0;

  for (let angle = 0; angle < 360; angle += stepsize) {
    let offset = abs(sin(a)) * 20;
    xradius = 200 + offset;
    yradius = 100 + offset;
    let x = xradius * cos(angle);
    let y = yradius * sin(angle);
    vertex(x, y);
    a = a + 55;
  }
  endShape(CLOSE);
  // fill(255, 0, 0);
  // rect(-200, -200, 10, 10);


}let startA = 0;

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  stroke(0);

  let w = 200;
  let h = 100;
  let angle = startA;
  beginShape();
  for (let a = 0; a < 360; a+=1) {
    let offset = sin(angle)*15 + 40*noise(a*0.1);
    let x = (w+offset) * cos(a);
    let y = (h+offset) * sin(a);
    curveVertex(x,y);
    angle += 10;
  }
  endShape(CLOSE);
  
  startA+=5;

}// Daniel Shiffman
// Wikipedia
// Video tutorial: https://youtu.be/RPz75gcHj18

let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

let userInput;

let counter = 0;

function setup() {
  noCanvas();
  userInput = createInput('apple');
  let button = createButton('submit');
  button.mousePressed(startSearch);
  //goWiki(userInput.value());

  function startSearch() {
    counter = 0;
    goWiki(userInput.value());
  }

  function goWiki(term) {
    counter = counter + 1;

    if (counter < 10) {
      //let term = userInput.value();
      let url = searchUrl + term;
      loadJSON(url, gotSearch, 'jsonp');
    }
  }

  function gotSearch(data) {
    // console.log(data);
    let len = data[1].length;
    let index = floor(random(len));
    let title = data[1][index];
    // Spaces behind underscore
    title = title.replace(/ /g, '_');
    createDiv(title);
    console.log('Querying: ' + title);
    let url = contentUrl + title;
    loadJSON(url, gotContent, 'jsonp');
  }

  function gotContent(data) {
    let page = data.query.pages;
    let pageId = Object.keys(data.query.pages)[0];
    console.log(pageId);
    let content = page[pageId].revisions[0]['*'];
    console.log(content);
    let wordRegex = /\b\w{4,}\b/g;
    let words = content.match(wordRegex);
    let word = random(words);
    goWiki(word);
    console.log(word);
  }
}let search;
let button;

function setup() {
  noCanvas();
  search = select('#keyword');
  button = select('#submit');
  button.mousePressed(askAPI);
}

function askAPI() {
  let url = 'https://itp.nyu.edu/ranch/api/projects-finder/' + search.value();
  console.log(url);
  loadJSON(url, gotData);
}

function gotData(data) {
  for (let i = 0; i < data.length; i++) {
    createDiv(data[i].name);
  }
}// Thank you to: https://github.com/dariusk/metaphor-a-minute/blob/master/metaphor.js

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

// Call to get a random noun
var randomNounURL = "https://api.wordnik.com/v4/words.json/randomWord?" +
  "&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&" +
  "&includePartOfSpeech=noun" +
  "&minLength=5&maxLength=-1" +
  "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";


// A random Adjective
var randomAdjURL = "https://api.wordnik.com/v4/words.json/randomWord?" +
  "&includePartOfSpeech=adjective" +
  "&minLength=5&maxLength=-1" +
  "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";


// A random word
var randomWordURL = "https://api.wordnik.com/v4/words.json/randomWord?" +
  "&minLength=5&maxLength=-1" +
  "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";

function setup() {
  noCanvas();
  // Some buttons
  var button1 = createButton('word');
  button1.mousePressed(randomWord);

  var button2 = createButton('adjective');
  button2.mousePressed(randomAdj);

  var button3 = createButton('noun');
  button3.mousePressed(randomNoun);
}

// Load the JSON for each one
function randomWord() {
  loadJSON(randomWordURL, wordLoaded);
}

function randomAdj() {
  loadJSON(randomAdjURL, wordLoaded);
}

function randomNoun() {
  loadJSON(randomNounURL, wordLoaded);
}

function wordLoaded(data) {
  createDiv(data.word);
}var api = "http://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=happy";


function setup() {
  noCanvas();
  let url = api + apiKey + query;
  loadJSON(url, gotData);
}

function gotData(giphy) {
  for (let i = 0; i < giphy.data.length; i++) {
    let img = createImg(giphy.data[i].images.original.url);
    img.size(200, 200);
  }
}var weather;

let api = 'http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
let units = '&units=metric';

let input;

function setup() {
  createCanvas(400, 200);

  var button = select('#submit');
  button.mousePressed(weatherAsk);

  input = select('#city');
}

function weatherAsk() {
  let url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
}

function gotData(data) {
  weather = data;
}

function draw() {
  background(0);
  if (weather) {
    let temp = weather.main.temp;
    var humidity = weather.main.humidity;
    ellipse(100, 100, temp, temp);
    ellipse(300, 100, humidity, humidity);
  }
}var data;

function preload() {
  data = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/birds_antarctica.json");
}

function setup() {
  noCanvas();

  var birds = data.birds;

  for (var i = 0; i < birds.length; i++) {
    createElement('h1', birds[i].family);
    var members = birds[i].members;
    for (var j = 0; j < members.length; j++) {
      createDiv(members[j]);
    }
  }
}let flower;

// var flower = {
//   "name": "sunflower",
//   "r": 255,
//   "g": 200,
//   "b": 0
// }

function preload() {
  flower = loadJSON("flower.json");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  fill(flower.r, flower.g, flower.b);
  text(flower.name, 10, 50);
}let data;

function preload() {
  data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/materials/gemstones.json');
}

function setup() { 
  createCanvas(400, 400);
  background(0);
  createP(data.description);
  createA(data.source,'source');
  for (let i = 0; i < data.gemstones.length; i++) {
    fill(255);
    textAlign(CENTER);
    text(data.gemstones[i],random(width),random(height));
  }
  //console.log(data);
} 

let p;
function setup() {
  let button = createButton('test');
  let input = createInput('name');

  // addCircle(); // execute the function!
  button.mousePressed(press); // make the function a callback!
  
  function press() {
    button.html('step ' + random(10));
    input.value('test');
  }
}

let p;
function setup() {
  let canvas = createCanvas(400, 400);
  particle = new Particle();
  background(0);
  canvas.mousePressed(function() {
    particle.show();
  });
  
  // addCircle(); // execute the function!
  canvas.mousePressed(addCircle); // make the function a callback!
}


function addCircle() {
  fill(255);
  ellipse(random(width), random(height), 64);
}


class Particle {
  constructor() {
    this.x = 100;
    this.y = 100;
  }

  show() {
    console.log(this);
    ellipse(this.x, this.y, 64);
  }



}// Input from user
let input;

function setup() {
  noCanvas();

  // Grab the input and button from HTML
  input = createInput('rainbow');
  button = createButton('submit');
  // Attach a callback to button press
  button.mousePressed(search);
}

// Run the API call
function search() {
  let term = input.value();

  // URL for querying the times
  let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?'
          + 'api-key=99cfea65a5bb30650b3d31eb1713233e:15:73386102'
          + '&q=' + term;

  // Query the URL, set a callback
  // 'jsonp' is needed for security
  console.log(url);
  loadJSON(url, gotData);
}

// Request is completed
function gotData(data) {
  console.log(data);
  // Go through and show some results
  docs = data.response.docs;

  // Iterate through the articles in "docs"
  for (let i = 0; i < docs.length; i++) {

    // Make each headline a link to the article
    let headline = createElement('h3', '');
    let link = createA(docs[i].web_url, docs[i].headline.main);
    // Make a <p> for "lead paragraph"
    let par = createP(docs[i].snippet);
  }
}// Input from user
var input;

function setup() {
  noCanvas();

  // Grab the input and button from HTML
  input = createInput('computer');
  var button = createButton('submit');
  // Attach a callback to button press
  button.mousePressed(search);
}

// Run the API call
function search() {
  var term = input.value();

  // URL for querying the times
  var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.jsonp?'
          + 'callback=svc_search_v2_articlesearch&api-key=sample-key'
          + '&q=' + term;

  // Query the URL, set a callback
  // 'jsonp' is needed for security
  loadJSON(url, gotData, 'jsonp');
}

// Request is completed
function gotData(data) {
  console.log(data);
  // Go through and show some results
  docs = data.response.docs;

  // Iterate through the articles in "docs"
  for (var i = 0; i < docs.length; i++) {

    // Make each headline a link to the article
    var headline = createElement('h3', '');
    var link = createA(docs[i].web_url, docs[i].headline.main);
    link.parent(headline);

    // Make a <p> for "lead paragraph"
    var par = createP(docs[i].lead_paragraph);
  }
}let data;
function preload() {
   data = loadJSON('test.json');
}

function setup() { 
  createCanvas(400, 400);
  console.log(data);
} 

function draw() { 
  background(220);
}let img;

function preload() {
  img = loadImage("https://kittenrescue.org/wp-content/uploads/2017/03/KittenRescue_KittenCareHandbook.jpg");
  //data = loadJSON('http://nytimes.com/api/headlines');
}
function setup() { 
  createCanvas(400, 400);
  print(data);
} 

function draw() { 
  background(220);
}let data;


function preload() {
  data = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/art/isms.json");  
  //data = loadJSON('http://nytimes.com/api/headlines');
}

function setup() { 
  createCanvas(400, 400);
  background(0);
  print(data.description);
  print(data.test);
  fill(255);
  for (let i = 0; i < data.names.length; i++) {
    textAlign(CENTER);
    text(data.names[i],random(width),random(height)); 
    createP(data.names[i]);
  }
} 

// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // STEP 1 Instantiate our SerialPort object
  serial = new p5.SerialPort();
	
  // STEP 2 Set port (Get this from p5 serial control app!)
  serial.open("/dev/cu.usbmodem1411");

  // STEP 3 set up a callback to read data
  serial.onData(gotData);

}

// Ok here comes daya!
function gotData() {
  // Step 4a: read the data
  var currentString = serial.readLine(); // read the incoming string
  if (!currentString) return; // if the string is empty, do no more
  latestData = Number(currentString); // save it for the draw method
}

function draw() {
  background(255, 255, 255);
  fill(0, 0, 0);
  // Step 4b: use the data
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}let bouncers = [];
let gravity = 0.1;

function setup() {
  createCanvas(200, 200);
  let para = createP(random(100));
  let button = createButton("submit");
  button.mousePressed(addBouncer);
  para.mouseOver(removeBouncers);
}

function removeBouncers() {
  bouncers = [];
}



function addBouncer() {
  bouncers.push(new Ball(random(width), 100));
}

function draw() {
  background(220);

  for (let i = 0; i < bouncers.length; i++) {
    bouncers[i].render();
    bouncers[i].update();
  }

  if (bouncers.length > 100) {
    bouncers.splice(0, 1);
  }
}let bouncers = [];
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  // for (let i = 0; i < 5000; i++) {
  //   bouncers[i] = new Ball(random(width),random(height/2));
  // }
}

function mouseDragged() {
  bouncers.push(new Ball(mouseX,mouseY)); 
}

function draw() {
  background(220);
  
  for (let i = 0; i < bouncers.length; i++) {
    bouncers[i].render();
    bouncers[i].update();
  }
  
  if (bouncers.length > 100) {
    bouncers.splice(0,1); 
  }
}




let gravity = 0.1;
let bouncers = [];

function setup() {
  createCanvas(400, 400);
  let catButton = createButton('kitty cat');
  catButton.mousePressed(changeBG);
  catButton.style('font-size', '64pt');

  let puppyButton = createButton('spot');


  let numP = createP('Random number: ' + random(100));
  numP.style('background-color', 'pink');
  numP.mouseOver(paragraphChange);
  function paragraphChange() {
    numP.style('font-size', '64pt');
  }


  // createSlider(0,255,100);
  // createDiv('this is a div');
  // createCheckbox('on or off');
}

// function mousePressed() {
//   changeBG(); 
// }


function changeBG() {
  background(random(255));
}


function draw() {


  for (let i = 0; i < bouncers.length; i++) {
    bouncers[i].move();
    bouncers[i].show();
  }
}// Bouncing ball
let gravity = 0.1;
let bouncers = [];

function setup() { 
  createCanvas(400, 400);
  // for (let i = 0; i < 10; i++) {
  //   bouncers[i] = new Ball(i*50, 50, random(50));
  // }
} 

function mouseDragged() {
  bouncers.push(new Ball(mouseX, mouseY, 50)); 
}

function keyPressed() {
  if (key == 'd' || key == 'D') {
    print("D is pressed");
    bouncers.splice(0, bouncers.length);
  }
   
}

function draw() {
  background(220);
  for (let i = 0; i < bouncers.length; i++) {
    bouncers[i].move();
    bouncers[i].show();
  }
  
  if (bouncers.length > 50) {
    bouncers.splice(0, 1); 
  }
}
class Ball {
 	constructor(imag) {
    this.img = imag;
   this.x = random(width);
    this.y = random(height);
    this.xdir = random(-2,2);
    this.ydir = random(-2,2);
    this.width = 100;
    this.height = 100;
  }
  
  display() {
   //ellipse(this.x, this.y, this.width, this.height);
    image(this.img, this.x, this.y, 100, 100);
    if (this.x <= 0 || this.x >= width) {
     this.xdir *= -1; 
    }
    if (this.y <= 0 || this.y >= height) {
      this.ydir *= -1;
    }
    
    this.x += this.xdir;
    this.y += this.ydir;    
  }
  
  bounce() {
         this.xdir *= -1; 
      this.ydir *= -1;
  }
}

var balls = [];

var images = [];

function preload() {
  images[0] = loadImage("IMA-Sticker-coder-activist2.png");
  images[1] = loadImage("IMA-Sticker-Invent.png");
  images[2] = loadImage("IMA-Sticker-thinker-engineer2.png");
  images[3] = loadImage("IMA-Sticker-maker-artist2.png");
  images[4] = loadImage("IMA-Sticker2.png");

}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  balls[0] = new Ball(images[0]);
  balls[1] = new Ball(images[1]);
  balls[2] = new Ball(images[2]);
  balls[3] = new Ball(images[3]);
  balls[4] = new Ball(images[4]);
} 

function draw() { 
  background(255);
  
  for (var i = 0; i < balls.length; i++) {
   balls[i].display(); 
    // for (var j = 0; j < balls.length; j++) {
    //   if (j != i) {
    // //if (dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y)<100)
    //     if ((balls[i].x+100 > balls[j].x && balls[i].x < balls[j].x+100)
    //         && (balls[i].y+100 > balls[j].y && balls[i].y < balls[j].y+100))
    //    {
    //     balls[i].bounce(); 
    //      balls[j].bounce();
    //    }
    //   }
    // }
  }
}function setup() {
  createCanvas(400, 400);
  background(220);

  for (let x = 0; x < width; x += 50) {
    for (let y = 0; y < height; y += 50) {

      let d = dist(x, y, 200, 200);
      d = map(d, 0, width, 50, 0);
      ellipse(x, y, d, d);
    }
  }

}let bouncers = [];
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  bouncers[0] = new Ball(100,100);
  bouncers[1] = new Ball(225,125);
}

function draw() {
  background(220);
  
  bouncer1.render();
  bouncer2.render();

  bouncer1.update();
  bouncer2.update();
}




let bouncer1;
let bouncer2;
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  bouncer1 = new Ball(100,100);
  bouncer2 = new Ball(125,125);
}

function draw() {
  background(220);
  
  bouncer1.render();
  bouncer2.render();

  bouncer1.update();
  bouncer2.update();
}




// Bouncing ball
// no objects

let x = 200;
let y = 20;
let speed = 0;
let gravity = 0.1;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  fill(0);
  ellipse(x,y,24,24);
  
  y = y + speed;
  speed = speed + gravity;
  if (y > height) {
    y = height;
    speed = -1*speed;
  }
}function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  background(174, 215, 207);
  //tree
  for (let i = 0; i < 10; i++) {
    //drawTree(random(width), 385, random(100), random(0,10));
    drawTree(20 + i * 150, 385, 100, 4);
  }
  noLoop();
  // drawTree(180,380,300,3);
  // drawTree(300,250,40,3);
  // drawTree(120,350,180,2);
  // drawTree(120,350,180,2);
  // drawTree(520,365,230,2);
  // drawTree(500,390,110,2);
  // drawTree(420,250,20,3);
  // drawTree(90,380,50,2);
  // drawTree(210,385,10,3);
  // drawTree(320,275,200,2);
  // drawTree(331,375,10,1);
  //shroom
  drawMushroom();
}

// draws a tree with the center of its roots in x,y
function drawTree(x, y, h, leaves) {
  rectMode(CENTER);
  // change coordinates
  push();
  translate(x, y);
  // draw ground
  fill(3, 167, 134, 60);
  ellipse(0, 0, 80, 15);
  // draw trunk
  fill(0, 102, 51);
  rect(0, -h / 2, 15, h, 2);
  // draw leaves
  fill(3, 167, 134);
  push();
  for (var i = 0; i < leaves; i++) {
    triangle(0, -h - 100, 50, -h, -50, -h);
    translate(0, -25);
  }
  pop();
  // go back to original coordinates
  pop();
}

function drawMushroom() {
  strokeJoin(ROUND); // round the stroke corners
  strokeCap(ROUND); // round the line endings
  fill(3, 167, 134, 60);
  ellipse(400, 362, 35, 9);
  fill(253, 245, 230);
  rect(400, 352, 8, 20, 3); //stem
  fill(237, 1, 1);
  arc(400, 350, 40, 40, PI, TWO_PI); //cap
  fill(253, 245, 230);
  ellipse(391, 344, 5, 5);
  ellipse(400, 344, 5, 5);
  ellipse(405, 337, 5, 5);
  ellipse(395, 337, 5, 5);
  ellipse(410, 345, 5, 5); //spots
}
//function drawBee() {let img;
let hedgeHogSize = 1;

function preload() {
  img = loadImage('hedgehog.jpg');
}

function setup() {
  createCanvas(712, 497);
  background(0);
}


function draw() {
  background(0);
  imageMode(CENTER);
  tint(0,0,255);
  image(img, mouseX, mouseY, hedgeHogSize, hedgeHogSize);
  hedgeHogSize++;
}// Bouncing ball
let gravity = 0.1;
let bouncer1;
let bouncer2;

function setup() { 
  createCanvas(400, 400);
  bouncer1 = new Ball(100);
  bouncer2 = new Ball(50);
} 

function draw() {
  background(220);
  bouncer1.move();
  bouncer1.show();
  bouncer2.move();
  bouncer2.show();

}
// Bouncing ball
let gravity = 0.1;
let bouncer;

function setup() { 
  createCanvas(400, 400);
  bouncer = new Ball();
} 

function draw() {
  background(220);
  bouncer.move();
  bouncer.show();

}
// Bouncing ball
// no objects

let x = 200;
let y = 20;
let speed = 0;
let gravity = 0.1;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  fill(0);
  ellipse(x,y,24,24);
  
  y = y + speed;
  speed = speed + gravity;
  if (y > height) {
    y = height;
    speed = -1*speed;
  }
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);
  
} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }
drawRect (width/2, height/2, 300,300);
  
}

function drawRect (x,y,w,h) {
  // fill(0);
	rotate(mouseX,mouseY);
  if (mouseX > width/2) {
    fill("
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);
  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}let x;
let img;
let r = 20;

function preload() {
  img = loadImage('kitten.jpg');
}

function setup() {
  createCanvas(640, 480);
  image(img, 0, 0);
}


function draw() {
  background(0);
  imageMode(CENTER);
  image(img, mouseX, mouseY, r, r);
  
  r = r + 2;



}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}/* 
6.10 p5.js checking objects intersection part 2 (part 1 is in video 6.9)
*/

let bubbles = [];

function setup() {
  createCanvas(600, 400);
  for (var i = 0; i < 15; i++) {
    bubbles[i] = new Bubble(random(width), random(height));
  }
}

function draw() {
  background(0);

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    for (let j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      }
    }
  }
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 9-8: Write a Button class (see Example 5-5 
// for a non-object-oriented button). The button 
// class should register when a mouse is pressed over 
// the button and change color.  Create button objects 
// of different sizes and locations using an array. 
// Before writing the main program, sketch out the 
// Button class. Assume the button is off  when it 
// first appears.  

// An array of buttons
let buttons = [];

function setup() {
  createCanvas(600, 200);
  // A loop to evenly space out the buttons along the window
  for (var i = 0; i < 6; i++) {
    buttons[i] = new Button(i*100+25, height/2-25, 50, 50);
  }
}

function draw() {
  background(175);
  // Show all the buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].display();
  }
}

function mousePressed() {
  // When the mouse is pressed, we must check every single button
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].click(mouseX, mouseY);
  }
}var bubbles = [];
var emojis = [];

function preload() {
  emojis[0] = loadImage("images/emoji0.png"); 
}

function setup() {
  cnv = createCanvas(600, 400);   
}

function mousePressed() {
  let r = floor(random(0, emojis.length));
  let b = new Bubble(mouseX, mouseY, emojis[r]);
  bubbles.push(b);
}

function draw() {
  background(220);

  for (var i = bubbles.length-1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display(); 
  }
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 9-11: Resizing an array using append()

let bouncers = []; // We start with an array with just one element.
let gravity = 0.1;

function setup() {
  createCanvas(480, 480);
  for (let i = 0; i < 2; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(12,32);
    bouncers.push(new Ball(x,y,r));
  }
}

function draw() {
  background(51);
  
  // Update and display all balls
  for (var i = 0; i < bouncers.length; i++) { // Whatever the length of that array, update and display all of the objects.
    bouncers[i].update();
    bouncers[i].display();
  }
}

function mousePressed() {
  // A new ball object
  var b = new Ball(mouseX,mouseY,32); // Make a new object at the mouse location.
  bouncers.push(b);
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 9-10: Interactive stripes

// An array of stripes
let stripes = [];

function setup() {
  createCanvas(480, 270);
  
  // Initialize all Stripe objects
  for (var i = 0; i < 10; i ++ ) {
    stripes.push(new Stripe());
  }
}

function draw() {
  
  background(100);
  // Move and display all Stripe objects
  for (let i = 0; i < stripes.length; i ++ ) {
    // Check if mouse is over the Stripe
    stripes[i].rollover(mouseX,mouseY); // Passing the mouse coordinates into an object.
    stripes[i].move();
    stripes[i].display();
  }
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 8-5: Rewrite the gravity example from 
// Chapter 5 using objects with a Ball class. 
// Include two instances of a Ball object.

// Two ball objects
let ball1;
let ball2;

// Global gravity variable
let gravity = 0.1;

function setup() {
  createCanvas(480, 270);

  // Create ball objects
  ball1 = new Ball(150, 0, 16);
  ball2 = new Ball(350, 50, 32);
}

function draw() {
  background(51);

  // Display ball objects
  ball1.display();
  ball2.display();

  // Move ball objects
  ball1.update();
  ball2.update();

}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 9-7: Rewrite the snake example in an 
// object-oriented fashion with a Snake class. 
// Can you make snakes with slightly different looks 
// (different shapes, colors, sizes)? 
// (For an advanced problem, create a Povar class that 
// stores an x and y coordinate as part of the sketch. 
// Each snake object will have an array of Povar objects, 
// instead of two separate arrays of x and y values. 
// This involves arrays of objects, covered in the next 
// section.)

// Two snake objects (this would be better as an array!)
var s0;
var s1;

function setup() {
  createCanvas(480, 270);
  // Initialize
  s0 = new Snake(50);
  s1 = new Snake(25);
}

function draw() {
  background(220);
  
  // Update and display
  s0.update(mouseX-30,mouseY);
  s0.display();

  // Update and display
  s1.update(mouseX+30,mouseY);
  s1.display();  
}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(220);
  drawCircle(300, 200, 300);
}

function drawCircle(x, y, d) {
 
  stroke(0);
  noFill();
  ellipse(x, y, d);
  if (d > 2) {
    drawCircle(x + d/2, y, d/2);
    drawCircle(x - d/2, y, d/2);
  }
}// Robot 6: Functions from "Getting Started with Processing"
// by Reas & Fry. O'Reilly / Make 2010

function setup() {
  createCanvas(720, 480);
  strokeWeight(2);
  ellipseMode(RADIUS);
  background(204);
}

function mousePressed() {
  let nh = random(2,200);
  drawRobot(mouseX, mouseY, 100, nh); 
}

function draw() {
}

function drawRobot(x, y, bodyHeight,neckHeight) {
  // let neckHeight = 140;

  let radius = 45;
  let ny = y - bodyHeight - neckHeight - radius; // neckHeight Y

  // Neck
  stroke(102);
  line(x + 2, y - bodyHeight, x + 2, ny);
  line(x + 12, y - bodyHeight, x + 12, ny);
  line(x + 22, y - bodyHeight, x + 22, ny);

  // Antennae
  line(x + 12, ny, x - 18, ny - 43);
  line(x + 12, ny, x + 42, ny - 99);
  line(x + 12, ny, x + 78, ny + 15);

  // Body
  noStroke();
  fill(102);
  ellipse(x, y - 33, 33, 33);
  fill(0);
  rect(x - 45, y - bodyHeight, 90, bodyHeight - 33);
  fill(102);
  rect(x - 45, y - bodyHeight + 17, 90, 6);

  // Head
  fill(0);
  ellipse(x + 12, ny, radius, radius);
  fill(255);
  ellipse(x + 24, ny - 6, 14, 14);
  fill(0);
  ellipse(x + 24, ny - 6, 3, 3);
  fill(153);
  ellipse(x, ny - 8, 5, 5);
  ellipse(x + 30, ny - 26, 4, 4);
  ellipse(x + 41, ny + 6, 3, 3);
}var state = false;
var r;
var g;
var b;


function setup() {

  createCanvas(600, 400);

}

function lamp() {
  //lamp
  //bulb
  push();
  translate(250, 150);
  rotate(PI / 4.0);
  arc(0, 0, 80, 80, 0, PI, PIE);
  pop();

  //head
  push();
  translate(250, 150);
  rotate(PI + PI / 4.0);
  arc(0, 0, 150, 150, 0, PI, PIE);
  pop();

  //body
  //upper rack
  push();
  translate(325, 150);
  rotate(PI + PI / 1.25);
  rect(-15, 0, 20, 110);
  pop();

  //second rack
  push();
  translate(380, 220);
  rotate(PI / 4.5);
  rect(-5, 0, 20, 150);
  pop();

  //base
  rect(230, 330, 150, 30, 20, 20, 0, 0);

}

function clock() {
  
  //clock
  stroke(198, 237, 99);
  strokeWeight(8);
  noFill();
  ellipse(500, 100, 100, 100);
}

function lampButton() {
  r = random(255);
  g = random(255);
  b = random(255);
  //button switch 
  if (state) {
    background(r, g, b);
    //clockhands
    noStroke();
    fill(198, 237, 99);    push();
    translate(500, 100);
    rotate(frameCount / 3.0);
    rect(0, 0, 5, 45);
    rect(0, -2.5, 40, 5);
    pop();

  } else {
    background(0);
    //clockhands
    noStroke();
    fill(198, 237, 99);

    push();
    translate(500, 100);
    rotate(frameCount / 20.0);
    rect(0, 0, 5, 45);
    rect(0, -2.5, 40, 5);
    pop();
  }

  fill(198, 237, 99);
  ellipse(320, 240, 25, 25);

}

function lampString() {
  
  //string
  rect(317, 150, 5, 78);
}



function draw() {

  lampButton();
  lampString();
  //clock();
  lamp();
  lamp();

}


function mousePressed() {
  if (dist(mouseX, mouseY, 320, 240) < 25 / 2) {
    state = !state;
  }
}let y = 0;
let speed = 0;
let mic;

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn()
  mic.start();
  mic.amp(0.3);
}


function draw() {
  background(0);

  fill(255);
  ellipse(200, y, 20, 20);

  y = y + speed;
  speed = speed + 0.2;

  if (y > height) {
    y = height;
    speed = -0.8 * speed;
    if (abs(speed) < 1) {
      speed = 0;
    }
  }

}let x = 0;
let pg;

function setup() {
  createCanvas(400, 400);
  pg = createGraphics(100, 100);
  pg.background(0, 100, 0);
}

function draw() {
  background(0);
	
  pg.fill(255);
  pg.ellipse(mouseX, mouseY, 48, 48);


  image(pg, 0, 0);
  image(pg, 150, 0);
  image(pg, 300, 0);

  let spacing = width / 3;
  for (let x = 0; x < width; x = x + spacing) {
    image(pg, x, 0);
  }
  


  stroke(0, 255, 0);
  strokeWeight(4);
  line(x, 0, x, height);
  x = x + 3;

}let x = 0;
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  ellipse(x,100,50,50);
  for (let i = 0; i < width; i= i + 50) {
    line(i, 0, i, height); 
  }
  x = x + 5;
  
  // x = x + 5;
  // line(x, 0, x, height);
  

}let y = 0;
let speed = 0;
let gravity = 0.2;

function setup() {
  createCanvas(400, 400);
}

function displayBall() {
  ellipse(200, y, 20, 20);

}

function moveBall() {
  y = y + speed;
  speed = speed + gravity;
}

function bounceBall() {

  if (y > 400) {
    // reverse the speed
    speed = -0.95 * speed;
  }
}


function draw() {
  background(220);
  
  displayBall();
  bounceBall();
  moveBall();




  // print(y);
}function setup() { 
  createCanvas(400, 400);
} 

function mousePressed() {
  
}

function unicorn() {
  
}

function draw() { 
  background(220);
  unicorn();
  // A
  // B
  // C
}
var pg;

let x = 0;

function setup(){
  createCanvas(710, 400);
  pg = createGraphics(400, 250);
  pg.background(51);
}

function draw(){
  background(0);
  stroke(255);
  line(x,0,x,height);
  
	
  pg.fill(255);
  pg.noStroke();
  pg.ellipse(mouseX-150, mouseY-100, 60, 60);
  // pg.noFill();
  // pg.stroke(255);
  // pg.line(x,0,x,height);
  x = x + 1;
  if (x > width) {
    x = 0; 
  }

  //Draw the offscreen buffer to the screen with image()
  image(pg, 150, 100);
}
function setup() {
  createCanvas(400, 400);
  //frameRate(1);
}


function draw() {
  background(127);
  // print(frameRate());
  
  // noprotect
  for (let x = 0; x < width; x = x + 50) {
    stroke(0);
    line(x, 0, x, height);
  }
  
  
  let i = 0;
  while (i < height) {
    stroke(255);
    line(0, i, width, i); 
    i = i + 50;
  }
  
  
  
  
  
  
  // line(x,0,x,height);
  // line(x+50,0,x,height);
  // line(x+100,0,x,height);
  // line(x+150,0,x,height);
  // x = x + 50;
}

var x = 300;
var y = 200;
var d = 50;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  let distance = dist(mouseX, mouseY, x, y)
  if (mouseIsPressed & distance < d/2) {
    background(0);
  } else {
    background(255);
  }
  ellipse(x, y, d, d);
}let y = 0;
let speed = 0;

let bouncing = false;

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  bouncing = !bouncing;
  
  // Kind of longwinded
//   if (bouncing) {
//     bouncing = false;
//   } else {
//     bouncing = true;
//   }
  
//   // Super longwinded
//   if (bouncing == true) {
//     bouncing = false;
//   } else if (bouncing == false) {
//     bouncing = true;
//   } 
}

function draw() {
  background(0);
  fill(255);

  ellipse(200, y, 20, 20);

  if (bouncing) {
    y = y + speed;
    speed = speed + 0.2;

    if (y > height) {
      y = height;
      speed = -0.8 * speed;
      if (abs(speed) < 1) {
        speed = 0;
      }
    }
  }

}let x = 0;
let y = 0;
let r = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {

  r = random(1);
  stroke(0);
  if (r < 0.1) {
    line(x, y, x + 20, y + 20);
  } else {
    line(x, y + 20, x + 20, y);
  }
  x = x + 20;


  if (x >= width) {
    x = 0;
    y = y + 20;
  }
}function setup() {
  createCanvas(400, 400);

  background(random(0, 255), 133, 244, 200)
}

function draw() {
  background(0);
  fill(255);
  textSize(64);

  let roll = floor(random(0,2));
  
  if (roll == 0) {
    text('1', 200, 200);
  } else if (roll == 1) {
    text('2', 200, 200);
  } 



}let r = 0; 
let g = 255; 
let b = 100; 

let squareX = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {

  if (mouseIsPressed) {
    let x = random(width);
    let y = random(height);
    fill(r, g, b);
    ellipse(x, y, 16, 16);
  }
  
  fill(255,0,0);
  rect(squareX, 50, 10, 10);
  squareX = squareX + 1;
}

function mousePressed() {
  background(220);
  r = random(255);
  g = random(255);
  b = random(255);

}var a=10;
var b=10;
var c=10;
var Eye;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  
} 

function draw() { 
  background(159,205,201);
  a = a +5;
  b = b -5;
  c = c -3;

  

  if (a > 600) 
	{
    a = -320;
  }
	
	if(b < -320)
	{
    b = +520;
	}
	
	if(c < -320)
	{
		c = 400;
	}
    
  //BUBBLES
  fill(205,246,243,150);
  ellipse(555,260+c,38,38);
  ellipse(250,340+c,35,35);
  ellipse(50,210+c,55,55);
  ellipse(290,170+c,23,23);
  ellipse(260,25+c,8,7);
  ellipse(255,200+c,12,10);
  ellipse(40,345+c,21,18);
  ellipse(65,485+c,12,14);
  ellipse(105,285+c,9,9);
  ellipse(435,287+c,12,11);
  ellipse(370,355+c,7,8);
  ellipse(350,380+c,9,8);
  ellipse(350,430+c,13,14);
  ellipse(36,580+c,7,9);
   ellipse(500,580+c,10,9);
  ellipse(350,600+c,13,14);
 ellipse(400,545+c,21,18);
   ellipse(200,680+c,10,9);
   ellipse(500,500+c,30,30);
    ellipse(300,550+c,10,9);
  
  //EYE 
  stroke(0);
  strokeWeight(15)
  line(335,115,300,65);
  line(380,80,360,25);
  line(440,80,435,13);
  line(495,80,505,20);
  line(550,115,575,50);
  noStroke();
  fill(244,211,222);
  ellipse(450,150, 250,160);
  fill(255);
  ellipse(435,155,225,140);
  fill(0);
  

   Eye = new movingEye(450,160);

 
  
  //MONSTER1
  noStroke();
  fill(228,161,185);
  ellipse(130+a,300,120,120);
  fill(244,211,222);
  ellipse(150+a,280,105,105);
  fill(255);
  ellipse(165+a,255,62,50);
  fill(0);
  ellipse(175+a,245,35,30);
  fill(228,161,185);
  ellipse(71+a,310,50,50);  
  fill(228,161,185);
  ellipse(90+a,347,50,50);  
  fill(228,161,185);
  ellipse(135+a,356,50,50); 
  
  //MONSTER2
  fill(0);
  ellipse(128+b,45,28,28);
  fill(255);
  ellipse(140+b,60,48,48);
  fill(228,161,185);
  ellipse(190+b,95,95,95);
  fill(244,211,222);
  ellipse(170+b,80,85,85);
  fill(228,161,185);
  ellipse(195+b,140,40,40);
  ellipse(227+b,130,40,40);
  ellipse(237+b,100,40,40);
  fill(255);
  ellipse(195+b,85,50,50);
  fill(0);
  ellipse(208+b,80,30,30);
  }  

function mousePressed() {
  noLoop();
}

function mouseReleased() {
	loop();
}

function movingEye(nX,nY)
{
  var directionX = (mouseX - 400)/5;
  var directionY = (mouseY - 300)/10;
  
  nX = directionX + nX;
  nY = directionY + nY;
  
  ellipse(nX, nY, 85, 85);
}
  



  

  

  
function setup() { 
  createCanvas(400, 400);
  
} 

function draw() { 
  background(220);
  line(100, 100, 200, 200)'
}let y = 0;
let speed = 0;
let gravity = 0.2;
let bouncing = false;

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  bouncing = !bouncing;
  // if (bouncing) {
  //   bouncing = false;
  // } else  {
  //   bouncing = true;
  // }
}


function draw() {
  background(220);
  
  if (!bouncing) {
    background(255,0,100);
  }
  
  
  
  ellipse(200, y, 20, 20);

  if (bouncing) {
    y = y + speed;
    speed = speed + gravity;
  }

  if (y > 400) {
    // reverse the speed
    speed = -0.95 * speed;
  }
  // print(y);
}//Week2 ICM Make it move!
//Chelsea's Confused by Coding
var value = "0";
var a = 10;


function setup() { 
  createCanvas(500, 500); 
} 


function draw() {
  background(255);
  
  
  
  //code
  fill(212);
  textSize(20);
  text("var{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;}{stroke(123,123,321(123,123,321)fill(255,255,255)set;{stroke(123,123,321)}var{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;}{stroke(123,123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;{stroke(123,123,321)}",0+a,0,150,120); 
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;};noStroke();fill(247,221,212)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)23,321(123,123,321)fill(255,255,255)set;{st123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,", 5+a,25,150,120);
  text("(123,123,321)fill(255,255,255)set;}ITPIsAwesomeWeLoveCodingtrainarc(250,245,270,420,ke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;}TPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)23,321(123,123,321)fill(255,255,255)set;{st123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,",0+a,50,150,120); 
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);21,212);noStroke();fill(247,221,212);ellipse(250,200,190,200);ellipse(250,200,190,200)23,321(123,123,321)fill(255,255,255)set;23,321(123,123,321)fill(255,255,255)set;123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke5,255,255)set;};noStroke();fil(123,{st{st",0+a,75,150,120); 
  text("triangle(250,220,260,250,240,250)}{)setvar=1{(200,123,48,);noStroke();fill(247,221,212);ellipse(250,200,190,200);}23,321(123,123,321)fill(255,255,255)set;{st23,321(123,123,321)fill(255,255,255)123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,set;{star{s",0+a,100,150,120);
  text("fill(255,255,255)set;var{stroke(12fill(255,255,255)set;}ITPIsAwesome)5,255,255)set;};noStroke();filsetvar=15,255,255)set;};noStroke();fil{(200,123,48,;noStroke();(123,123,321)fillnoStroke();fill(247,221,212))",0+a,150,150,120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();5,255,255)set;};noStroke();filfill(247,221,212);ellipse(250,200,190,200);5,255,255)set;};noStroke();fil",0+a,175,150,120); 
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255,255)set;}", 5+a,200,150,120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255}ar{stroke(123,123);fill(247,221,212)", 5+a,225,150,120);
  text("(123,123,321)fill(255,255,255)set;}ITPIsAwesomeWeLoveCodingtrainarc(250,245,270,420,ke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;}",0+a,250,150,120); 
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);21,212);noStroke();fill(247,221,212);ellipse(250,200,190,200);ellipse(250,200,190,200)",0+a,275,150,120); 
  text("triangle(250, 220, 260, 250, 240, 250)}{)setvar=1{(200,123,48,);noStroke();fill(247,221,212);ellipse(250,200,190,200);}ar{s",0+a,300,150,120);
  text("fill(255,255,255)set;var{stroke(12fill(255,255,255)set;}ITPIsAwesome)setvar=1{(200,123,48,;noStroke();(123,123,321)fill(255,255,255)set;};noStroke()fill(247,221,212);noStroke();fill(247,221,212))",0+a,350,150,120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();fill(247,221,212);ellipse(250,200,190,200);",0+a,400,150,120); 
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255,255)set;}", 5+a,425,150,120);  
  a=a+4
  if(a>0){
    a=-1000
  }
  


  if (value == "0") {
  
  //hair
    noStroke()
    fill(64,51,38);
    arc(250,245,270,420, QUARTER_PI+HALF_PI,QUARTER_PI);
  
  //ear
    fill(247,221,212);
    ellipse(163,215,50,50);
  
  //face
    noStroke();
    fill(247,221,212);
    ellipse(250,200,190,200);
  
  //check
    noStroke();
    fill(255, 184, 194);
    ellipse(200,230,30,20);
    ellipse(300,230,30,20);
  
  //bang
    noStroke();
    fill(64,51,38);
    arc(250,130,160,80, Math.PI, 0);
    arc(300,100,270,125, 0.25*Math.PI, Math.PI);
  
  //eyebrows
    stroke(64,51,38);
    strokeWeight(6);
    line(190,173,220,170);
    line(278,170,308,173);
  
  //eyes
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
 
  //eyeballs
    stroke(128, 128, 128);
    fill(102,102,51);
    ellipse(209, 200, 18, 18);
    ellipse(291, 200, 18, 18);
  
  //NOSE
    noStroke();
    fill(247,221,155);
    triangle(250, 220, 260, 250, 240, 250);

  //MOUTH
    noStroke();
    fill(255, 169, 168);
    ellipse(250,270,12,12);
  
  //shoulders
    noStroke();
    fill(247,221,212);
    rect(165,315,170,132,18);  
 
  //TSHIRT
    noStroke();
    fill(102,21,173);
    rect(190,310,120,140,8);  
  
  //neck
    noStroke();
    fill(247,221,212);
    arc(250,310,40,40,0,PI);
    rect(230,280,40,30);

   
    
} else if (value == "1") {
  
  
  //hair
    noStroke()
    fill(64,51,38);
    arc(250,245,270,420, QUARTER_PI+HALF_PI,QUARTER_PI);
  
  //ear
    fill(247,221,212);
    ellipse(163,215,50,50);
  
  //face
    noStroke();
    fill(247,221,212);
    ellipse(250,200,190,200);
  
  //check
    frameRate(15);
    noStroke();
    fill(255,random(164,171),random(196,212));
    ellipse(random(197,203),random(228,232),30,20);
    ellipse(random(297,303),random(228,232),30,20);
  
  //bang
    noStroke();
    fill(64,51,38);
    arc(250,130,160,80, Math.PI, 0);
    arc(300,100,270,125, 0.25*Math.PI, Math.PI); 
  
  //eyebrows
    frameRate(10);
    stroke(64,51,38);
    strokeWeight(random(5,7));
    line(190,random(171,175),220,random(168,171));
    line(278,random(168,172),308,random(171,175));
  
  //eyes
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
 
  //eyeballs
    frameRate(10);
    stroke(128, 128, 128);
    fill(102,102,51);
    ellipse(random(201,217), random(194,206), 18, 18);
    ellipse(random(281,300), random(194,206), 18, 18);
  
  //NOSE
    noStroke();
    fill(247,221,155);
    triangle(250, 220, 260, 250, 240, 250);

  //ewwww!
    
  
  //MOUTH
    frameRate(10);
    noStroke();
    fill(255, 169, 168);
    ellipse(250,270,random(10,20),12);
  
  //shoulders
    noStroke();
    fill(247,221,212);
    rect(165,315,170,132,18);
 
  //TSHIRT
    noStroke();
    fill(102,21,173);
    rect(190,310,120,140,8);
  
  //neck
    noStroke();
    fill(247,221,212);
    arc(250,310,40,40,0,PI);
    rect(230,280,40,30);
  }
  
  drawITP()
}  

function mousePressed() {
  if (value == "0") {
    value = "1";
  } else {
    value ="0";
  }
   noLoop()
}
function mouseReleased() {
  loop()
}
  
function drawITP()
{
      //ITP
    textSize(32)
    fill(random(255), random(255), random(255)); 
    text("!TP",225,350,150,120); 
    textSize(36) 
  }




let r = 100;
let g = 100;
let b = 255;

let shine;

function setup() {

  createCanvas(450, 550);
}

function draw() {

  //background
  r = map(mouseX, 0, 450, 5, 0);
  g = map(mouseX, 0, 450, 180, 0);
  b = map(mouseX, 0, 450, 255, 0);
  background(r, g, b);

  //sun
  push();
  noStroke();
  r = map(mouseX, 0, 450, 255, 120);
  b = map(mouseX, 0, 450, 25, 0);
  fill(r, 50, b, 200);
  ellipse(mouseX, 80, 80);
  pop();

  //MountRainer
  strokeWeight(0);
  fill(128, 198, 222);
  quad(75, 550, 200, 350, 340, 350, 450, 550);

  fill(255);
  quad(200, 350, 340, 350, 300, 270, 240, 270);

  ellipse(228, 360, 59, 60);
  ellipse(285, 360, 70, 90);
  ellipse(328, 360, 30, 40);


  // spaceneedleBase
  strokeWeight(6);
  line(100, 300, 70, 550);

  line(150, 300, 190, 550);
  line(100, 300, 95, 200);

  line(150, 300, 155, 200);

  strokeWeight(4);
  fill(211, 34, 63);
  triangle(100, 300, 95, 200, 150, 300);

  fill(26, 84, 21);
  triangle(100, 300, 150, 300, 70, 550);

  fill(63, 48, 96);
  triangle(190, 550, 150, 300, 133, 355);

  fill(229, 227, 36);
  quad(70, 550, 190, 550, 159, 450, 104, 450);

  fill(219, 60, 227);
  triangle(150, 300, 95, 200, 155, 200);


  //spaceneedleHead
  fill(75, 76, 82);
  strokeWeight(5);
  rect(50, 160, 150, 40);


  strokeWeight(5);
  line(65, 160, 96, 130);
  strokeWeight(5);
  line(185, 160, 155, 130);

  fill(117, 125, 120);
  quad(96, 130, 155, 130, 169, 120, 80, 120);

  strokeWeight(3);
  fill(60, 80, 230);  
  triangle(120, 120, 130, 120, 125, 30);    

  fill(38, 230, 148);
  triangle(65, 160, 155, 130, 185, 160);

  if (mouseX > 225) {
    //stars
    push();
    noStroke();
    shine = random(0, 255);
    fill(255, 255, 255, shine);
    ellipse(100, 35, 5);

    shine = random(0, 255);
    fill(255, 255, 255, shine);
    ellipse(200, 55, 7);

    shine = random(0, 255);
    fill(255, 255, 255, shine);
    ellipse(370, 40, 7);

    shine = random(0, 255);
    fill(255, 255, 255, shine);
    ellipse(299, 80, 8);

    shine = random(0, 255);
    fill(255, 255, 255, shine);
    ellipse(440, 150, 4);

    shine = random(0, 255);
    fill(255, 255, 255, shine);
    ellipse(230, 200, 7);

    shine = random(0, 255);
    fill(255, 255, 255, shine);
    ellipse(35, 149, 4);

    //toplight
    shine = random(255, 255);
    fill(255, 255, 26, shine);
    ellipse(125, 33, 10);

    pop();
  }
}function setup() { 
  createCanvas(windowWidth, windowHeight);
} 

function draw() { 
  background(220);
  fill(255);
  ellipse(width/2,height/2,200,200);
}function setup() { 
  createCanvas(450, 340);
} 

function draw() { 
  background(255,0,100);
  noStroke();
  fill('rgb(212,118,118)');
  ellipse(80, 5, 80, 80);
  fill('rgb(224,209,167)');
  ellipse(340, 190, 100, 100);
  ellipse(270, 212, 20, 20);
  ellipse(340, 120, 20, 20);
  fill('rgb(195,176,123)');
  rect(420, 150, 100, 105);
  stroke('rgb(212,118,118)');
  strokeWeight(8);
  ellipse(145, 230, 75, 75);
  noStroke();
  fill('rgb(237,224,185)');
  rect(140, 169, 90, 60);
  fill('rgb(254,247,227)');
  ellipse(210, 190, 20, 20);
  stroke('rgb(212,118,118)');
  strokeWeight(8);
  fill('rgb(237,224,185)');
  ellipse(290, 245, 30, 30);
  rect(290, 270, 200, 120);
  rect(195, 279, 70, 60);
  
  
  
  
  
}
function setup() { 
  createCanvas(400, 400);
  // frameRate(1);
  // smooth();
  // noSmooth();
}

function draw() { 
  background(100);
	
  // Right blue circle
  stroke(255);  
  fill(0,0,255);
  ellipse(mouseX,200,100);
  
  // Left pink circle
  stroke(0);
  // noStroke();
  // stroke(255,0,255, 127);
  fill(255,0,255, 127);
  ellipse(200,200,100);
  
}function setup() { 
  createCanvas(600, 400);
  colorMode(RGB,255,255,255,400);
} 

function draw() { 
  background(100);
  
  fill(255,100,150);
  ellipse(200,200,100,100);
  fill(150,100,255,mouseX);
  ellipse(250,200,100,100);
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(100,0,0);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(100,0,0);
}var ball;
var gravity = 0.1;

function setup() {
  createCanvas(400, 300);
  ball = new Ball();
}

function draw() {
  background(0);
  ball.display();
  ball.move();
  ball.bounce();
}

function Ball() {

  this.x = 200;
  this.y = 30;
  this.speed = 0;

  this.display = function() {
    fill(255);
    ellipse(this.x, this.y, 24, 24);
  };
  
  this.move = function() {
    this.y = this.y + this.speed;
    this.speed = this.speed + gravity;
  };
  
  this.bounce = function() {
    if (this.y > height) {
      this.speed = this.speed * -0.95;
    }
  };
  
}var ball;
var gravity = 0.1;

function setup() {
  createCanvas(400, 300);
  ball = new Ball();
}

function draw() {
  background(0);
  ball.display();
  ball.move();
  ball.bounce();
}

function Ball() {

  this.x = 200;
  this.y = 30;
  this.speed = 0;

  this.display = function() {
    fill(255);
    ellipse(this.x, this.y, 24, 24);
  };
  
  this.move = function() {
    this.y = this.y + this.speed;
    this.speed = this.speed + gravity;
  };
  
  this.bounce = function() {
    if (this.y > height) {
      this.speed = this.speed * -0.95;
    }
  };
  
}
var ball = {
  x: 200,
  y: 30,
  speed: 0,
  display: function() {
    fill(255);
    ellipse(this.x, this.y, 24, 24);
  },
  move: function() {
    this.y = this.y + this.speed;
    this.speed = this.speed + gravity;

  },
  bounce: function() {
    if (this.y > height) {
      this.speed = this.speed * -0.95;
    }
  }
};

var gravity = 0.1;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(0);
  ball.display();
  ball.move();
  ball.bounce();
}


var ball = {
  x: 200,
  y: 30,
  speed: 0,
  display: function() {
    fill(255);
    ellipse(this.x, this.y, 24, 24);
  },
  move: function() {
    this.y = this.y + this.speed;
    this.speed = this.speed + gravity;

  },
  bounce: function() {
    if (this.y > height) {
      this.speed = this.speed * -0.95;
    }
  }
};

var gravity = 0.1;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(0);
  ball.display();
  ball.move();
  ball.bounce();
}


var ball = {
  x: 200,
  y: 30,
  speed: 0,
  display: function() {
    fill(255);
    ellipse(this.x, this.y, 24, 24);
  },
  move: function() {
    this.y = this.y + this.speed;
    this.speed = this.speed + gravity;

  },
  bounce: function() {
    if (this.y > height) {
      this.speed = this.speed * -0.95;
    }
  }
};

var gravity = 0.1;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(0);
  ball.display();
  ball.move();
  ball.bounce();
}

var ball = {
  x: 200,
  y: 30,
  speed: 0,
  display: function() {
    fill(255);
    ellipse(this.x, this.y, 24, 24);
  },
  move: function() {
    this.y = this.y + this.speed;
    this.speed = this.speed + gravity;

  },
  bounce: function() {
    if (this.y > height) {
      this.speed = this.speed * -0.95;
    }
  }
};

var gravity = 0.1;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(0);
  ball.display();
  ball.move();
  ball.bounce();
}



// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Recursion

function setup() {
  createCanvas(640,360);  
}

function draw() {
  background(51);
  drawCircle(width/2,height/2,400); 
  //noLoop();
}

// Recursive function
function drawCircle(x,y,r) {
  stroke(255);
  noFill();
  ellipse(x, y, r, r);
  if(r > 2) {
    // Now we draw two more circles, one to the left
    // and one to the right
    drawCircle(x + r/2, y, r/2);
    drawCircle(x - r/2, y, r/2);
  }
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Recursion

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(51);
  drawCircle(width / 2, height / 2, 400);
  noLoop();
}

// Recursive function
function drawCircle(x, y, r) {
  stroke(255);
  noFill();
  ellipse(x, y, r, r);
  if (r > 2) {
    // Now we draw two more circles, one to the left
    // and one to the right
    drawCircle(x + r / 2, y, r / 2);
    drawCircle(x - r / 2, y, r / 2);
  }
}function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(255);
  stroke(0);
  let d = distance(width / 2, height / 2, mouseX, mouseY);
  fill(d * 3, d * 2, d);
  ellipseMode(CENTER);
  ellipse(width / 2, height / 2, 100, 100);
}

function distance(x1, y1, x2, y2) {
  let dx = x1 - x2;
  let dy = y1 - y2;
  let d = sqrt(dx * dx + dy * dy);
  return d;
}function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(255);
  stroke(0);
  // We could use the built in dist()
  // But demonstrating how to write a function
  // that returns a value.
  var d = distance(width / 2, height / 2, mouseX, mouseY);
  fill(d * 3, d * 2, d);
  ellipseMode(CENTER);
  ellipse(width / 2, height / 2, 100, 100);
}

function distance(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  var d = sqrt(dx * dx + dy * dy);
  return d;
}// Robot 6: Functions from "Getting Started with Processing"
// by Reas & Fry. O'Reilly / Make 2010

function setup() {
  createCanvas(720, 480);
  strokeWeight(2);
  ellipseMode(RADIUS);
}

function draw() {
  background(204);
  ellipse(200, 200, 500, 500);
  drawRobot(120, 420, 110, 140);
  drawRobot(270, 460, 260, 95);
  drawRobot(420, 310, 80, 10);
  drawRobot(570, 390, 180, 40);
}

function drawRobot(x, y, bodyHeight, neckHeight) {

  let radius = 45;
  let ny = y - bodyHeight - neckHeight - radius; // neckHeight Y

  // Neck
  stroke(102);
  line(x + 2, y - bodyHeight, x + 2, ny);
  line(x + 12, y - bodyHeight, x + 12, ny);
  line(x + 22, y - bodyHeight, x + 22, ny);

  // Antennae
  line(x + 12, ny, x - 18, ny - 43);
  line(x + 12, ny, x + 42, ny - 99);
  line(x + 12, ny, x + 78, ny + 15);

  // Body
  noStroke();
  fill(102);
  ellipse(x, y - 33, 33, 33);
  fill(0);
  rect(x - 45, y - bodyHeight, 90, bodyHeight - 33);
  fill(102);
  rect(x - 45, y - bodyHeight + 17, 90, 6);

  // Head
  fill(0);
  ellipse(x + 12, ny, radius, radius);
  fill(255);
  ellipse(x + 24, ny - 6, 14, 14);
  fill(0);
  ellipse(x + 24, ny - 6, 3, 3);
  fill(153);
  ellipse(x, ny - 8, 5, 5);
  ellipse(x + 30, ny - 26, 4, 4);
  ellipse(x + 41, ny + 6, 3, 3);
}// Robot 6: Functions from "Getting Started with Processing"
// by Reas & Fry. O'Reilly / Make 2010

function setup() {
  createCanvas(720, 480);
  strokeWeight(2);
  ellipseMode(RADIUS);
}

function draw() {
  background(204);
  ellipse(200, 200, 500, 500);
  drawRobot(120, 420, 110, 140);
  drawRobot(270, 460, 260, 95);
  drawRobot(420, 310, 80, 10);
  drawRobot(570, 390, 180, 40);
}

function drawRobot(x, y, bodyHeight, neckHeight) {

  var radius = 45;
  var ny = y - bodyHeight - neckHeight - radius; // neckHeight Y

  // Neck
  stroke(102);
  line(x + 2, y - bodyHeight, x + 2, ny);
  line(x + 12, y - bodyHeight, x + 12, ny);
  line(x + 22, y - bodyHeight, x + 22, ny);

  // Antennae
  line(x + 12, ny, x - 18, ny - 43);
  line(x + 12, ny, x + 42, ny - 99);
  line(x + 12, ny, x + 78, ny + 15);

  // Body
  noStroke();
  fill(102);
  ellipse(x, y - 33, 33, 33);
  fill(0);
  rect(x - 45, y - bodyHeight, 90, bodyHeight - 33);
  fill(102);
  rect(x - 45, y - bodyHeight + 17, 90, 6);

  // Head
  fill(0);
  ellipse(x + 12, ny, radius, radius);
  fill(255);
  ellipse(x + 24, ny - 6, 14, 14);
  fill(0);
  ellipse(x + 24, ny - 6, 3, 3);
  fill(153);
  ellipse(x, ny - 8, 5, 5);
  ellipse(x + 30, ny - 26, 4, 4);
  ellipse(x + 41, ny + 6, 3, 3);
}let ball = {
  x: 200,
  y: 30,
  speed: 0
}

var gravity = 0.1;

function setup() {
  createCanvas(400, 300);
}

function displayBall() {
  fill(255);
  ellipse(ball.x, ball.y, 24, 24);
}

function moveBall() {
  ball.y = ball.y + ball.speed;
  ball.speed = ball.speed + gravity;
}

function bounceBall() {
  if (ball.y > height) {
    ball.speed = ball.speed * -0.95;
  }
}

function draw() {
  background(0);
  displayBall();
  moveBall();
  bounceBall();
}



// Getting Started with p5.js
// Lauren McCarthy, Casey Reas, Ben Fry

function setup() {
  text("Ready to roll!", 10, 20);
  rollDice(20, 40);
  rollDice(20, 60);
  rollDice(6, 80);
  text("Finished.", 10, 100);
}

function rollDice(numSides, y) {
  let d = 1 + int(random(numSides));
  text("Rolling... " + d, 10, y);
}// Getting Started with p5.js
// Lauren McCarthy, Casey Reas, Ben Fry

function setup() {
  text("Ready to roll!", 10, 20);
  let d1 = 1 + floor(random(20));
  text("Rolling... " + d1, 10, 40);
  let d2 = 1 + floor(random(20));
  text("Rolling... " + d2, 10, 60);
  let d3 = 1 + floor(random(6));
  text("Rolling... " + d3, 10, 80);
  text("Finished.", 10, 100);
}// Getting Started with p5.js
// Lauren McCarthy, Casey Reas, Ben Fry

function setup() {
  text("Ready to roll!", 10, 20);
  var d1 = 1 + floor(random(20));
  text("Rolling... " + d1, 10, 40);
  var d2 = 1 + floor(random(20));
  text("Rolling... " + d2, 10, 60);
  var d3 = 1 + floor(random(6));
  text("Rolling... " + d3, 10, 80);
  text("Finished.", 10, 100);
}var x = 50;
var y = 50;
var w = 100;
var h = 75;

function setup() {
  createCanvas(200, 200);
}
function draw() {
  background(127);

  stroke(0);

  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    fill(0);
  } else {
    fill(255);
  }

  rect(x, y, w, h);
}var x = 320;
var y = 180;
var xspeed = 5;
var yspeed = 2;

var r = 25;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(0);
  ellipse(x, y, r*2, r*2);
  x += xspeed;
  y += yspeed;
  if (x > width - r || x < r) {
    xspeed = -xspeed;
  }
  if (y > height - r || y < r) {
    yspeed = -yspeed;
  }


}// From: http://10print.org/

var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {

  if (random(1) > 0.5) {
    line(x, y, x+20, y+20);
  } 
  else {
    line(x, y+20, x+20, y);
  }

  x += 20;
  if (x > width) {
    x = 0;
    y += 20;
  }

  if (y > height) {
    background(255);
    x = 0;
    y = 0;
  }
}// Simple Slider

let dragging = false; // Is the slider being dragged?
let rollover = false; // Is the mouse over the slider?

// Rectangle variables for slider
let x = 100;
let y = 25;
let w = 10;
let h = 50;
// Start and end of slider
let sliderStart = 100;
let sliderEnd = 400;

// Offset for dragging slider
let offsetX = 0;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(175);

  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd - w);

  // Draw a line for slider
  stroke(0);
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);

  stroke(0);
  // Fill according to state
  if (dragging) {
    fill(50);
  } else {
    fill(175);
  }
  // Draw rectangle for slider
  rect(x, y, w, h);

  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  let b = map(x, sliderStart, sliderEnd - w, 0, 255);
  fill(b);
  rect(sliderStart, 100, sliderEnd - sliderStart, 150);
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}// Rollover Rect
// Lauren McCarthy <http://lauren-mccarthy.com>

var x = 250;
var y = 150;
var s = 100;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(200);
  if ((mouseX > x) && (mouseX < x + s) && (mouseY > y) && (mouseY < y + s)) {
    fill(0);
  } else {
    fill(255);
  }
  rect(x, y, s, s);
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 5-3: Rollovers
function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);
  stroke(0);
  line(320, 0, 320, 360);
  line(0, 180, 640, 180);

  // Fill a black color
  noStroke();
  fill(0);

  // Depending on the mouse location, a different rectangle is displayed.    
  if (mouseX < 320 && mouseY < 180) {
    rect(0, 0, 320, 180);
  } else if (mouseX > 320 && mouseY < 180) {
    rect(320, 0, 320, 180);
  } else if (mouseX < 320 && mouseY > 180) {
    rect(0, 180, 320, 180);
  } else if (mouseX > 320 && mouseY > 180) {
    rect(320, 180, 320, 180);
  }
}var x = 300;
var y = 200;
var d = 100;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (dist(mouseX, mouseY, x, y) < d/2) {
    background(0);
  } else {
    background(255);
  }
  ellipse(x, y, d, d);
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 5-6: Rewrite Example 5-3 so that the squares fade from white to black 
// when the mouse leaves their area. 
// Hint: you need four variables, one for each rectangle's color.

// Four variables, one for each square's brightness level
var bright0 = 0;
var bright1 = 0;
var bright2 = 0;
var bright3 = 0;

function setup() {
  createCanvas(320, 240);
}

function draw() {
  // Draw the background
  background(0);

  // Depending on the mouse location, a 
  // different rectangle is set to brightness 255
  if (mouseX < 160 && mouseY < 120) {
    bright0 = 255;
  } else if (mouseX > 160 && mouseY < 120) {
    bright1 = 255;
  } else if (mouseX < 160 && mouseY > 120) {
    bright2 = 255;
  } else if (mouseX > 160 && mouseY > 120) {
    bright3 = 255;
  }

  // All rectangles always fade
  bright0 = bright0 - 2;
  bright1 = bright1 - 2;
  bright2 = bright2 - 2;
  bright3 = bright3 - 2;

  // Fill color and draw each rectangle
  noStroke();
  fill(bright0);
  rect(0, 0, 160, 120);
  fill(bright1);
  rect(160, 0, 160, 120);
  fill(bright2);
  rect(0, 120, 160, 120);
  fill(bright3);
  rect(160, 120, 160, 120);

  // Draw grid lines
  stroke(255);
  line(160, 0, 160, 120);
  line(0, 120, 160, 120);

}// Complicated Knob
// Daniel Shiffman <http://www.shiffman.net>

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Circle variables for knob
var x = 160;
var y = 180;
var r = 40;

// Knob angle
var angle = 0;

var count = 0;

// Offset angle for turning knob
var offsetAngle = 0;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);

	if (count === 0) {
		
  // Is it being dragged?
  if (dragging) {
    var dx = mouseX - x;
    var dy = mouseY - y;
    var mouseAngle = atan2(dy, dx);
    angle = mouseAngle - offsetAngle;
  }

  // Fill according to state
  if (dragging) {
    fill (175);
  } 
  else {
    fill(255);
  }
  // Draw ellipse for knob
  push();
  translate(x, y);
  rotate(angle);
  ellipse(0, 0, r*2, r*2);
  line(0, 0, r, 0);
  pop();
  fill(0);


  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  // Our angle is either between
  var calcAngle = 0; 
  if (angle < 0) {
    calcAngle = map(angle, -PI, 0, PI, 0);
  } 
  else if (angle > 0) {
    calcAngle = map(angle, 0, PI, TWO_PI, PI);
  }

  textAlign(CENTER);
  text(int(degrees(calcAngle)), x, y+r+20);

	var degree = int(degrees(calcAngle));

	if (dragging && degree < 10) {
		count == 2;
	}
	}
	if (count === 2) {
		var b = map(calcAngle, 0, TWO_PI, 0, 255);
		fill(b);
		rect(320, 90, 160, 180);
	}
}

function mousePressed() {
  // Did I click on slider?
  if (dist(mouseX, mouseY, x, y) < r) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    var dx = mouseX - x;
    var dy = mouseY - y;
    offsetAngle = atan2(dy, dx) - angle;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

var dragging = false; // Is the object being dragged?
var rollover = false; // Is the mouse over the ellipse?

var x, y, w, h;          // Location and size
var offsetX, offsetY;    // Mouseclick offset

function setup() {
  createCanvas(640, 360);
  
  // Starting location
  x = 100;
  y = 100;
  // Dimensions
  w = 75;
  h = 50;
}

function draw() {
  background(255);
  
  
  // Is mouse over object
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } 
  else {
    rollover = false;
  }
  
  // Adjust location if being dragged
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }

  stroke(0);
  // Different fill based on state
  if (dragging) {
    fill (50);
  } else if (rollover) {
    fill(100);
  } else {
    fill(175, 200);
  }
  rect(x, y, w, h);
}

function mousePressed() {
  // Did I click on the rectangle?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
    offsetY = y-mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
}
var x = 300;
var y = 200;
var d = 50;
var state = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (state) {
    background(0);
  } else {
    background(255);
  }
  ellipse(x, y, d, d);
}

function mousePressed() {
  if (dist(mouseX, mouseY, x, y) < d/2) {
    state = !state;
  }
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 5-4: Hold down the button
var button = false;

var x = 50;
var y = 50;
var w = 100;
var h = 75;

function setup() {
  createCanvas(200,200); 
}

function draw() {
  // The button is pressed if (mouseX,mouseY) is inside the rectangle and mousePressed is true.
  if (mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h && mouseIsPressed) {
    button = true; 
  } else {
    button = false;
  }

 if (button) {
    background(255);
    stroke(0);
  } else {
    background(0);
    stroke(255);
  }
  
  fill(175);
  rect(x,y,w,h);
}
let x = 320;
let y = 180;

let r; 
let g;
let b;

function setup() {
  createCanvas(640, 360);
  r = random(255);
  g = random(255);
  b = random(255);
}


function draw() {
  background(255);

  fill(r, g, b, 100);
  ellipse(x, y, 50, 50);

  x = x + random(-1, 1);
  y = y + random(-1, 1);
}function setup() {
  createCanvas(640, 360);
  background(255);
}

function mousePressed() {
  background(255);
}


function draw() {
  let r = random(255);
  var g = random(255);
  let b = random(255);

  fill(r, g, b, 100);
  ellipse(mouseX, mouseY, 50, 50);
  
}function setup() {
  createCanvas(640, 360);
}

function mousePressed() {
  background(255);
}  
  

function draw() {
  let x = random(width);
  let y = random(height);

  let r = random(255);
  let g = random(255);
  var b = random(255);

  fill(r, g, b, 100);
  ellipse(x, y, 50, 50);
}
function setup() {
  createCanvas(600, 400);
  background(255);
}

function draw() {
  var x = random(width);
  var y = random(height);

  var g = random(255);
  
  fill(g);
  ellipse(x, y, 50, 50);
}function setup() {
  createCanvas(480, 270);
  ellipseMode(CENTER);
  rectMode(CENTER); 
  
  background(51);

  // Body
  stroke(255);
  fill(150);
  rect(240, 145, 20, 100);

  // Head
  fill(255);
  ellipse(240, 115, 60, 60); 

  // Eyes
  fill(0); 
  ellipse(221, 115, 16, 32); 
  ellipse(259, 115, 16, 32);

  // Legs
  stroke(255);
  line(230, 195, 220, 205);
  line(250, 195, 260, 205); 
}function setup() {
  createCanvas(480, 270);
  ellipseMode(CENTER);
  rectMode(CENTER); 
  
  background(51);

  // Body
  stroke(255);
  fill(150);
  rect(240, 145, 20, 100);

  // Head
  fill(255);
  ellipse(240, 115, 60, 60); 

  // Eyes
  fill(0); 
  ellipse(221, 115, 16, 32); 
  ellipse(259, 115, 16, 32);

  // Legs
  stroke(255);
  line(230, 195, 220, 205);
  line(250, 195, 260, 205); 
}