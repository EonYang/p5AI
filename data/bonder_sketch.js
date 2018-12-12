var font,
  fontsize = 40
let arrayWordsOne = ['war', 'refugee'];
let arrayWordsTwo = ['peace', 'citizenship'];
let years = [];
let url = 'refugees.json';
let currentWordOne, currentWordTwo;
function preload() {
}
function setup() {
  createCanvas(710, 400);
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    for (let i=0; i<Object.keys(data).length;
         i++){     
      console.log(Object.keys(data).length);
      years.push((Object.keys(data)[i]))
    }
    for (let y=0; y<years.length;y++){
      x +=20;
      fill(65);
      console.log(years[y]);
  		text(Object.keys(data),x, 150);  
    }
      
      });
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}
function draw() {
  background(160);
  
  textAlign(RIGHT);
  drawWords( width * .25);
  textAlign(CENTER);
  drawWords( width * .5 );
  textAlign(LEFT);
  drawWords( width * .75 );
}
function drawWords(x) {
  fill(65);
  text("ni", x, 150);
  fill(190);
  text("san", x, 220);
  fill(255);
  text("shi", x, 290);
let myImage;
let pix;
let brightness;
let fortune_array = [];
function preload() {
  myImage = loadImage("pics/coffee.jpg");
  title = loadImage("etch.png");
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    push();
    imageMode(CENTER);
    translate(windowWidth / 2, windowHeight / 2);
    scale(0.8);
    image(title, 0, 0);
    pop();
    textAlign(CENTER);
    textSize(25);
    textFont("Cutive Mono");
    text("NY COFFEE GROUNDS TAROT", windowWidth/4, windowHeight/2 - myImage.height*0.1/2 - 45);
    imageMode(CENTER);
    translate(windowWidth / 2, windowHeight / 2);
    scale(0.1);
    myImage.loadPixels();
    image(myImage, 0, 0);
    getImageLightness("pics/coffee.jpg",function(brightness){
        if (rank > 21){
            extra_ranks = ['page', 'knight', 'queen', 'knight'];
            rank = extra_ranks[rank - 22];
            console.log(rank);
            find_ranks(rank);
        }
        else{
            find_ranks(rank);
        }
        let fortunes = data.tarot_interpretations[rank].fortune_telling[round(random(data.tarot_interpretations[rank].fortune_telling.length -1),0)];
        console.log(fortunes);
        textAlign(CENTER);
        textSize(16);
        textFont("Cutive Mono")
        text(fortunes + ".", windowWidth/2 + 500, windowHeight/2 + myImage.height*0.1/2 + 50)
    });
    let fortunes = data.tarot_interpretations[0].fortune_telling[0];
}
function getImageLightness(imageSrc,callback) {
    img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);
    let colorSum = 0;
    img.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        let data = imageData.data;
        let r,g,b,avg;
            r = data[x];
            g = data[x+1];
            b = data[x+2];
            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }
        brightness = Math.floor(colorSum / (this.width*this.height));
        brightness = round(brightness.map(0, 255, 0, 25), 0);
        console.log(brightness)
        rank = brightness;
        callback(brightness, rank);
    }
}
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
function find_ranks(key){
    for(i = 0; i < data.tarot_interpretations.length; i++) {
        if (data.tarot_interpretations[i].rank == key){
            console.log('found matching rank in array ' + i);
            fortune_array.push(i);
        }
    }
    console.log('found matching rank in arrays ' + fortune_array)
    rank = fortune_array[round((random(fortune_array.length -1)),0)];
    console.log('selected rank in array ' + rank)
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
var x = [],
  y = [],
  segNum,
  segLength;
  segNum = 20;
  segLength = 30;
for (var i = 0; i < segNum; i++) {
  x[i] = 0;
  y[i] = 0;
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(10);
  stroke(255,255,255, 100);
}
function draw() {
  background(0,10);
  dragSegment(0, mouseX, mouseY);
  for( var i=0; i<x.length-1; i++) {
    dragSegment(i+1, x[i], y[i]);
  }
}
function mousePressed() {
  segNum = segNum + 1;
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    segNum = 20;
    segLength = 30;
  } else if (keyCode === RIGHT_ARROW) {
    segNum = 2;
    segLength = 300;
  } else if (keyCode === UP_ARROW) {
    segNum = 10;
    segLength = 100;
  } else if (keyCode === DOWN_ARROW) {
    segNum = 50;
    segLength = 5;
  } if (keyCode === ENTER) {
 	background(255);
	}
}
function dragSegment(i, xin, yin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  var angle = atan2(dy, dx);
  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;
  segment(x[i], y[i], angle);
}
function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  ellipse(0, 0, segLength/2, segLength/2);
  pop();
}
Mimi Yin NYU-ITP
Graphing Noise
let x, y;
let px, py;
let t;
function setup() {
  createCanvas(windowWidth, windowHeight);
	background(0);
  
  x = 0;
  y = height/2;
  px = x;
  py = y;
  t = 0;
}
function draw() {
  
  background (0, 5);
  stroke(255);
  t+=0.01;
  x = x + .8;
  y = (noise(t)-0.8)*height/4 + height/2;
 	line(px*3, py*2, x, y);
  px = x;
  py = y;
}let lineonex, linetwox, linespacing;
function setup() { 
  createCanvas(windowWidth, windowHeight);
  lineonex = 0;
  linetwox = width;
} 
function draw() { 
  background(0);
  
  stroke(255);
  lineonex += 1;
  linetwox += -1;
  
  line (0, height/2, lineonex, height/2);
  line (width, height/2, linetwox, height/2);
  
  if (lineonex >= width/2){
    linespacing = height/2 +50;
  	line(0, linespacing, width, linespacing);
  }
}function setup() { 
  createCanvas(windowWidth, windowHeight);
  
  
} 
function draw() { 
  
  textSize(32);
  text('How do you feel today?', width/2, 100);
  fill(0);
  
  background(255);
let vol;
function setup() {
 
 mic = new p5.AudioIn();
 mic.start();
}
function draw() {
 let vol = mic.getLevel();
	console.log(vol);
 ellipse(400,400, vol*2000, vol*2000);
  outByte = int(vol*255);
}
function keyPressed() {
 }
}
 inData = inByte;
}
 
}
let mic;
function setup() { 
  createCanvas(800, 800);
  mic = new p5.AudioIn();
  mic.start();
} 
function draw() { 
  let vol = mic.getLevel();
  console.log(vol);
  
  ellipse(400,400, vol*2000, vol*2000);
 
function setup() {
}
function draw() {
 background(0);
 fill(255);
 text("incoming value: " + inData, 30, 30);
}
function mouseDragged() {
 outByte = int(map(mouseY, 0, height, 0, 255));
}
function keyPressed() {
 }
}
 inData = inByte;
}
 
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
}var tododiaSong;
var sliderVolume;
var sliderRate;
var canvas;
var cunha;
var temer;
var bolsonaro;
var temerChecked = false;
var cunhaChecked = false;
var bolsonaroChecked = false;
var aecioChecked = false;
var crivelaChecked = false;
var dilmaChecked = false;
var doriaChecked = false;
var lulaChecked = false;
var marinaChecked = false;
var alkminChecked = false;
var romarioChecked = false;
var renanChecked = false;
var maiaChecked = false;
var fhcChecked = false;
var jucaChecked = false;
var x;
var y;
function preload(){
	cunha = loadImage("politicians/cunha.png");
  bolsonaro = loadImage("politicians/bolsonaro.png");
  temer = loadImage("politicians/temer.png");
  aecio = loadImage("politicians/aecio.png");
  crivela = loadImage("politicians/crivela.png");
 	dilma = loadImage("politicians/dilma.png");
  doria = loadImage("politicians/doria.png");
  lula = loadImage("politicians/lula.png");
  marina = loadImage("politicians/marina.png");
  alkmin = loadImage("politicians/alkmin.png");
  romario = loadImage("politicians/romario.png");
  renan = loadImage("politicians/renan.png");
  maia = loadImage("politicians/maia.png");
  fhc = loadImage("politicians/fhc.png");
  juca = loadImage("politicians/juca.png");
}
function setup() { 
  canvas = createCanvas(1000, 500);
  canvas.position(200,0);
  amp = new p5.Amplitude();
 	createCheckboxes();
  buttonStart = createButton("Começar meu Baile Funk");
  buttonStart.position(650, 560);
  
  tododiaSong = loadSound("music/tododia.mp3", loaded);
  
  sliderVolume = createSlider(0, 1, 0.5, 0.01);
  sliderRate = createSlider(0, 2, 1, 0.01);
  canvas.hide();
  sliderVolume.hide();
  sliderRate.hide();
} 
function createCheckboxes(){
  checkboxTemer = createCheckbox('Temer', false);
  checkboxTemer.parent('#checkboxes');
  checkboxCunha = createCheckbox('Cunha', false);
  checkboxCunha.parent('#checkboxes');
  checkboxBolso = createCheckbox('Bolsonaro', false);
  checkboxBolso.parent('#checkboxes');
  checkboxAecio = createCheckbox('Aecio', false);
  checkboxAecio.parent('#checkboxes')
  checkboxCrivela = createCheckbox('Crivela', false);
  checkboxCrivela.parent('#checkboxes');
  checkboxDilma = createCheckbox('Dilma', false);
  checkboxDilma.parent('#checkboxes')
  checkboxDoria = createCheckbox('Doria', false);
  checkboxDoria.parent('#checkboxes');
  checkboxLula = createCheckbox('Lula', false);
  checkboxLula.parent('#checkboxes');
  checkboxMarina = createCheckbox('Marina', false);
  checkboxMarina.parent('#checkboxes')
  checkboxAlkmin = createCheckbox('Alkmin', false);
  checkboxAlkmin.parent('#checkboxes');
  checkboxRomario = createCheckbox('Romario', false);
  checkboxRomario.parent('#checkboxes');
  checkboxRenan = createCheckbox('Renan', false);
  checkboxRenan.parent('#checkboxes');
  checkboxMaia = createCheckbox('Maia', false);
  checkboxMaia.parent('#checkboxes');
  checkboxFhc = createCheckbox('Fhc', false);
  checkboxFhc.parent('#checkboxes');
  checkboxJuca = createCheckbox('Juca', false);
  checkboxJuca.parent('#checkboxes');
  checkboxTemer.changed(myCheckedEventTemer);
  checkboxCunha.changed(myCheckedEventCunha);
  checkboxBolso.changed(myCheckedEventBolso);
  checkboxAecio.changed(myCheckedEventAecio);
  checkboxCrivela.changed(myCheckedEventCrivela);
  checkboxDilma.changed(myCheckedEventDilma);
  checkboxDoria.changed(myCheckedEventDoria);
  checkboxLula.changed(myCheckedEventLula);
  checkboxMarina.changed(myCheckedEventMarina);
  checkboxAlkmin.changed(myCheckedEventAlkmin);
  checkboxRomario.changed(myCheckedEventRomario);
  checkboxRenan.changed(myCheckedEventRenan);
  checkboxMaia.changed(myCheckedEventMaia);
  checkboxFhc.changed(myCheckedEventFhc);
  checkboxJuca.changed(myCheckedEventJuca);
}
function myCheckedEventTemer() {
  if (this.checked()) {
    temerChecked = true;
  } else {
     temerChecked = false;
  }
}
function myCheckedEventCunha() {
  if (this.checked()) {
    cunhaChecked = true;
  } else {
     cunhaChecked = false;
  }
}
function myCheckedEventBolso() {
  if (this.checked()) {
    bolsonaroChecked = true;
  } else {
     bolsonaroChecked = false;
  }
}
function myCheckedEventAecio() {
  if (this.checked()) {
    aecioChecked = true;
  } else {
    aecioChecked = false;
  }
}
function myCheckedEventCrivela() {
  if (this.checked()) {
    crivelaChecked = true;
  } else {
     crivelaChecked = false;
  }
}
function myCheckedEventDilma() {
  if (this.checked()) {
    dilmaChecked = true;
  } else {
     dilmaChecked = false;
  }
}
function myCheckedEventDoria() {
  if (this.checked()) {
    doriaChecked = true;
  } else {
     doriaChecked = false;
  }
}
function myCheckedEventLula() {
  if (this.checked()) {
    lulaChecked = true;
  } else {
     lulaChecked = false;
  }
}
function myCheckedEventMarina() {
  if (this.checked()) {
    marinaChecked = true;
  } else {
     marinaChecked = false;
  }
}
function myCheckedEventAlkmin() {
  if (this.checked()) {
    alkminChecked = true;
  } else {
    alkminChecked = false;
  }
}
function myCheckedEventRomario() {
  if (this.checked()) {
    romarioChecked = true;
  } else {
    romarioChecked = false;
  }
}
function myCheckedEventRenan() {
  if (this.checked()) {
    renanChecked = true;
  } else {
    renanChecked = false;
  }
}
function myCheckedEventMaia() {
  if (this.checked()) {
    maiaChecked = true;
  } else {
    maiaChecked = false;
  }
}
function myCheckedEventFhc() {
  if (this.checked()) {
    fhcChecked = true;
  } else {
    fhcChecked = false;
  }
}
function myCheckedEventJuca() {
  if (this.checked()) {
    jucaChecked = true;
  } else {
    jucaChecked = false;
  }
}
function loaded(){
  buttonStart.mousePressed(togglePlay);
}
  
