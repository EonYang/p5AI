var numSegments = 10,
  x = [],
  y = [],
  angle = [],
  segLength = 26,
  targetX, targetY;
for (var i = 0; i < numSegments; i++) {
  x[i] = 0;
  y[i] = 0;
  angle[i] = 0;
}
function setup() {
  createCanvas(710, 400);
}
function draw() {
  background(0);
    strokeWeight(80);
  rectMode(CENTER);
  stroke(255, 100);
  reachSegment(0, mouseX, mouseY);
  for(var i=1; i<numSegments; i++) {
    reachSegment(i, targetX, targetY);
  }
  for(var j=x.length-1; j>=1; j--) {
    positionSegment(j, j-1);
  }
  for(var k=0; k<x.length; k++) {
    segment(x[k], y[k], angle[k], (k+1)*2);
  }
}
function positionSegment(a, b) {
  x[b] = x[a] + cos(angle[a]) * segLength;
  y[b] = y[a] + sin(angle[a]) * segLength;
}
function reachSegment(i, xin, yin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  angle[i] = atan2(dy, dx);
  targetX = xin - cos(angle[i]) * segLength;
  targetY = yin - sin(angle[i]) * segLength;
}
function segment(x, y, a, sw) {
  strokeWeight(sw);
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}
let cnv, youPower;
let w, h;
let questionImg, logo, input;
let totalUsers = 2714;
let thisDay, thisMonth, whyhQ, howQ, whereQ;
let table;
function drawCanvas() {
  let w = windowWidth;
  let h = windowHeight;
  cnv = createCanvas(w, h);
  background(190);
  let cx = (w) / 2;
  
  rectMode(CENTER);
  fill(0);
  logo = loadImage("human_doing_logo_small.png");
  questionImg = loadImage("question_mark.png");
  arrow = loadImage("Back_Arrow.png");
  push();
  textSize(14);
  textAlign(CENTER);
  let tagline = "daily acts of good with exponential impact";
  text(tagline, cx, 170);
  pop();
  push();
  textAlign(CENTER);
  textSize(14);
  textStyle(BOLD);
  today = "TODAY'S GOOD:";
  text(today, cx, 280);
  pop();
  let d = day();
  let m = month();
  let thisMonth;
  if (m == 1) {
    thisMonth = "January";
  } else if (m == 2) {
    thisMonth = "February";
  } else if (m == 3) {
    thisMonth = "March";
  } else if (m == 4) {
    thisMonth = "April";
  } else if (m == 5) {
    thisMonth = "May";
  } else if (m == 6) {
    thisMonth = "June";
  } else if (m == 7) {
    thisMonth == "July";
  } else if (m == 8) {
    thisMonth = "August";
  } else if (m == 9) {
    thisMonth = "September";
  } else if (m == 10) {
    thisMonth = "October";
  } else if (m == 11) {
    thisMonth = "November";
  } else if (m == 12) {
    thisMonth = "December";
  } else {
    thisMonth = "";
  };
  
  push();
  textSize(14);
  textStyle(BOLD);
  text(thisMonth + " " + (d - 1), cx - 210, 330);
  pop();
  push();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER);
  text(thisMonth + " " + d, cx, 335);
  pop();
    push();
  textSize(14);
  textStyle(BOLD);
  text(thisMonth + " " + (d + 1), cx + 125, 330);
  pop();
  textStyle(NORMAL);
  let dayOW = new Date();
  let n = dayOW.getDay();
  if (n == 0) {
    thisDay = "Sunday,";
  } else if (n == 1) {
    thisDay = "Monday,";
  } else if (n == 2) {
    thisDay = "Tuesday,";
  } else if (n == 3) {
    thisDay = "Wednesday,";
  } else if (n == 4) {
    thisDay = "Thursday,";
  } else if (n == 5) {
    thisDay = "Friday,";
  } else if (n == 6) {
    thisDay = "Saturday,";
  } else {
    thisDay = "";
  };
  push();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER);
  text(thisDay, cx, 315);
  pop();
  noFill();
  stroke(124, 252, 0, 160);
  strokeWeight(5);
  rect(cx, 370, 510, 160);
  rect(cx-170, 400, 170, 100);
  rect(cx, 400, 170, 100);
  rect(cx+170, 400, 170, 100);
  rect(cx-285, 400, 60, 100);
  fill(0);
  noStroke();
  push();
  textSize(13);
  let lastDay = "18,520 people received a compliment yesterday! Bet they're feeling good.";
  text(lastDay, cx - 165, 410, 150, 100);
  let currentDay = "Refuse any plastic bags you are offered today.";
  text(currentDay, cx+10, 410, 150, 100);
	pop();
  
  
  
}
function setup() {
  drawCanvas();
  let h = windowHeight;
  let cx = (windowWidth) / 2;
  textAlign(CENTER);
  button = createButton('Count me in');
  button.position(cx - 40, 460);
  button.mousePressed(countMe);
  push();
  textAlign(CENTER);
  textSize(14);
  let idea = "What should we do tomorrow?"
  text(idea, cx, h-75);
  pop();
  input = createInput();
  input.position(cx - 85, h - 65, 200, 50);
  button = createButton('Submit');
  button.position(input.x + input.width, h - 65);
  button.mousePressed(ideas);
  push();
  textAlign(CENTER);
  let copyright = "© Copyright 2017 humandoing"
  text(copyright, cx, h - 25);
  pop();
}
function whyBox() {
}
function showPrev() {
  push();
  textSize(14);
  textStyle(BOLD);
  text(thisMonth + " " + (d - 2), cx-295, 350);
  pop();
}
  
