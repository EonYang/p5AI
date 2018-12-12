let link;
function setup() {
  createCanvas(400, 400);
  
  let col = color(240, 199, 68)
  link.style('color', '#f0c744');
  link.style('font-size', '17px')
  link.style('font-family', 'BASKERVILLE');
}
function draw() {
  background(220);
 
  link.position(50, 100);
}let parsed;
function setup() {
  createCanvas(windowWidth, windowHeight);
  loadJSON(url, gotData);
  let jsonData;
}
    
    
function gotData(data) {
  background(220);
  console.log('the dta', data.length);
  jsonData = data
  
  
  
  
  let fear = 0;
  let fearC = 0;
  
  for (let i = 0; i < data.length; i++) {
  const realdata = JSON.parse(data[i].data); 
  
  console.log('the real data ', realdata.a1);
    
    if(realdata.a1 === undefined) {
    } else {
			fear += realdata.a1[0];
    	fearC++;
    }
    
    
    
  let fearA = fear/fearC;
  console.log("FEar avg:" , fearA);
  console.log(fearC);
  }
 
} 
    
      
    
    
  
function draw() {
}
  
  
   
  
	
	
function setup() {
  createCanvas(displayWidth,displayHeight)
  background(220);
	textStyle(BOLD);
 	textFont('HELVETICA', 25);
	text('YOUR AVERAGE EMOTIONAL RESPONSE VS. TOTAL USERS AVERAGE EMOTIONAL RESPONSE*', 150, 75)
   textFont('HELVETICA', 20);
  text('CURRENT USER AVERAGE EMOTIONS', 250, 170)
  text('TOTAL USERS AVERAGE EMOTIONS', 900, 175)
  strokeWeight(3); 
  line(100, 100, 1375, 100);
  line(750, 100, 750, displayHeight -50);
  
  textStyle(BOLD);
   textFont('Helevetica', 15);
  	text('Fear\n', 325, 305)
    textStyle(NORMAL);
  	text('7.7', 325, 325)
  
  
  textStyle(BOLD);
   textFont('Helevetica', 15);
  	text('Anger\n', 325, 455)
    textStyle(NORMAL);
  	text('7.7', 325, 475)
  
   textStyle(BOLD);
   textFont('Helevetica', 15);
  	text('Sadness\n', 325, 605)
    textStyle(NORMAL);
  	text('7.7', 325, 625)
   
  
  textStyle(BOLD);
   textFont('Helevetica', 15);
  	text('Neutral\n', 325, 755)
    textStyle(NORMAL);
  	text('7.7', 325, 775)
  
   textStyle(BOLD);
   textFont('Helevetica', 15);
  	text('Fear', 1180, 305)
    textStyle(NORMAL);
  	text('7.7', 1180, 325)
  
  
  textStyle(BOLD);
   textFont('Helevetica', 15);
  	text('Anger\n', 1180, 455)
    textStyle(NORMAL);
  	text('7.7', 1180, 475)
  
   textStyle(BOLD);
   textFont('Helevetica', 15);
  	text('Sadness\n', 1180, 605)
    textStyle(NORMAL);
  	text('7.7', 1180, 625)
   
  
  textStyle(BOLD);
   textFont('Helevetica', 15);
  	text('Neutral\n', 1180, 755)
    textStyle(NORMAL);
  	text('7.7', 1180, 775)
  
  
  
  }
  function draw() {
    fill('red');
    noStroke();
    ellipse(450,300,100);
    fill('blue');
    ellipse(450,450,80);
    fill('orange');
    ellipse(450,600,60);
  
    fill('green');
    ellipse(450,750,60);
    
    
    
    fill('red');
    noStroke();
    ellipse(1100,750,100);
    fill('blue');
    ellipse(1100,450,80);
    fill('orange');
    ellipse(1100,600,60);
  
    fill('green');
    ellipse(1100,300,60);
  
  
    
  }
let parsed;
let counter = 0;
let isMouseClicked = false;
function setup() {
  createCanvas(windowWidth, windowHeight);
  loadJSON(url, gotData);
let jsonData;
}
  function mouseClicked() {
    counter++;
  	console.log("counter is " + counter);
    isMouseClicked = true;
  }
function gotData(data) {
  
  
  background(220);
  console.log('the dta', data.length);
  jsonData = data
  parsed = JSON.parse(data[counter].data);
  console.log('the parsed data', parsed);
  console.log('a1 is', parsed.a1[0]);
  console.log(parsed.a1.length);
  let keys = Object.keys(parsed);
  let values = Object.values(parsed);
  let hspacing = (width - 300) / 4;
  let vspacing = (height - 100) / 4;
  textSize(17)
  text("Fear ", hspacing + 15, 50);
  text("Anger ", hspacing * 1 + 285, 50)
  text("Sadness ", hspacing * 2 + 275, 50)
  text("Neutral ", hspacing * 3 + 280, 50)
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      fill('black')
      textSize(17)
      text("Audio " + `${i + 1}`, 150, vspacing * i + 135)
      noStroke();
      if (j == 0) {
        fill(color(228, 60, 36));
        ellipse(hspacing * j + 300, vspacing * i + 125, 9 * values[i][j] + 10);
      } else if (j == 1) {
        fill(color(241, 212, 101));
        ellipse(hspacing * j + 300, vspacing * i + 125, 9 * values[i][j] + 10);
      } else if (j == 2) {
        fill(color(94, 148, 248));
        ellipse(hspacing * j + 300, vspacing * i + 125, 9 * values[i][j] + 10);
      } else if (j == 3) {
        fill(color(156, 164, 135));
        ellipse(hspacing * j + 300, vspacing * i + 125, 9 * values[i][j] + 10);
      }
      console.log(values[i][j]);
    }
  }
  
}
function draw() {
    if(isMouseClicked){
      console.log("In draw" +isMouseClicked);
       gotData(jsonData, counter);
      isMouseClicked = false;
    }
  }let Users;
