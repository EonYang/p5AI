let content, letters, ltWidth;
let strPos = -1;
let linePos = 0;
let currentOffset = 0;
let margin = 50;
let fontScale = 36;
let fadeColor = 255;
let lineColor = 255;
let proximaLight, proximaBold;
let keyPress;
function preload() {
    content = loadStrings('content.txt');
    proximaLight = loadFont("Proxima Nova Light.otf");
    proximaBold = loadFont("Proxima Nova Bold.otf");
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    switchLine();
    fill(255);
    textSize(16);
    textFont(proximaBold);
    text('TYPE OUT TO ERASE.', margin, margin);
}
function draw() {
    textAlign(LEFT, TOP);
    textSize(fontScale);
    textFont(proximaLight);
    fill(255);
    noStroke();
    letters = content[linePos].split('');
    if (strPos < 0) {
        ltWidth = 0;
    } else {
        ltWidth = textWidth(letters[strPos]);
        fadeColor = random(0, 50);
        fill(fadeColor);
        let textPos = random(0, 2);
        if (textPos >= 1) {
            text(letters[strPos], margin + currentOffset, height / 2 - random(-height / 3, -fontScale * 2));
        } else {
            text(letters[strPos], margin + currentOffset, height / 2 - random(fontScale * 2, height / 3));
        }
    }
    lineColor = random(255);
    stroke(lineColor);
    line(margin + currentOffset + ltWidth, height / 2 - 2 * margin, margin + currentOffset + ltWidth, height / 2 + margin);
    fill(0);
    noStroke();
    rect(margin + currentOffset, height / 2 - margin, ltWidth, fontScale);
    if (key === letters[strPos + 1]) {
        strPos++;
        currentOffset += ltWidth;
        console.log(strPos);
    }
    if (strPos >= letters.length - 1) {
        linePos++;
        switchLine();
        strPos = -1;
        currentOffset = 0;
        activateText = 0;
    }
}
function switchLine() {
    background(0);
    textAlign(LEFT, TOP);
    textSize(fontScale);
    textFont(proximaLight);
    fill(255);
    noStroke();
    if (linePos >= content.length) {
        linePos = 0;
    }
    text(content[linePos], margin, height / 2 - margin);
}
  let moveFactor = 0;
function setup() {
  createCanvas(250, 250);
}
function draw() {
  background(220);
  textSize(48);
  textAlign(CENTER, TOP);
  text("word", width/2, height - moveFactor);
  moveFactor++
}let content;
let strPos = -1;
let ltWidth;
let currentOffset = 0;
function preload() {
  content = 'Type up to erase.';
}
function setup() {
  createCanvas(400, 400);
  background(255);
  textSize(16);
  noStroke();
  textAlign(LEFT, TOP);
  fill(0);
  text(content, 25, 25);
}
function draw() {
  var letters = content.split('');
  fill(255);
  if (strPos < 0) {
    ltWidth = 0;
  } else {
    ltWidth = textWidth(letters[strPos]);
  }
  rect(25 + currentOffset, 25, ltWidth, 25);
  if (key === letters[strPos + 1]) {
    fill(255);
    strPos++;
    console.log(key);
    currentOffset += ltWidth;
  }
}let srcText = "In linguistics, a word is the smallest element that can be uttered in isolation with objective or practical meaning.";
let para;
function setup() {
  noCanvas();
  para = createP();
  para.style('font-size', '72px');
  para.style('margin', 0);
  let words = srcText.split(" ");
  for (let i = 0; i < words.length; i++) {
    let span = createSpan(words[i]);
    span.style('position: relative');
  	para.child(span);
    let space = createSpan(" ");
    para.child(space);
  }       
}
function parsepx(s) {
  return float(s.replace(/px$/, ''));
}
function draw() {
  let children = selectAll('span', para);
  for (let span of children) {
    span.style('font-size',
               noise(span.html().length, frameCount*0.005)*100 + 'px');
  }
}let srcText = "In linguistics, a word is the smallest element that can be uttered in isolation with objective or practical meaning.";
let para;
function setup() {
  noCanvas();
  para = createP();
  para.style('font-size', '72px');
  para.style('margin', 0);
  for (let i = 0; i < srcText.length; i++) {
    let span = createSpan(srcText.charAt(i));
    span.style('position: relative');
  	para.child(span);
  }       
}
function parsepx(s) {
  return float(s.replace(/px$/, ''));
}
function draw() {
  let children = selectAll('span', para);
  for (let span of children) {
    span.style('top', parsepx(span.style('top')) + random(-0.5, 0.5) + 'px');
    span.style('left', parsepx(span.style('left')) + random(-0.5, 0.5) + 'px');
  }
}let font;
let fontData;
let moveX = 1;
var xoff = 0.0;
let colR = 0;
let colG = 200;
let colB = 180;
function drawPathOutline(cmds) {
  let cx = 0;
  let cy = 0;
  let startX = 0;
  let startY = 0;
  for (let cmd of cmds) {
    switch (cmd.type) {
      case 'M':
        startX = cmd.x;
        startY = cmd.y;
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'L':
        line(cx, cy, cmd.x, cmd.y * moveX);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'C':
        bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Q':
        beginShape();
        vertex(cx, cy);
        quadraticVertex(cmd.x1 * moveX, cmd.y1, cmd.x, cmd.y);
        endShape();
        cx = cmd.x + moveX;
        cy = cmd.y;
        break;
      case 'Z':
        line(cx, cy, startX, startY);
        break;
    }
  }
}
function preload() {
  fontData = loadBytes('KrinkesRegularPERSONAL.ttf');
}
let path;
function setup() {
  createCanvas(400, 400);
  font = opentype.parse(fontData.bytes.buffer);
  path = font.getPath("Move", width / 2 - width / 4, height / 2 + height / 14, width / 3);
}
function draw() {
  background(0);
  push();
  pop();
  push();
  noFill();
  stroke(colR, colG, colB);
  strokeWeight(2);
  pop();
  moveX = noise(xoff)*2;
  xoff += 0.01;
  colR = random(100);
  colG = random(170, 210);
  colB = random(200, 255);
function setup() {
  noCanvas();
  let gridSize = 4;
  let spacing = windowWidth / gridSize;
  for (let i = 0; i < 30; i++) {
    let ch = 'The waves come from the invisible East, patiently, one by one; they reach us, and then, patiently, set off again for the unknown West, one by one. A long voyage, with no beginning and no end. . . .';
    let div = createDiv(ch);
    div.style('transform-origin', 'top left');
    div.position(i * 1.5, i * 14);
    div.style('transform', 'skew(' + i * random(5) + 'deg, ' + i+ 'deg)');
    div.style('font-size', '11px');
    div.style('letter-spacing', i / 30 + 'em');
    div.style('text-align', 'center');
    div.style('font-family', 'Helvetica');
    div.style('font-weight', '300');
    div.style('color', 'rgb(' + i * 10 + ',' + i * 20 + ',' + i * 30 + ')');
  }
}
function draw() {}function setup() {
  let device1 = {
    video: {
      deviceId: '5da7c16384584d0291ec8ff9fa8db70fc9edc3f8f845a27086a586c776d3aa72'
    }
  };
  let device2 = {
    video: {
      deviceId: 'd670728fbc78f696bce8547025112ccaade2e144bc64328c303902dc83ef3bb0'
    }
  };
  let capture1 = createCapture(device1);
  let capture2 = createCapture(device2);
}
navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    devices.forEach(function(device) {
      console.log(device.kind + ": " + device.label +
        " id = " + device.deviceId);
    });
  })
  .catch(function(err) {
    console.log(err.name + ": " + err.message);
  });let scr = "ok, you win.";
function setup() {
noCanvas();
  for (let i=0; i<scr.length;i++){
    let ch = scr.charAt(i);
    let angle = TWO_PI*(i / scr.length);
  let d = createDiv(ch);
  d.style("font-size", "60px");
  d.size(400,50);
      d.position(windowWidth*0.5, windowHeight*0.5);
  d.style("transform", "rotate("+angle+"rad)");
      }
}
function draw() {
}let doodleCol = 80;
let doodleColS = 1;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(80);
  setInterval(drawDoodle, 400);
  setInterval(erase, 10000);
}
function draw() {
  doodleCol -= doodleColS;
  if (doodleCol < 80 || doodleCol > 220) {
    doodleColS *= -1;
  }
}
function erase() {
  background(doodleCol-10);
}
function drawDoodle() {
  push();
  translate(width / 12, height / 8-30);
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 8; j++) {
      push();
      translate(i * (width /6 ), j * (height / 4));
      doodle();
      pop();
    }
  }
  pop();
}
function doodle() {
  noFill();
  stroke(doodleCol,150);
  beginShape();
  let x1 = random(-40, 0);
  vertex(x1, -40);
  vertex(x1, -40);
  let x2 = random(10, 20);
  curveVertex(x2, -40);
  let y1 = random(-30, -10);
  let yInt = random(0, 20);
  vertex(0, y1);
  let x3 = random(0, 20);
  let x4 = random(0, 20);
  let x5 = random(0, 20);
  vertex(x3, y1);
  vertex(0, y1 + yInt);
  vertex(x4, y1 + yInt);
  vertex(0, y1 + yInt * 2);
  vertex(x5, y1 + yInt * 2);
  vertex(0, y1 + yInt * 3);
  let y2 = random(20,80);
  vertex(0, y2);
  vertex(0, y2);
  endShape();
}function setup() {
  createCanvas(300, 300);
  frameRate(4);
}
function draw() {
  background(220);
drawGrid();
  noFill();
  stroke(0);
  strokeWeight(2);
  push();
  translate(width / 2, height / 2);
    scale(2);
  beginShape();
  let x1 = random(-20, 0);
  vertex(x1, -40);
  vertex(x1, -40);
  let x2 = random(10, 20);
  curveVertex(x2, -40);
  let y1 = random(-30,-10);
let yInt = random(5,10);
  vertex(0, y1);
  let x3 = random(0, 10);
  let x4 = random(0, 10);
  let x5 = random(0, 10);
  vertex(x3, y1);
  vertex(0, y1 + yInt);
  vertex(x4, y1 + yInt);
  vertex(0, y1 + yInt*2);
  vertex(x5, y1 + yInt*2);
  vertex(0, y1 + yInt*3);
  vertex(0, 40);
  vertex(0, 40);
  endShape();
  pop();
}
function drawGrid() {
  push();
  translate(width / 2, height / 2);
      scale(2);
  stroke(255, 0, 0);
  strokeWeight(3);
  point(-20, -40);
  point(-20, -30);
  point(-20, -20);
  point(-20, -10);
  point(-20, 0);
  point(-10, -40);
  point(-10, -30);
  point(-10, -20);
  point(-10, -10);
  point(-10, 0);
  point(0, 0);
  point(-20, 40);
  point(-20, 30);
  point(-20, 20);
  point(-20, 10);
  point(-20, 0);
  point(-10, 40);
  point(-10, 30);
  point(-10, 20);
  point(-10, 10);
  point(-10, 0);
  point(0, -40);
  point(0, -30);
  point(0, -20);
  point(0, -10);
  point(0, 40);
  point(0, 30);
  point(0, 20);
  point(0, 10);
  point(20, 40);
  point(20, 30);
  point(20, 20);
  point(20, 10);
  point(20, 0);
  point(10, 40);
  point(10, 30);
  point(10, 20);
  point(10, 10);
  point(10, 0);
  point(20, -40);
  point(20, -30);
  point(20, -20);
  point(20, -10);
  point(10, -40);
  point(10, -30);
  point(10, -20);
  point(10, -10);
  stroke(0, 255, 255);
  strokeWeight(1);
  line(-40, 0, 40, 0);
  line(0, -40, 0, 40);
  pop();
let chars;
let gridSize = 8;
function preload() {
  chars = loadJSON("char74k-normalized.json");
}
function drawLetter() {
  
  let allLetters = Object.keys(chars);
  let charA = random(allLetters);
  let charB = random(allLetters);
  let formA = random(chars[charA]);
  let formB = random(chars[charB]);
  
  for (let stroke of formA) {
    beginShape();
    for (let coord of stroke) {
      if (coord[0] < 0) {
      	vertex(coord[0], coord[1]);
      }
    }
    endShape();
  }
  
  for (let stroke of formB) {
    beginShape();
    for (let coord of stroke) {
      if (coord[0] > 0) {
      	vertex(coord[0], coord[1]);
      }
    }
    endShape();
  }
}
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background(255);
  push();
  translate(width/(gridSize*2), height/(gridSize*2));
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
  		push();
  		translate(i * (width/gridSize), j * (height/gridSize));
      scale(0.2);
      strokeWeight(10);
  		stroke(0);
  		noFill();
  		drawLetter();
  		pop();
  		noLoop();
    }
  }
  pop();
  
}
function mousePressed() {
  draw();
function drawLetter() {
  let pts = [];
  for (let i = 0; i < int(random(5, 15)); i++) {
    pts.push([int(random(-2, 2))*30, int(random(-2, 2))*30]);
  }
  beginShape();
  for (let i = 0; i < pts.length; i++) {
    vertex(pts[i][0], pts[i][1]);
  }
  endShape();
}
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background(220);
  push();
  translate(width/20, height/20);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
  		push();
  		translate(i * (width/10), j * (height/10));
      scale(0.5);
      strokeWeight(2);
  		stroke(0);
  		noFill();
  		drawLetter();
  		pop();
  		noLoop();
    }
  }
  pop();
}
function mousePressed() {
  draw();
}let gridSize = 8;
function toCartesian(r, theta) {
  return [r*cos(theta), r*sin(theta)];
}
function drawLetter() {
  let angles = [];
  for (let i = 0; i < int(random(5, 15)); i++) {
    angles.push(PI/12 * int(random(12)));
  }
  beginShape();
  for (let i = 0; i < angles.length; i++) {
    let xy = toCartesian(50, angles[i]);
    curveVertex(xy[0], xy[1]);
  }
  endShape();
}
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background(220);
  push();
  translate(width/(gridSize*2), height/(gridSize*2));
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
  		push();
  		translate(i * (width/gridSize), j * (height/gridSize));
      scale(0.5);
      strokeWeight(2);
  		stroke(0);
  		noFill();
  		drawLetter();
  		pop();
  		
    }
  }
  pop();
  noLoop();
}
function mousePressed() {
  draw();
let gridSize = 8;
function drawLetter(weight, depth) {
  let opt = int(random(5));
  if (random() < 0.5) {
    rotate(PI*0.125 * int(random(16)));
  }
  if (opt == 0) {
    ellipse(0, 0, 20, 20);
    rotate(PI*0.5);
    translate(20, 0);
  }
  else if (opt == 1) {
    line(-20, 0, 20, 0);
    translate(10, 0);
  }
  else if (opt == 2) {
    line(0, -20, 0, 20);
    translate(0, 10);
  }
  else if (opt == 3) {
    arc(0, 0, 20, 20, random(TWO_PI), random(TWO_PI));
  }
  else {
    line(-5, -10, -5, 10);
    line(5, -10, 5, 10);
    translate(0, 10);
  }
  if ((depth == 1) || (random() < 0.9 && depth < 5)) {
    scale(0.75);
    weight *= 1.33;
    strokeWeight(weight);
    drawLetter(weight, depth+1);
  }
}
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background(220);
  push();
  translate(width/(gridSize*2), height/(gridSize*2));
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
  		push();
  		translate(i * (width/gridSize), j * (height/gridSize));
      scale(1.25);
  		stroke(0);
  		noFill();
  		drawLetter(1, 1);
  		pop();		
    }
  }
  pop();
  noLoop();
}
function mousePressed() {
  draw();
}let chars;
let typing;
function preload() {
  chars = loadJSON("char74k-normalized.json");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  typing = createInput();
  typing.position(10, 10);
  typing.attribute('placeholder', 'type text here');
  frameRate(5);
}
function draw() {
  background(255, 64);
  stroke(0, 0, 90, 128);
  strokeWeight(2);
  translate(50, 50);
  let xoff = 0;
  let yoff = 0;
  for (let ch of typing.value()) {
  	if (chars.hasOwnProperty(ch)) {
  		let form = random(chars[ch]);
    	noFill();
    	for (let stroke of form) {
      	beginShape();
      	for (let coord of stroke) {
        	vertex(xoff+(coord[0]*0.1),
                 yoff+(coord[1]*0.1));
      	}
      	endShape();
    	}
  	}
    xoff += 20;
    if (xoff > width - 100) {
      xoff = 0;
      yoff += 60;
    }
  }
  
}
var fontReg, fontItal, fontBold;
function preload() {
  fontReg = loadFont("OldStandard-Regular.otf");
  fontItal = loadFont("OldStandard-Italic.otf");
  fontBold = loadFont("OldStandard-Bold.otf");
}
var started = false;
var shifted = false;
var onboarding = "To begin, press return, then type the first thought that comes to your mind. Each keystroke will produce about a second of sound. Continue typing without letting the music fade out until the screen is full of text.";
var contents = "";
var meter = new Tone.Meter();
var masterCompressor = new Tone.Compressor({
  "threshold": -6,
  "ratio": 3,
  "attack": 0.5,
  "release": 0.1
});
var lowBump = new Tone.Filter(200, "lowshelf");
Tone.Master.chain(
                  masterCompressor, meter);
