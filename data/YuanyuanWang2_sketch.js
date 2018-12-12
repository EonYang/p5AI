var bg_default;
var newspaper_1;
var newspaper_2;
var ourfont;
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
var canvas;
var bgmusic;
function preload() {
  ourfont = loadFont('TpldKhangXiDictTrial.otf');
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper_1 = loadImage('asset/background/newspaer_1.jpg ');
  newspaper_2 = loadImage('asset/background/newspaer_2.jpg ');
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  alert_camera = loadImage('asset/alert_camera.png');
  alert_glass = loadImage('asset/alert_glass.png');
  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
  s1_resident = loadImage('asset/scene/01residents.jpg');
  s1_construction = loadImage('asset/scene/02construction.jpg');
  s1_gov = loadImage('asset/scene/03gov.jpg');
  s1_house = loadImage('asset/scene/04house.jpg');
  people = loadImage('asset/scene2/people.png ');
  house = loadImage('asset/scene2/house.jpg ');
  court = loadImage('asset/scene2/court.jpg ');
  construction = loadImage('asset/scene2/construction.png ');
  s2_house = loadImage('asset/06house.jpg ');
  s3_court = loadImage('asset/05court.jpg ');
  bgmusic = loadSound('asset/chongqing2.m4a');
}
function setup() {
  bgmusic.setVolume(0.1);
  bgmusic.play();
  createCanvas(1440, 860);
  
  textFont(ourfont);
  image(newspaper_2, 1055, 170, 383, 690);
  dots[0] = new Dots(267, 290, 255);
  dots[1] = new Dots(848, 677, 255);
  dots[2] = new Dots(922, 150, 255);
  dots[3] = new Dots(519, 156, 255);
  dots[4] = new Dots(345, 345, 255);
  dots[5] = new Dots(626, 270, 255);
  s1_photos = [s1_resident, s1_construction, s1_gov, s1_house,s3_court,s2_house]
  for (let i of s1_txt0) {
    s1_txt0s = concat(s1_txt0, splitTokens(i));
  }
  for (let i of s1_txt1) {
    s1_txt1s = concat(s1_txt1, splitTokens(i));
  }
  for (let i of s1_txt2) {
    s1_txt2s = concat(s1_txt2, splitTokens(i));
  }
  for (let i of s1_txt3) {
    s1_txt3s = concat(s1_txt3, splitTokens(i));
  }
  for (let i of s3_txt) {
    s3_txts = concat(s3_txt, splitTokens(i));
  }
  for (let i of s2_txt) {
    s2_txts = concat(s2_txt, splitTokens(i));
  }
}
function draw() {
    if (!alert_camera_status && currentstatus == 1 ) {
      for (let i = 0; i < 4; i++) {
          dots[i].disappear();
        }
      }
    }
    if(currentstatus ==2){
      glass_circle();
      glass_zoom();
    }
  }
  if(scene ==2){
    image(house, 0, 0, 1057, 860);
    if(currentstatus ==2 && mouseIsPressed && mouseY<800){
      scene =1;
    }
    if (!alert_camera_status && currentstatus == 1 ){
        dots[5].disappear();
      }
    }
    dots[5].show();
  }
  if(scene ==3){
    image(court, 0, 0, 1057, 860);
    if(currentstatus ==2 && mouseIsPressed && mouseY<800){
      scene =1;
    }
    if (!alert_camera_status && currentstatus == 1 ){
        dots[4].disappear();
      }
    }
    dots[4].show();
  }
  image(newspaper_1, 1055, 0, 383, 170);
  if(alltxt.length <7){
  titleshow(titles[0]);
  timeshow(timeinfos[0]);
}
  if(alltxt.length == 7){
    titleshow(titles[1]);
    timeshow(timeinfos[1]);
  }
  alert_camera_show();
  alert_camera_happen();
	txtcomeout();
}
var bg_default;
var newspaper;
var people;
var showPeople = false;
var house;
var showHouse = false;
var construction;
var showConstruction = false;
var court;
var showCourt = false;
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
var blockbg = 40;
var count1 = 0;
var alert_camera;
var ok_active;
var ok_down;
var alert_camera_status = 0;
function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  alert_camera = loadImage('asset/alert_camera.png ');
  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
  people = loadImage('people.png ');
  house = loadImage('house.jpg ');
  court = loadImage('court.jpg ');
  construction = loadImage('construction.png ');
}
function setup() {
  createCanvas(1440, 860);
}
function mousePressed() {
  var d1 = dist(mouseX, mouseY, 265, 335);
  var d2 = dist(mouseX, mouseY, 480, 330);
  var d3 = dist(mouseX, mouseY, 910, 250);
  var d4 = dist(mouseX, mouseY, 880, 730);
  if (showPeople || showHouse || showCourt || showConstruction) {
    showPeople = false
    showHouse = false
    showCourt = false
    showConstruction = false
  } else if (d1 < 45) {
    if (showHouse == false && showCourt == false && showConstruction == false) {
      showPeople = true
    }
  } else if (d2 < 60) {
    if (showPeople == false && showCourt == false && showConstruction == false) {
      showHouse = true
    }
  } else if (d3 < 145) {
    if (showPeople == false && showHouse == false && showConstruction == false) {
      showCourt = true
    }
  } else if (d4 < 150) {
    if (showPeople == false && showHouse == false && showCourt == false) {
      showConstruction = true
    }
  }
}
function draw() {
  image(bg_default, 0, 0, 1057, 860);
  image(newspaper, 1057, 0, 383, 860);
  stroke(179, 130, 62);
  strokeWeight(2);
  ellipse(265, 335, 90, 90);
  fill(30, 30, 30, 50);
  ellipse(485, 330, 120, 120);
  fill(30, 30, 30, 50);
  ellipse(910, 250, 290, 290);
  fill(30, 30, 30, 50);
  ellipse(880, 730, 300, 300);
  if (showPeople) {
    image(people, 0, 0, 1057, 860);
    fadeIn(people, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(people, -50);
  }
  if (showHouse) {
    image(house, 0, 0, 1057, 860);
    fadeIn(house, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(house, -50);
  }
  if (showConstruction) {
    image(construction, 0, 0, 1057, 860);
    fadeIn(construction, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(construction, -50);
  }
  if (showCourt) {
    image(court, 0, 0, 1057, 860);
    fadeIn(court, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(court, -50);
  }
}
var bg_default;
var newspaper;
var people;
var showPeople = false;
var house;
var showHouse = false;
var construction;
var showConstruction = false;
var court;
var showCourt = false;
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
var blockbg = 40;
var count1 = 0;
var alert_camera;
var ok_active;
var ok_down;
var alert_camera_status = 0;
function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  alert_camera = loadImage('asset/alert_camera.png ');
  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
  people = loadImage('people.png ');
  house = loadImage('house.jpg ');
  court = loadImage('court.jpg ');
  construction = loadImage('construction.png ');
}
function setup() {
  createCanvas(1440, 860);
}
function mousePressed() {
  var d1 = dist(mouseX, mouseY, 265, 335);
  if (d1 < 45) {
    if (showHouse == false && showCourt == false && showConstruction == false){
    showPeople = !showPeople;
    }
  } else {
    showPeople = false
  }
  
  
  var d2 = dist(mouseX, mouseY, 480, 330);
  if (d2 < 60) {
 if (showPeople == false && showCourt == false && showConstruction == false){
    showHouse = !showHouse;
    }
  }  else {
    showHouse = false
  }
  var d3 = dist(mouseX, mouseY, 910, 250);
  if (d3 < 145) {
 if (showPeople == false && showHouse == false && showConstruction == false){
    showCourt = !showCourt;
    }
  } else {
    showCourt = false
  }
  var d4 = dist(mouseX, mouseY, 880, 730);
  if (d4 < 150) {
 if (showPeople == false && showHouse == false && showCourt == false){
    showConstruction = !showConstruction;
    }
  } else {
    showConstruction = false
  }
}
function draw() {
  image(bg_default, 0, 0, 1057, 860);
  image(newspaper, 1057, 0, 383, 860);
  stroke(179, 130, 62);
  strokeWeight(2);
  ellipse(265, 335, 90, 90);
  fill(30, 30, 30, 50);
  ellipse(485, 330, 120, 120);
  fill(30, 30, 30, 50);
  ellipse(910, 250, 290, 290);
  fill(30, 30, 30, 50);
  ellipse(880, 730, 300, 300);
  if (showPeople) {
    image(people, 0, 0, 1057, 860);
    fadeIn(people, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(people, -50);
  }
  if (showHouse) {
    image(house, 0, 0, 1057, 860);
    fadeIn(house, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(house, -50);
  }
  if (showConstruction) {
    image(construction, 0, 0, 1057, 860);
    fadeIn(construction, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(construction, -50);
  }
  if (showCourt) {
    image(court, 0, 0, 1057, 860);
    fadeIn(court, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(court, -50);
  }
}
function fadeOut(a, speed) {
  a.loadPixels();
  for (let j = 0; j < a.height; j++) {
    for (let i = 0; i < a.width; i++) {
      let index = (i + j * a.width) * 4;
      if (speed < 0 && a.pixels[index + 3] > 0) {
        a.pixels[index + 3] = a.pixels[index + 3] + speed;
      }
    }
  }
  a.updatePixels();
}
function fadeIn(a, speed) {
  a.loadPixels();
  for (let j = 0; j < a.height; j++) {
    for (let i = 0; i < a.width; i++) {
      let index = (i + j * a.width) * 4;
      if (speed > 0 && a.pixels[index + 3] < 255) {
        a.pixels[index + 3] = a.pixels[index + 3] + speed;
      }
    }
  }
  a.updatePixels();
}let img;
let originalImg;
let gp;
function preload(){
  img = loadImage("ccc.png");
  originalImg = loadImage("aaa.png");
}
function setup() {
  createCanvas(800, 600);
  gp = createGraphics(width,height);
  gp.image(originalImg, 0, 0);
}
function draw() {
  background(255, 0, 0);
  
  
  
  
  
      
  
  image(originalImg, 0, 0);
  image(img, 0, 0);
	fadeOut(img, -2);
  fadeIn(originalImg, 1);
  
}
function getDistance(x1, y1, x2, y2){
	let dis = sqrt((x1-x2) * (x1-x2) + (y1-y2)*(y1-y2));
  return dis;
}
function mousePressed(){
  
}
function fadeOut(a, speed){
  a.loadPixels();
  
  for (let j=0; j<a.height; j++){
    for (let i=0; i<a.width; i++){
      let index = (i + j*a.width) * 4;
      if (speed < 0 && a.pixels[index+3] > 0){
        a.pixels[index+3] = a.pixels[index+3] + speed;
      }
    }
  }
  a.updatePixels();
}
function fadeIn(img, speed){
    img.loadPixels();
  
  for (let j=0; j<img.height; j++){
    for (let i=0; i<img.width; i++){
      let index = (i + j*img.width) * 4;
      if (speed > 0 && img.pixels[index+3] < 255){
        img.pixels[index+3] = img.pixels[index+3] + speed;
      }
    }
  }
  img.updatePixels();
}
let img;
let originalImg;
let gp;
function preload(){
  img = loadImage("ccc.png");
  originalImg = loadImage("aaa.png");
}
function setup() {
  createCanvas(800, 600);
  gp = createGraphics(width,height);
  gp.image(originalImg, 0, 0);
}
function draw() {
  background(255, 0, 0);
  
  
  
  
  
      
  
  image(originalImg, 0, 0);
  image(img, 0, 0);
	fadeOut(img, -1);
  fadeIn(originalImg, 1);
  
}
function getDistance(x1, y1, x2, y2){
	let dis = sqrt((x1-x2) * (x1-x2) + (y1-y2)*(y1-y2));
  return dis;
}
function mousePressed(){
  
}
function fadeOut(a, speed){
  a.loadPixels();
  
  for (let j=0; j<a.height; j++){
    for (let i=0; i<a.width; i++){
      let index = (i + j*a.width) * 4;
      if (speed < 0 && a.pixels[index+3] > 0){
        a.pixels[index+3] = a.pixels[index+3] + speed;
      }
    }
  }
  a.updatePixels();
}
function fadeIn(img, speed){
    img.loadPixels();
  
  for (let j=0; j<img.height; j++){
    for (let i=0; i<img.width; i++){
      let index = (i + j*img.width) * 4;
      if (speed > 0 && img.pixels[index+3] < 255){
        img.pixels[index+3] = img.pixels[index+3] + speed;
      }
    }
  }
  img.updatePixels();
}
var bg_default;
var newspaper;
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;
var currentstatus = 0; 
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
var blockbg = 40;
var count1 = 0;
var alert_camera;
var ok_active;
var ok_down;
var alert_camera_status = 0;
function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  alert_camera = loadImage('asset/alert_camera.png ');
  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
}
function setup() {
  createCanvas(1440, 860);
}
function draw() {
  image(bg_default, 0, 0, 1057, 860);
  image(newspaper, 1057, 0, 383, 860);
  noStroke();
  fill(30, 30, 30, 50);
  rect(0, bar_bg_p, 1057, 60);
  if (currentstatus == 2) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    noFill();
    stroke(255);
    ellipse(mouseX - 30, mouseY - 30, 140);
    line(mouseX - 50, mouseY - 30, mouseX - 10, mouseY - 30);
    line(mouseX - 30, mouseY - 50, mouseX - 30, mouseY - 10);
  }
  if (mouseX > 0 && mouseX < 175 && mouseY > 750) {
    image(camera_active, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 1;
    }
  }
  if (mouseX > 175 && mouseX < 338 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 2;
    }
  }
  if (mouseX > 338 && mouseX < 1057 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_active, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 3;
      console.log(currentstatus);
    }
  }
  if (mouseY > 800) {
    bar_bg_p -= toolshow;
    if (bar_bg_p <= 800) {
      bar_bg_p = 800;
    }
  } else if (mouseY > 0 && mouseY < 800) {
    bar_bg_p += toolshow;
    if (bar_bg_p > 880) {
      bar_bg_p = 880;
    }
  }
}
  noStroke();
  translate(width/2, height/2);
  alvos();
  normal=bg_default; 
  scale(1.5);
  alvos();
  magnified=bg_default;
}
function alvos() {
  background(255);
  for (let i=5; i>0; i--) {
    fill(200, 0, 0);
    ellipse(0, 0, i*40, i*40);
    fill(255);
    ellipse(0, 0, i*40-20, i*40-20);
  }
}
var bg_default;
var newspaper;
var ourfont;
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
function preload() {
  ourfont = loadFont('TpldKhangXiDictTrial.otf');
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  alert_camera = loadImage('asset/alert_camera.png');
  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
}
function setup() {
  createCanvas(1440, 860);
  textFont(ourfont);
}
function draw() {
  image(bg_default, 0, 0, 1057, 860);
  image(newspaper, 1057, 0, 383, 860);
  alert_camera_show();
  alert_camera_disappear();
  switchstatus();
}var bg_default;
var newspaper;
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
var blockbg = 40;
var count1 = 0;
var alert_camera;
var ok_active;
var ok_down;
var alert_camera_status = 0;
let mascara;  
let magnified, normal, large;
function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  normal=loadImage('asset/background/bg_default.jpg');
  large=loadImage('111.png');
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  alert_camera = loadImage('asset/alert_camera.png ');
  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
}
function setup() {
  createCanvas(1440, 860);
    makeImages();
  noCursor();
}
function draw() {
  
  
  
fill(0);
ellipse(mouseX, mouseY, 80, 80);
mascara=get();
  strokeWeight(5);
  noFill();
  stroke(150, 0, 0);
  
  
  noStroke();
  fill(30, 30, 30, 50);
  rect(0, bar_bg_p, 1057, 60);
  if (currentstatus == 2) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    noFill();
    stroke(255);
    ellipse(mouseX - 30, mouseY - 30, 140);
    line(mouseX - 50, mouseY - 30, mouseX - 10, mouseY - 30);
    line(mouseX - 30, mouseY - 50, mouseX - 30, mouseY - 10);
  }
  if (mouseX > 0 && mouseX < 175 && mouseY > 750) {
    image(camera_active, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 1;
    }
  }
  if (mouseX > 175 && mouseX < 338 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 2;
    }
  }
  if (mouseX > 338 && mouseX < 1057 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_active, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 3;
      console.log(currentstatus);
    }
  }
  if (mouseY > 800) {
    bar_bg_p -= toolshow;
    if (bar_bg_p <= 800) {
      bar_bg_p = 800;
    }
  } else if (mouseY > 0 && mouseY < 800) {
    bar_bg_p += toolshow;
    if (bar_bg_p > 880) {
      bar_bg_p = 880;
    }
  }
  
  
  
}
  noStroke();
  
  image(normal, 0, 0, 1057, 860);
  image(large, 0, 0);
  magnified=get();
  console.log(magnified);
}
function alvos() {
  background(255);
  for (let i=5; i>0; i--) {
    fill(200, 0, 0);
    ellipse(0, 0, i*40, i*40);
    fill(255);
    ellipse(0, 0, i*40-20, i*40-20);
  }
}
var bg_default;
var newspaper;
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
var blockbg = 40;
var count1 = 0;
var alert_camera;
var ok_active;
var ok_down;
var alert_camera_status = 0;
let mascara;  
let magnified, normal, large;
function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  normal=loadImage('asset/background/bg_default.jpg');
  large=loadImage('111.png');
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  alert_camera = loadImage('asset/alert_camera.png ');
  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
}
function setup() {
  createCanvas(1440, 860);
    makeImages();
  noCursor();
}
function draw() {
  
  
fill(0);
ellipse(mouseX, mouseY, 80, 80);
mascara=get();
  strokeWeight(5);
  noFill();
  stroke(150, 0, 0);
  
  
  noStroke();
  fill(30, 30, 30, 50);
  rect(0, bar_bg_p, 1057, 60);
  if (currentstatus == 2) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    noFill();
    stroke(255);
    ellipse(mouseX - 30, mouseY - 30, 140);
    line(mouseX - 50, mouseY - 30, mouseX - 10, mouseY - 30);
    line(mouseX - 30, mouseY - 50, mouseX - 30, mouseY - 10);
  }
  if (mouseX > 0 && mouseX < 175 && mouseY > 750) {
    image(camera_active, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 1;
    }
  }
  if (mouseX > 175 && mouseX < 338 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 2;
    }
  }
  if (mouseX > 338 && mouseX < 1057 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_active, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 3;
      console.log(currentstatus);
    }
  }
  if (mouseY > 800) {
    bar_bg_p -= toolshow;
    if (bar_bg_p <= 800) {
      bar_bg_p = 800;
    }
  } else if (mouseY > 0 && mouseY < 800) {
    bar_bg_p += toolshow;
    if (bar_bg_p > 880) {
      bar_bg_p = 880;
    }
  }
  
  
  
}
  noStroke();
  
  image(normal, 0, 0, 1057, 860);
  image(large, 0, 0);
  magnified=get();
  console.log(magnified);
}
function alvos() {
  background(255);
  for (let i=5; i>0; i--) {
    fill(200, 0, 0);
    ellipse(0, 0, i*40, i*40);
    fill(255);
    ellipse(0, 0, i*40-20, i*40-20);
  }
}
var bg_default;
var newspaper;
var people;
var showPeople = false;
var house;
var showHouse = false;
var construction;
var showConstruction = false;
var court;
var showCourt = false;
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
var blockbg = 40;
var count1 = 0;
var alert_camera;
var ok_active;
var ok_down;
var alert_camera_status = 0;
function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  alert_camera = loadImage('asset/alert_camera.png ');
  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
  people = loadImage('people.png ');
  house = loadImage('house.jpg ');
  court = loadImage('court.jpg ');
  construction = loadImage('construction.png ');
}
function setup() {
  createCanvas(1440, 860);
}
function mousePressed() {
var d = dist(mouseX, mouseY, 870, 660);
  if (d < 190) {
    showConstruction = !showConstruction;
  }
}
function draw() {
  image(people, 0, 0,1057, 860);
  image(house,0,0,1057, 860);
  image(construction,0,0,1057, 860);
  image(bg_default, 0, 0, 1057, 860);
  image(newspaper, 1057, 0, 383, 860);
  stroke(250, 255, 3);
  fill(30, 30, 30, 50);
  rect(235, 300, 60, 80);
  stroke(250, 255, 3);
  fill(30, 30, 30, 50);
  rect(420, 280, 130, 80);
  stroke(250, 255, 3);
  fill(30, 30, 30, 50);
  rect(780, 180, 276, 140);
  stroke(250, 255, 3);
  fill(30, 30, 30, 50);
  ellipse(870, 660, 380, 380);
  
  
    if (showConstruction) {
    fadeIn(construction, 5);
    fadeOut(bg_default, -5);
  } else {
    fadeIn(bg_default, 5);
    fadeOut(construction, -5);
  }
  
}
function fadeOut(a, speed) {
  a.loadPixels();
  for (let j = 0; j < a.height; j++) {
    for (let i = 0; i < a.width; i++) {
      let index = (i + j * a.width) * 4;
      if (speed < 0 && a.pixels[index + 3] > 0) {
        a.pixels[index + 3] = a.pixels[index + 3] + speed;
      }
    }
  }
  a.updatePixels();
}
function fadeIn(a, speed) {
  a.loadPixels();
  for (let j = 0; j < a.height; j++) {
    for (let i = 0; i < a.width; i++) {
      let index = (i + j * a.width) * 4;
      if (speed > 0 && a.pixels[index + 3] < 255) {
        a.pixels[index + 3] = a.pixels[index + 3] + speed;
      }
    }
  }
  a.updatePixels();
}var bg_default;
var newspaper;
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;
var toolshow = 20;
var bar_bg_p = 860;
var fade =255; 
var blockbg = 40;
var count1 = 0;
var alert_camera;
var ok_active;
var ok_down;
var alert_camera_status = 0;
function preload(){
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  
  alert_camera = loadImage('asset/alert_camera.png ');
  
  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
  
  
}
function setup() {
  createCanvas(1440, 860);
}
function draw() {
  image(bg_default,0,0,1057,860);
  image(newspaper,1057,0,383,860);
  
  
  noStroke();
  fill(30,30,30,50);
  rect(0,bar_bg_p,1057,60);
  
 
  if(currentstatus == 1){
  image(camera_active,30,bar_bg_p-40,145,110);
  image(glass_down,175,bar_bg_p-40,163,110);
  image(time_down,338,bar_bg_p-40,117,110);
  
  noFill();
  stroke(255);
  rect(mouseX-120,mouseY-70,140,90);
  }
  
  else if(currentstatus ==2){
  image(camera_down,30,bar_bg_p-40,145,110);
  image(glass_active,175,bar_bg_p-40,163,110);
  image(time_down,338,bar_bg_p-40,117,110);
  
  noFill();
  stroke(255);
  ellipse(mouseX-30,mouseY-30,140);
  line(mouseX-50,mouseY-30,mouseX-10,mouseY-30);
  line(mouseX-30,mouseY-50,mouseX-30,mouseY-10);
  }
  
 	else if(currentstatus ==3){
  image(camera_down,30,bar_bg_p-40,145,110);
  image(glass_down,175,bar_bg_p-40,163,110);
  image(time_active,338,bar_bg_p-40,117,110);
  }
  
  
  if(mouseX>0 && mouseX<175 && mouseY>750){
  	image(camera_active,30,bar_bg_p-40,145,110);
  	image(glass_down,175,bar_bg_p-40,163,110);
  	image(time_down,338,bar_bg_p-40,117,110);
    if(mouseIsPressed){
    	currentstatus = 1;
    }
  }
  
  
  if(mouseX>175 && mouseX<338 && mouseY>750){
  	image(camera_down,30,bar_bg_p-40,145,110);
  	image(glass_active,175,bar_bg_p-40,163,110);
  	image(time_down,338,bar_bg_p-40,117,110);
    if(mouseIsPressed){
    	currentstatus = 2;
    }
  }
  
   if(mouseX>338 && mouseX<1057 && mouseY>750){
  	image(camera_down,30,bar_bg_p-40,145,110);
  	image(glass_down,175,bar_bg_p-40,163,110);
  	image(time_active,338,bar_bg_p-40,117,110);	
    if(mouseIsPressed){
    	currentstatus = 3;
      console.log(currentstatus);
    }
  }
  
  if(mouseY>800){
    bar_bg_p -= toolshow;
    if(bar_bg_p <= 800)
    {
     bar_bg_p = 800;
    }
  }
  else if(mouseY>0 && mouseY<800){
    bar_bg_p += toolshow;
    if(bar_bg_p>880){
    	bar_bg_p = 880;
    }
   
  }
  
  background(30,30,30,fade);
  fill(255,255,255,fade);
  textSize(13);
  fill(255,255,255,fade)
  text('Something was happening... something we call news... ',500,500);
  
  count1 ++;
  if(count1>100){
  fade -=1;
  }
  
  count1 ++;
  if(count1>80){
  alert_camera_status =1;
  }
  
  if(alert_camera_status ==1){
  background(0,0,0,blockbg);
  image(alert_camera,500,300,420,295);
  image(ok_down,650,500,105,40);
  }
  
  
}var bg_default;
var newspaper;
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;
var toolshow = 20;
var bar_bg_p = 860;
var fade =255; 
var count1 = 0;
var blockbg = 40;
var alert_camera;
var ok_active;
var ok_down;
var alert_camera_status = 0;
function preload(){
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  
  alert_camera = loadImage('asset/alert_camera.png ');
  
  
}
function setup() {
  createCanvas(1440, 860);
}
function draw() {
  image(bg_default,0,0,1057,860);
  image(newspaper,1057,0,383,860);
  
  
  noStroke();
  fill(30,30,30,50);
  rect(0,bar_bg_p,1057,60);
  
 
  if(currentstatus == 1){
  image(camera_active,30,bar_bg_p-40,145,110);
  image(glass_down,175,bar_bg_p-40,163,110);
  image(time_down,338,bar_bg_p-40,117,110);
  
  noFill();
  stroke(255);
  rect(mouseX-120,mouseY-70,140,90);
  }
  
  else if(currentstatus ==2){
  image(camera_down,30,bar_bg_p-40,145,110);
  image(glass_active,175,bar_bg_p-40,163,110);
  image(time_down,338,bar_bg_p-40,117,110);
  
  noFill();
  stroke(255);
  ellipse(mouseX-30,mouseY-30,140);
  line(mouseX-50,mouseY-30,mouseX-10,mouseY-30);
  line(mouseX-30,mouseY-50,mouseX-30,mouseY-10);
  }
  
 	else if(currentstatus ==3){
  image(camera_down,30,bar_bg_p-40,145,110);
  image(glass_down,175,bar_bg_p-40,163,110);
  image(time_active,338,bar_bg_p-40,117,110);
  }
  
  
  if(mouseX>0 && mouseX<175 && mouseY>750){
  	image(camera_active,30,bar_bg_p-40,145,110);
  	image(glass_down,175,bar_bg_p-40,163,110);
  	image(time_down,338,bar_bg_p-40,117,110);
    if(mouseIsPressed){
    	currentstatus = 1;
    }
  }
  
  
  if(mouseX>175 && mouseX<338 && mouseY>750){
  	image(camera_down,30,bar_bg_p-40,145,110);
  	image(glass_active,175,bar_bg_p-40,163,110);
  	image(time_down,338,bar_bg_p-40,117,110);
    if(mouseIsPressed){
    	currentstatus = 2;
    }
  }
  
   if(mouseX>338 && mouseX<1057 && mouseY>750){
  	image(camera_down,30,bar_bg_p-40,145,110);
  	image(glass_down,175,bar_bg_p-40,163,110);
  	image(time_active,338,bar_bg_p-40,117,110);	
    if(mouseIsPressed){
    	currentstatus = 3;
      console.log(currentstatus);
    }
  }
  
  if(mouseY>800){
    bar_bg_p -= toolshow;
    if(bar_bg_p <= 800)
    {
     bar_bg_p = 800;
    }
  }
  else if(mouseY>0 && mouseY<800){
    bar_bg_p += toolshow;
    if(bar_bg_p>880){
    	bar_bg_p = 880;
    }
   
  }
  
  background(30,30,30,fade);
  fill(255,255,255,fade);
  textSize(13);
  fill(255,255,255,fade)
  text('Something was happening... something we call news... ',500,500);
  
  count1 ++;
  if(count1>100){
  fade -=1;
  }
  
  count1 ++;
  if(count1>100){
  alert_camera_status =1;
  }
  
  if(alert_camera_status =1){
  background(0,0,0,blockbg);
  image(alert_camera,500,300,420,295);
  }
  
  
}var mapimg;
var clat = 0;
var clon = 0;
var ww = 1024;
var hh = 512;
var zoom = 1;
var earthquakes;
var earthquakes1;
var userInput;
function preload() {
        clon + ',' + clat + ',' + zoom + '/' +
        ww + 'x' + hh +
        '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
}
function mercX(lon) {
    lon = radians(lon);
    var a = (256 / PI) * pow(2, zoom);
    var b = lon + PI;
    return a * b;
}
function mercY(lat) {
    lat = radians(lat);
    var a = (256 / PI) * pow(2, zoom);
    var b = tan(PI / 4 + lat / 2);
    var c = PI - log(b);
    return a * c;
}
function setup() {
    createCanvas(ww, hh);
    translate(width / 2, height / 2);
    imageMode(CENTER);
    image(mapimg, 0, 0);
    var cx = mercX(clon);
    var cy = mercY(clat);
    for (var i = 1; i < earthquakes.length; i++) {
        var data = earthquakes[i].split(/,/);
        var lat = data[1];
        var lon = data[2];
        var mag = data[4];
        var x = mercX(lon) - cx;
        var y = mercY(lat) - cy;
        if (x < -width / 2) {
            x += width;
        } else if (x > width / 2) {
            x -= width;
        }
        mag = pow(10,mag);
        mag = sqrt(mag);
        var magmax = sqrt(pow(10, 10));
        var d = map(mag, 0, magmax, 0, 180);
        stroke(255, 255, 255);
        fill(255, 255, 255, 200);
        ellipse(x, y, d, d);
    }
 for (var i = 1; i < earthquakes1.length; i++) {
        var data = earthquakes1[i].split(/,/);
        var lat = data[1];
        var lon = data[2];
        var mag = data[4];
        var x = mercX(lon) - cx;
        var y = mercY(lat) - cy;
        if (x < -width / 2) {
            x += width;
        } else if (x > width / 2) {
            x -= width;
        }
        mag = pow(mag,10);
        mag = sqrt(mag);
        var magmax = sqrt(pow(10, 10));
        var d = map(mag, 0, magmax, 0, 180);
        stroke(255, 0, 255);
        fill(255, 0, 255, 200);
        ellipse(x, y, d, d);
    }
}var bg_default;
var newspaper;
var toolshow = 20;
var bar_bg_p = 860;
var focus;
function preload(){
  bg_default = loadImage('bg_default.jpg');
  newspaper = loadImage('newspaer.jpg ');
}
function setup() {
  createCanvas(1440, 860);
}
function draw() {
  image(bg_default,0,0,1057,860);
  image(newspaper,1057,0,383,860);
  
  noStroke();
  fill(30,30,30,50);
  
  rect(0,bar_bg_p,1057,60);
  
  if(mouseY>800){
    bar_bg_p -= toolshow;
    if(bar_bg_p <= 800)
    {
     bar_bg_p = 800;
    }
  }
  else if(mouseY>0 && mouseY<800){
    bar_bg_p += toolshow;
    if(bar_bg_p>860){
    	bar_bg_p = 860;
    }
   
  }
  
  
  
  
  
  
}var bg;
function preload(){
  bg = loadImage('asset/background/bg_origin.jpg');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  image(bg,0,0,windowWidth, windowHeight);
  
  noFill();
  stroke(255);
  rect(mouseX-120,mouseY-70,140,90);
  
  
}var bubble={
  x:300,
  y:200,
  display:function(){
  stroke(255);
  strokeWeight(4);
  noFill();
    ellipse(this.x,this.y,20,20);
},
  move:function(){
   this.x=this.x+random(-1,1);
  this.y=this.y+random(-1,1);
}
}
function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(0);
  bubble.move();
  bubble.display();
}
var cannon_position
var col = {
  r: 200,
  g: 10,
  b: 100
};
var x = 200
var y = 150
var s = 80
var tail1 = 150
var tail2 = 150
var wing1 = 90
var wing2 = 110
var bo = {
  r1: 30,
  r2: 30
};
var speed = 3
var shot = {
  x: 200,
  y: 120,
  r1: 100,
  r2: 100
};
function setup() {
  createCanvas(800, 700);
  ellipseMode(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  frameRate(40)
  trump = createImg('trumpClimateChangeNoBackground.png')
  trump.size(300, 200)
  hairDryer = createImg('electric-hair-dryer.png')
  hairDryer.size(100,100)
  pen = createImg('pen.gif')
  pen.size(120,120)
  
  
  iceburge = createImg('ice-1 2.png')
  iceburge.size(800,100)
  iceburge.position(0,0)
  poop = createImg('assets/dumb1.gif')
  poop.size(30, 30)
  explo = createImg('assets/yellowexplosion.gif') 
  explo1 = createImg('assets/peoppleexplosion.gif')
 
}
function draw() {
  noStroke()
   background(0,190,222);
  tPostion = trump.position(mouseX, height - 170)
  hairDryer.position(mouseX +30, height -135)
   
  if (mouseIsPressed) {
    background(col.r = random(0, 100), col.g = random(100, 255), col.b = random(150, 250));
    fill(col.r = random(200, 255), col.g = random(230, 255), 0);
    ellipse(mouseX + 40, mouseY, bo.r1 = random(25, 40), bo.r2 = random(25, 40));
    arc(mouseX + 40, mouseY + 35, 120, 50, 4.25, 4.9)
    fill(col.r = random(120, 255), col.g = random(80, 180), 0)
    ellipse(mouseX + 40, mouseY, 25, 25);
    mouseY = mouseY - 10
  }
  if(dist(mouseX+230,mouseY,x,y-100)<37.5){
  explo.position(x-100,y-270)
  explo.show()
  }else{
  explo.hide()
  } 
    if(dist(shot.x,shot.y,mouseX, height - 180) < 100){
  explo1.position(mouseX-30, height - 360)
  explo1.size(300,400)
  explo1.show()
  }else{
  explo1.hide()
  } 
  
  pen.position(x,y)
  if (x > width) {
    speed = -3
  }
  if (x < -100) {
    speed = 3
  }
  x += speed;
  poop.position(shot.x, shot.y)
  if (shot.x > width) {
    speed = -3
  }
  if (shot.x < 0) {
    speed = 3
  }
  shot.x = shot.x + speed;
  shot.y = shot.y + 2
  if (shot.y > 250) {
    shot.y = shot.y + 3
  }
  if (shot.y > height + 100) {
    shot.y = 120
  }
  
 
}var video;
var vScale = 20;
var r, g, b;
var i=0;
var j = 300;
var rectw = 40;
var recth = 40;
function setup() {
  createCanvas(400, 400);
  pixelDensity(10);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();
}
function draw() {
  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height/1.5; y++) {
    for (var x = 0; x < video.width/1.5; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 0.9;
      var w = map(bright, 0, 255, 0, vScale);
      fill(r, g, b);
      rectMode(CENTER);
      rect(x * vScale, y * vScale, w, w);
    }
  }
  if(mouseIsPressed){
  	press = true;
  }
  else{
  	press = false;
  }
  
  if(press && !lastpress ){
  	rect(i,j,rectw,recth);
    i = i+rectw;
  	if(i>(width-rectw)){
    	i = 0;
      j = j+recth;
    }
    if(j>(height-recth)){
    	i = 0;
      j= 200;
    }
  }
  
  lastpress = press;
}var video;
var vScale = 20;
var r, g, b;
function setup() {
  createCanvas(400, 400);
  pixelDensity(10);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();
}
function draw() {
  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 0.9;
      var w = map(bright, 0, 255, 0, vScale);
      noStroke();
      fill(r, g, b);
      rectMode(CENTER);
      rect(x * vScale, y * vScale, w, w);
    }
  }
}var video;
var vScale=16;
function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}
function draw() {
  background(51);
  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      
      var index = (x + y * video.width) * 4;
      var r=video.pixels[index + 0];
      var g=video.pixels[index + 1];
      var b=video.pixels[index + 2];
      
      var bright=(r+g+b)/3
      var w=map(bright,0,255,0,vScale)
      fill(bright);
      rect(x*vScale,y*vScale,w,w)
    }
  }
}var video;
var vScale=16;
function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}
function draw() {
  background(51);
  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      
      var index = (x + y * video.width) * 4;
      var r=video.pixels[index + 0];
      var g=video.pixels[index + 1];
      var b=video.pixels[index + 2];
      
      var bright=(r+g+b)/3
      var w=map(bright,0,255,0,vScale)
      fill(bright);
      rect(x*vScale,y*vScale,w,w)
    }
  }
}var video;
var button;
var snapshots = [];
var counter=0;
var total=63;
function setup() {
  createCanvas(800, 240);
  background(51);
  video = createCapture(VIDEO,ready);
  video.size(320, 240);
}
var go=false;
function ready(){
  go=true;
}
  
