function preload() {
  acrylicSound = loadSound("acrylic.mp3");
  woodSound = loadSound("wood.mp3");
  stoneSound = loadSound("Synth.mp3");
  metalSound = loadSound("metal.mp3");
}


function setup() {
  createCanvas(800, 800);
  fftAcrylicSound = new p5.FFT();
  fftAcrylicSound.setInput(acrylicSound);
  acrylicBezier = new Bezier(100, 250,fftAcrylicSound,3,0.05);

  
  fftWoodSound = new p5.FFT();
  fftWoodSound.setInput(woodSound);
  woodBezier = new Bezier(250, 400, fftWoodSound,-3,0.05);
  
  fftStoneSound = new p5.FFT();
  fftStoneSound.setInput(stoneSound);
  stoneBezier = new Bezier(400, 550, fftStoneSound,3,0.06);
  
  fftMetalSound = new p5.FFT();
  fftMetalSound.setInput(metalSound);
  metalBezier = new Bezier(550, 700, fftMetalSound,-3,0.04);
  
  // acrylicSound.loop();
  // woodSound.loop();
  // stoneSound.loop();
  // metalSound.loop();

}

function draw() {
  background(0, 0, 0);

  //show the waves  
  acrylicBezier.show();
  woodBezier.show();  
  stoneBezier.show();  
  metalBezier.show();
}
let shakeA = 0;
let shakeW = 1;
let shakeS = 2;
let shakeM = -1;
let shakeSpeed = 0.2;


function preload() {
  acrylicSound = loadSound("acrylic.mp3");
  woodSound = loadSound("wood.mp3");
  stoneSound = loadSound("Synth.mp3");
  metalSound = loadSound("metal.mp3");
}


function setup() {
  createCanvas(800, 800);
  fftAcrylicSound = new p5.FFT();
  fftAcrylicSound.setInput(acrylicSound);
  fftWoodSound = new p5.FFT();
  fftWoodSound.setInput(woodSound);
  fftStoneSound = new p5.FFT();
  fftStoneSound.setInput(stoneSound);
  fftMetalSound = new p5.FFT();
  fftMetalSound.setInput(metalSound);
  // acrylicSound.loop();
  // woodSound.loop();
  // stoneSound.loop();
  // metalSound.loop();

}

function draw() {
  background(0, 0, 0);
  fftAcrylicSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  acrylicSoundLowMidVal = (int)(fftAcrylicSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  acrylicSoundHighMidVal = (int)(fftAcrylicSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));
  
  fftWoodSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  woodSoundLowMidVal = (int)(fftWoodSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  woodSoundHighMidVal = (int)(fftWoodSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));

	fftStoneSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  stoneSoundLowMidVal = (int)(fftStoneSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  stoneSoundHighMidVal = (int)(fftStoneSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));
  
  fftMetalSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  metalSoundLowMidVal = (int)(fftMetalSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  metalSoundHighMidVal = (int)(fftMetalSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));
  

  //draw the waves
  
      let shakeASize = 3
      let shakeASpeed = 0.2;

    if (shakeA > shakeASize) {
      shakeASpeed = shakeASpeed * -1;
    } else if (shakeA < shakeASize * -1) {
      shakeASpeed = shakeASpeed * -1
    } else {
      shakeASpeed = shakeASpeed;
    }
    shakeA = shakeA+shakeASpeed;
  console.log(shakeA)
  
        let shakeWSize = 3
    if (shakeW > shakeWSize) {
      shakeSpeed = shakeSpeed * -1;
    } else if (shakeW < shakeWSize * -1) {
      shakeSpeed = shakeSpeed * -1
    } else {
      shakeSpeed = shakeSpeed;
    }
    shakeW = shakeW+shakeSpeed;
  
        let shakeSSize = 3
    if (shakeW > shakeSSize) {
      shakeSpeed = shakeSpeed * -1;
    } else if (shakeW < shakeSSize * -1) {
      shakeSpeed = shakeSpeed * -1
    } else {
      shakeSpeed = shakeSpeed;
    }
    shakeS = shakeS+shakeSpeed;
  
        let shakeMSize = 3
    if (shakeM > shakeMSize) {
      shakeSpeed = shakeSpeed * -1;
    } else if (shakeA < shakeMSize * -1) {
      shakeSpeed = shakeSpeed * -1
    } else {
      shakeSpeed = shakeSpeed;
    }
    shakeM = shakeM+shakeSpeed;
  
  acrylicBezier = new Bezier(100, 250, acrylicSoundLowMidVal, acrylicSoundHighMidVal,shakeA);
  acrylicBezier.draw();
  woodBezier = new Bezier(250, 400, woodSoundLowMidVal, woodSoundHighMidVal,shakeW);
  woodBezier.draw();
  stoneBezier = new Bezier(400, 550, stoneSoundLowMidVal, stoneSoundHighMidVal,shakeS);
  stoneBezier.draw();
  metalBezier = new Bezier(550, 700, metalSoundLowMidVal, metalSoundHighMidVal,shakeM);
  metalBezier.draw();
}


function preload() {
  acrylicSound = loadSound("acrylic.mp3");
  woodSound = loadSound("wood.mp3");
  stoneSound = loadSound("Synth.mp3");
  metalSound = loadSound("metal.mp3");
}


function setup() {
  createCanvas(800, 800);
  fftAcrylicSound = new p5.FFT();
  fftAcrylicSound.setInput(acrylicSound);
  fftWoodSound = new p5.FFT();
  fftWoodSound.setInput(woodSound);
  fftStoneSound = new p5.FFT();
  fftStoneSound.setInput(stoneSound);
  fftMetalSound = new p5.FFT();
  fftMetalSound.setInput(metalSound);
  // acrylicSound.loop();
  // woodSound.loop();
  // stoneSound.loop();
  // metalSound.loop();

}

