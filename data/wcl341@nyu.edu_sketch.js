function setup() {
  noCanvas();
  emotionContent = createDiv();
  emotionContent.addClass('content');
  
  reasonAlign = createDiv();
  reasonAlign.parent(emotionContent);
  reasonAlign.attribute('align', 'center');
  reason = createInput('Please share with me in one sentence.');
  reason.size(800, 70);
  reason.style('font-size', '32px');
  reason.style('text-align', 'center');
  reason.parent(reasonAlign);
  
  submitAlign = createDiv();
  submitAlign.addClass('flex-container');
  submitAlign.attribute('align', 'center');
  submit = createA('https://editor.p5js.org/wcl341@nyu.edu/full/SkHqvy3sm', 'Check out how others feel');
  submit.style('text-decoration', 'none');
  submit.addClass('flex-item');
  submit.parent(submitAlign);
}

function draw() {}// function setup() {
//   noCanvas();
//   emotionContent = createDiv();
//   emotionContent.addClass('content');

//   for (let x = 0; x < 4; x++) {
//     for (let y = 0; y < 3; y++) {
//       emotionButton = createElement('div', 'Joyful');
//       emotionButton.parent(emotionContent);
//       emotionButton.style('padding', '80px');
//       emotionButton.style('float', 'left');
//       emotionButton.style('background', 'red');
//     }
//   }
// }

// function draw() {}let guidance_m, guidance_f, capacitance;
let guidanceCanPlay = false;

function preload() {
  guidance_m = loadSound('Nick_v2.mp3');
  guidance_f = loadSound('Maya_v2.mp3');
}

function setup() {
  noCanvas();
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem14401");
  serial.on('data', gotData);
}

function draw() {
  if (capacitance == 1) {
    if (guidanceCanPlay) {
      if (int(random(2)) == 1){
      guidance_m.play();
      } else {
      guidance_f.play();
      }
      guidanceCanPlay = false;
    }
  } else {
    guidanceCanPlay = true;
    guidance_m.pause();
    guidance_f.pause();
  }
}

function gotData() {
  let currentString = serial.readStringUntil("\r\n"); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  //console.log(currentString); // println the string
  capacitance = currentString; // save it for the draw method
}let door;
let door2;
let trick;
let treat;
let serial;
let distance = "waiting for data";
let state = "waiting for data";
let doorCanPlay = false;
let stateCanPlay = false;

function preload() {
  door = loadSound('door.mp3');
  door2 = loadSound('door2.mp3');
  treat = loadSound('treat.mp3');
  trick = loadSound('trick.mp3');
}

function setup() {
  createCanvas(400, 400);
  //trick.loop();

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
  serial.on('data', gotData);
  // setInterval(function() {
  //   console.log("HELLO");
  //   serial.write(1);
  // }, 1000);


}


function draw() {
  if (distance > 30) {
    if (doorCanPlay) {
      door.play();
      doorCanPlay = false;
    }
  } else {
    doorCanPlay = true;
    
  }
  if (distance < 30) {
    door.pause();
  }
  
  print(distance);

  if (state == 0) {
    if (stateCanPlay) {
      treat.loop();
      stateCanPlay = false;
    }
  } else if (state == 1) {
    if (stateCanPlay) {
      trick.loop();
      stateCanPlay = false;
    }
  } else if (state == 2) {
    stateCanPlay = true;
    treat.pause();
    trick.pause();
  }


  console.log(state)
}

function gotData() {
  let currentString = serial.readStringUntil("\r\n"); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  //console.log(currentString); // println the string
  var sensorReadings = split(currentString, ",");
  if (sensorReadings.length > 1) {
    distance = int(sensorReadings[0]); // save it for the draw method
    state = int(sensorReadings[1]);
  }
}let video, stronger, fft, sliderCol, toggle;
let vScale = 21;

function preload() {
  stronger = loadSound('kelly-clarkson-stronger-what-doesnt-kill-you.mp3');
}

function setup() {
  createCanvas(640, 480);
  toggle = createButton('Pause');
  toggle.style('display', 'block');
  toggle.style('margin-right', 'auto');
  toggle.style('margin-left', 'auto');
  toggle.mousePressed(musicToggle);
  colorChange = createP('Change Color ');
  sliderCol = createSlider(0, 255, 128);
  sliderCol.parent(colorChange);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();

  fft = new p5.FFT();
  stronger.amp(0.8);
  stronger.play();
}

function draw() {
  background(26, 26, 26);
  video.loadPixels();
  loadPixels();
  fft.analyze();
  let strongerTreble = fft.getEnergy("treble");
  let strongerHighMid = fft.getEnergy("highMid");
  let strongerBass = fft.getEnergy("bass");
  let heartSize = map(strongerBass, 0, 255, 0, 26)
  // console.log(strongerHighMid);
  noStroke();
  fill(strongerHighMid, strongerHighMid, 200, 80);
  textSize(strongerHighMid * 4);
  push();
  translate(width / 2, 9 * height / 10);
  textAlign(CENTER);
  text('❤', 0, 0);
  pop();
  for (let x = 0; x < video.width; x++) {
    for (let y = 0; y < video.height; y++) {
      let i = (video.width - x - 1 + (y * video.width)) * 4;
      let r = video.pixels[i + 0];
      let g = video.pixels[i + 1];
      let b = video.pixels[i + 2];

      let bright = (r + g + b) / 3;

      let threshold = 90;

      if (strongerTreble < threshold) {
        fill(r + sliderCol.value(), g, b, random(100, 200));
        textSize(heartSize);
        text('❤', x * vScale, y * vScale);
      } else {
        fill(r, g + 75, b + sliderCol.value(), random(100, 200));
        textSize(heartSize);
        text('❤', x * vScale, y * vScale);
      }
    }
  }
}

function musicToggle() {
  if (!stronger.isPlaying()) {
    stronger.play();
    toggle.html('Pause');
  } else {
    stronger.pause();
    toggle.html('Play');
  }
}let squishy;
let balls = [];

function preload() {
  squishy = loadSound("Bir Poop Splat-SoundBible.com-157212383.mp3");
}

function setup() {
  createCanvas(400, 400);
  for (i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let speedx = random(-4, 4);
    let speedy = random(-5, 5);
    let r = random(25, 50);
    let colR = random(180, 255);
    let colG = random(150, 255);
    let colB = random(180, 255);
    balls[i] = new Ball(x, y, speedx, speedy, r, colR, colG, colB);
  }
}

function draw() {
  background(20);
  for (i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].bounce();
    balls[i].display();
  }
}

class Ball {
  constructor(_x, _y, _speedx, _speedy, _r, _colR, _colG, _colB) {
    this.x = _x;
    this.y = _y;
    this.speedx = _speedx;
    this.speedy = _speedy;
    this.r = _r;
    this.colR = _colR;
    this.colG = _colG;
    this.colB = _colB;
  }

  move() {
    this.x += this.speedx
    this.y += this.speedy
  }

  bounce() {
    if (this.x > width || this.x < 0 ) {
      this.speedx = this.speedx * -1;
      squishy.play();
      }
    if (this.y > height || this.y < 0){
      this.speedy = this.speedy * -1;
      squishy.play();
    }
  }

  display() {
    fill(this.colR, this.colG, this.colB);
    ellipse(this.x, this.y, this.r);
  }
}

let video;

let vScale = 8;

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  background(20);
}

function draw() {
  video.loadPixels();
	copy(video, mouseX/vScale, mouseY/vScale, 24/vScale, 24/vScale, mouseX, mouseY, 24, 24);
  noStroke();
  // let px = floor(mouseX / vScale);
  // let py = floor(mouseY / vScale);
  // let col = video.get(px, py);
  // fill(col[0], col[1], col[2], 150);
  noFill();
  ellipse(mouseX/vScale, mouseY/vScale, 24/vScale)

}let img, f;

function preload() {
  img = loadImage('assets/small_statue.png');
}

function setup() {
  createCanvas(313, 547);
  pixelDensity(1);
  // image(img, 0, 0, width, height);
}

function draw() {
  // img.loadPixels();

  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      noStroke();
      col = img.get(x, y);
      fill(col);
      rect(x, y, 10, 10);
    }
  }

  updatePixels();

}function setup() {
  let img = createImage(100, 100);
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      img.set(x, y, color(random(255), random(255), random(255)));
    }
  }
  img.updatePixels();
  image(img, 0, 0);
}let adjective, music, button, coolGenre, coolName;
let genreData = [];
let adjectiveData = [];
let crazy = 1;
let r, g, b;

function preload() {
  genreData = loadJSON('genres.json');
  adjectiveData = loadJSON('adj.json');


}

function setup() {
  console.log('loading json data');


  createCanvas(600, 400);
  // noCanvas();

  button = createButton('Give me some coooooool NAMEE for my Music');
  button.mousePressed(giveName);
  // coolGenre = createP (adjective + ' ' + music);

  // print(data);
}

