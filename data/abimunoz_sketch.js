var video;

function setup() {
  createCanvas(1280, 480); //canvas
  background(51);

  video = createVideo("frankie.mp4");
  video.size(width, height);
  video.loop();
  video.hide();
}

function draw() {
  // image(video, 50, 0, 80, 40, 100, 100, 100, 100);
  // image(video, 150, 50, 80, 40, 100, 100, 100, 100);
  // image(video, 200, 50, 80, 40, 100, 100, 100, 100);
	image(video, 0, 0, 440, 360, 100, 100, 100, 100)*4;
  filter(THRESHOLD);
}var value = 0;
let video;

function draw() {
    video = createVideo("frankie.mp4");
    video.loop();
    video.size(width, height);
}

function mouseMoved() {
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
}
let video;

function draw() {
  if (mouseIsPressed) {
    video = createVideo("frankie.mp4");
    video.loop();
    video.size(width, height);
  }
}let video;


function setup() {
  createCanvas(50, 100);

}

function draw() {
  video = createVideo("frankie.mp4");
  video.loop()
	video.size(width, height);
  
  // video.loadPixels();
  // let d = pixelDensity();
  // let halfImage = 4 * (video.width/2 * d) * (video.height * d / 2);
  // for (let i = 0; i < halfImage; i++) {
  //   pixels[i + halfImage] = pixels[i];
  // }
  // video.updatePixels();
}// https://www.youtube.com/watch?v=0V3uYA1hafk

let video;
let vScale = 16;

function setup() {
	createCanvas(640, 480);
  pixelDensity(1);
}

function draw() {
  video = createCapture(VIDEO);
	video.size(width/vScale, height/vScale);
}

let img;
function preload() {
  img = loadImage('assets/frankie.png');
}

function setup() {
  createCanvas(500, 1000);
  image(img, 0, 0);
  loadPixels();
}

function draw() {
  let d = pixelDensity();
  let halfImage = 4 * (img.width/2 * d) * (img.height * d / 2);
	  for (let i = 0; i < halfImage; i++) {
    pixels[i + halfImage] = pixels[i*2];
  }
  updatePixels();
}let video;
let vScale = 16;

function setup() {
	createCanvas(640, 480);
  pixelDensity(1);
}

function draw() {
  video = createVideo("frankie.mp4");
  video.loop()
	video.size(width/vScale, height/vScale);
}// 11.7: Slit-Scan Video - p5.js Tutorial

let video;
let x = 0;
let y = 0;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  video = createVideo("frankie.mp4");
  video.size(320, 240);
  video.loop()
  background(0);
}

function draw() {
  video.loadPixels();

  let w = video.width;
  let h = video.height;

  // horizontal video
  let slitscanX = copy(video, 0, h / 2, w, 100, 0, y, w, 100);
  translate(mouseX / 2, mouseY / 2);
	scale(mouseX / 300, mouseY / 300);

  y = y + 1;

  if (y > height) {
    y = 0;
  }

  // vertical video
  let slitscanY = copy(video, w / 2, 0, 1, h, x, 0, 1, h);
  translate(width / 2, height / 2);
	scale(mouseX / 300, mouseY / 300);

  x = x + 1;

  if (x > width) {
    x = 0;
  }
}// 11.7: Slit-Scan Video - p5.js Tutorial

let video;
let x = 0;
let y = 0;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  video = createVideo("frankie.mp4");
  video.size(320, 240);
  video.loop()
  background(0);
}

function draw() {
  video.loadPixels();

  let w = video.width;
  let h = video.height;

  // horizontal video
  let slitscanX = copy(video, 0, h / 2, w, 100, 0, y, w, 100);
  translate(width/2, height/2);
	scale(mouseX / 300, mouseY / 300);

  y = y + 1;

  if (y > height) {
    y = 0;
  }

  // vertical video
  let slitscanY = copy(video, w / 2, 0, 1, h, x, 0, 1, h);
  translate(width/2, height/2);
	scale(mouseX / 300, mouseY / 300);

  x = x + 1;

  if (x > width) {
    x = 0;
  }
}// 11.7: Slit-Scan Video - p5.js Tutorial

let video;
let x = 0;
let y = 0;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  video = createVideo("frankie.mp4");
  video.size(320, 240);
  video.loop()
  background(0);
}

function draw() {
  video.loadPixels();

  let w = video.width;
  let h = video.height;

  // horizontal video
  let slitscanX = copy(video, 0, h / 2, w, 100, 0, y, w, 100);
  translate(width/2, height/2);
	scale(mouseX / 300, mouseY / 300);

  y = y + 1;

  if (y > height) {
    y = 0;
  }

  // vertical video
  let slitscanY = copy(video, w / 2, 0, 1, h, x, 0, 1, h);

  x = x + 1;

  if (x > width) {
    x = 0;
  }
}// 11.7: Slit-Scan Video - p5.js Tutorial

let video;
let x = 0;
let y = 0;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(320, 240);
  background(0);
}

function draw() {
  video.loadPixels();

  let w = video.width;
  let h = video.height;

  // horizontal video
  let slitscanX = copy(video, 0, h / 2, w, 100, 0, y, w, 100);

  y = y + 1;

  if (y > height) {
    y = 0;
  }

  // vertical video
  let slitscanY = copy(video, w / 2, 0, 1, h, x, 0, 1, h);

  x = x + 1;

  if (x > width) {
    x = 0;
  }
}// 11.7: Slit-Scan Video - p5.js Tutorial

let video;
let x = 0;
let y = 0;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  video = createVideo("frankie.mp4");
  video.size(320, 240);
  video.loop()
  background(0);
}

function draw() {
  video.loadPixels();

  let w = video.width;
  let h = video.height;

  // horizontal video
  let slitscanX = copy(video, 0, h / 2, w, 100, 0, y, w, 100);

  y = y + 1;

  if (y > height) {
    y = 0;
  }

  // vertical video
  let slitscanY = copy(video, w / 2, 0, 1, h, x, 0, 1, h);

  x = x + 1;

  if (x > width) {
    x = 0;
  }
}var video;
 
function setup() {
  createCanvas(640, 240); //canvas
  background(51);
 
  video = createVideo("frankie.mp4");
  video.size(width, height);
  video.loop()
}
 
function draw() { //canvas
  image(video, 0, 0, width/2, height); //video on canvas, position, dimensions
  translate(width,0); // move to far corner
  scale(-1.0,1.0);    // flip x-axis backwards
  image(video, 100, 100, width/2, height); //video on canvas, position, dimensions
    scale(1.0,1.0);    // flip x-axis backwards
}
var img;
function preload() {
    img = loadImage("frankie.png");  // Load the image
}

function setup() {
createCanvas(720, 400);
}



function draw() {
  // Displays the image at its actual size at point (0,0)
  image(img, 0, 0);
  // Displays the image at point (0, height/2) at half size
  image(img, 0, height/2, img.width/2, img.height/2);
  
    var d = pixelDensity();
  var halfImage = 4 * (img.width * d) * (img.height * d / 2);
  loadPixels();
  for (var i = 0; i < halfImage; i++) {
    pixels[i + halfImage] = pixels[i];
  }
  updatePixels();
  noLoop();
}var cap;
function setup() {
  createCanvas(400, 400);
  cap = createCapture(VIDEO);
  cap.hide();
  rectMode(CENTER);
  noStroke();
}
function draw() {
  background(50);
  fill(255);
  cap.loadPixels();
  for (var cy = 0; cy < cap.height; cy += 10) {
    for (var cx = 0; cx < cap.width; cx += 5) {
      var offset = ((cy*cap.width)+cx)*4;
      var xpos = (cx / cap.width) * width;
      var ypos = (cy / cap.height) * height;
      rect(xpos, ypos, 10,
        10 * (cap.pixels[offset+1]/255));
    }
  }
}let vid1;
let vid2;
let vid3;
let vid4;
let playing = false;
let completion;

function setup() {
  createCanvas(400, 100);
  vid1 = createVideo("frankie.mp4");
  vid2 = createVideo("frankie.mp4");
  vid3 = createVideo("frankie.mp4");
  vid4 = createVideo("frankie.mp4");
  vid1.size(400, 300);
  vid2.size(400, 300);
  vid3.size(400, 300);
  vid4.size(400, 300);
}

function draw() {
  background(50);
  completion = vid1.time() / vid1.duration();
  completion = vid2.time() / vid2.duration();
  completion = vid3.time() / vid3.duration();
  completion = vid4.time() / vid4.duration();
  ellipse(completion * width, 50, 20, 20);
}

function mousePressed() {
  if (!playing) {
    vid1.play();
    vid2.play();
    vid3.play();
    vid4.play();
    vid1.time((mouseX / width) * vid1.duration());
    vid2.time((mouseX / width) * vid2.duration());
    vid3.time((mouseX / width) * vid3.duration());
    vid4.time((mouseX / width) * vid4.duration());
    playing = true;
  } else {
    vid1.pause();
    vid2.pause();
    vid3.pause();
    vid4.pause();
    playing = false;
  }
}let vid;
let playing = false;
let completion;

function setup() {
  createCanvas(400, 300);
  vid = createVideo("frankie.mp4");
  vid.size(400, 300);
}

function draw() {
	background(50);
  completion = vid.time() / vid.duration();
  ellipse(completion*width, 50, 20, 20);
}

function mousePressed() {
	if (!playing) {
    vid.play();
    vid.time((mouseX/width) * vid.duration());
    playing = true;
  } else {
  	vid.pause();
    playing = false;
  }
}let vid;

function setup() {
  createCanvas(0, 0);
  vid = createVideo("frankie.mp4");
  vid.loop()
}// https://www.youtube.com/watch?v=0V3uYA1hafk

let video;
let vScale = 16;

let particles = [];

function setup() {
	createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  for (let i = 0; i < 200; i++) {
  	  particles[i] = new Particle(random(width), random(height));
  }
  frameRate(60);
}

function draw() {
	video.loadPixels();
  for (let i = 0; i < particles.length; i++) {
  	particles[i].update();
  	particles[i].show();
  }
}// https://www.youtube.com/watch?v=0V3uYA1hafk

let video;
let vScale = 16;

let particles = [];

function setup() {
	createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  for (let i = 0; i < 200; i++) {
  	  particles[i] = new Particle(random(width), random(height));
  }
  frameRate(120);
}

function draw() {
	video.loadPixels();
  for (let i = 0; i < particles.length; i++) {
  	particles[i].update();
  	particles[i].show();
  }
}// https://www.youtube.com/watch?v=0V3uYA1hafk

let video;
let vScale = 16;

let particles = [];

function setup() {
	createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  for (let i = 0; i < 200; i++) {
  	  particles[i] = new Particle(random(width), random(height));
  }
  frameRate(120);
}

function draw() {
	video.loadPixels();
  for (let i = 0; i < particles.length; i++) {
  	particles[i].update();
  	particles[i].show();
  }
}// https://www.youtube.com/watch?v=0V3uYA1hafk

let video;
let vScale = 16;

let particles = [];

function setup() {
	createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  for (let i = 0; i < 200; i++) {
  	  particles[i] = new Particle(random(width), random(height));
  }
  frameRate(24);
}

function draw() {
	video.loadPixels();
  for (let i = 0; i < particles.length; i++) {
  	particles[i].update();
  	particles[i].show();
  }
}// https://www.youtube.com/watch?v=0V3uYA1hafk

let video;
let vScale = 16;

let particles = [];

function setup() {
	createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  for (let i = 0; i < 200; i++) {
  	  particles[i] = new Particle(random(width), random(height));
  }
	background(51);
  frameRate(12);
}

function draw() {
	video.loadPixels();
  for (let i = 0; i < particles.length; i++) {
  	particles[i].update();
  	particles[i].show();
  }
}// https://www.youtube.com/watch?v=0V3uYA1hafk

let video;
let vScale = 16;

let particles = [];

function setup() {
	createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  for (let i = 0; i < 200; i++) {
  	  particles[i] = new Particle(random(width), random(height));
  }
	background(51);
}

function draw() {
	video.loadPixels();
  for (let i = 0; i < particles.length; i++) {
  	particles[i].update();
  	particles[i].show();
  }
}// https://www.youtube.com/watch?v=0V3uYA1hafk

let video;
let vScale = 16;

let particles = [];

function setup() {
	createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  for (let i = 0; i < 200; i++) {
  	  particles[i] = new Particle(random(width), random(height));
  }
	background(51);
}

function draw() {
	video.loadPixels();
  for (let i = 0; i < particles.length; i++) {
  	particles[i].update();
  	particles[i].show();
  }
}// https://www.youtube.com/watch?v=0V3uYA1hafk

let video;
let vScale = 16;

let particles = [];

function setup() {
	createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  for (let i = 0; i < 200; i++) {
  	  particles[i] = new Particle(random(width), random(height));
  }
	background(51);
}

function draw() {
	video.loadPixels();
  for (let i = 0; i < particles.length; i++) {
  	particles[i].update();
  	particles[i].show();
  }
}// https://www.youtube.com/watch?v=0V3uYA1hafk

let video;
let vScale = 16;

function setup() {
	createCanvas(640, 480);
  pixelDensity(1);
}

function draw() {
  video = createCapture(VIDEO);
	video.size(width/vScale, height/vScale);
}let img;
function preload() {
  img = loadImage('assets/frankie.png');
}

function setup() {
  createCanvas(500, 500);
  pixelDensity(1);
  image(img, 0, 0);
  let c = get(400, 400);
  fill(c);
  noStroke();
  rect(25, 25, 250, 250);
}

function draw() {

}let animationA = [];
let animationB = [];
let totalPhotoNumber = 3;
let animationACounter = 0;
let animationBCounter = 0;

