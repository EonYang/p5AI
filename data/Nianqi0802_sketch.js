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
var newspaper_1;
var newspaper_2;
var ourfont;
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
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
}
function setup() {
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
var newspaper_1;
var newspaper_2;
var ourfont;
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
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
}
function setup() {
  createCanvas(1440, 860);
  textFont(ourfont);
  image(newspaper_2, 1055, 170, 383, 690);
  dots[0] = new Dots(267, 290, 255);
  dots[1] = new Dots(848, 677, 255);
  dots[2] = new Dots(922, 150, 255);
  dots[3] = new Dots(519, 156, 255);
  s1_photos = [s1_resident, s1_construction, s1_gov, s1_house]
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
}
function draw() {
    if (!alert_camera_status && currentstatus == 1 ) {
      for (let i = 0; i < dots.length; i++) {
          dots[i].disappear();
        }
      }
    }
    if(currentstatus ==2){
      glass_circle();
      glass_zoom();
    }
  }
  image(newspaper_1, 1055, 0, 383, 170);
  titleshow(titles[0]);
  timeshow(timeinfos[0]);
  alert_camera_show();
  alert_camera_happen();
	txtcomeout();
}
var bg_default;
var newspaper_1;
var newspaper_2;
var ourfont;
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
function preload() {
  ourfont = loadFont('asset/TpldKhangXiDictTrial.otf');
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
}
function setup() {
  createCanvas(1440, 860);
  textFont(ourfont);
  image(newspaper_2, 1055, 170, 383, 690);
  dots[0] = new Dots(267, 290, 255);
  dots[1] = new Dots(848, 677, 255);
  dots[2] = new Dots(922, 150, 255);
  dots[3] = new Dots(519, 156, 255);
  s1_photos = [s1_resident, s1_construction, s1_gov, s1_house]
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
}
function draw() {
    if (!alert_camera_status && currentstatus == 1 ) {
      for (let i = 0; i < dots.length; i++) {
          dots[i].disappear();
        }
      }
    }
    if(currentstatus ==2){
    }
  }
  image(newspaper_1, 1055, 0, 383, 170);
  titleshow(titles[0]);
  timeshow(timeinfos[0]);
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
var txt2 = ['Everything will be good and peaful.']
var stxt1 =[];
var stxt2 = [];
var alltxt = [''];
var showtxtnum = 0;
var lastshowtxtnum =0;
var bigger = 0;
var lbigger =0;
var mousestatus = 0;
var txtbx = 10;
var txtby = 50;
function setup() {
  createCanvas(400, 400);
  
  for(let i of txt1){
  	stxt1 = concat(stxt1,splitTokens(i));
    
  }
  for(let i of txt2){
  	stxt2 = concat(stxt2,splitTokens(i));
    
  }
  
}
function draw() {
  background(220);
  
  if(mouseIsPressed && mouseX<200 && mousestatus!=1){
    mousestatus = 1;
    alltxt.push(stxt1);
    showtxtnum++;
    
    
  }
 if(mouseIsPressed && mouseX>200 && mousestatus!=2){
    mousestatus = 2;
    alltxt.push(stxt2);
    showtxtnum++;
   	
   	
  }
 	console.log(showtxtnum,lastshowtxtnum);
  
  if(showtxtnum>lastshowtxtnum){
    bigger++}
  
  if(bigger>lbigger){
    
  for(let i =0;i<alltxt[showtxtnum].length;i++){
    text(alltxt[showtxtnum][i],txtbx,txtby);
    txtbx = txtbx + textWidth(alltxt[showtxtnum][i])+textWidth('a');
    	if(txtbx>width-50){
      	txtby+=textAscent(alltxt[showtxtnum][i]);
        txtbx=10;
     	}
  }
  }
  lastshowtxtnum = showtxtnum;
  lbigger = bigger; 
var txt2 = ['Everything will be good and peaful.']
var stxt1 =[];
var stxt2 = [];
var alltxt = [''];
var showtxt = [];
var showtxtnum = 0;
var mousestatus = 0;
var txtbx = 10;
var txtby = 50;
function setup() {
  createCanvas(400, 400);
  
  for(let i of txt1){
  	stxt1 = concat(stxt1,splitTokens(i));
    
  }
  for(let i of txt2){
  	stxt2 = concat(stxt2,splitTokens(i));
    
  }
  
}
function draw() {
  background(220);
  
  if(mouseIsPressed && mouseX<200 && mousestatus!=1){
    mousestatus = 1;
    alltxt.push(stxt1);
    showtxtnum++;
    showtxt.push(showtxtnum);
    showtxtl = showtxt.length;
    
  }
 if(mouseIsPressed && mouseX>200 && mousestatus!=2){
    mousestatus = 2;
    alltxt.push(stxt2);
    showtxtnum++;
   	showtxt.push(showtxtnum);
   showtxtl = showtxt.length;
   
    
   	
  }
  for(let j =0;j<showtxt.length;j++){
    
  if(showtxtl>showtxtll){
  
  for(let i =0;i<alltxt[showtxt[j]].length;i++){
    text(alltxt[showtxt[j]][i],txtbx,txtby);
    txtbx = txtbx + textWidth(alltxt[showtxt[j]][i])+textWidth('a');
    	if(txtbx>width-50){
      	txtby+=textAscent(alltxt[showtxt[j]][i]);
        txtbx=10;
     	}
  }
  }
  }
  showtxtll = showtxtl;
var txt2 = ['Everything will be good and peaful.']
var stxt1 =[];
var stxt2 = [];
var alltxt = [''];
var showtxtnum = 0;
var lastshowtxtnum =0;
var mousestatus = 0;
var txtbx = 10;
var txtby = 50;
function setup() {
  createCanvas(400, 400);
  
  for(let i of txt1){
  	stxt1 = concat(stxt1,splitTokens(i));
    
  }
  for(let i of txt2){
  	stxt2 = concat(stxt2,splitTokens(i));
    
  }
   background(220);
}
function draw() {
 
  
  if(mouseIsPressed && mouseX<200 && mousestatus!=1){
    mousestatus = 1;
    alltxt.push(stxt1);
    showtxtnum++;
    
    
  }
 if(mouseIsPressed && mouseX>200 && mousestatus!=2){
    mousestatus = 2;
    alltxt.push(stxt2);
    showtxtnum++;
   	
   	
  }
 	console.log(showtxtnum,lastshowtxtnum);
  
  if(showtxtnum>lastshowtxtnum){
    
  for(let i =0;i<alltxt[showtxtnum].length;i++){
    text(alltxt[showtxtnum][i],txtbx,txtby);
    txtbx = txtbx + textWidth(alltxt[showtxtnum][i])+textWidth('a');
    	if(txtbx>width-50){
      	txtby+=textAscent(alltxt[showtxtnum][i]);
        txtbx=10;
     	}
  }
  }
  lastshowtxtnum = showtxtnum;
let txt;
let tokens = [];
let arrayx= [];
let textbeginx = 0;
let textbeginy = 0;
  txt2 = ['Everything will be good and peaful.']
let textshow = 0;
function setup() {
  
  
  createCanvas(400, 400);
  
  
  for(let i of txt1){
    
  	tokens = concat(tokens,splitTokens(i));
  }
 
  console.log(tokens);
}
function draw() {
  background(220);
  
  
  
  textSize(20);
  textAlign(LEFT);
  
  
 if(mouseIsPressed)
 {textshow =1;
 console.log(textshow)}
  
  
  arrayx.push(tokens);
  
  
  let x = 10;
  let y = 50;
  
  if(textshow){
  for(let i=0;i< tokens.length;i++){
  		
    	text(tokens[i],x,y);
    	x = x + textWidth(tokens[i])+textWidth('a');
    	if(x>width-50){
      	y+=textAscent(tokens[i]);
        x=10;
     	}
    
    	
    
    
  }
  }
  text('X:'+mouseX,300,300);
  text('Y:'+mouseY,300,350);
 
 	
}var bg;
var v = [];
function preload(){
  bg = loadImage('asset/background/bg_origin.jpg');
}
function setup() {
  createCanvas(1440, 860);
}
function draw() {
  image(bg,0,0,1440,860);
  noFill();
  stroke(255);
  rect(mouseX-120,mouseY-70,140,90);
  
  
 
  if(mouseIsPressed){
     bg.loadPixels();
 			 for(var x = mouseX-120;x<mouseX+20;x++){
  		 		for(var y = mouseY-70;y<mouseY+20;y++){
             var p = (x +y*140)*4;
             var vr = bg.pixels[p];
      			 var vg = bg.pixels[p+1];
      			 var vb = bg.pixels[p+2];
     				 fill(vg,vg,vb);
     				 noStroke();
      				ellipse(x*5,y*5,5,5);
          }
         
        	
       }
  }
  
  
  	
}var bg_default;
var newspaper_1;
var newspaper_2;
var ourfont;
var toolshow = 20;
var bar_bg_p = 860;
var fade = 255;
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
  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
  s1_resident = loadImage('asset/scene/01residents.jpg');
  s1_construction = loadImage('asset/scene/02construction.jpg');
  s1_gov = loadImage('asset/scene/03gov.jpg');
  s1_house = loadImage('asset/scene/04house.jpg');
}
function setup() {
  createCanvas(1440, 860);
  textFont(ourfont);
  image(newspaper_2, 1055, 170, 383, 690);
  dots[0] = new Dots(267, 290, 255);
  dots[1] = new Dots(848, 677, 255);
  dots[2] = new Dots(922, 150, 255);
  dots[3] = new Dots(519, 156, 255);
  s1_photos = [s1_resident, s1_construction, s1_gov, s1_house]
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
}
function draw() {
    if (!alert_camera_status) {
      for (let i = 0; i < dots.length; i++) {
          dots[i].disappear();
        }
      }
    }
  }
  image(newspaper_1, 1055, 0, 383, 170);
  titleshow(titles[0]);
  timeshow(timeinfos[0]);
  alert_camera_show();
  alert_camera_disappear();
	txtcomeout();
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
}var mic;
var volhistory = [];
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
}
function draw() {
  
  micLevel = mic.getLevel();
  
  background(micLevel*2000);
  
  volhistory.push(micLevel);
  
  stroke(255);
  noFill();
  translate(width/2,height/2);
  beginShape();
  for(let i = 0; i<360;i++){
    var r = map(volhistory[i],0,1,50,200);
  	var x = r * cos(i);
    var y = r * sin(i);
    vertex(x,y);
  }
  endShape();
  if(volhistory.length>360){
  	volhistory.splice(0,1);
  }
  
  beginShape();
  for(let i = 0; i<volhistory.length;i++){
  	var y = map(volhistory[i],0,1,height/2,-100);
    vertex(i,y);
  }
  endShape();
  
  if(volhistory.length>width){
  	volhistory.splice(0,1);
  }
  
}var wave;
var slider;
var env;
function setup() {
  createCanvas(400, 400);
  
  slider = createSlider(100,1200,440);
  
  env = new p5.Envelope();
  env.setADSR(0.05,0.1,0.5,1);
  env.setRange(0.8,0);
  
  wave = new p5.Oscillator();
  wave.setType('triangle');
  wave.start();
  wave.amp(env);
  
  
}
function draw() {
  wave.freq(slider.value());
  background(220);
}
function mousePressed(){
	env.play();
}var teapot;
function preload() {
  teapot = loadModel('Book.obj');
}
function setup() {
  createCanvas(200, 200, WEBGL);
}
function draw() {
  background(200);
  rotateX(mouseX/50);
  rotateY(mouseY/100);
  model(teapot);
  
}let whati;
let amplitude;
function preload(){
	whati = loadSound('song.mp3');
}
function setup() {
  whati.setVolume(0.1);
  whati.play();
  amplitude = new p5.Amplitude();
  createCanvas(400, 400);
}
function draw() {
  background(0);
  var level = amplitude.getLevel();
  var size = map(level, 0, 1, 0, 2000);
  ellipse(width/2, height/2, size, size);
}var img;
let ball=[];
function preload() {
  img = loadImage('robot color.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i =0; i<100;i++){
  	ball[i] = new Ball(random(windowWidth),random(windowHeight),random(5),random(5),134,random(10));
  }
}
function draw() {
  background('#d07f0d');
  
  for(let i = 0;i<ball.length;i++){
  	ball[i].show();
    ball[i].bounce();
  }
  image(img,windowWidth/2-100,100,200,489);
}
class Ball {
  constructor(x,y,x1,y1,c,size){
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.c = c;
    this.size = size;
  }
  
  bounce(){
    this.x+=this.x1;
    this.y+=this.y1;
    if(this.x>=width || this.x<0){
      this.x1 = - this.x1;
    }
    if(this.y>=height || this.y<0){
      this.y1= - this.y1;
    }
  }
  