function countMe() {
  let cx = (windowWidth) / 2;
  fill(190);
  rect(cx-95, 220, 70, 30);
  totalUsers = totalUsers + 1;
  fill(0);
}
function ideas() {
}
function windowResized() {
  drawCanvas();
}
function draw() {
  let h = windowHeight;
  let cx = (windowWidth) / 2;
  image(logo, cx - 130, 20, 260, 130);
  image(questionImg, cx + 130, 360, 80, 90);
  image(arrow, cx-310, 345, 50, 130);
  push();
  textSize(26);
  textAlign(CENTER);
  youPower = "Join " + totalUsers + " humans doing good!";
  let numPeople = text(youPower, cx, 230);
  pop();
  textSize(12);
  let fc = frameCount;
  if (fc % 100 == 0) {
  countMe();
  }
  
  
  push();
  fill(150);
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER);
  pop();
  
  
  
}let cnv, youPower;
let w, h, d, m;
let questionImg, logo, input;
let totalUsers = 2714;
let thisDay, thisMonth, whyhQ, howQ, whereQ;
let table;
let yesterday, today1, tomrorow;
var sourceText = "human doing";
var curIndex = 0;
function drawCanvas() {
  let w = windowWidth;
  let h = windowHeight;
  cnv = createCanvas(w, h);
  background(190);
  let cx = (w) / 2;
  push();
  textSize(14);
  textAlign(CENTER);
  let tagline = "daily acts of good with exponential impact";
  text(tagline, cx, 170);
  pop();
  push();
  textAlign(CENTER);
  textSize(18);
  textStyle(BOLD);
  today = "TODAY'S GOOD:";
  text(today, cx, 290);
  pop();
    let d = day();
    let m = month();
    let thisMonth;
    if (m == 1) {
      thisMonth = "January";
    } else if (m == 2) {
      thisMonth = "February";
    } else if (m == 3) {
      thisMonth = "March";
    } else if (m == 4) {
      thisMonth = "April";
    } else if (m == 5) {
      thisMonth = "May";
    } else if (m == 6) {
      thisMonth = "June";
    } else if (m == 7) {
      thisMonth == "July";
    } else if (m == 8) {
      thisMonth = "August";
    } else if (m == 9) {
      thisMonth = "September";
    } else if (m == 10) {
      thisMonth = "October";
    } else if (m == 11) {
      thisMonth = "November";
    } else if (m == 12) {
      thisMonth = "December";
    } else {
      thisMonth = "";
    };
    fill(255);
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let yesterday = thisMonth + " " + (d - 1);
    text(yesterday, cx-170, 330);
    pop();
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let today1 = thisMonth + " " + d;
    text(today1, cx, 335);
    pop();
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let tomorrow = thisMonth + " " + (d + 1);
    text(tomorrow, cx + 160, 330);
    pop();
    textStyle(NORMAL);
     fill(0);
  let dayOW = new Date();
  let n = dayOW.getDay();
  if (n == 0) {
    thisDay = "Sunday,";
  } else if (n == 1) {
    thisDay = "Monday,";
  } else if (n == 2) {
    thisDay = "Tuesday,";
  } else if (n == 3) {
    thisDay = "Wednesday,";
  } else if (n == 4) {
    thisDay = "Thursday,";
  } else if (n == 5) {
    thisDay = "Friday,";
  } else if (n == 6) {
    thisDay = "Saturday,";
  } else {
    thisDay = "";
  };
  push();
  fill(255);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER);
  text(thisDay, cx, 320);
  pop();
  push();
  textSize(14);
  textAlign(LEFT);
  textStyle(BOLD);
  let currentDay = "Refuse all plastic bags you are offered today.";
  currentText = text(currentDay, cx - 70, 360, 150, 100);
  pop();
  push();
  textSize(14);
  textAlign(LEFT);
  let lastDay = "18,520 people received a compliment yesterday! Bet they're feeling good.";
  text(lastDay, cx - 240, 360, 150, 100);
  pop();
  push();
  textAlign(CENTER);
  textSize(14);
  fill(0);
  let idea = "What good should we do tomorrow?"
  text(idea, cx, h - 75);
  pop();
}
function setup() {
  drawCanvas();
  rectMode(CENTER);
  let h = windowHeight;
  let cx = (windowWidth) / 2;
  logo = loadImage("human_doing_logo_small.png");
  questionImg = loadImage("question_mark.png");
  arrow = loadImage("Back_Arrow.png");
  textAlign(CENTER);
  whyButton = createButton('WHY?');
  whyButton.position(cx - 22, 460);
  whyButton.mouseOver(whyBox);
  button = createButton('COUNT ME IN');
  button.position(cx - 42, 538);
  button.mousePressed(countMe);
  input = createInput();
  input.position(cx - 85, h - 65, 200, 50);
  button = createButton('Submit');
  button.position(input.x + input.width, h - 65);
  button.mousePressed(ideas);
  push();
  textAlign(CENTER);
  textSize(12);
  let copyright = "© Copyright 2017 humandoing"
  text(copyright, cx, h - 25);
  pop();
}
function whyBox() {
  let cx = (windowWidth) / 2;
  push();
  textSize(13.5);
  fill(255, 0, 0);
  textAlign(CENTER);
  let whySource = "Every day, the average US household takes home four plastic bags. Plastic bags can take up to 1,000 years to break down, which causes a multitude of enivronmental concerns as well as increases the rate of natural resource consumption.";
  text(whySource, cx, 530, 520, 100);
  pop();
}
function showPrev() {
  push();
  textSize(14);
  textStyle(BOLD);
  text(thisMonth + " " + (d - 2), cx - 295, 350);
  pop();
}
function countMe() {
  let cx = (windowWidth) / 2;
  fill(190);
  noStroke();
  rect(cx - 140, 220, 70, 30);
  totalUsers = totalUsers + 1;
  fill(0);
}
function ideas() {
}
function mousePressed() {
  let d = day();
  let m = month();
  let thisMonth;
  if (m == 1) {
    thisMonth = "January";
  } else if (m == 2) {
    thisMonth = "February";
  } else if (m == 3) {
    thisMonth = "March";
  } else if (m == 4) {
    thisMonth = "April";
  } else if (m == 5) {
    thisMonth = "May";
  } else if (m == 6) {
    thisMonth = "June";
  } else if (m == 7) {
    thisMonth == "July";
  } else if (m == 8) {
    thisMonth = "August";
  } else if (m == 9) {
    thisMonth = "September";
  } else if (m == 10) {
    thisMonth = "October";
  } else if (m == 11) {
    thisMonth = "November";
  } else if (m == 12) {
    thisMonth = "December";
  } else {
    thisMonth = "";
  };
  let cx = (windowWidth) / 2;
  rectMode();
  var disst = dist(mouseX, mouseY, cx - 275, 400);
  if (disst < 50) {
    fill(190);
    noStroke();
    rect(cx, 320, 520, 40);
    fill(255);
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let yesterday = thisMonth + " " + (d - 2);
    text(yesterday, cx - 170, 330);
    pop();
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let today1 = thisMonth + " " + (d - 1);
    text(today1, cx, 330);
    pop();
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let tomorrow = thisMonth + " " + (d);
    text(tomorrow, cx + 160, 330);
    pop();
    textStyle(NORMAL);
    fill(0);
  }
}
function windowResized() {
  drawCanvas();
}
function draw() {
  let h = windowHeight;
  let cx = (windowWidth) / 2;
  image(logo, cx - 130, 20, 260, 130);
  image(questionImg, cx + 130, 360, 80, 90);
  image(arrow, cx - 310, 345, 50, 130);
  push();
  textSize(26);
  textAlign(CENTER);
  textStyle(NORMAL);
  youPower = "Join " + totalUsers + " humans doing good together";
  let numPeople = text(youPower, cx, 230);
  pop();
  textStyle(NORMAL);
  fill(0);
  textSize(12);
  let fc = frameCount;
  if (fc % 180 == 0) {
    countMe();
  }
  push();
  noFill();
  stroke(124, 252, 0, 100);
  strokeWeight(5);
  rect(cx - 170, 400, 170, 100);
  rect(cx, 400, 170, 100);
  rect(cx + 170, 400, 170, 100);
  pop();
}let video;
function setup() {
  createCanvas(640, 480);
  background(0);
  video = createCapture(VIDEO);
  video.size(160, 120);
  video.hide();
  background(0);
}
function draw() {
  push();
  fill(200, 0, 0, 10);
  rect(0, 0, 640, 480);
  pop();
  image(video, 0, 0, 0, 0);
  
  push();
  translate(320, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0);
  pop();
  
  image(video, 320, 0, 0, 0);
  
  push();
  translate(640, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0);
  pop();
  
  push();
  rotate(PI);
  translate(-160, -240);
  scale(-1.0, 1.0);
  image(video, -160, 0);
  pop();
  
  push();
  rotate(PI);
  translate(-320, -240);
  image(video, 0, 0);
  pop();
  
  push();
  rotate(PI);
  translate(-480, -240);
  scale(-1.0, 1.0);
  image(video, -160, 0);
  pop();
  
  push();
  rotate(PI);
  translate(-640, -240);
  image(video, 0, 0);
  pop();
    
  image(video, 0, 240, 0, 0);
  
  push();
  translate(320, 240);
  scale(-1.0, 1.0);
  image(video, 0, 0);
  pop();
  
  image(video, 320, 240, 0, 0);
  
  push();
  translate(640, 240);
  scale(-1.0, 1.0);
  image(video, 0, 0);
  pop();
  
  push();
  rotate(PI);
  translate(-160, -240);
  scale(-1.0, 1.0);
  image(video, -160, -240);
  pop();
  
  push();
  rotate(PI);
  translate(-320, -240);
  image(video, 0, -240);
  pop();
  
  push();
  rotate(PI);
  translate(-480, -240);
  scale(-1.0, 1.0);
  image(video, -160, -240);
  pop();
  
  push();
  rotate(PI);
  translate(-640, -240);
  image(video, 0, -240);
  pop();
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
var imgMask = [n];
var img = [n];
var imgR1, imgR2, imgR3, imgR4, imgR5;
var angle = 0;
var r1, r2, r3, r4, r5;
function preload() {
  for (var i = 0; i <= n; i++) {
    img[i] = loadImage(i + ".png");
  }
  for (var j = 0; j <= n; j++) {
    imgMask[j] = loadImage("mask.png");
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  imgR1 = int(random(n));
  imgR2 = int(random(n));
  imgR3 = int(random(n));
  imgR4 = int(random(n));
  imgR5 = int(random(n));
  img[imgR1].mask(imgMask[int(random(n))]);
  img[imgR2].mask(imgMask[int(random(n))]);
  img[imgR3].mask(imgMask[int(random(n))]);
  img[imgR4].mask(imgMask[int(random(n))]);
  img[imgR5].mask(imgMask[int(random(n))]);
  imageMode(CENTER);
  r1 = random(-1.2, 1.2);
  r2 = random(-1.2, 1.2);
  r3 = random(-1.2, 1.2);
  r4 = random(-1.2, 1.2);
  r5 = random(-1.2, 1.2);
}
function draw() {
  translate(width / 2, height / 2);
  var w = (width * 1.5);
  var h = (width * 1.5);
  rotate(radians(angle*r1));
  image(img[imgR1], 0, 0, w, h);
  rotate(radians(angle*r2));
  image(img[imgR2], 0, 0, w, h);
  rotate(radians(angle*r3));
  image(img[imgR3], 0, 0, w, h);
  rotate(radians(angle*r4));
  image(img[imgR4], 0, 0, w, h);
  angle++;
}
function mousePressed() {
  setup();
}var video;
function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.hide();
}
function draw() {
  background(0);
  image(video, 0, 0, width, height);
}
  
  
  
  createCanvas(400, 400);
  background(255);
  textAlign(LEFT, TOP);
  textSize(24);
  text("Click for ~messages from another world~",
       20, 20, width-40, height-40);
} 
function draw() { 
}
function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output = grammar.flatten("#origin#");
  background(255);
  text(output, 20, 20, width-40, height-40);
}
var grammarSource = {
  "origin": "#interjection.capitalize#, #name#! I'm #profession.a#, not #profession.a#!",
  "interjection": ["alas", "congratulations", "eureka", "fiddlesticks",
    "good grief", "hallelujah", "oops", "rats", "thanks", "whoa", "yes"],
  "name": ["Jim", "John", "Tom", "Steve", "Kevin", "Gary", "George", "Larry"],
  "profession": [
        "accountant",
        "actor",
        "archeologist",
        "astronomer",
        "audiologist",
        "bartender",
        "butcher",
        "carpenter",
        "composer",
        "crossing guard",
        "curator",
        "detective",
        "economist",
        "editor",
        "engineer",
        "epidemiologist",
        "farmer",
        "flight attendant",
        "forest fire prevention specialist",
        "graphic designer",
        "hydrologist",
        "librarian",
        "lifeguard",
        "locksmith",
        "mathematician",
        "middle school teacher",
        "nutritionist",
        "painter",
        "physical therapist",
        "priest",
        "proofreader",
        "rancher",
        "referee",
        "reporter",
        "sailor",
        "sculptor",
        "singer",
        "sociologist",
        "stonemason",
        "surgeon",
        "tailor",
        "taxi driver",
        "teacher assistant",
        "teacher",
        "teller",
        "therapist",
        "tour guide",
        "translator",
        "travel agent",
        "umpire",
        "undertaker",
        "urban planner",
        "veterinarian",
        "web developer",
        "weigher",
        "welder",
        "woodworker",
        "writer",
        "zoologist"
  ]
};let expansion;
var img;
var offset = 10;
var easing = 0.009;
let x, y;
function preload() {
  wave = loadImage("wave5.png");
}
var story = {
  "start": ['In the year 2029\n#stanza2#\n#stanza3#\n#stanza4#'],
  "stanza2": ['The sky is crying', 'I am drowning in rising waters', 'It is colder than usual, I dont have a coat', 'Is my smoking breaking the ozone layer?', 'I cannot breathe'],
  "stanza3": ['How the waters covered our homes', 'While the trees cry their leaves', 'Remember when the skies were blue', 'Drowning in the scream of rising seas', 'Air is free for now', 'My lungs inhale dirty air'],
  "stanza4": ['The ice is stone, rock, and forever', 'Now it is melting, moving, breaking, gone', 'Is there hope? In massive corporate change', 'Is there loss? In breaking free of machines']
}
var grammar;
function setup() {
  createCanvas(640, 360);
  img = loadImage("iceberg2.jpg");
  grammar = tracery.createGrammar(story);
  expansion = grammar.flatten('#start#');
  x = width;
  y = height;
}
function draw() {
  background(0, 95, 161);
  var dx = (1 - img.width / 30) - offset;
  offset -= dx * easing;
  image(img, 0, offset);
  image(wave, 0, y);
  x = x + random(-1, 1);
  y = y - 0.5;
  noStroke();
  fill(0, 100);
  rect(0, 40, 490, 135);
  fill(255);
  textSize(24);
  text(expansion, 10, 70);
}var myMap;
var canvas;
var key = 'pk.eyJ1Ijoic3RlcGhhbmllcmVuZWUiLCJhIjoiY2o4emFtcWMzMmxmdzJybjVscm10d2JpNyJ9.Qd3BWTs0rABe2nH8tBC48A';
var mappa = new Mappa('Leaflet', key);
var travels;
var current = 0;
var options = {
  lat: 18,
  lng: -8,
  zoom: 2,
}
function preload() {
  travels = loadTable('travels.csv', 'csv', 'header');
}
function setup() {
  canvas = createCanvas(640, 640);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  fill(70, 203, 30);
  stroke(100);
  myMap.onChange(drawPoints);
}
  function mousePressed() {
    
      for (var i = 0; i < travels.getRowCount(); i++) {
    
    
    var latitude = Number(travels.getString(i, 'reclat'));
    var longitude = Number(travels.getString(i, 'reclong'));
    var pos = myMap.latLngToPixel(latitude, longitude);
    ellipse(pos.x, pos.y, 10, 10);
}
  }