function draw() {
  if(go){
  snapshots[counter]=video.get();
    counter++;
  if(counter==total){
    counter=0;
  }
    }
  var w=80;
  var h=60;
  var x=0;
  var y=0;
  for ( var i=0;i<snapshots.length;i++){
  
    var index=(i+frameCount)% snapshots.length;
    image(snapshots[index],x,y,w,h);
    x=x+w;
    if(x>width){
      x=0;
      y=y+h;
    }
  }
}
var video;
var targetColor = [255, 0, 0]
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height)
  video.hide();
}
function draw() {
  image(video, 0, 0);
  var winningX=0;
  var winningY=0;
  var worldRecord = 8888888888;
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var thisPixel = video.get(x, y);
      var diffBetweebColors=dist(thisPixel[0],thisPixel[1],thisPixel[2],targetColor[0],targetColor[1],targetColor[2] )
      if(diffBetweenColors<worldRecord){
       winningX=x;
        winningY=y;
        worldRecord=diffBetweenColors;
        
      }
    }
  }
}
ellipse(winningX,winningY,20,20)
var data;
function preload() {
  data = loadJSON("birds.json");
}
function setup() {
  noCanvas();
  var birds=data.birds;
  for(var i=0;i<birds.length;i++){
    createElement('h1',birds[i].family);
    var members=birds[i].members;
    for(var j=0;j<members.length;j++){
      createDiv(members[j]);
    }
  }
 
}var data;
function preload() {
  data = loadJSON("birds.json");
}
function setup() {
  noCanvas();
  var bird = data.birds[1].members[2];
  createP(bird);
var flower;
function preload(){
  flower=loadJSON("flower.json");
}
function setup() {
  createCanvas(400, 400);
  flower = loadJSON("flower.json");
}
function draw() {
  background(0);
  fill(flower.r,flower.g,flower.b);
  text(flower.name, 10, 50);
}var bubble={
  x:300,
  y:200,
}
function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(220);
  move();
  display();
}
function move(){
function setup() {
  createCanvas(500, 300);
}
function gotData() {
  var output = map(mouseX,0,width,0,255);
}
function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(mouseX, data, 50, 50);
  text(data, 10, 10);
  
var bird;
var pipes = [];
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function setup() {
  createCanvas(600, 600);
  bird = new bird();
  pipes.push(new Pipe());
 
  
    for (var i = 0; i < portList.length; i++) {
    }
    
	}
}
  function draw() {
    background(220);
    bird.show();
    text("sensor value: " + inData, 30, 30);
    if (frameCount % 100 == 0) {
      pipes.push(new Pipe());
    }
    for (var i = 0; i < pipes.length; i++) {
      pipes[i].show();
      pipes[i].update();
    }
  }