  show(){
    fill(0);
    ellipse(this.x,this.y,this.size,this.size);
  }
  
}var video;
var canvas;
function setup() {
  canvas = createCanvas(640,480,WEBGL);
  background(51);
  video = createCapture(VIDEO);
  video.size(640,480);
  video.id('p5video');
  canvas.id('p5canvas')
  var seriously = new Seriously()；
  var src = seriously.source('#p5video');
  var target = seriously.target('#p5canvas');
  var blur = seriously.effect('blur');
  blur.source = src;
  target.source = blur;
  seriously.go();
}
let weather;
let url;
let temp;
let pressure; 
let humidity;
let windspeed;
let cloud;
let wheelx;
let wheely;
let fWheel;
let bWheel;
let apikey ="&units=metric&appid=b8969a3f7ee75ed3210ef407f52694f7";
function preload() {
	fWheel = loadImage('assets/fWheel.png');
  bWheel = loadImage('assets/bWheel.png');
}
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  let button = select("#submit");
  button.mousePressed(weatherask);
  cityname = select("#city");
}
function gotData(data){ 
  temp = data.list[0].main.temp;
  humidity = data.list[0].main.humidity;
  windspeed = data.list[0].wind.speed;
  cloud = data.list[0].clouds.all;
  console.log('temp:'+temp);
  console.log('humidity:'+humidity);
  console.log('windspeed:'+windspeed);
  console.log('cloud:'+cloud);
}
function draw() {
  frameRate(windspeed);
  wheelx = random(wheelx-10,wheelx+10);
  wheely = random(wheely-10,wheely+10);
  line(wheelx,wheelx+windowWidth/2);
  
  image(fWheel, wheelx, wheely, temp*15, temp*15);
  
  fill(255);
  rect(wheelx,wheely+100,90,40);
  fill(0);
  text('TEMP:'+temp,wheelx+20,wheely+125);
  
  image(bWheel, wheelx+windowWidth/3, wheely, humidity*3, humidity*3); 
	
  fill(255);
  rect(wheelx+windowWidth/3,wheely+150,90,40);
  fill(0);
  text('HUM:'+humidity,wheelx+20+windowWidth/3,wheely+175);
}
function weatherask(){
  city = cityname.value();
	url = api+city+apikey;
  loadJSON(url,gotData);
  wheelx = random(width/6);
  wheely = random(height/2);
  fr= int(windspeed*2)
}let weather;
let url;
let temp;
let pressure; 
let humidity;
let windspeed;
let cloud;
let imagetest;
let apikey ="&units=metric&appid=b8969a3f7ee75ed3210ef407f52694f7";
function preload() {
  imgtest = loadImage('dolls.gif');
}
function setup() {
  createCanvas(1600, 800);
  
  var button = select("#submit");
  button.mousePressed(weatherask);
  cityname = select("#city");
	
}
function gotData(data){ 
  temp = data.list[0].main.temp;
  humidity = data.list[0].main.humidity;
  windspeed = data.list[0].wind.speed;
  cloud = data.list[0].clouds.all;
  console.log('temp:'+temp);
  console.log('humidity:'+humidity);
  console.log('windspeed:'+windspeed);
  console.log('cloud:'+cloud);
}
function draw() {
  imgtest.filter('POSTERIZE',14);
  image(imgtest,0,0);
}
function weatherask(){
  city = cityname.value();
	url = api+city+apikey;
  loadJSON(url,gotData);
}let weather;
let temp;
let url;
var cityname;
let city;
let apikey ="&units=metric&appid=b8969a3f7ee75ed3210ef407f52694f7";
function setup() {
  createCanvas(400, 400);
  
  var button = select("#submit");
  button.mousePressed(weatherask);
  cityname = select("#city");
	
}
function gotData(data){
  
  temp = data.list[0].main.temp;
  console.log(data.list[0].main.temp);
}
function draw() {
  if(temp<10){
  background(20,20,100);
  }
  else if(temp<20){
  background(40,150,220);
  }
  else{
  background(290,180,180);
  }
  fill(255);
  textSize(30);
  text(temp ,185,200);
  textSize(16);
  text(city,178,220);
}
function weatherask(){
  city = cityname.value();
	url = api+city+apikey;
  loadJSON(url,gotData);
}var video;
var vscale = 20;
function preload() {
  img = loadImage('IMG_4553.JPG');
}
function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vscale,height/vscale);
}
function draw() {
  background(250);
  
  video.loadPixels();
  loadPixels();
  for (var i = 0; i< video.width;i++){
  	for(var j = 0;j<video.height;j++){
      var p = (video.width - i +j*video.width)*4;
      var r = video.pixels[p];
      var g = video.pixels[p+1];
      var b = video.pixels[p+2];
      var bright = (r+g+b)/3;
      
      var w= map(r,0,255,0,vscale);
      	noStroke();
      	image(img, i*vscale, j*vscale,w, w);
    }
  }
}var video;
var video2;
var r,g,b;
var i = 0;
var j = 240;
var rectw = 64;
var recth = 40;
var press = false;
var lastpress = false;
var bright;
function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video2 = createCapture(VIDEO);
  video.size(40,30);
  video.hide();
  video2.size(40,30);
  video2.hide();
}
function draw() {
  fill(220);
  noStroke();
  rect(0,0,300,480);
  image(video,10,60,240,180);
  
  loadPixels();
  var index = 400000;
  console.log(index)
  r = pixels[index];
  g = pixels[index+1];
  b = pixels[index+2];
  fill(r,g,b);
  textSize(20);
  fill(0);
  textSize(11);
  text('Move the mouse to your favourite thing. Click and get the protrait of your unqiue color.',10,400,240);
    
 
  video2.loadPixels();
    for (var x = 0; x< video2.width;x++){
  	for(var y = 0;y<video2.height;y++){
      var p = (x +y*video2.width)*4;
      var vr = video2.pixels[p];
      var vg = video2.pixels[p+1];
      var vb = video2.pixels[p+2];
      bright = (vr+vg+vb)/3;
      var w= map(bright,0,255,0,20);
      fill(r,g,b);
      noStroke();
      ellipse(305+x*10,y*10,w,w);
    }
    }
    rect(300,300,340,180);
    
    if((r+g+b)/3<=220){
      fill(255);}
    else if ((r+g+b)/3>220) {
      fill(255-r,255-g,255-b);}
    textSize(14);
    text('MY UNIQUE COLOR',400,370);
    textSize(20);
    text('R'+r+','+'G'+g+',B'+b,398,400);
  
 
      
}
var video;
var video2;
var r,g,b;
var i = 0;
var j = 240;
var rectw = 64;
var recth = 40;
var press = false;
var lastpress = false;
var bright;
function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video2 = createCapture(VIDEO);
  video.size(40,30);
  video.hide();
  video2.size(40,30);
  video2.hide();
}
function draw() {
  fill(220);
  noStroke();
  rect(0,0,300,480);
  image(video,10,60,240,180);
  
  loadPixels();
  var index = (mouseX + mouseY*width)*4;
  r = pixels[index];
  g = pixels[index+1];
  b = pixels[index+2];
  fill(r,g,b);
  textSize(20);
  fill(0);
  textSize(11);
  text('Move the mouse to your favourite thing. Click and get the protrait of your unqiue color.',10,400,240);
    
  
  if(mouseIsPressed){
  video2.loadPixels();
    for (var x = 0; x< video2.width;x++){
  	for(var y = 0;y<video2.height;y++){
      var p = (x +y*video2.width)*4;
      var vr = video2.pixels[p];
      var vg = video2.pixels[p+1];
      var vb = video2.pixels[p+2];
      bright = (vr+vg+vb)/3;
      var w= map(bright,0,255,0,20);
      fill(r,g,b);
      noStroke();
      ellipse(305+x*10,y*10,w,w);
    }
    }
    rect(300,300,340,180);
    if((r+g+b)/3<=220){
      fill(255);}
    else if ((r+g+b)/3>220) {
      fill(255-r,255-g,255-b);}
    textSize(14);
    text('MY UNIQUE COLOR',400,370);
    textSize(20);
    text('R'+r+','+'G'+g+',B'+b,398,400);
  }
 
      
}
var video;
var r,g,b;
var i = 0;
var j = 240;
var rectw = 64;
var recth = 40;
var press = false;
var lastpress = false;
function setup() {
  createCanvas(320, 320);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(640,320);
  video.hide();
}
function draw() {
  
  image(video,0,0,320,240);
  
  loadPixels();
  var index = (mouseX + mouseY*width)*4;
  r = pixels[index];
  g = pixels[index+1];
  b = pixels[index+2];
  fill(r,g,b);
  textSize(20);
  text(r+','+g+','+b,0,height/2);
  
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
      j= 240;
    }
  }
  
  lastpress = press;
      
}
var img;
var w=16;
function preload() {
  img = loadImage('IMG_4553.JPG');
}
function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  
}
function draw() {
  background(220);
  img.loadPixels();
  
  for(let i = 0;i<width;i+=w){
  	for (let j = 0;j<height;j+=w){
    	var c = img.get(i,j);
      
      noStroke();
      fill(c);
      rect(i,j,w,w);
    }
  }
  
 
}var img;
function setup() {
  createCanvas(100, 100);
  img = createImage(100,100);
  img.loadPixels();
  for(var i =0;i<img.width;i++){
  	for(var j = 0;j<img.height;j++){
    	img.set(i,j,color(random(255),random(255),random(255)));
    }
  }
  img.updatePixels();
}
function draw() {
  background(220);
  image(img,0,0);
}var video;
var vscale = 16;
function preload() {
  img = loadImage('IMG_4553.JPG');
}
function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vscale,height/vscale);
}
function draw() {
  background(250);
  
  video.loadPixels();
  loadPixels();
  for (var i = 0; i< video.width;i++){
  	for(var j = 0;j<video.height;j++){
      var p = (video.width - i +j*video.width)*4;
      var r = video.pixels[p];
      var g = video.pixels[p+1];
      var b = video.pixels[p+2];
      var bright = (r+g+b)/3;
      
      var w= map(r,0,255,0,vscale);
      	noStroke();
      	image(img, i*vscale, j*vscale,w, w);
    }
  }
}var video;
var vScale = 16;
function setup() {
  createCanvas(640, 480);
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
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];
      var bright = (r+g+b)/3;
      var w = map(bright, 0, 255, 0, vScale);
      noStroke();
      fill(255);
      rectMode(CENTER);
      rect(x*vScale, y*vScale, w, w);
    }
  }
 
}
var video;
var vscale = 16;
function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vscale,height/vscale);
}
function draw() {
  background(250);
  
  video.loadPixels();
  loadPixels();
  for (var i = 0; i< video.width;i++){
  	for(var j = 0;j<video.height;j++){
      var p = (video.width - i +1 +j*video.width)*4;
      var r = video.pixels[p];
      var g = video.pixels[p+1];
      var b = video.pixels[p+2];
      var bright = (r+g+b)/3;
      
      var w= map(r,0,255,0,vscale);
      	fill(r,120,b);
      	noStroke();
      	ellipse(i*vscale,j*vscale,w,w);
    }
  }
}var video;
function setup() {
  createCanvas(800, 240);
  video = createCapture(VIDEO);
  video.size(320,240);
	
}
function draw() {
  
    image(video,0,0);
    
  
}
var video;
var button;
var snapshots = [];
var go = false;
function setup() {
  createCanvas(800, 240);
  video = createCapture(VIDEO,ready);
  video.size(320,240);
}
function ready(){
	go = true;
}
function draw() {
  if(go){
  snapshots.push(video.get());
  }
  var x = 0;
  var y = 0;
  var w = 80;
  var l = 60;
  for(var i = 0;i<snapshots.length;i++){
    
    image(snapshots[i],x,y,w,l);
    x = x + w;
    if (x >width){
      x = 0;
    	y = y+l;
    }
  }
  
}
let correctkey = 1;
var keynumber = [1, 2, 3];
let lastData;
let hole;
var windowframe;
var redbg;
var windowclosed;
var dolls;
var dollseyes;
var happytwins;
let crownlaugh;
var crownLaughed = false;
let crying;
let i = 0;
let count= 0;
let clown;
let clownY = 130;
let clownYminus = 5;
let happysong;
let happysonged = false;
let beginning;
let began = false;
let sign; 
let slogan;
function preload() {
  hole = loadImage('hole.png');
  windowframe = loadImage('window2.png');
  redbg = loadImage('redbg.png');
  dolls = loadImage('dolls.png');
  dollseyes = loadImage('eyesofdolls.png');
  happytwins = loadImage('happytwins.png ');
  windowclosed = loadImage('closedwindow.jpg');
  crownlaugh = loadSound('170331__siriuss22__yzlaugh3.ogg');
  crying = loadSound('crying twins.mp3');
  clown = loadImage('clowncut.png ');
  happysong = loadSound('happy song.mp3');
  beginning = loadSound('beginning_music.mp3');
  sign = loadImage('sign.png');
  slogan = loadImage('slogan.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
  image(redbg, 0, 0);
  image(dolls, 0, 0);
  let transeyes = [0, 100, 100, 100, 100, 255];
  image(dollseyes, 0, 0, random(transeyes));
  fill(0, random(0, 100));
  rect(0, 0, windowWidth, windowHeight);
  image(windowframe, 0, -30);
  if (latestData == 4) {
    
     if (!began) {
      beginning.setVolume(0.1);
      beginning.play();
      
      began = true;
      
    }
    
    
  }
  fill(255);
  textSize(30);
  if (latestData == correctkey) {
    image(windowclosed, 0, -30);
    i++;
    if (i > 80) {
      happyending();
      if (!happysonged) {
      happysong.setVolume(0.1);
      happysong.play();
      
      happysonged = true;
    }
      began = false;
    }
		
    count++;
    if(count>100) {return2default();
                   console.log('return');
                  }
		
  } else if (latestData != correctkey && (latestData == 1 || latestData == 2 || latestData == 3)) {
    began = false;
    console.log(began);
    if (!crownLaughed) {
      crownlaugh.setVolume(0.05);
      crownlaugh.play();
      crying.setVolume(2.2);
      crying.play();
      crownLaughed = true;
    }
    image(redbg, 0, 0);
    
    clownY-=clownYminus;
    
    image(clown,0,clownY);
    
    
    if(clownY < -300){
    clownYminus = 0;
    
    }
    
    image(dolls, 0, 0);
    let transeyes = [0, 100, 100, 100, 100, 255];
    image(dollseyes, 0, 0, random(transeyes));
    fill(0, random(0, 100));
    rect(0, 0, windowWidth, windowHeight);
    image(windowframe, 0, -30);
    
    push();
    rotate(random(0.001));
		image(sign,0,0);
    fill('#fe9200');
    text(correctkey,1138,276);
    pop();
  }
}
function happyending() {
  image(slogan,0,-30);
  image(happytwins, 0, 0);
  image(windowframe, 0, -30);
}
function return2default(){
  image(redbg, 0, 0);
  image(dolls, 0, 0);
  let transeyes = [0, 100, 100, 100, 100, 255];
  image(dollseyes, 0, 0, random(transeyes));
  fill(0, random(0, 100));
  rect(0, 0, windowWidth, windowHeight);
  image(windowframe, 0, -30);
	correctkey = random(keynumber);
    crownLaughed = false;
    clownYminus = 5;
    clownY = 130;
    happysonged = false;
    i=0;
    began = false;
  count = 0;
}
#define SENSORPIN1 9
#define SENSORPIN2 5
#define SENSORPIN3 3
#define button 13
int sensorState1 = 0,lastState1 = 0;
int sensorState2 = 0,lastState2 = 0;
int sensorState3 = 0,lastState3 = 0;
int buttonState = 0, lastState_button =0;
void setup() {
pinMode(SENSORPIN1,INPUT);
digitalWrite(SENSORPIN1,HIGH);
pinMode(SENSORPIN2,INPUT);
digitalWrite(SENSORPIN2,HIGH);
pinMode(SENSORPIN3,INPUT);
digitalWrite(SENSORPIN3,HIGH);
pinMode(button,INPUT);
}
void loop() {
sensorState1 = digitalRead(SENSORPIN1);
sensorState2 = digitalRead(SENSORPIN2);
sensorState3 = digitalRead(SENSORPIN3);
buttonState = digitalRead(button);
 if (sensorState1 && !lastState1) {
  } 
  lastState1 = sensorState1;
 if (sensorState2 && !lastState2) {
  } 
  lastState2 = sensorState2;
 if (sensorState3 && !lastState3) {
  } 
   lastState3 = sensorState3;
if(buttonState && !lastState_button){
}
if(!buttonState && lastState_button){
}
lastState_button = buttonState;
  
 
}
let correctkey = 1;
var keynumber = [1, 2, 3];
let lastData;
let hole;
var windowframe;
var redbg;
var windowclosed;
var dolls;
var dollseyes;
var happytwins;
let crownlaugh;
var crownLaughed = false;
let crying;
let i = 0;
let clown;
let clownY = 130;
let clownYminus = 5;
let happysong;
let happysonged = false;
let beginning;
let began = false;
let sign; 
let slogan;
function preload() {
  hole = loadImage('hole.png');
  windowframe = loadImage('window2.png');
  redbg = loadImage('redbg.png');
  dolls = loadImage('dolls.png');
  dollseyes = loadImage('eyesofdolls.png');
  happytwins = loadImage('happytwins.png ');
  windowclosed = loadImage('closedwindow.jpg');
  crownlaugh = loadSound('170331__siriuss22__yzlaugh3.ogg');
  crying = loadSound('crying twins.mp3');
  clown = loadImage('clowncut.png ');
  happysong = loadSound('happy song.mp3');
  beginning = loadSound('beginning_music.mp3');
  sign = loadImage('sign.png');
  slogan = loadImage('slogan.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
  image(redbg, 0, 0);
  image(dolls, 0, 0);
  let transeyes = [0, 100, 100, 100, 100, 255];
  image(dollseyes, 0, 0, random(transeyes));
  fill(0, random(0, 100));
  rect(0, 0, windowWidth, windowHeight);
  image(windowframe, 0, -30);
  if (latestData == 4) {
    correctkey = random(keynumber);
    crownLaughed = false;
    clownYminus = 5;
    clownY = 130;
    happysonged = false;
    i=0;
    began = false;
     if (!began) {
      beginning.setVolume(0.1);
      beginning.play();
      
      began = true;
      
    }
    
    
  }
  fill(255);
  textSize(30);
  if (latestData == correctkey) {
    image(windowclosed, 0, -30);
    i++;
    if (i > 80) {
      happyending();
      if (!happysonged) {
      happysong.setVolume(0.1);
      happysong.play();
      
      happysonged = true;
    }
      began = false;
    }
		
  } else if (latestData != correctkey && (latestData == 1 || latestData == 2 || latestData == 3)) {
    began = false;
    console.log(began);
    if (!crownLaughed) {
      crownlaugh.setVolume(0.05);
      crownlaugh.play();
      crying.setVolume(2.2);
      crying.play();
      crownLaughed = true;
    }
    image(redbg, 0, 0);
    
    clownY-=clownYminus;
    
    image(clown,0,clownY);
    
    
    if(clownY < -300){
    clownYminus = 0;
    
    }
    
    image(dolls, 0, 0);
    let transeyes = [0, 100, 100, 100, 100, 255];
    image(dollseyes, 0, 0, random(transeyes));
    fill(0, random(0, 100));
    rect(0, 0, windowWidth, windowHeight);
    image(windowframe, 0, -30);
    
    push();
    rotate(random(0.001));
		image(sign,0,0);
    fill('#fe9200');
    text(correctkey,1138,276);
    pop();
  }
  console.log(correctkey, latestData);
}
function happyending() {
  image(slogan,0,-30);
  image(happytwins, 0, 0);
  image(windowframe, 0, -30);
}
function return2default(){
	
}
#define SENSORPIN1 9
#define SENSORPIN2 5
#define SENSORPIN3 3
#define button 13
int sensorState1 = 0,lastState1 = 0;
int sensorState2 = 0,lastState2 = 0;
int sensorState3 = 0,lastState3 = 0;
int buttonState = 0, lastState_button =0;
void setup() {
pinMode(SENSORPIN1,INPUT);
digitalWrite(SENSORPIN1,HIGH);
pinMode(SENSORPIN2,INPUT);
digitalWrite(SENSORPIN2,HIGH);
pinMode(SENSORPIN3,INPUT);
digitalWrite(SENSORPIN3,HIGH);
pinMode(button,INPUT);
}
void loop() {
sensorState1 = digitalRead(SENSORPIN1);
sensorState2 = digitalRead(SENSORPIN2);
sensorState3 = digitalRead(SENSORPIN3);
buttonState = digitalRead(button);
 if (sensorState1 && !lastState1) {
  } 
  lastState1 = sensorState1;
 if (sensorState2 && !lastState2) {
  } 
  lastState2 = sensorState2;
 if (sensorState3 && !lastState3) {
  } 
   lastState3 = sensorState3;
if(buttonState && !lastState_button){
}
if(!buttonState && lastState_button){
}
lastState_button = buttonState;
  
 
}
function preload(){
	boba = loadJSON('Menu.json');
}
function setup() {
  createCanvas(400, 400);
  let price = boba.Appetizers.Fruit_Tea_Boba.Large;
  console.log(price);
 
  
}
function draw() {
  background(220);
  
}var boba;
function preload(){
	boba = loadJSON('Menu.json');
}
function setup() {
  createCanvas(400, 400);
  let price = boba.Appetizers[0].sizes[0].price;
  console.log(price);
 
  
}
function draw() {
  background(220);
  
let allWords = [];
let ts = 16;
let i = 0;
function preload() {
  let q = "trump";
  loadJSON(url, processSnippets);
  
}
function setup() {
  createCanvas(800, 800);
  fill(0);
}
function draw() {
  ts++;
  if (allWords.length > 0) {
    i += 1;
    i %= allWords.length;
    textSize(ts);
  }
}
function processSnippets(data) {
  let docs = data.response.docs;
  console.log(data);
  let putins = ["Putin", "Vladi", "Vlad", "Vova"];
  let trumps = ["Trump", "president", "President"];
  for (let doc of docs) {
    for (let w in words) {
      let word = words[w];
      for (let trump of trumps) {
          break;
        }
      }
      shuffle(words, true);
    }
  }
}let txt;
let tokens = [];
function preload() {
  txt = loadStrings('text.txt');
}
function setup() {
  createCanvas(400, 400);
  for (let i of txt) {
    tokens = concat(tokens, splitTokens(i));
  }
}
function draw() {
  background(220);
  textSize(20);
  let x = 10;
  let y = 50;
  for (let token of tokens) {
    text(token, x, y);
    x = x + textWidth(token) + textWidth('a');
    if (x > (width - textWidth(token + 1))) {
      y += textAscent(token);
      x = 10;
    }
  }
}var weather;
var city ='Beijing';
var unit ='&units=metric';
var userkey = '&appid=8075f0f23a9fe47353466313848609c3';
var input;
function setup(){
createCanvas(600,250);
  var button =select('#submit');
  button.mousePressed(askWeather);
  input=select('#city');
}
function askWeather(){
  var url = api+input.value()+unit+userkey;
  loadJSON(url, gotData);
}
function gotData(data){
  weather=data;
}
function draw(){
  background(0);
  
  if(weather){
    var temp = weather.list[0].main.temp;
    var humidity = weather.list[0].main.humidity;
    var pressure = weather.list[0].main.pressure;
    var wind = weather.list[0].wind.speed;
    comment =weather.list[0].weather.description;
    
  
  
    
    push();
    
    fill(255,162,10);
    var tempbar = rect(40,50,temp*15,10,5);
    pop();
    
    push();
    fill(69,251,0);
    var humiditybar = rect(40,100,humidity*2,10,5);
    pop();
    
    push();
    fill(0,219,216);
    var pressurebar = rect(40,150,pressure/5,10,5);
    pop();
    
    push();
    fill(248,231,28);
    var windbar=rect(40,200,wind*20,10,5);
    pop();
    
    
    
    headtext();
    
    
    
  }
}
function headtext(){
    textSize(13);
    fill(255);
    text('Temperature', 40, 40);
    text('Humidity', 40, 90);
    text('Pressure', 40, 140);
  text('WindSpeed', 40, 190);
  
}
function description(){
   textSize(10);
    fill(255);
    text('temp', 200, 40);
    text('Humidity', 40, 90);
    text('Pressure', 40, 140);
}
var url=[];
var begin_date;
var end_date;
var key_word;
var snippet=[];
var headlines = [];
var article;
var keyword;
var img;
var time=[];
function setup() {
  createCanvas(1600,300);
  
  
  submit = select("#submit");
  begindate = select("#begindate");
  enddate = select("#enddate");
  keyword = select("#keyword")
  submit.mousePressed(timeupdate);
  
 
  
}
function draw() {
  fill(0);
	ellipse(100,170,headlines.length*10);
  if(headlines!=0){
  fill(255);
  textSize(20);
  text(headlines.length,90,175);
  textSize(10);
  fill('#FF5733');
  text('numbers of articles',90,190);
  }
  
 for(i=0;i<headlines.length;i++){
    
  	var alltitles = createElement('h1',headlines[i]);
   	var allsnippet = createElement('h3',snippet[i]);
   	var alltimes = createElement('h4',time[i]);
    alltitles.style("color","black");
   	allsnippet.style("color","white ");
   	alltimes.style("color","#FF5733");
   	
   noLoop();
  }
  
 
}
function gotData(data) {
  
	article = data.response.docs;
  
  
  
 	for(let i = 0;i<article.length;i++){
  snippet[i] =article[i].snippet;    
  }
  
  for( i = 0;i<article.length;i++){
  headlines[i] =article[i].headline.main;  
      
  }
  
  for(let i = 0;i<article.length;i++){
  time[i] =article[i].pub_date;  
   
 
  }
  
  
}
function timeupdate(){
	begin_date = begindate.value();
  end_date = enddate.value();
  key_word = keyword.value();
  for(let page = 0;page<10;page++){
  url[page] = api +key_word+"?page="+page+ "&api-key=b20d32b716bf4f4c817cc818c91d7000&begin_date="+ begin_date +"&end_date=" + end_date ;
  }
  loadJSON(url[3], gotData);  
  console.log(url);
}
let weather;
let url;
let temp;
let pressure; 
let humidity;
let windspeed;
let cloud;
let imagetest;
let apikey ="&units=metric&appid=b8969a3f7ee75ed3210ef407f52694f7";
function preload() {
  imgtest = loadImage('dolls.gif');
}
function setup() {
  createCanvas(600, 400);
  
  var button = select("#submit");
  button.mousePressed(weatherask);
  cityname = select("#city");
	
}
function gotData(data){ 
  temp = data.list[0].main.temp;
  humidity = data.list[0].main.humidity;
  windspeed = data.list[0].wind.speed;
  cloud = data.list[0].clouds.all;
  console.log('temp:'+temp);
  console.log('humidity:'+humidity);
  console.log('windspeed:'+windspeed);
  console.log('cloud:'+cloud);
}
function draw() {
  background(255);
  image(imgtest,0,0);
}
function weatherask(){
  city = cityname.value();
	url = api+city+apikey;
  loadJSON(url,gotData);
}function setup() {
  createCanvas(400, 400);
}
function gotdata(data){
	console.log(data);
}
function draw() {
  background(220);
  
}
var data;
function preload(){
	data = loadJSON("bird.json");
}
function setup() {
  noCanvas();
  var birds = data.birds;
  
  for(let i = 0; i< birds.length;i++){
  	createElement('h1',birds[i].family);
    
    var members = birds[i].members;
    	for(let j =0;j<members.length;j++){
      	createDiv(members[j]);
      }
  	}
 
}
function draw() {
  background(220);
}var ff;
function preload(){
  ff = loadJSON("sunflower.json");
}
function setup() {
  createCanvas(400, 400);
  
}
function draw() {
  background(ff.red,ff.green,ff.blue);
  text(ff.name,30,30);
}var windowframe;
var redbg;
var windowclosed;
var dolls;
var dollseyes;
var happytwins;
function preload() {
  windowframe = loadImage('window2.png');
  redbg = loadImage('redbg.png');
  dolls = loadImage('dolls.png');
  dollseyes = loadImage('eyesofdolls.png');
  happytwins = loadImage('happytwins.png ');
  windowclosed = loadImage('closedwindow.jpg');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  image(redbg,0,0);
  
  
   image(dolls,0,0);
  let transeyes = [0,100,100,100,100,255]; 
  image(dollseyes,0,0,random(transeyes));
  
  
  
  
  
  fill(0,random(0,100));
  rect(0,0,windowWidth,windowHeight);
	
  
  background('#f9e59f');
  image(happytwins,0,0);
  
  
  image(windowframe, 0, -30);
  
  
	var millisecond1 = millis();
 if(millisecond1>5000){
 	image(windowclosed,0,0);
 
 }
  
  
}var windowframe;
var redbg;
var windowclosed;
var dolls;
var dollseyes;
var happytwins;
function preload() {
  windowframe = loadImage('window2.png');
  redbg = loadImage('redbg.png');
  dolls = loadImage('dolls.png');
  dollseyes = loadImage('eyesofdolls.png');
  happytwins = loadImage('happytwins.png ');
  windowclosed = loadImage('closedwindow.jpg');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  image(redbg,0,0);
  
  
   image(dolls,0,0);
  let transeyes = [0,100,100,100,100,255]; 
  image(dollseyes,0,0,random(transeyes));
  
  
  
  
  
  fill(0,random(0,100));
  rect(0,0,windowWidth,windowHeight);
	
  
  background('#f9e59f');
  image(happytwins,0,0);
  
  
  image(windowframe, 0, -30);
  
  
	var millisecond1 = millis();
 if(millisecond1>5000){
 	image(windowclosed,0,0);
 
 }
  
  
let correctkey = 1;
var keynumber = [1, 2, 3];
let lastData;
let hole;
var windowframe;
var redbg;
var windowclosed;
var dolls;
var dollseyes;
var happytwins;
let crownlaugh;
var crownLaughed = false;
let crying;
let i = 0;
let clown;
let clownY = 130;
let clownYminus = 5;
let happysong;
let happysonged = false;
let beginning;
let began = false;
let sign; 
let slogan;
function preload() {
  hole = loadImage('hole.png');
  windowframe = loadImage('window2.png');
  redbg = loadImage('redbg.png');
  dolls = loadImage('dolls.png');
  dollseyes = loadImage('eyesofdolls.png');
  happytwins = loadImage('happytwins.png ');
  windowclosed = loadImage('closedwindow.jpg');
  crownlaugh = loadSound('170331__siriuss22__yzlaugh3.ogg');
  crying = loadSound('crying twins.mp3');
  clown = loadImage('clowncut.png ');
  happysong = loadSound('happy song.mp3');
  beginning = loadSound('beginning_music.mp3');
  sign = loadImage('sign.png');
  slogan = loadImage('slogan.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
  image(redbg, 0, 0);
  image(dolls, 0, 0);
  let transeyes = [0, 100, 100, 100, 100, 255];
  image(dollseyes, 0, 0, random(transeyes));
  fill(0, random(0, 100));
  rect(0, 0, windowWidth, windowHeight);
  image(windowframe, 0, -30);
  if (latestData == 4) {
    correctkey = random(keynumber);
    crownLaughed = false;
    clownYminus = 5;
    clownY = 130;
    happysonged = false;
    i=0;
    
     if (!began) {
      beginning.setVolume(0.1);
      beginning.play();
      
      began = true;
      
    }
    
    console.log(buttoncount);
  }
  fill(255);
  textSize(30);
  if (latestData == correctkey) {
    image(windowclosed, 0, -30);
    i++;
    if (i > 80) {
      happyending();
      if (!happysonged) {
      happysong.setVolume(0.1);
      happysong.play();
      
      happysonged = true;
    }
      began = false;
    }
		
  } else if (latestData != correctkey && (latestData == 1 || latestData == 2 || latestData == 3)) {
    began = false;
    console.log(began);
    if (!crownLaughed) {
      crownlaugh.setVolume(0.05);
      crownlaugh.play();
      crying.setVolume(2.2);
      crying.play();
      crownLaughed = true;
    }
    image(redbg, 0, 0);
    
    clownY-=clownYminus;
    
    image(clown,0,clownY);
    
    
    if(clownY < -300){
    clownYminus = 0;
    
    }
    
    image(dolls, 0, 0);
    let transeyes = [0, 100, 100, 100, 100, 255];
    image(dollseyes, 0, 0, random(transeyes));
    fill(0, random(0, 100));
    rect(0, 0, windowWidth, windowHeight);
    image(windowframe, 0, -30);
    
    push();
    rotate(random(0.001));
		image(sign,0,0);
    fill('#fe9200');
    text(correctkey,1138,276);
    pop();
  }
}
function happyending() {
  image(slogan,0,-30);
  image(happytwins, 0, 0);
  image(windowframe, 0, -30);
}
#define SENSORPIN1 9
#define SENSORPIN2 5
#define SENSORPIN3 3
#define button 13
int sensorState1 = 0,lastState1 = 0;
int sensorState2 = 0,lastState2 = 0;
int sensorState3 = 0,lastState3 = 0;
int buttonState = 0, lastState_button =0;
void setup() {
pinMode(SENSORPIN1,INPUT);
digitalWrite(SENSORPIN1,HIGH);
pinMode(SENSORPIN2,INPUT);
digitalWrite(SENSORPIN2,HIGH);
pinMode(SENSORPIN3,INPUT);
digitalWrite(SENSORPIN3,HIGH);
pinMode(button,INPUT);
}
void loop() {
sensorState1 = digitalRead(SENSORPIN1);
sensorState2 = digitalRead(SENSORPIN2);
sensorState3 = digitalRead(SENSORPIN3);
buttonState = digitalRead(button);
 if (sensorState1 && !lastState1) {
  } 
  lastState1 = sensorState1;
 if (sensorState2 && !lastState2) {
  } 
  lastState2 = sensorState2;
 if (sensorState3 && !lastState3) {
  } 
   lastState3 = sensorState3;
if(buttonState && !lastState_button){
}
if(!buttonState && lastState_button){
}
lastState_button = buttonState;
  
 
}
let ding;
function preload() {
	ding= loadSound('415510__inspectorj__bell-counter-a.wav');
}
let balls = [];
let ballcolors = [0,'#AF5F3C'];
let ballcolor = 0;
let score = 0;
let laststate = false;
let thisstate = false;
function setup() {
  createCanvas(700, 500);
  
  for(let i = 0;i<xball.length;i++){
  balls[i] = new ball(xball[i]);
  }
  
}
function gotData() {
}
function draw() {
 background("#EFBB24");
  stroke('#CB4042');
  line(50,0,50,500);
	for(let j = 0; j<balls.length;j++){
    if(balls[j].online() && thisstate){
    	balls[j].c = '#AF5F3C';
      ding.setVolume(0.1);
  		ding.play();
      
    }
    else{
    }
    laststate = thisstate;
    console.log(laststate);
      
    balls[j].show();
    balls[j].move();
  }
	
}
class ball{
	constructor(x){
  	this.x = x;
    this.c = ballcolor;
  }
  
  show(){
    strokeWeight(4);
    stroke(255);
    fill(this.c);
  	ellipse(this.x,250,30,30);
  }
  
  move(){
  	this.x -= 3;
  }
  
  online(){
  	return(this.x >0 && this.x < 50);
  }
  
  
}
function THISSTATE(){
	if(latestData == 0){
  	thisstate =  true;
  }
  else{
  	thisstate = false;
  }
  
let txt;
let tokens = [];
let arrayx= [];
let textbeginx = 0;
let textbeginy = 0;
function preload(){
  
}
function setup() {
  
  
  createCanvas(400, 400);
  
  
  for(let i of txt){
  	tokens = concat(tokens,splitTokens(i));
  }
 
}
function draw() {
  background(220);
  
  
  
  textSize(20);
  textAlign(LEFT);
  
  
  arrayx.push(tokens);
  
  
  let x = 10;
  let y = 50;
  for(let i=0;i< tokens.length;i++){
  		
    	text(tokens[i],x,y);
    	x = x + textWidth(tokens[i])+textWidth('a');
    	if(x>width-50){
      	y+=textAscent(tokens[i]);
        x=10;
      }
    
    if(i==(tokens.length-1)){
      textbeginx = x;
      textbeginy = y;
    	
    }
    
    
  }
  text('X:'+mouseX,300,300);
  text('Y:'+mouseY,300,350);
 
 	
}let starty =300;
function setup() {
  createCanvas(300, 300);
}
function draw() {
  background(220);
  beginShape();
  endShape();
  starty--;
function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(function() {
    console.log("HELLO");
  }, 1000);
}
function gotData() {
}
function draw() {
 
}function preload() {
 thunder = loadSound('193170__netaj__thunder.wav');
	ding= loadSound('415510__inspectorj__bell-counter-a.wav');
}
let canvas1;
let thismoment;
let starty;
let up;
let bgopacity = 0;
let starword;
let p;
let inputname;
let buttonname;
let Dname;
function setup() {
  canvas1 = createCanvas(300, 300);
  canvas1.position(windowWidth/2-150,0);
  
  Dname = select("#name");
  
  inputname = createInput("the one you care");
  inputname.position(windowWidth/2-70,windowHeight-150);
  
  buttonname = createButton("Enter");
  buttonname.position(windowWidth/2-30,windowHeight-120);
  buttonname.mousePressed(showname);
  
  thismoment = select("#thismoment");
  thismoment.mouseClicked(momenthappen);
  thismoment.mouseOut(momentnothappen);
  
  up = select("#up");
  up.mouseWheel(starshow);
  
  starword = select("#star");
  
  p = selectAll("p");
}
function draw() {
  background(30,30,30,bgopacity);
  stroke(255);
  fill(255);
  beginShape();
  endShape();
  if(starty>=200){
  starty-=3;
  }
  
}
function momenthappen(){
	thismoment.style("text-decoration-line","underline line-through");
  thunder.setVolume(0.3);
  thunder.play();
  
  for(let i in p){
  p[i].style("color", "black");
  }
}
function momentnothappen(){
  thismoment.style("text-decoration-line","underline")
  for(let i in p){
  p[i].style("color", "white");
  }
}
function starshow(){
  starty = 300;
  bgopacity = 255;
  ding.setVolume(0.2);
  ding.play();
  starword.style("color","white");
  
}
function showname(){
	Dname.html(inputname.value());
  
}
function setup() {
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
  noCanvas();
}
function draw() {
  background(220);
}let sad;
let rainx ;
let rainy ;
function setup() {
  var canvas = createCanvas(200, 200);
  
  sad = select("#sad");
  sad.mouseOver(raining);
  canvas.position(200,0);
}
function draw() {
  background(220,0);
  ellipse(rainx,rainy,30,30);
  rainy++;
}
function raining(){
  fill('blue');
  rainx = 40;
  rainy = 40;
  sad.position(50,100);
  
}let balls = [];
function setup() {
  createCanvas(400, 400);
  for(let i=0;i<10;i++){
  	balls[i] = new ball(255);
  }
}	
function draw() {
  background(220);
  for(let j in balls){
  	balls[j].show();
    balls[j].fadeout();
  }
}
class ball{
	constructor(o){
    this.o = o;
  }
  
	show(){
  ellipse(200,200,30,30);
  }
  
  fadeout(){
  	fill(255,0,0,this.o);
    this.o -=3;
  }
  
}let redballs ;
let score =0;
let laststate = false;
let currentstate = false;
let j=0;
let obegin;
let oend;
function setup() {
  createCanvas(400, 400);
  
  redballs= new redball(255);
  
}
function draw() {
  background(220);
  
  obegin = random(0,100);
  oend = random(100,200);
  
  if(mouseIsPressed){
  	currentstate = true;
  }
  else{
  	currentstate = false;
  }
  
  redballs.fadeout();
  if(redballs.hit() && currentstate && !laststate){
    stroke('red');
    fill('red');
    score++; 
  }
  
  laststate = currentstate;
  redballs.show();
  
  
  noStroke();
  fill(100);
  text(score, 30,30);
}
  
class redball{
	constructor(o){
  	this.o = o;
  	}
  
  show(){
    
  	ellipse(200,200,50,50);
  }
  
  fadeout(){
    this.o -=3;
    noFill();
    if(this.o>obegin && this.o<oend){
    strokeWeight(10);
    stroke(0,0,255);
    }
    else if(this.o!=0){
    noStroke();
    }
    else if(this.o==0){
    this.o = 255;
    }
  	
  }
  
  hit(){
    return(this.o>obegin && this.o<oend);
  }
  
}
let redballs ;
let score =0;
let laststate = false;
let currentstate = false;
let j=0;
function setup() {
  createCanvas(400, 400);
  
  redballs= new redball(255);
  
}
function draw() {
  background(220);
  
  if(mouseIsPressed){
  	currentstate = true;
  }
  else{
  	currentstate = false;
  }
  
  redballs.fadeout();
  if(redballs.hit() && currentstate && !laststate){
    stroke('red');
    fill('red');
    score++; 
  }
  
  laststate = currentstate;
  redballs.show();
  
  
  noStroke();
  fill(100);
  text(score, 30,30);
}
  
class redball{
	constructor(o){
  	this.o = o;
  	}
  
  show(){
    
  	ellipse(200,200,50,50);
  }
  
  fadeout(){
    this.o -=3;
    noFill();
    if(this.o>100 && this.o<200){
    strokeWeight(10);
    stroke(0,0,255);
    }
    else if(this.o!=0){
    noStroke();
    }
    else if(this.o==0){
    this.o = 255;
    }
  	
  }
  
  hit(){
    return(this.o>100 && this.o<200);
  }
  
}
let blueballs = [];
let i=0;
let bluecount=0;
let score = 0;
function setup() {
  createCanvas(400, 400);
  for(i=0;i<30;i++){
  blueballs[i] = new blueball(30); 
  }
 frameRate(30);
}
function draw() {
  background(220);
  text(score,30,30);
 
  
 	blueballs[0].show();
  blueballs[0].expand();
  if(blueballs[0].normaldisappear() && blueballs.length>1){
  	blueballs.splice(0,1);
  }
}
class blueball{
	constructor(c){
  	this.x = random(180,220);
    this.y = random(180,240);
    this.c = c;
  }
  
  show(){
    fill('blue');
  	ellipse(this.x,this.y,this.c,this.c);
  }
  
  expand(){
  	if(this.c<500){
    this.c +=4;
    }
  }
  
  normaldisappear(){
  	if(this.c>100){
    	return(this.c>100);	
    }
  }
  
  donotexpand(){
    this.c = 400;
  }
}
function keyPressed(){
  for(let ball in blueballs){
  if(blueballs.length>1 && key == 'a' ){
  
  score++;
  }
  }
}
let blueballs = [];
let i;
function setup() {
  createCanvas(400, 400);
  for(i=0;i<100;i++){
  blueballs[i] = new blueball; 
  }
}
function draw() {
  background(220);
  for(i=0;i<blueballs.length;i++){
  	blueballs[i].show();
  }
}
class blueball{
	constructor(){
  }
  
  show(){
    fill('blue');
  	ellipse(random(180,220),random(180,240),30,30);
  }
Introduction to Physical Computing
ITP
This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3
function setup() {
  
  
  capture =createCapture(VIDEO);
  capture.size(320,240);
}
function draw() {
  var pixelColor = get(mouseX,mouseY);
  var ourBrightness = brightness(pixelColor);
  
}
  for (var i = 0; i < portList.length; i++) {
  }
}
}
void setup() {
}
void loop() {
  }
}
function setup() {
  createCanvas(600, 600);
  setInterval(function() {
    console.log("HELLO");
  }, 1000);
  
	noFill();
  strokeWeight(10);
  
}
function gotData() {
}
function draw() {
 	background(150, 0, 20);
  var v = map(latestData,50,250,600,height/2);
	ellipse(250,270,40,40);
  line(230,320,v-30,v-40);
  line(230,380,230,270);
  ellipse(width/2,v,30,30);
  line(230,380,200,450);
  line(230,380,260,450);
  
function setup() {
  createCanvas(600, 600);
  setInterval(function() {
    console.log("HELLO");
  }, 1000);
  
	noFill();
  strokeWeight(10);
  
}
function gotData() {
}
function draw() {
 	background(127, 0, 127);
  var v = map(latestData,50,250,600,0);
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
  
}var canvas;
var button;
var bgcolor;
var slider;
function setup() {
  canvas = createCanvas(400, 400);
  bgcolor = color(0);
  canvas.position(50,50);
  button = createButton('change color');
  button.mousePressed(changecolor);
  slider = createSlider(0,40,0);
}
function draw() {
  background(20,140,bgcolor);
    for ( let i=0;i<slider.value();i++){
      for (let j = 0;j<slider.value();j++){
    	fill(240);
  		ellipse(5+i*10,5+j*10,10,10);
      }
  }
}
function changecolor(){
	bgcolor = random(255);
}let Balls = [];
function setup() {
  createCanvas(400, 400);
  for(i=0;i<100;i++){
  	Balls[i] = new ball(random(width),random(height));
  }
}
function draw() {
  background(220);
  for(let b=0;b<Balls.length;b++){
  Balls[b].run();
  }
  
  for(i=0;i<Balls.length;i++){
    for(let j = i+1;j<Balls.length;j++){
  		if(Balls[i].cover(Balls[j])){
      Balls.splice(j,1);
      Balls.splice(i,1);
      }
    }
  }
  
}
let Balls = [];
function setup() {
  createCanvas(400, 400);
  for(i=0;i<100;i++){
  	Balls[i] = new ball(random(width),random(height));
  }
}
function draw() {
  background(220);
  for(let b=0;b<Balls.length;b++){
  Balls[b].run();
    
  if(Balls[b].cover(mouseX,mouseY)){
      Balls.splice(b,1);}
  }
  
}
let Balls = [];
function setup() {
  createCanvas(400, 400);
}
function mouseClicked(){
  let Ball = new ball(mouseX,mouseY);
  Balls.push(Ball);
}
function draw() {
  background(220);
  for(let b=0;b<Balls.length;b++){
  Balls[b].run();
  }
}
let input1;
let input2;
let sum;
function setup() {
  input1 = createInput();
  input1.position(50,200);
  input1.changed(returnsum);
  input2 = createInput();
  input2.position(210,200);
  input2.input(returnsum);
  
  let plus = createP('+');
  plus.position(190,182);
  
  let equal = createP('=');
  equal.position(350,182);
  
  sum = createP('sum');
  sum.position(370,182);
  
  
}
function draw() {
  
}
function add(num1,num2){
	return float(num1)+float(num2);
}
function returnsum(){
 sum.html(add(input1.value(),input2.value()));
}let ball = [];
function setup() {
  createCanvas(1440, 686);
  for (let i = 0; i < 100; i++) {
    ball[i] = new Ball(random(width), random(height), random(5), random(5), random(10, 50));
  }
}
function draw() {
  background(0);
  rectMode(CENTER);
  fill(255);
  rect(width / 2, height / 2, width - 20, height - 20);
  for (let q = 0; q < 100; q++) {
    ball[q].bounce();
    ball[q].show();
    
  }
  
  for(q=0;q<100;q++){
  	for(let p =0;p<100;p++){
    	if(ball[q].light(ball[p])&& q!=p){
        ball[q].colorful();
       	ball[q].show();
      }
    }
  }
  
  
  
}
class Ball {
  constructor(x, y, x1, y1, size) {
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.size = size;
  }
  bounce() {
    this.x += this.x1;
    this.y += this.y1;
    if (this.x >= width || this.x < 0) {
      this.x1 = -this.x1;
    }
    if (this.y >= height || this.y < 0) {
      this.y1 = -this.y1;
    }
  }
  show() {
    fill(20, 20, this.c);
    ellipse(this.x, this.y, this.size, this.size);
  }
  light(other) {
    return (dist(this.x, this.y, other.x, other.y) <= (this.size / 2 + other.size/2));
    
  }
  
  colorful(){
  	let colorcontent = ['#BBD239', '#39D2C9', '#F39C12', '#D25539', '#EFEF1F'];
    fill(random(colorcontent));
  }
  
}let Mbackground = [];
let speedx = 4;
let speedy = 4;
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    Mbackground[i] = new mbackground(random(width / 2), random(height / 2), 0, 100, 100);
  }
}
function draw() {
  background(220);
  for (i = 0; i < 100; i++) {
    Mbackground[i].show();
    Mbackground[i].move();
    Mbackground[i].bounce();
  }
  for (let p = 0; p < 100; p++) {
    for (let j = 0; j < 100; j++) {
      if (Mbackground[p].insert(Mbackground[j])) {
        Mbackground[p].lightup();
        Mbackground[j].lightup();
      }
    }
  }
}
class mbackground {
  constructor(x, y, c, lengthx, lengthy) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.lx = lengthx;
    this.ly = lengthy;
  }
  show() {
    stroke(this.c);
    line(this.x, this.y, this.x + this.lx, this.y + this.ly);
  }
  move() {
    this.x += speedx;
    this.y += speedy;
  }
  bounce() {
    if (this.y + this.ly >= height || this.y + this.ly <= 0) {
      speedy = -speedy;
      this.x = 2 * this.lx + this.x;
      this.lx = -this.lx;
    }
    if (this.x + this.lx >= width || this.x + this.lx <= 0) {
      speedx = -speedx;
      this.y = this.y + 2 * this.ly;
      this.ly = -this.ly;
    }
  }
  insert(other) {
    return ((this.lx / this.ly) != (other.lx / other.ly));
  }
  lightup() {
    this.c = 'red';
  }
let foodcontent = ['蛋 鱼', '粉 肠', '面 仔 公', '球 肉 牛', '仔 蛋 鸡'];
let colorcontent = ['#BBD239', '#39D2C9', '#F39C12', '#D25539', '#EFEF1F'];
let NEONTEXT = [];
let ball = [];
function preload() {
  NeonFont = loadFont('TpldKhangXiDictTrial.otf');
  foodsound[0] = loadSound('fish.mp3');
  foodsound[1] = loadSound('changfen.mp3');
  foodsound[2] = loadSound('gzm.mp3');
  foodsound[3] = loadSound('beef.mp3');
  foodsound[4] = loadSound('egg.mp3');
}
function setup() {
  createCanvas(1440, 686);
  rectMode(CENTER);
  for (let i = 0; i < 150; i++) {
    ball[i] = new Ball(random(width), random(height), random(5), random(5), random(5, 30));
  }
  
  for (let food = 0; food < foodcontent.length; food++) {
    NEONTEXT[food] = new neontext(100, 150 + food * 100, foodcontent[food], colorcontent[food]);
  }
  neon = new Neon(defaultneon);
}
function draw() {
	fill(0);
  background(0);
  for (let q = 0; q < 150; q++) {
    ball[q].bounce();
    ball[q].show();
  }
  
   for(q=0;q<150;q++){
  	for(let p =0;p<150;p++){
    	if(ball[q].light(ball[p])&& q!=p){
        ball[q].colorful();
       	ball[q].show();
      }
    }
  }
  
  cover();
  instruction();
  
	button();
  
  neon.show();
  neon.flash();
  for (let t = 0; t < NEONTEXT.length; t++) {
    if (NEONTEXT[t].inrect()) {
      NEONTEXT[t].returncolor();
      soundnumber = t;
    }
    NEONTEXT[t].drag();
    NEONTEXT[t].show();
		
  }
}let ball= [];
let i;
function setup() {
  createCanvas(400, 400);
  for(i = 0;i<100;i++){
  ball[i] = new Ball(random(width),random(height),random(30),random(-1,1),random(-3,3));
  }
}
function draw() {
  background(220);
  
  for(let b in ball){
  ball[b].run();
  
    for(let other in ball){
    	if(ball[other].isNear(b.x,b.y)){
    	ball.splice(other,1);}
    }
  
    
    
    
    
  
    
  }
  
  	
}
class Ball{
	constructor(x,y,size,speedx, speedy){
  	this.x = x;
    this.y = y;
    this.r = size;
    this.xs = speedx;
    this.ys = speedy;
  }
  
  run(){
  	this.show();
    this.move();
    this.bounce();
  }
  
  show(){
  	ellipse(this.x,this.y,this.r);
  }
  
  move(){
  	this.x += this.xs;
    this.y += this.ys;
  }
  
  bounce(){
  	if( this.x > width || this.x<0 ){
    	this.xs = this.xs * -1;
    }
    if ( this.y > height || this.y < 0){
      this.ys = this.ys * -1;
    }
   
  }
  
  isNear(mx,my){
    if(dist(mx,my,this.x,this.y)<25){
    	return true;
    }
    else{
    	return false;
    }
  }	
}let col = 10;
let row = 5;
let gx;
let gy;
function setup() {
  createCanvas(400, 400);
  gx = width/col;
  gy = height/ row;
}
function draw() {
  background(220);
  for(let i = 0;i<=col;i++){
  	for(j = 0; j<=row;j++){
      if(mouseX>i*gx && (mouseX<i*gx+gx) && mouseY>j*gy && mouseY < (j*gy+gy)){
      fill(i*20+j*10);
      }
      else{
      noFill();
      }
    	rect(i*gx,j*gy,gx,gy);
    }
  }
}let neon;
let colorSet = ['#4f7df6', '#374054','#4f7df6','#fdbde0'];
function setup() {
  createCanvas(600, 500);
}
function draw() {
  background(0);
  neon = new Neon();
  neon.show();
  neon.flash();
}
class Neon {
  constructor(neonX, neonY, neonW, neonH) {
    this.x = neonX;
    this.y = neonY;
    this.w = neonW;
    this.h = neonH;
  }
  show() {
    rectMode(CENTER);
    stroke(colorSet[0]);
    strokeWeight(3);
    fill(0);
    rect(width / 2, height / 2, width - 170, height - 280);
  }
  flash() {
    rectMode(CENTER);
    strokeWeight(2);
    stroke(colorSet[1]);
    for (var i = width / 2 - (width - 180) / 2; i < width / 2 + (width - 170) / 2; i += 6) {
      
        stroke(colorSet[3]);}
    	else{
        stroke(colorSet[1]);}
      
        line(i, height / 2 - (height - 286) / 2, i, height / 2 + (height - 284) / 2);
      
    }
  }
}let neon;
let colorSet = ['#4f7df6', '#374054','#4f7df6','#fdbde0'];
function setup() {
  createCanvas(600, 500);
}
function draw() {
  background(0);
  neon = new Neon();
  neon.show();
  neon.flash();
}
class Neon {
  constructor(neonX, neonY, neonW, neonH) {
    this.x = neonX;
    this.y = neonY;
    this.w = neonW;
    this.h = neonH;
  }
  show() {
    rectMode(CENTER);
    stroke(colorSet[0]);
    strokeWeight(3);
    fill(0);
    rect(width / 2, height / 2, width - 170, height - 280);
  }
  flash() {
    rectMode(CENTER);
    strokeWeight(2);
    stroke(colorSet[1]);
    for (var i = width / 2 - (width - 180) / 2; i < width / 2 + (width - 170) / 2; i += 6) {
      var x = i;
      line(x, height / 2 - (height - 286) / 2, x, height / 2 + (height - 284) / 2);
        fill(colorSet[2]);
        line(x, height / 2 - (height - 286) / 2, x, height / 2 + (height - 284) / 2);
      }
    }
  }
}let a;
let b;
let w = false;
function setup() {
  createCanvas(400, 400);
	a =  random(0,width);
	b =  random(0,height);
}
function draw() {
  background(220);
  if(w){
  fill(120);}
  else{
  fill(0);
  }
  drag();
  text('大大大哲',a,b);
}
function drag(){
	if(mouseIsPressed && dist(mouseX,mouseY,a,b)<40){
    w = true;
  	a = mouseX;
    b = mouseY;
  }
  else{
  	w = false;
  }
}var NeonFont;
function preload() {
  NeonFont = loadFont('TpldKhangXiDictTrial.otf');
}
let foodcontent = ['鱼蛋','肠粉','公仔面','牛肉球','鸡蛋仔'];
let colorcontent = ['#BBD239','#39D2C9','#F39C12','#D25539','#EFEF1F'];
let NEONTEXT = [];
function setup() {
  createCanvas(600, 500);
  for(let food = 0;food<foodcontent.length;food++){
  	NEONTEXT[food] = new neontext(100+food*80,50,foodcontent[food],colorcontent[food]);
  }
  
}
function draw() {
  background(0);
  rectMode(CENTER);
  fill(20);
  rect(width/2,height/2,width-170,height-220);
  for(let t of NEONTEXT){
    t.show();
    
  }
}
function mouseClicked(){
	for(let c of NEONTEXT){
    if(c.cover(mouseX,mouseY)){
    }
    	c.changecolor();
  }
  
}
class neontext{
  constructor(neontx,neonty,neontt,neontc){
  	this.x = neontx;
    this.y = neonty;
    this.t = neontt;
    this.c = neontc;
  }
  
  
  show(){
    fill(255);
    ellipse(this.x,this.y,10,10);
    fill(this.c);
    textSize(30);
    textFont(NeonFont);
    text(this.t,this.x,this.y);
    }
  
