var serial;
var portName = '/dev/cu.usbserial-15P22137';
var inData = 0;

function setup() {
  serial = new p5.SerialPort();
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName);
  createCanvas(400, 400);
}

function serialEvent() {
  inData = Number(serial.read());
  print("Got: " + inData);
}

function draw() {
  background(220);
  fill (255,0,0);
  ellipseMode(CENTER);
  if (inData == 1) {
    ellipse(50, height/2, 50, 50);
  } else if (inData == 2) {
    ellipse(150, height/2, 50, 50);
  } else if (inData == 3) {
    ellipse(250, height/2, 50, 50);
  } else if (inData == 4) {
    ellipse(350, height/2, 50, 50);
  }
}
var value = 0;

function draw() {
  fill(value);
  rect(25, 25, 50, 50);
}
function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    value = 255;
  } else if (keyCode == RIGHT_ARROW) {
    value = 0;
  }
}
let add = 0;
let bin = 16;
let minbin = 6;
let maxbin = 9;
let song1, song2, fft1, fft2, aveamp1, aveamp2, len1, len2;
let spectrum1 = [];
let spectrum2 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let diff;


function setup() {
  frameRate(20);
  createCanvas(1920, 1080);
  background(10);

  song1 = loadSound("opening_2left.mp3", loaded);
  song2 = loadSound("opening_2right.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()

  button = createButton('play');
  button.mousePressed(togglePlaying);

  jumpButton = createButton('jump');
  jumpButton.mousePressed(jumpSong);

  refresh = createButton('refresh');
  refresh.mousePressed(refreshed);
}

function loaded() {
  song1.play();
  song2.play();
  button.html('pause');
}

function draw() {
  background(50);

  //LEFT ELLIPSE
  aveamp1.setInput(song1, 0.9);
  level1 = aveamp1.getLevel();


  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  // loop through wave araay index
  for (n1 = 0; n1 < waves1.length; n1++) {

    // loop through each point in wave array index
    for (var i1 = minbin; i1 < maxbin; i1++) {
      var amp1 = (waves1[n1])[i1];

      // draw bin minbin to max bin
      if (i1 > minbin && i1 < maxbin) {
        x1 = map(amp1, 0, 255, 0, height * 3);
        y1 = 200;
        colcol = map(x1, 0, 1200, 0, 255);

        noStroke();
        fill(0, 5);
        ellipse((width / 2) - add, height / 2, x1 + random(-5, 5), x1 + random(-5, 5))
      }
    }
  }
  waves1.splice(0, 1);

  //RIGHT ELLIPSE
  aveamp2.setInput(song2, 0.9);
  level2 = aveamp2.getLevel();

  fft2.setInput(song2);
  spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  // loop through wave araay index
  for (n2 = 0; n2 < waves2.length; n2++) {

    // loop through each point in wave array index
    for (var i2 = minbin; i2 < maxbin; i2++) {
      var amp2 = (waves2[n2])[i2];

      // draw bin minbin to max bin
      if (i2 > minbin && i2 < maxbin) {
        x2 = map(amp2, 0, 255, 0, height * 3);
        y2 = 200;
        colcol = map(x2, 0, 1200, 0, 255);

        noStroke();
        fill(0, 5);
        ellipse((width / 2) + add, height / 2, x2 + random(-5, 5), x2 + random(-5, 5))
      }
    }
  }
  waves2.splice(0, 1);

  diff = level1 - level2;
  add = map(diff, -0.07, 0.08, 50, 100);
}


function jumpSong() {
  song1.jump(20.185);
  song2.jump(20.185);
  button.html('pause');
}

function togglePlaying() {
  if (!song1.isPlaying()) {
    song1.play();
    song2.play();
    button.html('pause');
  } else {
    song1.pause();
    song2.pause();
    button.html('play');
  }
}

function refreshed() {
  song1.jump(0);
  song2.jump(0);
  button.html('pause');
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (!song1.isPlaying()) {
      song1.play();
      song2.play();
      button.html('pause');
    } else {
      song1.pause();
      song2.pause();
      button.html('play');
    }
  }
}
let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let linemin;
let linemax;
let sizes = [1, 2];
let z;
let transLevel = 25;

function setup() {
  frameRate(20);
  createCanvas(1920, 1080);
  background(20);

  song1 = loadSound("opening_2left.mp3", loaded);
  song2 = loadSound("opening_2right.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  linemin = height / 2 + 200;
  linemax = height / 2 + 370;
  z = height / 2;
  mul = height / 50;

  button = createButton('play');
  button.mousePressed(togglePlaying);

  jumpButton = createButton('jump');
  jumpButton.mousePressed(jumpSong);

  refresh = createButton('refresh');
  refresh.mousePressed(refreshed);
}

function loaded() {
  song1.play();
  song2.play();
  button.html('pause');
}


function draw() {
  background(30, 38, 51);
  noFill();
  strokeWeight(2);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, transLevel);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 30; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = width / 12 + i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - width / 12 - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, transLevel);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 30; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = width / 12 + (i2 * mul)
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - width / 12 - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map(val0, -0.01, 0.02, 80, 100);
  sizes.push(size);
  x = lerp(sizes[0], sizes[1], 0.001);
  stroke(x);
  //ellipse (width/2, height/2,  z +random(-5,5),  z +random(-5,5));
  sizes.splice(0, 1);
}


function jumpSong() {
  song1.jump(20.185);
  song2.jump(20.185);
  button.html('pause');
}

function togglePlaying() {
  if (!song1.isPlaying()) {
    song1.play();
    song2.play();
    button.html('pause');
  } else {
    song1.pause();
    song2.pause();
    button.html('play');
  }
}

function refreshed() {
  song1.jump(0);
  song2.jump(0);
  button.html('pause');
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (!song1.isPlaying()) {
      song1.play();
      song2.play();
      button.html('pause');
    } else {
      song1.pause();
      song2.pause();
      button.html('play');
    }
  }
}let song;
let fft;
let spectrum = [];
let x1;
let y1;
let waves = [];
let bgcol;


function setup() {
  createCanvas(1920, 1080);
  frameRate(40);

  song = loadSound("prayer_2.mp3", loaded);
  fft = new p5.FFT(0.5, 512);
  amp = new p5.Amplitude()

  button = createButton('play');
  button.mousePressed(togglePlaying);

  jumpButton = createButton('jump');
  jumpButton.mousePressed(jumpSong);

  refresh = createButton('refresh');
  refresh.mousePressed(refreshed);

}

function loaded() {
   song.play();
  button.html('pause');
}

function draw() {
    fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  noFill();

  bgcol = map(level, 0, 0.3, 0, 255);

  if (bgcol > 150) {
    stroke(255, 70);
  } else {
    noStroke();
  }

  if (waves.length % 3 == 0) {
    background(bgcol, 0, 0, 10);
    // stroke(bgcol);
    // line (width/2,0,width/2,height);
    // noStroke();

    for (n = 0; n < waves.length; n = n + 3) {
      fill(255, 8);
      beginShape();
      for (let i = 2; i <= 30; i++) {
        if (i % 2 == 0) {
          x1 = (width / 2) + (((waves[n])[i]) - 200);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }

      for (let i = 30; i >= 0; i--) {
        if (i % 2 == 0) {

          x1 = (width / 2) - (((waves[n])[i]) - 200);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }
      endShape();
    }
  }
  if (waves.length > 3) {
    waves.splice(0, 3);
  }

  if (song.currentTime() > 34.65 || song.currentTime() < 1) {
    background(0);
  }
}


function jumpSong() {
  song.jump(25.6);
  button.html('pause');
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.jump(1);
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}

function refreshed() {
  song.jump(1);
  button.html('pause');
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (!song.isPlaying()) {
      song.jump(1);
      button.html('pause');
    } else {
      song.pause();
      button.html('play');
    }
  }
}
let waveL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let y1 = 200;
let y2 = 200;
let y3 = 200;
let x1 = 200;
let x2 = 200;
let x3 = 200;

function setup() {
  frameRate(40);
  createCanvas(1920, 1080);
  background(15);
  song1 = loadSound("opening_2left.mp3", loaded);
  song2 = loadSound("opening_2right.mp3", loaded);
  fft1 = new p5.FFT();
  fft2 = new p5.FFT();
  button = createButton('play');
  button.mousePressed(togglePlaying);

  jumpButton = createButton('jump');
  jumpButton.mousePressed(jumpSong);

  refresh = createButton('refresh');
  refresh.mousePressed(refreshed);

}

function loaded() {
  song1.play();
  song2.play();
  button.html('pause');
}

function draw() {
  fft1.setInput(song1);
  fft1.analyze();
  fft2.setInput(song2);
  fft2.analyze();

  lMidVal1 = fft1.getEnergy("lowMid");
  waveL.push(lMidVal1); // store as array left

  midVal1 = fft1.getEnergy("mid");
  midVal2 = fft2.getEnergy("mid");
  midVal3 = midVal1 + midVal2;
  waveM.push(midVal3); // store as array middle

  lMidVal2 = fft2.getEnergy("lowMid");
  waveR.push(lMidVal2) // store as array right


  for (i = 0; i < 9; i++) {
    noStroke();
    fill(255, 2);

    e1 = map(waveL[i], 0, 200, -300, 600);
    e2 = map(waveM[i], 0, 200, -300, 600);
    e3 = map(waveR[i], 0, 200, -300, 600);

    if (e1 > -100) { // don't draw the first few circles
      ellipse(width / 4, y1, e1, e1);
      // ellipse(x1, y1, e1, e1);

      ellipse(width / 4 * 2, y2, e2, e2);
      // ellipse(x2, y2, e2, e2);

      ellipse(width / 4 * 3, y3, e3, e3);
      // ellipse(x3, y3, e3, e3);
    }
  }

  if (waveL[i] < 70) {
    y1 = random(height);
    // x1 = random(0, width / 4);
    fill(0);
  }

  if (waveM[i] < 70) {
    y2 = random(height);
    // x2 = random(width / 4, width / 4 * 2);
    fill(0);
  }

  if (waveR[i] < 70) {
    y3 = random(height);
    // x3 = random(width / 4 * 2, width);
    fill(0);
  }

  waveL.splice(0, 1);
  waveM.splice(0, 1);
  waveR.splice(0, 1);

  // if don't present sound
  if (song1.currentTime() > 30.9 || song1.currentTime() < 1) {
    background(15);
  }
}

function jumpSong() {
  song1.jump(20.185);
  song2.jump(20.185);
  button.html('pause');
}

function togglePlaying() {
  if (!song1.isPlaying()) {
    song1.play();
    song2.play();
    button.html('pause');
  } else {
    song1.pause();
    song2.pause();
    button.html('play');
  }
}

function refreshed() {
  song1.jump(0);
  song2.jump(0);
  background(15);
  button.html('pause');
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (!song1.isPlaying()) {
      song1.play();
      song2.play();
      button.html('pause');
    } else {
      song1.pause();
      song2.pause();
      button.html('play');
    }
  }
}let spectrum;
let mic;
let song;
let fft;
let waves = [];
let px, py, sx, sy;
let mul;
let minband = 78;
let maxband = 150;

function setup() {
  createCanvas(1920, 1080);
  frameRate(20);

  song = loadSound("prayer_2.mp3", loaded);
  fft = new p5.FFT(0.9, 256);

  button = createButton('play');
  button.mousePressed(togglePlaying);

  jumpButton = createButton('jump');
  jumpButton.mousePressed(jumpSong);

  refresh = createButton('refresh');
  refresh.mousePressed(refreshed);

}

function loaded() {
  song.play();
  button.html('pause');
}


function draw() {
  background(0);
  fft.setInput(song);
  spectrum = fft.analyze();
  waves.push(spectrum);


  // value for big circle lMidVal
  lMidVal = (fft.getEnergy("lowMid"));

  // value for little circle newVal
  midVal = (fft.getEnergy("mid"));
  trebVal = (fft.getEnergy("treble"));
  newVal = (midVal + trebVal) / 2;

  bgcol = map(midVal, 100, 200, 30, 100);
  background(123, 143, 173, bgcol);
  noStroke();

  fillMul1 = map(newVal, 0, 150, 80, 300);
  fillMul2 = map(newVal, 0, 150, 0.3, 1.5);
  fill(fillMul1, fillMul2);

  mul = map(newVal, 50, 150, 8, 13);

  for (n = 0; n < waves.length; n++) {
    for (i = minband; i < maxband; i++) {
      px = (width / 2);
      mul = width / (maxband - minband)
      // py = ((i - minband) * mul);
      py = ((i - minband) * mul);
      sx = ((waves[n])[i]) * 2;
      sy = ((waves[n])[i]) * 2;
      ellipse(px + (n * mul) / 1.8, py + (n * (mul / waves.length)), sx, sy);
      ellipse(px - (n * mul) / 1.8, py - (n - (mul / waves.length)), sx, sy);

    }
  }
  if (waves.length > 20) {
    waves.splice(0, 1);
  }

}

function jumpSong() {
  song.jump(25.6);
  button.html('pause');
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.jump(1);
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}

function refreshed() {
  song.jump(1);
  button.html('pause');
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (!song.isPlaying()) {
      song.jump(1);
      button.html('pause');
    } else {
      song.pause();
      button.html('play');
    }
  }
}
let song;
let fft;
let spectrum = [];
let waves = [];
let add = 0; // add to bottom
let bin = 256;
let multi; // x axis gap
let band; // number of spectrum index to draw
let gap; // y axis gap


function setup() {
  createCanvas(1920, 1080);
  frameRate (22);
  background(40);
  gap = 7;
  band = 61;
  multi = width / 60;
  song = loadSound("prayer_2.mp3", loaded);
  fft = new p5.FFT(0.8, bin);
  amp = new p5.Amplitude()

  button = createButton('play');
  button.mousePressed(togglePlaying);

  jumpButton = createButton('jump');
  jumpButton.mousePressed(jumpSong);

  refresh = createButton('refresh');
  refresh.mousePressed(refreshed);

}

function loaded() {
    song.play();
  button.html('pause');
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);

  bgcol = map(level, 0.1, 0.3, 100, 150);
  background(bgcol, 80);

  noStroke();
  fill(0, 12);


  for (n = 0; n < waves.length; n = n + 3) {
    if (n % 3 == 0) {

      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height);
      curveVertex(0, height);
      for (i = 0; i < band; i++) {
        x = i * multi;
        y = ((height) + (n * -gap) - ((waves[n])[i]));
        curveVertex(x, y);
      }
      curveVertex(width, height);
      curveVertex(width, height);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(width, 0);
      curveVertex(width, 0);
      for (i = 0; i < band; i++) {
        x = width - (i * multi);
        y = (n * gap) + ((waves[n])[i]);
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    }
  }

  if (waves.length > 60) {
    waves.splice(0, 1);
  }

}

function jumpSong() {
  song.jump(25.6);
  button.html('pause');
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.jump(1);
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}

function refreshed() {
  song.jump(1);
  button.html('pause');
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (!song.isPlaying()) {
      song.jump(1);
      button.html('pause');
    } else {
      song.pause();
      button.html('play');
    }
  }
}
let spectrum;
let mic;
let song;
let fft;
let waves = [];
let px, py, sx, sy;
let mul;
let minband = 78;
let maxband = 150;

function setup() {
  createCanvas(1920, 1080);
  frameRate(20);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 256);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(40);
  fft.setInput(song);
  spectrum = fft.analyze();
  waves.push(spectrum);


  // value for big circle lMidVal
  lMidVal = (fft.getEnergy("lowMid"));

  // value for little circle newVal
  midVal = (fft.getEnergy("mid"));
  trebVal = (fft.getEnergy("treble"));
  newVal = (midVal + trebVal) / 2;

  bgcol = map (midVal,100,200,20,90);
  background(bgcol,50);
  noStroke();

  fillMul1 = map (newVal,0,150,50,255);
  fillMul2 = map (newVal,0,150,0.3,1);
  fill(fillMul1,fillMul2);




  mul = map (newVal,50,150,10,15);

  for (n = 0; n < waves.length; n++) {
    for (i = minband; i < maxband; i++) {
      px = (width / 2) ;
      mul = width / (maxband - minband)
      // py = ((i - minband) * mul);
      py = ((i - minband) * mul);
      sx = ((waves[n])[i])*2;
      sy = ((waves[n])[i])*2;
      ellipse(px+  (n*mul), py+(n*(mul/waves.length)), sx, sy);
      ellipse(px-  (n*mul), py-(n-(mul/waves.length)), sx, sy);

    }
  }
      if (waves.length > 20) {
      waves.splice(0, 1);
    }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}
let spectrum;
let mic;
let song;
let fft;
let waves = [];
let px, py, sx, sy;
let mul;
let minband = 78;
let maxband = 150;

function setup() {
  createCanvas(1920, 1080);
  frameRate(20);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 256);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(40);
  fft.setInput(song);
  spectrum = fft.analyze();
  waves.push(spectrum);


  // value for big circle lMidVal
  lMidVal = (fft.getEnergy("lowMid"));

  // value for little circle newVal
  midVal = (fft.getEnergy("mid"));
  trebVal = (fft.getEnergy("treble"));
  newVal = (midVal + trebVal) / 2;

  bgcol = map (midVal,100,200,20,90);
  background(bgcol,50);
  noStroke();

  fillMul1 = map (newVal,0,150,50,255);
  fillMul2 = map (newVal,0,150,0.3,1);
  fill(fillMul1,fillMul2);




  mul = map (newVal,50,150,10,15);

  for (n = 0; n < waves.length; n++) {
    for (i = minband; i < maxband; i++) {
      px = (width / 2) ;
      mul = width / (maxband - minband)
      // py = ((i - minband) * mul);
      py = ((i - minband) * mul);
      sx = ((waves[n])[i])*2;
      sy = ((waves[n])[i])*2;
      ellipse(px+  (n*mul), py+(n*(mul/waves.length)), sx, sy);
      ellipse(px-  (n*mul), py-(n-(mul/waves.length)), sx, sy);

    }
  }
      if (waves.length > 20) {
      waves.splice(0, 1);
    }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}
let spectrum;
let mic;
let song;
let fft;
let waves = [];
let px, py, sx, sy;
let mul;
let minband = 78;
let maxband = 150;

function setup() {
  createCanvas(1920, 1080);
  frameRate(20);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 256);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(50);
  fft.setInput(song);
  spectrum = fft.analyze();
  waves.push(spectrum);


  // value for big circle lMidVal
  lMidVal = (fft.getEnergy("lowMid"));

  // value for little circle newVal
  midVal = (fft.getEnergy("mid"));
  trebVal = (fft.getEnergy("treble"));
  newVal = (midVal + trebVal) / 2;
  
bgcol = map (midVal,100,200,20,70);
     background(bgcol,50);
  noStroke();
  
  fillMul1 = map (newVal,0,150,100,255);
  fillMul2 = map (newVal,0,150,0.5,1);
  fill(fillMul1,fillMul2);
  
  

  
  mul = map (newVal,50,150,10,15);

  for (n = 0; n < waves.length; n++) {
    for (i = minband; i < maxband; i++) {
      px = (width / 2) ;
      mul = width / (maxband - minband)
      // py = ((i - minband) * mul); 
      py = ((i - minband) * mul); 
      sx = ((waves[n])[i])*2;
      sy = ((waves[n])[i])*2;
      ellipse(px+  (n*mul), py+(n*(mul/waves.length)), sx, sy);
      ellipse(px-  (n*mul), py-(n-(mul/waves.length)), sx, sy);
      
    }
  }
      if (waves.length > 20) {
      waves.splice(0, 1);
    }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let spectrum;
let mic;
let song;
let fft;
let waves = [];
let px, py, sx, sy;
let mul;
let minband = 78;
let maxband = 150;

function setup() {
  createCanvas(1920, 1080);
  frameRate(20);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 256);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(50);
  fft.setInput(song);
  spectrum = fft.analyze();
  waves.push(spectrum);


  // value for big circle lMidVal
  lMidVal = (fft.getEnergy("lowMid"));

  // value for little circle newVal
  midVal = (fft.getEnergy("mid"));
  trebVal = (fft.getEnergy("treble"));
  newVal = (midVal + trebVal) / 2;
  
  noStroke();
  
    fillMul1 = map (newVal,0,150,100,255);
  fillMul2 = map (newVal,0,150,0.5,1);
  fill(fillMul1,fillMul2);
  
  mul = map (newVal,50,150,15,20);

  for (n = 0; n < waves.length; n++) {
    for (i = minband; i < maxband; i++) {
      px = (width / 2) ;
      mul = width / (maxband - minband)
      // py = ((i - minband) * mul); 
      py = ((i - minband) * mul); 
      sx = ((waves[n])[i])*2;
      sy = ((waves[n])[i])*2;
      ellipse(px+  (n*mul), py+(n*(mul/waves.length)), sx, sy);
      ellipse(px-  (n*mul), py-(n-(mul/waves.length)), sx, sy);
      
    }
  }
      if (waves.length > 20) {
      waves.splice(0, 1);
    }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let spectrum;
let mic;
let song;
let fft;
let waves = [];
let px, py, sx, sy;
let mul;
let minband = 78;
let maxband = 150;

function setup() {
  createCanvas(1920, 1080);
  frameRate(20);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 256);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(50);
  fft.setInput(song);
  spectrum = fft.analyze();
  waves.push(spectrum);


  // value for big circle lMidVal
  lMidVal = (fft.getEnergy("lowMid"));

  // value for little circle newVal
  midVal = (fft.getEnergy("mid"));
  trebVal = (fft.getEnergy("treble"));
  newVal = (midVal + trebVal) / 2;
  
  noStroke();
  
    fillMul = map (newVal,0,150,0,255);
  fill(fillMul,1);
  
  mul = map (newVal,50,150,15,20);

  for (n = 0; n < waves.length; n++) {
    for (i = minband; i < maxband; i++) {
      px = (width / 2) ;
      mul = width / (maxband - minband)
      // py = ((i - minband) * mul); 
      py = ((i - minband) * mul); 
      sx = ((waves[n])[i])*2;
      sy = ((waves[n])[i])*2;
      ellipse(px+  (n*mul), py+(n*(mul/waves.length)), sx, sy);
      ellipse(px-  (n*mul), py-(n-(mul/waves.length)), sx, sy);
      
    }
  }
      if (waves.length > 20) {
      waves.splice(0, 1);
    }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song, fft;
var mic;

function preload() {
  song = loadSound("prayer.mp3");
}


function setup() {
  createCanvas(800, 800);
  fft = new p5.FFT(0.9, 1024);
  song.play();
}

function draw() {
  background(0, 0, 0);
  fft.analyze();
  lMidVal = (fft.getEnergy("lowMid"));
  midVal = (fft.getEnergy("mid"));
  trebVal = (fft.getEnergy("treble"));

  newVal = (midVal + trebVal) / 2;

  noStroke();
  fill(32, 163, 158);
  ellipse(width / 2, height / 2, lMidVal * 2, lMidVal * 2);

  noStroke();
  fill(79, 0, 75);
  ellipse(width / 2, height / 2, newVal * 2, newVal * 2);


}let mic;
let song;
let fft;
let hValue;
let hValue1;

function setup() {
  createCanvas(1920, 400);
  frameRate(30);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.8, 256);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(220);
  stroke(0);
  fft.setInput(song);
  let spectrum = fft.analyze();




  // provide the highest value in the array at each point in time
  hValue = Math.max.apply(null, spectrum);

  // draw a circle where the band has the highest value
  // identify which band has the highest value


  // draw a circle

  line(0, (height / 2) - (hValue / 2), width, (height / 2) - (hValue / 2));
  line(0, (height / 2) + (hValue / 2), width, (height / 2) + (hValue / 2));

  // draw bands for every bin
  for (i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    rectMode(CENTER);
    rect(i * 10 + 10, height / 2, 5, spectrum[i]);
    textSize(5);
    text(i, i * 10 + 10, height);
    
     line(0, (height / 2) - (spectrum[71] /2), width, (height / 2) - (spectrum[71] /2));
     line(0, (height / 2) + (spectrum[71] /2), width, (height / 2) + (spectrum[71] /2));
  }

}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let mic;
let song;
let fft;
let hValue;
let hValue1;

function setup() {
  createCanvas(400, 400);
  frameRate(30);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.8, 512);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(220);
  stroke(0);
  fft.setInput(song);
  let spectrum = fft.analyze();


  // draw the first 40 bins
  for (var i = 0; i < 40; i++) {
    fill(255);
    rectMode(CENTER);
    // rect(i * 10 + 10, height / 2, 5, spectrum[i]);
    text(spectrum[i], i * 10 + 10, height);
  }

  // provide the highest value in the array at each point in time
  hValue = Math.max.apply(null, spectrum);

  // draw a circle where the band has the highest value
  // identify which band has the highest value


  // draw a circle

  line(0, (height / 2) - (hValue / 2), width, (height / 2) - (hValue / 2));
  line(0, (height / 2) + (hValue / 2), width, (height / 2) + (hValue / 2));

  // draw bands for every bin
  for (i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    rectMode(CENTER);
    rect(i * 10 + 10, height / 2, 5, spectrum[i]);
    text(spectrum[i], i * 10 + 10, height);
  }

  // find maximum value in array
  let maxi = spectrum[0];
  let maxIndex = 0;

  for (let n = 1; n < spectrum.length; n++) {
    if (spectrum[n] > maxi) {
      maxIndex = n;
      maxi = spectrum[n];
    }
  }
  
    // find minimum value in array
  let mini = spectrum[0];
  let minIndex = 0;

  for (let n = 1; n < spectrum.length; n++) {
    if (spectrum[n] < mini) {
      minIndex = n;
      mini = spectrum[n];
    }
  }

  fill(255, 0, 0);
  ellipse(maxIndex * 10 + 10, (height / 2) - (maxi / 2), 10, 10);
  ellipse(maxIndex * 10 + 10, (height / 2) + (maxi / 2), 10, 10);
  stroke(255, 0, 0);
  line(maxIndex * 10 + 10, (height / 2) - (maxi / 2), maxIndex * 10 + 10, (height / 2) + (maxi / 2))

  print(maxIndex, maxi);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];
let x1;


function setup() {
  createCanvas(600, 600);
  background(220);
  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.7, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(220);
  noFill();
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);

  line(width / 2, 0, width / 2, height);

  beginShape();
  curveVertex(width / 3, 0);
  curveVertex(width / 3, 0);

  x1 = map(level, 0, 0.3, width / 3, 0);
  curveVertex(x1, height / 2);

  curveVertex(width / 3, height);
  curveVertex(width / 3, height);
  endShape();

  beginShape();
  curveVertex(width / 3 * 2, 0);
  curveVertex(width / 3 * 2, 0);

  x1 = map(level, 0, 0.3, width / 3 * 2, width);
  curveVertex(x1, height / 2);

  curveVertex(width / 3 * 2, height);
  curveVertex(width / 3 * 2, height);
  endShape();

}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];
let add = 0; // add to bottom
let bin = 256;
let multi; // x axis gap
let band; // number of spectrum index to draw
let gap; // y axis gap


function setup() {
  createCanvas(1920, 1080);
  background(0);
  frameRate(40);
  gap = 9.5;
  band = 61;
  multi = width / 60;
  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.7, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);

  bgcol = map(level, 0.05, 0.3, 40, 200);
  background(bgcol, 60);

  noStroke();
  fill(60, 30);


  for (n = 0; n < waves.length; n = n + 2) {
    if (n % 2 == 0) {

      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height);
      curveVertex(0, height);
      for (i = 0; i < band; i++) {
        x = i * multi;
        y = ((height) + (n * -gap) - ((waves[n])[i]));
        curveVertex(x, y);
      }
      curveVertex(width, height);
      curveVertex(width, height);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(width, 0);
      curveVertex(width, 0);
      for (i = 0; i < band; i++) {
        x = width - (i * multi);
        y = (n * gap) + ((waves[n])[i]);
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    }

  }

  if (waves.length > 40) {
    waves.splice(0, 1);

  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}
let song;
let fft;
let spectrum = [];
let waves = [];
let add = 0; // add to bottom
let bin = 256;
let multi; // x axis gap
let band; // number of spectrum index to draw
let gap; // y axis gap


function setup() {
  createCanvas(1920, 1080);
  background(40);
  gap = 7;
  band = 61;
  multi = width / 60;
  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);

  bgcol = map(level, 0.1, 0.3, 100, 150);
  background(bgcol, 80);

  noStroke();
  fill(0, 12);


  for (n = 0; n < waves.length; n = n + 3) {
    if (n % 3 == 0) {

      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height);
      curveVertex(0, height);
      for (i = 0; i < band; i++) {
        x = i * multi;
        y = ((height) + (n * -gap) - ((waves[n])[i]));
        curveVertex(x, y);
      }
      curveVertex(width, height);
      curveVertex(width, height);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(width, 0);
      curveVertex(width, 0);
      for (i = 0; i < band; i++) {
        x = width - (i * multi);
        y = (n * gap) + ((waves[n])[i]);
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    }
  }

  if (waves.length > 60) {
    waves.splice(0, 1);
  }

}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}
let song;
let fft;
let spectrum = [];
let waves = [];
let add = 0; // add to bottom
let bin = 256;
let multi; // x axis gap
let band; // number of spectrum index to draw
let gap; // y axis gap


function setup() {
  createCanvas(1920, 1080);
  background(40);
  gap = 7;
  band = 61;
  multi = width / 60;
  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.5, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);

  bgcol = map(level, 0.05, 0.3, 40, 120);
  background(bgcol, 90);

  noStroke();
  fill(0, 8);


  for (n = 20; n < waves.length; n = n + 2) {
    if (n % 2 == 0) {

      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height);
      curveVertex(0, height);
      for (i = 0; i < band; i++) {
        x = i * multi;
        y = ((height) + (n * -gap) - ((waves[n])[i]));
        curveVertex(x, y);
      }
      curveVertex(width, height);
      curveVertex(width, height);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(width, 0);
      curveVertex(width, 0);
      for (i = 0; i < band; i++) {
        x = width - (i * multi);
        y = (n * gap) + ((waves[n])[i]);
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    }

  }

  if (waves.length > 40) {
    waves.splice(0, 1);

  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}
let song;
let fft;
let spectrum = [];
let waves = [];
let add = 0; // add to bottom
let bin = 256;
let multi; // x axis gap
let band; // number of spectrum index to draw
let gap; // y axis gap


function setup() {
  createCanvas(1920, 1080);
  background(40);
  frameRate(40);
  gap = 7;
  band = 61;
  multi = width / 60;
  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.8, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);

  bgcol = map(level, 0.05, 0.3, 40, 120);
  background(bgcol, 90);

  noStroke();
  fill(0, 10);


  for (n = 0; n < waves.length; n = n + 2) {
    if (n % 2 == 0) {

      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height);
      curveVertex(0, height);
      for (i = 0; i < band; i++) {
        x = i * multi;
        y = ((height) + (n * -gap) - ((waves[n])[i]));
        curveVertex(x, y);
      }
      curveVertex(width, height);
      curveVertex(width, height);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(width, 0);
      curveVertex(width, 0);
      for (i = 0; i < band; i++) {
        x = width - (i * multi);
        y = (n * gap) + ((waves[n])[i]);
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    }

  }

  if (waves.length > 60) {
    waves.splice(0, 1);

  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}
