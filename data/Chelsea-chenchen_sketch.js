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

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
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
}//Week2 ICM Make it move!
//Chelsea's Confused by Coding
var value = "0";
var a = 10;
var speed = 5;


function setup() {
  createCanvas(500, 500);
}


function draw() {
  background(255);



  //code
  fill(212);
  textSize(20);
  text("var{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;}{stroke(123,123,321(123,123,321)fill(255,255,255)set;{stroke(123,123,321)}var{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;}{stroke(123,123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;{stroke(123,123,321)}", 0 + a, 0, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;};noStroke();fill(247,221,212)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)23,321(123,123,321)fill(255,255,255)set;{st123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,", 5 + a, 25, 150, 120);
  text("(123,123,321)fill(255,255,255)set;}ITPIsAwesomeWeLoveCodingtrainarc(250,245,270,420,ke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;}TPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)23,321(123,123,321)fill(255,255,255)set;{st123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,", 0 + a, 50, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);21,212);noStroke();fill(247,221,212);ellipse(250,200,190,200);ellipse(250,200,190,200)23,321(123,123,321)fill(255,255,255)set;23,321(123,123,321)fill(255,255,255)set;123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke5,255,255)set;};noStroke();fil(123,{st{st", 0 + a, 75, 150, 120);
  text("triangle(250,220,260,250,240,250)}{)setvar=1{(200,123,48,);noStroke();fill(247,221,212);ellipse(250,200,190,200);}23,321(123,123,321)fill(255,255,255)set;{st23,321(123,123,321)fill(255,255,255)123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,set;{star{s", 0 + a, 100, 150, 120);
  text("fill(255,255,255)set;var{stroke(12fill(255,255,255)set;}ITPIsAwesome)5,255,255)set;};noStroke();filsetvar=15,255,255)set;};noStroke();fil{(200,123,48,;noStroke();(123,123,321)fillnoStroke();fill(247,221,212))", 0 + a, 150, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();5,255,255)set;};noStroke();filfill(247,221,212);ellipse(250,200,190,200);5,255,255)set;};noStroke();filect(165,315,170,132,18);", 0 + a, 175, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255,255)set;}ect(165,315,170,132,18);ect(165,315,170,132,18);ect(165,315,170,132,18);", 5 + a, 200, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255}ar{stroke(123,123);fill(247,221,212)", 5 + a, 225, 150, 120);
  text("(123,123,321)fill(255,255,255)set;}ITPIsAwesomeWeLoveCodingtrainarc(250,245,270,420,ke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;}", 0 + a, 250, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);21,212);noStroke();fill(247,221,212);ellipse(250,200,190,200);ellipse(250,200,190,200)", 0 + a, 275, 150, 120);
  text("triangle(250, 220, 260, 250, 240, 250)}{)setvar=1{(200,123,48,);noStroke();fill(247,221,212);ellipse(250,200,190,200);}ar{s", 0 + a, 300, 150, 120);
  text("fill(255,255,255)set;var{stroke(12fill(255,255,255)set;}ITPIsAwesome)setvar=1{(200,123,48,;noStroke();(123,123,321)fill(255,255,255)set;};noStroke()fill(247,221,212);noStroke();fill(247,221,212))", 0 + a, 350, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();fill(247,221,212);ellipse(250,200,190,200);", 0 + a, 400, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255,255)set;}", 5 + a, 425, 150, 120);
  a = a + speed
  if (a > 0) {
    a = -500
  }



  if (value == "0") {

    //hair
    noStroke()
    fill(64, 51, 38);
    arc(250, 245, 270, 420, QUARTER_PI + HALF_PI, QUARTER_PI);

    //ear
    fill(247, 221, 212);
    ellipse(163, 215, 50, 50);

    //face
    noStroke();
    fill(247, 221, 212);
    ellipse(250, 200, 190, 200);

    //check
    noStroke();
    fill(255, 184, 194);
    ellipse(200, 230, 30, 20);
    ellipse(300, 230, 30, 20);

    //bang
    noStroke();
    fill(64, 51, 38);
    arc(250, 130, 160, 80, Math.PI, 0);
    arc(300, 100, 270, 125, 0.25 * Math.PI, Math.PI);

    //eyebrows
    stroke(64, 51, 38);
    strokeWeight(6);
    line(190, 173, 220, 170);
    line(278, 170, 308, 173);

    //eyes
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);

    //eyeballs
    stroke(128, 128, 128);
    fill(102, 102, 51);
    ellipse(209, 200, 18, 18);
    ellipse(291, 200, 18, 18);

    //NOSE
    noStroke();
    fill(247, 221, 155);
    triangle(250, 220, 260, 250, 240, 250);

    //MOUTH
    noStroke();
    fill(255, 169, 168);
    ellipse(250, 270, 12, 12);

    //shoulders
    noStroke();
    fill(247, 221, 212);
    rect(165, 315, 170, 132, 18);

    //TSHIRT
    noStroke();
    fill(102, 21, 173);
    rect(190, 310, 120, 140, 8);

    //neck
    noStroke();
    fill(247, 221, 212);
    arc(250, 310, 40, 40, 0, PI);
    rect(230, 280, 40, 30);



  } else if (value == "1") {


    //hair
    noStroke()
    fill(64, 51, 38);
    arc(250, 245, 270, 420, QUARTER_PI + HALF_PI, QUARTER_PI);

    //ear
    fill(247, 221, 212);
    ellipse(163, 215, 50, 50);

    //face
    noStroke();
    fill(247, 221, 212);
    ellipse(250, 200, 190, 200);

    //check
    frameRate(15);
    noStroke();
    fill(255, random(164, 171), random(196, 212));
    ellipse(random(197, 203), random(228, 232), 30, 20);
    ellipse(random(297, 303), random(228, 232), 30, 20);

    //bang
    noStroke();
    fill(64, 51, 38);
    arc(250, 130, 160, 80, Math.PI, 0);
    arc(300, 100, 270, 125, 0.25 * Math.PI, Math.PI);

    //eyebrows
    frameRate(10);
    stroke(64, 51, 38);
    strokeWeight(random(5, 7));
    line(190, random(171, 175), 220, random(168, 171));
    line(278, random(168, 172), 308, random(171, 175));

    //eyes
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);

    //eyeballs
    frameRate(speed * 5);
    stroke(128, 128, 128);
    fill(102, 102, 51);
    ellipse(random(201, 217), random(194, 206), 18, 18);
    ellipse(random(281, 300), random(194, 206), 18, 18);

    //NOSE
    noStroke();
    fill(247, 221, 155);
    triangle(250, 220, 260, 250, 240, 250);

    //ewwww!


    //MOUTH
    frameRate(10);
    noStroke();
    fill(255, 169, 168);
    ellipse(250, 270, random(10, 20), 12);

    //shoulders
    noStroke();
    fill(247, 221, 212);
    rect(165, 315, 170, 132, 18);

    //TSHIRT
    noStroke();
    fill(102, 21, 173);
    rect(190, 310, 120, 140, 8);

    //neck
    noStroke();
    fill(247, 221, 212);
    arc(250, 310, 40, 40, 0, PI);
    rect(230, 280, 40, 30);
  }

  drawITP()
}

function mousePressed() {
  if (value == "0") {
    value = "1";
  } else {
    value = "0";
  }
  noLoop()
}

function mouseReleased() {
  loop()
}

function drawITP() {
  //ITP
  textSize(32)
  fill(random(255), random(255), random(255));
  text("!TP", 225, 350, 150, 120);
  textSize(36)
}var output = document.getElementById('output'),
    pressed = {};

window.onkeydown = function(e) {
    if ( pressed[e.which] ) return;
    pressed[e.which] = e.timeStamp;
};
    
window.onkeyup = function(e) {
    if ( !pressed[e.which] ) return;
    var duration = ( e.timeStamp - pressed[e.which] ) / 1000;
    output.innerHTML += '<p>Key ' + e.which  + ' was pressed for ' + duration + ' seconds</p>';
    pressed[e.which] = 0;
};

    let video;
let slider;
let videoScale = 32;

function setup() { 
  createCanvas (640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size (width/videoScale,height/videoScale);
  video.hide();
  // slider = createSlider(8, 64, 16);
  
} 


function draw() { 
  background(0);
  
  video.loadPixels();
  loadPixels();
  
  for(let y = 0; y < video.height; y++){
    for(let x = 0; x < video.width; x++){
      let index = (x + y * video.width)*4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
     
      let bright = (r+g+b)/3;
      
      
      let pie = map(bright, 0,255,0,6);
      
      
      noStroke();
      fill(255,bright,bright,255);
      
      arc(x * videoScale, y * videoScale, videoScale, videoScale, 0, pie, PIE);
      // fill(bright,bright,0,200);
      // ellipse(x * videoScale,y * videoScale,videoScale,videoScale)
      
      
        
      pixels[index + 0] =  bright;
      pixels[index + 1] =  bright;
      pixels[index + 2] =  bright;
      pixels[index + 3] =  255;
    
    }
  
      // videoScale = slider.value();
    
  }
  
  
 
  

}let x = 220
let y = 200
let x1 = 400
let y1 = 200
let x2 = 300
let y2 = 300


function setup() {
  createCanvas(600, 600);
  background(0)
  noCursor();
}

function mousePressed() {
  background(0);
}

function draw() {
 
  background(0,5)
  stroke(mouseY, 200, mouseX, 255, 255);
  noFill();
  quad(mouseX, mouseY, x, y,x1,y1,x2,y2);
 

  x = x + random(-5, +5);
  y = y + random(-5, +5);
  x1 = x1 + random(-5, +5);
  y1 = y1 + random(-5, +5);
  x2 = x2 + random(-5, +5);
  y2 = y2 + random(-5, +5);


}var weather;

let api = 'http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
let units = '&units=metric';

let input;

function setup() {
  createCanvas(400, 200);
  let input = "Jersey City";
}

function weatherAsk() {
  let url = api + input + apiKey + units;
  loadJSON(url, gotData);
}

function gotData(data) {
  weather = data;
}

function draw() {
  background(0);
  weatherAsk();
  if (weather) {
    let temp = weather.main.temp;
    var humidity = weather.main.humidity;
    ellipse(100, 100, temp, temp);
    ellipse(300, 100, humidity, humidity);
    console.log(temp);
  }
  
}let bubbles = [];
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  for (var i = 0; i < 1; i++) {
    bubbles[i] = new Bubble(random(width), random(height));
  }
  stroke(136, 119, 236);
}

