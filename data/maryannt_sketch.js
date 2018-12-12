function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
}let centerData;
const mappa = new Mappa('Leaflet');
let detaineeMap;
let canvas;
let centerLatlng;
let ppl = 10;
let data = [];
const options = {
  lat: 40.731156,
  lng: -90,
  zoom: 4,
  
}
function preload() {
  centerLatlng = loadTable('ERO_32_latlng3.csv', 'csv', 'header');
}
function setup() {
  canvas = createCanvas(800, 600);
  createElement('h1', '42,000 DETAINED PEOPLE')
  
  detaineeMap = mappa.tileMap(options);
  detaineeMap.overlay(canvas);
  let maxDets = 0;
  let minDets = Infinity;
  detaineeMap.onChange(drawDCenters);
}
function draw() {
  for (let i = 1; i < centerLatlng.getRowCount(); i++) {
    const latitude = Number(centerLatlng.getString(i, 'LATITUDE'));
    const longitude = Number(centerLatlng.getString(i, 'LONGITUDE'));
    if (detaineeMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      const pos = detaineeMap.latLngToPixel(latitude, longitude);
    }
  }
}
function drawDCenters() {
  clear();
  for (let i = 1; i < centerLatlng.getRowCount(); i++) {
    const latitude = Number(centerLatlng.getString(i, 'LATITUDE'));
    const longitude = Number(centerLatlng.getString(i, 'LONGITUDE'));
    const people = Number(centerLatlng.getString(i, 'POPULATION'));
    if (detaineeMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      const pos = detaineeMap.latLngToPixel(latitude, longitude);
      var from = color(218, 165, 32, 100);
      var to = color(220, 32, 32, 200);
      colorMode(RGB);
      var interA = lerpColor(from, to, 0.33);
      var interB = lerpColor(from, to, 0.66);
      textSize(15);
      fill(0);
      text('TIME DETAINED(DAYS)', 10, 480);
      textSize(15);
      fill(from);
      noStroke();
      rect(20, 500, 20, 50);
      text('>30', 10, 495);
      fill(interA);
      rect(60, 500, 20, 50);
      text('>60', 50, 495);
      fill(interB);
      rect(100, 500, 20, 50);
      text('>90', 90, 495);
      fill(to);
      rect(140, 500, 20, 50);
      text('>120', 130, 495);
      var ppl = Number(centerLatlng.getString(i, 'POPULATION'));
      var days = Number(centerLatlng.getString(i, 'DAYS'));
      var dotwidth = map(ppl, 30, 1500, 5, 40);
      var redness = map(days, 20, 400, from, to);
      fill(redness, 0, 50, 150);
      noStroke();
      ellipse(pos.x, pos.y, dotwidth, dotwidth);
      
      }
    }
  }
        
        
  
  
 
        
 
let state=1;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  if (state == 1){
  background(220);
    text("question?", 10, 10);
  } else if (state == 2){
  background(220);
  text("map", 10, 10);
  
  }
}
function mousePressed(){
  if (state == 1){
    state = 2;
  }
}var map;
var ppl = 20;
var cities = ["Adelanto", "Elizabeth", "Eloy"];
var detainees = [1716, 291, 1422];
var xPos = [120, 225, 170];
var yPos = [180, 180, 195];
function preload() {
  map = loadImage('map.png');
}
function setup() {
  createCanvas(800, 500);
}
function draw() {
  background(255);
  image(map, 0, 0, width, height);
  noStroke();
  fill(255, 0, 255);
  ellipse(xPos[0], yPos[0], ppl * 2, ppl * 2);
  fill(10, 100, 80);
  ellipse(xPos[1], yPos[1], ppl, ppl );
  fill(100, 200, 30);
  ellipse(xPos[2], yPos[2], ppl * 1.5, ppl * 1.5);
  
  
  if (mouseX > xPos[0] - 50 && mouseX < xPos[0] + 50 && mouseY > yPos[0] - 50 && mouseY < yPos[0] + 50) {
    fill(255, 220);
    rect(xPos[0], yPos[0], 200, 200);
    textSize(20);
    fill(0);
    text(cities[0], xPos[0], yPos[0] + 50);
    text(detainees[0], xPos[0], yPos[0] + 70);
    textSize(20);
    
  }
    
      if (mouseX > xPos[1] - 50 && mouseX < xPos[1] + 50 && mouseY > yPos[1] - 50 && mouseY < yPos[1] + 50) {
    fill(255, 220);
    rect(xPos[0], yPos[0], 200, 200);
    textSize(20);
    fill(0);
    text(cities[1], xPos[1], yPos[1] + 50);
    text(detainees[1], xPos[1], yPos[1] + 70);
    textSize(20);
  }
  
        if (mouseX > xPos[2] - 50 && mouseX < xPos[2] + 50 && mouseY > yPos[2] - 50 && mouseY < yPos[2] + 50) {
    fill(255, 220);
    rect(xPos[2], yPos[2], 200, 200);
    textSize(20);
    fill(0);
    text(cities[2], xPos[2], yPos[2] + 50);
    text(detainees[2], xPos[2], yPos[2] + 70);
    textSize(20);
  }
}
function popUpCali() {
  fill(255, 220);
  rect(50, 50, 200, 200);
  textSize(20);
  fill(0);
  text("1716 detained", 60, 80);
}
function popUpNJ() {
  fill(255, 220);
  rect(160, 170, 200, 200);
  textSize(20);
  fill(0);
  text("291 Detained", 186, 192);
  textSize(20);
}
function popUpTX() {
  fill(255, 220);
  rect(160, 170, 200, 200);
  textSize(20);
  fill(0);
  text("1422 Detained", 162, 189);
  textSize(20);
}let centerData;
const mappa = new Mappa('Leaflet');
let detaineeMap;
let canvas;
let centerLatlng;
let data = [];
const options = {
  lat: 40.731156,
  lng: -90,
  zoom: 4,
}
function preload() {
  centerLatlng = loadTable('ERO_32_latlng.csv', 'csv', 'header');
}
function setup() {
  canvas = createCanvas(800, 600);
  createElement('h1','42,000 DETAINED PEOPLE')
  detaineeMap = mappa.tileMap(options);
  detaineeMap.overlay(canvas);
  let maxDets = 0;
  let minDets = Infinity;
  detaineeMap.onChange(drawDCenters);
}
function draw() {
}
function drawDCenters() {
  clear();
  for (let i = 0; i < centerLatlng.getRowCount(); i++) {
    const latitude = Number(centerLatlng.getString(i, 'LATITUDE'));
    const longitude = Number(centerLatlng.getString(i, 'LONGITUDE'));
    
    if (detaineeMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      const pos = detaineeMap.latLngToPixel(latitude, longitude);
      var from = color(218, 165, 32);
      var to = color(220, 32, 32);
      colorMode(RGB);
      var interA = lerpColor(from, to, 0.33);
      var interB = lerpColor(from, to, 0.66);
      textSize(15);
      fill(0);
      text('Time Detained(days)', 10, 480);
      textSize(10);
      fill(from);
      noStroke();
      rect(10, 500, 20, 60);
      text('>30', 10, 495);
      fill(interA);
      rect(40, 500, 20, 60);
      text('>60', 40, 495);
      fill(interB);
      rect(70, 500, 20, 60);
      text('>90', 70, 495);
      fill(to);
      rect(100, 500, 20, 60);
      text('>120', 100, 495);
      
   
      noStroke();
      ellipse(pos.x, pos.y, 15, 15);
    }
  }
var myMap;
var canvas;
var mappa = new Mappa('Leaflet');
var options = {
  lat: 0,
  lng: 0,
  zoom: 4,
}
function setup(){
  canvas = createCanvas(640,640);
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);
  
  fill(200, 100, 100);
}
}
function draw(){
}
var word = "rainbow";
var url2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=YOURAPIKEY";
var link;
function setup() {
  noCanvas();
  link = createA('#', word);
  link.mousePressed(askWordnik);
}
function askWordnik() {
  loadJSON(url1 + word + url2, gotData);
  
}
  function gotData(data) {
    var index1 = floor(random(0, data.length));
     var index2 = floor(random(0, data[index1].words.length));
    word = data[index1].words[index2];
    link.html(word);
}
  
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
  var lon = data.iss_position.longitude;
  issX = map(lat, -40, -60, 0, width);
  issY = map(lon, 95, 115, 0, height)
}
function draw() {
  background(80);
  fill(255);
  ellipse(issX, issY, 24, 24);
  stroke(255);
  line(lineX, 0, lineX, height);
  lineX = lineX + 5;
  if (lineX > width) {
    lineX = 0;
  }
}
const mappa = new Mappa('Leaflet');
let trainMap;
function preload() {
  subscriberData = loadTable('subscribers_geo.csv', 'header');
}
function setup() {
  canvas = createCanvas(400, 400);
  trainMap = mappa.tileMap(0,0,4); 
  console.log();
  for (let row of subscriberData.rows) {
    let row = subscriberData.getRow(i);
    console.log(row.get('country_id'));
    console.log(row.get('subscribers'));
  }
}
var clat = 0;
var clon = 0;
var zoom = 1;
var earthquakes;
var lat = 49.2827;
var lon = -123.1207;
function preload() {
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
  createCanvas(1024, 512);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  var cx = mercX(clon);
  var cy = mercY(clat);
  for (var i = 0; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/, /);
    lat = data[1];
    lon = data[2];
    var mag = data[4];
    var d = map(mag, 0, magmax, 0, 180);
    
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
    mag = pow(10, mag);
    mag = sqrt(mag);
    
    var magmax = sqrt(pow(10,10));
    
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, d, d);
  }
}
var weather;
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';
var input;
function setup() {
  createCanvas(400, 200);
  var button = select('#submit');
  button.mousePressed(weatherAsk);
  input = select('#city');
}
function weatherAsk() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
}
function gotData(data) {
  weather = data;
}
function draw() {
  background(0);
  if (weather) {
    var temp = weather.main.temp;
    var humidity = weather.main.humidity;
    ellipse(100, 100, temp, temp);
    ellipse(300, 100, humidity, humidity);
  }
}
  
  
  
  
  