  cover(cx,cy){
    if(cx>this.x && cx <this.x+10 && cy<this.y && cy>this.y-10){
    	return true;
    }
    else{
    	return false;
    }
  }
  
  changecolor(){
  	fill(20);
  }
let NeonFont;
let neon;
let foodsound = [];
let playsound = false;
let soundnumber;
let BUTTON;
let defualtB = '#374054';
let foodcontent = ['蛋 鱼', '粉 肠', '面 仔 公', '球 肉 牛', '仔 蛋 鸡'];
let colorcontent = ['#BBD239', '#39D2C9', '#F39C12', '#D25539', '#EFEF1F'];
let NEONTEXT = [];
let colorblink = false;
let defaultneon = '#374054';
function preload() {
  NeonFont = loadFont('TpldKhangXiDictTrial.otf');
  foodsound[0] = loadSound('fish.mp3');
  foodsound[1] = loadSound('changfen.mp3');
  foodsound[2] = loadSound('gzm.mp3');
  foodsound[3] = loadSound('beef.mp3');
  foodsound[4] = loadSound('egg.mp3');
}
function setup() {
  
  createCanvas(1440, 686);
  
  for (let food = 0; food < foodcontent.length; food++) {
    NEONTEXT[food] = new neontext(100, 150+food*100, foodcontent[food], colorcontent[food]);
  }
  
	neon = new Neon(defaultneon);
  
}
function mouseClicked(){
    if(dist(mouseX,mouseY,width/2,height/2+150)<40){
    	foodsound[soundnumber].setVolume(0.1);
  		foodsound[soundnumber].play();
    	defualtB = colorcontent[soundnumber];
  }
  }
function draw() {
  background(0);
  rectMode(CENTER);
  
  button();
  
 	neon.show();
  neon.flash();
  
  for (let t=0;t<NEONTEXT.length;t++) {
    if(NEONTEXT[t].inrect()){
      var cneon = [NEONTEXT[t].returncolor(),'#374054']
      defaultneon = random(cneon);
      soundnumber = t;
    }
    NEONTEXT[t].drag();
    NEONTEXT[t].show();
    
    instruction();
  }
  
}let ball=[];
let cantonese = ['做乜','唔该'];
var cantonesenumber = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function mouseDragged(){
	let r = random(0,140);
  let b = new Ball(mouseX,mouseY,5,15,r,r/2);
  ball.push(b);
}
function draw() {
  background(0);
  rectMode(CENTER);
  fill(255);
  rect(width/2,height/2,width-20,height-20);
  for(var i of ball){
    i.show();
    i.bounce();
  }
}
class Ball {
  constructor(x,y,x1,y1,c,size){
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.c = c;
    this.size = size;
  }
  
