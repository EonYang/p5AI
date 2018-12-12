var portName = '/dev/cu.usbmodem145201';
var threshold = 0; // Use the same sensor threshold value in Arduino

var phoneOn = false;
var guys = [];
var time = 0;
var inData = 0;
var serial;
var bgTransition = 0;

function setup() {
  
  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.open(portName);

  // 颜色可调
  backgroundColorOff = 255;
  backgroundColorOn = 0;
  guysColor = 0;//小人黑色
  auraColorOff = color(219,35,89);//光环绿色 62, 242, 20 191,4,68
  auraColorOn = color(110,117, 251);//光环红色
  phoneColor = 0;
  phoneHomeButtonColor = 255;
  borderColorOff = color(223,914,158);//边框绿色 0, 255, 0
  borderColorOn = color(207, 227, 253);//边框红色
  phoneX = 650; //手机位置
  phoneY = 15;
  phoneW = 200;
  phoneH = 370;

  // new Guy(index, x位置, Y位置不能一样, 小人大小, 光环大小, 小人底色黑色)
  guy0 = new Guy(0, 350, 150, 180, 300, guysColor);
  guy1 = new Guy(1, 520, 375, 180, 300, guysColor);
  guy2 = new Guy(2, 750, 550, 180, 300, guysColor);
  guy3 = new Guy(3, 970, 374.9, 180, 300, guysColor);
  guy4 = new Guy(4, 1150, 149.9, 180, 300, guysColor);

  guys[0] = guy0;
  guys[1] = guy1;
  guys[2] = guy2;
  guys[3] = guy3;
  guys[4] = guy4;
  for (var i = 5; i < 10; i++) {
    guy = new Guy(i, phoneX + phoneW / 2, phoneY + phoneH / 2, guysColor);
    guys[i] = guy;
  }

  pixelDensity(1.0);
  createCanvas(2000, 2000);
}

function serialEvent() {
  inData = Number(serial.read());
  if (inData > threshold) {
    phoneOn = true;
  } else {
    phoneOn = false;
  }
}

// debug use only
function mousePressed() {
  phoneOn = !phoneOn;
}

function draw() {
  time++;
  normTime = time / 40 % (2 * PI);

  if (!phoneOn) {
    bgTransition = lerp (bgTransition, backgroundColorOff, 0.05);//off background change speed 
	} else {
    bgTransition = lerp (bgTransition, backgroundColorOn, 0.05);//on background change speed
  }
  background(bgTransition);

  if (!phoneOn) {
    for (var i = 0; i < 5; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 5; i++) {
      guys[i].display();
    }
  } else {
    for (var i = 0; i < 10; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 10; i++) {
      guys[i].display();
    }
  }

  // 画手机
  if (!phoneOn) {
    stroke(borderColorOff);
  } else {
    stroke(borderColorOn);
  }
  strokeWeight(5);
  fill(phoneColor);
  rect(phoneX, phoneY, phoneW, phoneH, 20);
  if (!phoneOn) {
    noStroke();
    fill(phoneHomeButtonColor);
    ellipse(phoneX + phoneW / 2, phoneY + phoneW / 5, 20);
  }

  // loadPixels();
  // for (var x = 0; x < width; x++) {
  //   for (var y = 0; y < height; y++) {
  //     var index = x + y * width;
  //     var R = 0;
  //     var G = 0;
  //     var B = 0;
  //     for (var g = 0; g < 5; g++) {
  //       var d = dist(x, y, guys[g].bubble.x, guys[g].bubble.y);
  //       R += 100 * guys[g].color.r / d;
  //       G += 100 * guys[g].color.g / d;
  //       B += 100 * guys[g].color.b / d;
  //     }
  //     pixels[index] = color(R, G, B);
  //   }
  // }
  // updatePixels();
}

class Guy {

  constructor(i, x, y, s, as, c) {
    this.index = i;
    this.x = x;
    this.y = y;
    this.size = s;
    this.auraSize = as;
    this.hasBubble = false;
    this.bubble = null;
    this.auras = [];
  }

  //画小人
  display() {
    strokeWeight(5);
    if (!phoneOn) {
      stroke(borderColorOff);
    } else {
      stroke(borderColorOn);
    }
    fill(0);
    ellipse(this.x, this.y, this.size);
  }

  //画BUBBLE
  displayBubble() {

    if (!phoneOn) {
      var randomTarget = random([0, 1, 2, 3, 4]);
      while (randomTarget == this.index) {
        randomTarget = random([0, 1, 2, 3, 4]);
      }
      if (!this.hasBubble) {
        this.bubble = new Bubble(20,//小球大小
          this.index,
          randomTarget,
          random(1, 5),
          time);
        this.hasBubble = true;

        this.addAura(0, this.x, this.y, this.auraSize, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.2);
      }//光环大小
      
    } else {
      var randomTargetGuys = random([0, 1, 2, 3, 4]);
      while (randomTargetGuys == this.index) {
        randomTargetGuys = random([0, 1, 2, 3, 4]);
      }
      var randomTargetPhone = random([5, 6, 7, 8, 9]);
      while (randomTargetPhone == this.index) {
        randomTargetPhone = random([5, 6, 7, 8, 9]);
      }
      if (!this.hasBubble) {
        if (this.index < 5) {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetPhone,
            random(1, 5),
            time);
          this.hasBubble = true;
        } else {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetGuys,
            random(1, 5),
            time);
          this.hasBubble = true;
        }
        this.addAura(0, this.x, this.y, this.auraSize, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.2);
      }//光环大小 在最开始调节
    }

    this.bubble.display();

    for (var i = 0; i < this.auras.length; i++) {
      if (this.auras[i].currentPhaseTime < 0.6* PI) {
        this.auras[i].display();
      } else {
        this.auras.splice(i, 1);
        i--;
      }
    }
  }

  addAura(i, x, y, s, r, g, b) {
    var newAura = new Aura(x, y, s, r, g, b);
    this.auras[i] = newAura;
  }
}

class Aura {

  constructor(x, y, s, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.r = r;
    this.g = g;
    this.b = b;
    this.startTime = normTime;
    this.currentPhaseTime = normTime;
  }

  display() {
    this.currentPhaseTime = normTime - this.startTime;
    if (this.currentPhaseTime < 0.5 * PI) {
      noStroke();
      var transColor = color(this.r, this.g, this.b, 255 * (1 + sin(this.currentPhaseTime + PI)));
      fill(transColor);
      ellipse(this.x, this.y, this.size * sin(this.currentPhaseTime));
    }
  }
}

class Bubble {

  constructor(s, si, ei, sp, t) {
    this.size = s;
    this.startGuyIndex = si;
    this.endGuyIndex = ei;
    this.speed = sp;
    this.initTime = t;
    this.vibration = 0;//random (0, 1); 泡泡振动 

    var targetDistance = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y);
    this.speedX = (guys[this.endGuyIndex].x - guys[this.startGuyIndex].x) / targetDistance;
    this.speedY = (guys[this.endGuyIndex].y - guys[this.startGuyIndex].y) / targetDistance;

    this.x = 0;
    this.y = 0;
    this.particle = null;
  }

  display() {

    noStroke();
    if (!phoneOn) {
      fill(borderColorOff);
    } else {
      fill(borderColorOn);
    }
    var targetTime = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y) / this.speed;
    this.x = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].x,
      guys[this.endGuyIndex].x) + 5 * sin(time * this.vibration);
    this.y = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].y) + 5 * sin(time * this.vibration);
    // this.particle = new ParticleSystem(createVector(this.x, this.y), 
    //   																 createVector(this.speedX, this.speedY));
    // this.particle.addParticle();
    // this.particle.run();
    ellipse(this.x, this.y, this.size);
    var distance = dist(this.x, this.y, guys[this.endGuyIndex].x, guys[this.endGuyIndex].y);
    if (distance < this.size) {
      guys[this.startGuyIndex].hasBubble = false;
    }
  }
}


// function ha(n) {
//   return sin(n) * 758.5453 % 1;
// }

// function mod289(x) {
//   return x.sub(three.Vector3.floor(three.Vector3.multiplyScalar(x, 1.0 / 289.0) * 289.0));
// }

// function mod289(x) {
//   return x.sub(three.Vector4.floor(three.Vector4.multiplyScalar(x, 1.0 / 289.0) * 289.0));
// }

// function permutex(x) {
//   return mod289(three.Vector4.multiply(x, three.Vector4.addScalar(three.Vector4.multiplyScalar(x, 34.0)+1.0)));
// }

// function taylorInvSqrt(r) {
//   return three.Vector4.addScalar(three.Vector4.multiplyScalar(r, -0.85373472095314), 1.79284291400159);
// }

// function snoise(vec3 v) { 
//   var C = three.Vector2(1.0/6.0, 1.0/3.0) ;
//   var D = three.Vector4(0.0, 0.5, 1.0, 2.0);

//   THREE.Vector3.
//   i = three.Vector3.floor(v + p5.Vector3.dot(v, C.yyy) );
//   vec3 x0 =   v - i + dot(i, C.xxx) ;

//   vec3 g = step(x0.yzx, x0.xyz);
//   vec3 l = 1.0 - g;
//   vec3 i1 = min( g.xyz, l.zxy );
//   vec3 i2 = max( g.xyz, l.zxy );

//   //   x0 = x0 - 0.0 + 0.0 * C.xxx;
//   //   x1 = x0 - i1  + 1.0 * C.xxx;
//   //   x2 = x0 - i2  + 2.0 * C.xxx;
//   //   x3 = x0 - 1.0 + 3.0 * C.xxx;
//   vec3 x1 = x0 - i1 + C.xxx;
//   vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
//   vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// // Permutations
//   i = mod289(i); 
//   vec4 p = permute( permute( permute( 
//              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
//            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
//            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// // Gradients: 7x7 points over a square, mapped onto an octahedron.
// // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
//   float n_ = 0.142857142857; // 1.0/7.0
//   vec3  ns = n_ * D.wyz - D.xzx;

//   vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

//   vec4 x_ = floor(j * ns.z);
//   vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

//   vec4 x = x_ *ns.x + ns.yyyy;
//   vec4 y = y_ *ns.x + ns.yyyy;
//   vec4 h = 1.0 - abs(x) - abs(y);

//   vec4 b0 = vec4( x.xy, y.xy );
//   vec4 b1 = vec4( x.zw, y.zw );

//   //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
//   //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
//   vec4 s0 = floor(b0)*2.0 + 1.0;
//   vec4 s1 = floor(b1)*2.0 + 1.0;
//   vec4 sh = -step(h, vec4(0.0));

//   vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
//   vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

//   vec3 p0 = vec3(a0.xy,h.x);
//   vec3 p1 = vec3(a0.zw,h.y);
//   vec3 p2 = vec3(a1.xy,h.z);
//   vec3 p3 = vec3(a1.zw,h.w);

// //normalise gradients
//   vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
//   p0 *= norm.x;
//   p1 *= norm.y;
//   p2 *= norm.z;
//   p3 *= norm.w;

// // Mix final noise value
//   vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//   m = m * m;
//   return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
//                                 dot(p2,x2), dot(p3,x3) ) );
//   }
// float no( in vec3 x )
// {    vec3 p = floor(x);    vec3 f = fract(x); 
//     float n = p.x + p.y*57.0 + p.z*800.0;float res = mix(mix(mix( ha(n+  0.0), ha(n+  1.0),f.x), mix( ha(n+ 57.0), ha(n+ 58.0),f.x),f.y),
//     mix(mix( ha(n+800.0), ha(n+801.0),f.x), mix( ha(n+857.0), ha(n+858.0),f.x),f.y),f.z);
//     return res;}

// float fb(vec3 p){
//     float v = 1.0;
//     float w = 1.0;
//     float a = 5.0;
//     for(int i=0;i<5;i++){
//         v += a * (snoise(p) * 0.5 + 0.5);
//         w += a;
//         p *= 4.0;
//         a *= 0.7;
//     }
//     return smoothstep(0.1, 1.0, v / w);
// }

// vec3 colo = vec3(1.0);

// float f(vec3 p){
//     float a = snoise(p * 1.06 + time * 0.05);
//     colo = mix(vec3(a, -2, a), vec3(0, a, 1.0), a * a + 0.5);
//     colo = mix(colo, vec3(a, 0, a*a), pow(a * a + 0.5, 5.0));
//     return fb(p + a);
// }

// void main( void ) {

// vec2  surfacePos = (gl_FragCoord.xy - resolution.xy*.5) / resolution.y;
//     vec2 position = ( surfacePos ) * 2.0;

//     float z = f(vec3(position, 1));
//     gl_FragColor = vec4(colo * z, 1.0);

// }
var t;
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
// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

var blobs = [];
var count;
function setup() {
    createCanvas(400, 400);
    // colorMode(HSB);
    // for(i=0; i<5; i++) blobs.push(new Blob(random(0, width), random(0, height),frameCount+10));
    }

function draw() {
//frameCount/10
count=frameCount;
  if(blobs.length<=20){
  if(random(1)>0.6){ //主要的控制参数
  blobs.push(new Blob(random(0, width), random(0, height),count));
}
}else{
for(i=0;i<blobs.length;i++){
  blobs[i].r=count/2;

}
}//控制增长
  // if(frameCount>21){
  //   blobs.splice(0,1);//如何控制数量的增长
  // }

    // background(0);
    // console.log(frameCount);
    console.log(blobs.length);
    loadPixels();
    for(x=0; x<width; x++) {
        for(y=0; y<height; y++) {//hit every single pixel
            let sum = 150;
            for(i=0; i<blobs.length; i++) {
                let xdif = x-blobs[i].x;
                let ydif = y-blobs[i].y;
                let d = sqrt((xdif*xdif) + (ydif*ydif));
                sum += 10 * blobs[i].r/d;
            }
            set(x, y, color(sum, 170, 200)); // color change a little bit change through time
        }
    }
    updatePixels();

    for(i=0; i<blobs.length; i++) {
        blobs[i].update();
    }
}
// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

var blobs = []

function setup() {
    createCanvas(400, 200);
    // colorMode(HSB);
    for(i=0; i<10; i++) blobs.push(new Blob(random(0, width), random(0, height)));
}

function draw() {
    background(51);

    loadPixels();
    for(x=0; x<width; x++) {
        for(y=0; y<height; y++) {//hit every single pixel
            let sum = 0; 
            for(i=0; i<blobs.length; i++) {
                let xdif = x-blobs[i].x;
                let ydif = y-blobs[i].y;
                let d = sqrt((xdif*xdif) + (ydif*ydif));
                sum += 10 * blobs[i].r/d;
            }
            set(x, y, color(sum, 130, 160)); // color change a little bit change through time
        }
    }
    updatePixels();

    for(i=0; i<blobs.length; i++) {
        blobs[i].update();
    }
}

// increase in numbers of points and sizes over time till pink 

var blobs = [];
var time=0;



function setup() {
    createCanvas(400, 400);
    // colorMode(HSB);

  for(time=0;time<5;time++){
      for(i=0; i<time; i++) blobs.push(new Blob(random(0, width), random(0, height)));
  }
}

function draw() {
    background(51);

    loadPixels();
    for(x=0; x<width; x++) {
        for(y=0; y<height; y++) {//hit every single pixel
            let sum = 0; 
            for(i=0; i<blobs.length; i++) {
                let xdif = x-blobs[i].x;
                let ydif = y-blobs[i].y;
                let d = sqrt((xdif*xdif) + (ydif*ydif));
                sum += 10 * blobs[i].r/d;
            }
            set(x, y, color(sum, 130, 160)); // how to make color change a little bit change through time
        }
    }
    updatePixels();

    for(i=0; i<blobs.length; i++) {
        blobs[i].update();
    }
}// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  // Hide the video element, and just show the canvas
  video.hide();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
}

function modelReady() {
  select('#status').html('Model Loaded');
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
     
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    console.log(skeleton);
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
var song;
var fft;
var button;
var w;

var volhistory = [];

function toggleSong() {
	if (song.isPlaying()) {
		song.pause();
	} else {
		song.play();
	}
}

function preload() {
		song = loadSound('M^Ji3C^L.mp3');
}	
function setup() { 
  createCanvas(400, 400);
	angleMode(DEGREES);
	button = createButton('toggle');
	button.mousePressed(toggleSong);
	song.play();
	fft = new p5.FFT(0.9, 64);
	w = width / 64;
} 


function draw() { 
  background(0);
	var spectrum = fft.analyze();
	stroke(255);
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var y = map(amp, 0, 255, height, 0);
    fill(i, 0, 0);
    rect(i * w, y, i * w - 4,height - y);
  }                      
  console.log(spectrum.length);
	stroke(255);
	noFill();
}var vid;
var pixles;
var conj = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', ' x', 'y', 'z']

function preload() {
  vid = createVideo('NYC timelapes.mp4');
  vid.hide();
}

function setup() {
  createCanvas(640, 360);
  vid.loop();
  frameRate(8);
}

function draw() {
  background(100,80);
  // copy(vid, 0, 0, width, height, 0, 0, 720, 540);
 

  var c = get();
  vid.loadPixels();
  for (let y = 0; y < 360; y += 10) {
    for (let x = 0; x < 640; x += 10) {
      var index = (x + y * 640) * 4
      var t = conj.length
      t = floor(random(t));
      pixels[index + 0] = vid.pixels[index + 0];
      pixels[index + 1] = vid.pixels[index + 1];
      pixels[index + 2] = vid.pixels[index + 2];
      pixels[index + 3] = vid.pixels[index + 3];
      fill(pixels[index + 0], pixels[index + 1], pixels[index + 2])
      // rect(x,y,20,20);
      text(conj[t], x, y + 10);
    }
  }


}let osc;
let fft;
let mic;

function setup(){
createCanvas(400,400);
  
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(440);
  
  fft = new p5.FFT();
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);
  
}
function draw(){
background(220);
  
  let freq = map(mouseX,0,width,440,880);
  osc.freq(freq);
  text(freq,width/2,100);
  
}// The midi notes of a scale
var notes = [60, 62, 64, 65, 67, 69, 71];
// For automatically playing the song
var index = 0;
var trigger = 0;
var osc;
let images = []
let pics =[];
let imgH1;
let key;
let notePlay = false