let frame = 0;
let animate = 1;

function preload() {
  // Loop through photo folders and preload all the photos
  for (let i = 0; i < totalPhotoNumber; i++) {
    animationA[i] = loadImage("themarias/themarias_" + i.toString() + ".png");
    animationB[i] = loadImage("jessebaez/jessebaez_" + i.toString() + ".png");
  }
}

function setup() {
  createCanvas(500, 1000);
  loadPixels();
  frameRate(2);

  // Array position of animationA and animationB
  for (let i = 0; i < totalPhotoNumber; i++) {
    print(animationA[i] + " animationA position:" + [i]);
    print(animationB[i] + " animationB position:" + [i]);
  }
}

function draw() {
   let d = pixelDensity();

  
  // Alternate between Animation 1 and Animation 2
  if (frame % 2 == 0) {
    animate = 2
  } else {
    animate = 1
  }

  // AnimationA 
  if (animate == 1) {
    image(animationA[animationACounter], 0, 0);
    animationACounter = animationACounter + 1;
  }

  // AnimationB
  if (animate == 2) {
    image(animationB[animationBCounter], 0, 0);
    animationBCounter = animationBCounter + 1;
  }

  // animationACounter restart
  if (animationACounter >= totalPhotoNumber) {
    animationACounter = 0;
  }

  // animationBCounter restart
  if (animationBCounter >= totalPhotoNumber) {
    animationBCounter = 0;
  }

  frame = frame + 1;

  // Frame count
  if (frame >= 6) {
    frame = 0;
  }
}let img;
function preload() {
  img = loadImage('assets/frankie.png');
}

function setup() {
  createCanvas(500, 1000);
  image(img, 0, 0);
  loadPixels();
}

function draw() {
  let d = pixelDensity();
  let halfImage = 4 * (img.width/2 * d) * (img.height * d / 2);
	  for (let i = 0; i < halfImage; i++) {
    pixels[i + halfImage] = pixels[i];
  }
  updatePixels();
}let img;
function preload() {
  img = loadImage('assets/frankie.png');
}

function setup() {
  createCanvas(500, 1000);
  image(img, 0, 0);
  loadPixels();
}

function draw() {
  let d = pixelDensity();
  let halfImage = 4 * (img.width/2 * d) * (img.height * d / 2);
	  for (let i = 0; i < halfImage; i++) {
    pixels[i + halfImage] = pixels[i*2];
  }
  updatePixels();
}let img;
function preload() {
  img = loadImage('assets/frankie.png');
}

function setup() {
  createCanvas(500, 1000);
  image(img, 0, 0);
  let d = pixelDensity();
  let halfImage = 4 * (img.width * d) * (img.height * d / 2);
  loadPixels();
  for (let i = 0; i < halfImage; i++) {
    pixels[i + halfImage] = pixels[i];
  }
  updatePixels();
}let img;
function preload() {
  img = loadImage('assets/frankie.png');
}

function setup() {
  createCanvas(500, 500);
  pixelDensity(1);
  image(img, 0, 0);
  let c = get(400, 400);
  fill(c);
  noStroke();
  rect(25, 25, 250, 250);
}

function draw() {

}// https://editor.p5js.org/allison.parrish/sketches/HytaK1VpW
// age, ethnicity, tenure, timeline of female director, turnover, gender by dept, what can this dataset answer
let table;
let male = 0;
let female = 0;

function preload() {
	table = loadTable('https://raw.githubusercontent.com/MuseumofModernArt/exhibitions/master/MoMADirectorsDepartmentHeads.csv', 'csv', 'header');
}

function setup() {
  createCanvas(400, 600);
  let gender = table.getColumn('Gender');
  for (let i = 0; i < gender.length; i++) {
  	if (gender[i] == "Male") {
    	male = male + 1;
      print(male);
    }
    if(gender[i] == "Female") {
      female = female +1;
    }
  }
}

function draw() {
  background(255);
  let x = 0;
  let y = 0;
  // male
	for (let i = 0; i < male; i++) {
    text('male', x, y);
    y = y + 10
  }
  // female
  y = 0
  for (let i = 0; i < female; i++) {
    text('female', x + 25, y + 10)
    y = y + 10;
  }
  
  text('MoMADirectorsDepartmentHeads', 0, 540)
}let animationA = [];
let animationB = [];
let totalPhotoNumber = 3;
let animationACounter = 0;
let animationBCounter = 0;

let frame = 0;
let animate = 1;

function preload() {
  // Loop through photo folders and preload all the photos
  for (let i = 0; i < totalPhotoNumber; i++) {
    animationA[i] = loadImage("themarias/themarias_" + i.toString() + ".png");
    animationB[i] = loadImage("jessebaez/jessebaez_" + i.toString() + ".png");
  }
}

function setup() {
  createCanvas(400, 1000);
  frameRate(60);

  // Array position of animationA and animationB
  for (let i = 0; i < totalPhotoNumber; i++) {
    print(animationA[i] + " animationA position:" + [i]);
    print(animationB[i] + " animationB position:" + [i]);
  }
}

function draw() {
  // Alternate between Animation 1 and Animation 2
  if (frame % 2 == 0) {
    animate = 2
  } else {
    animate = 1
  }

  // AnimationA 
  if (animate == 1) {
    image(animationA[animationACounter], 0, 0);
    animationACounter = animationACounter + 1;
  }

  // AnimationB
  if (animate == 2) {
    image(animationB[animationBCounter], 0, 0);
    animationBCounter = animationBCounter + 1;
  }

  // animationACounter restart
  if (animationACounter >= totalPhotoNumber) {
    animationACounter = 0;
  }

  // animationBCounter restart
  if (animationBCounter >= totalPhotoNumber) {
    animationBCounter = 0;
  }

  frame = frame + 1;

  // Frame count
  if (frame >= 6) {
    frame = 0;
  }
}let animationA = [];
let animationB = [];
let totalPhotoNumber = 3;
let animationACounter = 0;
let animationBCounter = 0;

let frame = 0;
let animate = 1;

function preload() {
  // Loop through photo folders and preload all the photos
  for (let i = 0; i < totalPhotoNumber; i++) {
    animationA[i] = loadImage("themarias/themarias_" + i.toString() + ".png");
    animationB[i] = loadImage("jessebaez/jessebaez_" + i.toString() + ".png");
  }
}

function setup() {
  createCanvas(400, 1000);
  frameRate(24);

  // Array position of animationA and animationB
  for (let i = 0; i < totalPhotoNumber; i++) {
    print(animationA[i] + " animationA position:" + [i]);
    print(animationB[i] + " animationB position:" + [i]);
  }
}

function draw() {
  // Alternate between Animation 1 and Animation 2
  if (frame % 2 == 0) {
    animate = 2
  } else {
    animate = 1
  }

  // AnimationA 
  if (animate == 1) {
    image(animationA[animationACounter], 0, 0);
    animationACounter = animationACounter + 1;
  }

  // AnimationB
  if (animate == 2) {
    image(animationB[animationBCounter], 0, 0);
    animationBCounter = animationBCounter + 1;
  }

  // animationACounter restart
  if (animationACounter >= totalPhotoNumber) {
    animationACounter = 0;
  }

  // animationBCounter restart
  if (animationBCounter >= totalPhotoNumber) {
    animationBCounter = 0;
  }

  frame = frame + 1;

  // Frame count
  if (frame >= 6) {
    frame = 0;
  }
}let animationA = [];
let animationB = [];
let totalPhotoNumber = 3;
let animationACounter = 0;
let animationBCounter = 0;

let frame = 0;
let animate = 1;

function preload() {
  // Loop through photo folders and preload all the photos
  for (let i = 0; i < totalPhotoNumber; i++) {
    animationA[i] = loadImage("themarias/themarias_" + i.toString() + ".png");
    animationB[i] = loadImage("jessebaez/jessebaez_" + i.toString() + ".png");
  }
}

function setup() {
  createCanvas(400, 1000);
  frameRate(6);

  // Array position of animationA and animationB
  for (let i = 0; i < totalPhotoNumber; i++) {
    print(animationA[i] + " animationA position:" + [i]);
    print(animationB[i] + " animationB position:" + [i]);
  }
}

function draw() {
  // Alternate between Animation 1 and Animation 2
  if (frame % 2 == 0) {
    animate = 2
  } else {
    animate = 1
  }

  // AnimationA 
  if (animate == 1) {
    for (let i = 0; i < animationA.length; i++) {
      image(animationA[i], 0, 0);
    }
  }

  // AnimationB
  if (animate == 2) {
    for (let i = 0; i < animationB.length; i++) {
      image(animationB[i], 0, 0);
    }
  }

  frame = frame + 1;

  // Frame count
  if (frame >= 6) {
    frame = 0;
  }
}let animationA = [];
let animationB = [];
let totalPhotoNumber = 3;

let frame = 0;
let animate = 1;

function preload() {
  // Loop through photos folder and preload all the photos
  for (let i = 0; i < totalPhotoNumber; i++) {
    animationA[i] = loadImage("themarias/themarias_" + i.toString() + ".png");
    animationB[i] = loadImage("jessebaez/jessebaez_" + i.toString() + ".png");
  }
}

function setup() {
  createCanvas(400, 1000);
  frameRate(6);

  // Printing in array position of animationA and animationB
  for (let i = 0; i < totalPhotoNumber; i++) {
    print(animationA[i] + " animationA position:" + [i]);
    print(animationB[i] + " animationB position:" + [i]);
  }
}

function draw() {
  // Alternate between Animation 1 and Animation 2
  if (frame % 2 == 0) {
    animate = 2
  } else {
    animate = 1
  }

  // Animation 1  
  if (animate == 1) {
    y = 0;
    for (let i = 0; i < animationA.length; i++) {
      image(animationA[i], 0, y);
      y = y + 200;
    }
  }

  // Animation 2
  if (animate == 2) {
    y = 0;
    for (let i = 0; i < animationB.length; i++) {
      image(animationB[i], 0, y);
      y = y + 200;
    }
  }

  frame = frame + 1;

  // Frame count
  if (frame >= 6) {
    frame = 0;
  }
}let animationA = [];
let animationB = [];
let totalPhotoNumber = 3;

function preload() {
  // Loop through photos folder and preload all the photos
  for (let i = 0; i < totalPhotoNumber; i++) {
    animationA[i] = loadImage("themarias/themarias_" + i.toString() + ".png");
    animationB[i] = loadImage("jessebaez/jessebaez_" + i.toString() + ".png");
  }
}

function setup() {
  createCanvas(400, 1000);

  // Printing in array position of animationA and animationB
  for (let i = 0; i < totalPhotoNumber; i++) {
    print(animationA[i] + " animationA position:" + [i]);
    print(animationB[i] + " animationB position:" + [i]);
  }
}

function draw() {
  y = 0;
  // Display animationA and animationB in alternating order of frames
  for (let i = 0; i < totalPhotoNumber; i++) {
    image(animationA[i], 0, y);
    y = y + 200;
    image(animationB[i], 0, y);
    y = y + 200;
  }
}let animationA = [];
let animationB = [];
let totalPhotoNumber = 3;

function preload() {
  // Loop through photos folder and preload all the photos
  for (let i = 0; i < totalPhotoNumber; i++) {
    animationA[i] = loadImage("themarias/themarias_" + i.toString() + ".png");
    animationB[i] = loadImage("jessebaez/jessebaez_" + i.toString() + ".png");
  }
}

function setup() {
  createCanvas(800, 600);
  
  // Animation A array position
  for (let i = 0; i < animationA.length; i++) {
    print(animationA[i] + " animationA position:" + [i]);
  }
  
  // Animation B array position
  for (let i = 0; i < animationB.length; i++) {
    print(animationB[i] + " animationB position:" + [i]);
  }
}

function draw() {
  background(220);
  x = 0;
  y = 0;
  
  // AnimationA display
  for (let i = 0; i < animationA.length; i++) {
    image(animationA[i], 0, y);
    y = y + 200;
  }
  
  // AnimationB display
  y = 0;
  for (let i = 0; i < animationB.length; i++) {
    image(animationB[i], 400, y);
    y = y + 200;
  }
  
}let photos = [];
let totalPhotoNumber = 3;

function preload() {
  // Loop through photos folder and preload all the photos
  for (let i = 0; i < totalPhotoNumber; i++) {
    photos[i] = loadImage("photos/themarias_" + i.toString() + ".png");
  }
}

function setup() {
  createCanvas(400, 600);
  // Array position
  for (let i = 0; i < photos.length; i++) {
    print(photos[i] + " Array position:" + [i]);
  }
}

function draw() {
  background(220);
  y = 0;
  for (let i = 0; i < photos.length; i++) {
    image(photos[i], 0, y);
    y = y + 200;
  }
}let photos = [];

function preload() {
  for (let i = 0; i < photos.length; i++) {
    photos[i] = loadImage("photos/themarias_" + i + ".png");
  }
}

function setup() {
  createCanvas(400, 400);
    for (let i = 0; i < photos.length; i++) {
    print(photos[i] + " Array position:" + [i]);
  }
}

function draw() {
    for (var i=0; i<photos.length; i++) {
    image(photos[i], 0, 0); 
  }
}let photos = ["&", "*", "!"];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < photos.length; i++) {
    print(photos[i] + " Array position:" + [i]);
  }
}

function draw() {
  background(255);
  for (let i = 0; i < photos; i++) {
    fill(50);
    text(photos, x, y);
    y = y + 10
  }
}let photos = [];

function preload() {
  for (let i=0; i<3; i++) {
    photos[i] = loadImage("themariascarino"+i+".png");
    console.log(photos[i])
  }
}