  bounce(){
    this.x+=this.x1;
    this.y+=this.y1;
    if(this.x>=width || this.x<0){
      this.x1 = - this.x1;
    }
    if(this.y>=height || this.y<0){
      this.y1= - this.y1;
    }
  }
  
  show(){
    fill(20,20,this.c);
    textSize(this.size);
    cantonesenumber++;
    if(cantonesenumber==cantonese.length){
      cantonesenumber = 0;
    }
    text(cantonese[cantonesenumber],this.x,this.y);
  }
  
}let ball=[];
let cantonese = ['做乜','唔该'];
var cantonesenumber = 0;
function setup() {
  createCanvas(400, 400);
}
function mouseDragged(){
	let r = random(0,40);
  let b = new Ball(mouseX,mouseY,1,12,r,r*2);
  ball.push(b);
  
}
function draw() {
  background(0);
  rectMode(CENTER);
  fill(255);
  rect(width/2,height/2,width-20,height-20);
  for(var i = 0;i< ball.length;i+=4){
    ball[i].show();
    ball[i].bounce();
  }
  if(ball.length>10){
   ball.splice(0,1); 
    
  }
}
class Ball {
  constructor(x,y,x1,y1,c,size){
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.c = c;
    this.size = size;
  }
  
  bounce(){
    this.x+=this.x1;
    this.y+=this.y1;
    if(this.x>=width || this.x<0){
      this.x1 = - this.x1;
    }
    if(this.y>=height || this.y<0){
      this.y1= - this.y1;
    }
  }
  
