ml5 Example
PoseNet example using p5.js
var notes = [ 60, 62, 64, 65, 67, 69, 71];
let video;
let poseNet;
let poses = [];
let isPlaying = false;
let keyNum = 0;
const squareSize = 160;
function setup() {
createCanvas(700, 480);
video = createCapture(VIDEO);
video.size(width, height);
poseNet = ml5.poseNet(video, 'single', modelReady);
poseNet.on('pose', function(results) {
poses = results;
});
video.hide();
osc = new p5.TriOsc();
osc.start();
osc.amp(0);
colorMode(RGB,255,255,255,1);
}
function playNote(note, duration) {
osc.freq(midiToFreq(note));
osc.fade(0.5,0.2);
if (duration) {
setTimeout(function() {
osc.fade(0,0.2);
}, duration-50);
}
}
function modelReady() {
select('#status').html('Model Loaded');
}
function draw() {
translate(width, 0)
scale(-1, 1);
image(video, 0, 0, width, height);
playNote(notes[keyNum]);
osc.fade(0,1);
var w = width / notes.length;
for (var i = 0; i < notes.length; i++) {
var x = i * w;
fill(x, 255 - x, 200 + x, 0.4);
rect(x, 0, w-1, height-1);
}
drawKeypoints();
drawSkeleton();
}
function drawKeypoints()  {
for (let i = 0; i < poses.length; i++) {
let pose = poses[i].pose;
for (let j = 0; j < pose.keypoints.length; j++) {
let keypoint = pose.keypoints[j];
if (keypoint.score > 0.2) {
fill(0, 0, 255);
noStroke();
ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
}
if (i === 0 && j === 0) {
ellipse(keypoint.position.x, keypoint.position.y, 30, 30);
checkIfPlay(keypoint.position);
}
}
}
}
function checkIfPlay(position) {
keyNum = floor(map(position.x, 0, width, 0, notes.length));
console.log(keyNum)
}
function drawSkeleton() {
for (let i = 0; i < poses.length; i++) {
let skeleton = poses[i].skeleton;
for (let j = 0; j < skeleton.length; j++) {
let partA = skeleton[j][0];
let partB = skeleton[j][1];
stroke(0, 0, 255);
line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
}
}
}
ml5 Example
Style Transfer Image Example using p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
let style;
let video;
let resultImg;
function setup() {
createCanvas(320, 240).parent('canvasContainer');
video = createCapture(VIDEO);
video.hide();
resultImg = createImg('');
resultImg.hide();
style = ml5.styleTransfer('models/ankara', video, modelLoaded);
}
function draw(){
image(resultImg, 0, 0, 320, 240);
}
function modelLoaded() {
select('#status').html('Model Loaded');
style.transfer(gotResult);
}
function gotResult(err, img) {
resultImg.attribute('src', img.src);
style.transfer(gotResult);
}
ml5 Example
KNN Classification on Webcam Images with mobileNet. Built with p5.js
let video;
const knnClassifier = ml5.KNNClassifier();
const featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
function setup() {
noCanvas();
video = createCapture(VIDEO);
video.parent('videoContainer');
createButtons();
}
function modelReady(){
select('#status').html('FeatureExtractor(mobileNet model) Loaded')
}
function addExample(label) {
const features = featureExtractor.infer(video);
knnClassifier.addExample(features, label);
updateExampleCounts();
}
function classify() {
const numClasses = knnClassifier.getNumClasses();
if (numClasses <= 0) {
console.error('There is no examples in any class');
return;
}
const features = featureExtractor.infer(video);
knnClassifier.classify(features, gotResults);
}
function createButtons() {
buttonA = select('#addClassRock');
buttonA.mousePressed(function() {
addExample('Rock');
});
buttonB = select('#addClassPaper');
buttonB.mousePressed(function() {
addExample('Paper');
});
buttonC = select('#addClassScissor');
buttonC.mousePressed(function() {
addExample('Scissor');
});
resetBtnA = select('#resetRock');
resetBtnA.mousePressed(function() {
clearClass('Rock');
});
resetBtnB = select('#resetPaper');
resetBtnB.mousePressed(function() {
clearClass('Paper');
});
resetBtnC = select('#resetScissor');
resetBtnC.mousePressed(function() {
clearClass('Scissor');
});
buttonPredict = select('#buttonPredict');
buttonPredict.mousePressed(classify);
buttonClearAll = select('#clearAll');
buttonClearAll.mousePressed(clearAllClasses);
buttonSetData = select('#load');
buttonSetData.mousePressed(loadDataset);
buttonGetData = select('#save');
buttonGetData.mousePressed(saveDataset);
}
function gotResults(err, result) {
if (err) {
console.error(err);
}
if (result.confidencesByLabel) {
const confideces = result.confidencesByLabel;
if (result.label) {
select('#result').html(result.label);
select('#confidence').html(`${confideces[result.label] * 100} %`);
}
select('#confidenceRock').html(`${confideces['Rock'] ? confideces['Rock'] * 100 : 0} %`);
select('#confidencePaper').html(`${confideces['Paper'] ? confideces['Paper'] * 100 : 0} %`);
select('#confidenceScissor').html(`${confideces['Scissor'] ? confideces['Scissor'] * 100 : 0} %`);
}
classify();
}
function updateExampleCounts() {
const counts = knnClassifier.getClassExampleCountByLabel();
select('#exampleRock').html(counts['Rock'] || 0);
select('#examplePaper').html(counts['Paper'] || 0);
select('#exampleScissor').html(counts['Scissor'] || 0);
}
function clearClass(classLabel) {
knnClassifier.clearClass(classLabel);
updateExampleCounts();
}
function clearAllClasses() {
knnClassifier.clearAllClasses();
updateExampleCounts();
}
function saveDataset() {
knnClassifier.saveDataset('myKNNDataset');
}
function loadDataset() {
knnClassifier.loadDataset('./myKNNDataset.json', updateExampleCounts);
}
ml5 Example
Image Classification using Feature Extraction with MobileNet. Built with p5.js
This example uses a callback pattern to create the classifier
let featureExtractor;
let classifier;
let video;
let loss;
let dogImages = 0;
let catImages = 0;
function setup() {
noCanvas();
video = createCapture(VIDEO);
video.parent('videoContainer');
featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
classifier = featureExtractor.classification(video, videoReady);
setupButtons();
}
function modelReady() {
select('#modelStatus').html('Base Model (MobileNet) Loaded!');
classifier.load('./model/model.json', function() {
select('#modelStatus').html('Custom Model Loaded!');
});
}
function videoReady () {
select('#videoStatus').html('Video ready!');
}
function classify() {
classifier.classify(gotResults);
}
function setupButtons() {
buttonA = select('#catButton');
buttonA.mousePressed(function() {
classifier.addImage('cat');
select('#amountOfCatImages').html(catImages++);
});
buttonB = select('#dogButton');
buttonB.mousePressed(function() {
classifier.addImage('dog');
select('#amountOfDogImages').html(dogImages++);
});
train = select('#train');
train.mousePressed(function() {
classifier.train(function(lossValue) {
if (lossValue) {
loss = lossValue;
select('#loss').html('Loss: ' + loss);
} else {
select('#loss').html('Done Training! Final Loss: ' + loss);
}
});
});
buttonPredict = select('#buttonPredict');
buttonPredict.mousePressed(classify);
saveBtn = select('#save');
saveBtn.mousePressed(function() {
classifier.save();
});
loadBtn = select('#load');
loadBtn.changed(function() {
classifier.load(loadBtn.elt.files, function(){
select('#modelStatus').html('Custom Model Loaded!');
});
});
}
function gotResults(err, result) {
if (err) {
console.error(err);
}
select('#result').html(result);
classify();
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
let classifier;
let video;
let label ='';
let prob='';
function modelReady() {
select('#status').html('Model Loaded');
classifyVideo();
}
function classifyVideo() {
classifier.predict(gotResult);
}
function gotResult(err, results) {
select('#result').html(results[0].className);
select('#probability').html(results[0].probability);
classifyVideo();
}
function setup() {
noCanvas();
video = createCapture(VIDEO);
classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
let classifier;
let video;
let ding;
let prob;
function preLoad(){
ding=loadSound ('assets/ding-dong.wav');
}
function modelReady() {
select('#status').html('Model Loaded');
classifyVideo();
}
function classifyVideo() {
classifier.predict(gotResult);
}
function gotResult(err, results) {
console.log(results)
select('#result').html(results[0].className);
select('#probability').html(results[0].probability);
classifyVideo();
}
function setup() {
noCanvas();
video = createCapture(VIDEO);
classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}
function gotResults (error, results){
if (error){
console.error(error);
}
else 
{
console.log (results);
label=results[0].className;
prob=results[0].probability;
}function draw() {
if (prob<=0.5);
{
ding.setVolume(0.5);
ding.play();
}
}
const classifier = ml5.imageClassifier('MobileNet', modelReady);
let img;
function setup() {
noCanvas();
img = createImg('images/bird.jpg', imageReady);
img.size(400, 400);
}
function modelReady(){
document.getElementById('status').html('Model Loaded')
}
function imageReady() {
classifier.predict(img, gotResult);
}
function gotResult(err, results) {
if (err) {
console.error(err);
}
select('#result').html(results[0].className);
select('#probability').html(nf(results[0].probability, 0, 2));
}let mobilenet;
let video;
let label ='';
let prob='';
function modelReady () {
console.log ('Model is ready!');
mobilenet.predict(gotResults);
classifyVideo();
}
function modelReady() {
select('#status').html('Model Loaded');
classifyVideo();
}
function classifyVideo() {
classifier.predict(gotResult);
}
function gotResult(err, results) {
select('#result').html(results[0].className);
select('#probability').html(nf(results[0].probability, 0, 2));
classifyVideo();
}
function gotResults (error, results){
if (error){
console.error(error);
}
else 
{
console.log (results);
label=results[0].className;
prob=results[0].probability;
}
function setup() {
createCanvas(400, 400);
video=createCapture(VIDEO);
video.hide();
background(0);
mobilenet=ml5.imageClassifier('MobileNet',video, modelReady);
}
function draw() {
image(video,0,0);
fill(0);
textSize(64);
text(label, 30, height-100);
}
}function setup() {
createCanvas(400, 400);
}
function gotData(data) {
console.log (data);
}
function draw() {
background(220);
}let cityblock;
let pigeon;
let angle=0;
function preload ()
}
function setup() {
createCanvas(200, 200, WEBGL);
}
function draw() {
background(0);
translate(0,0,0);
let fov = PI/3;
let cameraZ = (height/2.0) / tan(fov/2.0);
perspective(fov,(width)/(height), cameraZ/10.0, cameraZ*10.0);	
ambientLight(0);
directionalLight(255,255,255,0,0,1,1);
rotateX(angle);
rotateY(angle*1.3);
rotateZ(angle*1.0);
model(cityblock);
angle =0.03;
}
var kinectron;
var places;
function setup() {
createCanvas(960, 540);
background(0);
noStroke();
kinectron = new Kinectron('172.16.224.110');
kinectron.makeConnection();
kinectron.startKey(gotData);
places= loadImage ("Market-women.jpg");
}
function draw() {
}
function gotData(data){
loadImage(data.src,gotImage);
}
function gotImage(places){
image(places,0,0);
}
var json;
function setup() { 
createCanvas(400, 400);
json=loadJSON  ('malaria.json')
} 
function draw() { 
background(220);
}
console.log (json);var map;
var data;
function setup() { 
createCanvas(400, 300);
loadJSON("clean_data.json", gotData); 
} 
function gotData(d){
data = d;
initMap();
}
function draw() { 
background(0);
}
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
zoom: 2,
center: {
lat: 9.0820,
lng: 8.6753
},
mapTypeId: 'terrain'
});
var heatmapData = [];
for (var i = 0; i < data.length; i++) {
var latLng = new google.maps.LatLng(data[i].lat, data[i].lng);
heatmapData.push(latLng);
}
var heatmap = new google.maps.visualization.HeatmapLayer({
data: heatmapData,
dissipating: false,
map: map
});
}var map;
var data;
function setup() { 
createCanvas(400, 300);
loadJSON("clean_data.json", gotData); 
} 
function gotData(d){
data = d;
initMap();
}
function draw() { 
background(0);
}
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
zoom: 2,
center: {
lat: 9.0820,
lng: 8.6753
},
mapTypeId: 'terrain'
});
var heatmapData = [];
for (var i = 0; i < data.length; i++) {
var latLng = new google.maps.LatLng(data[i].lat, data[i].lng);
heatmapData.push(latLng);
}
var heatmap = new google.maps.visualization.HeatmapLayer({
data: heatmapData,
dissipating: false,
map: map
});
}var data;
function preload(){
data = loadJSON("clean_data.json"); 
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}var whichFact = 0;
var name;
var typeOfFact;
var valueOfFact;
function setup() {
createCanvas(400, 400);
}
function data_loaded(data) {
name = data.fact[whichFact].dim.COUNTRY;
typeOfFact = data.fact[whichFact].dim.GHO;
valueOfFact = data.fact[whichFact].Value;
console.log(url);
loadJSON(url, askNextName);
}
function askNextName(latLon) {
console.log("boo");
whichFact++;
console.log("next :"+url);
loadJSON(url, askNextName);
}
var whichFact = 0;
var name;
var typeOfFact;
var valueOfFact;
function setup() {
createCanvas(400, 400);
}
function data_loaded(data) {
name = data.fact[whichFact].dim.COUNTRY;
typeOfFact = data.fact[whichFact].dim.GHO;
valueOfFact = data.fact[whichFact].Value;
console.log(url);
loadJSON(url, askNextName);
}
function askNextName(latLon) {
console.log("boo");
whichFact++;
console.log("next :"+url);
loadJSON(url, askNextName);
}
var map;
var data;
function setup() { 
createCanvas(400, 300);
loadJSON("clean_data.json", gotData); 
} 
function gotData(d){
data = d;
initMap();
}
function draw() { 
background(0);
}
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
zoom: 1,
center: {
lat: 9.0820,
lng: 8.6753
},
mapTypeId: 'terrain'
});
var heatmapData = [];
for (var i = 0; i < data.length; i++) {
var latLng = new google.maps.LatLng(data[i].lat, data[i].lng);
heatmapData.push(latLng);
}
var heatmap = new google.maps.visualization.HeatmapLayer({
data: heatmapData,
dissipating: false,
map: map
});
}
let expansion;
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
createCanvas(720, 360);
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
}var whichFact = 0;
var name;
var typeOfFact;
var valueOfFact;
function setup() {
createCanvas(400, 400);
}
function data_loaded(data) {
name = data.fact[0].dim.COUNTRY;
typeOfFact = data.fact[0].dim.GHO;
valueOfFact = data.fact[0].Value;
console.log(url);
loadJSON(url, askNextName);
}
function askNextName(latLon) {
console.log("boo");
name = data.fact[whichFact].dim.COUNTRY;
typeOfFact = data.fact[whichFact].dim.GHO;
console.log(url);
loadJSON(url, askNextName);
whichFact++;
}
var button;
var sound = ["beat.mp3", "2.mp3", "3.mp3", "futurama-popplers.mp3", "futurama-raw-ham.mp3"];
var song = [];
var myImage = ["leela.png",
"nixon.png",
"clinton.png",
"frye.png",
"odie.png",
"bender.png"
];
var picts = [];
var z2;
function setup() {
noCanvas();
button = createButton("play");
for (var i = 0; i < sound.length; i++) {
song[i] = loadSound(sound[i], loaded);
}
button.mousePressed(soundPlaying);
background(51);
button.mousePressed(imageLoading);
background(51);
}
function soundPlaying() {
var x = Math.floor(Math.random() * sound.length)
song[x].play();
console.log(x);
}
function imageLoading() {
var z = Math.floor(Math.random() * myImage.length)
if (z2 != null) {
picts[z2].hide();
}
z2 = z
picts[z] = createImg(myImage[z], loaded);
image(picts[z], 200, 200);
console.log(z2);
}
function loaded() {
console.log("loaded");
}
for (var i = 0; i < portList.length; i++) {
}
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
if (inString.length > 0) {
}
}
}var img;
var offset = 10;
var easing = 0.009;
function setup() {
createCanvas(640, 360);
}
function draw() {
var dx = (1-img.width/30) - offset;
offset -= dx * easing;
image(img, 0,offset);
}
var button;
var sound = ["beat.mp3", "2.mp3", "3.mp3", "futurama-popplers.mp3", "futurama-raw-ham.mp3"];
var song = [];
var myImage = ["head.png", "headless.png", "homer.png", "javier.jpg", "nixon.jpg", "obama.jpg"];
var picts = [];
var z2;
function setup() {
noCanvas();
button = createButton("play");
for (var i = 0; i < sound.length; i++) {
song[i] = loadSound(sound[i], loaded);
}
button.mousePressed(soundPlaying); 
background(51);
button.mousePressed(imageLoading); 
background(51);
}
function soundPlaying() {
var x = Math.floor(Math.random() * sound.length)
song[x].play();
console.log(x);
}
function imageLoading() {
var z = Math.floor(Math.random() * myImage.length)
if (z2 != null) {
picts[z2].hide();}
z2=z
picts[z] = createImg(myImage[z], loaded);
image(picts[z],200,200);
console.log(z2);
}
function loaded() {
console.log("loaded");
}var button;
var sound = ["beat.mp3", "2.mp3", "3.mp3", "futurama-popplers.mp3", "futurama-raw-ham.mp3"];
var song = [];
var myImage = ["head.png", "headless.png", "homer.png", "javier.jpg", "nixon.jpg", "obama.jpg"];
var picts = [];
var z2;
function setup() {
noCanvas();
button = createButton("play");
for (var i = 0; i < sound.length; i++) {
song[i] = loadSound(sound[i], loaded);
}
button.mousePressed(soundPlaying); 
background(51);
button.mousePressed(imageLoading); 
background(51);
}
function soundPlaying() {
var x = Math.floor(Math.random() * sound.length)
song[x].play();
console.log(x);
}
function imageLoading() {
var z = Math.floor(Math.random() * myImage.length)
if (z2 != null) {
picts[z2].hide();}
z2=z
picts[z] = createImg(myImage[z], loaded);
image(picts[z],200,200);
console.log(z2);
}
function loaded() {
console.log("loaded");
}var button;
var sound = ["beat.mp3", "2.mp3", "3.mp3", "futurama-popplers.mp3", "futurama-raw-ham.mp3"];
var song = [];
var myImage = ["head.png", "headless.png", "homer.png", "javier.jpg", "nixon.jpg", "obama.jpg"];
var picts = [];
var z2;
function setup() {
noCanvas();
button = createButton("play");
for (var i = 0; i < sound.length; i++) {
song[i] = loadSound(sound[i], loaded);
}
button.mousePressed(soundPlaying); 
background(51);
button.mousePressed(imageLoading); 
background(51);
}
function soundPlaying() {
var x = Math.floor(Math.random() * sound.length)
song[x].play();
console.log(x);
}
function imageLoading() {
var z = Math.floor(Math.random() * myImage.length)
if (z2 != null) {
picts[z2].hide();}
z2=z
picts[z] = createImg(myImage[z], loaded);
image(picts[z],200,200);
console.log(z2);
}
function loaded() {
console.log("loaded");
}var button;
var sound = ["beat.mp3", "2.mp3", "3.mp3", "futurama-popplers.mp3", "futurama-raw-ham.mp3"];
var song = [];
var myImage = ["head.png", "headless.png", "homer.png", "javier.jpg", "nixon.jpg", "obama.jpg"];
var picts = [];
var z2;
function setup() {
noCanvas();
button = createButton("play");
for (var i = 0; i < sound.length; i++) {
song[i] = loadSound(sound[i], loaded);
}
button.mousePressed(soundPlaying); 
background(51);
button.mousePressed(imageLoading); 
background(51);
}
function soundPlaying() {
var x = Math.floor(Math.random() * sound.length)
song[x].play();
console.log(x);
}
function imageLoading() {
var z = Math.floor(Math.random() * myImage.length)
if (z2 != null) {
picts[z2].hide();}
z2=z
picts[z] = createImg(myImage[z], loaded);
console.log(z2);
}
function loaded() {
console.log("loaded");
var sound= ["beat.mp3", "2.mp3", "3.mp3"];
var song = [];
var button;
function setup() {
noCanvas();
button = createButton("play");
for (var i =0; i<sound.length;i++) {
song[i] = loadSound(sound[i], loaded);
}
button.mousePressed(soundPlaying);
background(51);
}
function soundPlaying () {
var x=[Math.floor (Math.random()*sound.length)]
song [x].play();
console.log (x);
}
function loaded() {
console.log("loaded");
}
function playRandomSound() {
var sounds = [
"futurama-bender-dinner.mp3",
"futurama-less-evil.mp3 ",
"futurama-pass-the-veal.mp3 ",
"futurama-popplers.mp3 ",
"futurama-raw-ham.mp3 ",
"futurama-really_hoped.mp3 "
];
var soundFile=sounds[Math.floor (Math.random()*sounds.length)];
document.getElementById("player").innerHTML=
"<embed src\""+soundfile+\"\"hidden=\"true\"autostart=\"true\" loop=\"false\" />
}
var button;
function preload() {
loadSound(sounds);
}
function setup() {
noCanvas();
button = createButton("play");
song = loadSound("sounds", loaded);
button.mousePressed(togglePlaying);
background(51);
}
function togglePlaying() {
if (!sounds.isPlaying()) {
sounds.play();
button.html("pause");
} else {
sounds.stop();
button.html("play");
}
}
function loaded() {
console.log("loaded");
}
}var button;
var sounds = [
"futurama-bender-dinner.mp3",
"futurama-less-evil.mp3 ",
"futurama-pass-the-veal.mp3 ",
"futurama-popplers.mp3 ",
"futurama-raw-ham.mp3 ",
"futurama-really_hoped.mp3 "
];
var songs= [];
function setup() {
noCanvas();
button = createButton("play");
for (var i =0; i<sound.length;i++) {
songs [i]= loadSound(sounds[i], loaded);
}
button.mousePressed(togglePlaying);
background(51);
}
function togglePlaying() {
if (!songs[0].isPlaying()) {
songs[0].play();
button.html("pause");
} else {
songs[0].stop();
button.html("play");
}
}
function loaded() {
console.log("loaded");
}
function onPlay () {
var soundFile=sounds[Math.floor (Math.random()*sounds.length)];
}var data;
function preload(){
data=loadJSON ("malariadata.json");
}
function setup() { 
createCanvas(400, 400);
}
function draw() { 
background(220);
var deaths= data;
}function setup() { 
createCanvas(400, 400);
loadJSON ("malariadata.json", gotData);
} 
function gotData (data){
data = data.fact[1].Value;
createP(data);
}
function draw() { 
background(220);
var rValue, gValue;
var bgValue = 0;
console.log(".");
console.log(inData);
}
function setup() {
createCanvas(640, 480);
}
for (var i = 0; i < portList.length; i++) {
portName = portList[i];
}
}
}
if (inData.length > 0) {
console.log("Got data: " + inData);
var d = split(inData, ',');
console.log(d);
if (d.length == 3) {
bgValue = parseInt(d[0]);
switchState = parseInt(d[1]);
console.log("bgValue = " + bgValue);
console.log("switchState = " + switchState);
}
}
}
function draw() {
if (switchState == 1) {
background(bgValue / 4);
} else {
background(255, 0, bgValue / 4);
}
textSize(32);
fill(0);
stroke(0);
fill(255, 0, 0);
ellipse(100, 300, 50, 50);
fill(0, 255, 0);
ellipse(200, 300, 50, 50);
}
function mousePressed() {
if (mouseX < width / 2) {
} else {
}
}
function keyPressed() {
if (key >= 0 && key <= 9) {
}
}
}
function portClose() {
}
function serverConnected() {
}
function portOpen() {
function setup() {
createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
background(255,255,255);
fill(0,0,0);
var mappedVar = map(latestData, 400,950,0,width);
ellipse(mappedVar, 100, 50, 50);
text(latestData, 10, 10);
function setup() {
createCanvas(windowWidth, windowHeight);
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
}
function gotRawData(thedata) {
}
function draw() {
background(255,255,255);
fill(0,0,0);
var mappedVar = map(latestData, 490,540,0,width);
ellipse(mappedVar, 100, 50, 50);
text(latestData, 10, 10);
function setup() {
createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
background(255,255,255);
fill(0,0,0);
var mappedVar = map(latestData, 400,950,0,width);
ellipse(mappedVar, 100, 50, 50);
text(latestData, 10, 10);
}var mySlider;
function setup() {
createCanvas(500, 500);
mySlider = createSlider(0, 255, 127);
mySlider.position(width/3, height / 2);
mySlider.changed(callme);
}
function draw() {
background(220);
}
function callme() {
function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
stroke(66);
strokeWeight(2);
ball();
rain();
function ball() {
if (cd => 300, cd + 1) {
fill(random(255), random(243), random(21), 70);
ellipse(cd, cy, mouseX, mouseY);
}
}
function rain() {
for (var z = 0; z <= width; z += 10) {
fill(random(0), random(100), random(255), 10);
ellipse(random(z), random(f), fd, mouseY);
}
}
function setup() {
createCanvas(600, 400);
}
function balloon() {
for (var x = 75; x <= width; x += 150) {
fill(random(255), random(128), random(255));
ellipse(cd,cd, x, y);
}
function draw() {
background(0);
stroke(255);
strokeWeight(5);
balloon();
for (var z = 0; z <= width; z += 10) {
fill(192, 192, 193);
ellipse(random(z), random(f), fd, fd);
}
function setup() { 
createCanvas(400, 400);
myCircle= new Circle;
} 
function draw() { 
background(220);
Class Car {
this.c= color (random 
myCircle.move ();
myCircle.display ();
function setup() {
createCanvas(600, 400);
}
function balloon() {
for (var x = 75; x <= width; x += 150) {
fill(random(255), random(128), random(255));
ellipse(x, cy, cd, cd);
}
for (var y = 75; y <= width; y += 150) {
rect(y, ry, rw, rh);
}
}
function draw() {
background(0);
spiral(10, 36, 50, 222, 2)
}
function spiral(size, r, g, b, a) {
for (var i = 0; i <= 150; i++) {
fill(r, g, b, a)
ellipse
(i, i, i * size, i * size);
}
stroke(255);
strokeWeight(5);
balloon();
for (var z = 0; z <= width; z += 10) {
fill(192, 192, 193);
ellipse(random(z), random(f), fd, fd);
if (mouseX >= width / 4) {
fill(244, 212, 66);
ellipse(width / 4 - 75, cy, cd, cd);
}
if (mouseX >= width / 2) {
fill(156, 10, 188);
ellipse(width / 2 - 75, cy, cd, cd);
}
if (mouseX >= width / 3) {
fill(9, 140, 29);
ellipse(width / 3 + 175, cy, cd, cd);
if (mouseX >= width) {
fill(9, 140, 219);
ellipse(width - 75, cy, cd, cd);
}
}
}
function setup() {
createCanvas(600, 400);
}
function balloon() {
for (var x = 75; x <= width; x += 150) {
fill(random(255), random(128), random(255));
ellipse(x, cy, cd, cd);
}
for (var y = 75; y <= width; y += 150) {
rect(y, ry, rw, rh);
}
if (mouseX>= width/4)
{ fill (244,212,66);
ellipse(width/4-75, cy, cd, cd);
}
if (mouseX>= width/2)
{ fill (156,10,188);
ellipse(width/2-75, cy, cd, cd);
}
if (mouseX>= width/3)
{ fill (9,140,29);
ellipse(width/3+175, cy, cd, cd);
if (mouseX>= width)
{ fill (9,140,219);
ellipse(width-75, cy, cd, cd);
}
}
}
function draw() {
background(0);
stroke(255);
strokeWeight(5);
balloon();
for (var z = 0; z <= width; z += 10) {
fill(192, 192, 193);
ellipse(random(z), random(f), fd, fd);
}
function setup() {
createCanvas(600, 400);
}
function balloon() {
for (var x = 75; x <= width; x += 150) {
fill(random(255), random(128), random(255));
ellipse(x, cy, cd, cd);
}
for (var y = 75; y <= width; y += 150) {
rect(y, ry, rw, rh);
}
}
function draw() {
background(0);
stroke(255);
strokeWeight(5);
balloon();
for (var z = 0; z <= width; z += 10) {
fill(192, 192, 193);
ellipse(random(z), random(f), fd, fd);
}
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
for (var x=0;x<=width; x+75 ) {
fill (255,0,0);
{ellipse (x,cy,cd,cd);
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
for (var x=0;x<=width; x+75 ) {
fill (255,0,0);
{ellipse (x,cy,cd,cd);
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
for (var x=0;x<=width; x+75 ) {
fill (255,0,0);
{ellipse (x,cy,cd,cd);
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
for (var x=0;x<=width; x+75 ) {
fill (255,0,0);
{ellipse (x,cy,cd,cd);
}var whichDot;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var i = 0; i < 20; i++) {
var yForThisDot = 100;
var distance = dist(mouseX, mouseY, xForThisDot, yForThisDot);
if (distance < 7 ) {
whichDot = i;
}
if (i == whichDot){
fill(255, 0, 0);
} else {
fill(0, 255, 0);
}
ellipse(xForThisDot, yForThisDot, 15, 15);
}
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
stroke(255);
strokeWeight(4);
noFill();
if (mouseX > 100)
{
for (var z = 0; z < 10; z++) {
rect(300 + z * 20, 200 + z * 20, 100, 100);
}
}
ellipse(300, 200, 100, 100);
}var spot = {
x:100,
y:50
};
var col = {
r:255,
g:0,
b:0
};
function setup() { 
createCanvas(600, 400);
background (0);
} 
function draw() { 
spot.x= random (0,width);
spot.y=random (0,height);
col.r=random (0,255);
col.g= random(65,155);
col.b=random (100,200);
fill (col.r,col.g,col.b,200);
ellipse (spot.x,spot.y,60,60);
}var r=0;
var b=255;
var col=0;
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
r = map (mouseX,0,600,0,255);
b = map (mouseX,0,600,255,0);
background(r,0,b);
ellipse(mouseX,mouseY,65,65);
}var circle = {
x: 0,
y: 100,
diameter: 50,
};
var r = 218;
var g = 160;
var b = 221;
function setup() {
createCanvas(600, 400);
}
function draw() {
background(r, g, b);
ellipse
(circle.x, circle.y,circle.diameter,  circle.diameter);
circle.x=circle.x+1;
}var circleY=100;
var size1=5;
var size2=5;
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
fill (49,1,200);
ellipse (100,circleY,size1,50);
circleY= circleY+1;
size1= size1+2;
size1= size1+2;
}  var minecraftbackground;
var head = -30;
var leye = 10;
var reye = 60;
var nose = 35;
var lmouth = 22;
var tmouth = 22;
var rmouth = 66;
var body = 0;
var lleg = -2;
var rleg = 100;
var rlegrotate = 0;
var llegrotate = 0;
function preload() {
minecraftbackground = loadImage("minecraft_wallpaper.jpg");
}
function mousePressed() {
head = -30;
leye = 10;
reye = 60;
nose = 35;
lmouth = 22;
tmouth = 22;
rmouth = 66;
body = 0;
lleg = -2;
rleg = 100;
}
function mouseDragged() {
head = mouseX - 30;
leye = mouseX + 10;
reye = mouseX + 60;
nose = mouseX + 35;
lmouth = mouseX + 22;
tmouth = mouseX + 22;
rmouth = mouseX + 66;
body = mouseX + 0;
lleg = mouseX - 72;
rleg = mouseX + 100;
}
function setup() {
createCanvas(600, 500);
}
function draw() {
image(minecraftbackground, 0, 0, width, height);
head = head + 1;
leye = leye + 1;
reye = reye + 1;
nose = nose + 1;
lmouth = lmouth + 1;
tmouth = tmouth + 1;
rmouth = rmouth + 1;
body = body + 1;
lleg = lleg + 1;
rleg = rleg + 1;
stroke(0)
strokeWeight(10);
fill(51, 204, 51);
rect(head, 5, 165, 165);
fill(0);
rect(leye, 40, 32, 32);
fill(0);
rect(reye, 40, 32, 32);
fill(0);
rect(nose, 72, 32, 16);
fill(0);
rect(tmouth, 95, 64, 23);
fill(0);
rect(lmouth, 108, 20, 23);
fill(0);
rect(rmouth, 108, 20, 23);
fill(51, 204, 51);
rect(body, 165, 108, 200);
push();
translate(lleg, 345);
rotate(llegrotate);
llegrotate = llegrotate + .05;
fill(51, 204, 51);
rect(0, 0, 75, 75);
pop();
push()
translate(rleg, 345);
rotate(rlegrotate);
rlegrotate = rlegrotate + .05;
fill(51, 204, 51);
rect(0, 0, 75, 75);
pop();
}  var creeperface;  
function setup() {
createCanvas(450, 450);
background(153, 204, 153);
}
function draw() {
image(creeperface, 140, 10);
stroke(0);
strokeWeight(10);
fill(51, 204, 51);
rect(135, 5, 165, 165);
fill(0);
rect(170, 40, 32, 32);
fill(0);
rect(240, 40, 32, 32);
fill(0);
rect(205, 72, 32, 16);
fill(0);
rect(190, 95, 64, 23);
fill(0);
rect(190, 108, 20, 23);
fill(0);
rect(234, 108, 20, 23);
fill(51, 204, 51);
rect (165, 165, 108, 200);
fill(51, 204, 51);
rect (110,325,75,75);
fill(51, 204, 51);
rect (260,325,75,75);
}  var creeperface;  
function setup() {
createCanvas(450, 450);
background(153, 204, 153);
}
function draw() {
image(creeperface, 140, 10);
stroke(0);
strokeWeight(10);
fill(51, 204, 51);
rect(135, 5, 165, 165);
fill(0);
rect(170, 40, 32, 32);
fill(0);
rect(240, 40, 32, 32);
fill(0);
rect(205, 72, 32, 16);
fill(0);
rect(190, 95, 64, 23);
fill(0);
rect(190, 108, 20, 23);
fill(0);
rect(234, 108, 20, 23);
fill(51, 204, 51);
rect (165, 165, 108, 200);
fill(51, 204, 51);
rect (110,325,75,75);
fill(51, 204, 51);
rect (260,325,75,75);
}var x;
function setup() { 
createCanvas(400, 400);
x=0
} 
function draw() { 
background(220);
ellipse(x,100,20,20)
x=x+6
if(x>=width)
x=0
var myr
var myg
var myb
function setup() { 
createCanvas(400, 400);
myColor=127;
} 
function draw() { 
fill (myr, myg, myb);
ellipse (mouseX, mouseY, mouseX,mouseY);
myr =random (255)
myg=random (255)
myb=random (255)
}  var creeperface;  
function setup() {
createCanvas(450, 450);
background(153, 204, 153);
}
function draw() {
image(creeperface, 140, 10);
stroke(0);
strokeWeight(10);
fill(51, 204, 51);
rect(135, 5, 165, 165);
fill(0);
rect(170, 40, 32, 32);
fill(0);
rect(240, 40, 32, 32);
fill(0);
rect(205, 72, 32, 16);
fill(0);
rect(190, 95, 64, 23);
fill(0);
rect(190, 108, 20, 23);
fill(0);
rect(234, 108, 20, 23);
fill(51, 204, 51);
rect (165, 165, 108, 200);
fill(51, 204, 51);
rect (110,325,75,75);
fill(51, 204, 51);
rect (260,325,75,75);
}