function draw() {}
function drawPoints() {
  clear();
    
    
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
function setup() {
  createCanvas(500,500);
  background(0); 
 
}
 
function draw() {
  fill (255, 10)
  noStroke();
}
function serverConnected() {
}
 
function portOpen() {
}
 
  }
}
 
}
 
function portClose() {
}
 for (var i = 0; i < portList.length; i++) {
 }
}var myMap;
var canvas;
var key = 'pk.eyJ1Ijoic3RlcGhhbmllcmVuZWUiLCJhIjoiY2o4emFtcWMzMmxmdzJybjVscm10d2JpNyJ9.Qd3BWTs0rABe2nH8tBC48A';
var mappa = new Mappa('Leaflet', key);
var travels;
var current = 0;
var options = {
  lat: 18,
  lng: -8,
  zoom: 2,
}
function preload() {
  travels = loadTable('travels.csv', 'csv', 'header');
}
function setup() {
  canvas = createCanvas(640, 640);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  fill(70, 203, 30);
  stroke(100);
  myMap.onChange(drawPoints);
}
    
    
    
function draw() {}
function drawPoints() {
  clear();
  for (var i = 0; i < travels.getRowCount(); i++) {
    
    
    var latitude = Number(travels.getString(i, 'reclat'));
    var longitude = Number(travels.getString(i, 'reclong'));
    var pos = myMap.latLngToPixel(latitude, longitude);
    ellipse(pos.x, pos.y, 10, 10);
  }
function gotData() {
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  angleMode(DEGREES);
  background(102, 204, 255, 70);
  fill(102, 153, 0, 180);
  noStroke();
  rect(0, height*.6, width, height*.6)
}
function draw() {
}
function mousePressed() {
  tree = new Tree(100, 100, random(3, 8), random(150,300), 10);
  tree.build();
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
} 
function gotData() {
}
function draw() { 
  
  let string = "Breath rate:";
	fill(255);
  text(string, 20, 20);
  text(latestData, 50,50);
  
    
        
    
  
  
  
  
  
	
}let str = "A string walks into a bar and orders a drink. The baretender says we don't serve strings here and you're a string."
let segments = [];
function setup() { 
  createCanvas(800, 800);
  segments = trim(str.split("s"));
} 
function draw() { 
  background(220);
  let h = 0;
  let x = 0;
	for (let i = 0; i < segments.length; i++) {
    textSize (i*10 + 10);
    h += textAscent() + textDescent();
    text(segments[i], x, h);
    x += textWidth(segments[i]);
  }
}let a = 10;
let b = 20;
function setup() { 
  createCanvas(400, 400);
  
} 
function sum(a, b) {
  return a + b;
}
function draw() { 
  background(220);
  let c = sum(12,4);
  console.log(a + " " + "+" + " " + b + " " + "=" + " " + sum(a,b));
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
} 
function gotData() {
}
function draw() { 
  background(127, 0, 127);
  
  
  var v = map(latestData, 50, 1023, 0, width); 
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
var intro;
function setup() {
  intro = createP("Begin the meditation by becoming fully aware of your breath");
  intro.style("background-color", "blue");
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
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  angleMode(DEGREES);
  background(102, 204, 255, 70);
  fill(102, 153, 0, 180);
  noStroke();
  rect(0, height*.6, width, height*.6)
}
function draw() {
}
function mousePressed() {
  tree = new Tree(100, 100, random(3, 8), random(150,300), 10);
  tree.build();
}let balls = [];
function setup() {
  createCanvas(600,600);
  for (let i=0; i < 30; i++) {
  balls.push(new Ball(random(width), random(height), random(-3,3), 2, random(10,30)));
   }
  }
             
function draw() {
  background(10);
  for (let i=0; i < balls.length; i++) {
    balls[i].run();
    for (let j=0; j < balls.length; j++) {
      if (i != j && balls[i].isNear(balls[j]) ) {
        balls.splice(i,1);
        if (i < j) j--;
        balls.splice(j,1);
        break;
      }
    }
  }
}
function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
};let balls = [];
function setup() {
  createCanvas(600,600);
  frameRate(20);
  for (let i=0; i < 100; i++) {
  balls.push(new Ball(random(width), random(height), random(-3,3), 1, random(10,20)));
   }
  }
             
function draw() {
  background(255);
  for (let i=0; i < balls.length; i++) {
    balls[i].run();
    for (let j=0; j < balls.length; j++) {
      if (i != j && balls[i].isNear(balls[j]) ) {
        balls[i].turnRed();
        balls[j].turnRed();
      }
    }
  }
}
function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
};let balls = [];
function setup() {
  createCanvas(600,600);
  for (let i=0; i < 300; i++) {
  balls.push(new Ball(random(width), random(height), random(-3,3), 1, random(2,6)));
   }
  }
             