let song;
let fft;
let spectrum = [];
let waves = [];
let add = 0; // add to bottom
let bin = 256;
let multi; // x axis gap
let band; // number of spectrum index to draw
let gap; // y axis gap


function setup() {
  createCanvas(windowWidth, windowHeight);
  background (80);
  frameRate(20);
  gap = 5;
  band = 61;
  multi = windowWidth / 60;
  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
background (80);
  
  noStroke();
  fill (0,15);


  for (n = 0; n < waves.length; n = n + 3) {
    if (n % 3 == 0) {

      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height);
      curveVertex(0, height);
      for (i = 0; i < band; i++) {
        x = i * multi;
        y = ((height) + (n * -gap) - ((waves[n])[i]));
        curveVertex(x, y);
      }
      curveVertex(width, height);
      curveVertex(width, height);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(width, 0);
      curveVertex(width, 0);
      for (i = 0; i < band; i++) {
        x = width - (i * multi);
        y = (n * gap) + ((waves[n])[i]);
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    }
  }

  if (waves.length > 60) {
    waves.splice(0, 1);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];
let add = 0; // add to bottom
let bin = 256;
let multi; // x axis gap
let band; // number of spectrum index to draw
let gap; // y axis gap


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(20);
  gap = 5;
  band = 61;
  multi = windowWidth / 60;
  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(80);
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  // stroke(255, 80);
  // noFill();
  noStroke();
  fill (0,10);


  for (n = 0; n < waves.length; n = n + 3) {
    if (n % 3 == 0) {

      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height);
      curveVertex(0, height);
      for (i = 0; i < band; i++) {
        x = i * multi;
        y = ((height) + (n * -gap) - ((waves[n])[i]));
        curveVertex(x, y);
      }
      curveVertex(width, height);
      curveVertex(width, height);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(width, 0);
      curveVertex(width, 0);
      for (i = 0; i < band; i++) {
        x = width - (i * multi);
        y = (n * gap) + ((waves[n])[i]);
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    }
  }

  if (waves.length > 60) {
    waves.splice(0, 1);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];
let add = 0; // add to bottom
let bin = 256;
let multi; // x axis gap
let band; // number of spectrum index to draw
let gap; // y axis gap


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(20);
  gap = 5;
  band = 61;
  multi = windowWidth / 60;
  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(80);
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  // stroke(255, 80);
  // noFill();
  noStroke();
  fill (0,10);


  for (n = 0; n < waves.length; n = n + 3) {
    if (n % 3 == 0) {

      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height);
      curveVertex(0, height);
      for (i = 0; i < band; i++) {
        x = i * multi;
        y = ((height) + (n * -gap) - ((waves[n])[i]));
        curveVertex(x, y);
      }
      curveVertex(width, height);
      curveVertex(width, height);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(width, 0);
      curveVertex(width, 0);
      for (i = 0; i < band; i++) {
        x = width - (i * multi);
        y = (n * gap) + ((waves[n])[i]);
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    }
  }

  if (waves.length > 60) {
    waves.splice(0, 1);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];
let add = 120; // add to bottom
let bin = 256;
let multi = 3; // overlapping


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.8, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(50);
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  stroke(255,50);
  noFill();
  // noStroke();
  // fill(0, 20);

  for (n = 0; n < waves.length; n=n+2) {
    if (n % 2 == 0) {
 fill (0,20);
      // BOTTOM LEFT
      noStroke();
      beginShape();
      curveVertex(0, height / 2 + add);
      curveVertex(0, height / 2 + add);
      for (i = 0; i < 175; i++) {
        x = i * multi;
        y = ((height / 2) + (n * -4) - ((waves[n])[i])) + add;
        curveVertex(x, y);
      }
      curveVertex(175 * multi, height / 2 + add);
      curveVertex(175 * multi, height / 2 + add);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(spectrum.length * multi, 0);
      curveVertex(spectrum.length * multi, 0);
      for (i = 0; i < spectrum.length; i++) {
        x = spectrum.length * multi - (i * multi);
    
          y = (n * 4) + ((waves[n])[i]);
      
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    } else {
      //BOTTOM RIGHT
      beginShape();
      curveVertex(spectrum.length * multi, (height / 2) + add);
      curveVertex(spectrum.length * multi, (height / 2) + add);
      for (i = 0; i < spectrum.length; i++) {
        x = spectrum.length * multi - (i * multi);
 
          y = ((height / 2) + (n * -4) - ((waves[n])[i])) + add;
 
        curveVertex(x, y);
      }
      curveVertex(0, height / 2 + add);
      curveVertex(0, height / 2 + add);
      endShape();

      //TOP LEFT
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      for (i = 0; i < spectrum.length; i++) {
        x = i * multi;
    
          y = (n * 4) + ((waves[n])[i]);
 
        curveVertex(x, y);
      }
      curveVertex(spectrum.length * multi, 0);
      curveVertex(spectrum.length * multi, 0);
      endShape();
    }
  }

  if (waves.length > 30) {
    waves.splice(0, 1);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];
let add = 120; // add to bottom
let bin = 256;
let multi = 3; // overlapping


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.8, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(50);
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  stroke(255,50);
  noFill();
  // noStroke();
  // fill(0, 20);

  for (n = 0; n < waves.length; n=n+2) {
    if (n % 2 == 0) {
 fill (255,20);
      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height / 2 + add);
      curveVertex(0, height / 2 + add);
      for (i = 0; i < 180; i++) {
        x = i * multi;
        y = ((height / 2) + (n * -4) - ((waves[n])[i])) + add;
        curveVertex(x, y);
      }
      // curveVertex(spectrum.length * multi, height / 2 + add);
      // curveVertex(spectrum.length * multi, height / 2 + add);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(spectrum.length * multi, 0);
      curveVertex(spectrum.length * multi, 0);
      for (i = 0; i < spectrum.length; i++) {
        x = spectrum.length * multi - (i * multi);
    
          y = (n * 4) + ((waves[n])[i]);
      
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    } else {
      //BOTTOM RIGHT
      beginShape();
      curveVertex(spectrum.length * multi, (height / 2) + add);
      curveVertex(spectrum.length * multi, (height / 2) + add);
      for (i = 0; i < spectrum.length; i++) {
        x = spectrum.length * multi - (i * multi);
 
          y = ((height / 2) + (n * -4) - ((waves[n])[i])) + add;
 
        curveVertex(x, y);
      }
      curveVertex(0, height / 2 + add);
      curveVertex(0, height / 2 + add);
      endShape();

      //TOP LEFT
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      for (i = 0; i < spectrum.length; i++) {
        x = i * multi;
    
          y = (n * 4) + ((waves[n])[i]);
 
        curveVertex(x, y);
      }
      curveVertex(spectrum.length * multi, 0);
      curveVertex(spectrum.length * multi, 0);
      endShape();
    }
  }

  if (waves.length > 30) {
    waves.splice(0, 1);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];
let add = 300; // add to bottom
let bin = 256;
let multi = 3; // overlapping
let iVal = 180;
let gap = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.8, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(150);
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  noFill();
  // noStroke();
  // fill(0, 20);

  for (n = 0; n < waves.length; n++) {

    if (n == 19 || n == 20) {
      stroke(255);
    } else {
      strokeWeight(1);
      stroke(255, 85);
    }
    if (n % 2 == 0) {

      // BOTTOM LEFT
      beginShape();
      for (i = 0; i < iVal; i++) {
        x = i * multi;
        y = ((height / 2) + (n * -gap) - ((waves[n])[i])) + add;
        curveVertex(x, y);
      }
      endShape();

      //TOP RIGHT
      beginShape();
      for (i = 0; i < iVal; i++) {
        x = spectrum.length * multi - (i * multi);
        y = (n * gap) + ((waves[n])[i]);
        curveVertex(x, y);
      }
      endShape();

    } else {
      //BOTTOM RIGHT
      beginShape();
      for (i = 0; i < iVal; i++) {
        x = spectrum.length * multi - (i * multi);
        y = ((height / 2) + (n * -gap) - ((waves[n])[i])) + add;
        curveVertex(x, y);
      }
      endShape();

      //TOP LEFT
      beginShape();
      for (i = 0; i < iVal; i++) {
        x = i * multi;
        y = (n * gap) + ((waves[n])[i]);
        curveVertex(x, y);
      }
      endShape();
    }
  }

  if (waves.length > 20) {
    waves.splice(0, 1);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];
let add = 120; // add to bottom
let bin = 256;
let multi = 3; // overlapping


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.8, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(50);
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  stroke(255,50);
  noFill();
  // noStroke();
  // fill(0, 20);

  for (n = 0; n < waves.length; n=n+2) {
    if (n % 2 == 0) {

      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height / 2 + add);
      curveVertex(0, height / 2 + add);
      for (i = 0; i < spectrum.length; i++) {
        x = i * multi;
        y = ((height / 2) + (n * -4) - ((waves[n])[i])) + add;
        curveVertex(x, y);
      }
      curveVertex(spectrum.length * multi, height / 2 + add);
      curveVertex(spectrum.length * multi, height / 2 + add);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(spectrum.length * multi, 0);
      curveVertex(spectrum.length * multi, 0);
      for (i = 0; i < spectrum.length; i++) {
        x = spectrum.length * multi - (i * multi);
    
          y = (n * 4) + ((waves[n])[i]);
      
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    } else {
      //BOTTOM RIGHT
      beginShape();
      curveVertex(spectrum.length * multi, (height / 2) + add);
      curveVertex(spectrum.length * multi, (height / 2) + add);
      for (i = 0; i < spectrum.length; i++) {
        x = spectrum.length * multi - (i * multi);
 
          y = ((height / 2) + (n * -4) - ((waves[n])[i])) + add;
 
        curveVertex(x, y);
      }
      curveVertex(0, height / 2 + add);
      curveVertex(0, height / 2 + add);
      endShape();

      //TOP LEFT
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      for (i = 0; i < spectrum.length; i++) {
        x = i * multi;
    
          y = (n * 4) + ((waves[n])[i]);
 
        curveVertex(x, y);
      }
      curveVertex(spectrum.length * multi, 0);
      curveVertex(spectrum.length * multi, 0);
      endShape();
    }
  }

  if (waves.length > 30) {
    waves.splice(0, 1);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];
let add = 120; // add to bottom
let bin = 256;
let multi = 3; // overlapping


function setup() {
  createCanvas(bin * 3, 1024);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.8, bin);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(40);
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  // stroke(50);
  // noFill();
  noStroke();
  fill(0, 30);

  for (n = 0; n < waves.length; n = n + 5) {
    if (n % 10 == 0) {

      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height / 2 + add);
      curveVertex(0, height / 2 + add);
      for (i = 0; i < spectrum.length; i++) {
        x = i * multi;
        if (((waves[n])[i]) == 0) {
          y = height / 2 + add;
        } else {
          y = ((height / 2) + (n * -4) - ((waves[n])[i])) + add;
        }
        curveVertex(x, y);
      }
      curveVertex(spectrum.length * multi, height / 2 + add);
      curveVertex(spectrum.length * multi, height / 2 + add);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(spectrum.length * multi, 0);
      curveVertex(spectrum.length * multi, 0);
      for (i = 0; i < spectrum.length; i++) {
        x = spectrum.length * multi - (i * multi);
        if (((waves[n])[i]) == 0) {
          y = 0;
        } else {
          y = (n * 4) + ((waves[n])[i]);
        }
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    } else {
      //BOTTOM RIGHT
      beginShape();
      curveVertex(spectrum.length * multi, (height / 2) + add);
      curveVertex(spectrum.length * multi, (height / 2) + add);
      for (i = 0; i < spectrum.length; i++) {
        x = spectrum.length * multi - (i * multi);
        if (((waves[n])[i]) == 0) {
          y = height / 2 + add;
        } else {
          y = ((height / 2) + (n * -4) - ((waves[n])[i])) + add;
        }
        curveVertex(x, y);
      }
      curveVertex(0, height / 2 + add);
      curveVertex(0, height / 2 + add);
      endShape();

      //TOP LEFT
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      for (i = 0; i < spectrum.length; i++) {
        x = i * multi;
        if (((waves[n])[i]) == 0) {
          y = 0;
        } else {
          y = (n * 4) + ((waves[n])[i]);
        }
        curveVertex(x, y);
      }
      curveVertex(spectrum.length * multi, 0);
      curveVertex(spectrum.length * multi, 0);
      endShape();
    }
  }

  if (waves.length > 50) {
    waves.splice(0, 1);
  }
}



function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];


function setup() {
  createCanvas(1024, 1024);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.7, 256);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(60);

  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  noStroke();
  fill (255,20);

  for (n = 0; n < waves.length; n = n + 10) {
    if (n % 20 == 0) {
      
      beginShape();
      curveVertex(0, height / 2 + (10 * 20));
      curveVertex(0, height / 2 + (10 * 20));
      for (i = 0; i < spectrum.length; i++) {
        x = i * 2;
        y = (height / 2) + (n * 2) - ((waves[n])[i]);
        curveVertex(x, y);
      }
      
      curveVertex(spectrum.length*2, height / 2+ (10 * 20));
      curveVertex(spectrum.length*2, height / 2+ (10 * 20));
      endShape();
      
    } else {
      
      beginShape();
      curveVertex(spectrum.length * 2, (height / 2) + (10 * 20));
      curveVertex(spectrum.length * 2, (height / 2) + (10 * 20));
      
      for (i = 0; i < spectrum.length; i++) {
        x = spectrum.length * 2 - (i * 2);
        y = (height / 2) + (n * 2) - ((waves[n])[i]);
        curveVertex(x, y);
      }
      
      curveVertex(0, height / 2+ (10 * 20));
      curveVertex(0, height / 2+ (10 * 20));
      endShape();

    }


  }

  if (waves.length > 100) {
    waves.splice(0, 1);
  }

}



function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];


function setup() {
  createCanvas(1024, 1024);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.7, 256);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(60);

  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  
  fill (0,20);
  noStroke(0);

  for (n = 0; n < waves.length; n = n + 10) {
    if (n % 20 == 0) {
      beginShape();
      curveVertex(0, (height / 2) + (n * 2));
      curveVertex(0, (height / 2) + (n * 2));
      for (i = 0; i < spectrum.length; i++) {
        x = i * 2;
        y = (height / 2) + (n * 2) - ((waves[n])[i]);
        curveVertex(x, y);
      }
      endShape();
    } else {
      beginShape();
      curveVertex(spectrum.length * 2, (height / 2) + (n * 2));
      curveVertex(spectrum.length * 2, (height / 2) + (n * 2));
      for (i = 0; i < spectrum.length; i++) {
        x = spectrum.length * 2 - (i * 2);
        y = (height / 2) + (n * 2) - ((waves[n])[i]);
        curveVertex(x, y);
      }
      endShape();

    }


  }

  if (waves.length > 100) {
    waves.splice(0, 1);
  }

}



function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];


function setup() {
  createCanvas(1024, 1024);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 256);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(220);

  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  stroke(180);
  strokeWeight(1.5);

  for (i = 0; i < spectrum.length; i++) {
    line(i * 2, 255, i * 2, 255 - spectrum[i]);
    line((spectrum.length * 2 - i * 2), 275, (spectrum.length * 2 - i * 2) + 1, 275 - spectrum[i]);
        line(i * 2, 295, i * 2, 295 - spectrum[i]);
    line((spectrum.length * 2 - i * 2), 315, (spectrum.length * 2 - i * 2) + 1, 315 - spectrum[i]);
  }
}



function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let x1;
let y1;
let waves = [];
let bgcol;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.5, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  noFill();

  bgcol = map(level, 0, 0.3, 0, 255);

  if (bgcol > 150) {
    stroke(255, 70);
  } else {
    noStroke();
  }

  if (waves.length % 3 == 0) {
    background(bgcol, 0, 0, 10);
    // stroke(bgcol);
    // line (width/2,0,width/2,height);
    // noStroke();

    for (n = 0; n < waves.length; n = n + 3) {
      fill(255, 10);
      beginShape();
      for (let i = 2; i <= 30; i++) {
        if (i % 2 == 0) {
          x1 = (width / 2) + (((waves[n])[i]) - 200);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }

      for (let i = 30; i >= 0; i--) {
        if (i % 2 == 0) {

          x1 = (width / 2) - (((waves[n])[i]) - 200);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }
      endShape();
    }
  }
  if (waves.length > 3) {
    waves.splice(0, 3);
  }

  if ((waves[0])[0] == 0) {
    background(0);
  }
}



function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let x1;
let y1;
let waves = [];
let bgcol;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  noFill();

  bgcol = map(level, 0, 0.3, 0, 255);

  if (bgcol > 150) {
    stroke(255, 70);
  } else {
    noStroke();
  }

  if (waves.length % 3 == 0) {
    background(bgcol, 0, 0, 10);
    // stroke(bgcol);
    // line (width/2,0,width/2,height);
    // noStroke();

    for (n = 0; n < waves.length; n = n + 3) {
      fill(255, 10);
      beginShape();
      for (let i = 2; i <= 30; i++) {
        if (i % 2 == 0) {
          x1 = (width / 2) + (((waves[n])[i])/2 - 100);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }

      for (let i = 30; i >= 0; i--) {
        if (i % 2 == 0) {

          x1 = (width / 2) - (((waves[n])[i])/2 - 100);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }
      endShape();
    }
  }
  if (waves.length > 3) {
    waves.splice(0, 3);
  }

  if (frameCount < 60) {
    background(0);
  }
}



function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];
let amount;


function setup() {
  createCanvas(1920, 1080);
  frameRate(30);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);

  bgcol = map(spectrum[7], 100, 250, 0, 255);
  
  background(bgcol);
  amount = map(spectrum[7], 100, 250, -5000, 8000);
  gap = map(spectrum[7], 100, 250, 200, -30);


  // amount = map(level, 0.03, 0.3, 0, 2000);

  for (i = 0; i < amount; i++) {
    stroke(0, 30);
    strokeWeight(15);


    // point(random(0, width - gap) / 2, random(0, height));
    // point(random((width / 2) + gap, width), random(0, height));

    point(random(0, width), random(0, (height / 2) - gap));
    point(random(0, width), random(height, height / 2 + gap));
  }


  waves.splice(0, 1);

}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let waves = [];
let bgcol;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.5, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);

  bgcol = map(level, 0, 0.3, 0, 255);

  
  waves.splice(0,1);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let add = 0;
let bin = 16;
let minbin = 6;
let maxbin = 9;
let song1, song2, fft1, fft2, aveamp1, aveamp2, len1, len2;
let spectrum1 = [];
let spectrum2 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let diff;


function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  background(10);

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

}

function loaded() {
  song1.loop();
  song2.loop();
  len1 = song1.duration();
  song1.jump(len1 /5*4);
  len2 = song2.duration();
  song2.jump(len2 /5*4);
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(0);
  len2 = song2.duration();
  song2.jump(0);
}

function draw() {
    background(50);
  
  //LEFT ELLIPSE
aveamp1.setInput(song1, 0.9);
  level1 = aveamp1.getLevel();


  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);
  
  // loop through wave araay index
  for (n1 = 0; n1 < waves1.length; n1++) {
    
    // loop through each point in wave array index
    for (var i1 = minbin; i1 < maxbin; i1++) {
      var amp1 = (waves1[n1])[i1];
      
      // draw bin minbin to max bin
      if (i1 > minbin && i1 < maxbin) {
        x1 = map(amp1, 0, 255, 0, height*3);
        y1 = 200;
        colcol = map(x1, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)-add, height/2, x1 + random(-5,5), x1+ random(-5,5))
      }
    }
  }
  waves1.splice(0, 1);
  
  //RIGHT ELLIPSE
  aveamp2.setInput(song2, 0.9);
  level2 = aveamp2.getLevel();

  fft2.setInput(song2);
  spectrum2 = fft2.analyze();
  waves2.push(spectrum2);
  
  // loop through wave araay index
  for (n2 = 0; n2 < waves2.length; n2++) {
    
    // loop through each point in wave array index
    for (var i2 = minbin; i2 < maxbin; i2++) {
      var amp2 = (waves2[n2])[i2];
      
      // draw bin minbin to max bin
      if (i2 > minbin && i2 < maxbin) {
        x2 = map(amp2, 0, 255, 0, height*3);
        y2 = 200;
        colcol = map(x2, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)+add, height/2, x2 + random(-5,5), x2+ random(-5,5))
      }
    }
  }
  waves2.splice(0, 1);
  
  diff = level1 - level2;
  add = map (diff,-0.07,0.08, 0,100);
}let song;
let fft;
let spectrum = [];
let x1;
let y1;
let waves = [];
let bgcol;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.5, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  noFill();

  bgcol = map(level, 0, 0.25, 0, 255);

  if (bgcol > 150) {
    stroke(255, 70);
  } else {
    noStroke();
  }

  if (waves.length % 3 == 0) {
    background(bgcol, 0, 0, 10);
    // stroke(bgcol);
    // line (width/2,0,width/2,height);
    // noStroke();

    for (n = 0; n < waves.length; n = n + 3) {
      
      fill(255, 10);
      beginShape();
      for (let i = 2; i <= 30; i++) {
        if (i % 2 == 0) {
          y1 = (height / 2) + (((waves[n])[i]) - 200);
          x1 = (i * width / 16) - (height / 2.5);
          curveVertex(x1, y1);
        }
      }

      for (let i = 30; i >= 0; i--) {
        if (i % 2 == 0) {

          y1 = (height / 2) - (((waves[n])[i]) - 200);
          x1 = (i * width / 16) - (height / 2.5);
          curveVertex(x1, y1);
        }
      }
      
      endShape();
    }
  }
  if (waves.length > 3) {
    waves.splice(0, 3);
  }

  if (frameCount < 120) {
    background(0);
  }
}



function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let x1;
let y1;
let waves = [];
let bgcol;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.5, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  noFill();

  bgcol = map(level, 0, 0.3, 0, 255);

  if (bgcol > 150) {
    stroke(255, 70);
  } else {
    noStroke();
  }

  if (waves.length % 3 == 0) {
    background(bgcol, 0, 0, 10);
    // stroke(bgcol);
    // line (width/2,0,width/2,height);
    // noStroke();

    for (n = 0; n < waves.length; n = n + 3) {
      fill(255, 10);
      beginShape();
      for (let i = 2; i <= 30; i++) {
        if (i % 2 == 0) {
          x1 = (width / 2) + (((waves[n])[i]) - 200);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }

      for (let i = 30; i >= 0; i--) {
        if (i % 2 == 0) {

          x1 = (width / 2) - (((waves[n])[i]) - 200);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }
      endShape();
    }
  }
  if (waves.length > 3) {
    waves.splice(0, 3);
  }

  if (frameCount < 100) {
    background(0);
  }
}



function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let x, y;
let waves = [];
let col;

function setup() {
  createCanvas(windowWidth, windowHeight);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  let spectrum = fft.analyze();
  waves.push(spectrum);

  let level = amp.getLevel();
  bgcol = map(level, 0, 0.3, 0, 255);
  background(bgcol, 0, 0, 20);


  fill(255,10);
  noStroke();
  for (n = 0; n < waves.length; n = n + 4) {
    beginShape();
    for (i = 0; i <= 20; i++) {
      x = (((waves[n])[i] *2.2) / 1.5) ;
      y = (i * windowHeight/18) - windowHeight/18;
      curveVertex(x, y);
    }
    for (i = 20; i >= 0; i--) {
      x = ((((waves[n])[i]) *-2.2)  / 1.5) +width ;
      y = (i * windowHeight/18) - windowHeight/18;
      curveVertex(x, y);
    }
    endShape();
  }

  if (waves.length > 10) {
    waves.splice(0, 4);
  }
}


function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let x, y;
let waves = [];
let col;

function setup() {
  createCanvas(400, 400);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  let spectrum = fft.analyze();
  waves.push(spectrum);

  let level = amp.getLevel();
  bgcol = map(level, 0, 0.3, 0, 255);
  background(bgcol, 0, 0, 20);


  fill(255,20);
  noStroke();
  for (n = 0; n < waves.length; n = n + 4) {
    beginShape();
    for (i = 0; i <= 20; i++) {
      x = (((waves[n])[i]) ) + (width / 2);
      y = (i * 25) - 30;
      curveVertex(x, y);
    }
    for (i = 20; i >= 0; i--) {
      x = ((((waves[n])[i]) * -1) ) + (width / 2);
      y = (i * 25) - 30;
      curveVertex(x, y);
    }
    endShape();
  }

  if (waves.length > 20) {
    waves.splice(0, 4);
  }
}


function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let x, y;
let waves = [];
let col;

function setup() {
  createCanvas(400, 400);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  let spectrum = fft.analyze();
  waves.push(spectrum);

  let level = amp.getLevel();
  bgcol = map(level, 0, 0.3, 0, 255);
  background(bgcol, 0, 0, 20);


  fill(255,20);
  noStroke();
  for (n = 0; n < waves.length; n = n + 4) {
    beginShape();
    for (i = 0; i <= 20; i++) {
      x = (((waves[n])[i]) / 1.5) + (width / 2);
      y = (i * 25) - 30;
      curveVertex(x, y);
    }
    for (i = 20; i >= 0; i--) {
      x = ((((waves[n])[i]) * -1) / 1.5) + (width / 2);
      y = (i * 25) - 30;
      curveVertex(x, y);
    }
    endShape();
  }

  if (waves.length > 20) {
    waves.splice(0, 4);
  }
}


function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
 let fft;
 let x, y;

 function setup() {
   createCanvas(400, 400);
   frameRate(30);

   song = loadSound("prayer.mp3", loaded);
   fft = new p5.FFT(0.9, 512);

   button = createButton('pause');
   button.mousePressed(togglePlaying);
 }

 function loaded() {
   song.loop();
 }

 function draw() {
   background(220);
   fft.setInput(song);
   var spectrum = fft.analyze();

   //   line(width / 2, 0, width / 2, height);
   //   line(0, height / 2, width, height / 2);

   beginShape();
   for (n = 0; n < 20; n++) {
     // if (spectrum[20] < 140) {
     //   spectrum[20] = 140
     // }
     x = (width / 2) + (spectrum[n] / 1.5);
     y = (n * 10) + height / 4;
     curveVertex(x, y);

   }
   for (n = 20; n > 0; n--) {
     // if (spectrum[20] < 140) {
     //   spectrum[20] = 140
     // }
     x = (n * 10) + width / 4;
     y = (height / 2) + (spectrum[n] / 1.5)

     curveVertex(x, y);
   }
   for (n = 0; n < 20; n++) {
     // if (spectrum[20] < 140) {
     //   spectrum[20] = 140
     // }
     x = (width / 2) - (spectrum[n] / 1.5);
     let mapY = map(n, 0, 19, 19, 0);
     y = (mapY * 10) + height / 4;
     curveVertex(x, y);
   }
   for (n = 20; n > 0; n--) {
     if (spectrum[20] < 140) {
       spectrum[20] = 140
     }
     let mapX = map(n, 0, 19, 19, 0);
     x = (mapX * 10) + width / 4;
     y = (height / 2) - (spectrum[n] / 1.5);
     curveVertex(x, y);
   }
   for (n = 0; n < 20; n++) {
     // if (spectrum[20] < 140) {
     //   spectrum[20] = 140
     // }
     x = (width / 2) + (spectrum[n] / 1.5);
     y = (n * 10) + height / 4;
     curveVertex(x, y);
   }
   endShape();
 }


 function togglePlaying() {
   if (!song.isPlaying()) {
     song.loop();
     button.html('pause');
   } else {
     song.pause();
     button.html('play');
   }
 }let song;
let fft;
let x, y;
let x0, y0;
let minband = 7;
let maxband = 13;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 512);

  button = createButton('pause');
  button.mousePressed(togglePlaying);


}

function loaded() {
  song.loop();
}

function draw() {
  background(220);
  line(width / 2, 0, width / 2, height);
  line(0, height/2, width, height/2);

  fft.setInput(song);
  var spectrum = fft.analyze();

  beginShape();
  for (n = minband; n < maxband; n++) {
    x = (spectrum[n] / 4) +width/2;
    y = (n - minband-1) * (height/3);
    curveVertex(x, y);
  }


  endShape();


}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let sins = [];
let song;
let fft;
let x, y;
let x0, y0;

function setup() {
  createCanvas(800, 400);
  frameRate(30);
  for (i = -90; i < 270; i++) {
    strokeWeight(1);
    let sinVal = sin(radians(i));
    x0 = map(sinVal, -1, 1, width / 2, width);
    y0 = 90 + i;
    point(x0, y0);

    sins.push(x0);

  }

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 512);

  button = createButton('pause');
  button.mousePressed(togglePlaying);

}

function loaded() {
  song.loop();
}

function draw() {
  background(220);
  fft.setInput(song);
  var spectrum = fft.analyze();

  beginShape();
  for (n = 7; n <= 13; n++) {
    let addi = map(n, 7, 13, 0, 360);
    x = spectrum[n] + ((sins[addi]) / 3);
    y = (n-7)*10;
    if (x < width / 2) {
      x = width / 2
    }
    curveVertex(x, y);
  }

  for (n = 13; n >= 7; n--) {
    let addi = map(n, 7, 13, 0, 360);
    x = width - (spectrum[n] + ((sins[addi]) / 3));
    y = (n-13)*-10;
    if (x > width / 2) {
      x = width / 2
    }
    curveVertex(x, y);
  }
  endShape();
  
  
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let sins = [];
let song;
let fft;
let x, y;
let x0, y0;

function setup() {
  createCanvas(800, 400);
  frameRate(30);
  for (i = -90; i < 270; i++) {
    strokeWeight(1);
    let sinVal = sin(radians(i));
    x0 = map(sinVal, -1, 1, width / 2, width);
    y0 = 90 + i;
    point(x0, y0);

    sins.push(x0);

  }

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 512);

  button = createButton('pause');
  button.mousePressed(togglePlaying);

}

function loaded() {
  song.loop();
}

function draw() {
  background(220);
  fft.setInput(song);
  var spectrum = fft.analyze();

  beginShape();
  for (n = 7; n <= 13; n++) {
    let addi = map(n, 7, 13, 0, 360);
    x = spectrum[n] + ((sins[addi]) / 3);
    y = (n-7)*10;
    if (x < width / 2) {
      x = width / 2
    }
    curveVertex(x, y);
  }
  
  endShape();


  beginShape();
  for (n = 13; n >= 7; n--) {
    let addi = map(n, 7, 13, 0, 360);
    x = width - (spectrum[n] + ((sins[addi]) / 3));
    y = (n-13)*-10;
    if (x > width / 2) {
      x = width / 2
    }
    curveVertex(x, y);
  }
  endShape();
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let sins = [];
let song;
let fft;
let x, y;
let x0, y0;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
    for (i = -90; i < 270; i++) {
    strokeWeight(1);
    let sinVal = sin(radians(i));
    x0 = map(sinVal, -1, 1, width/2, width);
    y0 = 90 + i;
    point(x0, y0);
      
    sins.push(x0);
  }
  
  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.9, 512);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
  
}

function loaded() {
  song.loop();
}