function preload(){
  
  for(let i = 0; i < 6; i++) {
  pics.push(loadImage('assets/' + i + '.jpg'));
  }
  
	imgH1 = loadImage('assets/1818.png');
  imgH2 = loadImage("assets/1860.png");
  imgH3 = loadImage("assets/1869.png");
  imgH4 = loadImage("assets/1870.png");
  imgH5 = loadImage("assets/1890.png");
  imgH6 = loadImage("assets/1960.png");
  imgH7 = loadImage("assets/1970.png");
}


function setup() {
  createCanvas(800, 550);
  background(123)
  images = [imgH1,imgH2,imgH3,imgH4,imgH5,imgH6,imgH7];
  
  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
  
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(2, 0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0, 0.2);
    }, duration - 50);
  }
}

function draw() {
  // Draw a keyboard
  // The width for each key
  var w = width / notes.length;
  for (var i = 0; i < notes.length; i++) {
    var x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY > (height - 1)/5*4) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(255, 100, 100);
        // Or just rolling over
      } else {
        fill(127);
      }
    } else {
      fill(200);
    }
    // Draw the key
    rect(x, height-(w-1), w - 1, (height - 1)/3);
  }

    // image(imgH1,15,450,80,80);
  
  for ( let i=0; i<images.length; i++){
    let picx = i * w+w/10;
    let picy = height-(w-1);
   image(images[i],picx,picy,width/9,width/9);
  }
  let px = 0;
  let py = 0;
  
  // if (playNote(notes[key])) {notePlay = true}
  // if (notePlay = true) {image(pics[key],px,py,50,50)}
  
  // image(pics[key],px,py,50,50);

  
}

// When we click
function mousePressed() {
  // Map mouse to the key index
  key = floor(map(mouseX, 0, width, 0, notes.length));
  playNote(notes[key]);
  image(pics[key],0,0,50,50);
  
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0, 0.5);
}var video;

var vScale = 16;
var slider;

var cols = 40;
var rows = 30;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);

  video.size(cols, rows);
  // video.size(320,240);
  slider = createSlider(0, 255, 77)

  //music

  song = loadSound("file.mp3",loaded);
  amp = new p5.Amplitude();

}

function loaded() {
  button = createButton("play");
  button.position(19, 650);
  button.mousePressed(togglePlaying);
  console.log("loaded")
}



function draw() {
  background(185,206,235,60);
  video.loadPixels();
  loadPixels();


  for (var y = 0; y < video.height; y++) { //noprotect
    for (var x = 0; x < video.width; x++) {
      // var index = (x + y * video.width) * 4;
      var index = (video.width - x - 1 + y * video.width) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var bright = (r + g + b) / 3;

      var threshold = slider.value();
      if (bright > threshold) {

        fill(r,g,b);

      } else {
        fill(100)
      }
      var vol = amp.getLevel();
      // console.log(vol)
      var wvol = map(bright, 0, 255, 0, vol) // dark pixel be small rec white be large rect

      // fill(bright);
      noStroke();
      ellipse(random(x * vScale-vScale,x * vScale), random(y * vScale-vScale,y * vScale), 100*wvol, 100*wvol);
      //how to create a water ripple effect
      ellipseMode(CENTER);

      //REVERSE  w-x-1=video.width


      // pixels[index + 0] = bright;
      // pixels[index + 1] = bright;
      // pixels[index + 2] = bright;
      // pixels[index + 3] = 255;
    }
  }

  // updatePixels();
}

function togglePlaying() {
  if (!song.isPlaying()) {

    song.play();
    song.setVolume(1);
    button.html("pause");
  } else {
    song.stop();
    button.html("play");
  }

}// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jEwAMgcCgOA

var song;
var amp;
var button;

var volhistory = [];

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('this-dot-kp.mp3');
}

function setup() {
  createCanvas(200, 200);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
  var vol = amp.getLevel();
  volhistory.push(vol);
  stroke(255);
  noFill();
  push();
  var currentY = map(vol, 0, 1, height, 0);
  translate(0, height / 2 - currentY);
  beginShape();
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 1, height, 0);
    vertex(i, y);
  }
  endShape();
  pop();
  if (volhistory.length > width - 50) {
    volhistory.splice(0, 1);
  }

  stroke(255, 0, 0);
  line(volhistory.length, 0, volhistory.length, height);
  //ellipse(100, 100, 200, vol * 200);
}var video;

function setup() {
  canvas = createCanvas(640, 480,WEBGL);
  canvas.id('p5canvas')
	canvas.id('p5canvas')
  background(51);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.id('p5video')
  
  var seriously = new Seriously();
  
  var scr = seriously.source('#p5video') //selecting id
	var target=seriously.target('#p5canvas')
  
  var chroma = seriously.effect('chroma');
  chroma.source = src;
  target.source = chroma;
  
  seriouly.go()
  
}
var video;
var vScale = 16;
var particles =[];


function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  for(var i=0;i<250;i++){
  particles[i] = new Particle(320, 240);
  }
  background(51);
}

function draw() {
  video.loadPixels();
  for(var i=0;i<particles.length;i++){
  particles[i].update();
  particles[i].show();}
}var song;
var button;
var jumpButton;

function setup() {
  createCanvas(200, 200);
  song = loadSound("file.mp3", loaded);
  button = createButton("play");
  button.mousePressed(togglePlaying);
 	jumpButton=createButton("jump");
  jumpButton.mousePressed(jumpSong);
  background(51);

}

function loaded(){
console.log("loaded")
  
}

function jumpSong(){
var len = song.duration();
  song.jump(random(len));
  

}

function togglePlaying() {

  if (!song.isPlaying()) { //!!!!
    song.play();
    song.setVolume(0.3);
    button.html("pause")
  }
  else{
  song.pause();
    button.html("play")
  }
}var song;
var button;

function setup() {
  createCanvas(200, 200);
  song = loadSound("file.mp3", loaded);
  button = createButton("play");
  button.mousePressed(togglePlaying);
  song.setVolume(0.3);
  background(51);

}

function loaded() {
  console.log("loaded");
}

function togglePlaying() {

  if (!song.isPlaying()) { //!!!!
    song.play();
    song.setVolume(0.3);
    button.html("pause")
  }
  else{
  song.pause();
    button.html("play")
  }
  //only if it's not playing, play the song.
}
//using a call back for loading??var song;
var sliderVolume;
var sliderRate;
var sliderPan;

// function preload(){
// song=loadSound("file.mp3")
// }

function setup() {  
  createCanvas(200, 200);
  song=loadSound("file.mp3")
   sliderRate=createSlider(0,1.0,0.5,0.01);
   sliderPan=createSlider(0,1.0,0.5,0.01);

}

function loaded(){
  song.play();
}
//using a call back for loading??


function draw() {
  background(random(255));
  
  song.pan(sliderPan.value());//left ear or right
  
  song.rate(sliderRate.value());//
}var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
// var cityname;
var apikey = '&appid=626e34c1366f366d03e92c75dbc9be98';
// var units = '&units=';

var tianqi;
 var temp=[];
function preload() {
  Sunny = loadImage("sunny.png");
  Rainy = loadImage("rainy.png");
  Snow = loadImage("snow.png");
  Stormy = loadImage("stormy.png");

}


function setup() {
  createCanvas(400, 400);
  var button = select('#submit');
  button.mousePressed(getWeather);
  input = select('#city');
  paragraph = createP(temp);
  paragraph.position = (0,600)
}

function getWeather() {
  var url = api + input.value() + apikey;
  loadJSON(url, gotData);
  
}

function gotData(data) {
  print(data); //does this work?
  tianqi = data;
  temp.push(tianqi.main.temp);
}

function draw() {

  background(255);
console.log(temp);
//   if(tianqi){
//   var temppresent = tianqi.main.temp;
//  temp.push(temppresent);
//   

//   }
  
  fill(200,100,100);
  noStroke();
  for(let i=0;i<temp.length;i++){
 rect(30,40+20*i,temp[i],10);
  textSize(32);
text(`${temp[i]}`, 10, 30);
  }
// paragraph = createP(temp);

}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(200);

  let sinVal = sin(radians(frameCount));
  
  
  //ellipse(width / 2, height / 2, sinVal * 50 + 50, sinVal * 50 + 50);
  //print(sinVal);

  // for (let i = 0; i < width; i += 5) {
  //   let y = sin(radians(i + frameCount)) * 50;
  //   ellipse(i, height / 2 + y, 5, 5);
  // }

  let freq = sin(radians(frameCount))*10;
  let speed = 0.5;
  
  // let speed = sin(radians(frameCount))*0.5;
  // let amp = 20;
  let amp=cos(radians(frameCount))*100;
  for (let i = 0; i < width; i += 5) {
    // let y = sin(radians(i + frameCount*speed)*freq) * amp;
        let y = sin(radians(i + frameCount*speed)*freq) * amp;
let absy =abs(y);
    
    let dia = map(y,-amp,amp,10,3);
noStroke();
    ellipse(i, height / 4 + absy, dia, dia);

    ellipse(i, height / 2 + y, 5, 5);
  }

//   for (let i = 0; i < width; i += 5) {
//     let y = sin(radians(i + frameCount * 5)) * 50; //framcount*5, 5 is speed
//     ellipse(i, height / 2 + y, 5, 5);
//   }
  
  line()
}var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
// var cityname;
var apikey = '&appid=626e34c1366f366d03e92c75dbc9be98';
var units = '&units=metric';

var tianqi;

function preload() {
  Sunny = loadImage("sunny.png");
  Rainy = loadImage("rainy.png");
  Snow = loadImage("snow.png");
  Stormy = loadImage("stormy.png");

}


function setup() {
  createCanvas(400, 400);
  var button = select('#submit');
  button.mousePressed(getWeather);
  input = select('#city');
}



var rectArray = []
var xPos = 30;
var yPos = 40;

var rectObj = {
  xPos: 30,
  yPos: 40,
  temp: 280
}


function getWeather() {
  var url = api + input.value() + apikey + units;
  loadJSON(url, gotData);


}

function gotData(data) {
  // print(data); //does this work?
  tianqi = data;
  

  if (tianqi) {
    var temp = tianqi.main.temp;
    
    var mode = tianqi.weather[0].main;
    
    var img;
		if(mode == "Clouds"  ){
       console.log("yay!")
      img = snow;
      
    }
    console.log(mode);
    

    yPos += 40;

    var rectObj = {
      xPos: 30,
      yPos: yPos,
      temp: temp,
      img: img,
    }

    rectArray.push(rectObj);
    console.log(rectArray);

  }
}

function draw() {

  background(255);


  if (tianqi) {
    var temp = tianqi.main.temp;

    // console.log(temp);

  }

  fill(200, 100, 100);
  noStroke();

  for (var i = 0; i < rectArray.length; i++) {

    var rectObj = rectArray[i];
    rect(rectObj.xPos, rectObj.yPos, rectObj.temp, 10)
    text(rectObj.temp, rectObj.xPos + rectObj.temp + 10, rectObj.yPos)
    image(rectObj.img,0,0)
          

  }


  paragraph = createP(temp);

}var video;

var vScale = 16;
var slider;

var cols = 40;
var rows = 30;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);

  video.size(cols, rows);
  // video.size(320,240);
  slider = createSlider(0, 255, 77)
  
  
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var box = createCheckbox();
    box.style('display','inline')
    }
    
  // for (var x = 0; x < 1; x++) {
//     for (var y = 0; y < 3; y++) {
//     createCheckbox();

//       // box.parent('mirror');
      
//       //put the dom element inside the div
//     }
    
    // var linebreak = createDiv('<br/>')
    // linebreak.parent('mirror');
  }
}

function draw() {
  background(51);
  video.loadPixels();
  loadPixels();


  for (var y = 0; y < video.height; y++) { //noprotect
    for (var x = 0; x < video.width; x++) {
      // var index = (x + y * video.width) * 4;
      var index = (video.width - x - 1 + y * video.width) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var bright = (r + g + b) / 3;

      var threshold = slider.value();
      if (bright > threshold) {

        fill(255);

      } else {
        fill(0)
      }

      var w = map(bright, 0, 255, 0, vScale) // dark pixel be small rec white be large rect

      // fill(bright);
      ellipse(x * vScale, y * vScale, w, w);
      ellipseMode(CENTER);

      //REVERSE  w-x-1=video.width



      // pixels[index + 0] = bright;
      // pixels[index + 1] = bright;
      // pixels[index + 2] = bright;
      // pixels[index + 3] = 255;
    }
  }
  // updatePixels();
}let img
let capture;

function preload() {
  // createImg("IMG_3604.jpg")
  // img = createImage(100, 100);
  
  // img = loadImage("https://www.petmd.com/sites/all/modules/breedopedia/images/thumbnails/cat/tn-norwegian-forest-cat.jpg")

}

function setup() {
  createCanvas(320, 240);
  // capture=createCapture(VIDEO);
  // img.loadPixels();

  for(let i =0;i<img.pixels.length;i++){

    if(i%4 ==3) img.pixels[i]=255;
    
         console.log("\t"+img.pixels[i]); 
  }
  img.updatePixels();
  image(img, 0, 0);

}

function draw() {
  background(220);
  
  image(capture,0,0);
}var video11;

var vScale = 16;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video11 = createCapture(VIDEO);
  video11.size(width/vScale, height/vScale);
}

function draw() {
  background(51);

  video11.loadPixels();
  loadPixels();
  for (var y = 0; y < video11.height; y++) {
    for (var x = 0; x < video11.width; x++) {
      var index = (video11.width - x + 1 + (y * video11.width))*4;
      var r = video11.pixels[index+0];
      var g = video11.pixels[index+1];
      var b = video11.pixels[index+2];

      var bright = (r+g+b)/3;

      var w = map(bright, 0, 255, 0, vScale);

      noStroke();
      fill(255);
      rectMode(CENTER);
      rect(x*vScale, y*vScale, w, w);

    }
  }
// video11.updatePixels();
}var video;
var vScale = 16;


function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  // video.size(320,240);
}

function draw() {
  background(51);
	video.loadPixels();
  loadPixels();
  

  for (var y = 0; y < video.height; y++) { //noprotect
    for (var x = 0; x < video.width; x++) {
      // var index = (x + y * video.width) * 4;
      var index = (video.width-x-1+y*video.width)*4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var bright = (r + g + b) / 3;
      
      var w= map(bright,0,255, 0,vScale) // dark pixel be small rec white be large rect
      
      fill(bright);
      ellipse(x * vScale, y * vScale, w, w);
			ellipseMode(CENTER);
      
      //REVERSE  w-x-1=video.width
      


      // pixels[index + 0] = bright;
      // pixels[index + 1] = bright;
      // pixels[index + 2] = bright;
      // pixels[index + 3] = 255;
    }
  }
  // updatePixels();
}var video;
var button;
var snapshots = [];
var counter = 0;
var total;

function setup() {
  createCanvas(800, 240);
  background(51);
  video = createCapture(VIDEO)
  video.size(320, 240);
  // button = createButton('snap');
  // button.mousePressed(takesnap);
  // video.hide(); //Its a function that hides dom element
}



// function takesnap() {
//   // snapshots.push(video.get()); //get dom element
//   // image(video,0,0);
// }
// var go = false;

// function ready() {

//   go = true;
// }

function draw() {
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;


  total = floor(width / w) * floor(height / h);
  snapshots[counter] = video.get();
  counter++;
  if (counter == total+2) {
    counter = 0;
  }

  // if (go) {
  //   snapshots[counter]=video.get();
  //   counter+=1;
  // }

  for (var i = 0; i < snapshots.length; i++) {
    // tint(255, 50);
    var index = (i + frameCount) % snapshots.length; //cycle around
    image(snapshots[index], x, y, 2*w, 2*h);
    x = x + w;
    if (x > width) {
      x = 0;
      y = y + h;
    }
  }
  // tint(200,100,150);
  // image(video,0,0,mouseX,height)
  }{
  "appetizers": {
    "name":"fried mushrooms",
		"sizes":[
     "name":"large",
      "prize":10},
      
      "small": 8

    ]
     
    }

  }


"appetizers":[
"fried mushrooms":{
	"large":10;
  "small":8;
  
  
  }
]


}var video;
var button;
var snapshots = [];
var counter = 0;
var total;

function setup() {
  createCanvas(800, 240);
  background(51);
  video = createCapture(VIDEO)
  video.size(320, 240);
  // button = createButton('snap');
  // button.mousePressed(takesnap);
  // video.hide(); //Its a function that hides dom element
}



// function takesnap() {
//   // snapshots.push(video.get()); //get dom element
//   // image(video,0,0);
// }
// var go = false;

// function ready() {

//   go = true;
// }

function draw() {
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;


  total = floor(width / w) * floor(height / h);
  snapshots[counter] = video.get();
  counter++;
  if (counter == total+2) {
    counter = 0;
  }

  // if (go) {
  //   snapshots[counter]=video.get();
  //   counter+=1;
  // }

  for (var i = 0; i < snapshots.length; i++) {
    // tint(255, 50);
    var index = (i + frameCount) % snapshots.length; //cycle around
    image(snapshots[index], x, y, 2*w, 2*h);
    x = x + w;
    if (x > width) {
      x = 0;
      y = y + h;
    }
  }
  // tint(200,100,150);
  // image(video,0,0,mouseX,height)
  }var video;
var button;
var snapshots = [];
function setup() {
  createCanvas(320, 240);
  background(51);
 video= createCapture(VIDEO)
  video.size(320,240);
  button = createButton('snap');
  button.mousePressed(takesnap);
  // video.hide(); //Its a function that hides dom element
}

function takesnap(){
  snapshots.push(video.get()); //get dom element
// image(video,0,0);
}

function draw() {
  var w =80;
  var h=60;
  
  for(var i=0;i<snapshots.length;i++){
    tint(255,50);
  image(snapshots[i],x,y,80,60);
  }
  // tint(200,100,150);
// image(video,0,0,mouseX,height)
}var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
// var cityname;
var apikey = '&appid=626e34c1366f366d03e92c75dbc9be98';
// var units = '&units=';

var tianqi;

function preload() {
  Sunny = loadImage("sunny.png");
  Rainy = loadImage("rainy.png");
  Snow = loadImage("snow.png");
  Stormy = loadImage("stormy.png");

}


function setup() {
  createCanvas(400, 400);
  var button = select('#submit');
  button.mousePressed(getWeather);
  input = select('#city');
}

