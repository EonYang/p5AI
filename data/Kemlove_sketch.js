// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

// The midi notes of a scale
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

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, 'single', modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  
   // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
  
colorMode(RGB,255,255,255,1);
}
// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
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
  // Flip the video from left to right, mirror the video
  translate(width, 0)
  scale(-1, 1);
  image(video, 0, 0, width, height);

  // if (isPlaying) {
   // fill(0, 255, 0);
    // .isPlaying() returns a boolean
    playNote(notes[keyNum]);
    
  // } else {
    //fill(255, 0, 0);
    // .isPaused()() returns a boolean
    osc.fade(0,1);
  // }
 // for posenet red box
  //noStroke();
  // Draw a 50 x 50 sqaure at the center of the canvas
  //rect(width / 2 - squareSize / 2, height / 2 - squareSize / 2, squareSize, squareSize);

   // Draw a keyboard

  // The width for each key
  var w = width / notes.length;
  for (var i = 0; i < notes.length; i++) {
    var x = i * w;
  
    fill(x, 255 - x, 200 + x, 0.4);

    // Draw the key
    rect(x, 0, w-1, height-1);
  }
  
  
  
  
  
  
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(0, 0, 255);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
      // keypoint[0] is the nose point
      // Only check the first pose
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

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(0, 0, 255);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Style Transfer Image Example using p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let style;
let video;
let resultImg;

function setup() {
  createCanvas(320, 240).parent('canvasContainer');

  video = createCapture(VIDEO);
  video.hide();

  // The results image from the style transfer
  resultImg = createImg('');
  resultImg.hide();

  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
  style = ml5.styleTransfer('models/ankara', video, modelLoaded);
}

function draw(){
  image(resultImg, 0, 0, 320, 240);
}

// A function to call when the model has been loaded.
function modelLoaded() {
  select('#status').html('Model Loaded');
  style.transfer(gotResult);
}

// When we get the results, update the result image src
function gotResult(err, img) {
  resultImg.attribute('src', img.src);
  style.transfer(gotResult);
}


// Copyright (c) 2018 ml5

//

// This software is released under the MIT License.

// https://opensource.org/licenses/MIT



/* ===

ml5 Example

KNN Classification on Webcam Images with mobileNet. Built with p5.js

=== */

let video;

// Create a KNN classifier

const knnClassifier = ml5.KNNClassifier();

// Create a featureExtractor that can extract the already learned features from MobileNet

const featureExtractor = ml5.featureExtractor('MobileNet', modelReady);



function setup() {

  noCanvas();

  // Create a video element

  video = createCapture(VIDEO);

  // Append it to the videoContainer DOM element

  video.parent('videoContainer');

  // Create the UI buttons

  createButtons();

}



function modelReady(){

  select('#status').html('FeatureExtractor(mobileNet model) Loaded')

}



// Add the current frame from the video to the classifier

function addExample(label) {

  // Get the features of the input video

  const features = featureExtractor.infer(video);

  // You can also pass in an optional endpoint, defaut to 'conv_preds'

  // const features = featureExtractor.infer(video, 'conv_preds');

  // You can list all the endpoints by calling the following function

  // console.log('All endpoints: ', featureExtractor.mobilenet.endpoints)



  // Add an example with a label to the classifier

  knnClassifier.addExample(features, label);

  updateExampleCounts();

}



// Predict the current frame.

function classify() {

  // Get the total number of classes from knnClassifier

  const numClasses = knnClassifier.getNumClasses();

  if (numClasses <= 0) {

    console.error('There is no examples in any class');

    return;

  }

  // Get the features of the input video

  const features = featureExtractor.infer(video);



  // Use knnClassifier to classify which class do these features belong to

  // You can pass in a callback function `gotResults` to knnClassifier.classify function

  knnClassifier.classify(features, gotResults);

  // You can also pass in an optional K value, K default to 3

  // knnClassifier.classify(features, 3, gotResults);



  // You can also use the following async/await function to call knnClassifier.classify

  // Remember to add `async` before `function predictClass()`

  // const res = await knnClassifier.classify(features);

  // gotResults(null, res);

}



// A util function to create UI buttons