//generate balls by mousePressed
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}


//reduce balls by keyPressed
function keyPressed() {
  bubbles.splice(0, 1);
}

function draw() {
  background(255);


  //fuzzy balls
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].shadows();
    bubbles[i].color();
    bubbles[i].update();

  }
  
  

}var clientId = '3127979041-gt4hh27ktaorbio8jmjcqldfv5a9ujql.apps.googleusercontent.com';
var apiKey = 'AIzaSyBr5w2thmXTvyVeJBgBQJqpX0jTTVtH-yo';
var scopes = 'https://www.googleapis.com/auth/gmail.readonly';

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1461'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data

var change = 0;

 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.open(portName);           // open a serial port

 function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.readLine();

 if(inByte.length >0){
  //  console.log("change email " + inByte);
 }



 // store it in a global variable:
 inData = inByte;
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function handleClientLoad() {
  // gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth, 1);
}

function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
  }, handleAuthResult);
}

function handleAuthClick() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: false
  }, handleAuthResult);
  return false;
}

function handleAuthResult(authResult) {
  if(authResult && !authResult.error) {
    window.setInterval(loadGmailApi,1000);

    $('#authorize-button').remove();
    $('.table-inbox').removeClass("hidden");
  } else {
    $('#authorize-button').removeClass("hidden");
    $('#authorize-button').on('click', function(){
      handleAuthClick();
    });
  }
}

function loadGmailApi() {
  gapi.client.load('gmail', 'v1', displayInbox);
}

function displayInbox() {
  var request = gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'q': 'label:inbox is:unread',
    'maxResults': 200000
  });

  request.execute(function(response) {
  var diff = response.resultSizeEstimate - change;
  console.log("unread messages change:" + diff);
   outByte = response.resultSizeEstimate;
   change = response.resultSizeEstimate;
   // send it out the serial port:
   serial.write(diff);
});

  // request.execute(function(response) {
  //   $.each(response.messages, function() {
  //     var messageRequest = gapi.client.gmail.users.messages.get({
  //       'userId': 'me',
  //       'id': this.id
  //     });

  //     messageRequest.execute(appendMessageRow);
  //   });
  // });
}

// function appendMessageRow(message) {
//   $('.table-inbox tbody').append(
//     '<tr>\
//       <td>'+getHeader(message.payload.headers, 'From')+'</td>\
//       <td>\
//         <a href="#message-modal-' + message.id +
//           '" data-toggle="modal" id="message-link-' + message.id+'">' +
//           getHeader(message.payload.headers, 'Subject') +
//         '</a>\
//       </td>\
//       <td>'+getHeader(message.payload.headers, 'Date')+'</td>\
//     </tr>'
//   );

//   $('body').append(
//     '<div class="modal fade" id="message-modal-' + message.id +
//         '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
//       <div class="modal-dialog modal-lg">\
//         <div class="modal-content">\
//           <div class="modal-header">\
//             <button type="button"\
//                     class="close"\
//                     data-dismiss="modal"\
//                     aria-label="Close">\
//               <span aria-hidden="true">&times;</span></button>\
//             <h4 class="modal-title" id="myModalLabel">' +
//               getHeader(message.payload.headers, 'Subject') +
//             '</h4>\
//           </div>\
//           <div class="modal-body">\
//             <iframe id="message-iframe-'+message.id+'" srcdoc="<p>Loading...</p>">\
//             </iframe>\
//           </div>\
//         </div>\
//       </div>\
//     </div>'
//   );

//   $('#message-link-'+message.id).on('click', function(){
//     var ifrm = $('#message-iframe-'+message.id)[0].contentWindow.document;
//     $('body', ifrm).html(getBody(message.payload));
//   });
// }

// function getHeader(headers, index) {
//   var header = '';

//   $.each(headers, function(){
//     if(this.name === index){
//       header = this.value;
//     }
//   });
//   return header;
// }

// function getBody(message) {
//   var encodedBody = '';
//   if(typeof message.parts === 'undefined')
//   {
//     encodedBody = message.body.data;
//   }
//   else
//   {
//     encodedBody = getHTMLPart(message.parts);
//   }
//   encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
//   return decodeURIComponent(escape(window.atob(encodedBody)));
// }

// function getHTMLPart(arr) {
//   for(var x = 0; x <= arr.length; x++)
//   {
//     if(typeof arr[x].parts === 'undefined')
//     {
//       if(arr[x].mimeType === 'text/html')
//       {
//         return arr[x].body.data;
//       }
//     }
//     else
//     {
//       return getHTMLPart(arr[x].parts);
//     }
//   }
//   return '';
// }
function setup() {
  createCanvas(400, 400);
  p5.midi.init();
}

function draw() {
  background(220);
}


function onMidiPress(button){
  console.log(button);
  key = "A";

  onKeyPress饿的（）
}

var lastTimeStamp = 0;
p5.midi.onInput = function(e) {
  if (e.timeStamp > lastTimeStamp && e.data[0] === 179 && e.data[2] === 127) {
    var button = e.data[1];
    onMidiPress(button);
    lastTimeStamp = e.timeStamp;
  }

}let headImgs = [];
let heads = [];
let notes = [];
let button;
let beat;

function preload() {
  for (var o = 0; o < 10; o++) {
    headImgs[o] = loadImage("assets/shiffmanhead" + o + ".png");
  };

  soundFormats('mp3');

  notes.push(loadSound('./assets/aoao.mp3'));
  notes.push(loadSound('./assets/danielshiffman.mp3'));
  notes.push(loadSound('./assets/donotbangintomyneibough.mp3'));
  notes.push(loadSound('./assets/havenoidea.mp3'));
  notes.push(loadSound('./assets/ilookmuchyounger.mp3'));
  notes.push(loadSound('./assets/jellyfish.mp3'));
  notes.push(loadSound('./assets/juses.mp3'));
  notes.push(loadSound('./assets/midterm.mp3'));
  notes.push(loadSound('./assets/mynameisdaniel.mp3'));
  notes.push(loadSound('./assets/thisisitp.mp3'));
  notes.push(loadSound('./assets/toolate.mp3'));
  notes.push(loadSound('./assets/uhhhhh.mp3'));
  notes.push(loadSound('./assets/wuuuuuuu.mp3'));
  notes.push(loadSound('./assets/iteachinitp.mp3'));
  notes.push(loadSound('./assets/welcome.mp3'));
  notes.push(loadSound('./assets/meow.mp3'));
  beat = loadSound('./assets/beats.mp3');

}

function setup() {
  createCanvas(600, 600);
  background(120);
  button = createButton("beats");
  button.mousePressed(beatsPlaying);
}


function beatsPlaying() {
  if (!beat.isPlaying()) {
    beat.setVolume(0.5);
    beat.play();
    button.html("pause");
  } else {
    beat.stop();
    button.html("play");
  }
}

function draw() {
  background(0);
  print(heads.length);
  if (heads.length != 0) {
    for (o = 0; o < heads.length; o++) {
      heads[o].show();
    }
  }
}

function keyPressed() {
  for (o = 0; o < 7; o++) {
    heads.push(new Head(random(width), random(height), headImgs[floor(random(0, headImgs.length))]));
    // heads.splice(0);
  }

  if (key === 'A') {
    notes[14].setVolume(0.9);
    notes[14].play();
  } else if (key === 'S') {
    notes[13].setVolume(0.9);
    notes[13].play();

  
  } else if (key === 'D') {
    notes[6].setVolume(0.9);
    notes[6].play();
  } else if (key === 'F') {
    notes[0].setVolume(0.9);
    notes[0].play();
  } else if (key === 'G') {
    notes[4].setVolume(0.9);
    notes[4].play();
  } else if (key === 'H') {
    notes[11].setVolume(0.9);
    notes[11].play();
  } else if (key === 'J') {
    notes[8].setVolume(0.9);
    notes[8].play();
  } else if (key === 'K') {
    notes[7].setVolume(0.9);
    notes[7].play();
  } else if (key === 'L') {
    notes[2].setVolume(0.9);
    notes[2].play();
  } else if (key === 'Z') {
    notes[5].setVolume(0.9);
    notes[5].play();
  } else if (key === 'X') {
    notes[10].setVolume(0.9);
    notes[10].play();
  } else if (key === 'C') {
    notes[9].setVolume(0.9);
    notes[9].play();
  } else if (key === 'V') {
    notes[12].setVolume(0.9);
    notes[12].play();
  } else if (key === 'B') {
    notes[1].setVolume(0.9);
    notes[1].play();
  } else if (key === 'N') {
    notes[3].setVolume(0.9);
    notes[3].play();
  } else if (key === 'M') {
    notes[15].setVolume(0.9);
    notes[15].play();
  }
}


class Head {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.size = 1;
  }

  show() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    scale(this.size);
    image(this.img, 0, 0);
    pop();
    if (this.size > 0) {
      this.size -= 0.02;
    }

  }
}

const midiToKeys = {
  36: "A",
  37: "S",
  38: "D",
  39: "F",
  40: "G",
  41: "H",
  42: "J",
  43: "K",
  44: "L",
  45: "Z",
  46: "X",
  47: "C",
  48: "V",
  49: "B",
  50: "N",
  51: "M",
}

function onMidiPress(button){
  key = midiToKeys[button];
 
  keyPressed();
}

var lastTimeStamp = 0;
p5.midi.onInput = function(e) {
  if (e.timeStamp > lastTimeStamp && e.data[0] === 179 && e.data[2] === 127) {
    var button = e.data[1];
    onMidiPress(button);
    lastTimeStamp = e.timeStamp;
  }

}// let i = 500;
// let shiffmanHeads = [];
let headImgs = [];
let heads = [];