function getWeather() {
  var url = api + input.value() + apikey;
  loadJSON(url, gotData);
}

function gotData(data) {
  print(data); //does this work?
  tianqi = data;
}

function draw() {

  background(255);

  if(tianqi){
  var temp = tianqi.main.temp;

  console.log(temp);

  }
  
  fill(200,100,100);
  noStroke();
rect(30,40,temp,10)
  
paragraph = createP(temp);

}//API Code &APPID=c3769564cbbc64204e7b3b4bfdd5969a
// Icon credit:<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

//humindy level 
//temperature 

var angle = 0.0;
var offset = 220;
var scalar = 8; //数量
var speed = 0.04;
let y;

//data variables		
var api = ' https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&appid=c3769564cbbc64204e7b3b4bfdd5969a';
var units = '&units=';

var windspeed;
var humidity;
var temp;
var weather;

var icon;



function preload() {
  Bottle = loadImage("bottle.png")
  Clouds = loadImage("weather icons/cloud.png");
  Clear = loadImage("weather icons/sun.png");
  Rain = loadImage("weather icons/rain.png");
  Snow = loadImage("weather icons/snow.png");
  Mist = loadImage("weather icons/haze.png");
  Haze = loadImage("weather icons/foggy.png");
}

function setup() {

  createCanvas(400, 600);
  // loadJSON('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=c3769564cbbc64204e7b3b4bfdd5969a', gotData, 'jsonp');

  var button = select('#submit');
  button.mousePressed(weatherAsk);

  input = select('#city');
}

function weatherAsk() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);

}

function gotData(data) {
  // print(data);
  weather = data;
}

function draw() {
  background(255);
  var y = 240 + sin(angle) * scalar;


  if (weather) {
    //var windspeed = Number(weather.wind.speed) * 0.1;
    var windspeed = weather.wind.speed * 0.04;

    angle += windspeed;

    // icon = weather.weater.main
    // image(icon,130, y, 120, 120);

    var icon = weather.weather[0].main; //.main;
    if (icon == "Clear") {
      var imageShow = Clear;
    }
    if (icon == "Snow") {
      var imageShow = Snow;
    }
    if (icon == "Clouds") {
      var imageShow = Clouds;
    }
    if (icon == "Rain") {
      var imageShow = Rain;
    }

    if (icon == "Mist") {
      var imageShow = Mist;
    }

    if (icon == "Haze") {
      var imageShow = Haze;
    }
    console.log(windspeed, icon);
    image(imageShow, 130, y, 120, 120);

  }

  image(Bottle, 90, 170, 200, 240);

}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}var url = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22'

function setup() {
  createCanvas(400, 400);
  loadJSON(url,gotData,'jsonp')
  
}

function gotData(data) {

}
function draw() {
  background(220);
}// Get your own API Key @http://developer.nytimes.com 
let allWords = [];
let ts = 16;
let i = 0;

function preload() {
  let q = "trump"; //search a key word as trump
  let apikey = "2b4d83733bd3472c8d60026915fbe3aa"; //get the api key
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=" + apikey; //get the url for api
  loadJSON(url, processSnippets); //load the data from nytimes
}

function setup() {
  createCanvas(800, 800); //create a canvas as 800*800
  fill(0); //fill the background as white
}


function draw() {
  background(255, 5); //fill the background as 5% black
  ts++;//textsize increase
  ts %= 48; //but no bigger then 48
  if (allWords.length > 0) { //if words pop up
    i += 1; //i count one more
    i %= allWords.length; // make i< allWords.length
    textSize(ts); //make textsize between 16 and 48
    let word = allWords[floor(i)];//make i become integer 
    text(allWords[floor(i)], random(width), random(height));
    //make allWords appear in the random corner of the canvas
  }
}



function processSnippets(data) {
  let docs = data.response.docs;  //create docs variable to hold the json path data.response.docs 
  
  console.log(data);

  //loop through the document objects
  //loop through articles
  
    //create an array that contains Putin, Vladi, Vlad and Vova
  let putins = ["Putin", "Vladi", "Vlad", "Vova"];
    //create an array that contains Trump, president, and President
  let trumps = ["Trump", "president", "President"];


  for (let doc of docs) {
    //take the snippet for the article splict it into an array of words store it in an array
    let words = splitTokens(doc.snippet); //split the word in doc snippet
    for (let w in words) {
      //store the word at position w in a variable called word 
      let word = words[w]; //for every way to call trump in the trimp array
      for (let trump of trumps) {
        //does word equal trump
        if (match(word, trump)) { //if word match== trump
          //replace the trumpish word with a random word from the putin array
          words[w] = putins[floor(random(putins.length))];
          break; //
        }
      }
      shuffle(words, true); //change the sequence of the word
    }
    allWords = concat(allWords, words);  //concatenate the words array into allWords array
  }
  }
let txt
let tokens=[];
function preload(){

txt=loadStrings('joke.txt'); //loadStrings creates 
console.log(txt);
}
function setup() {
  createCanvas(400, 400);
  
  
  for(let l of txt){
    
  tokens=concat(tokens,splitTokens) //link tokens using concat
  
  tokens=splitTokens(txt[0]); }//call back string not array
  console.log(tokens);
  
}

function draw() {
  background(220);
  let x =0;
  let y =50;
  for (let token of tokens)
  {
    
    text(token,x,y);
   x=x+textWidth(token)+textWidth('a'); 
    if(x>width-30){
    y+=textAscent(token);
      x=0;
    
    }
  
  }
}
let api = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/static/'
let clat = 0;
let clon=0;
let zoom = 0;
let apiKey = ',0,0/1024x512?access_token=sk.eyJ1Ijoid2hpc2t5b3FpIiwiYSI6ImNqbmtoOHl4YzE4eWgza3F4Nmw5N3FzNHYifQ.sd0yH7tajxbGDboMKkCupQ';
let mapimg;
let lat, lon, mag, depth, earthquakes,x,y;
let ww = 512;
let hh = 512;
let buttonZoomIn,buttonZoomOut;

function preload(){
  let url = api + clat +','+clon+','+zoom+apiKey;
  mapimg = loadImage(url);
}

function setup() {
  createCanvas(ww, hh);
  loadJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",gotData);
  buttonZoomIn = createButton("Zoom In");
  buttonZoomOut = createButton("Zoom Out");
  buttonZoomIn.mousePressed(zoomIn);
  buttonZoomOut.mousePressed(zoomOut);
}

function gotData(data){
  earthquakes = data;
}

function draw(){
  image(mapimg,0,0);

  if (earthquakes){
  for (let i =0; i<earthquakes.features.length;i++){
    //for every earthquake, retrieve its lontitude,latitude and magtitude
    lon = earthquakes.features[i].geometry.coordinates[0];
    lat = earthquakes.features[i].geometry.coordinates[1];
    x = mercX(lon);
    y = mercY(lat);

    mag = earthquakes.features[i].properties.mag;
    mag = sqrt(pow(10, mag));
    let magmax = sqrt(pow(10, 10));
    let d = map(mag, 0, magmax, 0, 600);

    depth = earthquakes.features[i].geometry.coordinates[3];

    fill(89,169,170,150);
    noStroke();
    ellipse(x,y,d,d);
    // console.log(d);
    }
  }

    if (zoom < 0){
      zoom = 0;
    }

    if (zoom > 5){
      zoom = 5;
    }
}

//Translate the lontitude value to x on the canvas
function mercX(lon){
  return (map(lon,-180,180,0,width));
}

//Translate the latitude value to x on the canvas
function mercY(lat){
  return (map(lat,90,-90,0,height));
}

function zoomIn(){
  zoom = zoom + 1;
}

function zoomOut(){
  zoom = zoom - 1;
}
/* https://vimeo.com/144162102
JSON source (5:05) https://github.com/dariusk/corpora/blob/master/data/animals/birds_antarctica.json
Video referenced (9:05)"createP from DOM" https://vimeo.com/142698165 */

// function setup() {
// loadJSON("birds.json",gotData);
  
//   }
  
// function gotData(data){

// console.log(data);
  
// }
  
// function draw(){
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  let button1 = select('#submitFam');
  button1.mousePressed(weatherInput);
  let button2 = select('#submitUnit');
  button2.mousePressed(weatherInput);

  inputWeather = select('#city');
  inputUnit = select('#units');
  noStroke();
  rectMode(CENTER);
}

function weatherInput() {
 loadJSON("birds.json",gotData);


}


function gotData(data) {
  weather = data;
  console.log(data);
}


function draw() {

  background(0);

  if (weather) {
    winds = weather.wind.speed
    frameRate(winds); //related to wind speed
    var temp = weather.main.temp;
    var min = weather.main.temp_min;
    var max = weather.main.temp_max;
    var humidity = weather.main.humidity;
    var clouds = weather.clouds.all;
    console.log(temp);
    console.log(min);
    console.log(max);
    for (let x = 0; x <= width + temp; x += temp) { //int(temp); x < width; x += width / int(temp)) {
      for (let y = 0; y <= height + temp; y += temp) { // int(temp); y < height; y += height / int(temp)) {
        fill(random(map(humidity, 0, humidity, 0, 255)), 0, random(map(humidity, 0, humidity, 0, 255)), random(humidity));

        if (random(clouds) < clouds / 2) {
          ellipse(x, y, min, max); //xrad is min temp, yrad is max temp
        } else {
          rect(x, y, min, max); //xrad is min temp, yrad is max temp

        }
      }
    }

  }
}





let api = 'http://api.openweathermap.org/data/2.5/weather?q=',
  apiKey = '&APPID=60a2134d9e2827ec90778e0cd2b4463f',
  units = '&units=',
  inputWeather, weather, inputUnits;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let button1 = select('#submitCity');
  button1.mousePressed(weatherInput);
  let button2 = select('#submitUnit');
  button2.mousePressed(weatherInput);
  // var url = api + city + apiKey + units
  // console.log(url);
  // loadJSON(url, gotData);
  inputWeather = select('#city');
  inputUnit = select('#units');
  noStroke();
  rectMode(CENTER);
}

function weatherInput() {
  var url = api + inputWeather.value() + apiKey + units + inputUnit.value();
  loadJSON(url, gotData);

  // var url = api + input.value() + apiKey;
  // loadJSON(url, gotData);
}

// function unitInput() {
//   var fullUrl = url + inputUnit.value();
//   loadJSON(fullUrl, gotData);
//   console.log(fullUrl);
// }

function gotData(data) {
  weather = data;
  console.log(data);
}


function draw() {

  background(0);

  if (weather) {
    winds = weather.wind.speed
    frameRate(winds); //related to wind speed
    var temp = weather.main.temp;
    var min = weather.main.temp_min;
    var max = weather.main.temp_max;
    var humidity = weather.main.humidity;
    var clouds = weather.clouds.all;
    console.log(temp);
    console.log(min);
    console.log(max);
    for (let x = 0; x <= width + temp; x += temp) { //int(temp); x < width; x += width / int(temp)) {
      for (let y = 0; y <= height + temp; y += temp) { // int(temp); y < height; y += height / int(temp)) {
        fill(random(map(humidity, 0, humidity, 0, 255)), 0, random(map(humidity, 0, humidity, 0, 255)), random(humidity));

        if (random(clouds) < clouds / 2) {
          ellipse(x, y, min, max); //xrad is min temp, yrad is max temp
        } else {
          rect(x, y, min, max); //xrad is min temp, yrad is max temp

        }
      }
    }
    // fill(255);
    // textSize(20);
    // textAlign(CENTER);
    // text('temp: ',width/2-textWidth(temp)+15,30);
    // text(temp,width/2+15,30);
    // while (x < width) {
    //   while (y < height) {
    //     fill(random(humidity), 0, random(humidity));
    //     ellipse(x + width / temp, y + height / temp, temp, temp);
    //     y = y + width / temp;
    //   }
    //   x = x + height / temp;
    // }

    // line(temp, humidity,
    //   for (var i = 0; i < temp; i++) {
    //     fill(255, 255, 0);
    //     // noStroke();
    //     // rect(
    //     line(i, 10 + i, i + 20, 10 + i);
    // ellipse(random(width), i, humidity/10, humidity/10);
  }
}var lineX = 0;
var url = 'http://api.openweathermap.org/data/2.5/weather?q=London&APPID=626e34c1366f366d03e92c75dbc9be98';

var issX = 0;
var issY = 0;

function setup() {
  createCanvas(600, 400);

  setInterval(askISS, 1000);
}

function askISS() {
  loadJSON(url, gotData, 'jsonp');
}

function gotData(data) {
  var lat = data.iss_position.latitude;
  var long = data.iss_position.longitude;
  issX = map(lat, -90, 90, 0, width);
  issY = map(long, -180, 180, 0, height);
}

function draw() {
  background(51);

  fill(255);
  ellipse(issX, issY, 24, 24);

  stroke(255);
  line(lineX, 0, lineX, height);
  lineX = lineX + 5;
  if (lineX > width) {
    lineX = 0;
  }
}/* https://vimeo.com/144162102
JSON source (5:05) https://github.com/dariusk/corpora/blob/master/data/animals/birds_antarctica.json
Video referenced (9:05)"createP from DOM" https://vimeo.com/142698165 */

function setup() {
loadJSON("birds.json",gotData);
  
  }
  
function gotData(data){

console.log(data);
  
}
  
function draw(){


}







var flower

function setup() {
  createCanvas(400, 400);
}

function preload( ) {

  flower = loadJSON("flower.json")
}


//   flower={
//     name:"sunflower",
//       col: color(200,220,0) //no comma



//   }


function draw() {
  background(0);
  fill(flower.r, flower.g, flower.b);
  text(flower.name, 10, 50)
}var flower

function setup() {
  createCanvas(400, 400);
}

function preload() {

  flower = loadJSON("flower.json")
}


//   flower={
//     name:"sunflower",
//       col: color(200,220,0) //no comma



//   }


function draw() {
  background(0);
  fill(flower.r, flower.g, flower.b);
  text(flower.name, 10, 50)
}let ghosts = [];

function setup() {
  createCanvas(600, 600);
  background(0);
  for (let i = 0; i < 3; i++) {
    ghosts.push(new Ghost(70 * i, 20, 20, 20));
  }
}

function draw() {
  for (var i = 0; i < 3; i++) {
    ghosts[i].show();
    ghosts[i].move();
  }

  if (mouseIsPressed) {
    ghosts[1].w += 1;
    ghosts[1].h += 1;
  }

}


class Ghost {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }


  show() {
    fill(255);
    beginShape();
    translate(this.x, this.y);
    curveVertex(this.x + this.w, this.y + this.h);
    curveVertex(this.x + this.w, this.y + this.h);
    curveVertex(this.x + 2 / 3 * this.w, this.y);
    curveVertex(this.x, this.y - this.h);
    curveVertex(this.x - 2 / 3 * this.w, this.y);
    curveVertex(this.x - this.w, this.y + this.h);
    curveVertex(this.x, this.y + 4/ 3 * this.h);
    curveVertex(this.x + this.w, this.y + this.h);
		curveVertex(this.x + this.w, this.y + this.h);
    endShape();

    ellipse(30, 30, 20, 20);
    ellipse(50, 30, 20, 20);

    fill(0);
    ellipse(50, 60, 10, 20);

  }

  move() {

  }
}let ghosts = [];

function setup() {
  createCanvas(400, 400);
  background(0);
  for (let i = 0; i < ghosts.length; i++) {
    ghosts.push(new Ghost(mouseX, mouseY));
  }
}

function draw() {
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].show();
  }
}

class Ghost {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }


  show() {
    fill(255);
    beginShape();
    curveVertex(this.x + 84, this.y + 91);
    curveVertex(this.x + 84, this.y + 91);
    curveVertex(this.x + 68, this.y + 19);
    curveVertex(this.x + 21, this.y + 17);
    curveVertex(this.x + 32, this.y + 91);
    curveVertex(this.x + 32, this.y + 91);
    endShape();

  }
}//Declare the arrays of objects
let breadUps = [];
let breadDns =[];
let hams = [];
let lettuses = [];
let cheeses = [];
let bread = 2;
let fat = 5; 
let vegie = 3;
let colW,colH,h,score,cal, calBread, calHam,calCheese,calLettus;

function setup(){
  createCanvas(800, 600);
  colW = 50;
  colH = 50;
  h = 535;
  score = 0;
  cal = 0;
  
  //Button
  let button = createButton('PLAY');
  button.mousePressed(resetSketch);
  button.position(380,620);
  
}

function resetSketch(){
  //Assign value to array
  //Bread
  for (let i = bread; i > 0; i--){
   breadUps[i] = new BreadUp(random(width), random(-height,height/2));
   breadDns[i] = new BreadDn(random(width), random(-height,height/2));
  }
  
   //Ham
   for (let i = fat; i > 0; i--){
   hams[i] = new Ham(random(width), random(-height,height));}
  
   //Cheese
   for (let i = fat; i>0; i--){
   cheeses[i] = new Cheese(random(width), random(-height,height));
   }
   
   //Lettus
   for (let i = vegie; i > 0 ; i--){
   lettuses[i] = new Lettus(random(width), random(-height,height));
   }
  
  cal = 0;
  score = 0;
}