function draw() {
  // background(220);
  fft.setInput(song);
  var spectrum = fft.analyze();

  beginShape();
  curveVertex(width / 2, 0);
  curveVertex(width / 2, 0);
  for (n = 6; n < 13; n++) {
    x = ((spectrum[n]) / 2) + (width / 2);
    y = (n - 6) * (height / 6);
    curveVertex(x, y);
  }
  curveVertex(width / 2, height);
  curveVertex(width / 2, height);
  endShape();


  // beginShape();
  // curveVertex(width / 2, 0);
  // curveVertex(width / 2, 0);
  // for (n = 6; n < 13; n++) {
  //   x = (width / 2)- ((spectrum[n]) / 2);
  //   y = (n - 6) * (height / 6);
  //   curveVertex(x, y);
  // }
  // curveVertex(width / 2, height);
  // curveVertex(width / 2, height);
  // endShape();
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let mic;
let song;
let fft;
let hValue;
let hValue1;

function setup() {
  createCanvas(3000, 400);
  frameRate(30);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.8, 64);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(220);
  stroke(0);
  fft.setInput(song);
  let spectrum = fft.analyze();


  // draw the first 40 bins
  for (let i = 0; i < 40; i++) {
    fill(255);
    rectMode(CENTER);
    // rect(i * 10 + 10, height / 2, 5, spectrum[i]);
  }

  // provide the highest value in the array at each point in time
  hValue = Math.max.apply(null, spectrum);

  // draw a circle where the band has the highest value
  // identify which band has the highest value


  // draw a circle

  line(0, (height / 2) - (hValue / 2), width, (height / 2) - (hValue / 2));
  line(0, (height / 2) + (hValue / 2), width, (height / 2) + (hValue / 2));

  // draw bands for every bin
  for (let i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    rectMode(CENTER);
    rect(i * 10 + 10, height / 2, 5, spectrum[i]);
    text(i, i * 10 + 10, height);
    
    if (i == 7 || i == 8 || i == 9) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    
  }

  let maxi = spectrum[0];
  let maxIndex = 0;

  for (let n = 1; n < spectrum.length; n++) {
    if (spectrum[n] > maxi) {
      maxIndex = n;
      maxi = spectrum[n];
    }
  }

  fill(255, 0, 0);
  ellipse(maxIndex * 10 + 10, (height / 2) - (maxi / 2), 10, 10);
  ellipse(maxIndex * 10 + 10, (height / 2) + (maxi / 2), 10, 10);
  stroke(255, 0, 0);
  line(maxIndex * 10 + 10, (height / 2) - (maxi / 2), maxIndex * 10 + 10, (height / 2) + (maxi / 2))

  print(maxIndex, maxi);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let mic;
let song;
let fft;
let spectrum = [];
let x1, y1, x2, y2;
let waves = [];
let bgcol;
let yVal;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.6, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);

}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  noFill();
  noStroke();

  bgcol = map(level, 0, 0.3, 0, 200);

  if (frameCount % 3 == 0) {
    background(bgcol, 0, 0, 20);

    for (n = 0; n < waves.length; n = n + 3) {
      fill(255, 15);

      beginShape();
      for (let i = 0; i <= 8; i++) {
        if (i % 2 == 0) {
          x1 = (width / 2) + (((waves[n])[i]) - 200);
          yVal = (i * windowHeight / 6);
          y1 = map(yVal, -261, 783, 0, height);
          curveVertex(x1, y1);
        }
      }

      for (let i = 8; i >= 0; i--) {
        if (i % 2 == 0) {
          x1 = (width / 2) - (((waves[n])[i]) - 200);
          yVal = (i * windowHeight / 6);
          y1 = map(yVal, -261, 783, 0, height);
              print (y1);
          curveVertex(x1, y1);
        }
      }
      endShape();
    }
  }
  waves.splice(0, 3);


  // start appearing after 120 frames
  if (frameCount < 120) {
    background(0);
  }
}



function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let song;
let fft;
let spectrum = [];
let x1;
let y1;
let waves = [];
let bgcol;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.6, 512);
  amp = new p5.Amplitude()

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);
  noFill();
  noStroke();

  bgcol = map(level, 0, 0.2, 0, 255);

  if (waves.length % 3 == 0) {
    background(bgcol, 0, 0, 10);
    // stroke(bgcol);
    // line (width/2,0,width/2,height);
    // noStroke();
    
    for (n = 0; n < waves.length; n = n + 3) {
      fill(255, 10);
      beginShape();
      for (let i = 2; i <= 30; i++) {
        if (i % 2 == 0) {
          x1 = (width / 2) + (((waves[n])[i]) - 200);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }

      for (let i = 30; i >= 0; i--) {
        if (i % 2 == 0) {
          
          x1 = (width / 2) - (((waves[n])[i]) - 200);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }
      endShape();
    }
  }
  if (waves.length > 3) {
    waves.splice(0, 3);
  }

  if (frameCount < 60) {
    background(0);
  }
}



function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let mic;
let song;
let fft;
let hValue;
let hValue1;

function setup() {
  createCanvas(400, 400);
  frameRate(30);

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.8, 512);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function loaded() {
  song.loop();
}

function draw() {
  background(220);
  stroke(0);
  fft.setInput(song);
  let spectrum = fft.analyze();


  // draw the first 40 bins
  for (var i = 0; i < 40; i++) {
    fill(255);
    rectMode(CENTER);
    // rect(i * 10 + 10, height / 2, 5, spectrum[i]);
    text(spectrum[i], i * 10 + 10, height);
  }

  // provide the highest value in the array at each point in time
  hValue = Math.max.apply(null, spectrum);

  // draw a circle where the band has the highest value
  // identify which band has the highest value


  // draw a circle

  line(0, (height / 2) - (hValue / 2), width, (height / 2) - (hValue / 2));
  line(0, (height / 2) + (hValue / 2), width, (height / 2) + (hValue / 2));

  // draw bands for every bin
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    rectMode(CENTER);
    rect(i * 10 + 10, height / 2, 5, spectrum[i]);
    text(spectrum[i], i * 10 + 10, height);
  }

  let maxi = spectrum[0];
  let maxIndex = 0;

  for (let n = 1; n < spectrum.length; n++) {
    if (spectrum[n] > maxi) {
      maxIndex = n;
      maxi = spectrum[n];
    }
  }

  fill(255, 0, 0);
  ellipse(maxIndex * 10 + 10, (height / 2) - (maxi / 2), 10, 10);
  ellipse(maxIndex * 10 + 10, (height / 2) + (maxi / 2), 10, 10);
  stroke(255, 0, 0);
  line(maxIndex * 10 + 10, (height / 2) - (maxi / 2), maxIndex * 10 + 10, (height / 2) + (maxi / 2))

  print(maxIndex, maxi);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var mic;
var song;
var fft;

function setup() {
  createCanvas(4000, 400);
  // load song and run loaded function when loaded

  // mic = new p5.AudioIn();
  // mic.start();

  song = loadSound("prayer.mp3", loaded);
  fft = new p5.FFT(0.8, 1024);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(220);
  fft.setInput(song);
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    stroke(0, 10);
    line(i, height/2, i, spectrum[i]);
    stroke(0);
    rectMode(CENTER);
    rect(i, height / 2, 1, spectrum[i]);
    // if (i == 20 ||i == 40 ||i == 60 ||i ==80 ||i == 100){
    // text (i,i*10 +10, height);
    // }
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let waveL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let y1 = 200;
let y2 = 200;
let y3 = 200;
let x1 = 200;
let x2 = 200;
let x3 = 200;

function setup() {
  frameRate(40);
  createCanvas(windowWidth, windowHeight);
  background(0);

  mic = new p5.AudioIn();
  mic.start();

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT();
  fft2 = new p5.FFT();
  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
}

function loaded() {
  // song1.loop();
  // song2.loop();
  // len1 = song1.duration();
  // song1.jump(len1 / 5 * 4);
  // len2 = song2.duration();
  // song2.jump(len2 / 5 * 4);
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(0);
  len2 = song2.duration();
  song2.jump(0);
}

function draw() {
  fft1.setInput(mic);
  fft1.analyze();
  fft2.setInput(mic);
  fft2.analyze();

  lMidVal1 = fft1.getEnergy("lowMid");
  waveL.push(lMidVal1); // store as array left

  midVal1 = fft1.getEnergy("mid");
  midVal2 = fft2.getEnergy("mid");
  midVal3 = midVal1 + midVal2;
  waveM.push(midVal3); // store as array middle

  lMidVal2 = fft2.getEnergy("lowMid");
  waveR.push(lMidVal2) // store as array right


  for (i = 0; i < 9; i++) {
    noStroke();
    fill(255, 2);

    e1 = map(waveL[i], 0, 200, -300, 600);
    e2 = map(waveM[i], 0, 200, -300, 600);
    e3 = map(waveR[i], 0, 200, -300, 600);

    if (e1 > -100) { // don't draw the first few circles
      ellipse(width / 4, y1, e1, e1);
      // ellipse(x1, y1, e1, e1);

      ellipse(width / 4 * 2, y2, e2, e2);
      // ellipse(x2, y2, e2, e2);

      ellipse(width / 4 * 3, y3, e3, e3);
      // ellipse(x3, y3, e3, e3);
    }
  }

  if (waveL[i] < 70) {
    y1 = random(height);
    // x1 = random(0, width / 4);
    fill(0);
  }

  if (waveM[i] < 70) {
    y2 = random(height);
    // x2 = random(width / 4, width / 4 * 2);
    fill(0);
  }

  if (waveR[i] < 70) {
    y3 = random(height);
    // x3 = random(width / 4 * 2, width);
    fill(0);
  }

  waveL.splice(0, 1);
  waveM.splice(0, 1);
  waveR.splice(0, 1);
  print(e2);
}var mic;
var song;
var fft;

function setup() {
  createCanvas(1020, 400);
  // load song and run loaded function when loaded
  
  // mic = new p5.AudioIn();
  // mic.start();
  
  song = loadSound("anna.mp3", loaded);
  fft = new p5.FFT(0.8, 32);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(220);
    fft.setInput(mic);
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++){
    var amp = spectrum[i];
    rectMode (CENTER);
     rect (i*30 + 30, height/2, 20, spectrum[i]);
    text (spectrum[i],i*30+ 30, height);
    }
  }

  function togglePlaying() {
    if (!song.isPlaying()) {
      song.loop();
      button.html('pause');
    } else {
      song.pause();
      button.html('play');
    }
  }let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let linemin;
let linemax;
let sizes = [1, 2];
let z;
let transLevel = 20;

function setup() {
  frameRate(20);
  createCanvas(windowWidth, windowHeight);
  background(20);

    mic = new p5.AudioIn();
  mic.start();
  
  song1 = loadSound("anna.mp3", loaded);
  song2 = loadSound("anna.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

  linemin = windowHeight / 2 + 100;
  linemax = windowHeight / 2 + 300;
  z = windowHeight / 2;
  mul = windowHeight / 50;
}

function loaded() {
  // song1.loop();
  // song2.loop();
  // len1 = song1.duration();
  // song1.jump(len1 /5*4);
  // len2 = song2.duration();
  // song2.jump(len2 /5*4);
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(0);
  len2 = song2.duration();
  song2.jump(0);
}

function draw() {
  background(30, 38, 51);
  noFill();
  strokeWeight(2);
  stroke(50);

  // top left line
  aveamp1.setInput(mic, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, transLevel);
  stroke(255, val1);

  fft1.setInput(mic);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 30; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = width / 12 + i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - width / 12 - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(mic, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, transLevel);
  stroke(255, val2);

  fft2.setInput(mic);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 30; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = width / 12 + (i2 * mul)
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - width / 12 - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map(val0, -0.01, 0.02, 80, 100);
  sizes.push(size);
  x = lerp(sizes[0], sizes[1], 0.001);
  stroke(x);
  //ellipse (width/2, height/2,  z +random(-5,5),  z +random(-5,5));
  sizes.splice(0, 1);
}//16 nov 18 20:05
//with nice sound scape and four buttons and four volume sliders and a master button and a master bpm slider
//to be done - arduino serail integration

// promises

// //shiffman
// const RECORDING = 0;
// const STOP_RECORDING = 1;
// const IDENTIFY_NOTE = 2;
// const INIT_SAMPLER = 3;

//file naming using array of predefined names or millis()/date and time stamp
//picking up the latest file using node server
//flexible resistance sensor
//visual feedback when pressing buttons
//done - stop getPitch
//done - use setTimeout to automate the process
//show note sung
//running sketch locally by downloading libraries
//arduin serial integration with state change code

var files = [];
var filename = "";
// var serial;
var latestData = "waiting for data";
let audioContext;
let mic;
let pitch;
let values = [];
let f=0;
var theNote = "";
var recorder, soundFile;
var state = 0;
var melodyScale = [];
var harmonyScale = [];
var synthScale = [];
var synth;
var sampler;
var sampler2;
var sampler3;
var sampler4;
var note1 = "";
var note1_5 = "";
var note2 = "";
var note3 = "";
var note3_5 = "";
var note2_12 = "";
// var buttonCstate = true;
// var buttonDstate = false;
// var buttonEstate = false;
// var buttonFstate = false;
// var buttonGstate = false;
// var buttonAstate = false;
// var buttonBstate = false;
var minArrayLength = 3;
var playButton;
var soundFile;

synth = new Tone.PolySynth({
  // "volume": -10,
  "envelope": {
    "attack": 1,
    "decay": 0,
    "sustain": 0.3,
    "release": 0,
    }
}).toMaster();

synth.set({"oscillator": {
          "type": "sine"
					}
});

Tone.Transport.bpm.value = 65;

melodyScale = ["G4"];
harmonyScale = ["D5"];
synthScale = ["C4", "D4", "E4", "G4", "A4"];

var melody = new Tone.Pattern(function(time, note){
  note1 = note;
  sampler.triggerAttackRelease(note, "2t", time, 1);
}, melodyScale, "random");

melody.loop = true;
melody.interval = "4t";

var harmony = new Tone.Pattern(function(time, note){
  note1_5 = note;
  sampler2.triggerAttackRelease(note, "2t", time, 1);
}, harmonyScale, "random");

harmony.loop = true;
harmony.interval = "4t";

var octave = new Tone.Pattern(function(time, note){
  var foctave = Tone.Frequency(note).transpose(-12);
  var doctave = Tone.Frequency(note).transpose(-24);
  note2 = note;
  sampler3.triggerAttackRelease(note2, "2n", time, 1);//0.2
  // note2 = foctave.toNote();
  // note2_12 = doctave.toNote();
  // sampler3.triggerAttackRelease(foctave, "2n", time, 1);
  // sampler2.triggerAttackRelease(doctave, "2n", time, 1);
}, synthScale, "randomOnce");

octave.loop = true;
octave.interval = "8t";

var chord = new Tone.Pattern(function(time, note){
  note3 = note;
  var bass = Tone.Frequency(note).transpose(-12);
  var fifth = Tone.Frequency(note).transpose(-5);
  note3_5 = fifth.toNote();
  var chordDuration = "2n";
  sampler4.triggerAttackRelease(bass, chordDuration, time, 1);//0.2sampler3.triggerAttackRelease(bass, chordDuration, time, 1);//0.2
  // sampler4.triggerAttackRelease(fifth, chordDuration, time, 0.7);//0.2
}, synthScale, "randomOnce");

chord.loop = true;
chord.interval = "1m";

function preload() {
  files = loadJSON("/getfiles");
}

function setup(){
  createCanvas(400,400);
  console.log(files);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();

  // serial = new p5.SerialPort();
  // serial.open("/dev/cu.usbmodem14201");
  // serial.on('data', gotData);

  mic.start(startPitch);
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  createP('keyPress to record', 20, 20);
  // Tone.Transport.start();
  // melody.start(0);
  // harmony.start(0);
  // octave.start(0);
  // chord.start(0);

  textSize(30);

  playButton = createButton('Master');
  playButton.position(330, 80+150);
  playButton.mousePressed(togglePlay);

  melodyButton = createButton("Melody");
  melodyButton.position(40, 80+150);
  melodyButton.mousePressed(toggleMelody);

  harmonyButton = createButton("Harmony");
  harmonyButton.position(40, 180+150);
  harmonyButton.mousePressed(toggleHarmony);

  octaveButton = createButton("Octave");
  octaveButton.position(40, 280+150);
  octaveButton.mousePressed(toggleOctave);

  chordButton = createButton("Chord");
  chordButton.position(40, 380+150);
  chordButton.mousePressed(toggleChord);

  buttonC = createButton("C");
  buttonC.position(40, 20+150);
  buttonC.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("C4");
    harmonyScale.splice(0,1);
    harmonyScale.push("G4");
  });

  buttonD = createButton("D");
  buttonD.position(90, 20+150);
  buttonD.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("D4");
    harmonyScale.splice(0,1);
    harmonyScale.push("A4");
  });

  buttonE = createButton("E");
  buttonE.position(140, 20+150);
  buttonE.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("E4");
    harmonyScale.splice(0,1);
    harmonyScale.push("B4");
  });

  buttonF = createButton("G");
  buttonF.position(190, 20+150);
  buttonF.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("G4");
    harmonyScale.splice(0,1);
    harmonyScale.push("D5");

  });

  buttonG = createButton("A");
  buttonG.position(240, 20+150);
  buttonG.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("A4");
    harmonyScale.splice(0,1);
    harmonyScale.push("E5");
  });

  buttonA = createButton("C");
  buttonA.position(290, 20+150);
  buttonA.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("C5");
    harmonyScale.splice(0,1);
    harmonyScale.push("G5");
  });

  buttonB = createButton("D");
  buttonB.position(340, 20+150);
  buttonB.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("D5");
    harmonyScale.splice(0,1);
    harmonyScale.push("A5");
  });

  buttonB = createButton("E");
  buttonB.position(140, 50+150);
  buttonB.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("E5");
    harmonyScale.splice(0,1);
    harmonyScale.push("B5");
  });

  buttonB = createButton("G");
  buttonB.position(190, 50+150);
  buttonB.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("G5");
    harmonyScale.splice(0,1);
    harmonyScale.push("D5");
  });

  buttonB = createButton("A");
  buttonB.position(240, 50+150);
  buttonB.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("A5");
    harmonyScale.splice(0,1);
    harmonyScale.push("E5");
  });

  buttonB = createButton("C");
  buttonB.position(290, 50+150);
  buttonB.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("C6");
    harmonyScale.splice(0,1);
    harmonyScale.push("G6");
  });

  buttonB = createButton("D");
  buttonB.position(340, 50+150);
  buttonB.mousePressed(function(){
    melodyScale.splice(0,1);
    melodyScale.push("D6");
    harmonyScale.splice(0,1);
    harmonyScale.push("A6");
  });

  bpmSlider = createSlider(30, 200, 50, 4);
  melodySlider = createSlider(-24, 2, -8, 1);
  harmonySlider = createSlider(-24, 2, -8, 1);
  octaveSlider = createSlider(-24, 2, -8, 1);
  chordSlider = createSlider(-24, 0, -8, 1);
}

// function gotData() {
//   var currentString = serial.readLine();  // read the incoming string
//   trim(currentString);                    // remove any trailing whitespace
//   if (!currentString) return;             // if the string is empty, do no more
//   latestData = int(currentString);            // save it for the draw method
//   console.log(latestData);             // println the string
// }

function startPitch() {
  pitch = ml5.pitchDetection('./model/', audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      select('#result').html(frequency);
      f = frequency;
    // } else {
    //   select('#result').html('No pitch detected');
    }
    // console.log("listening...");
    if(state<1){
      setTimeout(getPitch, 50);
    }
  })
}

function logValues(f){
  if(f > 0){
    values.push(f);
  }
  console.log(values);
}

function keyPressed() {
  // make sure user enabled the mic
  if (state===0 && mic.enabled) {
    // record to our p5.SoundFile
    // setTimeout(function(){
    recorder.record(soundFile);
    logValues(f);
    // createP('Recording!', 20, 20);
    console.log("RECORDING AND LISTENING");
    state++;
    stateManager();
  // },500);
  }
}

function stateManager(){
  setTimeout(stopRecording, 1000);
}

function stopRecording(){
  if (state === 1) {
    recorder.stop();
    mic.stop();
    // createP('Stopped', 20, 20);
    console.log("STOPPED RECORDING AND LISTENING")
    state++;
  }
  setTimeout(findNote,1000);
}

function findNote(){
  if (state === 2) {
    var temp = Tone.Frequency.ftom(values[0]);
    // console.log(JSON.stringify(temp,null,null));
    theNote = Tone.Frequency(temp, "midi").toNote();
    // console.log(theNote);
    soundFile.play(); // play the result!
    filename = Date.now()+'.wav';
    save(soundFile, filename);
    // createP('playing recording', 20, 20);
    console.log("RECORDING SAVED");
    state++;
  }
  setTimeout(feedNote,1000);
}

function feedNote(){
  if (state === 3) {
    // console.log(the note is ${theNote});
    // console.log("SAMPLER INITIALISED");
    sampler = new Tone.Sampler({
      // "D#3": "./fire.wav"
      [theNote]: "./"+filename
    });
    sampler.attack = 2;
    sampler.release = 5;

    sampler2 = new Tone.Sampler({
      // "D#3": "./fire.wav"
      [theNote]: "./"+filename
    });
    sampler2.attack = 2;
    sampler2.release = 5;

    sampler3 = new Tone.Sampler({
      // "D#3": "./fire.wav"
      [theNote]: "./"+filename
    });
    sampler3.attack = 1;
    sampler3.release = 1;

    sampler4 = new Tone.Sampler({
      // "D#3": "./fire.wav"
      [theNote]: "./"+filename
    });
    sampler4.attack = 2;
    sampler4.release = 2;

    sampler.volume.value = -8;
    sampler2.volume.value = -8
    sampler3.volume.value = -8;
    sampler4.volume.value = -8;
    synth.volume.value = -8;

    var chorus = new Tone.Chorus(4, 2.5, 0.1).toMaster();
    var freeverb = new Tone.Freeverb();
    freeverb.dampening.value = 1000;
    // var phaser = new Tone.Phaser({
    // 	"frequency" : 15,
    // 	"octaves" : 5,
    // 	"baseFrequency" : 1000
    // });

    var pingPong = new Tone.PingPongDelay("2n", 0.2);
    // sampler.toMaster();
    sampler.connect(pingPong).connect(freeverb).connect(chorus);
    sampler2.connect(pingPong).connect(freeverb).connect(chorus);
    sampler3.connect(pingPong).connect(freeverb).connect(chorus);
    sampler4.connect(pingPong).connect(freeverb).connect(chorus);

    console.log("READY TO PLAY");
    state++;
  }
}

function draw(){
  background(150);
  Tone.Transport.bpm.value = bpmSlider.value();
  if(state>3){
    sampler.volume.value = melodySlider.value();
    sampler2.volume.value = harmonySlider.value();
    sampler3.volume.value = octaveSlider.value();
    synth.volume.value = octaveSlider.value();
    sampler4.volume.value = chordSlider.value();
  }
  text(note1,120,100);
  text(note1_5,120,200);
  text(note2,120,300);
  // text(note2_12,220,300);
  text(note3,120,400);
  text(note3_5,220,400);

  // if(latestData==1){
  //   melody.stop();
  //   arpeggio.stop();
  //   chord.stop();
  // } else if(latestData==0){
  //   console.log("triggered");
  //   melody.start("2n");
  //   arpeggio.start("2n");
  //   chord.start("4n");
  // }

  // console.log(bpmValue.value());
  // synth.envelope.attack = map(mouseX, 0, height, 0,1);
  // synth.set.filter.Q = map(mouseY, 0, width, 0, 10);
}

function togglePlay(){
	if(Tone.Transport.state == "started"){
  	Tone.Transport.stop();
    playButton.html('Master');
  } else {
  	Tone.Transport.start();
    playButton.html('Stop');
  }
}

function toggleMelody(){
	if(melody.state == "started"){
  	melody.stop();
    melodyButton.html("Melody");
  } else {
  	melody.start("2n");
    melodyButton.html("Stop");
  }
}

function toggleHarmony(){
	if(harmony.state == "started"){
    harmony.stop();
    harmonyButton.html("Harmony");
  } else {
    harmony.start("2n");
    harmonyButton.html("Stop");
  }
}

function toggleOctave(){
	if(octave.state == "started"){
  	octave.stop();
    octaveButton.html("Octave");
  } else {
  	octave.start("2n");
    octaveButton.html("Stop");
  }
}

function toggleChord(){
	if(chord.state == "started"){
  	chord.stop();
    chordButton.html("Chord");
  } else {
  	chord.start("4n");
    chordButton.html("Stop");
  }
}const audioContext = new AudioContext();
// const MicStream = MicStream
const pitch = ml5.pitchDetection('./model/', audioContext , MicStream, modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

pitch.getPitch(function(err, frequency){
  console.log(frequency)
});// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
A game using pitch Detection with CREPE
=== */

// Pitch variables
let crepe;
const voiceLow = 100;
const voiceHigh = 500;
let audioStream;

// Circle variables
let circleSize = 42;
const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Text variables
let goalNote = 0;
let currentNote = '';
let currentText = '';
let textCoordinates;

function setup() {
  createCanvas(410, 320);
  textCoordinates = [width / 2, 30];
  gameReset();
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
}

function startPitch() {
  pitch = ml5.pitchDetection('./model/', audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      let midiNum = freqToMidi(frequency);
      currentNote = scale[midiNum % 12];
      select('#currentNote').html(currentNote);
    }
    getPitch();
  })
}

function draw() {
  background(240);
  // Goal Circle is Blue
  noStroke();
  fill(0, 0, 255);
  goalHeight = map(goalNote, 0, scale.length - 1, 0, height);
  ellipse(width / 2, goalHeight, circleSize, circleSize);
  fill(255);
  text(scale[goalNote], (width / 2) - 5, goalHeight + (circleSize / 6));
  // Current Pitch Circle is Pink
  if (currentNote) {
    currentHeight = map(scale.indexOf(currentNote), 0, scale.length - 1, 0, height);
    fill(255, 0, 255);
    ellipse(width / 2, currentHeight, circleSize, circleSize);
    fill(255);
    text(scale[scale.indexOf(currentNote)], (width / 2) - 5, currentHeight + (circleSize / 6));
    // If target is hit
    if (dist(width / 2, currentHeight, width / 2, goalHeight) < circleSize / 2) {
      hit(goalHeight, scale[goalNote]);
    }
  }
}

function gameReset() {
  // goalNote = round(random(0, scale.length - 1));
  // select('#target').html(scale[goalNote])
}

function hit(goalHeight, note) {
  noLoop();
  background(240);
  fill(138, 43, 226);
  ellipse(width / 2, goalHeight, circleSize, circleSize);
  fill(255);
  text(note, width / 2, goalHeight + (circleSize / 6));
  fill(50);
  select('#hit').html('Nice!')
  gameReset();
}let waveL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let y1 = 200;
let y2 = 200;
let y3 = 200;
let x1 = 200;
let x2 = 200;
let x3 = 200;

function setup() {
  frameRate(40);
  createCanvas(windowWidth, windowHeight);
  background(61, 51, 39);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT();
  fft2 = new p5.FFT();
  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
}

function loaded() {
  song1.loop();
  song2.loop();
  len1 = song1.duration();
  song1.jump(len1 /5*4);
  len2 = song2.duration();
  song2.jump(len2 /5*4);
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(0);
  len2 = song2.duration();
  song2.jump(0);
}
function draw() {
  fft1.setInput(song1);
  fft1.analyze();
  fft2.setInput(song2);
  fft2.analyze();

  lMidVal1 = fft1.getEnergy("lowMid");
  waveL.push(lMidVal1); // store as array left

  midVal1 = fft1.getEnergy("mid");
  midVal2 = fft2.getEnergy("mid");
  midVal3 = midVal1 + midVal2;
  waveM.push(midVal3); // store as array middle

  lMidVal2 = fft2.getEnergy("lowMid");
  waveR.push(lMidVal2) // store as array right


  for (i = 0; i < 9; i++) {
    noStroke();
    fill(255, 2);

    e1 = map(waveL[i], 0, 200, -300, 600);
    e2 = map(waveM[i], 0, 200, -300, 600);
    e3 = map(waveR[i], 0, 200, -300, 600);

    if (e1 > -100) { // don't draw the first few circles
      ellipse(width / 4, y1, e1, e1);
      // ellipse(x1, y1, e1, e1);

      ellipse(width / 4 * 2, y2, e2, e2);
      // ellipse(x2, y2, e2, e2);

      ellipse(width / 4 * 3, y3, e3, e3);
      // ellipse(x3, y3, e3, e3);
    }
  }

  if (waveL[i] < 70) {
    y1 = random(height);
    // x1 = random(0, width / 4);
    fill(0);
  }

  if (waveM[i] < 70) {
    y2 = random(height);
    // x2 = random(width / 4, width / 4 * 2);
    fill(0);
  }

  if (waveR[i] < 70) {
    y3 = random(height);
    // x3 = random(width / 4 * 2, width);
    fill(0);
  }

  waveL.splice(0, 1);
  waveM.splice(0, 1);
  waveR.splice(0, 1);
  print(e2);
}let waveL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let y1 = 200;
let y2 = 200;
let y3 = 200;
let x1 = 200;
let x2 = 200;
let x3 = 200;

function setup() {
  frameRate(40);
  createCanvas(windowWidth, windowHeight);
  background(0);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT();
  fft2 = new p5.FFT();
  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
}

function loaded() {
  song1.loop();
  song2.loop();
  len1 = song1.duration();
  song1.jump(len1 /5*4);
  len2 = song2.duration();
  song2.jump(len2 /5*4);
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(0);
  len2 = song2.duration();
  song2.jump(0);
}
function draw() {
  fft1.setInput(song1);
  fft1.analyze();
  fft2.setInput(song2);
  fft2.analyze();

  lMidVal1 = fft1.getEnergy("lowMid");
  waveL.push(lMidVal1); // store as array left

  midVal1 = fft1.getEnergy("mid");
  midVal2 = fft2.getEnergy("mid");
  midVal3 = midVal1 + midVal2;
  waveM.push(midVal3); // store as array middle

  lMidVal2 = fft2.getEnergy("lowMid");
  waveR.push(lMidVal2) // store as array right


  for (i = 0; i < 9; i++) {
    noStroke();
    fill(255, 2);

    e1 = map(waveL[i], 0, 200, -300, 600);
    e2 = map(waveM[i], 0, 200, -300, 600);
    e3 = map(waveR[i], 0, 200, -300, 600);

    if (e1 > -100) { // don't draw the first few circles
      ellipse(width / 4, y1, e1, e1);
      // ellipse(x1, y1, e1, e1);

      ellipse(width / 4 * 2, y2, e2, e2);
      // ellipse(x2, y2, e2, e2);

      ellipse(width / 4 * 3, y3, e3, e3);
      // ellipse(x3, y3, e3, e3);
    }
  }

  if (waveL[i] < 70) {
    y1 = random(height);
    // x1 = random(0, width / 4);
    fill(0);
  }

  if (waveM[i] < 70) {
    y2 = random(height);
    // x2 = random(width / 4, width / 4 * 2);
    fill(0);
  }

  if (waveR[i] < 70) {
    y3 = random(height);
    // x3 = random(width / 4 * 2, width);
    fill(0);
  }

  waveL.splice(0, 1);
  waveM.splice(0, 1);
  waveR.splice(0, 1);
  print(e2);
}let waveL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let m = 5; // multiply
let y1 = 200;
let y2 = 200;
let y3 = 200;
let x4 = 0; // plot graph
let y4 = 0; // plot graph