function draw() {
  background(0, 0, 0);
  fftAcrylicSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  acrylicSoundLowMidVal = (int)(fftAcrylicSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  acrylicSoundHighMidVal = (int)(fftAcrylicSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));
  
  fftWoodSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  woodSoundLowMidVal = (int)(fftWoodSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  woodSoundHighMidVal = (int)(fftWoodSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));

	fftStoneSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  stoneSoundLowMidVal = (int)(fftStoneSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  stoneSoundHighMidVal = (int)(fftStoneSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));
  
  fftMetalSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  metalSoundLowMidVal = (int)(fftMetalSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  metalSoundHighMidVal = (int)(fftMetalSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));
  

  //draw the waves
  
      let shakeA = calcShake(2,4);
		    console.log(shakeA);

  
  acrylicBezier = new Bezier(100, 250, acrylicSoundLowMidVal, acrylicSoundHighMidVal,shakeA);
  acrylicBezier.draw();
  woodBezier = new Bezier(250, 400, woodSoundLowMidVal, woodSoundHighMidVal,shakeA);
  woodBezier.draw();
  stoneBezier = new Bezier(400, 550, stoneSoundLowMidVal, stoneSoundHighMidVal,shakeA);
  stoneBezier.draw();
  metalBezier = new Bezier(550, 700, metalSoundLowMidVal, metalSoundHighMidVal,shakeA);
  metalBezier.draw();
}

function calcShake(start,shakeSize){
  	let shakeSpeed = 0.2;

    if (shake > shakeSize) {
      shakeSpeed = shakeSpeed * -1;
    } else if (shake < shakeSize * -1) {
      shakeSpeed = shakeSpeed * -1
    } else {
      shakeSpeed = shakeSpeed;
    }
    shake = shake+shakeSpeed;
    console.log(shake);
  	return(shake);
}var t;
// let t1="Solve problems and create values through design.".split('')
let t1="\"SOLVE PROBLEMS AND CREATE VALUES THROUGH DESIGN.\"".split('')


let t1t="";
t1l=0;


function setup() {
	createCanvas(1000,96);
  t = createElement("h1","")
  t.style("text-align","center");
  t.style("font-kerning","2px")

}

function draw() {
  // background(200)
  clear()
if (t1l<t1.length){
   t1t=t1t+t1[t1l];
	 t1l++;
}

  
   t.html("< "+t1t+ " />");
  
  if (t1l>=t1.length){
    noLoop()
  }

  frameRate(20);
}
var vehicles = [];
var font;

function preload() {
  font = loadFont("Trebuchet MS Bold.ttf");//the file must exist
}
function setup() {
  createCanvas(800, 400);
  var points = font.textToPoints('Creative Coding', 70, 228, 86,{
    sampleFactor: 0.2,
    simplifyThreshold: 0
  });
  


  for (var i=0; i < points.length; i++){
    var pt = points[i];//pt from Dan's video
    var vehicle = new Vehicle(pt.x,pt.y);
    vehicles.push(vehicle);

  }
}

function draw() {
  background(235);


  for (var i=0; i < vehicles.length; i++){
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
    v.link();
  }

  // console.log(vehicles[3].opa);
}


function Vehicle(x,y){
  this.pos = createVector(random(width),random(height));
  this.target = createVector(x,y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 2;
  this.maxspeed = 10;
  this.maxforce = 0.5;
  this.h = 100;
  this.sat = 40;
  this.light = 10;
  this.opa = 160;
 
	this.link = function(){
  //       let c = color('hsla('+this.h+','+this.sat+'%,'+this.light+'%,10)');
  //   stroke(c,5);
  // line(this.pos.x,this.pos.y,200,300)
  }

  this.behaviors = function(){
    var arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
  }

  this.applyForce = function(f){
    this.acc.add(f);
  }

  this.update = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.opa = floor(map(this.vel.x,.1,this.maxspeed-5,160,255));
    // this.sat = floor(map(this.vel.x,.1,this.maxspeed-5,20,60));
    // this.light = floor(map(this.vel.x,.001,.1,100,50));


    // if (this.h < 0){
    //   this.h = 0;
    // }
    // if (this.sat < 70){
    //   this.sat = 20;
    // }
    // if (this.light > 50){
    //   this.light = 20;
    // }
    if (this.opa < 0){
      this.opa = 160;
    }
    this.acc.mult(0);

  }

  this.show = function(){
    push();
    var c = color(0);
    stroke(c,this.opa);
    strokeWeight(this.r);
    point(this.pos.x,this.pos.y);
    strokeWeight(0.25)
    stroke(0,80);
  // line(this.pos.x,this.pos.y,396,211);
    //   line(this.pos.x,this.pos.y,0,0)
    //   line(this.pos.x,this.pos.y,width,height)
    //   line(this.pos.x,this.pos.y,width,0)
    // line(this.pos.x,this.pos.y,0,height)
    pop();
  }


  this.arrive = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if ( d < 100){
      speed = map(d, 0, 100,0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  this.flee = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50){
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0,0);
    }
  }

}let shakeSpeed = 0.2;
let shake = 0;

function preload() {
  acrylicSound = loadSound("acrylic.mp3");
  woodSound = loadSound("wood.mp3");
  stoneSound = loadSound("Synth.mp3");
  metalSound = loadSound("metal.mp3");
}


function setup() {
  createCanvas(800, 800);
  fftAcrylicSound = new p5.FFT();
  fftAcrylicSound.setInput(acrylicSound);
  fftWoodSound = new p5.FFT();
  fftWoodSound.setInput(woodSound);
  fftStoneSound = new p5.FFT();
  fftStoneSound.setInput(stoneSound);
  fftMetalSound = new p5.FFT();
  fftMetalSound.setInput(metalSound);
  // acrylicSound.loop();
  // woodSound.loop();
  // stoneSound.loop();
  // metalSound.loop();

}