function draw() {
  background(r, g, b, 100);
  music = genreData.genres[floor(random(genreData.genres.length))];
  adjective = adjectiveData.adjs[floor(random(adjectiveData.adjs.length))];
  fill(255);
  textSize(26);
  text(coolName, (width / 4) + (random(crazy)), (height / 3) + (random(crazy)));

}

function processGenre(genres) {

  genreData = genres;
  console.log('genre done');

  console.log(genreData);
}

function processAdj() {
  console.log('adj done');
}

function giveName() {
  coolName = (adjective + ' ' + music);
  r = random(255); 
  g = random(255); 
  b = 0;
  crazy++;

  // coolGenre.html (adjective + ' ' + music);

}var balls = [];
let feeling, emotion, movement;

function preload() {
  feeling = loadJSON("emotion.json", gotData);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(feeling);
  emotion = emotionInfo.emotion;
  for (let a = 0; a < emotion[0].reason.length; a++) {
    let xa = random(width);
    let ya = random(height);
    let speedxa = random(-0.4, 0.4);
    let speedya = random(-0.5, 0.5);
    balls.push(new Ball(xa, ya, speedxa, speedya, 25, 255, 153, 0, emotion[0].name, emotion[0].reason[a]));
  }
  for (let b = 0; b < emotion[1].reason.length; b++) {
    let xb = random(width);
    let yb = random(height);
    let speedxb = random(-0.4, 0.4);
    let speedyb = random(-0.5, 0.5);
    balls.push(new Ball(xb, yb, speedxb, speedyb, 35, 255, 204, 0, emotion[1].name, emotion[1].reason[b]));
  }
  for (let c = 0; c < emotion[2].reason.length; c++) {
    let xc = random(width);
    let yc = random(height);
    let speedxc = random(-0.4, 0.4);
    let speedyc = random(-0.5, 0.5);
    balls.push(new Ball(xc, yc, speedxc, speedyc, 45, 51, 204, 51, emotion[2].name, emotion[2].reason[c]));
  }
  for (let d = 0; d < emotion[3].reason.length; d++) {
    let xd = random(width);
    let yd = random(height);
    let speedxd = random(-0.4, 0.4);
    let speedyd = random(-0.5, 0.5);
    balls.push(new Ball(xd, yd, speedxd, speedyd, 55, 51, 204, 255, emotion[3].name, emotion[3].reason[d]));
  }
  for (let e = 0; e < emotion[4].reason.length; e++) {
    let xe = random(width);
    let ye = random(height);
    let speedxe = random(-0.4, 0.4);
    let speedye = random(-0.5, 0.5);
    balls.push(new Ball(xe, ye, speedxe, speedye, 65, 153, 51, 255, emotion[4].name, emotion[4].reason[e]));
  }
  for (let f = 0; f < emotion[5].reason.length; f++) {
    let xf = random(width);
    let yf = random(height);
    let speedxf = random(-0.4, 0.4);
    let speedyf = random(-0.5, 0.5);
    balls.push(new Ball(xf, yf, speedxf, speedyf, 75, 255, 0, 102, emotion[5].name, emotion[5].reason[f]));
  }
}

function draw() {

  background(20);
  for (a = 0; a < balls.length; a++) {
    balls[a].move();
    balls[a].bounce();
    balls[a].display();

    if (balls[a].isTouched(mouseX, mouseY)) {
      balls[a].reasonText();
      balls[a].pause();
    } 
    // else {
    //   balls[a].move();
    //   balls[a].bounce();
    //   balls[a].display();
    // }
  }

  for (b = 0; b < balls.length; b++) {
    balls[b].move();
    balls[b].bounce();
    balls[b].display();

    if (balls[b].isTouched(mouseX, mouseY)) {
      balls[b].reasonText();
      balls[b].pause();
    } 
    // else {
    //   balls[b].move();
    //   balls[b].bounce();
    //   balls[b].display();
    // }
  }

  for (c = 0; c < balls.length; c++) {
    balls[c].move();
    balls[c].bounce();
    balls[c].display();

    if (balls[c].isTouched(mouseX, mouseY)) {
      balls[c].reasonText();
      balls[c].pause();
    } 
    // else {
    //   balls[c].move();
    //   balls[c].bounce();
    //   balls[c].display();
    // }
  }

  for (d = 0; d < balls.length; d++) {
    balls[d].move();
    balls[d].bounce();
    balls[d].display();

    if (balls[d].isTouched(mouseX, mouseY)) {
      balls[d].reasonText();
      balls[d].pause();
    } 
    // else {
    //   balls[d].move();
    //   balls[d].bounce();
    //   balls[d].display();
    // }
  }

  for (e = 0; e < balls.length; e++) {
    balls[e].move();
    balls[e].bounce();
    balls[e].display();

    if (balls[e].isTouched(mouseX, mouseY)) {
      balls[e].reasonText();
      balls[e].pause();
    } 
    // else {
    //   balls[a].move();
    //   balls[e].bounce();
    //   balls[e].display();
    // }
  }

  for (f = 0; f < balls.length; f++) {
    balls[f].move();
    balls[f].bounce();
    balls[f].display();

    if (balls[f].isTouched(mouseX, mouseY)) {
      balls[f].reasonText();
      balls[f].pause();
    } 
    // else {
    //   balls[a].move();
    //   balls[f].bounce();
    //   balls[f].display();
    // }
  }
}

function gotData(data) {
  emotionInfo = data;
}let distance = 200;
let cx;
let cy;
let cr;
let magnifier = 3;
let locationAlt = 75;

function preload() {
  loadJSON("dating.json", gotData);
}

function setup() {
  noCanvas();
  title = createElement('h1', datingInfo.title).style('text-align', 'center');
  ans = datingInfo.response;
  div = createDiv();
  createCanvas(800, 800);
  angleMode(DEGREES);
  cx = width / 2;
  cy = height / 2;
  cr = width * 0.25;
}

function draw() {
  background(50);
  fill(255, 200);
  ellipse(30, 30, 10);
  textAlign(LEFT, BOTTOM);
  text('White', 45, 38);
  fill(153, 102, 51, 200);
  ellipse(30, 60, 10);
  text('Hispanic', 45, 68);
  fill(0, 200);
  ellipse(30, 90, 10);
  text('Black', 45, 98);
  fill(153, 51, 255, 200);
  ellipse(30, 120, 10);
  text('Other', 45, 128);

  for (let i = 0; i < ans.length; i++) {
    let x = cx + cos(i * 360 / ans.length) * cr;
    let y = cy + sin(i * 360 / ans.length) * cr;
    noStroke();
    fill(255, 230, 238, 50);
    ellipse(x, y, 150);

    fill(255, 200);
    ellipse(x, y - locationAlt, ans[i].White * magnifier);
    fill(255);
    // textSize(12);
    // textStyle(NORMAL);
    // text(ans[i].White, x, y - locationAlt * 1.4);

    fill(153, 102, 51, 200);
    ellipse(x + locationAlt, y, ans[i].Hispanic * magnifier);
    fill(102, 51, 0);
    // textSize(12);
    // textStyle(NORMAL);
    // text(ans[i].Hispanic, x + locationAlt * 1.4, y);

    fill(0, 200);
    ellipse(x, y + locationAlt, ans[i].AfricanAmerican * magnifier);
    fill(0);
    // textSize(12);
    // textStyle(NORMAL);
    // text(ans[i].AfricanAmerican, x, y + locationAlt * 1.5);

    fill(153, 51, 255, 200);
    ellipse(x - locationAlt, y, ans[i].Other * magnifier);
    fill(102, 0, 180);
    // textSize(12);
    // textStyle(NORMAL);
    // text(ans[i].Other, x - locationAlt * 1.5, y);

    fill(150);
    textSize(14);
    textStyle(BOLD);
    text(ans[i].answer, x - locationAlt / 1.3, y - locationAlt /2, 120, 80);
    textAlign(CENTER, CENTER);
    // answerT.addClass('p');

    // for (let i = 0; i < ans.length; i++) {
    //   let x = distance + i * distance;
    //   let y = distance + (int(x / width)) * distance;
    //   print(i, int(x / width));
    //   x = x % width;
    //   noStroke();
    //   fill(255, 200);
    //   ellipse(x, y, ans[i].White, ans[i].White);

  }
}

function gotData(data) {
  datingInfo = data;
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}function preload() {
  loadJSON("menu.json", gotData);
}