function createButtons() {

  // When the A button is pressed, add the current frame

  // from the video with a label of "rock" to the classifier

  buttonA = select('#addClassRock');

  buttonA.mousePressed(function() {

    addExample('Rock');

  });



  // When the B button is pressed, add the current frame

  // from the video with a label of "paper" to the classifier

  buttonB = select('#addClassPaper');

  buttonB.mousePressed(function() {

    addExample('Paper');

  });



  // When the C button is pressed, add the current frame

  // from the video with a label of "scissor" to the classifier

  buttonC = select('#addClassScissor');

  buttonC.mousePressed(function() {

    addExample('Scissor');

  });



  // Reset buttons

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



  // Predict button

  buttonPredict = select('#buttonPredict');

  buttonPredict.mousePressed(classify);



  // Clear all classes button

  buttonClearAll = select('#clearAll');

  buttonClearAll.mousePressed(clearAllClasses);



  // Load saved classifier dataset

  buttonSetData = select('#load');

  buttonSetData.mousePressed(loadDataset);



  // Get classifier dataset

  buttonGetData = select('#save');

  buttonGetData.mousePressed(saveDataset);

}



// Show the results

function gotResults(err, result) {

  // Display any error

  if (err) {

    console.error(err);

  }



  if (result.confidencesByLabel) {

    const confideces = result.confidencesByLabel;

    // result.label is the label that has the highest confidence

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



// Update the example count for each class	

function updateExampleCounts() {

  const counts = knnClassifier.getClassExampleCountByLabel();



  select('#exampleRock').html(counts['Rock'] || 0);

  select('#examplePaper').html(counts['Paper'] || 0);

  select('#exampleScissor').html(counts['Scissor'] || 0);

}



// Clear the examples in one class

function clearClass(classLabel) {

  knnClassifier.clearClass(classLabel);

  updateExampleCounts();

}



// Clear all the examples in all classes

function clearAllClasses() {

  knnClassifier.clearAllClasses();

  updateExampleCounts();

}



// Save dataset as myKNNDataset.json

function saveDataset() {

  knnClassifier.saveDataset('myKNNDataset');

}



// Load dataset to the classifier

function loadDataset() {

  knnClassifier.loadDataset('./myKNNDataset.json', updateExampleCounts);

}

// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image Classification using Feature Extraction with MobileNet. Built with p5.js
This example uses a callback pattern to create the classifier
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let dogImages = 0;
let catImages = 0;

function setup() {
  noCanvas();
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');
  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  // Create a new classifier using those features and give the video we want to use
  classifier = featureExtractor.classification(video, videoReady);
  // Set up the UI buttons
  setupButtons();
}

// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) Loaded!');
  classifier.load('./model/model.json', function() {
    select('#modelStatus').html('Custom Model Loaded!');
  });
}

// A function to be called when the video has loaded
function videoReady () {
  select('#videoStatus').html('Video ready!');
}

// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

// A util function to create UI buttons
function setupButtons() {
  // When the Cat button is pressed, add the current frame
  // from the video with a label of "cat" to the classifier
  buttonA = select('#catButton');
  buttonA.mousePressed(function() {
    classifier.addImage('cat');
    select('#amountOfCatImages').html(catImages++);
  });

  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  buttonB = select('#dogButton');
  buttonB.mousePressed(function() {
    classifier.addImage('dog');
    select('#amountOfDogImages').html(dogImages++);
  });

  // Train Button
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

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);

  // Save model
  saveBtn = select('#save');
  saveBtn.mousePressed(function() {
    classifier.save();
  });

  // Load model
  loadBtn = select('#load');
  loadBtn.changed(function() {
    classifier.load(loadBtn.elt.files, function(){
      select('#modelStatus').html('Custom Model Loaded!');
    });
  });
}

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }
  select('#result').html(result);
  classify();
}// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;
let label ='';
let prob='';


function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(results[0].probability);
  classifyVideo();
}

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}
// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;
let ding;
let prob;


function preLoad(){
ding=loadSound ('assets/ding-dong.wav');
}
function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  console.log(results)
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(results[0].probability);
  classifyVideo();
}

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
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
}// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
const classifier = ml5.imageClassifier('MobileNet', modelReady);

// A variable to hold the image we want to classify
let img;

function setup() {
  noCanvas();
  // Load the image
  img = createImg('images/bird.jpg', imageReady);
  img.size(400, 400);
}