function draw() {
  // image(photos[0], 0, 0);
  
  for (let i=0; i<3; i++) {
    image(photos[i], 0, 0); 
  }
}// create two array of images
// keep track of index number of array
// 10.3: An Array of Images - Processing Tutorial
// https://www.youtube.com/watch?v=DPFJROWdkQ8&vl=en

let frame = 0;
let animate = 1;

function preload() {
}

function setup() {
  createCanvas(400, 400);
  // Frame rate
  frameRate(6);
}

function draw() {
  // Alternate between Animation 1 and Animation 2
  if (frame % 2 == 0 ) {
    animate = 2
  	} else {
    animate = 1
    }
  
	// Animation 1  
  if (animate == 1) {
    background(0);
  }
	
  // Animation 2
  if (animate == 2) {
    background(255);
  }
  
  frame = frame + 1;

  // Frame count
  if (frame >= 6) {
    frame = 0;
  }
}
// set framRate(24)
// create two array of images
// keep track of index number of array

let frame = 0;
let animate = 1;

function preload() {
}

function setup() {
  createCanvas(400, 400);
  // Frame rate
  frameRate(24);
}

function draw() {
  // alternate between animation 1 and animation 2
  if (frame % 2 == 0 ) {
    animate = 2
  	} else {
    animate = 1
    }
  
	// animation 1  
  if (animate == 1) {
    background(0);
  }
	
  // animation 2
  if (animate == 2) {
    background(255);
  }
  
  frame = frame + 1;

  // frame count
  if (frame >= 12) {
    frame = 0;
  }
}// https://creative-coding.decontextualize.com/media/
// Does the frameRate only work if I am animating?

let tracker;
let frame = 0;
let animate = 2;

function preload() {
  tracker = loadImage("tracker.png");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  // framerate will change with every draw
  frameRate(random(1, 60));
  // alternate between animation 1 and animation 2
  // 9/10 times is will display animation 2
  if (random(100) > 90 ) {
    animate = 2;
  	} else {
    animate = 1;
    }
  
	// animation 1 
  if (animate == 1) {
    background(0);
    // animation 1
    for (let i = 0; i < frame; i++) {
      image(tracker, (i * 25), (i * 25),
        tracker.width * (i + 1) / 10,
        tracker.height * (i + 1) / 10);
    }

  }
	
  // animation 2
  if (animate == 2) {
    background(255);
    for (let i = 0; i < frame; i++) {
      image(tracker, (i * 50), (i * 50),
        tracker.width * (i + 2) / 5,
        tracker.height * (i + 2) / 5);
    }
  }
  
  frame = frame + 1;

  // frame count
  if (frame >= 12) {
    frame = 0;
  }
}// Does not load model. Should I run it on p5.js or locally?

// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Style Transfer Mirror Example using p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let style;
let video;
let isTransferring = false;
let resultImg;

function setup() {
  createCanvas(320, 240).parent('canvasContainer');

  video = createCapture(VIDEO);
  video.hide();

  // The results image from the style transfer
  resultImg = createImg('');
  resultImg.hide();

  // The button to start and stop the transfer process
  select('#startStop').mousePressed(startStop);

  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
  style = ml5.styleTransfer('models/udnie', video, modelLoaded);
}

function draw(){
  // Switch between showing the raw camera or the style
  if (isTransferring) {
    image(resultImg, 0, 0, 320, 240);
  } else {
    image(video, 0, 0, 320, 240);
  }
}

// A function to call when the model has been loaded.
function modelLoaded() {
  select('#status').html('Model Loaded');
}

// Start and stop the transfer process
function startStop() {
  if (isTransferring) {
    select('#startStop').html('Start');
  } else {
    select('#startStop').html('Stop');
    // Make a transfer using the video
    style.transfer(gotResult); 
  }
  isTransferring = !isTransferring;
}

// When we get the results, update the result image src
function gotResult(err, img) {
  resultImg.attribute('src', img.src);
  if (isTransferring) {
    style.transfer(gotResult); 
  }
}
// https://p5js.org/reference/#/p5/frameRate

var rectX = 0;
var fr = 12; //starting FPS
var clr;

function setup() {
  background(200);
  frameRate(fr); // Attempt to refresh at starting FPS
  clr = color(255, 0, 0);
}

function draw() {
  background(200);
  rectX = rectX += 1; // move Rectangle

  if (rectX >= width) {
   // If you go off screen.
    if (fr === 12) {
      clr = color(0, 0, 255);
      fr = 24;
      frameRate(fr); // make frameRate 24 FPS
    } else {
      clr = color(255, 0, 0);
      fr = 12;
      frameRate(fr); // make frameRate 12 FPS
    }
    rectX = 0;
  }
  fill(clr);
  rect(rectX, 40, 20, 20);
}// https://creative-coding.decontextualize.com/media/
// Does the frameRate only work if I am animating?

// for loop for doing multiple things in one frame of animation
// set framRate(24)
// get rid of the for loop
// create two array of images
// keep track of index number of array

let tracker;
let frame = 0;
let animate = 2;

function preload() {
  tracker = loadImage("tracker.png");
}

function setup() {
  createCanvas(400, 400);
  frameRate(2);
}

function draw() {
  // alternate between animation 1 and animation 2
  // if animate is event
  if (frame % 2 == 0 ) {
    animate = 2
  	} else {
    animate = 1
    }
  
	// animation 1  
  if (animate == 1) {
    background(0);
    // animation 1
    for (let i = 0; i < frame; i++) {
      image(tracker, (i * 25), (i * 25),
        tracker.width * (i + 1) / 10,
        tracker.height * (i + 1) / 10);
    }

  }
	
  // animation 2
  if (animate == 2) {
    background(255);
    for (let i = 0; i < frame; i++) {
      image(tracker, (i * 50), (i * 50),
        tracker.width * (i + 2) / 5,
        tracker.height * (i + 2) / 5);
    }
  }
  
  frame = frame + 1;

  // frame count
  if (frame >= 12) {
    frame = 0;
  }
}// https://p5js.org/reference/#/p5/frameRate

let rectX = 0;
let fps = 12; // starting FPS
let clr;

function setup () {
	background(0);
  frameRate(fps);
  clr = color(255, 0, 0); 
}

function draw() {
	background(200);
  rectX = rectX += 1;
  
  if (rectX >= width) {
      if (fps === 12) {
        clr = color(0, 0, 255);
  			fps = 24;
        frameRate(fps);
      } else if (fps === 24) {
        clr = color(255, 0, 0);
        fps = 48;
        frameRate(fps);
      } else {
        clr = color(0, 255, 0);
        fps = 60;
        frameRate(fps);
      }
      rextX = 0;	
    }
  fill(clr);
  rect(rectX, 40, 20, 20);
}let temp = 250;
let humidity = 250;
let wind = 10;
let fWheel;
let bWheel;

function preload() {
	fWheel = loadImage('assets/fWheel.png');
  bWheel = loadImage('assets/bWheel.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}

function draw() {
  loadPixels();
  
    for (let y = 0; y < height; y++) {
  	for (let x = 0; x < width; x++) {
      
      // r, g, b, a
      let index = (x + y * width) * 4;
      
      // the pixel you want to change
      pixels[index+0] = x;
      pixels[index+1] = 0;
      pixels[index+2] = y;
      pixels[index+3] = 255;
  	}
  }

  
  
  
  background(255);
  
  
  
  // front wheel - temp
  image(fWheel, windowWidth/8, windowHeight/3, temp, temp);
  
  // back wheel - humidity
  image(bWheel, windowWidth/2, windowHeight/3, humidity, humidity); 

    // make changes to the pixels
  updatePixels();

}let temp = 250;
let humidity = 150;
let wind = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  
  // front wheel - temp
  strokeWeight(5);
  noFill();
  ellipse(windowWidth/3, windowHeight/2, temp, temp);
  
  // back wheel - humidity
  strokeWeight(5);
  noFill();
  ellipse(windowWidth/3*2, windowHeight/2, humidity, humidity);
  
  // frame
  strokeWeight(5);
  line(windowWidth/3, windowHeight/2, windowWidth/3*2, windowHeight/2);
  
  // handle bar
  line(windowWidth/3, windowWidth/3, windowWidth/3, windowHeight/2 + 100);
  
}// 11.7: Slit-Scan Video - p5.js Tutorial

let video;
let x = 0;
let y = 0;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(320, 240);
  background(0);
}

function draw() {
  video.loadPixels();

  let w = video.width;
  let h = video.height;

  // horizontal video
  let slitscanX = copy(video, 0, h / 2, w, 100, 0, y, w, 100);

  y = y + 1;

  if (y > height) {
    y = 0;
  }

  // vertical video
  let slitscanY = copy(video, w / 2, 0, 1, h, x, 0, 1, h);

  x = x + 1;

  if (x > width) {
    x = 0;
  }
}// 11.7: Slit-Scan Video - p5.js Tutorial
// Vertical

let video;
let y = 0;

function setup() {
  createCanvas(100, 400);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(320, 240);
  background(0);
}

function draw() {
  video.loadPixels();
  
  let w = video.width;
  let h = video.height;
  
	copy(video, 0, h/2, w, 100, 0, y, w, 100);
  
  y = y + 1;
  
  if (y > height) {
      y = 0;
  }
}// 11.7: Slit-Scan Video - p5.js Tutorial
// Horizontal

let video;
let x = 0;

function setup() {
  createCanvas(800, 240);
  pixelDensity(10);
  video = createCapture(VIDEO);
  video.size(320, 240);
  background(51);
}

function draw() {
  video.loadPixels();
  
  let w = video.width;
  let h = video.height;
  
  copy(video, w/2, 0, 1, h, x, 0, 1, h);
  
  x = x + 1;
  if (x > width) {
      x = 0;
  }
}let capture;

function setup() {
  createCanvas(800, 800);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  image(capture, 0, 0, width, width * capture.height / capture.width);
  copy(capture, mouseX, mouseY, mouseX, mouseY, mouseX, mouseY, mouseX, mouseY);
}
// camera

// let capture;

// function setup() {
//   createCanvas(400, 400);
//   capture = createCapture(VIDEO);
//   capture.hide();
// }

// function draw() {
//   image(capture, 0, 0, width, width * capture.height / capture.width);
// 	filter(INVERT);
// }

// copy()
let img;

function preload() {
  img = loadImage('assets/leaves.jpg');
}

function setup() {
  background(img);
  copy(img, 7, 22, 50, 50, 35, 25, 50, 50);
  stroke(255);
  noFill();
  rect(7, 22, 10, 10);
}// camera
let capture;
// photo
let img;

// preload photo
function preload() {
  img = loadImage('assets/leaves.jpg');
}

function setup() {
  // camera
  createCanvas(400, 400);
  capture = createCapture(VIDEO);
  capture.hide();
  
  // photo
  background(img);
  copy(img, 7, 22, 50, 50, 35, 25, 50, 50);
  stroke(255);
  noFill();
  rect(7, 22, 10, 10);
}

function draw() {
  image(capture, 0, 0, width, width * capture.height / capture.width);
	// filter(INVERT);
}
let capture;

function setup() {
  createCanvas(400, 400);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  image(capture, 0, 0, width, width * capture.height / capture.width);
	filter(INVERT);
}// 11.3: The Pixel Array - p5.js Tutorial
// https://www.youtube.com/watch?v=nMUMZ5YRxHI

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  background(51);
  
  // tells p5 that you want to work with the canvas
  loadPixels();
  
  for (let y = 0; y < height; y++) {
  	for (let x = 0; x < width; x++) {
      
      // r, g, b, a
      let index = (x + y * width) * 4;
      
      // the pixel you want to change
      pixels[index+0] = x;
      pixels[index+1] = 0;
      pixels[index+2] = y;
      pixels[index+3] = 255;
  	}
  }
  
  // make changes to the pixels
  updatePixels();
}// Why do we not need to use draw anymore? Isn't createImage, drawing pixels?

function setup() {
  let img = createImage(100, 100);
  img.loadPixels();
  for (let a = 0; a < img.width; a++) {
    for (let b = 0; b < img.height; b++) {
      img.set(a, b, color(random(255), random(255), random(255)));
    }
  }
  img.updatePixels();
  image(img, 1, 1);
}// saveFrame
// saveFrameImages

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// age, ethnicity, tenure, timeline of female director, turnover, gender by dept, what can this dataset answer
let table;
let male = 0;
let female = 0;

function preload() {
	table = loadTable('https://raw.githubusercontent.com/MuseumofModernArt/exhibitions/master/MoMADirectorsDepartmentHeads.csv', 'csv', 'header');
}

function setup() {
  createCanvas(400, 600);
  let gender = table.getColumn('Gender');
  for (let i = 0; i < gender.length; i++) {
  	if (gender[i] == "Male") {
    	male = male + 1;
      print(male);
    }
    if(gender[i] == "Female") {
      female = female +1;
    }
  }
}

function draw() {
  background(255);
  let x = 0;
  let y = 0;
  // male
	for (let i = 0; i < male; i++) {
    text('male', x, y);
    y = y + 10
  }
  // female
  y = 0
  for (let i = 0; i < female; i++) {
    text('female', x + 25, y + 10)
    y = y + 10;
  }
  
  text('MoMADirectorsDepartmentHeads', 0, 540)
}//PoseNet with Webcam credit: https://ml5js.org/docs/posenet-webcam
//Worked with Yuguang Zhang

let video;
let poseNet;
let poses = [];
let mouseWidth = 0, mouseHeight = 0;
let showSketch;
var serial; // variable to hold an instance of the serialport library
var data = 0;