function setup() {
  createCanvas(600, 400);
   
}
function gotData(data) {
  weather = data;
}
function draw() {
  background(0);
  if (weather) {
    ellipse(100, 100, weather.main.temp, weather.main.temp);
    ellipse(300, 100, weather.main.humidity, weather.main.humidity);
  }
}
var spaceData;
function setup() {
  createCanvas(200, 200);
}
function gotData(data) {
  spaceData = data;
  }
function draw() {
   background(0);
  if (spaceData) {
    randomSeed(4);
  }  
    for (var i = 0; i < spaceData.number; i++) {
    fill(255);
    ellipse(random(width), random(height), 16, 16);
      
  }
  stroke(255);
  line(x, 0, x, height);
  x = x + 1;
  if (x > width) {
    x = 0; 
  }
 
}
  
    
function preload() {
  data = loadJSON("birds.json");
}
function setup() {
  noCanvas();
  var birds = data.birds;
  for (var i = 0; i < birds.length; i++) {
    createElement('h1', birds[i].family);
    
    var members = birds[i].members;
    for (var j = 0; j < members.length; j++) {
      createDiv(members[j]);
    }
  }
}
function preload() {
  flower = loadJSON("flower.json");
  
}
function setup() {
  createCanvas(400,400);
}
function draw() {
  background(0);
  
  fill(flower.r, flower.g, flower.b);
  text(flower.name, 10, 50);
}
  