function draw() {
  background(0);
  for (let i=0; i < balls.length; i++) {
    balls[i].run();
    for (let j=0; j < balls.length; j++) {
      if (i != j) {
      if (balls[i].isNear(balls[j])) {
        balls[i].turnRed();
        balls[j].turnRed();
      } 
      }
    }
   }
}
function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
};let balls = [];
function setup() {
  createCanvas(400,400);
  for (let i=0; i < 400; i++) {
    fill(255);
  balls.push(new Ball(random(width), random(height), random(-3,3), 1, random(1,10)));
  }
  }
             
function draw() {
  background(220);
  for (let i=1; i < balls.length; i++) {
     balls[i].run();
     balls[i].isNear(balls[i-1]);
   }
  balls[0].display();
  balls[1].display();
}
    
function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
};let positions = [];
function setup() { 
  createCanvas(600, 600);
  colorMode(RGB);
} 
function draw() { 
  background(229, 186, 48);
  noStroke();
  fill(121,41,133);
  rect(0,0,500, 500);
  fill(169,203, 140);
  triangle(0,height, 50, height-50, 100, height);
  fill(112,170,66);
  triangle(100,height, 150, height-50, 200, height);
  fill(169,203, 140);
  triangle(200,height, 250, height-50, 300, height);
  fill(112,170,66);
  triangle(300,height, 350, height-50, 400, height);
  fill(169,203, 140);
  triangle(400,height, 450, height-50, 500, height);
  fill(112,170,66);
  triangle(500,height, 550, height-50, 600, height);
  fill(169,203, 140);
  triangle(width,height, width-50, height-50, width, height-100);
  fill(112,170,66);
  triangle(width,height-100, width-50, height-150, width, height-200);
  fill(169,203, 140);
  triangle(width,height-200, width-50, height-250, width, height-300);
  fill(112,170,66);
  triangle(width,height-300, width-50, height-350, width, height-400);
  fill(169,203, 140);
  triangle(width,height-400, width-50, height-450, width, height-500);
  fill(112,170,66);
  triangle(width,height-500, width-50, height-550, width, height-600);
  fill(169,203, 140);
  triangle(width-100,0, width-50, 50, width, 0);
  fill(112,170,66);
  triangle(0,height-100, 50, height-50, 0, height);
  
  fill(169,203, 140);
  triangle(0,80, 0, 0, 80, 0);
  
  
  
  positions.push({x: mouseX, y: mouseY});
  
  if(positions.length > 50) positions.shift();
  
  for (let i=0; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
    fill(242);
    noStroke();
    ellipse(x, y, i/4, i/4);
  }
}let a = 0;
let r = 3;
let count = 0;
let angle = 0;
let col = {
  h: 0,
  s: 0,
  b: 0
}
function setup() { 
  createCanvas(windowWidth, windowHeight);
  let z = random(0, 255);
    colorMode(RGB);
  background(114, 170, 57);
  colorMode(RGB);
  angleMode(DEGREES);
  frameRate(120);
}
function draw() { 
  var increment = 16;
  var angleChange = 137.5;
  var r = sqrt(count);
  count = count + increment;
  angle += angleChange;
  let x = r * -cos(angle);
  let y = r * sin(angle);
  a += 0.19;
  r += 1;
  
  translate(width/2, height/2);
  strokeWeight(2);
  purple = (116, 42, 124);
  green = (114, 170, 57);
  yellow = (189, 175, 63);
  col.h = map(mouseX, 0, width, 0, 255);
  stroke(189, 175, 63);
  fill(116, 42, 124);
  ellipse(x, y, 10, 10);
}
let positions = [];
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  
  
  positions.push({x: mouseX, y: mouseY});
  
  if(positions.length > 50) positions.shift();
  
  for (let i=0; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
    ellipse(x, y, i/5, i/5);
  }
}var Slider = function(x, y, buttonX, maxValue) {
	this.x = x;
	this.y = y;
	this.l = 100;
	this.buttonX = this.x + buttonX;
	this.radius = 30;
	this.maxValue = maxValue;
	this.checkDragging = function() {
		if (mouseIsPressed && this.contains()) {
			this.buttonX = mouseX;
		}
	}
	this.contains = function() {
		var d = dist(mouseX, mouseY, this.buttonX, this.y);
		if (d < this.radius / 2) {
			return true;
		} else {
			return false;
		}
	}
	this.display = function() {
		this.buttonX = constrain(this.buttonX, this.x, this.x + this.l)
		push();
		strokeWeight(3);
		line(this.x, this.y, this.x + this.l, this.y);
		pop();
		ellipse(this.buttonX, this.y, this.radius, this.radius);
	}
	this.getValue = function() {
		var relX = this.buttonX - this.x;
		return int(map(relX, 0, this.l, 0, this.maxValue));
	}
}
var sliders;
function setup() {
	createCanvas(500, 500);
	colorMode(HSB, 255, 255, 255);
	sliders = [
		new Slider(width / 2 - (width / 4), height - 100, 50, 255),
		new Slider(width / 2 + (width / 5), height - 100, 50, 10),
	];
}
function draw() {
	background(160, 160, 200);
	for (var i = 0; i < sliders.length; i++) {
		sliders[i].checkDragging()
		sliders[i].display();
		sliders[i].getValue();
	}
	for (i = 0; i < sliders[1].getValue(); i++) {
		var margin = 400;
		var offset = ((width - margin * 2) / sliders[1].getValue()) / 2;
		xPos = margin + (((width - margin * 2) / sliders[1].getValue()) * i) + offset;
		push()
		fill(sliders[0].getValue(), 150, 255)
		ellipse(xPos, height / 3, 50, 50)
		pop();
	}
}let balls = [];
function setup() {
  createCanvas(400,400);
  for (let i=0; i < 400; i++) {
    fill(255);
  balls.push(new Ball(random(width), random(height), random(-5,5), 1, random(1,10)));
  }
  }
             