function setup() {
  serial = new p5.SerialPort();  // make a new instance of  serialport library
  serial.on('data', processData);// callback for new data coming in
	serial.open("/dev/cu.usbmodem1411"); // *** CHECK THE PORT *** open a port
  
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

// Process serial data, using readChar();
function processData() {
	var inString = serial.readChar();
	if (!inString) return;
	data = inString.trim();
  if (data == "1") {
  	showSketch = true;
  } else {
  	showSketch = false;
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  if (showSketch === true ) {
    //image(video, 0, 0, width, height);
    background (0);
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    //drawSkeleton();
  } else {
  	background (0);
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    
    let pose = poses[i].pose;
    let nose;
    let leftEye;
    let rightEye;
    let leftShoulder;
    let rightShoulder;
    
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 1:
            leftEye = keypoint;
            break;
          case 2:
            rightEye = keypoint;
            break;
          case 5:
            leftShoulder = keypoint;
            break;
          case 6:
            rightShoulder = keypoint;
            break;
        }
        
        if (nose && leftShoulder && rightShoulder) {
          fill(206,122,33);
          noStroke();
          beginShape();
          curveVertex(rightShoulder.position.x ,rightShoulder.position.y);
          curveVertex(rightShoulder.position.x ,rightShoulder.position.y);
          curveVertex(nose.position.x - 100 ,nose.position.y - 110);
          curveVertex(nose.position.x + 80 ,nose.position.y - 110);
          curveVertex(leftShoulder.position.x ,leftShoulder.position.y);
          curveVertex(leftShoulder.position.x,leftShoulder.position.y);
          endShape();
          
          fill(238,179,72);
          beginShape();
          curveVertex(rightShoulder.position.x + 30,rightShoulder.position.y);
          curveVertex(rightShoulder.position.x + 30,rightShoulder.position.y);
          curveVertex(nose.position.x - 80 ,nose.position.y - 110);
          curveVertex(nose.position.x + 80 ,nose.position.y - 110);
          curveVertex(leftShoulder.position.x ,leftShoulder.position.y);
          curveVertex(leftShoulder.position.x,leftShoulder.position.y);
          endShape();
          
          noFill();
          stroke(0);
          strokeWeight(3);
          arc(nose.position.x ,nose.position.y, 30 + mouseWidth, 20 + mouseHeight, 0, PI);
          mouseWidth +=0.5; mouseHeight-= 0.01;
            if (mouseWidth >= 55) {
              mouseWidth = 0;
              mouseHeight = 0;
            } 
         }
       }
       else if (nose && !leftShoulder && !rightShoulder) {
          drawShoulder(nose.position.x ,nose.position.y);
          noFill();
          stroke(0);
          strokeWeight(3);
          arc(nose.position.x ,nose.position.y, 30 + mouseWidth, 20 + mouseHeight, 0, PI);
          mouseWidth +=0.5; mouseHeight-= 0.01;
            if (mouseWidth >= 55) {
              mouseWidth = 0;
              mouseHeight = 0;
            }
         }  
          
        
        if (leftEye) {
        fill(255);
        noStroke();  
        ellipse(leftEye.position.x, leftEye.position.y, 30, 30);
        fill(0);
        ellipse(leftEye.position.x, leftEye.position.y, 10, 13);
        rect (leftEye.position.x - 10, leftEye.position.y - 40, 15, 3);
      }
        if (rightEye) {
        fill(255);
        noStroke();  
        ellipse(rightEye.position.x, rightEye.position.y, 30, 30);
        fill(0);
        ellipse(rightEye.position.x, rightEye.position.y, 10, 13);
        rect (rightEye.position.x - 10, rightEye.position.y - 40, 15, 3);
          
      }
        
    }
  
  }
}

function drawShoulder(x,y) {
          this.x = x;
          this.y = y;
          fill(206,122,33);
          noStroke();
          beginShape();
          curveVertex(this.x - 150  ,this.y + 150);
          curveVertex(this.x - 150,this.y + 150);
          curveVertex(this.x - 100 ,this.y - 110);
          curveVertex(this.x + 80 ,this.y - 110);
          curveVertex(this.x + 150 ,this.y + 150);
          curveVertex(this.x + 150 ,this.y + 150);
          endShape();
          
          fill(238,179,72);
          beginShape();
          curveVertex(this.x - 130,this.y + 150);
          curveVertex(this.x - 130,this.y +150);
          curveVertex(this.x - 80 ,this.y - 110);
          curveVertex(this.x + 80 ,this.y - 110);
          curveVertex(this.x + 150 ,this.y + 150);
          curveVertex(this.x + 150,this.y + 150);
          endShape();
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}//PoseNet with Webcam credit: https://ml5js.org/docs/posenet-webcam
//Worked with Yuguang Zhang

let video;
let poseNet;
let poses = [];
let mouseWidth = 0, mouseHeight = 0;
let showSketch;
var serial; // variable to hold an instance of the serialport library
var data = 0;

function setup() {
  serial = new p5.SerialPort();  // make a new instance of  serialport library
  serial.on('data', processData);// callback for new data coming in
	serial.open("/dev/cu.usbmodem1411"); // *** CHECK THE PORT *** open a port
  
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

// Process serial data, using readChar();
function processData() {
	var inString = serial.readChar();
	if (!inString) return;
	data = inString.trim();
  if (data == "1") {
  	showSketch = true;
  } else {
  	showSketch = false;
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  if (showSketch === true ) {
    //image(video, 0, 0, width, height);
    background (0);
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    //drawSkeleton();
  } else {
  	background (0);
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    
    let pose = poses[i].pose;
    let nose;
    let leftEye;
    let rightEye;
    let leftShoulder;
    let rightShoulder;
    
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 1:
            leftEye = keypoint;
            break;
          case 2:
            rightEye = keypoint;
            break;
          case 5:
            leftShoulder = keypoint;
            break;
          case 6:
            rightShoulder = keypoint;
            break;
        }
        
        if (nose && leftShoulder && rightShoulder) {
          fill(206,122,33);
          noStroke();
          beginShape();
          curveVertex(rightShoulder.position.x ,rightShoulder.position.y);
          curveVertex(rightShoulder.position.x ,rightShoulder.position.y);
          curveVertex(nose.position.x - 100 ,nose.position.y - 110);
          curveVertex(nose.position.x + 80 ,nose.position.y - 110);
          curveVertex(leftShoulder.position.x ,leftShoulder.position.y);
          curveVertex(leftShoulder.position.x,leftShoulder.position.y);
          endShape();
          
          fill(238,179,72);
          beginShape();
          curveVertex(rightShoulder.position.x + 30,rightShoulder.position.y);
          curveVertex(rightShoulder.position.x + 30,rightShoulder.position.y);
          curveVertex(nose.position.x - 80 ,nose.position.y - 110);
          curveVertex(nose.position.x + 80 ,nose.position.y - 110);
          curveVertex(leftShoulder.position.x ,leftShoulder.position.y);
          curveVertex(leftShoulder.position.x,leftShoulder.position.y);
          endShape();
          
          noFill();
          stroke(0);
          strokeWeight(3);
          arc(nose.position.x ,nose.position.y, 30 + mouseWidth, 20 + mouseHeight, 0, PI);
          mouseWidth +=0.5; mouseHeight-= 0.01;
            if (mouseWidth >= 55) {
              mouseWidth = 0;
              mouseHeight = 0;
            } 
         }
       }
       else if (nose && !leftShoulder && !rightShoulder) {
          drawShoulder(nose.position.x ,nose.position.y);
          noFill();
          stroke(0);
          strokeWeight(3);
          arc(nose.position.x ,nose.position.y, 30 + mouseWidth, 20 + mouseHeight, 0, PI);
          mouseWidth +=0.5; mouseHeight-= 0.01;
            if (mouseWidth >= 55) {
              mouseWidth = 0;
              mouseHeight = 0;
            }
         }  
          
        
        if (leftEye) {
        fill(255);
        noStroke();  
        ellipse(leftEye.position.x, leftEye.position.y, 30, 30);
        fill(0);
        ellipse(leftEye.position.x, leftEye.position.y, 10, 13);
        rect (leftEye.position.x - 10, leftEye.position.y - 40, 15, 3);
      }
        if (rightEye) {
        fill(255);
        noStroke();  
        ellipse(rightEye.position.x, rightEye.position.y, 30, 30);
        fill(0);
        ellipse(rightEye.position.x, rightEye.position.y, 10, 13);
        rect (rightEye.position.x - 10, rightEye.position.y - 40, 15, 3);
          
      }
        
    }
  
  }
}

function drawShoulder(x,y) {
          this.x = x;
          this.y = y;
          fill(206,122,33);
          noStroke();
          beginShape();
          curveVertex(this.x - 150  ,this.y + 150);
          curveVertex(this.x - 150,this.y + 150);
          curveVertex(this.x - 100 ,this.y - 110);
          curveVertex(this.x + 80 ,this.y - 110);
          curveVertex(this.x + 150 ,this.y + 150);
          curveVertex(this.x + 150 ,this.y + 150);
          endShape();
          
          fill(238,179,72);
          beginShape();
          curveVertex(this.x - 130,this.y + 150);
          curveVertex(this.x - 130,this.y +150);
          curveVertex(this.x - 80 ,this.y - 110);
          curveVertex(this.x + 80 ,this.y - 110);
          curveVertex(this.x + 150 ,this.y + 150);
          curveVertex(this.x + 150,this.y + 150);
          endShape();
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}let video;
let img;
let poseNet;

let newPoses = []; // array to store the new poses retrived from PoseNet
let totalPoses = []; // array to store the total number of poses shown on the screen

let poseNetReady = false; // whether PoseNet model is ready
let startingPoints = [];
let precisionRatio = 4; // the radio between camera size and skeleton size
let sliceWidthInto = 10;
let sliceHeightInto = 4;
let poseIndex = 0;

let option = {
  imageScaleFactor: 0.3,
  outputStride: 16,
  flipHorizontal: true,
  minConfidence: 0.5,
  maxPoseDetections: 5,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: 'single',
  multiplier: 0.75,
}

let middleShoulderX; // variables used to simplify a skeleton
let middleShoulderY;
let middleHipX;
let middleHipY;

function setup() {
  createCanvas(1400, 800);

  let videoWidth = width / sliceWidthInto * precisionRatio;
  let videoHeight = height / sliceHeightInto * precisionRatio;

  //prepare the starting point of each skeleton drawings
  for (j = 0; j < height; j += height / sliceHeightInto) {
    for (i = 0; i < width; i += width / sliceWidthInto) {
      startingPoints.push([i, j]);
    }
  }

  video = createCapture(VIDEO);
  video.size(videoWidth, videoHeight);

  img = loadImage('a.png');
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, option, modelReady);
  poseNet.detectionType = 'single';
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    newPoses = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();


  // setInterval(updatePose, 500 / sliceWidthInto);
  // setInterval(drawPose, 500 / sliceWidthInto);
  frameRate(20)
}



function modelReady() {
  poseNetReady = true;
  //select('#status').html('Model Loaded');
}

function draw() {
  //print(poseNetReady);
  updatePose();
  drawPose();
  // if time Date.now()
}

function updatePose() {
  if (totalPoses.length < sliceWidthInto * sliceHeightInto) {
    totalPoses.push(newPoses);
    //print("totalPoses.length: " + totalPoses.length);
  } else {
    if (poseIndex == sliceWidthInto * sliceHeightInto) {
      totalPoses[0] = newPoses;
      poseIndex = 0;
    } else {
      totalPoses[poseIndex] = newPoses;
      poseIndex++;
    }
  }
}

function drawPose() {
  //image(video, 0, 0, width, height);
  background(255);

  if (poseNetReady) {

    for (let k = 0; k < totalPoses.length; k++) {
      drawKeypoints(startingPoints[k], totalPoses[k]);
      drawSkeleton(startingPoints[k], totalPoses[k]);
      //print("draw " + k + " th pose");
    }

  }


}


// A function to draw ellipses over the detected keypoints
function drawKeypoints(startingPoint, poses) {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints

    let pose = simplifyPose(poses[i].pose);
    let nose;
    let leftEye;
    let rightEye;
    let leftEar;
    let rightEar;

    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        //if the keypoint is part of a head (nose, eyes, or ears)
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 1:
            leftEye = keypoint;
            break;
          case 2:
            rightEye = keypoint;
            break;
          case 3:
            leftEar = keypoint;
            break;
          case 4:
            rightEye = keypoint;
            break;
        }
      }
    }

    if (nose) {

      fill(80);
      noStroke();
      ellipse(startingPoint[0] + nose.position.x / precisionRatio, startingPoint[1] + nose.position.y / precisionRatio, 30, 30);
      // let eyeDist = dist(leftEye.position.x, leftEye.position.y, rightEye.position.x, rightEye.position.y)/precisionRatio;
      //print("eyeDist " + eyeDist);
      // let hatLeftX = nose.position.x/precisionRatio - 10;
      // let hatLeftY = nose.position.y/precisionRatio - 4;
      // let hatRightX = nose.position.x/precisionRatio + 10;
      // let hatRightY = nose.position.y/precisionRatio - 4;
      fill(150);
      arc(startingPoint[0] + nose.position.x / precisionRatio, startingPoint[1] + nose.position.y / precisionRatio - 6, 30, 30, PI, TWO_PI);
      ellipse(startingPoint[0] + nose.position.x / precisionRatio - 10, startingPoint[1] + nose.position.y / precisionRatio - 6, 40, 5);
    }

  }

}

// A function to draw the skeletons
function drawSkeleton(startingPoint, poses) {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {

    let skeleton = poses[i].skeleton;
    //print(skeleton);
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(80);
      line(startingPoint[0] + partA.position.x / precisionRatio, startingPoint[1] + partA.position.y / precisionRatio, startingPoint[0] + partB.position.x / precisionRatio, startingPoint[1] + partB.position.y / precisionRatio);
    }
  }
}