function gotData() {
}
function draw() {
 
}
var bird;
var pipes = [];
function setup() {
  createCanvas(400, 600);
  bird = new bird();
  pipes.push(new Pipe());
}
function draw() {
  background(0);
  bird.update();
  bird.show();
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].offscreen())
      pipes.splice(i,1);
    
    {
    }
  }
}
function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
var portName = "/dev/cu.usbmodem14601";
var inData
var bird;
var pipes = [];
}
function setup() {
  createCanvas(600, 600);
  bird = new bird();
  pipes.push(new Pipe());
}
 for (var i = 0; i < portList.length; i++) {
 }
}
function draw() {
  background(220);
  bird.update();
  bird.show();
  text("sensor value: " + inData, 30, 30);
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].show();
    pipes[i].update();
  }
}
function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
function setup() {
  createCanvas(500, 300);
}
function gotData() {
  var output = map(mouseX,0,width,0,255);
}
function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(mouseX, data, 50, 50);
  text(data, 10, 10);
  
var portName='/dev/u.usbmodem14401';
var inData=0;
function setup() {
  createCanvas9(400,400);
  
}
function setup() {
  createCanvas(500, 300);
}
function gotData() {
  var output = map(mouseX,0,width,0,255);
}
function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(mouseX, data, 50, 50);
  text(data, 10, 10);
  