   clicked(px,py){
    let d = dist(px,py,this.x,this.y);
    if(d < this.size/2){
    	this.x = px;
      this.y = py;
      this.c = 34;
    }
  
  }
  
  
  show(){
    fill(20,20,this.c);
    textSize(this.size);
    cantonesenumber++;
    if(cantonesenumber==cantonese.length){
      cantonesenumber = 0;
    }
    text(cantonese[cantonesenumber],this.x,this.y);
  }
  
}let ball=[];
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function mouseDragged(){
	let r = random(0,40);
  let b = new Ball(mouseX,mouseY,10,20,r,r*2);
  ball.push(b);
}
function draw() {
  background(0);
  rectMode(CENTER);
  fill(255);
  rect(width/2,height/2,width-20,height-20);
  for(var i of ball){
    i.show();
    i.bounce();
  }
}
class Ball {
  constructor(x,y,x1,y1,c,size){
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.c = c;
    this.size = size;
  }
  
  bounce(){
    this.x+=this.x1;
    this.y+=this.y1;
    if(this.x>=width || this.x<0){
      this.x1 = - this.x1;
    }
    if(this.y>=height || this.y<0){
      this.y1= - this.y1;
    }
  }
  
  show(){
    fill(20,20,this.c);
    ellipse(this.x,this.y,this.size,this.size);
  }
  
}let ball1;
let ball2;
var colorbox = ['#1ABC9C','#8E44AD','#F39C12','#9B59B6'];
let colorNumber = 0;
function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke();
  rectMode(CENTER);
  fill(255);
  rect(width/2,height/2,width-20,height-20);
  ball1 = new Ball(130,290,15,5,20);
  ball2 = new Ball(30,180,20,5,100);
}
function draw() {
  ball1.bounce();
  ball1.show();
  ball2.bounce();
  ball2.show();
}
class Ball {
  constructor(x,y,x1,y1,size){
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.size = size;
  }
  