function draw() {
  //background
  background(238,222,203);
    for (let col = 0; col < width/colW; col++) {
      for(row=0; row<height/colH; row++){
      let x = col * colW;
      let y = row * colH;
      noFill();
      stroke(190,119,87);
      strokeWeight(2);
      rect(x, y, colW, colH);
    }
    noStroke();
    fill(230);
    textFont('Helvetica');
  }
  
  //Score
  fill(190, 119, 87);
  stroke(200, 150, 120);
  strokeWeight(5);
  rect(-15,35,150,150,10);
  noStroke();
  fill(230);
  textSize(18);
  text('Move the tray to collect your burger!',10,65,120);
  text('Burgers: ' + score,10,145);
  text('Calorie: ' + cal, 10,165);
  
  //Tray
  push();
  fill(190, 119, 87);
  rect(25, 555, 750, 80,10);
  noStroke();
  fill(185, 43, 62);
  rect(mouseX - 50, 535, 100, 20, 10)
  fill(244,197,61);
  textSize(12);
  text('VALUE PACK',mouseX - 36,550)
  pop();
  
  
  //hamburger elements 
  //Meat
  for (let i in hams){
   hams[i].run();
   if (hams[i].isCaught(mouseX,h)){
     h = h - hams[i].a;
     hams[i].stop(mouseX);
   	}
  }
  
  //Cheese
  for (let i in cheeses){
   cheeses[i].run();
   if (cheeses[i].isCaught(mouseX,h)){
     h = h - cheeses[i].a;
     cheeses[i].stop(mouseX);
   	}
  }
  
  //Lettus
  for (let i in lettuses){
   lettuses[i].run();
   if (lettuses[i].isCaught(mouseX,h)){
     h = h - lettuses[i].a;
     lettuses[i].stop(mouseX);
   	}
  }
  
  //Upper Bread
  for (let b in breadUps){
   breadUps[b].run();//let the upper bread show & move
    
   if (breadUps[b].isCaught(mouseX,h)){ //if the upper bread is 'in' the tray
     if(h>=535){ //if there is nothing else got caught 
       breadUps.splice(b,1); //the upper bread disappear
       h = 535;
     	 }
     
     		else{ //if there is sth else got caught 
         breadUps.splice(b,1); //the upper bread disappear
         for (let i in breadDns){ //other caught elements disappear
          if(breadDns[i].isCaught(mouseX,h)){
           breadDns.splice(i,1);
           cal = cal + 50;
          }
         }
          
         for (let j in hams){ //other caught elements disappear
          if(hams[j].isCaught(mouseX,h)){
           hams.splice(j,1);
           cal = cal + 180;
         }
        }
          
         for (let q in lettuses){ //other caught elements disappear
          if(lettuses[q].isCaught(mouseX,h)){
           lettuses.splice(q,1);
           cal = cal + 30;
         }
        }
          
         for (let k in cheeses){ //other caught elements disappear
          if(cheeses[k].isCaught(mouseX,h)){
           cheeses.splice(k,1);
           cal = cal + 360;
         }
        }
          
       }
     score = score + 1; // adds 1 to score
     h = 535; // reset h
   	}
  }
  
  //Bottom Bread
  for (let b in breadDns){
   breadDns[b].run();
    
   if (breadDns[b].isCaught(mouseX,h)){
     h = h - breadDns[b].a;
     breadDns[b].stop(mouseX);
   	}
  }

  
  
  //Game Over
  let breadUpsNum = breadUps.length;
  let breadDnsNum = breadDns.length;
  
  push();
  if (breadUpsNum == 1 && breadDnsNum == 1){
    fill(185, 43, 62); 
    rect(0,0,width,height);
  	fill(254,192,65);
    textSize(38);
    text('Wow. You got ' + score + ' hamburgers in total.',110, height/2-150);
    text('That is ' + cal + ' calorie!',250, height/2-60);
  	stroke(255);

    line(150,height/2+30, 650,height/2-10);  	

    let r = 200;
  	let ex = width/2;
  	let ey = height/2 +150;
    
    line(ex,ey,ex,height);
    fill(254,192,65);
    noStroke();
  	strokeWeight(2);
  	ellipse(ex,ey,r,r);
    fill(255);
    text('   EAT AGAIN?', width/2-67, height/2 +135,150);
  pop();  
  }
}// Get your own API Key @http://developer.nytimes.com
let allWords = [];
let ts = 16;
let i = 0;

function preload() {
  let q = "trump";
  let apikey = "5fcc7b03d74d15972346cf84719ad5e5:13:68130021";
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=" + apikey;
  loadJSON(url, processSnippets);
}

function setup() {
  createCanvas(800, 800);
  fill(0);
}


function draw() {
  background(255, 5);
  ts++;
  ts %= 48;
  if (allWords.length > 0) {
    i += 1;
    i %= allWords.length;
    textSize(ts);
    let word = allWords[floor(i)];
    text(allWords[floor(i)], random(width), random(height));
  }
}



function processSnippets(data) {
  let docs = data.response.docs;
  console.log(data);

  let putins = ["Putin", "Vladi", "Vlad", "Vova"];
  let trumps = ["Trump", "president", "President"];


  for (let doc of docs) {
    let words = splitTokens(doc.snippet);
    for (let w in words) {
      let word = words[w];
      for (let trump of trumps) {
        if (match(word, trump)) {
          words[w] = putins[floor(random(putins.length))];
          break;
        }
      }
      shuffle(words, true);
    }
    allWords = concat(allWords, words);
  }
}let txt
let tokens=[];
function preload(){

txt=loadStrings('joke.txt'); //loadStrings creates 
console.log(txt);
}
function setup() {
  createCanvas(400, 400);
  
  
  for(let l of txt){
    
  tokens=concat(tokens,splitTokens) //link tokens using concat
  
  tokens=splitTokens(txt[0]); }//call back string not array
  console.log(tokens);
  
}

function draw() {
  background(220);
  let x =0;
  let y =50;
  for (let token of tokens)
  {
    
    text(token,x,y);
   x=x+textWidth(token)+textWidth('a'); 
    if(x>width-30){
    y+=textAscent(token);
      x=0;
    
    }
  
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  
  background(220);
  
  var s = "A string walks into a bar and orders a drink.The bartender says we don't serve strings in here and you're a string. Nope, I'm a frayed knot.";
fill(50);
text(s, 100, 100, 150, 150);
  fill(200,100,50,40);
  noStroke();
  rect(100,100,150,150);
}let data;
function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1431")
  serial.on("data", processData)
}

function processData() {
  let inString = serial.readLine();
  //exit out no data

  if (!inString) return
  data = inString;
  console.log(inString)

}


function draw() {
  background(127, 0, 127);


  //data = m
  var v = map(data, 0, 1023, 0, width);

  // Left Eye
  ellipse(width * 0.4, height * 0.4, v * 0.25 + 10, v * 0.25 + 10);

  // Right Eye
  ellipse(width * 0.6, height * 0.4, (2500 / v) + 10, (2500 / v) + 10);

  // Mouth
  bezier(width * 0.3, v * 0.6 + height / 2, width * 0.4, height * 0.8, width * 0.6, height * 0.8, width * 0.7, v * 0.55 + height / 2);

  v += random(-5, 5);
  // Nose
  bezier(width * 0.5, height * 0.5, v * 0.6, height * 0.6, v * 0.6, height * 0.8, width * 0.45, height * 0.67);

}// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1431");
  serial.on('data', gotData);
 // setInterval(function() {
    // console.log("HELLO");
    //serial.write(1);
 // }, 1000);
  
}

// There is data available to work with from the serial port
function gotData() {
  var indata = serial.readLine(); // read the incoming string
  if(indata.length>0){
  console.log(indata);
  }
  //trim(currentString); // remove any trailing whitespace
  //if (!currentString) return; // if the string is empty, do no more
  //console.log("DATA: " + currentString); // println the string
  //latestData = currentString; // save it for the draw method
}

function draw() {
 background(127, 0, 127);
  
  var v = map(latestData,0,190,600,0); 

  // Left Eye
  ellipse(width*0.4, height*0.4, v*0.25 + 10, v*0.25 + 10);

  // Right Eye
  ellipse(width*0.6, height*0.4, (2500/v) + 10, (2500/v) + 10);
	
  // Mouth
  bezier(width*0.3, v*0.6 + height/2, width*0.4, height*0.8, width*0.6, height*0.8, width*0.7, v*0.55 + height/2);
  
  v+=random(-5, 5);
  // Nose
  bezier(width*0.5, height*0.5, v*0.6, height*0.6, v*0.6, height*0.8, width*0.45, height*0.67);

}var serial; // variable to hold an instance of the serialport library
 
function setup() {
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 
 serial.list(); // list the serial ports
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}function setup() {
  var cnv = createCanvas(windowWidth,windowHeight);
   cnv.style('display', 'block');
  background(250, 150, 200);
  
  input = createInput();
  input.position(20, 65);
  var button =createButton('press');
  var slider=createSlider(0, 255);
  slider.position(30, 5);
  var s=slider.value;
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);
    greeting = createElement('h2', 'Type something?');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);
  console.log(slider.value());
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function greet(){
  var name = input.value();
  greeting.html('hello '+name+'!');
  input.value('');

  for (var i=0; i<slider.value(); i++) {
    push();
    fill(random(200,255), 200, 200);
    translate(random(width), random(height));
    rotate(random(2*PI));
    text(name, 0, 0);
    pop();
  }

}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}function setup() {
  background(0);
  createCanvas(200, 200);
  
  dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(gotFile,unhighlight);
  
  
}

function highlight() {
  dropzone.style('background-color','#ccc'); 

}

function unhighlight() {
  dropzone.style('background-color','#fff'); 

}

function gotFile(file){
	createP(file.name);
  createP(file.type);
  createP(file.size);
  var img=createImg(file.data);
  img.hide();
  img.size(100,100);
  image(img,0,0,200,height);

}var sliders=[];
// var x=151;
var angle = 0;

function setup() {
  noCanvas();
  for (var i = 0; i < 50; i++) {
    sliders[i] = createSlider(0, 255, 50);
    //createCanvas(200,220);
    // slider = createSlider(0,255,50);
  }
  sliders[0].input(adjustSliders);
}

function adjustSliders(){
  var offset = 0;
   for (var i = 0; i < sliders.length; i++) {
    // var x = map(sin(angle+offset), -1, 1, 0, 255);
  sliders[i].value(sliders[0].value());
    // offset+=0.25;
   }
  }
// }
// function draw() {
// var offset = 0;
  
//   for (var i = 0; i < sliders.length; i++) {
//     var x = map(sin(angle+offset), -1, 1, 0, 255);
//   sliders[i].value(x);
//     offset+=0.25;
//   }
  
//   // x=x+random(-5,5);

//   // background(slider.value());
//   angle += 0.1;

// }/* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from arduino to P5
See arduino code in bottom, have pot connected to A0*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
var posX=0,posY=0, step = 10;


function setup() {
	createCanvas(320, 240);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1441"); // open a port

}

function draw() {
  
  background(255);
  rect(fromSerial,100,30,30);
posX+=step;
  if (posX> width){
    posX= 0;
    posY+=step;
    if (posY> height)posY=0;
  }
  fill(fromSerial);
  rect(posX,posY, step, step);
}

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  byte byteToSend = map (analogValue, 0, 1023, 0, 255);
  Serial.write(byteToSend);
  delay(50);
}
*/var happy = ['rainbow','unicorn','purple','bacteria'];

function setup() {
  noCanvas();
  var button = select('#button');
  button.mousePressed(addItem);
  
  // var canvas= createCanvas(400,400);
  // canvas.parent('canvasp')
  //to let the vancas include the parvar happya.
}



function addItem(){

var r = floor(random(0,happy.length));//floor() can delete the desimal
// var r = random(0,happy.length);
  var li =createElement('li',happy[r]);
  li.parent('happylist') 
  createP(happy[r]);
}

/* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one value as ascii from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
  createCanvas(255, 255);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1431"); // open a port
}

function draw() {
	background(0,0,255);
  var valueToSend = mouseX;
  serial.write(valueToSend + ","); // this adds a comma and turns it into a string
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if (Serial.available()) {
    int intFromSerial = Serial.parseInt();
    analogWrite(3, intFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
var capture;


function setup() {
  createCanvas(255, 255);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1431"); // open a port
   createCanvas(390, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  //capture.hide();
}

function draw() {
  // background(255,0,0);
  
  // serial.write(mouseX);   // sends as byte unles iyts a string
// background(255);
  image(capture, 0, 0, 320, 240);
  var pixelColor=get(mouseX,mouseY);
  var ourBrightness = brightness(pixelColor);
  serial.write(ourBrightness);
  // filter('INVERT');
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from arduino to P5
See arduino code in bottom, have pot connected to A0*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
var posX=0,posY=0, step = 10;


function setup() {
	createCanvas(320, 240);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port

}

function draw() {
  
  
posX+=step;
  if (posX> width){
    posX= 0;
    posY+=step;
    if (posY> height)posY=0;
  }
  fill(fromSerial);
  rect(posX,posY, step, step);
}

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  byte byteToSend = map (analogValue, 0, 1023, 0, 255);
  Serial.write(byteToSend);
  delay(50);
}
*/function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 100; i++) {
    var p = createP('apples');
    var x = floor(random(width));
    var y = floor(random(height));
    p.position(x,y);
    p.class('apple');
    p.mousePressed(becomeApple);
  }
    for (var j = 0; j < 100; j++) {
    var q = createP('bananas');   
    var px = floor(random(width));
    var py = floor(random(height));
    q.position(px,py);
      
    q.class('bananas');
  }
}

function draw() {
  background(220);

}function setup() {
  noCanvas();
}

function draw() {
  background(220);
}var paragraphs;
var paragraph;

function setup() {
  createCanvas(100, 100);
  background(0);

  paragraph = select('#unicorn');
//   paragraph.mouseOver(highlight);
//   paragraph.mouseOut(unhighlight);
  
  // paragraph=select('p');    //only select first elemenent

  paragraphs = selectAll('p'); //class

  for (var i = 0; i < paragraphs.length; i++) {
 paragraphs[i].mouseOver(highlight);
  paragraphs[i].mouseOut(unhighlight);
  }
}
  // paragraph.mouseOver(changeBackground);
  
  function highlight(){
    this.style('padding','16pt');
    
  this.style('background-color','#F0F');
  }
  

 function unhighlight(){
    this.style('padding','0pt');
    
  this.style('background-color','#FFF');
  }
  
// function changeBackground() {
//   paragraph.style('background-color', '#F0F');
// }
  
//   var button = select("#button") //id
//   button.mousePressed(canvasBg);

// }

function canvasBg() {
  background(random(255));
}

var paragraphs;
function setup() {
  createCanvas(100, 100);
  background(0);

  createP("This is a paragraph made by me" + random(100));
  // paragraph = select('#unicorn');
  // paragraph=select('p'); //only select firs elemenent
  
  paragraphs = selectAll('.rainbow'); //class
  
  for (var i=0;i<paragraphs.length;i++){
  
  paragraphs[i].style('font-size','24pt');
  }
  
  // paragraph.mouseOver(changeBackground);
  
  var button=select("#button") //id
button.mousePressed(canvasBg);

}
  function canvasBg(){
  background(random(255));
  }
  
  function changeBackground() {
    paragraph.style('background-color', '#F0F');
  }


var textbox;
var slider;
var paragraph;
var element = select('#unicorn')

function setup(){
noCanvas();
paragraph = createP('starting text');
textbox = createInput('enter text');
slider = createSlider(10,64,16);


// textbox.input(doSomething); // input is real time//callback change needs enter to call
 textbox.input(updateText); 
  
  slider.input(updateSize)
}




function updateSize(){

paragraph.style("font-size",slider.value() + "pt");
  
}


function updateText(){

paragraph.html(textbox.value());
  
}


// function doSomething(){

// paragraph.html(textbox.value());
  
// }var textbox;
var slider;
var paragraph;

function setup(){
noCanvas();
paragraph = createP('starting text');
textbox = createInput('enter text');
slider = createSlider(10,64,16);


// textbox.input(doSomething); // input is real time//callback change needs enter to call
 textbox.input(updateText); 
  
  slider.input(updateSize)
}




function updateSize(){

paragraph.style("font-size",slider.value() + "pt");
  
}


function updateText(){

paragraph.html(textbox.value());
  
}


// function doSomething(){

// paragraph.html(textbox.value());
  
// }var textbox;
var slider;
var paragraph;

function setup(){
noCanvas();
paragraph = createP('starting text');
textbox = createInput('enter text');
slider = createSlider(10,64,16);


// textbox.input(doSomething); // input is real time//callback change needs enter to call
 textbox.input(updateText); 
  
  slider.input(updateSize)
}




function updateSize(){

paragraph.style("font-size",slider.value() + "pt");
  
}


function updateText(){

paragraph.html(textbox.value());
  
}


// function doSomething(){

// paragraph.html(textbox.value());
  
// }var bgcolor;
var button;
var slider;
var input;
var nameP;

function setup() {
  canvas = createCanvas(200, 200);
  canvas.mouseOver(overpara);
  canvas.mouseOut(outpara);
  canvas.mousePressed(changeColor);

  txt = createP('some text');
  txt.mouseOver(changeStyle);
  txt.mouseOut(revertStyle);

  function changeStyle() {
    txt.style("background-color", "pink") //override the html
    txt.style("padding", "24px");
  }

  function revertStyle() {
    txt.style("background-color", "purple") //override the html
    txt.style("padding", "8px");
  }

  bgcolor = color(200);
  nameP = createP('your name!');

  button = createButton("go"); //reference to the button by making a var button
  // button.mousePressed(changeStyle);

  button.mousePressed(changeColor);
  slider = createSlider(10, 100, 86);
  input = createInput('type your name');

  nameP.mouseOver(overpara);
  nameP.mouseOut(outpara);

  input.changed(updateText);
  // nameInput.input(updateText);
}

function updateText() {
  nameP.html(input.value());
}

function changeStyle() {
  txt.style("background-color", "pink")
  txt.style("padding", "24px")
}

function overpara() {
  nameP.html('your name is over me')
}

function outpara() {
  nameP.html('your mouse is out')
}

function changeColor() {
  bgcolor = color(random(255));
}


// function mousePressed(){
// changeColor(); //call back this function
// }

function draw() {

  background(bgcolor);
  fill(255, 0, 175);
  rect(100, 100, 50, 50);
  ellipse(100, 100, slider.value(), slider.value())
  // nameP.html(input.value()); override the function
  text(input.value(), 10, 20);
  // console.log(slider.value());
}var bgcolor;
var button;
var slider;
var input;
var nameP;

function setup() {
  canvas = createCanvas(200, 200);
  canvas.mouseOver(overpara);
  canvas.mouseOut(outpara);
  canvas.mousePressed(changeColor);
  
  bgcolor = color(200);
  nameP = createP('your name!');

  button = createButton("go"); //reference to the button by making a var button
	button.mousePressed(changeColor);
  slider = createSlider(10, 100, 86);
  input = createInput('type your name');
  
  nameP.mouseOver(overpara);
  nameP.mouseOut(outpara);

  input.changed(updateText);
  // nameInput.input(updateText);
}

function updateText() {
  nameP.html(input.value());
}


function overpara() {
  nameP.html('your name is over me')
}

function outpara() {
  nameP.html('your mouse is out')
}