function togglePlay(){
  canvas.show();
  sliderVolume.show();
  sliderRate.show();
  if (!tododiaSong.isPlaying()){
  	tododiaSong.play();
    buttonStart.html("Pausar meu Baile Funk");
    background(random(255));
  } else {
    tododiaSong.pause();
    buttonStart.html("Continuar meu Baile Funk");
  }  
}
function draw() { 
	if (tododiaSong.isPlaying()){
  	background(random(255));
  } else {
    background(0);
  }
  
  tododiaSong.setVolume(sliderVolume.value());
  tododiaSong.rate(sliderRate.value());
  var vol = amp.getLevel();
  var volmap = map(vol, 0, 1,10,2000);
  
  if (temerChecked === true) {
  	image(temer, 100, 100, volmap, volmap);
  } 
  
  if (bolsonaroChecked === true){
     image(bolsonaro, 200, 200, volmap, volmap);
  } 
  
  if (cunhaChecked === true){
     image(cunha, 600, 50, volmap, volmap);
  }
  
  if (aecioChecked === true){
     image(aecio, 300, 300, volmap, volmap);
  }
  
  if (crivelaChecked === true){
     image(crivela, 150, 150, volmap, volmap);
  } 
  
  if (dilmaChecked === true){
     image(dilma, 700, 100, volmap, volmap);
  }
  
  if (doriaChecked === true){
     image(doria, 200, 50, volmap, volmap);
  }
  
  if (lulaChecked === true){
     image(lula, 500, 100, volmap, volmap);
  }
  
  if (marinaChecked === true){
     image(marina, 400, 200, volmap, volmap);
  } 
  
  if (alkminChecked === true){
     image(alkmin, 600, 50, volmap, volmap);
  }
  
  if (romarioChecked === true){
     image(romario, 300, 50, volmap, volmap);
  }
  
  if (renanChecked === true){
     image(renan, 800, 50, volmap, volmap);
  } 
  
  if (maiaChecked === true){
     image(maia, 50, 300, volmap, volmap);
  }
  
  if (fhcChecked === true){
     image(fhc, 400, 50, volmap, volmap);
  } 
  
  if (jucaChecked === true){
     image(juca, 200, 100, volmap, volmap);
  }
}
var tododiaSong;
var sliderVolume;
var sliderRate;
var canvas;
var cunha;
var temer;
var bolsonaro;
var temerChecked = false;
var cunhaChecked = false;
var bolsonaroChecked = false;
var aecioChecked = false;
var crivelaChecked = false;
var dilmaChecked = false;
var doriaChecked = false;
var lulaChecked = false;
var marinaChecked = false;
var alkminChecked = false;
var romarioChecked = false;
var renanChecked = false;
var maiaChecked = false;
var fhcChecked = false;
var jucaChecked = false;
var x;
var y;
function preload(){
	cunha = loadImage("politicians/cunha.png");
  bolsonaro = loadImage("politicians/bolsonaro.png");
  temer = loadImage("politicians/temer.png");
  aecio = loadImage("politicians/aecio.png");
  crivela = loadImage("politicians/crivela.png");
 	dilma = loadImage("politicians/dilma.png");
  doria = loadImage("politicians/doria.png");
  lula = loadImage("politicians/lula.png");
  marina = loadImage("politicians/marina.png");
  alkmin = loadImage("politicians/alkmin.png");
  romario = loadImage("politicians/romario.png");
  renan = loadImage("politicians/renan.png");
  maia = loadImage("politicians/maia.png");
  fhc = loadImage("politicians/fhc.png");
  juca = loadImage("politicians/juca.png");
}
function setup() { 
  canvas = createCanvas(1000, 500);
  canvas.position(200,0);
  amp = new p5.Amplitude();
 	createCheckboxes();
  buttonStart = createButton("Começar meu Baile Funk");
  buttonStart.position(650, 560);
  
  tododiaSong = loadSound("music/tododia.mp3", loaded);
  
  sliderVolume = createSlider(0, 1, 0.5, 0.01);
  sliderRate = createSlider(0, 2, 1, 0.01);
  canvas.hide();
  sliderVolume.hide();
  sliderRate.hide();
} 
function createCheckboxes(){
  checkboxTemer = createCheckbox('Temer', false);
  checkboxTemer.parent('#checkboxes');
  checkboxCunha = createCheckbox('Cunha', false);
  checkboxCunha.parent('#checkboxes');
  checkboxBolso = createCheckbox('Bolsonaro', false);
  checkboxBolso.parent('#checkboxes');
  checkboxAecio = createCheckbox('Aecio', false);
  checkboxAecio.parent('#checkboxes')
  checkboxCrivela = createCheckbox('Crivela', false);
  checkboxCrivela.parent('#checkboxes');
  checkboxDilma = createCheckbox('Dilma', false);
  checkboxDilma.parent('#checkboxes')
  checkboxDoria = createCheckbox('Doria', false);
  checkboxDoria.parent('#checkboxes');
  checkboxLula = createCheckbox('Lula', false);
  checkboxLula.parent('#checkboxes');
  checkboxMarina = createCheckbox('Marina', false);
  checkboxMarina.parent('#checkboxes')
  checkboxAlkmin = createCheckbox('Alkmin', false);
  checkboxAlkmin.parent('#checkboxes');
  checkboxRomario = createCheckbox('Romario', false);
  checkboxRomario.parent('#checkboxes');
  checkboxRenan = createCheckbox('Renan', false);
  checkboxRenan.parent('#checkboxes');
  checkboxMaia = createCheckbox('Maia', false);
  checkboxMaia.parent('#checkboxes');
  checkboxFhc = createCheckbox('Fhc', false);
  checkboxFhc.parent('#checkboxes');
  checkboxJuca = createCheckbox('Juca', false);
  checkboxJuca.parent('#checkboxes');
  checkboxTemer.changed(myCheckedEventTemer);
  checkboxCunha.changed(myCheckedEventCunha);
  checkboxBolso.changed(myCheckedEventBolso);
  checkboxAecio.changed(myCheckedEventAecio);
  checkboxCrivela.changed(myCheckedEventCrivela);
  checkboxDilma.changed(myCheckedEventDilma);
  checkboxDoria.changed(myCheckedEventDoria);
  checkboxLula.changed(myCheckedEventLula);
  checkboxMarina.changed(myCheckedEventMarina);
  checkboxAlkmin.changed(myCheckedEventAlkmin);
  checkboxRomario.changed(myCheckedEventRomario);
  checkboxRenan.changed(myCheckedEventRenan);
  checkboxMaia.changed(myCheckedEventMaia);
  checkboxFhc.changed(myCheckedEventFhc);
  checkboxJuca.changed(myCheckedEventJuca);
}
function myCheckedEventTemer() {
  if (this.checked()) {
    temerChecked = true;
  } else {
     temerChecked = false;
  }
}
function myCheckedEventCunha() {
  if (this.checked()) {
    cunhaChecked = true;
  } else {
     cunhaChecked = false;
  }
}
function myCheckedEventBolso() {
  if (this.checked()) {
    bolsonaroChecked = true;
  } else {
     bolsonaroChecked = false;
  }
}
function myCheckedEventAecio() {
  if (this.checked()) {
    aecioChecked = true;
  } else {
    aecioChecked = false;
  }
}
function myCheckedEventCrivela() {
  if (this.checked()) {
    crivelaChecked = true;
  } else {
     crivelaChecked = false;
  }
}
function myCheckedEventDilma() {
  if (this.checked()) {
    dilmaChecked = true;
  } else {
     dilmaChecked = false;
  }
}
function myCheckedEventDoria() {
  if (this.checked()) {
    doriaChecked = true;
  } else {
     doriaChecked = false;
  }
}
function myCheckedEventLula() {
  if (this.checked()) {
    lulaChecked = true;
  } else {
     lulaChecked = false;
  }
}
function myCheckedEventMarina() {
  if (this.checked()) {
    marinaChecked = true;
  } else {
     marinaChecked = false;
  }
}
function myCheckedEventAlkmin() {
  if (this.checked()) {
    alkminChecked = true;
  } else {
    alkminChecked = false;
  }
}
function myCheckedEventRomario() {
  if (this.checked()) {
    romarioChecked = true;
  } else {
    romarioChecked = false;
  }
}
function myCheckedEventRenan() {
  if (this.checked()) {
    renanChecked = true;
  } else {
    renanChecked = false;
  }
}
function myCheckedEventMaia() {
  if (this.checked()) {
    maiaChecked = true;
  } else {
    maiaChecked = false;
  }
}
function myCheckedEventFhc() {
  if (this.checked()) {
    fhcChecked = true;
  } else {
    fhcChecked = false;
  }
}
function myCheckedEventJuca() {
  if (this.checked()) {
    jucaChecked = true;
  } else {
    jucaChecked = false;
  }
}
function loaded(){
  buttonStart.mousePressed(togglePlay);
}
  