var angle = 0;
function setup() {
 noCanvas();
  for (var i = 0; i < 100; i++) {
  sliders[i] = createSlider(0, 255, 50);
}
  sliders[0].input(adjustSliders);
}
function adjustSliders() {
  for (var i = 1; i < sliders.length; i++) {
  sliders[i].value(sliders[0].value()); 
 
}
}
  
 
function setup() {
  var canvas = createCanvas(200, 200);
  background(0);
  
  canvas.dragOver(highlight);
  canvas.dragLeave(unhighlight);
  canvas.drop(gotFile, unhighlight);
    
}
function gotFile(file) {
  createP(file.name + " " + file.size);
  var img = createImg(file.data);
  img.hide();
  
  image(img, 0, 0, 200, 200);
}
function highlight() {
  canvas.style('background-color', '#ccc');
  
}
function unhighlight() {
  canvas.style('background-color', '#fff');
  
}
function setup() {
  var canvas = createCanvas(200, 200);
  background(0);
  
  canvas.dragOver(highlight);
  canvas.dragLeave(unhighlight);
  canvas.drop(gotFile, unhighlight);
    
}
function gotFile(file) {
  createP(file.name + " " + file.size);
  var img = createImg(file.data);
  img.hide();
  
  image(img, 0, 0, 200, 200);
}
function highlight() {
  canvas.style('background-color', '#ccc');
  
}
function unhighlight() {
  canvas.style('background-color', '#fff');
  
}
var dropzone;
function setup() {
  createCanvas(200, 200);
  background(0);
  
  dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(gotFile, unhighlight);
    
}
function gotFile(file) {
  createP(file.name + " " + file.size);
  var img = createImg(file.data);
  img.size(100, 100);
}
function highlight() {
  dropzone.style('background-color', '#ccc');
  
}
function unhighlight() {
  dropzone.style('background-color', '#fff');
  
}
var p;
function setup() {
  noCanvas();
  for (var i = 0; i < 5; i++) {
    p = createP('This is a link:');
    p.style('background-color', '#CCC');
    p.style('padding', '24px');
    var a = createA('#', 'babies');
    a.mousePressed(addPhoto);
    a.parent(p);
  }
}
function addPhoto() {
  var img = createImg('baby.png');
  img.size(100, 100);
  img.parent(p);
}
function setup() {
  noCanvas();
  for (var i = 0; i < 5; i++) {
  var  p = createP('This is a link:');
    p.style('background-color', '#CCC');
    p.style('padding', '24px');
    var a = createA('#', 'babies');
    a.mousePressed(addPhoto);
    a.parent(p);
  }
  var button = select('#clear');
  button.mousePressed(clearStuff);
}
}
function clearStuff() {
  for (var i = 0; i < images.length; i++) {
    images[i].remove();
}
function addPhoto() {
  var img = createImg('baby.png');
  img.size(100, 100);
  images.push(img);
  
  var paragraph = this.parent();
  img.parent(this);
}
function setup() {
  noCanvas();
  
  var p = createP('This is a link:');
  p.style('background-color', '#CCC');
  p.style('padding', '24px');
  
  var a = createA('#', 'babies');
 
  a.mousePressed(addPhoto);
  
  a.parent(p);
  
}
function addPhoto() {
  var img = createImg('baby.png');
  img.size(100, 100);
  img.parent(p);
  
}
function setup() {
  for (var i = 0; i < 10; i++) {
    var p = createP('apples');
    var x = floor(random(windowWidth));
    var y = floor(random(windowHeight));
    p.position(x, y);
    p.class('apple');
  }
  for (var i = 0; i < 10; i++) {
     var p = createA('#, 'blueberries');
   
    var x = floor(random(windowWidth));
    var y = floor(random(windowHeight));
    p.position(x, y);
    p.class('blueberry');
    p.mousePressed(becomeApple);
  }
  function becomeApple() {
    console.log("this is happening");
    this.class('apple');
    this.removeClass('blueberry');
  }
  function draw() {
  }
}
var mapimg;
var clat = 0;
var clon = 0;
var ww = 1024;
var hh = 512;
var zoom = 3;
var earthquakes;
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
    if(x < - width/2) {
      x += width;
    } else if(x > width / 2) {
      x -= width;
    }
    mag = pow(10, mag);
    mag = sqrt(mag);
    var magmax = sqrt(pow(10, 10));
    var d = map(mag, 0, magmax, 0, 180);
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, d, d);
  }
}var map;
var ppl = 20;
function preload() {
  map = loadImage('map.png');
}
function setup() {
  createCanvas(800, 500);
}
function draw() {
  background(255);
  image(map,0,0, width,height);
  
  
  noStroke();
  fill(100,200,30);
  ellipse(208,219,ppl,ppl);
  
  ellipse(119,170,ppl*2,ppl*2);
  
  fill(10, 100, 80);
  ellipse(225,172,ppl*1.5,ppl*1.5);
  
  
  
  if ( mouseX > 190 && mouseX < 260 && mouseY > 140 && mouseY < 208) {
  popUpNJ();
}
  
    if ( mouseX > 70 && mouseX < 168 && mouseY > 127 && mouseY < 218) {
  popUpCali();
}
      if ( mouseX > 180 && mouseX < 230 && mouseY > 207 && mouseY < 241) {
  popUpFL();
}
}
function popUpCali( ) {
  fill(255,220);
  
  rect(50,50,200,200);
  textSize(20);
  
  fill(0);
  text("1716 detained",60,80);
  
  
}
function popUpNJ( ) {
  fill(255,220);
  
  rect(160,170,200,200);
  textSize(20);
  
  fill(0);
  text("291 Detained",186,192);
  textSize(20);
  
  
}
function popUpFL( ) {
  fill(255,220);
  
  rect(160,170,200,200);
  textSize(20);
  
  fill(0);
  text("661 Detained",185,211);
  textSize(20);
  
  
}
function popUpTX( ) {
  fill(255,220);
  
  rect(160,170,200,200);
  textSize(20);
  
  fill(0);
  text("1422 Detained",162,189);
  textSize(20);
  
  
}
function setup() {
  for (var i = 0; i < 10; i++) {
    var p = createP('apples');
    var x = floor(random(windowWidth));
    var y = floor(random(windowHeight));
    p.position(x, y);
    p.class('apple');
  }
  for (var i = 0; i < 10; i++) {
     var p = createA('#, 'blueberries');
   
    var x = floor(random(windowWidth));
    var y = floor(random(windowHeight));
    p.position(x, y);
    p.class('blueberry');
    p.mousePressed(becomeApple);
  }
  function becomeApple() {
    console.log("this is happening");
    this.class('apple');
    this.removeClass('blueberry');
  }
  function draw() {
  }
}
  createCanvas(600, 400);
}
function draw() {
  background(220);
}
function initMap() {
  console.log ("init");
  
  var uluru = {lat: -25.344, lng: 131.036};
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  var marker = new google.maps.Marker({position: uluru, map: map});
}
function setup() {
  createCanvas(800, 400);
}
function draw() {
  background(0);
}var paragraphs;
var paragraph;
function setup() {
  createCanvas(100, 100);
  background(0);
  paragraph = select('unicorn');
  for (var i =0; i< 100; i++)  {
    var par = createP('rainbow!');
    par.position(random(500), random(500));
  }
  
  
  paragraphs = selectAll('p');
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].mouseOver(highlight);
    paragraphs[i].mouseOut(unhighlight);
  }
}
function highlight() {
  this.style('padding', '16pt');
  this.style('background-color', '#F0F');
}
function unhighlight() {
  this.style('padding', '0pt');
  this.style('background-color', '#FFF');
}
var slider
var paragraph;
function setup() {
noCanvas();
  
  textbox = createInput('enter text');
  slider = createSlider(10, 64, 16);
  
  paragraph = createP('starting text');
  
  textbox.input(updateText);
  slider.input(updateSize);
  
}
function updateSize() {
  paragraph.style("font-size", slider.value() + "pt");
  
}
function updateText(){
  paragraph.html(textbox.value());
  
}
var textbox;
var slider
var paragraph;
function setup() {
noCanvas();
  
  textbox = createInput('enter text');
  slider = createSlider(10, 64, 16);
  
  paragraph = createP('starting text');
  
  textbox.input(updateText);
  slider.input(updateSize);
  
}
function updateSize() {
  paragraph.style("font-size", slider.value() + "pt");
  
}
function updateText(){
  paragraph.html(textbox.value());
  
}
var textbox;
var slider
var paragraph;
function setup() {
noCanvas();
  
  textbox = createInput('enter text');
  slider = createSlider(10, 64, 16);
  
  paragraph = createP('starting text');
  
  textbox.input(updateText);
  slider.input(updateSize);
  
}
function updateSize() {
  paragraph.style("font-size", slider.value() + "pt");
  
}
function updateText(){
  paragraph.html(textbox.value());
  
}
var bgcolor;
var button;
var txt;
function setup() {
  createCanvas(200, 200);
  bgcolor = color(100);
  txt = createP('some text');
  txt.mouseOver(changeStyle);
  txt.mouseOut(revertStyle);
  button = createButton("go");
}
function changeStyle() {
  txt.style("background-color", "pink");
  txt.style("padding", "24px");
}
function revertStyle() {
  txt.style("background-color", "purple");
  txt.style("padding", "8px");
}
function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  noStroke();
  ellipse(100, 100, 50, 50);
}var bgcolor;
var button;
var slider;
var nameInput;
var nameP;
function setup() {
  canvas = createCanvas(200, 200);
  canvas.mouseOver(overpara);
  canvas.mouseOut(outpara);
  canvas.mousePressed(changeColor);
  
  bgcolor = color(200);
  nameP = createP('Your Name!');
  button = createButton("go");
  button.mousePressed(changeColor);
  slider = createSlider(10, 100, 86);
  nameInput = createInput('type your name');
  nameP.mouseOver(overpara);
  nameP.mouseOut(outpara);
  
}
function updateText(){
  nameP.html(nameInput.value());
  
}
function overpara() {
  nameP.html('your mouse is over me!');
}
function outpara() {
  nameP.html('your mouse is out');
}
function changeColor() {
  bgcolor = color(random(255));
}
function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  noStroke();
  ellipse(100, 100, slider.value(), slider.value());
  text(nameInput.value(), 10, 20);
}var bgcolor;
var button;
var slider;
var nameInput;
var nameP;
function setup() {
  canvas = createCanvas(200, 200);
  canvas.mouseOver(overpara);
  canvas.mouseOut(outpara);
  canvas.mousePressed(changeColor);
  
  bgcolor = color(200);
  nameP = createP('Your Name!');
  button = createButton("go");
  button.mousePressed(changeColor);
  slider = createSlider(10, 100, 86);
  nameInput = createInput('type your name');
  nameP.mouseOver(overpara);
  nameP.mouseOut(outpara);
  
}
function updateText(){
  nameP.html(nameInput.value());
  
}
function overpara() {
  nameP.html('your mouse is over me!');
}
function outpara() {
  nameP.html('your mouse is out');
}
function changeColor() {
  bgcolor = color(random(255));
}
function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  ellipse(100, 100, slider.value(), slider.value());
  text(input.value(), 10, 20);