//a function to reduce the skeleton
function simplifyPose(pose) {

  let rightShoulder;
  let leftShoulder;
  let rightHip;
  let leftHip;


  for (let i = 0; i < pose.keypoints.length; i++) {

    let keypoint = pose.keypoints[i];

    switch (keypoint.part) {
      case "rightShoulder":
        rightShoulder = keypoint;
        break;
      case "leftShoulder":
        leftShoulder = keypoint;
        break;
      case "rightHip":
        rightHip = keypoint;
        break;
      case "leftHip":
        leftHip = keypoint;
        break;
      default:
    }

  }

  if (rightShoulder && leftShoulder) {
    middleShoulderX = (rightShoulder.position.x + leftShoulder.position.x) / 2;
    middleShoulderY = (rightShoulder.position.y + leftShoulder.position.y) / 2;
    rightShoulder.position.x = middleShoulderX;
    rightShoulder.position.y = middleShoulderY;
    leftShoulder.position.x = middleShoulderX;
    leftShoulder.position.y = middleShoulderY;
  }

  if (rightHip && leftHip) {
    middleHipX = (rightHip.position.x + leftHip.position.x) / 2;
    middleHipY = (rightHip.position.y + leftHip.position.y) / 2;
    rightHip.position.x = middleHipX;
    rightHip.position.y = middleHipY;
    leftHip.position.x = middleHipX;
    leftHip.position.y = middleHipY;
  }

  return pose;
}void setup() {
  Serial.begin(9600);
  while(!Serial.available()) {
    Serial.println("hello");
    delay(300);
  }
}

void loop() {
  if (Serial.available()) {
    Serial.read();
    Serial.print(analogRead(A0));
    delay(1);
    Serial.print(',');
    Serial.print(analogRead(A1));
    delay(1);
    Serial.print(',');
    Serial.print(analogRead(A2));
    delay(1);
    Serial.print(',');
  }
}let serial;
let oscs = [];

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort();
  serial.open('/dev/cu.usmodem1411');
  serial.on("data", processData);
  
  for (let o = 0; o < NUM_SENSORS, o++) {
  	let osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(440);
    osc.amp(0.1);
    psc.start();
    pscs.push(osc);
  }
}

function draw() {
  background(220);
}

function processData() {
	let inByte = serial.read();
  if(!inString) return;
  console.log(inString);
  let data = inStringsplit(,);
  console.log(data);
  for (let o = 0; o < oscs.lenth, o++) {
  	let freq = map(parseInt(data[o]), 400, 500, 110, 880)
    oscs[o].freq(freq);
  }
}void setup() {
  // put your setup code here, to run once:

}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.print(analogRead(A0));
  delay(1);
  Serial.print(',');
  Serial.print(analogRead(A1));
  delay(1);
  Serial.print(',');
  Serial.print(analogRead(A2));
  delay(1);
  Serial.print(',');
}let serial;
let oscs = [];

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort();
  serial.open('/dev/cu.usmodem1411');
  serial.on("data", processData);
  
  for (let o = 0; o < NUM_SENSORS, o++) {
  	let osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(440);
    osc.amp(0.1);
    psc.start();
    pscs.push(osc);
  }
}

function draw() {
  background(220);
}

function processData() {
	let inByte = serial.read();
  if(!inString) return;
  console.log(inString);
  let data = inStringsplit(,);
  console.log(data);
  for (let o = 0; o < oscs.lenth, o++) {
  	let freq = map(parseInt(data[o]), 400, 500, 110, 880)
    oscs[o].freq(freq);
  }
}let serial;

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort();
  serial.open('/dev/cu.usmodem1411');
  serial.on("data", processData);
}

function draw() {
  background(220);
}

function processData() {
	let inByte = serial.read();
  if(!inString) return;
  console.log(inString);
}var serial; // variable to hold an instance of the serialport library
var data = 0;		//

function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort();  // make a new instance of  serialport library
  serial.on('data', processData);// callback for new data coming in
	serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background('blue');
  fill(255);
  strokeWeight(0);
  text(data, 20, 20);
	
  
  
  // Variable controlling face
  var v = map(data, 10, 330, 0, width);
	ellipse(v, height/2, 20, 20);
  
  fill(255, 0, 0);
  strokeWeight(10);
  noFill();
  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);

  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}

function processData() {
	var inString = serial.readLine();
	if (!inString) return;
	data = inString.trim();
}
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
} 

function draw() { 
  background(127, 0, 127);
  
  var v = mouseX; 

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  
  v+=random(-5, 5);
  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

}
let txt;
let tokens;

function preload() {
	txt = loadStrings('joke.txt');
  console.log(txt);
}

function setup() {
  createCanvas(400, 400);
  tokens = splitTokens(txt[0]);
  console.log(tokens);
}

function draw() {
  background(220);

}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}function setup() {
  // createCanvas(400, 400);
}

function draw() {
  // background(255);
}let boobs = [];
let graphics = [];

function preload() {
  for(let i = 0; i < 3; i++) {
  	graphics[i] = loadImage('graphics/space' + i + '.png');
  }
}


function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let graphic = random(graphics);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed, graphic);
  boobs.push(b);

}

function draw() {
  background(255);
	for(let i = 0; i < boobs.length; i++) {
    // boobs[i].bounce();
    boobs[i].render();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed, img) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.graphic = img;
  }
  
//   bounce() {
//     // xspeed
//     if(this.x > width || this.x < 0) {
//        this.xspeed = this.xspeed * -1;
//     }
//     this.x = this.x + this.xspeed;
    
//     // yspeed
//     if(this.y > height || this.y < 0) {
//        this.yspeed = this.yspeed * -1;
//     }
//     this.y = this.y + this.yspeed;
//   }
  
  render() {
    image(this.graphic, this.x, this.y, this.r*2, this.r*2);
  }
}let boobs = [];
let graphics = [];

function preload() {
  for(let i = 0; i < 2; i++) {
  	graphics[i] = loadImage('graphics/img' + i + '.png');
  }
}


function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let graphic = random(graphics);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed, graphic);
  boobs.push(b);

}

function draw() {
  background(255);
	for(let i = 0; i < boobs.length; i++) {
    // boobs[i].bounce();
    boobs[i].render();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed, img) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.graphic = img;
  }
  
//   bounce() {
//     // xspeed
//     if(this.x > width || this.x < 0) {
//        this.xspeed = this.xspeed * -1;
//     }
//     this.x = this.x + this.xspeed;
    
//     // yspeed
//     if(this.y > height || this.y < 0) {
//        this.yspeed = this.yspeed * -1;
//     }
//     this.y = this.y + this.yspeed;
//   }
  
  render() {
    image(this.graphic, this.x, this.y, this.r, this.r);
  }
}let boobs = [];
let graphics = [];

function preload() {
  for(let i = 0; i < 2; i++) {
  	graphics[i] = loadImage('graphics/space' + i + '.png');
  }
}


function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let graphic = random(graphics);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed, graphic);
  boobs.push(b);

}

function draw() {
  background(255);
	for(let i = 0; i < boobs.length; i++) {
    // boobs[i].bounce();
    boobs[i].render();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed, img) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.graphic = img;
  }
  
//   bounce() {
//     // xspeed
//     if(this.x > width || this.x < 0) {
//        this.xspeed = this.xspeed * -1;
//     }
//     this.x = this.x + this.xspeed;
    
//     // yspeed
//     if(this.y > height || this.y < 0) {
//        this.yspeed = this.yspeed * -1;
//     }
//     this.y = this.y + this.yspeed;
//   }
  
  render() {
    image(this.graphic, this.x, this.y, this.r, this.r);
  }
}let boobs = [];
let graphics = [];
// let palmtree;

function preload() {
  // palmtree = loadImage('graphics/palmtree.png');
  for(let i = 0; i < 2; i++) {
  	graphics[i] = loadImage('graphics/space' + i + '.png');
  }
}


function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed);
  boobs.push(b);

}