function draw() {
  background(0, 0, 0);
  fftAcrylicSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  acrylicSoundLowMidVal = (int)(fftAcrylicSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  acrylicSoundHighMidVal = (int)(fftAcrylicSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));
  
  fftWoodSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  woodSoundLowMidVal = (int)(fftWoodSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  woodSoundHighMidVal = (int)(fftWoodSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));

	fftStoneSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  stoneSoundLowMidVal = (int)(fftStoneSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  stoneSoundHighMidVal = (int)(fftStoneSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));
  
  fftMetalSound.analyze();
  // acrylicSoundBassVal = (int)(fftAcrylicSound.getEnergy("bass"));
  metalSoundLowMidVal = (int)(fftMetalSound.getEnergy("lowMid"));
  // acrylicSoundMidVal = (int)(fftAcrylicSound.getEnergy("mid"));
  metalSoundHighMidVal = (int)(fftMetalSound.getEnergy("highMid"));
  // acrylicSoundTrebVal = (int)(fftAcrylicSound.getEnergy("treble"));
  

  //draw the waves
  
      let shakeSize = 3

    if (shake > shakeSize) {
      shakeSpeed = shakeSpeed * -1;
    } else if (shake < shakeSize * -1) {
      shakeSpeed = shakeSpeed * -1
    } else {
      shakeSpeed = shakeSpeed;
    }
    shake = shake+shakeSpeed;

    console.log(shake);
  
  acrylicBezier = new Bezier(100, 250, acrylicSoundLowMidVal, acrylicSoundHighMidVal,shake);
  acrylicBezier.draw();
  woodBezier = new Bezier(250, 400, woodSoundLowMidVal, woodSoundHighMidVal,shake);
  woodBezier.draw();
  stoneBezier = new Bezier(400, 550, stoneSoundLowMidVal, stoneSoundHighMidVal,shake);
  stoneBezier.draw();
  metalBezier = new Bezier(550, 700, metalSoundLowMidVal, metalSoundHighMidVal,shake);
  metalBezier.draw();
}

function calcShake(start,size){
  
}var soundSynth, fft;
var mic;
function preload() {
  soundSynth = loadSound("Synth.mp3");
}


function setup() {
  createCanvas(600, 600);
  fft = new p5.FFT();
  soundSynth.play();
  // mic = new p5.AudioIn();
  // fft.setInput(mic);
}

function draw() {
  background(0, 0, 0);
  fft.analyze();
  bassVal = (int)(fft.getEnergy("bass"));
  lMidVal = (int)(fft.getEnergy("lowMid"));
  midVal = (int)(fft.getEnergy("mid"));
  hMidVal = (int)(fft.getEnergy("highMid"));
  trebVal = (int)(fft.getEnergy("treble"));
  
  let totalVal = bassVal + lMidVal + midVal + hMidVal + trebVal
  let totalLow = bassVal + lMidVal + midVal
  let totalHigh = midVal + hMidVal + trebVal
  
  let curveBase = height/3*2;
  let curveHeight = curveBase - totalLow/2;
  
  let x1= 0-width;
  let x2= 0;
  let x3 = width/2;
  let x4 = width;
  let x5= width + width;
  
  // fill(255, 186, 73);
  noFill();
	stroke(255);
  strokeWeight(2);
	curve(x1,curveBase ,x2, curveBase, x3, curveHeight,x4+width/2, curveHeight);
  curve(x2-width/2,curveHeight,x3, curveHeight, x4, curveBase, x5, curveBase);
	fill(255, 186, 73);
  ellipse(x3, curveHeight,10,10);
  
  let curveHeight2 = curveBase - totalHigh/2;

  
    noFill();
	stroke(255);
  strokeWeight(2);
	curve(x1,curveBase ,x2, curveBase, x3, curveHeight2,x4+width/2, curveHeight2);
  curve(x2-width/2,curveHeight2,x3, curveHeight2, x4, curveBase, x5, curveBase);
	fill(255, 186, 73);
  ellipse(x3, curveHeight2,10,10);
  
  // fps = frameRate();
  // console.log(fps);
  
//   noStroke();
//   fill(255, 186, 73);
//   ellipse(width / 2, height / 2, bassVal * 4, bassVal * 4);

//   noStroke();
//   fill(32, 163, 158);
//   ellipse(width / 2, height / 2, lMidVal * 2, lMidVal * 2);

//   noStroke();
//   fill(135, 195, 143);
//   ellipse(width / 2, height / 2, midVal * 2, midVal * 2);

//   noStroke();
//   fill(239, 91, 91);
//   ellipse(width / 2, height / 2, hMidVal * 2, hMidVal * 2);

//   noStroke();
//   fill(79, 0, 75);
//   ellipse(width / 2, height / 2, trebVal * 2, trebVal * 2);
}

//p5.Amplitude// let bag;
// let popCorn;
let shoot
let popCornArray = [];
let curtain;

function setup() {
  createCanvas(600, 400);
  curtain = loadImage('curtain.jpg');

  bag = new Bag(100, height-120);
  shoot = createButton("shoot");
  shoot.id("ctastyle");
  shoot.position(260,420);
  shoot.mousePressed(function(){popC()})
}

function popC() {  
  popCorns = new PopCorn(bag.x+100, height-120 ,random(20,30));
  popCornArray.push(popCorns);
}


function draw() {
  background(220);
  image (curtain,0,0);
  bag.move();
  for( let i=0; i<popCornArray.length; i++){
  popCornArray[i].move();
  }
}
let mobilenet;
let gudetama;
let video;

function modelReady(){
 console.log("Model is ready."); 
 mobilenet.predict(gotResults);
}

function imageReady(){
 console.log("Image is ready."); 
 image(gudetama,0,0,400,170);
}

function gotResults(error, results){
  if (error) {
    console.error(error);
  }else{
    console.log(results);
  }
 mobilenet.predict(gotResults);

}

function setup() {
  createCanvas(600, 600);
  // gudetama = createImg('images/gudetama.jpg', imageReady);
  // gudetama.hide();
   video= createCapture(VIDEO);
  video.hide();
  mobilenet = ml5.imageClassifier('MobileNet',video, modelReady);
}

function draw() {
  // background(220);
  image(video,0,0)
}var video;

var vScale = 8;

function setup() {
  createCanvas(640, 480);
  // pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();
}

function draw() {
  background(255);

  let red = map(mouseX, 0, width, 10, 255);
  let green = map(mouseX, width, 0, 10, 255);
  let blue = map(mouseY, height, 0, 10, 255);



  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];


      var bright = (r + g + b) / 3;


      var w = map(bright, 255, 0, 1, vScale);

      noStroke();
		  let c = color(red,green,blue);
      fill(c);
      
      ellipseMode(CENTER);
      ellipse(x * vScale + vScale / 2, y * vScale + vScale / 2, w, w);
      //             rectMode(CENTER);

      //       rect(x*vScale+vScale/2, y*vScale+vScale/2, w, w);


    }
  }

}var noise1 = 0
var noise2 = 10
var noise3 = 230
var noise4 = 4260
let x1;
let x2;
let x3;
let y2;
let x
let y 