function setup() {
  createCanvas(400, 400);
 loadJSON(url, gotData);
}
function gotData(data) {
  fill('blue')
  let parsed = JSON.parse(data[0].data);
  let size = parsed.a1E1;
  
  let keys = Object.keys(parsed);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
		let value = parsed[key];
    let action = key.substr(0, 2);
    let actionNumber = parseInt(action.substr(1, 1));
    let emotionNumber = parseInt(key.substr(3, 1));
    
		if (action === "a1") {
      ellipse(width / 4 * emotionNumber - 50, 100, value + 10);
    }
    
		if (action === "a2") {
      ellipse(width / 4 * emotionNumber - 50, 300, value + 10);
    }
    
    
  
  }
    
  
  
  
  
    
  	console.log(JSON.parse(data[0].data));
}
function draw() {
}var database;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent('canvascontainer');
  
  
  
    var config = {
    apiKey: "AIzaSyAWfasCIzVm8te6D1qUN8C5ifNZ0M7Z7fk",
    authDomain: "pcomicmfinal.firebaseapp.com",
    projectId: "pcomicmfinal",
    storageBucket: "pcomicmfinal.appspot.com",
    messagingSenderId: "823435746796"
  };
  firebase.initializeApp(config);
  
  database = firebase.database();
  
  var ref = database.ref('/experiences');
  
  
  var user = {
    emotionSubmissions: {
    title1:"Dallas Police Shooting",
    aud_1_anger: Number(10),
    aud_1_sad: Number(2),
    aud_1_fear: Number(7),
    aud_1_neutral: Number(0),
    
    title2:"Trump vs Immigrants",
    aud_2_anger: Number(10),
    aud_2_sad: Number(2),
    aud_2_fear: Number(7),
    aud_2_neutral: Number(0),
      
    title3:"Synagogue massacre",
    aud_3_anger: Number(10),
    aud_3_sad: Number(2),
    aud_3_fear: Number(7),
    aud_3_neutral: Number(0),
    
      
      
    title4:"Synagogue massacre",
    aud_4_anger: Number(10),
    aud_4_sad: Number(2),
    aud_4_fear: Number(7),
    aud_4_neutral: Number(0)
    
    textSubmissions : {
    how_take_action: "I will speak out against discrimination",
    why_no_action:null
    
  }
  
  var result = ref.push(user);
  console.log(user);
  
  
}
function draw() {
  background(220);
}
  
  
  
  
function setup() {
  createCanvas(400, 400);
  
  var config = {
    apiKey: "AIzaSyAWfasCIzVm8te6D1qUN8C5ifNZ0M7Z7fk",
    authDomain: "pcomicmfinal.firebaseapp.com",
    projectId: "pcomicmfinal",
    storageBucket: "pcomicmfinal.appspot.com",
    messagingSenderId: "823435746796"
  };
  firebase.initializeApp(config);
  
  console.log(firebase);
}
function draw() {
  background(220);
}let tracking;
let a;
let song;
let button;
let textin;
let Dal1;
let Dal2;
let Dal3;
let Syn1;
let Syn2;
let Syn3;
let Trump1;
let Trump2;
let Trump3;
let Cali1;
let Cali2;
let Cali3;
function preload() {
   
	Dal1 = createImg('DallasOFficer.png');
  Dal2 = createImg('DallasVictim.png');
  Dal3 = createImg('DallasShooter.png');
  
  Syn1 = createImg('Synagogue.png');
  Syn2 = createImg('JewishHug.png');
  Syn3 = createImg('SynagogueMourning.png');
  
  Cali1 = createImg('CaliBar.png');
  Cali2 = createImg('CaliShooter.png');
  Cali3 = createImg('CaliBar2.png');
  
  Trump1 = createImg('TrumpGuns.png');
  Trump2 = createImg('TrumpSanctions.png');
	Trump3 = createImg('TrumpRocks.png');
  
  
  song = loadSound('Audio3.mp3');
  button = createImg('button.png')
  button.size(150, 150);
  button.position(displayWidth/2+25, 400)
  button.mousePressed(play);
  
  song2 = loadSound('Audio2.mp3');
  button2 = createImg('button.png')
  button2.size(150, 150);
  button2.position(displayWidth/2+27, 400)
  button2.mousePressed(play2);
  
  
  song3 = loadSound('Audio1.mp3');
  button3 = createImg('button.png')
  button3.size(150, 150);
  button3.position(displayWidth/2+35, 400)
  button3.mousePressed(play3);
  
  song4 = loadSound('Audio4.mp3');
  button4 = createImg('button.png')
  button4.size(150, 150);
  button4.position(displayWidth/2+25, 400)
  button4.mousePressed(play4);
  
  
  textin=createInput();
  textin.position(displayWidth/2+75, displayHeight/2-40);
}
function setup() {
  createCanvas(displayWidth, displayHeight);
  tracking = 1;
  
  var config = {
    apiKey: "AIzaSyAWfasCIzVm8te6D1qUN8C5ifNZ0M7Z7fk",
    authDomain: "pcomicmfinal.firebaseapp.com",
    projectId: "pcomicmfinal",
    storageBucket: "pcomicmfinal.appspot.com",
    messagingSenderId: "823435746796"
  };
  firebase.initializeApp(config);
  console.log(firebase);
  
  var database = firebase.database();
  
  
  
}
function play() { 
  if (song.isPlaying()) {
   song.pause();
  } else {
    song.play();
  }}
function play2() { 
  if (song2.isPlaying()) {
   song2.pause();
  } else {
    song2.play();
  }}
function play3() { 
  if (song3.isPlaying()) {
   song3.pause();
  } else {
    song3.play();
  }}
function play4() { 
  if (song4.isPlaying()) {
   song4.pause();
  } else {
    song4.play();
  }}
function draw() {
  background(255);
  
  
  if(tracking == 1){
    button.hide();
    button2.hide();
    button3.hide();
    button4.hide();
    textin.hide();
    Cali1.hide();
    Cali2.hide();
    Cali3.hide();
    Trump1.hide();
    Trump2.hide();
    Trump3.hide();
    Dal1.hide();
    Dal2.hide();
    Dal3.hide();
    Syn1.hide();
    Syn2.hide();
    Syn3.hide();
    intro();
  }
  else if (tracking == 2){
    firstAudio()
    button.show()
    button2.hide()
    button3.hide()
    button4.hide()
    textin.hide()
   
  }
  else if(tracking == 3){
 		howFeel()
    button.hide()
    button2.hide()
    button3.hide()
    button4.hide()
    textin.hide()
  }
  else if(tracking == 4){
 		shouldPage()
    button.hide()
    button2.hide()
    button3.hide()
    button4.hide()
    textin.hide()}
  
  else if (tracking == 5){
    secAudio()
    button2.show()
    button.hide()
    button3.hide()
    button4.hide()
    textin.hide()
  }
  else if(tracking == 6){
 		howFeel()
   button.hide()
    button2.hide()
    button3.hide()
    button4.hide()
    textin.hide()}
  
  else if(tracking == 7){
 		shouldPage()
  button.hide()
    button2.hide()
    button3.hide()
    button4.hide()
    textin.hide()}
  
   else if (tracking == 8){
    thirdAudio()
      button.hide()
    button2.hide()
    button4.hide()
    textin.hide()
    button3.show()}
  
  else if(tracking == 9){
 		howFeel()
    button.hide()
    button2.hide()
    button3.hide()
    button4.hide()
    textin.hide()
  }
  else if(tracking == 10){
 		shouldPage()
 	 button.hide()
    button2.hide()
    button3.hide()
    button4.hide()
    textin.hide()}
  
  else if (tracking == 11){
    fourthAudio()
    button4.show()
    button.hide()
    button2.hide()
    button3.hide()
    textin.hide()
  }
  else if(tracking == 12){
 		howFeel()
    button.hide()
    button2.hide()
    button3.hide()
    button4.hide()
    textin.hide()
  }
  else if(tracking == 13){
 		shouldPage()
  	button.hide()
    button2.hide()
    button3.hide()
    button4.hide()
    textin.hide()}
  
  else if(tracking== 14){
    nowPage()
  	button.hide()
    button2.hide()
    button3.hide()
    button4.hide()
    textin.hide()
  }
  
  else if(tracking== 15){
    howPage()
    textin.show()
  }
  
  else if(tracking== 16){
  whyPage()
  textin.show()
  }
  
}
 
function keyPressed(){
  
if (keyCode === 90){
  tracking++;
    console.log("yay")}
  else if(keyCode === LEFT_ARROW){
  tracking = tracking - 1
  }
  if(keyCode === 65 && tracking==14){
  tracking = 15}
  
   if(keyCode === 83 && tracking==14){
  tracking = 16}
 	if(keyCode === 82){
  tracking = 1
  }
  
  if(keyCode === 88){
 		play()
  }
  
  if(keyCode === 88 && tracking === 5){
 play2()
    song.pause()
  }
    if(keyCode === 88 && tracking === 8){
 play3()
    song.pause()
    song2.pause() 
  }
  
 
    if(keyCode === 88 && tracking === 11){
 		play4()
    song.pause()
    song2.pause() 
    song3.pause()  
  }
  
}
function intro(){
  
textFont('Baskerville', 100);
text('Feeling in the Times', displayWidth/2-295, displayHeight/2 - 100)  
  
textFont('Helvetica', 25);
text('PRESS Z TO START', displayWidth/2, displayHeight/2) 
}
function firstAudio() {
imageMode(CENTER)
image(Dal1, displayWidth/3-150, 80, 250, 250)
image(Dal2, displayWidth/3+300, 80, 250, 250)
image(Dal3, displayWidth/3+750, 80, 250, 250)
  
textFont('Baskerville', 100);
text('Press X For Audio', displayWidth/2-295, displayHeight/2 - 75) 
textFont('Helvetica', 30);
text('Date: September 9, 2018', displayWidth/2-70, displayHeight/2-30) 
  
}
function howFeel() {
textFont('Baskerville', 50);
text('HOW DOES THAT MAKE YOU FEEL?', displayWidth/2-300, displayHeight/2 - 100) 
  
textFont('Helvetica', 10);
text('Use remote control to answer. You may use multiple responses.', displayWidth/2+20, displayHeight/2-60) 
}
function shouldPage() {
textFont('Baskerville', 60);
text('Should You Feel That Way?', displayWidth/2-295, displayHeight/2 - 100) 
}
function secAudio() {
imageMode(CENTER)
image(Syn1, displayWidth/3-150, 80, 250, 250)
image(Syn2, displayWidth/3+300, 80, 250, 250)
image(Syn3, displayWidth/3+750, 80, 250, 250)
  
textFont('Baskerville', 100);
text('Press X For Audio', displayWidth/2-295, displayHeight/2 - 100) 
textFont('Helvetica', 30);
text('Date: October 27, 2018', displayWidth/2-70, displayHeight/2-30) 
  
}
function thirdAudio() {
imageMode(CENTER)
image(Trump1, displayWidth/3-150, 80, 250, 250)
image(Trump2, displayWidth/3+300, 80, 250, 250)
image(Trump3, displayWidth/3+750, 80, 250, 250)  
  
textFont('Baskerville', 100);
text('Press X For Audio', displayWidth/2-295, displayHeight/2 - 100) 
textFont('Helvetica', 30);
text('Date: November 2, 2018', displayWidth/2-70, displayHeight/2-30) 
  
}
function fourthAudio() {
  
imageMode(CENTER)
image(Cali1, displayWidth/3-150, 80, 250, 250)
image(Cali2, displayWidth/3+300, 80, 250, 250)
image(Cali3, displayWidth/3+750, 80, 250, 250)  
  
textFont('Baskerville', 100);
text('Press X For Audio', displayWidth/2-295, displayHeight/2 - 100) 
textFont('Helvetica', 30);
text('Date: November 8, 2018', displayWidth/2-70, displayHeight/2-30) 
 
}
function howPage(){
  
 textFont('Baskerville', 100);
	text('HOW?', displayWidth/2, displayHeight/2 - 100) 
  
  textFont('Helvetica', 10);
	text('ENTER TEXT INTO FIELD || PRESS GO TO SUBMIT', displayWidth/2+20, displayHeight/2-60)
}
function whyPage(){
  
 textFont('Baskerville', 100);
	text('WHY?', displayWidth/2, displayHeight/2 - 100) 
  
  textFont('Helvetica', 10);
	text('ENTER TEXT INTO FIELD || PRESS GO TO SUBMIT', displayWidth/2+20, displayHeight/2-60)
}
function nowPage(){
 textFont('Baskerville', 50);
	text('Now that you Feel, Will you take Action?', displayWidth/2-295, displayHeight/2 - 100) 
	textFont('Helvetica', 18);
	text('IF YES PRESS A || IF NO PRESS S', displayWidth/2, displayHeight/2-40) 
}
let circleSize, b, c, d = 0;
let potentiometerReadings;
let newR;
let newB;
let newC;
let newD;
let happy = 5;
let sad = 3;
let fear = 4;
let neutral = 0;
function preload() {
}
function setup() {
  createCanvas(600, 600);
  button = createButton('submit');
  button.position(19, 19);
  button.mousePressed(submitData);
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
  if (currentString) {
    potentiometerReadings = split(currentString, ",");
    if (potentiometerReadings.length == 4) {
      console.log(potentiometerReadings);
    }
  }
}
function draw() {
  background(220);
  textSize(64);
  fill(255, 0, 0);
  text(happy, 100, 200);
  text(sad, 200, 200);
  text(fear, 300, 200);
  text(neutral, 400, 200);
}
function submitData() {
  var emotions = {
    happy: happy,
    sad: sad,
    fear: fear,
    neutral: neutral
  }
  console.log(emotions)
}let song;
let button;
function preload() {
  song = loadSound('Audio4.mp3');
  button = createImg('button.png')
  button.size(150, 150);
  button.position(displayWidth/2+50, 450)
  button.mousePressed(play);
}
function play() { 
  if (song.isPlaying()) {
   song.pause();
  } else {
    song.play();
  }
  
}
function setup() {
  createCanvas(displayWidth, displayHeight);
}
function draw() {
textFont('Baskerville', 100);
text('Press Play For Audio', displayWidth/2-295, displayHeight/2 - 100) 
}let song;
let button;
function preload() {
  song = loadSound('Audio3.mp3');
  button = createImg('button.png')
  button.size(150, 150);
  button.position(displayWidth/2+50, 450)
  button.mousePressed(play);
}
function play() { 
  if (song.isPlaying()) {
   song.pause();
  } else {
    song.play();
  }
  
}
function setup() {
  createCanvas(displayWidth, displayHeight);
}
function draw() {
textFont('Baskerville', 100);
text('Press Play For Audio', displayWidth/2-295, displayHeight/2 - 100) 
}let song;
let button;
function preload() {
  song = loadSound('Audio2.mp3');
  button = createImg('button.png')
  button.size(150, 150);
  button.position(displayWidth/2+50, 450)
  button.mousePressed(play);
}
function play() { 
  if (song.isPlaying()) {
   song.pause();
  } else {
    song.play();
  }
  
}
function setup() {
  createCanvas(displayWidth, displayHeight);
}
function draw() {
textFont('Baskerville', 100);
text('Press Play For Audio', displayWidth/2-295, displayHeight/2 - 100) 
}var slider1, slider2, slider3, slider4;
let r;
function setup() {
  createCanvas(displayWidth, displayHeight);
  colorMode(HSB);
  slider1 = createSlider(0, 1, 0, 0.1)
  slider1.position = (70, 20);
  slider1.style('width', '300');
  var p = createP("Angry");
  p.position(60, 900);
  p.style('color', '#ff0000')
  p.style('font-size', '21px')
  slider2 = createSlider(0, 1, 0, 0.1)
  slider2.position = (170, 20);
  slider2.style('width', '300');
  var k = createP("Sad");
  k.position(180, 900);
  k.style('color', '#1a53ff')
  k.style('font-size', '21px')
  slider3 = createSlider(0, 1, 0, 0.1)
  slider3.position = (170, 20);
  slider3.style('width', '300');
  var s = createP("Fear");
  s.position(320, 900);
  s.style('color', '#000000')
  s.style('font-size', '21px')
  slider4 = createSlider(0, 1, 0, 0.1)
  slider4.position = (170, 20);
  slider4.style('width', '300');
  var t = createP("Happy");
  t.position(440, 900);
  t.style('color', '#ff6600')
  t.style('font-size', '21px')
}
function draw() {
  background(51);
  r = map(slider1.value(), 0, 1, 0, 700);
  fill('red');
  noStroke();
  ellipse(365, 500, r);
  k = map(slider2.value(), 0, 1, 0, 700);
  fill('blue');
  noStroke();
  ellipse(730, 500, k);
  g = map(slider3.value(), 0, 1, 0, 700);
  fill('black');
  noStroke();
  ellipse(1000, 500, g);
  m = map(slider4.value(), 0, 1, 0, 700);
  fill('orange');
  noStroke();
  ellipse(1221, 500, m);
}function setup() {
  createCanvas(displayWidth, displayHeight);
  
    
}
function draw() {
}
function setup() {
  createCanvas(displayWidth, displayHeight);
}
function draw() {
textFont('Baskerville', 80);
text('How Does That Make You Feel?', displayWidth/2-550, displayHeight/2 - 100)
}let song;
let button;
function preload() {
  song = loadSound('Audio1.mp3');
  button = createImg('button.png')
  button.size(150, 150);
  button.position(displayWidth/2+50, 450)
  button.mousePressed(play);
}
function play() { 
  if (song.isPlaying()) {
   song.pause();
  } else {
    song.play();
  }
  
}
function setup() {
  createCanvas(displayWidth, displayHeight);
}
function draw() {
textFont('Baskerville', 100);
text('Press Play For Audio', displayWidth/2-295, displayHeight/2 - 100) 
let button;
let imgHolder = [];
let bigBirdImg;
function setup() {
  loadJSON(url, gotData);
  button = createImg('mouse.jpg')
  button.size(120, 120);
  button.mousePressed(bigbird);
}
function draw() {
  createCanvas(displayWidth, displayHeight);
  background(0);
  
  button.position(mouseX, mouseY);
}
function bigbird() {
  removeElements();
  
  
  button = createImg('mouse.jpg')
  button.size(120, 120);
  button.mousePressed(bigbird);
  
  bigBirdImg = createImg(random(imgHolder));
  bigBirdImg.size(200, 200);
  bigBirdImg.position(random(400), random(400));
}
function gotData(giphy) {
  for (let i = 0; i < giphy.data.length; i++) {
    imgHolder = append(imgHolder, giphy.data[i].images.original.url);
  }
let button;
function setup() {
  noCanvas();
  loadJSON(url, gotData);
  button = createImg('mouse.jpg')
  button.size(120, 120);
}
function draw() {
  background(220);
  createCanvas(400, 400);
  button.position(mouseX, mouseY-10);
  if (mouseIsPressed) {
  }
}
function gotData(giphy) {
  for (let i = 0; i < giphy.data.length; i++) {
  }
}let s;
let scl = 20;
let food;
function setup() {
  createCanvas(400, 400);
  s = new Snake();
  frameRate(10);
 pickLocation();
}
function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
function draw() {
  background(220);
 
 if ( s.eat(food)) {
   
 pickLocation();
 
 }
  s.death();
  s.update();
  s.show();
  fill(255, 25, 100);
  rect(food.x, food.y, scl, scl);
}
function keyPressed() {
  if (keyCode == UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode == DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode == LEFT_ARROW) {
    s.dir(-1, 0);
  } else if (keyCode == RIGHT_ARROW) {
    s.dir(1, 0);
  }
}let video;
function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.hide();
}
function draw() {
  background(220);
  image(video, 0, 0, width, height);
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      var currentRed = pixels[4 * (y * width + x)];
      var currentGreen = pixels[4 *(y * width + x) + 1];
      var currentBlue = pixels[4 *(y * width + x) + 2];
    }
  }
updatePixels();
}
let mickey;
function preload(){
	mickey = loadImage('evilmouse.jpg')
 } 