function changeColor() {
  bgcolor = color(random(255));
}


// function mousePressed(){
// changeColor(); //call back this function
// }

function draw() {

  background(bgcolor);
  fill(255, 0, 175);
  rect(100, 100, 50, 50);
  ellipse(100, 100, slider.value(), slider.value())
  // nameP.html(input.value()); override the function
  text(input.value(), 10, 20);
  // console.log(slider.value());
}
var bgcolor
var button;
var slider;

function setup() {
  canvas=createCanvas(200, 200);
  
  bgcolor= color(200);
  button=createButton("go");//reference to the button by making a var button
  button.mousePressed(changeColor);
  nameP= createP('yourname')
  slider=createSlider(10,100,5);
  input=createInput('type your name');
}

function changeColor() {
  bgcolor=color(random(255));
}


// function mousePressed(){
// changeColor(); //call back this function
// }

function draw() {

 background(bgcolor);
  fill(255,0,175);
  rect(100,100,50,50);
  ellipse(100,100,slider.value(),slider.value())
  nameP.html(input.value());
text(input.value(),10,20);
  console.log(slider.value());
}// Learning Processing
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
}let bubbles = [];

let bubble;


function setup() {
  createCanvas(600, 400);
  for(let i = 0;i<5;i++){
  let x =random(width);
  let y =random(height);
  let r =random(10,50);
  let b = new Bubble(x,y,r);
    bubbles.push(b); 
}

}
 

function draw() {
  background(0);

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
   
  }
}

function mousePressed(){
  for (let i = 0; i < bubbles.length; i++) {
  bubbles[i].clicked(mouseX,mouseY);
  }
}


class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  this.brightness=0;
  }
  
  clicked(px,py){
    let d = dist(px,py,this.x, this.y);
    if(d < this.r){
    this.brightness=255;
      console.log("CLICKED ON THE BUBBLE!")
    }
    
}

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(255)
    noFill()
    strokeWeight(4)
    fill(this.brightness,100)
    ellipse(this.x, this.y, this.r * 2);
  }

}let balls = []; //make an array

function setup() {
  createCanvas(400, 400);
  
  for (let i = 0; i < 100; i++) {
    balls.push(new Ball(random(0, width), random(0, height), 5, random(0, 3), random(0, 3)));

  }
}

function draw() {
  background(220);

  // for (let i = 0; i < 100; i++) {
  //   balls[i].run();
  // }


  for (i = 0; i < balls.length; i++) {
    balls[i].run();
    for (other = i+1; other < balls.length; other++) {//0 or i+1 compare less times
      // balls[other].run();
    
    if (balls[i].isNear(balls[other]) && balls[i] != balls[other]) {
      balls.splice(other, 1);
      balls.splice(i, 1);
    }
    }
  }

}

  // if(balls[i].isNear(mouseX,mouseY)){
  // balls.splice(i,1);}


//x, y, r, xspeed, yspeed
// function mousePressed() {

//   // balls.push(new Ball(mouseX,mouseY,50,1,1));//Create bouncing balls by clicking the mouse.
let balls = []; //make array

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();
  }

}

//x, y, r, xspeed, yspeed
function mousePressed() {
  let b = new Ball(mouseX,mouseY,random(10,20),random(0,3),random(0,3));
  balls.push(b);
  // balls.push(new Ball(mouseX,mouseY,50,1,1));
  
}// Create 100 bouncing balls. Delete them by mousing over them.
let balls = []; //make an array

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    balls.push(new Ball(random(width), random(height), random(10, 20), random(0, 3), random(0, 3)));
    
  }
}

function draw() {
  background(220);

  // for (let i = 0; i < 100; i++) {
  //   balls[i].run();
  // }
  for (let b in balls) {
   balls[b].run(); 
  
     
    if(balls[b].isNear(mouseX, mouseY)){
      balls.splice(b, 1);
    }
  // if(balls[i].isNear(mouseX,mouseY)){
  // balls.splice(i,1);}
}

//x, y, r, xspeed, yspeed
// function mousePressed() {

//   // balls.push(new Ball(mouseX,mouseY,50,1,1));

 }
var bgcolor
var button;
var slider;
function setup() {
  canvas=createCanvas(200, 200);
  
  bgcolor= color(200);
  button=createButton("go");//reference to the button by making a var button
  button.mousePressed(changeColor);
  
  slider=createSlider(10,100,5);
}

function changeColor() {
  bgcolor=color(random(255));
}


// function mousePressed(){
// changeColor(); //call back this function
// }

function draw() {

 background(bgcolor);
  fill(255,0,175);
  rect(100,100,50,50);
  ellipse(100,100,slider.value(),slider.value())

  
}var canvas;
var h1;


function setup() {
  canvas=createCanvas(200, 200);
  canvas.position(400,500);
  h1=createElement('hi','waiting')
 // h1.position(400,600);
  // createDiv();
  // createButton();  
}

function mousePressed(){
  h1.html("Now I will show you my favorite number.")//changing to this one from waititng
 createP("My favorite color is purple"+random(1,10));
}

function draw() {
  // clear();
 background(200);
  fill(255,0,0);
  rect(x,y,50,50);
  h1.position(x,y);
  x=x+random(-5,5);
  
}let bubbles = [];

let flower;
function preload(){
flower = loadImage('flower.png')
  for (let i =0;i<5;i++){
  kittens[1] = loadImage('flower'+i+'jpg');}
}


function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 12);

    bubbles[i] = new Bubble(x, y, r)
  }
  unicorn = new Bubble(400, 200, 10);
}

// function mouseDragged(){
// let x = random(width);
//     let y = random(height);
//     let r = random(10, 50);
//     let b = new Bubble(mouseX, mouseY, r);
//     bubbles.push(b);
//     }



function draw() {
  background(255);

  // for (let i = 0; i < bubbles.length; i++) {
  //   if (bubbles[i].contains(mouseX, mouseY)) {

  //     bubbles[i].changeColor(255);
  //   }else{bubbles[i].changeColor(0);}

  // let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
  // if (d < bubble1.r + bubble2.r) {}


  //   if (bubble1.intersects(bubble2)) {
  //     background(200, 0, 100);
  //   }

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].show();
    bubbles[i].move();
  }


  //or
  // unicorn.x=mouseX;
  // unicorn.y=mouseY;
  // unicorn.show();
  // unicorn.move();

  for (var b of bubbles) {
    b.show();
    b.move();
    let overlapping = false;
    for (var other of bubbles) {
      if (b !== other && b.intersects(other)) {
        overlapping = true;
      }
      if (overlapping) {
        b.changeColor(255)
      } else {
        b.changeColor(0);
      }
    }
  }


  //for every elements in the bubbles fo something
  // }


  //   if(bubbles.length >10)
  //     bubbles.splice(0,1);

}



function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) { //minus preferred
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

class Bubble {
  constructor(x, y, r = 50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }



  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    // stroke(255)
    // noFill()
    // strokeWeight(3)
    // fill(this.brightness, 100)
    // ellipse(this.x, this.y, this.r * 2);
    image(flower,this.x,this.y)
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);

    // if (d < this.r) {
    //   return true;
    //   // this.brightness=255;
    // } else {
    //   return false;
    // }
    return d < this.r;
  }


  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    // 
    return (d < this.r + other.r);
  }

  //!!!!!!
  // this.brightness=0;

  //redundant!!!!

  // return d < this.r;



  changeColor(bright) {

    this.brightness = bright;
  }



}let bubbles = [];
let unicorn;


function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 12);

    bubbles[i] = new Bubble(x, y, r)
  }
  unicorn = new Bubble(400, 200, 10);
}

// function mouseDragged(){
// let x = random(width);
//     let y = random(height);
//     let r = random(10, 50);
//     let b = new Bubble(mouseX, mouseY, r);
//     bubbles.push(b);
//     }



function draw() {
  background(0);

  // for (let i = 0; i < bubbles.length; i++) {
  //   if (bubbles[i].contains(mouseX, mouseY)) {
  //     bubbles[i].changeColor(255);
  //   }else{bubbles[i].changeColor(0);}

  // let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
  // if (d < bubble1.r + bubble2.r) {}


  //   if (bubble1.intersects(bubble2)) {
  //     background(200, 0, 100);
  //   }

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].show();
    bubbles[i].move();
  }


  //or
  // unicorn.x=mouseX;
  // unicorn.y=mouseY;
  // unicorn.show();
  // unicorn.move();

  for (var b of bubbles) {
    b.show();
    b.move();
    let overlapping = false;
    for (var other of bubbles) {
      if (b !== other && b.intersects(other)) {
        overlapping = true;
      }
      if (overlapping) {
        b.changeColor(255)
      } else {
        b.changeColor(0);
      }
    }
  }


  //for every elements in the bubbles fo something
  // }


  //   if(bubbles.length >10)
  //     bubbles.splice(0,1);

}



function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) { //minus preferred
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

class Bubble {
  constructor(x, y, r = 50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }



  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(255)
    noFill()
    strokeWeight(3)
    fill(this.brightness, 100)
    ellipse(this.x, this.y, this.r * 2);
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);

    // if (d < this.r) {
    //   return true;
    //   // this.brightness=255;
    // } else {
    //   return false;
    // }
    return d < this.r;
  }


  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    // 
    return (d < this.r + other.r);
  }

  //!!!!!!
  // this.brightness=0;

  //redundant!!!!

  // return d < this.r;



  changeColor(bright) {

    this.brightness = bright;
  }



}
let a=9;
let b=10;
let c;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  var c = add(a,b);
  
  text('sum is'+c,170,200);
  
}

function add(num1,num2){
return num1+num2;
}

let bubble1;
let bubble2;

let bubbles = [];



function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble(200, 200);
  bubble2 = new Bubble(400, 200, 100);

}

// function mouseDragged(){
// let x = random(width);
//     let y = random(height);
//     let r = random(10, 50);
//     let b = new Bubble(mouseX, mouseY, r);
//     bubbles.push(b);
//     }



function draw() {
  background(0);

  // for (let i = 0; i < bubbles.length; i++) {
  //   if (bubbles[i].contains(mouseX, mouseY)) {
  //     bubbles[i].changeColor(255);
  //   }else{bubbles[i].changeColor(0);}

  // let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
  // if (d < bubble1.r + bubble2.r) {}


  if (bubble1.intersects(bubble2)) {
    background(200, 0, 100);
  }

  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show();
  bubble2.x=mouseX;//overwrite on the move function
  bubble2.y=mouseY;
  // }


  //   if(bubbles.length >10)
  //     bubbles.splice(0,1);

}



function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) { //minus preferred
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

class Bubble {
  constructor(x, y, r = 50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }



  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(255)
    noFill()
    strokeWeight(4)
    fill(this.brightness, 100)
    ellipse(this.x, this.y, this.r * 2);
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);

    // if (d < this.r) {
    //   return true;
    //   // this.brightness=255;
    // } else {
    //   return false;
    // }
    return d < this.r;
  }


  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    // 
    return(d<this.r+other.r);
  }
  
  //!!!!!!
  // this.brightness=0;

  //redundant!!!!

  // return d < this.r;



  changeColor(bright) {

    this.brightness = bright;
  }



}let bubbles = [];



function setup() {
  createCanvas(600, 400);


}

function mouseDragged(){
let x = random(width);
    let y = random(height);
    let r = random(10, 50);
    let b = new Bubble(mouseX, mouseY, r);
    bubbles.push(b);
    }



function draw() {
  background(0);

  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles[i].changeColor(255);
    }else{bubbles[i].changeColor(0);}
    bubbles[i].move();
    bubbles[i].show();
  }
  
  
  if(bubbles.length >10)
    bubbles.splice(0,1);
    
}



function mousePressed() {
  for (let i = bubbles.length-1; i>=0;i--) { //minus preferred
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }



  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(255)
    noFill()
    strokeWeight(4)
    fill(this.brightness, 100)
    ellipse(this.x, this.y, this.r * 2);
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);

    // if (d < this.r) {
    //   return true;
    //   // this.brightness=255;
    // } else {
    //   return false;
    // }
    return d < this.r;
  }
  // this.brightness=0;

  //redundant!!!!

  // return d < this.r;



  changeColor(bright) {

    this.brightness = bright;
  }



}let bubbles = [];



function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 50);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
  }

}





function draw() {
  background(0);

  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles[i].changeColor(255);
    }else{bubbles[i].changeColor(0);}
    bubbles[i].move();
    bubbles[i].show();
  }
}


function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }



  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(255)
    noFill()
    strokeWeight(4)
    fill(this.brightness, 100)
    ellipse(this.x, this.y, this.r * 2);
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);

    // if (d < this.r) {
    //   return true;
    //   // this.brightness=255;
    // } else {
    //   return false;
    // }
    return d < this.r;
  }
  // this.brightness=0;

  //redundant!!!!

  // return d < this.r;



  changeColor(bright) {

    this.brightness = bright;
  }



}let bubbles = [];

let bubble;


function setup() {
  createCanvas(600, 400);
  for(let i = 0;i<5;i++){
  let x =random(width);
  let y =random(height);
  let r =random(10,50);
  let b = new Bubble(x,y,r);
    bubbles.push(b); 
}

}
  // frameRate(20);
  // for (let i = 0; i < 2; i++) {
  //   bubbles[i] = new Bubble(200, 200, 40);
  // }

// function mousePressed(){
// // function mouseDragged(){
// let r =random(10,50);
// let b =new Bubble(mouseX,mouseY,r)
// bubbles.push(b);
// bubbles[0]=b;

// }


function draw() {
  background(0);
  // bubble.move();
  // bubble.show();
// }
  for (let i = 0; i < bubbles.length; i++) {
  //   // let x = 30+60*i;
  //   // let y = random(height)
  //   // let r = random(20,30)
  //   // bubbles[i]=new Bubble(x,y,r);
    bubbles[i].move();
    bubbles[i].show();
   
  }
}

function mousePressed(){
  for (let i = 0; i < bubbles.length; i++) {
  bubbles[i].clicked(mouseX,mouseY);
  }
}


class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  this.brightness=0;
  }
  
  clicked(px,py){
    let d = dist(px,py,this.x, this.y);
    if(d < this.r){
    this.brightness=255;
      console.log("CLICKED ON THE BUBBLE!")
    }
    
}

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(255)
    noFill()
    strokeWeight(4)
    fill(this.brightness,100)
    ellipse(this.x, this.y, this.r * 2);
  }

}let bubbles = [];



function setup() {
  createCanvas(600, 400);
  frameRate(20);
  // for (let i = 0; i < 2; i++) {
  //   bubbles[i] = new Bubble(200, 200, 40);
  // }
}
// function mousePressed(){
function mouseDragged(){
let r =random(10,50);
let b =new Bubble(mouseX,mouseY,r)
bubbles.push(b);
// bubbles[0]=b;

}


function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    // let x = 30+60*i;
    // let y = random(height)
    // let r = random(20,30)
    // bubbles[i]=new Bubble(x,y,r);
    bubbles[i].move();
    bubbles[i].show();
   
  }
}


class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(255)
    noFill()
    strokeWeight(0.1)
    ellipse(this.x, this.y, this.r * 2);
  }

}let balls = [];

function setup() {
  createCanvas(400, 400);
  for ( let i = 0; i < 100; i++){
    balls[i] = new Ball(random(width),random(height),random(-3,3),random(-3,4));
  }
}

function draw() {
  background(220);
  stroke(255);
  
  for ( let i = 0; i < 20; i++){
  balls[i].run();
  }
    
  // for ( b of balls) {
  // b.run();}
  
}

class Ball{
 constructor (x, y, xspeed,yspeed){
  this.x = x;
   this.y = y;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
 }
  
  run(){
  this.show();
  this.move();
  this.bounce();
  }
  
  show (){
  ellipse(this.x, this.y, 5, 5);
  }
  
  move(){
  this.x+=this.xspeed;
  this.y+=this.yspeed;
  }
  
  bounce(){
  if(this.x > width || this.x < 0 ) this.xspeed *=-1;
  if(this.y > height || this.y <0) this.yspeed *= -1;
  }
  
}let balls=[];

function setup() {
  createCanvas(400, 400);
  // Initialize the ball at the left edge and middle height
  for (let i=0;i<5;i++){
  // balls[i] = new Ball(random(width),random(height),random(-5,5),random(-10,10));
  // }
  //store it in the array
  balls.push(new Ball(random(width),random(height),1,1,30));
  }
  // ball1=new Ball(30,2);
  
}

function draw() {
  background(220);

//   for ( let i = 0; i < 5; i++){
//   balls[i].run();
//   }
  //imp
  
  for(let b in balls){
  balls[b].run();
  
    for(let other in balls){
      
    if(balls[b].isNear(balls[other].x,balls[other].y)&&balls[b] != balls[other]){
       background(80);}
  }
    
    if(balls[b].isNear(mouseX,mouseY)){
    balls.splice(b,1);}
  //remove ball that has been moused over
    //
    
  // balls.splice(b,1)
    
  // if(dist(mouseX,mouseY,balls[b].x,balls[b].y)<25){
  //    balls.splice(b,1);} //把b后面的第几个元素去掉
    // new class func here 
    
    
  
  }
  
  
  // ball1.show();
  // ball1.move();
  // ball1.bounce();
}


// class Ball {

//   constructor(x, y, xspeed,yspeed) {
//     this.x = x;
//     this.xspeed = xspeed;
//     this.y = y;
//     this.yspeed = yspeed;
//   }

//   run(){
//   this.show();
//   this.move();
//   this.bounce();
//   }
  
//   //watch this!!!
  
//   show() {
//     noStroke();
//     ellipse(this.x, this.y,random(5,10));
//   }

//   move() {
//     this.x += this.xspeed;
//     this.y += this.yspeed;
//   }

//   bounce() {
//     if (this.x > width-10 || this.x < 10) {
//       this.xspeed *= -1;
//     }
//       if (this.y > width-10 || this.y < 10) {
//       this.yspeed *= -1;
//     }
//   }


// }let ball1;
let ball2;

function setup() {
  createCanvas(400, 400);
  ball1 = new Bounce(2, 3, 4, 1);
  ball2 = new Bounce(3, 4, 5, 3);
}