function setup() {
    createCanvas(800, 500);
    colorMode(HSB, 360);
    // noLoop();
  	let n1 = noise(100);
  	console.log(n1);
   x= width/2
	 y = height/2
}

function draw() {

      background(50);

  
    for (let i = 0; i < 1000; i++) {
        x1 = map(noise(noise1), 0, 1, 150, 650);
        y1 = map(noise(noise2), 0, 1, 0, height);

        noise1 += 0.01;
        noise2 += 0.01;


        stroke(map(noise(noise1), 0, 1, 0, 360), map(noise(noise2), 0, 1, 0, 360), random(330, 360));
        strokeWeight(1);
      
        
      
      if(mouseX>0&&mouseY>0&&mouseX<width&&mouseY<height){
      x= mouseX;
      y=mouseY;
      }else{
      x= width/2
	 y = height/2  
      }
      line(x, y, x1, y1);
    }
    frameRate(10);      
}

// Press ENTER for save current image
// PRESS BACKSPACE for redraw over and over
// Press ESCAPE for clean screen and redraw
function keyPressed() {
    if (keyCode == ENTER) {
        var filename = "expr4-" + Date.now().toString();
        saveCanvas(filename, "png");
        return false;
    } else if (keyCode == BACKSPACE) {
        redraw();
        return false;
    } else if (keyCode == ESCAPE) {
        clear();
        background(250, 50, 100);
        redraw();
        return false;
    }
    return false; // prevent any default behaviour
}////////////////
/// Declare Vars
////////////////


//drawing board

let x;
let y;
let d;
let r;
let alpha = 10;
let b = [];
let ledPos = [];

//////////////////
//// Setup
/////////////////

function setup() {
  let canvas = createCanvas(512, 512);
  

  //draw balls
  for (let x = 8; x < width; x += 16) {
    for (let y = 8; y < height; y += 16) {
      d = 14;
      alpha = 0;
      let state = false
      ball = new Ball(x, y, d, alpha, state);
      b.push(ball);
    }
  }
  
	let authors = select('#authors');
authors.position(0,724);

  let instruction = select('#instruction');
instruction.position(0,640);
  
  let clear = select('#clear');
clear.position(0,666);




}



///////////////////
// Draw
///////////////////

function draw() {
  // background(0);
  // text("incoming value: " + inData, 30, 30);

  background(255,128,0);


  noStroke();
  fill(255,100,2, alpha);

  px = mouseX;
  py = mouseY;

  for (i = 0; i < b.length; i++) {
    b[i].show();
    b[i].hover();
    b[i].highlight();
    
  }
}


///////////////
// Other functions
///////////////


//console log what you get back from serial


function keyPressed() {
  
  if(key === 'c'){
    
  
    window.location.reload();  
 
    
    //tell p5 to clear
    
	}
}












////////////////
/// Declare Vars
////////////////

var serial;
var portName = '/dev/cu.usbmodem143201';
var inData;
var outByte = 0;

//drawing board

let x;
let y;
let d;
let r;
let alpha = 10;
let b = [];
let ledPos = [];

//////////////////
//// Setup
/////////////////

function setup() {
  let canvas = createCanvas(512, 512);
  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.open(portName);

  //list serial events
  // serial.on('list', printList);
  // serial.list();

  //draw balls
  for (let x = 8; x < width; x += 16) {
    for (let y = 8; y < height; y += 16) {
      d = 14;
      alpha = 0;
      let state = false
      ball = new Ball(x, y, d, alpha, state);
      b.push(ball);
    }
  }
  
	let authors = select('#authors');
authors.position(0,724);

  let instruction = select('#instruction');
instruction.position(0,640);
  
  let clear = select('#clear');
clear.position(0,666);

}

function serialError(err) {
  // print('Something went wrong with the serial port.' + err);
}

////////////////
//// Other serial functions
////////////////////

// function printList(portList){
//   for (var i = 0; i < portList.length; i++){
//     print(i + " " + portList[i]);
//   }
// }



///////////////////
// Draw
///////////////////

function draw() {
  // background(0);
  // text("incoming value: " + inData, 30, 30);

  background(255,128,0);


  noStroke();
  fill(255,100,2, alpha);

  px = mouseX;
  py = mouseY;

  for (i = 0; i < b.length; i++) {
    b[i].show();
    b[i].hover();
    b[i].highlight();
    
  }
}


///////////////
// Other functions
///////////////


//console log what you get back from serial
function serialEvent() {
  var asd = serial.readStringUntil('\n');
  console.log(asd);
}

function keyPressed() {
  
  if(key === 'c'){
    
    //tell serial to clear
    serial.write('c');
  	// console.log("pressed");
    
    window.location.reload();  
    
  
    
    //tell p5 to clear
    
	}
}












////////////////
/// Declare Vars
////////////////

var serial;
var portName = '/dev/cu.usbmodem1441';
var inData;
var outByte = 0;
let arraytest = [10, 20, 30, 40];

//drawing board

let x;
let y;
let d;
let r;
let alpha = 100;
let b = [];
let ledPos = [];

//////////////////
//// Setup
/////////////////

function setup() {
  createCanvas(512, 512);
  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.open(portName);

  //list serial events
  // serial.on('list', printList);
  // serial.list();

  //draw balls
  for (let x = 8; x < width; x += 16) {
    for (let y = 8; y < height; y += 16) {
      d = 16;
      alpha = 100;
      let state = false
      ball = new Ball(x, y, d, alpha, state);
      b.push(ball);
    }
  }


}

function serialError(err) {
  // print('Something went wrong with the serial port.' + err);
}

////////////////
//// Other serial functions
////////////////////

// function printList(portList){
//   for (var i = 0; i < portList.length; i++){
//     print(i + " " + portList[i]);
//   }
// }



///////////////////
// Draw
///////////////////

function draw() {
  // background(0);
  // text("incoming value: " + inData, 30, 30);

  background(220);

  noStroke();
  fill(255,100,2, alpha);

  px = mouseX;
  py = mouseY;

  for (i = 0; i < b.length; i++) {
    b[i].show();
    b[i].hover();
    b[i].highlight();
    
  }
}