var bgcolor;
var button;
var slider;
var input;
var nameP;
function setup() {
  canvas = createCanvas(200, 200);
  bgcolor = color(200);
  button = createButton("go");
  button.mousePressed(changeColor);
  
  slider = createSlider(10, 100, 86);
  input = createInput('type your name');
  
}
function changeColor(){
 bgcolor = color(random(255));  
}
function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  ellipse(100, 100, slider.value(), slider.value());
  
var bgcolor;
var button;
function setup() {
  canvas = createCanvas(200, 200);
  bgcolor = color(200);
  button = createButton("go go go");
  button.mousePressed(changeColor);
}
function changeColor(){
 bgcolor = color(random(255));  
}
function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  rect(100, 100, 50, 50);
}let angry, crying, happy, heart, hug, poop, gif_loadSad, gif_sad;
function preload() {
  soundFormats('mp3');
  poopSong = loadSound('poop1.mp3');
  loveSong = loadSound('bestlove1.mp3');
  happySong = loadSound('happy1.mp3');
  cryingSong = loadSound('summertimesadness1.mp3');
  angrySong = loadSound('loseyourself1.mp3');
}
function setup() {
  angry = select('#angry');
  crying = select('#crying');
  happy = select('#happy');
  heart = select('#heart');
  poop = select('#poop');
  poop.mousePressed(function() {
    poopSong.play();
    cryingSong.stop();
    loveSong.stop();
    happySong.stop();
    angrySong.stop();
  });
  crying.mousePressed(function() {
    cryingSong.play();
    loveSong.stop();
    happySong.stop();
    angrySong.stop();
    poopSong.stop();
    gif_sad = createImg("lana.gif");
  });
  heart.mousePressed(function() {
    loveSong.play();
    happySong.stop();
    cryingSong.stop();
    angrySong.stop();
    poopSong.stop();
  });
  happy.mousePressed(function() {
    happySong.play();
    angrySong.stop();
    poopSong.stop();
    loveSong.stop();
    cryingSong.stop();
  });
  angry.mousePressed(function() {
    angrySong.play();
    poopSong.stop();
    happySong.stop();
    loveSong.stop();
    cryingSong.stop();
  });
  createCanvas(1000, 1000);
}
function draw() {
}var video;
var targetColor = [255, 0, 0];
var threshold;
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}
function draw() {
  background(220);
  image(video,0, 0);
  
  var worldRecord = 5000000;
  for(var y = 0; y < video.height; y++){
  for (var x = 0; x < video.width; x++) {
    var thisPixel = video.get(x,y);
    var diffBetweenColros = dist(thisPixel[0], thisPixel[1], thisPixel[2],
    if(thisPixel close to target pixel)
      
    
    
    
       
       }
  }
let bubbles = [];
let unicorn;
function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 50);
    bubbles[i] = new Bubble(x, y, r);
  }
  unicorn = new Bubble (400, 200, 10);
}
  function draw() {
    background(0);
  unicorn.x = mouseX;
    unicorn.y = mouseY;
    unicorn.show();
    unicorn.move();
    
    for (b of bubbles) {
      b.show();
      b.move();
      if (unicorn.intersects(b)) {
        
        
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
    intersects(other) {
      let d = dist(this.x, this.y, other.x, other.y);
      return (d < this.r + other.r);
    }
  }
    changeColor(bright) {
      this.brightness = bright;
      b.changeColor(100);
    } else { 
      b.changeColo(0);
    }
    contains(px, py) {
      let d = dist(px, py, this.x, this.y);
      if (d < this.r) {
        return true;
      } else {
        return false;
      }
    }
    move() {
      this.x = this.x + random(-2, 2);
      this.y = this.y + random(-2, 2);
    }
    show() {
      stroke(255);
      strokeWeight(4);
      fill(this.brightness, 125);
      ellipse(this.x, this.y, this.r * 2);
    }
  }let bubble1;
let bubble2;
function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble(200, 200);
  bubble2 = new Bubble(400, 200, 100);
}
function draw() {
  background(0);
  if (bubble1.intersects(bubble2)) {
    background(200, 0, 100);
  }
  bubble1.show();
  bubble2.show();
  bubble1.move();
  bubble2.x = mouseX;
  bubble2.y = mouseY;
}
class Bubble {
  constructor(x, y, r = 50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }
  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return (d < this.r + other.r);
  }
  changeColor(bright) {
    this.brightness = bright;
  }
  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }
  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }
  show() {
    stroke(255);
    strokeWeight(4);
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r * 2);
  }
}let bubbles = [];
function setup() {
  createCanvas(600, 400);
}
function mouseDragged() {
  let r = random (10, 50);
  let b = new Bubble (mouseX, mouseY, r);
  bubbles.push(b);
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
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    stroke(255);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}var words = ["love", "friend", "adventure", "laugh"];
function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(0);
  
  for (var i = 0; i < 4; i++) {
    stroke(255);
    text (200, 300, words [i]);
  }
}var forestImage;
var images = [];
var eggs = [];
var cracked;
function preload() {
  forestImage = loadImage('assets/forest.png');
  images.push(loadImage('assets/dog.png'));
  images.push(loadImage('assets/bear.png'));
  images.push(loadImage('assets/raccoon.png'));
  soundFormats('wav');
  eggCrack = loadSound('assets/eggcrack.wav');
}
function setup() {
  createCanvas(600, 400);
    eggs.push(new Egg(random(0, 200), random(0, 300), images[wichAnimal]));
  }
}
function draw() {
  background(forestImage);
  for (var i = 0; i < 5; i++) {
    eggs[i].checkForCrack();
    eggs[i].display();
  }
}
class Egg {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img
    this.cracked = false;
  }
  checkForCrack() {
    if (mouseIsPressed && dist(this.x, this.y, mouseX, mouseY) < 100) {
      if (this.cracked == false) {
        eggCrack.play();
      }
      this.cracked = true;
    }
  }
  display() {
 
    if (this.y < height - this.img.height) {
      this.x = this.x + 1;
      this.y = this.y + 1;
    }
    if (this.cracked) {
      image(this.img, this.x, this.y);
    } else {
      stroke(200, 30, 50);
      strokeWeight(5);
      fill(255, 0, 180);
      ellipse(this.x, this.y, 100, 120);
    }
  }
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
  
}var myButton;
function setup() {
  createCanvas(400, 400);
  myButton = createButton("Press");
  myButton.position(100, 100);
  myButton.mousePressed(HeHitMe);
  
}
function draw() {
}
function HeHitMe() {
  fill(255, 0, 200);
  ellipse(random(width), random(height), 20, 20);
}
var forestImage;
      