function setup() {
  
  frameRate(10);
  createCanvas(800, 800);
    background(0);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT();
  fft2 = new p5.FFT();
  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

  y = height / 2;

}

function loaded() {
  song1.loop();
  song2.loop();
}

function jumpSong() {
  var len1 = song1.duration();
  song1.jump(len1 / 5 * 4);
  var len2 = song2.duration();
  song2.jump(len2 / 5 * 4);
}

function draw() {
  fft1.setInput(song1);
  fft1.analyze();
  fft2.setInput(song2);
  fft2.analyze();

  lMidVal1 = fft1.getEnergy("lowMid");
  waveL.push(lMidVal1); // store as array left

  midVal1 = fft1.getEnergy("mid");
  midVal2 = fft2.getEnergy("mid");
  midVal3 = midVal1 + midVal2;
  waveM.push(midVal3); // store as array middle

  lMidVal2 = fft2.getEnergy("lowMid");
  waveR.push(lMidVal2) // store as array right

  for (i = 0; i < 9; i++) {
    noStroke();
    fill(255, 5);
    e1 = map(waveL[i], 0, 200, -300, 600);
    ellipse(width / 4, y1, e1, e1);

    e2 = map(waveM[i], 0, 200, -300, 600);
    ellipse(width / 4 * 2, y2, e2, e2);

    e3 = map(waveR[i], 0, 200, -300, 600);
    ellipse(width / 4 * 3, y3, e3, e3);
  }

  if (waveL[i] < 70) {
    y1 = random(height);
    fill(0);
  }

  //     if (e2 < 0) {
  //       y2 = random(height);
  //       fill(0);
  //     }

  //     if (e3 < 0) {
  //       y3 = random(height);
  //       fill(0);
  //     }

  waveL.splice(0, 1);
  waveM.splice(0, 1);
  waveR.splice(0, 1);

  strokeWeight(5);
  stroke(255);
  y4 = waveL[i];
  x4 = x4 + 1;
  point(x4, y4*10);
  print(x4);
}function setup() {
  createCanvas(800, 800);
      background(0);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, 1024);
  fft2 = new p5.FFT(0.9, 1024);
  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

}

function loaded() {
  song1.loop();
  song2.loop();
}

function jumpSong() {
  var len1 = song1.duration();
  song1.jump(len1 / 5 * 4);
  var len2 = song2.duration();
  song2.jump(len2 / 5 * 4);
}

function draw() {

  // LEFT SIDE 
  fft1.setInput(song1);
  fft1.analyze();

  lMidVal1 = (int)(fft1.getEnergy("lowMid"));
  midVal1 = (int)(fft1.getEnergy("mid"));
    hMidVal1 = (int)(fft1.getEnergy("highMid"));

  noFill();
  stroke (255,10);

  // fill(32, 163, 158);
  ellipse(width/4, height/2, lMidVal1 * 2, lMidVal1 * 2);

  // noStroke();
  // fill(135, 195, 143);
  // ellipse(200, width / 4*3, midVal1 * 2, midVal1 * 2);

  // RIGHT SIDE 
  fft2.setInput(song2);
  fft2.analyze();

  lMidVal2 = (int)(fft2.getEnergy("lowMid"));
  midVal2 = (int)(fft2.getEnergy("mid"));
    hMidVal2 = (int)(fft2.getEnergy("highMid"));

 
  // fill(32, 163, 158);
  ellipse(width/4*3, height/2, lMidVal2 * 2, lMidVal2 * 2);
  

  // fill(135, 195, 143);
  ellipse(width/4*2, height/2, (midVal1 + midVal2) * 2, (midVal1 +midVal2) *2);

  // noStroke();
  // fill(135, 195, 143);
  // ellipse(400, width / 4*3, midVal2 * 2, midVal2 * 2);

}let x = 0;
let y =0;
let z =10;

function setup() {
  createCanvas(400, 400);
  background(255,0,0);
    for (i = 0; i < 200; i++) {
    ellipse(200, 200, x,y);
    fill(50,z);
    noStroke();
    x=x+1
    y = y+1
  }
}

function draw() {
      z = z+1
}var pg;
function setup() {
  frameRate(1);
  createCanvas(420, 420); // nice
  background(0);
  pg = createGraphics(100,100);
  pg.background('rgba(0,0,0, 0)');
  pg.stroke(255);
  pg.ellipse(25, 25, 25, 25);
  pg.filter(BLUR, 10);
  pg.filter(DILATE);
  
  image(pg, 150, 75);
}

function draw() {
  background(Math.floor(random(0, 255)), Math.floor(random(0, 255)), Math.floor(random(0, 255)));
  image(pg, 150, 75);
}function setup() {
  createCanvas(600, 444);
  img = loadImage("http://crossorigin.me/http://dropshare.jamesstone.com/Three_Flags.jpg");  
}

function draw() {
  image(img, 0, 0);
  filter(BLUR, 3);
}
let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let linemin;
let linemax;
let sizes = [1, 2];
let z;
let transLevel = 20;

function setup() {
  frameRate(20);
  createCanvas(windowWidth, windowHeight);
  background(20);

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

  linemin = windowHeight / 2 + 100;
  linemax = windowHeight / 2 + 300;
  z = windowHeight / 2;
  mul = windowHeight / 50;
}

function loaded() {
  song1.loop();
  song2.loop();
  len1 = song1.duration();
  song1.jump(len1 /5*4);
  len2 = song2.duration();
  song2.jump(len2 /5*4);
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(0);
  len2 = song2.duration();
  song2.jump(0);
}

function draw() {
  background(30, 38, 51);
  noFill();
  strokeWeight(2);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, transLevel);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 30; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = width / 12 + i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - width / 12 - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, transLevel);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 30; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = width / 12 + (i2 * mul)
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - width / 12 - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map(val0, -0.01, 0.02, 80, 100);
  sizes.push(size);
  x = lerp(sizes[0], sizes[1], 0.001);
  stroke(x);
  //ellipse (width/2, height/2,  z +random(-5,5),  z +random(-5,5));
  sizes.splice(0, 1);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17,18,19,20];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17,18,19,20];
let linemin;
let linemax;
let sizes = [1,2];
let z;
let transLevel = 20;

function setup() {
  frameRate(20);
  createCanvas(windowWidth, windowHeight);
 background(20);
  
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
  
 linemin = windowHeight/3.5;
	linemax = windowHeight/2;
  z= windowHeight/2;
  mul = windowHeight /43;
}

function loaded() {
  song1.loop();
    var len1 = song1.duration();
  song1.jump(len1 / 5*4);

  song2.loop();
    var len2 = song2.duration();
  song2.jump(len2 / 5*4);
}

function jumpSong() {
  var len1 = song1.duration();
  song1.jump(len1 / 5*4);
  var len2 = song2.duration();
  song2.jump(len2 / 5*4);
}

function draw() {
 background(30, 38, 51);
  noFill();
  strokeWeight(1.5);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, transLevel);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 20; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = width/8 + i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - width/8 - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, transLevel);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 20; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = width/8 + i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - width/8 - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map (val0,-0.01,0.02,80,100);
  sizes.push(size);
  x = lerp (sizes[0],sizes[1],0.001);
  stroke(x);
  //ellipse (width/2, height/2,  z +random(-5,5),  z +random(-5,5));
  sizes.splice(0,1);
  print (x);
}let add = 0;
let bin = 16;
let minbin = 7;
let maxbin = 9;
let song1, song2, fft1, fft2, aveamp1, aveamp2, len1, len2;
let spectrum1 = [];
let spectrum2 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let diff;


function setup() {
  frameRate(10);
  createCanvas(windowWidth, windowHeight);
  background(10);

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

}

function loaded() {
  song1.loop();
  song2.loop();
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(len1 / 5 * 4);
  // len2 = song2.duration();
  // song2.jump(len2 / 5 * 4);
}

function draw() {
    background(50);
  
  //LEFT ELLIPSE
aveamp1.setInput(song1, 0.9);
  level1 = aveamp1.getLevel();


  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);
  
  // loop through wave araay index
  for (n1 = 0; n1 < waves1.length; n1++) {
    
    // loop through each point in wave array index
    for (var i1 = minbin; i1 < maxbin; i1++) {
      var amp1 = (waves1[n1])[i1];
      
      // draw bin minbin to max bin
      if (i1 > minbin && i1 < maxbin) {
        x1 = map(amp1, 0, 255, 0, height*3);
        y1 = 200;
        colcol = map(x1, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)-add, random (height), x1 + random(-5,5), x1+ random(-5,5))
      }
    }
  }
  waves1.splice(0, 1);
  
  //RIGHT ELLIPSE
  aveamp2.setInput(song2, 0.9);
  level2 = aveamp2.getLevel();

  fft2.setInput(song2);
  spectrum2 = fft2.analyze();
  waves2.push(spectrum2);
  
  // loop through wave araay index
  for (n2 = 0; n2 < waves2.length; n2++) {
    
    // loop through each point in wave array index
    for (var i2 = minbin; i2 < maxbin; i2++) {
      var amp2 = (waves2[n2])[i2];
      
      // draw bin minbin to max bin
      if (i2 > minbin && i2 < maxbin) {
        x2 = map(amp2, 0, 255, 0, height*3);
        y2 = 200;
        colcol = map(x2, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse(random (width), random (height), x2 + random(-5,5), x2+ random(-5,5))
      }
    }
  }
  waves2.splice(0, 1);
  
  diff = level1 - level2;
  add = map (diff,-0.07,0.08, 0,50);
}let add = 0;
let bin = 16;
let minbin = 6;
let maxbin = 9;
let song1, song2, fft1, fft2, aveamp1, aveamp2, len1, len2;
let spectrum1 = [];
let spectrum2 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let diff;


function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  background(10);

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

}

function loaded() {
  song1.loop();
  song2.loop();
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(len1 / 5 * 4);
  // len2 = song2.duration();
  // song2.jump(len2 / 5 * 4);
}

function draw() {
    background(50);
  
  //LEFT ELLIPSE
aveamp1.setInput(song1, 0.9);
  level1 = aveamp1.getLevel();


  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);
  
  // loop through wave araay index
  for (n1 = 0; n1 < waves1.length; n1++) {
    
    // loop through each point in wave array index
    for (var i1 = minbin; i1 < maxbin; i1++) {
      var amp1 = (waves1[n1])[i1];
      
      // draw bin minbin to max bin
      if (i1 > minbin && i1 < maxbin) {
        x1 = map(amp1, 0, 255, 0, height*3);
        y1 = 200;
        colcol = map(x1, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)-add, height/2, x1 + random(-5,5), x1+ random(-5,5))
      }
    }
  }
  waves1.splice(0, 1);
  
  //RIGHT ELLIPSE
  aveamp2.setInput(song2, 0.9);
  level2 = aveamp2.getLevel();

  fft2.setInput(song2);
  spectrum2 = fft2.analyze();
  waves2.push(spectrum2);
  
  // loop through wave araay index
  for (n2 = 0; n2 < waves2.length; n2++) {
    
    // loop through each point in wave array index
    for (var i2 = minbin; i2 < maxbin; i2++) {
      var amp2 = (waves2[n2])[i2];
      
      // draw bin minbin to max bin
      if (i2 > minbin && i2 < maxbin) {
        x2 = map(amp2, 0, 255, 0, height*3);
        y2 = 200;
        colcol = map(x2, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)+add, height/2, x2 + random(-5,5), x2+ random(-5,5))
      }
    }
  }
  waves2.splice(0, 1);
  
  diff = level1 - level2;
  add = map (diff,-0.07,0.08, 0,50);
}let add = 0;
let bin = 16;
let minbin = 6;
let maxbin = 9;
let song1, song2, fft1, fft2, aveamp1, aveamp2, len1, len2;
let spectrum1 = [];
let spectrum2 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let diff;


function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  background(10);

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

}

function loaded() {
  song1.loop();
  song2.loop();
  len1 = song1.duration();
  song1.jump(len1 /5*4);
  len2 = song2.duration();
  song2.jump(len2 /5*4);
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(0);
  len2 = song2.duration();
  song2.jump(0);
}

function draw() {
    background(50);
  
  //LEFT ELLIPSE
aveamp1.setInput(song1, 0.9);
  level1 = aveamp1.getLevel();


  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);
  
  // loop through wave araay index
  for (n1 = 0; n1 < waves1.length; n1++) {
    
    // loop through each point in wave array index
    for (var i1 = minbin; i1 < maxbin; i1++) {
      var amp1 = (waves1[n1])[i1];
      
      // draw bin minbin to max bin
      if (i1 > minbin && i1 < maxbin) {
        x1 = map(amp1, 0, 255, 0, height*3);
        y1 = 200;
        colcol = map(x1, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)-add, height/2, x1 + random(-5,5), x1+ random(-5,5))
      }
    }
  }
  waves1.splice(0, 1);
  
  //RIGHT ELLIPSE
  aveamp2.setInput(song2, 0.9);
  level2 = aveamp2.getLevel();

  fft2.setInput(song2);
  spectrum2 = fft2.analyze();
  waves2.push(spectrum2);
  
  // loop through wave araay index
  for (n2 = 0; n2 < waves2.length; n2++) {
    
    // loop through each point in wave array index
    for (var i2 = minbin; i2 < maxbin; i2++) {
      var amp2 = (waves2[n2])[i2];
      
      // draw bin minbin to max bin
      if (i2 > minbin && i2 < maxbin) {
        x2 = map(amp2, 0, 255, 0, height*3);
        y2 = 200;
        colcol = map(x2, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)+add, height/2, x2 + random(-5,5), x2+ random(-5,5))
      }
    }
  }
  waves2.splice(0, 1);
  
  diff = level1 - level2;
  add = map (diff,-0.07,0.08, 0,50);
}let add = 0;
let bin = 32;
let minbin = 6;
let maxbin = 9;
let song1, song2, fft1, fft2, aveamp1, aveamp2, len1, len2;
let spectrum1 = [];
let spectrum2 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let diff;


function setup() {
  frameRate();
  createCanvas(windowWidth, windowHeight);
  background(10);

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

}

function loaded() {
  song1.loop();
  song2.loop();
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(len1 / 5 * 4);
  // len2 = song2.duration();
  // song2.jump(len2 / 5 * 4);
}

function draw() {
    background(50);
  
  //LEFT ELLIPSE
aveamp1.setInput(song1, 0.9);
  level1 = aveamp1.getLevel();


  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);
  
  // loop through wave araay index
  for (n1 = 0; n1 < waves1.length; n1++) {
    
    // loop through each point in wave array index
    for (var i1 = minbin; i1 < maxbin; i1++) {
      var amp1 = (waves1[n1])[i1];
      
      // draw bin minbin to max bin
      if (i1 > minbin && i1 < maxbin) {
        x1 = map(amp1, 0, 255, height/2, height*3);
        y1 = 200;
        colcol = map(x1, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)-add, height/2, x1 + random(-5,5), x1+ random(-5,5))
      }
    }
  }
  waves1.splice(0, 1);
  
  //RIGHT ELLIPSE
  aveamp2.setInput(song2, 0.9);
  level2 = aveamp2.getLevel();

  fft2.setInput(song2);
  spectrum2 = fft2.analyze();
  waves2.push(spectrum2);
  
  // loop through wave araay index
  for (n2 = 0; n2 < waves2.length; n2++) {
    
    // loop through each point in wave array index
    for (var i2 = minbin; i2 < maxbin; i2++) {
      var amp2 = (waves2[n2])[i2];
      
      // draw bin minbin to max bin
      if (i2 > minbin && i2 < maxbin) {
        x2 = map(amp2, 0, 255, height/2, height*3);
        y2 = 200;
        colcol = map(x2, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)+add, height/2, x2 + random(-5,5), x2+ random(-5,5))
      }
    }
  }
  waves2.splice(0, 1);
  
  diff = level1 - level2;
  add = map (diff,-0.07,0.08, 0,150);
}let add = 0;
let bin = 32;
let minbin = 6;
let maxbin = 9;
let song1, song2, fft1, fft2, aveamp1, aveamp2, len1, len2;
let spectrum1 = [];
let spectrum2 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let diff;


function setup() {
  frameRate(15);
  createCanvas(windowWidth, windowHeight);
  background(20);

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.5, bin);
  fft2 = new p5.FFT(0.5, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

}

function loaded() {
  song1.loop();
  song2.loop();
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(len1 / 5 * 4);
  // len2 = song2.duration();
  // song2.jump(len2 / 5 * 4);
}

function draw() {
    background(60);
  
  //LEFT ELLIPSE
aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();


  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);
  
  // loop through wave araay index
  for (n1 = 0; n1 < waves1.length; n1++) {
    
    // loop through each point in wave array index
    for (var i1 = minbin; i1 < maxbin; i1++) {
      var amp1 = (waves1[n1])[i1];
      
      // draw bin minbin to max bin
      if (i1 > minbin && i1 < maxbin) {
        x1 = map(amp1, 0, 255, height/2, height*3);
        y1 = 200;
        colcol = map(x1, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)-add, height/2, x1 + random(-5,5), x1+ random(-5,5))
      }
    }
  }
  waves1.splice(0, 1);
  
  //RIGHT ELLIPSE
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();

  fft2.setInput(song2);
  spectrum2 = fft2.analyze();
  waves2.push(spectrum2);
  
  // loop through wave araay index
  for (n2 = 0; n2 < waves2.length; n2++) {
    
    // loop through each point in wave array index
    for (var i2 = minbin; i2 < maxbin; i2++) {
      var amp2 = (waves2[n2])[i2];
      
      // draw bin minbin to max bin
      if (i2 > minbin && i2 < maxbin) {
        x2 = map(amp2, 0, 255, height/2, height*3);
        y2 = 200;
        colcol = map(x2, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)+add, height/2, x2 + random(-5,5), x2+ random(-5,5))
      }
    }
  }
  waves2.splice(0, 1);
  
  diff = level1 - level2;
  add = map (diff,-0.08,0.08, 0,100);
  print (add);
}let add = 0;
let bin = 32;
let minbin = 6;
let maxbin = 9;
let song1, song2, fft1, fft2, aveamp1, aveamp2, len1, len2;
let spectrum1 = [];
let spectrum2 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let diff;


function setup() {
  frameRate(15);
  createCanvas(windowWidth, windowHeight);
  background(20);

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.5, bin);
  fft2 = new p5.FFT(0.5, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

}

function loaded() {
  song1.loop();
  song2.loop();
}

function jumpSong() {
  len1 = song1.duration();
  song1.jump(len1 / 5 * 4);
  // len2 = song2.duration();
  // song2.jump(len2 / 5 * 4);
}

function draw() {
    background(60);
  
  //LEFT ELLIPSE
aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();


  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);
  
  // loop through wave araay index
  for (n1 = 0; n1 < waves1.length; n1++) {
    
    // loop through each point in wave array index
    for (var i1 = minbin; i1 < maxbin; i1++) {
      var amp1 = (waves1[n1])[i1];
      
      // draw bin minbin to max bin
      if (i1 > minbin && i1 < maxbin) {
        x1 = map(amp1, 0, 255, height/2, height*3);
        y1 = 200;
        colcol = map(x1, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)-add, height/2, x1 + random(-5,5), x1+ random(-5,5))
      }
    }
  }
  waves1.splice(0, 1);
  
  //RIGHT ELLIPSE
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();

  fft2.setInput(song2);
  spectrum2 = fft2.analyze();
  waves2.push(spectrum2);
  
  // loop through wave araay index
  for (n2 = 0; n2 < waves2.length; n2++) {
    
    // loop through each point in wave array index
    for (var i2 = minbin; i2 < maxbin; i2++) {
      var amp2 = (waves2[n2])[i2];
      
      // draw bin minbin to max bin
      if (i2 > minbin && i2 < maxbin) {
        x2 = map(amp2, 0, 255, height/2, height*3);
        y2 = 200;
        colcol = map(x2, 0, 1200, 0, 255);
        
        noStroke();
        fill (0,5);
        ellipse((width/2)+add, height/2, x2 + random(-5,5), x2+ random(-5,5))
      }
    }
  }
  waves2.splice(0, 1);
  
  diff = level1 - level2;
  add = map (diff,-0.08,0.08, 0,100);
  print (add);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let linemin;
let linemax;
let sizes = [1, 2];
let z;
let transLevel = 30;

function setup() {
  frameRate();
  createCanvas(800, 800);
  background(20);

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

  linemin = 60;
  linemax = windowWidth / 3 * 1;
  z = windowWidth / 2;
  mul = windowWidth / 43;
}

function loaded() {
  song1.loop();
  var len1 = song1.duration();
  song1.jump(len1 / 5 * 4);

  song2.loop();
  var len2 = song2.duration();
  song2.jump(len2 / 5 * 4);
}

function jumpSong() {
  var len1 = song1.duration();
  song1.jump(len1 / 5 * 4);
  var len2 = song2.duration();
  song2.jump(len2 / 5 * 4);
}

function draw() {
  colorMode(RGB);
  background(30, 38, 51);
  noFill();
  strokeWeight(1);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, transLevel);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);


  for (n1 = 0; n1 < 20; n1++) {
    // beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      // curveVertex(x1, y1);
      if (i1 >6 && i1 <9) {
        noStroke()
        x1 = map(amp1, 0, 255, 0, 1200);
        y1 = 200;
        colcol = map(x1, 0, 1200, 0, 255);
        fill(100, colcol, colcol,10);
        // fill((map = val1, 0, transLevel, 0, 255), 255 / 2, 255 / 2);
        ellipse(200, 200, x1, x1)
      }
    }
    // endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      colorMode(RGB)
      stroke(255, val1);
      noFill();
      var amp3 = (waves1[n1])[i3];
      if (i3 == 8) {
        ellipse(x3, y3, 50, 50);
      }

      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - width / 8 - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, transLevel);
  fill(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 20; n2++) {
    // beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      ellipse(x2, y2, 30, 30);
      // curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = width / 8 + i2 * mul
    }
    // endShape();

    // beginShape();

    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      noStroke();
      ellipse(width / 4 * 3, y4, x4, x4);
      // curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, 0, 200);
      // x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = 400;
    }
    // endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map(val0, -0.01, 0.02, 80, 100);
  sizes.push(size);
  x = lerp(sizes[0], sizes[1], 0.001);
  stroke(x);
  //ellipse (width/2, height/2,  z +random(-5,5),  z +random(-5,5));
  sizes.splice(0, 1);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let linemin;
let linemax;
let sizes = [1, 2];
let z;
let transLevel = 40;

function setup() {
  frameRate();
  createCanvas(800, 800);
  background(20);

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

  linemin = windowHeight / 4;
  linemax = windowHeight / 4 * 7;
  z = windowHeight / 2;
  mul = windowHeight /8;
}

function loaded() {
  song1.loop();
  // var len1 = song1.duration();
  // song1.jump(len1 / 5 * 4);

  song2.loop();
  // var len2 = song2.duration();
  // song2.jump(len2 / 5 * 4);
}

function jumpSong() {
  var len1 = song1.duration();
  song1.jump(len1 / 5 * 4);
  var len2 = song2.duration();
  song2.jump(len2 / 5 * 4);
}

function draw() {
  background(30, 38, 51);
  noFill();
  strokeWeight(1);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, transLevel);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 20; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 10; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      if (x1 > 400) {
        x1 = 0;
      }
      y1 = width / 8 + i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 10; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      if (x3 > 400) {
        x3 = 0;
      }
      y3 = height - width / 8 - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, transLevel);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 20; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 10; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      if (x2 < width - 400) {
        x2 = width;
      }
      y2 = width / 8 + i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 10; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
         if (x4 < width -400) {
      x4 = width;
      }
      y4 = height - width / 8 - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map(val0, -0.01, 0.02, 80, 100);
  sizes.push(size);
  x = lerp(sizes[0], sizes[1], 0.001);
  stroke(255, 0, 0, x);
  rectMode(CENTER);
  //rect (width/2, height/2,  z +random(-5,5),  z +random(-5,5));
  sizes.splice(0, 1);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 64;
let mul;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let linemin;
let linemax;
let sizes = [1, 2];
let z;
let transLevel = 30;

function setup() {
  frameRate();
  createCanvas(windowHeight, windowHeight);
  background(20);

  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);

  linemin = windowHeight / 4;
  linemax = windowHeight / 4 * 7;
  z = windowHeight / 2;
  mul = windowHeight / 30;
}

function loaded() {
  song1.loop();
  // var len1 = song1.duration();
  // song1.jump(len1 / 5 * 4);

  song2.loop();
  // var len2 = song2.duration();
  // song2.jump(len2 / 5 * 4);
}

function jumpSong() {
  var len1 = song1.duration();
  song1.jump(len1 / 5 * 4);
  var len2 = song2.duration();
  song2.jump(len2 / 5 * 4);
}

function draw() {
  background(30, 38, 51);
  noFill();
  strokeWeight(1);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, transLevel);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 10; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 30; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      if (x1 > 400) {
        x1 = 0;
      }
      y1 = width / 8 + i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 30; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      if (x3 > 400) {
        x3 = 0;
      }
      y3 = height - width / 8 - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, transLevel);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 10; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 30; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      if (x2 < width - 400) {
        x2 = width;
      }
      y2 = width / 8 + i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 30; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
         if (x4 < width -400) {
      x4 = width;
      }
      y4 = height - width / 8 - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map(val0, -0.01, 0.02, 80, 100);
  sizes.push(size);
  x = lerp(sizes[0], sizes[1], 0.001);
  stroke(255, 0, 0, x);
  rectMode(CENTER);
  //rect (width/2, height/2,  z +random(-5,5),  z +random(-5,5));
  sizes.splice(0, 1);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17,18,19,20];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17,18,19,20];
let linemin;
let linemax;
let sizes = [1,2];
let z;
let transLevel = 20;

function setup() {
  frameRate(20);
  createCanvas(windowHeight, windowHeight);
 background(20);
  
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
  
 linemin = windowHeight/3.5;
	linemax = windowHeight/2;
  z= windowHeight/2;
  mul = windowHeight /43;
}

function loaded() {
  song1.loop();
    var len1 = song1.duration();
  song1.jump(len1 / 5*4);

  song2.loop();
    var len2 = song2.duration();
  song2.jump(len2 / 5*4);
}

function jumpSong() {
  var len1 = song1.duration();
  song1.jump(len1 / 5*4);
  var len2 = song2.duration();
  song2.jump(len2 / 5*4);
}

function draw() {
 background(30, 38, 51);
  noFill();
  strokeWeight(1);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, transLevel);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 20; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = width/8 + i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - width/8 - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, transLevel);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 20; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = width/8 + i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - width/8 - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map (val0,-0.01,0.02,80,100);
  sizes.push(size);
  x = lerp (sizes[0],sizes[1],0.001);
  stroke(x);
  //ellipse (width/2, height/2,  z +random(-5,5),  z +random(-5,5));
  sizes.splice(0,1);
  print (x);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17,18,19,20];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17,18,19,20];
let linemin;
let linemax;
let sizes = [1,2];
let z;
let transLevel = 30;

function setup() {
  frameRate(20);
  createCanvas(windowHeight, windowHeight);
 background(20);
  
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
  
 linemin = 60;
	linemax = windowHeight/3*1;
  z= windowHeight/2;
  mul = windowHeight /43;
}

function loaded() {
  song1.loop();
    var len1 = song1.duration();
  song1.jump(len1 / 5*4);

  song2.loop();
    var len2 = song2.duration();
  song2.jump(len2 / 5*4);
}

function jumpSong() {
  var len1 = song1.duration();
  song1.jump(len1 / 5*4);
  var len2 = song2.duration();
  song2.jump(len2 / 5*4);
}

function draw() {
 background(30, 38, 51);
  noFill();
  strokeWeight(1);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, transLevel);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 20; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = width/8 + i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - width/8 - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, transLevel);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 20; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = width/8 + i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - width/8 - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map (val0,-0.01,0.02,80,100);
  sizes.push(size);
  x = lerp (sizes[0],sizes[1],0.001);
  stroke(x);
  //ellipse (width/2, height/2,  z +random(-5,5),  z +random(-5,5));
  sizes.splice(0,1);
  print (x);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul = 20;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17,18,19,20];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17,18,19,20];
let linemin;
let linemax;
let sizes = [1,2];
let z=300;

function setup() {
  frameRate();
  createCanvas(windowHeight, windowHeight);
 background(20);
  
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
  
 linemin = 0;
	linemax = windowHeight/3*1;
}

function loaded() {
  song1.loop();
  song2.loop();
}

function jumpSong() {
  var len1 = song1.duration();
  song1.jump(len1 / 5*4);
  var len2 = song2.duration();
  song2.jump(len2 / 5*4);
}

function draw() {
 background(20);
  noFill();
  strokeWeight(1.5);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, 80);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 20; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, 80);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 20; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map (val0,-0.01,0.02,80,120);
  sizes.push(size);
  x = lerp (sizes[0],sizes[1],0.001);
  stroke(x);
  ellipse (width/2, height/2,  z +random(-15,15),  z +random(-15,15));
  sizes.splice(0,1);
  print (x);
}let colH1, colH2, colS1, colS2, colB;

let x1, y1, x2, y2;
let song1, song2;
let fft1, fft2;
let aveamp1, aveamp2;
let bin = 32;
let mul = 20;

function setup() {
  frameRate(20);
  createCanvas(255 * 2, 255 * 2);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
}

function loaded() {
  song1.loop();
  song2.loop();
}

function draw() {
  background(20);
  noFill();
  // left line
  aveamp1.setInput(song1);
  var level1 = aveamp1.getLevel();
  colS1 = map(level1, 0, 0.04, 0, 255 / 2);

  fft1.setInput(song1);
  var spectrum1 = fft1.analyze();
  for (var i1 = 0; i1 < bin; i1++) {
    var amp1 = spectrum1[i1];
    

  }


  // right line
  aveamp2.setInput(song2);
  var level2 = aveamp2.getLevel();

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  for (var i2 = 0; i2 < bin; i2++) {
    var amp2 = spectrum2[i2];
  }
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul = 20;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let linemin = 80;
let linemax = 160;
let sizes = [1,2];

function setup() {
  frameRate();
  createCanvas(560, 560);
  background(255, 0, 0);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
}

function loaded() {
  song1.loop();
  song2.loop();
}

function jumpSong() {
  var len1 = song1.duration();
  song1.jump(len1 / 3*2);
  var len2 = song2.duration();
  song2.jump(len2 / 3*2);
}

function draw() {
  background(20);
  noFill();
  strokeWeight(1.5);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, 80);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 10; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, 80);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 10; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map (val0,-0.01,0.02,200,250);
  sizes.push(size);
  stroke (255);
  x = lerp (sizes[0],sizes[1],0.001);
  ellipse (width/2, height/2, x, x);
  sizes.splice(0,1);
  print (x);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul = 20;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let linemin = 80;
let linemax = 160;
let sizes = [1,2];

function setup() {
  frameRate();
  createCanvas(560, 560);
  background(255, 0, 0);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
}

function loaded() {
  song1.loop();
  song2.loop();
}

function jumpSong() {
  var len1 = song1.duration();
  song1.jump(len1 / 3*2);
  var len2 = song2.duration();
  song2.jump(len2 / 3*2);
}