///////////////
// Other functions
///////////////


//console log what you get back from serial
function serialEvent() {
  var asd = serial.readStringUntil('\n');
  console.log(asd);
}

function keyPressed() {
  
  if(key === 'c'){
    serial.write('c');
  	console.log("pressed");
	}
}












//69ecdc0e599c15f8dd2c2678e4c29f43
//http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=69ecdc0e599c15f8dd2c2678e4c29f43&units=imperial
let inp;
let graph;
let whereAreYou;
let localTemp;
let homeTemp;
let m;
let l;
let r;

var w = window.innerWidth;
var h = window.innerHeight;

let url = "https://api.openweathermap.org/data/2.5/weather?q=";
let local;
let home;
let apiKey = "&appid=69ecdc0e599c15f8dd2c2678e4c29f43";
let unit = "&units=metric";

function preload() {
  m = loadImage('m.jpg');
  l = loadImage('l.jpg');
  r = loadImage('r.jpg');
}

function setup() {
  createCanvas(w, h);
  background(100);
  image(m, 0, 0, width, height);
  whereAreYou = createElement("h1", "Where are you?");
  whereAreYou.id("whereAreYou");
  whereAreYou.position(0, height / 2 - 80);
  inpLocal = createInput("");
  inpLocal.position(width / 2, height / 2);
  inpLocal.id("centerInput");
  inpLocal.changed(enterLocal);
  showLocalTemp = createElement("h2", "");
  showLocalName = createElement("h3", "");
  
  whereIsHome = createElement("h2", "Where is home?");
  inpHome = createInput("");
  inpHome.changed(enterHome);
  inpHome.id("centerInput");
  showHomeTemp = createElement("h2", "");
  showHomeName = createElement("h3", "");
}


function enterLocal() {
  console.log('Local:', inpLocal.value());
  whereAreYou.remove();
  inpLocal.position(0,0);
  inpLocal.id("topInput");
  // inpLocal.html("change");
  local = inpLocal.value();
  let localWeatherApi = url + local + apiKey + unit;
  loadJSON(localWeatherApi, updateLocal);
}

function enterHome() {
  console.log('Home:', inpHome.value());
  whereIsHome.remove();
  inpHome.position(width / 2, height / 7*6);
  inpHome.id("topInput");
  home = inpHome.value();
  let homeWeatherApi = url + home + apiKey + unit;
  loadJSON(homeWeatherApi, updateHome);
}

function updateLocal(localData) {
  localTemp = localData.main.temp;
  console.log("localTemp: " + localTemp)
  drawLocalGraph();
}

function updateHome(homeData) {
  homeTemp = homeData.main.temp;
  console.log("homeTemp: " + homeTemp)
  drawHomeGraph();
}

function drawLocalGraph() {
  if (local) {

    //background
    colorMode(HSL, 360, 100, 100, 1)
    noStroke();
    // fill(24, 64, 52, 1);
    // rect(0, 0, width / 2, height);
    image(l, 0, 0, width / 2, height);

    //Local Name
    showLocalName.html(local);
    showLocalName.position(0, height / 2 - 50);

    //temperature
    if (localTemp) {
      showLocalTemp.html(localTemp + "°C");
      showLocalTemp.position(0, height / 2);
    }
    
    //start home side
    image(r, width / 2, 0, width / 2, height);
    whereIsHome.position(width / 2, height / 2 - 80);
    inpHome.position(width / 2+70, height / 2);
  }
}

function drawHomeGraph() {
  if (home) {

    //background
    colorMode(HSL, 360, 100, 100, 1)
    noStroke();
    // fill(24, 20, 50, 1);
    // rect(width / 2, 0, width / 2, height);
    image(r, width / 2, 0, width / 2, height);
    
    
    inpHome.position(width / 4*3, height / 6);

    //Home Name
    showHomeName.html(home);
    showHomeName.position(width / 2, height / 2 - 50);

    //temperature
    if (homeTemp) {
      showHomeTemp.html(homeTemp + "°C");
      showHomeTemp.position(width / 2, height / 2);
    }
    

  }
}

function draw() {

  drawLocalGraph();
  drawHomeGraph()

}//69ecdc0e599c15f8dd2c2678e4c29f43
//http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=69ecdc0e599c15f8dd2c2678e4c29f43&units=imperial
let inp;
let graph;
let days = ["Mon","Tue","Wed","Thu","Fri"];
let mainTemp=3;
let daysTemp = [mainTemp,"3","12","1","8"];

let url = "https://api.openweathermap.org/data/2.5/weather?q=";
let dest = "New York"; //later change into local
let apiKey="&appid=69ecdc0e599c15f8dd2c2678e4c29f43";
let unit = "&units=metric";

function setup() {
  createCanvas(600, 400);
  background(220);
  
  let destWeatherApi= url + dest + apiKey + unit;
  loadJSON(destWeatherApi, updateDest);
  inp = createInput("")
  inp.position(20,20);
  inp.changed(enterDest);
  // drawGraph();
}


function enterDest() {
  console.log('Dest:', inp.value());
  dest =  inp.value();
  let destWeatherApi= "https://api.openweathermap.org/data/2.5/weather?q="+ dest +"&appid=69ecdc0e599c15f8dd2c2678e4c29f43&units=metric"
  loadJSON(destWeatherApi, updateDest);
  
}

function updateDest(data){
  mainTemp = data.main.temp;
 	console.log("mainTemp: " + mainTemp) 
  // ellipse(100,100,data.main.temp*10)
  daysTemp[0] = mainTemp;
  drawGraph();
}