function draw() {
  background(220);
  for (let i=0; i < balls.length; i++) {
    balls[i].run();
  }
}
    
function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
var ball = {
	x : 0,
	y : 0,
	xspeed : 1,
	yspeed : 10
}
var ball2 = {
	x : 0,
	y : 0,
	xspeed : 10,
	yspeed : 1
}
  
function setup() { 
  createCanvas(600, 600);
  ball.x = width / 2;
  ball.y = height / 2;
  ball2.x = width / 2;
  ball2.y = height / 2;
} 
  
function bounce(ball) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
}
  
  
  bounce: function(loc, this.speed, this.bottom, this.top) {
    if (this.loc < this.bottom || this.loc > this.top) {
      this.speed *= -1; 
    }
    return this.speed;
},
};
function draw() { 
  background(220); 
  
  xspeed = ball.bounce(); 
  yspeed = ball.bounce();
  
  x += xspeed;
  y += yspeed;
  ellipse(x, y, 50, 50);
  
}
  
  
let x1, y1, xspeed1, yspeed1;
let x2, y2, xspeed2, yspeed2;
function setup() { 
  createCanvas(600, 600);
  x1 = width / 2;
  y1 = height / 2;
  xspeed1 = 2;
  yspeed1 = 8;
  x2 = width / 4;
  y2 = height / 4;
  xspeed2 = 2;
  yspeed2 = 6;
} 
function draw() { 
  background(220);
  let newValues = update(x1,y1,xspeed1,yspeed1);
  x1 = newValues.x;
  y1 = newValues.y;
  display(x1, y1);
  update(x2,y2,xspeed2,yspeed2);
  display(x2,y2);
}
function update(x,y,xspeed,yspeed) {
  xspeed = bounce(x, xspeed, 0, width);
  x += xspeed;
  yspeed = bounce(y, yspeed, 0, height);
  y += yspeed;
  return { x: x, y: y, xspeed:xspeed, yspeed: yspeed};
}
function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
}
function display(x, y) {
  	noStroke();
    ellipse(x, y, 40, 40);
}
let w;
let h;
let r;
let b;
let g;
function setup() {
  createCanvas(700, 500);
  rectMode(CENTER);
  colorMode(RGB);
  frameRate(30);
  background(220);
  w = width;
  h = height;
}
var weave = {
  x: 0,
  y: 0,
  roll: function() {
    this.x = random(w);
    this.y = random(h);
    this.x2 = random(w);
    this.y2 = random(h);
  },
  make: function() {
    weave.roll();
    line(0, this.y, this.x, 0);
    weave.roll();
    line(w, this.y, this.x, h);
    weave.roll();
    line(this.x, 0, this.x2, h);
    line(0, this.y, w, this.y2);
  }
}
function draw() {
  strokeWeight(.5);
  r = mouseX;
  b = mouseY;
  stroke(r, 0, b);
  for (i=0; i < 1; i++) {
    weave.make();
}
}
function mousePressed() {
  noStroke();
  d = random(10, 100);
  fill(255);
  ellipse(mouseX, mouseY, d, d);
  
}
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
let x;
let y;
let xspeed = 1;
let yspeed = 10;
function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
}
function setup() { 
  createCanvas(600, 600);
  x = width / 2;
  y = height / 2;
} 
function draw() { 
  background(220);
  
  xspeed = bounce(x, xspeed, 0, width);
  yspeed = bounce(y, yspeed, 0, height);
  
  x += xspeed;
  y += yspeed;
  
  ellipse(x, y, 50, 50);
}
let x;
let y;
let col;
let a = 0;
let state = false;
let w;
let h;
let d;
let speed = 0.3;
let p;
function setup() {
  createCanvas(windowWidth, windowHeight);
  w=width/2;
  h=height/2;
  rectMode(CENTER);
  background(116, 42, 124, 100);
  x = 0;
  y = 0;
  col = 0;
  p = height/2;
  
}
function draw() {
  purple = (116, 42, 124);
  green = (114, 170, 57);
  yellow = (189, 175, 63);
  
  push();
  fill(189, 175, 63, 70);
  stroke(114, 170, 57, 150);
  strokeWeight(1);
  translate(w, h);
  rotate(a++);
  rect(x, y, 15, 15);
  x = x + speed
  y = x + speed
  
  if (x > 100 || x < 0) {
   speed = speed * -1; 
  }
  
  
  if (col == 255) {
    col -= 1;
  } else {
     col += 1;
  }
  pop();
  fill(220);
  strokeWeight(0.00005);
  if (mouseX > (w - 20) && mouseX < (w + 20)) {
    if (mouseY > (h - 20) && mouseY < (h + 20)) {
      stroke(220);
      strokeWeight(30); 
      push();
      ellipse(w, h, 40, 40);
      fill(0);
      pop();
    }
  }
      
}
  function mousePressed() {
  d = dist(mouseX, mouseY, w, h);
  if (d < 20) {
    background(random(0,255));
  }      
  }
  
  
  
  