var Eggs = [];
var egg;
function display() {
  stroke (240, 0, 220);
  strokeWeight(3);
  fill (0, 200, 100);
  ellipse(this.x, this.y, 250, 270);
}
function preload() {
  forestImage = loadImage('assets/forest.png');
  dogImage = loadImage('assets/dog.png');
  bearImage = loadImage('assets/bear.png');
  soundFormats('wav');
  eggCrack = loadSound('assets/eggcrack.wav');
  
}
function setup() {
  createCanvas(600, 400);
   background(forestImage);
  
}
function draw() {
  display(egg);
 
}
class Eggs() {
	constructor(x,y) {
		this.x = 200;
		this.y = 100;
  
  }
}
  
  eggDrop(){
    ellipse
    this.x = this.x + 10;
    this.y = this.y + 5;
    if(this.x > width || this.y < 0){let bubbles = [];
function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 10; i++) {
    let x = 10 + 30 * i; 
    
    bubbles[i] = new Bubble(x, 200, 40);
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
    this.x = random(width);
    this.y = random (height);
    this.r = random (10, 100);
  }
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    stroke(255);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}let nums = [100, 25, 46, 72];
function setup() {
  createCanvas(500, 400);
}
function draw() {
  background(0);
  for (var i = 0; i < 4; i++) {
    ellipse ( i * 100 + 100, 200, nums[i], nums[i]);
    
    
  }
}let words = ["rainbow", "heart", "purple", "friendship", "love"];
let index = 0;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
  fill(255);
  textSize(32);
  text(words[index], 12, 200);
}
function mousePressed() {
  index = index + 1;
  if (index == words.length) {
    index = 0;
  }
}let nums = [100, 25, 46, 72];
            
let num = 23;
            
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
  ellipse(100, 200, num, num);
  
  ellipse (200, 200, nums[2], nums[2]);
   
  }let bubble1;
let bubble2;
function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble(200, 200, 40);
   bubble2 = new Bubble(400, 200, 20);
}
function draw() {
  background(0);
  bubble1.move();
  bubble1.show();
    bubble2.move();
  bubble2.show();
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
      stroke(255);
      strokeWeight(4);
      noFill();
      ellipse(this.x, this.y, this.r * 2);
    }
  }let bubble1;
let bubble2;
function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble();
   bubble2 = new Bubble();
}
function draw() {
  background(0);
  bubble1.move();
  bubble1.show();
    bubble2.move();
  bubble2.show();
}
class Bubble {
  constructor() {
    this.x = 200;
    this.y = 150;
  }
    move() {
      this.x, this.y + random(-5, 5);
      this.x, this.y + random(-5, 5);
    }
  
    show() {
      stroke(255);
      strokeWeight(4);
      noFill();
      ellipse(this.x, this.y, 24, 24);
    }
  }function setup() {
var i, x, y;
  for ( i = 0; i < 100; i++) {
}
  
   x = mouseX + 100;
  if (x > 50) {
     y = 20;
    ellipse(x, y, 100, 100);
  }
}
var bluefishImage; 
var sharkImage;
var fish;
var shark;
function preload() {
  bluefishImage = loadImage('bluefish.png');
  sharkImage = loadImage('shark.png');
}
function setup() {
  createCanvas(1000, 800);
  deepblue = background(0, 50, 200);
  teal = background(0, 150, 180)
  bluegreen = background(0, 100, 140);
  frameRate(30);
  xtime = 1;
  GREEN = 50;
  
  fish = new Fish (bluefishImage, 400, 300, .5);
  
  shark = new Fish(sharkImage, 200, 100, 1);
}
class Fish {
  constructor (fishImage, posX, posY, fishspeed) {
    this.img = fishImage;
    this.x = posX;
    this.y = posY;
    this.speed = fishspeed;
  }
  moveFish() {
   this.x = this.x + this.speed;
    image(this.img, this.x, this.y);
}
changeDirection() {
  if (this.x > 450) {
    this.speed = -.5
  } else if (this.x < 350) {
    this.speed = .5
  }
}
runAway() {
  if (dist(this.x, this.y, mouseX, mouseY) < 60) {
    this.x = this.x + 5;
  }
}
}
function draw() {
  background(0, 50, 200);
   xtime++
  if (xtime > 0 && xtime <= 90) {
    background(0, 50, 200)
  } else if (xtime > 90 && xtime <= 180) {
    background(0, 100, 100)
  } else if (xtime > 180 && xtime <= 270) {
    background(0, 50, 200)
  } else {
    xtime = 1;
  }
  noFill();
  strokeWeight(50)
  stroke(0, 200, 50);
  stroke(0, 200, 50);
  bezier(300, 250, 35, 220, 350, 500, 180, 999);
  bezier(590, 150, 424, 254, 673, 487, 512, 999);
  bezier(800, 150, 450, 254, 673, 487, 512, 999);
  bezier(950, 150, 600, 254, 900, 487, 500, 999);
  fill(139, 90, 40);
  noStroke();
  ellipse(200, 800, 800, 100);
  ellipse(800, 800, 800, 100);
  
  fish.moveFish();
  fish.changeDirection();
  fish.runAway();
  
}
  
  
  
var fish;
class Fish {
  constructor () {
    this.img = bluefish;
    this.x = 400;
    this.y = 300;
    this.speed = .5
  }
  moveFish() {
  this.x = this.x + this.speed;
    image(this.img, this.x, this.y);
}
changeDirection() {
  if (this.x > 450) {
    this.speed = -.5
  } else if (this.x < 350) {
    this.speed = .5
  }
}
runAway() {
  if (dist(this.x, this.y, mouseX, mouseY) < 60) {
    this.x = this.x + 5;
  }
}
}
function setup() {
  createCanvas(1000, 800);
  deepblue = background(0, 50, 200);
  teal = background(0, 150, 180)
  bluegreen = background(0, 100, 140);
  frameRate(30);
  xtime = 1;
  GREEN = 50;
  image(bluefish, this.x, this.y);
  
  fish = new Fish ()
}
var bluefish; 
function preload() {
  bluefish = loadImage('bluefish.png');
}
function draw() {
  background(0, 50, 200);
   xtime++
  if (xtime > 0 && xtime <= 90) {
    background(0, 50, 200)
  } else if (xtime > 90 && xtime <= 180) {
    background(0, 100, 100)
  } else if (xtime > 180 && xtime <= 270) {
    background(0, 50, 200)
  } else {
    xtime = 1;
  }
  noFill();
  strokeWeight(50)
  stroke(0, 200, 50);
  stroke(0, 200, 50);
  bezier(300, 250, 35, 220, 350, 500, 180, 999);
  bezier(590, 150, 424, 254, 673, 487, 512, 999);
  bezier(800, 150, 450, 254, 673, 487, 512, 999);
  bezier(950, 150, 600, 254, 900, 487, 500, 999);
  fill(139, 90, 40);
  noStroke();
  ellipse(200, 800, 800, 100);
  ellipse(800, 800, 800, 100);
  
  
  fish.moveFish();
 fish.changeDirection();
  fish.runAway();
  console.log(xtime);
}
  
  
  