function draw() {
  background(20);
  noFill();
  strokeWeight(1.5);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, 80);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 10; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, 80);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 10; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map (val0,-0.01,0.02,200,250);
  sizes.push(size);
  stroke (255);
  x = lerp (sizes[0],sizes[1],0.001);
  ellipse (width/2, height/2, x, x);
  sizes.splice(0,1);
  print (x);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul = 20;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let linemin = 100;
let linemax = 160;

function setup() {
  frameRate(20);
  createCanvas(560, 560);
  background(255, 0, 0);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
}

function loaded() {
  song1.loop();
  song2.loop();
}

function jumpSong() {
  var len = song.duration();
  song.jump(len /4*3);
}

function draw() {
  background(val0);
  noFill();
  strokeWeight(1.5);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0.9);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, 80);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 10; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0.9);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, 80);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 10; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2) * 1000;
  print(val0);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level0;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul = 20;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let linemin = 100;
let linemax = 160;

function setup() {
  frameRate(20);
  createCanvas(560, 560);
  background (255,0,0);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp0 = new p5.Amplitude()
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
 val0 = 10
}

function loaded() {
  song1.loop();
  song2.loop();
}

function draw() {
  background(val0);
  noFill();
  strokeWeight(1.5);
  stroke(50);

  // top left line
  aveamp1.setInput(song1,0.9);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, 80);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 10; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2,0.9);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, 80);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 10; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1-level2)*1000;
  print (val0);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level0;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul = 20;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let linemin = 100;
let linemax = 160;

function setup() {
  frameRate(20);
  createCanvas(560, 560);
  background (255,0,0);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp0 = new p5.Amplitude()
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
 val0 = 10
}

function loaded() {
  song1.loop();
  song2.loop();
}

function draw() {
  background(val0);
  noFill();
  strokeWeight(1.5);
  stroke(50);

  // top left line
  aveamp1.setInput(song1,0.9);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, 80);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 10; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2,0.9);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, 80);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 10; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1-level2)*1000;
  print (val0);
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp1, aveamp2;
let bin = 16;
let mul = 20;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let linemin = 100;
let linemax = 160;

function setup() {
  frameRate(20);
  createCanvas(560, 560);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
}

function loaded() {
  song1.loop();
  song2.loop();
}

function draw() {
  background(30);
  noFill();
  strokeWeight(1.5);
  stroke (50);
  line (width/2 + random(0,2), 0, width/2+ random(0,2), height);

  // top left line
  aveamp1.setInput(song1);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, 80);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 10; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, 80);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 10; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
}let waves = [[0],[1],[2],[3]];

function setup() {
  createCanvas(400, 400);
    print ((waves[0])[0]);
}

function draw() {
  background(220);
}let x, y;
let song;
let fft;
let bin = 32;
let mul = 20;
let waves = [1,2,3,4,5,6,7,8,9];
let spectrum = [];

function setup() {
  frameRate(20);
  createCanvas(500, 500);
  song = loadSound("openingLeft.mp3", loaded);
  fft = new p5.FFT(0.9, bin);
}

function loaded() {
  song.loop();
}


function draw() {
  background(20);
  noFill();
  stroke(255);
  strokeWeight(2)

  fft.setInput(song);
  spectrum = fft.analyze();
  waves.push(spectrum);

  //wave 1

  for (n=0; n <10;n++) {
  beginShape();
  for (var i = 0; i < bin; i++) {
    let amp = (waves[n])[i];
    curveVertex(x, y);
    x = amp;
    y = i * mul;
  }
  endShape();
  }
  print (waves.length);
  waves.splice(0, 1);
}let x, y;
let song;
let fft;
let bin = 32;
let mul = 20;
let waves = [];
let spectrum = [];

function setup() {
  frameRate();
  createCanvas(500, 500);
  song = loadSound("openingLeft.mp3", loaded);
  fft = new p5.FFT(0.9, bin);
}

function loaded() {
  song.loop();
}

function draw() {
  background(20);
  noFill();
  stroke(255);
  strokeWeight(2)

  fft.setInput(song);

  spectrum = fft.analyze();
  
  for (n=0;n<2;n++) {
  waves.push(spectrum);
  }
  noLoop();
  
  beginShape();
  for (i = 0; i < waves.length; i++) {
    let amp = spectrum[i];
    curveVertex(x, y);
    x = amp;
    y = i * mul;
  }
  endShape();
  waves.splice(0, 1);
  print(waves.length);
  loop();
}

// //wave 1
// beginShape();
// for (var i = 0; i < bin; i++) {
//   let amp = spectrum[i];
//   curveVertex(x, y);
//   x = amp;
//   y = i * mul;
// }
// endShape();let x, y;
let song;
let fft;
let bin = 32;
let mul = 20;
let waves = [];
let spectrum = [];

function setup() {
  frameRate();
  createCanvas(500, 500);
  song = loadSound("openingLeft.mp3", loaded);
  fft = new p5.FFT(0.9, bin);
}

function loaded() {
  song.loop();
}

function draw() {
  background(20);
  noFill();
  stroke(255);
  strokeWeight(2)

  fft.setInput(song);
  spectrum = fft.analyze();
  waves.push(spectrum);

  //wave 1


    beginShape();
    for (var i = 0; i < bin; i++) {
      //let amp = spectrum[i];
      let amp = (waves[waves.length - 1])[i];
      curveVertex(x, y);
      x = amp;
      y = i * mul;
    }
    endShape();

  print(spectrum);
}let x1, y1, x2, y2,x3,y3;
let song1, song2;
let fft1, fft2;
let aveamp1, aveamp2;
let bin = 32;
let mul = 20;

function setup() {
  frameRate(20);
  createCanvas(255 * 2, 255 * 2);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
}

function loaded() {
  song1.loop();
  song2.loop();
}

function draw() {
  background(20);
  noFill();
  // left line
  aveamp1.setInput(song1);
  var level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.03, 0, 100);
  stroke(255, val1);
  strokeWeight(val1 / 20)

  fft1.setInput(song1);
  var spectrum1 = fft1.analyze();


  beginShape();
  for (var i1 = 0; i1 < bin; i1++) {
    var amp1 = spectrum1[i1];
    curveVertex(x1, y1 - 10);
    x1 = amp1
    y1 = i1 * mul
  }
  endShape();

  // right line
  aveamp2.setInput(song2);
  var level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.03, 0, 100);
  stroke(255, val2);
  strokeWeight(val2 / 20)


  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();

  beginShape();
  for (var i2 = 0; i2 < bin; i2++) {
    var amp2 = spectrum2[i2];
    curveVertex(x2, y2 - 10);
    x2 = (amp2 * -1) + width
    y2 = i2 * mul
  }
  endShape();
  print(level1);
}let wave = [];
let x1, y1;
let song1;
let fft1;
let aveamp1;
let bin = 32;
let mul = 20;


function setup() {
  frameRate(20);
  createCanvas(255 * 2, 255 * 2);
  background(20);
  song1 = loadSound("openingLeft.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft1.setInput(song1);
}

function loaded() {
  song1.loop();
}

function draw() {
  background(20);
  noFill();
  stroke(255);

  let spectrum1 = fft1.analyze();
  for (n = 0; n < 100; n++) {
    let wave = new Wave(spectrum1);
    waves.push(wave);
  }

  for (let i = 0; i < waves.length; i++) {
    waves[i].display();
  }
  print("1");
}

class Wave {
  constructor(spectrum1) {
    this.i = 0
    this.amp1 = 0
    this.bin = 32;
    this.spectrum1 = spectrum1;
    this.x1 = 0;
    this.y1 = 0;
    this.mul = 20
  }
  display() {
    beginShape();
    for (this.i = 0; this.i < this.bin; this.i++) {
      this.amp1 = this.spectrum1[this.i];
      curveVertex(this.x1, this.y1);
      this.x1 = this.amp1
      this.y1 = this.i * this.mul
    }
    endShape();
  }
}let wave = [];
let x1, y1;
let song1;
let fft1;
let aveamp1;
let bin = 32;
let mul = 20;


function setup() {
  frameRate(20);
  createCanvas(255 * 2, 255 * 2);
  background(20);
  song1 = loadSound("openingLeft.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft1.setInput(song1);
}

function loaded() {
  song1.loop();
}

function draw() {
  background(20);
  noFill();
  stroke(255);
  var spectrum1 = fft1.analyze();
  for (n = 0; n < 1; n++) {
    let wave = new Wave();
    waves.push(wave);
  }
  for (let i = 0; i < waves.length; i++) {
    circles[i].display();
  }
  circles.splice(0, 1);

}

class Wave {
  constructor() {

  }
  display() {
    beginShape();
    for (var i1 = 0; i1 < bin; i1++) {
      var amp1 = spectrum1[i1];
      curveVertex(x1, y1 - 10);
      x1 = amp1
      y1 = i1 * mul
    }
    endShape();
  }
}let x1, y1;
let song1;
let fft1;
let aveamp1;
let bin = 32;
let mul = 20;


function setup() {
  frameRate(20);
  createCanvas(255 * 2, 255 * 2);
  background(20);
  song1 = loadSound("openingLeft.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft1.setInput(song1);
  aveamp1 = new p5.Amplitude()
  aveamp1.setInput(song1);
}

function loaded() {
  song1.loop();
}

function draw() {
  background(20);
  noFill();
  
  var level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 50, 100);
  stroke(255, val1);
  
  var spectrum1 = fft1.analyze();

  beginShape();
  for (var i1 = 0; i1 < bin; i1++) {
    var amp1 = spectrum1[i1];
    curveVertex(x1, y1 - 10);
    x1 = amp1
    y1 = i1 * mul
  }
  endShape();
}

class Wave {
  constructor() {
    
  }
}//make the words bounce back and forth and ding
let ding;
let words = [];

//load the api
let goldURL = "https://api.wordnik.com/v4/word.json/gold/relatedWords?useCanonical=false&relationshipTypes=equivalent&limitPerRelationshipType=10&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"


function preload() {
  soundFormats('mp3');
  ding = loadSound('ding.mp3');
  loadJSON(goldURL, wordLoaded);
}

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
  createSpan("Gold")
  createP();
  var button = createButton('BLING IT ON');

}

function draw() {
  background(0);
  for (let i = 0; i < words.length; i++) {
    words[i].display();
    words[i].move();
  }
}

function wordLoaded(data) {
  let texts = data[0].words;
  for (i = 0; i < texts.length; i++) {
    let word = new Word(random(50, width), random(50, height), texts[i]);
    words.push(word);
  }
  console.log(words.length);
}let x1, y1;
let song1;
let fft1;
let aveamp1;
let bin = 32;
let mul = 20;


function setup() {
  frameRate(20);
  createCanvas(255 * 2, 255 * 2);
  background(20);
  song1 = loadSound("openingLeft.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
}

function loaded() {
  song1.loop();
}

function draw() {
  background(20);
  
  
  noFill();
  aveamp1.setInput(song1);
  var level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 50, 100);
  stroke(255, val1);

  fft1.setInput(song1);
  var spectrum1 = fft1.analyze();

  beginShape();
  for (var i1 = 0; i1 < bin; i1++) {
    var amp1 = spectrum1[i1];
    curveVertex(x1, y1 - 10);
    x1 = amp1
    y1 = i1 * mul
  }
  endShape();
}let circles = [];

function setup() {
  createCanvas(400, 400);
  for (n = 0; n < 4; n++) {
    let circle = new Circle(200, 200, random(100, 220), random(100, 200));
    circles.push(circle);
  }
}

function draw() {
  background(220);
  fill(255, 20);
  ellipseMode(CENTER);
  for (n = 0; n < 1; n++) {
    let circle = new Circle(200, 200, random(100, 220), random(100, 200));
    circles.push(circle);
  }

  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
  }
  circles.splice(0, 1);
}

class Circle {
  constructor(x, y, sizex, sizey) {
    this.x = x;
    this.y = y;
    this.sizex = sizex;
    this.sizey = sizey;
    this.i=0;
  }

  display() {
    for (this.i=0; this.i<1; this.i++) {
    ellipse(this.x, this.y, this.sizex, this.sizey);
    }
  }
}let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp1, aveamp2;
let bin = 16;
let mul = 20;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function setup() {
  frameRate(20);
  createCanvas(560, 560);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
}

function loaded() {
  song1.loop();
  song2.loop();
}

function draw() {
  background(30);
  noFill();
  strokeWeight(1);

  // top left line
  aveamp1.setInput(song1);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, 100);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 10; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = amp1
      y1 = i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = amp3
      y3 = height - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, 100);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 10; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = (amp2 * -1) + width
      y2 = i2 * mul
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = (amp4 * -1) + width
      y4 = height - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
}let x1, y1, x2, y2;
let song1, song2;
let fft1, fft2;
let aveamp1, aveamp2;
let bin = 32;
let mul = 20;

function setup() {
  frameRate(20);
  createCanvas(255 * 2, 255 * 2);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
}

function loaded() {
  song1.loop();
  song2.loop();
}

function draw() {
    background(0);
  noFill();
  stroke(255);

  aveamp1.setInput(song1);
  var level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 1, 20);
  strokeWeight(val1);
  // stroke(val1);

  fft1.setInput(song1);
  var spectrum1 = fft1.analyze();
  beginShape();
  for (var i1 = 0; i1 < bin; i1++) {
    var amp1 = spectrum1[i1];
    curveVertex(x1, y1-10);
    x1 = amp1
    y1 = i1 * mul
  }
  endShape();

  aveamp2.setInput(song2);
  var level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 1, 20);
  strokeWeight(val2);
  // stroke(val2);


  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();

  beginShape();
  for (var i2 = 0; i2 < bin; i2++) {
    var amp2 = spectrum2[i2];
    curveVertex(x2, y2-10);
    x2 = (amp2 * -1) + width
    y2 = i2 * mul
  }
  endShape();

}let song1;
let song2;
let fft;
let bin = 128;
let mul = 10;

function setup() {
  frameRate(17);
  createCanvas(255*2, 255*2);
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
}

function loaded() {
  song1.loop();
  song2.loop();
}

function draw() {
  background(0);
  stroke(255);

  fft1.setInput(song1);
  var spectrum1 = fft1.analyze();
  for (var i1 = 0; i1 < bin; i1++) {
    var amp1 = spectrum1[i1];
    rect(0, i1*mul, amp1, 1*mul);
  }

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  for (var i2 = 0; i2 < bin; i2++) {
    var amp2 = spectrum2[i2];
    rect(width, i2*mul, amp2 * -1, 1*mul);
  }
}
let song1;
let song2;
let fft;
let bin = 1024;

function setup() {
  frameRate(17);
  createCanvas(200 * 2, bin);
  // load song and run loaded function when loaded
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);

  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);

}

//when song is loaded, play sound
function loaded() {
  song1.loop();
  song2.loop();
}

function draw() {
  background(0);
stroke (255);

  // left visual

  fft1.setInput(song1);
  var spectrum1 = fft1.analyze();
  for (var i = 0; i < bin; i++) {
    var amp = spectrum1[i];
    rect(0, i , amp, 2);
  }

  // right visual

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  for (var i2 = 0; i2 < bin; i2++) {
    var amp2 = spectrum2[i2];
    rect(width, (i2 ), amp2 * -1, 2);
  }
}let x = 0
let y = 0

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  noFill();
  beginShape();
  for (i = 0; i < 11; i++) {
    curveVertex(x, y)
    x = random(180, 200);
    y = i * 40;
  }
  endShape();
}let song1;
let song2;
let fft;
let bin = 1024;

function setup() {
  frameRate(17);
  createCanvas(200*2, bin);
  // load song and run loaded function when loaded
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);

  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);

}

//when song is loaded, play sound
function loaded() {
  song1.loop();
  song2.loop();
}

function draw() {
  background(0);
  noStroke();
  fill (40);

  // left visual

  fft1.setInput(song1);
  var spectrum1 = fft1.analyze();
  for (var i = 0; i < bin; i++) {
    var amp = spectrum1[i];
    // fill(255, 0, 0, 50);
    rect(0, i * 10, amp, 10);
  }

  // right visual

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  for (var i2 = 0; i2 < bin; i2++) {
    var amp2 = spectrum2[i2];
    // fill(0, 255, 0, 50);
    rect(width, (i2 * 10), amp2*-1, 10);
    // fill (0);
    // text(i2, 255, i2 * 10);
  }
}let song;
let fft;
let bin = 1024;

function preload() {
  song = loadSound("openingLeft.mp3");
}

function setup() {
  frameRate(20);
  createCanvas(255, 800);
  song.play ();
  song.show ();
}

class Song {
  constructor() {
    this.fft = new p5.FFT(0.8, bin);
  }
  
  play() {
    song.play();
  }
  
  show() {
    var spectrum = fft.analyze();
    for (var i = 0; i < bin; i++) {
      var amp = spectrum[i];
      rect(40, i * 10, amp, 10);
      text(i, 20, i * 10);
    }
  }

}

function draw() {
  background(150);
}let song1;
let song2;
let fft;
let bin = 1024;

function setup() {
  frameRate(30);
  createCanvas(255*2, bin);
  // load song and run loaded function when loaded
  song1 = loadSound("openingLeft.mp3", loaded);
  song2 = loadSound("openingRight.mp3", loaded);

  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);

}

//when song is loaded, play sound
function loaded() {
  song1.loop();
  song2.loop();
}

function draw() {
  background(255);

  // left visual

  fft1.setInput(song1);
  var spectrum1 = fft1.analyze();
  for (var i = 0; i < bin; i++) {
    var amp = spectrum1[i];
    fill(255, 0, 0, 50);
    rect(255, i * 10, amp*-1, 10);
  }

  // right visual

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  for (var i2 = 0; i2 < bin; i2++) {
    var amp2 = spectrum2[i2];
    fill(0, 255, 0, 50);
    rect(255, i2 * 10, amp2, 10);
    fill (0);
    text(i2, 255, i2 * 10);
  }

}var song;
var fft;

function setup() {
  frameRate(20);
  createCanvas(255, 1024);
  // load song and run loaded function when loaded
  song = loadSound("openingRight.mp3", loaded);
  fft = new p5.FFT(0.8,1024);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(150);
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    line (0,i,amp,i);

  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
A game using pitch Detection with CREPE
=== */

// Pitch variables
let crepe;
const voiceLow = 100;
const voiceHigh = 500;
let audioStream;

// Circle variables
let circleSize = 42;
const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Text variables
let goalNote = 0;
let currentNote = '';
let currentText = '';
let textCoordinates;

function setup() {
  createCanvas(410, 320);
  textCoordinates = [width / 2, 30];
  gameReset();
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
}

function startPitch() {
  pitch = ml5.pitchDetection('./model/', audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      let midiNum = freqToMidi(frequency);
      currentNote = scale[midiNum % 12];
      select('#currentNote').html(currentNote);
    }
    getPitch();
  })
}

function draw() {
  background(240);
  // Goal Circle is Blue
  noStroke();
  fill(0, 0, 255);
  goalHeight = map(goalNote, 0, scale.length - 1, 0, height);
  ellipse(width / 2, goalHeight, circleSize, circleSize);
  fill(255);
  text(scale[goalNote], (width / 2) - 5, goalHeight + (circleSize / 6));
  // Current Pitch Circle is Pink
  if (currentNote) {
    currentHeight = map(scale.indexOf(currentNote), 0, scale.length - 1, 0, height);
    fill(255, 0, 255);
    ellipse(width / 2, currentHeight, circleSize, circleSize);
    fill(255);
    text(scale[scale.indexOf(currentNote)], (width / 2) - 5, currentHeight + (circleSize / 6));
    // If target is hit
    if (dist(width / 2, currentHeight, width / 2, goalHeight) < circleSize / 2) {
      hit(goalHeight, scale[goalNote]);
    }
  }
}

function gameReset() {
  goalNote = round(random(0, scale.length - 1));
  select('#target').html(scale[goalNote])
}

function hit(goalHeight, note) {
  noLoop();
  background(240);
  fill(138, 43, 226);
  ellipse(width / 2, goalHeight, circleSize, circleSize);
  fill(255);
  text(note, width / 2, goalHeight + (circleSize / 6));
  fill(50);
  select('#hit').html('Nice!')
  gameReset();
}var x1;
var x2;

function setup() {
  createCanvas(1920, 1080);
  background(40);
  x1 = width / 10
  x2 = width / 10 * 9
}

function draw() {
  noFill();
  stroke(255, 10);
  ellipse(x1, height / 2, random(150, 200), random(150, 200));
  x1 = x1 + random(0.5);
  ellipse(x2, height / 2, random(150, 200), random(150, 200));
  x2 = x2 - random(0.5);
  noStroke();
  fill (255,10);
  textSize(30);
text('connect', width/2, 150);
}function setup() {
  createCanvas(1920, 1080);
  background(40);
}

function draw() {
  noFill();
  for (i = 0; i < 20; i++) {
    for (n = 0; n < 20; n++) {
        stroke(255, 1);
  ellipse( random (i*100,i*100), n*100, random(100,200), random(100,200));
        noStroke();
    }
  }
  fill (255);
  textSize(30);
text('touch', width/2, 150);
}function setup() {
  createCanvas(1920	, 1080);
	  background(40);
}

function draw() {
	noFill();
	stroke (255,10);
	ellipse (width/4,height/2,random (250,350), random (250,350));
  ellipse (width/4*3,height/2,random (250,350), random (250,350));
  
    noStroke();
  fill (255,10);
  textSize(30);
text('move', width/2, 150);
}function setup() {
  createCanvas(1920, 1080);
  background(40);
}

function draw() {
  noFill();
  stroke(255, 10);
  ellipse(width / 2, height / 2, random(500, 700), random(500, 700));

  noStroke();
  fill(255, 10);
  textSize(30);
  text('breathe', (width / 2)-20, 150);
}let song;
let fft;
let mave1history = [];
let mave2history = [];
let mave3history = [];
let x = 1;
let y = 1;
let z = 1;

function setup() {
  createCanvas(500, 500);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.9, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
    background(50);
  var spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];

    var ave1 = spectrum[0] + spectrum[1] + spectrum[2] + spectrum[3] + spectrum[4] + spectrum[5] / 6;
    mave1 = map(ave1, 0, 1024, 1, 30);
    mave1history.push(mave1);

    var ave2 = spectrum[6] + spectrum[7] + spectrum[8] + spectrum[9] / 4;
    mave2 = map(ave2, 0, 200, 1, 30);
    mave2history.push(mave2);

    var ave3 = spectrum[10] + spectrum[11] + spectrum[12] / 3;
    mave3 = map(ave3, 0, 70, 1, 30);
    mave3history.push(mave3);

    strokeWeight (mave1history[1]);
    point (200,width/2);
    print (mave1history[1]);
    
    if (mave1history > 2) {
      mave1history.splice(0, 1);
    }
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let size = [];
let s = 3

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  s = s + 3;
  size.push(s);
  print(size[3]);
  if (size.length > 3) {
    size.splice(0, 1);
  }
}var x =0;
var thick = 1;

function setup() {
  createCanvas(400, 400);
    background(220);
}

function draw() {
  strokeWeight (thick);
  point (x,200);
  x=x+1;
  thick = thick +1;
  if (thick > 10) {
  thick = 0
  }
}var song;
var fft;
var mave1history = [];
var mave2history = [];
var mave3history = [];
var x = 1;
var y = 1;
var z = 1;

function setup() {
  createCanvas(500, 500);
  background(50);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.9, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];

    var ave1 = spectrum[0] + spectrum[1] + spectrum[2] + spectrum[3] + spectrum[4] + spectrum[5] / 6;
    mave1 = map(ave1, 0, 1024, 1, 10);
    mave1history.push(mave1);

    var ave2 = spectrum[6] + spectrum[7] + spectrum[8] + spectrum[9] / 4;
    mave2 = map(ave2, 0, 200, 1, 10);
    mave2history.push(mave2);

    var ave3 = spectrum[10] + spectrum[11] + spectrum[12] / 3;
    mave3 = map(ave3, 0, 70, 1, 10);
    mave3history.push(mave3);

    ellipseMode(CENTER);
    stroke(255, z);
    noFill();
    strokeWeight(mave1);
    point(x, y);
    strokeWeight(mave2);
    point(x+5, y);
    strokeWeight(mave3);
    point(x+10, y);
    y = y + 1;

    if (y > height) {
      y = 0
      x = x + 15;
      z = z+0.5
    }
  
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;