function preload() {
  for (var i = 0; i< 7; i++){
        headImgs[i] = loadImage("shiffmanhead" + i + ".png"); 
  // headImgs[0] = loadImage('shiffman1.jpg');
  // headImgs[1] = loadImage('mitochondria1.png');
  // img.push(loadImage('shiffman1.jpg'));
  // img.push(loadImage('mitochondria1.png '));

}
}


function setup() {
  createCanvas(500, 500);
  // heads.push(new Head(200, 200, headImgs[0]));

}


// function keyPressed() {
//   let order = floor(random(0, headImgs.length));
//   var b = new head(random(200,400), random(200,400), headImgs[order]);
//   shiffmanHeads.push(b);
// }


function draw() {
  background(0);
  print(heads.length);
  if (heads.length != 0) {
  for (i = 0; i < heads.length; i++) {
    heads[i].show();
    // if (heads[i].size <= 0){
    //   heads.splice(heads[i]);
    // }
  }
  }
  
}

function keyPressed() {
  for (i = 0; i < 3; i++) {
    heads.push(new Head(random(width), random(height), headImgs[floor(random(0, headImgs.length))]));
    // heads.splice(0);
  }
}

// function ShowHead () {
//   // console.log(i);

//   for (let i = 500; i >0, i -=10;)
//   {
//    image(headImgs[0],200, 200, i, i);
//   }

// }let shiffmanHeads = [];
let headImgs = [];

function preload() {
  headImgs[0] = loadImage('shiffman1.jpg');
  headImgs[1] = loadImage('mitochondria1.png');
  // img.push(loadImage('shiffman1.jpg'));
  // img.push(loadImage('mitochondria1.png '));

}


function setup() {
  createCanvas(500, 500);
}


function keyPressed() {
  let order = floor(random(0, headImgs.length));
  var b = new head(random(200,400), random(200,400), headImgs[order]);
  shiffmanHeads.push(b);
}


function draw() {
  background(0);

//   push();
//   // translate(200, 200);
//   // scale(mouseX);

//   ellipse(random(200,400), random(200, 400), i, i);


//   if( i > 0)
//   {
//     i = i - 9.95;
//   }

//    pop();

// }
// function keyPressed()
// {

// }let shiffmanHeads = [];
let headImgs = [];

function preload() {
  headImgs[0] = loadImage('shiffman1.jpg');
  headImgs[1] = loadImage('mitochondria1.png');
  // img.push(loadImage('shiffman1.jpg'));
  // img.push(loadImage('mitochondria1.png '));

}


function setup() {
  createCanvas(500, 500);
}


function keyPressed() {
  let order = floor(random(0, headImgs.length));
  var b = new head(random(200,400), random(200,400), headImgs[order]);
  shiffmanHeads.push(b);
}


function draw() {
  background(0);

  for (var i = shiffmanHeads.length - 1; i >= 0; i--) {
    shiffmanHeads[i].update();
    shiffmanHeads[i].display();
  }
}
//   push();
//   // translate(200, 200);
//   // scale(mouseX);

//   ellipse(random(200,400), random(200, 400), i, i);


//   if( i > 0)
//   {
//     i = i - 9.95;
//   }

//    pop();

// }
// function keyPressed()
// {

// }var notes = [];

function preload(){

  soundFormats('mp3');

  notes.push(loadSound('./assets/aoao.mp3'));
  notes.push(loadSound('./assets/danielshiffman.mp3'));
  notes.push(loadSound('./assets/donotbangintomyneibough.mp3'));
  notes.push(loadSound('./assets/havenoidea.mp3'));
  notes.push(loadSound('./assets/ilookmuchyounger.mp3'));
  notes.push(loadSound('./assets/jellyfish.mp3'));
  notes.push(loadSound('./assets/juses.mp3'));
  notes.push(loadSound('./assets/midterm.mp3'));
  notes.push(loadSound('./assets/mynameisdaniel.mp3'));
  notes.push(loadSound('./assets/thisisitp.mp3'));
  notes.push(loadSound('./assets/toolate.mp3'));
  notes.push(loadSound('./assets/uhhhhh.mp3'));
  notes.push(loadSound('./assets/wuuuuuuu.mp3'));
  notes.push(loadSound('./assets/iteachinitp.mp3'));
  notes.push(loadSound('./assets/welcome.mp3'));

}

function setup(){
  createCanvas(1000,1000);
  background(0);
}


function keyPressed() {
  if (key === 'A') {
    notes[14].setVolume(0.9);
    notes[14].play();
  } else if (key === 'S') {
    notes[13].setVolume(0.9);
    notes[13].play();
  } else if (key === 'D') {
    notes[6].setVolume(0.9);
    notes[6].play();
  } else if (key === 'F') {
    notes[0].setVolume(0.9);
    notes[0].play();
  } else if (key === 'G') {
    notes[4].setVolume(0.9);
    notes[4].play();
  } else if (key === 'H') {
    notes[11].setVolume(0.9);
    notes[11].play();
  } else if (key === 'J') {
    notes[8].setVolume(0.9);
    notes[8].play();
  } else if (key === 'K') {
    notes[7].setVolume(0.9);
    notes[7].play();
  } else if (key === 'L') {
    notes[2].setVolume(0.9);
    notes[2].play();
  } else if (key === 'Z') {
    notes[5].setVolume(0.9);
    notes[5].play();
  } else if (key === 'X') {
    notes[10].setVolume(0.9);
    notes[10].play();
  } else if (key === 'C') {
    notes[9].setVolume(0.9);
    notes[9].play();
  } else if (key === 'V') {
    notes[12].setVolume(0.9);
    notes[12].play();
  } else if (key === 'B') {
    notes[1].setVolume(0.9);
    notes[1].play();
  } else if (key === 'N') {
    notes[3].setVolume(0.9);
    notes[3].play();
}
}
var foodlist=[
['http://weknowyourdreams.com/images/banana/banana-03.jpg','data:image/jpeg;base64,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'],
['https://upload.wikimedia.org/wikipedia/commons/f/ff/Egg_Sandwich.jpg', 'http://nofilmschool.com/sites/default/files/styles/facebook/public/donut.jpg?itok=2KIhsE9n'],
['https://igx.4sqi.net/img/general/720x540/12285172_1obE40N-4wvHtjEOc5_H8M8blnEvTpK2g3ac0xm1L6s.jpg','http://cdn1.theodysseyonline.com/files/2016/01/03/6358737839538413184635822_Chipotle_Chicken_Salad_(With_Vinaigrette)_2x.jpg']]
var calAte=0;

function setup() {
  //
  nameP = createP('Your Cal budget: 2000');	
  nameP2 = createP('You ate: 0 cal');	
  nameP.parent("calBar");
  nameP2.parent("calBar");
  
  button1=createButton("Add 80 Cal dish");
  button1.parent("button");
  button1.mousePressed(updateAte);
  
  sliderVar= createSlider(0,2,0);
  sliderVar.parent("calBar");
  sliderVar.changed(updateText);
  
}


function updateText() {
  button1.html("Add " + (sliderVar.value()*500+80) +" Cal dish")
}


function updateAte() {
 
  var dishes = createImg(random(foodlist[sliderVar.value()]));
  dishes.parent("resultArea");
  calAte=calAte+sliderVar.value()*500+80;
  
  nameP.html('Your Cal budget: '+ (2000-calAte));
  nameP2.html('You ate: '+ calAte+ ' cal');
}var serial;
var portName = '/dev/cu.usbmodem1411';


var sensorValue = 0;
var sensorValue2 = 255;


function setup() { 
  createCanvas(400, 400);
  
  serial = new p5.SerialPort();
  serial.open(portName);
  
  serial.list();

  serial.on('data', parseData);
  serial.on('open', gotOpen);

  //serial.on('list', printList);
  //serial.on('connected', serverConnected);
  //serial.on('open', portOpen);
  //serial.on('error', serverError);
} 

function draw() { 
  background(sensorValue);
  noStroke();
  //parseData();
  fill(sensorValue2);
  ellipse(200,200,100);
  //print(sensorValue);
}

function gotOpen()
{
  println("open");
}

function parseData(){
 
  var inData = serial.readLine();

  if (inData.length > 0){
     
    var values = inData.split(',');
    sensorValue = int(values[0]);
    sensorValue2 = int(values[1]);
    
    print(sensorValue);

  }
}

// function mousePressed()
// {
//   serial.write()
// }var serial;
var portName = '/dev/cu.usbmodem1411';


var sensorValue = 0;
var sensorValue2 = 255;


function setup() { 
  createCanvas(400, 400);
  
  serial = new p5.SerialPort();
  serial.open(portName);
  
  serial.list();

  serial.on('data', parseData);
  serial.on('open', gotOpen);

  //serial.on('list', printList);
  //serial.on('connected', serverConnected);
  //serial.on('open', portOpen);
  //serial.on('error', serverError);
} 

function draw() { 
  background(sensorValue);
  noStroke();
  //parseData();
  fill(sensorValue2);
  ellipse(200,200,100);
  //print(sensorValue);
}

function gotOpen()
{
  println("open");
}

function parseData(){
 
  var inData = serial.readLine();

  if (inData.length > 0){
     
    var values = inData.split(',');
    sensorValue = int(values[0]);
    sensorValue2 = int(values[1]);
    
    print(sensorValue);

  }
}var serial;
var portName = '/dev/cu.usbmodem1411';


var sensorValue = 0;
var sensorValue2 = 255;


function setup() { 
  createCanvas(400, 400);
  
  serial = new p5.SerialPort();
  serial.open(portName);
  
  serial.list();

  serial.on('data', parseData);
  serial.on('open', gotOpen);

  //serial.on('list', printList);
  //serial.on('connected', serverConnected);
  //serial.on('open', portOpen);
  //serial.on('error', serverError);
} 

function draw() { 
  background(sensorValue);
  noStroke();
  //parseData();
  fill(sensorValue2);
  ellipse(200,200,100);
  //print(sensorValue);
}

function gotOpen()
{
  println("open");
}

function parseData(){
 
  var inData = serial.readLine();

  if (inData.length > 0){
     
    var values = inData.split(',');
    sensorValue = int(values[0]);
    sensorValue2 = int(values[1]);
    
    print(sensorValue);

  }
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1451'; // fill in your serial port name here
var inData; // for incoming serial data
var sensorValue = 0;
// Then modify the serialEvent() function like so:


function setup() {
  serial = new p5.SerialPort();
  serial.on("data",serialEvent);
  
  serial.open(portName);
  createCanvas(400, 300);


}

function draw() {
    background(0);
    fill(sensorValue);
  	ellipse(100,100,100);
    

  }      
         
  function serialEvent() {
    inData = serial.readLine();
    if(inData.length>0){
     sensorValue = int(map(inData,0,1023,0,255)); 
      print(sensorValue);
    }
  
}
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData; // for incoming serial data
var sensorValue = 0;
// Then modify the serialEvent() function like so:


function setup() {
  serial = new p5.SerialPort();
  serial.on("data",serialEvent);
  
  //serial.on("open", openIt);
  
  serial.open(portName);
  createCanvas(400, 300);


}
function openIt()
{
  print("S");
}
function draw() {
    background(0);
    fill(sensorValue);
  	ellipse(100,100,100);
    

  }      
         
  function serialEvent() {
    inData = serial.readLine();
    values = split(inData, ',');
    if(values.length>0){
     sensorValue = int(map(values[0],0,1023,0,255)); 
      print(sensorValue);
    }
  
}
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1451'; // fill in your serial port name here
var inData; // for incoming serial data
var sensorValue = 0;
// Then modify the serialEvent() function like so:


function setup() {
  serial = new p5.SerialPort();
  serial.on("data",serialEvent);
  
  serial.open(portName);
  createCanvas(400, 300);


}

function draw() {
    background(0);
    fill(sensorValue);
  	ellipse(100,100,100);
    

  }      
         
  function serialEvent() {
    inData = serial.readLine();
    if(inData.length>0){
     sensorValue = int(map(inData,0,1023,0,255)); 
      print(sensorValue);
    }
  
}
var serial; // variable to hold an instance of the serialport library
 
function setup() {
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 
 serial.list(); // list the serial ports
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " \" + portList[i]);
 }
}let bubbles = [];
let img;


function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("p5.jpg");

  for (var i = 0; i < 1; i++) {
    bubbles[i] = new Bubble(random(width), random(height));
  }
  stroke(136, 119, 236);
}