function drawGraph(){
  let graphX = width/8*6;
  let graphY = height/8*6;
  let leftPad = width/8;
  let topPad = height/8;
 	rect(leftPad, topPad, graphX, graphY);
  console.log(graphY);
  for (let i=0;i<days.length;i++){
  	let drawDay = createP(days[i]);
    let drawDayPosition = leftPad+25+graphX/days.length*i;
    let drawNextDayPosition = leftPad+25+graphX/days.length*(i+1);
    let drawDayHeight = graphY-10;
    drawDay.position(drawDayPosition,drawDayHeight);
    let drawTemp = createP(daysTemp[i]);
    let drawTempPosition = drawDayPosition;
    let drawNextTempPosition = drawNextDayPosition;
  	let drawTempHeight = drawDayHeight-10-daysTemp[i]*10;	
    let drawNextTempHeight = drawDayHeight-10-daysTemp[i+1]*10;
    console.log(daysTemp[1]);
    drawTemp.position(drawTempPosition,drawTempHeight);
    ellipse(drawTempPosition,drawTempHeight,4);
    if(i<days.length-1){
      line(drawTempPosition,drawTempHeight,drawNextTempPosition,drawNextTempHeight)
    }
    
    // for (let j=0;j<daysTemp.length;j++){	
    // let drawTemp = createP(daysTemp[j]);
    // let drawTempPosition = drawDayPosition[i];
    // let drawTempHeight = drawDayHeight-daysTemp[j]*10;
    // drawTemp.position(drawTempPosition,drawTempHeight)
    // }
  	}
 	
}

function draw() {
  
	
}

function setup() {

  createCanvas(400, 400);
  scene = new wave(20,6,1,1);
  //scene.createArrays();
  fill(120,204,204);
  noStroke();
	
}



function draw() {
  
  let tempSlider = document.getElementById("tempSlider");
	let output = document.getElementById("temp");
  output.innerHTML = tempSlider.value;
  
  let perSlider = document.getElementById("perSlider");
	let perOutput = document.getElementById("per");
  perOutput.innerHTML = perSlider.value;

  let htSlider = document.getElementById("htSlider");
	let htOutput = document.getElementById("ht");
  htOutput.innerHTML = htSlider.value;
  background(0);
  
  scene.createArrays(perSlider.value,htSlider.value);
  scene.drawWaves(tempSlider.value);
  
  
}let x;
let y;
let d;
let r;
let a = 100;
let b = [];


function setup() {
  createCanvas(512, 512);
  for (let x = 8; x < width; x += 16) {
    for (let y = 8; y < height; y += 16) {
      d = 16;
      a = 100;
      ball = new Ball(x, y, d, a, false);
      b.push(ball);
    }
  }
}

function draw() {
  background(220);

  noStroke();
  fill(0, a);

  px = mouseX;
  py = mouseY;

  for (i = 0; i < b.length; i++) {
    b[i].show();
    b[i].hover();
    b[i].highlight();
  }
}

class Ball {

  constructor(x, y, d, a, state) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.a = a;
    r = this.d / 2;
    this.state = false;
  }

  show() {
    fill(0, this.a);
    ellipse(this.x, this.y, this.d);
  }

  hover() {
    this.state = (px < this.x + r && px > this.x - r && py < this.y + r && py > this.y - r);
    return this.state;
  }

  highlight() {
    // print(this.state)
    if (this.state === true && mouseIsPressed) {
      this.a = 200;
    	// console.log(this.x,this.y)
    }
    
  }
}var vehicles = [];
var font;

function preload() {
  font = loadFont("Trebuchet MS Bold.ttf");//the file must exist
}
function setup() {
  createCanvas(800, 400);
  var points = font.textToPoints('NI HAO', 205, 250, 120,{
    sampleFactor: 0.2,
    simplifyThreshold: 0
  });
  


  for (var i=0; i < points.length; i++){
    var pt = points[i];//pt from Dan's video
    var vehicle = new Vehicle(pt.x,pt.y);
    vehicles.push(vehicle);

  }
}

function draw() {
  background(235);


  for (var i=0; i < vehicles.length; i++){
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
    v.link();
  }

  // console.log(vehicles[3].opa);
}


function Vehicle(x,y){
  this.pos = createVector(random(width),random(height));
  this.target = createVector(x,y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 2;
  this.maxspeed = 10;
  this.maxforce = .5;
  this.h = 100;
  this.sat = 40;
  this.light = 10;
  this.opa = 160;
 
	this.link = function(){
  //       let c = color('hsla('+this.h+','+this.sat+'%,'+this.light+'%,10)');
  //   stroke(c,5);
  // line(this.pos.x,this.pos.y,200,300)
  }

  this.behaviors = function(){
    var arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
  }

  this.applyForce = function(f){
    this.acc.add(f);
  }

  this.update = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.opa = floor(map(this.vel.x,.1,this.maxspeed-5,160,255));
    // this.sat = floor(map(this.vel.x,.1,this.maxspeed-5,20,60));
    // this.light = floor(map(this.vel.x,.001,.1,100,50));


    // if (this.h < 0){
    //   this.h = 0;
    // }
    // if (this.sat < 70){
    //   this.sat = 20;
    // }
    // if (this.light > 50){
    //   this.light = 20;
    // }
    if (this.opa < 0){
      this.opa = 160;
    }
    this.acc.mult(0);

  }

  this.show = function(){
    push();
    var c = color(0);
    stroke(c,this.opa);
    strokeWeight(this.r);
    point(this.pos.x,this.pos.y);
    strokeWeight(0.25)
    stroke(0,80);
  line(this.pos.x,this.pos.y,396,211);
    //   line(this.pos.x,this.pos.y,0,0)
    //   line(this.pos.x,this.pos.y,width,height)
    //   line(this.pos.x,this.pos.y,width,0)
    // line(this.pos.x,this.pos.y,0,height)
    pop();
  }


  this.arrive = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if ( d < 100){
      speed = map(d, 0, 100,0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  this.flee = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50){
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0,0);
    }
  }

}var t;
let t1="PRODUCT DESIGNER".split('')
let t2="CREATIVE CODER".split('')
let t3="ART DIRECTOR".split('')
let t1t="";
t1l=0;
let t2t="";
t2l=0;
let t3t="";
t3l=0;

function setup() {
	createCanvas(1000,96);
  t = createElement("h1","")
  t.style("text-align","center");
  t.style("font-kerning","2px")

}