function draw() {
  background(255);
	for(let i = 0; i < boobs.length; i++) {
    boobs[i].bounce();
    boobs[i].render();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  render() {
    image(graphics[0], this.x, this.y, this.r, this.r);
  }
}let boobs = [];
let palmtree;

function preload() {
  palmtree = loadImage('graphics/palmtree.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed);
  boobs.push(b);

}

function draw() {
  background(255);
	for(let i = 0; i < boobs.length; i++) {
    boobs[i].bounce();
    boobs[i].render();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  render() {
    image(palmtree, this.x, this.y, this.r, this.r);
  }
}let boobs = [];
let palmtree;

function preload() {
  palmtree = loadImage('palmtree.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed);
  boobs.push(b);

}

function draw() {
  background(255);
	for(let i = 0; i < boobs.length; i++) {
    boobs[i].bounce();
    boobs[i].render();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  render() {
    image(palmtree, this.x, this.y, this.r, this.r);
  }
}let boobs = [];
let palmtree;

function preload() {
  palmtree = loadImage('palmtree.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed);
  boobs.push(b);

}

function draw() {
  background(255);
	for(let i = 0; i < boobs.length; i++) {
    boobs[i].bounce();
    boobs[i].shape();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  shape() {
    image(palmtree, this.x, this.y);
		// fill(255);
		// textSize(12);
		// text('(.) (.)', this.x, this.y);
  }
}// function Bubble(x, y) {
// 	this.x = x;
//   this.y = y;
  
//   this.display = function() {
//   	stroke(255);
//     fill(255, 100);
//     ellipse(this.x, this.y, 31, 31);
//   }
  
//   this.update = function() {
//   	this.x = this.x + random(-1, 1);
//     this.y = this.y + random(-1, 1);
//   }
// }// function preload() {
// }


let boobs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed);
  boobs.push(b);

}

function draw() {
  background(0);
	for(let i = 0; i < boobs.length; i++) {
    boobs[i].bounce();
    boobs[i].shape();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  shape() {
    fill(255);
    textSize(12);
		text('(.) (.)', this.x, this.y);
  }
}function preload() {
  font = loadFont('assets/Inconsolata.otf');
}

let boobs = [];

function setup(){
  createCanvas(400, 400);
	for(let i = 0; i < 100; i++) {
    boobs.push(new Boob(random(width), random(height), random(-5, 5), random(-5, 5)));
	}
}

function draw(){
	for(let b in boobs) {
    boobs[b].run();
    
    if(boobs[b].soClose(mouseX, mouseY)) {
    	boobs.splice(b, 1);
    }
  }
}function preload() {
  font = loadFont('assets/Inconsolata.otf');
}


let boobs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed);
  boobs.push(b);

}

function draw() {
  background(0);
	for(let i = 0; i < boobs.length; i++) {
    boobs[i].bounce();
    boobs[i].shape();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  shape() {
    fill(255);
    textSize(12);
		text('(.) (.)', this.x, this.y);
  }
}function preload() {
  font = loadFont('assets/Inconsolata.otf');
}


let boobs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed);
  boobs.push(b);

}

function draw() {
  background(0);
	for(let i = 0; i < boobs.length; i++) {
    boobs[i].bounce();
    boobs[i].shape();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  shape() {
    fill(255);
    textSize(12);
		// text('(.) (.)', this.x, this.y);
  	text('     /+                                   -+`           -+.                                  `+-    ', this.x, this.y);
  	text('     yM`                                  yM`           /M/                                  /M/    ', this.x, this.y + 10);
  	text('     :M+                                 `Nh            `Nh                                  hN`    ', this.x, this.y + 20);
  	text('      hN.                                sN-             +M/                                /M+     ', this.x, this.y + 30);
  	text('      .md.             `-.              oN/               yN:              --              :Ny      ', this.x, this.y + 40);
  	text('       .hm:            mNN/           .yN/                 oNo            sNNs            oNo       ', this.x, this.y + 50);
  	text('         +mh-          :o+`         `oNy.                   :dd/          .oo.          /dd:        ', this.x, this.y + 60);
  	text('          `omd+.                  :smy-                       /hmo-                  -omh/         ', this.x, this.y + 70);
  	text('             :sdds/-`       `.:ohmh+`                           .odmy+:.        .:+ymdo.            ', this.x, this.y + 80);
  	text('                .:oydddddddddhs+-                                  `:+shddddddddhs+:`               ', this.x, this.y + 90);    
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  let sum = add(1, 1);
  text(sum, 50, 30);
}

function add(a, b) {
	return a + b;
  console.log(a + b);
}
const CRYSTAL_SIZE = 500;
const SIDES = 313;
let PALETTE = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  curves();
}

function curves() {
	noFill();
  push();
  	translate(width/2, height/2);
  	// ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
	const angle = 360/SIDES;
  for(let i = 0; i < SIDES; i++) {
    bezier(0, i, i + 31, i, 31, 310, i, height);
    rotate(angle);
  }
  pop();
}const CRYSTAL_SIZE = 500;
const SIDES = 6;
let PALETTE = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  curves();
}

function curves() {
	noFill();
  push();
  	translate(width/2, height/2);
  	ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
	const angle = 360/SIDES;
  for(let i = 0; i < SIDES; i++) {
    line(0, 0, 0, CRYSTAL_SIZE / 2)
    rotate(angle);
  }
  pop();
}// curve
// https://programmingdesignsystems.com/shape/custom-shapes/index.html

function setup()
{
  createCanvas(600, 500);
  background(240);

  let w = width * 0.3;
  let h = height * 0.5;

  stroke(0);
  strokeWeight(0.5);
  noFill();
  translate(width/2, height/2);
  beginShape();
    vertex(-w, 0)
    bezierVertex(-w, -h, w, h, w, 0);
  endShape();

  noLoop();
}function preload() {
  font = loadFont('assets/Inconsolata.otf');
}


let boobs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed);
  boobs.push(b);

}

function draw() {
  background(0);
	for(let i = 0; i < boobs.length; i++) {
    boobs[i].bounce();
    boobs[i].shape();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  shape() {
    fill(255);
    textSize(12);
		// text('(.) (.)', this.x, this.y);
  	text('     /+                                   -+`           -+.                                  `+-    ', this.x, this.y);
  	text('     yM`                                  yM`           /M/                                  /M/    ', this.x, this.y + 10);
  	text('     :M+                                 `Nh            `Nh                                  hN`    ', this.x, this.y + 20);
  	text('      hN.                                sN-             +M/                                /M+     ', this.x, this.y + 30);
  	text('      .md.             `-.              oN/               yN:              --              :Ny      ', this.x, this.y + 40);
  	text('       .hm:            mNN/           .yN/                 oNo            sNNs            oNo       ', this.x, this.y + 50);
  	text('         +mh-          :o+`         `oNy.                   :dd/          .oo.          /dd:        ', this.x, this.y + 60);
  	text('          `omd+.                  :smy-                       /hmo-                  -omh/         ', this.x, this.y + 70);
  	text('             :sdds/-`       `.:ohmh+`                           .odmy+:.        .:+ymdo.            ', this.x, this.y + 80);
  	text('                .:oydddddddddhs+-                                  `:+shddddddddhs+:`               ', this.x, this.y + 90);    
  }
}const LINE_SIZE = 500;
const SIDES = 31;

function setup() {
  createCanvas(600, 600);
  stroke(255,0,0);
	strokeWeight(0.5);
  noFill();
  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(0);
  // translate(width/2, height/2);
  push();
  translate(width/2, height/2);
  ellipse(0, 0, LINE_SIZE, LINE_SIZE);
  //curve
  for (let i = 0; i < 313; i += 31) {
    bezier(0, i, i + 3, i, 31, 31, i, height/2);
    // rotate(360/SIDES);
  }
  pop();
}
function setup() {
  createCanvas(600, 600);
  stroke(255,0,0);
	strokeWeight(0.5);
  noFill();
}

function draw() {
  background(0);
  for (let i = 0; i < 313; i += 31) {
    bezier(0, i, i + 31, i, 31, 310, i, height);
  }
}
function setup() {
  createCanvas(600, 600);
  stroke(255,0,0);
	strokeWeight(0.5);
  noFill();
}

function draw() {
  background(0);
  for (var i = 0; i < 313; i += 31) {
    bezier(0, i, i, width + 31, 31/i, 310, width, i);
  }
}
function setup() {
  createCanvas(600, 600);
  stroke(255,0,0);
	strokeWeight(1);
  noFill();
}

function draw() {
  background(0);
  for (var i = 0; i < 3131; i += 31) {
    bezier(mouseX, mouseY, i, width/31 + 31, 31/i, 310, width, i);
  }
}
let balls = [];

function setup() {
  createCanvas(400, 400);
  // loop to create 100 balls
  for (let i = 0; i < 100; i++) {
    // new ball - one way to do it
    // balls[i] = new Ball(random(width), random(height), random(-5, 5), random(-5, 5));
    // new ball - another way to do it
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}

function draw() {
  background(220);
  // make 100 by doing this
  // for(let i = 0; i < balls.length; i++) {
  // 	balls[i].run();
  // }
  // or by doing this
  for (let b in balls) {
    balls[b].run();
    // if mouse over the ball then delete
    // remove ball that has been moused over
    if (balls[b].isNear(mouseX, mouseY)) {
      balls.splice(b, 1);
    }
  }
}function preload() {
  font = loadFont('assets/Inconsolata.otf');
}


let boobs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 3);
  let yspeed = random (1, 6);
  let b = new Boob(mouseX, mouseY, r, xspeed, yspeed);
  boobs.push(b);

}

function draw() {
  background(0);
	for(let i = 0; i < boobs.length; i++) {
    boobs[i].bounce();
    boobs[i].shape();
  }
}

class Boob {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  shape() {
    fill(255);
    textSize(12);
		// text('(.) (.)', this.x, this.y);
  	text('     /+                                   -+`           -+.                                  `+-    ', this.x, this.y);
  	text('     yM`                                  yM`           /M/                                  /M/    ', this.x, this.y + 10);
  	text('     :M+                                 `Nh            `Nh                                  hN`    ', this.x, this.y + 20);
  	text('      hN.                                sN-             +M/                                /M+     ', this.x, this.y + 30);
  	text('      .md.             `-.              oN/               yN:              --              :Ny      ', this.x, this.y + 40);
  	text('       .hm:            mNN/           .yN/                 oNo            sNNs            oNo       ', this.x, this.y + 50);
  	text('         +mh-          :o+`         `oNy.                   :dd/          .oo.          /dd:        ', this.x, this.y + 60);
  	text('          `omd+.                  :smy-                       /hmo-                  -omh/         ', this.x, this.y + 70);
  	text('             :sdds/-`       `.:ohmh+`                           .odmy+:.        .:+ymdo.            ', this.x, this.y + 80);
  	text('                .:oydddddddddhs+-                                  `:+shddddddddhs+:`               ', this.x, this.y + 90);    
  }
}let balls = [];

function setup() {
  createCanvas(600, 600);
}

function mousePressed() {
  let r = random(1, 100);
  let xspeed = random (1, 5);
  let yspeed = random (1, 10);
  let b = new Ball(mouseX, mouseY, r, xspeed, yspeed);
  balls.push(b);

}

function draw() {
  background(255);
	for(let i = 0; i < balls.length; i++) {
    balls[i].bounce();
    balls[i].shape();
  }
}

class Ball {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  shape() {
    stroke(255, 169, 214);
  	ellipse(this.x, this.y, this.r*2);
    ellipse(this.x + 50, this.y, this.r*2);
    stroke(255, 169, 214);
    strokeWeight(this.x/25);
    point(this.x, this.y);
    point(this.x + 50, this.y);
    text('v', this.x, this.y + 100);
  }
}let balls = [];

function setup() {
  createCanvas(600, 600);
  // for(let i = 0; i < 12; i++) {
    // //example 1
    // let x = 0 + 50 * i;
    // balls[i] = new Ball(x, 20, 25, 5, 3);
    
    // // example 2
    // let x = random(width);
    // let y = random(height);
    // let r = random();
    // balls[i] = new Ball(x, y, r, 5, 3);
  // }
}

function mousePressed() {
  let r = random(1, 55);
  let xspeed = random (1, 10);
  let yspeed = random (1, 10);
  let b = new Ball(mouseX, mouseY, r, xspeed, yspeed);
  balls.push(b);

}

function draw() {
  background(20);
	for(let i = 0; i < balls.length; i++) {
    balls[i].bounce();
    balls[i].shape();
  }
}

class Ball {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  shape() {
    noStroke();
    fill('red');
  	ellipse(this.x, this.y, this.r*2);
  }
}let balls = [];

function setup() {
  createCanvas(600, 600);
  for(let i = 0; i < 12; i++) {
    let x = 0 + 50 * i;
    balls[i] = new Ball(x, 20, 25, 5, 3);
    // let x = random(width);
    // let y = random(height);
    // let r = random();
    // balls[i] = new Ball(x, y, r, 5, 3);
  }
}

function draw() {
  background(220);
	for(let i = 0; i < balls.length; i++) {
    balls[i].bounce();
    balls[i].shape();
  }
}

class Ball {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  shape() {
    noStroke();
    fill('red');
  	ellipse(this.x, this.y, this.r);
  }
}// Reference Coding Train 6.2 & 6.3

function setup() {
  createCanvas(400, 400);
  ball1 = new Ball(width/4, height/4, 50, 10, 50);
  ball2 = new Ball(width/2, height/2, 100, 10, 5);
}

function draw() {
  background(220);
  ball1.bounce();
  ball1.shape();
  ball2.bounce();
  ball2.shape();
}

class Ball {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    // xspeed
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    // yspeed
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  shape() {
    noStroke();
    fill('red');
  	ellipse(this.x, this.y, this.r);
  }
}// Bounce ball to all 4 courners??
// Reference Coding Train 6.2 & 6.3

function setup() {
  createCanvas(400, 400);
  ball = new Ball(width/2, height/2, 100, 10, 5);
}

function draw() {
  background(220);
  ball.bounce();
  ball.shape();
}

class Ball {
	constructor(x, y, r, xspeed, yspeed) {
  	this.x = x;
    this.y = y;
    this.r = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  bounce() {
    if(this.x > width || this.x < 0) {
       this.xspeed = this.xspeed * -1;
    }
    this.x = this.x + this.xspeed;
    
    if(this.y > height || this.y < 0) {
       this.yspeed = this.yspeed * -1;
    }
    this.y = this.y + this.yspeed;
  }
  
  shape() {
    noStroke();
    fill('red');
  	ellipse(this.x, this.y, this.r);
  }
}// Bounce ball to all 4 courners??
// Reference Coding Train 6.2 & 6.3

function setup() {
  createCanvas(400, 400);
  ball = new Ball(width/2, height/2, 100, 10);
}

function draw() {
  background(220);
  ball.bounce();
  ball.shape();
}

class Ball {
	constructor(x, y, r, speed) {
  	this.x = x;
    this.y = y;
    this.r = y;
    this.speed = speed;
  }
  
  bounce() {
    if(this.x > width || this.x < 0) {
       this.speed = this.speed * -1;
    }
    this.x = this.x + this.speed;
  }
  
  shape() {
    noStroke();
    fill('red');
  	ellipse(this.x, this.y, this.r);
  }
}/*
 * @name Bounce
 * @frame 720,400
 * @description When the shape hits the edge of the window, it reverses its direction.
 */

var rad = 60; // Width of the shape
var xpos, ypos; // Starting position of shape

var xspeed = 2.8; // Speed of the shape
var yspeed = 2.2; // Speed of the shape

var xdirection = 1; // Left or Right
var ydirection = 1; // Top to Bottom

function setup() {
  createCanvas(720, 400);
  noStroke();
  frameRate(30);
  ellipseMode(RADIUS);
  // Set the starting position of the shape
  xpos = width / 2;
  ypos = height / 2;
}

function draw() {
  background(102);

  // Update the position of the shape
  xpos = xpos + xspeed * xdirection;
  ypos = ypos + yspeed * ydirection;

  // Test to see if the shape exceeds the boundaries of the screen
  // If it does, reverse its direction by multiplying by -1
  if (xpos > width - rad || xpos < rad) {
    xdirection *= -1;
  }
  if (ypos > height - rad || ypos < rad) {
    ydirection *= -1;
  }

  // Draw the shape
  ellipse(xpos, ypos, rad, rad);
}
// Bounce ball to all 4 courners??
// Reference Coding Train 6.2 & 6.3
// Bounce - https://editor.p5js.org/p5/sketches/HJ1e-NxyXOX

function setup() {
  createCanvas(400, 400);
  ball = new Ball(width/2, height/2, 100);
}

function draw() {
  background(220);
  ball.bounce();
  ball.shape();
}

class Ball {
	constructor(x, y, r) {
  	this.x = x;
    this.y = y;
    this.r = y;
  }
  
  bounce() {
  	this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  
  shape() {
    noStroke();
    fill('red');
  	ellipse(this.x, this.y, this.r);
  }
}// hoover change color??

let numColumns;
let numRows;
let colWidth;
let rowHeight;

function setup() {
	createCanvas(400, 400);
  numColumns = 10;
  numRows = 5;
  colWidth = width / numColumns;
  rowHeight = height / numRows;
}

function draw() {
	background(255);
  for(let col = 0; col < numColumns; col++) {
  	for(let row = 0; row  < numRows; row++) {
    	let x = col * colWidth;
      let y = row * rowHeight;
      fill('red');
      rect(x, y, colWidth, rowHeight);
    }
  }
}// How do I create speed and direction?

let ball = {
  x: 100,
  y: 100,
  r:10
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  createBall();
}

function createBall(x, y, r) {
  noStroke();
  fill('red');
  ellipse(ball.x, ball.y, ball.r);
}

function bounceBall(){
  
}let col = 0; 
let row = 0; 
let d1 = width/5;
let d2 = height/10;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for(col = 0; col <= width; col += d1){
  	for(row = 5; row <= height; row += d2){
      rect(col, row, d1, d2);
    }
  }

}
let x, y;
let xspeed = 10;
let yspeed;

function setup() {
  createCanvas(400, 400);
  // Initialize the ball at the left edge and middle height
  x = 0;
}

function draw() {
  background(220);
  
  xspeed = bounce(x, 0, width, xspeed);
  yspeed = bounce(y,0, height, yspeed);
  
  //Draw the ball
  ellipse(x, y, 50, 50);
}

// bounce
function bounce(state, low, high, speed){
  if(state > high || state < low) xspeed *= -1;
  return speed;
}
let numCols;
let numRows;
let colW;
let rowH;

function setup() {
  createCanvas(400, 400);
  numCols = 30;
	numRows = numCols;
	colW = width/numCols;
	rowH = height/numRows;
}

function draw() {
  background(255);
  noStroke();
  for(let col = 0; col < numCols; col++){
    for(let row = 0; row < numRows; row++){
      // if((col % 2 == 1 && row %2 == 1) || (col % 2 == 0 && row %2 == 0)) fill('black');
      // else fill('white');
      let x = col * colW;
      let y = row * rowH;
      let d = dist(mouseX, mouseY, x, y);
      // d = map(d, 0, dist(0, 0, width, height), 255, 00);
      fill(d);
      rect(x, y, colW, rowH);
    }
  }
}let dragging = false;
let rollover = false;
// circle center
let cx, cy, cr;
// ellipse
let x, y, r;
// line
let lx, ly, angle, lcol;
let offsetX, offsetY;

function setup() {
  createCanvas(600, 600);
  // circle center
  cx = width / 2;
  cy = height / 2;
  cr = 25;
  r = 0;
  offsetX = 0;
  offsetY = 0;
  // line color
  lcol = 255;
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(50);
	rollover
  if (dist(mouseX, mouseY, cx, cy) < cr) {
    rollover = true;
  } else {
    rollover = false;
  }

  // creates ellpse
  for (x = 0; x <= width; x += width / 20) {
    for (y = 0; y <= height; y += height / 20) {
      stroke(255);
      strokeWeight(1);
      fill(255);
      // changes size of ellipse according to mouseX, mouseY
      ellipse(x, y, r);
    }
  }
  strokeWeight(0.25);
  // creates line
  for (lx = -width; lx <= width * 2; lx += width / 20) {
    for (ly = -height; ly <= height * 2; ly += height / 20) {
      push();
      translate(width/2, height/2);
      rotate(angle);
      stroke(lcol);
      line(lx, ly + width / 20, lx + width / 20, ly);
      pop();
    }
  }
	// dragging
  if (dragging) {
    // constrain (n, low, high) ability to drag
    cx = constrain(mouseX + offsetX, width / 2 - cr * 4, width / 2 + cr * 4);
    cy = constrain(mouseY + offsetY, height / 2 - cr * 4, height / 2 + cr * 4);
    r = constrain(map(mouseX, width / 2 - cr * 5, width / 2 + cr * 5, 0, width/15), 0, width/15);
    angle = constrain(map(mouseY, height / 2 - cr * 5, height / 2 + cr * 5, 0, 90), 0, 90);
    lcol = map(mouseX, width / 2 - cr * 5, width / 2 + cr * 5, 255, 50);
  }
  stroke(180, 50, 80);
  strokeWeight(3);
  fill(180, 50, 80, 25);
  rect(width / 2, height / 2, cr * 10, cr * 10);

  noStroke();
  // color dragging
  if (dragging) {
    fill(225, 100, 150);
  // color rollover
  } else if (rollover) {
    fill(225, 50, 100);
  } else {
  // color other
    fill(180, 50, 80);
  }
  ellipse(cx, cy, cr * 2);
}

function mousePressed() {
  // dist - calculates distance between 2 points
  if (dist(mouseX, mouseY, cx, cy) < cr) {
    dragging = true;
    offsetX = cx - mouseX;
    offsetY = cy - mouseY;
  }
}

function mouseReleased() {
  dragging = false;
}// How can I turn off first panel?

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);  
  if(mouseX < width/3){
    fill("red");
    // left rect
    rect(0, 0, width/3, height);
  } else if(mouseX < 2*width/3) {
      // middle rect
  	rect(width/3, 0, width/3, height);
  } else {
    // right rect
  	rect(2*width/3, 0, width/3, height);
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // draw ball on right side of the canvas
  // only allow ball to move until it has reached the max
  //		width || x < 0
  // create variable offest to move the ball accoss the canvas
  //		by incrementing it's position
  // when ball hits the edge of canvas multiply variabale 
  // 		offset *-1 to change direction
  
}// https://github.com/ITPNYU/ICM-2015/blob/master/03_interaction/GUI/slider/sketch.js
// Simple Slider
// Daniel Shiffman <http://www.shiffman.net>

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Rectangle variables for slider
var x = 100;
var y = 25;
var w = 10;
var h = 50;
// Start and end of slider
var sliderStart = 100;
var sliderEnd = 400;
// Offset for dragging slider
var offsetX = 0;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);


  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd-w);

  // Draw a line for slider
  stroke(0);
  line(sliderStart, y+h/2, sliderEnd, y+h/2);

  stroke(0);
  // Fill according to state
  if (dragging) {
    fill (50);
  } else {
    fill(175);
  }
  // Draw rectangle for slider
  rect(x, y, w, h);

  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  var b = map(x,sliderStart,sliderEnd-w,0,255);
  fill(b);
  rect(sliderStart, 100, sliderEnd-sliderStart, 150);
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
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
  x = mouseX;
  y = mouseY;
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
    stroke(0);
    strokeWeight(10);
  } else if (rollover) {
    stroke(100);
    strokeWeight(10);
  } else {
    stroke(200)
    strokeWeight(10);
  }
  point(mouseX, mouseY);
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
}let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  
  for(x = 0; x < width + windowWidth; x+= 30) {
    for(y = 0; y < height + windowHeight; y += 30){
      strokeWeight(3);
      // changes size of ellipse according to mouseX, mouseY
    	ellipse(x, y, mouseX, mouseY)
    }
  }
  
  // point - using value of mouseX, mouseY
  strokeWeight(20);
  point(mouseX, mouseY);
  // console.log(mouseX, mouseY);
}let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  
  for(x = 0; x < width + windowWidth; x+= 30) {
    for(y = 0; y < height + windowHeight; y += 30){
      // noFill();
      strokeWeight(3);
      // changes size of ellipse according to mouseX, mouseY
    	ellipse(x, y, mouseX, mouseY)
    }
  }
  
  // point - using value of mouseX, mouseY
  strokeWeight(20);
  point(mouseX, mouseY);
  // console.log(mouseX, mouseY);
}let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  
  for(x = 0; x < width; x+= 30) {
    for(y = 0; y < height; y += 30){
      strokeWeight(3);
      // changes size of ellipse according to mouseX, mouseY
    	ellipse(x, y, mouseX, mouseY)
    }
  }
  
  // point - using value of mouseX, mouseY
  strokeWeight(20);
  point(mouseX, mouseY);
  // console.log(mouseX, mouseY);
}