function togglePlay(){
  canvas.show();
  sliderVolume.show();
  sliderRate.show();
  if (!tododiaSong.isPlaying()){
  	tododiaSong.play();
    buttonStart.html("Pausar meu Baile Funk");
    background(random(255));
  } else {
    tododiaSong.pause();
    buttonStart.html("Continuar meu Baile Funk");
  }  
}
function draw() { 
	if (tododiaSong.isPlaying()){
  	background(random(255));
  } else {
    background(0);
  }
  
  tododiaSong.setVolume(sliderVolume.value());
  tododiaSong.rate(sliderRate.value());
  var vol = amp.getLevel();
  var volmap = map(vol, 0, 1,10,2000);
  
  if (temerChecked === true) {
  	image(temer, 100, 100, volmap, volmap);
  } 
  
  if (bolsonaroChecked === true){
     image(bolsonaro, 200, 200, volmap, volmap);
  } 
  
  if (cunhaChecked === true){
     image(cunha, 600, 50, volmap, volmap);
  }
  
  if (aecioChecked === true){
     image(aecio, 300, 300, volmap, volmap);
  }
  
  if (crivelaChecked === true){
     image(crivela, 150, 150, volmap, volmap);
  } 
  
  if (dilmaChecked === true){
     image(dilma, 700, 100, volmap, volmap);
  }
  
  if (doriaChecked === true){
     image(doria, 200, 50, volmap, volmap);
  }
  
  if (lulaChecked === true){
     image(lula, 500, 100, volmap, volmap);
  }
  
  if (marinaChecked === true){
     image(marina, 400, 200, volmap, volmap);
  } 
  
  if (alkminChecked === true){
     image(alkmin, 600, 50, volmap, volmap);
  }
  
  if (romarioChecked === true){
     image(romario, 300, 50, volmap, volmap);
  }
  
  if (renanChecked === true){
     image(renan, 800, 50, volmap, volmap);
  } 
  
  if (maiaChecked === true){
     image(maia, 50, 300, volmap, volmap);
  }
  
  if (fhcChecked === true){
     image(fhc, 400, 50, volmap, volmap);
  } 
  
  if (jucaChecked === true){
     image(juca, 200, 100, volmap, volmap);
  }
}
var tododiaSong;
var sliderVolume;
var sliderRate;
var canvas;
var cunha;
var temer;
var bolsonaro;
let songs = []
var images = []
var temerChecked = false;
function preload(){
	cunha = loadImage("politicians/cunha.png");
  bolsonaro = loadImage("politicians/bolsonaro.png");
  temer = loadImage("politicians/temer.png");
  images.push(temer)
}
function setup() { 
  canvas = createCanvas(400, 400);
  amp = new p5.Amplitude();
 	createCheckboxes();
 	createSel();
  
  buttonStart = createButton("Começar meu Baile Funk");
  buttonStart.parent("#startbut");
  
  tododia = loadSound("music/tododia.mp3", loaded);
  songs.push(tododiaSong);
  bumbum = loadSound("music/bumbum.mp3", loaded);
  songs.push(bumbum);
  
  sliderVolume = createSlider(0, 1, 0.5, 0.01);
  sliderRate = createSlider(0, 2, 1, 0.01);
  canvas.hide();
} 
function createSel(){
  sel = createSelect();
  sel.parent("musicselect");
  sel.option('Todo Dia - Pablo Vittar');
  sel.option('Bum Bum Tan Tan - MC Fioti');
  sel.option('Bum Bum Tan Tan - MC Fioti');
  sel.changed(mySelectEvent);
}
function createCheckboxes(){
  checkboxTemer = createCheckbox('Temer', false);
  checkboxTemer.parent('#checkboxes')
  checkboxCunha = createCheckbox('Cunha', false);
  checkboxCunha.parent('#checkboxes')
  checkboxBolso = createCheckbox('Bolsonaro', false);
  checkboxBolso.parent('#checkboxes')
  checkboxTemer.changed(myCheckedEventTemer);
  checkboxCunha.changed(myCheckedEventCunha);
  checkboxBolso.changed(myCheckedEventBolso);
}
function myCheckedEventTemer() {
  if (this.checked()) {
    temerChecked = true;
    console.log("CHECK");
  } else {
    console.log("Unchecking!");
     temerChecked = false;
  }
}
function myCheckedEventCunha() {
  if (this.checked()) {
    console.log("Checking!");
  } else {
    console.log("Unchecking!");
  }
}
function myCheckedEventBolso() {
  if (this.checked()) {
    console.log("Checking!");
  } else {
    console.log("Unchecking!");
  }
}
function mySelectEvent() {
  song = sel.value();
}
function loaded(){
  buttonStart.mousePressed(togglePlay);
}
  