function setup() {
  frameRate(20);
  createCanvas(500, 500);
  background(50);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.9, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var ave1 = spectrum[0] + spectrum[1] + spectrum[2] + spectrum[3] + spectrum[4] + spectrum[5] / 6;
    mave1 = map(ave1, 0, 1024, 0, 255);
    var ave2 = spectrum[6] + spectrum[7] + spectrum[8] + spectrum[9] / 4;
    mave2 = map(ave2, 0, 200, 0, 255);
    var ave3 = spectrum[10] + spectrum[11] + spectrum[12] / 3;
    mave3 = map(ave3, 0, 70, 0, 255);
    ellipseMode(CENTER);
    stroke(255, 5);
    noFill();
    ellipse(30 + (random(-5, +5)), width / 2 + (random(-5, +5)), mave1, mave1);
    ellipse(30 * 6 + (random(-5, +5)), width / 2 + (random(-5, +5)), mave2, mave2);
    ellipse(30 * 10 + (random(-5, +5)), width / 2 + (random(-5, +5)), mave3, mave3);
    print (mave1, mave2,mave3);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;

function setup() {
  frameRate(20);
  createCanvas(500, 500);
  background(50);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.9, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var ave1 = spectrum[0] + spectrum[1] + spectrum[2] + spectrum[3] + spectrum[4] + spectrum[5] / 6;
    mave1 = map(ave1, 0, 1024, 0, 255);
    var ave2 = spectrum[6] + spectrum[7] + spectrum[8] + spectrum[9] / 4;
    mave2 = map(ave2, 0, 200, 0, 255);
    var ave3 = spectrum[10] + spectrum[11] + spectrum[12] / 3;
    mave3 = map(ave3, 0, 70, 0, 255);
    ellipseMode(CENTER);
    stroke(255, 5);
    noFill();
    ellipse(30 + (random(-5, +5)), width / 2 + (random(-5, +5)), mave1, mave1);
    ellipse(30 * 6 + (random(-5, +5)), width / 2 + (random(-5, +5)), mave2, mave2);
    ellipse(30 * 10 + (random(-5, +5)), width / 2 + (random(-5, +5)), mave3, mave3);
    print (mave1, mave2,mave3);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;
var n;
var i;

function setup() {
  createCanvas(512, 512);
  frameRate (10);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.5, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(220);
  var spectrum = fft.analyze();
  for (n = 0; n < spectrum.length; n++) {
    for (i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var square = map(amp, 0, 255, 0, 32);
      x = i * 32;
      y = n * 32;
      noStroke();
      rectMode(CENTER);
      rect(x+16, y+16, square, square);
        y = y-32;
    }
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;
var n;
var i;

function setup() {
  createCanvas(512, 512);
  frameRate (10);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.5, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(220);
  var spectrum = fft.analyze();
  for (n = 0; n < spectrum.length; n++) {
    for (i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var square = map(amp, 0, 255, 0, 32);
      x = i * 32;
      y = n * 32;
      noStroke();
      rectMode(CENTER);
      rect(x+16, y+16, square, square);
        y = y-32;
    }
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;
var snap = [];

function setup() {
  createCanvas(548, 548);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.5, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(220);
  var spectrum = fft.analyze();
  for (var n = 0; n < spectrum.length; n++) {
    for (var i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var square = map(amp, 0, 255, 0, 32);
      var x = (i + 1) * 32;
      var y = (n + 1) * 32;
      noStroke();
      rectMode(CENTER);
      rect(x, y, square, square);
    }
    snap.push (spectrum[i]);
    print (snap);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;

function setup() {
  frameRate(20);
  createCanvas(500, 500);
  background(50);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.9, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var ave1 = spectrum[0] + spectrum[1] + spectrum[2] + spectrum[3] + spectrum[4] + spectrum[5] / 6;
    mave1 = map(ave1, 0, 1024, 0, 255);
    var ave2 = spectrum[6] + spectrum[7] + spectrum[8] + spectrum[9] / 4;
    mave2 = map(ave2, 0, 200, 0, 255);
    var ave3 = spectrum[10] + spectrum[11] + spectrum[12] / 3;
    mave3 = map(ave3, 0, 70, 0, 255);
    ellipseMode(CENTER);
    stroke(255, 5);
    noFill();
    ellipse(30 + (random(-5, +5)), width / 2 + (random(-5, +5)), mave1, mave1);
    ellipse(30 * 6 + (random(-5, +5)), width / 2 + (random(-5, +5)), mave2, mave2);
    ellipse(30 * 10 + (random(-5, +5)), width / 2 + (random(-5, +5)), mave3, mave3);
    print (mave1, mave2,mave3);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;

function setup() {
  frameRate(20);
  createCanvas(510, 400);
    background(0);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.5, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  var spectrum = fft.analyze();

  for (var i = 0; i < 13; i++) {
    var amp = spectrum[i];
    fill (255,10);
    quad(i * 30, spectrum[i], i * 30, height,  (i + 1) * 30, height,(i + 1) * 30, spectrum[(i + 1)]);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;

function setup() {
  frameRate(20);
  createCanvas(510, 400);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.5, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(220);
  var spectrum = fft.analyze();

  for (var i = 0; i < spectrum.length; i++) {
    // white sound bar
    var amp = spectrum[i];
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(i * 30 + 30, height / 2, 20, spectrum[i]);
    text(spectrum[i], i * 30 + 30, height);
    text(i, i * 30 + 30, height - 20);

    // ellipse 1
    var ave = ((spectrum[0] + spectrum[1] + spectrum[2] + spectrum[3]) / 4);
    fill(50, 20, 0, 20);
    ellipseMode(CENTER);
    ellipse(30, height / 2, ave, ave);
  }

  for (i = 4; i < spectrum.length; i++) {
    var amp2 = spectrum[i + 1];
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;

function setup() {
  frameRate(20);
  createCanvas(255, 1024);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.8,1024);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(150);
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    line (0,i,amp,i);

  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;

function setup() {
  frameRate(20);
  createCanvas(500, 500);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.9, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(150);
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;

function setup() {
  frameRate(20);
  createCanvas(500, 500);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT();

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(150);
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    v1 = map(amp, 0, 120, 0, height / 2);
    noStroke();
    fill (255,50);
    rectMode(CENTER);

    // left pattern
    rect(i * 20, height / 2, 10, v1);

    // right pattern
    rect(width - 20 *i, height / 2, 10, v1);
    
    // top pattern
    rect(width/2, i * 20, v1, 10);
    
    // bottom pattern
      rect(width/2, height - 20 *i, v1, 10);
    
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;
var n;

function setup() {
  createCanvas(512, 512);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.5, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(220);
  var spectrum = fft.analyze();
  for (n = 0; n < spectrum.length; n++) {
    for (var i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var square = map(amp, 0, 255, 0, 32);
      x = i * 32;
      y = n * 32;
      rect(x, y, square, square);
    }
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}var song;
var fft;

function setup() {
  frameRate(20);
  createCanvas(400, 320);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.5, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(220);
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    noStroke();
    rectMode(CENTER);
    rect(width / 2, i * -10 + 160, spectrum[i], 10);
    rect(width / 2, i * 10 + 170, spectrum[i], 10);
    //   rect (i*30 + 30, height/2, 20, spectrum[i]);
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.loop();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}

function jumpSong() {
  var len = song.duration();
  song.jump(51);
}var song;
var fft;

function setup() {
  frameRate (20);
  createCanvas(400, 320);
  // load song and run loaded function when loaded
  song = loadSound("legato.mp3", loaded);
  fft = new p5.FFT(0.5, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(220);
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++){
    var amp = spectrum[i];
    noStroke();
    rectMode (CENTER);
    rect (width/2, i*-10+ 160, spectrum[i], 10);
    rect (width/2, i*10 + 170, spectrum[i], 10);
  //   rect (i*30 + 30, height/2, 20, spectrum[i]);
    }
  }

  function togglePlaying() {
    if (!song.isPlaying()) {
      song.loop();
      button.html('pause');
    } else {
      song.pause();
      button.html('play');
    }
  }var song;
var fft;

function setup() {
  frameRate (1);
  createCanvas(510, 400);
  // load song and run loaded function when loaded
  song = loadSound("chords.mp3", loaded);
  fft = new p5.FFT(0, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(220);
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++){
    var amp = spectrum[i];
    rectMode (CENTER);
     rect (i*30 + 30, height/2, 20, spectrum[i]);
    text (spectrum[i],i*30+ 30, height);
    }
  }

  function togglePlaying() {
    if (!song.isPlaying()) {
      song.loop();
      button.html('pause');
    } else {
      song.pause();
      button.html('play');
    }
  }var song;
var fft;

function setup() {
  frameRate (1);
  createCanvas(510, 400);
  // load song and run loaded function when loaded
  song = loadSound("chords.mp3", loaded);
  fft = new p5.FFT(0, 16);

  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

//when song is loaded, play sound
function loaded() {
  song.loop();
}

function draw() {
  background(220);
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++){
    var amp = spectrum[i];
    rectMode (CENTER);
     rect (i*30 + 30, height/2, 20, spectrum[i]);
    text (spectrum[i],i*30+ 30, height);
    }
  }

  function togglePlaying() {
    if (!song.isPlaying()) {
      song.loop();
      button.html('pause');
    } else {
      song.pause();
      button.html('play');
    }
  }let texts;
let splitString = [];
let y = 20;
let song, fft;
let button;
let songTitle = ['perth', 'skinny love', 'holocene', 'creature fear', 'michicant'];
let lyricurl1 = "https://orion.apiseeds.com/api/music/lyric/bon iver/"
let lyricurl2 = songTitle [0];
let lyricurl3 = "?apikey=hR9sPER8aJyBu63Ba2lebUU9DjvfyHQIDyHbs3tlfj85idBhz0DlBwknP5BY4DJs"
let lyricurlTotal;

function preload() {
  lyricurlTotal = lyricurl1 + lyricurl2 + lyricurl3;
  lyric = loadJSON(lyricurlTotal, lyricLoaded);
  song = loadSound("bloodstream.mp3");
}

function lyricLoaded(data) {
  texts = data.result.track.text;
}

function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT();
  song.play();
  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function draw() {
  background(220);
  fft.analyze();
  bass = (int)(fft.getEnergy("bass"));
  lowMid = (int)(fft.getEnergy("lowMid"));
  mid = (int)(fft.getEnergy("mid"));
  highMid = (int)(fft.getEnergy("highMid"));
  treble = (int)(fft.getEnergy("treble"));

  splitString = split(texts, '\n');
  for (i = 0; i < splitString.length; i++) {
    text(splitString[0], 0, bass + 30);
    text(splitString[1], 0, lowMid + 30);
    text(splitString[2], 0, mid + 30);
    text(splitString[3], 0, highMid + 30);
    text(splitString[4], 0, treble + 30);
  }
  print(bass, lowMid, mid, highMid, treble);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}let texts;
let splitString = [];
let y = 20;
let song, fft;
let button;
let songTitle = ['perth', 'skinny love', 'holocene', 'creature fear', 'michicant'];
let lyricurl1 = "https://orion.apiseeds.com/api/music/lyric/bon iver/"
let lyricurl2 = songTitle [4];
let lyricurl3 = "?apikey=hR9sPER8aJyBu63Ba2lebUU9DjvfyHQIDyHbs3tlfj85idBhz0DlBwknP5BY4DJs"
let lyricurlTotal;

function preload() {
  lyricurlTotal = lyricurl1 + lyricurl2 + lyricurl3;
  lyric = loadJSON(lyricurlTotal, lyricLoaded);
  song = loadSound("bloodstream.mp3");
}

function lyricLoaded(data) {
  texts = data.result.track.text;
}

function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT();
  song.play();
  button = createButton('pause');
  button.mousePressed(togglePlaying);
}

function draw() {
  background(220);
  fft.analyze();
  bass = (int)(fft.getEnergy("bass"));
  lowMid = (int)(fft.getEnergy("lowMid"));
  mid = (int)(fft.getEnergy("mid"));
  highMid = (int)(fft.getEnergy("highMid"));
  treble = (int)(fft.getEnergy("treble"));

  splitString = split(texts, '\n');
  for (i = 0; i < splitString.length; i++) {
    text(splitString[0], 0, bass + 30);
    text(splitString[1], 0, lowMid + 30);
    text(splitString[2], 0, mid + 30);
    text(splitString[3], 0, highMid + 30);
    text(splitString[4], 0, treble + 30);
  }
  print(bass, lowMid, mid, highMid, treble);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}//make the words bounce back and forth and ding
let ding;
let words = [];

//load the api
let goldURL = "https://api.wordnik.com/v4/word.json/gold/relatedWords?useCanonical=false&relationshipTypes=equivalent&limitPerRelationshipType=10&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"


function preload() {
  //load the sound
  soundFormats('mp3');
  ding = loadSound('ding.mp3');
  //load the API
  wordsNun = loadJSON(goldURL, wordLoaded);
}

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
  createSpan("Gold")
  createP();
  var button = createButton('BLING IT ON');
}

function draw() {
  background(0);
  for (let i = 0; i < words.length; i++) {
    words[i].display();
    words[i].move();
  }
}


function wordLoaded(data) {
  let texts = data[0].words;
  for (i = 0; i < texts.length; i++) {
    let word = new Word(random(50, width), random(50, height), texts[i]);
    words.push(word);
    print (words)
  }
  console.log(words.length);
}var song, fft;
var mic;
function preload() {
  song = loadSound("vincent.mp3");
}


function setup() {
  createCanvas(800, 800);
  fft = new p5.FFT();
  song.play();
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

  noStroke();
  fill(255, 186, 73);
  ellipse(width / 2, height / 2, bassVal * 4, bassVal * 4);

  noStroke();
  fill(32, 163, 158);
  ellipse(width / 2, height / 2, lMidVal * 2, lMidVal * 2);

  noStroke();
  fill(135, 195, 143);
  ellipse(width / 2, height / 2, midVal * 2, midVal * 2);

  noStroke();
  fill(239, 91, 91);
  ellipse(width / 2, height / 2, hMidVal * 2, hMidVal * 2);

  noStroke();
  fill(79, 0, 75);
  ellipse(width / 2, height / 2, trebVal * 2, trebVal * 2);


}
//make the words bounce back and forth and ding
let ding;
let words = [];

//load the api
let goldURL = "https://api.wordnik.com/v4/word.json/gold/relatedWords?useCanonical=false&relationshipTypes=equivalent&limitPerRelationshipType=10&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"
let golds = [];


// let lightGold = [
//   r: 243,
//   g: 220,
//   b: 179,
//   ]


function preload() {
  //load the sound
  soundFormats('mp3');
  ding = loadSound('ding.mp3');
  //load the API
  wordsNun = loadJSON(goldURL, wordLoaded);
}

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
  createSpan("Gold")
  createP();
  var button = createButton('BLING IT ON');
  


}

function draw() {
  background(220);
  
    for(let i = 0; i < words.length; i++){
      words[i].display();
      words[i].move();
    }

}


function wordLoaded(data) {
  let texts = data[0].words;
  
  for (i=0; i < texts.length; i++) {
    let word = new Word(random(50,width), random(50,height), texts[i]);
  	words.push(word);
  // otherwords = data[0].words[i];
  // wordsNun = otherwords.word;
  // print(otherwords);\
  }
  console.log(words.length);
}

   
var goldURL = "https://api.wordnik.com/v4/word.json/gold/relatedWords?useCanonical=false&relationshipTypes=equivalent&limitPerRelationshipType=10&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"
var golds = [];

function preload() {
  words = loadJSON(goldURL, wordLoaded);
}

function setup() {
  createCanvas(400, 400);
  createP();
  createSpan("Gold")
  createP();
  var button = createButton('BLING IT ON');
  button.mousePressed(getWord);
}

function draw() {
  background(220);
  textSize(32);
  text(golds[], random(width), random(height));
}

function getWord() {
  loadJSON(goldURL, wordLoaded);
}

function wordLoaded(data) {
  for (i=0; i <6; i++) {
  otherwords = data[0].words[i];
  words = otherwords.word;
  print(otherwords);
    
  }
}var goldURL = "https://api.wordnik.com/v4/word.json/gold/relatedWords?useCanonical=false&relationshipTypes=equivalent&limitPerRelationshipType=10&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"

function preload() {
  words = loadJSON(goldURL, wordLoaded);
}

function setup() {
  createCanvas(400, 400);
  createP();
  createSpan("Gold")
  createP();
  var button = createButton('BLING IT ON');
  button.mousePressed(getWord);
}

function draw() {
  background(220);
  textSize(32);
  text(otherwords, random(width), random(height));
}

function getWord() {
  loadJSON(goldURL, wordLoaded);
}

function wordLoaded(data) {
  otherwords = data[0].words[0];
  words = otherwords.word;
  print(otherwords);
}var goldURL = "https://api.wordnik.com/v4/word.json/gold/relatedWords?useCanonical=false&relationshipTypes=equivalent&limitPerRelationshipType=10&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"
var words = [];

function preload() {
  words = loadJSON(goldURL, wordLoaded);
}

function setup() {
  createCanvas(400, 400);
  createP();
  createSpan("Gold")
  createP();
  var button = createButton('BLING IT ON');
  button.mousePressed(getWord);
}

function draw() {
  background(220);
  textSize(32);
  text(otherwords, random(width), random(height));
  //wordLoaded(data);
}

function getWord() {
  loadJSON(goldURL, wordLoaded);
}

function wordLoaded(data) {
  for (i = 0; i = words.length; i++) {
   var otherwords = data[0].words[i];
    words = otherwords.word;
    print(otherwords);
  }
}var randomNounURL = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&maxCorpusCount=-1&minDictionaryCount=20&maxDictionaryCount=-1&minLength=1&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"
var img, album, albumName, giphy;

function preload() {
  loadJSON(randomNounURL, wordLoaded);
}

function setup() {
  noCanvas();
}

function draw() {
  createP();
  createSpan("Your album name: The ")
  createSpan(albumName);
  createP();
  createSpan("Your album cover:");
  createP();
  img.size(400, 400);
}


function wordLoaded(data) {
  albumName = data.word;
  print(albumName);
}
var boids = [];
var song, fft;
var mic;
var bassVal;
var lMidVal;
var midVal;
var hMidVal;
var trebVal;

function preload() {
  song = loadSound("bloodstream.mp3");
}


function setup() {
  createCanvas(720, 400);

  // Add an initial set of boids into the system
  for (var i = 0; i < 100; i++) {
    boids[i] = new Boid(random(width), random(height));
  }
  fft = new p5.FFT();
  song.play();
  // mic = new p5.AudioIn();
  // fft.setInput(mic);
  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
}

function jumpSong() {
  var len = song.duration();
  song.jump(len / 3);
}


function draw() {
  fft.analyze();
  bassVal = (int)(fft.getEnergy("bass"));
  lMidVal = (int)(fft.getEnergy("lowMid"));
  midVal = (int)(fft.getEnergy("mid"));
  hMidVal = (int)(fft.getEnergy("highMid"));
  trebVal = (int)(fft.getEnergy("treble"));

  background(bassVal);

  // Run all the boids

  for (var i = 0; i < boids.length; i++) {
    boids[i].run(boids);
  }

 // print(bassVal , lMidVal , midVal , hMidVal , trebVal);
}




// FLOCKING!!! //
// Boid class
// Methods for Separation, Cohesion, Alignment added
function Boid(x, y, bassVal) {
  this.acceleration = createVector(0, 0);
  this.velocity = p5.Vector.random2D();
  this.position = createVector(x, y);
  this.r = 10;
  this.maxspeed = 3; // Maximum speed
  this.maxforce = 0.05; // Maximum steering force

}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

// Forces go into acceleration
Boid.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  var sep = this.separate(boids); // Separation
  var ali = this.align(boids); // Alignment
  var coh = this.cohesion(boids); // Cohesion
  // Arbitrarily weight these forces
  sep.mult(2.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset acceleration to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force
  return steer;
}

// Draw boid as a circle
Boid.prototype.render = function() {
  fill(lMidVal, 50);
  noStroke();
  ellipse(this.position.x, this.position.y, midVal, midVal);

  fill(hMidVal+trebVal, 0, 0,50);
  noStroke();
  ellipse(this.position.x + 50, this.position.y+ 50, hMidVal+trebVal, hMidVal+trebVal);
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  var desiredseparation = 50;
  var steer = createVector(0, 0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0, 0);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum); // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}var song, fft;
var mic;
function preload() {
  song = loadSound("bloodstream.mp3");
}


function setup() {
  createCanvas(800, 800);
  fft = new p5.FFT();
  song.play();
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

  noStroke();
  fill(255, 186, 73);
  ellipse(width / 2, height / 2, bassVal * 4, bassVal * 4);

  noStroke();
  fill(32, 163, 158);
  ellipse(width / 2, height / 2, lMidVal * 2, lMidVal * 2);

  noStroke();
  fill(135, 195, 143);
  ellipse(width / 2, height / 2, midVal * 2, midVal * 2);

  noStroke();
  fill(239, 91, 91);
  ellipse(width / 2, height / 2, hMidVal * 2, hMidVal * 2);

  noStroke();
  fill(79, 0, 75);
  ellipse(width / 2, height / 2, trebVal * 2, trebVal * 2);


}var serial;
var portName = '/dev/cu.usbserial-15P22137';
var inData = 0;
var triggered = false;
var nextLevelPending=false;


function setup() {

  serial = new p5.SerialPort();
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName);

  width = 1366;
  height = 627;
  //answer for prompt
  score = -1;
  minY = Infinity;
  playing = true;
  // ifWon is making the keys not work
  ifWon = false;
  stop = false;
  //loading images
  face = loadImage("face.png");

  g1 = loadImage("g1.png");
  g2 = loadImage("g2.png");
  g3 = loadImage("g3.png");
  g4 = loadImage("g4.png");
  g5 = loadImage("g5.png");
  ghosts = [];
  ghosts.push(g1);
  ghosts.push(g2);
  ghosts.push(g3);
  ghosts.push(g4);
  ghosts.push(g5);
  //var frame = loadImage("colo.png");
  var answer;
  //x & y pos of character
  guyX = (width / 2) - (width / 54.43);
  guyY = height - (height / 9);
  //width and height of logs and cars
  logWidth = 110; // make the log wide enough to easy to pass
  logHeight = 50;
  grassHeight = height / 9;
  largeHeight = height / 3;
  carWidth = 70;
  carHeight = 30;
  // Arrays for cars and logs
  carCount = floor(width / 300); //adopt to retina
  topCars = [];
  middleCars = [];
  bottomCars = [];
  topLogs = [];
  middleLogs = [];
  bottomLogs = [];
  yCoord = [];
  //randomizing speeds of cars and logs
  topCarSpeed = random(1, 2);
  middleCarSpeed = random(1, 2);
  bottomCarSpeed = random(1, 2);
  topLogSpeed = random(1, 2);
  middleLogSpeed = random(1, 2);
  bottomLogSpeed = random(1, 2);
  //setting if on the log to false
  onLog = false;
  // // //colors for cars (randomized)
  // topColor = [];
  // middleColor = [];
  // bottomColor = [];

  topGhostIndex = [];
  middleGhostIndex = [];
  bottomGhostIndex = [];

  //difficulty of level
  difficulty = 5;
  //setting life to 3
  life = 3;
  //setting score to -1 because it adds 1 at start
  score = 0;

  //if game end, cannot move keys
  gameEnd = false;
  //side moving of keys
  click = width / 30; //distance when you press position key
  //setting level to 1
  level = 1;
  lostGame = false;
  wonLevel = false;
  tx = guyX;
  ty = guyY;

  createCanvas(width, height);
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of horizon
  //prvar(window.innerWidth + ", " + window.innerHeight);
  //prompt for music
  // answer = prompt("Would you like to have music? (yes/no)");
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of vertical
  //setting up music
  // music = new Audio();
  // music.setAttribute("src", "jackpot.mp3");
  // music.play();
  // //repeating
  // music.addEventListener("ended", repeat);
  // //if the answer is one of these, then play music
  // if (answer == "y" || answer == "yes" || answer == "Yes" || answer == "YES") {
  //   playing = true;
  //   //otherwise, stop it
  // } else {
  //   music.pause();
  // }
  // win = new Audio();
  // win.setAttribute("src", "Ta_Da-SoundBible_com-1884170640.mp3");
  // beep = new Audio();
  // beep.setAttribute("src", "beep-10.mp3");
  // lost = new Audio();
  // lost.setAttribute("src", "fail-buzzer-02.mp3");
  //if the answer is one of these, then play music
  //setting up topcars

  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    topCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //topColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    topGhostIndex[i] = floor(random(5));
  }
  //setting up middlecars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    middleCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //middleColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    middleGhostIndex[i] = floor(random(5));
  }
  //setting up bottomcars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    bottomCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //bottomColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    bottomGhostIndex[i] = floor(random(5));
  }

  //same for all logs, and randomly placing between coordinates
  for (var i = 0; i < carCount; i++) {
    topLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    middleLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    bottomLogs[i] = width * i / carCount + random(-100, 100);
  }

  // Load images here
  img_road = loadImage("road.png");
  img_grass = loadImage("grass final.png");
  img_log = loadImage("pumpkin.png");

}


// //repeating music
// function repeat() {
//   music.play();
// }var serial;
var portName = '/dev/cu.usbserial-15P22137';
var inData = 0;
var triggered = false;


function setup() {

  serial = new p5.SerialPort();
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName);

  width = 1366;
  height = 627;
  //answer for prompt
  score = -1;
  minY = Infinity;
  playing = true;
  // ifWon is making the keys not work
  ifWon = false;
  stop = false;
  //loading images
  face = loadImage("face.png");

  g1 = loadImage("g1.png");
  g2 = loadImage("g2.png");
  g3 = loadImage("g3.png");
  g4 = loadImage("g4.png");
  g5 = loadImage("g5.png");
  ghosts = [];
  ghosts.push(g1);
  ghosts.push(g2);
  ghosts.push(g3);
  ghosts.push(g4);
  ghosts.push(g5);
  //var frame = loadImage("colo.png");
  var answer;
  //x & y pos of character
  guyX = (width / 2) - (width / 54.43);
  guyY = height - (height / 9);
  //width and height of logs and cars
  logWidth = 110; // make the log wide enough to easy to pass
  logHeight = 50;
  grassHeight = height / 9;
  largeHeight = height / 3;
  carWidth = 70;
  carHeight = 30;
  // Arrays for cars and logs
  carCount = floor(width / 300); //adopt to retina
  topCars = [];
  middleCars = [];
  bottomCars = [];
  topLogs = [];
  middleLogs = [];
  bottomLogs = [];
  yCoord = [];
  //randomizing speeds of cars and logs
  topCarSpeed = random(1, 2);
  middleCarSpeed = random(1, 2);
  bottomCarSpeed = random(1, 2);
  topLogSpeed = random(1, 2);
  middleLogSpeed = random(1, 2);
  bottomLogSpeed = random(1, 2);
  //setting if on the log to false
  onLog = false;
  // // //colors for cars (randomized)
  // topColor = [];
  // middleColor = [];
  // bottomColor = [];

  topGhostIndex = [];
  middleGhostIndex = [];
  bottomGhostIndex = [];

  //difficulty of level
  difficulty = 5;
  //setting life to 3
  life = 3;
  //setting score to -1 because it adds 1 at start
  score = 0;

  //if game end, cannot move keys
  gameEnd = false;
  //side moving of keys
  click = width / 30; //distance when you press position key
  //setting level to 1
  level = 1;
  lostGame = false;
  wonLevel = false;
  tx = guyX;
  ty = guyY;

  createCanvas(width, height);
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of horizon
  //prvar(window.innerWidth + ", " + window.innerHeight);
  //prompt for music
  // answer = prompt("Would you like to have music? (yes/no)");
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of vertical
  //setting up music
  // music = new Audio();
  // music.setAttribute("src", "jackpot.mp3");
  // music.play();
  // //repeating
  // music.addEventListener("ended", repeat);
  // //if the answer is one of these, then play music
  // if (answer == "y" || answer == "yes" || answer == "Yes" || answer == "YES") {
  //   playing = true;
  //   //otherwise, stop it
  // } else {
  //   music.pause();
  // }
  // win = new Audio();
  // win.setAttribute("src", "Ta_Da-SoundBible_com-1884170640.mp3");
  // beep = new Audio();
  // beep.setAttribute("src", "beep-10.mp3");
  // lost = new Audio();
  // lost.setAttribute("src", "fail-buzzer-02.mp3");
  //if the answer is one of these, then play music
  //setting up topcars

  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    topCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //topColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    topGhostIndex[i] = floor(random(5));
  }
  //setting up middlecars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    middleCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //middleColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    middleGhostIndex[i] = floor(random(5));
  }
  //setting up bottomcars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    bottomCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //bottomColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    bottomGhostIndex[i] = floor(random(5));
  }

  //same for all logs, and randomly placing between coordinates
  for (var i = 0; i < carCount; i++) {
    topLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    middleLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    bottomLogs[i] = width * i / carCount + random(-100, 100);
  }

  // Load images here
  img_road = loadImage("road.png");
  img_grass = loadImage("grass final.png");
  img_log = loadImage("pumpkin.png");

}


// //repeating music
// function repeat() {
//   music.play();
// }var serial;
var portName = '/dev/cu.usbserial-15P22137';
var inData = 0;
var triggered = false;


function setup() {

  serial = new p5.SerialPort();
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName);

  width = 1366;
  height = 627;
  //answer for prompt
  score = -1;
  minY = Infinity;
  playing = true;
  // ifWon is making the keys not work
  ifWon = false;
  stop = false;
  //loading images
  face = loadImage("face.png");

  g1 = loadImage("g1.png");
  g2 = loadImage("g2.png");
  g3 = loadImage("g3.png");
  g4 = loadImage("g4.png");
  g5 = loadImage("g5.png");
  ghosts = [];
  ghosts.push(g1);
  ghosts.push(g2);
  ghosts.push(g3);
  ghosts.push(g4);
  ghosts.push(g5);
  //var frame = loadImage("colo.png");
  var answer;
  //x & y pos of character
  guyX = (width / 2) - (width / 54.43);
  guyY = height - (height / 9);
  //width and height of logs and cars
  logWidth = 110; // make the log wide enough to easy to pass
  logHeight = 50;
  grassHeight = height / 9;
  largeHeight = height / 3;
  carWidth = 70;
  carHeight = 30;
  // Arrays for cars and logs
  carCount = floor(width / 300); //adopt to retina
  topCars = [];
  middleCars = [];
  bottomCars = [];
  topLogs = [];
  middleLogs = [];
  bottomLogs = [];
  yCoord = [];
  //randomizing speeds of cars and logs
  topCarSpeed = random(1, 2);
  middleCarSpeed = random(1, 2);
  bottomCarSpeed = random(1, 2);
  topLogSpeed = random(1, 2);
  middleLogSpeed = random(1, 2);
  bottomLogSpeed = random(1, 2);
  //setting if on the log to false
  onLog = false;
  // // //colors for cars (randomized)
  // topColor = [];
  // middleColor = [];
  // bottomColor = [];

  topGhostIndex = [];
  middleGhostIndex = [];
  bottomGhostIndex = [];

  //difficulty of level
  difficulty = 5;
  //setting life to 3
  life = 3;
  //setting score to -1 because it adds 1 at start
  score = 0;

  //if game end, cannot move keys
  gameEnd = false;
  //side moving of keys
  click = width / 30; //distance when you press position key
  //setting level to 1
  level = 1;
  lostGame = false;
  wonLevel = false;
  tx = guyX;
  ty = guyY;

  createCanvas(width, height);
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of horizon
  //prvar(window.innerWidth + ", " + window.innerHeight);
  //prompt for music
  // answer = prompt("Would you like to have music? (yes/no)");
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of vertical
  //setting up music
  // music = new Audio();
  // music.setAttribute("src", "jackpot.mp3");
  // music.play();
  // //repeating
  // music.addEventListener("ended", repeat);
  // //if the answer is one of these, then play music
  // if (answer == "y" || answer == "yes" || answer == "Yes" || answer == "YES") {
  //   playing = true;
  //   //otherwise, stop it
  // } else {
  //   music.pause();
  // }
  // win = new Audio();
  // win.setAttribute("src", "Ta_Da-SoundBible_com-1884170640.mp3");
  // beep = new Audio();
  // beep.setAttribute("src", "beep-10.mp3");
  // lost = new Audio();
  // lost.setAttribute("src", "fail-buzzer-02.mp3");
  //if the answer is one of these, then play music
  //setting up topcars

  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    topCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //topColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    topGhostIndex[i] = floor(random(5));
  }
  //setting up middlecars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    middleCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //middleColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    middleGhostIndex[i] = floor(random(5));
  }
  //setting up bottomcars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    bottomCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //bottomColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    bottomGhostIndex[i] = floor(random(5));
  }

  //same for all logs, and randomly placing between coordinates
  for (var i = 0; i < carCount; i++) {
    topLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    middleLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    bottomLogs[i] = width * i / carCount + random(-100, 100);
  }

  // Load images here
  img_road = loadImage("road.png");
  img_grass = loadImage("grass final.png");
  img_log = loadImage("pumpkin.png");

}


// //repeating music
// function repeat() {
//   music.play();
// }var serial;
var portName = '/dev/cu.usbserial-15P22137';
var inData = 0;



function setup() {

  serial = new p5.SerialPort();
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName);

  width = 1366;
  height = 627;
  //answer for prompt
  score = -1;
  minY = Infinity;
  playing = true;
  // ifWon is making the keys not work
  ifWon = false;
  stop = false;
  //loading images
  face = loadImage("face.png");

  g1 = loadImage("g1.png");
  g2 = loadImage("g2.png");
  g3 = loadImage("g3.png");
  g4 = loadImage("g4.png");
  g5 = loadImage("g5.png");
  ghosts = [];
  ghosts.push(g1);
  ghosts.push(g2);
  ghosts.push(g3);
  ghosts.push(g4);
  ghosts.push(g5);
  //var frame = loadImage("colo.png");
  var answer;
  //x & y pos of character
  guyX = (width / 2) - (width / 54.43);
  guyY = height - (height / 9);
  //width and height of logs and cars
  logWidth = 110; // make the log wide enough to easy to pass
  logHeight = 50;
  grassHeight = height / 9;
  largeHeight = height / 3;
  carWidth = 70;
  carHeight = 30;
  // Arrays for cars and logs
  carCount = floor(width / 300); //adopt to retina
  topCars = [];
  middleCars = [];
  bottomCars = [];
  topLogs = [];
  middleLogs = [];
  bottomLogs = [];
  yCoord = [];
  //randomizing speeds of cars and logs
  topCarSpeed = random(1, 2);
  middleCarSpeed = random(1, 2);
  bottomCarSpeed = random(1, 2);
  topLogSpeed = random(1, 2);
  middleLogSpeed = random(1, 2);
  bottomLogSpeed = random(1, 2);
  //setting if on the log to false
  onLog = false;
  // // //colors for cars (randomized)
  // topColor = [];
  // middleColor = [];
  // bottomColor = [];

  topGhostIndex = [];
  middleGhostIndex = [];
  bottomGhostIndex = [];

  //difficulty of level
  difficulty = 5;
  //setting life to 3
  life = 3;
  //setting score to -1 because it adds 1 at start
  score = 0;

  //if game end, cannot move keys
  gameEnd = false;
  //side moving of keys
  click = width / 30; //distance when you press position key
  //setting level to 1
  level = 1;
  lostGame = false;
  wonLevel = false;
  tx = guyX;
  ty = guyY;

  createCanvas(width, height);
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of horizon
  //prvar(window.innerWidth + ", " + window.innerHeight);
  //prompt for music
  // answer = prompt("Would you like to have music? (yes/no)");
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of vertical
  //setting up music
  // music = new Audio();
  // music.setAttribute("src", "jackpot.mp3");
  // music.play();
  // //repeating
  // music.addEventListener("ended", repeat);
  // //if the answer is one of these, then play music
  // if (answer == "y" || answer == "yes" || answer == "Yes" || answer == "YES") {
  //   playing = true;
  //   //otherwise, stop it
  // } else {
  //   music.pause();
  // }
  // win = new Audio();
  // win.setAttribute("src", "Ta_Da-SoundBible_com-1884170640.mp3");
  // beep = new Audio();
  // beep.setAttribute("src", "beep-10.mp3");
  // lost = new Audio();
  // lost.setAttribute("src", "fail-buzzer-02.mp3");
  //if the answer is one of these, then play music
  //setting up topcars

  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    topCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //topColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    topGhostIndex[i] = floor(random(5));
  }
  //setting up middlecars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    middleCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //middleColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    middleGhostIndex[i] = floor(random(5));
  }
  //setting up bottomcars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    bottomCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //bottomColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    bottomGhostIndex[i] = floor(random(5));
  }

  //same for all logs, and randomly placing between coordinates
  for (var i = 0; i < carCount; i++) {
    topLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    middleLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    bottomLogs[i] = width * i / carCount + random(-100, 100);
  }

  // Load images here
  img_road = loadImage("road.png");
  img_grass = loadImage("grass final.png");
  img_log = loadImage("pumpkin.png");

}


// //repeating music
// function repeat() {
//   music.play();
// }var serial;
var portName = '/dev/cu.usbserial-15P22137';
var inData = 0;