//generate balls by mousePressed
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}


//reduce balls by keyPressed
function keyPressed() {
  bubbles.splice(0, 1);
}

function draw() {
  //background pics
  image(img, 0, 0, width, height);

  //fuzzy balls
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].shadows();
    bubbles[i].color();
    bubbles[i].update();

  }
  
  

}let bubbles = [];

function setup() {
  createCanvas(200, 200);
  for (var i = 0; i < bubbles.length; i++) {
    let x = random(width);
    let y = random(height);
    bubbles.push(new Bubble(x, y));
  }
}

function mousePressed() {
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked();
  }
}

function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}


class Bubble {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.col = color(255, 100);
  }

  show() {
    stroke(255);
    fill(this.col);
    ellipse(this.x, this.y, 30, 30);
  }

  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);

  }
  
  clicked() {
    var d = distance(mouseX, mouseY, this.x, this.y);
    if (d < 10) {
      this.col = color(0, random(255), random(100, 255));
    }
  }
}var bubbles = [];

function setup() { 
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 1; i++) { 
    bubbles[i] = new Bubble(random(width), random(height)); 
  } 

  stroke(141, 115, 243);
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY)); 
}

function keyPressed() {
  bubbles.splice(0,1);    
}

function draw() {
  background(255);
  for (var i = 0;i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].show();
      
  
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      } 
    }
  }
}   
var bubbles = [];

function setup() { 
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 1; i++) { 
    bubbles[i] = new Bubble(random(width), random(height)); 
  } 

  stroke(141, 115, 243);
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY)); 
}

function keyPressed() {
  bubbles.splice(0,1);    
}

function draw() {
  background(255);
  for (var i = 0;i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].show();
      
  
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      } 
    }
  }
}   
var bubbles = [];

function setup() { 
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 1; i++) { 
    bubbles[i] = new Bubble(random(width), random(height)); 
  } 

  stroke(141, 115, 243);
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY)); 
}

function keyPressed() {
  bubbles.splice(0,1);    
}

function draw() {
  background(255);
  for (var i = 0;i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].show();
      
  
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      } 
    }
  }
}   
var bubbles = [];

function setup() { 
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 1; i++) { 
    bubbles[i] = new Bubble(random(width), random(height)); 
  } 

  stroke(141, 115, 243);
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY)); 
}

function keyPressed() {
  bubbles.splice(0,1);    
}

function draw() {
  background(255);
  for (var i = 0;i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].show();
      
  
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      } 
    }
  }
}   
var bubbles = [];

function setup() { 
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 1; i++) { 
    bubbles[i] = new Bubble(random(width), random(height)); 
  } 

  stroke(141, 115, 243);
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY)); 
}

function keyPressed() {
  bubbles.splice(0,1);    
}

function draw() {
  background(255);
  for (var i = 0;i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].show();
      
  
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      } 
    }
  }
}   
let particles = [];


function setup() { 
  createCanvas(400, 400);
  particle = new particle(100, 100); 
} 

function mousePressed(){
  particles.push(new particle(mouseX, mouseY, i,i\\\\))
}

function draw() { 
  background(220);
  for (let i = 0; i < particles.length; i++){
    
     particles[i].update();
     particle[i].show();
  }
}let gravity = 0.1;
let bouncer;



function setup() {
  createCanvas(400, 400);
  bouncer = new Ball();
  console.log(bouncer);
}

function draw() {
  background(220);
  bouncer.move();
  bouncer.show();
}

let gravity = 0.1;
let bouncer;


function setup() { 
  createCanvas(400, 400);
  bouncer = new Ball();
  console.log(bouncer);
} 

function draw(){
  background(220);
  bouncer.move();
  bouncer.show();
}


let x = 0;
let y = 0;
let size = 20;

function setup() { 
  createCanvas(500, 500);
	background(0);
} 

function draw() { 
	stroke (255);
	if ( random (1) < 0.5) {
		line( x, y, x + size, y + size)}
	else
		line(x, y + size, x + size, y);

  x = x + size;
	if (x > width) {
		x = 0;
	  y = y + size}

}var horizontalWalls = [];
var verticalWalls = [];

function setup() {
   frameRate(40)
   createCanvas(701, 351);
   pos_a = {
     x: 0,
     y: 0
   };
   pos_b = {
     x: 17,
     y: 7
   };
   up_pressed = false;
   down_pressed = false;
   left_pressed = false;
   right_pressed = false;
   w_pressed = false;
   s_pressed = false;
   a_pressed = false;
   d_pressed = false;
   finshed = false;

   direction_a = {
     x: 0,
     y: 0
   };

   direction_b = {
     x: 0,
     y: 0
   };

   
   for (x = 0; x < 18; x+=2) {
     horizontalWalls[x] = [];
     verticalWalls[x] = [];
     for (y = 0; y < 8; y+=2) {
       horizontalWalls[x][y] = str(int(random(0, 2)));
       verticalWalls[x][y] = str(int(random(0, 2)));
     }
   }
   print(horizontalWalls);

   /*   
     horizontal_walls = [
       "111111111111111111",
       "111111111111111110",
       "011111111111111111",
       "000000000000000000",
       "000000000000000000",
       "000000000000000000",
       "000000000000000000",
       "000000000000000000",
       "111111111111111111",
     ];
     vertical_walls = [
       "1000000000000000001",
       "1000000000000000001",
       "1000000000000000001",
       "1000000000100000001",
       "1000000000000000001",
       "1000000000000000001",
       "1000000000000000001",
       "1000000000000000001",
       "1000000000000000001",
     ];
   */
 }

 function draw_map() {

   background(0);
   noStroke();

   var gridSize = 35;

   for (var x = 0; x < 18; x+=2) {
     for (var y = 0; y < 8; y+=2) {
       noStroke();
       fill(255);
       rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, 2, 2);
       if (x < 18 && horizontalWalls[x][y] == '1') {
         noStroke();
         rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, gridSize, 2);
       }
       if (y < 8 && verticalWalls[x][y] == '1') {
         noStroke();
         rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, 2, gridSize);
       }
       //console.log(x, y);
     }
   }
 }

 function draw_player(pos, direction, face_color) {
   var face_x_offset = 2.5 * direction.x;
   var face_y_offset = 2.5 * direction.y;
   fill(face_color);
   var face_base_x = pos.x * 35 + 37.5;
   var face_base_y = pos.y * 35 + 37.5;
   rect(face_base_x, face_base_y, 30, 30);
   fill(0, 0, 0);
   rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
   rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
   rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
 }

 function draw_players() {
   draw_player(pos_a, direction_a, color(128));
   draw_player(pos_b, direction_b, color(255));
 }

 //role change