function setup() {
  noCanvas();
  createElement('h3', 'Appetizer');
  appetizer = menuInfo.appetizer;
  appetizerTr = createDiv();
  appetizerTr.addClass('content');

  for (let i = 0; i < appetizer.length; i++) {
    appetizerTd = createElement('td');
    appetizerTd.parent(appetizerTr);
    appetizerTd.style('padding', '10px');
    appetizerTd.child(createImg(appetizer[i].img).style('width', '250px'));
    appetizerTd.child(createP(appetizer[i].name).style('font-weight', 'bold'));
    sizeTd1 = createDiv(appetizer[i].size[0]);
    sizeTd1.parent(appetizerTd);
    priceTd1 = createDiv("$" + appetizer[i].price[0] + ".00").style('float', 'right');
    priceTd1.parent(sizeTd1);
    
    sizeTd2 = createDiv(appetizer[i].size[1]);
    sizeTd2.parent(appetizerTd);
    priceTd2 = createDiv("$" + appetizer[i].price[1] + ".00").style('float', 'right');
    priceTd2.parent(sizeTd2);
    
  }
}

function gotData(data) {
  menuInfo = data;
}// Get your own API Key @http://developer.nytimes.com
let allWords = [];
let ts = 16; 
let i = 0;

function preload() {
  let q = "trump";
  let apikey = "defd39c05bfd4c6bbe5070dd58e62b6b";
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=" + apikey;
  loadJSON(url, processSnippets); //load data url
}

function setup() {
  createCanvas(800, 800);
  fill(0);
}


function draw() {
  background(255, 5); //Set background with low opacity so the words fade away on the canvas
  ts++; //Text size increases 
  ts %= 48; //Text size increases until 48pt then it starts from 1pt
  if (allWords.length > 0) { //Make sure there is something in the allWords array
    i += 1;
    i %= allWords.length; //Index number for the allWords array increases by 1 until the last object in the array then it starts from 1
    textSize(ts); //Set the text size to be 16pt
    let word = allWords[floor(i)];
    text(allWords[floor(i)], random(width), random(height));
  }
}



function processSnippets(data) {
  let docs = data.response.docs; //store the docs into an array
  console.log(data);

  let putins = ["Putin", "Vladi", "Vlad", "Vova"];
  let trumps = ["Trump", "president", "President"];


  for (let doc of docs) {
    let words = splitTokens(doc.snippet); //split the words in snippet and store them into the words array
    for (let w in words) {
      let word = words[w];
      for (let trump of trumps) {
        if (match(word, trump)) { //check if the objects in trumps array match the word objects
          words[w] = putins[floor(random(putins.length))]; //switch matched word objects to random objects in putins array
          break; //break the matching loop
        }
      }
      shuffle(words, true); //shuffle the words in the words array so that the order is random
    }
    allWords = concat(allWords, words); //concatenate the words array into allWords array
  }
}// Get your own API Key @http://developer.nytimes.com
let allWords = [];
let ts = 16;
let i = 0;

function preload() {
  let q = "trump";
  let apikey = "Get your own API from http://developer.nytimes.com";
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
}let song;
let serial;
let distance = "waiting for data";
let canPlay = false;
// let play = false;

function preload() {
  song = loadSound('door_soundeffect.mp3');
}

function setup() {
  createCanvas(400, 400);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
  serial.on('data', gotData);
  setInterval(function() {
    console.log("HELLO");
    serial.write(1);
  }, 1000);


}


function draw() {
  if (distance > 30) {
    if (canPlay) {
      song.play();
      canPlay = false;
    }
  } else {
    canPlay = true;

  }
  if (distance < 30) {
    song.pause();
  }

  console.log(distance)
}

function gotData() {
  let currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  //console.log(currentString); // println the string
  distance = Number(currentString); // save it for the draw method
}let angle1, angle2;
let diamonds = [];
let serial;
let Num, Col, Siz, Shap;

function setup() {
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
  serial.on('data', gotData);
  createCanvas(600, 600);
  angleMode(DEGREES);
  number = createP('Number ');
  number.style('align', 'center');
  dColor = createP('Color ');
  dColor.style('align', 'center');
  size = createP('Size ');
  shape = createP('Shape ');
  // sliderNum = createSlider(0, 20, 10);
  // sliderNum.parent(number)
  // sliderCol = createSlider(150, 255, 202);
  // sliderCol.parent(dColor);
  // sliderSiz = createSlider(0, 400, 300);
  // sliderSiz.parent(size);
  // sliderSha = createSlider(950, 1050, 1000);
  // sliderSha.parent(shape);
  // reset = createButton('Reset');
  // reset.style('display', 'block');
  // reset.style('margin-left', 'auto');
  // reset.style('margin-right', 'auto');
  // reset.mousePressed(resetSliders);
  for (i = 0; i < 20; i++) {
    let d = new Diamond(random(3 / 2 * width), random(3 / 2 * height), random(width / 2), random(150, 255), random(50, 100), random(150, 255), random(1, 2))
    diamonds.push(d);
  }
}

function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  if (!currentString) return;
  var sensorReadings = split(currentString, ",");
  if (sensorReadings.length > 3) {
    Num = int(sensorReadings[0]);
    Col = int(sensorReadings[1]);
    Siz = int(sensorReadings[2]);
    Shap = int(sensorReadings[3]);
  }
}

function draw() {
  background(20, 30);
  for (d = 0; d < Num; d++) {
    diamonds[d].show();
    diamonds[d].move();

    let overlapping = false;
    for (let other in diamonds) {
      if (diamonds[d] !== diamonds[other] && diamonds[d].intersect(diamonds[other])) {
        overlapping = true;
      }
    }
    if (overlapping) {
      diamonds[d].fillColor();
    } else {
      diamonds[d].show();
    }
  }
}

// function resetSliders() {
//   sliderNum.value(10);
//   sliderCol.value(202);
//   sliderSiz.value(width / 2);
//   sliderSha.value(1000);
// }let txt;
let padding = 50;
let words = [];

function preload() {
  txt = loadStrings("joke.txt");
  console.log(txt);
}

function setup() {
  createCanvas(400, 400);
  for (let l of txt) {
    words = concat(words, splitTokens(l));
  }
  console.log(words);
}

function draw() {
  background(255);
  let x = 10;
  let y = 5 + textAscent() + textDescent();
  for (let i = 0; i < words.length; i++) {
    text(words[i], x, y);
    x += textWidth(words[i]) + textWidth(' ');
    if (x > width - padding) {
      y += textAscent() + textDescent();
      x = 10;
    }
  }
}let angle1, angle2;
let diamonds = [];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  number = createP('Number ');
  number.style('align', 'center');
  dColor = createP('Color ');
  dColor.style('align', 'center');
  size = createP('Size ');
  shape = createP('Shape ');
  sliderNum = createSlider(0, 20, 10);
  sliderNum.parent(number);
  sliderCol = createSlider(150, 255, 202);
  sliderCol.parent(dColor);
  sliderSiz = createSlider(0, width * 2 / 3, width / 2);
  sliderSiz.parent(size);
  sliderSha = createSlider(500, 2000, 1000);
  sliderSha.parent(shape);
  reset = createButton('Reset');
  reset.style('display', 'block');
  reset.style('margin-left', 'auto');
  reset.style('margin-right', 'auto');
  reset.mousePressed(resetSliders);
  for (i = 0; i < 20; i++) {
    let d = new Diamond(random(3 / 2 * width), random(3 / 2 * height), random(width / 2), random(150, 255), random(50, 100), random(150, 255), random(1, 2))
    diamonds.push(d);
  }
}

function draw() {
  background(20, 30);
  for (d = 0; d < sliderNum.value(); d++) {
    diamonds[d].show();
    diamonds[d].move();

    let overlapping = false;
    for (let other in diamonds) {
      if (diamonds[d] !== diamonds[other] && diamonds[d].intersect(diamonds[other])) {
        overlapping = true;
      }
    }
    if (overlapping) {
      diamonds[d].fillColor();
    } else {
      diamonds[d].show();
    }
  }
}

function resetSliders() {
  sliderNum.value(10);
  sliderCol.value(202);
  sliderSiz.value(width / 2);
  sliderSha.value(1000);
}// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(600, 600);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
  serial.on('data', gotData);
  setInterval(function() {
    console.log("HELLO");
    // serial.write(1);
  }, 1000);
  noFill();
  strokeWeight(10);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log("DATA: " + currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function draw() { 
  background(127, 0, 127);
  
  var v = map(latestData, 0, 255, 0, width); 

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  
  v+=random(-5, 5);
  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

}// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
// }function setup() {
  noCanvas();
}var serial;
var bg = 0;