class Mickey {
  constructor(xpos, ypos, wid, leng) {
    rectMode(RADIUS);
    this.xpos = xpos;
    this.ypos = ypos;
    this.wid = wid;
    this.leng = leng;
 }
  
  
}
let m;
function setup() {
  createCanvas(500, 500);
  m = new Mickey(mouseX,mouseY, 160, 4);
 
  mus = createAudio('dbz.mp3');
  
}
function draw() {
  background(105,168,130);
  image(mickey, 0, 0, 200,200);
  m.show();
let ele;
class BBall {
  constructor(xpos, ypos, vx, vy, radius) {
    this.x = xpos;
    this.y = ypos;
    this.xdir = vx;
    this.ydir = vy;
    this.r = radius;
  }
  displayBall() {
    fill(238, 118, 0)
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.r, this.r)
    strokeWeight(3);
    line(this.x, this.y - 26, this.x, this.y + 25);
    arc(this.x - 20, this.y, 30, 38, -1.5, 1.51);
    arc(this.x + 20, this.y, 30, 40, 1.750, 4.630);
    strokeWeight(3);
    line(this.x - 25, this.y, this.x + 25, this.y);
  }
  displayText() {
    stroke(3);
    let s = 'THUNDER UP!';
    
    fill(238, 196, 65);
    textStyle(BOLD);
    let sz  = random(50,60);
    textSize(sz);
    textFont('Helvetica');
    
  }
  move() {
    this.x = this.x + this.xdir;
    this.y = this.y + this.ydir;
  }
  playMusic() {
 
    if (mouseIsPressed) {
    ele.play();
    }
  }
  bounce() {
    if (this.x > width || this.x < 0) {
      this.xdir = this.xdir * -1;
    }
    if (this.y > height || this.y < 0) {
      this.ydir = this.ydir * -1;
    }
  }
}
let basketBalls = [];
function setup() {
  createCanvas(720, 400);
  ele = createAudio('sound.mp3');
}
 function keyPressed () {
    ball = new BBall (50, 200, 4, 2, 55);
    basketBalls.push(ball);
  
 }