function draw() {
  background(220);
  ball1.show();
  ball1.move();
  
  ball2.move();
  ball2.show();

}
//   noFill();
//   strokeWeight(4);
//   ellipse(x, y, 10);
//   x = x + xspeed;
//   y = y + yspeed;
//   if (x < 0 || x > width) {
//     xspeed *= -1;

//   }
//   if (y < 0 || y > height) {
//     yspeed *= -1;
//   }



class Bounce {
  constructor(x, y, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  show() {
    noFill();
    strokeWeight(2);
    stroke(0);
    ellipse(this.x, this.y, 10);

  }

  move() {

    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
    if (this.x < 0 || this.x > width) {
      this.xspeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.yspeed *= -1;
    }
  }
}let x,y,xspeed=1,yspeed=1;
function setup() {
  createCanvas(400, 400);
  x=random(0,width);
  y=random(0,height);
}

function draw() {
  background(220);
  noFill();
  strokeWeight(4);
  ellipse(x,y,10);
  x=x+xspeed;
  y=y+yspeed;
  if(x<0||x>width){
    xspeed*=-1;
    
     }
  if(y<0||y>height){
  yspeed*=-1;
  }
}
var x;
var y;
var xspeed;
var yspeed;
var r;

function setup() {
  createCanvas(400, 400);
  x = random(0, width);
  y = random(0, height);

}

function draw() {
  background(220);
  bouncingBall(5, 5, 5, 3, 1);
}
//it draws stuff

function bouncingBall(x, y, r, xspeed, yspeed) {
  noFill();
  strokeWeight(1);
  ellipseMode(CENTER);
  ellipse(x, y, r, r);
  console.log(x,y);
  x = x + xspeed;
  y = y + yspeed;

  if (x < 0 || x > width) {
    xspeed*=-1;
    //y = y + yspeed;
  } 
  if (y < 0 || y > height) {
   // x = x + xspeed;
   yspeed*=-1;
  }


}var x ;
var y ;
var xspeed ;
var yspeed ;
var r;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  bouncingBall(5,5,2,1,1)
}

function bouncingBall(x,y,r,xspeed,yspeed) {
  noFill();
  strokeWeight(3);
  ellipseMode(CENTER);
  ellipse(x, y, r, r);
  if (x > r && y >  ) {
    x = x + xspeed;
    y = y + yspeed;
  }
  // } else if(x > width-r && y < height-r) {
  //   x = -(x + xspeed);
  //   y = y + yspeed;
  // }
  // else if(x < width-r && y > height-r) {
  //   x = -(x + xspeed);
  //   y = -(y + yspeed);
  // }
  // else if(x < 0+r && y < height-r) {
  //   x = (x + xspeed);
  //   y = -(y + yspeed);
  
}let breadUps = [];
let breadDns = [];
let hams = [];
let tomatos = [];
let lettuses = [];
let cheeses = [];
let bread = 4;
let meat = 5;
let vegie = 3;
let x, y, colW, colH;



function setup() {
  createCanvas(800, 600);
  colW = 50;
  colH = 50;
  for (let i = 0; i < bread; i++) {
    breadUps[i] = new BreadUp(random(width), random(-height, height));
    breadDns[i] = new BreadDn(random(width), random(-height, height));
  }

  for (let i = 0; i < meat; i++) {
    hams[i] = new Ham(random(width), random(-height, height));
    cheeses[i] = new Cheese(random(width), random(-height, height));
  }

  for (let i = 0; i < vegie; i++) {
    tomatos[i] = new Tomato(random(width), random(-height, height));
    lettuses[i] = new Lettus(random(width), random(-height, height));
  }

}

function draw() {
  //background
  background(238, 222, 203);
  for (let col = 0; col < width / colW; col++) {
    for (row = 0; row < height / colH; row++) {
      let x = col * colW;
      let y = row * colH;
      noFill();
      stroke(190, 119, 87);
      strokeWeight(2);
      rect(x, y, colW, colH);
    }
  }

  //ADD THE TRAY
  
  push();
  fill(190, 119, 87);
  rect(20, 555, 750, 20);
  pop();

  push();
  noStroke();
  fill(235, 187, 145);
  rect(mouseX - 50, 535, 100, 20, 10)
  pop();
  
 

  //hamburger elements
  for (b of breadUps) {
    b.show();
    b.move();
    b.reset();
  }

  for (b of breadDns) {
    b.show();
    b.move();
    b.reset();
    b.addtotray();
  }

  for (b of hams) {
    b.show();
    b.move();
    b.reset();
  }

  for (b of cheeses) {
    b.show();
    b.move();
    b.reset();
  }

  for (b of tomatos) {
    b.show();
    b.move();
    b.reset();
  }

  for (b of lettuses) {
    b.show();
    b.move();
    b.reset();
  }

}
var inc=0.008;
var whiteframe= 100;
function setup() {
  createCanvas(600, 600);
  fill(0);
  noStroke();
  rectMode(CENTER);
  frameRate(24);
  noiseDetail(3,0.5);
  
}

function draw() {
  background(255);
  for( let x= 10+whiteframe; x<width-whiteframe; x+=10) {
  	for( let y= 10+whiteframe; y<height-whiteframe; y+=10){
      var n = noise(x*inc, y*inc, frameCount*0.05);
      push();
      translate(x,y);
      rotate(TWO_PI*n);
      scale(10*n);
      rect(0,0,1,1);
      pop();
    }
  }
}
function collapse () {
}
let bubbles = [];



function setup() {
  createCanvas(600, 400);
  frameRate(20);
  // for (let i = 0; i < 2; i++) {
  //   bubbles[i] = new Bubble(200, 200, 40);
  // }
}
// function mousePressed(){
function mouseDragged(){
let r =random(10,50);
let b =new Bubble(mouseX,mouseY,r)
bubbles.push(b);
// bubbles[0]=b;

}


function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    // let x = 30+60*i;
    // let y = random(height)
    // let r = random(20,30)
    // bubbles[i]=new Bubble(x,y,r);
    bubbles[i].move();
    bubbles[i].show();
   
  }
}


class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(255)
    noFill()
    strokeWeight(0.1)
    ellipse(this.x, this.y, this.r * 2);
  }

}var nums = [100, 25, 46, 72];

function setup() {
  createCanvas(500, 400);
}

function draw() {
  background(0);
	for(var i =0;i<4;i++){
    noFill()
    stroke(255);
  ellipse(i*100+100,200,nums[i],nums[i]);}
  // ellipse(100, 200, nums[0], nums[0]);
  // ellipse(200, 200, nums[1], nums[1]);
  // ellipse(300, 200, nums[2], nums[2]);
  // ellipse(400, 200, nums[3], nums[3]);
}// var words =["rainbow","friendship","purple","friendships"]
var nums = [100,25,27,23];
var num = 23;
var index = 0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  // ellipse(100,200,num,num);
  ellipse(200,200,nums[2],nums[2]);
  // fill(255);
  // textSize(32);
  // text(words[index],12,200);
}

// function mousePressed(){
// index=index+1;
//   if (index==words.length){index=0}
// }let bubble1;
let bubble2;

function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble(200,200,20);
  bubble2 = new Bubble(100,200,20);

}

function draw() {
  background(0);
  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show();
  // print(bubble.x, bubble.y);
}

class Bubble {
  constructor(x,y,r) {
    this.x = x;
    this.y = y;
    this.r=r;
  }
  
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  
  show() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r*2);

  }
}

// function show(){
// stroke(255);
// strokeWeight(4);
//   noFill();
//   ellipse(bubble.x,bubble.y,24,24);

// }

// function move(){
// bubble.x = bubble.x+ random(-5,5);
// bubble.y = bubble.y + random(-5,5);
// }var x;
var y;
var w;
var h;
var i;
var j;
var col;
var opa;



function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  drawGrid(10, 5);
  fillColor(10, 5);
  


}

function drawGrid(m, n) {
  // fill(150);
	noFill();// cus it's just drawing a grid
  stroke(255);
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++) {
      w = width / m;
      h = height / n;
      x = i * width / m;
      y = j * height / n;
      rect(x, y, w, h);
    }
  }
}

//need to make the shade change when the mouse is inside..?
function fillColor(m, n) {
  // fill(220);
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++) {
      w = width / m;
      h = height / n;
      x = i * width / m;
      y = j * height / n;
 			var col = map(mouseX, 0, width, 0, 255);
      var opa = map(mouseY, 0, height, 150, 255);
      if (x < mouseX && mouseX < x + w && y < mouseY && mouseY < y + h) {
       fill(col, opa);
        rect(x, y, w, h);
        
      } else {
        noFill() //so important!!
      }
      console.log(col,opa);
    }
  }

}function setup() {
  createCanvas(400, 400);
  
}

function draw() {
  background(220);
  
  for(i=0;i<10;i++){
    
    for(j=0;j<5;j++){
   rect(i*width/10,j*width/5,width/10,height/5);
    }
  }
  
  if(mouseX>i*width/10){
  
    
    rect(i*width/10,j*width/5,width/10,height/5);
  fill(mouseX+mouseY/4);
    
     }
}var bouncingy = 60;
var speed = 1;
var angle = 0; //2 quadrangle

var jitter = 0.0 //rect jitter
var spot = 0.0
var k = 0;
var t = 1;
var rectY = 180;
var rspeed = 1;

var x;
var y;

function setup() {
  createCanvas(400, 300);
  frameRate(60);
  angleMode(DEGREES);

}

function draw() {
  background(241, 220, 230);
//draw background
  push();
  for (var y = 20; y <= height - 20; y += 20) {
    for (var x = 20; x <= width - 20; x += 20) {
      noStroke();
      fill(190,194,226);
      ellipse(x, y, 4+(mouseX + mouseY) / 400, 4+(mouseX + mouseY) / 400);
      stroke(250);
      // translate(x,y);
      // translate(x,y);
      // rotate(angle/50);
      line(x,y,x+(mouseX + mouseY) / 400,y+(mouseX + mouseY) / 400);
      
//how to make them rotate at there own place????
    }
  }
  pop();
  
  //draw a shrinkingball control the size with x & y
  push();
  noFill();
  stroke(228, 154, 193);
  strokeWeight(2 + (mouseX + mouseY) / 400);
  var shrinkingballR = map(mouseX + mouseY, 0, width, 50, 60);
  ellipse(80, 100, shrinkingballR, shrinkingballR);
  pop();

  //bouncingball yposition y++, 
  fill(243, 228, 109)
  noStroke();
  var bouncingsize = (mouseX + mouseY) / 200;
  ellipse(300, bouncingy, 50 + bouncingsize, 50 + bouncingsize);
  bouncingy = bouncingy + speed;

  if (bouncingy < 70) {
    speed = 1;
  }

  if (bouncingy > 100) {
    speed *= -(1 + (mouseX + mouseY) / 800);

    //make the ball bouncing has a speedup as it come closer;
  }

  //draw quadrangle
  push();
  translate(200, 100);
  rotate(45);
  rotate(angle);
  noFill();
  strokeWeight(2);
  strokeJoin(ROUND);
  stroke(214, 100, 72);
  rectMode(CENTER);
  rect(0, 0, 40, 40);
  rect(0, 0, 30, 30);
  rect(0, 0, 20, 20);
  rect(0, 0, 10, 10);
  angle = angle + (1 + (mouseX + mouseY) / 200);
  pop(); //so that dont disturb pther things


  //draw a ball around the circle
  push();

  noFill();
  stroke(87, 36, 212); //circle color
  strokeWeight(2);
  translate(200, 200);
  ellipse(0, 0, 60, 60);
  // rotate(90);
  rotate(angle);
  fill(115, 110, 242); //ball color
  noStroke();
  ellipse(30, 0, 15, 15);
  angle = angle + 1 + (mouseX + mouseY) / 200;
  //why ellipse is rounding it????//kksolved

  pop();


  //jitter rect
  push();
  fill(226, 115, 60);
  jitter = random(-1, 1);
  spot += k;
  // var k = map(mouseX, 75, 85, -0.1, 0.1);
  var c = 5*sin(spot) ;
  if (mouseX>50&&mouseX<110&&mouseY<230&&mouseY>170){
 	k=100;  
  }
  else{
  k=15
  }
  
  
  
  translate(80, 200);

  // translate(80,200); will translate twice! dont do it
  rotate(c);
  
  rectMode(CENTER);
  rect(0, 0, 60, 60, 3);
  pop();




  //rect into ellipse
  push();
  fill(219, 114, 103);
  translate(310, rectY);
  rotate(90);
  rotate(angle);
  angle = angle + 1;
  rectMode(CENTER);
  rect(0, 0, 50, 50, t);

  if (rectY < 180) {
    rspeed = 0.5;
  }
  rectY = rectY + rspeed;

  t = map(rectY, 180, 200, 5, 25, true);

  if (rectY > 200) {

    rspeed = -1
  }

  if (rectY > 200) {

    rspeed = -1
  }




  //why this doesn't work??????

  pop();

}  var BouncingballY = 0;
  var speed = 1;//bouncing ball
  var angle=0;//quadrangle
  var randomcircle={
    x:80,
    y:160
  }
  var angleCross=0;//cross
  var bright =0;//fadingcircle

  var rad = 20; // Width of the shape
  var xpos, ypos; // Starting position of shape

  var xspeed = 2.8; // Speed of the shape
  var yspeed = 2.2; // Speed of the shape

  var xdirection = 1; // Left or Right
  var ydirection = 1; // Top to Bottom

  var dragging = false; // Is the slider being dragged?
  var rollover = false; // Is the mouse over the slider?

  // Circle variables for knob
  var x = 160;
  var y = 180;
  var r = 40;

  //rect 
 var a = 0.0;
 var s = 0.0;


 //rect
  
  var spot = 0.0;
  var jitter = 0.0;
 
 //circle and dots
  var angleLinesoncircle=0;


  function setup() {
  createCanvas(400,400);
  angleMode(DEGREES);
  noStroke();
  frameRate(1000);
  //ellipseMode(RADIUS);
  // Set the starting position of the shape
  xpos = width / 6;
  ypos = height / 5;
  
}

function draw() {
  background(255);
  
  
  
//helenmade this
  for(var y=20;y<=height-20;y+=10){
  for(var x=20;x<=width-20;x+=10){ 
    noStroke();
    fill(240);
    ellipse(x, y, 4, 4);
// Draw a line to the center of the display line(x, y, 240, 60);
} }
  

  //shrinkingball
  stroke(0,0,250);
  strokeWeight(2);
  noFill();
  var shrinkingballW= map(mouseY,0,width,20,35);
  var shrinkingballH= map(mouseY,0,width,20,35);
  ellipse(335,260,shrinkingballW,shrinkingballH);
  
  //bouncingball
  fill(0,0,255);
  ellipse(155, BouncingballY, 10, 10);
  if (BouncingballY<60) {
    speed=1;
  }
  BouncingballY = BouncingballY + speed;
  if(BouncingballY>100){
    speed=-1;
  }
  BouncingballY = BouncingballY + speed;
  
  //quadrangle
  push();
  translate(250,80)
  rotate(45)
  rotate(angle);
  noFill()
  stroke(0,0,255)
  strokeWeight(1);
  
  rectMode(CENTER);
  rect(0,0,40,40);
  rect(0,0,30,30);
  rect(0,0,20,20);
  rect(0,0,10,10);
  angle=angle+1;
  pop();
  
  //3line
  strokeCap(SQUARE);
  strokeWeight(4);
  stroke(0,0,255);
  // line(350,70,320,70);
  // line(350,80,320,80);
  // line(350,90,320,90);
  var lineX1 = map(mouseX,0,width,330,340);
  line(lineX1,70,320,70);
  var lineX2 = map(mouseX,0,width,320,330);
  line(350,80,lineX2,80);
  var lineX3 = map(mouseX,0,width,330,340);
  line(lineX3,90,320,90);
  
  //randomcircle
  noFill();
  strokeWeight(2);
  stroke(0,0,255);
  ellipse(randomcircle.x,160,15,15);
  fill(0,0,255);
  ellipse(70,160,15,15);
  randomcircle.x = randomcircle.x + random(-2, 2);
  
  //transformationcircle
  noFill();
  strokeWeight(1);
  stroke(0,0,255);
  ellipse(250,160,random(20),20);
  
  //small circle+big circle
  push();
  noFill();
  stroke(0,0,255);
  // ellipse(160,160,40,40);
  
  translate(160,160);
  ellipse(0,0,40,40);
  rotate(90);
  rotate(angle);
  fill(0,0,255);
  ellipse(13,13,15,15);
  angle=angle+1;
  pop();
  
  //cross
  push();
  fill(0,0,255)
  strokeWeight(8);
  translate(335,160);
  rotate(45)
  rotate(angleCross);
  line(-20,0,20,0);
  line(0,-20,0,20);
  angleCross=angleCross-1;
  pop();
  
  //2 small circle
  push();
  fill(0,0,255);
  noStroke();
  translate(70,255);
  rotate(45)
  rotate(angleCross);
  ellipse(0,20,10,10);
  ellipse(0,-10,10,10);
  pop();


  
  //dots
  push();
  var eSize = 7;
  var x1 = mouseY;
  var y1 = 240;
  translate(250,240);
  rotate(90);
  line(0, y1-240, 40, y1-240);
  var x1=map(mouseY,0,width,240,250);
  fill(0,0,255)
  ellipse(x1-240, y1-240, eSize, eSize);
  line(0,y1+20-240,40,y1+20-240);
  ellipse(x1+10-240,y1+20-240,eSize,eSize) 
  line(0,y1-20-240,40,y1-20-240)
  ellipse(x1-240+20,y1-20-240,eSize,eSize) 
  fill(0);
  pop();
  
  //fadingcircle
  fill(bright);
  noStroke();
  ellipse(160,260,30,30);
  if (mouseX < 200 && mouseY < 260) {
    bright = 255;
  }else{
    fill(0,0,255);
    ellipse(160,260,30,30);
    bright=bright-30;
  }
  bright=bright-30;
  
  push();
  angleMode(DEGREES); // Change the mode to DEGREES
  var a = (mouseY - height / 2, mouseX - width / 2);
  //also works better if you tried mouseY-260
  translate(335,260);
  push();
  rotate(a);
  strokeCap(ROUND);
  rect(-20, -5, 40, 10); // Larger rectangle is rotating in degrees
  pop();
  //angleMode(RADIANS); // Change the mode to RADIANS
  rotate(a); // var a stays the same
  //rect(-40, -5, 20, 10); // Smaller rectangle is rotating in radians
  pop();


  // Update the position of the shape
  xpos = xpos + xspeed * xdirection;
  ypos = ypos + yspeed * ydirection;
  // Test to see if the shape exceeds the boundaries of the screen
  // If it does, reverse its direction by multiplying by -1
  if (xpos > 50|| xpos < 100) {
    xdirection *= -1;
  }
  if (ypos > 200|| ypos < 200) {
    ydirection *= -1;
  }
  // Draw the shape
  ellipse(xpos, ypos, rad, rad);
  
    
  //rect
  
  a = a + 0.04;
  s = cos(a)*1; //why use cos?
  push();
  stroke(0,0,255);
  noFill()
  rectMode(CENTER);

  
  translate(65, 335);
  scale(s); 
  rect(0, 0, 30, 30); 
  pop();
 
  
  //rect jitter
  push();
  if (second() % 2 == 0) {  //what is this for?
  jitter = random(-1, 1);
   }
  spot = spot +5;
  //use cosine to get a smooth CW and CCW motion when not jittering
  var c = sin(spot);
  translate(320, 323);
  rotate(c);
  rect(0, 0, 65, 65); 
  pop();
  
  //lines on a circle
  push();
  translate(160,335);
  rotate(90)
  rotate(angleLinesoncircle)
  strokeWeight(2);
  stroke(0,0,255);
  noFill();
  ellipse(0,0,30,30);
  fill(255);
  stroke(255);
  rect(-13,-10,26,1);
  rect(-16,-5,34,1)
  rect(-16,0,34,1);
  rect(-16,5,34,1);
  rect(-13,10,26,1);
  angleLinesoncircle=angleLinesoncircle-1
  pop();
  
  
  //triangle
  //rotate(angle)
  //triangle(233, 350, 250, 321, 267, 350);  
  
  noFill()
  stroke(0,0,255)
  translate(250,335)
  rotate(angle)
  ellipse(0,0,30,20)
  rotate(5)
  ellipse(0,0,20,30)
  rotate(3)
  ellipse(0,0,10,30)
  rotate(3)
  ellipse(0,0,30,10)
    
}
//var moveY = 0;
var speed = 1;
var drX = 260;
var drY = 355;
var drX2 = 248;
var drY2 = 363;
var drX3 = 239;
var drY3 = 359;