// fullscreen - how do i adjust the canvas size when in fullscreen
// function mousePressed() {
//   if (mouseX > 0 && mouseY) {
//     var fs = fullscreen();
//     fullscreen(!fs); 
//   }
// }let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  
  for(x = 0; x < width; x+= 30) {
    for(y = 0; y < height; y += 30){
      strokeWeight(3);
      // changes size of ellipse according to mouseX, mouseY
    	ellipse(x, y, mouseX, mouseY)
    }
  }
  
  // point - using value of mouseX, mouseY
  strokeWeight(20);
  point(mouseX, mouseY);
  console.log(mouseX, mouseY);
}

// fullscreen - how do i adjust the canvas size when in fullscreen
// function mousePressed() {
//   if (mouseX > 0 && mouseY) {
//     var fs = fullscreen();
//     fullscreen(!fs); 
//   }
// }function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  strokeWeight(20);
  point(mouseX, mouseY);
  console.log(mouseX, mouseY);
 let x = 0;
let y = 0;
let r = 10;

offset = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for(let x = 0; x < width; x +=30){
    ellipse(x, y + offset, r);
  }
  
  if(y > height || y < 0) {
  	offset = offset * -1;
    console.log(offset);
  }
  
  offset ++;
}// 10print.org
// Static all in a loop

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);
  for (var y = 0; y < height; y += 20) {
    for (var x = 0; x < width; x += 20) {
      if (random(1) > 0.5) {
        line(x, y, x + 20, y + 20);
      } else {
        line(x, y + 20, x + 20, y);
      }
    }
  }
  noLoop();
}var x = 0;
var y = 0;

function setup() {
  createCanvas(640, 360);
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
}// 10print.org
// Animated version of 10 print.

var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  stroke(random(255), random(255), random(255));
  strokeWeight(4);
  if (random(10) > 0.1) {
    rect(x, y, x+10, y+10);
  } 
  else {
    line(x, y+10, x+10, y);
  }

  // prints on y axis
  y += 10;
  
  // draws on x axis
  if (x > width) {
    x = 0;
    y = 0;
  }

  // draws on y axis
  if (y > height) {
    // background refreshing to white every time it's printing
    // background(255);
    x += 10;
    y  = 0;
  }
}// 10print.org
// Animated version of 10 print.

var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  strokeWeight(5);
  if (random(10) > 0.1) {
    rect(x, y, x+10, y+10);
  } 
  else {
    line(x, y+10, x+10, y);
  }

  // prints on y axis
  y += 10;
  
  // draws on x axis
  if (x > width) {
    x = 0;
    y = 0;
  }

  // draws on y axis
  if (y > height) {
    // background refreshing to white every time it's printing
    // background(255);
    x += 10;
    y  = 0;
  }
}

// function mousePressed(){
//   background(random(255), random(255), random(255));
// }// 10print.org
// Ported from the book

var w = 16;
var h = 16;
var index = 0;

function setup() {
  createCanvas(640, 384);
  background('#0000ff');
  strokeWeight(3);
  stroke(224);
}

function draw() {
  // pattern
  var x1 = w*index;
  var x2 = x1 + w;
  var y1 = h*23;
  var y2 = h*24;
  if (random(2) < 1) {
    line(x2, y1, x1, y2);
  } 
  else {
    line(x1, y1, x2, y2);
  }
  
  // renders line horizontally
  index = index + 1;
  
  // pushes drawing up
  if (index == width/w) {
    // get() - https://p5js.org/reference/#/p5/get
    var p = get(0, h, width, h*23);
    background('#0000ff');
    // set() - https://p5js.org/reference/#/p5/set
    set(0, 0, p);
    index = 0;
  }
}// 10print.org
// Animated version of 10 print.

var x = 0;
var y = 0;

function setup() {
  createCanvas(640, 360);
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
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  strokeWeight(4);
  stroke(0);
  
  for(let x = 0; x <= mouseX; x += 50) {
  	for(let y = 0; y <= mouseY; y += 50) {
    	fill(random(255), random(255), random(255));
      ellipse(x, y, 15, 15);
    }
  }
}let offset = 0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(243, 149, 100);
  strokeWeight(4);
  stroke(255);
  
  // for - vertical lines
  for (let x = 0; x<= width; x = x + 5) {
    // stroke(10);
  	stroke(random(255), random(255), random(255));
    line(x + offset, 0, x, 400);
  }
  
  // for
    for (let x = 0; x<= width; x = x + 15) {
  	// stroke(random(255), random(255), random(255));
    line(0 + offset, x, x, 400);
  }
  
  offset = offset + 1;
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(243, 149, 100);
  strokeWeight(4);
  stroke(255);
  
  // while
  // let x = 0;
  // while(x <= width) {
  //   noStroke();
  // 	fill(5, 157, 192);
  //   ellipse(x, 20, 85, 75);
  //   x = x + 50;
  // }
  
  // for
  for (let x = 0; x<= width; x = x + 5) {
    // stroke(10);
  	stroke(random(255), random(255), random(255));
    line(x, 0, x, 400);
  }
  
  // for
    for (let x = 0; x<= width; x = x + 15) {
  	// stroke(random(255), random(255), random(255));
    line(0, x, x, 400);
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(243, 149, 100);
  strokeWeight(4);
  stroke(255);
  
  // while
  // let x = 0;
  // while(x <= width) {
  //   noStroke();
  // 	fill(5, 157, 192);
  //   ellipse(x, 20, 85, 75);
  //   x = x + 50;
  // }
  
  // for
  for (let x = 0; x<= width; x = x + 5) {
    stroke(10);
  	stroke(246, 198, 68);
    line(x, 0, x, 400);
  }
  
  // for
    for (let x = 0; x<= width; x = x + 15) {
  	stroke(5, 157, 192);
    line(0, x, x, 400);
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(243, 149, 100);
  strokeWeight(4);
  stroke(255);
  
  // while
  let x = 0;
  while(x <= width) {
    noStroke();
  	fill(5, 157, 192);
    ellipse(x, 100, 25, 25);
    x = x + 50;
  }
  
  // for
  for (let x = 0; x<= width; x = x + 50) {
    noStroke();
  	fill(246, 198, 68);
    ellipse(x, 300, 25, 25);
  }
  
}

let on = false;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(246, 198, 68);
  stroke(255);
  strokeWeight(4);
  noFill();
  
  // shape change
  if(on){
    background(5, 157, 192);
  }
}


function mousePressed(){
  // background change
  if(mouseX > 150 && mouseX < 300) {
 		on = !on; 
  }
}
let x = 0;
let speed = 3;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(x, 200, 100, 100);
  
  if(x > width || x <0){
  	speed = speed * -1;
  }
  
  x = x + speed;
}function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(246, 198, 68);
  stroke(255);
  strokeWeight(4);
  noFill();
  
  // background change
  // if(mouseX > 150 && mouseX < 300) {
  //  background(5, 157, 192);
  // 	fill(246, 198, 68);
  // }
  
  // shape change
  if(mouseX > 150 && mouseX < 300){
    fill(5, 157, 192);
    rect(200, 200, 200, 200);
    fill(246, 198, 68);
    ellipse(width/2, height/2, 100, 100);
  }
  
  ellipse(width/2, height/2, 100, 100);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
    for (x = 0; x <= width; x += 50) {
    fill(255, 0, 200);
    ellipse(x, 300, 25, 25);
  }

}
// Inspired by - https://editor.p5js.org/kjhollen/sketches/S1bVzeF8Z
let gif_createImg1, gif_createImg2;

function draw() {
  gif_createImg2 = createImg("tecate.gif");
  gif_createImg2.position(mouseX, mouseY);
}

function mousePressed() {
  gif_createImg1 = createImg("agua-square.gif");
	gif_createImg1.position(mouseX, mouseY);
}
// GIF Reference  - https://editor.p5js.org/kjhollen/sketches/S1bVzeF8Z

let gif_createBorder;