  bounce(){
    this.x+=this.x1;
    this.y+=this.y1;
    if(this.x>=width || this.x<0){
      this.x1 = - this.x1;
    }
    if(this.y>=height || this.y<0){
      this.y1= - this.y1;
    }
  }
  
  show(){
    fill(colorbox[colorNumber]);
    colorNumber++;
    if(colorNumber == colorbox.length){
    	colorNumber = 0;
    }
    ellipse(this.x,this.y,this.size,this.size);
  }
  
}var colorr = [120,78,20];
var colorNumber = 0;
function setup() {
  createCanvas(400, 400);
  background(220);
}
function draw() {
  noStroke();
  if(mouseIsPressed){
	fill(20,120,colorr[colorNumber],40);
	ellipse(mouseX,mouseY,20,20);
  }
}
function mousePressed(){
	colorNumber++;
  if(colorNumber == colorr.length){
    colorNumber = 0;}
}
let ball1;
let ball2;
function setup() {
  createCanvas(400, 400);
  ball1 = new Ball(30,140,10,10,134,20);
  ball2 = new Ball(130,40,20,5,4,100);
}
function draw() {
  background(0);
  rectMode(CENTER);
  fill(255);
  rect(width/2,height/2,width-20,height-20);
  ball1.bounce();
  ball1.show();
  ball2.bounce();
  ball2.show();
}
class Ball {
  constructor(x,y,x1,y1,c,size){
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.c = c;
    this.size = size;
  }
  