//  var colorA=color(178, 34, 34);
//  var colorB=color(255);
//  setTimeout(function changeRoll() {
//    if(rollA==false){
//      rollA=true;
//     }else{
//     rollA=false;
//     }, 3000);
 
   
//      if (rollA == false) {
//        colorA = color(128);
//        colorB = color(240, 128, 128) //ghost
//      } else {
//        colorA = color(178, 34, 34); //ghost
//        colorB = color(255)
//      }
   
 

 function draw() {
   draw_map(220);
   if (!finshed) {
     control_players();
     draw_players();
   }
 }

 function move_player(pos, direction, x_offset, y_offset) {
   if (x_offset == 0) {
     direction.x = 0;
   } else {
     direction.x = x_offset > 0 ? 1 : -1;
   }
   if (y_offset == 0) {
     direction.y = 0;
   } else {
     direction.y = y_offset > 0 ? 1 : -1;
   }
   if (x_offset != 0 && vertical_walls[pos.y].charAt(pos.x + (direction.x > 0 ? 1 : 0)) == "0") {
     pos.x += x_offset;
   }
   if (y_offset != 0 && horizontal_walls[pos.y + (direction.y > 0 ? 1 : 0)].charAt(pos.x) == "0") {
     pos.y += y_offset;
   }
 }

 function control_player_a() {
   if (keyIsDown(UP_ARROW) || up_pressed) {
     move_player(pos_a, direction_a, 0, -1);
     up_pressed = false;
   } else if (keyIsDown(DOWN_ARROW) || down_pressed) {
     move_player(pos_a, direction_a, 0, 1);
     down_pressed = false;
   } else if (keyIsDown(LEFT_ARROW) || left_pressed) {
     move_player(pos_a, direction_a, -1, 0);
     left_pressed = false;
   } else if (keyIsDown(RIGHT_ARROW) || right_pressed) {
     move_player(pos_a, direction_a, 1, 0);
     right_pressed = false;
   }
 }

 function control_player_b() {
   if (keyIsDown('W'.charCodeAt(0)) || w_pressed) {
     move_player(pos_b, direction_b, 0, -1);
     w_pressed = false;
   } else if (keyIsDown('S'.charCodeAt(0)) || s_pressed) {
     move_player(pos_b, direction_b, 0, 1);
     s_pressed = false;
   } else if (keyIsDown('A'.charCodeAt(0)) || a_pressed) {
     move_player(pos_b, direction_b, -1, 0);
     a_pressed = false;
   } else if (keyIsDown('D'.charCodeAt(0)) || d_pressed) {
     move_player(pos_b, direction_b, 1, 0);
     d_pressed = false;
   }
 }

 function control_players() {
   if (frameCount % 5 != 0)
     return;
   control_player_a();
   control_player_b();
   if (pos_a.x == pos_b.x && pos_a.y == pos_b.y) {
     finshed = true;
   }
 }

 function keyPressed() {
   console.log(keyCode);
   switch (keyCode) {
     case UP_ARROW:
       up_pressed = true;
       break;
     case DOWN_ARROW:
       down_pressed = true;
       break;
     case LEFT_ARROW:
       left_pressed = true;
       break;
     case RIGHT_ARROW:
       right_pressed = true;
       break;
     case 'W'.charCodeAt(0):
       w_pressed = true;
       break;
     case 'S'.charCodeAt(0):
       s_pressed = true;
       break;
     case 'A'.charCodeAt(0):
       a_pressed = true;
       break;
     case 'D'.charCodeAt(0):
       d_pressed = true;
       break;
   };
 };let horizontal_walls = [];
let vertical_walls = [];

function setup() {
  frameRate(40)
  createCanvas(701, 351);
  pos_a = {
    x: 0,
    y: 0
  };
  pos_b = {
    x: 17,
    y: 7
  };
  up_pressed = false;
  down_pressed = false;
  left_pressed = false;
  right_pressed = false;
  w_pressed = false;
  s_pressed = false;
  a_pressed = false;
  d_pressed = false;
  finshed = false;
  direction_a = {
    x: 0,
    y: 0
  };
  direction_b = {
    x: 0,
    y: 0
  };
  makeWalls();
}

function draw_map() {

  background(0);
  noStroke();

  var gridSize = 35;

  for (var x = 0; x <= 18; x++) {
    for (var y = 0; y <= 8; y++) {
      noStroke();
      fill(255);
      rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, 2, 2);
      if (x < 18 && horizontal_walls[y].charAt(x) == '1') {
        noStroke();
        rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, gridSize, 2);
      }
      if (y < 8 && vertical_walls[y].charAt(x) == '1') {
        noStroke();
        rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, 2, gridSize);
      }
      //console.log(x, y);
    }
  }
}

function draw_player(pos, direction, face_color) {
  var face_x_offset = 2.5 * direction.x;
  var face_y_offset = 2.5 * direction.y;
  fill(face_color);
  var face_base_x = pos.x * 35 + 37.5;
  var face_base_y = pos.y * 35 + 37.5;
  rect(face_base_x, face_base_y, 30, 30);
  fill(0, 0, 0);
  rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
}

function draw_players() {
  draw_player(pos_a, direction_a, color(128));
  draw_player(pos_b, direction_b, color(255));
}

function draw() {
  draw_map(220);
  if (!finshed) {
    control_players();
    draw_players();
  }
  print(horizontal_walls);
}

function move_player(pos, direction, x_offset, y_offset) {
  if (x_offset == 0) {
    direction.x = 0;
  } else {
    direction.x = x_offset > 0 ? 1 : -1;
  }
  if (y_offset == 0) {
    direction.y = 0;
  } else {
    direction.y = y_offset > 0 ? 1 : -1;
  }
  if (x_offset != 0 && vertical_walls[pos.y].charAt(pos.x + (direction.x > 0 ? 1 : 0)) == "0") {
    pos.x += x_offset;
  }
  if (y_offset != 0 && horizontal_walls[pos.y + (direction.y > 0 ? 1 : 0)].charAt(pos.x) == "0") {
    pos.y += y_offset;
  }
}

function control_player_a() {
  if (keyIsDown(UP_ARROW) || up_pressed) {
    move_player(pos_a, direction_a, 0, -1);
    up_pressed = false;
  } else if (keyIsDown(DOWN_ARROW) || down_pressed) {
    move_player(pos_a, direction_a, 0, 1);
    down_pressed = false;
  } else if (keyIsDown(LEFT_ARROW) || left_pressed) {
    move_player(pos_a, direction_a, -1, 0);
    left_pressed = false;
  } else if (keyIsDown(RIGHT_ARROW) || right_pressed) {
    move_player(pos_a, direction_a, 1, 0);
    right_pressed = false;
  }
}

function control_player_b() {
  if (keyIsDown('W'.charCodeAt(0)) || w_pressed) {
    move_player(pos_b, direction_b, 0, -1);
    w_pressed = false;
  } else if (keyIsDown('S'.charCodeAt(0)) || s_pressed) {
    move_player(pos_b, direction_b, 0, 1);
    s_pressed = false;
  } else if (keyIsDown('A'.charCodeAt(0)) || a_pressed) {
    move_player(pos_b, direction_b, -1, 0);
    a_pressed = false;
  } else if (keyIsDown('D'.charCodeAt(0)) || d_pressed) {
    move_player(pos_b, direction_b, 1, 0);
    d_pressed = false;
  }
}

function control_players() {
  if (frameCount % 5 != 0)
    return;
  control_player_a();
  control_player_b();
  if (pos_a.x == pos_b.x && pos_a.y == pos_b.y) {
    finshed = true;
  }
}

function keyPressed() {
  console.log(keyCode);
  switch (keyCode) {
    case UP_ARROW:
      up_pressed = true;
      break;
    case DOWN_ARROW:
      down_pressed = true;
      break;
    case LEFT_ARROW:
      left_pressed = true;
      break;
    case RIGHT_ARROW:
      right_pressed = true;
      break;
    case 'W'.charCodeAt(0):
      w_pressed = true;
      break;
    case 'S'.charCodeAt(0):
      s_pressed = true;
      break;
    case 'A'.charCodeAt(0):
      a_pressed = true;
      break;
    case 'D'.charCodeAt(0):
      d_pressed = true;
      break;
  };
};