let numRow;
let cw;
let ch;
let rw;
let rh;
function setup() { 
  createCanvas(windowWidth, windowHeight);
  numCol = 10;
  numRow = 5;
  cw = width/numCol;
  ch = height;
  rw = width;
  rh = height/numRow;
} 
function draw() { 
  background(220);
  for (let cn = 0; cn < numCol; cn++) {
    let x = cn*cw;
    for (let rn = 0; rn <numRow; rn++) {
    let y = rn*rh;
    rect(x,y,cw,ch);
    }
  }
  
}
var x = 0;
var y = 0;
var a = 200;
var b = 200;
var d = 90;
var state = false;
var mic;
var A = 20;
function setup() {
  createCanvas(400, 400);
  background(255);
  mic = new p5.AudioIn();
  mic.start();
    
}
function draw() {
  var vol = mic.getLevel();
  micLevel = mic.getLevel();
  var h = map(vol*20, 1, 10, 6, 50);
  
  
  ellipse(a,b,d+(h+=1),d+(h+=1));
  ellipse(a,b-130,d/2+(h+=2),d/2+(h+=2));
  ellipse(a,b+130,d/2+(h+=2),d/2+(h+=2));
if (state) {
    background(0,0) && fill(h+random(110,250),h+random(150,250),h+random(180,250));
  } else {
    background(255,0) && fill(h+random(110,250),h+random(150,250),h+random(180,250));
  }
    
  
  if(dist(mouseX, mouseY, a, b) < d/2) {
    state = !state && stroke(250,200,40)}
  
  if(mouseX > 400 && mouseX < 200 && mouseY >400 && mouseY > 200) {fill(h+200)}
  
  
  
  if(mouseX > 250) { background(random(200,255), random(100,255), random(50,255),100)}
  else {background(120, 248, 250,10);} 
  
  if(mouseX > 100 && mouseX <250 ) {background(random(200,255), 20) && stroke (255);}
  else {background(200, 180, 220,1) && stroke(0);}
  
  
  if (random(-10) > -3) {
    line(x, y, x+20, y+20) && strokeWeight(4);
  } 
  else {
    line(x, y+20, x+20, y);
  }
  
  
  if((mouseIsPressed) && dist(mouseX, mouseY, a, b) < (d/2) ) {background(0,10) && strokeWeight(h+=10);}
  
  if((mouseIsPressed) && dist(mouseX, mouseY, a, b+130) < (d/2) ) {background(0,10);}
  
  if((mouseIsPressed) && dist(mouseX, mouseY, a, b-130) < (d/2) ) {background(0,10) && strokeWeight(s+=10);}
  
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
}let w;
let h;
var Slider = function(x, y, buttonX, maxValue) {
  this.x = x;
  this.y = y;
  this.l = 100;
  this.buttonX = this.x + buttonX;
  this.radius = 30;
  this.maxValue = maxValue;
  this.checkDragging = function() {
    if (mouseIsPressed && this.contains()) {
      this.buttonX = mouseX;
    }
  }
  this.contains = function() {
    var d = dist(mouseX, mouseY, this.buttonX, this.y);
    if (d < this.radius / 2) {
      return true;
    } else {
      return false;
    }
  }
  this.display = function() {
    this.buttonX = constrain(this.buttonX, this.x, this.x + this.l)
    push();
    strokeWeight(3);
    line(this.x, this.y, this.x + this.l, this.y);
    pop();
    ellipse(this.buttonX, this.y, this.radius, this.radius);
  }
  this.getValue = function() {
    var relX = this.buttonX - this.x;
    return int(map(relX, 0, this.l, 0, this.maxValue));
  }
}
var sliders;
function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 255, 255, 255);
  w = width / 2;
  h = height / 2;
  sliders = [
    new Slider(width / 2 - (width / 4), height - 100, 50, 255),
    new Slider(width / 2 + (width / 12), height - 100, 50, 10),
  ];
}
function draw() {
  background(160, 160, 200);
  for (var i = 0; i < sliders.length; i++) {
    sliders[i].checkDragging()
    sliders[i].display();
    sliders[i].getValue();
  }
  for (i = 0; i < sliders[1].getValue(); i++) {
    var margin = 400;
    var offset = ((width - margin * 2) / sliders[1].getValue()) / 2;
    xPos = margin + (((width - margin * 2) / sliders[1].getValue()) * i) + offset;
    if ((mouseIsPressed) && dist(mouseX, mouseY, width / 4 + 60, height - 100) < (50)) {
      strokeWeight(3);
      stroke(255);
      fill(random(110, 250), random(150, 250), random(180, 250));
    } else {
      stroke(0);
      strokeWeight(1);
      fill(255);
    }
    if ((mouseIsPressed) && dist(mouseX, mouseY, width / 12*7 + 70, height - 100) < (70)) {
      strokeWeight(random(3, 10));
    }
    push()
    fill(sliders[0].getValue(), 150, 255)
    ellipse(xPos, height / 3, 50, 50)
    pop();
  }
}let x;
let y;
let col;
let a = 0;
let state = false;
let w;
let h;
let d;
let speed = 0.3;
function setup() {
  createCanvas(windowWidth, windowHeight);
  w=width/2;
  h=height/2;
  rectMode(CENTER);
  background(220);
  x = 0;
  y = 0;
  col = 0;
}
function draw() {
  push();
  noFill();
  stroke(col);
  strokeWeight(1);
  translate(w, h);
  rotate(a++);
  rect(x, y, 20, 20);
  x = x + speed;
  y = y + speed;
  
  if (x > 200 || x < 0) {
   speed = speed * -1; 
  }
  
  if (col < 255 || col > 0) {
    col = col * -1;
  } else {
    col = col += 1;
  }
  pop();
  fill(220);
  strokeWeight(0.00005);
  ellipse(w, h, 40, 40);
  if (mouseX > (w - 20) && mouseX < (w + 20)) {
    if (mouseY > (h - 20) && mouseY < (h + 20)) {
      stroke(220);
      strokeWeight(30); 
      push();
      ellipse(w, h, 40, 40);
      fill(0);
      pop();
    }
  }
      
}
  function mousePressed() {
  d = dist(mouseX, mouseY, w, h);
  if (d < 20) {
    background(random(0,255));
  }      
  }
  
  
  
  