function setup() {
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
	createCanvas(400, 400);
  
  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1441");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
    print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  if (currentString){
    console.log(currentString);
  bg = int(currentString);
  }
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
function draw() {
  background(bg);
}let balls = [];

function setup() {
  createCanvas(400, 400);
  for (i = 0; i < 100; i++) {
    balls[i] = new Ball(random(width), random(height), random(10, 50), random(-5, 5), random(-5, 5), random(50, 200), random(100, 255), random(100, 255));
  }
}

function draw() {
  background(20);
  for (let b in balls) {
    balls[b].show();
    balls[b].move();
    balls[b].bounce();

    let overlapping = false;
    for (let other in balls) {
      if (balls[b] !== balls[other] && balls[b].intersect(balls[other])) {
        overlapping = true;
      }
    }
    if (overlapping) {
      balls.splice(b, 1);
    }
  }
}

class Ball {
  constructor(_x, _y, _r, _xSpeed, _ySpeed, _colr, _colg, _colb) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.xSpeed = _xSpeed;
    this.ySpeed = _ySpeed;
    this.colr = _colr;
    this.colg = _colg;
    this.colb = _colb;
  }

  show() {
    noStroke();
    fill(this.colr, this.colg, this.colb);
    ellipse(this.x, this.y, this.r);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  bounce() {
    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }

    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  intersect(other) {
    return (dist(this.x, this.y, other.x, other.y) < (this.r + other.r) / 2);
  }
}let balls = [];

function setup() {
  createCanvas(400, 400);
  for (i = 0; i < 100; i++) {
    balls[i] = new Ball(random(width), random(height), random(10, 50), random(-5, 5), random(-5, 5), random(50, 200), random(100, 255), random(100, 255))
  }
}

function draw() {
  background(20);
  for (let b in balls) {
    balls[b].show();
    balls[b].move();
    balls[b].bounce();

    if (balls[b].isNear(mouseX, mouseY)) {
      balls.splice(b, 1)
    }
  }
}

class Ball {
  constructor(_x, _y, _r, _xSpeed, _ySpeed, _colr, _colg, _colb) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.xSpeed = _xSpeed;
    this.ySpeed = _ySpeed;
    this.colr = _colr;
    this.colg = _colg;
    this.colb = _colb;
  }

  show() {
    noStroke();
    fill(this.colr, this.colg, this.colb);
    ellipse(this.x, this.y, this.r);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  bounce() {
    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1
    }

    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1
    }
  }

  isNear(mx, my) {
    return dist(mx, my, this.x, this.y) < this.r / 2;
  }
}let balls = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(20);
  for (let b in balls) {
    balls[b].show();
    balls[b].move();
    balls[b].bounce();
  }
}

function mousePressed() {
  let bb = new Ball(mouseX, mouseY, random(10, 50), random(-5, 5), random(-5, 5), random(50, 200), random(100, 255), random(100, 255));
  balls.push(bb);
}

class Ball {
  constructor(_x, _y, _r, _xSpeed, _ySpeed, _colr, _colg, _colb) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.xSpeed = _xSpeed;
    this.ySpeed = _ySpeed;
    this.colr = _colr;
    this.colg = _colg;
    this.colb = _colb;
  }

  show() {
    noStroke();
    fill(this.colr, this.colg, this.colb);
    ellipse(this.x, this.y, this.r);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  bounce() {
    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1
    }

    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1
    }
  }
}function setup() {
  createCanvas(200, 200);
  background(200);
  number1 = createInput('enter a number');
  number1.position(20, 20);
  symbolAdd = createP('+');
  symbolAdd.position(20, 25);
  number2 = createInput('enter a number');
  number2.position(20, 62);
  symbolEqual = createP('=');
  symbolEqual.position(20, 70);
  answer = createP('?');
  answer.position(35, 70);
  button = createButton('Calculate');
  button.position(120, 170);
  button.mousePressed(giveAnswer);

}

function giveAnswer() {
  let ans = add(number1.value(), number2.value());
  answer.html(ans);
}

function add(n1, n2) {
  n1 = int(n1);
  n2 = int(n2);
  return n1 + n2;
}let angle1, angle2;
let diamonds = [];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  for (i = 0; i < 10; i++) {
    let d = new Diamond(random(3 / 2 * width), random(3 / 2 * height), random(width / 2), random(150, 255), random(50, 100), random(150, 255), random(1, 2))
    diamonds.push(d);
  }
}

function draw() {
  background(20, 30);
  for (let d in diamonds) {
    diamonds[d].show();
    diamonds[d].move();

    let overlapping = false;
    for (let other in diamonds) {
      if (diamonds[d] !== diamonds[other] && diamonds[d].intersect(diamonds[other])) {
        overlapping = true;
      }
    }
    if (overlapping) {
      diamonds[d].fillColor();
    } else {
      diamonds[d].show();
    }
  }
}let angleUD, angleLR;
function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(20, 30);
  stroke(255);
  strokeWeight(1)
	angleUD = map(millis(), 0, 2000, 0, 180);
  angleLR = map(millis(), 0, 2000, 90, 270);
  line(mouseX, height/2, width/2, constrain(height * sin(angleUD), 0, height));
  line(mouseX, height/2, width/2, constrain(height * sin(angleUD), 0, height));
  line(width/2, mouseY, constrain(width * cos(angleLR), 0, width), height/2);
  line(width/2, mouseY, constrain(width * cos(angleLR), 0, width), height/2);
  noFill();
  push();
  translate(width/2, height/2);
  rotate(45);
  rect(0, 0, sqrt(sq(width/2) * 2), sqrt(sq(width/2) * 2));
  pop();
}let secondAngle;
let minuteAngle;
let hourAngle;
let time;
let alphabet;
let c, d;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  c = {
    x: width / 2,
    y: height / 2
  }
}

function draw() {
  background(30, 10, 40, 50);
  time = {
    sc: second(),
    mn: minute(),
    hr: hour()
  }
  clock();
  logo();
}
var balls = [];

function setup() {
  createCanvas(600, 400);
  for (i = 0; i < 2; i++) {
    let x = random(width);
    let y = random(height);
    let speedx = random(-4, 4);
    let speedy = random(-5, 5);
    let r = random(25, 50);
    let colR = random(180, 255);
    let colG = random(150, 255);
    let colB = random(180, 255);
    balls[i] = new Ball(x, y, speedx, speedy, r, colR, colG, colB);
  }
}

function draw() {
  
  background(20);
  for (i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].bounce();
    balls[i].display();
  }
}

class Ball {
  constructor(_x, _y, _speedx, _speedy, _r, _colR, _colG, _colB) {
    this.x = _x;
    this.y = _y;
    this.speedx = _speedx;
    this.speedy = _speedy;
    this.r = _r;
    this.colR = _colR;
    this.colG = _colG;
    this.colB = _colB;
  }

  move() {
    this.x += this.speedx
    this.y += this.speedy
  }

  bounce() {
    if (this.x > width || this.x < 0 ) {
      this.speedx = this.speedx * -1;
      }
    if (this.y > height || this.y < 0){
      this.speedy = this.speedy * -1;
    }
  }

  display() {
    fill(this.colR, this.colG, this.colB);
    ellipse(this.x, this.y, this.r);
  }
}let colNum = 10;
let rowNum = 5;
let colW;
let rowH;

function setup() {
  createCanvas(500, 500);
  colW = width / colNum;
  rowH = height / rowNum;
}

function draw() {
  background(220);
  for (let col = 0; col <= colNum; col++) {
    for (let row = 0; row <= rowNum; row++) {
      let x = col * colW;
      let y = row * rowH;
      let d = dist(mouseX, mouseY, x, y);
      d = map(d, 0, dist(0, 0, width, height) / 2, 200, 0)
      // if (mouseX > col * colW && mouseX < (col + 1) * colW && mouseY > row * rowH && mouseY < (row + 1) * rowH) {
      fill(d);
      rect(x, y, colW, rowH);
      // }
    }
  }
}let colNum = 50;
let rowNum = 50;
let colW, rowH;

function setup() {
  createCanvas(800, 800);
  colW = width / colNum;
  rowH = height / rowNum;
}

function draw() {
  background(200);
  for (let col = 0; col <= colNum; col++) {
    for (let row = 0; row <= rowNum; row++) {
      let x = col * colW;
      let y = row * rowH;
      let d = dist(mouseX, mouseY, x, y);
      d = map(d, 0, dist(0, 0, width, height) / 2, 0, 200);
      b = map(d, 0, dist(0, 0, width, height) / 2, 255, 0);
      if ((col % 2 == 1 && row % 2 == 1) || (col % 2 == 0 && row % 2 == 0)) {
        fill(20, d);
      } else {
        fill(255, b);
      }
      rect(x, y, colW, rowH);
    }
  }
}let xn = 10;
let yn = 10;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(20);
  for (x = 0; x <= width; x += width * 2 / xn) {
    for (y = 0; y <= height; y += height * 2 / yn) {
      noStroke();
      fill(50);
      rect(x, y, width / xn, width / yn);
    }
  }
  for (x = width/xn; x <= width; x += width * 2 / xn) {
    for (y = height/yn; y <= height; y += height * 2 / yn) {
      rect(x, y, width / xn, width / yn);
    }
  }
}let xn = 10;
let yn = 10;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(20);
  for (x = width/xn; x <= width; x += width / xn) {
    for (y = height/yn; y <= height; y += height / yn) {
      stroke(255);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }
}let n = 10;
let w;