function togglePlay(){
  canvas.show();
  if (song.indexOf('bum')) {
    songs[1].play();
  } else if (song.indexOf('todo')) {
    songs[0].play();
  }
}
function draw() { 
  
  var vol = amp.getLevel();
  var volmap = map(vol, 0, 1,10,1000);
  
  if (temerChecked === true) {
  	image(images[0], 275, 150, volmap, volmap);
  }
  
}
let video;
let button;
let snapshots = [];
let counter = 0;
function setup() {
  createCanvas(800, 240);
  background(51);
  video = createCapture(VIDEO, ready);
  video.size(320,240);
}
let go = false;
function ready(){
    go = true;
} 
function draw() {
  if (go){
  snapshots[counter] = (video.get());
    counter++;
    if (counter == 43){
      counter = 0;
    }
  }
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;
	for (var i = 0; i < snapshots.length; i++) {
    var index = (i + frameCount) % snapshots.length;
    image(snapshots[i],x,y,w,h);
    x = x + w;
    if (x > width) {
      x = 0;
      y = y + h;
    }
  }
}
let video;
let button;
let snapshots = [];
function setup() {
  createCanvas(320, 240);
  background(51);
  video = createCapture(VIDEO);
  video.size(320,240);
  button = createButton('snap');
  button.mousePressed(takesnap);
}
function takesnap(){
  snapshots.push(video.get());
}  
  
function draw() {
	for (var i = 0; i < snapshots.length; i++) {
    let x = random(255);
    tint(x,x,x,50);
    image(snapshots[i]);
  }
}
var circles=[];
var closedeyes=[];
function preload(){
  trump = loadImage ('mymouth.png'); 
  kimjong = loadImage ('kiss.png'); 
}
function setup() { 
  createCanvas(500, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++)
  {
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    circles.push(c);
    let e = new Closed(30*i, 20*i, direction);
    closedeyes.push(e);
  }
  
  slider = new Slider();
  
  
} 
function draw() { 
  noStroke();
	push();
  background(255);
  translate(250, 250);
	for(let i = 0; i < circles.length; i++){
    if (mouseIsPressed){
    closedeyes[i].show();
    } else{
  	circles[i].show();
    }
  }
  pop();
  push();
  slider.move();
  pop();
}
function mousePressed() {
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    slider.dragging = true;
    slider.offsetX = slider.x - mouseX;
  }
}
function mouseReleased() {
  slider.dragging = false;
}var tododiaSong;
var sliderVolume;
var sliderRate;
var canvas;
var cunha;
var temer;
var bolsonaro;
var song;
function preload(){
	cunha = loadImage("politicians/cunha.png");
  bolsonaro = loadImage("politicians/bolsonaro.png");
  temer = loadImage("politicians/temer.png");
}
function setup() { 
  canvas = createCanvas(400, 400);
  tododiaSong = loadSound("music/tododia.mp3", loaded);
  amp = new p5.Amplitude();
 	createCheckboxes();
 	createSel();
  buttonStart = createButton("Começar meu Baile Funk");
  buttonStart.position(180,220);
  sliderVolume = createSlider(0, 1, 0.5, 0.01);
  sliderRate = createSlider(0, 2, 1, 0.01);
  canvas.hide();
} 
function createCheckboxes(){
  checkboxTemer = createCheckbox('Temer', false);
  checkboxCunha = createCheckbox('Cunha', false);
  checkboxBolso = createCheckbox('Bolsonaro', false);
  checkboxTemer.changed(myCheckedEventTemer);
  checkboxCunha.changed(myCheckedEventCunha);
  checkboxBolso.changed(myCheckedEventBolso);
}
function createSel(){
  sel = createSelect();
  sel.position(10, 10);
  sel.option('Todo Dia - Pablo Vittar');
  sel.option('Bum Bum Tan Tan - MC Fioti');
  sel.changed(mySelectEvent);
}
function mySelectEvent() {
  song = sel.value();
  background(200);
  text("it's a "+song+"!", 50, 50);
}
function myCheckedEventTemer() {
  if (this.checked()) {
  } else {
    console.log("Unchecking!");
  }
}
function myCheckedEventCunha() {
  if (this.checked()) {
    console.log("Checking!");
  } else {
    console.log("Unchecking!");
  }
}
function myCheckedEventBolso() {
  if (this.checked()) {
    console.log("Checking!");
  } else {
    console.log("Unchecking!");
  }
}
function loaded(){
  buttonStart.mousePressed(togglePlay);
}
  
function togglePlay(){
  canvas.show();
  if (!tododiaSong.isPlaying()){
  	tododiaSong.play();
    background(random(255));
  } else {
    tododiaSong.pause();
  }   
}
function draw() { 
	if (tododiaSong.isPlaying()){
  	background(random(255));
  } else {
    background(0);
  }
  
  tododiaSong.setVolume(sliderVolume.value());
  tododiaSong.rate(sliderRate.value());
  var vol = amp.getLevel();
  var volmap = map(vol, 0, 1,10,1000);
  image(temer, 275, 150, volmap, volmap);
  image(cunha, 35, 150, volmap, volmap);
  image(bolsonaro, 150, 150, volmap, volmap);
}
var tododiaSong;
var sliderVolume;
var sliderRate;
var volhistory =[];
function preload(){
  cunha = loadImage("politicians/cunha.png");
  bolsonaro = loadImage("politicians/bolsonaro.png");
  temer = loadImage("politicians/temer.png");
  myFont = loadFont("");
}
}
function setup() { 
  createCanvas(400, 400);
  tododiaSong = loadSound("music/tododia.mp3", loaded);
  amp = new p5.Amplitude();
  sliderVolume = createSlider(0, 1, 0.5, 0.01);
  sliderRate = createSlider(0, 2, 1, 0.01);
} 
function loaded(){
  button = createButton("Começar meu Baile Funk");
  button.mousePressed(togglePlay);
}
  