// Change the status when the model loads.
function modelReady(){
  document.getElementById('status').html('Model Loaded')
}

// When the image has been loaded,
// get a prediction for that image
function imageReady() {
  classifier.predict(img, gotResult);
  // You can also specify the amount of classes you want
  // classifier.predict(img, 10, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.error(err);
  }
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
}let mobilenet;
let video;
let label ='';
let prob='';

function modelReady () {
  console.log ('Model is ready!');
  mobilenet.predict(gotResults);
   // Call the classifyVideo function to start classifying the video
  classifyVideo();

}



function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
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
  //dom elements
  //createP(label);
  //createP(prob);
}
}function setup() {
  createCanvas(400, 400);
	loadJSON("https://falcon.afrikatoday.com/pfny2018.json", gotData);
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
{cityblock=loadModel('http://falcon.afrikatoday.com/cityblock.obj', normalize=true);
 pigeon=loadModel('http://falcon.afrikatoday.com/pigeon.obj', normalize=true);
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
 // background(220);

}

function gotData(data){
  loadImage(data.src,gotImage);

  //this is a callback that triggers another callback
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


// once our data is loaded,
// we draw the full map in this function

function initMap() {
  // init a google maps
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {
      lat: 9.0820,
      lng: 8.6753
    },
    mapTypeId: 'terrain'
  });
  // put all the data into one array
  var heatmapData = [];
  for (var i = 0; i < data.length; i++) {
    // var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(data[i].lat, data[i].lng);
    heatmapData.push(latLng);
  }
  // init a new heatmap layer on the map
  // and feed it our data array
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


// once our data is loaded,
// we draw the full map in this function

function initMap() {
  // init a google maps
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {
      lat: 9.0820,
      lng: 8.6753
    },
    mapTypeId: 'terrain'
  });
  // put all the data into one array
  var heatmapData = [];
  for (var i = 0; i < data.length; i++) {
    // var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(data[i].lat, data[i].lng);
    heatmapData.push(latLng);
  }
  // init a new heatmap layer on the map
  // and feed it our data array
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
  print(data);
} 

function draw() { 
  background(220);
}var whichFact = 0;
var name;
var typeOfFact;
var valueOfFact;

function setup() {
  createCanvas(400, 400);
  // deaths = deaths.Value;
  loadJSON("http://apps.who.int/gho/athena/data/GHO/MALARIA003.json?profile=simple&filter=COUNTRY:*", "jsonp", data_loaded);
  // createP(Value);
}

function data_loaded(data) {
  //console.log(data);
  //print("Hello");
  name = data.fact[whichFact].dim.COUNTRY;
  typeOfFact = data.fact[whichFact].dim.GHO;
  valueOfFact = data.fact[whichFact].Value;
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + name + "&key=AIzaSyCLjUGhyCohu1eKnA1fFxbe6x50uX62Eq8";
  console.log(url);
  loadJSON(url, askNextName);
  //whichFact++;
}


function askNextName(latLon) {
  console.log("boo");
  //console.log("whichfact"+whichFact);
  print(name + " " + typeOfFact + " " + valueOfFact + " has lat long of " + latLon.results[whichFact].geometry.location.lat);
  print(","+latLon.results[whichFact].geometry.location.lng);
  whichFact++;
  
  //name = latLon.fact[whichFact].dim.COUNTRY;//why does it not load new name????
  //typeOfFact = latLon.fact[whichFact].dim.GHO;
  //valueOfFact = latLon.fact[whichFact].Value;
  print("next"+name);
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + name + "&key=AIzaSyCLjUGhyCohu1eKnA1fFxbe6x50uX62Eq8";
  console.log("next :"+url);
  loadJSON(url, askNextName);
  
  
}

var whichFact = 0;
var name;
var typeOfFact;
var valueOfFact;

function setup() {
  createCanvas(400, 400);
  // deaths = deaths.Value;
  loadJSON("http://apps.who.int/gho/athena/data/GHO/MALARIA003.json?profile=simple&filter=COUNTRY:*", "jsonp", data_loaded);
  // createP(Value);
}