function setup() {
  createCanvas(600, 600);
  w = width / n;
}

function draw() {
  background(20);
  noStroke();
  for (i = 1; i <= n; i++) {
    if (mouseX > (i - 1) * w && mouseX < i * w) {
      fill(100, 255, i * 255/n);
    } else {
      noFill();
    }
    rect((i - 1) * w, 0, w, height);
  }
}let n = 10;
let w;

function setup() {
  createCanvas(600, 600);
  w = width / n;
}

function draw() {
  background(20);
  noStroke();
  for (i = 1; i <= n; i += 2) {
    if (mouseX > (i - 1) * w && mouseX < i * w) {
      fill(50, 0, 255);
    } else {
      noFill();
    }
    rect((i - 1) * w, 0, w, height);
  }
}let n = 10;
let w;

function setup() {
  createCanvas(600, 600);
  w = width / n;
}

function draw() {
  background(20);
  noStroke();
  for (i = 1; i <= n / 2; i++) {
    if (mouseX > (i - 1) * w && mouseX < i * w) {
      fill(50, 0, 255);
    } else {
      noFill();
    }
    rect((i - 1) * w, 0, w, height);
  }

  for (i = n / 2 + 1; i <= n; i++) {
    if (mouseX > (i - 1) * w && mouseX < i * w) {
      fill(255, 0, 50);
    } else {
      noFill();
    }
    rect((i - 1) * w, 0, w, height);
  }
}let n = 10;
let w;

function setup() {
  createCanvas(600, 600);
  w = width / n;
}

function draw() {
  background(20);
  noStroke();
  for (i = 1; i <= n; i++) {
    if (mouseX > (i - 1) * w && mouseX < i * w) {
      fill(255, 0, 50);
    } else {
      noFill();
    }
    
    if (i ==7) {
    noFill();
    }
    
    rect((i - 1) * w, 0, w, height);
  }
}let n = 10;
let w;

function setup() {
  createCanvas(600, 600);
  w = width / n;
}

function draw() {
  background(20);
  noStroke();
  for (i = 1; i <= n; i++) {
    if (mouseX > (i - 1) * w && mouseX < i * w) {
      fill(255, 0, 50);
    } else {
      noFill();
    }
    rect((i - 1) * w, 0, w, height);
  }
}let on = false;
let stay = false;
let lx;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(20);

  for (lx = width / 3; lx <= width; lx += width / 3) {
    stroke(255);
    line(lx, 0, lx, height);
  }

  if (on) {
    noStroke();
    fill(200, 50, 150);
    rect(width * 2 / 3, 0, width / 3, height);
  } else {
    noStroke();
    noFill();
    rect(width * 2 / 3, 0, width / 3, height);
  }

  if (stay) {
    noStroke();
    fill(200, 50, 150);
    rect(width * 2 / 3, 0, width / 3, height);
  } else {
    noStroke();
    noFill();
    rect(width * 2 / 3, 0, width / 3, height);
  }

  if (mouseX > 2 * width / 3 && mouseX < width) {
    if (on) {
      stay = true;
    } else {
      stay = false;
    }
  }
  if (mouseX < width * 2 / 3) {
    on = false;
  }
}


function mousePressed() {
  if (mouseX > 2 * width / 3 && mouseX < width) {
    on = true;
  }
}let dragging = false;
let rollover = false;
let cx, cy, cr;
let x, y, r;
let lx, ly, angle, lcol;
let offsetX, offsetY;

function setup() {
  createCanvas(600, 600);
  cx = width / 2;
  cy = height / 2;
  cr = 25;
  r = 0;
  offsetX = 0;
  offsetY = 0;
  lcol = 255;
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(50);

  if (dist(mouseX, mouseY, cx, cy) < cr) {
    rollover = true;
  } else {
    rollover = false;
  }

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

  if (dragging) {
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
  if (dragging) {
    fill(225, 100, 150);
  } else if (rollover) {
    fill(225, 50, 100);
  } else {
    fill(180, 50, 80);
  }
  ellipse(cx, cy, cr * 2);
}

function mousePressed() {
  if (dist(mouseX, mouseY, cx, cy) < cr) {
    dragging = true;
    offsetX = cx - mouseX;
    offsetY = cy - mouseY;
  }
}

function mouseReleased() {
  dragging = false;
}let speed = 1;
let y = 0;
let rows = [];

function setup() {
  createCanvas(600, 600);
  for (i = 0; i < 30; i++) {
    let x = 0;
    let y = 0;
    rows[i] = new Row(x, y);
  }
  }

function draw() {
    background(0, 20, 0);
		rows[i].move();
    rows[i].display();
    // if (y >= height || y < 0) {
    //   speed = speed * -1;
    // }
  }

class Row{
    constructor(_x, _y) {
      this.x = _x;
      this.y = _y;
    }

    move() {
      this.y = this.y + 1;
    }

    display() {
      for (this.x = 0; this.x < width; this.x += 20) {
        ellipse(this.x, this.y, 20);
      }
    }
  }let x = 0;
let xspeed = 10;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(20);
  // draw an ellipse in the middle of the left edge of the canvas
  // make the ellipse move to the right side of the canvas
  // when the ellipse reaches the right side of the canvas,
  // it turns around and move back to the left side of the canvas
  // when it reaches the left edge of the canvas,
  // it turns around the move toward the right side of the canvas
  // forever
  ellipse(x, height / 2, 20);
  x += xspeed;
  if (x > width || x < 0) {
    xspeed = xspeed * -1;
  }

}function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(20);
  noStroke();
  if (mouseX < width / 3 && mouseX > 0) {
    fill(255, 0, 50);
    rect(0, 0, width / 3, height);
  } else if (mouseX < 2 * width / 3) {
    fill(255, 0, 50);
    rect(width / 3, 0, width / 3, height);
  } else if (mouseX > 2 * width / 3 && mouseX < width) {
    fill(255, 0, 50);
    rect(2 * width / 3, 0, width / 3, height);
  }
}let bgr;
let bgg;
let bgb;
let glfr = {
  tx: 235,
  ty: 190,
  w: 90,
  h: 60
};
let eyebr = {
  lx: 220,
  ly: 150,
  w: 40
};
let hrts = [];

function setup() {
  createCanvas(600, 360);
  // bgr = random(200, 255);
  // bgg = random(100, 130);
  bgb = random(100, 255);
  // background(bgr, bgg, bgb);
  rectMode(CENTER);

  for (let i = 0; i < 1000; i++) {
    let x = random(width);
    let y = random(height);
    let colr = random(200, 255);
    let colg = random(50, 100);
    let colb = random(50, 100);
    hrts[i] = new Heart(x, y, colr, colg, colb);
  }

}