var myFishes = [];
function setup() {
  createCanvas(600, 400);
  for(var i = 0; i < 100; i++) {
  myFishes.push (new Fish(i*20, i*20));
  }
}
function draw() {
  background(0);
  for (var i = 0; i < 100; i++) {
  myFishes[i].swim();
 
  } 
}
function mousePressed(){
    for (var i = 0; i < 100; i++) {
  if (myFishes[i].amINear(); < 10){
    }
}
 }
class Circle {
  
constructor(){
    this.radius = random(30);
    this.x = random(width);
    this.y = random(height);
    
  }
    
 displayIt(){
   ellipse (this.x, this.y, this.radius, this.radius);
   this.x += random (-2,2);
   this.y += random (-2,2);
     
 }
  
}var myCircles = [];
function setup() {
  createCanvas(600, 400);
  for(var i = 0; i < 1000; i++) {
  myCircles.push (new Circle());
  }
}
function draw() {
  background(0);
  for (var i = 0; i < 400; i++) {
  myCircles[i].displayIt();
 
  } 
}
class Circle {
  
constructor(){
    this.radius = random(30);
    this.x = random(width);
    this.y = random(height);
    
  }
    
 displayIt(){
   ellipse (this.x, this.y, this.radius, this.radius);
   this.x += random (-2,2);
   this.y += random (-2,2);
     
 }
  
class Fish {
  constructor () {
    this.img = bluefish;
    this.x random(800);
    this.y random(800);
  }
	
}
var bluefish;
}
var x = 0;
var xtime;
let fish1 = {
  x: 400,
  y: 300,
  speed: .5
}
function preload() {
  bluefish = loadImage('Assets/Fish/bluefish.png');
}
function setup() {
  createCanvas(1000, 800);
  deepblue = background(0, 50, 200);
  teal = (0, 150, 180)
  bluegreen = (0, 100, 140);
  frameRate(30);
  xtime = 1;
  GREEN = 50;
  
}
function draw() {
  background(0, 50, 200);
  
  xtime++
  noFill();
  strokeWeight(50)
  stroke(0, 200, 50);
  stroke(0, 200, 50);
  bezier(300, 250, 35, 220, 350, 500, 180, 999);
  bezier(590, 150, 424, 254, 673, 487, 512, 999);
  bezier(800, 150, 450, 254, 673, 487, 512, 999);
  bezier(950, 150, 600, 254, 900, 487, 500, 999);
  fill(139, 90, 40);
  noStroke();
  ellipse(200, 800, 800, 100);
  ellipse(800, 800, 800, 100);
  fill(255, 0, 200)
  image(bluefish, fish1.x, fish1.y)
  moveFish();
  changeDirection();
  runAway();
  fill(255, 0, 0)
  image(shark, mouseX, mouseY);
  console.log(xtime);
}
function moveFish() {
  fish1.x = fish1.x + fish1.speed;
}
function changeDirection() {
  if (fish1.x > 450) {
    fish1.speed = -.5
  } else if (fish1.x < 350) {
    fish1.speed = .5
  }
}
function runAway() {
  if (dist(fish1.x, fish1.y, mouseX, mouseY) < 60) {
    fish1.x = fish1.x + 5;
  }
function setup() {
  createCanvas(1000, 500);
}
function draw() {
  background(0);
}var bubble = {
	x: 300,
	y:200, 
	display: function () {
	strokeWeight(4);
	stroke(255);
	noFill();
	ellipse(this.x, this.y, 24, 24);
		
},
	move: function() {
	this.x = this.x + random(-1,1);
	this.y = this.y + random(-1,1);
	}
	
	var bubble2 = {
	x: 400,
	y:100, 
	display: function () {
	strokeWeight(4);
	stroke(255);
	fill (255, 0, 200);
	ellipse(this.x, this.y, 30, 30);
},
	move: function() {
	this.x = this.x + random(-1,1);
	this.y = this.y + random(-1,1);
	}
}
function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(0);
	bubble.move();
	bubble.display();
	
	bubble2.move();
	bubble2.display();
	
}
	function setup() {
	
	var km = milesToKm (26.3);
	var km2 = milesToKm(100);
	
function milesToKm(miles) {
	var km = miles * 1.6;
	return km; 
	
}
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
  strokeWeight(4);
  stroke(255);
  fill(255, 0, 200);
  ellipse(ball.x, ball.y, 24, 24);
}function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(0);
  strokeWeight(2);
  stroke(255);
for (var x = 0; x <= width; x += 50) {
    fill(random(255), 0, random(255));
    ellipse(x, 200, 25, 25);
  
   for (var y = 0; y <= height; y += 50) {
    fill(random(255), 0, random(255));
    ellipse(200, y, 25, 25);
 }
}
function setup() {
  createCanvas(400, 400);
   rectMode(CENTER);
 
}
function draw() {
  background(0);
  strokeWeight(2);
  stroke(255);
  fill(255,0,0);
  rect(200,200,width/2,height/2);
  
function setup() {
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
  speed = 1;
}
function draw() {
  background(0);
  fill(255, 0, 200);
  ellipseMode(CENTER);
  ellipse(x, y , 100, 100);
  x = x + 1;
  
  
  
  
  
}function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
}
function draw() {
  background(0);
  strokeWeight(2);
  stroke(255);
  fill(255,0,0);
  
  beginShape(QUADS);
vertex(width/4, height/4);
vertex(width/4, height*3/4);
vertex(width*3/4,height*3/4);
vertex(width*3/4,height/4);
endShape();
  
}function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(0);
  stroke(200);
  strokeWeight(4);
  noFill();
  if (mouseX > 300) {
    fill(255, 0, 200);
    ellipse(300, 200, 100, 100);
  } else if (mouseX > 150); {
    line(0, 0, width, height);
  } else if (mouseX > 350); {
  rect(300, 200, 25, 25);
  } else { 
  point(100, 100);
}
}var slider;
var x = 0;
var y = 0;
function setup() {
  createCanvas(600, 400);
  slider =  createSlider(0, 100, 50, 1);
  slider.position(20,20);
 slider.changed(ICantBelieveYouAlteredIt);
}
function draw() {
  background(220);
}
  function ICantBelieveYouAlteredIt (){
}function setup() {
    createCanvas(800, 400);
    color = createSlider(0, 255, 0, 20);
  }
  function draw() {
    clr = color.value();
    background(clr, 200);
    fill(128, 30, 100);
    ellipse(100, 200);
  }function setup() {
  createCanvas(400, 400);
  var km = milesToKM(26.3)
  var km2 = milesToKm(100);
}
function milesToKm(miles) {
  var km = miles * 1.6;
  return km;
}
function draw() {
  background(220);
}
	createCanvas(600, 400);
}
function draw() {
	background(0);
	strokeWeight(4);
	stroke(255);
	var x = 0
	while ( x <= width) {
	fill(0, 200, 255);
	ellipse (x, 100, 25, 25);
	x = x +50;
	}
	for (var x = 0; x <= width; x = x + 50) {
		fill(255, 0, 200);
		ellipse (x, 300, 25, 25);
	}
	
}function setup() {
	createCanvas(600, 400);
}
function draw() {
	background(0);
	strokeWeight(4);
	stroke(255);
	var x = 0
	while ( x <= width) {
		
	ellipse (x, 200, 25, 25);
	x = x +50;
	}
	
}var on = false;
function setup() {
	createCanvas(600, 400);
}
function draw() {
	if (on) {
		background(2, 255, 0);
	} else {
		background(0);
	}
	stroke(255)
	strokeWeight(4);
	noFill();
		if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
		fill(255, 0, 200);
			}
	rectMode(CENTER);
	rect(300, 200, 100, 100);
}
function mousePressed() {
	if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250)
		on = !on;
	
}var on = false;
function setup() {
	createCanvas(600, 400);
}
function draw() {
	if (on) {
		background(2, 255, 0);
	} else {
		background(0);
	}
	stroke(255)
	strokeWeight(4);
	noFill();
	rectMode(CENTER);
	rect(300, 200, 100, 100);
}
function mousePressed() {
	if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250)
		if (on) {
			on = false;
		} else {
			on = true;
		}
}
	createCanvas(600, 400);
}
function draw() {
	background(0);
	
stroke(255)
	strokeWeight(4);
	noFill();
	if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
			if (mouseIsPressed) {
		background(0, 255, 0);
	}
		fill(255, 0, 200);
	}
	rectMode(CENTER);
	rect(300, 200, 100, 100);
}function setup() {
	createCanvas(600, 400);
}
function draw() {
	background(0);
	stroke(255)
	strokeWeight(4);
	noFill();
	if (mouseX > 300 && mouseX < 400) {
		fill (255, 0, 200);
	}
	rect(300, 200, 100, 100);
}function setup() {
	createCanvas(600, 400);
}
function draw() {
	background(0);
	stroke(255)
	strokeWeight(4);
	noFill();
	if (mouseX > 250) {
		ellipse(300, 200, 100, 100);
			} else if (mouseX > 150) {
				rect(300, 200, 100, 100);
					} else if (mouseX > 50) {
						line(0,0, width, height);
	} else { 
		point(300, 200);
	}
} var x = 0;
 var speed = 3