function data_loaded(data) {
  //console.log(data);
  //print("Hello");
  name = data.fact[whichFact].dim.COUNTRY;
  typeOfFact = data.fact[whichFact].dim.GHO;
  valueOfFact = data.fact[whichFact].Value;
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + name + "&key=AIzaSyCLjUGhyCohu1eKnA1fFxbe6x50uX62Eq8";
  console.log(url);
  loadJSON(url, askNextName);
  //whichFact++;
}


function askNextName(latLon) {
  console.log("boo");
  //console.log("whichfact"+whichFact);
  print(name + " " + typeOfFact + " " + valueOfFact + " has lat long of " + latLon.results[whichFact].geometry.location.lat);
  print(","+latLon.results[whichFact].geometry.location.lng);
  whichFact++;
  
  //name = latLon.fact[whichFact].dim.COUNTRY;//why does it not load new name????
  //typeOfFact = latLon.fact[whichFact].dim.GHO;
  //valueOfFact = latLon.fact[whichFact].Value;
  print("next"+name);
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + name + "&key=AIzaSyCLjUGhyCohu1eKnA1fFxbe6x50uX62Eq8";
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


// once our data is loaded,
// we draw the full map in this function

function initMap() {
  // init a google maps
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 1,
    center: {
      lat: 9.0820,
      lng: 8.6753
    },
    mapTypeId: 'terrain'
  });
  // put all the data into one array
  var heatmapData = [];
  for (var i = 0; i < data.length; i++) {
    // var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(data[i].lat, data[i].lng);
    heatmapData.push(latLng);
  }
  // init a new heatmap layer on the map
  // and feed it our data array
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: false,
    map: map
  });
  // Create a <script> tag and set the USGS URL as the source. 
//   var script = document.createElement('script'); // This example uses a local copy of the GeoJSON stored at // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp 
  
//   script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js'; 
//   document.getElementsByTagName('head')[0].appendChild(script);
}


// this function used to be called when getting the 
// data from google (the earthquake data)

// function eqfeed_callback(results) {
//   // print(results);
//   var heatmapData = [];
//   // orginal:
//   // for (var i = 0; i < results.features.length; i++) {
//   //   var coords = results.features[i].geometry.coordinates;
//   //   var latLng = new google.maps.LatLng(40.7128, -74.0060);
//   //   var latLng = new google.maps.LatLng(coords[1], coords[0]);
//   //   heatmapData.push(latLng);
//   // }
  
//   //ouyr test
//   for (var i = 0; i < data.length; i++) {
//     // var coords = results.features[i].geometry.coordinates;
//     var latLng = new google.maps.LatLng(data[i].lat, data[i].lng);
//     heatmapData.push(latLng);
//   }
//   var heatmap = new google.maps.visualization.HeatmapLayer({
//     data: heatmapData,
//     dissipating: false,
//     map: map
//   });
// }
let expansion;
var img;
var offset = 10;
var easing = 0.009;
let x, y;

function preload() {
  //iceberg = loadImage("Iceberg.jpg");
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
  print(expansion);

}

function draw() {
  background(0, 95, 161);

  var dx = (1 - img.width / 30) - offset;
  offset -= dx * easing;
  //let f = 0;
  //
  tint(255, 127); // Display at half opacity
  image(img, 0, offset);

  image(wave, 0, y);
  // Jiggling randomly on the horizontal axis
  x = x + random(-1, 1);
  // Moving up at a constant speed
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
  // deaths = deaths.Value;
  loadJSON("http://apps.who.int/gho/athena/data/GHO/MALARIA003.json?profile=simple&filter=COUNTRY:*", "jsonp", data_loaded);
  // createP(Value);
}

function data_loaded(data) {
  //console.log(data);
  //print("Hello");
  name = data.fact[0].dim.COUNTRY;
  typeOfFact = data.fact[0].dim.GHO;
  valueOfFact = data.fact[0].Value;
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + name + "&key=AIzaSyCLjUGhyCohu1eKnA1fFxbe6x50uX62Eq8";
  console.log(url);
  loadJSON(url, askNextName);
}