function setup() {

  serial = new p5.SerialPort();
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName);

  width = 1366;
  height = 627;
  //answer for prompt
  score = -1;
  minY = Infinity;
  playing = true;
  // ifWon is making the keys not work
  ifWon = false;
  stop = false;
  //loading images
  face = loadImage("face.png");

  G1 = loadImage("G1.png");
  G2 = loadImage("G2.png");
  G3 = loadImage("G3.png");
  G4 = loadImage("G4.png");
  G5 = loadImage("G5.png");
  G6 = loadImage("G6.png");
  ghosts = [];
  ghosts.push(G1);
  ghosts.push(G2);
  ghosts.push(G3);
  ghosts.push(G4);
  ghosts.push(G5);
  ghosts.push(G6);
  //var frame = loadImage("colo.png");
  var answer;
  //x & y pos of character
  guyX = (width / 2) - (width / 54.43);
  guyY = height - (height / 9);
  //width and height of logs and cars
  logWidth = 110; // make the log wide enough to easy to pass
  logHeight = 50;
  grassHeight = height / 9;
  largeHeight = height / 3;
  carWidth = 70;
  carHeight = 30;
  // Arrays for cars and logs
  carCount = floor(width / 300); //adopt to retina
  topCars = [];
  middleCars = [];
  bottomCars = [];
  topLogs = [];
  middleLogs = [];
  bottomLogs = [];
  yCoord = [];
  //randomizing speeds of cars and logs
  topCarSpeed = random(1, 2);
  middleCarSpeed = random(1, 2);
  bottomCarSpeed = random(1, 2);
  topLogSpeed = random(1, 2);
  middleLogSpeed = random(1, 2);
  bottomLogSpeed = random(1, 2);
  //setting if on the log to false
  onLog = false;
  // //colors for cars (randomized)
  topColor = [];
  middleColor = [];
  bottomColor = [];

  topGhostIndex = [];
  middleGhostIndex = [];
  bottomGhostIndex = [];

  //difficulty of level
  difficulty = 5;
  //setting life to 3
  life = 3;
  //setting score to -1 because it adds 1 at start
  score = 0;

  //if game end, cannot move keys
  gameEnd = false;
  //side moving of keys
  click = width / 30; //distance when you press position key
  //setting level to 1
  level = 1;
  lostGame = false;
  wonLevel = false;
  tx = guyX;
  ty = guyY;

  createCanvas(width, height);
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of horizon
  //prvar(window.innerWidth + ", " + window.innerHeight);
  //prompt for music
  // answer = prompt("Would you like to have music? (yes/no)");
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of vertical
  //setting up music
  // music = new Audio();
  // music.setAttribute("src", "jackpot.mp3");
  // music.play();
  // //repeating
  // music.addEventListener("ended", repeat);
  // //if the answer is one of these, then play music
  // if (answer == "y" || answer == "yes" || answer == "Yes" || answer == "YES") {
  //   playing = true;
  //   //otherwise, stop it
  // } else {
  //   music.pause();
  // }
  // win = new Audio();
  // win.setAttribute("src", "Ta_Da-SoundBible_com-1884170640.mp3");
  // beep = new Audio();
  // beep.setAttribute("src", "beep-10.mp3");
  // lost = new Audio();
  // lost.setAttribute("src", "fail-buzzer-02.mp3");
  //if the answer is one of these, then play music
  //setting up topcars

  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    topCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //topColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    topGhostIndex[i] = floor(random(6));
  }
  //setting up middlecars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    middleCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //middleColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    middleGhostIndex[i] = floor(random(6));
  }
  //setting up bottomcars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    bottomCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //bottomColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    bottomGhostIndex[i] = floor(random(6));
  }

  //same for all logs, and randomly placing between coordinates
  for (var i = 0; i < carCount; i++) {
    topLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    middleLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    bottomLogs[i] = width * i / carCount + random(-100, 100);
  }

  // Load images here
  img_road = loadImage("road.png");
  img_grass = loadImage("grass final.png");
  img_log = loadImage("pumpkin.png");

}

function serialEvent() {
  inData = Number(serial.read());
  print("Got: " + inData);
}

// //repeating music
// function repeat() {
//   music.play();
// }var serial;
var portName = '/dev/cu.usbserial-15P22137';
var inData = 0;

function setup() {
  serial = new p5.SerialPort();
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName);
  createCanvas(400, 400);
}

function serialEvent() {
  inData = Number(serial.read());
  print("Got: " + inData);
}

function draw() {

  background(220);
  // ellipseMode(CENTER);
  // ellipse (width/2, height/2, inData);
  fill(255);
  ellipse(100, 200, 50, 50);
  ellipse(300, 200, 50, 50);
  ellipse(200, 100, 50, 50);
  ellipse(200, 300, 50, 50);
  //left
  if (inData == 10) {
    fill(0);
    ellipse(100, 200, 50, 50);
    //right
  } else if (inData == 30) {
    fill(0);
    ellipse(300, 200, 50, 50);
    //up
  } else if (inData == 20) {
    fill(0);
    ellipse(200, 100, 50, 50);
    //down
  } else if (inData == 40) {
    fill(0);
    ellipse(200, 300, 50, 50);
  } else {
    fill(255);
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(100,200,50,50);
  ellipse(300,200,50,50);
  ellipse(200,100,50,50);
  ellipse(200,300,50,50);
}var randomNounURL = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&maxCorpusCount=-1&minDictionaryCount=20&maxDictionaryCount=-1&minLength=1&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"
var img, album, albumName, giphy;

function preload() {
  loadJSON(randomNounURL, wordLoaded);
}

function setup() {
  noCanvas();
  var button = createButton('GENERATE YOUR ALBUM');
  button.mousePressed(randomNoun);
}

function draw() {
  createP();
  createSpan("Your album name: The ")
  albumNameP = createSpan(albumName);
  createP();
  createSpan("Your album cover:");
  createP();
  img = createImg(giphy.data[0].images.original.url);
  img.size(400, 400);
}


function randomNoun() {
  loadJSON(randomNounURL, wordLoaded);
  albumNameP.html(albumName);
  var gurl1 = "https://api.giphy.com/v1/gifs/search?api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB&q=";
  var gword = album.word;
  var gurl2 = "&limit=3";

  var gurl = gurl1 + gword + gurl2;
  loadJSON(gurl, gotData);

}

function wordLoaded(data) {
  album = data;
  albumName = album.word;
  print(album);
}

function gotData(data) {
	giphy = data;
  print(giphy);
}var randomNounURL = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&maxCorpusCount=-1&minDictionaryCount=20&maxDictionaryCount=-1&minLength=1&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"

function setup() {
  noCanvas();
  var button = createButton('GENERATE YOUR ALBUM')
  button.mousePressed(randomNoun);
}


function randomNoun() {
  wordnik('nouns', randomNounURL);
}

function wordnik(where, url) {
  loadJSON(url, wordLoaded);

  function wordLoaded(data) {
    createP();
    createSpan("Your album name: The ")
    createSpan(data.word);
    createP();
    createSpan("Your album cover:")
     createP();
    var gurl1 = "https://api.giphy.com/v1/gifs/search?api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB&q=";
    var gword = data.word;
    var gurl2 = "&limit=3";

    var gurl = gurl1 + gword + gurl2;
    loadJSON(gurl, gotData);

    function gotData(giphy) {
      var img = createImg(giphy.data[0].images.original.url);
      img.size(400, 400);
    }
  }
}var randomNounURL = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&maxCorpusCount=-1&minDictionaryCount=20&maxDictionaryCount=-1&minLength=1&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"

function setup() {
  noCanvas();
  var button = createButton('GENERATE')
  button.mousePressed(randomNoun);
}


function randomNoun() {
  wordnik('nouns', randomNounURL);
}

function wordnik(where, url) {
  loadJSON(url, wordLoaded);

  function wordLoaded(data) {
    createP();
    createSpan("The ")
    createSpan(data.word);
    createP();
    var gurl1 = "https://api.giphy.com/v1/gifs/search?api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB&q=";
    var gword = data.word;
    var gurl2 = "&limit=1";

    var gurl = gurl1 + gword + gurl2;
    loadJSON(gurl, gotData);

    function gotData(giphy) {
      var img = createImg(giphy.data[1].images.original.url);
      img.size(400, 400);
    }
  }
}//full url: https://api.giphy.com/v1/gifs/search?api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB&q=cloud&limit=3&offset=0&rating=G&lang=en 
//giphy api key: Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB
//wordnik api key: api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7

var albumAdjective;
var albumNoun;

function setup() {
  var gurl1 = "https://api.giphy.com/v1/gifs/search?api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB&q=";
  var gword = "happy-cloud";
  var gurl2 = "&limit=3&offset=0&rating=G&lang=en";

  var wurl1 = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adjective%2C%20adverb&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"
  var wurl2 = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20given-name%2C%20noun-plural&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"

  var gurl = gurl1 + gword + gurl2;
  loadJSON(gurl, ggotData);

  loadJSON(wurl1, w1gotData);

  loadJSON(wurl2, w2gotData);

  var word
  var value = 4+7;
  words = createP(value)

  button = createButton('Generate Album Name and Cover');
  button.mousePressed(generate);
  createP('');
}

function ggotData(giphy) {
  var img = createImg(giphy.data[1].images.original.url);
  img.size(400, 400);

}

function askWordnik() {

}

function w1gotData(albumAdjective) {
  print(albumAdjective.word)
}

function w2gotData(albumNoun) {
  print(albumNoun.word)
}

function generate() {}

function draw() {}var randomNounURL = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&maxCorpusCount=-1&minDictionaryCount=20&maxDictionaryCount=-1&minLength=1&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"

function setup() {
  noCanvas();
  var button = createButton('GENERATE')
  button.mousePressed(randomNoun);
}


function randomNoun() {
  wordnik('nouns', randomNounURL);
}

function wordnik(where, url) {
  loadJSON(url, wordLoaded);

  function wordLoaded(data) {
    createP();
    createSpan("The ")
    createSpan(data.word);
    createP();
    var gurl1 = "https://api.giphy.com/v1/gifs/search?api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB&q=";
    var gword = data.word;
    var gurl2 = "&limit=3&offset=0&rating=G&lang=en";

    var gurl = gurl1 + gword + gurl2;
    loadJSON(gurl, gotData);

    function gotData(giphy) {
      var img = createImg(giphy.data[1].images.original.url);
      img.size(400, 400);
    }
  }
}//full url: https://api.giphy.com/v1/gifs/search?api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB&q=cloud&limit=3&offset=0&rating=G&lang=en 
//giphy api key: Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB
//wordnik api key: api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7

var albumAdjective;
var albumNoun;

function setup() {
  var gurl1 = "https://api.giphy.com/v1/gifs/search?api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB&q=";
  var gword = "happy-cloud";
  var gurl2 = "&limit=3&offset=0&rating=G&lang=en";

  var wurl1 = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adjective%2C%20adverb&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"
  var wurl2 = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20given-name%2C%20noun-plural&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"

  var gurl = gurl1 + gword + gurl2;
  loadJSON(gurl, ggotData);

  loadJSON(wurl1, w1gotData);

  loadJSON(wurl2, w2gotData);

  var word
  words = createP(askWordnik)

  button = createButton('Generate Album Name and Cover');
  button.mousePressed(generate);
  createP('');
}

function ggotData(giphy) {
  var img = createImg(giphy.data[1].images.original.url);
  img.size(400, 400);

}

function askWordnik() {

}

function w1gotData(albumAdjective) {
  print(albumAdjective.word)
}

function w2gotData(albumNoun) {
  print(albumNoun.word)
}

function generate() {}

function draw() {}var api = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB";
var query = "&q=cloud&limit=3&offset=0&rating=G&lang=en";

function preload() {
  ryan = loadImage('ryan.gif')
  black = loadImage('black.png')
}


function setup() {
  var url = api + apiKey + query;
  loadJSON(url, gotData);
}

function gotData(giphy) {
  var img = createImg(giphy.data[1].images.downsized_medium.url);
  img.size(400, 400);
  img.position(0, 0);
  fill(0);
  ellipse (0,0,200,200);
}


function draw() {
  // giphy image
  imageMode(CENTER);
  noTint();
  image(ryan, height / 2, width / 2, 400, 400);

  //cd tone
  tint(255, 70);

  //album name
  noLoop();
  var pos = random(40, height)
  textStyle(BOLD);
  textSize(random(40, 70));
  textAlign(CENTER);
  text('ABCD', width / 2, pos);

  //artist name
  textStyle(BOLD);
  textSize(20);
  textAlign(CENTER);
  text('ABCD', width / 2, pos + 30);
}// API Key c061a490098848d3b6e1ddc8efe48f10
// http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=d21e79452f4461671f1ccf2a209d48c3&units=imperial
// http://developer.nytimes.com/article_search_v2.json#/Documentation/GET/articlesearch.json

let baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
let apiKey = "c061a490098848d3b6e1ddc8efe48f10";
let urls = [];
let snnipets = [];
let input;

function setup() {
  createCanvas(800,500);
  // input = createInput();
  // input.value("NYU");
  // input.position(20,20);
  // let button = createButton("search");
  // button.position(180,20);
  // button.mousePressed(search);
  //let url = baseUrl + "?api-key=" + apiKey + "&q" + query; 
  let query = "sexual harassment";
  let startDate= `20171001`;
  let endDate= `20181001`;
  let url = `${baseUrl}?api-key=${apiKey}&q=${query}&begin_date=${startDate}&end_date=${endDate}`;
  // console.log(url);
  loadJSON(url, gotData);
  
}

function gotData(data){

  let res = data.response.docs;
  for (let i=0; i<res.length; i++){
    const url = res[i].web_url;
    const title = res[i].snippet;
    urls.push(url);
    snnipets.push(title);
}
    console.log(urls);
    console.log(snnipets);
    showArticles();

}

function showArticles(){
  background(0);
  const fontsize=0;
  background (0);
  
  textSize(fontsize);
  for( let i = 0; i<titles.length; i++){
    const dispText= titles[i] + "/n" + urls[i]
    fill(255);
    text(dispText,10, i*40 + 80);
  }
}

function draw(){
  background (0);
}//api key Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB

function setup() {
  var url = "https://api.giphy.com/v1/gifs/search?api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB&q=cloud&limit=1&offset=0&rating=G&lang=en"
  loadJSON(url, gotData);
}

function gotData(data) {
    print(data);
}

function draw() {
  
}// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z

// Thank you to: https://github.com/dariusk/metaphor-a-minute/blob/master/metaphor.js

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

// Call to get a random noun
var randomNounURL = "https://api.wordnik.com/v4/words.json/randomWord?" +
                    "&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&" +
                    "&includePartOfSpeech=noun" +
                    "&minLength=5&maxLength=-1" +
                    "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";


// A random Adjective
var randomAdjURL  = "https://api.wordnik.com/v4/words.json/randomWord?" +
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
  wordnik('words', randomWordURL);
}

function randomAdj() {
  wordnik('adjs', randomAdjURL);
}

function randomNoun() {
  wordnik('nouns', randomNounURL);
}

function wordnik(where, url) {
  loadJSON(url, wordLoaded);
  function wordLoaded(data) {
    var div = createDiv(data.word);
  }
}// https://api.giphy.com/v1/gifs/search?api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB&q=cloud&limit=1&offset=0&rating=G&lang=en

var api = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB";
var query = "&q=cloud&limit=1&offset=0&rating=G&lang=en";


function setup() {
  noCanvas();
  var url = api + apiKey + query;
  loadJSON(url, gotData);
}

function gotData(giphy) {
  for (var i = 0; i < giphy.data.length; i++) {
    var img = createImg(giphy.data[i].images.original.url);
    img.size(300, 300);
  }
}var api = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "api_key=Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB";
var query = "&q=cloud&limit=3&offset=0&rating=G&lang=en";

function preload() {
  ryan = loadImage('ryan.gif')
  black = loadImage('black.png')
}


function setup() {
  createCanvas(400, 400);
  background (0);
  var url = api + apiKey + query;
  loadJSON(url, gotData);
}

function gotData(giphy) {
  var img = createImg(giphy.data[1].images.downsized_medium.url);
  loadImage(path, [successCallback], [failureCallback])
  img.size(400, 400);
}


function draw() {
  // giphy image
  imageMode(CENTER);
  noTint();
  // image(ryan, height / 2, width / 2, 400, 400);

  //cd tone
  tint(255, 70);

  //album name
  noLoop();
  var pos = random(40, height)
  textStyle(BOLD);
  textSize(random(40, 70));
  textAlign(CENTER);
  text('ABCD', width / 2, pos);

  //artist name
  textStyle(BOLD);
  textSize(20);
  textAlign(CENTER);
  text('ABCD', width / 2, pos + 30);
}var angle = 0;
var d = 8;
var k = 3 / d;
var button1;
var button2;


function setup() {
  createCanvas(400, 400);
  bgcolor = 220;
  createP('Slide to the left, slide to the right!');
  createP('Petals');
  slider1 = createSlider(-10, 10, 0);
  createP('Wind');
  slider2 = createSlider(-3, 3, 0);
  createP('Size');
  slider3 = createSlider(50, 300, 175);
  createP('Feelin lazy? ');
  button1 = createButton('Just give me a flower');

  button1.mousePressed(goLazy);
}

function draw() {
  // DRAW ROSE FROM CENTER
  background(bgcolor);
  translate(width / 2, height / 2);
  rotate(angle);
  beginShape();
  noFill();
  strokeWeight(0.7);
  angleMode(DEGREES);
  for (var a = 0; a < 360 * d; a++) {
    var r = slider3.value() * cos(slider1.value() * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape();
  angle = angle + slider2.value();
}

// function goLazy() {
//   slider1.value(8);
//   slider2.value(3);
//   slider3.value(100);
// }

function goLazy() {
  slider1.value(random(-10,10));
  slider2.value(random(-3,3));
  slider3.value(random(50,300));
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255, 0, 0);
}var n1 = 0;
var n2 = 0;
var c = 6;
var points = [];
let img;

function setup() {
  createCanvas(500, 400);
  angleMode(DEGREES);
  img = loadImage('black.png');
}

function draw() {
  background(220);
  push();
  translate(200, 200);
  rotate(n1* -1);
  imageMode(CENTER);
  // tint(255, 127);
  image(img, 0, 0, 400, 400);
  n1 += 0.07;
  pop();

  push();
  translate(300, 200);
  rotate(n2 );
  imageMode(CENTER);
  // tint(255, 127);
  image(img, 0, 0, 400, 400);
  n2 += 0.07;
  pop();
}var n1 = 0;
var n2 = 0;
var c = 6;
var points = [];
let img;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  img = loadImage('hello.png');
}

function draw() {
  background(0);
  push();
  translate(200, 200);
  rotate(n1);
  imageMode(CENTER);
  tint(255, 127);
  image(img, 0, 0, 400, 400);
  n1 += 0.1;
  pop();

  push();
  translate(200, 200);
  rotate(n2 * -1);
  imageMode(CENTER);
  tint(255, 127);
  image(img, 0, 0, 400, 400);
  n2 += 0.1;
  pop();
}
var n = 0;
var c = 6;
var points = [];
let img;

function setup() {
  createCanvas(500, 400);
  angleMode(DEGREES);
  img = loadImage('Artboard1.png');
}

function draw() {
  background(0);
  image(img, 0, 0);
  
  push();
  translate(200, 200);
  rotate(n * 0.05);
  for (var i = 0; i < 1000; i++) {
    var a = i * 137.5;
    var r = c * sqrt(i);
    var x = r * cos(a);
    var y = r * sin(a);
    noStroke();
    ellipse(x, y, 4, 4);
  }
  n += 1;

  pop();
  push();
  translate(300, 200);
  rotate(n * -0.05);
  for (var i = 0; i < 1000; i++) {
    var a = i * 137.5;
    var r = c * sqrt(i);
    var x = r * cos(a);
    var y = r * sin(a);
    noStroke();
    ellipse(x, y, 4, 4);
  }
  n += 1;
  pop();
}var circles = []

function setup() {
  createCanvas(400, 400);
  for (i = 0; i < 100; i++) {
    let x = 0 + i*20;
    circles[i] = new Circle(x,200);
  }
}

function draw() {
  background(220);
  for (i = 0; i < circles.length; i++) {
    circles[i].show();
  }
}

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  show() {
    ellipse(this.x,this.y, 20, 20);
  }
}var offset;
var angle;
var scalar;
var X;
var Y;
var side;
var grey;
let circles = [];
let num = 800;
let  r = 0;

function setup() {
  createCanvas(500, 500);
  // slider = createSlider(1,5,1,1);
  background(220);
  offset = width / 2;
  angle = 1;
  scalar = 5;
  side = 20;
  grey = 255;
  for(let i=0; i<num;i++){
  	X = offset + sin(angle)*scalar - width/2;
  	Y = offset + cos(angle)*scalar - height/2;
    circles[i] = new Circle(X, Y, side, grey);
    angle += 1;
    scalar += 1/2;
    side += 0.05;
    grey -= 0.6;
  }
}

function draw() {
  background(220);
  push();
  translate(width/2,height/2);
  // let r = map(mouseX,0,width,0,PI);
  rotate(r);
  r++;
  // r+=slider.value();
  for(let i=0; i<circles.length;i++){
  	circles[i].makeCircle();
  }
  pop();
}

class Circle {
  constructor(X,Y,side,grey) {
    this.x = X;
    this.y = Y;
    this.side = side;
    this.grey = grey;
  }
  
	makeCircle() {
    fill(this.grey);
    stroke(this.grey);
    ellipse(this.x, this.y, this.side, this.side);
  }
}let bubbles = []; // create an array to store bubbles 

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) { // create balls until there are 10 balls
    let x = 20 + 40 * i; //  create balls at pixel 20 plus ball number x 40
    bubbles[i] = new Bubble(x, 200); // create ball at number x and y
  }
}



function draw() {
  background(220);
  // print(bubble.x, bubble.y);
  for (let i = 0; i < bubbles.length; i++) { // create balls
    bubbles[i].turnred(mouseX, mouseY);
    // bubbles[i].show();
    bubbles[i].move();
  }
}

function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked(mouseX, mouseY);
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < 20) {
      console.log('CLICK ON BUBBLE');
    }
  }
  turnred(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < 20) {
      rectMode(CENTER);
    rect(this.x, this.y, 20, 20);
    } else {
      ellipseMode(CENTER);
    ellipse(this.x, this.y, 20, 20);
    }
  }
  show() {
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 20, 20);
  }
  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }
}let bubbles = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    let x = 40 * i;
    bubbles[i] = new Bubble(x, 200);
  }
}



function draw() {
  background(220);
  // print(bubble.x, bubble.y);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].show();
    bubbles[i].move();
    bubbles[i].clicked();
  }
}


class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 10) {
      console.log('CLICK ON BUBBLE');
    }
  }
  show() {
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 20, 20);
  }
  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }
}let bubble;

function setup() {
  createCanvas(400, 400);
  bubble = new Bubble();
}

function draw() {
  background(220);
  // print(bubble.x, bubble.y);
  bubble.show ()
  bubble.move ()
}

class Bubble {
  constructor() {
    this.x = 200;
    this.y = 150;
  }
  show() {
    ellipse(this.x, this.y, 20, 20);
  }
  move() {
    this.x = this.x + random(-2,2);
    this.y = this.y + random(-2,2);
  }
}var pos = [50,100,170,190,200,250,450,600];

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  for (i=0; i<8; i++) {
  ellipse (pos[i], 200, 20,20);  
  }
}var colors = ['red', 'blue', 'green', 'white', 'black'];
index = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(colors[index]);
}

function mousePressed() {
  index = index + 1;
  if (index == colors.length) {
    index = 0;
  }

}var serial;
var portName = '/dev/cu.usbserial-15P22137';
var inData = 0;

function setup() {
  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName);
    createCanvas(400, 400);
}

function serialEvent() {
  inData = Number(serial.read());
  print("Got: " + inData);
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    print(i + " " + portList[i]);
  }
}

function draw() {
  background(220);
  ellipseMode(CENTER);
  ellipse (width/2, height/2, inData);
}var serial;
var portName = '/dev/cu.usbserial-15P22137';

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('data', serialEvent); // callback for when new data arrives
}

function serialEvent() {
  print("Hi from serial event");
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    print("Got: " + inData);
  }
}

function draw() {
  background(220);
}var angle = 0;
var d1 = 8;
var k1 = 5 / d1;

var d2 = 2;
var k2 = 9 / d2;
  
function setup() {
  createCanvas(400, 600);
}

function mousePressed () {
   background (255);
}

function draw() {

  background(0);

  // DRAW ROSE FROM CENTER
  translate(width / 2, height / 2);
  rotate(angle);
  beginShape();
  noFill();
  strokeWeight(1);
  stroke(0, 0, 255);
  angleMode(DEGREES);
  for (var a = 0; a < 360 * d1; a++) {
    // for (var a = 0; a < TWO_PI; a += .01) {
    var r = 200 * cos(k1 * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape();
  angle = angle + 1;

  // DRAW ROSE FROM CENTER

  rotate(angle);
  beginShape();
  noFill();
  strokeWeight(1);
  stroke(255, 0, 0);
  angleMode(DEGREES);
  for (var a = 0; a < 360 * d2; a++) {
    // for (var a = 0; a < TWO_PI; a += .01) {
    var r = 150 * cos(k2 * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape();
  angle = angle + 1;
  
 var n = 5;
  if (frameCount % n == 0) {
    background(50);
  }
}
let a, b, c;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  add(15,15);
}

function add(a,b) {
  c = a + b;
  print (c);
}
let num1;
let num2;
let answer;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  add(2,4);
}

function add(num1,num2){
  answer = num1 + num2;
  print(answer);
  text("the answer is",20,30);
  text(answer, 100,30)
}let balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}

function draw() {
  background(220);

  for (let b in balls) {
    balls[b].run();

    if (balls[b].isNear(mouseX, mouseY)) {
      balls.splice(b, 1);
    }
  }
}let turn = 0;
let flowers = [];
let d = 7

function setup() {
  createCanvas(600, 600);
  for (i = 0; i < 10; i++) {
    //  constructor(x, y, k, tspeed) 
    flowers.push(new Flower(0, random(width), random(height), random(200), random(7) / 3, 10, 0, random(-3, 3)));
  }
}

function draw() {
  background(0);

  for (let f in flowers) {
    if (flowers[f].isSmall() < 100) {
      flowers[f].runred();
    } else {
      flowers[f].runwhite();
    }
  }
}let turn = 0;
let flowers=[];
let d = 7

function setup() {
  createCanvas(600, 600);
  for (i = 0; i < 10; i++) {
    //  constructor(x, y, k, tspeed) 
    flowers.push(new Flower (random (width), random(height), random (50,100), random(7)/1, 10,0));
  }
}

function draw() {
  background (0);
  for (let f in flowers) {
  flowers[f].run();
  }
}
var n = 3
var d = 2
var k = n / d

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  beginShape();
  noFill();
  strokeWeight(.5);
  angleMode(DEGREES);
  for (var a = 0; a < 360 * 10; a++) {
    var r = 200 * cos(k * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape();
}var angle = 0;
var d1 = 8;
var k1 = 5 / d1;

var d2 = 2;
var k2 = 9 / d2;
  
function setup() {
  createCanvas(400, 600);
}

function mousePressed () {
   background (255);
}

function draw() {

  background(0);

  // DRAW ROSE FROM CENTER
  translate(width / 2, height / 2);
  rotate(angle);
  beginShape();
  noFill();
  strokeWeight(1);
  stroke(0, 0, 255);
  angleMode(DEGREES);
  for (var a = 0; a < 360 * d1; a++) {
    // for (var a = 0; a < TWO_PI; a += .01) {
    var r = 200 * cos(k1 * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape();
  angle = angle + 1;

  // DRAW ROSE FROM CENTER

  rotate(angle);
  beginShape();
  noFill();
  strokeWeight(1);
  stroke(255, 0, 0);
  angleMode(DEGREES);
  for (var a = 0; a < 360 * d2; a++) {
    // for (var a = 0; a < TWO_PI; a += .01) {
    var r = 150 * cos(k2 * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape();
  angle = angle + 1;
  
 var n = 5;
  if (frameCount % n == 0) {
    background(50);
  }
}
var d = 8
var k = 3 / d

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  k= map(mouseX, 0, width, 1, 8);
  
  // DRAW ROSE FROM CENTER
  translate(width / 2, height / 2);
  beginShape();
  noFill();
  strokeWeight(.5);
  angleMode(DEGREES);
  for (var a = 0; a < 360 * d; a++) {
    // for (var a = 0; a < TWO_PI; a += .01) {
    var r = 200 * cos(k * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape();
  
  beginShape();
  noFill();
  strokeWeight(.5);
  angleMode(DEGREES);
  for (var a = 0; a < 360 * d; a++) {
    // for (var a = 0; a < TWO_PI; a += .01) {
    var r = 100 * cos(k * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape();
  

  // DRAW SLIDE
  translate(-width / 2, -height / 2);
  line(0, 380, width, 380);
  fill(0);

  // K SLIDE
  rect(mouseX, 370, 20, 20);
  if (mouseX > width-40) {
    rect(width - 20, 370, 20, 20);
    mouseX = width;
  }
}var n = 8
var d = 1
var k = n / d

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  d = map(mouseY, 0, height, 1, 8);
  n = map(mouseX, 0, width, 1, 8);

  // DRAW ROSE FROM CENTER
  translate(width / 2, height / 2);
  beginShape();
  noFill();
  strokeWeight(.5);
  angleMode(DEGREES);
  for (var a = 0; a < 360 * d; a++) {
    // for (var a = 0; a < TWO_PI; a += .01) {
    var r = 200 * cos(k * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape();

  // DRAW SLIDE
  translate(-width / 2, -height / 2);

  //line(
  line (0,mouseY, mouseX,mouseY);
  line (mouseX,height, mouseX,mouseY);
  
  fill(0);

  // N SLIDE
  rectMode (CENTER);
  rect(0, mouseY, 20, 20);

  // K SLIDE
  rect(mouseX, 400, 20, 20);


}let chas = [];
let bubbles = [];
let x = 0;
let y = 0;
let r = 0;

function preload() {
  for (let i = 0; i < 4; i++) {
    chas[i] = loadImage('cha'+i+'.png');
  }
}

function setup() {
  createCanvas(800,800);
  for (let i = 0; i < 2000; i++) {
    let cha = random(chas);
    x = random(-20,width);
    y = random(-20,height);
    r = random(50, 80);
    b = new Bubble(x, y, r, cha);
    bubbles.push(b);
  }
}

function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked(mouseX, mouseY);
  }
}

function draw() {
  background(255, 81, 162);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r, img) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.cha = img;
  }
  clicked(cx, cy) {
    if (dist(cx, cy, this.x, this.y) < r) 
    if (cx > this.x && cx < this.x+this.r && cy >this.y && cy < this.y +this.r){
      this.cha = random(chas);
      console.log("bubble is clicked");
    }
  }
  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }
  show() {
    stroke(255);
    strokeWeight(5);
    image(this.cha, this.x, this.y, this.r , this.r );
    //image (iceCream,this.x,this.y, this.r*2,this.r*2);
    // ellipseMode(CENTER);
    // ellipse(this.x, this.y, this.r * 2);
  }
}let iceCream;
let donute = [];
let bubbles = [];
let x = 0;
let y = 0;
let r = 0;

function preload (){
  for (let i = 0; i <4; i++){
    cha = loadImage ('cha' + i +'.png');
  }
  iceCream = loadImage('iceCream1.png');
}
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 20; i++) {

    x = random(width);
    y = random(height);
    r = random(30, 50);
    b = new Bubble(x, y, r);
    bubbles.push(b);
  }
}

function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked(mouseX, mouseY);
  }
}

function draw() {
  background(255);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }
  clicked(cx, cy) {
    if (dist(cx, cy, this.x, this.y) < r) {
      this.brightness = 255;
      console.log("bubble is clicked");
    }
  }
  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
  show() {
    fill(this.brightness, 150);
    stroke(255);
    strokeWeight(5);
    image (cha,this.x,this.y, this.r*2,this.r*2);
    //image (iceCream,this.x,this.y, this.r*2,this.r*2);
    // ellipseMode(CENTER);
    // ellipse(this.x, this.y, this.r * 2);
  }
}let iceCream;