function draw() {
  // background(200)
  clear()
if (t1l<t1.length){
   t1t=t1t+t1[t1l];
	 t1l++;
}

  
  setTimeout(function(){
	if (t2l<t2.length&&t1l>=t1.length){
   t2t=t2t+t2[t2l];
	 t2l++;
}

}, 1200); 
  
  setTimeout(function(){
  if (t3l<t3.length&&t2l>=t2.length){
   t3t=t3t+t3[t3l];
	 t3l++;
}
  
  }, 2400); 
  
   t.html("< "+" "+t1t+" / "+t2t+" / "+t3t+" >")
  
  if (t3l>=t3.length){
    noLoop()
  }

  frameRate(20);
}
let x = 0
let y = 0
let x2 = 0
let y2 = 0

function setup() {
  createCanvas(640, 420);
  background(0);
}

function draw() {

  fill(random(0, 235));
  noStroke();

  //draw
  if (random(1) > 0.7) {
      fill(random(0, 235))
    	rect(x, y, random(15, 60), 10)
      fill(0)
    	rect(x, y, random(0,5), 10);
  } else if (random(1) > 0.7) {
          fill(random(0, 235))
    			rect(x, y, random(0, 5), 10);
          fill(0)
    			rect(x, y, 1, 10);
  } else {
    fill(random(0, 235))
    rect(x, y, 1, 10);
  }

  x += 20;

  //change row
  if (x > width) {
    x = 0;
    y += 30;
  }

  //end of draw
  if (y > height - 10) {
    erase();
  }
  
  //end of erase
  if (y2 > height) {
    rerun();
  }
}

function erase() {
  fill(0)
  rect(x2, y2, 40, 10);
  x2 += 40;
  if (x2 > width) {
    x2 = 0;
    y2 += 30;
  }
}

function rerun() {
    x = 0;
    x2 = 0
    y2 = 0
    y = 0;
}var input;
var nameP;
let numberClicked = 0;
let x = 100
let y = 100
let cx = 0
let cy = 0
let ballColor = 0
let w=50
let h=50
let hiSpeed=0
let speed=0




function setup() {

  h3 = createElement('h3',"")
  canvas = createCanvas(600, 600);
  h1 = createElement('h1', 'A Brutalistish Website');

  cta = createButton('Change Color');
  cta.position(150, 400)
  cta.mousePressed(changeColor);
  cta.id("ctastyle")
  
  q = createP("Comment tu t'appelles?")
  q.style("background-color", "black");
  q.style("color", "white");
  q.style("padding", "1em 2em");
  q.position(20, 460);
  
  input = createInput("S*J*");
  input.position(20, 540)
  input.changed(showHi)

	textSize(width / 4);
  textAlign(CENTER, CENTER);
  
  // loadStrings("lines.text", doText);
  
}


function draw() {
  //canvas
  clear();

  canvas.position(0, 100)


  //hi
  hi = text("Hi",800-hiSpeed,70)
	hiSpeed+=speed
  q.mouseOver(qHover)
  q.mouseOut(qReverse)

	//ball
  fill(ballColor);
  noStroke()
  // background(220);
  ellipse(x + 60 + random(-10, 10), y, w, h);
  if (x < 100 && x > 10) {
    x = x + random(-2, 3);
  } else if (x < 390 && x >= 300) {
    x = x + random(-3, 2);
  } else {
    x = x + random(-3, 3)
  }

  h1.position(x, y + 130);
  
  nameP = (input.value());
  h3.html("Bonjour, je m'appelle " + nameP + ".")
  
    
 //  //drawtext
 // for (let i=0;i < lines.length; i++){
 // console.log(lines[i]);
   // text(lines[i],5,20*i+20);}
    
  
  frameRate(15)

}


function showHi(){
speed=30
}

function doText(data){
lines=data;
 
}

function changeColor() {
  ballColor = color(random(0, 100), random(0, 200), random(0, 200));
}

function qHover(){
  q.style("background-color", "white");
  q.style("color", "black");
  q.style("padding", "1em 2em");
  q.style("outline", "black solid 2px");
}


function qReverse(){
  q.style("background-color", "black");
  q.style("color", "white");
  q.style("padding", "1em 2em");
  q.style("outline", "black solid 2px");
}


var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14401';//change portName
var inData;

let x;
let y;
let d;
let r;
let a = 100;
let b = [];

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}


function setup() {

  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }

    createCanvas(512, 512);
  for (let x = 8; x < width; x += 16) {
    for (let y = 8; y < height; y += 16) {
      d = 16;
      a = 100;
      ball = new Ball(x, y, d, a, false);
      b.push(ball);
    }
  }
}
}

function serialEvent() {
  inData = Number(serial.read());
  print(inData);
  Number(serial.write()) = outData;
  print(outData)
}

function draw() {
  // background(220);
  // cData = map (inData, 0,255,50,300);
  // ellipse(200, 200, cData, cData);
    background(220);

  noStroke();
  fill(0, a);

  px = mouseX;
  py = mouseY;

  for (i = 0; i < b.length; i++) {
    b[i].show();
    b[i].hover();
    b[i].highlight();
  }
}

class Ball {

  constructor(x, y, d, a, state) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.a = a;
    r = this.d / 2;
    this.state = false;
  }

  show() {
    fill(0, this.a);
    ellipse(this.x, this.y, this.d);
  }

  hover() {
    this.state = (px < this.x + r && px > this.x - r && py < this.y + r && py > this.y - r);
    return this.state;
  }

  highlight() {
    // print(this.state)
    if (this.state === true && mouseIsPressed) {
      this.a = 200;
      outData = (b[i].x,b[i].y)
     
    }
  }
}var slider;
let b = [];
let px;
let py;
var planetImgs = [];
let galaxies;
let g = [];
var numG = 4;

function preload() {
  for (let i = 1; i <= 13; i++) {
    planetImgs.push(loadImage('planet-' + i + '.png'));
  }
}

function setup() {
  createCanvas(600, 600);
  //set up slider
  slider = createSlider(1, 12, 4);
  slider.position(10, 10);
  slider.style('width', '80px');

  for (let i = 0; i < numG; i++) {

    x = random(60, 580);
    y = random(60, 580);
    n = random(5, 13);
    r = random(80, 100);
    m = random(0.7, 1.3);
    s = floor(random(0, planetImgs.length))

    galaxies = new Galaxy(x, y, n, r, m, s)

    g.push(galaxies);
 
    //check if galaxies overlap, if yes re-setup the galaxy
    if (i > 0) {
      for (let j = 0; j < g.length-1; j++) {
        print(i, j)
        
        if(g[i].intersects(g[j])){
        	print('intersects')
        }
    						while (g[i].intersects(g[j])) {
    						g[i].x = random(60, 480);
    						g[i].y = random(60, 480);
    						g[i].r = random(80, 100);
    						g[i].n = random(5, 13);
    						g[i].m = random(0.7, 1.3);
    						g[i].s = floor(random(0, planetImgs.length))
    						}
        g[i].make()
      }
      
    }
  }
  
}