function draw() {
  bgr = map(mouseY, 0, 360, 255, 0);
  bgg = map(mouseY, 0, 360, 255, 0);
  background(bgr, bgg, bgb);

  //hearts
  push();
  for (let i = 0; i < hrts.length; i++) {
    hrts[i].move();
    hrts[i].col();
    hrts[i].show();
  }
  pop();

  //hair
  noStroke();
  fill(0, 30, 0);
  arc(280, 180, 300, 300, PI + HALF_PI, TWO_PI);
  ellipse(280, 75, 60, 100);
  ellipse(420, 220, 60, 100);
  ellipse(400, 250, 80, 100);
  ellipse(350, 270, 100, 100);
  arc(255, 170, 180, 260, PI, PI + HALF_PI);
  ellipse(180, 200, 80, 100);
  ellipse(200, 250, 100, 100);
  ellipse(250, 270, 100, 100);


  //face
  noStroke();
  fill(255, 215, 150);
  arc(300, 190, 200, 250, 0, PI, CHORD);
  rect(300, 180, 200, 55);
  arc(255, 160, 110, 150, PI, PI + HALF_PI);
  arc(255, 164, 203, 160, PI + HALF_PI, TWO_PI);

  //ears
  ellipse(390, 220, 30, 50);
  ellipse(210, 220, 40, 60);


  //cheeks
  let blushA = map(dist(mouseX, mouseY, width / 2, height / 2), 0, 370, 100, 0);
  fill(255, 50, 50, blushA);
  ellipse(230, 235, 60);
  ellipse(356, 235, 60);

  //bang
  fill(0, 30, 0);
  arc(405, 140, 100, 160, HALF_PI, PI);
  triangle(185, 200, 200, 190, 210, 250);
  arc(220, 275, 50, 30, 0, PI + QUARTER_PI);

  //eyebrows
  noFill();
  stroke(0);
  strokeWeight(3);
  line(eyebr.lx, eyebr.ly, eyebr.lx + eyebr.w, eyebr.ly);
  line(eyebr.lx + 93, eyebr.ly, eyebr.lx + 93 + eyebr.w, eyebr.ly);

  if (mouseIsPressed) {
    if (mouseX > 200 && mouseX < 400 && mouseY > 84 && mouseY < 315) {
      arc(eyebr.lx + eyebr.w, eyebr.ly - 6, 10, 10, 0, HALF_PI);
      arc(eyebr.lx + 93, eyebr.ly - 6, 10, 10, HALF_PI, PI);
    } else {
      arc(eyebr.lx, eyebr.ly + 6, 10, 10, PI, PI + HALF_PI);
      arc(eyebr.lx + 93 + eyebr.w, eyebr.ly + 6, 10, 10, PI + HALF_PI, TWO_PI);
    }
  } else {
    arc(eyebr.lx, eyebr.ly + 6, 10, 10, PI, PI + HALF_PI);
    arc(eyebr.lx + 93 + eyebr.w, eyebr.ly + 6, 10, 10, PI + HALF_PI, TWO_PI);
  }

  //eyes
  // let eyea = map(dist(mouseX, mouseY, 290, 200), 0, 135, 0, 255);

  let eyearc = map(dist(mouseX, mouseY, 290, 200), 0, 152, -0.38, 0);
  let irisy = map(dist(mouseX, mouseY, width / 2, height / 2), 0, 152, 0, 15);
  if (mouseX > 200 && mouseX < 400 && mouseY > 84 && mouseY < 315) {

    //left eye
    // noFill();
    // stroke(0, eyea);
    // strokeWeight(5);
    // arc(248, 185, 30, 15, PI, TWO_PI);

    stroke(0);
    strokeWeight(5);
    push();
    translate(248, 185);
    rotate(eyearc);
    arc(0, 0, 17, 17, 0, PI + QUARTER_PI);
    pop();

    // noStroke();
    // fill(20, eyea);
    // ellipse(248, 185, 15, irisy);

    //right eye
    // noFill();
    // stroke(0, eyea);
    // strokeWeight(5);
    // arc(328, 185, 30, 15, PI, TWO_PI);

    push();
    translate(328, 185);
    rotate(eyearc);
    arc(0, 0, 17, 17, 0, PI + QUARTER_PI);
    pop();

    // noStroke();
    // fill(20, eyea);
    // ellipse(328, 185, 15, irisy);

  } else {
    //left eye
    noFill();
    stroke(0, 255);
    strokeWeight(5);
    arc(248, 185, 30, 15, PI, TWO_PI);

    stroke(0);
    arc(248, 185, 17, 17, 0, PI + QUARTER_PI);

    noStroke();
    fill(20, 255);

    ellipse(248, 185, 15, 15);

    //right eye
    noFill();
    stroke(0, 255);
    strokeWeight(5);
    arc(328, 185, 30, 15, PI, TWO_PI);

    stroke(0);
    arc(328, 185, 17, 17, 0, PI + QUARTER_PI);

    noStroke();
    fill(20, 255);

    ellipse(328, 185, 15, 15);
  }

  if (mouseIsPressed) {
    //left eye
    noFill();
    stroke(0, 255);
    strokeWeight(5);
    arc(248, 185, 30, 15, PI, TWO_PI);

    stroke(0);
    arc(248, 185, 17, 17, 0, PI + QUARTER_PI);

    noStroke();
    fill(20, 255);
    ellipse(248, 185, 15, 15);

    //right eye
    noFill();
    stroke(0, 255);
    strokeWeight(5);
    arc(328, 185, 30, 15, PI, TWO_PI);

    stroke(0);
    arc(328, 185, 17, 17, 0, PI + QUARTER_PI);
    push();
    noStroke();
    fill(20, 255);
    ellipse(328, 185, 15, 15)
    pop();
  }

  //mouth
  if (mouseX > 200 && mouseX < 400 && mouseY > 84 && mouseY < 315) {
    stroke(255, 50, 50);
    arc(294, 255, 60, 30, 0, PI);
  } else {
    noStroke();
    fill(255, 50, 50, 255);
    arc(294, 255, 60, 60, 0, PI);
    fill(255, 255);
    quad(267, 258, 320, 258, 317, 265, 270, 265);
  }

  //glasses
  glasses();
  if (mouseIsPressed) {
    if (mouseX > 200 && mouseX < 400 && mouseY > 84 && mouseY < 315) {
      glfr.tx = 235 + random(-5, 5);
      glfr.ty = 190 + random(-5, 5);
    }
  }
}


function glasses() {
  stroke(77, 51, 0);
  strokeWeight(3);

  let gla = map(mouseY, 0, 180, 220, 0);
  fill(0, 0, 20, gla);
  arc(glfr.tx, glfr.ty, glfr.w, glfr.h, PI, TWO_PI);
  arc(glfr.tx, glfr.ty, glfr.w, glfr.h + 30, 0, PI);
  arc(glfr.tx + 105, glfr.ty, glfr.w, glfr.h, PI, TWO_PI);
  arc(glfr.tx + 105, glfr.ty, glfr.w, glfr.h + 30, 0, PI);
  noFill();
  arc(glfr.tx + 52, glfr.ty - 5, glfr.w - 80, glfr.h - 55, PI, TWO_PI);
}

class Heart {
  constructor(_x, _y, _colr, _colg, _colb) {
    this.x = _x;
    this.y = _y;
    this.r = _colr;
    this.g = _colg;
    this.b = _colb;
  }

  move() {
    this.x = this.x + random(-.5, .5);
    this.y = this.y + random(-.5, .5);
  }

    col(){
    fill(this.r, this.g, this.b);
  }
  
  show() {
    noStroke();
    ellipse(this.x - 5, this.y - 5, 15);
    ellipse(this.x + 5, this.y - 5, 15);
    translate(this.x, this.y);
    rotate(PI / 4.0);
    rect(0, 0, 15, 15);
  }
}let bgr;
let bgg;
let bgb;
let glfr = {
  tx: 235,
  ty: 190,
  w: 90,
  h: 60
};
let eyebr = {
  lx: 220,
  ly: 150,
  w: 40
};
let hrts = [];

function setup() {
  createCanvas(600, 360);
  // bgr = random(200, 255);
  // bgg = random(100, 130);
  bgb = random(100, 255);
  // background(bgr, bgg, bgb);
  rectMode(CENTER);

  for (let i = 0; i < 1000; i++) {
    let x = 0 + 5 * i;
    let y = 20 + 5 * i;
    let colr = random(200, 255);
    let colg = random(50, 100);
    let colb = random(50, 100);
    hrts[i] = new Heart(x, y, colr, colg, colb);
  }

}