function togglePlay(){
  if (!tododiaSong.isPlaying()){
  	tododiaSong.play();
    button.html("Pausar meu Baile Funk");
    background(random(255));
  } else {
    tododiaSong.pause();
    button.html("Continuar meu Baile Funk");
  }   
}
function draw() { 
	if (tododiaSong.isPlaying()){
  	background(random(255));
  } else {
    background(0);
  }
  
  tododiaSong.setVolume(sliderVolume.value());
  tododiaSong.rate(sliderRate.value());
  var vol = amp.getLevel();
  var volmap = map(vol, 0, 1,10,1000);
  image(cunha, 35, 150, volmap, volmap);
  image(bolsonaro, 150, 150, volmap, volmap);
  image(temer, 275, 150, volmap, volmap);
}
var circles=[];
var closedeyes=[];
function preload(){
  trump = loadImage ('mymouth.png'); 
  kimjong = loadImage ('kiss.png'); 
}
function setup() { 
  createCanvas(500,500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++)
  {
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    circles.push(c);
    let e = new Closed(30*i, 20*i, direction);
    closedeyes.push(e);
  }
  
  slider = new Slider();
  
  
} 
function draw() { 
  noStroke();
	push();
  background(255);
  translate(250, 250);
	for(let i = 0; i < circles.length; i++){
    if (mouseIsPressed){
    closedeyes[i].show();
    } else{
  	circles[i].show();
    }
  }
  pop();
  push();
  slider.move();
  pop();
}
function mousePressed() {
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    slider.dragging = true;
    slider.offsetX = slider.x - mouseX;
  }
}
function mouseReleased() {
  slider.dragging = false;
var circles=[];
var closedeyes=[];
function preload(){
  eye = loadImage ('mymouth.png'); 
  closedEye = loadImage ('kiss.png'); 
}
function setup() {
 
  
  createCanvas(500, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++){
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    let e = new Closed(30*i, 20*i, direction);
    circles.push(c);
    closedeyes.push(e);
  }
  
  slider = new Slider();
  
}
function draw() { 
  noStroke();
	push();
  background(255);
  translate(250, 250);
  for(let i = 0; i < circles.length; i++){
    if (mouseIsPressed){
    closedeyes[i].show();
    } else{
  	circles[i].show();
    }
  }
  pop();
  push();
  slider.move();
  pop();
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}
function serverConnected() {
}
 
function portOpen() {
}
 
  if (inString.length > 0 ) {
  inData = Number(inString);
  }   
}
 
}
 
function portClose() {
}
function mousePressed() {
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    slider.dragging = true;
    slider.offsetX = slider.x - mouseX;
  }
}
function mouseReleased() {
  slider.dragging = false;
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}let tempo; 
let temperatura;
let clima;
function setup() { 
  createCanvas(400, 200);
} 
function myData(data) {
	tempo=data;
}
function draw() { 
  background(255);
  if (tempo) {
    text(tempo.main.temp+" ℃", 20, 30);
    text(tempo.weather[1].main.temp, 20, 50);
    temperatura = tempo.main.temp;
    clima = tempo.weather[1].main.temp;
    if(temperatura >=15 && temperatura <= 25){
    text("hello", 100,100);
    }
  }
}function preload(){
  data = loadJSON('moods.json');  
}
function setup() { 
  createCanvas(400, 400);
}
function draw(){
  
}
var circles=[];
var closedeyes=[];
var mouthes=[];
var kisses=[];
function preload(){
  myeye = loadImage ('myeye.png'); 
  myeyeclosed = loadImage ('myeyeclosed.png');
  mouth = loadImage ('mymouth.png');
  kiss = loadImage ('kiss.png');
}
function setup() { 
  createCanvas(800, 800);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++)
  {
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    let e = new Closed(30*i, 20*i, direction);
    let m = new Circle(30*i, 20*i, direction);
    let k = new Closed(30*i, 20*i, direction);
    circles.push(c);
    closedeyes.push(e);
    mouthes.push(m);
    kisses.push(k);
  }
  
  slider = new Slider();
  
  
} 
function draw() { 
  noStroke();
	push();
  background(255);
  translate(400, 400);
  showMouth();
  pop();
  push();
  slider.move();
  pop();
}
function showMouth() {
  for(let j = 0; j < circles.length; j++){
    if (mouseIsPressed){
    kisses[j].show();
    } else{
  	mouthes[j].show();
    }
  }
}
  
function showEyes() {
  for(let i = 0; i < circles.length; i++){
    if (mouseIsPressed){
    closedeyes[i].show();
    } else{
  	circles[i].show();
    }
  }
}
  
function mousePressed() {
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    slider.dragging = true;
    slider.offsetX = slider.x - mouseX;
  }
}
function mouseReleased() {
  slider.dragging = false;
}var circles=[];
function preload(){
  trump = loadImage ('trump.png'); 
  kimjong = loadImage ('kimjong.png');
  nuclear = loadImage ('nuclear.png');
}
function setup() { 
  createCanvas(500, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++)
  {
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    circles.push(c);
  }
  
  slider = new Slider();
  
  
} 
function draw() { 
  noStroke();
	push();
  background(0);
  translate(250, 250);
  for(let i = 0; i < circles.length; i++)
  {
   	circles[i].show(); 
  }
  pop();
  push();
  slider.move();
  pop();
}
function mousePressed() {
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    slider.dragging = true;
    slider.offsetX = slider.x - mouseX;
  }
}
function mouseReleased() {
  slider.dragging = false;
var potOneData = 0;
var buttonOneData = 1;
var circles=[];
var closedeyes=[];
function setup() {
 
  
  createCanvas(500, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++){
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    let e = new Closed(30*i, 20*i, direction);
    circles.push(c);
    closedeyes.push(e);
  }
  
  slider = new Slider();
  
}
function draw() { 
  noStroke();
	push();
  background(255);
  translate(250, 250);
  for(let i = 0; i < circles.length; i++){
    if (buttonOneData == 0){
    closedeyes[i].show();
    } else{
  	circles[i].show();
    }
  }
  pop();
  push();
  slider.move();
  pop();
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}
function serverConnected() {
}
 
function portOpen() {
}
 
  
  if (inString.length > 0 ) {
    var values =inString.split(',');
  buttonOneData = int(values[0]);
  potOneData =  int(values[1]);
  }   
}
 
}
 
function portClose() {
}
function preload(){
  eye = loadImage ('myeye.png'); 
  closedEye = loadImage ('myeyeclosed.png'); 
}
var potOneData = 0;
var buttonOneData = 1;
var circles=[];
var closedeyes=[];
function setup() {
 
  
  createCanvas(500, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++){
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    let e = new Closed(30*i, 20*i, direction);
    circles.push(c);
    closedeyes.push(e);
  }
  
  slider = new Slider();
  
}
function draw() { 
  noStroke();
	push();
  background(255);
  translate(250, 250);
  for(let i = 0; i < circles.length; i++){
    if (buttonOneData == 0){
    closedeyes[i].show();
    } else{
  	circles[i].show();
    }
  }
  pop();
  push();
  slider.move();
  pop();
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}
function serverConnected() {
}
 
function portOpen() {
}
 
  
  if (inString.length > 0 ) {
    var values =inString.split(',');
  buttonOneData = int(values[0]);
  potOneData =  int(values[1]);
  }   
}
 
}
 
function portClose() {
}
function preload(){
  eye = loadImage ('myeye.png'); 
  closedEye = loadImage ('myeyeclosed.png'); 
}
var potOneData = 0;
var buttonOneData = 1;
var circles=[];
var closedeyes=[];
function setup() {
 
  
  createCanvas(500, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++){
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    let e = new Closed(30*i, 20*i, direction);
    circles.push(c);
    closedeyes.push(e);
  }
  
  slider = new Slider();
  
}
function draw() { 
  noStroke();
	push();
  background(255);
  translate(250, 250);
  for(let i = 0; i < circles.length; i++){
    if (buttonOneData == 0){
    closedeyes[i].show();
    } else{
  	circles[i].show();
    }
  }
  pop();
  push();
  slider.move();
  pop();
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}
function serverConnected() {
}
 
function portOpen() {
}
 
  
  if (inString.length > 0 ) {
    var values =inString.split(',');
  buttonOneData = int(values[0]);
  potOneData =  int(values[1]);
  }   
}
 
}
 
function portClose() {
}
function preload(){
  eye = loadImage ('myeye.png'); 
  closedEye = loadImage ('myeyeclosed.png'); 
}
var circles=[];
var closedeyes=[];
function preload(){
  eye = loadImage ('mymouth.png'); 
  closedEye = loadImage ('kiss.png'); 
}
function setup() {
 
  
  createCanvas(500, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++){
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    let e = new Closed(30*i, 20*i, direction);
    circles.push(c);
    closedeyes.push(e);
  }
  
  slider = new Slider();
  
}
function draw() { 
  noStroke();
	push();
  background(255);
  translate(250, 250);
  for(let i = 0; i < circles.length; i++){
    if (mouseIsPressed){
    closedeyes[i].show();
    } else{
  	circles[i].show();
    }
  }
  pop();
  push();
  slider.move();
  pop();
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}
function serverConnected() {
}
 
function portOpen() {
}
 
  if (inString.length > 0 ) {
  inData = Number(inString);
  }   
}
 
}
 