function preload() {
  iceCream = loadImage('test/iceCream1.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  image(iceCream, 0, 0, mouseX, mouseY);
}let bubbles = [];
let x = 0;
let y = 0;
let r = 0;

function setup() {

  createCanvas(400, 400);
  for (let i = 0; i < 5; i++) {

    x = random(width);
    y = random(height);
    r = random(30, 50);
    b = new Bubble(x, y, r);
    bubbles.push(b);
  }
}

function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked(mouseX, mouseY);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }
  clicked(cx, cy) {
    if (dist(cx, cy, this.x, this.y) < r) {
      this.brightness = 255;
      console.log("bubble is clicked");
    }
  }
  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
  show() {
    fill(this.brightness, 150);
    stroke(255);
    strokeWeight(5);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.r * 2);
  }
}//Set-up an array
// Declare a variable for the array
let balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    // Create a new ball
    // Store it in the array
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}

function draw() {
  background(220);
  // for (let i = 0; i < balls.length; i++) {
  //     balls[i].run();
  // }
  
  for (let b in balls) {
   balls[b].run(); 
    // If mouse is in the ball then delete it
    // Remove ball that has been moused over
    
    if(balls[b].isNear(mouseX, mouseY)){
      balls.splice(b, 1);
    }
  }
}
function setup() {
  createCanvas(400, 400);
  background(0);
    bubble.show();
  bubble.move();
}

function draw() {
    let x = random(width);
  let y = random(height);
  let r = random(10, 50);

  let b = new Bubble(x, y, r);

}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
  show() {
    ellipse(this.x, this.y, this.r * 2);
  }
}let bubbles = [];

// let bubble1;
// let bubble2;

function setup() {
  createCanvas(400, 400);
  // for (let i = 0; i < 100; i++) {
  //   let x = random (width);
  //   let y = random (height);
  //   let d = random (10,40);
  //   //let x = 10+10*i;
  //   bubbles[i] = new Bubble(x, y, d);
  // }
}

function mouseDragged() {
  let r = random(10, 50);
  let b = new Bubble(mouseX, mouseY, r);
  bubbles.push(b); // push value to array 
}

function draw() {
  background(0);
  // for every bubble of the bubble array
  // use this when you don't need a counter
  // use when want to apply to everything
  // unicorn is just a word that stands in for every array
  for (let unicorn of bubbles) {
      unicorn.move();
      unicorn.show();
    }
  }

  class Bubble {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
    }
    move() {
      this.x = this.x + random(-1, 1);
      this.y = this.y + random(-1, 1);
    }
    show() {
      ellipse(this.x, this.y, this.r * 2);
    }
  }let bubbles = [];

// let bubble1;
// let bubble2;

function setup() {
  createCanvas(400, 400);
  // for (let i = 0; i < 100; i++) {
  //   let x = random (width);
  //   let y = random (height);
  //   let d = random (10,40);
  //   //let x = 10+10*i;
  //   bubbles[i] = new Bubble(x, y, d);
  // }
}

function mouseDragged () {
  let r = random(10,50);
  let b = new Bubble (mouseX, mouseY,r);
  bubbles.push(b); // push value to array 
}
function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
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
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
  show() {
    ellipse(this.x, this.y, this.r * 2);
  }
}let bubbles = [];

// let bubble1;
// let bubble2;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 1000; i++) {
    let x = random (width);
    let y = random (height);
    let d = random (10,40);
    //let x = 10+10*i;
    bubbles[i] = new Bubble(x, y, d);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
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
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
  show() {
    noStroke();
    fill(150, 10)
    ellipse(this.x, this.y, this.r * 2);
  }
}var sizes = [0,10,20,30];
var index = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  noFill();
  for (index = 0; index<4; index = index +1) {
  ellipse (sizes[index]*15, 200, sizes[index],sizes[index]);
  }
}var grey = [50,100,150,200,220]
var index = 0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(grey [index]);
}

function mousePressed (){
index = index +1;
	if (index == grey.length) {
	index = 0;
	}
}
let ball1;
let ball2;

function setup() {
  createCanvas(600, 400);
  ball1 = new Ball (0, 0, 4, 4);
   ball2 = new Ball (300, 200, 4, 4);
}

function draw() {
  background(0);
  ball1.move();
  ball1.bounce();
  ball1.display();
   ball2.move();
  ball2.bounce();
  ball2.display();
}


class Ball {
  constructor(x, y, xspeed, yspeed) {
    this.x = x
    this.y = y
    this.xspeed = xspeed
    this.yspeed = yspeed
  }
  move() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }
  bounce() {
    if (this.x >= width || this.x <= 0) {
      this.xspeed = this.xspeed * -1
    }
    if (this.y >= height || this.y <= 0) {
      this.yspeed = this.yspeed * -1
    }
  }
  display() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, 24, 24);
  }
}var colNum;
var rowNum;
var colW;
var rowH;
var shade;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  colNum = 10;
  rowNum = 5;
  colW = width / colNum
  rowH = height / rowNum

  background(220);
  for (colNum = 0; colNum <= width; colNum = colNum + colW) {
    for (rowNum = 0; rowNum <= height; rowNum = rowNum + rowH) {
      fill(255);
      rect(colNum, rowNum, colW, rowH);
      if (mouseX > colNum && mouseX < colNum + colW && mouseY > rowNum && mouseY < rowNum + rowH) {
        shade = map(mouseX, 0, width, 0, 255);
        fill(shade);
        rect(colNum, rowNum, colW, rowH);
      }
      // rect(colNum, rowNum, colW, rowH);
      // line (colNum, 0, colNum, height);
      // line (0, rowNum, width, rowNum);
    }
  }
}let on = false;
let Pushbutton = new pushbutton(300, 650, 150, 50, 0, on);
let Pattern = new pattern(0, 0, 60);

var r = 60; //radius
var s = 20; //framerate

function setup() {
  createCanvas(600, 700);
  noStroke();
  fill(237, 236, 218);
  rect(0, 0, width, height);
  for (i = 0; i < 10; i++) { //drawthebackgroud
    drawBG();
  }
}

function draw() {
  Pushbutton.run();
}


function drawBG() {
  for (y = 0; y < 600; y += r) {
    for (x = 0; x < windowWidth; x += r) {
      Pattern.run();
    }
  }
}

function mousePressed() {
  if (mouseX >= 225 && mouseX <= 375 && mouseY >= 625 && mouseY <= 675) {
    on = !on;
  }
}let bubble1;
let bubble2;

function setup() {
  createCanvas(400, 400);
  bubble1 = new Bubble(100,100,4);
  bubble2 = new Bubble(300,300,10);
  // print(bubble.x, bubble.y);
}

function draw() {
  background(220);
  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show();
}

class Bubble {
  constructor(x,y,r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  move() {
    this.x = this.x + random(-1,1);
    this.y = this.y + random(-1,1);
  }
  show() {
    ellipse(this.x, this.y, this.r*2);
  }
}let refresh = true;
let Pushbutton = new pushbutton(225, 625, 150, 50, 0, refresh);
let Pattern = new pattern(0,0,60);

var r = 40; //radius

function setup() {
  createCanvas(600, 700);
  noStroke();
  fill(237, 236, 218);
  rect(0, 0, width, height);
  for (i = 0; i < 10; i++) { //drawthebackgroud
    drawBG();
  }
}

function draw() {
Pushbutton.run();
}


function drawBG() {
  for (y = 0; y < 600; y += r) {
    for (x = 0; x < windowWidth; x += r) {
      Pattern.run();
    }
  }
}


function setup() {
  var km = milesToKm(26.3);
  var km2 = milesToKm(100);
  var km3 = milesToKm(40);
      print(km, km2, km3);
}

function milesToKm(miles) {
  var km = miles * 1.6;
  return km;
  
}var ball = {
  x: 300,
  y: 200,
  xspeed: 4,
  yspeed: 4
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);

  bounce();
  display();
  move();
}

function move() {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;
}

function bounce() {
  if (ball.x >= width || ball.x <= 0) {
    ball.xspeed = ball.xspeed * -1
  }
  if (ball.y >= height || ball.y <= 0) {
    ball.yspeed = ball.yspeed * -1
  }
}

function display() {
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(ball.x, ball.y, 24, 24);
}var x = 0;

function setup() {
  createCanvas(400, 400);
  background(220);
  frameRate (1);
}

function draw() {
  for (x = 0; x <= width; x = x+100){
  ellipse (x, 200,50,50);  
  }
  // if (x < width) {
  // ellipse (x, 200,50,50);  
  // }
  // x = x + 100;
}var on = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  if (on) {
    background('red');
  } else {
    background(0);
  }
  strokeWeight(2);
  rectMode(CENTER);
  stroke(255);
  noFill();
  rect(200, 200, 100, 100);

  if (mouseX >= 150 && mouseX <= 250 && mouseY >= 150 && mouseY <= 250) {
    fill(255, 255, 0);
    rect(200, 200, 100, 100);
  } else {
    noFill();
    rect(200, 200, 100, 100);
  }
}

function mousePressed() {
  if (mouseX >= 150 && mouseX <= 250 && mouseY >= 150 && mouseY <= 250) {
    on = !on;
  }
}var on = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  if (on) {
    background('red');
  } else {
    background(0);
  }
  strokeWeight(2);
  rectMode(CENTER);
  stroke(255);
  noFill();
  rect(200, 200, 100, 100);

  if (mouseX >= 150 && mouseX <= 250 && mouseY >= 150 && mouseY <= 250) {
    fill(255, 255, 0);
    rect(200, 200, 100, 100);
  } else {
    noFill();
    rect(200, 200, 100, 100);
  }
}

function mousePressed() {
  if (mouseX >= 150 && mouseX <= 250 && mouseY >= 150 && mouseY <= 250) {
    on = !on;
  }
}var x = 0;
var y = 0;
var r = 60; //radius
var s = 20; //framerate
var bright0 = 0;
var refresh = false;

function setup() {
  createCanvas(600, 700);
  noStroke();
  for (i = 0; i < 10; i++) {                 //drawthebackgroud
  drawBG();
  }
}

function draw() {
  noStroke();
  frameRate(s);
  if (refresh) {
    drawSemicircle()
    x += r;
    if (x > windowWidth - r / 2) {
      y += r;
      x = 0;
    }
    if (y >= 600 - r / 2) {
      y = 0
    }
  }

  if (mouseX > 225 && mouseX < 375 && mouseY > 625 && mouseY < 675) { //button
    bright0 = 180;
  } else {
    bright0 = 255;
  }

  noStroke();
  fill(237, 236, 218);
  rect(0, 600, 600, 100);
  fill(73, 73, 73, bright0);
  rect(225, 625, 150, 50);
  noFill();
  strokeWeight(2);
  stroke(73, 73, 73);
  rect(225, 625, 150, 50); // button
}

function mousePressed() {
  if (mouseX > 225 && mouseX < 375 && mouseY > 625 && mouseY < 675) {
    fill(73, 73, 73);
    rect(225, 625, 150, 50);
    refresh = !refresh;
  }
}

function chooseColor() {
  if (random(1) > 0.75) {
    fill(237, 236, 218);
  } else if (random(1) > 0.5 && random(1) < 0.75) {
    fill(129, 197, 174);
  } else if (random(1) > 0.25 && random(1) < 0.5) {
    fill(73, 73, 73);
  } else {
    fill(229, 106, 95);
  }
}

function drawSemicircle() {
  if (random(1) > 0.5) {
    chooseColor()
    arc(x + r / 2, y, r, r, 0, PI, CHORD);
    chooseColor()
    arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
  } else {
    chooseColor()
    arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
    chooseColor()
    arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
  }
}

function drawBG() {
  for (y = 0; y < 600; y += r) {
    for (x = 0; x < windowWidth; x += r) {
      drawSemicircle()
    }
  }
}var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 500);
  angleMode(DEGREES);
  noStroke();
  frameRate (1);
}

function draw() {
  background(20);
  
  for (y = 0; y < 400; y = y + 40) {
    for (x = 0; x < width; x = x + 40) {
      var rValue = random(1);
      if (rValue >= 0.75) {
        arc(x, y, 80, 80, 0, 90);
      } else if (rValue < 0.75 && rValue >= 0.5) {
        arc(x + 40, y, 80, 80, 90, 180);
      } else if (rValue < 0.50 && rValue >= 0.25) {
        arc(x + 40, y + 40, 80, 80, 180, 270);
      } else {
        arc(x, y + 40, 80, 80, 270, 360);
      }
    }
  }
}var x = 0;
var y = 0;
var angle = 0;

function setup() {
  createCanvas(400, 500);
  angleMode(DEGREES);
  noStroke();
  background(20);

  for (y = 0; y < 400; y = y + 40) {
    for (x = 0; x < width; x = x + 40) {
      if (random(1) >= 0.75) {
        arc(x, y, 80, 80, 0, 90);
      } else if (random(1) < 0.75 && random(1) >= 0.5) {
        arc(x + 40, y, 80, 80, 90, 180);
      } else if (random(1) < 0.50 && random(1) >= 0.25) {
        arc(x + 40, y + 40, 80, 80, 180, 270);
      } else {
        arc(x, y + 40, 80, 80, 270, 360);
      }
    }
  }
}

function draw() {
  noStroke();
  fill(0);
  rect(0, 400, 400, 100);
  fill(255);
  noFill();
  stroke(255);
  strokeWeight(2);
  line(40, 450, 360, 450);
  fill(255);
  if (mouseX < 20) {
    rect(20, 440, 20, 20);
  }
  if (mouseX > 360) {
    fill(255);
    rect(360, 440, 20, 20);
  }
  if (mouseX >= 20 && mouseX <= 360) {
    rect(mouseX, 440, 20, 20);
  }
}var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noStroke();
  background(20);
  frameRate(10);
}

function draw() {

  if (x < width) {
    for (x = 0; x < width; x = x + 40) {
      if (random(1) >= 0.75) {
        arc(x, y, 80, 80, 0, 90);
      } else if (random(1) < 0.75 && random(1) >= 0.5) {
        arc(x + 40, y, 80, 80, 90, 180);
      } else if (random(1) < 0.50 && random(1) >= 0.25) {
        arc(x + 40, y + 40, 80, 80, 180, 270);
      } else {
        arc(x, y + 40, 80, 80, 270, 360);
      }
    }
  } else {
    x = 0;
    y = y + 40;
  }

  if (y > height) {
    background(20);
    x = 0;
    y = 0;
  }
}var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noStroke();
  background(20);
}

function draw() {
  if (random(1) >= 0.75) {
    arc(x, y, 80, 80, 0, 90);
  } else if (random(1) < 0.75 && random(1) >= 0.5) {
    arc(x + 40, y, 80, 80, 90, 180);
  } else if (random(1) < 0.50 && random(1) >= 0.25) {
    arc(x + 40, y + 40, 80, 80, 180, 270);
  } else {
    arc(x, y + 40, 80, 80, 270, 360);
  }

  x += 40;
  
  if (x > width) {
    x = 0;
    y += 40;
  }
  if (y > height) {
    background(20);
    x = 0;
    y = 0;
  }
}//arc1

var arcX;
var arcY;
var arcW;
var arcH;
var arcStart;
var arcEnd;

//arc2
var arc2;

function setup() {
  createCanvas(600, 400);
  arcX = 40;
  arcY = 40;
  arcW = 40;
  arcH = 40;
  arcStart = random(-45, 135);
  arcEnd = random(135, 315);
}

function draw() {
  noFill();
  background(220);
  angleMode(DEGREES);
  arc(arcX, arcY, arcW, arcH, arcStart, arcEnd);
  
  translate (arcX, arcY);
  rotate (arcStart);
  ellipse (arcX, arcY, 3);
  
  translate(0, 0);

  arc(arcX + 20, arcY, arcW, arcH, arcEnd, arcStart);
  arc(arcX + 40, arcY, arcW, arcH, arcStart, arcEnd);

  arcStart = arcStart + 1; 
  arcEnd = arcEnd + 2;
}function setup() {
  createCanvas(600, 400);
}

function draw() {
  var n = width / 10
  background(220);
  for (var x = 0; x <= width; x = x + n) {
    line(x, 0, x, height);

    if (mouseX > x && mouseX < x + n) {
      fill(255, 0, 0);
      rect(x, 0, n, height);
    }
    }
  }function setup() {
  createCanvas(600, 400);
}

function draw() {
  var n = width / 10
  background(220);
  for (var x = 0; x <= width; x = x + n) {
    line(x, 0, x, height);

    if (mouseX > x && mouseX < x + n && x < width/2) {
      fill(255, 0, 0);
      rect(x, 0, n, height);
      } else if (mouseX > x && mouseX < x + n && x >= width/2){
        fill (0,0,255);
        rect(x, 0, n, height);
      }
    }
}function setup() {
  createCanvas(600, 400);
}

function draw() {
  var n = width / 10
  background(220);
  for (var x = 0; x <= width; x = x + n) {
    line(x, 0, x, height);

    if (mouseX > x && mouseX < x + n && x != width /10 * 6) {
      fill(255, 0, 0);
      rect(x, 0, n, height);
      }
    }
}let x = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255);
  block = width / 10;
  stroke(0);

  for (n = 0; n < width / block; n++) {
    x = n * block
    line(x, 0, x, height);

    if (mouseX > x && mouseX < (x + block) && (x != 360)) {
      fill(255, 0, 0);
      rect(x, 0, block, height);
    }
  }

}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  for (let i = 0; i < 10; i=i+1) {
    let x = i * width/10;
    line(x, 0, x, height);
  }
}let rightIsOn = false;

function setup() {
  createCanvas(600, 400);
  rect(0, 0, 1 / 3 * width, height);
  rect(1 / 3 * width, 0, 1 / 3 * width, height);
  rect(2 / 3 * width, 0, 1 / 3 * width, height);

}

function draw() {
  background(220);

  if (rightIsOn) {
    fill(255, 0, 0);
    rect(2 / 3 * width, 0, 1 / 3 * width, height);
  }

  if (mouseX > 0 * width && mouseX < 1 / 3 * width) {
    fill(255, 0, 0);
    rect(0, 0, 1 / 3 * width, height);
  } else if (mouseX > 1 / 3 * width && mouseX < 2 / 3 * width) {
    fill(255, 0, 0);
    rect(1 / 3 * width, 0, 1 / 3 * width, height);
  } else {
    fill(255, 0, 0);
    rect(2 / 3 * width, 0, 1 / 3 * width, height);
  }
}

function mousePressed() {
  if (mouseX > 2 / 3 * width) {
    rightIsOn = !rightIsOn;
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // draw a circle in the middle of the canvas
  // move circle to the right of the canvas until it hits the edge
  // make the circle turn around
  // move in the opposite direction until it hits the left edge
  // make the circle turn around and do the same thing
}var x;
var y;
var arcW;
var arcH;
var piStart;
var piEnd;

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  frameRate (3);
}

function draw() {
  wiggle = random(-90,+90);
  x = 50;
  y = 50;
  arcW = 80;
  arcH = 80;
  piStart = 180;
  piEnd = 0;

  noStroke();
  fill (random(255),random(255),255, 30);
  arc(x, y, arcW, arcH, piStart+wiggle, piEnd+wiggle);
  
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  var x = width / 2;
  var y = height / 2;


  background(220);
  strokeWeight(1)
  rectMode(CENTER);
  rect(x-dist(x, y, mouseX, mouseY), y, width / 2, height / 2);

  dist(x, y, mouseX, mouseY)-1;

}var x1
var x2
var y1
var y2

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  strokeWeight(1)
  rectMode(CENTER);
  rect(width / 2, height / 2, width / 2, height / 2);

  x1 = width / 4
  x2 = width / 4 * 3
  y1 = height / 4
  y2 = height / 4 * 3

  strokeWeight(10);
  beginShape(POINTS);
  vertex(x1, y1);
  vertex(x2, y1);
  vertex(x1, y2);
  vertex(x2, y2);
  endShape();
  
  rect ();
  dist ();
}var x = 200;
var y = 200;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipseMode(CENTER);

  //move to right
  //ellipse (x, height/2, 30,30);
  //x = x + 10;

  //move to top left
  //ellipse (x, y, 30,30);
  //x = x-10;
  //y = y-10;

  //move to top right
  //ellipse (x, y, 30,30);
  //x = x+10;
  //y = y-10;

  //move to bottom left
  //ellipse (x, y, 30,30);
  //x = x-10;
  //y = y+10;

  //move to bottom right
  ellipse(x, y, 30, 30);
  x = x + 10;
  y = y + 10;

}var x = 0
var speed = 3

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(x, 200, 50, 50);

  if (x > width) {
    speed = -3;

  }
  x = x + speed

  if (x < 0) {
    speed = +3
    x = x + speed;
  }
}var x1
var x2
var y1
var y2

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  strokeWeight(1)
  rectMode(CENTER);
  rect(width / 2, height / 2, width / 2, height / 2);

  x1 = width / 4
  x2 = width / 4 * 3
  y1 = height / 4
  y2 = height / 4 * 3

  strokeWeight(10);
  beginShape(POINTS);
  vertex(x1, y1);
  vertex(x2, y1);
  vertex(x1, y2);
  vertex(x2, y2);
  endShape();
}var rvalue;
var bvalue;

function setup() {
  createCanvas(400, 400);
  background(random(150,255));

}

function draw() {
  noStroke();

  var v0 = createVector(0, 0);

  fill(0);
  var v1 = createVector(200, 0);
  ellipse(200, 200, 10, 10);

  fill(0,50)
  var v2 = createVector(mouseX - 200, mouseY - 200);
  ellipse(mouseX, mouseY, random(5,15));

  var angle = v1.angleBetween(v2);
  // angle is PI/2
  print(angle);

  if (mouseY < 200) {
    rvalue = map(angle, 0, 3.14, 0, 255);
    fill(rvalue, 0, 255,50);
    ellipse(200, 200, random(100,320), random(100,320));
  }


  if (mouseY >= 200) {
    bvalue = map(angle, 0, 3.14, 0, 255);
    fill(255, 0, bvalue,50 );
    ellipse(200, 200, random(100,320), random(100,320));

  }

  // blink = random(10, 30);
  fill(0);
  ellipse(200, 200, random(80,100), random(80,100));
  ellipse(mouseX, mouseY, 10);

  stroke(0);
  strokeWeight(2);
  line(200, 200, mouseX, mouseY);

  ellipseMode(CENTER);

  noStroke();
  fill(0, 0, 255);
  ellipse(375, 180, 20, 20);

  noStroke();
  fill(255, 0, 0);
  ellipse(375, 220, 20, 20);

  noStroke();
  fill(255, 0, 255);
  ellipse(25, 200, 20, 20);

}

function mouseClicked() {
  background(random(150,255));
}var rvalue;
var bvalue;
var nbg;
var pbg;

function setup() {
  createCanvas(400, 400);
  background(random(150,255));

}

function draw() {
  noStroke();

  var v0 = createVector(0, 0);

  fill(0);
  var v1 = createVector(200, 0);
  ellipse(200, 200, 10, 10);

  var v2 = createVector(mouseX - 200, mouseY - 200);
  ellipse(mouseX, mouseY, 10, 10);

  var angle = v1.angleBetween(v2);
  // angle is PI/2
  print(angle);

  if (mouseY < 200) {
    rvalue = map(angle, 0, 3.14, 0, 255);
    fill(rvalue, 0, 255);
    ellipse(200, 200, 300, 300);
  }


  if (mouseY >= 200) {
    bvalue = map(angle, 0, 3.14, 0, 255);
    fill(255, 0, bvalue);
    ellipse(200, 200, 300, 300);

  }

  // blink = random(10, 30);
  fill(0);
  ellipse(200, 200, 10);
  ellipse(mouseX, mouseY, 10);

  stroke(0);
  strokeWeight(2);
  line(200, 200, mouseX, mouseY);

  ellipseMode(CENTER);

  noStroke();
  fill(0, 0, 255);
  ellipse(375, 180, 20, 20);

  noStroke();
  fill(255, 0, 0);
  ellipse(375, 220, 20, 20);

  noStroke();
  fill(255, 0, 255);
  ellipse(25, 200, 20, 20);
  
  if (background < 255) {
    nbg = nbg+1
    background (nbg);
  }
  


}

function mouseClicked() {
  background(random(150,255));
}var rvalue;
var bvalue;

function setup() {
  createCanvas(400, 400);
  background(random(150,255));

}

function draw() {
  noStroke();

  var v0 = createVector(0, 0);

  fill(0);
  var v1 = createVector(200, 0);
  ellipse(200, 200, 10, 10);

  var v2 = createVector(mouseX - 200, mouseY - 200);
  ellipse(mouseX, mouseY, 10, 10);

  var angle = v1.angleBetween(v2);
  // angle is PI/2
  print(angle);

  if (mouseY < 200) {
    rvalue = map(angle, 0, 3.14, 0, 255);
    fill(rvalue, 0, 255);
    ellipse(200, 200, 300, 300);
  }


  if (mouseY >= 200) {
    bvalue = map(angle, 0, 3.14, 0, 255);
    fill(255, 0, bvalue);
    ellipse(200, 200, 300, 300);

  }

  // blink = random(10, 30);
  fill(0);
  ellipse(200, 200, 10);
  ellipse(mouseX, mouseY, 10);

  stroke(0);
  strokeWeight(2);
  line(200, 200, mouseX, mouseY);

  ellipseMode(CENTER);

  noStroke();
  fill(0, 0, 255);
  ellipse(375, 180, 20, 20);

  noStroke();
  fill(255, 0, 0);
  ellipse(375, 220, 20, 20);

  noStroke();
  fill(255, 0, 255);
  ellipse(25, 200, 20, 20);

}

function mouseClicked() {
  background(random(150,255));
}var col1;
var col2;
// var blink;

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(0);

  noStroke();
  //fill(255);
  //ellipse(200, 200, 300, 300);

  var v0 = createVector(0, 0);

  fill(0);
  var v1 = createVector(200, 0);
  ellipse(200, 200, 10, 10);

  var v2 = createVector(mouseX - 200, mouseY - 200);
  ellipse(mouseX, mouseY, 10, 10);

  var angle = v1.angleBetween(v2);
  // angle is PI/2
  print(angle);

  //col = map(angle, 0, 3.14, 0, 255);
  
  if (mouseY < 200) {
  }
  col1 = map(angle, 0, 3.14, 0, 255);
  fill (col1, 0, 255);
  ellipse(200, 200, 300, 300);
  
  
  
  if (mouseY >= 200) {
  col1 = map(angle, 0, 3.14, 0, 255);
    fill (255, 0, col2);
  ellipse(200, 200, 300, 300);
    
  }

  noStroke();
  fill(col);
  ellipse(200, 200, 300, 300);

  // blink = random(10, 30);
  fill(0)
  ellipse(200, 200, 10);
  ellipse(mouseX, mouseY, 10);

  stroke(0);
  strokeWeight(2);
  line(200, 200, mouseX, mouseY)


}//var circleX = 1

var circleX ={
  x: 0,
  y : 100,
  diameter:50,
};

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);
	ellipse(circleX.x, circleX.y, circleX.diameter, circleX.diameter);
	circleX.x = circleX.x + 1

}let cx, cy, hw, hh
let lx, rx, ty, by

function setup() {
  createCanvas(600, 400);
}

function draw() {
  //createCanvas(frameCount, frameCount);
  
  cx = width/20
  cy = height / 20
  hw = width/2 
  hh = height / 2

  lx = (hw - cx);
  rx = (hw + cx);
  ty = (hh - cy);
  by = (hh+ cy);

  background(220);
  //rectMode(CENTER);
  //fill(100);
  line(lx, ty, rx, ty);
  line(rx, ty, rx, by);
  line(rx, by, lx, by);
  line(lx, by, lx, ty);
  
  //rect(width / 2, height / 2, .1 * width, .1 * height);
}function setup() {
  createCanvas(480, 360);
}

function draw() {
  translate(width, height);
  rotate(TWO_PI / 2);


  background(255, 232, 64);


  // body
  fill(255);
  ellipse(240, 610, 600, 600);

  //hair
  noStroke();
  fill(0);
  rectMode(CENTER);
  rect(240, 40, 320, 300, 50);

  // face
  fill(224, 195, 150);
  noStroke();
  ellipse(240, 170, 280, 280);

  // neck
  fill(224, 195, 150);
  rect(240, 300, 80, 90, 30);

  // eyes
  fill(255);
  stroke(60, 40, 15);
  strokeWeight(5);
  ellipse(180, 180, 40, 45);
  ellipse(300, 180, 40, 45);

  fill(255);
  stroke(60, 40, 15);
  strokeWeight(10);
  ellipse(165, 185, 15, 15);
  ellipse(310, 165, 15, 15);

  // glasses

  fill(255, 120);
  stroke(255);
  strokeWeight(2);
  line(120, 140, 360, 140);
  arc(180, 140, 120, 90, TWO_PI, PI);
  arc(300, 140, 120, 90, TWO_PI, PI);

  fill(0);
  ellipse(140, 150, 15, 15);
  ellipse(220, 150, 15, 15);
  ellipse(260, 150, 15, 15);
  ellipse(340, 150, 15, 15);

  stroke(0);
  strokeWeight(5);
  line(220, 150, 260, 150);
  noFill();
  arc(140, 120, 100, 60, HALF_PI, PI + HALF_PI);
  arc(340, 120, 100, 60, PI + HALF_PI, HALF_PI);

  // mouth

  fill(0);
  ellipse(240, 250, 100, 80)
  fill(220, 40, 100);
  noStroke();
  ellipse(240, 270, 50, 30)

  // fringe
  noStroke();
  fill(0);


  fill(0);
  arc(320, 20, 300, 150, QUARTER_PI, PI);
  fill(0);
  arc(100, 20, 300, 150, TWO_PI, HALF_PI);

  // scream

  fill(255, 70, 0, 150)
  quad(240, 270, 0, 135, 0, 240, 240, 270);
  fill(255, 133, 0, 120)
  quad(240, 270, 0, 360, 0, 240, 240, 270);
  fill(255, 70, 0, 150)
  quad(240, 270, 0, 450, 0, 360, 240, 270);

  fill(255, 70, 480, 150)
  quad(240, 270, 480, 135, 480, 240, 240, 270);
  fill(255, 133, 480, 120)
  quad(240, 270, 480, 360, 480, 240, 240, 270);
  fill(255, 70, 480, 150)
  quad(240, 270, 480, 450, 480, 360, 240, 270);


}function setup() {
  createCanvas(480, 360);
}

function draw() {
  background(45, 255, 255);

  // red line
  stroke(255, 0, 0);
  strokeWeight (30);
  line(0, 0, 480, 360);


  // green ellipse
  fill(30, 200, 30);
  noStroke();
  ellipse(240, 180, 240, 180);


  // blue rec
  fill(0, 0, 150)
  noStroke();
  rect(330, 150, 30, 30)

}function setup() {
  createCanvas(400, 400);
  background (1);
}

function draw() {
  ellipseMode(CENTER);
  fill(20, 255, 195);
  ellipse (200,200, 100, 100);
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
}