function draw() {
  gif_createBorder = createImg("tecate.gif");
  gif_createBorder.position(mouseX, mouseY);
}
// Loading GIFS Example - https://editor.p5js.org/kjhollen/sketches/S1bVzeF8Z
let gif_loadImg, gif_createImg, gif_createImg2;

function setup() {
  createCanvas(1000, 500);
  background(254, 252, 254);
}

function draw() {
  gif_createImg1 = createImg("agua-square.gif");
  gif_createImg2 = createImg("tecate.gif");
  
  // updates animation frames by using an html
  // img element, positioning it over top of
  // the canvas.
  gif_createImg1.position(mouseX, mouseY);
  
  // Mouse greater than 400 gif appears at 200, 200
  // if(mouseX > 250) {
  //   // gif_createImg.position(200, 200);
  //   gif_createImg2.position(200, 200);
  // }
}


// Example from - https://editor.p5js.org/kjhollen/sketches/S1bVzeF8Z
let gif_loadImg, gif_createImg, gif_createImg2;

function preload() {
  gif_createImg1 = createImg("agua-square.gif");
}

function setup() {
  createCanvas(1000, 500);
  background(254, 252, 254);
}

function draw() {
  
  // updates animation frames by using an html
  // img element, positioning it over top of
  // the canvas.
  // gif_createImg.position(mouseX, mouseY, 100, 100);
  gif_createImg1.position(mouseX, mouseY);
  textSize(20);
	text('XXX', 200, 200);
	fill(0);
  
  // Mouse greater than 400 gif appears at 200, 200
  if(mouseX > 250) {
      gif_createImg2 = createImg("tecate.gif");
    gif_createImg2.position(200, 200);
  }
}


// Example from - https://editor.p5js.org/kjhollen/sketches/S1bVzeF8Z
let x = 0;
let gif_loadImg, gif_createImg;

function preload() {
  // gif_loadImg = loadImage("agua-square.gif");
  gif_createImg = createImg("agua-square.gif");
}

function setup() {
  createCanvas(1000, 500);
  background(254, 252, 254);
}

function draw() {
  // loads only first frame
  // image(gif_loadImg, 50, 50);
  
  // updates animation frames by using an html
  // img element, positioning it over top of
  // the canvas.
  // gif_createImg.position(mouseX, mouseY, 100, 100);
  gif_createImg.position(mouseX, mouseY);
  
  // Mouse greater than 400 gif appears at 200, 200
  if(mouseX > 400) {
    gif_createImg.position(200, 200);
  }
  
}


let r = 0;
let g = 0;
let b = 0;

// Example from - https://editor.p5js.org/kjhollen/sketches/S1bVzeF8Z
var gif_loadImg, gif_createImg;

function preload() {
  // gif_loadImg = loadImage("agua-square.gif");
  gif_createImg = createImg("agua-square.gif");
}

function setup() {
  createCanvas(400, 400);
  background(254, 252, 254);
}

function draw() {
  // loads only first frame
  // image(gif_loadImg, 50, 50);
  
  // updates animation frames by using an html
  // img element, positioning it over top of
  // the canvas.
  gif_createImg.position(mouseX, mouseY);
}

function mousePressed(){
  background(r, g, b);
}
  let x;
	let y;

function setup() { 
  createCanvas(800, 600);
  background(220);
  rectMode(CENTER);
  // // 1A
  // x = width/2;
  // y = height/2;
    rectMode(CENTER);

} 

function draw() {
  // // 1A
  // rect(x, y, 100, 100);
  strokeWeight(3);
	beginShape(POINTS);
	vertex(30, 20);
	vertex(85, 20);
	vertex(85, 75);
	vertex(30, 75);
	endShape();
}// The Coding Train 3.1: Introduction to Conditional Statements
function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(0);
  
  stroke(255);
  strokeWeight(4);
  noFill();
  
  if(mouseX > 100) {
  rect(width/2, height/2, 50, 50);
  }
  
  
  ellipse(width/2, height/2, 50, 50);
}let r = 0;
let g = 0;
let b = 0;

function setup() {
  createCanvas(500, 500);
  background(255);
}

function draw() {
  r = map(mouseX, 0, 500, 0, 255);
  g = map(mouseX, 0, 500, 255, 0);
  b = map(mouseY, 0, 500, 0, 255);
  fill(r, g, b);
  stroke(255);
  rect(mouseX, mouseY, 5, 250);
  
	mouseX = mouseX + 3
}

function mousePressed() {
	background(r, g, b);
}// The Coding Train 2.4: The map() Function

let r = 0;
let g = 0;
let b = 0;

function setup() {
  createCanvas(500, 500);
  background(255);
}

function draw() {
  // color
  r = map(mouseX, 0, 500, 0, 255);
  g = map(mouseX, 0, 500, 255, 0);
  b = map(mouseY, 0, 500, 0, 255);
  fill(r, g, b);
  stroke(255);
  rect(mouseX, mouseY, 15, 250);
  // stroke(r, g, b);
  // line(100, 100, mouseX, mouseY);
}

function mousePressed() {
	background(255);
}// The Coding Train 2.4: The map() Function

let r = 0;
let g = 0;
let b = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  // background
  r = map(mouseX, 0, 500, 0, 255);
  g = map(mouseX, 0, 500, 255, 0);
  b = map(mouseY, 0, 500, 0, 255);
  background(r, g, b);
  // ellipse
  fill(255);
  noStroke();
  // ellipse(mouseX, mouseY, 100, 100);
  textSize(100);
  text("Ã / ã", mouseX, mouseY);
}// The Coding Train 2.3: JavaScript Objects
var circle = {
	x: 0,
  y: 200,
  diameter: 50
};

var r = 5;
var g = 157;
var b = 192;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // background
  background(r, g, b);
  // ellipse
  noStroke();
  fill(192, 192, 100);
  ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
  
  circle.x = circle.x + 1;
  // animated backgound color change
  r = r + 1;
  g = g - 1;
  b = b + 1;
}let x = 0;
let y = 0;

function setup() {
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  // x = x + 1;
  // y = y + 1;
  // ellipse(x, y, 50, 50);
  
  // x = x + 1;
  // y = y - 1;
  // ellipse(x, y, 50, 50);
  
  // changing relationship of movement
  x = x + 2;
  y = y - 1;
  ellipse(x, y, 50, 50);
  
}// center rect same as center of canvas
// width rect as wight/height cancas

let lx, rx, ty, by;
let cx, xy;
let w, h;

function setup() {
  // createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  createCanvas(frameCount, frameCount);
  cx = width/2;
  cy = height/2
  hw = width/20;
  hh = height/20;
  
  lx = cx - hw;
  rx = cx + hw;
  ty = cy - hh;
  by = cy + hh;
  background(220);
  rect(200, 200, 10, 10);
  // TL to TR
  line(lx, ty, rx, ty);
  
  // TR to BR
  line(rx, ty, rx, by);
  
  // BR to BL
  line(rx, by, lx, by);
  
  // BL to TL
  line(lx, by, lx, ty);
}// center rect same as center of canvas
// width rect as wight/height cancas

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  console.log(frameCount);
  createCanvas(frameCount, frameCount);
  background(220);
  rect(200, 200, 10, 10);
  rect(width/2, height/2, width * 0.1, height *0.1);
  // noLoop();
}function setup() {
  createCanvas(400, 400);
  rectMode(CENTER, CENTER);
}

function draw() {
  background(220);
  push();
  translate(200, 200);
  rect(0, 0, 50, 50);
  pop();
  
  push();
  translate(100, 100);
  rect(0, 0, 50, 50);
  pop();
}
// Example from - https://editor.p5js.org/kjhollen/sketches/S1bVzeF8Z
/**
 * demonstrates how to load a GIF image using
 * createImg to create an <img> on the page
 * and to use that to update animation
 * (and illustrates how p5's loadImage loads only
 * one frame otherwise).
 */

var gif_loadImg, gif_createImg;

function preload() {
  // gif_loadImg = loadImage("agua-square.gif");
  gif_createImg = createImg("agua-square.gif");
}

function setup() {
  createCanvas(400, 400);
  background(254, 252, 254);
}

function draw() {
  // loads only first frame
  // image(gif_loadImg, 50, 50);
  
  // updates animation frames by using an html
  // img element, positioning it over top of
  // the canvas.
  gif_createImg.position(mouseX, mouseY, 100, 100);
  
  // eye1 - rectangle
  noStroke();
  fill(234, 196, 16);
  rect(150, 50, 35, 35);
  triangle(280, 100, 320, 100, 310, 50);
}
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0, 255, 254);
  // line
  strokeWeight(40);
  stroke(255,0,23);
  line(0, 0, width, 400);
  //circle
  fill(0, 200, 60);
  noStroke();
  ellipse(width/2, height/2, 300, 225);
  fill(9, 6, 123);
  noStroke();
  rect(width/2 + 110, height/2 - 50, 40, 40);
  
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  noStroke();
  fill(70, 224, 218);
  ellipse(mouseX, mouseY, 150, 150);
}function setup() { 
  createCanvas(400, 400)
} 
function draw() { 
  background(220);

  
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(215, 35, 36);
  // circle
  strokeWeight(4);
  stroke(5,157,192);
  fill(215, 35, 36);
  ellipse(width/2, height/2, width/2, height/2);
  // square
  rect(width/6 + 100, height/6 + 100, width/16 + 50, height/16 + 50)
	// lines
  line(350, 200, 350, 300);
  line(375, 200, 375, 300);
  line(400, 200, 400, 300);
}/**
 * demonstrates how to load a GIF image using
 * createImg to create an <img> on the page
 * and to use that to update animation
 * (and illustrates how p5's loadImage loads only
 * one frame otherwise).
 */

var gif_loadImg, gif_createImg;

function preload() {
  // gif_loadImg = loadImage("agua.gif");
  gif_createImg = createImg("agua.gif");
}

function setup() {
  createCanvas(500, 500);
  background(0);
}

function draw() {
  // loads only first frame
  // image(gif_loadImg, 50, 50);
  
  // updates animation frames by using an html
  // img element, positioning it over top of
  // the canvas.
  image(gif_createImg, );
  gif_createImg.position(0, height/4);
  
  // eye1 - rectangle
  fill(215, 35, 36);
  rect(150, 50, 25, 25);
}
/**
 * demonstrates how to load a GIF image using
 * createImg to create an <img> on the page
 * and to use that to update animation
 * (and illustrates how p5's loadImage loads only
 * one frame otherwise).
 */

var gif_loadImg, gif_createImg;

function preload() {
  gif_loadImg = loadImage("agua.gif");
  gif_createImg = createImg("agua.gif");
}

function setup() {
  createCanvas(500, 700);
  background(0);
}

function draw() {
  // loads only first frame
  image(gif_loadImg, 50, 50);
  
  // updates animation frames by using an html
  // img element, positioning it over top of
  // the canvas.
  gif_createImg.position(50, 350);
}
function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(215, 35, 36);
  // circle
  strokeWeight(4);
  stroke(5,157,192);
  fill(215, 35, 36);
  ellipse(width/2, height/2, width/2, height/2);
  // square
  rect(width/6 + 100, height/6 + 100, width/16 + 50, height/16 + 50)
	// lines
  line(350, 200, 350, 300);
  line(375, 200, 375, 300);
  line(400, 200, 400, 300);
}function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(215, 35, 36);
  // circle
  strokeWeight(4);
  stroke(5,157,192);
  fill(215, 35, 36);
  ellipse(width/2, height/2, width/2, height/2);
  // square
  rect(width/6 + 100, height/6 + 100, width/16 + 50, height/16 + 50)
	// lines
  line(350, 200, 350, 300);
  line(375, 200, 375, 300);
  line(400, 200, 400, 300);
}// The Coding Train 2.3: JavaScript Objects
var circle = {
	x: 0,
  y: 200,
  diameter: 50
};

var r = 5;
var g = 157;
var b = 192;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // background
  background(r, g, b);
  // ellipse
  noStroke();
  fill(192, 192, 100);
  ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
  
  circle.x = circle.x + 1;
}// The Coding Train 2.2: Variables in p5.js (Make your own)
var circleX = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // background
  background(243, 149, 100);
  // ellipse
  noStroke();
  fill(5, 157, 192);
  ellipse(circleX, 200, 25, 25);
  
  circleX = circleX + 1;
}// The Coding Train 2.1: Variables in p5.js
function setup() {
  createCanvas(500, 500);
  // background
  background(220, 100, 100);
}

function draw() { 
  // ellipse
  noStroke();
  fill(250, 200, 200);
  rect(mouseX, mouseY, 2, 125);
}// The Coding Train 2.1: Variables in p5.js
function setup() {
  createCanvas(400, 400);
  // background
  background(220, 100, 100);
}

function draw() { 
  // ellipse
  stroke(255);
  fill(250, 200, 200);
  ellipse(mouseX, mouseY, 200, 200);
  
  fill(200, 250, 200);
  rect(400, 100, 50, 50);
}// The Coding Train 2.1: Variables in p5.js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  // background
  background(220, 100, 100);
  
  // ellipse
  stroke(255);
  fill(250, 200, 200);
  ellipse(mouseX, mouseY, 200, 200);
  
  fill(200, 250, 200);
  rect(400, 100, 50, 50);
}function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(215, 35, 36);
  // circle
  strokeWeight(20);
  stroke(5,157,192);
  fill(215, 35, 36);
  ellipse(width/2, height/2, width/2, height/2);
  // square
  rect(width/4, height/4, width/4, height/4)
  // square2
  line(400, 100, 400, 300);
  line(400 + 50, 100, 400+ 50, 300);
  line(400 + 100, 100, 400+ 100, 300);
}