function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(220);
  fill(255,0,0);
  noStroke();
  
  
  let z = 10;
  let x = 0;
  
  
  for (i = 0; i < 10; i++) {
    
    if (mouseX < width/i) {
      rect(i*10, 0, width/i, height);
    
  
  if (mouseX < width/z) {
    z--; 
    x += 10;
  }
  if
         
     
} 
  
  
  
  
let box2 = false;
let box3 = false;
function setup() {
  createCanvas(800, 400);
}
function draw() {
  background(220);
  fill(255, 0, 0);
  noStroke();
  if (box1) {
    rect(0, 0, width / 3, height);
  } 
  if (box2) {
    rect(width/3, 0, width / 3, height);
  }
  if (box3) {
    rect(width*2/3, 0, width/3, height);
  }
  
  
  if (mouseX < width/3) {
    if (pmouseX > width/3) {
    box1 = !box1;
  }
  }
  
  if (mouseX > width/3 && mouseX < width*2/3) {
    if (pmouseX < width/3 || pmouseX > width*2/3) {
      box2 = !box2;
    }
  }
  
  if (mouseX > width*2/3) {
    if (pmouseX < width*2/3) {
      box3 = !box3;
    }
  }
}
  
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
  
  index++;
  if (index == width/w) {
    var p = get(0, h, width, h*23);
    background('#0000ff');
    set(0, 0, p);
    index = 0;
  }
}let x;
let y;
let col;
let a = 0;
let state = false;
let w;
let h;
let d;
function setup() {
  createCanvas(windowWidth, windowHeight);
  w=width/2;
  h=height/2;
  rectMode(CENTER);
  background(220);
  x = 0;
  y = 0;
  col = 0;
}
function draw() {
  push();
  noFill();
  stroke(col);
  strokeWeight(1);
  translate(w, h);
  rotate(a++);
  rect(x, y, 50, 50);
  x += .9;
  y += .9;
  
  if (col == 255) {
    col -= 1;
  } else {
     col += 1;
  }
  pop();
  fill(220);
  strokeWeight(0.00005);
  ellipse(w, h, 40, 40);
  if (mouseX > (w - 20) && mouseX < (w + 20)) {
    if (mouseY > (h - 20) && mouseY < (h + 20)) {
      stroke(220);
      strokeWeight(30); 
      push();
      ellipse(w, h, 40, 40);
      fill(0);
      pop();
    }
  }
      
}
  function mousePressed() {
  d = dist(mouseX, mouseY, w, h);
  if (d < 20) {
    background(random(0,255));
  }      
  }
  
  
  
  