function setup() {
  createCanvas(500, 300);
}
function gotData() {
  var output = map(mouseX,0,width,0,255);
}
function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(mouseX, data, 50, 50);
  text(data, 10, 10);
  
}var myButton;
function setup() {
  createCanvas(400, 400);
  myButton=createButton("Press");
  myButton.position(100,100);
  myButton.mousePressed(function(){
  ellipse(random(width),random(height),20,20);
}
);
  
}
function draw() {
}
function preload() {
  img = loadImage("light.png");
}
class Circle {
  constructor(x, y, diam) {
    this.x = x;
    this.y = y;
    this.diam = diam;
  }
   show(){
        ellipse(this.x, this.y, this.diam, this.diam);
    }
}
let circles = [];
function setup() {
  createCanvas(1000, 600);
  for (let i = 0; i < 10; i++) {
    let newCirc = new Circle(random(0, width), random(0, height),300);
    circles.push(newCirc);
  }
}
function draw() {
  background(0);
  image(img, 0, 0);
  noStroke(255);
  fill(253, 255, 154, (10, 200));
  for (let i = 0; i < circles.length; i++) {
    ellipse(circles[i].x, circles[i].y,
      circles[i].diam, circles[i].diam);
    if (circles[i].diam > 0) {
      circles[i].diam -= 1;
    }
  }
}
function mousePressed() {
  let newCirc = new Circle(mouseX, mouseY,
    200);
  circles.push(newCirc);
}var Circle0;
function setup() {
  createCanvas(0, 600);
  Circle0 = new Circle();
}
  
}
var Circle0;
function setup() {
  createCanvas(0, 600);
  Circle0 = new Circle();
}
function draw() {
  background(1000, 600);
  Circle0.show();
  
}
var Circle0;
function setup() {
  createCanvas(0, 600);
  Circle0 = new Circle();
}
function draw() {
  background(1000, 600);
  
}
function preload() {
  img = loadImage("light.png");
}
class Circle {
  constructor(x, y, diam) {
    this.x = x;
    this.y = y;
    this.diam = diam;
  }
  show() {
    ellipse(this.x, this.y, this.diam, this.diam);
  }
  display() {
    if (this.diam > 0) {
      this.diam -= 1;
    }
  }
}
let circles = [];
function setup() {
  createCanvas(1000, 600);
  for (let i = 0; i < 10; i++) {
    let newCirc = new Circle(random(0, width), random(0, height), 300);
    circles.push(newCirc);
  }
}
function draw() {
  background(0);
  image(img, 0, 0);
  noStroke(255);
  fill(253, 255, 154, (10, 200));
  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].display();
  }
}
function mousePressed() {
  let newCirc = new Circle(mouseX, mouseY,
    200);
  circles.push(newCirc);
class Circle {
  constructor(x = 50, y = 50, r = 100, col = '#f00') {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = col;
    this.vx = random(-5,5);
    this.vy = random(-5,5);
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    return this;
  }
  draw() {
    fill(this.col);
    ellipse(this.x,this.y,this.r);
  }
}
class BouncingCircle extends Circle {
  constructor(x = 50, y = 50, r = 50, col = '#0f0') {
    super(x, y, r, col);
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if(!this.onScreen()) {
      this.vx *= -1;
      this.vy *= -1;
    }
  }
  onScreen() {
    if(this.x - (this.r / 2) < 0 || this.x + (this.r / 2) > width || this.y - (this.r / 2) < 0 || this.y + (this.r / 2) > height) { return false; }
    return true;
  };
}
let circles = [];
function setup() {
  createCanvas(400,400);
  background(0);
}
function draw() {
  background(0);
  for(let i = 0; i < circles.length; i++) {
  }
}
function mousePressed() {
  if(mouseX > width / 2) {
    circles.push( new BouncingCircle(mouseX, mouseY) );
  }
  else {
    circles.push( new Circle(mouseX, mouseY) );
  }
}function setup() {
  createCanvas(800, 500);
}
function draw() {
  background(48, 201, 243);
  photoframe();
  plant();
  tube();
  function photoframe() {
    rectMode(CENTER);
    var rx1 = 650;
    var rx2 = 450;
    var ex1 = 100;
    var ex2 = 50;
    noStroke();
    fill(50, 179, 228);
    fill(31, 196, 198);
    fill(255, 255, 255);
  }
  function plant() {
    strokeWeight(3);
    fill(254, 206, 156);
    rect(90, 400, 10, 100);
    fill(255);
    fill(17, 125, 1);
    stroke(17, 125, 2);
    point(730, 400);
    point(735, 380);
    point(710, 340);
    point(700, 360);
    point(710, 375);
    point(730, 400);
    point(695, 395);
    noStroke();
  }
  function tube() {
  strokeWeight(3);
  noStroke();
  fill(170, 231, 19);
  stroke(255);
  strokeWeight(5);
  line(37, 417, 37, 441);
  line(53, 455, 53, 485);
  line(757, 417, 757, 441);
  line(745, 455, 745, 485);
    
  }
  stroke(225);
  strokeWeight(3);
  noStroke(225);
  stroke(255);
  strokeWeight(2);
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(355, 98);
  bezierVertex(355, 70, 445, 70, 445, 98);
  endShape();
  fill(241, 202, 190);
  noStroke();
  beginShape();
  endShape(CLOSE);
  fill(237, 151, 153);
  stroke(237, 151, 153);
  arc(400, 160, 40, 80, 0, PI, CHORD);
  fill(255);
  noStroke();
  rect(400, 168, 38, 6);
  noStroke();
  fill(126, 90, 74);
  endShape(CLOSE);
  endShape(CLOSE);
  endShape(CLOSE);
  endShape(CLOSE);
  rect(400, 320, 140, 200);
  noFill();
  stroke(111, 100, 93);
  strokeWeight(2);
  rect(376, 140, 40, 35, 10, 10, 20, 15);
  rect(426, 140, 40, 35, 10, 10, 15, 20);
  strokeWeight(4);
  line(397, 130, 405, 130);
  noStroke();
  fill(39, 85, 126);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(400, 365, 130, 80, 0, 0, 50, 50);
  fill(180);
  strokeWeight(3);
  fill(246, 101, 104);
  triangle(355, 200, 445, 210, 400, 320);
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(400, 300, 5, 5);
  ellipse(395, 290, 5, 5);
  ellipse(405, 288, 5, 5);
  ellipse(392, 280, 5, 5);
  ellipse(409, 278, 5, 5);
  ellipse(389, 270, 5, 5);
  ellipse(411, 268, 5, 5);
  ellipse(385, 260, 5, 5);
  ellipse(416, 260, 5, 5);
  ellipse(383, 250, 5, 5);
  ellipse(379, 240, 5, 5);
  ellipse(420, 247, 5, 5);
  ellipse(374, 230, 5, 5);
  ellipse(425, 235, 5, 5);
  ellipse(371, 220, 5, 5);
  ellipse(430, 225, 5, 5);
  ellipse(366, 210, 5, 5);
  ellipse(432, 215, 5, 5);
  
}var myCircles = [];
function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 100; i++) {
    myCircles.push(new Circle(i * 5, i * 5));
  }
}
function draw() {
  background(220);
  for (var x = 0; x <= width; x=x+50) {
    myCircles[x].displayIt();
  }
}
function mousePressed() {
  for (var i = 0; i < 100; i++) {
    if (myCircles[i].amINear() < 10) {
    }
  }
}
class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  displayIt() {
    ellipse(this.x, this.y, 20, 20);
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }
  amINear() {
    return dist(this.x, this.y, mouseX, mouseY);
  }
}var myCircles = [];
class circle {
  constructor(time) {
    this.t = time;
  }
  turn(x, y) {
    var xStart = map(mouseX, 0, width, -PI, PI);
    var yStart = map(mouseY, 0, height, -PI, PI);
    var angle = xStart + yStart;
    var X0 = x + 40 * cos(PI * this.t + angle);
    var Y0 = y + 40 * sin(PI * this.t + angle);
    ellipse(1.5 * X0, 1.5 * Y0, 3);
  }
}
function setup() {
  createCanvas(600, 400);
  noStroke();
  fill(0);
  for (var i = 0; i <= 100; i++) {
    myCircles.push(new circle(random(7)));
  }
}
function draw() {
  background(250, 30);
  for (var i = 0; i <= 100; i++) {
    myCircles[i].turn(i * 10, i * 10);
  }
}var myCircles = [];
function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 100; i++) {
    myCircles.push(new Circle(i * 5, i * 5));
  }
}
function draw() {
  background(220);
  for (var i = 0; i < 100; i++) {
    myCircles[i].displayIt();
  }
}
function mousePressed() {
  for (var i = 0; i < 100; i++) {
    if (myCircles[i].amINear() < 10) {
    }
  }
}
class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  displayIt() {
    ellipse(this.x, this.y, 20, 20);
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }
  amINear() {
    return dist(this.x, this.y, mouseX, mouseY);
  }