function setup() {
	createCanvas(600, 400);
}
function draw() {
	background(0);
stroke(255)
	strokeWeight(4);
	noFill();
	ellipse(x, 200,100,100);
	if ( x > width || x < 0) {
	speed = speed * -1;
	}
	x = x + speed;
function setup() {
	createCanvas(600, 400);
}
function draw() {
	background(0);
	stroke(255)
	strokeWeight(4);
	noFill();
if (mouseX > 300) {
	fill(255, 0, 200);
}
	ellipse(300, 200,100,100);
}var spot = {
  x:100,
  y: 50,
};
var col = {
  r: 255,
  g: 0,
  b: 0
}
function setup() {
  createCanvas(600, 400);
  background(0);
}
function draw() {
  col.r = random(100, 255);
  col.g = 0;
  col.b = random(100, 190);
  spot.x = random(0,width);
  spot.y = random(0, height);
  noStroke();
  fill(col.r, col.g, col.b, 100);
  ellipse(spot.x, spot.y, 24, 24);
}var mouseX
var mouseY
var col = 0;
var r = 0;
var b = 255;
var g = 255
function setup() {
  createCanvas(600, 400);
}
function draw() {
  r = map(mouseX, 0, 600, 0, 255);
  b = map(mouseX, 0, 600, 255, 0);
  background(r, 0, b);
 
  fill(g, 0, b);
  g = map(mouseY, 0, 400, 0, 255)
  ellipse(mouseX, mouseY, 64, 64)
var circle1 = {
  x: 0,
  y: 200,
  diameter: 50
};
var circle2 = {
  x: 200,
  y: 50,
  diameter: 70
};
var r = 218;
var g = 160;
var b = 221;
function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(r, g, b);
  fill(250, 200, 200);
  ellipse(circle1.x, circle1.y, circle1.diameter, circle1.diameter);
  circle1.x = circle1.x + 1;
  
  fill(200, 250, 200);
  ellipse(circle2.x, circle2.y, circle2.diameter, circle2.diameter);
  circle2.y = circle2.y + 1;
}var deepblue;
var teal
var bluegreen
var x = 0;
var xtime;
let fish1 = {
  x: 400,
  y: 300,
  speed: .5
}
function setup() {
  createCanvas(1000, 800);
  deepblue = background(0, 50, 200);
  teal = (0, 150, 180)
  bluegreen = (0, 100, 140);
  frameRate(30);
  xtime = 1;
  GREEN = 50;
}
function draw() {
  background(0, 50, 200);
  xtime++
  if (xtime > 0 && xtime <= 90) {
    background(0, 150, 180)
  } else if (xtime > 90 && xtime <= 180) {
    background(0, 100, 100)
  } else if (xtime > 180 && xtime <= 270) {
    background(0, 50, 200)
  } else {
    xtime = 1;
  }
  noFill();
  strokeWeight(50)
  stroke(0, 200, 50);
  stroke(0, 200, 50);
  bezier(300, 250, 35, 220, 350, 500, 180, 999);
  bezier(590, 150, 424, 254, 673, 487, 512, 999);
  bezier(800, 150, 450, 254, 673, 487, 512, 999);
  bezier(950, 150, 600, 254, 900, 487, 500, 999);
  fill(139, 90, 40);
  noStroke();
  ellipse(200, 800, 800, 100);
  ellipse(800, 800, 800, 100);
  fill(255, 0, 200)
  ellipse(fish1.x, fish1.y, 50, 50)
  moveFish();
  changeDirection();
  runAway();
  fill(255, 0, 0)
  ellipse(mouseX, mouseY, 50, 50)
  console.log(xtime);
}
function moveFish() {
  fish1.x = fish1.x + fish1.speed;
}
function changeDirection() {
  if (fish1.x > 450) {
    fish1.speed = -.5
  } else if (fish1.x < 350) {
    fish1.speed = .5
  }
}
function runAway() {
  if (dist(fish1.x, fish1.y, mouseX, mouseY) < 60) {
    fish1.x = fish1.x + 5;
  }
}var 
function setup() {
  createCanvas(600, 400);
   background(250, 250, 100);
}
function draw() {
 
  noStroke();
  fill(250, 200, 250, 50)
  ellipse(mouseX, mouseY, 25, 25);
} 
  function mousePressed(){
 background(250, 250, 100);
}function setup() {
  createCanvas(600, 400);
   background(250, 250, 100);
}
function draw() {
 
  noStroke();
  fill(250, 200, 250, 50)
  ellipse(mouseX, mouseY, 25, 25);
} 
  function mousePressed(){
 background(250, 250, 100);
}var x;
var y;
var directionX;
var directionY;
var speed;
function setup() {
	createCanvas(400, 400);
	x = width / 2
	y = 100;
	directionX = 1;
	directionY = 1;
	speed = 1;
	rectMode(CENTER);
}
function draw() {
	background(220);
	
	x = x + directionX * speed;
	if (x >= width) {
		directionX = -1;
	}
	if (x <= 0) {
		directionX = 1;
	}
	y = y + directionY * speed;
	if (y >= height) {
		directionY = -1;
	}
	if (y <= 0) {
		directionY = 1;
	}
	if (x >0 && x < 100 && y >0, y <100) {
		fill(255);
	} else {
		fill(0, 225, 0);
		}
		for( var i = 0; i < width; i = i + 150){
			if (x > i && x < i+10 && y > i && y < i+10) {
			}
	rect(i,i, 10, 10);
		}
	fill(255, 10, 20);
	ellipse(x, y, 20, 20);
	}var x;
var y;
var directionX;
var directionY;
var speed;
function setup() {
	createCanvas(400, 400);
	x = width / 2
	y = height/2
	directionX = 1;
	directionY = 1;
	speed = 10;
}
function draw() {
	background(220);
	ellipse(x, y, 20, 20);
	x = x + directionX*speed;
	if (x >= 400) {
		directionX = -1;
		speed++;
	}
		if (x <= 0) {
			directionX = 1;
			speed++;
		}
	
		y = y + directionY*speed;
		if (y >= 400) {
		directionY = -1;
		speed++;
	}
		if (y <= 0) {
			directionY = 1;
			speed++;
		}
	}var x;
var y;
var directionX;
var directionY;
var speed;
function setup() {
	createCanvas(400, 400);
	x = width / 2
	y = height/2
	directionX = 1;
	directionY = 1;
	speed = 10;
}
function draw() {
	background(220);
	ellipse(x, y, 20, 20);
	x = x + directionX*speed;
	if (x >= 400) {
		directionX = -1;
		speed++;
	}
		if (x <= 0) {
			directionX = 1;
			speed++;
		}
	
		y = y + directionY*speed;
		if (y >= 400) {
		directionY = -1;
		speed++;
	}
		if (y <= 0) {
			directionY = 1;
			speed++;
		}
	}var deepblue;
var teal
var bluegreen
function setup() {
  createCanvas(1000, 800);
  deepblue = background(0, 50, 200);
  teal = (0, 150, 180)
  bluegreen = (0, 100, 100);
  frameRate(30);
  xtime = 1
}
function draw() {
  background(0, 50, 200);
  xtime++
  if (xtime > 0 && xtime <= 90) {
    background(0, 150, 180)
  } else if (xtime > 90 && xtime <= 180) {
    background(0, 100, 100)
  } else if (xtime > 180 && xtime <= 270) {
    background(0, 50, 200)
} else {
  xtime = 1;
}
noFill();
strokeWeight(50)
stroke(0, 200, 50);
stroke(0, 200, 50);
bezier(300, 250, 35, 220, 350, 500, 180, 999);
  
console.log(xtime);  
}function setup() {
	createCanvas(900, 700);
	background(200);
}
function mousePressed() {
}
function draw() {
	beginShape();
	vertex(180, 82);
	vertex(207, 36);
	vertex(214, 63);
	vertex(407, 11)
	vertex(412, 30);
	vertex(219, 82);
	vertex(226, 109);
	endShape(CLOSE);
}let positionX;
function setup() {
	createCanvas(400, 400);
	background(200, 10, 100);
	positionX = 50;
}
function draw() {
	fill(0, 100, 100, 60);
	ellipse(positionX, 100, 20, 20);
	positionX = positionX + 20
function mousePressed() {
saveFrames('out', "jpg")
}
}let xLocOfCircle;
function setup() {
	createCanvas(400, 400);
	background(200, 20, 150);
	xLocOfCircle = 100;
}
function draw() {
	ellipse(100, 100, xLocOfCircle, xLocOfCircle);
	xLocOfCircle -= random(-10,10);
}let x_loc_of_circle
function setup() {
createCanvas(400,400);
}
function draw() {
ellipse(mouseX, 100,20,20);
}
function setup() {
	createCanvas(400, 400);
	background(200, 10, 100);
}
function draw() {
	fill(0, 100, 100, 60);
	ellipse(mouseX, mouseY, mouseX, mouseY);
function mousePressed() {
saveFrames('out', "jpg")
}
function setup() {
	createCanvas(800, 500);
}
function draw() {
	background(255, 255, 255);
	fill(20, 0, 100);
	stroke(255, 255, 255);
	noStroke();
	rect(150, 100, 300, 200);
	fill(150, 0, 15);
	stroke(255, 255, 255);
	noStroke();
	rect(150, 350, 300, 200);
	fill(150, 0, 15);
	stroke(255, 255, 255);
	noStroke();
	rect(500, 100, 300, 200);
	fill(20, 0, 100);
	stroke(255, 255, 255);
	noStroke();
	rect(500, 350, 300, 200);
	fill(130, 90, 80);
	stroke(255, 255, 255);
	noStroke();
	rect(345, 130, 250, 270, 120);
	fill(92, 60, 51);
	stroke(255, 255, 255);
	noStroke();
	rect(400, 200, 50, 40, 20);
	fill(0);
	stroke(255, 255, 255);
	strokeWeight(1);
	rect(420, 213, 20, 15, 20);
	fill(92, 60, 51);
	stroke(255, 255, 255);
	noStroke();
	rect(500, 200, 50, 40, 20);
	fill(0);
	stroke(255, 255, 255);
	strokeWeight(1);
	rect(509, 213, 20, 15, 20);
	push();
	translate(0, 100);
	fill(222, 0, 100);
	noStroke();
	arc(450, 210, 50, 20, PI, 0);
	arc(500, 210, 50, 20, PI, 0);
	fill(190, 0, 120);
	noStroke();
	arc(475, 210, 100, 40, 0, PI);
	pop();
	fill(92, 60, 51);
	noStroke();
	triangle(455, 250, 475, 260, 500, 250);
	fill(0);
	stroke(0);
	strokeWeight();
	ellipse(320, 320, 80, 80);
	
	stroke(0);
	strokeWeight();
	ellipse(300, 300, 80, 80);
	
	stroke(0);
	strokeWeight();
	ellipse(315, 280, 80, 80);
	
	stroke(0);
	strokeWeight();
	ellipse(317, 270, 80, 80);
	
	stroke(0);
	strokeWeight();
	ellipse(321, 250, 80, 80);
	
	
	stroke(0);
	strokeWeight();
	ellipse(330, 230, 70, 70);
	
		push();
	translate(0, 100);
	fill(0);
	noStroke();
	arc(475, 75, 200, 120, PI, 0);
	
	
	
	stroke(0);
	strokeWeight();
	ellipse(350, 100, 70, 70);
	
	
	stroke(0);
	strokeWeight();
	ellipse(360, 80, 70, 90);
	
	
	stroke(0);
	strokeWeight();
	ellipse(380, 65, 70, 70);
}
function setup() {
	createCanvas(400, 300);
}
function draw() {
	background(220, 150, 220);
	line(0, 50, 400, 300);
	rectMode(CENTER);
	fill(200, 0, 100);
	stroke(255, 255, 255);
	strokeWeight(10);
	rect(175, 200, 150, 150);
	fill(0, 0, 100, 175);
	stroke(255, 255, 255);
	strokeWeight(5);
	ellipse(100, 100, 50, 50);
	fill(0, 0, 100, 175);
	stroke(255, 255, 255);
	noStroke();
	ellipse(245, 100, 50, 50);
}function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(150);
	fill(255, 0, 0);
	stroke(0, 240, 100);
	strokeWeight(4);
	ellipse(200, 150, 40, 40);
	fill(255, 0, 255);
	stroke(0, 0, 255);
	strokeWeight(2);
	triangle(50, 75, 58, 20, 86, 75);
}