function draw() {
  
      background(60, 106, 227);
for ( let i = 0; i < basketBalls.length; i ++) {
  ellipse(basketBalls[i].xpos,  basketBalls[i].ypos,  basketBalls[i].r,  basketBalls[i].r);
 
   basketBalls[i].displayBall()
   basketBalls[i].displayText()
   basketBalls[i].move()
   basketBalls[i].bounce()
	 basketBalls[i].playMusic()
  
}
let ele;
class BBall {
  constructor(xpos, ypos, vx, vy, radius) {
    this.x = xpos;
    this.y = ypos;
    this.xdir = vx;
    this.ydir = vy;
    this.r = radius;
  }
  displayBall() {
    fill(238, 118, 0)
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.r, this.r)
    strokeWeight(3);
    line(this.x, this.y - 26, this.x, this.y + 25);
    arc(this.x - 20, this.y, 30, 38, -1.5, 1.51);
    arc(this.x + 20, this.y, 30, 40, 1.750, 4.630);
    strokeWeight(3);
    line(this.x - 25, this.y, this.x + 25, this.y);
  }
  displayText() {
    stroke(3);
    let s = 'THUNDER UP!';
    
    fill(238, 196, 65);
    textStyle(BOLD);
    let sz  = random(50,60);
    textSize(sz);
    textFont('Helvetica');
    
  }
  move() {
    this.x = this.x + this.xdir;
    this.y = this.y + this.ydir;
  }
  playMusic() {
 
    if (mouseIsPressed) {
    ele.play();
    }
  }
  bounce() {
    if (this.x > width || this.x < 0) {
      this.xdir = this.xdir * -1;
    }
    if (this.y > height || this.y < 0) {
      this.ydir = this.ydir * -1;
    }
  }
}
let basketBalls = [];
function setup() {
  createCanvas(720, 400);
  for (let i = 0; i < 2; i ++) {
   basketBalls[i] = new BBall(200, 200, 4, 2, 55);
  }   
  ele = createAudio('sound.mp3');
}
function draw() {
  
      background(60, 106, 227);
  ellipse ( basketBalls[0].xpos,  basketBalls[0].ypos,  basketBalls[0].r,  basketBalls[0].r);
  ellipse ( basketBalls[1].xpos,  basketBalls[1].ypos,  basketBalls[1].r,  basketBalls[1].r);
   basketBalls[0].displayBall()
   basketBalls[0].displayText()
   basketBalls[0].move()
   basketBalls[0].bounce()
  
   basketBalls[1].displayBall()
   basketBalls[1].displayText()
   basketBalls[1].move()
   basketBalls[1].bounce()
	 basketBalls[1].playMusic()
  
	
}let song;
let amp;
let volhistory = [];
function preload() {
  song = loadSound('music.mp3');
}
function beginSong() {
  if (song.isPlaying()) {
    song.pause();
  }
  
  else {
       song.play();
  }
}
function setup() {
  createCanvas(displayWidth, displayHeight);
  fft = new p5.FFT();
  song.play();
  amp = new p5.Amplitude();
  angleMode(DEGREES);
  button = createButton('Start');
  button.mousePressed(beginSong);
}
function draw() {
  background(0);
  fft.analyze();
  let vol = amp.getLevel();
  volhistory.push(vol);
  stroke(2,2,255);
  noFill();
  translate(400, 400);
  beginShape();
  for (let i = 0; i < 360; i++) {
    r = map(volhistory[i], 0, 1, 25, 500);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex (x,y);
  }
  endShape();
  
  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }
  bass = (int)(fft.getEnergy("bass"));
  treble = (int)(fft.getEnergy("treble"));
  fill('red')
  ellipse(width / 2, height / 4, bass *2);
  fill(treble, 0, bass)
  ellipse(width / 2, height / 4, treble * 3);
}let song;
let slider;
let photoVal;
function setup() {
  createCanvas(400, 400);
  song = loadSound("Thriller_3mb.mp3");
  slider = createSlider(0, 1, 0.5, 0.01);
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
  if (photoVal < 10) {
    song.play();
    asp = true
  } else {
    song.stop();
  }
  if (song.isPlaying()) {
    if (asp == true) {
    }
  }
  function draw() {
    background(220);
    song.setVolume(slider.value());
  }
}let song;
let slider;
let startParty = false;
let asp = false;
let photoVal;
function preload() {
  song = loadSound("Thriller_3mb.mp3");
}
function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 1, 0.5, 0.01);
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
  if (photoVal > 10) {
    startParty = false;
  } else {
  }
  if (startParty == true) {
    if (asp == true) {
    }
  }
  if (startParty == true) {
    if (asp == false) {
      song.play();
      asp = true;
    }
  }
  if (asp == true) {
    if (startParty == false) {
      asp = false;
      song.pause();
    }
  }
  function playMusic() {
    if (photoVal < 10) {
      song.play();
    }
  }
  function draw() {
    background(220);
    song.setVolume(slider.value());
  }