let x;
let y;
let col;
function setup() { 
  createCanvas(400, 400);
  rectMode(CENTER);
  angleMode(DEGREES);
  background(220);
  x = width/2;
  y = height/2;
  col = 0;
} 
function draw() { 
  noFill();
  stroke(col);
  rotate(PI);
  rect(x,y,50,50);
  x += 1;
  y += 1;
  col += 1l
  
}let x;
let y;
let col;
function setup() { 
  createCanvas(400, 400);
  rectMode(CENTER);
  angleMode(DEGREES);
  background(220);
  x = width/2;
  y = height/2;
  col = 0;
} 
function draw() { 
  noFill();
  stroke(col);
  rotate(PI);
  rect(x,y,50,50);
  x += 1;
  y += 1;
  col += 1l
  
}let x;
let y;
let col;
function setup() { 
  createCanvas(400, 400);
  rectMode(CENTER);
  angleMode(DEGREES);
  background(220);
  x = width/2;
  y = height/2;
  col = 0;
} 
function draw() { 
  noFill();
  stroke(col);
  rotate(PI);
  rect(x,y,50,50);
  x += 1;
  y += 1;
  col += 1l
  
}let a = 0;
function setup() { 
  createCanvas(400, 400);
  angleMode(DEGREES);
} 
function draw() { 
  background(220);
  noStroke();
  push();
  translate(width/2, height/2);
  scale(2);
  rotate(a++);
  rect(0, 0, 200, 200);
  pop();
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  noStroke();
  
  for (let i = 0; i < 20; i++) {
    rect(20*i, 20*i, 20, 20)
  }
  
  
}let isOn1 = false;
let hasLeft1 = false;
function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(220);
  fill(255, 0, 0);
  noStroke();
  if (mouseX < width / 3) {
    if(hasLeft1) {
      isOn1 = !isOn1;
      hasLeft1 = false;
    }
  }
  else if (mouseX < width / 3) {
    hasLeft1 = false;
    rect(0, 0, width / 3, height);
  }
    
    
  else if (mouseX <= width * 2 / 3) {
    rect(width / 3, 0, width / 3, height);
  }
  else {
    rect(width * 2 / 3, 0, width / 3, height);
  }
  }function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(220);
  fill(255,0,0);
  noStroke();
  
  if (mouseX < width/3) {
    rect(0, 0, width/3, height);
  }
  
  else if (mouseX <= width*2/3) {
    rect(width/3, 0, width/3, height);
  }
  
  else {
    rect(width*2/3, 0, width/3, height);
  }
}let x;
let justHitRightWall;
let xspeed = 3;
function setup() { 
  createCanvas(400, 400);
  x = width / 2;
} 
function draw() { 
  background(220);
  
  
  if (x > width - 25 || x < 0 + 25) {
    xspeed *= -1;
  }
  
  x += xspeed;
  
  ellipse(x, height/2, 50, 50);
}let a = 0;
let r = 3;
let count = 0;
let angle = 0;
let col = {
  h: 0,
  s: 0,
  b: 0
}
function setup() { 
  createCanvas(windowWidth, windowHeight);
  let z = random(0, 255);
  background(z);
  colorMode(HSB);
}
function draw() { 
  var increment = 16;
  var angleChange = 137.5;
  var r = sqrt(count);
  count = count + increment;
  angle += angleChange;
  let x = r * -cos(angle);
  let y = r * sin(angle);
  a += 0.19;
  r += 1;
  
  translate(width/2, height/2);
  strokeWeight(1.5);
  col.h = map(mouseX, 0, width, 0, 255);
  stroke(col.h, 80, 100);
  noFill();
  ellipse(x, y, 5, 5);
}
let a = 0;
let r = 30;
let col = {
  h: 0,
  s: 0,
  b: 0
}
function setup() { 
  createCanvas(windowWidth, windowHeight);
  let z = random(0, 255);
  background(z);
	frameRate(15);
  colorMode(HSB);
}
function draw() { 
  let x = r * -cos(a);
  let y = r * sin(a);
  a += 0.19;
  r += 1;
  
  translate(width/2, height/2);
  let w = map(mouseY, 0, height, 1, 5);
  strokeWeight(w);
  col.h = map(mouseX, 0, width, 0, 255);
  stroke(col.h, 50, 100);
  noFill();
  ellipse(x, y, 30, 30);
}
var td;
var count = 0;
var t;
var v;
var border = 10;
function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
    var n = 5;
    t_size = Math.pow(2, n);
    t_len = (height - 2 * border);
    t_height = Math.sqrt(Math.pow(t_len, 2) - Math.pow(t_len/2, 2));
    curve_width = Math.pow(3, n);
    v = t_len / t_size;
    td = sierpinski(n);
    console.log(td);
    t = new Turtle(width/2 - t_height/2, height - border, 3*PI/2);
}
function draw() {
    var next = false;
    while (!next && count < td.length) {
        switch(td[count]) {
            case 'F':
                t.draw(v);
                next = true;
                break;
            case 'G':
                t.draw(v);
                next = true;
                break;
            case '+':
                t.turn(-2 * PI/3);
                break;
            case '-':
                t.turn(2 * PI/3);
                break;
        }
        count += 1;
    }
}
function Turtle (x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.stack = [];
    this.draw = function(n) {
        new_x = this.x + cos(this.r) * n;
        new_y = this.y + sin(this.r) * n;
        line(this.x, this.y, new_x, new_y);
        this.x = new_x;
        this.y = new_y;
    }
    this.turn = function(p) {
        this.r = this.r + p;
    }
    this.save = function() {
        state = [this.x, this.y, this.r].join();
        this.stack.push(state);
    }
    
    this.restore = function() {
        state_string = this.stack.pop()
        newstate = state_string.split(',');
        console.log(newstate);
        this.x = float(newstate[0]);
        this.y = float(newstate[1]);
        this.r = float(newstate[2]);
    } 
}
function stprocessor(s) {
    var p;
    switch(s) {
        case 'F':
            p = 'F-G+F+G-F';
            break;
        case 'G':
            p = 'GG';
            break;
        default:
            p = s;
    }
    return p
}
function lsystem(state, rule, n) {
    var newstate = "";
    if (n == 0) {
        return state;
    }
    else {
        for (var i = 0; i < state.length; i++) {
            newstate += rule(state[i]);
        };
        return lsystem(newstate, rule, n - 1)
    }
}
function sierpinski(n) {
    return lsystem('F-G-G', stprocessor, n);
}
window.onresize = function() {
    var w = window.innerWidth;
    var h = window.innerHeight;  
    canvas.size(w,h);
    width = w;
    height = h;
};let spot = {
  x: 100,
  y: 50
}
let col = {
  r: 255,
  g: 0,
  b: 0
}
function setup() { 
  createCanvas(800, 400);
  background(0);
} 
function draw() { 
  spot.x = random(0, width);
  spot.y = random(0, height);
  col.r = random(100, 255);
  col.g = 0;
  col.b = random(100, 190);
  fill(col.r, col.g, col.b, 100);
  noStroke();
  ellipse(spot.x, spot.y, 24, 24);
}var r = 0;
var b = 255;
function setup() { 
  createCanvas(600, 400);
  rectMode(CENTER);
} 
function draw() { 
  r = map(mouseX, 0, width, 0, 255);
  b = map(mouseY, 0, height, 255, 0);
  background(r, 0, b);
  
  
  fill (250, 118, 222);
  noStroke();
  ellipse(mouseX, mouseY, 64, 64);
}let circlex;
let circley;
let color1;
let color2;
let color3;
function setup() { 
  createCanvas(800, 600);
  circlex = width/10;
  circley = height/10;
  color1 = 255;
  color2 = 255;
  color3 = 0;
} 
function draw() { 
  background(220);
  noStroke();
  fill(color1, color2, color3);
  ellipse(circlex, circley, 50, 50);
  circlex = circlex + PI/10;
  circley = circley + PI/10;
  color1 = color1 - 1/10;
  color2 = color2 - 1/10;
  color3 = color3 -1/10;
  fill(0,245, 150);
  rect(0, height*5/6, width, height);
}function setup() { 
  createCanvas(windowWidth, windowHeight);
    frameRate(400);
} 
function draw() { 
  let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  let sw = map(speed, 0, 50, 30, 0);
  strokeWeight(sw);
  stroke(70, sw);
  line(mouseX, mouseY, pmouseX, pmouseY);
}
function mousePressed() {
  background(255);
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  fill(100);
  line(width/4,height/4,width*3/4, height/4);
  line(width/4,height/4,width/4, height*3/4);
  line(width/4,height*3/4,width*3/4, height*3/4);
  line(width*3/4,height/4,width*3/4, height*3/4);
let leftx;
let topy;
let rightx;
let boty;
function setup() { 
  createCanvas(600, 400);
  leftx = width/4;
  topy = height/4;
  rightx = width*3/4;
  boty = height*3/4;
} 
function draw() { 
  background(220);
  line(leftx, topy, rightx, topy);
  line(leftx, boty, rightx, boty);
  line(rightx,topy, rightx, boty);
  line(leftx, topy, leftx, boty); 
}
tl = { x: leftx, y: topy };
      
  var y;
function setup() { 
  createCanvas(800, 200);
  createCanvas(windowWidth, windowHeight);
  background(120);
  x = width/2;
  y = height/2;
  console.log(width, " ", height);
} 
function draw() {
  rectMode(CENTER);
  noStroke();
  rect(x, y, x, y);
}function setup() { 
  createCanvas(600, 400);
  
  background(150);
  
  noStroke();
  fill(100);
  rect(0, 275, 600, 125);
  
  stroke(64, 128, 0);
  fill(64, 128, 0);
  curve(30, 250, 300, 50, 100, 320, 50, 2000);
  curve(-50, -150, 300, 50, 100, 320, -1000, 1000);
  fill(50, 50, 50);
  noStroke();
  quad(345, -20, 355, -20, 150, 250, 150, 250);
  stroke(0,150,0);
  fill(64, 128, 0);
  fill(50, 50, 50);
  noStroke();
  
  noStroke();
  fill(180, 101, 38);
  ellipse(300, 270, 90, 75);
  fill(186, 106, 43);
  ellipse(300, 280, 60, 55);
  fill(180, 101, 38);
  stroke(175, 95, 35);
  ellipse(270, 300, 30, 20);
  ellipse(330, 300, 30, 20);
  fill(51, 26, 0);
  ellipse(285, 275, 16, 8);
  ellipse(315, 275, 16, 8);
  ellipse(300, 295, 18, 18);
  fill(186, 106, 43);
  stroke(175, 95, 35);
  curve(50, 200, 330, 250, 330, 260, 400, -200);
  curve(0, 100, 265, 250, 260, 260, 500, -200);
} 
function draw() { 
  
}
function setup() { 
  createCanvas(650, 500);
} 
function draw() { 
  background(0,255,255);
  drawLines();
  drawEllip();
  drawSquare();
}
function drawLines() {
  fill(255, 0, 0);
  quad(-20, 10, 15, -15, 650, 475, 650, 525);
}
function drawEllip() {
  fill(0, 205, 0);
	ellipse(325, 250, 320, 240);
  noStroke();
}
function drawSquare() {
  fill(0, 0, 150);
  rect(445, 210, 40, 40);
}function setup() { 
  createCanvas(600, 450);
} 
function draw() { 
  background(220);
  ellipse(300, 200, 100, 100);
  noFill();
  stroke(0, 255, 255);
  strokeWeight(5);
}
function setup() { 
} 
function draw() { 
  createCanvas(600, 600);
  background(220);
}