function draw() {

  //background columns
  createBackground();
  //speed control slider
  speedControl = slider.value();
  
  for (let i = 0; i < g.length; i++) {

    g[i].show();
    fill(255,0,0)
    text(""+g[i].r*g[i].m,g[i].x,g[i].y)
  }
}let r;

function setup() {
  createCanvas(400, 400);
  r = 90;
}

function draw() {
  background(0);

  let cx;
  let cy;
  let x = 13;

  var d;

  //background circles

  for (cx = 7.5; cx < width; cx += 16) {
    for (cy = 7.5; cy < height; cy += 16) {


      let d = dist(mouseX, mouseY, cx, cy);
      c1 = map(d, 0, r, 0, 230);
      c2 = map(d, r, 0, 0, 230);

      c = c2;

      if (mouseIsPressed && r < 280) {
        r = r + 0.006;
      } else if (r > 90) {
        r = r - 0.004;
      }

      if (d < 10) {
        fill(c);
        ellipse(cx, cy, 6);
      } else if (d < 20) {
        fill(c);
        ellipse(cx, cy, 7);
      } else if (d < 30) {
        fill(c);
        ellipse(cx, cy, 8);
      } else if (d < 40) {
        fill(c);
        ellipse(cx, cy, 9);
      } else if (d < 55) {
        fill(c);
        ellipse(cx, cy, 10);
      } else if (d < 75) {
        fill(c);
        ellipse(cx, cy, 11);
      } else if (d < r) {
        fill(c);
        ellipse(cx, cy, 12);
      } else {
        fill(c);

        ellipse(cx, cy, x);
      }

    }
  }
}  var circB;
  var circS;
  var t1;
  var q1;
  let innerCursSize;
  let cursorSpeed;
  let cornerCircle;
  let bgLine;

  function setup() {
    createCanvas(500, 490);

    innerCursSize = 20,
      cursorSpeed = 0.4

    circB = {
      s: PI,
      e: PI + HALF_PI,
    };

    circS = {
      s: QUARTER_PI,
      e: PI + HALF_PI,
    };

    t1 = {
      x1: 90,
      y1: 430,
      x2: 260,
      y2: 290,
      x3: 400,
      y3: 90,
      speed1: 3,
      speed2: 1,
      speed3: 2,
    }

    cornerCircle = {
      circ: 155,
      speed: 1,
    }

    q1 = {
      x3: random(200, 300),
      y3: random(300, 400),

    };

    bgLine = {
      x1: 0,
      y1: 420,
      x2: 350,
      y2: 500,
    }

  }

  function draw() {
    background(244);
    // Pick colors randomly
    r = random(100, 150);
    g = random(120);
    b = random(80);
    a = random(50, 100);

    var sigYellow = color(210, 159, 2);
    let sigRed = color(200, 50, 50);

    rectMode(CENTER);

    //BG Pattern

    noStroke();
    fill(235, 200); //top-left
    quad(0, 0, 265, 50, q1.x3, q1.y3, 20, 260);
    noStroke();
    fill(235, 200); //lower-right
    quad(200, 200, 430, 175, 380, 460, 220, 660);
    fill(235, 200);
    triangle(30, 350, 10, 550, 150, 470);
    stroke(236);


    noStroke();

    fill(235);
    ellipse(480, 20, 300, 300);

    strokeWeight(4);
    stroke(245);
    fill(230);
  
    //corncer circle
    noStroke();
    fill(240);
    ellipse(480, 20, cornerCircle.circ, cornerCircle.circ);
    cornerCircle.circ = cornerCircle.circ + cornerCircle.speed

    if (cornerCircle.circ > 230 || cornerCircle.circ < 100) {
      cornerCircle.speed = cornerCircle.speed * -1
    };

    strokeCap(ROUND);

    stroke(206, 157, 5);
    strokeWeight(2);
    fill(sigYellow);
    rect(250, 250, 205, 290, 55, 22, 94, 19);


    //Left Eye
    noStroke();
    fill(10, 10, 10);
    ellipse(180, 220, 180, 10);

    //Right Eye
    stroke(sigRed);
    strokeWeight(6);
    noFill();
    ellipse(340, 180, 80, 80);

    //Moles
    strokeWeight(5);
    stroke(60, 60, 60);
    point(200, 270);
    strokeWeight(3);
    stroke(40, 40, 40);
    point(330, 242);

    //Nose
    noStroke();
    fill(20, 20, 20);


    //Mouth
    fill(32, 84, 41);
    noStroke();
    noFill();
    stroke(50, 80, 50);
    strokeWeight(3);
    curve(101, 220, 101, 320, 220, 350, 550, 350)
    strokeWeight(8);


    strokeCap(SQUARE);
    stroke(60, 90, 90);
    strokeWeight(12); //cursorB
    arc(76, 288, 70, 70, circB.s, circB.e);
    strokeWeight(2); //cursorS
    arc(76, 288, 80, 80, circS.s, circS.e);

    circB.s = circB.s + PI / 120;
    circB.e = circB.e + PI / 120;
    circS.s = circS.s + PI / 50;
    circS.e = circS.e + PI / 50;

    //Cursor

    noFill();
    strokeCap(SQUARE);
    stroke(sigYellow, 220);
    strokeWeight(3); //cursorB

    ellipse(pmouseX, pmouseY, 40, 40);

    fill(200, 50, 50, 220);
    noStroke();
    ellipse(pmouseX, pmouseY, innerCursSize, innerCursSize);

    innerCursSize = innerCursSize + cursorSpeed;
    if (innerCursSize > 32 || innerCursSize < 5) {
      cursorSpeed = cursorSpeed * -1;
    }
    frameRate(60)

  }