function setup() {
  createCanvas(600, 600);
  loadJSON(WeatherOfCity, gotData);
}
function gotData(data) {
  fill("blue");
  ellipse(random(width), random(height), data.main.temp);
   console.log(data.main.temp);
}
function draw() {
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
}let w = [];
let mus;
class Dumbell {
  constructor(xpos, ypos, wid, leng) {
    rectMode(RADIUS);
    this.xpos = xpos;
    this.ypos = ypos;
    this.wid = wid;
    this.leng = leng;
  }
  show() {
    translate(mouseX, mouseY);
    fill(55,60,123); 
  	rect(this.xpos,this.ypos,this.wid,this.leng);
    fill(222,150,45); 
    rect(this.xpos -130,this.ypos,this.wid-155,this.leng +31);
    rect(this.xpos -140,this.ypos,this.wid-155,this.leng +21);
    rect(this.xpos-150,this.ypos,this.wid-155,this.leng+11);
    rect(this.xpos+130,this.ypos,this.wid-155,this.leng+31);
    rect(this.xpos+140,this.ypos,this.wid-155,this.leng+21);
    rect(this.xpos+150,this.ypos,this.wid-155,this.leng+11);
  }
  
  
  drop() {
  
  }
  
  sound() {
    if (mouseIsPressed) {
      mus.play();
    }
  }
  