function makeWalls() {
  // wall x
  horizontal_walls.push("111111111111111111");
  for (var x = 0; x <= 6; x++) {
    wall = makeWallX();
    horizontal_walls.push(wall);
  }
  horizontal_walls.push("111111111111111111");

  // wall y
  for (var y = 0; y <= 8; y++) {
    wall = makeWallY();
    vertical_walls.push(wall);
  }

  function makeWallX() {
    var text = "";
    var possible = "00001";
    for (var i = 0; i < 18; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  function makeWallY() {
    var text = "1";
    var possible = "00001";
    for (var i = 0; i < 17; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    text += "1";
    return text;
  }
}function setup() {
	frameRate(40)
  createCanvas(701, 351);
  pos_a = {x: 0, y: 0};
  pos_b = {x: 17, y: 7};
	up_pressed = false;
	down_pressed = false;
	left_pressed = false;
	right_pressed = false;
  w_pressed = false;
  s_pressed = false;
  a_pressed = false;
  d_pressed = false;
  finshed = false;
	direction_a = {x: 0, y: 0};
	direction_b = {x: 0, y: 0};
  
  horizontal_walls = [
		"111111111111111111",
		"000000000000000000",
		"000000000000000000",
		"000111111111000000",
		"000000000000000000",
		"001110000000000000",
		"000011000000000000",
		"000000000000000000",
		"111111111111111111",
	];
  vertical_walls = [
		"1000000000000000001",
		"1000111110000000001",
		"1000000000000000001",
		"1000000000001110001",
		"1000000000000000001",
		"1000000000000000001",
		"1000011111111111001",
		"1000000000000000001",
		"1000000000000000001",
	];
}

function draw_map() {
	
  background(0); 
  noStroke();
	
  var gridSize = 35;

  for (var x = 0; x <= 18; x++) {
    for (var y = 0; y <= 8; y++) {
      noStroke();
      fill(255);
      rect((x + 1) * gridSize - 1, (y + 1) * gridSize -1, 2, 2);
      if (x < 18 && horizontal_walls[y].charAt(x) == '1') {
        noStroke();
        rect((x + 1) * gridSize - 1, (y + 1) * gridSize -1, gridSize, 2);
      }
      if (y < 8 && vertical_walls[y].charAt(x) == '1') {
        noStroke();
        rect((x + 1) * gridSize - 1, (y + 1) * gridSize -1, 2, gridSize);
      }

    }
  }
}

function draw_player(pos, direction, face_color) {
  var face_x_offset = 2.5 * direction.x;
	var face_y_offset = 2.5 * direction.y;
  fill(face_color);
	var face_base_x = pos.x * 35 + 37.5;
	var face_base_y = pos.y * 35 + 37.5;
  rect(face_base_x, face_base_y, 30, 30);
  fill(0, 0, 0);
  rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
}

function draw_players() {
	draw_player(pos_a, direction_a, color(128));
	draw_player(pos_b, direction_b, color(255));
}

function draw() { 
  draw_map(220);
  if (!finshed) {
	  control_players();
	  draw_players();
  }
}

function move_player(pos, direction, x_offset, y_offset) {
	if (x_offset == 0) {
		direction.x = 0;
	} else {
		direction.x = x_offset > 0 ? 1 : -1;
	}
	if (y_offset == 0) {
		direction.y = 0;
	} else {
		direction.y = y_offset > 0 ? 1 : -1;
	}
  if (x_offset != 0 && vertical_walls[pos.y].charAt(pos.x + (direction.x > 0 ? 1 : 0)) == "0") {
	  pos.x += x_offset;
  }
  if (y_offset != 0 && horizontal_walls[pos.y + (direction.y > 0 ? 1 : 0)].charAt(pos.x) == "0") {
	  pos.y += y_offset;
  }
}

function control_player_a() {
  if (keyIsDown(UP_ARROW) || up_pressed) {
		move_player(pos_a, direction_a, 0, -1);
		up_pressed = false;
	} else if (keyIsDown(DOWN_ARROW) || down_pressed) {
		move_player(pos_a, direction_a, 0, 1);
		down_pressed = false;
	} else if (keyIsDown(LEFT_ARROW) || left_pressed) {
		move_player(pos_a, direction_a, -1, 0);
		left_pressed = false;
	} else if (keyIsDown(RIGHT_ARROW) || right_pressed) {
		move_player(pos_a, direction_a, 1, 0);
		right_pressed = false;
	} 
}

function control_player_b() {
  if (keyIsDown('W'.charCodeAt(0)) || w_pressed) {
		move_player(pos_b, direction_b, 0, -1);
		w_pressed = false;
	} else if (keyIsDown('S'.charCodeAt(0)) || s_pressed) {
		move_player(pos_b, direction_b, 0, 1);
		s_pressed = false;
	} else if (keyIsDown('A'.charCodeAt(0)) || a_pressed) {
		move_player(pos_b, direction_b, -1, 0);
		a_pressed = false;
	} else if (keyIsDown('D'.charCodeAt(0)) || d_pressed) {
		move_player(pos_b, direction_b, 1, 0);
		d_pressed = false;
	} 
}

function control_players() {
	if (frameCount % 5 != 0)
		return;
  control_player_a();
  control_player_b();
  if (pos_a.x == pos_b.x && pos_a.y == pos_b.y) {
    finshed = true;
  }
}

function keyPressed() { 
	switch(keyCode){
      case UP_ARROW:
		    up_pressed = true;
        break;
      case DOWN_ARROW:
				down_pressed = true;
        break;
      case LEFT_ARROW:
				left_pressed = true;
      	break;
      case RIGHT_ARROW:
				right_pressed = true;
        break;
      case 'W'.charCodeAt(0):
				w_pressed = true;
        break;
      case 'S'.charCodeAt(0):
				s_pressed = true;
        break;
      case 'A'.charCodeAt(0):
				a_pressed = true;
        break;
      case 'D'.charCodeAt(0):
				d_pressed = true;
        break;
  };
};
function setup() {
	frameRate(60)
  createCanvas(701, 351);
  //charactor a
  pos_a_x = 0;
  pos_a_y = 0;    
  up_pressed = false;
	down_pressed = false;
	left_pressed = false;
	right_pressed = false;
	direction_a_x = 0;
	direction_a_y = 0;
  
  //charactor b
  pos_b_x = 17;
  pos_b_y = 7;
  w_pressed = false;
  s_pressed = false;
  a_pressed = false;
	d_pressed = false;
	direction_b_x = 0;
	direction_b_y = 0;
}


function draw_map() {
	
  background(0); 
  noStroke();
	
	var map = [
		"+",
		"+",
		"+",
		"",
		"",
		"",
		"",
		"",
	];

  var gridSize = 35;

  for (var x = gridSize; x <= width - gridSize; x += gridSize) {
    for (var y = gridSize; y <= height - gridSize; y += gridSize) {
      noStroke();
      fill(255);
      rect(x-1, y-1, 3, 3);
			//console.log(x, y);
    }
  }
}

function draw_player_a() {
  var face_x_offset = 2.5 * direction_a_x;
	var face_y_offset = 2.5 * direction_a_y;
  fill(255, 255, 255);
	var face_base_x = pos_a_x * 35 + 37;
	var face_base_y = pos_a_y * 35 + 37;
  rect(face_base_x, face_base_y, 30, 30);
  fill(0, 0, 0);
  rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
}

function draw_player_b() {
  var face_offset = 2.5 * direction_b_x;
  var face_base_y = 2.5 * direction_b_y;
  fill(25, 255, 255);
  var face_base_x = pos_b_x * 35 + 37;
	var face_base_y = pos_b_y * 35 + 37;
  ellipse(face_base_x, face_base_y, 30, 30);
  fill(0, 0, 0);
  rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
}
  
function draw_players() {
	draw_player_a();
  draw_player_b();
}

function draw() { 
  draw_map(220);
	draw_players();
	control_players();
}

function move_player_a(x_offset, y_offset) {
	if (x_offset == 0) {
		direction_a_x = 0;
	} else {
		direction_a_x = x_offset > 0 ? 1 : -1;
	}
	if (y_offset == 0) {
		direction_a_y = 0;
	} else {
		direction_a_y = y_offset > 0 ? 1 : -1;
	}
	pos_a_x += x_offset;
	pos_a_x = Math.min(pos_a_x, 17);
	pos_a_x = Math.max(pos_a_x, 0);
	pos_a_y += y_offset;
	pos_a_y = Math.min(pos_a_y, 7);
	pos_a_y = Math.max(pos_a_y, 0);
}

function move_player_b(x_offset, y_offset) {
	if (x_offset == 0) {
		direction_b_x = 0;
	} else {
		direction_b_x = x_offset > 0 ? 1 : -1;
	}
	if (y_offset == 0) {
		direction_b_y = 0;
	} else {
		direction_b_y = y_offset > 0 ? 1 : -1;
	}
	pos_b_x += x_offset;
	pos_b_x = Math.min(pos_a_x, 17);
	pos_b_x = Math.max(pos_a_x, 0);
	pos_b_y += y_offset;
	pos_b_y = Math.min(pos_a_y, 7);
	pos_b_y = Math.max(pos_a_y, 0);
}


function control_player_a() {
  if (keyIsDown(UP_ARROW) || up_pressed) {
		move_player_a(0, -1);
		up_pressed = false;
	} else if (keyIsDown(DOWN_ARROW) || down_pressed) {
		move_player_a(0, 1);
		down_pressed = false;
	} else if (keyIsDown(LEFT_ARROW) || left_pressed) {
		move_player_a(-1, 0);
		left_pressed = false;
	} else if (keyIsDown(RIGHT_ARROW) || right_pressed) {
		move_player_a(1, 0);
		right_pressed = false;
	} 
}

function control_players() {
	if (frameCount % 5 != 0)
		return;
  control_player_a();
}

function keyPressed() { 
	switch(keyCode){
      case UP_ARROW:
		    up_pressed = true;
        break;
        
      case DOWN_ARROW:
				down_pressed = true;
        break;
        
      case LEFT_ARROW:
				left_pressed = true;
      	break;
        
      case RIGHT_ARROW:
				right_pressed = true;
        break;
			
  };
};function setup() {
	frameRate(60)
  createCanvas(701, 351);
  、、
  pos_a_x = 0;
  pos_a_y = 0;    
  up_pressed = false;
	down_pressed = false;
	left_pressed = false;
	right_pressed = false;
	direction_a_x = 0;
	direction_a_y = 0;
}

function draw_map() {
	
  background(0); 
  noStroke();
	
	var map = [
		"+",
		"+",
		"+",
		"",
		"",
		"",
		"",
		"",
	];

  var gridSize = 35;

  for (var x = gridSize; x <= width - gridSize; x += gridSize) {
    for (var y = gridSize; y <= height - gridSize; y += gridSize) {
      noStroke();
      fill(255);
      rect(x-1, y-1, 3, 3);
			//console.log(x, y);
    }
  }
}

function draw_player_a() {
  var face_x_offset = 2.5 * direction_a_x;
	var face_y_offset = 2.5 * direction_a_y;
  fill(255, 255, 255);
	var face_base_x = pos_a_x * 35 + 37;
	var face_base_y = pos_a_y * 35 + 37;
  rect(face_base_x, face_base_y, 30, 30);
  fill(0, 0, 0);
  rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
}

function draw_players() {
	draw_player_a();
}

function draw() { 
  draw_map(220);
	draw_players();
	control_players();
}

function move_player_a(x_offset, y_offset) {
	if (x_offset == 0) {
		direction_a_x = 0;
	} else {
		direction_a_x = x_offset > 0 ? 1 : -1;
	}
	if (y_offset == 0) {
		direction_a_y = 0;
	} else {
		direction_a_y = y_offset > 0 ? 1 : -1;
	}
	pos_a_x += x_offset;
	pos_a_x = Math.min(pos_a_x, 17);
	pos_a_x = Math.max(pos_a_x, 0);
	pos_a_y += y_offset;
	pos_a_y = Math.min(pos_a_y, 7);
	pos_a_y = Math.max(pos_a_y, 0);
}

function control_player_a() {
  if (keyIsDown(UP_ARROW) || up_pressed) {
		move_player_a(0, -1);
		up_pressed = false;
	} else if (keyIsDown(DOWN_ARROW) || down_pressed) {
		move_player_a(0, 1);
		down_pressed = false;
	} else if (keyIsDown(LEFT_ARROW) || left_pressed) {
		move_player_a(-1, 0);
		left_pressed = false;
	} else if (keyIsDown(RIGHT_ARROW) || right_pressed) {
		move_player_a(1, 0);
		right_pressed = false;
	} 
}

function control_players() {
	if (frameCount % 5 != 0)
		return;
  control_player_a();
}

function keyPressed() { 
	switch(keyCode){
      case UP_ARROW:
		    up_pressed = true;
        break;
        
      case DOWN_ARROW:
				down_pressed = true;
        break;
        
      case LEFT_ARROW:
				left_pressed = true;
      	break;
        
      case RIGHT_ARROW:
				right_pressed = true;
        break;
			
  };
};//Week2 ICM Make it move!
//Chelsea's Confused by Coding
var value = "0";
var a = 10;


function setup() {
  createCanvas(500, 500);
}


function draw() {
  background(255);



  //code
  fill(212);
  textSize(20);
  text("var{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;}{stroke(123,123,321(123,123,321)fill(255,255,255)set;{stroke(123,123,321)}var{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;}{stroke(123,123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;{stroke(123,123,3}", 0 + a, 0, 500, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;};noStroke();fill(247,221,212)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)23,321(123,123,321)fill(255,255,255)set;{st123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,", 5 + a, 25, 150, 120);
  text("(123,123,321)fill(255,255,255)set;}ITPIsAwesomeWeLoveCodingtrainarc(250,245,270,420,ke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;}TPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)23,321(123,123,321)fill(255,255,255)set;{st123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 50, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);21,212);noStroke();fill(247,221,212);ellipse(250,200,190,200);ellipse(250,200,190,200)23,321(123,123,321)fill(255,255,255)set;23,321(123,123,321)fill(255,255,255)set;123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke5,255,255)set;};noStroke();fil(123,{st{stl(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 75, 150, 120);
  text("triangle(250,220,260,250,240,250)}{)setvar=1{(200,123,48,);noStroke();fill(247,221,212);ellipse(250,200,190,200);}23,321(123,123,321)fill(255,255,255)set;{st23,321(123,123,321)fill(255,255,255)123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,set;{star{sl(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 100, 150, 120);
  text("fill(255,255,255)set;var{stroke(12fill(255,255,255)set;}ITPIsAwesome)5,255,255)set;};noStroke();filsetvar=15,255,255)set;};noStroke();fil{(200,123,48,;noStroke();(123,123,321)fillnoStroke();23,321)fill(255,255,255)set;23,321(123,123,321)fill(255,255,255)set;123,321)fill(247,221,212))l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 125, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();5,255,255)set;};noStroke();filfill(247,221,212);23,321)fill(255,255,255)set;23,321(123,123,321)fill(255,255,255)set;123,321)ellipse(250,200,190,200);5,255,255)set;};noStroke();filect(165,315,170,132,18);l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 150, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255,255)set;}ect(165,315,170,132,18);ect(165,315,170,132,18);ect(165,315,170,132,18);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320)l(255,255}ar{stroke(123,123,321)fill(255,255,255)200;", 5 + a, 175, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255}ar{stroke(123,123);fill(247,221,212)vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320)l(255,255}ar{stroke(123,123,321)fill(255,255,255)200;", 5 + a, 200, 150, 120);
  text("(123,123,321)fill(255,255,255)set;}vertex(490,320);ITPIsAwesomeWeLoveCodingtrainarc(250,245,270,420,ke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)200,123,48,;noStroke();(123,123,321)fillnoStroke()200,123,48,;noStroke();(123,123,321)fillnoStroke()set;}l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 225, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);21,212);noStroke();fill(247,221,212)vertex(490,320);;ellipse(250,200,190,200)vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);)set;123,321)ellipse(250,200,190,200);5,255,255)set;};noStroke();ellipse(250,200,190,200)l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 250, 150, 120);
  text("triangle(250, 220, 260, 250, 240, 250)}{)setvar=1{(200,123,48,);noStroke();fill(247,221,212);23,321)fill(255,255,255)set;23,321(123,123,321)fill(255,255,255)set;123,321)ellipse(250,200,190,200);}ar)set;123,321)ellipse(250,200,190,200);5,255,255)set;};noStroke(){sl(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 275, 150, 120);
  text("fill(255,255,255)set;var{stroke(12fill(255,255,255)set;}ITPIsAwesome)setvar=1{(200,123,48,;noStroke();(123,123,321)fill(255,255,255)set;};noStroke()fill(247,221,212);noStroke();fill(247,221,212))l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 300, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);vertex(490,320);noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();fill(247,221,212);ellipse(250,200,190,200);l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 325, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);vertex(490,320);}ar{stroke(123,123,321)fill(255,255,255)set;}l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 5 + a, 375, 150, 120);
  a = a + 4
  if (a > 0) {
    a = -1000
  }



  if (value == "0") {

    //hair
    noStroke()
    fill(64, 51, 38);
    arc(250, 245, 270, 420, QUARTER_PI + HALF_PI, QUARTER_PI);

    //ear
    fill(247, 221, 212);
    ellipse(163, 215, 50, 50);

    //face
    noStroke();
    fill(247, 221, 212);
    ellipse(250, 200, 190, 200);

    //check
    noStroke();
    fill(255, 184, 194);
    ellipse(200, 230, 30, 20);
    ellipse(300, 230, 30, 20);

    //bang
    noStroke();
    fill(64, 51, 38);
    arc(250, 130, 160, 80, Math.PI, 0);
    arc(300, 100, 270, 125, 0.25 * Math.PI, Math.PI);

    //eyebrows
    stroke(64, 51, 38);
    strokeWeight(6);
    line(190, 173, 220, 170);
    line(278, 170, 308, 173);

    //eyes
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);

    //eyeballs
    stroke(128, 128, 128);
    fill(102, 102, 51);
    ellipse(209, 200, 18, 18);
    ellipse(291, 200, 18, 18);

    //NOSE
    noStroke();
    fill(247, 221, 155);
    triangle(250, 220, 260, 250, 240, 250);

    //MOUTH
    noStroke();
    fill(255, 169, 168);
    ellipse(250, 270, 12, 12);

    //shoulders
    noStroke();
    fill(247, 221, 212);
    rect(165, 315, 170, 132, 18);

    //TSHIRT
    noStroke();
    fill(102, 21, 173);
    rect(190, 310, 120, 140, 8);

    //neck
    noStroke();
    fill(247, 221, 212);
    arc(250, 310, 40, 40, 0, PI);
    rect(230, 280, 40, 30);



  } else if (value == "1") {


    //hair
    noStroke()
    fill(64, 51, 38);
    arc(250, 245, 270, 420, QUARTER_PI + HALF_PI, QUARTER_PI);

    //ear
    fill(247, 221, 212);
    ellipse(163, 215, 50, 50);

    //face
    noStroke();
    fill(247, 221, 212);
    ellipse(250, 200, 190, 200);

    //check
    frameRate(15);
    noStroke();
    fill(255, random(164, 171), random(196, 212));
    ellipse(random(197, 203), random(228, 232), 30, 20);
    ellipse(random(297, 303), random(228, 232), 30, 20);

    //bang
    noStroke();
    fill(64, 51, 38);
    arc(250, 130, 160, 80, Math.PI, 0);
    arc(300, 100, 270, 125, 0.25 * Math.PI, Math.PI);

    //eyebrows
    frameRate(10);
    stroke(64, 51, 38);
    strokeWeight(random(5, 7));
    line(190, random(171, 175), 220, random(168, 171));
    line(278, random(168, 172), 308, random(171, 175));

    //eyes
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);

    //eyeballs
    frameRate(10);
    stroke(128, 128, 128);
    fill(102, 102, 51);
    ellipse(random(201, 217), random(194, 206), 18, 18);
    ellipse(random(281, 300), random(194, 206), 18, 18);

    //NOSE
    noStroke();
    fill(247, 221, 155);
    triangle(250, 220, 260, 250, 240, 250);

    //ewwww!


    //MOUTH
    frameRate(10);
    noStroke();
    fill(255, 169, 168);
    ellipse(250, 270, random(10, 20), 12);

    //shoulders
    noStroke();
    fill(247, 221, 212);
    rect(165, 315, 170, 132, 18);

    //TSHIRT
    noStroke();
    fill(102, 21, 173);
    rect(190, 310, 120, 140, 8);

    //neck
    noStroke();
    fill(247, 221, 212);
    arc(250, 310, 40, 40, 0, PI);
    rect(230, 280, 40, 30);
  }

  drawITP()
}

function mousePressed() {
  if (value == "0") {
    value = "1";
  } else {
    value = "0";
  }
  noLoop()
}

function mouseReleased() {
  loop()
}

function drawITP() {
  //ITP
  textSize(32)
  fill(random(255), random(255), random(255));
  text("!TP", 225, 350, 150, 120);
  textSize(36)
}var a=10;
var b=10;
var c=10;
var Eye;

function setup() { 
  createCanvas(600, 400);
  
} 

function draw() { 
  background(159,205,201);
  a = a +5;
  b = b -5;
  c = c -3;

  

  if (a > 600) 
	{
    a = -320;
  }
	
	if(b < -320)
	{
    b = +520;
	}
	
	if(c < -320)
	{
		c = 400;
	}
    
  //BUBBLES
  fill(205,246,243,150);
  ellipse(555,260+c,38,38);
  ellipse(250,340+c,35,35);
  ellipse(50,210+c,55,55);
  ellipse(290,170+c,23,23);
  ellipse(260,25+c,8,7);
  ellipse(255,200+c,12,10);
  ellipse(40,345+c,21,18);
  ellipse(65,485+c,12,14);
  ellipse(105,285+c,9,9);
  ellipse(435,287+c,12,11);
  ellipse(370,355+c,7,8);
  ellipse(350,380+c,9,8);
  ellipse(350,430+c,13,14);
  ellipse(36,580+c,7,9);
   ellipse(500,580+c,10,9);
  ellipse(350,600+c,13,14);
 ellipse(400,545+c,21,18);
   ellipse(200,680+c,10,9);
   ellipse(500,500+c,30,30);
    ellipse(300,550+c,10,9);
  
  //EYE 
  stroke(0);
  strokeWeight(15)
  line(335,115,300,65);
  line(380,80,360,25);
  line(440,80,435,13);
  line(495,80,505,20);
  line(550,115,575,50);
  noStroke();
  fill(244,211,222);
  ellipse(450,150, 250,160);
  fill(255);
  ellipse(435,155,225,140);
  fill(0);
  

   Eye = new movingEye(450,160);

 
  
  //MONSTER1
  noStroke();
  fill(228,161,185);
  ellipse(130+a,300,120,120);
  fill(244,211,222);
  ellipse(150+a,280,105,105);
  fill(255);
  ellipse(165+a,255,62,50);
  fill(0);
  ellipse(175+a,245,35,30);
  fill(228,161,185);
  ellipse(71+a,310,50,50);  
  fill(228,161,185);
  ellipse(90+a,347,50,50);  
  fill(228,161,185);
  ellipse(135+a,356,50,50); 
  
  //MONSTER2
  fill(0);
  ellipse(128+b,45,28,28);
  fill(255);
  ellipse(140+b,60,48,48);
  fill(228,161,185);
  ellipse(190+b,95,95,95);
  fill(244,211,222);
  ellipse(170+b,80,85,85);
  fill(228,161,185);
  ellipse(195+b,140,40,40);
  ellipse(227+b,130,40,40);
  ellipse(237+b,100,40,40);
  fill(255);
  ellipse(195+b,85,50,50);
  fill(0);
  ellipse(208+b,80,30,30);
  }  

function mousePressed() {
  noLoop();
}

function mouseReleased() {
	loop();
}

function movingEye(nX,nY)
{
  var directionX = (mouseX - 400)/5;
  var directionY = (mouseY - 300)/10;
  
  nX = directionX + nX;
  nY = directionY + nY;
  
  ellipse(nX, nY, 85, 85);
}
  



  

  

  
var a=10;
var b=10;
var c=10;
var Eye;

function setup() { 
  createCanvas(600, 400);
  
} 

function draw() { 
  background(159,205,201);
  a = a +5;
  b = b -5;
  c = c -3;

  

  if (a > 600) 
	{
    a = -320;
  }
	
	if(b < -320)
	{
    b = +520;
	}
	
	if(c < -320)
	{
		c = 400;
	}
    
  //BUBBLES
  fill(205,246,243,150);
  ellipse(555,260+c,38,38);
  ellipse(250,340+c,35,35);
  ellipse(50,210+c,55,55);
  ellipse(290,170+c,23,23);
  ellipse(260,25+c,8,7);
  ellipse(255,200+c,12,10);
  ellipse(40,345+c,21,18);
  ellipse(65,485+c,12,14);
  ellipse(105,285+c,9,9);
  ellipse(435,287+c,12,11);
  ellipse(370,355+c,7,8);
  ellipse(350,380+c,9,8);
  ellipse(350,430+c,13,14);
  ellipse(36,580+c,7,9);
   ellipse(500,580+c,10,9);
  ellipse(350,600+c,13,14);
 ellipse(400,545+c,21,18);
   ellipse(200,680+c,10,9);
   ellipse(500,500+c,30,30);
    ellipse(300,550+c,10,9);
  
  //EYE 
  stroke(0);
  strokeWeight(15)
  line(335,115,300,65);
  line(380,80,360,25);
  line(440,80,435,13);
  line(495,80,505,20);
  line(550,115,575,50);
  noStroke();
  fill(244,211,222);
  ellipse(450,150, 250,160);
  fill(255);
  ellipse(435,155,225,140);
  fill(0);
  

   Eye = new movingEye(450,160);

 
  
  //MONSTER1
  noStroke();
  fill(228,161,185);
  ellipse(130+a,300,120,120);
  fill(244,211,222);
  ellipse(150+a,280,105,105);
  fill(255);
  ellipse(165+a,255,62,50);
  fill(0);
  ellipse(175+a,245,35,30);
  fill(228,161,185);
  ellipse(71+a,310,50,50);  
  fill(228,161,185);
  ellipse(90+a,347,50,50);  
  fill(228,161,185);
  ellipse(135+a,356,50,50); 
  
  //MONSTER2
  fill(0);
  ellipse(128+b,45,28,28);
  fill(255);
  ellipse(140+b,60,48,48);
  fill(228,161,185);
  ellipse(190+b,95,95,95);
  fill(244,211,222);
  ellipse(170+b,80,85,85);
  fill(228,161,185);
  ellipse(195+b,140,40,40);
  ellipse(227+b,130,40,40);
  ellipse(237+b,100,40,40);
  fill(255);
  ellipse(195+b,85,50,50);
  fill(0);
  ellipse(208+b,80,30,30);
  }  

function mousePressed() {
  noLoop();
}

function mouseReleased() {
	loop();
}

function movingEye(nX,nY)
{
  var directionX = (mouseX - 400)/5;
  var directionY = (mouseY - 300)/10;
  
  nX = directionX + nX;
  nY = directionY + nY;
  
  ellipse(nX, nY, 85, 85);
}
  



  

  

  
//Week2 ICM Make it move!
var value = "0";

function setup() { 
  createCanvas(500, 500); 
  

} 


function draw() {
  background(255);
  if (value == "0") {
  
  //hair
    noStroke()
    fill(64,51,38);
    arc(250,245,270,420, QUARTER_PI+HALF_PI,QUARTER_PI);
  
  //ear
    fill(247,221,212);
    ellipse(163,215,50,50);
  
  //face
    noStroke();
    fill(247,221,212);
    ellipse(250,200,190,200);
  
  //check
    noStroke();
    fill(255, 184, 194);
    ellipse(200,230,30,20);
    ellipse(300,230,30,20);
  
  //bang
    noStroke();
    fill(64,51,38);
    arc(250,130,160,80, Math.PI, 0);
    arc(300,100,270,125, 0.25*Math.PI, Math.PI);
  
  //eyebrows
    stroke(64,51,38);
    strokeWeight(6);
    line(190,173,220,170);
    line(278,170,308,173);
  
  //eyes
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
 
  //eyeballs
    stroke(128, 128, 128);
    fill(102,102,51);
    ellipse(209, 200, 18, 18);
    ellipse(291, 200, 18, 18);
  
  //NOSE
    noStroke();
    fill(247,221,155);
    triangle(250, 220, 260, 250, 240, 250);

  //MOUTH
    noStroke();
    fill(255, 169, 168);
    ellipse(250,270,12,12);
  
  //shoulders
    noStroke();
    fill(247,221,212);
    rect(165,315,170,132,18);  
 
  //TSHIRT
    noStroke();
    fill(102,21,173);
    rect(190,310,120,140,8);  
  
  //neck
    noStroke();
    fill(247,221,212);
    arc(250,310,40,40,0,PI);
    rect(230,280,40,30);

   //ITP
    fill(255, 255, 255); 
    text("!TP",225,350,150,120); 
    textSize(36) 
    
} else if (value == "1") {
  
  
  //hair
    noStroke()
    fill(64,51,38);
    arc(250,245,270,420, QUARTER_PI+HALF_PI,QUARTER_PI);
  
  //ear
    fill(247,221,212);
    ellipse(163,215,50,50);
  
  //face
    noStroke();
    fill(247,221,212);
    ellipse(250,200,190,200);
  
  //check
    frameRate(5);
    noStroke();
    fill(255,random(164,171),random(196,202));
    ellipse(random(197,203),random(228,232),30,20);
    ellipse(random(297,303),random(228,232),30,20);
  
  //bang
    noStroke();
    fill(64,51,38);
    arc(250,130,160,80, Math.PI, 0);
    arc(300,105,280,125, 0.25*Math.PI, Math.PI); 
  
  //eyebrows
    frameRate(10);
    stroke(64,51,38);
    strokeWeight(random(5,7));
    line(190,random(171,175),220,random(168,171));
    line(278,random(168,172),308,random(171,175));
  
  //eyes
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
 
  //eyeballs
    frameRate(10);
    stroke(128, 128, 128);
    fill(102,102,51);
    ellipse(random(201,217), random(194,206), 18, 18);
    ellipse(random(281,300), random(194,206), 18, 18);
  
  //NOSE
    noStroke();
    fill(247,221,155);
    triangle(250, 220, 260, 250, 240, 250);

  //ewwww!
    
  
  //MOUTH
    frameRate(10);
    noStroke();
    fill(255, 169, 168);
    ellipse(250,270,random(10,20),12);
  
  //shoulders
    noStroke();
    fill(247,221,212);
    rect(165,315,170,132,18);
 
  //TSHIRT
    noStroke();
    fill(102,21,173);
    rect(190,310,120,140,8);
  
  //neck
    noStroke();
    fill(247,221,212);
    arc(250,310,40,40,0,PI);
    rect(230,280,40,30);

   //ITP
    fill(random(255), random(255), random(255)); 
    text("!TP",225,350,150,120); 
    textSize(36) 
  }
}  

function mousePressed() {
  if (value == "0") {
    value = "1";
  } else {
    value ="0";
  }
  

function draw（） 
}




//Week2 ICM Make it move!
var Action= "static

function setup() { 
  createCanvas(500, 500);
} 

function draw() {
  background(255);
  

  
  //hair
    noStroke()
    fill(64,51,38);
    arc(250,245,270,420, QUARTER_PI+HALF_PI,QUARTER_PI);
  
  //ear
    fill(247,221,212);
    ellipse(163,215,50,50);
  
  //face
    noStroke();
    fill(247,221,212);
    ellipse(250,200,190,200);
  
  //check
    noStroke();
    fill(255, 184, 194);
    ellipse(200,230,30,20);
    ellipse(300,230,30,20);
  
  //bang
    noStroke();
    fill(64,51,38);
    arc(250,130,160,80, Math.PI, 0);
    arc(300,105,280,125, 0.25*Math.PI, Math.PI);
  
  
  //eyebrows
    fill(64,51,38);
    quad(190,170,220,170,225,175,180,180);
    quad(275,170,307,172,315,180,270,175);
  
  
  //eyes
    stroke(128, 128, 128);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
 
  //eyeballs
    stroke(128, 128, 128);
    fill(102,102,51);
    ellipse(209, 200, 18, 18);
    ellipse(291, 200, 18, 18);
  
  //NOSE
    noStroke();
    fill(247,221,155);
    triangle(250, 220, 260, 250, 240, 250);

  //MOUTH
    noStroke();
    fill(255, 169, 168);
    ellipse(250,270,12,12);
  
  //shoulders
    noStroke();
    fill(247,221,212);
    rect(165,315,170,132,18);
  
 
  //TSHIRT
    noStroke();
    fill(102,21,173);
    rect(190,310,120,140,8);
  

  
  //neck
    noStroke();
    fill(247,221,212);
    arc(250,310,40,40,0,PI);
    rect(230,280,40,30);

   //ITP
    fill(255, 255, 255); 
    text("!TP",225,350,150,120); 
    textSize(36) 
    
    
}



