let input;
let apiKey = "apiKey=Wg1RQ-mRUnADf_JceH9oWbfpxDieEE15";
let count = 1;
let x = 0;
function setup() {
  noCanvas();
  p = createP('Search tones!');
  buttonHap = createButton('happy');
  buttonSad = createButton('sad');
  buttonAng = createButton('angry');
  buttonAn = createButton('analytical');
  buttonTent = createButton('tentative');
  buttonCon = createButton('confident');
  buttonHap.mousePressed(search_happy);
  
  let url = api + apiKey;
  console.log(url);
  loadJSON(url, gotData);
  
	function gotData(data) {
  for (let i = 0; i < data.length-1; i++) {
    if (data[i].tone == "analytical") {
    let p = createP(count +". " + data[i].text);
      count ++;
      x = count/data.length*100;
    	}
		}
	}
}
function draw() {
      rect(x,10,10,10);
}
function search_happy() {
  let url = api + apiKey;
  console.log(url);
  loadJSON(url, gotData);
  
function gotData(data) {
  for (let i = 0; i < data.length-1; i++) {
    if (data[i].tone == "joy") {
    let p = createP(data[i].text);
      count ++;
    	}
		}
	}
}let video;
let vScale=16;
var button;
var button2;
var button3;
var snapshots = [];
var x = 120;
var y = 200;
var z = 150;
function setup() {
  createCanvas(500, 500);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  button = createButton('ZOOM IN');
  button.mousePressed(zoomin);
  button2 = createButton('ZOOM OUT');
  button2.mousePressed(zoomout);
  button3 = createButton('COLOR');
  button3.mousePressed(changecolor);
  
  video.hide();
}
function zoomin() {
  vScale ++;
}
function zoomout() {
  vScale --;
}
function changecolor() {
  x=random(255);
  y=random(255);
  z=random(255);
}
function draw() {
	background (x,y,z);
  video.loadPixels();
  loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      
      let bright = (r+g+b)/3;
      
      let w = map(bright,0,255,0,vScale);
      
      noStroke();
      fill(255);
      rectMode(CENTER);
      ellipse(x*vScale, y*vScale,w,w);
      }
  }
}let snow=[];
let col={
  r:0,
  g:0,
  b:0
};
let sw=5;
let bodyr=125;
let headr=75;
let spot={
  x:0,
  y:0
};
function setup() { 
  createCanvas(500, 700);
  for(let i=0;i<150;i++){
    snow[i]=new Snow();
  }
} 
function draw() {
  backgroundSky();
  
  for( let i=0;i<snow.length;i++){
    snow[i].fall();
    snow[i].display();
  
  }  
}
function backgroundSky(){
  r=map(mouseX,0,500,184,81);
  g=map(mouseX,0,500,208,97);
  b=map(mouseX,0,500,218,129);
  background(r,g,b);
}
  let input;