function askNextName(latLon) {
  console.log("boo");
  //console.log("whichfact"+whichFact);
  print(name + " " + typeOfFact + " " + valueOfFact + " has lat long of " + latLon.results[0].geometry.location.lat);
  print(","+latLon.results[0].geometry.location.lng);
  
  name = data.fact[whichFact].dim.COUNTRY;
  typeOfFact = data.fact[whichFact].dim.GHO;
  valueOfFact = data.fact[whichFact].Value; //what you wanna do 
  
  //recursion 
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + name + "&key=AIzaSyCLjUGhyCohu1eKnA1fFxbe6x50uX62Eq8";
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

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here

function setup() {

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  noCanvas();
  button = createButton("play");

  //sound loops
  for (var i = 0; i < sound.length; i++) {
    song[i] = loadSound(sound[i], loaded);

    //image loops -- notice it is in setup function
    //for (var y = 0; y < myImage.length; y++) {
  }
  //has to go before soundPlaying function
  //put serialEvent callback here
  button.mousePressed(soundPlaying);
  background(51);
  button.mousePressed(imageLoading);
  background(51);

}
//random sound playback function
function soundPlaying() {
  var x = Math.floor(Math.random() * sound.length)
  song[x].play();
  console.log(x);
}

function imageLoading() {


  var z = Math.floor(Math.random() * myImage.length)
  //if( z == 0 ) 
  //z =1;

  if (z2 != null) {
    picts[z2].hide();
  }
  z2 = z
  picts[z] = createImg(myImage[z], loaded);
  image(picts[z], 200, 200);
  console.log(z2);

}





// function togglePlaying() {
//   if (!song[0].isPlaying()) {
//     song[0].play();
//     button.html("pause");
//   } else {
//     song[0].stop();
//     button.html("play");
// }

function loaded() {
  console.log("loaded");

}
// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serverConnected() {
  println('connected to server.');
}

function portOpen() {
  println('the serial port opened.')
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    var sensors = split(inString, ','); // split the string on the commas
    if (sensors.length > 2) { // if there are three elements
      locH = map(sensors[0], 250, 410, 0, width); // element 0 is the locH
      locV = map(sensors[1], 250, 410, 0, height); // element 1 is the locV
      circleColor = 255 - (sensors[2] * 255); // element 2 is the button
    }
  }
}var img;
var offset = 10;
var easing = 0.009;

function setup() {
  createCanvas(640, 360);
  img = loadImage("iceberg.jpg");  // Load an image into the program
}

function draw() {
 // image(img, 0, 0);  // Display at full opacity
  var dx = (1-img.width/30) - offset;
  offset -= dx * easing;
  tint(255, 50);  // Display at half opacity
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

  //sound loops
  for (var i = 0; i < sound.length; i++) {
    song[i] = loadSound(sound[i], loaded);

    //image loops -- notice it is in setup function
    //for (var y = 0; y < myImage.length; y++) {
      }
  //has to go before soundPlaying function
  //put serialEvent callback here
  button.mousePressed(soundPlaying); 
  background(51);
  button.mousePressed(imageLoading); 
    background(51);

}
//random sound playback function
function soundPlaying() {
  var x = Math.floor(Math.random() * sound.length)
  song[x].play();
  console.log(x);
}

function imageLoading() {
      
  
var z = Math.floor(Math.random() * myImage.length)
 //if( z == 0 ) 
 //z =1;
 
  if (z2 != null) {
    picts[z2].hide();}
   z2=z
       picts[z] = createImg(myImage[z], loaded);
  image(picts[z],200,200);
  console.log(z2);

}





// function togglePlaying() {
//   if (!song[0].isPlaying()) {
//     song[0].play();
//     button.html("pause");
//   } else {
//     song[0].stop();
//     button.html("play");
// }

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

  //sound loops
  for (var i = 0; i < sound.length; i++) {
    song[i] = loadSound(sound[i], loaded);

    //image loops -- notice it is in setup function
    //for (var y = 0; y < myImage.length; y++) {
      }
  //has to go before soundPlaying function
  //put serialEvent callback here
  button.mousePressed(soundPlaying); 
  background(51);
  button.mousePressed(imageLoading); 
    background(51);

}
//random sound playback function
function soundPlaying() {
  var x = Math.floor(Math.random() * sound.length)
  song[x].play();
  console.log(x);
}

function imageLoading() {
      
  
var z = Math.floor(Math.random() * myImage.length)
 //if( z == 0 ) 
 //z =1;
 
  if (z2 != null) {
    picts[z2].hide();}
   z2=z
       picts[z] = createImg(myImage[z], loaded);
  image(picts[z],200,200);
  console.log(z2);

}