function draw() {
  bgr = map(mouseY, 0, 360, 255, 0);
  bgg = map(mouseY, 0, 360, 255, 0);
  background(bgr, bgg, bgb);

  //hearts
  push();
  for (let i = 0; i < hrts.length; i++) {
        hrts[i].move();
        hrts[i].col();
        hrts[i].show();
  }
  pop();

  //hair
  noStroke();
  fill(0, 30, 0);
  arc(280, 180, 300, 300, PI + HALF_PI, TWO_PI);
  ellipse(280, 75, 60, 100);
  ellipse(420, 220, 60, 100);
  ellipse(400, 250, 80, 100);
  ellipse(350, 270, 100, 100);
  arc(255, 170, 180, 260, PI, PI + HALF_PI);
  ellipse(180, 200, 80, 100);
  ellipse(200, 250, 100, 100);
  ellipse(250, 270, 100, 100);


  //face
  noStroke();
  fill(255, 215, 150);
  arc(300, 190, 200, 250, 0, PI, CHORD);
  rect(300, 180, 200, 55);
  arc(255, 160, 110, 150, PI, PI + HALF_PI);
  arc(255, 164, 203, 160, PI + HALF_PI, TWO_PI);

  //ears
  ellipse(390, 220, 30, 50);
  ellipse(210, 220, 40, 60);


  //cheeks
  let blushA = map(dist(mouseX, mouseY, width / 2, height / 2), 0, 370, 100, 0);
  fill(255, 50, 50, blushA);
  ellipse(230, 235, 60);
  ellipse(356, 235, 60);

  //bang
  fill(0, 30, 0);
  arc(405, 140, 100, 160, HALF_PI, PI);
  triangle(185, 200, 200, 190, 210, 250);
  arc(220, 275, 50, 30, 0, PI + QUARTER_PI);

  //eyebrows
  noFill();
  stroke(0);
  strokeWeight(3);
  line(eyebr.lx, eyebr.ly, eyebr.lx + eyebr.w, eyebr.ly);
  line(eyebr.lx + 93, eyebr.ly, eyebr.lx + 93 + eyebr.w, eyebr.ly);

  if (mouseIsPressed) {
    if (mouseX > 200 && mouseX < 400 && mouseY > 84 && mouseY < 315) {
      arc(eyebr.lx + eyebr.w, eyebr.ly - 6, 10, 10, 0, HALF_PI);
      arc(eyebr.lx + 93, eyebr.ly - 6, 10, 10, HALF_PI, PI);
    } else {
      arc(eyebr.lx, eyebr.ly + 6, 10, 10, PI, PI + HALF_PI);
      arc(eyebr.lx + 93 + eyebr.w, eyebr.ly + 6, 10, 10, PI + HALF_PI, TWO_PI);
    }
  } else {
    arc(eyebr.lx, eyebr.ly + 6, 10, 10, PI, PI + HALF_PI);
    arc(eyebr.lx + 93 + eyebr.w, eyebr.ly + 6, 10, 10, PI + HALF_PI, TWO_PI);
  }

  //eyes
  // let eyea = map(dist(mouseX, mouseY, 290, 200), 0, 135, 0, 255);

  let eyearc = map(dist(mouseX, mouseY, 290, 200), 0, 152, -0.38, 0);
  let irisy = map(dist(mouseX, mouseY, width / 2, height / 2), 0, 152, 0, 15);
  if (mouseX > 200 && mouseX < 400 && mouseY > 84 && mouseY < 315) {

    //left eye
    // noFill();
    // stroke(0, eyea);
    // strokeWeight(5);
    // arc(248, 185, 30, 15, PI, TWO_PI);

    stroke(0);
    strokeWeight(5);
    push();
    translate(248, 185);
    rotate(eyearc);
    arc(0, 0, 17, 17, 0, PI + QUARTER_PI);
    pop();

    // noStroke();
    // fill(20, eyea);
    // ellipse(248, 185, 15, irisy);

    //right eye
    // noFill();
    // stroke(0, eyea);
    // strokeWeight(5);
    // arc(328, 185, 30, 15, PI, TWO_PI);

    push();
    translate(328, 185);
    rotate(eyearc);
    arc(0, 0, 17, 17, 0, PI + QUARTER_PI);
    pop();

    // noStroke();
    // fill(20, eyea);
    // ellipse(328, 185, 15, irisy);

  } else {
    //left eye
    noFill();
    stroke(0, 255);
    strokeWeight(5);
    arc(248, 185, 30, 15, PI, TWO_PI);

    stroke(0);
    arc(248, 185, 17, 17, 0, PI + QUARTER_PI);

    noStroke();
    fill(20, 255);

    ellipse(248, 185, 15, 15);

    //right eye
    noFill();
    stroke(0, 255);
    strokeWeight(5);
    arc(328, 185, 30, 15, PI, TWO_PI);

    stroke(0);
    arc(328, 185, 17, 17, 0, PI + QUARTER_PI);

    noStroke();
    fill(20, 255);

    ellipse(328, 185, 15, 15);
  }

  if (mouseIsPressed) {
    //left eye
    noFill();
    stroke(0, 255);
    strokeWeight(5);
    arc(248, 185, 30, 15, PI, TWO_PI);

    stroke(0);
    arc(248, 185, 17, 17, 0, PI + QUARTER_PI);

    noStroke();
    fill(20, 255);
    ellipse(248, 185, 15, 15);

    //right eye
    noFill();
    stroke(0, 255);
    strokeWeight(5);
    arc(328, 185, 30, 15, PI, TWO_PI);

    stroke(0);
    arc(328, 185, 17, 17, 0, PI + QUARTER_PI);
    push();
    noStroke();
    fill(20, 255);
    ellipse(328, 185, 15, 15)
    pop();
  }

  //mouth
  if (mouseX > 200 && mouseX < 400 && mouseY > 84 && mouseY < 315) {
    stroke(255, 50, 50);
    arc(294, 255, 60, 30, 0, PI);
  } else {
    noStroke();
    fill(255, 50, 50, 255);
    arc(294, 255, 60, 60, 0, PI);
    fill(255, 255);
    quad(267, 258, 320, 258, 317, 265, 270, 265);
  }

  //glasses
  glasses();
  if (mouseIsPressed) {
    if (mouseX > 200 && mouseX < 400 && mouseY > 84 && mouseY < 315) {
      glfr.tx = 235 + random(-5, 5);
      glfr.ty = 190 + random(-5, 5);
    }
  }
}


function glasses() {
  stroke(77, 51, 0);
  strokeWeight(3);

  let gla = map(mouseY, 0, 180, 220, 0);
  fill(0, 0, 20, gla);
  arc(glfr.tx, glfr.ty, glfr.w, glfr.h, PI, TWO_PI);
  arc(glfr.tx, glfr.ty, glfr.w, glfr.h + 30, 0, PI);
  arc(glfr.tx + 105, glfr.ty, glfr.w, glfr.h, PI, TWO_PI);
  arc(glfr.tx + 105, glfr.ty, glfr.w, glfr.h + 30, 0, PI);
  noFill();
  arc(glfr.tx + 52, glfr.ty - 5, glfr.w - 80, glfr.h - 55, PI, TWO_PI);
}

class Heart {
  constructor(_x, _y, _colr, _colg, _colb) {
    this.x = _x;
    this.y = _y;
    this.r = _colr;
    this.g = _colg;
    this.b = _colb;
  }

  move() {
    this.x = this.x + 1;
    this.y = this.y + 1;
    if (this.x == width || this.y == height){
    this.x = 0;
    this.y = 20;
    }
  }

  col() {
    fill(this.r, this.g, this.b);
  }

  show() {
    noStroke();
    ellipse(this.x - 5, this.y - 5, 15);
    ellipse(this.x + 5, this.y - 5, 15);
    translate(this.x, this.y);
    rotate(PI / 4.0);
    rect(0, 0, 15, 15);
  }
}let x, y, w, h;
let dx, dy;

function setup() {
  createCanvas(800, 600);
  x = width / 2;
  y = height / 2;
  w = width / 5;
  h = height / 5;
  rectMode(CENTER);
}

function draw() {
  background(20);
  noStroke();
  fill(255, 10, 100);
  rect(x, y, w, h);

  dx = mouseX - x;
  dy = mouseY - y;
  x = x + dx * 0.05;
  y = y + dy * 0.05;

}let x = 300, y = 200;
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(20);
  ellipse(x, y, 25, 25);
  
  // x++; // make the ball move to the right of the screen
  // x--; // make the ball move to the left of the screen
	// x = x + 1, y = y - 2/3;// make the ball move to the top right corner of the screen
  // x = x - 1, y = y - 2/3;// make the ball move to the top left corner of the screen
  // x = x + 1, y = y + 2/3;// make the ball move to the bottom right corner of the screen
  // x = x - 1, y = y + 2/3;// make the ball move to the bottom left corner of the screen
  x = x - 10, y = y + 20/3;// make the ball move 10 times faster
}let x, y, w, h;
let lx, rx, ty, by;

function setup() {
  createCanvas(800, 600);
  background(20);
  // 1st argument: x-coordinate of the rectangle
  // 2nd argument: y-coordinate of the rectangle
  // 3rd argument: width of the rectangle
  // 4th argument: height of the rectangle
  x = width / 2;
  y = height / 2;
  w = width / 2;
  h = height / 2;
  lx = x - w / 2;
  rx = x + w / 2;
  ty = y - h / 2;
  by = y + h / 2;
  rectMode(CENTER);
}

function draw() {

  //draw with rect()
  // noStroke();
  // rect(x, y, w, h);


  //draw with vertex()
  beginShape(QUADS);
  vertex(lx, ty);
  vertex(rx, ty);
  vertex(rx, by);
  vertex(lx, by);
  endShape();

}let lx, rx, ty, by;
let cx, cy, hw, hh;

function setup() {
  rectMode(CENTER);
}