var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
var kick = new Tone.MembraneSynth().connect(pingPong).toMaster();
var synth = new Tone.PolySynth(20, Tone.Synth, {
  "oscillator": {
    type: "square",
  },
  envelope: {
    attack: 0.5,
    decay: 0.2,
    sustain: 0.1,
    release: 1
  }
}).toMaster();
var synthFilter = new Tone.AutoFilter({
  frequency: 1,
  type: "sine",
  depth: 1,
  baseFrequency: 200,
  octaves: 2.6,
  filter: {
    type: "lowpass",
    rolloff: -12,
    Q: 1
  }
})
var pingPong2 = new Tone.PingPongDelay("16t", 0.1).toMaster();
var synth2 = new Tone.Synth({
  oscillator: {
    type: "triangle"
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
    release: 1
  }
}).connect(synthFilter).connect(pingPong2).toMaster();
var feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toMaster();
var synth3 = new Tone.FMSynth().connect(feedbackDelay).toMaster();
Tone.Master.volume = -10;
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  var mutable = false;
  var level = meter.getLevel();
  var size = map(level, 0, 1, 0, 200);
  var textColor = map(level, -40, 15, 25, 250);
  background(25);
  fill(textColor);
  if (started == false) {
    fill(random(175, 250));
    textAlign(CENTER);
    textFont(fontBold);
    textSize(48);
    text("Automatic Writing", width / 2, height / 4);
    fill(random(175, 250));
    textAlign(CENTER);
    textFont(fontItal);
    textSize(24);
    text(onboarding, width / 4, height / 3, width / 2, height - 50);
  }
  if (keyIsPressed) {
    if (keyCode == 8) {
      background(128, 0, 0);
    } else if (keyCode == 13) {
      started = true;
      background(255);
  	}
  }
  textSize(24);
  textFont(fontReg);
  text(contents, 25, 25, width - 50, height - 50);
  if (level > -50) {
    mutable = true;
  }
  if (level < -50) {
    started = false;
    mutable = false;
    contents = "";
  }
    if (keyIsPressed) {
    if (keyCode == 16) {
      shifted = true;
    } else {
      shifted = false;    
    }
  }
}
function keyTyped() {
  contents += key;
}
function keyPressed() {
  started = true;
  if (shifted == true) {
        switch (keyCode) {
      
      synth.triggerAttackRelease(["A3", "A4", "C4", "E5"], "2m");
      break;
      kick.triggerAttackRelease("A1", "1n");
      break;
      synth.triggerAttackRelease(["D#2", "D#3", "D#4", "D#5"], "1n");
      break;
      synth.triggerAttackRelease(["D#2", "D#3", "D#4", "D#5"], "1n");
      break;
      synth.triggerAttackRelease(["G3", "C4", "E4", "G5"], "1m");
      break;
      synth.triggerAttackRelease(["A3", "A4", "C4", "E4", "A5", "E5"], "2m");
      break;
      synth.triggerAttackRelease(["G3", "B4", "D4", "G4"], "1m");
      break;
      synth.triggerAttackRelease(["B4", "D4", "G4", "B5"], "1m");
      break;
      synth.triggerAttackRelease(["F3", "A4", "C4", "F4"], "1m");
      break;
      synth.triggerAttackRelease(["A4", "C4", "F4", "A4"], "1m");
      break;
      kick.triggerAttackRelease("E6", "1n");
      break;
      synth.triggerAttackRelease(["E3", "C4", "E4", "G4"], "1m");
      break;
      kick.triggerAttackRelease("A7", "1n");
      break;
      synth.triggerAttackRelease(["D4", "F4", "A5", "D5"], "1m");
      break;
      synth.triggerAttackRelease(["C4", "F4", "A5", "C5"], "1m");
      break;
      synth.triggerAttackRelease(["C3", "E3", "A4", "E4"], "1m");
      break;
      synth.triggerAttackRelease(["A3", "C3", "E3", "C4", "E4"], "1m");
      break;
      synth.triggerAttackRelease(["B3", "D3", "F4", "A4", "B4", "F5", "A5"], "1m");
      break;
      synth.triggerAttackRelease(["A3", "D3", "F4", "A4", "D4", "F5", "A5"], "1m");
      break;
      synth.triggerAttackRelease(["F3", "A4", "C4", "F4", "A5", "C5"], "2m");
      break;
      synth.triggerAttackRelease(["A3", "A4", "C4", "F5"], "2m");
      break;
      synth.triggerAttackRelease(["C3", "E4", "A4", "C4", "E5", "A5"], "2m");
      break;
      kick.triggerAttackRelease("A6", "1n");
      break;
      kick.triggerAttackRelease("E6", "1n");
      break;
      synth.triggerAttackRelease(["A3", "C3", "F4", "A4", "C4", "F5", "A5"], "2m");
      break;
      synth.triggerAttackRelease("A2", "1n");
      break;
      synth2.triggerAttackRelease("B3", "1n");
      break;
      synth2.triggerAttackRelease("C2", "1n");
      break;
      synth.triggerAttackRelease("C1", "1n");
      break;
      synth3.triggerAttackRelease("A1", "1n");
      break;
      synth.triggerAttackRelease("C4", "1n");
      break;
      synth.triggerAttackRelease("G3", "1n");
      break;
      synth.triggerAttackRelease("E2", "1n");
      break;
      synth3.triggerAttackRelease("A4", "1n");
      break;
      synth.triggerAttackRelease("D4", "1n");
      break;
      synth.triggerAttackRelease("B4", "1n");
      break;
      synth.triggerAttackRelease("E3", "1n");
      break;
      synth2.triggerAttackRelease("C3", "1n");
      break;
      synth2.triggerAttackRelease("E4", "1n");
      break;
      synth3.triggerAttackRelease("A3", "1n");
      break;
      synth3.triggerAttackRelease("G4", "1n");
      break;
      synth3.triggerAttackRelease("F4", "1n");
      break;
      synth3.triggerAttackRelease("E5", "1n");
      break;
      synth.triggerAttackRelease("E4", "1n");
      break;
      synth3.triggerAttackRelease("A4", "1n");
      break;
      synth3.triggerAttackRelease("C4", "1n");
      break;
      synth2.triggerAttackRelease("B5", "1n");
      break;
      synth3.triggerAttackRelease("G5", "1n");
      break;
      synth2.triggerAttackRelease("D5", "1n");
      break;
      synth3.triggerAttackRelease("G4", "1n");
      break;
      synth2.triggerAttackRelease("F5", "1n");
      break;
    default:
      break;
  }
      } else {
        
      	switch (keyCode) {
      
      synth.triggerAttackRelease(["A3", "A4", "C4", "E5"], "2m");
      break;
      kick.triggerAttackRelease("A1", "1n");
      break;
      synth.triggerAttackRelease(["D#2", "D#3", "D#4", "D#5"], "1n");
      break;
      synth.triggerAttackRelease(["D#2", "D#3", "D#4", "D#5"], "1n");
      break;
      synth.triggerAttackRelease(["C3", "C4", "E4", "G5"], "2m");
      break;
      kick.triggerAttackRelease("E3", "1n");
      break;
      kick.triggerAttackRelease("A3", "1n");
      break;
      kick.triggerAttackRelease("C3", "1n");
      break;
      kick.triggerAttackRelease("D3", "1n");
      break;
      kick.triggerAttackRelease("E4", "1n");
      break;
      kick.triggerAttackRelease("G4", "1n");
      break;
      kick.triggerAttackRelease("A4", "1n");
      break;
      kick.triggerAttackRelease("C4", "1n");
      break;
      kick.triggerAttackRelease("D4", "1n");
      break;
      kick.triggerAttackRelease("E5", "1n");
      break;
      synth.triggerAttackRelease(["A3", "C3", "E4", "A4"], "2m");
      break;
      synth.triggerAttackRelease(["A3", "E3", "E4", "A4"], "2m");
      break;
      synth.triggerAttackRelease(["B3", "D3", "F4", "A4", "B4"], "2m");
      break;
      synth.triggerAttackRelease(["A3", "D3", "F4", "A4", "D4"], "2m");
      break;
      synth.triggerAttackRelease(["F4", "A4", "C4", "F5", "A5"], "2m");
      break;
      synth.triggerAttackRelease(["A3", "A4", "C4", "F4"], "2m");
      break;
      synth.triggerAttackRelease(["C3", "E4", "A4", "C4", "E4", "A5"], "2m");
      break;
      synth.triggerAttackRelease(["F3", "A4", "C4", "F4"], "2m");
      break;
      synth.triggerAttackRelease(["A3", "C3", "E4", "A4", "C4", "E5", "A5"], "2m");
      break;
      synth.triggerAttackRelease(["E2", "A3", "C3", "F4", "A4", "C4", "F4"], "2m");
      break;
      synth.triggerAttackRelease("A1", "1n");
      break;
      synth2.triggerAttackRelease("B2", "1n");
      break;
      synth2.triggerAttackRelease("C1", "1n");
      break;
      synth.triggerAttackRelease("C2", "1n");
      break;
      synth3.triggerAttackRelease("A2", "1n");
      break;
      synth.triggerAttackRelease("C3", "1n");
      break;
      synth.triggerAttackRelease("G2", "1n");
      break;
      synth.triggerAttackRelease("E1", "1n");
      break;
      synth3.triggerAttackRelease("A3", "1n");
      break;
      synth.triggerAttackRelease("D3", "1n");
      break;
      synth.triggerAttackRelease("B3", "1n");
      break;
      synth.triggerAttackRelease("E2", "1n");
      break;
      synth2.triggerAttackRelease("C4", "1n");
      break;
      synth2.triggerAttackRelease("E3", "1n");
      break;
      synth3.triggerAttackRelease("A4", "1n");
      break;
      synth3.triggerAttackRelease("G3", "1n");
      break;
      synth3.triggerAttackRelease("F3", "1n");
      break;
      synth3.triggerAttackRelease("E4", "1n");
      break;
      synth.triggerAttackRelease("E5", "1n");
      break;
      synth3.triggerAttackRelease("A5", "1n");
      break;
      synth3.triggerAttackRelease("C5", "1n");
      break;
      synth2.triggerAttackRelease("B4", "1n");
      break;
      synth3.triggerAttackRelease("G4", "1n");
      break;
      synth2.triggerAttackRelease("D4", "1n");
      break;
      synth3.triggerAttackRelease("G5", "1n");
      break;
      synth2.triggerAttackRelease("F4", "1n");
      break;
    default:
      break;
  }
      }
  
var proximaLight;
var proximaBold;
var margin = 30;
var myRec = new p5.SpeechRec();
myRec.continuous = false;
myRec.interimResults = true;
var myVoice = new p5.Speech();
function preload() {
  proximaLight = loadFont("Proxima Nova Light.otf");
  proximaBold = loadFont("Proxima Nova Bold.otf");
}
function setup() {
  createCanvas(1200, 720);
  frameRate(24);
  background(255);
  myRec.start();
  myRec.onEnd = restartRec;
  myVoice.speak('Repeat after me.');
  setTimeout(firstLine, 2000);
  setTimeout(secondLine, 10000);
}
function firstLine() {
  var lines = 'Our Country shall live - Be our military, He who is a call!';
  myVoice.speak(lines);
  fill(255);
  noStroke();
  rect(0, 0, width, height / 2);
  textAlign(LEFT, TOP);
  textSize(100);
  textLeading(90);
  textFont(proximaBold);
  fill(0);
  noStroke();
  myRec.onResult = showResult;
  lines =lines.toUpperCase();
  text(lines, margin, margin, width - margin, height / 2 - margin);
}
function secondLine() {
  var lines = 'Be our dear fatherland for ever, Our Country, Will set forth before the Ruler By Birth!';
  myVoice.speak(lines);
  fill(255);
  noStroke();
  rect(0, 0, width, height / 2);
  textAlign(LEFT, TOP);
  textSize(100);
  textLeading(90);
  textFont(proximaBold);
  fill(0);
  noStroke();
  myRec.onResult = showResult;
  lines =lines.toUpperCase();
  text(lines, margin, margin, width - margin, height / 2 - margin);
}
function draw() {
}
function showResult() {
  fill(255);
  noStroke();
  rect(0, height / 2, width, height);
  var upStr = myRec.resultString.toUpperCase();
  textAlign(LEFT, TOP);
  textSize(100);
  textLeading(90);
  textFont(proximaBold);
  fill(0);
  noStroke();
  text(upStr, margin, height / 2, width - margin, height - margin);
}
function restartRec() {
  myRec.start();
}function setup() {
    createCanvas( 500, 200 );
}
function draw() {
    background( 126, 192, 238 );
  
    textAlign(LEFT);
    
    var red = [255, 0, 0];
    var green = [0, 255, 0];
    var string = [
        ["I want ", red],
        ["THIS ", green],
        ["to be in green.", red]
    ];
    drawtext(50, 50, string );
}
function drawtext( x, y, text_array ) {
  
    var pos_x = x;
    for ( var i = 0; i < text_array.length; ++ i ) {
        var part = text_array[i];
        var t = part[0];
        var c = part[1];
        var w = textWidth( t );
        fill( c );
        text( t, pos_x, y);
        pos_x += w;
    }
}var content;
var splitStr = '';
var strPos = -1;
var output = '';
var oldOutput = '';
var charNum = 100;
var charCt = 0;
var charGoal = 500;
var proximaLight;
var proximaBold;
function preload() {
  content = loadStrings('content.txt', splitContent);
  proximaLight = loadFont("Proxima Nova Light.otf");
  proximaBold = loadFont("Proxima Nova Bold.otf");
}
function setup() {
  createCanvas(1200, 720);
  frameRate(24);
}
function draw() {
  background(0);
  textAlign(LEFT, TOP);
  textSize(36);
  textLeading(42);
  textFont(proximaLight);
  fill(255);
  noStroke();
  var activeType = [' + ', ' = '];
  text(output + random(activeType) + oldOutput, width / 3, height / 4, width / 3 * 2 - width / 10, height / 2);
  showStats();
}
function showStats() {
  textFont(proximaBold);
  textSize(12);
  text("GOAL", width / 20, width / 20);
  textSize(20);
  text(charGoal, width / 20, width / 20 + 18);
  textSize(12);
  text("TOTAL GENERATED", width / 20 + 80, width / 20);
  textSize(20);
  text(charCt, width / 20 + 80, width / 20 + 18);
  stroke(200);
  line(width / 20, width / 10, width / 20, height - width / 20);
  stroke(200);
  var charLength = charCt / charGoal * (height - width / 10);
  line(width / 20 + 80, width / 10, width / 20 + 80, width / 10 + charLength);
}
function keyPressed() {
  strPos++;
  charCt++;
  if (strPos >= splitStr.length) {
    strPos = 0;
    output += ' ';
  }
  output += splitStr[strPos];
  if (output.length > charNum) {
    oldOutput = output;
    output = "";
  }
}
function splitContent() {
  splitStr = content[0].split('');
}let textStr = '';
let splitStr = '';
let strPos = -1;
let output = '';
function setup() {
  createCanvas(400, 400);
  textStr = 'Hello, I\'m testing this weird typing program. No matter what I type, the same words come out.';
  splitStr = textStr.split('');
}
function draw() {
  background(220);
  text(output, 10, 10, 380, 380);
}
function keyPressed(){
  strPos++;
    if (strPos>=splitStr.length){
    strPos = 0;
      output+=' ';
  }
  output += splitStr[strPos];
}let descendRow = 1;
let ascendRow = term.rows;
let descendCol = term.cols / 2 - 4;
let ascendCol = term.cols / 2 - 1;
function setup() {
  noCanvas();
}
function draw() {
  term.write(ansi.cursor.position(descendRow, descendCol));
  term.write(ansi.format("落DESCEND", ["blue"]));
  term.write(ansi.cursor.position(descendRow, descendCol - 8));
  term.write(ansi.format("-_-_-_-_", ["blue"]));
  if (descendRow < term.rows) {
    descendRow++;
  } else if (descendCol > 1) {
    descendCol -= 18;
    descendRow = 1;
  }else{
    descendCol = term.cols-8;
    descendRow = 1;
  }
  term.write(ansi.cursor.position(ascendRow, ascendCol));
  term.write(ansi.format("ASCEND 起", ["red"]));
  term.write(ansi.cursor.position(ascendRow, ascendCol + 8));
  term.write(ansi.format(" +^+^+^+^", ["red"]));
  if (ascendRow > 1) {
    ascendRow--;
  } else if (ascendCol < term.cols) {
   ascendCol += 18;
    ascendRow = term.rows;
  }else{
    ascendCol = 1;
    ascendRow = term.rows;
  }
  let colors = ["blue", "red"];
  let emptyCh = ["空", "em", "emp", "pt", "ty", " ", "  ", "   "," ", "  ", "   ",];
  for (let i = 0; i < 25; i++) {
    let row = int(random(term.rows));
    let col = int(random(term.cols));
    term.write(ansi.cursor.position(row, col));
    let c = random(colors);
    let ch = random(emptyCh);
    term.write(ansi.format(ch, [c]));
  }
}let s = "Please do not erase!";
function setup() {
  noCanvas();
  frameRate(4);
  term.write(s);
}
function draw() {
  
  if (frameCount % (s.length+1) == 0) {
  	term.write(s);
  }
  else {
    term.write("\b \b");
  }
let trainCol = 0;
function setup() {
  noCanvas();
  frameRate(4);
}
function draw() {
  
  if (frameCount % 2 == 0) {
    term.write(ansi.cursor.position(term.rows - 1, ghostCol));
    term.write("GHOST");
    if (ghostCol > 1) {
      ghostCol--;
    }
  }
  else {
    term.write(ansi.cursor.position(term.rows - 1, trainCol));
    term.write("TRAIN");
    if (trainCol < term.cols - 5) {
      trainCol++;
    }
  }
  
function setup() {
  noCanvas();
  frameRate(10);
}
function draw() {
  let colors = ["magenta", "cyan", "blue", "white"];
  let chars = [".", "+", "*"];
  
  for (let i = 0; i < 25; i++) {
    let row = int(random(term.rows));
    let col = int(random(term.cols));
    term.write(ansi.cursor.position(row, col));
    let c = random(colors);
    let ch = random(chars);
    if (random() < 0.5) {
      term.write(ansi.format(ch, [c, "bold"]));
    } else {
      term.write(ansi.format(ch, [c]));
    }
  }
  
  for (let i = 0; i < 25; i++) {
    let row = int(random(term.rows));
    let col = int(random(term.cols));
    term.write(ansi.cursor.position(row, col));
    term.write(" ");
  }
  
}function setup() {
  noCanvas();
  frameRate(60);
  term.write(ansi.styles(['bg-blue', 'bold', 'blue']));
}
function draw() {
  if (random() < 0.5) {
		term.write("/");
  }
  else {
    term.write("\\");
  }
function setup() {
  noCanvas();
  frameRate(4);
}
function draw() {
  
  let fgColor = int(random(30, 38));
  let bgColor = int(random(40, 48));
  let moveBack = int(random(10));
  
  term.write("\x1B["+fgColor+"m");
  term.write("\x1B["+bgColor+"m");
  term.write("\x1B["+moveBack+"DThis is a test.");
}function setup() {
  noCanvas();
  frameRate(4);
}
function draw() {
  let randRow = int(random(term.rows));
  let randCol = int(random(term.cols));
      
  term.write(ansi.cursor.position(randRow,randCol) + "I'm fine");
  
  
  
}let canvas;
let storyText;
let storyNum = 0;
let accentCol;
let sum = 100;
let economy = 0;
let corruption = 0;
let equality = 0;
let war = 0;
let nature = 0;
let health = 0;
let propaganda = 0;
let stReleased = 2;
let stGained = 3;
let minStress = -4;
let maxStress = 16;
let leftX = 100;
let leftY = 50;
let slider = [];
let xpos = 0;
let ypos = 100;
let yInt = 80;
let sliderL = 200;
let sliderW = 10;
let sliderH = 20;
function setup() {
  canvas = createCanvas(windowWidth / 2, windowHeight);
  canvas.position(windowWidth / 2, 0);
  accentCol = color(210, 180, 30);
  storyText = createP("It could be anytime in the past, the present or the future. It could be anywhere in the world. \n\nYou see a family of five sitting at a dinner table, having a conversation about politics. You don't know who started the topic, but it's apparently a bad idea as they all have different opinions. Everyone in the family is visibly stressed. \n\nYou don’t know them. But as the leader of their world, you can’t help but think that your policies and allocation of resources could potentially make them feel better.\n\nPlan your resource allocation using the sliders and click APPLY CHANGES to see how that affects the conversation in the family.");
  storyText.position(0, leftY);
  storyText.size(width, height);
  xpos = width / 3 + leftX;
  slider[0] = new Slider(xpos, ypos, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[1] = new Slider(xpos, ypos + yInt, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[2] = new Slider(xpos, ypos + yInt * 2, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[3] = new Slider(xpos, ypos + yInt * 3, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[4] = new Slider(xpos, ypos + yInt * 4, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[5] = new Slider(xpos, ypos + yInt * 5, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[6] = new Slider(xpos, ypos + yInt * 6, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
}
function draw() {
  background(0);
  for (let i = 0; i < slider.length; i++) {
    slider[i].display();
  }
  let totalVal = slider[0].val + slider[1].val + slider[2].val + slider[3].val + slider[4].val + slider[5].val + slider[6].val;
  if (totalVal > 100) {
    for (let i = 0; i < slider.length; i++) {
      slider[i].x--;
    }
  }
  let bttnCol = color(0, 0, 0);
  let bttnCol2 = color(0, 0, 0);
  if (mouseX > leftX && mouseX < leftX + 100 && mouseY > leftY && mouseY < leftY + 100) {
    bttnCol = accentCol;
  } else {
    bttnCol = color(0, 0, 0);
  }
  if (mouseX > leftX && mouseX < leftX + 100 && mouseY > leftY + 125 && mouseY < leftY + 225) {
    bttnCol2 = accentCol;
  } else {
    bttnCol2 = color(0, 0, 0);
  }
  fill(bttnCol);
  stroke(220);
  rect(leftX, leftY, 100, 100);
  fill(220);
  noStroke();
  textFont('Helvetica');
  textSize(14);
  textAlign(CENTER, CENTER);
  text("APPLY\nCHANGES", leftX + 50, leftY + 50);
  fill(bttnCol2);
  stroke(220);
  rect(leftX, leftY + 125, 100, 100);
  fill(220);
  noStroke();
  text("Progress\nwithout\nchanges", leftX + 50, leftY + 175);
  textSize(14);
  textStyle(NORMAL);
  noStroke();
  fill(220);
  textAlign(LEFT, TOP);
  text("RESOURCE ALLOCATION   TOTAL: 100%", xpos, 50);
  fill(accentCol);
  textStyle(BOLD);
  text(floor(slider[0].val) + " %", xpos, ypos - yInt / 4);
  text(floor(slider[1].val) + " %", xpos, ypos + yInt - yInt / 4);
  text(floor(slider[2].val) + " %", xpos, ypos + yInt * 2 - yInt / 4);
  text(floor(slider[3].val) + " %", xpos, ypos + yInt * 3 - yInt / 4);
  text(floor(slider[4].val) + " %", xpos, ypos + yInt * 4 - yInt / 4);
  text(floor(slider[5].val) + " %", xpos, ypos + yInt * 5 - yInt / 4);
  text(floor(slider[6].val) + " %", xpos, ypos + yInt * 6 - yInt / 4);
  fill(220);
  text("Economy and job opportunities", xpos + 35, ypos - yInt / 4);
  text("Efforts to end corruption", xpos + 35, ypos + yInt - yInt / 4);
  text("Equality and eliminating discrimination", xpos + 35, ypos + yInt * 2 - yInt / 4);
  text("War with a neighboring country", xpos + 35, ypos + yInt * 3 - yInt / 4);
  text("Environmental issues", xpos + 35, ypos + yInt * 4 - yInt / 4);
  text("Health and welfare", xpos + 35, ypos + yInt * 5 - yInt / 4);
  text("Propaganda", xpos + 35, ypos + yInt * 6 - yInt / 4);
}
function mousePressed() {
  if (mouseX > leftX && mouseX < leftX + 100 && mouseY > leftY && mouseY < leftY + 100) {
    economy = slider[0].val;
    corruption = slider[1].val;
    equality = slider[2].val;
    war = slider[3].val;
    nature = slider[4].val;
    health = slider[5].val;
    propaganda = slider[6].val;
    storyProgress();
  }
  if (mouseX > leftX && mouseX < leftX + 100 && mouseY > leftY + 125 && mouseY < leftY + 225) {
    storyProgress();
  }
}
function mouseReleased() {
  for (let i = 0; i < slider.length; i++) {
    slider[i].dragging = false;
  }
}
function storyProgress() {
  let storyEvents = n.stepAndRender();
  storyNum++;
  let divider = createP(storyNum + ' ||||||||||||||||||||||||||||||');
  divider.style('color', accentCol);
  if (storyEvents.length > 0) {
    storyText.html(" ");
    for (let i = 0; i < storyEvents.length; i++) {
      let storyEv = createP(storyEvents[i]);
      storyEv.size(width - leftX, storyEv.size.height);
    }
  }
  window.scrollTo(0, document.body.scrollHeight);
}
let n = new seaduck.Narrative({
  "nouns": [{
      "name": "Grandma",
      "properties": {
        "stressed": true,
        "stressLevel": 10,
        "age": 75,
      },
      "tags": ["person"]
    },
    {
      "name": "Dad",
      "properties": {
        "stressed": true,
        "stressLevel": 10,
        "age": 55,
      },
      "tags": ["person"]
    },
    {
      "name": "Mom",
      "properties": {
        "stressed": true,
        "stressLevel": 10,
        "age": 53,
      },
      "tags": ["person"]
    },
    {
      "name": "Brother",
      "properties": {
        "stressed": true,
        "stressLevel": 10,
        "age": 30,
      },
      "tags": ["person"]
    },
    {
      "name": "Sister",
      "properties": {
        "stressed": true,
        "stressLevel": 10,
        "age": 20,
      },
      "tags": ["person"]
    },
  ],
  "actions": [{
      "name": "Too Subtle",
      "match": ["#person"],
      "when": function(a) {
        return a.properties.age == 30&&economy >= 10 && economy <= 25 && corruption >= 10 && corruption <= 25 && equality >= 10 && equality <= 25 && war >= 10 && war <= 25 && nature >= 10 && nature <= 25 && health >= 10 && health <= 25 && propaganda >= 10 && propaganda <= 25;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Too Subtle"));
      }
    },
    {
      "name": "Economy < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return economy < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 55 || a.properties.age == 30 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Economy < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Economy > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return economy > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 55 || a.properties.age == 30 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Economy > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Anti-Corruption < 10% Disagree",
      "match": ["#person"],
      "when": function(a, b) {
        return corruption < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 55 || a.properties.age == 53);
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("Anti-Corruption < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Anti-Corruption < 10% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return corruption < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Anti-Corruption < 10% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Anti-Corruption > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return corruption > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 55 || a.properties.age == 53);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Anti-Corruption > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Anti-Corruption > 25% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return corruption > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Anti-Corruption > 25% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Equality < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return equality < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 53);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Equality < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Equality < 10% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return equality < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 55 || a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Equality < 10% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Equality > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return equality > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 53);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Equality > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Equality > 25% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return equality > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 55 || a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Equality > 25% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "War < 10% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return war < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 75 || a.properties.age == 53 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("War < 10% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "War < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return war < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 55);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("War < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "War > 25% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return war > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 75 || a.properties.age == 53 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("War > 25% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "War > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return war > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 55);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("War > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Nature < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return nature < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 75 || a.properties.age == 53);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Nature < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Nature < 10% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return nature < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 55);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Nature < 10% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Nature > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return nature > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 75 || a.properties.age == 53);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Nature > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Nature > 25% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return nature > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 55);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Nature > 25% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Health < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return health < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 75 || a.properties.age == 55 || a.properties.age == 30 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Health < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Health > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return health > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 75 || a.properties.age == 55 || a.properties.age == 30 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Health > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Propaganda < 10% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return propaganda < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && a.properties.stressLevel > minStress && a.properties.stressLevel < maxStress && (a.properties.age == 75 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Propaganda < 10% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Propaganda < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return propaganda < 10 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 53 || a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Propaganda < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Propaganda > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return propaganda > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 53 || a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Propaganda > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Propaganda > 25% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return propaganda > 25 && a.properties.stressLevel >= minStress && a.properties.stressLevel <= maxStress && (a.properties.age == 75 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Propaganda > 25% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "stressFree",
      "match": ["#person"],
      "when": function(a) {
        return a.properties.stressLevel < minStress && minStress - a.properties.stressLevel <= 2;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("stressFree", a));
        a.properties.stressLevel -= 100;
        a.properties.stressed = false;
      }
    },
    {
      "name": "veryStressed",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return a.properties.stressLevel > 10 && a.properties.stressLevel <= maxStress && b.properties.stressLevel >= minStress && b.properties.stressLevel <= maxStress;
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("veryStressed", a, b));
        b.properties.stressLevel++;
      }
    },
    {
      "name": "tooStressed",
      "match": ["#person"],
      "when": function(a) {
        return a.properties.stressLevel > maxStress && a.properties.stressLevel - maxStress <= 2;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("tooStressed", a));
        a.properties.stressLevel += 100;
      }
    },
    {
      "name": "feelingBetter",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return a.properties.stressLevel >= minStress && a.properties.stressLevel < 4 && b.properties.stressLevel >= minStress && b.properties.stressLevel <= maxStress;
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("feelingBetter", a, b));
        b.properties.stressLevel--;
      }
    },
  ],
  "traceryDiscourse": {
    "isStressed": [
      "#nounA# is stressed."
    ],
    "Too Subtle":[
    "Your policies are too moderate. The family isn't even noticing any changes. Hint: try making a bigger gesture such as allocating more than 25% of your resources to particular issues." 
      ],
    "stressFree": [
      "#nounA# is not stressed anymore. You feel like you did a good job."
    ],
    "veryStressed": [
      "#nounA# is very stressed, making #nounB# stressed too."
    ],
    "tooStressed": [
      "#nounA# is too stressed to talk. You've failed to help #nounA#."
    ],
    "feelingBetter": [
      "#nounA# is feeling better, making #nounB# feeling better too."
    ],
    "Economy < 10% Disagree": [
      "#nounA#: \"The new leader has done little to help the economy.\"",
      "#nounA#: \"I can't believe the stock market is even worse than last year's.\"",
      "#nounA#: \"We'll all have to work multiple jobs, except Grandma, or we'll never pay off the loans.\"",
      "#nounA#: \"Let's all think of ways to cut down daily budget.\""
    ],
    "Economy > 25% In Favor": [
      "#nounA#: \"I'm feeling good about the economy.\"",
      "#nounA#: \"I got my job back. Take that as a sign the economy's getting better.\"",
      "#nounA#: \"Hey let's make a move on that house we've been looking at now that we have some extra money.\"",
      "#nounA#: \"I'm considering getting another college degree now that we've paid off our old loans.\""
    ],
    "Anti-Corruption < 10% Disagree": [
      "#nounA#: \"All our hard-earned tax money is now going into the pockets of some censored_word sitting in the office. How great is that?\"",
      "#nounA#: \"I don't understand. Corruption destroyed the last government. Why isn't the new one doing anything about it?\"",
      "#nounA#: \"I'm disappointed. I thought the new government was better than the old one. Now I know they're the same, a bunch of corrupted censored_word.\""
    ],
    "Anti-Corruption < 10% In Favor": [
      "#nounA#: \"I work in the government. Let me tell you, it's not all bad to tolerate some corruption. Not that I've done anything.\""
    ],
    "Anti-Corruption > 25% In Favor": [
      "#nounA#: \"The new anti-corruption law is great. Why didn't the old government think of it?\"",
      "#nounA#: \"It makes sense for the new office to fight corruption, after all that was why the old one failed.\"",
      "#nounA#: \"Less corrupted officials means better use of our tax money.\""
    ],
    "Anti-Corruption > 25% Disagree": [
      "#nounA#: \"I know you all are excited about the new anti-corruption law. But don't forget I work in the government. Not that I've done anything incriminating.\""
    ],
    "Equality < 10% Disagree": [
      "#nounA#: \"I can't believe they cut the funding for 'The Underprivileged's League Against The Ultra Powerful'.\"",
      "#nounA#: \"No wonder we've made no progress. The government is only supporting the priviledged half of the population.\"",
    ],
    "Equality < 10% In Favor": [
      "#nounA#: \"What do you mean there's not enough equality? Don't exaggerate.\"",
      "#nounA#: \"It's probably wrong to say this out loud but I think there's no need to spend more money to make everyone equal. People are born unequal.\"",
      "#nounA#: \"I'm not against your rights but there's no way they can be fully supported. It's against the economy."
    ],
    "Equality > 25% In Favor": [
      "#nounA#: \"It's a great thing that they're increasing the fund for 'The Underprivileged's League Against The Ultra Powerful'.\"",
      "#nounA#: \"You guys should all join me in the ULAU fighting for equality. We just got extra funding!\""
    ],
    "Equality > 25% Disagree": [
      "#nounA#: \"What do you mean there's not enough equality? Don't exaggerate.\"",
      "#nounA#: \"The government is paying way too much attention to the so called 'equality' issue.\"",
      "#nounA#: \"We're overdoing it. No need to spend more money to make everyone equal. People are born unequal.\""
    ],
    "War < 10% In Favor": [
      "#nounA#: \"Our leader deserves a Mobil Peace Prize.\"",
      "#nounA#: \"I can finally go on a trip to our former enemy country because war is over!\"",
      "#nounA#: \"Nothing is better than peace.\"",
      "#nounA#: \"I'm glad we can go back to work and school now that war is over.\"",
    ],
    "War < 10% Disagree": [
      "#nounA#: \"How are we going to fix the border issue if we're not going to war?\"",
      "#nounA#: \"I don't agree with the leader's decision. I think we should fight for our land.\"",
      "#nounA#: \"Real life is no fairy tale. There's no peace without war.\""
    ],
    "War > 25% Disagree": [
      "#nounA#: \"What's the point of this war we're fighting?\"",
      "#nounA#: \"This war is doing us no good.\"",
      "#nounA#: \"I hope no one in our family gets drafted.\"",
      "#nounA#: \"This new leader in government is apparently a war-crazed monster.\"",
      "#nounA#: \"I can't believe they just can't wait to declare another war right after the civil war.\""
    ],
    "War > 25% In Favor": [
      "#nounA#: \"I support the leader's decision to fight for our land.\"",
      "#nounA#: \"We've always had this border issue. There's no way to fix it but war.\"",
      "#nounA#: \"Have a little faith in our leader, ok? We're gonna win this war.\""
    ],
    "Nature < 10% Disagree": [
      "#nounA#: \"How are we ever going to recover from the radiation incident if the new office is not making efforts to improve the air quality?\"",
      "#nounA#: \"It was bad enough we were forced to stay within the radiation zone last year, now we have to drink contaminated water too?\"",
      "#nounA#: \"We'll probably all get 10 years deducted from our life if the government continues to do nothing about the environment.\""
    ],
    "Nature < 10% In Favor": [
      "#nounA#: \"All the talk about that radiation thing and deformed babies and what not, it is all a scam. Hooray we're not spending more money on that.\"",
      "#nounA#: \"What do you mean plastics are bad? How do you survive without them?\"",
      "#nounA#: \"I'd say plastic is the best invention of the last 500 years. Why get rid of them when you can do things the cheap way?\""
    ],
    "Nature > 25% In Favor": [
      "#nounA#: \"With the new budget on environmental protection, we might finally get to deal with the water contamination problem.\"",
      "#nounA#: \"They're staring to care about the environment. I can see the new government is learning a lesson from the old one.\"",
      "#nounA#: \"I'm loving the new bill to reduce the use of plastics! Not to mention they're also building huge air purifying systems in our area now.\""
    ],
    "Nature > 25% Disagree": [
      "#nounA#: \"What do you mean plastics are bad? How do you survive with them?\"",
      "#nounA#: \"Plastic as a material is cheap and versatile. Can't believe people are spending loads of money to get rid of it.",
      "#nounA#: \"Water Contamination is a scam. Why is the government spending more money to deal with that? There's nothing to deal with!\""
    ],
    "Health < 10% Disagree": [
      "#nounA#: \"Government should be spending more money on health and welfare.\"",
      "#nounA#: \"We should all eat better and find time for excercise. Can't offord to be sick nowadays\"",
      "#nounA#: \"Only the big corporates are covering health insurance now.\"",
      "#nounA#: \"What happened to that welfare reform promised to us? The new leader sucks.\""
    ],
    "Health > 25% In Favor": [
      "#nounA#: \"The new government is doing a good job on health and welfare.\"",
      "#nounA#: \"The new welfare reform is unbelievably good. \"",
      "#nounA#: \"I can finally go get my supposedly yearly checkup in five years.\"",
      "#nounA#: \"Let's hope none of us gets sick after that radiation thing last year. But hey, at least we have good health insurance now.\"",
    ],
    "Propaganda < 10% In Favor": [
      "#nounA#: \"I didn't know it was propaganda when I was living it. Now I'm glad it's over.\"",
      "#nounA#: \"Everyone was so irrational in THE MOVEMENT. I couldn't believe what people had done.\"",
      "#nounA#: \"I'm happy that we don't have to recite the doctrine every day now.\"",
      "#nounA#: \"Did you know they archived all online images of the old leader? I for one don't want to see his face anymore.\""
    ],
    "Propaganda < 10% Disagree": [
      "#nounA#: \"I feel like the new government is leading us nowhere.\"",
      "#nounA#: \"I miss the good old days when we all have a purpose and a national pride.\"",
      "#nounA#: \"Maybe it's good to abandon the old MOVEMENT, but I don't see any new movement to unite us all.\""
    ],
    "Propaganda > 25% In Favor": [
      "#nounA#: \"If it's not for THE MOVEMENT, we would've starved.\"",
      "#nounA#: \"I've never seen such a selfless leader in government.\"",
      "#nounA#: \"There's no way of life better then our nation's way.\""
    ],
    "Propaganda > 25% Disagree": [
      "#nounA# disagrees but decides not to say a word.",
      "#nounA# secretly hates what the government is promoting.",
      "#nounA# is afraid that her family would turn her in if she says anything against the policy."
    ],
    "_end": [
      "The end. Refresh page to try again."
    ]
  }
let sum = 100;
let economy = 14;
let corruption = 14;
let equality = 14;
let war = 14;
let nature = 14;
let health = 14;
let propaganda = 14;
let stReleased = 5;
let stGained = 4;
let bttnPressed = false;
let leftX = 50;
let leftY = 50;
let slider = [];
let xpos = 0;
let ypos = 100;
let yInt = 80;
let sliderL = 200;
let sliderW = 10;
let sliderH = 10;
function setup() {
  createCanvas(windowWidth, windowHeight);
  bttnCol = color(0, 0, 0);
  background(0);
  fill(220);
  textAlign(LEFT, TOP);
  textSize(20);
  textFont('Georgia');
  noStroke();
  textLeading(30);
  text("It could be anytime in the past, the present or the future. It could be anywhere in the world. \n\nYou see a family of five sitting at a dinner table, having a conversation about politics. You don't know who started the topic, but it's apparently a bad idea as they all have different opinions. Everyone in the family is visibly stressed. \n\nYou don’t know them. But as the leader of their world, you can’t help but think that your policies and allocation of resources could potentially make them feel better. \n\nPlan your resource allocation using the sliders and click APPLY CHANGES to see how that affects the conversation in the family.", leftX, leftY, width / 2 - leftX, height);
  xpos = width - width / 3;
  slider[0] = new Slider(xpos, ypos, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[1] = new Slider(xpos, ypos + yInt, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[2] = new Slider(xpos, ypos + yInt * 2, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[3] = new Slider(xpos, ypos + yInt * 3, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[4] = new Slider(xpos, ypos + yInt * 4, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[5] = new Slider(xpos, ypos + yInt * 5, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[6] = new Slider(xpos, ypos + yInt * 6, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
}
function draw() {
  for (let i = 0; i < slider.length; i++) {
    slider[i].display();
  }
  let totalVal = slider[0].val + slider[1].val + slider[2].val + slider[3].val + slider[4].val + slider[5].val + slider[6].val;
  if (totalVal > 100) {
    for (let i = 0; i < slider.length; i++) {
      slider[i].x--;
    }
  }
  let bttnCol = color(0, 0, 0);
  if (mouseX > width / 2 + leftX && mouseX < width / 2 + leftX + 100 && mouseY > leftY && mouseY < leftY + 100) {
    bttnCol = color(210, 180, 30);
  } else {
    bttnCol = color(0, 0, 0);
  }
  fill(bttnCol);
  stroke(220);
  rect(width / 2 + leftX, leftY, 100, 100);
  fill(220);
  noStroke();
  textFont('Helvetica');
  textSize(14);
  textAlign(CENTER, CENTER);
  text("APPLY\nCHANGES", width / 2 + leftX + 50, leftY + 50);
  textSize(12);
  noStroke();
  fill(220);
  textAlign(LEFT, TOP);
  text("RESOURCE ALLOCATION —> TOTAL: 100%", xpos, 50);
  text("Economy and job opportunities —> " + floor(slider[0].val) + " %", xpos, ypos - yInt / 4);
  text("Efforts to end corruption within government —> " + floor(slider[1].val) + " %", xpos, ypos + yInt - yInt / 4);
  text("Equality and eliminating discrimination —> " + floor(slider[2].val) + " %", xpos, ypos + yInt * 2 - yInt / 4);
  text("War with a neighboring country over border issue —> " + floor(slider[3].val) + " %", xpos, ypos + yInt * 3 - yInt / 4);
  text("Environmental issues and global warming —> " + floor(slider[4].val) + " %", xpos, ypos + yInt * 4 - yInt / 4);
  text("Health and welfare —> " + floor(slider[5].val) + " %", xpos, ypos + yInt * 5 - yInt / 4);
  text("Propaganda of lifestyle integration —> " + floor(slider[6].val) + " %", xpos, ypos + yInt * 6 - yInt / 4);
}
function mousePressed() {
  if (mouseX > width / 2 + leftX && mouseX < width / 2 + leftX + 100 && mouseY > leftY && mouseY < leftY + 100) {
    economy = slider[0].val;
    corruption = slider[1].val;
    equality = slider[2].val;
    war = slider[3].val;
    nature = slider[4].val;
    health = slider[5].val;
    propaganda = slider[6].val;
    storyProgress();
  }
}
function storyProgress() {
  let storyEvents = n.stepAndRender();
  if (storyEvents.length > 0) {
    background(0);
    for (var i = 0; i < storyEvents.length; i++) {
      fill(128 + (i * 10));
      textAlign(LEFT, TOP);
      textSize(14);
      textFont('Georgia');
      noStroke();
      textLeading(25);
      text(storyEvents[i], leftX, leftY + i * 25, width / 2 - leftX, height);
    }
  }
}
let n = new seaduck.Narrative({
  "nouns": [{
      "name": "Grandma",
      "properties": {
        "stressed": true,
        "stressLevel": 10,
        "age": 75,
      },
      "tags": ["person"]
    },
    {
      "name": "Dad",
      "properties": {
        "stressed": true,
        "stressLevel": 10,
        "age": 55,
      },
      "tags": ["person"]
    },
    {
      "name": "Mom",
      "properties": {
        "stressed": true,
        "stressLevel": 10,
        "age": 53,
      },
      "tags": ["person"]
    },
    {
      "name": "Brother",
      "properties": {
        "stressed": true,
        "stressLevel": 10,
        "age": 30,
      },
      "tags": ["person"]
    },
    {
      "name": "Sister",
      "properties": {
        "stressed": true,
        "stressLevel": 10,
        "age": 20,
      },
      "tags": ["person"]
    },
  ],
  "initialize": function*() {
    for (let noun of this.getNounsByProperty("stressed", true)) {
      yield(new seaduck.StoryEvent("isStressed", noun));
    }
  },
  "actions": [{
      "name": "Economy < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return economy < 10 && (a.properties.age == 55 || a.properties.age == 30 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Economy < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Economy > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return economy > 25 && (a.properties.age == 55 || a.properties.age == 30 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Economy > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Anti-Corruption < 10% Disagree",
      "match": ["#person"],
      "when": function(a, b) {
        return corruption < 10 && (a.properties.age == 55 || a.properties.age == 53);
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("Anti-Corruption < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Anti-Corruption < 10% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return corruption < 10 && (a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Anti-Corruption < 10% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Anti-Corruption > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return corruption > 25 && (a.properties.age == 55 || a.properties.age == 53);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Anti-Corruption > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Anti-Corruption > 25% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return corruption > 25 && (a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Anti-Corruption > 25% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Equality < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return equality < 10 && (a.properties.age == 53);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Equality < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Equality < 10% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return equality < 10 && (a.properties.age == 55 || a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Equality < 10% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Equality > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return equality > 25 && (a.properties.age == 53);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Equality > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Equality > 25% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return equality > 25 && (a.properties.age == 55 || a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Equality > 25% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "War < 10% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return war < 10 && (a.properties.age == 75 || a.properties.age == 53 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("War < 10% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "War < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return war < 10 && (a.properties.age == 55);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("War < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "War > 25% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return war > 25 && (a.properties.age == 75 || a.properties.age == 53 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("War > 25% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "War > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return war > 25 && (a.properties.age == 55);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("War > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Nature < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return nature < 10 && (a.properties.age == 75 || a.properties.age == 53);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Nature < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Nature < 10% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return nature < 10 && (a.properties.age == 55);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Nature < 10% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Nature > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return nature > 25 && (a.properties.age == 75 || a.properties.age == 53);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Nature > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Nature > 25% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return nature > 25 && (a.properties.age == 55);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Nature > 25% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Health < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return health < 10 && (a.properties.age == 75 || a.properties.age == 55 || a.properties.age == 30 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Health < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Health > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return health > 25 && (a.properties.age == 75 || a.properties.age == 55 || a.properties.age == 30 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Health > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Propaganda < 10% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return propaganda < 10 && (a.properties.age == 75 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Propaganda < 10% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Propaganda < 10% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return propaganda < 10 && (a.properties.age == 53 || a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Propaganda < 10% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "Propaganda > 25% In Favor",
      "match": ["#person"],
      "when": function(a) {
        return propaganda > 25 && (a.properties.age == 53 || a.properties.age == 30);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Propaganda > 25% In Favor", a));
        a.properties.stressLevel -= stReleased;
      }
    },
    {
      "name": "Propaganda > 25% Disagree",
      "match": ["#person"],
      "when": function(a) {
        return propaganda > 25 && (a.properties.age == 75 || a.properties.age == 20);
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("Propaganda > 25% Disagree", a));
        a.properties.stressLevel += stGained;
      }
    },
    {
      "name": "StressFree",
      "match": ["#person"],
      "when": function(a) {
        return a.properties.stressLevel <= 2;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("StressFree", a));
        a.properties.stressed = false;
      }
    },
    {
      "name": "veryStressed",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return a.properties.stressLevel > 8;
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("veryStressed", a, b));
        b.properties.stressLevel ++;
      }
    },
    {
      "name": "stillStressed",
      "match": ["#person", "#person"],
      "when": function(a) {
        return a.properties.stressLevel >= 6 && a.properties.stressLevel <= 8;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("stillStressed", a));
      }
    },
    {
      "name": "mildStressed",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return a.properties.stressLevel > 2 && a.properties.stressLevel < 6;
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("mildStressed", a, b));
        b.properties.stressLevel--;
      }
    },
  ],
  "traceryDiscourse": {
    "isStressed": [
      "#nounA# is stressed.",
    ],
    "StressFree": [
      "#nounA# is not stressed anymore. You feel like you did a good job."
    ],
    "veryStressed": [
      "#nounA# is very stressed, making #nounB# stressed too."
    ],
    "stillStressed": [
      "#nounA# is still stressed."
    ],
    "mildStressed": [
      "#nounA# is feeling better, making #nounB# feeling better too."
    ],
    "Economy < 10% Disagree": [
      "#nounA#: \"Government's not focusing on economy.\""
    ],
    "Economy > 25% In Favor": [
      "#nounA#: \"I'm feeling good about the economy.\"",
      "#nounA#: \"I got my job back. Take that as a sign the economy's getting better.\"",
      "#nounA#: \"Hey let's make a move on that house we've been looking at.\"",
      "#nounA#: \"I'm considering getting another college degree now that we've paid off our old loan.\""
    ],
    "Anti-Corruption < 10% Disagree": [
      "#nounA#: \"Too much corruption!\""
    ],
    "Anti-Corruption < 10% In Favor": [
      "#nounA#: \"Good for me because I work in the government.\""
    ],
    "Anti-Corruption > 25% In Favor": [
      "#nounA#: \"Less corruption yay!\""
    ],
    "Anti-Corruption > 25% Disagree": [
      "#nounA#: \"You know I work in the government right? Where do you think someone like me could get that much money?\""
    ],
    "Equality < 10% Disagree": [
      "#nounA#: \"I can't believe they cut the funding for 'The Underprivileged's League Against The Ultra Powerful'.\"",
      "#nounA#: \"No wonder we've made no progress. The government is only supporting the priviledged half of the population.\"",
      
    ],
    "Equality < 10% In Favor": [
      "#nounA#: \"What do you mean there's not enough equality? Don't exaggerate.\"",
      "#nounA#: \"It's probably wrong to say this out loud but I think there's no need to spend more money to make everyone equal. People are born unequal.\"",
      "#nounA#: \"I'm not against your rights but there's no way they can be fully supported. It's against the econoly?"
    ],
    "Equality > 25% In Favor": [
      "#nounA#: \"Love that we're making progress on equality.\""
    ],
    "Equality > 25% Disagree": [
      "#nounA#: \"What do you mean there's not enough equality? Don't exaggerate.\"",
      "#nounA#: \"The government is paying way too much attention to the so called 'equality' issue.\"",
      "#nounA#: \"We're overdoing it. No need to spend more money to make everyone equal. People are born unequal.\""
    ],
    "War < 10% In Favor": [
      "#nounA#: \"Our leader deserves a Mobil Peace Prize.\"",
      "#nounA#: \"I wonder when we can go on a trip to our former enemy country.\"",
      "#nounA#: \"Nothing is better than peace.\"",
      "#nounA#: \"I'm glad we can go back to work and school now that the war is over.\"",
    ],
    "War < 10% Disagree": [
      "#nounA#: \"How are we going to fix the border issue if we're not going to war?\"",
      "#nounA#: \"I don't agree with the leader's decision. I think we should fight for our land.\"",
      "#nounA#: \"Real life is no fairy tale. There's no peace without war.\""
    ],
    "War > 25% Disagree": [
      "#nounA#: \"What's the point of this war we're fighting?\"",
      "#nounA#: \"This war is doing us no good.\"",
      "#nounA#: \"I hope no one in our family gets drafted.\"",
      "#nounA#: \"This new leader in government is apparently a war-crazed monster.\""
    ],
    "War > 25% In Favor": [
      "#nounA#: \"I support the leader's decision to fight for our land.\"",
      "#nounA#: \"We've always had this border issue. There's no way to fix it but war.\"",
      "#nounA#: \"Have a little faith in our leader, ok? We're gonna win this war.\""
    ],
    "Nature < 10% Disagree": [
      "#nounA#: \"We're not doing enough to protect environment.\""
    ],
    "Nature < 10% In Favor": [
      "#nounA#: \"Global warming is a scam. Hooray we're not spending more money on that.\""
    ],
    "Nature > 25% In Favor": [
      "#nounA#: \"Goverment's making some progress on protecting environment.\""
    ],
    "Nature > 25% Disagree": [
      "#nounA#: \"We're spending way too much money on nature.\""
    ],
    "Health < 10% Disagree": [
      "#nounA#: \"Government should be spending more money on health and welfare.\""
    ],
    "Health > 25% In Favor": [
      "#nounA#: \"Good job on health and welfare.\""
    ],
    "Propaganda < 10% In Favor": [
      "#nounA#: \"I didn't know it was propaganda when I was living it. Now I'm glad it's over.\"",
      "#nounA#: \"Everyone was so irrational in THE MOVEMENT. I couldn't believe what people had done.\"",
      "#nounA#: \"I'm happy that we don't have to recite the doctrine every day now.\"",
      "#nounA#: \"Did you know they archived all online images of the old leader? I for one don't want to see his face anymore.\""
    ],
    "Propaganda < 10% Disagree": [
      "#nounA#: \"I feel like the new government is leading us nowhere.\"",
      "#nounA#: \"I miss the good old days when we all have a purpose and a national pride.\"",
      "#nounA#: \"Maybe it's good to abandon the old MOVEMENT, but I don't see any new movement to unite us all.\""
    ],
    "Propaganda > 25% In Favor": [
      "#nounA#: \"If it's not for THE MOVEMENT, we would've starved.\"",
      "#nounA#: \"I've never seen such a selfless leader in government.\"",
      "#nounA#: \"There's no way of life better then our nation's way.\""
    ],
    "Propaganda > 25% Disagree": [
      "#nounA# disagrees but decides not to say a word.",
      "#nounA# secretly hates what the government is promoting.",
      "#nounA# is afraid that her family would turn her in if she says anything against the policy."
    ],
    "_end": [
      "The end."
    ]
  }
});let sum = 100;
let economy = 14;
let corruption = 14;
let equality = 14;
let war = 14;
let nature = 14;
let health = 14;
let propaganda = 14;
let defaultStress = 100;
let grandmaStress;
let dadStress;
let momStress;
let sisStress;
let broStress;
let leftX = 50;
let leftY = 50;
let slider = [];
let xpos = 0;
let ypos = 100;
let yInt = 80;
let sliderL = 200;
let sliderW = 10;
let sliderH = 10;
let bttnCol;
function setup() {
  createCanvas(windowWidth, windowHeight);
  bttnCol = color(0, 0, 0);
  background(0);
  fill(220);
  textAlign(LEFT, TOP);
  textSize(14);
  textFont('Georgia');
  noStroke();
  textLeading(25);
  text("It could be anytime in the past, the present or the future. It could be anywhere in the world. \n\nYou see a family of five sitting at a dinner table. Everyone is waiting for someone else to break the silence. Everyone is visibly stressed. \n\nYou don’t know them. But as the leader of their world, you can’t help but think that your policies and allocation of resources could potentially make them feel better. \n\nPlan your resource allocation using the sliders and click START to see how that affects the family.", leftX, leftY, width / 3 - leftX, height);
  xpos = width - width / 3;
  slider[0] = new Slider(xpos, ypos, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[1] = new Slider(xpos, ypos + yInt, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[2] = new Slider(xpos, ypos + yInt * 2, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[3] = new Slider(xpos, ypos + yInt * 3, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[4] = new Slider(xpos, ypos + yInt * 4, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[5] = new Slider(xpos, ypos + yInt * 5, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
  slider[6] = new Slider(xpos, ypos + yInt * 6, sliderW, sliderH, xpos, xpos + sliderL, true, 0);
}
function draw() {
  for (let i = 0; i < slider.length; i++) {
    slider[i].display();
  }
  let totalVal = slider[0].val + slider[1].val + slider[2].val + slider[3].val + slider[4].val + slider[5].val + slider[6].val;
  if (totalVal > 100) {
    for (let i = 0; i < slider.length; i++) {
      slider[i].x--;
    }
  }
  fill(bttnCol);
  stroke(220);
  rect(width / 3 + leftX, leftY, 100, 100);
  fill(220);
  noStroke();
  textFont('Helvetica');
  textSize(14);
  textAlign(CENTER, CENTER);
  text("START", width / 3 + leftX + 50, leftY + 50);
  if (mouseX > width / 3 + leftX && mouseX < width / 3 + leftX + 100 && mouseY > leftY && mouseY < leftY + 100) {
    bttnCol = color(210, 180, 30);
  } else {
    bttnCol = color(0, 0, 0);
  }
  textSize(12);
  noStroke();
  fill(220);
  textAlign(LEFT, TOP);
  text("RESOURCE ALLOCATION —> TOTAL: 100%", xpos, 50);
  text("Economy and job opportunities —> " + floor(slider[0].val) + " %", xpos, ypos - yInt / 4);
  text("Efforts to end corruption within government —> " + floor(slider[1].val) + " %", xpos, ypos + yInt - yInt / 4);
  text("Equality and eliminating discrimination —> " + floor(slider[2].val) + " %", xpos, ypos + yInt * 2 - yInt / 4);
  text("War with a neighboring country over border issue —> " + floor(slider[3].val) + " %", xpos, ypos + yInt * 3 - yInt / 4);
  text("Environmental issues and global warming —> " + floor(slider[4].val) + " %", xpos, ypos + yInt * 4 - yInt / 4);
  text("Health and welfare —> " + floor(slider[5].val) + " %", xpos, ypos + yInt * 5 - yInt / 4);
  text("Propaganda of lifestyle integration —> " + floor(slider[6].val) + " %", xpos, ypos + yInt * 6 - yInt / 4);
}
function mousePressed() {
  if (mouseX > width / 3 + leftX && mouseX < width / 3 + leftX + 100 && mouseY > leftY && mouseY < leftY + 100) {
    storyProgress()
    economy = slider[0].val;
    corruption = slider[1].val;
    equality = slider[2].val;
    war = slider[3].val;
    nature = slider[4].val;
    health = slider[5].val;
    propaganda = slider[6].val;
    
    grandmaStress = defaultStress - nature - health + war + propaganda;
    dadStress = defaultStress - economy - health - war - corruption + equality + nature;
    momStress = defaultStress - corruption - equality - nature - propaganda + war;
    broStress = defaultStress - economy - health - propaganda + corruption + equality;
    sisStress = defaultStress - economy - health + war + propaganda;
    console.log(grandmaStress);
  }
}
function storyProgress() {
  let storyEvents = n.stepAndRender();
  if (storyEvents.length > 0) {
    background(0);
    for (var i = 0; i < storyEvents.length; i++) {
      fill(128 + (i * 10));
      noStroke();
      textAlign(LEFT, TOP);
      text(storyEvents[i], leftX, leftY + i * 25, width / 3 - leftX, height);
    }
  }
}
let n = new seaduck.Narrative({
  "nouns": [{
      "name": "Grandma",
      "properties": {
        "stressed": true,
      },
      "tags": ["person"]
    },
    {
      "name": "Dad",
      "properties": {
        "stressed": true,
      },
      "tags": ["person"]
    },
    {
      "name": "Mom",
      "properties": {
        "stressed": true,
      },
      "tags": ["person"]
    },
    {
      "name": "Brother",
      "properties": {
        "stressed": true,
      },
      "tags": ["person"]
    },
    {
      "name": "Sister",
      "properties": {
        "stressed": true,
      },
      "tags": ["person"]
    },
  ],
  "initialize": function*() {
    for (let noun of this.getNounsByProperty("stressed", true)) {
      yield(new seaduck.StoryEvent("isStressed", noun));
    }
  },
  "actions": [{
      "name": "staySilent",
      "match": ["#person"],
      "when": function(a) {
        return grandmaStress == 100 || dadStress == 100 || momStress == 100 || broStress == 100 || sisStress == 100;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("staySilent", a));
      }
    },
    {
      "name": "comfort",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return a.properties.stresslevel < 70 && b.properties.stresslevel > 0;
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("comfort", a, b));
        a.properties.stresslevel -= 10;
        b.properties.stresslevel -= 10;
      }
    },
    {
      "name": "stress",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return a.properties.stresslevel > 70 && b.properties.stresslevel > 0;
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("stress", a, b));
        b.properties.secretlevel += 10;
      }
    },
    {
      "name": "revealSecret",
      "match": ["#person"],
      "when": function(a) {
        return a.properties.stresslevel <= 0 && a.properties.stresslevel > -3;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("revealSecret", a));
        a.properties.stresslevel -= 10;
      }
    },
  ],
  "traceryDiscourse": {
    "isStressed": [
      "#nounA# is stressed.",
    ],
    "staySilent": [
      "#nounA# is afraid saying anything would reveal the secret."
    ],
    "comfort": [
      "#nounA# senses #nounB#'s stress and comforts #nounB#."
    ],
    "stress": [
      "#nounA# starts talking about politics and that stresses #nounB# out.",
      "#nounA# blames #nounB# for not washing the dishes last night."
    ],
    "revealSecret": [
      "'There is something I want to tell you. I am an alien from outerspace.'#nounA# says",
      "#nounA# finally tells everybody about the apocalypse. Now #nounA# feels relieved."
    ],
    "_end": [
      "All is good except that there is an apocalyse coming"
    ]
  }
});
  let totalalo = 100;
let economy = 14;
let corruption = 14;
let equality = 14;
let war = 14;
let nature = 14;
let health = 14;
let propaganda = 14;
let defaultStress = 100;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  fill(220);
  textAlign(LEFT, CENTER);
  text("It could be anytime in the past, present or future. It could be anywhere in the world. A family of five sits at a dinner table. Everyone is waiting for someone else to break the silence. Everyone is visibly stressed. You don’t know them. But you can’t help but think that your policies and allocation of resources could potentially make them feel better. At this very moment, this is the only scene you see—a family dinner.", 100, 100, 400, 400);
}
function draw() {
}
function keyPressed() {
  mousePressed();
}
function mousePressed() {
  let storyEvents = n.stepAndRender();
  if (storyEvents.length > 0) {
    background(0);
    for (var i = 0; i < storyEvents.length; i++) {
      text(storyEvents[i], 100, 100 + i * 20);
    }
    console.log(storyEvents);
  }
}
let n = new seaduck.Narrative({
  "nouns": [{
      "name": "Grandma",
      "properties": {
        "stressed": true,
        "stresslevel": defaultStress - nature - health + war + propaganda,
      },
      "tags": ["person"]
    },
    {
      "name": "Dad",
      "properties": {
        "stressed": true,
        "stresslevel": defaultStress - economy - health - war - corruption + equality + nature,
      },
      "tags": ["person"]
    },
    {
      "name": "Mom",
      "properties": {
        "stressed": true,
        "stresslevel": defaultStress - corruption - equality - nature - propaganda + war,
      },
      "tags": ["person"]
    },
    {
      "name": "Brother",
      "properties": {
        "stressed": true,
        "stresslevel": defaultStress - economy - health - propaganda + corruption + equality,
      },
      "tags": ["person"]
    },
    {
      "name": "Sister",
      "properties": {
        "stressed": true,
        "stresslevel": defaultStress - economy - health + war + propaganda,
      },
      "tags": ["person"]
    },
  ],
  "initialize": function*() {
    for (let noun of this.getNounsByProperty("stressed", true)) {
      yield(new seaduck.StoryEvent("isStressed", noun));
    }
  },
  "actions": [{
      "name": "staySilent",
      "match": ["#person"],
      "when": function(a) {
        return a.properties.stresslevel == 100;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("staySilent", a));
      }
    },
    {
      "name": "comfort",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return a.properties.stresslevel < 7 && b.properties.stresslevel > 0;
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("comfort", a, b));
        a.properties.stresslevel--;
        b.properties.stresslevel--;
      }
    },
    {
      "name": "stress",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return a.properties.stresslevel > 7 && b.properties.stresslevel > 0;
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("stress", a, b));
        b.properties.secretlevel++;
      }
    },
    {
      "name": "revealSecret",
      "match": ["#person"],
      "when": function(a) {
        return a.properties.stresslevel <= 0 && a.properties.stresslevel > -3;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("revealSecret", a));
        a.properties.stresslevel -= 10;
      }
    },
  ],
  "traceryDiscourse": {
    "isStressed": [
      "#nounA# is stressed.",
    ],
    "staySilent": [
      "#nounA# is afraid saying anything would reveal the secret."
    ],
    "comfort": [
      "#nounA# senses #nounB#'s stress and comforts #nounB#."
    ],
    "stress": [
      "#nounA# starts talking about politics and that stresses #nounB# out.",
      "#nounA# blames #nounB# for not washing the dishes last night."
    ],
    "revealSecret": [
      "'There is something I want to tell you. I am an alien from outerspace.'#nounA# says",
      "#nounA# finally tells everybody about the apocalypse. Now #nounA# feels relieved."
    ],
    "_end": [
      "All is good except that there is an apocalyse coming"
    ]
  }
});function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(LEFT, CENTER);
  text("A family of five sits around the dinner table.", 100, 100);
}
function draw() {
}
function keyPressed() {
  mousePressed();
}
function mousePressed() {
  let storyEvents = n.stepAndRender();
  if (storyEvents.length > 0) {
    background(255);
    for (var i = 0; i < storyEvents.length; i++) {
      text(storyEvents[i], 100, 100 + i * 20);
    }
    console.log(storyEvents);
  }
}
let n = new seaduck.Narrative({
  "nouns": [{
      "name": "Grandma",
      "properties": {
        "secret": true,
        "stresslevel": 15,
      },
      "tags": ["person"]
    },
    {
      "name": "Dad",
      "properties": {
        "secret": true,
        "stresslevel": 5,
      },
      "tags": ["person"]
    },
    {
      "name": "Mom",
      "properties": {
        "secret": true,
        "stresslevel": 5,
      },
      "tags": ["person"]
    },
    {
      "name": "Brother",
      "properties": {
        "secret": true,
        "stresslevel": 6,
      },
      "tags": ["person"]
    },
    {
      "name": "Sister",
      "properties": {
        "secret": true,
        "stresslevel": 12,
      },
      "tags": ["person"]
    },
  ],
  "initialize": function*() {
    for (let noun of this.getNounsByProperty("secret", true)) {
      yield(new seaduck.StoryEvent("hasSecret", noun));
    }
  },
  "actions": [{
      "name": "staySilent",
      "match": ["#person"],
      "when": function(a) {
        return a.properties.stresslevel ==7;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("staySilent", a));
      }
    },
   
    {
      "name": "comfort",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return a.properties.stresslevel <7 && b.properties.stresslevel > 0;
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("comfort", a, b));
        a.properties.stresslevel--;
        b.properties.stresslevel--;
      }
    },
               {
      "name": "stress",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return a.properties.stresslevel > 7&& b.properties.stresslevel > 0;
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("stress", a, b));
        b.properties.secretlevel++;
      }
    },
    {
      "name": "revealSecret",
      "match": ["#person"],
      "when": function(a) {
        return a.properties.stresslevel <= 0 && a.properties.stresslevel >-3;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("revealSecret", a));
        a.properties.stresslevel -= 10;
      }
    },
  ],
  "traceryDiscourse": {
    "revealSecret": [
      "'There is something I want to tell you. I am an alien from outerspace.'#nounA# says",
      "#nounA# finally tells everybody about the apocalypse. Now #nounA# feels relieved."
    ],
    "hasSecret": [
      "#nounA# has a secret.",
    ],
    "staySilent": [
      "#nounA# is afraid saying anything would reveal the secret."
    ],
    "comfort": [
      "#nounA# senses #nounB#'s stress and comforts #nounB#."
    ],
    "stress": [
      "#nounA# starts talking about politics and that stresses #nounB# out.",
      "#nounA# blames #nounB# for not washing the dishes last night."
    ],
    "_end": [
      "All is good except that there is an apocalyse coming"
    ]
  }
});function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(CENTER, CENTER);
}
function draw() {
}
function keyPressed() {
  mousePressed();
}
function mousePressed() {
  let storyEvents = n.stepAndRender();
  if (storyEvents.length > 0) {
    background(255);
    for (var i = 0; i < storyEvents.length; i++) {
      text(storyEvents[i], width / 2, 50 + i * 20);
    }
    console.log(storyEvents);
}
}
let n = new seaduck.Narrative({
  "nouns": [{
      "name": "Joe",
      "properties": {
        "happiness": 0,
        "hungry": true
      },
      "tags": ["person"]
    },
    {
      "name": "Mary",
      "properties": {
        "happiness": 0,
        "hungry": true
      },
      "tags": ["person"]
    },
    {
      "name": "Horatio",
      "properties": {
        "happiness": 0,
        "hungry": true
      },
      "tags": ["person"]
    },
    {
      "name": "cookie",
      "properties": {
        "tastiness": 2,
        "eaten": false
      },
      "tags": ["food"]
    },
    {
      "name": "spinach",
      "properties": {
        "tastiness": 1,
        "eaten": false
      },
      "tags": ["food"]
    },
    {
      "name": "cake",
      "properties": {
        "tastiness": 3,
        "eaten": false
      },
      "tags": ["food"]
    }
  ],
  "initialize": function*() {
    for (let noun of this.getNounsByProperty("hungry", true)) {
      yield(new seaduck.StoryEvent("isHungry", noun));
    }
  },
  "actions": [{
      "name": "eat",
      "match": ["#person", "#food"],
      "when": function(a, b) {
        return a.properties.hungry &&
          b.properties.tastiness > 0 &&
          !b.properties.eaten;
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("eat", a, b));
        a.properties.hungry = false;
        b.properties.eaten = true;
        a.properties.happiness += b.properties.tastiness;
        if (b.properties.tastiness >= 2) {
          yield(new seaduck.StoryEvent("reallyLike", a, b));
        }
      }
    },
    {
      "name": "befriend",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return (
          (!a.properties.hungry && !b.properties.hungry) &&
          !this.isRelated("friendship", a, b));
      },
      "action": function*(a, b) {
        yield(new seaduck.StoryEvent("makeFriends", a, b));
        this.reciprocal("friendship", a, b);
      }
    },
    {
      "name": "express happiness",
      "match": ["#person"],
      "when": function(a) {
        return !a.properties.hungry &&
          a.properties.happiness >= 2 &&
          this.allRelatedByTag("friendship", a, "#person").length > 0;
      },
      "action": function*(a) {
        yield(new seaduck.StoryEvent("isHappy", a));
      }
    }
  ],
  "traceryDiscourse": {
    "isHappy": ["#nounA# was happy", "#nounA# felt good!"],
    "isHungry": [
      "#nounA# had a rumble in their tummy.",
      "#nounA# felt very hungry."
    ],
    "makeFriends": [
      "#nounA# made friends with #nounB#.",
      "#nounA# and #nounB# became friends."
    ],
    "reallyLike": [
      "And let me tell you, #nounA# really enjoyed that #nounB#.",
      "#nounA# says, 'This #nounB# is so delicious!'"
    ],
    "eat": [
      "#nounA# ate a #nounB#.",
      "#nounA# gobbled up a #nounB#."
    ],
    "_end": ["The end.", "And they lived happily ever after."]
  }
});let rm, sentences, manifesto;
function setup() {
  createCanvas(400, 400);
  background(220);
  rm = new RiMarkov(4);
  rm.loadText("The Communists are distinguished from the other working-class parties by this only: 1. In the national struggles of the proletarians of the different countries, they point out and bring to the front the common interests of the entire proletariat, independently of all nationality. 2. In the various stages of development which the struggle of the working class against the bourgeoisie has to pass through, they always and everywhere represent the interests of the movement as a whole.");
}
function draw() {
}
function mousePressed() {
  background(220);
  sentences = rm.generateSentence();
  console.log(sentences);
  fill(0);
  noStroke();
  text(sentences, 10, 10, 200, 200);
let myRec = new p5.SpeechRec;
myRec.continuous = false;
myRec.interimResults = true;
let myVoice = new p5.Speech();
function setup() {
  createCanvas(windowWidth, windowHeight);
  myRec.start();
  myRec.onResult = parseResult;
  myRec.onEnd = restartRec;
  myVoice.speak('what\'s your favorite color?');
}
function draw() {
}
function parseResult() {
  let lowStr = myRec.resultString.toLowerCase();
  let mostrecentword = lowStr.split(' ').pop();
  
  if (mostrecentword.indexOf("red") !== -1) {
    fill(255, 0, 0);
    noStroke();
    rect(0, 0, width, height);
  } else if (mostrecentword.indexOf("green") !== -1) {
    fill(0, 255, 0);
    noStroke();
    rect(0, 0, width, height);
    
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('like a tree', width / 2, height / 2);
  } else if (mostrecentword.indexOf("blue") !== -1) {
    fill(0, 0, 255);
    noStroke();
    rect(0, 0, width, height);
    myVoice.speak('blue');
  } else if (mostrecentword.indexOf("stop") !== -1) {
    myVoice.speak('ok.');
  } 
  console.log(mostrecentword);
}
function restartRec() {
  myRec.start();
	let capture;
	let avgR, avgG, avgB
	function setup() {
	  pixelDensity(1);
	  createCanvas(windowWidth, windowHeight);
	  capture = createCapture(VIDEO);
	  capture.hide();
	  myVoice.speak('How to make a propaganda?');
	}
	function draw() {
	  background(0);
	  image(capture, 0, 0, width, width * capture.height / capture.width);
	  let sumR = 0,
	    sumG = 0,
	    sumB = 0,
	    divider = width * width * capture.height / capture.width;
	  loadPixels();
	  for (let x = 0; x < width; x++) {
	    for (let y = 0; y < height; y++) {
	      let index = (x + y * width) * 4;
	      r = pixels[index + 0];
	      g = pixels[index + 1];
	      b = pixels[index + 2];
	      a = pixels[index + 3];
	      sumR += r;
	      sumG += g;
	      sumB += b;
	    }
	  }
	  avgR = sumR / divider;
	  avgG = sumG / divider;
	  avgB = sumB / divider;
	  if (keyIsPressed) {
	    myVoice.setPitch(random(0., 5.));
	    myVoice.setRate(random(0.8, 2));
	    if (avgG > avgB && avgG > avgR) {
	      myVoice.speak('pro');
	    }
	    else if (avgR > avgG && avgR > avgB && avgG - avgB <= 20) {
	      myVoice.setVoice(Math.floor(random(myVoice.voices.length)));
	      myVoice.speak('po');
	    }
	    else if (avgB > avgG && avgB > avgR) {
	      myVoice.speak('gan');
	    }
	    else if (avgR > avgG && avgR > avgB && avgG - avgB >= 20) {
	      myVoice.speak('da')
	    }
	  }
	}
	function restartVoice() {
	  myVoice = new p5.Speech();
	}let doggie = new p5.SpeechRec;
doggie.continuous = false;
doggie.interimResults = true;
let kitty = new p5.Speech();
function setup() {
  createCanvas(windowWidth, windowHeight);
  doggie.start();
  doggie.onResult = parseResult;
  doggie.onEnd = restartRec;
  kitty.speak('doggie doggie what now?');
}
function draw() {
}
function parseResult() {
  let lowStr = doggie.resultString.toLowerCase();
  let mostrecentword = lowStr.split(' ').pop();
  
  if (mostrecentword.indexOf("purple") !== -1) {
    fill(255, 0, 255);
    noStroke();
    rect(0, 0, width, height);
  } else if (mostrecentword.indexOf("green") !== -1) {
    kitty.speak('meow, i don\'t like green, i will give you purple instead');
  }
  console.log(mostrecentword);
}
function restartRec() {
  doggie.start();
let myRec = new p5.SpeechRec;
myRec.continuous = false;
myRec.interimResults = true;
let myVoice = new p5.Speech();
	let capture;
function setup() {
  createCanvas(windowWidth, windowHeight);
	    capture = createCapture(VIDEO);
	    capture.hide();
  myRec.start();
  myRec.onResult = parseResult;
  myRec.onEnd = restartRec;
  myVoice.speak('Welcome to the system.');
  background(0,0,255);
}
function draw() {
    	    image(capture, 0, 0, width/8, width/8 * capture.height / capture.width);
}
function parseResult() {
  myVoice.setPitch(random(-2, 1.5));
  myVoice.setRate(random(0.6, 1.5));
  let lowStr = myRec.resultString.toLowerCase();
  let mostrecentword = lowStr.split(' ').pop();
  if (mostrecentword.indexOf("hello") !== -1) {
        myVoice.speak('I\'m a blue system.');
      fill(0, 0, random(100,255));
  noStroke();
  rect(0, 0, width, height);
       fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(30);
    text('Blue defines me.', width/2, height/2);
  } else if (mostrecentword.indexOf("specific") !== -1) {
    myVoice.speak('I can\'t. It is up to you to decide who I am.');
      fill(0, 0, random(100,255));
  noStroke();
  rect(0, 0, width, height);
           fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(30);
    text('You made me.', width/2, height/2);
  } else if (mostrecentword.indexOf("inspirational") !== -1) {
    myVoice.speak('I have a whole database of Oprah quotes, but I just don\'t feel like saying any.');
      fill(0, 0, random(100,255));
  noStroke();
  rect(0, 0, width, height);
           fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(30);
    text('I\'m a system with some personality.', width/2, height/2);
  } else if (mostrecentword.indexOf("stop") !== -1) {
    myVoice.stop();
  } else if (mostrecentword.indexOf("friends") !== -1) {
      myVoice.speak('Fine. What do you want to do?');
      fill(0, 0, random(100,255));
  noStroke();
  rect(0, 0, width, height);
           fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(30);
        text('Talking to machines is cool isn\'t it?', width/2, height/2);
    }
    console.log(mostrecentword);
  }
  function restartRec() {
    myRec.start();
  }
let myRec = new p5.SpeechRec;
myRec.continuous = false;
myRec.interimResults = true;
let myVoice = new p5.Speech();
function setup() {
  createCanvas(windowWidth, windowHeight);
  myRec.start();
  myRec.onResult = parseResult;
  myRec.onEnd = restartRec;
  myVoice.speak('what\'s your favorite color?');
}
function draw() {
}
function parseResult() {
  let lowStr = myRec.resultString.toLowerCase();
  let mostrecentword = lowStr.split(' ').pop();
  
  if (mostrecentword.indexOf("red") !== -1) {
    fill(255, 0, 0);
    noStroke();
    rect(0, 0, width, height);
  } else if (mostrecentword.indexOf("green") !== -1) {
    fill(0, 255, 0);
    noStroke();
    rect(0, 0, width, height);
    
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('like a tree', width / 2, height / 2);
  } else if (mostrecentword.indexOf("blue") !== -1) {
    fill(0, 0, 255);
    noStroke();
    rect(0, 0, width, height);
    myVoice.speak('I do not like blue.');
  } else if (mostrecentword.indexOf("stop") !== -1) {
    myVoice.speak('ok.');
  } 
  console.log(mostrecentword);
}
function restartRec() {
  myRec.start();
	let capture;
	let avgR, avgG, avgB
	function setup() {
	  pixelDensity(1);
	  createCanvas(windowWidth, windowHeight);
	  capture = createCapture(VIDEO);
	  capture.hide();
	  myVoice.speak('show me a book.');
	  myVoice.onEnd = restartVoice;
	}
	function draw() {
	  background(0);
	  image(capture, 0, 0, width, width * capture.height / capture.width);
	  let sumR = 0,
	    sumG = 0,
	    sumB = 0,
	    divider = width * width * capture.height / capture.width;
	  loadPixels();
	  for (let x = 0; x < width; x++) {
	    for (let y = 0; y < height; y++) {
	      let index = (x + y * width) * 4;
	      r = pixels[index + 0];
	      g = pixels[index + 1];
	      b = pixels[index + 2];
	      a = pixels[index + 3];
	      sumR += r;
	      sumG += g;
	      sumB += b;
	    }
	  }
	  avgR = sumR / divider;
	  avgG = sumG / divider;
	  avgB = sumB / divider;
	}
	function keyPressed() {
	  myVoice.setVoice(Math.floor(random(myVoice.voices.length)));
	  if (avgG > avgB && avgG > avgR) {
      myVoice.speak('this is your notebook. 2/13, nothing. perception <> meaning. lighting: the fewer lights you have, the easier to trick the eye, because the eyes would follow easy logics.');
	    achord();
	  }
	  if (avgR > avgG && avgR > avgB && avgG - avgB <= 20) {
      	  myVoice.setVoice(Math.floor(random(myVoice.voices.length)));
	    myVoice.speak('in her own words. red burns.that there is a knowledge shift from static knowledge to a dynamic searching paradigm. that creativity is not the game preserve of artists, but an intrinsic feature of all human activity.');
	    cchord();
	  }
	  if (avgB > avgG && avgB > avgR) {
	    myVoice.speak('I said show me a book, not a post-it. post-it notes are recyclable. www.post-it.com. post-it post-it post-it post-it post-it post-it post-it post-it post-it post-it post-it post-it');
	    gchord();
	  }
	  if (avgR > avgG && avgR > avgB && avgG - avgB >= 20) {
	    myVoice.speak('another notebook. the artist is within the discrepancy between physical fact and psychological effect | in order to use col. 11.1.15 sound: vibrations that travel through the air (or another medium) and can be heard when they reach a person\'s ear.')
	    echord();
	  }
	}
	function mousePressed() {
	  myVoice.setVoice(0);
	  if (avgG > avgB && avgG > avgR) {
	    myVoice.speak('this is your notebook. 2/13, nothing. perception <> meaning. lighting: the fewer lights you have, the easier to trick the eye, because the eyes would follow easy logics.');
	    myVoice.setVoice(0);
	    myVoice.speak('show me another book.');
	  }
	  if (avgR > avgG && avgR > avgB && avgG - avgB <= 20) {
	    myVoice.speak('in her own words. red burns.that there is a knowledge shift from static knowledge to a dynamic searching paradigm. that creativity is not the game preserve of artists, but an intrinsic feature of all human activity.');
	    myVoice.setVoice(0);
	    myVoice.speak('show me another book.');
	  }
	  if (avgB > avgG && avgB > avgR) {
	    myVoice.speak('I said show me a book, not a post-it. post-it notes are recyclable. www.post-it.com. post-it post-it post-it post-it post-it post-it post-it post-it post-it post-it post-it post-it');
	  }
	  if (avgR > avgG && avgR > avgB && avgG - avgB >= 20) {
	    myVoice.speak('another notebook. the artist is within the discrepancy between physical fact and psychological effect | in order to use col. 11.1.15 sound: vibrations that travel through the air (or another medium) and can be heard when they reach a person\'s ear.')
	    myVoice.setVoice(0);
	    myVoice.speak('show me another book.');
	  }
	}
	function restartVoice() {
	  myVoice = new p5.Speech();
	}let outputP;
function setup() {
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(24);
  outputP = createP("Click to generate a movie synopsis");
}
function draw() {}
function keyPressed() {
  mousePressed();
}
function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output = grammar.flatten("#origin#");
  outputP.html(output);
}
var grammarSource = {
  "origin": "#[hero:#popular names 2018#][#set close person#][#set sidekicks#][#set villain#][car ad:#car ad#][private jet ad: #private jet ad#]story#",
  "popular names 2018": ["Olivia", "Amara", "Cora", "Charlotte", "Amelia", "Penelope", "Phoebe", "Maya", "Matilda", "Chloe", "Lucy", "Aurelia", "Leo", "Charlie", "Milo", "Jasper", "Henry", "Sebastian", "Felix", "Ryker", "Emmett", "Matthew", "Luke", "Jacob"],
  "set close person": [
    "[close person:husband][close person name:Oliver][home activity ad: doing laundry with the latest Arm and Hammer Liquid Laundry Detergent in Clean Burst]",
    "[close person:daughter][close person name:Clementine][home activity ad: reading the Creative Activities and Curriculum for Young Children EBOOK]",
    "[close person:roommate][close person name:Gemma][home activity ad: binge watching Netflix shows with Pinch Provision's Binge Watching Survival Kit]"
  ],
  "set sidekicks": [
    "[love interest: immigration specialist Sadie][sacrificer: HR manager Nora][driver: compliance manager Kai][driver friend: wellness coach Daniel][first to die: motivational speaker Luis][rich person: multi-billionaire Lucas]",
    "[love interest: Uber driver Tobias][sacrificer: Airbnb host Imogen][driver: neuroscientist Lydia][driver friend: data scientist Hugo][first to die: freelancer Ophelia][rich person: multi-billionaire Lucas]"
  ],
  "set villain": [
    "[villain:medical debt collector][villain kills close person:stifles #close person name# to death with tons of medical bills][villain attack attempt:attack #hero# with medical bills][villain kills first to die:tries to put medical bills out of nowhere into #first to die#'s mouth][villain disease: disease of bill collecting][way to spread disease:contact with medical bills][rich person killed by villain:stifled to death by a medical debt collector][love interest hurt by villain:a small piece bitten off of a medical bill]",
    "[villain:corrupt official][villain kills close person:looks deeply into #close person name#'s eyes while yelling about starting a World War. #close person name# falls to the ground and dies out of myterious reasons][villain attack attempt:make eye contact with #hero# and attack #hero# with bribe money][villain kills first to die:briefly looks #first to die# in the eye#][villain disease: disease of corruption][way to spread disease:making eye contact][rich person killed by villain:killed by a corrupt official's evil glances][love interest hurt by villain:having exchanged glances with a corrupt official]",
    "[villain:identity thief][villain kills close person:steals #close person name#'s driver's license killing #close person name# in the process][villain attack attempt:attack #hero# and steal #hero#'s ID][villain kills first to die:grabs #first to die#'s wallet][villain disease: disease of identity theft][way to spread disease:stealing ID or credit card][rich person killed by villain:robbed and killed by an identity thief][love interest hurt by villain: an empty wallet with ID and credit cards gone]"
  ],
  "car ad": [
    "new 2018 Honda Accord, the power of dreams",
    "Nissan Altima, innovation that excites",
    "Toyota Camry, let's go places"
  ],
  "private jet ad": [
    "Bombardier: Global 7000, the largest purpose built business jet",
    "Gulfstream: G600, a combination of form, function, & efficiency",
    "HondaJet: HA-420, a high-performance sportscar in the sky"
  ],
  "story": ["<h2>Just Like A Zombie Movie</h2><p>#intro#</p><p>#loss#</p><p>#gang's all here#</p><p>#passing time#</p><p>#tension#</p><p>#evacuation#</p><p>#escape#</p><p>#sacrifices#</p>"],
  "intro": ["After a long day of work, #hero# comes home to a loving #close person#, #close person name#. The two spend the evening #home activity ad# and miss an important news bulletin. "],
  "loss": ["The next morning, a neighborhood girl unexpectedly enters their house and #villain kills close person#. To #hero#’s surprise, #close person name# immediately returns to life, but in the form of what seems like #villain.a#. #close person name# tries to #villain attack attempt#. #hero# flees in a #car ad#."],
  "gang's all here": ["On the road, #hero# meets #love interest#, #sacrificer#, #driver#, #driver friend#, #first to die# and #rich person#. They break into a nearby shopping mall and are attacked by a security guard in the form of #villain.a#, who #villain kills first to die#."],
  "passing time": ["Staying in the shopping mall, the group indulges themselves in consumerism. Romance buds between #hero# and #love interest#. Because of their shared fashion taste, #driver# develops a friendship with #driver friend#."],
  "tension": ["Meanwhile, #first to die# gets worse day by day and eventually passes away, only to return as #villain.a#. After killing #first to die#, the group discovers the #villain disease# is transmitted through #way to spread disease#."],
  "evacuation": ["As the #villain.s# accumulate outside the shopping mall, the group is forced to evacuate. Their plan is to equip #hero#’s #car ad# and head for a nearby private airport to escape on #rich person#’s #private jet ad#."],
  "escape": ["Navigating through the city, #driver# gets into a fight with #driver friend#, causing the car to crash. #rich person.capitalize# tries to flee on his own but is #rich person killed by villain#. #hero# kills the reanimated #rich person#, who’s turned into a #villain#, and retrieves his key to the #private jet ad#."],
  "sacrifices": ["Arriving at the airport, #sacrificer# sacrifices herself so others can escape. #love interest.capitalize#, after revealing #love interest hurt by villain#, dies fighting the #villain.s#. #hero#, #driver#, #driver friend# get onto the #private jet ad#. On the jet, while looking at the sunset outside the window, #hero# remembers what #close person name# used to say: \"#oprah quote#\""],
  "oprah quote": [
    "You can receive a lot of awards in your life, but there is nothing better, nothing better than being honored by your own.",
    "My philosophy is that not only are you responsible for your life, but doing the best at this moment puts you in the best place for the next moment.",
    "I believe that one of life's greatest risks is never daring to risk.",
    "Be thankful for what you have; you'll end up having more. If you concentrate on what you don't have, you will never, ever have enough.",
    "I think that when you invite people to your home, you invite them to yourself.",
    "Do the one thing you think you cannot do. Fail at it. Try again. Do better the second time. The only people who never tumble are those who never mount the high wire. This is your moment. Own it.",
    "Real integrity is doing the right thing, knowing that nobody's going to know whether you did it or not.",
    "The big secret in life is that there is no big secret. Whatever your goal, you can get there if you're willing to work.",
    "Every day brings a chance for you to draw in a breath, kick off your shoes, and dance.",
    "As you become more clear about who you really are, you'll be better able to decide what is best for you - the first time around.",
    "Shine within you so that it can shine on someone else. Let your light shine.",
    "I don't think you ever stop giving. I really don't. I think it's an on-going process. And it's not just about being able to write a check. It's being able to touch somebody's life.",
    "Unless you choose to do great things with it, it makes no difference how much you are rewarded, or how much power you have.",
    "Every time you state what you want or believe, you're the first to hear it. It's a message to both you and others about what you think is possible. Don't put a ceiling on yourself.",
    "For everyone of us that succeeds, it's because there's somebody there to show you the way out. The light doesn't always necessarily have to be in your family; for me it was teachers and school.",
    "What I know for sure is that what you give comes back to you.",
    "Every one of us gets through the tough times because somebody is there, standing in the gap to close it for us.",
    "With every experience, you alone are painting your own canvas, thought by thought, choice by choice.",
    "I believe the choice to be excellent begins with aligning your thoughts and words with the intention to require more from yourself.",
    "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.",
    "It took a lot of courage to take the high road, but I would rather be significant with six million people watching a show with meaning, than everyone watching a show with no meaning.",
    "You know you are on the road to success if you would do your job, and not be paid for it.",
    "You can have it all. You just can't have it all at once.",
    "If you neglect to recharge a battery, it dies. And if you run full speed ahead without stopping for water, you lose momentum to finish the race.",
    "The key to realizing a dream is to focus not on success but significance - and then even the small steps and little victories along your path will take on greater meaning.",
    "We are each responsible for our own life - no other person is or even can be.",
    "What I know is, is that if you do work that you love, and the work fulfills you, the rest will come.",
    "The biggest adventure you can ever take is to live the life of your dreams.",
    "Lots of people want to ride with you in the limo, but what you want is someone who will take the bus with you when the limo breaks down.",
    "Living in the moment brings you a sense of reverence for all of life's blessings.",
    "I believe that every single event in life happens in an opportunity to choose love over fear.",
    "Whatever you fear most has no power - it is your fear that has the power.",
    "Energy is the essence of life. Every day you decide how you're going to use it by knowing what you want and what it takes to reach that goal, and by maintaining focus.",
    "Though I am grateful for the blessings of wealth, it hasn't changed who I am. My feet are still on the ground. I'm just wearing better shoes.",
    "I trust that everything happens for a reason, even when we're not wise enough to see it.",
    "Challenges are gifts that force us to search for a new center of gravity. Don't fight them. Just find a different way to stand.",
    "Think like a queen. A queen is not afraid to fail. Failure is another steppingstone to greatness.",
    "The more you praise and celebrate your life, the more there is in life to celebrate.",
    "What God intended for you goes far beyond anything you can imagine.",
    "Devote today to something so daring even you can’t believe you’re doing it."
  ]
}let capture;
let particle = [600];
let mic;
function setup() {
    createCanvas(windowWidth, windowHeight);
    capture = createCapture(VIDEO);
    capture.hide();
    for (let i = 0; i < 2000; i++) {
        particle[i] = new Particle(createVector(random(width / 2 - 80, width / 2 + 80), random(height / 2 - 20, height / 2 + 20)), createVector(0, 0), createVector(0, 0), 0, 0, 0, 4);
    }
    mic = new p5.AudioIn();
    mic.start();
}
function draw() {
    background(0);
    push();
    image(capture, 0, 0, width, width * capture.height / capture.width);
    pop();
    fill(200);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text('Ok, you win.', width / 2, height / 2);
    let vol = mic.getLevel();
    let volMag = map(vol, 0, 1, 0, 2.5);
    for (let i = 0; i < particle.length; i++) {
        let centerForce = createVector(random(width / 2 - 80, width / 2 + 80), random(height / 2 - 20, height / 2 + 20));
        centerForce.sub(particle[i].location);
        centerForce.setMag(1);
        particle[i].applyForce(centerForce);
        let edgeForce = createVector(random(width / 2 - 80, width / 2 + 80), random(height / 2 - 20, height / 2 + 20));
        edgeForce.sub(particle[i].location);
        edgeForce.mult(-1);
        edgeForce.setMag(1);
        edgeForce.mult(volMag);
        particle[i].applyForce(edgeForce);
        particle[i].display();
        particle[i].update();
        particle[i].edge();
    }
    fill(255);
    noStroke();
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Use microphone to blow away the particles.', width / 2, height / 2 - 200);
}
let r, g, b, a;
let interval = 1;
let speed = 1;
let gameStopped = 0;
let capture;
function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    capture = createCapture(VIDEO);
    capture.hide();
    myRec.onEnd = restartRec;
}
function draw() {
    background(0);
    push();
    image(capture, 0, 0, width, width * capture.height / capture.width);
    pop();
    loadPixels();
    for (let x = 0; x < width; x += interval) {
        for (let y = 0; y < height; y += interval) {
            let index = (x + y * width) * 4;
            r = pixels[index + 0];
            g = pixels[index + 1];
            b = pixels[index + 2];
            a = pixels[index + 3];
            for (let newX = x; newX < x + interval; newX++) {
                for (let newY = y; newY < y + interval; newY++) {
                    let newIndex = (newX + newY * width) * 4;
                    pixels[newIndex + 0] = r;
                    pixels[newIndex + 1] = g;
                    pixels[newIndex + 2] = b;
                    pixels[newIndex + 3] = a;
                }
            }
        }
    }
    updatePixels();
    interval += speed;
    if (interval >= 200 || interval <= 1) {
        speed *= -1;
    }
    if (gameStopped == 0) {
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(24);
        text('GOAL: ACHIEVE 50% CLARITY', width / 2, height / 2 - 20);
        textSize(14);
        text('Say "stop" to see result.', width / 2, height / 2 + 20);
    }
    if (gameStopped == 1) {
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(24);
        text('YOU HAVE ACHIEVED ' + (100 - interval / 2) + '% CLARITY \n' + 'DEVIATION: ' + (100 - interval / 2 - 50), width / 2, height / 2 - 20);
        textSize(14);
        text('Say "restart" to try again.', width / 2, height / 2 + 20);
    }
}
function parseResult() {
    let lowStr = myRec.resultString.toLowerCase();
    let mostrecentword = lowStr.split(' ').pop();
    if (mostrecentword.indexOf("stop") !== -1) {
        speed = 0;
        gameStopped = 1;
    } else if (mostrecentword.indexOf("restart") !== -1) {
        interval = 1;
        speed = 1;
        gameStopped = 0;
    }
    console.log(mostrecentword);
}
function restartRec() {
    myRec.start();
}
let myVoice = new p5.Speech();
let capture;
let r, g, b, a;
let leftWidth, rightPos, upHeight, downPos, leftSpeed, rightSpeed, upSpeed, downSpeed;
let counter = 0;
let interval;
let arrowSize = 5;
function setup() {
    createCanvas(windowWidth, windowHeight);
    capture = createCapture(VIDEO);
    capture.hide();
    myRec.onEnd = restartRec;
    restartGame();
}
function draw() {
    background(0);
    push();
    image(capture, 0, 0, width, width * capture.height / capture.width);
    pop();
    fill(0);
    noStroke();
    rect(0, 0, leftWidth, height);
    stroke(255);
    strokeWeight(1);
    line(0, (downPos + upHeight) / 2, leftWidth, (downPos + upHeight) / 2);
    line(leftWidth, (downPos + upHeight) / 2, leftWidth - 4 * arrowSize, (downPos + upHeight) / 2 + 3 * arrowSize);
    line(leftWidth, (downPos + upHeight) / 2, leftWidth - 4 * arrowSize, (downPos + upHeight) / 2 - 3 * arrowSize);
    noStroke();
    rect(rightPos, 0, width - rightPos, height);
    stroke(255);
    strokeWeight(1);
    line(width, (downPos + upHeight) / 2, rightPos, (downPos + upHeight) / 2);
    line(rightPos, (downPos + upHeight) / 2, rightPos + 4 * arrowSize, (downPos + upHeight) / 2 + 3 * arrowSize);
    line(rightPos, (downPos + upHeight) / 2, rightPos + 4 * arrowSize, (downPos + upHeight) / 2 - 3 * arrowSize);
    noStroke();
    rect(0, 0, width, upHeight);
    stroke(255);
    strokeWeight(1);
    line((rightPos + leftWidth) / 2, 0, (rightPos + leftWidth) / 2, upHeight);
    line((rightPos + leftWidth) / 2, upHeight, (rightPos + leftWidth) / 2 + 3 * arrowSize, upHeight - 4 * arrowSize);
    line((rightPos + leftWidth) / 2, upHeight, (rightPos + leftWidth) / 2 - 3 * arrowSize, upHeight - 4 * arrowSize);
    noStroke();
    rect(0, downPos, width, height - downPos);
    stroke(255);
    strokeWeight(1);
    line((rightPos + leftWidth) / 2, height, (rightPos + leftWidth) / 2, downPos);
    line((rightPos + leftWidth) / 2, downPos, (rightPos + leftWidth) / 2 + 3 * arrowSize, downPos + 4 * arrowSize);
    line((rightPos + leftWidth) / 2, downPos, (rightPos + leftWidth) / 2 - 3 * arrowSize, downPos + 4 * arrowSize);
    leftWidth += leftSpeed;
    rightPos -= rightSpeed;
    upHeight += upSpeed;
    downPos -= downSpeed;
    noStroke();
    fill(255);
    textSize(14);
    textAlign(LEFT, BOTTOM);
    text('FORCE: ' + floor(leftSpeed * 10000), 50, (downPos + upHeight) / 2 - 5);
    textAlign(RIGHT, BOTTOM);
    text('FORCE: ' + floor(rightSpeed * 10000), width - 50, (downPos + upHeight) / 2 - 5);
    textAlign(LEFT, CENTER);
    text('FORCE: ' + floor(upSpeed * 1000), (rightPos + leftWidth) / 2 + 5, 50);
    textAlign(LEFT, CENTER);
    text('FORCE: ' + floor(downSpeed * 1000), (rightPos + leftWidth) / 2 + 5, height - 50);
    if ((upHeight + height - downPos < height) && (leftWidth + width - rightPos < width)) {
        fill(255);
        noStroke();
        textSize(24);
        textAlign(CENTER, CENTER);
        text('Say "up, down, left, right" to fight against the forces.', width / 2, height / 2);
    }
   else if (upHeight + height - downPos >= height) {
        clearInterval(interval);
        leftSpeed = 0;
        rightSpeed = 0;
        upSpeed = 0;
        downSpeed = 0;
        textSize(24);
        textAlign(CENTER, CENTER);
        text('You have survived:\n' + counter + ' seconds\n Say "restart" to try again.', width / 2, height / 2);
    }
    if (leftWidth + width - rightPos >= width) {
        clearInterval(interval);
        leftSpeed = 0;
        rightSpeed = 0;
        upSpeed = 0;
        downSpeed = 0;
        textSize(24);
        textAlign(CENTER, CENTER);
        text('You have survived:\n' + counter + ' seconds\n Say "restart" to try again.', width / 2, height / 2);
    }
}
function timeIt() {
    counter++;
}
function parseResult() {
    let lowStr = myRec.resultString.toLowerCase();
    let mostrecentword = lowStr.split(' ').pop();
    if (mostrecentword.indexOf("left") !== -1) {
        leftSpeed *= random(0.8, 1);
    }
    if (mostrecentword.indexOf("right") !== -1) {
        rightSpeed *= random(0.8, 1);
    }
    if (mostrecentword.indexOf("up") !== -1) {
        upSpeed *= random(0.8, 1);
    }
    if (mostrecentword.indexOf("down") !== -1) {
        downSpeed *= random(0.8, 1);
    }
    if (mostrecentword.indexOf("restart") !== -1) {
        restartGame();
    }
      if (mostrecentword.indexOf("seconds") !== -1) {
        myVoice.stop();
    }
    console.log(mostrecentword);
}
function restartGame() {
    counter = 0;
    clearInterval(interval);
    leftWidth = 0;
    rightPos = width;
    upHeight = 0;
    downPos = height;
    leftSpeed = random(0.9, 1.5);
    rightSpeed = random(0.9, 1.5);
    upSpeed = random(0.9, 1.5);
    downSpeed = random(0.9, 1.5);
    interval = setInterval(timeIt, 1000);
}
function restartRec() {
    myRec.start();
}
let rain = [1000];
function setup() {
  
  createCanvas(windowWidth, windowHeight);
    frameRate(24);
  
  for (let i = 0; i < 600; i++) {
    rain[i] = new Rain(createVector(random(width), random(height)), createVector(0,0), createVector(0,0), 20, 100, 150, 2, 4);
  }
}
function draw() {
  background(0);
    for (let i = 0; i < rain.length; i++) {
    rain[i].display();
    rain[i].update();
    rain[i].edge();
    
    let wind = createVector(0.1, -0.02);
    rain[i].applyForce(wind);
    
    if (keyIsPressed){
    let gravity = createVector(0, 1);
    rain[i].applyForce(gravity);
    rain[i].enlarge();
   }
  }
}
function keyTyped() {
  if (key === 'a') {
    achord();
  } else if (key === 's') {
    aschord();
  } else if (key === 'c') {
    cchord();
  } else if (key === 'g') {
    gchord();
  } else if (key === 'f') {
    fchord();
  } else if (key === 'e') {
    echord();
  }
}let rain = [1000];
function setup() {
 createCanvas(800, 600);
    frameRate(24);
  
  for (let i = 0; i < 600; i++) {
    rain[i] = new Rain(createVector(random(width), random(height)), createVector(0,0), createVector(0,0), 20, 100, 150, 2, 4);
  }
}
function draw() {
  background(0);
  for (let i = 0; i < rain.length; i++) {
    rain[i].display();
    rain[i].update();
    rain[i].edge();
    
    let wind = createVector(0.1, -0.02);
    rain[i].applyForce(wind);
    
     if (mouseIsPressed){
    let gravity = createVector(0, 1);
    rain[i].applyForce(gravity);
    rain[i].enlarge();
   }
  }
}let rain = [1000];
function setup() {
  
  createCanvas(windowWidth, windowHeight);
    frameRate(24);
  
  for (let i = 0; i < 600; i++) {
    rain[i] = new Rain(createVector(random(width), random(height)), createVector(0,0), createVector(0,0), 20, 100, 150, 2, 4);
  }
}
function draw() {
  background(0);
    for (let i = 0; i < rain.length; i++) {
    rain[i].display();
    rain[i].update();
    rain[i].edge();
    
    let wind = createVector(0.1, -0.02);
    rain[i].applyForce(wind);
    
    if (keyIsPressed){
    let gravity = createVector(0, 1);
    rain[i].applyForce(gravity);
    rain[i].enlarge();
   }
  }
}
function keyTyped() {
  if (key === 'a') {
    achord();
  } else if (key === 's') {
    aschord();
  } else if (key === 'c') {
    cchord();
  } else if (key === 'g') {
    gchord();
  } else if (key === 'f') {
    fchord();
  } else if (key === 'e') {
    echord();
  }
let colors = [];
let x = 110;
let y = 25;
let d = 30;
let state = false;
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  let millisecond = millis();
  let speed = 3.6e+6;
  if (state) {
    speed = 1000;
  } else {
    speed = 3.6e+6;
  }
  let hr = int(map(millisecond, 0, 24 * speed, 0, 24));
  let hrnum = hr % 24;
  let min = int(map(millisecond, 0, 24 * speed, 0, 1440))
  let minum = min % 60;
  let sec = int(map(millisecond, 0, 24 * speed, 0, 86400));
  let secnum = sec % 60;
  let hrnumnext;
  if (hrnum < 23) {
    hrnumnext = hrnum + 1;
  } else {
    hrnumnext = 0;
  }
  let bkgd = lerpColor(colors[hrnum], colors[hrnumnext], (millisecond % speed) / speed);
  background(bkgd);
  let hrdisplay = hrnum + 1;
  fill(255);
  textAlign(CENTER, CENTER);
  text("Jan 26, 2018", width / 2, height / 2 - 20);
  text(hrnum + ":" + minum + ":" + secnum, width / 2, height / 2);
  textAlign(LEFT, TOP);
  text("Time-lapse", 20, 20);
  if (state) {
    noStroke();
    fill(255);
    ellipse(x, y, d, d);
    fill(0);
    text("on", 103, 19);
  } else {
    noStroke();
    fill(255);
    ellipse(x, y, d, d);
    fill(0);
    text("off", 103, 19);
  }
}
function mousePressed() {
  if (dist(mouseX, mouseY, x, y) < d / 2) {
    state = !state;
  }
}var kinectron = null;
var x = 0;
var y = 0;
var bx = 0;
var by = 0;
var bxdir = 1;
var bydir = 1;
function setup() { 
  createCanvas(400, 400);
  
  kinectron = new Kinectron("172.16.231.35");
  kinectron.makeConnection();
  
	kinectron.startTrackedJoint(kinectron.HANDRIGHT, gotRightHand);
} 
function gotRightHand(hand) {
 console.log(hand);
  x = hand.depthX * width;
  y = hand.depthY * height;
}
function draw() { 
  background(220);
  ellipse(x, y, 50, 50);
  
  
  rectMode(CENTER);
  push()
  translate(bx,by);
  rotate(radians(25+frameCount));
  rect(0, 0, 50, 50);
  pop();
  
  bx = bx + bxdir;
  by = by + bydir;
  if (bx > width || bx < 0) {
   bxdir = bxdir * -1; 
  }
  
  if (by > height || by < 0) {
   bydir = bydir * -1; 
  }
  
  if (dist(bx, by, x, y) < 50) {
        fill(random(255),random(255),random(255));
		bx = x;
    by = y;
  }
  
  
}
var aLight;
var bLight;
var cLight;
var dLight
function setup() {
  createCanvas(600, 600);
}
function serverConnected() {
}
function gotList(thelist) {
  for (var i = 0; i < thelist.length; i++) {
  }
}
function gotOpen() {
}
function gotError(theerror) {
}
function gotData() {
    aLight = lights[0]; 
    bLight = lights[1]; 
    cLight = lights[2]; 
    dLight = lights[3];
  }
}
function gotRawData(thedata) {
}
function draw() {
  background(0);
    textSize(14);
    textAlign(CENTER);
    fill(255);
    text("Goal: turn all 4 lights on", width / 2, height / 2 - 50);
  
  fill(175);
  noStroke();
  ellipse(width / 2 - 75, height / 2, 20, 20);
  ellipse(width / 2 - 25, height / 2, 20, 20);
  ellipse(width / 2 + 25, height / 2, 20, 20);
  ellipse(width / 2 + 75, height / 2, 20, 20);
  if (aLight == 1) {
    noStroke();
    fill(20, 200, 180);
    ellipse(width / 2 - 75, height / 2, 20, 20);
  }
  if (bLight == 1) {
    noStroke();
    fill(20, 200, 180);
    ellipse(width / 2 - 25, height / 2, 20, 20);
  }
  if (cLight == 1) {
    noStroke();
    fill(20, 200, 180);
    ellipse(width / 2 + 25, height / 2, 20, 20);
  }
  if (dLight == 1) {
    noStroke();
    fill(20, 200, 180);
    ellipse(width / 2 + 75, height / 2, 20, 20);
  }
  if (aLight == 1 && bLight == 1 && cLight == 1 && dLight == 1) {
     disco();
    textSize(40);
    fill(255);
    textAlign(CENTER);
    text("OH YEAH, YOU SMART!", width / 2, height / 2 );
    }
 
}     
       
function disco() {
  background(0);
  for (x = 0; x < width+20; x = x + 20) {
    for (y = 0; y < height; y = y + 20) {
      fill(random(200), random(220), random(250));
      noStroke();
      ellipse(x, y, 20, 20);
    }
  }
  
}
let audio;
let level;
function preload() {
}
function setup() { 
  createCanvas(800, 600);
  level = new p5.Amplitude();
} 
function draw() { 
  background(0);
  
  
  for (x = 0; x < width+20; x = x + 20) {
    for (y = 0; y < height+20; y = y + 20) {
      fill(random(200), random(100), random(250),180);
      noStroke();
      ellipse(x, y, level.getLevel()*100, level.getLevel()*100);
    }
  }
}
function mousePressed() {
 audio.play(); 
}let audio;
let level;
function preload() {
}
function setup() { 
  createCanvas(800, 600);
  level = new p5.Amplitude();
} 
function draw() { 
  background(0);
  
  
  for (x = 0; x < width+20; x = x + 20) {
    for (y = 0; y < height+20; y = y + 20) {
      fill(random(200), random(100), random(250),180);
      noStroke();
      ellipse(x, y, level.getLevel()*100, level.getLevel()*100);
    }
  }
}
function mousePressed() {
 audio.play(); 
}let audio;
let level;
function preload() {
}
function setup() { 
  createCanvas(800, 600);
  level = new p5.Amplitude();
} 
function draw() { 
  background(0);
  
  
  for (x = 0; x < width+20; x = x + 20) {
    for (y = 0; y < height+20; y = y + 20) {
      fill(random(200), random(100), random(250),180);
      noStroke();
      ellipse(x, y, level.getLevel()*100, level.getLevel()*100);
    }
  }
}
function mousePressed() {
 audio.play(); 
}let audio;
let level;
function preload() {
  
}
function setup() { 
  createCanvas(800, 600);
  level = new p5.Amplitude();
} 
function draw() { 
  background(0);
  
  
  for (x = 0; x < width+20; x = x + 20) {
    for (y = 0; y < height+20; y = y + 20) {
      fill(random(200), random(100), random(250),180);
      noStroke();
      ellipse(x, y, level.getLevel()*100, level.getLevel()*100);
    }
  }
}
function mousePressed() {
 audio.play(); 
}var p1;
let pulses = [];
function setup() {
  createCanvas(400, 300);
  frameRate(24);
  for (var i = 0; i < 600; i++) {
    pulses[i] = new Pulse(random(width), random(height), 10, random(-0.5, 0.5),100);
  }
}
function draw() {
  background(0);
  for (let i = 0; i < pulses.length; i++) {
    pulses[i].display();
    for (let j = pulses.length - 1; j >= i; j--) {
      if (j != i && pulses[j].intersect(pulses[i])) {
        pulses[i].devour();
        pulses.splice(j, 1);
      }
    }
    if (pulses[i].d >100){
      pulses[i].alpha--;
    }
      
  }
  
}var dragging = false; 
var rollover = false;
var balls = [];
var spring = 0.05;
var friction = -0.9;
var gravity = 0.03;
var tempDia = 0;
var colours = ['#247BA0', '#70C1B3', '#B2DBBF', '#F3FFBD', '#FF1654'];
function setup() {
    createCanvas(600, 400);
    for (var i = 0; i < 64; i++) {
        balls.push(new Ball(i));
    }
      	tempDia = balls[20].diameter;
}
function draw() {
    background(255);
  
  	if(dist(mouseX, mouseY, balls[20].x, balls[20].y) < balls[20].diameter/2)
  	{
      rollover = true;
      balls[20].diameter = 50;
    }else{
      rollover = false;
      balls[20].diameter = tempDia;
    }
    for (var j = 0; j < balls.length; j++) {
        balls[j].collide(balls);
    }
    for (var i = 0; i < balls.length; i++) {
        balls[i].move();
        if (dragging) {
  	  balls[20].x = mouseX + balls[20].offsetX;
  	  balls[20].y = mouseY + balls[20].offsetY;
  	  }
        balls[i].display();
    }
  	
  
}
function Ball(id) {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.vx = 0;
    this.vy = 0;
    this.colour = random(colours);
    
  
  	this.offsetX = 0;
  	this.offsetY = 0;
    this.id = id;
    this.move = function() {
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.diameter / 2 > width) {
            this.x = width - this.diameter / 2;
            this.vx *= friction;
        } else if (this.x - this.diameter / 2 < 0) {
            this.x = this.diameter / 2;
            this.vx *= friction;
        }
        if (this.y + this.diameter / 2 > height) {
            this.y = height - this.diameter / 2;
            this.vy *= friction;
        } else if (this.y - this.diameter / 2 < 0) {
            this.y = this.diameter / 2;
            this.vy *= friction;
        }
    };
    this.collide = function(objArray) {
        for (i = 0; i < objArray.length; i++) {
          
            var dx = objArray[i].x - this.x;
            var dy = objArray[i].y - this.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var minDist = objArray[i].diameter / 2 + this.diameter / 2;
            if (distance < minDist) {
              
                var angle = Math.atan2(dy, dx);
                var targetX = this.x + Math.cos(angle) * minDist;
                var targetY = this.y + Math.sin(angle) * minDist;
                var ax = (targetX - objArray[i].x) * spring;
                var ay = (targetY - objArray[i].y) * spring;
         
                this.vx -= ax;
                this.vy -= ay;
                objArray[i].vx += ax;
                objArray[i].vy += ay;
            }
        }
    };
  
		
    this.display = function() {
      if(this.id == 20)
      {
        noStroke();
        fill(0);
      }else{
        noStroke();
        
        fill(this.colour);}
      
        ellipse(this.x, this.y, this.diameter, this.diameter);
    };
}
function mousePressed()
{
  if(dist(mouseX, mouseY, balls[20].x, balls[20].y) < balls[20].diameter/2)
  {
    dragging = true;
    balls[20].diameter = 50;
    balls[20].offsetX = balls[20].x - mouseX;
    balls[20].offsetY = balls[20].y - mouseY;  
  }
    
}
function mouseReleased() {
  dragging = false;
  balls[20].diameter = tempDia;
}var data;
var i = 0;
   var interval = 54.5;
    var barheight = 2;
function setup() {
    createCanvas(800, 600);
    background(20, 20, 20);
}
function preload() {
    data = loadJSON("marxism.json");
}
function draw() {
    background(20, 20, 20);
    fill(100, 20, 20);
    textAlign(LEFT);
    textSize(20);
    text('MARXISM IN 1989', 200, 100);
    textSize(14);
    fill(100, 100, 100);
    text('NY Times articles in the year 1989 containing the word "Marxism"', 200, 120);
    ellipse(100, 250, 40, 40);
    textAlign(CENTER);
    fill(0);
    textSize(20);
    text('<', 100, 255);
    fill(100, 20, 20);
    ellipse(700, 250, 40, 40);
    fill(0);
    text('>', 700, 255);
    var articles = data.response.docs;
    textSize(30);
    textAlign(LEFT);
    noStroke();
    fill(255);
    text(articles[i].headline.main, 200, 200, 400, 200);
    textSize(20);
    text(articles[i].pub_date, 200, 425);
    displayGraphic();
    
    
    if (dist(mouseX, mouseY, 100, 575) < 20) {
       i=0;
    }
    
    if (dist(mouseX, mouseY, 100+interval, 575) < 20) {
       i=20;
    }
    
    
    if (dist(mouseX, mouseY, 100+interval*2, 575) < 20) {
       i=33;
    }
    
    
    if (dist(mouseX, mouseY, 100+interval*3, 575) < 20) {
       i=43;
    }
    
    
    if (dist(mouseX, mouseY, 100+interval*4, 575) < 20) {
       i=51;
    }
    
    
    if (dist(mouseX, mouseY, 100+interval*5, 575) < 20) {
       i=64;
    }
    
    if (dist(mouseX, mouseY, 100+interval*6, 575) < 20) {
       i=74;
    }
    
    if (dist(mouseX, mouseY, 100+interval*7, 575) < 20) {
       i=85;
    }
    
    if (dist(mouseX, mouseY, 100+interval*8, 575) < 20) {
       i=98;
    }
    
    if (dist(mouseX, mouseY, 100+interval*9, 575) < 20) {
       i=107;
    }
    
    if (dist(mouseX, mouseY, 100+interval*10, 575) < 20) {
       i=121;
    }
    
    if (dist(mouseX, mouseY, 100+interval*11, 575) < 20) {
       i=136;
    }
}
function mousePressed() {
    var articles = data.response.docs;
    if (dist(mouseX, mouseY, 100, 250) < 20) {
        i--;
    }
    if (dist(mouseX, mouseY, 700, 250) < 20) {
        i++;
    }
    if (i >= articles.length) {
        i = 0;
    }
    if (i < 0) {
        i = 0;
    }
}
function displayGraphic() {
 
    fill(100, 20, 20);
    for (var y = 400; y < 600; y = y + 10) {
        rect(80, y, 40, barheight);
    }
    for (var y = 470; y < 600; y = y + 10) {
        rect(80 + interval, y, 40, barheight);
    }
    for (var y = 500; y < 600; y = y + 10) {
        rect(80 + interval * 2, y, 40, barheight);
    }
    for (var y = 500; y < 600; y = y + 10) {
        rect(80 + interval * 3, y, 40, barheight);
    }
    for (var y = 470; y < 600; y = y + 10) {
        rect(80 + interval * 4, y, 40, barheight);
    }
    for (var y = 500; y < 600; y = y + 10) {
        rect(80 + interval * 5, y, 40, barheight);
    }
    for (var y = 490; y < 600; y = y + 10) {
        rect(80 + interval * 6, y, 40, barheight);
    }
    for (var y = 470; y < 600; y = y + 10) {
        rect(80 + interval * 7, y, 40, barheight);
    }
    for (var y = 500; y < 600; y = y + 10) {
        rect(80 + interval * 8, y, 40, barheight);
    }
    for (var y = 460; y < 600; y = y + 10) {
        rect(80 + interval * 9, y, 40, barheight);
    }
    for (var y = 450; y < 600; y = y + 10) {
        rect(80 + interval * 10, y, 40, barheight);
    }
    for (var y = 360; y < 600; y = y + 10) {
        rect(80 + interval * 11, y, 40, barheight);
    }
        textSize(14);
        fill(220, 20, 20);
        text('JAN', 80, 575);
        text('FEB', 80 + interval, 575);
        text('MAR', 80 + interval * 2, 575);
        text('APR', 80 + interval * 3, 575);
        text('MAY', 80 + interval * 4, 575);
        text('JUN', 80 + interval * 5, 575);
        text('JUL', 80 + interval * 6, 575);
        text('AUG', 80 + interval * 7, 575);
        text('SEPT', 80 + interval * 8, 575);
        text('OCT', 80 + interval * 9, 575);
        text('NOV', 80 + interval * 10, 575);
        text('DEC', 80 + interval * 11, 575);
}
function setup() { 
noCanvas();
} 
function mousePressed () {
    for (var j = 0; j < 130; j++) {
  var pagenum = j;
  loadJSON(data,callback);
}
}
function callback(data) {
  console.log(data);
  var articles = data.response.docs;
  for (var i = 0; i < articles.length; i++) {
  createElement('h1', articles[i].headline.main);
  createElement('h2', articles[i].pub_date);
  createP(articles[i].snippet);
  }
}
function draw() { 
  background(220);
  
since the day I was born: 1989/10/27
var inputBox;
var inputButton;
function setup() {
  noCanvas();
  inputButton = createButton('JUMP TO PAGE');
  inputButton.mouseClicked(newpage);
  inputBox = createInput('0');
  
}
function newpage() {
  var pagenum = inputBox.value();
  loadJSON(url, gotdata);
}
function gotdata(data) {
  console.log(data);
  var articles = data.response.docs;
  for (var i = 0; i < articles.length; i++) {
  createElement('h1', articles[i].headline.main);
  createElement('h2', articles[i].pub_date);
  createP(articles[i].snippet);
  }
}
function draw() {
  background(220);
 
let sentences = [];
let alex;
let hello;
let a0;
let a1;
let a2;
let a3;
let a4;
let a5;
let a6;
let a7;
let a8;
let a9;
let a10;
let a11;
let a12;
let a13;
let a14;
let a15;
let a16;
let a17;
let a18;
let a19;
let a20;
let a21;
let a22;
let a23;
let a24;
let a25;
let a26;
let a27;
let a28;
let a29;
let a30;
let a31;
let a32;
let a33;
let a34;
let a35;
let a36;
let a37;
let a38;
let a39;
let a40;
let a41;
function preload() {
  hello = loadSound('hello.mp3');
  a0 = loadSound('a0.mp3');
  a1 = loadSound('a1.mp3');
  a2 = loadSound('a2.mp3');
  a3 = loadSound('a3.mp3');
  a4 = loadSound('a4.mp3');
  a5 = loadSound('a5.mp3');
  a6 = loadSound('a6.mp3');
  a7 = loadSound('a7.mp3');
  a8 = loadSound('a8.mp3');
  a9 = loadSound('a9.mp3');
  a10 = loadSound('a10.mp3');
  a11 = loadSound('a11.mp3');
  a12 = loadSound('a12.mp3');
  a13 = loadSound('a13.mp3');
  a14 = loadSound('a14.mp3');
  a15 = loadSound('a15.mp3');
  a16 = loadSound('a16.mp3');
  a17 = loadSound('a17.mp3');
  a18 = loadSound('a18.mp3');
  a19 = loadSound('a19.mp3');
  a20 = loadSound('a20.mp3');
  a21 = loadSound('a21.mp3');
  a22 = loadSound('a22.mp3');
  a23 = loadSound('a23.mp3');
  a24 = loadSound('a24.mp3');
  a25 = loadSound('a25.mp3');
  a26 = loadSound('a26.mp3');
  a27 = loadSound('a27.mp3');
  a28 = loadSound('a28.mp3');
  a29 = loadSound('a29.mp3');
  a30 = loadSound('a30.mp3');
  a31 = loadSound('a31.mp3');
  a32 = loadSound('a32.mp3');
  a33 = loadSound('a33.mp3');
  a34 = loadSound('a34.mp3');
  a35 = loadSound('a35.mp3');
  a36 = loadSound('a36.mp3');
  a37 = loadSound('a37.mp3');
  a38 = loadSound('a38.mp3');
  a39 = loadSound('a39.mp3');
  a40 = loadSound('a40.mp3');
  a41 = loadSound('a41.mp3');
}
function setup() {
  createCanvas(1440, 900);
  reset();
}
function draw() {
  alex.display();
  alex.rollEyes();
}
function mousePressed() {
  background(236, 2, 119);
  let randomNumber = int(random(0, 42));
  textSize(24);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text(sentences[randomNumber], width / 2, height / 2 + 200);
    if (randomNumber == 0) {
      a0.play();
    }
    if (randomNumber == 1) {
      a1.play();
    }
    if (randomNumber == 2) {
      a2.play();
    }
    if (randomNumber == 3) {
      a3.play();
    }
    if (randomNumber == 4) {
     a4.play();
    }
    if (randomNumber == 5) {
      a5.play();
    }
    if (randomNumber == 6) {
      a6.play();
    }
    if (randomNumber == 7) {
      a7.play();
    }
    if (randomNumber == 8) {
      a8.play();
    }
    if (randomNumber == 9) {
      a9.play();
    }
    
    
        if (randomNumber == 10) {
      a10.play();
    }
    if (randomNumber == 11) {
      a11.play();
    }
    if (randomNumber == 12) {
      a12.play();
    }
    if (randomNumber == 13) {
      a13.play();
    }
    if (randomNumber == 14) {
     a14.play();
    }
    if (randomNumber == 15) {
      a15.play();
    }
    if (randomNumber == 16) {
      a16.play();
    }
    if (randomNumber == 17) {
      a17.play();
    }
    if (randomNumber == 18) {
      a18.play();
    }
    if (randomNumber == 19) {
      a19.play();
    }
    
    
        if (randomNumber == 20) {
      a20.play();
    }
    if (randomNumber == 21) {
      a21.play();
    }
    if (randomNumber == 22) {
      a22.play();
    }
    if (randomNumber == 23) {
      a23.play();
    }
    if (randomNumber == 24) {
     a24.play();
    }
    if (randomNumber == 25) {
      a25.play();
    }
    if (randomNumber == 26) {
      a26.play();
    }
    if (randomNumber == 27) {
      a27.play();
    }
    if (randomNumber == 28) {
      a28.play();
    }
    if (randomNumber == 29) {
      a29.play();
    }
    
    
        if (randomNumber == 30) {
      a30.play();
    }
    if (randomNumber == 31) {
      a31.play();
    }
    if (randomNumber == 32) {
      a32.play();
    }
    if (randomNumber == 33) {
      a33.play();
    }
    if (randomNumber == 34) {
     a34.play();
    }
    if (randomNumber == 35) {
      a35.play();
    }
    if (randomNumber == 36) {
      a36.play();
    }
    if (randomNumber == 37) {
      a37.play();
    }
    if (randomNumber == 38) {
      a38.play();
    }
    if (randomNumber == 39) {
      a39.play();
    }
    
    
        if (randomNumber == 40) {
      a0.play();
    }
    if (randomNumber == 41) {
      a1.play();
    }
}
function keyPressed() {
  reset();
}
function reset() {
  background(236, 2, 119);
  alex = new Bot(611, 267, 829, 267, 176, 176, 0.2, 2);
  sentences[0] = ("Why don't you move your chairs closer?");
  sentences[1] = ("Why not talk about your favorite movies?");
  sentences[2] = ("When was the last time you dated someone?");
  sentences[3] = ("I think you should look each other in the eye for 20 seconds.");
  sentences[4] = ("Tell each other what you did for the weekend.");
  sentences[5] = ("Now compliment your partner.");
  sentences[6] = ("What is your first impression of each other?");
  sentences[7] = ("Talk about the music you like.");
  sentences[8] = ("What would a “perfect” day be like for you?");
  sentences[9] = ("Give each other a friendly hug.");
  sentences[10] = ("Now, hold each other's hand for 20 seconds.");
  sentences[11] = ("When did you last sing to yourself?");
  sentences[12] = ("If you could change anything about how you were raised, what would it be?");
  sentences[13] = ("If you could gain one superpower, what would it be?");
  sentences[14] = ("Is there something that you’ve dreamed of doing for a long time?");
  sentences[15] = ("What do you value most in a friendship?");
  sentences[16] = ("What is your most treasured memory?");
  sentences[17] = ("If you knew that you would die in one year, would you change anything about the way you are now living?");
  sentences[18] = ("What roles do love and affection play in your life?");
  sentences[19] = ("How do you feel about your relationship with your mother?");
  sentences[20] = ("When did you last cry in front of another person?");
  sentences[21] = ("Tell your partner something that you like about them already.");
  sentences[22] = ("What, if anything, is too serious to be joked about?");
  sentences[23] = ("Of all the people in your family, whose death would you find most disturbing?");
  sentences[24] = ("Share with your partner an embarrassing moment in your life.");
  sentences[25] = ("Given the choice of anyone in the world, whom would you want as a dinner guest?");
  sentences[26] = ("Have you dreamed of being famous? In what way?");
  sentences[27] = ("Name three things you and your partner appear to have in common.");
  sentences[28] = ("Touch a part of your partner's face for 10 seconds.");
  sentences[29] = ("Make your best funny face and take a selfie together.");
  sentences[30] = ("What would be the ONE item you would want to save if your house catches fire?");
  sentences[31] = ("Take out your phone and show your partner one photo you really like.");
  sentences[32] = ("If you were going to become a close friend with your partner, please share what would be important for him or her to know.");
  sentences[33] = ("Tell your partner what you like and dislike about New York.");
  sentences[34] = ("What do you do for a living? Are you liking it?");
  sentences[35] = ("If you can go on a vacation right now, where would you go?");
  sentences[36] = ("Sing to your partner your favorite song.");
  sentences[37] = ("Some people say New York is a lonely place, do you agree?");
  sentences[38] = ("How do you feel about your relationship with your father?");
  sentences[39] = ("Tell your partner something about yourself you wouldn't normally tell someone you just met.");
  sentences[40] = ("Tell your partner the story of your worst breakup.");
  sentences[41] = ("Do you believe in love at first sight?");
  textSize(24);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  hello.play();
  text("Hello, I'm Alex. Don't mind me. I'm just here to help.", width / 2, height / 2 + 200);
}let canvas;
let p1;
let pulses = [];
function setup() {
  canvas = createCanvas(800, 600);
  canvas.position(10, 110);
  slider = createSlider(0, 800, 5);
  slider.position(10, 100);
  slider.style('width', '800px');
}
function draw() {
  background(0);
  let sliderVal = slider.value();
  for (var i = 0; i < sliderVal; i++) {
    pulses[i] = new Pulse(random(width), random(height), random(100), random(2))
    pulses[i].display();
  }
let sentences = [];
let alex;
let hello;
let a0;
let a1;
let a2;
let a3;
let a4;
let a5;
let a6;
let a7;
let a8;
let a9;
function preload() {
  hello = loadSound('hello.mp3');
    a0 = loadSound('a0.mp3');
 a1 = loadSound('a1.mp3');
   a2 = loadSound('a2.mp3');
   a3 = loadSound('a3.mp3');
 a4 = loadSound('a4.mp3');
   a5 = loadSound('a5.mp3');
   a6 = loadSound('a6.mp3');
   a7 = loadSound('a7.mp3');
    a8 = loadSound('a8.mp3');
    a9 = loadSound('a9.mp3');
}
function setup() {
  createCanvas(1440, 900);
  reset();
}
function draw() {
  alex.display();
  alex.rollEyes();
  
}
function mousePressed() {
  background(36, 34, 123);
  let randomNumber = int(random(0, 10));
  textSize(24);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  text(sentences[randomNumber], width / 2, height / 2 + 200);
  if (randomNumber == 0) {
    a0.play();
  }
  if (randomNumber == 1) {
    a1.play();
  }
  if (randomNumber == 2) {
    a2.play();
  }
  if (randomNumber == 3) {
    a3.play();
  }
  if (randomNumber == 4) {
   a4.play();
  }
  if (randomNumber == 5) {
    a5.play();
  }
  if (randomNumber == 6) {
    a6.play();
  }
  if (randomNumber == 7) {
    a7.play();
  }
  if (randomNumber == 8) {
    a8.play();
  }
  if (randomNumber == 9) {
    a9.play();
  }
}
function keyPressed() {
  reset();
}
function reset() {
  background(36, 34, 123);
  alex = new Bot(611, 267, 829, 267, 176, 176, 0.2, 2);
  sentences[0] = ("Why don't you move your chairs closer?");
  sentences[1] = ("Why not talk about your favorite movies?");
  sentences[2] = ("When was the last time you dated someone?");
  sentences[3] = ("I think you should look each other in the eye for 10 seconds.");
  sentences[4] = ("Tell each other what you did for the weekend.");
  sentences[5] = ("If you're running out of topics, why not compliment each other.");
  sentences[6] = ("What is your first impression of each other?");
  sentences[7] = ("It's always great to talk about the music you like.");
  sentences[8] = ("I'm running out of advice. You see, I'm not real.");
  sentences[9] = ("Give each other a friendly hug.");
  textSize(24);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  hello.play();
  text("Hello, I'm Alex. Don't mind me. I'm just here to help.", width / 2, height / 2 + 200);
let sentences = [];
let alex;
let hello;
let a1;
let a2;
let a3;
let a4;
let b1;
let b2;
let b3;
let b4;
let c1;
let c2;
function preload() {
  hello = loadSound('hello.mp3');
  a1 = loadSound('a1.mp3');
  a2 = loadSound('a2.mp3');
  a3 = loadSound('a3.mp3');
  a4 = loadSound('a4.mp3');
  b1 = loadSound('b1.mp3');
  b2 = loadSound('b2.mp3');
  b3 = loadSound('b3.mp3');
  b4 = loadSound('b4.mp3');
  c1 = loadSound('c1.mp3');
  c2 = loadSound('c2.mp3');
}
function setup() {
  createCanvas(1440, 900);
  reset();
}
function draw() {
  alex.display();
  alex.rollEyes();
}
function mousePressed() {
  background(36, 34, 123);
  let randomNumber = int(random(0, 10));
  textSize(24);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  text(sentences[randomNumber], width / 2, height / 2 + 200);
  if (randomNumber == 0) {
    a1.play();
  }
  if (randomNumber == 1) {
    a2.play();
  }
  if (randomNumber == 2) {
    a3.play();
  }
  if (randomNumber == 3) {
    a4.play();
  }
  if (randomNumber == 4) {
    b1.play();
  }
  if (randomNumber == 5) {
    b2.play();
  }
  if (randomNumber == 6) {
    b3.play();
  }
  if (randomNumber == 7) {
    b4.play();
  }
  if (randomNumber == 8) {
    c1.play();
  }
  if (randomNumber == 9) {
    c2.play();
  }
}
function keyPressed() {
  reset();
}
function reset() {
  background(36, 34, 123);
  alex = new Bot(611, 267, 829, 267, 176, 176, 0.2, 2);
  sentences[0] = ("You know what to say, use A1");
  sentences[1] = ("Come on, use line A2");
  sentences[2] = ("Trust me, say line A3");
  sentences[3] = ("You're asking the right person, say line A4");
  sentences[4] = ("If I were you, I'd use line B1");
  sentences[5] = ("Easy peasy lemon squeezy, say line B2");
  sentences[6] = ("I have an idea, go to line B3");
  sentences[7] = ("Remember that cheat sheet I gave you? Go to line B4");
  sentences[8] = ("Let's see if this one works, go to C1 on the sheet I gave you");
  sentences[9] = ("Looking for things to say? Go to C2 on the sheet I gave you");
  textSize(24);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  hello.play();
  text("Hello, I'm Alex. Don't mind me. I'm just here to help.", width / 2, height / 2 + 200);
var aLight;
var bLight;
var cLight;
var dLight
function setup() {
  createCanvas(600, 600);
}
function serverConnected() {
}
function gotList(thelist) {
  for (var i = 0; i < thelist.length; i++) {
  }
}
function gotOpen() {
}
function gotError(theerror) {
}
function gotData() {
    aLight = lights[0]; 
    bLight = lights[1]; 
    cLight = lights[2]; 
    dLight = lights[3];
  }
}
function gotRawData(thedata) {
}
function draw() {
  background(0);
    textSize(14);
    textAlign(CENTER);
    fill(255);
    text("Goal: turn all 4 lights on", width / 2, height / 2 - 50);
  
  fill(175);
  noStroke();
  ellipse(width / 2 - 75, height / 2, 20, 20);
  ellipse(width / 2 - 25, height / 2, 20, 20);
  ellipse(width / 2 + 25, height / 2, 20, 20);
  ellipse(width / 2 + 75, height / 2, 20, 20);
  if (aLight == 1) {
    noStroke();
    fill(20, 200, 180);
    ellipse(width / 2 - 75, height / 2, 20, 20);
  }
  if (bLight == 1) {
    noStroke();
    fill(20, 200, 180);
    ellipse(width / 2 - 25, height / 2, 20, 20);
  }
  if (cLight == 1) {
    noStroke();
    fill(20, 200, 180);
    ellipse(width / 2 + 25, height / 2, 20, 20);
  }
  if (dLight == 1) {
    noStroke();
    fill(20, 200, 180);
    ellipse(width / 2 + 75, height / 2, 20, 20);
  }
  if (aLight == 1 && bLight == 1 && cLight == 1 && dLight == 1) {
     disco();
    textSize(40);
    fill(255);
    textAlign(CENTER);
    text("OH YEAH, YOU SMART!", width / 2, height / 2 );
    }
 
}     
       
function disco() {
  background(0);
  for (x = 0; x < width+20; x = x + 20) {
    for (y = 0; y < height; y = y + 20) {
      fill(random(200), random(220), random(250));
      noStroke();
      ellipse(x, y, 20, 20);
    }
  }
  
}
let mySound;
function preload() {
  mySound = loadSound('riot.mp3');
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  mySound.play();
}var p1;
let pulses = [];
function setup() {
  createCanvas(400, 300);
  for (var i = 0; i < 300; i++) {
    pulses[i] = new Pulse(random(width), random(height), random(100), random(2));
  }
}
function draw() {
  background(0);
  for (var i = 0; i < pulses.length; i++) {
    pulses[i].display();
  }
var eyex;
var eyey;
var eyehistory = [];
var j = 0;
var i = 0;
var going = true;
function preload() {
  data = loadJSON("projects.json");
}
function setup() {
  createCanvas(800, 600);
  frameRate(24);
}
function draw() {
  background(0);
  displayEye();
  displayName();
 
}
function mousePressed() {
  
    going=!going;  
  
    if (going) {
     frameRate(24);
  }
  if (!going){
    frameRate(0.0000000000000000000000001);
  }
}
function displayName() {
  var projectName = data.projects[i].Name;
  i = i + 1;
  if (i > 51) {
    i = 0;
  }
  textAlign(CENTER);
  textSize(32);
  textStyle(BOLD);
  noStroke();
  fill(255);
  text(projectName, width / 2, height / 2);
}
function displayEye() {
  stroke(100);
  strokeWeight(2);
  noFill();
  arc(eyex, eyey - 2, 45, 20, PI, TWO_PI);
  arc(eyex, eyey, 30, 15, PI, TWO_PI);
  arc(eyex, eyey, 30, 15, TWO_PI, PI);
  ellipse(eyex, eyey, 5, 5);
  ellipse(eyex, eyey, 15, 15);
  eyex = random(width);
  eyey = random(height);
  var v = createVector(eyex, eyey);
  eyehistory.push(v);
  for (var j = 0; j < eyehistory.length; j++) {
    arc(eyehistory[j].x+random(-2,2), eyehistory[j].y - 2, 45, 20, PI, TWO_PI);
    arc(eyehistory[j].x+random(-2,2), eyehistory[j].y, 30, 15, PI, TWO_PI);
    arc(eyehistory[j].x+random(-2,2), eyehistory[j].y, 30, 15, TWO_PI, PI);
    ellipse(eyehistory[j].x+random(-2,2), eyehistory[j].y, 5, 5);
    ellipse(eyehistory[j].x+random(-2,2), eyehistory[j].y, 15, 15);
  }
}var sqx;
var sqy;
var d;
  
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}
function draw() {
  background(220);
  displaySquare(100, 200);
  moveSquare();
}
function displaySquare(sqx, sqy) {
  for (var d = 100; d > 0; d = d - 10) {
    noFill();
    stroke (random(255),random(255),random(255));
    rect(sqx, sqx, d, d);
  }
}
function moveSquare(){
  sqx = sqx + d;
}function setup() { 
  createCanvas(600, 400);
    img = loadImage ("p1152556640.jpg");
} 
function preload(){
    img = loadImage ("p1152556640.jpg");
}
function draw() { 
  background(220);
  
  image (img, 0, 0);
let colors = [];
function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  background(255);
  rect(0, 0, 300, 150);
  rect(0, 150, 300, 150);
  rect(300, 0, 300, 300);
  rect(0, 300, 150, 300);
  rect(150, 300, 150, 300);
  rect(300, 300, 150, 150);
  rect(450, 300, 150, 150);
  rect(300, 450, 300, 150);
}
function draw() {
}
function mousePressed() {
  if (mouseX < 300 && mouseY < 150) {
    let randomNumber = int(random(0, 6));
    fill(colors[randomNumber]);
    rect(0, 0, 300, 150);
  }
  if (mouseX < 300 && mouseY < 300 && mouseY > 150) {
    let randomNumber = int(random(0, 6));
    fill(colors[randomNumber]);
    rect(0, 150, 300, 150);
  }
  if (mouseX > 300 && mouseY < 300) {
    let randomNumber = int(random(0, 6));
    fill(colors[randomNumber]);
    rect(300, 0, 300, 300);
  }
  if (mouseX < 150 && mouseY > 300) {
    let randomNumber = int(random(0, 6));
    fill(colors[randomNumber]);
    rect(0, 300, 150, 300);
  }
  if (mouseX > 150 && mouseX < 300 && mouseY > 300) {
    let randomNumber = int(random(0, 6));
    fill(colors[randomNumber]);
    rect(150, 300, 150, 300);
  }
  if (mouseX > 300 && mouseX < 450 && mouseY > 300 && mouseY < 450) {
    let randomNumber = int(random(0, 6));
    fill(colors[randomNumber]);
    rect(300, 300, 150, 150);
  }
  if (mouseX > 450 && mouseY > 300 && mouseY < 450) {
    let randomNumber = int(random(0, 6));
    fill(colors[randomNumber]);
    rect(450, 300, 150, 150);
  }
  if (mouseX > 300 && mouseY > 450) {
    let randomNumber = int(random(0, 6));
    fill(colors[randomNumber]);
    rect(300, 450, 300, 150);
  }
}function setup() {
  createCanvas(600, 600);
}
function draw() {
  background(0);
  for (x = 0; x < mouseX; x = x + 20) {
    for (y = 0; y < mouseY; y = y + 20) {
      fill(random(200), random(220), random(250));
      noStroke();
      ellipse(x, y, 20, 20);
    }
  }
}var r=255;
var g=20;
var b = 20;
function setup() { 
  createCanvas(600, 600);
   background(0);
} 
function draw() { 
   fill(r,g,b);
  noStroke();
  ellipse(width/2,height/2,300,300);
  
  textSize(24)
  fill(255);
  text("BIG RED BUTTON", width/2-100,height/2+10);
  if(dist(mouseX, mouseY, width/2,height/2) < 150){
    r=random(255);
    g=random(20);
    b=random(20);
    
  }
  
    if(mouseIsPressed && dist(mouseX, mouseY, width/2,height/2) < 150){
    background(random(255),random(255),random(255));
  }
  
var boat = {
  x1: -210,
  y1: 196,
  r: 0,
}
var waves = {
  x2: -20,
  y2: 410,
}
function setup() {
  createCanvas(800, 600);
  frameRate(random(10, 120));
}
function draw() {
  background(0, 0, 70);
  noStroke();
  fill(random(255), random(255), 0);
  ellipse(mouseX, mouseY, 100);
  fill(0, random(100, 255), random(100, 255));
  noStroke();
  triangle(boat.x1, boat.y1, boat.x1, boat.y1 + 137, boat.x1 + 86, boat.y1 + 98);
  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1, boat.y1, boat.x1, boat.y1 + 137, boat.x1 - 87, boat.y1 + 98);
  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1 - 210, boat.y1 + 42, boat.x1, boat.y1 + 137, boat.x1 - 124, boat.y1 + 208);
  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1 + 210, boat.y1 + 42, boat.x1, boat.y1 + 137, boat.x1 + 123, boat.y1 + 208);
  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1, boat.y1 + 137, boat.x1 - 124, boat.y1 + 208, boat.x1 + 123, boat.y1 + 208);
  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1 - 210, boat.y1 + 42, boat.x1 - 67, boat.y1 + 75, boat.x1 - 87, boat.y1 + 98);
  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1 + 210, boat.y1 + 42, boat.x1 + 86, boat.y1 + 98, boat.x1 + 66, boat.y1 + 75);
  boat.x1 = boat.x1 + 1;
  if (boat.x1 > width + 210) {
    boat.x1 = -210;
  }
waves.x2=-20;
  for(waves.x2=-20; waves.x2<width; waves.x2+=150){
    for(waves.y2=410; waves.y2<height; waves.y2+=50){
    noFill();
    stroke(0, 0, random(150, 255));
    strokeWeight(15);
    
    bezier(waves.x2, waves.y2, waves.x2 + 50, waves.y2 + 50, waves.x2 + 100, waves.y2 - 50, waves.x2 + 150, waves.y2);
    }
  }
      
 
  bezier(waves.x2, waves.y2, waves.x2 + 50, waves.y2 + 50, waves.x2 + 100, waves.y2 - 50, waves.x2 + 150, waves.y2);
  bezier(waves.x2, waves.y2 + 50, waves.x2 + 50, waves.y2 + 100, waves.x2 + 100, waves.y2, waves.x2 + 150, waves.y2 + 50);
  bezier(waves.x2, waves.y2 + 100, waves.x2 + 50, waves.y2 + 150, waves.x2 + 100, waves.y2 + 50, waves.x2 + 150, waves.y2 + 100);
  bezier(waves.x2, waves.y2 + 150, waves.x2 + 50, waves.y2 + 200, waves.x2 + 100, waves.y2 + 100, waves.x2 + 150, waves.y2 + 150);
  bezier(waves.x2 + 150, waves.y2, waves.x2 + 200, waves.y2 + 50, waves.x2 + 250, waves.y2 - 50, waves.x2 + 300, waves.y2);
  bezier(waves.x2 + 150, waves.y2 + 50, waves.x2 + 200, waves.y2 + 100, waves.x2 + 250, waves.y2, waves.x2 + 300, waves.y2 + 50);
  bezier(waves.x2 + 150, waves.y2 + 100, waves.x2 + 200, waves.y2 + 150, waves.x2 + 250, waves.y2 + 50, waves.x2 + 300, waves.y2 + 100);
  bezier(waves.x2 + 150, waves.y2 + 150, waves.x2 + 200, waves.y2 + 200, waves.x2 + 250, waves.y2 + 100, waves.x2 + 300, waves.y2 + 150);
  bezier(waves.x2 + 300, waves.y2, waves.x2 + 350, waves.y2 + 50, waves.x2 + 400, waves.y2 - 50, waves.x2 + 450, waves.y2);
  bezier(waves.x2 + 300, waves.y2 + 50, waves.x2 + 350, waves.y2 + 100, waves.x2 + 400, waves.y2, waves.x2 + 450, waves.y2 + 50);
  bezier(waves.x2 + 300, waves.y2 + 100, waves.x2 + 350, waves.y2 + 150, waves.x2 + 400, waves.y2 + 50, waves.x2 + 450, waves.y2 + 100);
  bezier(waves.x2 + 300, waves.y2 + 150, waves.x2 + 350, waves.y2 + 200, waves.x2 + 400, waves.y2 + 100, waves.x2 + 450, waves.y2 + 150);
  bezier(waves.x2 + 450, waves.y2, waves.x2 + 500, waves.y2 + 50, waves.x2 + 550, waves.y2 - 50, waves.x2 + 600, waves.y2);
  bezier(waves.x2 + 450, waves.y2 + 50, waves.x2 + 500, waves.y2 + 100, waves.x2 + 550, waves.y2, waves.x2 + 600, waves.y2 + 50);
  bezier(waves.x2 + 450, waves.y2 + 100, waves.x2 + 500, waves.y2 + 150, waves.x2 + 550, waves.y2 + 50, waves.x2 + 600, waves.y2 + 100);
  bezier(waves.x2 + 450, waves.y2 + 150, waves.x2 + 500, waves.y2 + 200, waves.x2 + 550, waves.y2 + 100, waves.x2 + 600, waves.y2 + 150);
  bezier(waves.x2 + 600, waves.y2, waves.x2 + 650, waves.y2 + 50, waves.x2 + 700, waves.y2 - 50, waves.x2 + 750, waves.y2);
  bezier(waves.x2 + 600, waves.y2 + 50, waves.x2 + 650, waves.y2 + 100, waves.x2 + 700, waves.y2, waves.x2 + 750, waves.y2 + 50);
  bezier(waves.x2 + 600, waves.y2 + 100, waves.x2 + 650, waves.y2 + 150, waves.x2 + 700, waves.y2 + 50, waves.x2 + 750, waves.y2 + 100);
  bezier(waves.x2 + 600, waves.y2 + 150, waves.x2 + 650, waves.y2 + 200, waves.x2 + 700, waves.y2 + 100, waves.x2 + 750, waves.y2 + 150);
  bezier(waves.x2 + 750, waves.y2, waves.x2 + 800, waves.y2 + 50, waves.x2 + 850, waves.y2 - 50, waves.x2 + 900, waves.y2);
  bezier(waves.x2 + 750, waves.y2 + 50, waves.x2 + 800, waves.y2 + 100, waves.x2 + 850, waves.y2, waves.x2 + 900, waves.y2 + 50);
  bezier(waves.x2 + 750, waves.y2 + 100, waves.x2 + 800, waves.y2 + 150, waves.x2 + 850, waves.y2 + 50, waves.x2 + 900, waves.y2 + 100);
  bezier(waves.x2 + 750, waves.y2 + 150, waves.x2 + 800, waves.y2 + 200, waves.x2 + 850, waves.y2 + 100, waves.x2 + 900, waves.y2 + 150);
}function setup() { 
  createCanvas(600, 600);
  
  background(0);
  
  fill(0,206,186);
  triangle (300,196,300,333,386,294);
  
  fill(color('#00bab1'));
  triangle(300,196,300,333,213,294);
  
  fill(color('#00a599'));
  triangle(90,238,300,333,176,404);
  
  fill(color('#03e0ca'));
  triangle(510,238,300,333,423,404);
  
  fill(color('#00bab1'));
  triangle(300,333,176,404,423,404);
  
  fill(color('#007f73'));
  triangle(90,238,232,271,213,293);
  
  fill(color('#007f73'));
  triangle(510,238,386,294,366,271);
} 
function setup() { 
  createCanvas(600, 600);
} 
function draw() { 
  background(0);
  noStroke();
  
  fill(#00ceba);
  triangle (300,196,300,333,386,294);
}function setup() { 
  createCanvas(600, 600);
} 
function draw() { 
  background(0);
  noStroke();
  
  fill(#00ceba);
  triangle (300,196,300,333,386,294);
}