  bgcolor() {
  
    if (keyIsPressed === true) {
      background(234,225,8);
    }
  
  }
  
  showImage() {
  
  }
  
}
let dumbell, dumbell0,dumbell2;
function setup() {
  createCanvas(displayWidth, displayHeight);
  dumbell = new Dumbell(200,200, 160, 4);
  dumbell0 = new Dumbell(200,300, 160, 4);
  dumbell2 = new Dumbell(200,100, 160, 4);
  mus = createAudio('dbz.mp3');
  for (let i = 0; i < 10; i++) {
  let hello = new Dumbell (200, 200, 160, 4);
  w.push(hello)
  }
}
function draw() {
  background(105,168,130);
  dumbell.show();
  dumbell0.show();
  dumbell2.show();
  dumbell.sound();
  dumbell.bgcolor();
  for (let i = 0; i < w.length; i++) {
    w[i].show();
  }
}var  a, b, c, d, e;
function setup() {
  createCanvas(displayWidth, displayHeight);
  noStroke();
  a = color(188, 124, 58);
  b = color(123, 161, 139);
  c = color(88, 68, 158);
  d = color(87, 118, 242);
  e = color(138, 38, 51);
  
}
function draw() {
  background(220);
  drawBand(a, b, c, d, e, 0, width/128);
  drawBand(c, a, d, b, e, height/2, width/128);
}
function drawBand(v, w, x, y, z, ypos, barWidth) {
  var num = 5;
  var colorOrder = [ v, w, x, y, z ];
  for(var i = 0; i < width; i += barWidth*num) {
    for(var j = 0; j < num; j++) {
      fill(colorOrder[j]);
      rect(i+j*barWidth, ypos, barWidth, height/2);
    }
  }
}	let z = [];
	function setup() {
	  createCanvas(displayWidth, displayHeight);
	  for (let i = 0; i <500; i++) {
	    let ball = new Ball(random(0, width), random(0, height), random(-1, 1), random(-1, 1), random(1, 50));
	    z.push(ball)
	  }
	}
	function draw() {
	  for (let i = 0; i < z.length; i++) {
	    z[i].move();
	    z[i].display()
	  }
    if (mouseIsPressed) {
   a = color(188, 124, 58);
	  b = color(123, 161, 139);
	  c = color(88, 68, 158);
	  d = color(87, 118, 242);
	  e = color(138, 38, 51);
	  var multiC = [a, b, c, d, e];
	  background(random(multiC));
  }
    
    
    
	}
	function mousePressed() {
	  a = color(188, 124, 58);
	  b = color(123, 161, 139);
	  c = color(88, 68, 158);
	  d = color(87, 118, 242);
	  e = color(138, 38, 51);
	  var multiC = [a, b, c, d, e];
	  background(random(multiC));
let ele;
class BBall {
  constructor(xpos, ypos, vx, vy, radius) {
    this.x = xpos;
    this.y = ypos;
    this.xdir = vx;
    this.ydir = vy;
    this.r = radius;
  }
  displayBall() {
    fill(238, 118, 0)
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.r, this.r)
    strokeWeight(3);
    line(this.x, this.y - 26, this.x, this.y + 25);
    arc(this.x - 20, this.y, 30, 38, -1.5, 1.51);
    arc(this.x + 20, this.y, 30, 40, 1.750, 4.630);
    strokeWeight(3);
    line(this.x - 25, this.y, this.x + 25, this.y);
  }
  displayText() {
    stroke(3);
    let s = 'THUNDER UP!';
    fill(238, 196, 65);
    textStyle(BOLD);
    let sz = 50;
    textSize(sz);
    textFont('Helvetica');
    if (mouseIsPressed) {
      textSize(random(70, 75));
      fill(26, 44, 89);
      let k = 'OKC!!!';
      text(k, this.x, 200, 300, 400);
    }
  }
  move() {
    this.x = this.x + this.xdir;
    this.y = this.y + this.ydir;
  }
  playMusic() {
    if (mouseIsPressed) {
      ele.play();
    }
  }
  bounce() {
    if (this.x >= width || this.x <= 0) {
      this.xdir = this.xdir * -1;
    }
    if (this.y >= height || this.y <= 0) {
      this.ydir = this.ydir * -1;
    }
  }
}
let bb1, bb2;
function setup() {
  createCanvas(720, 400);
  bb1 = new BBall(200, 200, 4, 2, 55);
  bb2 = new BBall(300, 300, 2, 3, 55);
  bb3 = new BBall(300, 300, 5, 4, 55);
  ele = createAudio('sound.mp3');
}
function draw() {
  background(60, 106, 227);
  ellipse(bb1.xpos, bb1.ypos, bb1.r, bb1.r);
  ellipse(bb2.xpos, bb2.ypos, bb2.r, bb2.r);
  ellipse(bb3.xpos, bb3.ypos, bb3.r, bb3.r);
  
  bb1.displayBall()
  bb1.move()
  bb1.bounce()
  bb2.displayBall()
  bb2.displayText()
  bb2.move()
  bb2.bounce()
  
  bb3.displayBall()
  bb3.move()
  bb3.bounce()
  bb1.playMusic()
let ele;
class BBall {
  constructor(xpos, ypos, vx, vy, radius) {
    this.x = xpos;
    this.y = ypos;
    this.xdir = vx;
    this.ydir = vy;
    this.r = radius;
  }
  displayBall() {
    fill(238, 118, 0)
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.r, this.r)
    strokeWeight(3);
    line(this.x, this.y - 26, this.x, this.y + 25);
    arc(this.x - 20, this.y, 30, 38, -1.5, 1.51);
    arc(this.x + 20, this.y, 30, 40, 1.750, 4.630);
    strokeWeight(3);
    line(this.x - 25, this.y, this.x + 25, this.y);
  }
  displayText() {
    stroke(3);
    let s = 'THUNDER UP!';
    
    fill(238, 196, 65);
    textStyle(BOLD);
    let sz  = random(50,60);
    textSize(sz);
    textFont('Helvetica');
    
  }
  move() {
    this.x = this.x + this.xdir;
    this.y = this.y + this.ydir;
  }
  playMusic() {
 
    if (mouseIsPressed) {
    ele.play();
    }
  }
  bounce() {
    if (this.x > width || this.x < 0) {
      this.xdir = this.xdir * -1;
    }
    if (this.y > height || this.y < 0) {
      this.ydir = this.ydir * -1;
    }
  }
}
let bb1, bb2;
function setup() {
  createCanvas(720, 400);
  bb1 = new BBall(200, 200, 4, 2, 55);
  bb2 = new BBall(300, 300, 2, 3, 55);
  ele = createAudio('sound.mp3');
}
function draw() {
  
      background(60, 106, 227);
  ellipse (bb1.xpos, bb1.ypos, bb1.r, bb1.r);
  ellipse (bb2.xpos, bb2.ypos, bb2.r, bb2.r);
  bb1.displayBall()
  bb1.displayText()
  bb1.move()
  bb1.bounce()
  
  bb2.displayBall()
  bb2.displayText()
  bb2.move()
  bb2.bounce()
	bb1.playMusic()
  
	bb1.playMusic()
}class Ball {
  constructor(xx, yy, xxdir, yydir, rr) {
    strokeWeight(3)
    fill(random(0,255), random(0,204), 0);
    this.x = xx;
    this.y = yy;
    this.xdir = xxdir;
    this.ydir = yydir;
    this.r = rr;
    
    this.stopped = false;
  }
  
  move() { 
    if (! this.stopped) {
    this.x = this.x + this.xdir;
    this.y = this.y + this.ydir;
    }
  
  }
  
  display() {
  ellipse (this.x, this.y, this.r, this.r)
  }
  
  stop() {
    this.stopped = true;
  }
  
  start() {
    this.stopped = false;
  }
  
	change() { 
    if(this.x >= width || this.x <= 0 ) {
      this.xdir = this.xdir * -1;
    }
     if(this.y >= height || this.y <= 0) {
      this.ydir = this.ydir * -1;
    }
  }
  
}
let b, b1;
function setup() {
  
  createCanvas(400, 400);
  b = new Ball (50,50, 1, 2, 70);
  b1 = new Ball (200,50, 1, 2, 50);
}
function draw() {
  background(220);
  
  ellipse (b.x, b.y, b.r, b.r);
  ellipse (b1.x, b1.y, b1.r, b1.r);
  b.move();
  b1.move();
  b.change();
  b1.change();
  if (mouseIsPressed) {
    b.stop();
    b1.stop();
    
  }
  
  else {
    b.start();
    b1.start();
  }
  
  
let ball = {
  x: 100,
  y :100,
  d: 50,
  xspeed: 1,
  yspeed: 1,
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  displayBall();
  moveBall();
  bounceBall();
}
function displayBall() {
  ellipse( ball.x, ball.y, ball.d, ball.d);
}
function moveBall() {
  ball.x = ball.x + ball.xspeed
  ball.y = ball.y +ball.yspeed
  
}
function bounceBall() {
  if (ball.x <= 0 ||ball.x >=width) {
    ball.xspeed = ball.xspeed * -1;
  }
  if (ball.y <= 0 || ball.y >=height) {
    ball.yspeed = ball.yspeed* -1;
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  drawCircle(40);
  drawCircle(0);
  
  for (let i =0; i<20; i++) {
    drawCircle(random(0,100) , random(0,100));
  }
}
function drawCircle(offset, diameteer) {
  fill (random(0,100), random(0,255), random(255));
  ellipse(mouseX +offset, mouseY+offset, 50,50);
}
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  background(0);
  noStroke();
  frameRate(20); 
  background(0);
  createP("Press anywhere inside the rectangle to see flashing circle of rectangles.");
  createP("p.s. the background color changes with every new click! ");
  
  
}
function draw() {
  
  for (let x = 0; x <= 400; x += 10) {
    for (let y = 0; y <= 400; y += 10) {
      ellipse(x, y, 5);
    }
  }
  if (mouseIsPressed) {
		background (random(0,255),random(0,255), random(0,255) )
    mx = mouseX;
    my = mouseY;
    c=0;
  }
    for (let x = 0; x < 400; x += 10) {
      for (let y = 0; y < 400; y += 10) {
        if (dist(mx, my, x, y) < 60) {
          	fill(255,c, c);
          	rect(x, y, 5, 5);
        } else fill(255);
      }
    }
    c+=5;
    if (c>=255) {
      c=0;
    }
}
let mx;
let my;
let r = 0;
let k = 0;
function setup() {
  
  createCanvas(400, 400);
  background(0);
  rectMode(CENTER);
 frameRate(1);
}
function draw() {
  	r += 1;
  	k += 1;
  } 
function mouseClicked() {
    mx = mouseX;
    my = mouseY;
    for (let x = 0; x <= 400; x += 10) {
      for (let y = 0; y <= 400; y += 10) {
        if (dist(mx, my, x, y) < 60) {
           if (dist(mx, my, x, y) < 60) { 
          fill(255, r, k);
          rect(x, y, 5, 5);
           }
        } else {
          fill(255);
        }
      }
      
    }
var ele;
var x = 300;
var y = 50;
var vx = 5;
var vy = 9.8;
var ax = 0;
var ay = 0;
var vMultiplier = 1.20;
var bMultiplier = 0.9;
function setup() {
  createCanvas(720, 400);
  var q = random(0,width);
	 var w = random(0,width);
   ele = createAudio('sound.mp3');
  background(60, 106, 227);
}
function mouseClicked() {
   var q = random(0,width);
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    ele.play();
  }
}
function draw() {
  background(60, 106, 227);
  var s = 'THUNDER UP!';
  fill(238, 196, 65);
  textSize(50);
  stroke(0);
  strokeWeight(3);
  ellipseMode(CENTER);
  fill(238, 118, 0);
  ellipse(x, y, 55, 55);
  strokeWeight(3);
  line(x, y - 28, x, y + 25);
  arc(x - 20, y, 30, 38, -1.57, 1.571);
  arc(x + 20, y, 30, 40, 1.785, 4.632);
  strokeWeight(3);
  line(x - 25, y, x + 25, y);
  bballmove();
}
function bballmove() {
  ax = accelerationX;
  ay = accelerationY;
  vx = vx + ay;
  vy = vy + ax;
  y = y + vy * vMultiplier;
  x = x + vx * vMultiplier;
  if (x < 0) {
    x = 0;
    vx = -vx * bMultiplier;
  }
  if (y < 0) {
    y = 0;
    vy = -vy * bMultiplier;
  }
  if (x > width - 20) {
    x = width - 20;
    vx = -vx * bMultiplier;
  }
  if (y > height - 20) {
    y = height - 20;
    vy = -vy * bMultiplier;
  }
}
var x = 0;
var y = 0;
 
var vx = 3;
var vy = 9.8;
 
var ax = 0;
var ay = 0;
 
var vMultiplier = 1.07;
var bMultiplier = 0.6;
 
  
function setup() {
  createCanvas(720,400, WEBGL);
  fill(0 );
}
function draw() {
  
  background(random(0,128),random(1,357),random(255));
  
  
  
  
  bballmove(); 
	stroke(0);
	strokeWeight(3);
	ellipseMode(CENTER); 
	fill( 238, 118, 0);
  rotateX(frameCount * 0.02);
	rotateY(frameCount * 0.01);
  sphere(y);
}
function bballmove() {
  ax = accelerationX;
  ay = accelerationY;
  
  
  vx = vx + ay;
  vy = vy + ax;
  
  y = y + vy * vMultiplier; 
	x = x + vx * vMultiplier;
  	if (x < 0) { 
		x = 0; 
		vx = -vx * bMultiplier; 
	}
 	if (y < 0) { 
 		y = 0; 
 		vy = -vy * bMultiplier; 
 	}
 	if (x > width - 20) { 
 		x = width - 20; 
 		vx = -vx * bMultiplier; 
 	}
 	if (y > height - 20) { 
 		y = height - 20; 
 		vy = -vy * bMultiplier; 
 	}
  
}
  
  
  
function setup() {
	createCanvas(500, 500);
	background(69,99,30)
}
function draw() {
	strokeWeight(0);
	fill(130, 112, 91);
	ellipse(250, 250, 148, 130);
	strokeWeight(0);
	fill(198, 178, 150);
	rect(187, 210, 127, 80, 60);
	stroke(91, 79, 63)
	strokeWeight(20);
	line(202, 266, 225, 240);
	line(300, 266, 275, 240);
	stroke(2, 2, 1)
	strokeWeight(6);
	fill(252, 249, 250);
	ellipse(278, 243, 10, 10);
	ellipse(220, 245, 10, 10);
	fill(1, 1, 0);
	rect(243, 258, 13, 8, 26);
	
	noFill();
	arc(250, 273, 25, 25, PI + PI,PI , OPEN);
}function setup() {
	createCanvas(500, 500);
	background(69, 99, 30)
	createP('Hello world! My name is Slow-Motion the Sloth. I am the animal representation of Khensu-Ra, especially when it comes to how he moves throughout life . ');
}
function draw() {
	strokeWeight(4);
	fill(1, 1, 0);
	line(100, 350, 54, 245);
	noStroke();
	fill(193, 215, 75);
	triangle(55, 245, 20, 198, 46, 210);
	fill(138, 180, 79);
	triangle(54, 245, 20, 191, 10, 210);
	noStroke();
	fill(183, 150, 109);
	quad(45, 300, 430, 300, 440, 350, 50, 355);
	strokeWeight(0);
	fill(130, 112, 91);
	ellipse(250, 250, 148, 130);
	strokeWeight(0);
	fill(198, 178, 150);
	rect(187, 210, 127, 80, 60);
	stroke(91, 79, 63)
	strokeWeight(20);
	line(202, 266, 225, 240);
	line(300, 266, 275, 240);
	stroke(2, 2, 1)
	strokeWeight(6);
	fill(252, 249, 250);
	ellipse(278, 243, 10, 10);
	ellipse(220, 245, 10, 10);
	fill(1, 1, 0);
	rect(243, 258, 13, 8, 26);
	noFill();
	arc(250, 273, 25, 25, PI + PI, PI, OPEN);
	noStroke();
	fill(130, 112, 91);
	rect(135, 270, 50, 55, 20);
	rect(315, 270, 50, 55, 20);
	fill(228, 217, 199);
	triangle(155, 340, 145, 318, 140, 318);
	triangle(160, 340, 155, 318, 160, 318);
	triangle(166, 340, 170, 318, 175, 318);
	triangle(347, 340, 355, 318, 350, 318);
	triangle(340, 340, 338, 318, 343, 318);
	triangle(335, 340, 325, 318, 330, 318);
	
}