function draw() {
  createCanvas(frameCount, frameCount);
  lx = cx - hw;
  rx = cx + hw;
  ty = cy - hh;
  by = cy + hh;

  cx = width / 2;
  cy = height / 2;
  hw = width / 20;
  hh = height / 20;


  background(220);
  stroke(0);
  strokeWeight(5);

  line(lx, ty, rx, ty);
  line(lx, by, rx, by);
  line(rx, ty, rx, by);
  line(lx, ty, lx, by);
}function setup() {
  createCanvas(600, 360);
  background(255, 102, 102);

  //hair
  noStroke();
  fill(0, 30, 0);
  arc(280, 180, 300, 300, PI + HALF_PI, TWO_PI);
  ellipse(280, 75, 60, 100);
  ellipse(420, 220, 60, 100);
  ellipse(400, 250, 80, 100);
  ellipse(350, 270, 100, 100);
  arc(255, 170, 180, 260, PI, PI + HALF_PI);
  ellipse(180, 200, 80, 100);
  ellipse(200, 250, 100, 100);
  ellipse(250, 270, 100, 100);


  //face
  noStroke();
  fill(255, 215, 150);
  arc(300, 190, 200, 250, 0, PI, CHORD);
  rect(200, 150, 200, 55);
  arc(255, 160, 110, 150, PI, PI + HALF_PI);
  arc(255, 164, 203, 160, PI + HALF_PI, TWO_PI);

  //ears
  ellipse(390, 220, 30, 50);
  ellipse(210, 220, 40, 60);


  //cheeks
  fill(255, 50, 50, 50);
  ellipse(230, 235, 60);
  ellipse(356, 235, 60);

  //bang
  fill(0, 30, 0);
  arc(405, 140, 100, 160, HALF_PI, PI);
  triangle(185, 200, 200, 190, 210, 250);
  arc(220, 275, 50, 30, 0, PI + QUARTER_PI);

  //eyebrows
  noFill();
  stroke(0);
  strokeWeight(3);
  line(220, 150, 260, 150);
  arc(220, 156, 10, 10, PI, PI + HALF_PI);
  line(313, 150, 353, 150);
  arc(353, 156, 10, 10, PI + HALF_PI, TWO_PI);

  //eyes
  noFill();
  stroke(0);
  strokeWeight(5);
  arc(248, 185, 30, 15, PI, TWO_PI);
  arc(248, 185, 17, 17, 0, PI + QUARTER_PI);
  noStroke();
  fill(20);
  ellipse(248, 185, 15);

  noFill();
  stroke(0);
  strokeWeight(5);
  arc(328, 185, 30, 15, PI, TWO_PI);
  arc(328, 185, 17, 17, 0, PI + QUARTER_PI);
  noStroke();
  fill(20);
  ellipse(328, 185, 15)

  //mouth
  fill(255, 50, 50);
  arc(294, 255, 60, 60, 0, PI);
  fill(255);
  quad(267, 258, 320, 258, 317, 265, 270, 265);

  //glasses
  noFill();
  stroke(0);
  stroke(77, 51, 0);
  strokeWeight(3);
  noFill();
  arc(235, 190, 90, 60, PI, TWO_PI);
  arc(340, 190, 90, 60, PI, TWO_PI);
  arc(340, 190, 90, 90, 0, PI);
  arc(235, 190, 90, 90, 0, PI);
  arc(287, 185, 10, 5, PI, TWO_PI);

  //hearts
  push();
  noStroke();
  fill(255, 50, 50);
  ellipse(45, 55, 15);
  ellipse(56, 55, 15);
  translate(50, 50);
  rotate(PI / 4.0);
  rect(0, 0, 15, 15);
  
  noStroke();
  fill(255, 50, 50);
  ellipse(140, 105, 15);
  ellipse(151, 105, 15);
  translate(145, 100);
  rotate(PI / 4.0);
  rect(0, 0, 15, 15);
  pop();
  
  push();
  noStroke();
  fill(255, 50, 50);
  ellipse(465, 284,15);
  ellipse(473, 280,15);
  translate(-100, 100);
  rotate(PI / 10)
  rect(592.5, -7.5, 15, 15);
  pop();
  
  noStroke();
  fill(255, 50, 50);
  ellipse(540, 113,15);
  ellipse(548, 121,15);
  translate(-60, 100);
  rotate(PI / 90)
  rect(592.5, -7.5, 15, 15);

}let bubbles = [];

function setup() {
  createCanvas(600, 400); //why after taking this out, it doesn't draw?
  // for (i = 0; i < 100; i++) {
  //   let x = random(width);
  //   let y = random(height);
  //   let r = random(5,50);
  //   bubbles[i] = new Bubble(x, y, r, 250, 10, 200);
  // }
}

function mouseDragged() {
  let r = random(5, 50);
  let colr = random(50, 200);
  let colg = random(0, 100);
  let colb = random(50, 255);
  let b = new Bubble(mouseX, mouseY, r, colr, colg, colb);

  bubbles.push(b); //why does the color of the first bubble keep changing?
}

function draw() {
  background(20);   //why does the error appears when I change "bubbles.length" to number?
  for (i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    bubbles[i].col();
  }
}

class Bubble {
  constructor(_x, _y, _r, _colr, _colg, _colb) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.colr = _colr;
    this.colg = _colg;
    this.colb = _colb;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    noStroke();
    ellipse(this.x, this.y, this.r);
  }

  col() {
    fill(this.colr, this.colg, this.colb, 50);
    // this.colr = random(50, 200);
    // this.colg = random(0, 100);
    // this.colb = random(50, 255);
  }

}

function Heart(){
}function setup() {
  var F1 = celciusToFerinheight(30);
  print(F1);
  var F2 = celciusToFerinheight(20);
  print(F2);
}

function celciusToFerinheight(celcius) {
  var Ferinheight=celcius * 9/5 + 32
  return Ferinheight;
}var ball;

function setup() {
  createCanvas(600, 400);
  ball = {
    x: width / 2,
    y: height / 2,
    speedx: 4,
    speedy: -5
  }
}

function draw() {
  background(20);
  move();
  shape();
  bounce();
}

function move() {
  ball.x += ball.speedx
  ball.y += ball.speedy
}

function bounce() {
  if (ball.x > width || ball.x < 0) {
    ball.speedx = ball.speedx * -1;
  }

  if (ball.y > height || ball.y < 0) {
    ball.speedy = ball.speedy * -1
  }
}

function shape() {
  ellipse(ball.x, ball.y, 30, 30);
}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(20);
  stroke(255);
  strokeWeight(3);
  for (var x = 0; x <= mouseX; x += 50) {
    for (var y = 0; y <= mouseY; y += 50) {
      fill(random(100, 255), 0, random(100, 250));
      ellipse(x, y, 30, 30);
    }

  }
}var offset = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(20);
  stroke(255);
  strokeWeight(2);
  for (var colr = 0; colr < 255; colr = colr + 1) { //what's wrong with this session?
    fill(colr, 255, 255);
  }
  console.log (colr);
  
  for (var x = 0; x <= width; x += 50) {
    ellipse(x + offset, 200, 30, 30);
  }
  offset = offset + 1;
}var on = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (on) {
    background(255, 255, 0);
  } else {
    background(20);
  }
  stroke(255);
  strokeWeight(5);
  noFill();
  if (mouseX > 250 && mouseX < 350 && mouseY > 175 && mouseY < 225) {
    fill(180, 0, 100, 180);
  }
  rectMode(CENTER);
  rect(300, 200, 100, 50);
  if (mouseIsPressed) {
    if (mouseX > 250 && mouseX < 350 && mouseY > 175 && mouseY < 225) {
      background(20);
      fill(180, 0, 100, 255);
      rect(300, 200, 90, 40);
    }
  }
}

function mousePressed() {
  if (mouseX > 250 && mouseX < 350 && mouseY > 175 && mouseY < 225) {
    on = !on
  }
}var col = {
  r: 200,
  g: 0,
  b: 100
}

var bgcol = {
  r: 100,
  g: 100,
  b: 250
}


function setup() {
  createCanvas(600, 400);
  background(bgcol.r, bgcol.g, bgcol.b);

}

function draw() {
  noStroke();
  fill(col.r, col.g, col.b, 100);
  rect(mouseX, mouseY, 10, 10);

  //   if (mouseIsPressed) {
  //     noStroke();
  //     fill(col.r, col.g, col.b, 100);
  //     rect(mouseX, mouseY, 10, 10);

  //     col.r = random(0, 75);
  //     col.g = random(100, 255);
  //     col.b = random(0, 228);
  //   }
}


function mousePressed() {
  bgcolr = random(50, 100);
  bgcolg = random(0, 200);
  bgcolb = random(200, 255);
  background(bgcolr, bgcolg, bgcolb);

  noStroke();
  col.r = random(100, 255);
  col.g = random(100, 255);
  col.b = random(0, 228);
  fill(col.r, col.g, col.b, 100);
  rect(mouseX, mouseY, 10, 10);
}function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(13, 234, 235);
  line(0, 0, 800, 600);
  strokeWeight(50);
  stroke(255, 0, 0);
  
  push();
  noStroke();
  fill(0, 200, 02);
  ellipse(400, 300, 380, 290);
  pop();
  
  push();
  noStroke();
  fill(3, 0, 128);
  rect(540, 260, 50, 50);
  pop();
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(0, 255, 255); //fill in the RGB value with maximum number for green and blue.
  ellipse(200, 200, 100, 100);
}function setup() {
  createCanvas(400, 400); //here
}

function draw() {
  background(220);
}function setup() {
  createCanvas(400, 400);
  //background(220);
}

function draw() {
  rect(200, 200, 50, 70)
}