  bounce(){
    this.x+=this.x1;
    this.y+=this.y1;
    if(this.x>=width || this.x<0){
      this.x1 = - this.x1;
    }
    if(this.y>=height || this.y<0){
      this.y1= - this.y1;
    }
  }
  
  show(){
    fill(20,20,this.c);
    ellipse(this.x,this.y,this.size,this.size);
  }
  
}let ball1;
function setup() {
  createCanvas(400, 400);
  ball1 = new Ball();
}
function draw() {
  background(0);
  rectMode(CENTER);
  fill(255);
  rect(width/2,height/2,width-20,height-20);
  ball1.bounce();
  ball1.show();
}
class Ball {
  constructor(x,y,x1,y1){
    this.x = random(0,width);
    this.y = random(0,height);
    this.x1 = 10;
    this.y1 = 10;
  }
  
  bounce(){
    this.x+=this.x1;
    this.y+=this.y1;
    if(this.x>=width || this.x<0){
      this.x1 = - this.x1;
    }
    if(this.y>=height || this.y<0){
      this.y1= - this.y1;
    }
  }
  
  show(){
    fill(0);
    ellipse(this.x,this.y,20,20);
  }
  
}var numCols;
var numRows;
var colW;
var colH;
function setup() {
  createCanvas(400, 400);
  noStroke();
  numCols = 20;
  numRows = 20;
  colW = width/numCols;
  colH = height/numRows;
  colorMode(HSL);
  
}
function draw() {
  background(220);
  for (var col = 0; col < numCols; col++) {
    for (var row = 0; row < numRows; row++) {
      if ((col + row) % 2 == 0) {
        fill('black');
      } else {
        fill('white');
      }
      let x = col * colW;
      let y = row * colH;
      let d = dist(mouseX,mouseY,x,y);
      let trued = map(d,0,dist(0,0,width,height),80,50);
      fill(43,90,trued);
      rect(x, y, colW, colH);
    }
  }
}var moonSize = 68;
var col = 3;
var row = 4;
var mouseClicked;
let circlex = 60;
let circley = 60;
function absolute(lol) {
  if (circlex - lol > 0) {
    return (circlex - lol);
  } else {
    return (-(circlex - lol));
  }
}
function setup() {
  createCanvas(430, 550);
  noStroke();
  mouseClicked = false;
}
function draw() {
  
  background(61, 241, 216);
  fill("#1C1B2F");
  rect(10, 10, width - 20, height - 20);
  for (j = 0; j < row; j++) {
    for (i = 0; i < col; i++) {
      var x = i * 108;
      var y = j * 108;
      push();
      translate(x, y);
      if (j == row - 1 && i == col - 1) {
        drawMoon(mouseX / 113 + i / 1.05 + j / 1.09, true);
      } else {
        drawMoon(mouseX / 113 + i / 1.05 + j / 1.09, false);
      }
      pop();
    }
  }
  if (mouseClicked) {
    background(0);
    
  push();
    translate(5, 20);
    
  for (w = 50; w < 400; w += 100) {
    for (var e = 50; e < 500; e += 80) {
      stroke(55, e - 20, e + 50);
      noFill();
      if (mouseX < w && mouseX > (w - 50)) {
        var lineme = map(mouseX, w - 50, w, 0, 2.1 * PI);
        arc(w, e, random(50, 80), 50, 0, lineme, CHORD);
      } else if (mouseX < w + 50 && mouseX > w) {
        var a = map(mouseX, w, 50 + w, 2 * PI, 0);
        arc(w, e, random(20), 50, 0, lineme, CHORD);
      }
    }
  }
  fill(0);
  for (circlex = 60; circlex < width - 0; circlex += 90) {
    for (circley = 60; circley < height - 200; circley += 80) {
      if (mouseX > (circlex - 60) && mouseX < circlex) {
        var shadowx = map(absolute(mouseX), 60, 0, circlex, circlex - 45);
        ellipse(shadowx, circley, 50, 50);
      }
      if (mouseX < (circlex + 60) && mouseX > circlex) {
        var shadowx = map(absolute(mouseX), 60, 0, circlex, circlex + 45);
        ellipse(shadowx, circley, 50, 50);
      }
    }
  }
  fill(0);
  beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(0, height);
  for (countcx = 40; countcx < width - 20; countcx += 90) {
    for (countcy = 40; countcy < height - 200; countcy += 80) {
      beginContour();
      noStroke();
      vertex(countcx, q + countcy);
      vertex(countcx,countcy + widthc - q);
      vertex(countcx + q, countcy + widthc);
      vertex(countcx + widthc - q, countcy + widthc);
      vertex(countcx + widthc, countcy + widthc - q);
      vertex(countcx + widthc, q + countcy);
      vertex(countcx + widthc - q, countcy);
      vertex(q + countcx, countcy);
      endContour();
    }
  }
  endShape(CLOSE);
	pop();
  fill(61, 241, 216);
  rect(0, 0, width, 10);
  rect(0, 0, 10, height);
  rect(0, height - 10, width, 10);
  rect(width - 10, 0, 10, height);   
    
  fill(61, 241, 216);
  textSize(10);
  textStyle(ITALIC);
  text('HAPPY MID-AUTUMN DAY！', width * 0.62, 520);  
    
    
    
    
  } else {
    fill(61, 241, 216);
    textSize(10);
    textStyle(ITALIC);
    text('CLICK THE FULL MOON', width * 0.62, 520);
  }
}
function drawMoon(phase, glitch) {
  var t = (phase % 1);
  
  translate(108, 108);
  if (t < 0.5) {
      var r = map(t, 0, 0.25, moonSize, 0);
      if (glitch) {
        fill(61, random(150, 241), 216);
      } else {
        fill('#66ffff');
      }
      arc(0, 0, moonSize, moonSize, PI / 2, PI * 1.5);
      fill("#1C1B2F");
      arc(0, 0, r, moonSize, PI / 2, PI * 1.5);
      var r = map(t, 0.25, 0.5, 0, moonSize);
      if (glitch) {
        fill(61, random(150, 241), 216);
      } else {
        fill('#66ffff');
      }
      arc(0, 0, r, moonSize, -PI / 2, PI / 2);
      arc(0, 0, moonSize, moonSize, PI / 2, PI * 1.5);
    }
    if (t < 0.75) {
      var r = map(t, 0.5, 0.75, moonSize, 0);
      fill("#1C1B2F");
      arc(0, 0, moonSize, moonSize, PI / 2, PI * 1.5);
      if (glitch) {
        if (dist(mouseX, mouseY, 323, 430)>20){
        fill(61, random(150, 241), 216);
        }
        else{
        fill(254,244,169);
        }
        
      } else {
        fill('#66ffff');
      }
      arc(0, 0, moonSize, moonSize, -PI / 2, PI / 2);
      arc(0, 0, r, moonSize, PI / 2,  PI * 1.5);
      var r = map(t, 0.75, 1, 0, moonSize);
      if (glitch) {
        fill(61, random(150, 241), 216);
      } else {
        fill('#66ffff');
      }
      arc(0, 0, moonSize, moonSize, -PI / 2, PI / 2);
      fill("#1C1B2F");
      arc(0, 0, r, moonSize, -PI / 2, PI / 2);
    }
  }
}
function mousePressed() {
  var d = dist(mouseX, mouseY, 323, 430);
  if (d < 20) {
    mouseClicked = true;
  } else {
    mouseClicked = false;
  }
let circlex = 60;
let circley = 60;
let button = true;
function absolute(lol) {
  if (circlex - lol > 0) {
    return (circlex - lol);
  } else {
    return (-(circlex - lol));
  }
}
function setup() {
  createCanvas(400, 550);
  pixelDensity();
  background(0);
}
function draw() {
  translate(5, 20);
  for (w = 50; w < 400; w += 100) {
    for (var e = 50; e < 500; e += 80) {
      stroke(55, e - 20, e + 50);
      noFill();
      if (mouseX < w && mouseX > (w - 50)) {
        var lineme = map(mouseX, w - 50, w, 0, 2.1 * PI);
        arc(w, e, random(50, 80), 50, 0, lineme, CHORD);
      } else if (mouseX < w + 50 && mouseX > w) {
        var a = map(mouseX, w, 50 + w, 2 * PI, 0);
        arc(w, e, random(20), 50, 0, lineme, CHORD);
      }
    }
  }
  if(button){
  fill(0);}
  else {
  noFill();}
  
  for (circlex = 60; circlex < width - 0; circlex += 90) {
    for (circley = 60; circley < height - 200; circley += 80) {
      if (mouseX > (circlex - 60) && mouseX < circlex) {
        var shadowx = map(absolute(mouseX), 60, 0, circlex, circlex - 45);
        ellipse(shadowx, circley, 50, 50);
      }
      if (mouseX < (circlex + 60) && mouseX > circlex) {
        var shadowx = map(absolute(mouseX), 60, 0, circlex, circlex + 45);
        ellipse(shadowx, circley, 50, 50);
      }
    }
  }
  fill(0);
  beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(0, height);
  for (countcx = 40; countcx < width - 20; countcx += 90) {
    for (countcy = 40; countcy < height - 200; countcy += 80) {
      beginContour();
      noStroke();
      vertex(countcx, q + countcy);
      vertex(countcx,countcy + widthc - q);
      vertex(countcx + q, countcy + widthc);
      vertex(countcx + widthc - q, countcy + widthc);
      vertex(countcx + widthc, countcy + widthc - q);
      vertex(countcx + widthc, q + countcy);
      vertex(countcx + widthc - q, countcy);
      vertex(q + countcx, countcy);
      endContour();
    }
  }
  endShape(CLOSE);
  fill(61, 241, 216);
  rect(-5, -20, width, 10);
  rect(-5, -20, 10, height);
  rect(-5, height - 30, width, 10);
  rect(width - 15, -20, 10, height);
  if (mouseX > 150 && mouseX < 330) {
    if(mouseX<250 && mouseY>460 && mouseY<475){
    fill(161, random(200, 241), 66);}
    else{
      fill(61, 200, 216);}
    textSize(10);
    textStyle(ITALIC);
    if(button){
    text('HI, MY FULL MOON', 150, 450);}
    else{
    text('BYE, MY FULL MOON', 150, 450);}
  }
}
function mousePressed(){
  if(mouseX>150 && mouseX<250 && mouseY>460 && mouseY<475){
  button = !button;
  }
}
let r = 50;
function setup() {
  createCanvas(420, 600);	
  background(20);
}
function draw() {
  for (var i = 50; i < 400; i += 80) {
    for (var j = 50; j < 500; j += 80) {
      stroke(55,j-20,j+50);
      noFill();
      if (mouseX < i && mouseX > (i - r)) {
        var a = map(mouseX, i - r, i, 0, 2.1 * PI);
        arc(i, j, random(50,80), 50, 0, a, CHORD);
      } 
      
      else if (mouseX < i + r && mouseX > i) {
        var a = map(mouseX, i, r + i, 2 * PI, 0);
        arc(i, j, random(20), 50, 0, a, CHORD);
      }
    }
  }
}var img;
function preload() {
  img = loadImage('/Users/nianqi/Documents/08 itp/icm/w3/.image/14ce36d3d539b60001a42e91e550352ac65cb7a9.jpg');
}
var i = 0;
var j = 0;
var dot = 0;
function setup() {
  image(img, 0, 0);
}
function draw(){
for(i=0;i<100;i++){
  	for(j=0;j<100;j++){
  		var fullColor = img.get(i, j);
  		var l = lightness(fullColor);
  		if (l>50){
  			dot = 255;
  		}
  		else{
  			dot = 0;
  		}
  		fill(dot);
  		ellipse(i,j,1,1);
	}
 }
}
var img;
let i = 0;
let j = 0;
function preload() {
}
function setup() {
  createCanvas(400,400);
  colorMode(HSL);
}
function draw(){
  var a = map(mouseX,0,width,0,10);
  for(i=0;i<400;i=i+10){
    for(j=0;j<400;j+=10){
  		var c = img.get(i, j);
  		var bulb = lightness(c);
  		fill(bulb);
  		noStroke();
  		rect(i,j,a,a);
    }
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  for (var i = width/10;i<=width;i+=(width/10)){
    line(i,0,i,height);
    line(0,i,width,i);
  }
}var c = 0; 
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  for(var i = 0; i<10; i++){
    if(mouseX > (width/10*i) && mouseX < (width/10 * (i+1)) ){
      	fill(150,130,25*i);  
      	rect(width/10*i,0,width/10,height);  
    }
  }
}
  
    
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  for(var i = 0; i<10; i++){
    if(mouseX > (width/10*i) && mouseX < (width/10 * (i+1)) ){
      if(i % 2 ==0){
      	fill('blue');
      	rect(width/10*i,0,width/10,height);
    }
      else{
        fill('red');
        rect(width/10*i,0,width/10,height);
      }
    }
  }
}
  
    
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  for(var i = 0; i<10; i++){
    if(mouseX > (width/10*i) && mouseX < (width/10 * (i+1)) ){
      if(i<5){
      	fill('blue');
      	rect(width/10*i,0,width/10,height);
    }
      else{
        fill('red');
        rect(width/10*i,0,width/10,height);
      }
    }
  }
}
  
    
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  for(var i = 0; i<10; i++){
    if(mouseX > (width/10*i) && mouseX < (width/10 * (i+1)) && i!=6){
      fill('red');
      rect(width/10*i,0,width/10,height);
    }
  }
    
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  for(var i = 0; i<10; i++){
    if(mouseX > (width/10*i) && mouseX < (width/10 * (i+1))){
      fill('red');
      rect(width/10*i,0,width/10,height);
    }
  }
    
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  if(mouseX<width/3){
    fill('red');
    rect(0,0,width/3,height);
  }
  else if(mouseX<(width*2/3)){
    fill('red');
    rect(width/3,0,width/3,height);
  }
  else {
    fill('red');
    rect(width*2/3,0,width/3,height);
  }
}
var x = 0; 
var y = 0;
var bounceV;
var xspeed = 10;
var yspeed = 10;
var bg=129;
var bgchange = 10;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(bg);
  bgchange = bounce(bg,
  xspeed = bounce(x,0,width,xspeed);
  yspeed = bounce(y,0,height,yspeed);
  
  x+=xspeed;
  y+=yspeed;
  ellipse(x,y,50,50);
  
}
function bounce(state,low,high,speed){
  if(state> high || state< low){
    speed*=-1;}
  return speed;
}let buttonAOn = false;
let buttonBOn = false;
let buttonCOn = false;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  if(buttonAOn){
    fill('red');
    rect(0,0,width/3,height);
  }
  if(buttonBOn){
    fill('red');
    rect(width/3,0,width/3,height);
  }
  if(buttonCOn){
    fill('red');
    rect(width*2/3,0,width/3,height);
  }
}
function mousePressed(){
	if(mouseX<width/3){
    buttonAOn=!buttonAOn;
  }
  else if(mouseX<(width*2/3)){
    buttonBOn=!buttonBOn;
  }
  else {
    buttonCOn=!buttonCOn;
  }
function setup() {
  createCanvas(400, 400);
  x = 40;
}
function draw() {
  background(220);
  noStroke();
  for (i = 0; i < width; i++) {
    for (j = 0; j < height; j++) {
      if ((i+j) % 2 == 0) {
        fill(0);
        rect(i*x, j*x, x, x);
      } else {
        fill(255);
        rect(i*x, j*x, x, x);
      }
    }
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  var c = p5.Vector.fromAngle((45/180)*PI, 60);
  line(200,200,c.x,c.y);
var x= {
  a:0,
  b:0,
  c:0,
  d:0,
};
var y= {
  a:0,
  b:0,
  c:0,
  d:0,
};
function setup() {
  createCanvas(400, 400);
  background(245);
  x.a = x.b = x.c = x.d = width/2;
  y.a = y.b = y.c = y.d = height/2;
}
function draw() {
  noStroke();
  
  fill(23,29,200,50);
  ellipse(x.a,y.a,50,50);
  	x.a = x.a -1; 
  
  fill(123,29,200,50);
  ellipse(x.b,y.b,50,50);
  	x.b = x.b+1;
  	y.b = y.b+1;
  
  fill(103,229,20,50);
  ellipse(x.c,y.c,50,50);
  	x.c = x.c-1;
  	y.c = y.c+1;
  
  fill(203,129,120,50);
  ellipse(x.d,y.d,50,50);
  	x.d = x.d+10;
  	y.d = y.d-10;
  
  
  
}let a;
let b;
let x;
let y;
function setup() {
  createCanvas(400, 400);
  a = width/4;
  b = height/4;
  x = width/2;
  y = height/2;
}
function draw() {
  background(220);
  beginShape();
  	vertex(x-a,y-b);
  	vertex(x+a,y-b);
  	vertex(x+a,y+b);
  	vertex(x-a,y+b);
  endShape(CLOSE);
}let x;
let y;
let a;
let b;
let c;
function setup() {
  createCanvas(400, 400);
  background(220);
  x = 0;
}
function draw() {
  point(x,y);
  x = x+1;
  y = x*x/30;
  
  point(a,b);
  a = mouseX;
  c = mouseY;
  b = a*a/c;
}let caesar;
let nancy;
let a;
let b;
let qx=0;
let qy=0;
let dx;
let dy;
function setup() {
  createCanvas(800, 400); 
  textSize(20);
  caesar = color(random(200,250),random(200,250),random(200,250));
  nancy = random(100);
  a=450;
  b=180;
}
function draw() {
  background('#F08080');
  noStroke();
  fill(30,90,200);
  ellipse(width/2,height/2,width/4,width/4);
  
  if(dist(mouseX,mouseY,width/2,height/2)>width/8){
  fill(caesar);
  dx=qx-mouseX;
  dy=qy-mouseY;
  qx=qx-dx*0.1;
  qy=qy-dy*0.1;
	text('yes',qx+20,qy+12);
  text('yes',qx+16,qy+32);
  text('yes',qx-30,qy+32);
  text('yes',qx-45,qy+9);
  text('yes',qx-15,qy-10);
  line(qx,qy,mouseX,mouseY);
  }
  else {
    push();
  	translate(mouseX,mouseY);
    fill('#F08080');
    textSize(random(20,30));
    text('no',20,12);
  	text('no',16,32);
  	text('no',-30,32);
  	text('no',-45,9);
  	text('no',-15,-10);
    pop();
  }
  
  fill('#F08080');
  stroke('#F08080');
  strokeWeight(2);
  line(420,180,460,180);
  
  noFill();
	bezier(393,190,428,209,425,216,395,220);
  
  fill('#F08080');
  quad(a,b,a+2,b+6,a,b+12,a-2,b+6)
  b = b+1.5;
  if(b>350){
    b=180}
  
  noFill();
  arc(400,260,90,20,(210/180)*PI,(270/180)*PI);
  
  if(nancy>50){
  fill(30,90,200);
  stroke(30,90,200);
  strokeWeight(2);
  line(170,180,200,180);
  line(130,180,150,180);
  
  noFill();
	bezier(163,190,200,209,300,216,165,220);
  
  noFill();
  arc(170,260,80,20,(100/180)*PI,(180/180)*PI);  
  }
  else{
  fill(30,90,200);
  stroke(30,90,200);
  strokeWeight(2);
  line(620,180,670,180);
  line(570,180,600,180);
  
  noFill();
	bezier(603,190,540,209,500,216,600,220);
  
  noFill();
  arc(620,260,100,20,(10/180)*PI,(90/180)*PI);  
  }
  
}
let a;
let b;
function setup() {
  createCanvas(400, 400);
	background(220);
}
function draw() {
  
  a = mouseX-1;
  b = mouseX+1;
	ellipse(a,mouseY,50,50);
  ellipse(b,20,50,50);
}
function mouseClicked(){
  background(random(0,250));
}
function setup() {
  createCanvas(500, 500);
}
function draw() {
  background('#bd1e24');
  noFill();
  strokeWeight(3);
  
  stroke(1000);
  arc(250,200,130,220,(60/180)*PI,(130/180)*PI);
  
  line(240,285,250,280);
  line(250,280,260,285); 
 
  
  
  line(250,230,255,252);
  
  line(250,140,220,150);
  line(230,160,190,180);
  line(200,185,165,220);
  line(250,170,280,200);
  line(315,240,290,265);
  line(290,150,320,165);
  
  	vertex(230, 175);
		bezierVertex(125, 210, 2220, 365, 200, 290);
  
  beginShape();
  	vertex(245, 155);
		bezierVertex(475, 240, 240, 300, 300, 300);
  endShape();
  
 
  beginShape();
  	vertex(185, 225);
		bezierVertex(185, 220, 160, 290, 195, 300);
  endShape();
  
  fill(10,10,random(0,300));
  ellipse(210,230,30,30);
  line(225,230,260,230);
  ellipse(290,230,30,30);
  
  
  	stroke(250);
  	noFill();
    beginShape();
  	vertex(230, 175);
		bezierVertex(220, 170, 190, 285, 220, 280);
  endShape();
  
  textSize(15);
  fill(1000);
  noStroke();
  var c = ['me','monster'];
} let x=0;
let y=0;
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  let name = 2;
  frameRate(20);
  background(name);
}
function draw() {
  
  
  x=x+0.5;
  y=20*x*x+8;
	ellipse(x,y,40,40);
}let angle = 0;
function setup() {
  createCanvas(500, 500);
}
function draw() {
  background(30);
  noFill();
  strokeWeight(3);
  
  rotate(angle);
  
  stroke(180);
  arc(250,200,130,220,(60/180)*PI,(130/180)*PI);
  
  line(240,285,250,280);
  line(250,280,260,285); 
 
  
  
  line(250,230,255,252);
  
  stroke('#00CED1');
  line(250,140,220,150);
  stroke('#7FFFD4');	
  line(230,160,190,180);
  stroke('#FF4500');
  line(200,185,165,220);
  stroke('#9ACD32');
  line(250,170,280,200);
  stroke('#7FFFD4');
  line(315,240,290,265);
  stroke(120);
  line(290,150,320,165);
  
  	vertex(230, 175);
		bezierVertex(125, 210, 2220, 365, 200, 290);
  
  stroke('#6A5ACD');
  beginShape();
  	vertex(245, 155);
		bezierVertex(475, 240, 240, 300, 300, 300);
  endShape();
  
  stroke(140,80,0);
  beginShape();
  	vertex(185, 225);
		bezierVertex(185, 220, 160, 290, 195, 300);
  endShape();
  
  stroke('#FA8072');
  fill(140,80,random(0,200));
  ellipse(210,230,30,30);
  line(225,230,260,230);
  ellipse(290,230,30,30);
  
  
  	stroke(250);
  	noFill();
    beginShape();
  	vertex(230, 175);
		bezierVertex(220, 170, 190, 285, 220, 280);
  endShape();
  
  textSize(15);
  fill(140,80,random(0,200));
  noStroke();
  var c = ['me','monster'];
  text(random(c),225,380);
}function setup() {
  createCanvas(600, 450);
}
function draw() {
  background(1,255,255);
  noStroke();
  
	fill(255,0,0);
  beginShape();
  vertex(0,0);
  vertex(30,0);
  vertex(600,420);
  vertex(600,450);
  vertex(570,450);
  vertex(0,30);
  endShape(); 
  
  stroke(255,0,0);
  strokeWeight(40);
  line(0,0,600,450);
  
  
  fill(20,200,0);
  ellipse(300,225,320,240);
  
  fill(0,0,150);
  rect(420,195,40,40);
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(30);
  fill(8, 232, 222);
  noStroke();
  ellipse(200,200,400,400);
}function setup() {
  createCanvas(500, 500);
  frameRate(800);
  colorMode(RGB, 255, 255, 255, 1);
}
function draw() {
  background(color('hsl(80, 70%, 90%)'));
  
  var we = color('hsl(170,70%,90%)');
  var de = color('hsl(20,90%,80%)');
  var q = lerpColor(we,de,0.3);
  var w = lerpColor(we,de,0.6);
  fill(q);
  noStroke();
  rect(0,height/4,500,height/4);
  fill(w);
  rect(0,250,500,height/4);
  fill(de);
  rect(0,height*3/4,500,height/4);
  
  stroke(250);
  	line(0,0,500,500);
  
	fill(220,45,random(20,190));
  noStroke(256);
  	arc(250,200,600,600,(random((30/180)*PI,(90/180)*PI)),random((90/180)*PI,(160/180)*PI));
  
  fill(0);
  	arc(250,200,200,200,(100/180)*PI,(80/180)*PI);
  
  fill(250);
   stroke(0);
  	line(500,0,0,500);
  
	var words = ['me','monster'];
  var word = random(words); 
  text(word,210,170);
  textSize(20);
  
  
  fill(30,70,220);
  ellipse(300,200,20,20);
  var a = [0,1];
  fill(220,30,70,random(a));
  ellipse(300,200,20,20);
}
function setup() {
}
function draw() {
 background(30,180,250);
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(255);
  point(100, 100);
  rectMode(CENTER, CENTER);
  rect(width / 2, height / 2, 100, 50)
  rect(20);
}