function portClose() {
}
function mousePressed() {
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    slider.dragging = true;
    slider.offsetX = slider.x - mouseX;
  }
}
function mouseReleased() {
  slider.dragging = false;
var circles=[];
var closedeyes=[];
function setup() {
 
  
  createCanvas(500, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++){
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    let e = new Closed(30*i, 20*i, direction);
    circles.push(c);
    closedeyes.push(e);
  }
  
  slider = new Slider();
  
}
function draw() { 
  noStroke();
	push();
  background(255);
  translate(250, 250);
  for(let i = 0; i < circles.length; i++){
    if (mouseIsPressed){
    closedeyes[i].show();
    } else{
  	circles[i].show();
    }
  }
  pop();
  push();
  slider.move();
  pop();
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}
function serverConnected() {
}
 
function portOpen() {
}
 
  if (inString.length > 0 ) {
  inData = Number(inString);
  }   
}
 
}
 
function portClose() {
}
function preload(){
  eye = loadImage ('myeye.png'); 
  closedEye = loadImage ('myeyeclosed.png'); 
}
function mousePressed() {
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    slider.dragging = true;
    slider.offsetX = slider.x - mouseX;
  }
}
function mouseReleased() {
  slider.dragging = false;
var circles=[];
function setup() {
 
  
  createCanvas(500, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++){
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    circles.push(c);
  }
  
  slider = new Slider();
  
}
function draw() { 
  noStroke();
	push();
  background(255);
  translate(250, 250);
  for(let i = 0; i < circles.length; i++)
  {
   	circles[i].show(); 
  }
  pop();
  push();
  slider.move();
  pop();
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}
function serverConnected() {
}
 
function portOpen() {
}
 
  if (inString.length > 0 ) {
  inData = Number(inString);
  }   
}
 
}
 
function portClose() {
}
function preload(){
  trump = loadImage ('myeye.png'); 
  kimjong = loadImage ('myeye.png'); 
}
function mousePressed() {
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    slider.dragging = true;
    slider.offsetX = slider.x - mouseX;
  }
}
function mouseReleased() {
  slider.dragging = false;
}var circles=[];
var closedeyes=[];
function preload(){
  trump = loadImage ('myeye.png'); 
  kimjong = loadImage ('myeyeclosed.png'); 
}
function setup() { 
  createCanvas(500, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++)
  {
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    circles.push(c);
    let e = new Closed(30*i, 20*i, direction);
    closedeyes.push(e);
  }
  
  slider = new Slider();
  
  
} 
function draw() { 
  noStroke();
	push();
  background(255);
  translate(250, 250);
	for(let i = 0; i < circles.length; i++){
    if (mouseIsPressed){
    closedeyes[i].show();
    } else{
  	circles[i].show();
    }
  }
  pop();
  push();
  slider.move();
  pop();
}
function mousePressed() {
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    slider.dragging = true;
    slider.offsetX = slider.x - mouseX;
  }
}
function mouseReleased() {
  slider.dragging = false;
 
function setup() {
  createCanvas(400, 300);
  background(0x08, 0x16, 0x40);
 
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}
function serverConnected() {
}
 
function portOpen() {
}
 
  if (inString.length > 0){
    
}
 
}
 
function portClose() {
}
function graphData(newData) {
  var yPos = map(newData, 0, 255, 0, height);
  stroke(0xA8, 0xD9, 0xA7);
  line(xPos, height, xPos, height - yPos);
  if (xPos >= width) {
    xPos = 0;
    background(0x08, 0x16, 0x40);
  } else {
    xPos++;
  }
}
function draw() {
	graphData(inData);
}
var circles=[];
function preload(){
  trump = loadImage ('trump.png'); 
  kimjong = loadImage ('kimjong.png');
  nuclear = loadImage ('nuclear.png');
}
function setup() { 
  createCanvas(500, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 10; i++)
  {
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    circles.push(c);
  }
  
  slider = new Slider();
  
  
} 
function draw() { 
  noStroke();
	push();
  background(0);
  translate(250, 250);
  for(let i = 0; i < circles.length; i++)
  {
   	circles[i].show(); 
  }
  pop();
  push();
  slider.move();
  pop();
}
function mousePressed() {
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    slider.dragging = true;
    slider.offsetX = slider.x - mouseX;
  }
}
function mouseReleased() {
  slider.dragging = false;
}var circles=[];
function setup() { 
  createCanvas(400, 500);
  angleMode(DEGREES);
  for(let i = 1; i < 5; i++)
  {
    
    let direction = "right";
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    circles.push(c);
  }
  
  slider = new Slider();
  
  
} 
function draw() { 
	push();
  background(200);
  translate(200, 200);
  for(let i = 0; i < circles.length; i++)
  {
   	circles[i].show(); 
  }
  pop();
  push();
  slider.move();
  pop();
}
function mousePressed() {
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    slider.dragging = true;
    slider.offsetX = slider.x - mouseX;
  }
}
function mouseReleased() {
  slider.dragging = false;
}let bubbles = [];
let crazyLeaders = [];
function preload(){
  for (let i=0; i<2; i++){
    crazyLeaders[i] = loadImage ('images/crazy'+ i +'.png'); 
  }
}
function setup() { 
  createCanvas(400, 400);
  frameRate(3)
} 
function mousePressed(){
}
function draw() { 
  background(0);
	let randomX = floor(random (0, 200));
  let randomY = floor(random (0, 200));
  var r = floor(random(0, crazyLeaders.length));
  var b = new Bubble(randomX, randomY, crazyLeaders[r]);
  bubbles. push(b);
  for (let i =0; i< bubbles.length; i++){
    bubbles[i].move();
    bubbles[i].display();
  }
}
let bubbles = [];
let crazyLeaders = [];
let mouseWasPressed = false;
function preload(){
  for (let i=0; i<2; i++){
    crazyLeaders[i] = loadImage ('images/crazy'+ i +'.png'); 
  }
}
function setup() { 
  createCanvas(400, 400);
  background(0);
} 
function mousePressed(){
  var r = floor(random(0, crazyLeaders.length));
  var b = new Bubble(mouseX, mouseY, crazyLeaders[r]);
  bubbles. push(b);
  mouseWasPressed = true;
    background(0);
}
function draw() { 
  if (mouseWasPressed === true){
    for (let i = bubbles.length - 1; i>=0; i--){
    bubbles[i]. update();
    bubbles[i].display();
    }
  }else{
		textSize(24);
    text("click me", width/2 - 50, height/2);
    fill(255);
  	}
  }