var eyes = {
  x: 250,
  y: 250,
  sizeX: 10,
  sizeY: 20

}

function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(252, 199, 223);

  // var hito = {
  // locX: random(width),
  // locY: random(height),
  // size: random(10, 25)
  // }

  //textSize(hito.size);
  //text('一口ちょうだい', hito.locX, hito.locY);




  //Cat

  //Outline
  noStroke();
  fill(66, 62, 87);
  ellipseMode(CENTER);
  ellipse(250, 300, 200, 150);

  //Ears
  triangle(153, 283, 185, 180, 253, 300);
  triangle(347, 283, 315, 180, 247, 300);
  fill(252, 199, 223);
  triangle(173, 245, 187, 198, 200, 230);
  triangle(327, 245, 314, 198, 300, 230);

  //Moon
  fill(255, 245, 126);
  ellipseMode(CENTER);
  ellipse(250, 245, 25, 25);
  fill(66, 62, 87);
  ellipse(250, 240, 22, 18);

  //Nose&Mouth
  fill(252, 199, 223);
  noStroke(0);
  ellipseMode(CENTER);
  ellipse(250, 320, 13, 7);

  //drooling

  fill(120, 183, 224);
  ellipse(drX, drY, 7, 12);
  drY = drY + (speed + 0.3);
  ellipse(drX2, drY2, 5, 10);
  drY2 = drY2 + speed;
  ellipse(drX3, drY3, 5, 10);
  drY3 = drY3 + (speed + 0.5);

  if (drY > 510) {
    drY = 350;
    drX = random(230,260);
  }
  if (drY2 > 510) {
    drY2 = 350;
    drX2 = random(230,260);
  }
  if (drY3 > 510) {
    drY3 = 350;
    drX3 = random(230,260);
  }
  
//   if (mouseX > 170 && mouseX <330 && mouseY > 200 && mouseY < 400) {
//     noStroke(0);
//     fill(255, 109, 133);
//     arc(250, 335, 15, 30, 0, PI);
//     noFill(0);
//     stroke(1, 70);
//     line(250, 335, 250, 350);
    
//   }
    
  
//   if (mouseIsPressed && mouseX > 230 && mouseX < 270 && 
//       mouseY > 350 && mouseY < 370) {
    
//     text('一口ちょうだい', 150, 120)
//   }

  if (mouseIsPressed) {
    noStroke(0);
    fill(255, 109, 133);
    arc(250, 335, 15, 30, 0, PI);
    noFill(0);
    stroke(1, 70);
    line(250, 335, 250, 350);
    //drX = 243;
    //drY = 355;
    fill(0)
    textSize(30);
    text('一口ちょうだい', random(145, 155),random(120,130));

  }

  // noFill(0);
  stroke(255);
  strokeWeight(1)
  fill(66, 62, 87);
  curve(250, 300, 250, 335, 230, 335, 260, 280);
  curve(250, 300, 250, 335, 270, 335, 260, 280);

  //Lines
  stroke(0);
  strokeWeight(1);
  line(183, 277, 200, 280);
  line(183, 295, 202, 290);
  line(317, 277, 299, 280);
  line(317, 295, 298, 290);

  strokeWeight(2);
  line(125, 300, 165, 310);
  line(120, 320, 165, 320);
  line(130, 340, 170, 330);
  line(375, 300, 335, 310);
  line(380, 320, 335, 320);
  line(370, 340, 330, 330);

  //Eyes

  //roll = atan2(mouseY - height / 2, mouseX - width / 2);
  //console.log(roll);
  //eyes.x = 250 + 3 * cos(roll);
  //eyes.y = 250 + 3 * sin(roll);

  var eyesY = map(mouseY, 0, height, 280, 290);
  var eyesX = map(mouseX, 0, width, 215, 225);

  noStroke();
  fill(255);
  ellipse(220, 285, 35, 45);
  ellipse(280, 285, 35, 45);
  fill(66, 62, 87);
  ellipse(eyesX, eyesY, eyes.sizeX + 15, eyes.sizeY + 15);
  ellipse(eyesX + 60, eyesY, eyes.sizeX + 15, eyes.sizeY + 15);
  fill(255);
  ellipse(eyesX, eyesY, eyes.sizeX, eyes.sizeY);
  ellipse(eyesX + 60, eyesY, eyes.sizeX, eyes.sizeY);

  //fish
  fill(120, 183, 224);
  noStroke(0);
  ellipseMode(CENTER);
  //ellipse(100, 100, 60, 30);
  ellipse(mouseX, mouseY, 60, 30);
  triangle(mouseX + 20, mouseY, mouseX + 50, mouseY - 15, mouseX + 50, mouseY + 15);

  if (mouseIsPressed) {

    stroke(0)
    line(mouseX - 10, mouseY - 7, mouseX - 20, mouseY + 3);
    line(mouseX - 10, mouseY + 3, mouseX - 20, mouseY - 7);
    speed = 4

  } else {
    fill(0)
    ellipse(mouseX - 18, mouseY, 5, 5);
    speed = 1
  }

}let numCols;
let numRows;
let colW;
let rowH;
function setup() {
  createCanvas(400, 400);
 numCols=100;
 numRows=100;
 colW=width/numCols;
 rowH=height/numRows;
}

function draw() {
  background(255);
  noStroke();
  // let counter = 0;
//   for(var i =0;i<50;i++){
//   for(var j=0;j<50;j++){
    
//    rect()
//   }
    
//   }
  
  for(let col=0;col<numCols;col++){
  for(let row=0;row<numRows;row++){
    // rect(x,y,width/50,height/50);
    // if((col+row)%2==1)fill('black')
    // else
    // fill('white')
    let x =col*colW;
    let y =row*rowH;
    let d=dist(mouseX,mouseY,x,y);
    let speed =0.1;
    d=map(d,0,dist(0,0,width,height),200,0);
     fill(d,d,200);
    rect(x,y,colW,rowH);
    y=y-y*speed*(y-mouseY);
    x=x-x*speed*(x-mouseX);
    
   
  }
}
   
}
  // line(x,0,x,height);
    // counter++;
  // line(0,y,width,y); 
    // counter++;
  
  // console.log(counter);
class Ball {

  constructor(x, y, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;

    let bg = 128;
    let bgspeed = 5;

    function setup() {
      createCanvas(400, 400);
    }

    run() {
      this.update();
      this.render()
    }

    function draw() {
      background(bg);
      // bgspeed = bounce(bg, 128, 255, bgspeed);
      update() {
        this.xspeed = bounce(this.x, 0, width, this.xspeed);
        this.yspeed = bounce(this.y, 0, height, this.yspeed);
        // bounce();
        this.x += this.xspeed;
        this.y += this.yspeed;

      }
    }

    // bg+=bgspeed;
    ellipse(this.x, this.y, 50, 50);
  }


}

function bounce(state, low, high, speed) {
  if (state > high || state < low) speed *= -1;
  return speed;
}



// function bouncing() {


//   if (x > width || x < 0) 
//     xspeed *= -1;

//   if (y > height || xy < 0) 
//     yspeed *= -1;


// }// One element controlled by the mouse.
// One element that changes over time, independently of the mouse.
// One element that is different every time you run the sketch.
// e.g. Try refactoring your Week 1 HW by removing all the hard-coded numbers except for createCanvas(). Have some of the elements follow the mouse. Have some move independently. Have some move at random.
// e.g. Do the above but change color, alpha, and/or strokeWeight instead of position.
// Or do something completely different!
var on = false;
var cr = 250;
var cb = 200;
var cg = 200;
var spot = {
  x: 100,
  y: 50
};

var col = {
  r: 0,
  g: 25,
  b: 9
}
var b=100;
var g=200;
var r=150;
var on = false;

// var dr;
// var size = random(1,20);
function setup() {
  createCanvas(600, 400);



}

function draw() {

    fill(255);
      rect(250,350,100,50)
  // fr = map (mouseY,0,600,48,6);
  // frameRate(fr);
  if(mouseY>350){
    
  cr = map(mouseY, 0, 600, 100, 26000);
  cg = map(mouseX, 0, 600, 100, 200);
  cb = map(mouseX, 0, 600, 100, 200);
  }
  // fill(cr, cg, cb);
  if (on) {
    background(300, 105, 150,50);
  } else {
    background(cr, cg, cb, 50);
  }
  
   
  
  b++;
	b=b%300;
  g++;
	g=g%300;
  
	// r++;
	// r=r%500;
  noStroke();

  var dot = {
    locationX: random(width),
    locationY: random(height),
    size: random(1, 8)
  }
  ellipse(dot.locationX, dot.locationY, dot.size, dot.size);


  

  // if (mouseX > 200 && mouseX < 400 && mouseY>100 &&mouseY<300){
  spot.x = random(mouseX - 30, mouseX + 30);
  spot.y = random(mouseY - 30, mouseY + 30);
  col.r = random(100, 2600);
  col.g = random(100, 250);
  col.b = random(100, 150);
  
  //random. size for ellipse but bigger 
  fill(col.r, col.g, col.b, 80);
  ellipse(spot.x, spot.y, dot.size * 2, dot.size * 2);

  // }
  // cr = map(mouseY, 0, 600, 100, 26000);
  // cg = map(mouseX, 0, 600, 100, 200);
  // cb = map(mouseX, 0, 600, 100, 200);
  // fill(cr, cg, cb);
  // console.log(cr, cg, cb)
  // rect(0, 0, 50, 400)
  // rect(0, 0, 600, 50)
  // rect(550, 0, 400, 400)
  // rect(0, 350, 600, 50)
}



function mousePressed() {
  
    if (mouseX > 250 && mouseX < 350 && mouseY > 350 && mouseY < 400) {
        fill(255);
      rect(250,350,100,50)
      on = !on;
    }
  }
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  for (i = 0; i < 10; i++) {
    stroke(100, mouseX, mouseY);
    strokeWeight(2);
    line(i / 10 * width, 0, i / 10 * width, height);

    for (k = 0; k < 10; k++) {
      // stroke(100, 204, 0);
      // strokeWeight(3);
      line(0,k / 10 * width, height, k / 10 * width);
      
      // if(i%2==0){
        
        fill(255);
        rect((i)/10*width,(i)/10*width,1/10*height,1/10*height);
        rect((i+2)/10*width,(i)/10*width,1/10*height,1/10*height);
        rect((i+4)/10*width,(i)/10*width,1/10*height,1/10*height);
      	rect((i+6)/10*width,(i)/10*width,1/10*height,1/10*height);
      	rect((i+8)/10*width,(i)/10*width,1/10*height,1/10*height);
      	rect((i)/10*width,(i+2)/10*width,1/10*height,1/10*height);
      	rect((i)/10*width,(i+4)/10*width,1/10*height,1/10*height);
      	rect((i)/10*width,(i+6)/10*width,1/10*height,1/10*height);
        rect((i)/10*width,(i+8)/10*width,1/10*height,1/10*height);
        // rect((i+1)/10*width,(i+)/10*width,1/10*height,1/10*height);
        // rect((i+4)/10*width,(i+1)/10*width,1/10*height,1/10*height);
        
         // }
       
       // line(0,k / 10 * width, k / 10 * width, height);
    }

  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  /*
  
  2. 分成 i 个区域，用loop */
  background(220);
  noStroke();

  for (let i = 0; i < 10; i++) {
    // var k = random(100, 200);
    let x = i * width / 10;

    if (mouseX > i / 10 * width && mouseX < (i + 1) / 10 * width) {
      fill(255, i*10, i*20);
      rect(i / 10 * width, 0, 1 / 10 * width, height);


    }

  }





//   if (mouseX < 1 / 3 * width && mouseX > 0) {
//     fill(255, 0, 0);
//     rect(0, 0, 1 / 3 * width, height);}


//      else if (mouseX>1/3*width&&mouseX < 2 / 3 * width){
//       fill(255, 0, 0);
//     rect(1 / 3 * width, 0, 1 / 3 * width, height);
//      }
//       else if (mouseX>2/3*width&&mouseX < width){
//       fill(255, 0, 0);
//     rect(2 / 3 * width, 0, 1 / 3 * width, height);}



}function setup() {
  createCanvas(400, 400);
}

function draw() {
  /*
  
  2. 分成 i 个区域，用loop */
  background(220);
  noStroke();

  for (let i = 0; i < 10; i++) {
    
	let x = i*width/10;
    if (mouseX > i / 10* width && mouseX < (i + 1) / 10* width) {
      fill(255, 0, 0);
      rect(i / 10 * width, 0, 1/10 * width , height);
      if(i%2==0){
        fill(0,0,255);
    rect(i / 10 * width, 0, 1/10 * width , height);
        
    }
      
    }

    	
  }


  //   if (mouseX < 1 / 3 * width && mouseX > 0) {
  //     fill(255, 0, 0);
  //     rect(0, 0, 1 / 3 * width, height);}


  //      else if (mouseX>1/3*width&&mouseX < 2 / 3 * width){
  //       fill(255, 0, 0);
  //     rect(1 / 3 * width, 0, 1 / 3 * width, height);
  //      }
  //       else if (mouseX>2/3*width&&mouseX < width){
  //       fill(255, 0, 0);
  //     rect(2 / 3 * width, 0, 1 / 3 * width, height);}



}/*
1. divide 


*/

function setup() {
  createCanvas(400, 400);
}

function draw() {
  /*
  
  2. 分成 i 个区域，用loop */
  background(220);
  noStroke();

  for (let i = 0; i < 10; i++) {
	let x = i*width/10;
    if (mouseX > i / 10* width && mouseX < (i + 1) / 10* width) {
      fill(255, 0, 0);
      rect(i / 10* width, 0, 1/10*width , height);
      if(i<5){
        fill(0,0,255);
    rect(i / 10* width, 0, 1/10*width , height);
    }
    }

    	
  }


  //   if (mouseX < 1 / 3 * width && mouseX > 0) {
  //     fill(255, 0, 0);
  //     rect(0, 0, 1 / 3 * width, height);}


  //      else if (mouseX>1/3*width&&mouseX < 2 / 3 * width){
  //       fill(255, 0, 0);
  //     rect(1 / 3 * width, 0, 1 / 3 * width, height);
  //      }
  //       else if (mouseX>2/3*width&&mouseX < width){
  //       fill(255, 0, 0);
  //     rect(2 / 3 * width, 0, 1 / 3 * width, height);}



}/*
1. divide 


*/

function setup() {
  createCanvas(400, 400);
}

function draw() {
  /*
  
  2. 分成 i 个区域，用loop */
  background(220);
  noStroke();

  for (let i = 0; i < 10; i++) {
	let x = i*width/10;
    if (mouseX > i / 10* width && mouseX < (i + 1) / 10* width) {
      fill(255, 0, 0);
      rect(i / 10* width, 0, 1/10*width , height);
      if(i==7){
        fill(220);
    rect(7 / 10* width, 0, 1/10*width , height);
    }
    }

    	
  }


  //   if (mouseX < 1 / 3 * width && mouseX > 0) {
  //     fill(255, 0, 0);
  //     rect(0, 0, 1 / 3 * width, height);}


  //      else if (mouseX>1/3*width&&mouseX < 2 / 3 * width){
  //       fill(255, 0, 0);
  //     rect(1 / 3 * width, 0, 1 / 3 * width, height);
  //      }
  //       else if (mouseX>2/3*width&&mouseX < width){
  //       fill(255, 0, 0);
  //     rect(2 / 3 * width, 0, 1 / 3 * width, height);}



}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for (let i = 0; i < 10; i++) {
    //console.log(i);
    let x = i * width/10;
    if (i == 7) fill('blue');
    else fill('white');
    //ellipse(x, height / 2, 50, 50);
    line(x, 0, x, height);
  }
  
  // The old way of doing things.
  line(0, 0, 0, height);
  line(width/10, 0, width/10, height);
  line(2*width/10, 0, 2*width/10, height);
  line(3*width/10, 0, 3*width/10, height);
  line(4*width/10, 0, 4*width/10, height);
  line(5*width/10, 0, 5*width/10, height);
  line(6*width/10, 0, 6*width/10, height);
  line(7*width/10, 0, 7*width/10, height);
  line(8*width/10, 0, 8*width/10, height);
  line(9*width/10, 0, 9*width/10, height);  
}/*
1. divide 


*/