// function togglePlaying() {
//   if (!song[0].isPlaying()) {
//     song[0].play();
//     button.html("pause");
//   } else {
//     song[0].stop();
//     button.html("play");
// }

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

  //sound loops
  for (var i = 0; i < sound.length; i++) {
    song[i] = loadSound(sound[i], loaded);

    //image loops -- notice it is in setup function
    //for (var y = 0; y < myImage.length; y++) {
      }
  //has to go before soundPlaying function
  //put serialEvent callback here
  button.mousePressed(soundPlaying); 
  background(51);
  button.mousePressed(imageLoading); 
    background(51);

}
//random sound playback function
function soundPlaying() {
  var x = Math.floor(Math.random() * sound.length)
  song[x].play();
  console.log(x);
}

function imageLoading() {
      
  
var z = Math.floor(Math.random() * myImage.length)
 //if( z == 0 ) 
 //z =1;
 
  if (z2 != null) {
    picts[z2].hide();}
   z2=z
       picts[z] = createImg(myImage[z], loaded);
  image(picts[z],200,200);
  console.log(z2);

}





// function togglePlaying() {
//   if (!song[0].isPlaying()) {
//     song[0].play();
//     button.html("pause");
//   } else {
//     song[0].stop();
//     button.html("play");
// }

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

  //sound loops
  for (var i = 0; i < sound.length; i++) {
    song[i] = loadSound(sound[i], loaded);

    //image loops -- notice it is in setup function
    //for (var y = 0; y < myImage.length; y++) {
      }
  //has to go before soundPlaying function
  button.mousePressed(soundPlaying); 
  background(51);
  button.mousePressed(imageLoading); 
    background(51);

}
//random sound playback function
function soundPlaying() {
  var x = Math.floor(Math.random() * sound.length)
  song[x].play();
  console.log(x);
}

function imageLoading() {
      
  
var z = Math.floor(Math.random() * myImage.length)
 //if( z == 0 ) 
 //z =1;
 
  if (z2 != null) {
    picts[z2].hide();}
   z2=z
       picts[z] = createImg(myImage[z], loaded);
  console.log(z2);

}





// function togglePlaying() {
//   if (!song[0].isPlaying()) {
//     song[0].play();
//     button.html("pause");
//   } else {
//     song[0].stop();
//     button.html("play");
// }

function loaded() {
  console.log("loaded");

}// Daniel Shiffman
// Code for: https://youtu.be/YcezEwOXun4

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





// function togglePlaying() {
//   if (!song[0].isPlaying()) {
//     song[0].play();
//     button.html("pause");
//   } else {
//     song[0].stop();
//     button.html("play");
  // }

function loaded() {
  console.log("loaded");
}
// Daniel Shiffman
// Code for: https://youtu.be/YcezEwOXun4