let bubbles = [];
let crazyLeaders = [];
function preload(){
  for (let i=0; i<2; i++){
    crazyLeaders[i] = loadImage ('
  crazyLeaders[0] = loadImage('images/trump.png');
  crazyLeaders[1] = loadImage('images/kimjong.png');
}
function setup() { 
  createCanvas(400, 400);
} 
function mousePressed(){
  var r = floor(random(0, crazyLeaders.length));
  var b = new Bubble(mouseX, mouseY, crazyLeaders[r]);
  bubbles. push(b);
}
function draw() { 
  background(220);
  for (let i = bubbles.length - 1; i>=0; i--){
    bubbles[i]. update();
    bubbles[i].display();
  }
}let bubbles = [];
let crazyLeaders = [];
function preload(){
  for (let i=0; i<2; i++){
    crazyLeaders[i] = loadImage ('
  crazyLeaders[0] = loadImage('images/trump.png');
  crazyLeaders[1] = loadImage('images/kimjong.png');
}
function setup() { 
  createCanvas(400, 400);
} 
function mousePressed(){
  var r = floor(random(0, crazyLeaders.length));
  var b = new Bubble(mouseX, mouseY, crazyLeaders[r]);
  bubbles. push(b);
}
function draw() { 
  background(220);
  for (let i = bubbles.length - 1; i>=0; i--){
    bubbles[i]. update();
    bubbles[i].display();
  }
}let bubbles = [];
let numBubbles = 400;
function setup() { 
  createCanvas(600, 400);
  for (let i = 0; i < numBubbles; i++){
    let x = random(width);
    let y = random(height);
    bubbles.push(new Bubble(x, y));
  }
}
function mousePressed(){
  for ( let i = 0; i < bubbles.length; i++){
    bubbles[i].clicked;
    console.log("
  }
}
function draw() { 
  background(0); 
  for (let i = 0; i < bubbles.length; i++){
	bubbles[i].move();
	bubbles[i].display();
  }
  
}
  let bubbles = [];
let numBubbles = 400;
function setup() { 
  createCanvas(600, 400);
  for (let i = 0; i < numBubbles; i++){
    let x = random(width);
    let y = random(height);
    bubbles.push(new Bubble(x, y));
  }
}
function mousePressed(){
  for ( let i = 0; i < bubbles.length; i++){
    bubbles[i].clicked;
    console.log("
  }
}
function draw() { 
  background(0); 
  for (let i = 0; i < bubbles.length; i++){
	bubbles[i].move();
	bubbles[i].display();
  }
  
}
  let bubbles = [];
let numBubbles = 400;
function setup() { 
  createCanvas(600, 400);
  for (let i = 0; i < numBubbles; i++){
    let x = random(width);
    let y = random(height);
    bubbles.push(new Bubble(x, y));
  }
}
function mousePressed(){
  for ( let i = 0; i < bubbles.length; i++){
    bubbles[i].clicked;
    console.log("
  }
}
function draw() { 
  background(0); 
  for (let i = 0; i < bubbles.length; i++){
	bubbles[i].move();
	bubbles[i].display();
  }
  
}
  
let bubble1;
let bubble2;
let trump;
let kimjong;
function preload() {
  trump = loadImage("trump.png"); 
  kimjong = loadImage("kimjong.png"); 
}
function setup() { 
  createCanvas(400, 400);
  bubble1 = new Bubble(200,200,40);
	bubble2 = new Bubble(400,200,20);
} 
function draw() { 
  background(0);
  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show();
}
class Bubble {
 constructor(x,y,r){
   this.x = x;
   this.y = y;
   this.r =r;
 }
	move(){
    this.x = this.x + random(-5,5);
    this.y = this.y + random (-5,5);
	}
  show(){
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r*2);
	}
}
let img
function setup() { 
  createCanvas(400, 400);
  img = loadImage('trump_lights.png');
} 
function draw() { 
  image(img,0,0);
}  let mouseIsClicked = false;
	let numTriangles = 0;
function setup() { 
  createCanvas(600, 600);
  r = 255;
  g = 255;
  b = 255;
} 
function draw() {
  background(0);
  translate(mouseX,mouseY);
  for(var i=0; i<100; i++){
  drawTriangle(i);
  }
}
function mousePressed() {
  if (mouseIsClicked == false){
    mouseIsClicked = true;
    r = random(255);
    g = random(255);
    b = random(255);
    console.log(mouseIsClicked);
  }
  else {
    mouseIsClicked = false;
    r = 255;
    g = 255;
    b = 255;
    console.log(mouseIsClicked);
  }
  }
function drawTriangle(escala){
  noFill();
  stroke(r,g,b);
  strokeWeight(1/escala);
  push();
  scale(escala);
  triangle(-30, 20, 0, -40, 30, 20);
  pop();
}
	let noClock = true;
  let showClockUS = false;
  let showClockBR = false;
  let showClockCH = false;
function setup() { 
  createCanvas(600,500);
	angleMode(DEGREES);
} 
function draw() { 
  
  background(0);
  if (showClockUS) {
	let hr = hour();
	let mn = minute();
	let sc = second();
  
	stroke(86,38,255);
	strokeWeight(8);
	noFill();
	let end1 = map(sc,0,60,-89,270);
	arc(300,200,320,320,270,end1);
	
	stroke(255,0,0);
	strokeWeight(8);
	noFill();
	let end2 = map(mn,0,60,-89,270);
	arc(300,200,290,290,270,end2);
	
	stroke(255);
	strokeWeight(8);
	noFill();
	let end3 = map(hr%12,0,12,-89,270);
	arc(300,200,260,260,270,end3);	
  }
  
 else if (showClockBR){
	let hr = hour() + 1;
	let mn = minute();
	let sc = second();
  
	stroke(0,119,51);
	strokeWeight(8);
	noFill();
	let end1 = map(sc,0,60,-89,270);
	arc(300,200,320,320,270,end1);
	
	stroke(255,217,51);
	strokeWeight(8);
	noFill();
	let end2 = map(mn,0,60,-89,360);
	arc(300,200,290,290,270,end2);
	
	stroke(66,66, 238);
	strokeWeight(8);
	noFill();
	let end3 = map(hr%12,0,12,-89,270);
	arc(300,200,260,260,270,end3);	
 }
  
  else if (showClockCH){
	let hr = hour() - 12;
	let mn = minute();
	let sc = second();
  
	stroke(255,0,0);
	strokeWeight(8);
	noFill();
	let end1 = map(sc,0,60,-89,270);
	arc(300,200,320,320,270,end1);
	
	stroke(255);
	strokeWeight(8);
	noFill();
	let end2 = map(mn,0,60,-89,270);
	arc(300,200,290,290,270,end2);
	
	stroke(255,217,51);
	strokeWeight(8);
	noFill();
	let end3 = map(hr%12,0,12,-89,270);
	arc(300,200,260,260,270,end3);	
  } else {
    background(0)
  } 
              
  
  
  noStroke();
  fill(255);
  ellipse (200, 430, 30, 30);
  fill(255);
  ellipse (300, 430, 30, 30);
  
  fill(255);
  ellipse (400, 430, 30, 30);
  
	}
  function mousePressed() {
  if (dist(mouseX, mouseY, 200, 430)< 30/2) {
    showClockBR = false;
    showClockCH = false;
  	showClockUS = !showClockUS
    console.log('us');
	}
  if (dist(mouseX, mouseY, 300, 430)< 30/2) {
    showClockUS = false;
    showClockCH = false;
  	showClockBR = !showClockBR;
        console.log('br');
	}
  if (dist(mouseX, mouseY, 400, 430)< 30/2) {
    showClockUS = false;
    showClockBR = false;
  	showClockCH = !showClockCH;
        console.log(showClockCH);
	}
}
  var bgColor = (47,50,193);
	var moonSize = 10;
	var stars = 40;
	var starsMax = 300;
  var gray0, gray1, gray2, gray3, gray4, gray5, gray6, gray7
  var randomStars = [];
  var start;
function setup() {
  createCanvas(390, 550); 
  gray0 = color(24);
  gray1 = color(32);
  gray2 = color(48);
  gray3 = color(80);
  gray4 = color(104);
  gray5 = color(128);
  gray6 = color(188);
  gray7 = color(195);
  start = second();
  
  for( var i=0; i<stars; i++) {
    var randomRadius = Math.random() * 5;
    randomStars.push([
      Math.random() * 390,
      Math.random() * starsMax,
      randomRadius,
      randomRadius
    ])
  }
  
}
function draw(){ 
  bgColor = map (mouseX,0, 390, 20, 200);
  background(bgColor);
  noStroke();
  
  var timeElapsed = millis() - start;
  
  for( var i=0; i<stars; i++) {
    noStroke();
    fill(255);
    var change = timeElapsed / 250;
    ellipse(randomStars[i][0], randomStars[i][1], randomStars[i][2], randomStars[i][3]);
  }
  
  
  fill(244, 194, 13)
  ellipse(mouseX, 60, 55, 55);
  stroke(24);
  line(194, 70, 195, 200); 
  noStroke();
  fill(194,24,7)
  currentTime = second() - start;
  if (currentTime % 2 == 0){
      ellipse(194,70,0,0);
  }
  else {
    ellipse(194,70,5,5);
  }
  
  
  fill(gray1);
  rect(0,130,50,300);
  fill(gray7);
  rect(120,200,20,300);
  fill(gray2);
  rect(20,200,100,300);
  fill(gray7);
  rect(260,150,70,300);
  fill(gray0);
  rect(192,110,6,300);
  fill(gray0);
  rect(192,110,6,300);
  fill(gray0);
  rect(189,120,12,300);
  fill(gray0);
  rect(179,130,32,300);
  fill(gray0);
  rect(176.5,135,37,300);
  fill(gray0);
  rect(172.5,145,45,300);
  fill(gray0);
  rect(165,150,60,300);
  fill(gray0);
  rect(165,150,60,300);
  fill(gray5);
  rect(220,280,35,300);
  fill(gray5);
  rect(220,280,35,300);
  fill(gray6);
  rect(180,280,40,300);
  fill(gray5);
  rect(10,220,50,300);
  fill(gray6);
  rect(60,220,25,300);
  fill(gray6);
  rect(70,260,30,300);
  fill(gray1);
  rect(160,350,30,300);
  fill(gray1);
  rect(100,300,60,300);
  fill(gray2);
  rect(300,230,60,300);
  fill(gray1);
  rect(320,260,60,300);
  fill(gray0);
  rect(355,250,60,300);
  fill(gray0);
  rect(315,350,60,120);
  fill(gray0);
  rect(255,370,60,120);
  fill(gray5);
  rect(265,425,25,120);
  fill(gray5);
  rect(255,435,10,120);
  fill(gray2);
  rect(230,400,25,120);
  fill(gray3);
  rect(200,400,30,120);
  fill(gray1);
  rect(180,440,40,120);
  fill(gray1);
  rect(180,420,20,120);
  fill(gray0);
  rect(120,400,60,120);
  fill(gray2);
  rect(110,400,40,120);
  fill(gray3);
  rect(110,370,60,120);
  fill(gray3);
  rect(110,350,23,130);
  fill(gray5);
  rect(80,350,30,100);
  fill(gray0);
  rect(120,380,60,150);
  fill(gray2);
  rect(0,280,70,400);
  fill(gray2);
  rect(0,280,70,400);
  fill(gray4);
  rect(30,415,70,140);
  fill(gray1);
  rect(60,280,20,400);
  fill(gray1);
  rect(0,350,30,200);
  fill(gray4);
  rect(30,415,70,140);
  fill(gray1);
  rect(0,350, 30,200);
  fill(gray2);
  rect(30,435,15,130);
  fill(gray3);
  rect(45,435,40,130);
  fill(gray2);
  rect(340,440,50,110);
  fill(gray1);
  rect(120,450,250,100);
  fill(gray6);
  rect(75,450,70,100);
  
}
function setup() {
  createCanvas(390, 550);
  gray0 = color(24);
  gray1 = color(32);
  gray2 = color(48);
  gray3 = color(80);
  gray4 = color(104);
  gray5 = color(128);
  gray6 = color(188);
  gray7 = color(195);
  
  buildings = [
    {
      color: gray7,
      size: [260,150,70,300],
    },
  ]
}
function draw() {
  background(47, 50, 193);
  stroke(24);
  line(194, 70, 195, 200);
  noStroke();
  ellipse(100, 60, 55, 55);
  
  fill(gray0);
  rect(192, 110, 6, 300);
  fill(gray0);
  rect(192, 110, 6, 300);
  fill(gray0);
  rect(189, 120, 12, 300);
  fill(gray0);
  rect(179, 130, 32, 300);
  fill(gray0);
  rect(176.5, 135, 37, 300);
  fill(gray0);
  rect(172.5, 145, 45, 300);
  fill(gray0);
  rect(165, 150, 60, 300);
  fill(gray0);
  rect(165, 150, 60, 300);
  for(var b = 0; b < buildings.length; b++) {
    console.log(buildings[b]);
    fill(buildings[b].color);
    rect.apply(buildings[b].size);
  }
  fill(gray1);
  rect(0, 130, 50, 300);
  fill(gray7);
  rect(120, 200, 20, 300);
  fill(gray2);
  rect(20, 200, 100, 300);
  fill(gray5);
  rect(220, 280, 35, 300);
  fill(gray5);
  rect(220, 280, 35, 300);
  fill(gray6);
  rect(180, 280, 40, 300);
  fill(gray5);
  rect(10, 220, 50, 300);
  fill(gray6);
  rect(60, 220, 25, 300);
  fill(gray6);
  rect(70, 260, 30, 300);
  fill(gray1);
  rect(160, 350, 30, 300);
  fill(gray1);
  rect(100, 300, 60, 300);
  fill(gray2);
  rect(300, 230, 60, 300);
  fill(gray1);
  rect(320, 260, 60, 300);
  fill(gray0);
  rect(355, 250, 60, 300);
  fill(gray0);
  rect(315, 350, 60, 120);
  fill(gray0);
  rect(255, 370, 60, 120);
  fill(gray5);
  rect(265, 425, 25, 120);
  fill(gray5);
  rect(255, 435, 10, 120);
  fill(gray2);
  rect(230, 400, 25, 120);
  fill(gray3);
  rect(200, 400, 30, 120);
  fill(gray1);
  rect(180, 440, 40, 120);
  fill(gray1);
  rect(180, 420, 20, 120);
  fill(gray0);
  rect(120, 400, 60, 120);
  fill(gray2);
  rect(110, 400, 40, 120);
  fill(gray3);
  rect(110, 370, 60, 120);
  fill(gray3);
  rect(110, 350, 23, 130);
  fill(gray5);
  rect(80, 350, 30, 100);
  fill(gray0);
  rect(120, 380, 60, 150);
  fill(gray2);
  rect(0, 280, 70, 400);
  fill(gray2);
  rect(0, 280, 70, 400);
  fill(gray4);
  rect(30, 415, 70, 140);
  fill(gray1);
  rect(60, 280, 20, 400);
  fill(gray1);
  rect(0, 350, 30, 200);
  fill(gray4);
  rect(30, 415, 70, 140);
  fill(gray1);
  rect(0, 350, 30, 200);
  fill(gray2);
  rect(30, 435, 15, 130);
  fill(gray3);
  rect(45, 435, 40, 130);
  fill(gray2);
  rect(340, 440, 50, 110);
  fill(gray1);
  rect(120, 450, 250, 100);
  fill(gray6);
  rect(75, 450, 70, 100);
}function setup() {
  createCanvas(390, 550);  
}
function draw(){ 
  background(47,50,193);
  stroke(24);
  line(194, 70, 195, 200); 
  noStroke();
  ellipse(100, 60, 55, 55);
  
  var gray0 = color(24);
  var gray1 = color(32);
  var gray2 = color(48);
  var gray3 = color(80);
  var gray4 = color(104);
  var gray5 = color(128);
  var gray6 = color(188);
  var gray7 = color(195);
  
  push();
  fill(gray1);
  rect(0,130,50,300);
  fill(gray7);
  rect(120,200,20,300);
  fill(gray2);
  rect(20,200,100,300);
  fill(gray7);
  rect(260,150,70,300);
  fill(gray0);
  rect(192,110,6,300);
  fill(gray0);
  rect(192,110,6,300);
  fill(gray0);
  rect(189,120,12,300);
  fill(gray0);
  rect(179,130,32,300);
  fill(gray0);
  rect(176.5,135,37,300);
  fill(gray0);
  rect(172.5,145,45,300);
  fill(gray0);
  rect(165,150,60,300);
  fill(gray0);
  rect(165,150,60,300);
  fill(gray5);
  rect(220,280,35,300);
  fill(gray5);
  rect(220,280,35,300);
  fill(gray6);
  rect(180,280,40,300);
  fill(gray5);
  rect(10,220,50,300);
  fill(gray6);
  rect(60,220,25,300);
  fill(gray6);
  rect(70,260,30,300);
  fill(gray1);
  rect(160,350,30,300);
  fill(gray1);
  rect(100,300,60,300);
  fill(gray2);
  rect(300,230,60,300);
  fill(gray1);
  rect(320,260,60,300);
  fill(gray0);
  rect(355,250,60,300);
  fill(gray0);
  rect(315,350,60,120);
  fill(gray0);
  rect(255,370,60,120);
  fill(gray5);
  rect(265,425,25,120);
  fill(gray5);
  rect(255,435,10,120);
  fill(gray2);
  rect(230,400,25,120);
  fill(gray3);
  rect(200,400,30,120);
  fill(gray1);
  rect(180,440,40,120);
  fill(gray1);
  rect(180,420,20,120);
  fill(gray0);
  rect(120,400,60,120);
  fill(gray2);
  rect(110,400,40,120);
  fill(gray3);
  rect(110,370,60,120);
  fill(gray3);
  rect(110,350,23,130);
  fill(gray5);
  rect(80,350,30,100);
  fill(gray0);
  rect(120,380,60,150);
  fill(gray2);
  rect(0,280,70,400);
  fill(gray2);
  rect(0,280,70,400);
  fill(gray4);
  rect(30,415,70,140);
  fill(gray1);
  rect(60,280,20,400);
  fill(gray1);
  rect(0,350,30,200);
  fill(gray4);
  rect(30,415,70,140);
  fill(gray1);
  rect(0,350, 30,200);
  fill(gray2);
  rect(30,435,15,130);
  fill(gray3);
  rect(45,435,40,130);
  fill(gray2);
  rect(340,440,50,110);
  fill(gray1);
  rect(120,450,250,100);
  fill(gray6);
  rect(75,450,70,100);
  
}