function setup() {
  createCanvas(400, 400);
}

function draw() {
  /*
  
  2. 分成 i 个区域，用loop */
  background(220);
  noStroke();

  for (let i = 0; i < 10; i++) {
	let x = i*width/10;
    if (mouseX > i / 10* width && mouseX < (i + 1) / 10* width) {
      fill(255, 0, 0);
      rect(i / 10* width, 0, 1/10*width , height);
      if(i==7){
        fill(220);
    rect(7 / 10* width, 0, 1/10*width , height);
    }
    }

    	
  }


  //   if (mouseX < 1 / 3 * width && mouseX > 0) {
  //     fill(255, 0, 0);
  //     rect(0, 0, 1 / 3 * width, height);}


  //      else if (mouseX>1/3*width&&mouseX < 2 / 3 * width){
  //       fill(255, 0, 0);
  //     rect(1 / 3 * width, 0, 1 / 3 * width, height);
  //      }
  //       else if (mouseX>2/3*width&&mouseX < width){
  //       fill(255, 0, 0);
  //     rect(2 / 3 * width, 0, 1 / 3 * width, height);}



}let mouseIsOn = false;
function setup() {
  createCanvas(400, 400);
}

function draw() {

  background(220);
  noStroke();

  if (mouseX < 1 / 3 * width && mouseX > 0 && mouseIsOn==true) {
    fill(255, 0, 0);
    rect(0, 0, 1 / 3 * width, height);
  } else if (mouseX > 1 / 3 * width && mouseX < 2 / 3 * width&&mouseIsOn==true) {
    fill(255, 0, 0);
    rect(1 / 3 * width, 0, 1 / 3 * width, height);
  } else if (mouseX > 2 / 3 * width && mouseX < width&&mouseIsOn==true) {
    fill(255, 0, 0);
    rect(2 / 3 * width, 0, 1 / 3 * width, height);
  }



}

function mousePressed(){
mouseIsOn =!mouseIsOn;

}/*
1. divide 


*/


function setup() {
  createCanvas(400, 400);
}

function draw() {
  
  background(220);

  if (mouseX < 1 / 3 * width && mouseX > 0) {
    fill(255, 0, 0);
    rect(0, 0, 1 / 3 * width, height);}
    
 
     else if (mouseX>1/3*width&&mouseX < 2 / 3 * width){
      fill(255, 0, 0);
    rect(1 / 3 * width, 0, 1 / 3 * width, height);
     }
      else if (mouseX>2/3*width&&mouseX < width){
      fill(255, 0, 0);
    rect(2 / 3 * width, 0, 1 / 3 * width, height);}
          
  

  }
// set up global variables to define the circle's x position and its speed

// function setup(){
//  draw a canvas
// }
// function draw(){
//  draw a ellipse in the middle height of the canvas and from the left side of the canvas
//  then let the circle move from left to right
 
//  set the circle to the opposite run way when it hit the right canvas
// }


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// One element controlled by the mouse.
// One element that changes over time, independently of the mouse.
// One element that is different every time you run the sketch.
// e.g. Try refactoring your Week 1 HW by removing all the hard-coded numbers except for createCanvas(). Have some of the elements follow the mouse. Have some move independently. Have some move at random.
// e.g. Do the above but change color, alpha, and/or strokeWeight instead of position.
// Or do something completely different!
var on = false;
var cr = 250;
var cb = 200;
var cg = 200;
var spot = {
  x: 100,
  y: 50
};

var col = {
  r: 0,
  g: 25,
  b: 9
}
var b=100;
var g=200;
var r=150;
var on = false;
// var dr;
// var size = random(1,20);
function setup() {
  createCanvas(600, 400);


}

function draw() {
  
  fr = map (mouseY,0,600,48,6);
  frameRate(fr);
  
  if (on) {
    background(300, 105, 150,50);
  } else {
    background(r, g, b, 50);
  }
  
  b++;
	b=b%300;
  g++;
	g=g%300;
  
	// r++;
	// r=r%500;
  noStroke();

  var dot = {
    locationX: random(width),
    locationY: random(height),
    size: random(1, 8)
  }
  ellipse(dot.locationX, dot.locationY, dot.size, dot.size);


  

  // if (mouseX > 200 && mouseX < 400 && mouseY>100 &&mouseY<300){
  spot.x = random(mouseX - 30, mouseX + 30);
  spot.y = random(mouseY - 30, mouseY + 30);
  col.r = random(100, 2600);
  col.g = random(100, 250);
  col.b = random(100, 150);
  
  //random. size for ellipse but bigger 
  fill(col.r, col.g, col.b, 80);
  ellipse(spot.x, spot.y, dot.size * 2, dot.size * 2);

  // }
  cr = map(mouseY, 0, 600, 100, 26000);
  cg = map(mouseX, 0, 600, 100, 200);
  cb = map(mouseX, 0, 600, 100, 200);
  fill(cr, cg, cb);
  console.log(cr, cg, cb)
  rect(0, 0, 50, 400)
  rect(0, 0, 600, 50)
  rect(550, 0, 400, 400)
  rect(0, 350, 600, 50)
}



function mousePressed() {
    if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
      on = !on;
    }
  }
var spot = {
  x: 100,
  y: 50
};

var col = { 
  r: 0,
  g: 25,
  b: 9
}

function setup() {
  createCanvas(600, 400);
  background(245);
}

function draw() {
  noStroke();
  spot.x = random(0,600);
  spot.y = random(0,400);
  col.r = random(100,2600);
  col.g = random(100,250);
  col.b = random(100,250);
	fill(col.r,col.g,col.b,100);
  ellipse(spot.x,spot.y,24,24);
}var x = 95;
var y = 150;
var v=0.02;
var d;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);
	//eyedrow
  stroke(0);
  fill(0);
  strokeJoin(ROUND);
  strokeWeight(2);
  beginShape();
  vertex(30,80);
  bezierVertex(80,50,165,65,240,100);
  bezierVertex(145,70,70,75,20,110);
  bezierVertex(30,80,30,80,30,80);
  endShape();
  
  //eyeshape
  noFill();
  strokeWeight(3);
  strokeJoin(ROUND);
  beginShape();
  vertex(30,170);
  bezierVertex(65,115,120,125,155,145);
  bezierVertex(162,150,180,150,190,150);
  bezierVertex(135,180,95,222,30,170);
  endShape();
  
  
  //eyelid
  strokeWeight(6);
  strokeJoin(MITER);
   beginShape();
  vertex(30,170);
  bezierVertex(65,125,120,125,155,145);
  bezierVertex(162,150,180,150,190,150);
   endShape();
  //eye
  fill(0);
  // ellipse(95,160,30,28);
  
	x+=(mouseX-x)*v;
  y+=(mouseY-y)*v;
  
  fill(0);
  ellipse(x,y,30+d*0.02,28+d*0.02);
  d = dist(mouseX,mouseY,95,150)
  
  if(d>60 && 0<d <10){
  x = 95;
  y=150;
    
  }


}
// One element controlled by the mouse.
// One element that changes over time, independently of the mouse.
// One element that is different every time you run the sketch.
// e.g. Try refactoring your Week 1 HW by removing all the hard-coded numbers except for createCanvas(). Have some of the elements follow the mouse. Have some move independently. Have some move at random.
// e.g. Do the above but change color, alpha, and/or strokeWeight instead of position.
// Or do something completely different!
var on = false;
var cr = 250;
var cb = 200;
var cg = 200;
var spot = {
  x: 100,
  y: 50
};

var col = { 
  r: 0,
  g: 25,
  b: 9
}

var dr;

function setup() {
  createCanvas(600, 400);
  background(300,105,150,50);

 
}

function draw() {

   noStroke();

    // if (mouseX > 200 && mouseX < 400 && mouseY>100 &&mouseY<300){
  spot.x = random(mouseX-30,mouseX+30);
  spot.y = random(mouseY-30,mouseY+30);  
  col.r = random(100,2600);
  col.g = random(100,250);
  col.b = random(100,150);
	fill(col.r,col.g,col.b,70);
  ellipse(spot.x,spot.y,24,24);
  
// }
 	cr = map (mouseY,0,600,100,26000);
  cg = map (mouseX,0,600,100,200);
	cb = map (mouseX,0,600,100,200);
 fill(cr,cg,cb);
  console.log(cr,cg,cb)
  rect(0,0,50,400)
  rect(0,0,600,50)
   rect(550,0,400,400)
   rect(0,350,600,50)
  
 
  

  
  function mousePressed(){
  if  (mouseX > 200 && mouseX < 400 && mouseY>100 &&mouseY<300){
    
  
    on=!on;
  }
  }
  
}

// One element controlled by the mouse.
// One element that changes over time, independently of the mouse.
// One element that is different every time you run the sketch.
// e.g. Try refactoring your Week 1 HW by removing all the hard-coded numbers except for createCanvas(). Have some of the elements follow the mouse. Have some move independently. Have some move at random.
// e.g. Do the above but change color, alpha, and/or strokeWeight instead of position.
// Or do something completely different!
var on = false;
var cr = 250;
var cb = 200;
var cg = 200;
var spot = {
  x: 100,
  y: 50
};

var col = {
  r: 0,
  g: 25,
  b: 9
}

var on = false;
// var dr;
// var size = random(1,20);
function setup() {
  createCanvas(600, 400);


}

function draw() {
  
  fr = map (mouseY,0,600,48,6);
  frameRate(fr);
  
  if (on) {
    background(300, 105, 150,50);
  } else {
    background(255, 255, 255, 50);
  }

  noStroke();

  var dot = {
    locationX: random(width),
    locationY: random(height),
    size: random(1, 8)
  }
  ellipse(dot.locationX, dot.locationY, dot.size, dot.size);


  

  // if (mouseX > 200 && mouseX < 400 && mouseY>100 &&mouseY<300){
  spot.x = random(mouseX - 30, mouseX + 30);
  spot.y = random(mouseY - 30, mouseY + 30);
  col.r = random(100, 2600);
  col.g = random(100, 250);
  col.b = random(100, 150);
  
  //random. size for ellipse but bigger 
  fill(col.r, col.g, col.b, 80);
  ellipse(spot.x, spot.y, dot.size * 2, dot.size * 2);

  // }
  cr = map(mouseY, 0, 600, 100, 26000);
  cg = map(mouseX, 0, 600, 100, 200);
  cb = map(mouseX, 0, 600, 100, 200);
  fill(cr, cg, cb);
  console.log(cr, cg, cb)
  rect(0, 0, 50, 400)
  rect(0, 0, 600, 50)
  rect(550, 0, 400, 400)
  rect(0, 350, 600, 50)
}



function mousePressed() {
    if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
      on = !on;
    }
  }
let speed = 0.1;
let x;
let y;
let dx;
let dy;

function setup() {
  createCanvas(600, 600);
  x = width / 2;
  y = height / 2;
}

function draw() {

  background(220);
  rectMode(CENTER);
  //   x += (mouseX - x) * speed;

  //   y += (mouseY - y) * speed;

  dx = x - mouseX;
  dy = mouseY - y;
  x = x - dx * speed;
  y = y + dy * speed;
  
  //trying another way tho
  rect(x, y, width / 2, height / 2);

}let speed = 0.1;
let x;
let y;
let dx;
let dy;

function setup() {
  createCanvas(600, 600);
  x = width / 2;
  y = height / 2;
}

function draw() {

  background(220);
  rectMode(CENTER);
  //   x += (mouseX - x) * speed;

  //   y += (mouseY - y) * speed;

  dx = x - mouseX;
  dy = mouseY - y;
  x = x - dx * speed;
  y = y + dy * speed;
  
  //trying another way tho
  rect(x, y, width / 2, height / 2);

}function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  //rect01
  //draw rect with no hard numbers
  //rect(width/4, height/4, width/2,height/2);
  //rect02
  //draw rect using vertex()
  //
  beginShape();
  vertex(width / 4, height / 4);
  vertex((3 * width) / 4, height / 4);
  vertex((3 * width) / 4, (3 * height / 4));
  vertex(width / 4, (3 * height / 4));
  endShape(CLOSE);
}let x = 0;
let y = 0;

function setup() {
  createCanvas(600, 600);
  x = width / 2;
  y = height / 2;
}


function draw() {
  background(225);
  ellipse(x, y, 20, 20);

  //circle move from middle to right
  // x = x + 1;

  //circle move from middle to left
  // x = x - 1;

  //circle move from middle to lower-right corner
  // x = x + 1;
  // y = y + 1;

  //circle move from middle to lower-left corner
  // x = x - 1;
  // y = y + 1;


  //circle move from middle to upper-right corner
  x = x + 1;
  y = y - 1;

  //circle move from middle to upper-left corner
  // x = x - 1;
  // y = y - 1;
  //circle move from middle to right (10 times faster)
  // x=x+10;

}var on = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (on) {
    background(0, 255, 0);
  }
    else {
      background(0);
    }

    stroke(255);
    strokeWeight(4);
    noFill();
  if (mouseX > 250 && mouseX < 350 && mouseY>150 &&mouseY<250)
  {
    fill(255,0,200);
  }

    rectMode(CENTER);
    rect(300, 200, 100, 100);
    
}
  
  
  function mousePressed(){
      if (mouseX > 250 && mouseX < 350 && mouseY>150 &&mouseY<250)
  if (on) {
    on = false;}
    else {
    on=true;}
  }
  
  // if (mouseX > 250 && mouseX < 350 &&
  // }var spot = {
  x: 100,
  y: 50
};

var col = { 
  r: 0,
  g: 25,
  b: 9
}

function setup() {
  createCanvas(600, 400);
  background(245);
}

function draw() {
  noStroke();
  spot.x = random(0,600);
  spot.y = random(0,400);
  col.r = random(100,2600);
  col.g = random(100,250);
  col.b = random(100,250);
	fill(col.r,col.g,col.b,1);
  ellipse(spot.x,spot.y,24,24);
}
let x=0;
let y =0;
function setup() {
  createCanvas(400, 400);

  x=width/2;
	y=height/2;
}
function draw() {
//   createCanvas(frameCount, frameCount)//overwrite the 
//   background(220);
//   rectMode(CENTER);
//   // rect(1/2*width,1/2*height,1/10*width,1/10*height);
  
//   rect(x,y,w,h)
//   var x=width/2;
//   var y=height/2;
//   var w=height/10;
//   var h=width/10;
  
//   line()
  background(220);
 
 
  x=x+1;
  y=y+1;
   ellipse(x,y,50,50);
}function setup() {
  createCanvas(400, 400);
  rectMode(CENTER,CENTER);
}

function draw() {
  background(220);
  push();
  // rotate();
  // default 
  translate(200,200); //200,200 is 0,0 now
  // rotate(180);
  rect(0,0,50,50);
  pop();
  
  push();
  translate(100,100);
  rect(100,100,50,50)
  pop();
}function setup() {
  createCanvas(400, 250);


  ellipseMode(CENTER);
  rectMode(CENTER);

  background(246, 245, 243);

  //rain
  strokeWeight(2);
  stroke(104,189,225);
  line(70,60,110,120);
  line(10,30,40,90);
  line(250,20,280,90);
  line(140,30,170,90);
  line(270,140,300,190);
  line(70,160,90,190);
  line(310,100,340,150);
  
  //hair
  fill(116, 45, 210);
  noStroke();
  ellipse(200, 105, 130, 150);
   //body
  noStroke();
  fill(255);
  ellipse(200, 250, 100, 195);
  //facecontour
  fill(255, 232, 207);
  noStroke();
  arc(200, 100, 100, 120, 0, PI + QUARTER_PI, OPEN);
  // arc(200, 100, 100, 120, PI + QUARTER_PI,0);
  
  //eyeleft+right
  fill(79, 50, 59);
  ellipse(180, 115, 6, 8);
  ellipse(220, 115, 6, 8);
  //eyelashleft+right
  noFill();
  stroke(79, 50, 59)
  arc(180, 109, 8, 8, HALF_PI, PI);
  arc(220, 109, 8, 8, 0, HALF_PI);
	//mouth
  noFill();
  curveVertex();
  beginShape();
	curveVertex(195,137);
	curveVertex(195,137);
	curveVertex(200,136);
	curveVertex(205,137);
	curveVertex(205,137);
	curveVertex();
	endShape();


}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255, 0, 0);

  fill(0, 255, 255);
  noStroke();
  triangle(0, 30, 0, 400, 565, 400);
  triangle(35, 0, 600, 0, 600, 370);

  push();
  fill(29, 189, 32);
  ellipse(300, 200, 300, 200);
	pop();

  push();
  fill(2, 12, 126)
  rect(420, 180, 30, 30);
	pop();

}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255, 0, 0);

  fill(0, 255, 255);
  noStroke();
  triangle(0, 30, 0, 400, 565, 400);
  triangle(35, 0, 600, 0, 600, 370);


  fill(29, 189, 32);
  ellipse(300, 200, 300, 200);



  fill(2, 12, 126)
  rect(420, 180, 30, 30);

}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0, 255, 255);
  noStroke();
	line(0,30,570,400);
  
  push();
  fill(255, 0, 0);
  line(30,0,600,370);
  pop();
  
  
  

  fill(29, 189, 32);
  ellipse(300, 200, 300, 200);

  
  rectMode(CORNER);
  fill(2, 12, 126)
  rect(420, 180, 30, 30);

}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255, 0, 0);

  fill(0, 255, 255);
  noStroke();
  triangle(0, 30, 0, 400, 565, 400);
  triangle(35, 0, 600, 0, 600, 370);

  fill(29, 189, 32);
  ellipse(300, 200, 300, 200);

  

  fill(2, 12, 126)
  rect(420, 180, 30, 30);

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  noStroke();
  // fill(64, 224,208);
  // //i searched turquoise rgb and got this
  fill(8, 232,222);
  //this is the rgb for BRIGHT TURQUOISE
	ellipse(200, 200, 100, 100);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	fill(___, ___, ___);
	ellipse(200, 200, 100, 100);
}function setup() {
	createCanvas(400, 400);
  // we put it here!
}

function draw() {
	background(220);
}