curl -X POST --user "6e805d9e-f62b-4f27-ac9a-83126e127997":"7hNi61Xbddna" \
--header "Content-Type: application/json" \
--data-binary @input.value()\
function setup() {
  noCanvas();
  input = createInput('rainbow');
  button = createButton('submit');
  button.mousePressed(search);
  let url = api + apiKey + query;
  loadJSON(url, gotData);
}
function gotData(giphy) {
  for (let i = 0; i < giphy.data.length; i++) {
    let img = createImg(giphy.data[i].images.original.url);
    img.size(200, 200);
  }
let input;
let apiKey = "&api_key=dc6zaTOxFJmzC";
function setup() {
  noCanvas();
  p = createP('Search gifs!');
  input = createInput('no');
  button = createButton('okaay');
  button.mousePressed(search);
}
function search() {
  let zip = input.value();
  let url = api + apiKey + '&q='+zip;
  console.log(url);
  loadJSON(url, gotData);
}
function gotData(giphy) {
  console.log(giphy);
  let p = createP(' ');
  for (let i = 0; i < giphy.data.length-1; i++) {
    let img = createImg(giphy.data[i].images.original.url);
    img.size(100, 100);
  }
var sliders = [];
function setup() {
  noCanvas();
  var button = select('#button');
  button.mousePressed(startDance);
  for (var i = 0; i < 50; i++) {
    sliders[i] = createSlider(0, 255, 20);
  }
  frameRate(20);
}
function gotData() {
}
function startDance() {
  img.position(350, 10);
  img.size(150, 120);
}
function draw() {
  var offset = 0;
  for (var i = 0; i < sliders.length; i++) {
    var x = map(sin(latestData / 6 + offset), -1, 1, 0, 255);
    sliders[i].value(x);
    offset += 0.09;
  }
}var mySlider;
function setup() { 
  createCanvas(400, 400);
  mySlider = createSlider(0,255,50);
  mySlider.position(width/3,height/2);
  mySlider.mouseClicked(yay);
} 
function draw() { 
}
function yay() {
  background(random(100,255),255,200);
}let win = [];
let w;
function setup() {
  createCanvas(500, 500);
  background(255);
  frameRate(150);
}
class Space {
  constructor() {
    this.x = 250;
    this.y = 250;
    this.vx = random (tan (this.x), -tan (this.x));
    this.vy = random (tan (this.x), -tan (this.x));
    this.alpha = 255;
  }
    
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha = this.alpha - 1;
  }
  
  winDone() {
  return this.alpha < 0;
	}
  show() {
    fill(this.x, this.y, 255, this.alpha);
    noStroke();
    ellipse(this.x, this.y, 10);
  }
}
function draw() {
  let w = new Space();
  win.push(w);
  
  for (let i = win.length-1; i>=0; i--) {
  win[i].update();
  win[i].show();
  if (win[i].winDone()) {
  	win.splice(i, 20);
  	}
  }
}let win = [];
let w;
function preload() {
img = loadImage("corgi.png");
}
function setup() {
  createCanvas(500, 500);
  background(255);
  frameRate(60);
}
class Space {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.vx = random (-cos (this.x), sin (this.x));
    this.vy = random (-cos (this.x), sin (this.x));
    this.alpha = 255;
  }
    
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha = this.alpha - 1;
  }
  
  winDone() {
  return this.alpha < 0;
	}
  show() {
    if (mouseIsPressed) {
    fill(this.x, this.y, 255/cos(this.x), this.alpha);
    noStroke();
    ellipse(this.x, this.y, 6);
    }
  }
}
function draw() {
  background(10);
  cursordog();
  confetti();
}
function cursordog() {
  image(img, mouseX - 95, mouseY - 70, 150,110);
}
function confetti() {
  let w = new Space();
  win.push(w);
  
  for (let i = win.length-1; i>=0; i--) {
  win[i].update();
  win[i].show();    
  if (win[i].winDone()) {
  	win.splice(i, 20);
  	}
   intext();
  } 
}
function intext() {
  fill(random(255), 100)
  noStroke();
  textSize(24);
  text("PRESS THE MOUSE", 205, 420);
}let myImage;
let myImage2;
let p;
let x;
let y;
let a = 10;
let imgw;
let imgh;
let op;
let splash1;
let r, g, b, o;
let s;
let m;
let txt1,txt2;
function preload() {
  myImage = loadImage("zuckerberg1.jpg");
  myImage2 = loadImage("pictureframe1.png");
}
function setup() {
  createCanvas(550, 500);
  frameRate(max);
  imageSetup();
  writeText("HELP MARK","escape the pixels");
}
function draw() {
  drawFrame();
  pixelate(150, 150);
}
function pixelate(imgw, imgh) {
  x = random(imgw);
  y = random(imgh);
  p = myImage.get(x, y);
  fill(p, 100);
  noStroke();
  rect(200 + x, 50 + y, a, a);
}
function drawFrame() {
  image(myImage2, 155, 13, 239, 224);
}
function imageSetup() {
  image(myImage, 198, 50, 153, 153);
  splash1 = new Splash(450, 100);
}
function writeText(txt1,txt2) {
  stroke(0);
  textSize(24);
  text(txt1, 261, 270);
  textSize(13);
  text(txt2, 310, 293);
}
function mouseClicked() {
  background(255);
  image(myImage, 198, 50, 153, 153);
  a--;
  if (a == 1) {
    a = 110;
    textSize(46);
    fill(0, 0, 0);
    text("NOOOOOO", 261, 365);
    fill(255, 190, 233);
    text("NOOOOOO", 259, 367);
  }
  if (a <= 10 && a >= 1) {
    splash1.move();
    splash1.show();
  }
}
class Splash {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  move() {
    this.x = this.x + random(-10, 10);
    this.y = this.y + random(25, 35);
  }
  show() {
    strokeWeight(0.5);
    stroke(0);
    noFill()
    rect(this.x, this.y, a, a);
    fill(0);
    textSize(10);
    text("pixel size", this.x, this.y - 5);
  }
var tinder = {
  x: 0,
  y: 0,
}
	var r=255;
	var g=255;
	var b=255;
	var r1=255;
	var g1=255;
	var b1=255;
	var op=35;
function preload() { 
  heart = loadImage("haert.png");
  cross = loadImage("cross.png");
  logo = loadImage("tindersm.png");
  timg1 = loadImage("tinderimg1.jpg");
  timg2 = loadImage("tinderimg2.jpg");
  outline = loadImage("outline.png");
} 
function setup() { 
  createCanvas(500, 450);
  pixelDensity(1);
} 
function draw() { 
  background(220);
  drawBackground();
  image(outline,460,410,30,30);
  drawTinder();
  drawAvatar(150);
}
function drawTinder() {
  fill('rgba(255,255,255,1)');
  stroke('rgba(241,241,241,1)');
  strokeWeight(1);
  rect(tinder.x+140,tinder.y+35,210,320);
  
  fill(mouseX,mouseY,200,45);
  stroke('rgba(207,207,207,1)');
  rect(tinder.x+160,tinder.y+70,170,200);
  
  fill(r,g,b,55);
  stroke('rgba(207,207,207,0.4)');
  strokeWeight(4);
  ellipse(tinder.x+221,tinder.y+315,45,45);
  
  fill(r1,g1,b1,35);
  ellipse(tinder.x+268,tinder.y+315,45,45);
  image(heart,tinder.x+255,tinder.y+305);
  image(cross,tinder.x+209,tinder.y+305);
  image(logo,tinder.x+204,tinder.y+42);
}
function drawBackground() {
  loadPixels();
  for (var x=0; x<width; x++) 
  {
  	for (var y=0; y<height; y++)	
    	{
      var boop = (x+y*width)*4;
      pixels[boop] = y;
      pixels[boop+1] = random(255);
      pixels[boop+2] = x*1.5;
      pixels[boop+3] = 255;  
  		}
  }
  updatePixels();
}
function drawAvatar(op) {
  fill (mouseX,0,76,op);
  noStroke();
  ellipse(tinder.x+244,tinder.y+168,65,65);
  arc(tinder.x+244, tinder.y+270, 110, 130, PI, 2*PI);
  
      if (mouseIsPressed &&
          mouseX<tinder.x+245 && mouseX>tinder.x+200
     			&& mouseY>tinder.y+280 && mouseY<tinder.y+325) {
      b=50;
      op=0;
      tinder.x = random(0,2);
  		tinder.y = random(0,2);
      image(timg1,tinder.x+160,tinder.y+70,170,200);
      }
 		 	else {
    		r=255;
  			g=255;
  			b=255;
        op=35;
      }
  
  		if (mouseIsPressed &&
          mouseX<tinder.x+295 && mouseX>tinder.x+245
     			&& mouseY>tinder.y+280 && mouseY<tinder.y+325) {
      	b1=50;
        op=0;
        tinder.x = random(0,2);
  			tinder.y = random(0,2);
        image(timg2,tinder.x+160,tinder.y+70,170,200)
      }
 		 	else {
    		r1=255;
  			g1=255;
  			b1=255;
      }
}function setup() {
  createCanvas(500, 500);
  img = loadImage("tv.jpg");
  img2 = loadImage("trump.jpg");
}
function draw() {
  x = 200;
  x = map(mouseX, 0, 500, 250, 0);
  background(x, 150, 180);
  translate(250, 250);
  textSize(72);
  text("TV IS DEAD", -200, 140);
	
  if (mouseIsPressed && mouseY>=150 && mouseY<=250 && mouseX>=250 && mouseX<=400) {
    strokeWeight(1);
    stroke(0);
    stroke(44);
    strokeWeight(2);
    rect(0, -100, 150, 100);
    image(img2, 1, -98, 148, 98);
    let a = random(0, 146);
    let mycolor = random(10, 50);
    let mycolor2 = random(10, 100);
    stroke(200, mycolor2, mycolor);
    strokeWeight(5);
    beginShape()
    curveVertex(a, -100);
    curveVertex(a, 0);
    curveVertex(a, -89);
    curveVertex(a, -80);
    curveVertex(a, -50);
    curveVertex(a, -100);
    curveVertex(a, -50);
    endShape();
    fill(45);
    noStroke();
    quad(149, -100, 180, -130, 180, -30, 150, 1);
    fill(67);
    quad(-1, -100, 32, -130, 180, -130, 150, -100);
    strokeWeight(2);
    fill(30);
    ellipse(86, -114, 10, 10);
    fill(36);
    ellipse(85, -115, 8, 8);
    stroke(30);
    line(85, -115, 88, -200);
    line(85, -115, 100, -150);
    fill(30);
    ellipse(88, -200, 3, 3);
    ellipse(100, -150, 3, 3);
    fill('rgba(0,0,0,0.2)');
    noStroke()
    quad(-1, 50, 32, 20, 180, 20, 150, 50);
  } 
  
  else {
    strokeWeight(1);
    stroke(0);
    stroke(44);
    strokeWeight(2);
    rect(0, -100, 150, 100);
    image(img, 0, -100, 150, 100);
    fill(45);
    noStroke();
    quad(149, -100, 180, -130, 180, -30, 150, 1);
    fill(67);
    quad(-1, -100, 32, -130, 180, -130, 150, -100);
    fill(30);
    ellipse(86, -114, 10, 10);
    fill(36);
    ellipse(85, -115, 8, 8);
    stroke(36)
    line(85, -115, 88, -200);
    line(85, -115, 100, -150);
    fill(30);
    ellipse(88, -200, 3, 3);
    ellipse(100, -150, 3, 3);
    fill('rgba(0,0,0,0.2)');
    noStroke()
    quad(-1, 50, 32, 20, 180, 20, 150, 50);
    let a = random(-100, 0);
    let mycolor = random(10, 50);
    let mycolor2 = random(180, 255);
    stroke(50, mycolor2, mycolor);
    strokeWeight(3);
    beginShape()
    curveVertex(150, a);
    curveVertex(0, a);
    curveVertex(120, a);
    curveVertex(130, a);
    curveVertex(140, a);
    curveVertex(146, a);
    curveVertex(100, a);
    endShape();
  }
}function setup() { 
  createCanvas(600,500);
  ellipseMode(CENTER);
  rectMode(CENTER);
} 
function draw() { 
  background(255,246,205);
  
  noStroke()
  fill(249,150,1)
  ellipse(303,450,300,300)
  
  fill(249,150,1)
  ellipse(302,250,203,200)
  
  fill(249,209,110)
  ellipse(300,450,290,300)
  
  fill(244,122,86)
  ellipse(523,120,138,140)
  
  fill(255,152,129)
  ellipse(520,120,130,140)
  
  stroke(126)
  line(520,190,520,350)
  noFill()
  arc(495,350,50,50,0,PI)
    
  noStroke()
  fill(249,209,110)
  rect(450, 375, 60, 60, 20)
  
  fill(249,209,110)
  rect(170, 375, 60, 60, 20)
  
	fill(249,209,126)
  ellipse(390,180,60,60)
  
	fill(249,209,126)
  ellipse(210,180,60,60)
  
  fill(213,170,71)
  ellipse(390,180,45,45)
  
	fill(213,170,71)
  ellipse(210,180,45,45)
  
  noStroke()
  fill(249,209,126)
  ellipse(300,250,200,200)
  
  fill(252,245,230)
  ellipse(300,250,170,185)
  
  fill(249,209,126)
  rect(250,225,80,100,30)
  
  fill(249,209,126)
  rect(350,225,80,100,30)
  
  fill(249,209,126)
  ellipse(325,185,40,40)
  
  fill(249,209,126)
  ellipse(275,185,40,40)
  
  fill(249,209,126)
  arc(300,180,100,50,PI,PI+PI)
  
  fill(249,209,126)
  ellipse(300,185,21,21)
  
  fill(252,245,230)
  ellipse(300,196,21,21)
  
  fill(249,209,126)
  ellipse(220,270,30,30)
  
  fill(249,209,126)
  ellipse(380,270,30,30)
  
  fill(252,245,230)
  ellipse(233,286,22,22)
  
  fill(252,245,230)
  ellipse(367,286,22,22)
  
  fill(255,255,255)
  ellipse(340,230,40,30)
  ellipse(260,230,40,30)
  
  fill(0,0,0)
  ellipse(347,228,10,10)
  ellipse(267,228,10,10)
  
  fill(0,0,0)
  rect(300, 270, 25, 18, 5)
  
  noFill()
  stroke(0,0,0)
  arc(325, 270, 50, 50, 0, PI);
  arc(275, 270, 50, 50, 0, PI);
  
  noStroke()
  fill(245,218,157)
  arc(300, 310, 50, 50, 0, PI);
}