function playRandomSound() {
//array of sounds
var sounds = [
  "futurama-bender-dinner.mp3",
  "futurama-less-evil.mp3 ",
  "futurama-pass-the-veal.mp3 ",
  "futurama-popplers.mp3 ",
  "futurama-raw-ham.mp3 ",
  "futurama-really_hoped.mp3 "
];
var soundFile=sounds[Math.floor (Math.random()*sounds.length)];
//find player element and generate embed file to play sound within it
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


/*
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
  
  print(data.fact[0].dims.COUNTRY, data.fact[0].Value);
  // for (var i=0; i<data.fact; i++) {
  //   createElement('h1',deaths[i]);
  //  }

}function setup() { 
  createCanvas(400, 400);
  loadJSON ("malariadata.json", gotData);

} 

function gotData (data){
print(data);
  data = data.fact[1].Value;
  createP(data);
  
}
function draw() { 
  background(220);
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.thisWontWorkEver'; // fill in your serial port name here, or pick during Serial list event
var searchString = "Adafruit"; //during Serial port list event, if a port containing this string is found we will attempt to open it
var logSerial = true;
var lastSerialString = "";
var rValue, gValue;
var bgValue = 0;
var switchState = 1; //pulled high, 1 = not pressed, 0 = pressed
function serialEvent() {
  var inData = serial.readline();
  console.log(".");
  console.log(inData);
}

function setup() {
  createCanvas(640, 480);
  //background(bgValue/4, 0x16, 0x40);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event NOTE: I like to chain open from list, so I can decide which port is the arduino
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {

    // Display the list the console:
    println(i + " " + portList[i]);
    if (portList[i].indexOf(searchString) != -1) { //indexOf gives the starting position of a substring within a longer string, and returns -1 if not found.
      portName = portList[i];
      console.log("Will attempt to open Arduino on " + portName + " for serial connection");
    }
  }
  serial.open(portName); //NOTE: here is my open command.
}


function serialEvent() {
  //console.log(serial.read());
  var inData = serial.readLine();
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
  text(lastSerialString, 50, 50);
  stroke(0);
  fill(255, 0, 0);
  ellipse(100, 300, 50, 50);
  fill(0, 255, 0);
  ellipse(200, 300, 50, 50);
}

function mousePressed() {
  // rValue = int(map(mouseX, 10, width-10, 0, 255));
  // gValue = int(map(mouseY, 10, height-10, 0, 255));
  // gValue = constrain(gValue, 0, 255);
  // rValue = constrain(rValue, 0, 255);
  //serial.write("L:" + rValue + "," + gValue + "\n");
  if (mouseX < width / 2) {
    serial.write("beep:" + mouseX * 10 + "," + (20 + mouseY / 2) + "\n");
  } else {
    serial.write("blorp" + "\n");
  }
}

function keyPressed() {
  if (key >= 0 && key <= 9) {
    //serial.write("T:" + key*40 + "\r\n");
    serial.write("whoop" + "\n");
  }
}

//function mousePressed() {
//serial.write("255,128\r\n");
// serial.write(13);
// serial.write(10);
//}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}

function serverConnected() {
  println('connected to server.');
}

function portOpen() {
  println('the serial port opened.')
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
   serial.on('data', gotData);

}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // println the string
  latestData = currentString;            // save it for the draw method
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  //var mappedVar = map(latestData, 490,540,0,width);
  var mappedVar = map(latestData, 400,950,0,width);
  ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1421");

  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);
}

// We are connected and ready to go
function serverConnected() {
  println("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  println("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    println(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  println("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  println(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // println the string
  latestData = currentString;            // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device

function draw() {
  background(255,255,255);
  fill(0,0,0);
  var mappedVar = map(latestData, 490,540,0,width);
  //var mappedVar = map(latestData, 400,950,0,width);
  ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
   serial.on('data', gotData);

}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // println the string
  latestData = currentString;            // save it for the draw method
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  //var mappedVar = map(latestData, 490,540,0,width);
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
  //print (mySlider.value());

  print('i love you Kemi');

}let cy = 200; //all circles are at 180px on y axis
let cd = 300; //circle diameter
var f = 800; //confetti distance;
var fd = 1; //confetti diameter



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
}let rw = 2; //rectangle width
let rh = 100; //rectangle height
let ry = 250; //line at y axis
let cy = 200; //all circles are at 180px on y axis
let cd =200; //circle diameter
let f = 800; //confetti distance;
let fd = 1; //confetti diameter



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
}//exploding ball... 
//it expands on mouse pressed, suddenly reduces
//its random colors glow from neon green to neon purple
//it's translucent and can be a background to any page
//extra sticks are also flying in the background
let myCircle; //circle
let mySticks; // flying sticks
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
  
}var rw = 2; //rectangle width
var rh = 100; //rectangle height
var ry = 25; //line at y axis
var cy = 180; //all circles are at 180px on y axis
var cd = 100; //circle diameter
var f = 800; //confetti distance;
var fd = 1; //confetti diameter



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

// spiral 
function spiral(size, r, g, b, a) {
  for (var i = 0; i <= 150; i++) {
    //color
    fill(r, g, b, a)
    //ellipse shape and position
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




}var rw = 2; //rectangle width
var rh = 100; //rectangle height
var ry = 25; //line at y axis
var cy = 180; //all circles are at 180px on y axis
var cd = 100; //circle diameter
var f = 800; //confetti distance;
var fd = 1; //confetti diameter



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
}var rw = 2; //rectangle width
var rh = 100; //rectangle height
var ry = 25; //line at y axis
var cy = 180; //all circles are at 180px on y axis
var cd = 100; //circle diameter
var f = 800; //confetti distance;
var fd = 1; //confetti diameter



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


}var lb=200; //line begin
var le=100; //line ends
var ly=100; //line at y axis
var cy=180; //all circles are at 180px on y axis
var cd=100; //circle diameter

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0);
  
  for (var x=0;x<=width; x+75 ) {
      fill (255,0,0);
  {ellipse (x,cy,cd,cd);
  
}var lb=200; //line begin
var le=100; //line ends
var ly=100; //line at y axis
var cy=180; //all circles are at 180px on y axis
var cd=100; //circle diameter

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0);
  
  for (var x=0;x<=width; x+75 ) {
      fill (255,0,0);
  {ellipse (x,cy,cd,cd);
  
}var lb=200; //line begin
var le=100; //line ends
var ly=100; //line at y axis
var cy=180; //all circles are at 180px on y axis
var cd=100; //circle diameter

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0);
  
  for (var x=0;x<=width; x+75 ) {
      fill (255,0,0);
  {ellipse (x,cy,cd,cd);
  
}var lb=200; //line begin
var le=100; //line ends
var ly=100; //line at y axis
var cy=180; //all circles are at 180px on y axis
var cd=100; //circle diameter

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
    var xForThisDot = i * 20; //use the i variable to space dots
    var yForThisDot = 100;
    //find distance between mouse and this dot
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
	//background
	background(r, g, b);
	//ellipse with dot syntax
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
    //background(153, 204, 153);
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

    // head
    stroke(0)
    strokeWeight(10);
    fill(51, 204, 51);
    rect(head, 5, 165, 165);
    //face
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

    // body
    fill(51, 204, 51);
    rect(body, 165, 108, 200);

    // left leg
    push();
    translate(lleg, 345);
    rotate(llegrotate);
    llegrotate = llegrotate + .05;
    fill(51, 204, 51);
    rect(0, 0, 75, 75);
    pop();
    // right leg
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

creeperface=loadImage("http://itp.afrikatoday.com/creeperface.png");  // creeper's face
}
function draw() {
    
   //creeper's face
  image(creeperface, 140, 10);
  

  
  // head
  stroke(0);
  strokeWeight(10);
  fill(51, 204, 51);
  rect(135, 5, 165, 165);
    //drawing face because image is not loading
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

  // body
   fill(51, 204, 51);
  rect (165, 165, 108, 200);

  // left leg
   fill(51, 204, 51);
  rect (110,325,75,75);


  // right leg
  fill(51, 204, 51);
  rect (260,325,75,75);

  
}  var creeperface;  
function setup() {
  createCanvas(450, 450);
 background(153, 204, 153);

creeperface=loadImage("http://itp.afrikatoday.com/creeperface.png");  // creeper's face
}
function draw() {
    
   //creeper's face
  image(creeperface, 140, 10);
  

  
  // head
  stroke(0);
  strokeWeight(10);
  fill(51, 204, 51);
  rect(135, 5, 165, 165);
    //drawing face because image is not loading
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

  // body
   fill(51, 204, 51);
  rect (165, 165, 108, 200);

  // left leg
   fill(51, 204, 51);
  rect (110,325,75,75);


  // right leg
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
}//var myColor;
var myr
var myg
var myb

function setup() { 
  createCanvas(400, 400);
	myColor=127;
} 

function draw() { 
//  background(225, 0, 0);
	fill (myr, myg, myb);
	ellipse (mouseX, mouseY, mouseX,mouseY);
	myr =random (255)
	myg=random (255)
	myb=random (255)
	
	//myColor = random(255);
	//myColor=myColor+1;
	//myColor++=1
	//myColor+1

}  var creeperface;  
function setup() {
  createCanvas(450, 450);
 background(153, 204, 153);

creeperface=loadImage("http://itp.afrikatoday.com/creeperface.png");  // creeper's face
}
function draw() {
    
   //creeper's face
  image(creeperface, 140, 10);
  

  
  // head
  stroke(0);
  strokeWeight(10);
  fill(51, 204, 51);
  rect(135, 5, 165, 165);
    //drawing face because image is not loading
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

  // body
   fill(51, 204, 51);
  rect (165, 165, 108, 200);

  // left leg
   fill(51, 204, 51);
  rect (110,325,75,75);


  // right leg
  fill(51, 204, 51);
  rect (260,325,75,75);

  
}