function setup() {
  createCanvas(800, 600);
  fill(0);
  stroke(120);
}
function draw() {
  background(255,255,128);
  
  for(var x=20;x<width-10;x+=80){
      for(var y=20;y<height-10;y+=80){
   ellipse(x*2,y*2,8,8);
        
    line(x*2, y*2, mouseX,mouseY);
  }
  }
}var R=0;
function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(250);
  strokeWeight(4);
  stroke(255);
  
  for(var x=0;x<=width;x+=50){
      for(var y=0;y<=height;y+=50){
  fill(255,random(00),random(200));
        noStroke();
   ellipse(x*1.5,y*1.5,70,70);
        
  strokeWeight(5),
    line(2 * R, 2 * R, R * 2 + x, R * 2 + y);
  }
  }
}var R = 50;
function setup() {
  createCanvas(650, 500);
}
function draw() {
  background(250, 250, 100);
  for (var x = 0; x <= width; x = x + 50) {
    for (var y = 0; y <= height; y = y + 50) {
  fill(255, 200);
  ellipse(100, 100, 2 * R, 2 * R)
  var t = frameCount / 20
  var x = cos(t) * R / 1.3
  var y = sin(t) * R / 1.3
  strokeWeight(5),
    line(2 * R, 2 * R, R * 2 + x, R * 2 + y);
}
  }var t = 0;
function setup() {
  createCanvas(600, 400);
  noStroke();
  fill(0);
}
function draw() {
  background(250, 30);
  for (var x = 0; x <= width; x = x + 50) {
    for (var y = 0; y <= height; y = y + 50) {
      var xStart = map(mouseX, 0, width, -PI, PI);
      var yStart = map(mouseY, 0, height, -PI, PI);
      var angle = xStart + yStart;
      var X0 = x + 40 * cos(PI * t + angle);
      var Y0 = y + 40 * sin(PI * t + angle);
      ellipse(1.5 * X0, 1.5 * Y0, 3);
    }
  }
}function setup() {
  createCanvas(800, 500);
}
function draw() {
  background(48, 201, 243);
  rectMode(CENTER);
  noStroke();
  fill(50, 179, 228);
  fill(31, 196, 198);
  fill(255, 255, 255);
  strokeWeight(3);
  fill(254, 206, 156);
  rect(90, 400, 10, 100);
  fill(255);
  fill(17, 125, 1);
  noStroke();
  stroke(225);
  strokeWeight(3);
  noStroke(225);
  stroke(255);
  strokeWeight(2);
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(355, 98);
  bezierVertex(355, 70, 445, 70, 445, 98);
  endShape();
  fill(241, 202, 190);
  noStroke();
  beginShape();
  endShape(CLOSE);
  fill(237, 151, 153);
  stroke(237, 151, 153);
  arc(400, 160, 40, 80, 0, PI, CHORD);
  fill(255);
  noStroke();
  rect(400, 168, 38, 6);
  noStroke();
  fill(126, 90, 74);
  endShape(CLOSE);
  endShape(CLOSE);
  endShape(CLOSE);
  endShape(CLOSE);
  rect(400, 320, 140, 200);
  noFill();
  stroke(111, 100, 93);
  strokeWeight(2);
  rect(376, 140, 40, 35, 10, 10, 20, 15);
  rect(426, 140, 40, 35, 10, 10, 15, 20);
  strokeWeight(4);
  line(397, 130, 405, 130);
  noStroke();
  fill(39, 85, 126);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(400, 365, 130, 80, 0, 0, 50, 50);
  fill(180);
  strokeWeight(3);
  fill(246, 101, 104);
  triangle(355, 200, 445, 210, 400, 320);
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(400, 300, 5, 5);
  ellipse(395, 290, 5, 5);
  ellipse(405, 288, 5, 5);
  ellipse(392, 280, 5, 5);
  ellipse(409, 278, 5, 5);
  ellipse(389, 270, 5, 5);
  ellipse(411, 268, 5, 5);
  ellipse(385, 260, 5, 5);
  ellipse(416, 260, 5, 5);
  ellipse(383, 250, 5, 5);
  ellipse(379, 240, 5, 5);
  ellipse(420, 247, 5, 5);
  ellipse(374, 230, 5, 5);
  ellipse(425, 235, 5, 5);
  ellipse(371, 220, 5, 5);
  ellipse(430, 225, 5, 5);
  ellipse(366, 210, 5, 5);
  ellipse(432, 215, 5, 5);
  noStroke();
  fill(170, 231, 19);
  stroke(255);
  strokeWeight(5);
  line(37, 417, 37, 441);
  line(53, 455, 53, 485);
  line(757, 417, 757, 441);
  line(745, 455, 745, 485);
  stroke(17, 125, 2);
  point(730, 400);
  point(735, 380);
  point(710, 340);
  point(700, 360);
  point(710, 375);
  point(730, 400);
  point(695, 395);
}var ball = {
  x: 300,
  y: 200,
  xspeed: 4,
  yspeed: -3
}
function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(0);
  move();
  bounce();
  display();
}
function move() {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;
}
function bounce() {
  if (ball.x > width || ball.x < 0) {
    ball.xspeed = ball.xspeed * -1;
  }
  if (ball.y > height || ball.y < 0) {
    ball.yspeed = ball.yspeed * -1;
  }
}
function display() {
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(ball.x, ball.y, 24, 24);
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  strokeWeight(4);
  stroke(255);
  
  for(var x=0;x<=width;x+=50){
      for(var y=0;y<=mouseX;y+=50){
  fill(255,0,random(200));
   ellipse(x,y,25,25);
  }
  }
}var offset=0;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  strokeWeight(4);
  stroke(255);
  
  var x=0;
  while(x<=width){
    fill(0,200,random(255));
    ellipse(x+offset,100,25,25);
    x=x+50;
  }
  offset=offset+1
  for(var x=0;x<=width;x+=50){
  fill(255,0,random(200));
   ellipse(x,300,25,25);
  }
}var x=0;
var speed=3;
function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(x,200,100,100);
  
  if(x>width||x<0){
    speed=speed*-1;
}
  x=x+speed;
}function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  if(mouseX>300&&mouseX<400 && mouseY>200&&mouseY<300){
   fill(255,0,200);
    }
  rect(300,200,100,100)
  
}var slider;
function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 100, 50);
  slider.position(20, 20);
  slider.changed(YOU);
}
function draw() {
  background(220);
}
function YOU() {
  background(220);
}var x = 100;
var y = 100;
var xLoc1=0;
var yLoc1=100;
var directionX = 2;
var directionY = 1;
var speed=5;
var speed1 = 10;
var speed2 = 5;
function preload() {
  img = loadImage("kitchen.png");
  img2 = loadImage("icecream.png");
  img3 = loadImage("egg.png");
  img4 = loadImage("bulb.png");
  img5 = loadImage("tiger.png");
  img6 = loadImage("David.png");
  img7 = loadImage("fish.png");
  img8 = loadImage("emoji1.png")
}
function setup() {
  createCanvas(1000, 561);
}
function draw() {
  background(255);
  noStroke();
  fill(0);
  x = x + 2 * speed1;
  if (x > width || x < 0) {
    speed1 = speed1 * -1
  }
  y = y + 2 * speed2;
  if (y > height || y < 0) {
    speed2 = speed2 * -1
  }
  xLoc1 = xLoc1 + directionX;
  if (xLoc1 < 0 || xLoc1 > width){
		directionX = -directionX
  }
  yLoc1 = yLoc1 + directionY;
  if (yLoc1 < 0 || yLoc1 > height){
		directionY = -directionY
  }
  xLoc1 = xLoc1 + directionX * speed;
  yLoc1 = yLoc1 + directionY * speed;
  
 
  
}function setup() {
  createCanvas(600, 600);
}
function draw() {
background(255);
  
  if(mouseX<width/3){
  fill('red'); 
	noStroke();
  rect(0,0,width/3,height);
  }
  
  else if(mouseX<2*width/3){
  fill('red'); 
  rect(width/3,0,width/3,height);
}
	else{
  fill('red'); 
  rect(2*width/3,0,width/3,height);
}
}