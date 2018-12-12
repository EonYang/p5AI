let guidance_m, guidance_f, capacitance;
let guidanceCanPlay = false;

function preload() {
  guidance_m = loadSound('Nick_v2.mp3');
  guidance_f = loadSound('Maya_v2.mp3');
}

function setup() {
  noCanvas();
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
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
}let mapImg;

let clat = 0;
let clon = 0;

let lat = 39.5296;
let lon = -119.8138;


var ww = 1024;
var hh = 512;

var zoom = 1;
var earthquakes;

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoibWJtNTU3IiwiYSI6ImNqcDdjaWNhcjBzYmkzcHFzbGVndnlxaW8ifQ.29fPaVXPdaP9HomnlkG-_w');
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
  image(mapImg, 0, 0);

  let cx = mercX(clon);
  let cy = mercY(clat);

  var x = mercX(lon) - cx;
  var y = mercY(lat) - cy;

  fill(255, 0, 255, 200);
  ellipse(x, y, 51, 51, 255);



}let url = "https://api.giphy.com/v1/gifs/search?api_key=QFRqcjr73aPbUU4rOowtBHaQpaKLgimZ&q=big bird&limit=25&offset=0&rating=G&lang=en";
let button;
let imgHolder = [];
let bigBirdImg;
let cookie;

function preload(){
  cookie = loadSound('assets/cookie.mp3');


}

function setup() {
  //noCanvas();
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
  
  if(imgHolder[22]){
  
  cookie.play();
  }
  else{
  cookie.stop();
  }

  //image(imgHolder[Math.floor(Math.random() * imgHolder.length)], width/2, height/2, imgHolder.width, imgHolder.height);

}




function gotData(giphy) {


  for (let i = 0; i < giphy.data.length; i++) {

    
    
    imgHolder = append(imgHolder, giphy.data[i].images.original.url);

 
  }
}let url = "https://api.giphy.com/v1/gifs/search?api_key=QFRqcjr73aPbUU4rOowtBHaQpaKLgimZ&q=big bird&limit=25&offset=0&rating=G&lang=en";
let button;
let imgHolder = [];
let bigBirdImg;

function setup() {
  //noCanvas();
  loadJSON(url, gotData);




}



function draw() {
  createCanvas(500, 500);
  background(220);
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

 
  //image(imgHolder[Math.floor(Math.random() * imgHolder.length)], width/2, height/2, imgHolder.width, imgHolder.height);

}




function gotData(giphy) {


  for (let i = 0; i < giphy.data.length; i++) {

    imgHolder = append(imgHolder, giphy.data[i].images.original.url);

    //imgHolder[i] = createImg(giphy.data[i].images.original.url);
    // imgHolder[i].hide();
  }
}let url = "https://api.giphy.com/v1/gifs/search?api_key=QFRqcjr73aPbUU4rOowtBHaQpaKLgimZ&q=big bird&limit=25&offset=0&rating=G&lang=en";
let button;
let imgHolder = [];
let bigBirdImg;

function setup() {
  createCanvas(200, 200);
  //noCanvas();
  loadJSON(url, gotData);

  button = createImg('mouse.jpg')
  button.size(120, 120);
  button.mousePressed(bigbird);


}



function draw() {
  background(220);
	
  button.position(mouseX  , mouseY );

  //bigbird();
}

function bigbird() {

  removeElements();
  bigBirdImg = createImg(random(imgHolder));
  bigBirdImg.size(200, 200);
  bigBirdImg.position(random(400), random(400));

  //image(imgHolder[Math.floor(Math.random() * imgHolder.length)], width/2, height/2, imgHolder.width, imgHolder.height);

}


function gotData(giphy) {


  for (let i = 0; i < giphy.data.length; i++) {

    imgHolder = append(imgHolder, giphy.data[i].images.original.url);

    //imgHolder[i] = createImg(giphy.data[i].images.original.url);
    // imgHolder[i].hide();
  }
}let img;
let hold;

function preload() {

  img = loadImage('assets/test.png');

}

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(img);

  img.loadPixels();

  for (let y = 0; y < height; y+=5) {
    for (let x = 0; x < width; x+=5) {
      let hold = img.get(x, y);
      noStroke();
      fill(hold);
      rect(x, y, 5, 5);

    }



  }

  updatePixels();
}
function setup() {

var img = createImage(66, 66);
img.loadPixels();
for (var i = 0; i < img.width; i++) {
  for (var j = 0; j < img.height; j++) {
    img.set(i, j, color(random(0,255), random(0,255), 102));
  }
}
img.updatePixels();
image(img, 0, 0);
}

/*
ICM Homework 10/29/18, Morgan Mueller

This project takes a live video and performs image manipulations 
on it to give a few different results depending on the music being
played.

The first result is that a grayscaled video appears with minorly 
pulsating rectangles. The second is that a colored video appears
with pulsating circles.

The slider at the bottom of the screen increases the size of the 
pixels in the video

*/
let video;

let vScaleSlider1;
let vScaleSlider2;


let vScale = 16;

//load sound info
// FYI for ICM class I called this boring because the DJ's name 
//is DJ Boring
let boring;
let fft;

let slideText;

function preload() {

  // import the song
  boring = loadSound('assets/icmFinal.mp3');

}

function setup() {

  
  createCanvas(640, 480);
  pixelDensity(1);

  
  //instantiate sliders
  
  vScaleSlider1 = createSlider(0, 50, 0);
  vScaleSlider1.position(10, 500);
  
  stroke(255);
  let tempText = createElement('p','Pulsation Intensity');
	tempText.position(150, 480);

  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();

  
  //begin the FFT operations
  fft = new p5.FFT();
  boring.amp(0.7);
  boring.play();



  frameRate(30);

}

function draw() {
  background(51);

  //load the video's pixels
  video.loadPixels();
  loadPixels();

  //analyze the sound 
  let fftSpectrum = fft.analyze();
	//get the energy from the bass
  let boringBass = fft.getEnergy("bass");
	//map the energy from the bass 
  let bassMapped = map(boringBass, 0, 255, 0, vScale + vScaleSlider1.value());
 // console.log(boringMid);

  
  //iterate through the video in both x and y 
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      //calculation to index through the video's size 
      let index = (video.width - x - 1 + (y * video.width)) * 4;

      //create variables to store pixel values in the video
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
	
      //average grayscale value of the video
      let bright = (r + g + b) / 3

      //map the brightness 
      let w = map(bright, 0, 255, 0, vScale);
			noStroke();
      
      //if the bass from the song is less than 125 use grayscale
      if (boringBass < 125) {
        fill(bright);
        rectMode(CENTER);
        rect(x * vScale, y * vScale, bassMapped , bassMapped);

        //otherwise set color
      } else {
        fill(r, g, b, random(100, 255));
        ellipseMode(CENTER);
        ellipse(x * vScale, y * vScale, bassMapped , bassMapped );

      }


    }
  }
  
}let video;
let button;
let imgHolder = [];

function setup() {
  createCanvas(320, 240);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  //video.hide();
  button = createButton('screenshot');
  button.mousePressed(snapshot);


}

function snapshot() {

  imgHolder.push(video.get())

}

function draw() {

  let w = 80;
  let h = 60;
  let x = 0;
  let y = 0;

  for (let i = 0; i < imgHolder.length; i++) {


    image(imgHolder[i], x, y, w, h);
    x = x + w;
    if (x > width) {
      x = 0;
      y = y + h;
    
    if(x > width && y > height){
    x = 0;
    y = 0;
    
    }
    }

  }


}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// Get your own API Key @http://developer.nytimes.com
let allWords = [];
let ts = 16;
let i = 0;

// Preload takes the api key, url, and search query from the NYT and 
//loads the JSON file into the processSnippets function
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
  //increase text size
  ts++;
  //perform modulo operation on ts
  ts %= 48;
  //if the array isnt empty
  if (allWords.length > 0) {
    //add 1 to itslef
    i += 1;
    //i is now a modulo of the arrays length
    i %= allWords.length;
    //the text size is now ts
    textSize(ts);
    //hold each words size in int form
    let word = allWords[floor(i)];
    //print all words at random positions
    text(allWords[floor(i)], random(width), random(height));
  }
}



function processSnippets(data) {
  
  let docs = data.response.docs;
  console.log(data);
	//create arrays containing similar names to putin and trump
  let putins = ["Putin", "Vladi", "Vlad", "Vova"];
  let trumps = ["Trump", "president", "President"];

	//iterate through each element of the docs array
  for (let doc of docs) {
    //split the words in the snippets of each article
    let words = splitTokens(doc.snippet);
    // iterate through each letter of the words array?
    for (let w in words) {
      let word = words[w];
      for (let trump of trumps) {
        if (match(word, trump)) {
          //
          words[w] = putins[floor(random(putins.length))];
          break;
        }
      }
      shuffle(words, true);
    }
    allWords = concat(allWords, words);
  }
}/*
Morgan Mueller
ICM Assignment 7
This program uses the NYT API to take in artices written by 
Ernest Hemingway and visualize the most used words in them
Full functionality has not yet been achieved.
*/

let urlOne = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=ernest%20hemingway&begin_date=19361231&end_date=19371231';
let apiKey = '8be8b3ad946d476aafdcc023aec18d47';

let webURLOne = urlOne + '&api-key=' + apiKey;

//global array for Hemingway data
let hem = [];
//let headlines = [];
let hemWordCounts = {};


function setup() {
  createCanvas(400, 400);

  title = createElement('h1', 'Ernest Hemingway and His Most Used Words in His Written Articles').style('text-align', 'center');

  //load json files
  loadJSON(webURLOne, gotData);
  ellipseMode(CENTER);

}

function draw() {

  let mod = 0;
  background(255);
  textSize(10);
  fill(0);

  // loop through the array and create the shapes based on the
  //use of words in hemingways titles.
  for (let i = 0; i < hem.length; i++) {
    for (let j = 0; j < hem[i].length; j++) {

      if (hem[i][j] === "Madrid") {
        fill(random(hemWordCounts.hemingway));
        ellipse(random(hemWordCounts.hemingway) + 250, random(hemWordCounts.hemingway) + 100, 10 * mod, 10 * mod);
        mod++;
      } else if (hem[i][j] === "Writer") {

        fill(random(hemWordCounts.ernest), 40, hemWordCounts.war);
        rect(random(hemWordCounts.ernest) + 100, random(hemWordCounts.ernest) + 200, 10 * mod, 10 * mod);
        mod++;
      } else if (hem[i][j] === "Spain") {
        fill(random(hemWordCounts.spain), hemWordCounts.spain, 100);
        ellipse(random(hemWordCounts.spain) + 30, random(hemWordCounts.spain) + 300, 10 * mod, 10 * mod);
        mod++;
      } else if (hem[i][j] === "War") {
        fill(random(hemWordCounts.war), hemWordCounts.war * 40, random(hemWordCounts.war));
        ellipse(random(hemWordCounts.war) + 350, random(hemWordCounts.war) + 350, 10 * mod, 10 * mod);
        mod++;
      }


    }
  }

}


/*
This function goes through each value in the hem array and checks for 
the frequency of each word, assigning that word a value in the hemWordCounts object

*/
function stringCompare() {

  let wordHolder;


  //console.log(hemWordCounts);

  for (i = 0; i < hem.length; i++) {
    for (j = 0; j < hem[i].length; j++) {


      wordHolder = hem[i][j].toLowerCase().trim(' ');
      // console.log(wordHolder);

      // if this word is not already a property of the wordCounts object, create it with the value of 1
      if (!hemWordCounts[wordHolder]) {
        hemWordCounts[wordHolder] = 1;
        // console.log("Added : " + wordHolder);
      } else {
        // if this word IS already a property of wordCounts, then increase its count value
        hemWordCounts[wordHolder]++;
        //print(hemWordCounts);


      }
    }

  }

  //iterates over all the values in the dictionary
  let value;
  // console.log(hemWordCounts)
  Object.keys(hemWordCounts).forEach(function(key) {
    value = hemWordCounts[key];
    //console.log(key + " : " + value);

  });

}


function gotData(data) {
  print('ready');



  let articleInfo = data.response.docs;

  //loop thrrugh the articles and assign them to array
  for (i = 0; i < articleInfo.length; i++) {

    createP(articleInfo[i].headline.main);
    //let headline = articleInfo[i].headline;
    let hemArray = articleInfo[i].headline.main.split(' ');


    //headlines.push(headline);
    hem.push(hemArray);
  }
  stringCompare();
  print(hem);
  print(hemWordCounts.spain);
}
/*
Zhe Wang and Morgan Mueller
Physical Computation 2018 Midterm Project P5 code.

The main purpose for this p5 sketch was to communicate with the arduino 
serially and play selected sounds when the data being sent in 
meets a certain criteria 
*/


//define noises 
let noise;
let noise2;
let noise3;
let noise4;
let noise5;
let enticingNoises = []

//define serial variables
let serial;
let fromSerial;
let called = true;
let countdown = 0;
let delay = 2000;
let noiseBool;


//load sounds into the program
function preload() {

  soundFormats('wav', 'mp3');

  noise = loadSound('helpMe.mp3');
  noise2 = loadSound('distortedVocals.mp3');
  noise3 = loadSound('playWithMe.mp3');
  noise4 = loadSound('imSoScared.mp3');
  noise5 = loadSound('child_laugh.mp3');
  enticingNoises = [noise, noise3, noise4, noise5];
}



function setup() {
  createCanvas(500, 500);
	
  
  // make a new instance of  serialport library	
  serial = new p5.SerialPort(); 
  // callback function for serialport list event
  serial.on('list', printList); 
  // callback for new data coming in	
  serial.on('data', serialEvent); 
 // list the serial ports
  serial.list();
  // open a port
  serial.open("/dev/cu.usbmodem1421"); 


  noise.setVolume(0.5);
  noise2.setVolume(0.5);


  background(0, 0, 0);
}

// function playNoise() {
//   if (fromSerial < 50) {
//     print("hello");
//     noise2.play();
//   } else {
//     noise.play();
//     noise.loop();
//     console.log(fromSerial);
//   }
// }

function draw() {



}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved, data will then live in fromSerial	
  fromSerial = serial.read();


  print(fromSerial);


	//if the person is within 100 cm then play the defined sound
  if (fromSerial < 100 && !called && millis() - countdown > delay) {
    noise.pause();
    noise2.amp(100);
    noise2.play();
    //noise2.pause();
    //noise5.play();
    countdown = millis();
    print("called 1");
    called = true;
  }
	
  //if there is no person being sensed then play the other sound
  else if (fromSerial > 100 && called && millis() - countdown > delay) {
    //for (let i = 0; i < enticingNoises.length; i++) {
    noise2.pause();
    // noise.amp(100);
    // noise.play();
    // noise.loop();
    // noise.pause();
    noise3.amp();
    noise3.play();
    noise3.loop(); t
    // noise4.play();
    // noise4.pause();
    countdown = millis();
    print("called 2")
    called = false;
    noiseBool = false;

  }
}/*
ICM HW 5 - Morgan Mueller
This homework takes  the basic idea of last weeks assignment and works 
//with sinusoids again. Using arrays, a class, and objects I created 
//an animation that takes a set of lines and rotates them around 
//an axis in a motion that is somewhat hypnotic
*/
let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
let fromSerial = 0;
let fromSerial2 = 0;

let lines = [];
let t = 0;

function setup() {
  createCanvas(320, 240);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port


createCanvas(400, 400);

//create 25 line objecs and add them to the arrya
for (i = 0; i < 25; i++) {
  lines[i] = new Lines(i);
}
}

function draw() {
  background(0, 10);
  translate(width / 2, height / 2);
  stroke(255, fromSerial);
  //create the effect on all objects in the array
  for (i = 1; i < 25; i++) {
    lines[i].effect(t);
  }

  //increment the speed 
  t += 0.05;
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved, data will then live in fromSerial	
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    var trimmedString = trim(stringFromSerial); // get rid of all white space
    var myArray = split(trimmedString, ",") // splits the string into an array on commas
    fromSerial = Number(myArray[0]); // get the first item in the array and turn into integer
    fromSerial2 = Number(myArray[1]); // get the second item in the array and turn into integer
  }
}/*

ICM Homework 6, 10/15/18

This weeks ICM Homework took inspiration on computer art from 
John Whitney. 

-As the user scrolls their mouse across the 
screen, the number of lines being created from the moving 
objects increases.

-When the user clicks the screen the shapes invert

-Finally, the checkbox at the top left of the screen the shape
changes from a line to a rectangle.

*/


let t = 0;
let divOne;
let divTwo;
let divThree;
let button;
//object to translate the start point of the lines 
//and set basic functionality

let trans = {
  numLines: 25,
  x: 2,
  y: 2,
};

function setup() {
  createCanvas(500, 500);
  background(0);

  button = createButton("Invert");
  button.style("float", "right");
  button.style("background-color", "pink")

  button.style("padding", "10px");
  //button.style("border","10px");
  button.mousePressed(mouseIsPressed);

  //create a checkbox for changing the shape to rectangles
  rectCheckbox = createCheckbox('rectangles', false);
  rectCheckbox.changed(parabolicEffect);
  rectCheckbox.style("float", "left");
  rectCheckbox.style("background-color", "pink")
  rectCheckbox.style("color", "black")



  divOne = select("#divOne");
  divOne.html("Geometric Poetry and Similar Inspiration");
  divTwo = select("#divTwo");
  divTwo.html("Artists Eusebio Sempere and John Whitney were pioneers of two different kinds of generated art.");
  divThree = select("#divThree");
  divThree.html("This piece was inspired by John Whitney and is the first in a series of generated graphic works I will be doing");





}

function draw() {
  background(0, 0, 0);

  strokeWeight(4);


  //move parabolic shape to center of screen
  translate(width / trans.x, height / trans.y);



  //call to parabolic effect function
  parabolicEffect();

  // increase the value being pushed into the function  
  t += .3;


}

function invert(t) {
  return true;

}

//parabolic function x
function x(t) {
  if (mouseIsPressed) {
    return -sin(t / 10) * 100 + -sin(t / 10) * 100;
  } else {

    return sin(t / 10) * 100 + sin(t / 10) * 100;
  }
}


//parabolic function y
function y(t) {
  if (mouseIsPressed) {
    for (let i = 0; i < 20; i++) {
      return cos(t / 10) * i;
    }
  } else {
    return -cos(t / 10) * 20;

  }
}

//parabolic function x1
function x1(t) {

  if (mouseIsPressed) {
    return -sin(t / 10) * 100 + -cos(t / 10) * 100;
  } else {
    return sin(t / 10) * 100 + cos(t / 10) * 100;

  }
}

//parabolic function y1
function y1(t) {
  if (mouseIsPressed) {
    return cos(t / 20) * 200 + sin(t / 10) * 100;
  } else {
    return -cos(t / 20) * 200 + -sin(t / 10) * 100;

  }


}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255, 0, 0);
}var serial; // variable to hold an instance of the serialport library
var fromSerial = 0,
  fromSerial2 = 0; //variable to hold the data

function setup() {

  createCanvas(600, 600);

  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  // serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("//dev/cu.usbmodem1411"); // open a port
  noFill();
  strokeWeight(10);
}

function draw() {
  background(127, 0, 127);

  var v = fromSerial;

  // Left Eye
  ellipse(width * .4, height * .4, v * .25 + 10, v * .25 + 10);

  // Right Eye
  ellipse(width * .6, height * .4, (2500 / v) + 10, (2500 / v) + 10);

  // Mouth
  bezier(width * .3, v * .6 + height / 2, width * .4, height * .8, width * .6, height * .8, width * .7, v * .55 + height / 2);

  v += random(-5, 5);
  // Nose
  bezier(width * .5, height * .5, v * .6, height * .6, v * .6, height * .8, width * .45, height * .67);

}


function serialEvent() {
  // this is called when data is recieved, data will then live in fromSerial	
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    var trimmedString = trim(stringFromSerial); // get rid of all white space
    var myArray = split(trimmedString, ",") // splits the string into an array on commas
    fromSerial = Number(myArray[0]); // get the first item in the array and turn into integer
    fromSerial2 = Number(myArray[1]); // get the second item in the array and turn into integer
  }
}// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
// }/*
ICM HW 5 - Morgan Mueller
This homework takes  the basic idea of last weeks assignment and works 
//with sinusoids again. Using arrays, a class, and objects I created 
//an animation that takes a set of lines and rotates them around 
//an axis in a motion that is somewhat hypnotic
*/


let lines = [];
let t = 0;

function setup() {
  createCanvas(400, 400);

  //create 25 line objecs and add them to the arrya
  for (i = 0; i < 25; i++) {
    lines[i] = new Lines(i);
  }
}

function draw() {
  background(0, 20);
  translate(width / 2, height / 2);
  stroke(255, 10);
  //create the effect on all objects in the array
  for (i = 1; i < 25; i++) {
    lines[i].effect(t);
  }

  //increment the speed 
  t += 0.05;
}// function setup() {
//   createCanvas(400, 400);
  
//   noCanvas();
// }

// function draw() {
//   background(220);
// }let balls = [];


function setup() {
  createCanvas(500, 500);
 for (i = 0; i < 100; i++) {
    balls[i] = new Ball(random(width), random(height), random(10, 50), random(-5, 5), random(-5, 5), random(50, 200), random(100, 255), random(100, 255))
  	
  }
}

function draw() {
  background(220);
  for (let b in balls) {
    balls[b].run();
    
       if (balls[b].isNear(mouseX, mouseY)) {
      balls.splice(b, 1)
    }
  }
  
 



  

}

class Ball {

  constructor(x, y, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.r = 25;
  }

  run() {
    this.update();
    this.bounce();
    this.render();
  }

  render() {
    //Draw the ball
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  update() {
    // Move the ball
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  isNear(x, y) {
    return dist(x, y, this.x, this.y) < this.r;
  }

  bounce() {
    // Turn around when you cross a border
    if (this.x > width || this.x < 0) this.xspeed *= -1;
    if (this.y > height || this.y < 0) this.yspeed *= -1;
  }

}let x = 2;
let y =4;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  addition(x,y);
  
  
}

function addition(x,y){

 let sum = x + y;
  print( "the sum is ", sum);
  return sum;
}/*
ICM HW 5 - Morgan Mueller
This homework takes  the basic idea of last weeks assignment and works 
//with sinusoids again. Using arrays, a class, and objects I created 
//an animation that takes a set of lines and rotates them around 
//an axis in a motion that is somewhat hypnotic
*/


let lines = [];
let t = 0;

function setup() {
  createCanvas(400, 400);

  //create 25 line objecs and add them to the arrya
  for (i = 0; i < 25; i++) {
    lines[i] = new Lines(i);
  }
}

function draw() {
  background(0, 10);
  translate(width / 2, height / 2);
  stroke(255, 20);
  //create the effect on all objects in the array
  for (i = 1; i < 25; i++) {
    lines[i].effect(t);
  }

  //increment the speed 
  t += 0.05;
}var tree = [];
var leaves = [];

var count = 0;

function setup() {
  createCanvas(400, 400);
  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - 100);
  var root = new Branch(a, b);

  tree[0] = root;
}

function mousePressed() {
  for (var i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }
    tree[i].finished = true;
  }
  count++;

  if (count === 6) {
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        var leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }

}

function draw() {
  background(51);

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
    //tree[i].jitter();
  }

  for (var i = 0; i < leaves.length; i++) {
    fill(255, 0, 100, 100);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 8, 8);
    leaves[i].y += random(0, 2);
  }

}/*

ICM Homework 4, 10/01/18

This weeks ICM Homework took inspiration on computer art from 
John Whitney. 

-As the user scrolls their mouse across the 
screen, the number of lines being created from the moving 
objects increases.

-When the user clicks the screen the shapes invert

-Finally, the checkbox at the top left of the screen the shape
changes from a line to a rectangle.

*/


let t = 0;

//object to translate the start point of the lines 
//and set basic functionality

let trans = {
  numLines: 25,
  x: 2,
  y: 2,
};

function setup() {
  createCanvas(600, 600);
  background(0);


  //create a checkbox for changing the shape to rectangles
  rectCheckbox = createCheckbox('rectangles', false);
  rectCheckbox.changed(parabolicEffect);
  rectCheckbox.position(10, 20);


}

function draw() {
  background(0, 0, 0);

  strokeWeight(4);


  //move parabolic shape to center of screen
  translate(width / trans.x, height / trans.y);

  //text for checkbox
  textSize(12);
  fill(255);
  text('Rectangles', -290, -280);

  //call to parabolic effect function
  parabolicEffect();

  // increase the value being pushed into the function  
  t += .3;


}



//parabolic function x
function x(t) {
  if (mouseIsPressed) {
    return -sin(t / 10) * 100 + -sin(t / 10) * 100;
  } else {

    return sin(t / 10) * 100 + sin(t / 10) * 100;
  }
}


//parabolic function y
function y(t) {
  if (mouseIsPressed) {
    for (let i = 0; i < 20; i++) {
      return cos(t / 10) * i;
    }
  } else {
    return -cos(t / 10) * 20;

  }
}

//parabolic function x1
function x1(t) {

  if (mouseIsPressed) {
    return -sin(t / 10) * 100 + -cos(t / 10) * 100;
  } else {
    return sin(t / 10) * 100 + cos(t / 10) * 100;

  }
}

//parabolic function y1
function y1(t) {
  if (mouseIsPressed) {
    return cos(t / 20) * 200 + sin(t / 10) * 100;
  } else {
    return -cos(t / 20) * 200 + -sin(t / 10) * 100;

  }


}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let ball1;
let ball2;

function setup() {
  createCanvas(400, 400);
  
  
  // Initialize the ball at different positions on screen

  ball1 = new Ball(0, 0, 40, 75, 75, 4, 5);
  ball2 = new Ball(23, 100, 30, 50, 50, 5, 2);
}

function draw() {
  background(220);

  ball1.displayBall();
  ball1.bounceBall();
  ball1.moveBall();

  ball2.displayBall();
  ball2.bounceBall();
  ball2.moveBall();
}


let x = 200;
let xSpeed = 5;
let y = 0;
let ySpeed = 2;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  // increment or decrement speed depending on bounce function
  xSpeed = bounce(x, 0, width, xSpeed);
  ySpeed = bounce(y, 0, height, ySpeed);
  
  // move ball 
  x += xSpeed;
  y += ySpeed;

  // Draw ball
  ellipse(x, y, 50, 50);
}

//this fun constqantly checks for the balls position and reverses the 
//when it needs to
function bounce(ballPos, rightSide, top, speed) {
  if (ballPos < rightSide || ballPos > height) {
		speed *= -1;
  }
  return speed;
}/*

ICM Homework 4, 10/01/18

This weeks ICM Homework took inspiration on computer art from 
John Whitney. 

-As the user scrolls their mouse across the 
screen, the number of lines being created from the moving 
objects increases.

-When the user clicks the screen the shapes invert

-Finally, the checkbox at the top left of the screen the shape
changes from a line to a rectangle.

*/


let t = 0;
let divOne;
//object to translate the start point of the lines 
//and set basic functionality

let trans = {
  numLines: 25,
  x: 2,
  y: 2,
};

function setup() {
  createCanvas(600, 600);
  background(0);


  //create a checkbox for changing the shape to rectangles
  rectCheckbox = createCheckbox('rectangles', false);
  rectCheckbox.changed(parabolicEffect);
  rectCheckbox.position(10, 20);
  
  
  divOne=select("#divOne");
  divOne.html("Geometric Poetry and Similar Inspiration");


}

function draw() {
  background(0, 0, 0);

  strokeWeight(4);


  //move parabolic shape to center of screen
  translate(width / trans.x, height / trans.y);

  //text for checkbox
  textSize(12);
  fill(255);
  text('Rectangles', -290, -280);

  //call to parabolic effect function
  parabolicEffect();

  // increase the value being pushed into the function  
  t += .3;


}



//parabolic function x
function x(t) {
  if (mouseIsPressed) {
    return -sin(t / 10) * 100 + -sin(t / 10) * 100;
  } else {

    return sin(t / 10) * 100 + sin(t / 10) * 100;
  }
}


//parabolic function y
function y(t) {
  if (mouseIsPressed) {
    for (let i = 0; i < 20; i++) {
      return cos(t / 10) * i;
    }
  } else {
    return -cos(t / 10) * 20;

  }
}

//parabolic function x1
function x1(t) {

  if (mouseIsPressed) {
    return -sin(t / 10) * 100 + -cos(t / 10) * 100;
  } else {
    return sin(t / 10) * 100 + cos(t / 10) * 100;

  }
}

//parabolic function y1
function y1(t) {
  if (mouseIsPressed) {
    return cos(t / 20) * 200 + sin(t / 10) * 100;
  } else {
    return -cos(t / 20) * 200 + -sin(t / 10) * 100;

  }


}function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  background(255);
  drawCircle(width /2 , width / 2, 10 );
  
  }

function drawCircle(x, y, radius) {
  stroke(0);
  noFill();
  ellipse(x, y, radius, radius);
  if (radius > 2) {

    drawCircle(x , y + radius / 2, radius / 2);
	  drawCircle(x  , y - radius / 2, radius / 2);
      drawCircle(x + radius / 2, y, radius / 2);
   drawCircle(x - radius / 2, y, radius / 2);
  
 
  
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  grid();
  fillGrid();


}


//creates basic grid
function grid() {
  let x;
  let y;
  stroke(0);
  noFill();

  for (i = 0; i < 10; i++) {
    for (j = 0; j < 5; j++) {

      x = i * width / 10;
      y = j * height / 5;

      rect(x, y, width / 10, height / 5);

    }
  }


}

//function to fill grid with shades of grey depending on mouse position
function fillGrid() {

    let xCol = map(mouseX, 0, width, 0, 255);
    let yCol = map(mouseY, 0, height, 255, 0);

    for (i = 0; i < 10; i++) {
      for (j = 0; j < 5; j++) {

        x = i * width / 10;
        y = j * height / 5;

        if (mouseX > x && mouseX < x + width / 10  &&
          mouseY > y && mouseY <  y + height / 5  ) {

          fill(xCol, yCol);
          rect(x, y, width / 10, height / 5);
        } else {
          noFill();
        }

      }

    }
  }var img;
var clr = null;
var myColorPicker;
var canvas;
var filename;
var file_extension;

function preload() {
  img = loadImage("assets/image.jpg");
}

function color_distance(a, r, g, b) {
  var rr = (a[0] + r) / 2;
  var dr = a[0] - r;
  var dg = a[1] - g;
  var db = a[2] - b;

  return sqrt(dr * dr + dg * dg + db * db);
}

function get_min_distance(r, g, b) {
  var min_distance = color_distance(clr[0], r, g, b);
  var set_to_color = 0;
  var current_distance;

  for (var i = 1; i < clr.length; i++) {
    current_distance = color_distance(clr[i], r, g, b);
    if (current_distance < min_distance) {
      min_distance = current_distance;
      set_to_color = i;
    }
  }

  return set_to_color;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var a = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
  return a
}

function setup() {
  canvas = createCanvas(img.width, img.height * 2);

  myColorPicker = document.getElementById('colorPicker');

  myColorPicker.addEventListener("change", function() {
    console.log("1");
    clr[0] = hexToRgb(colorPicker.value)
    console.log(clr[0]);
    show_image();
  })

  myColorPicker2 = document.getElementById('colorPicker2');
  myColorPicker2.addEventListener("change", function() {
    console.log("2");
    clr[1] = hexToRgb(colorPicker2.value)
    console.log(clr[1]);
    show_image();
  })

  myColorPicker3 = document.getElementById('colorPicker3');
  myColorPicker3.addEventListener("change", function() {
    console.log("3");
    clr[2] = hexToRgb(colorPicker3.value)
    console.log(clr[2]);
    show_image();
  })

  myColorPicker4 = document.getElementById('colorPicker4');
  myColorPicker4.addEventListener("change", function() {
    console.log("4");
    clr[3] = hexToRgb(colorPicker4.value)
    console.log(clr[3]);
    show_image();
  })

  myColorPicker5 = document.getElementById('colorPicker5');
  myColorPicker5.addEventListener("change", function() {
    console.log("5");
    console.log(colorPicker5.value);
    clr[4] = hexToRgb(colorPicker5.value)
    console.log(clr[4]);
    show_image();
  })

  canvas.drop(gotFile);

  noLoop();

  var a = [29, 32, 33];
  var b = [110, 99, 98];
  var c = [127, 183, 190];
  var d = [241, 3, 106];
  var e = [245, 249, 233];

  clr = [
    a,
    b,
    c,
    d,
    e
  ];

  show_image();
}

function gotFile(file) {
  // debugger;
  if (file.type === 'image') {
    filename = file.name;
    file_extension = file.subtype;
    console.log(filename);
    // Create an image DOM element but don't show it
    img = createImg(file.data, "test", processFile).hide();
  } else {
    console.log('Not an image file!');
  }
}

function processFile() {
  image(img, 0, 0);
  show_image();
}

function show_image() {
  console.log(img.width, img.height);

  canvas = createCanvas(img.width, img.height * 2);
  imageMode(CORNER);
  pixelDensity(1);
  background(255);
  image(img, 0, 0);

  loadPixels();

  print(img.height * img.width);
  var offset = +img.height * img.width * 4;

  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var index = (x + y * width) * 4;
      var i = get_min_distance(pixels[index + 0], pixels[index + 1], pixels[index + 2]);
      pixels[offset + index + 0] = clr[i][0];
      pixels[offset + index + 1] = clr[i][1];
      pixels[offset + index + 2] = clr[i][2];
      pixels[offset + index + 3] = 255;
    }
  }

  print("ok");
  updatePixels();

  //saveCanvas(filename, "jpg");
}balloon = new Balloon( 200, 200, 40, 40);

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  

    balloon.run();
  
}

function balloonPop(){
	
  if(mouseIsPressed){
  
    balloon.sizeX = 0;
    balloon.sizeY = 0;
  
  }
  
  // for(let i = balloon.sizeX; i>=0; i--){
  // balloon.sizeX = i;
  // balloon.sizeY = i;  
  //}
}let x = 0;
let y = 0;
let xSpeed = 5;
let ySpeed = 5;


function setup() {
  createCanvas(400, 400);
  // Initialize the ball at the left edge and middle height
  x = 0;
}

function bounce(state, low, high, speed) {

  // Turn around when you cross a border
  if (state > high || state < 0) speed *= -1;

  return speed;
}

function draw() {
  background(220);

  // Move the ball
  x += xSpeed;
  y += ySpeed;

  ellipse(x, y, 50, 50);

  xSpeed = bounce(x, 0, width, xSpeed);
  ySpeed = bounce(y, 0, height, ySpeed);

}let colW;
let rowH;
let numCol;
let numRow;

function setup() {
  createCanvas(400, 400);

  numCol = 50;
  numRow = 50;
  colW = width / numCol;
  rowH = height / numRow;

}

function draw() {
  background(220);

  for (let col = 0; col < numCol; col++) {
    for (let row = 0; row < numRow; row++) {

      if (col % 2 == 1 && row % 2 == 1 || col % 2 == 0 && row % 2 == 0) {
        fill('black');
      } else {
        fill('white');
      }
      let x = col * colW;
      let y = row * rowH;
      let d = dist(mouseX, mouseY, x, y);
      map(d, 0, dist(0, 0, width, height), 0, 255);
      fill(d);

      rect(x, y, colW, rowH);




    }


  }
}function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
}

function draw() {
  background(255);
  fill(4);
  //noStroke();
  
  for(i = 0; i < 10; i++){
  	for(j = 0; j< 10; j++){
      x = i * 50;
      y = j * 50;
    	rect( x+20, y+20, 10, 10);
      
    }
  } 
}let x = 0;
let mouseRun = false;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  sp = width / 10;
  stroke(0);

  for (i = 0; i < width / sp; i++) {
    x = i * sp
    line(x, 0, x, height);

    if (mouseX > x && mouseX < (x + sp)) {
      fill(30 * i, 9 * i, 15 * i);
      rect(x, 0, sp, height);

    }
  }

}let x = 0;
let mouseRun = false;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  sp = width / 10;
  stroke(0);

  for (i = 0; i < width / sp; i++) {
    x = i * sp
    line(x, 0, x, height);

    if (mouseX > x && mouseX < (x + sp) && x < 300) {
      fill(0, 0, 255);
      rect(x, 0, sp, height);
    } else if (mouseX > x && mouseX < (x + sp) && x >= 300) {
      fill(255, 0, 0);
      rect(x, 0, sp, height);
    }

  }

}let x = 0;
let mouseRun = false;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  sp = width / 10;
  stroke(0);

  for (i = 0; i < width / sp; i++) {
    x = i * sp
    line(x, 0, x, height);

    if (mouseX > x && mouseX < (x + sp) && (x != 360)) {
      fill(255, 0, 0);
      rect(x, 0, sp, height);
    }
  }

}let x = 0;
let clickedM = false;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  sp = width / 3;
  stroke(0);

  for (i = 0; i < width / sp; i++) {
    x = i * sp
    line(x, 0, x, height);

    if (clickedM == true) {
      fill(255, 0, 0);
      rect(x, 0, sp, height);
    }
    if (clickedM == false) {
      fill(0, 0, 0);
      rect(x, 0, sp, height);
    }

    // if (mouseX > x && mouseX < (x + sp) ){
    //      fill(255,0,0);
    //      rect (x,0,sp, height); 

    function mousePressed() {
      if (mouseX > x && mouseX < (x + sp) && clickedM == true) {

        fill(255, 0, 0);
        rect(x, 0, sp, height);
        clickedM = !clickedM
      } else if (mouseX > x && mouseX < (x + sp) && clickedM == false) {
        fill(0, 0, 0);
        rect(x, 0, sp, height);
      }

    }

  }

}




let x = 0;
let mouseRun = false;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  sp = width/3;
  stroke(0);
  
for(i = 0; i < width / sp; i++){
	x = i * sp
  line(x, 0, x, height);

if (mouseX > x && mouseX < (x + sp)){
     fill(255,0,0);
     rect (x,0,sp, height); 
}
}  
  
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  
  //in the draw function create the circle on the middle left side of the canvas
  //write a function to move the circle to the right until it hits the left edge
  //when the circle hits the right edge have it reverse
  //reverse on each edge
}/*
ICM Homework 3 
Vegas Lights 
9/24/18
*/
let padding = 50;
let slider;
let img;

//preload function to import the image
function preload() {

  img = loadImage('images/elv.png');
}

function setup() {
  createCanvas(400, 400);
  slider = padding;
  rectMode(CENTER);
}

function draw() {
  background(255);
  noFill();



  //create the slider object
  sliderPos = map(slider, padding, width - padding, 0, 20);

  fill(255);

  //nested for loops to draw the cirlces and squares in the background
  for (let j = 0; j <= width; j += 20) {
    for (let k = 0; k <= height; k += 20) {
      //let x = random(10) * 100;

      if (sliderPos < 20) {

        ellipse(j, k, 10, 10);
        rect(j + 10, k + 10, 5, 5);
      }
    }

    //make elvis appear as the slider is dragged
    if (sliderPos < 20 && sliderPos > 1) {
      image(img, width / 2 - img.width / 4, height / 2 - img.height / 2, (sliderPos * 6), (sliderPos * 6));
    }

    //draw fanning lines at the bottom of scree
    for (let i = 0; i <= 50; i++) {
      stroke(random(255), random(255), random(255));
      if (sliderPos <= 20) {

        line(width / 2, height, 0, sliderPos / 2 * i);
        line(width / 2, height, width, sliderPos / 2 * i);
      }

    }


    // if the slider is < 50% then the lines begin to 
    //converge on each other, when > 50% they expand to this point


    //code to draw slider at bottom of screen
    fill(255);
    line(padding, height - padding, width - padding, height - padding);
    ellipse(CENTER);
    ellipse(slider, height - padding, 20, 20);


    //set the slider to the mouseX position as long as it is
    //within the correct set of bounds.
    if (mouseIsPressed && mouseY >= height - padding - 10 &&
      mouseY <= height - padding + 10) {
      if (mouseX >= padding && mouseX <= width - padding) {
        slider = mouseX;
      }
    }

  }
}	/*
  * Morgan Mueller 
  * ICM Homework 2
  * 09/17/18
  *Trippy Solar System
  */

	let sunX,sunY,sunW,sunH;//sun 
	let ringX,ringY;
	let  planetX,planetY;
	let asteroidX, asteroidY;
	let asteroidLocX, asteroidLocY;
 	//spaceship variables
	let spaceShipX = 0;
  let spaceShipY = 0;
	//let changeX, changeY;
	let easing = .05;
  //let mouseLocX, mouseLocY;
	let angle1, angle2, angle3, angle4, angle5;
	let speed = .01; //speed of planets
	let asteroidSpeed = 1;
	let c = 250; //center constant
	let radius = 50;
	let mercOrbit, venOrbit, earOrbit, marOrbit, jupOrbit; //each planet's orbit
	let ringCheckbox;
	let sunR;

	function setup() {
  createCanvas(500, 500);
  ellipseMode(CENTER);
	sunX=width/2;
  sunY=height/2;
  //planet's orbit is a random number between 0 and 10
  mercOrbit=random(8);
  venOrbit=random(15),
  earOrbit=random(18), 
  marOrbit=random(20), 
  jupOrbit=random(25);
	
  //
  asteroidLocX=random(width);
  asteroidLocY=random(height);
	asteroidX = random(5, 10);
  asteroidY = random(5, 10);
    
	//Checkbox to display the orbital rings when clicked
  fill(255);
  ringCheckbox =createCheckbox('rings',false);
  ringCheckbox.changed(showRings);
  ringCheckbox.position(10,20);
  
  //dictates the starting point of each planet
  angle1 = random(-2,3);
  angle2 = random(-5.6,0.6);
  angle3 = (-0.2,0.9);
  angle4 = (-3.14,3.14);
	angle5 = (0,6.28);

  //random r value for sun bursts  
  sunR = random(220,255);  

}

 //planet rings
  function showRings(){
	if (ringCheckbox.checked()){
    stroke(255);
    noFill();
    ellipse(sunX,sunY,ringX,ringY);
  	ellipse(sunX,sunY,ringX*1.75,ringY*1.75);
  	ellipse(sunX,sunY,ringX*2.5,ringY*2.5);
 	  ellipse(sunX,sunY,ringX*3.25,ringY*3.25);
 	  ellipse(sunX,sunY,ringX*4,ringY*4);
  }
  else{

  }
}

//sun size
sunW=60;
sunH=60;

//planet size
ringX=100;
ringY=100;

function draw() {
	  background(0);

  //display rings function called
  showRings();
  
  /*
  drawPlanet function.
  This function creates a planet at a base location
  with an initial speed and angle.
  When called the user can modify the location and orbit rotation.
  */
  function drawPlanet(cx,orbit,angle,radius,speed1,ringW,ringH){
  planetX = c + mercOrbit  + sin(angle) * radius;
  planetY = c + mercOrbit + cos(angle) * radius;
  angle = angle+speed;
  ellipse(planetX,planetY,ringW*1.75,ringH*1.75);

  }
  

  //sun and sun spots
  noStroke();
  fill(253, 184, 19);
  ellipse(sunX,sunY,sunW,sunH);
  fill(255, 153, 0);
  ellipse(sunX  +10,sunY + 5,10,10);
  fill(255, 0, 0);
  ellipse(sunX - 10,sunY - 10,12,12);
  fill(0);
  ellipse(sunX - 10,sunY - 10, 7,7);



  //mercury
  fill(213, 210, 209);
  stroke(0);
  drawPlanet(250,mercOrbit,angle1,radius,speed,11,11);
  angle1=angle1+speed;
  
  //Venus
  fill(139,160,130);
  stroke(0);
  drawPlanet(250,venOrbit,angle2,radius*1.5,speed,14,14);
    angle2=angle2+speed;

  //Earth
  fill(125,68,29);
  drawPlanet(250,venOrbit,angle3,radius*2.3,speed,17,17);
  angle3=angle3+speed;
  
  //Mars
  fill(193,68,14);
  drawPlanet(250,venOrbit,angle4,radius*3.25,speed,15,15);
  angle4=angle4+speed;
  
  //Jupiter
	fill(216,202,157);
  drawPlanet(250,venOrbit,angle5,radius*4.3,speed,20,20);
  angle5=angle5+speed;
  
   //sun flare
	fill(sunR,random(255),random(255));
	noStroke();
  asteroidLocX = asteroidLocX + asteroidSpeed;
  asteroidLocY = asteroidLocY + asteroidSpeed;
  
  //reset asteroid speed if its off screen
  if(asteroidLocX > width || asteroidLocX < 0 || asteroidLocY > height || asteroidLocY < 0){
  	asteroidSpeed = random(-5,5);
    
  }
  
  if(asteroidLocX > width || asteroidLocX < 0){
  	asteroidLocX = width / 2;  
  }
  
  if(asteroidLocY > height || asteroidLocY < 0){
  	asteroidLocY = height / 2;  
  }
  
  //creates the ring of solar flares
  push();
  translate(width / 2, height / 2);
  for(let i = 0; i < 500; i++){
   push();
    rotate(i * -10);
    let randX = random(2,10);
    let randY = random(2,10);
    ellipse(asteroidLocX,asteroidLocY,randX,randY);
    pop();
   }
   pop();
  
  //spaceship
 let mouseLocX = mouseX;
 let mouseLocY = mouseY;

 let  changeX = mouseLocX - spaceShipX;
 let  changeY	= mouseLocY - spaceShipY;
  spaceShipX = spaceShipX + changeX * easing;
  spaceShipY = spaceShipY + changeY * easing;
	 fill(255,165,0);
   rect(spaceShipX-7,spaceShipY+9,16,3);
   rect(spaceShipX-7,spaceShipY+3,16,3);

 	 fill(255, 0, 0);
	 rect(spaceShipX-5,spaceShipY+2,15,5);
   rect(spaceShipX-5,spaceShipY+8,15,5);
    fill(0,0,255);
		rect(spaceShipX,spaceShipY,50,15,0,100,100,0);
    
  	//spaceship name
  	fill(255);
  	text("Enterprise",spaceShipX+3,spaceShipY+10);
  

  
  //for loop that makes asteroids appear
	for(j = 20; j<25; j++){
 		fill(255);
  	ellipse(random(width),random(height),10,10);
  }
  
  
  
  //text for rings
  textSize(10);
  fill(255);
	text('Display Rings',12,20);

 }let x =0, y, xSpeed;
function setup() {
  createCanvas(400, 400);
	ellipseMode(CENTER);
   x = width/2;
 	 y = height/2;	
}
xSpeed =10;

function draw() {
  background(220);
  fill(0);
  //x = x - xSpeed; move ball to left of screen
  
  //Move ball to bottom right corner
  // x=x+xSpeed; 
  // y=y+xSpeed;
  
    
   //Move ball to top right corner
  // x=x+xSpeed;
  // y=y-xSpeed;
  
   //Move ball to top left corner
  // x=x-xSpeed;
  // y=y-xSpeed;
  
   //Move ball to bottom left corner
  x=x-xSpeed;
  y=y+xSpeed;
  
	ellipse(x,y,40,40);
  
}let x,y
let lx, rx, ty, by;
let cx,cy,hh,hy;
let dx, dy
let easing =.1;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  x =width/2;
  y = height/2
}

function draw() {
  background(220);
  fill(0);
 
  //drawing the rectangle with hardcoded numbers
   rect(x,y,width*.5,height*.5);
  
  //drawing the rect without hard coded numbers
//   cx = width/2;
//   cy = height/2;
//   hw = width/5;
//   hh = height/5;
  
//    lx = cx - hw;
//   	rx = cx + hw;
//   	ty = cy - hh;
//    by = cy + hh;
  
//   //creating the rect using vertexes with no hard coded numbers
//   strokeWeight(3);
// 	beginShape();
//   vertex(lx, ty );
//     vertex(rx, ty);
// 	  vertex(rx, by);
//  	 vertex(lx, by);
//  		endShape(CLOSE);
  
   dx = mouseX - x;
  x = x + dx * easing;
  
  dy = mouseY- y;
  y = y + dy * easing;
  
  


}function setup() {
  createCanvas(600, 600);
	  background(32,178,170);

}

function draw() {
  
  //shirt and body
  
  	smooth();
  	stroke(123,45,38);
		fill(123,45,38);
		triangle(270,270,300,320,240,300);
  	triangle(300,320,360,290,380,340);
  	
  	//shoulders and arms
  	quad(250,250,160,290, 120, 470, 210,470,240,300);
  	//line(420,260, 505, 320);  ,380,320
  	quad(210,470,320,470,380,340,240,300); //cuts off part of collar
  
  	//fixed part of shirt
  	strokeJoin(MITER);
    quad(315, 350,370,260,420,290);
  	triangle(420,290, 450,308, 315,350);
		quad(452,312, 460,470, 320,470); 
    quad(452,312, 320,330, 320,455,400,460);
		triangle(297,320,370,261,370,305);
  	rect(325,450,10,15);
  	stroke(194,197,198);
		fill(194,197,198);
  	triangle(320,300,360,320,370,261);	  //left shirt collar
    triangle(270,270,240,300,255,250);  	// right shirt collar
  
  	//shirt details
  	stroke(0,0,0); 
  	strokeWeight(2.5);
  	line(295,317, 290,470);
    line(310,317, 305,470);
  	
	
  	//buttons
  	ellipse(302, 330, 5,5);
    ellipse(301, 360, 5,5);
    ellipse(300, 390, 5,5);
    ellipse(299, 420, 5,5);
    ellipse(298, 450, 5,5);


   	//face
  	stroke(234,199,169);
  	fill(234,199,169);
  	triangle(255,249,368,260,300,320);
  	quad(255,249,368,260,340,210,280,210);
    ellipse(310,160, 110, 170,60);
  
 		//Hair(beard)
  	fill(183,72,42);
  	stroke(183,72,42);
  	quad(250,170,250,190,280,250,315,250,300,190);
  	quad(370,170,370,190,340,250,305,250,330,190);
	 	triangle(250,169,370,169,305,250);
  	
		//Hair(top of head)	
  	ellipse(310,83,40,20);
 		triangle(290,80, 260,110,290,100);
 	  triangle(300,75, 260,100,320,100);
 	  triangle(335,75, 290,110,350,100);

  	//Face details 
  	stroke(234,199,169);
  	fill(234,199,169);
  	quad(265,160,260,185,265,195,340,195);
  	quad(350,160,355,185,350,195,265,160);
		triangle(265,195, 300,195,280,215);
  	triangle(320,195,350,195,335,215);
  	rect(320,175, 30,20);
  	fill(249,158,144);
		ellipse(310,220,25,5);
  
  	//freckles
  	fill(249,101,14);
  	stroke(249,101,14);
  	ellipse(275,195,1,1);
  	ellipse(285,195,1,1);
		ellipse(280,185,1,1);
		
  	ellipse(330,195,1,1);
  	ellipse(340,195,1,1);
		ellipse(335,185,1,1);

  	//ears
  	fill(234,199,169);
  	stroke(249,158,144);
		arc(250,160,20,37,-90,PI,CHORD);
		arc(370,160,20,37,-90,PI,CHORD);
  	fill(109,111,112);
  	stroke(109,111,112);
		ellipse(252,164,8,12);
  	ellipse(369,164,8,12);

  	//eyes and nose
    fill(255);
  	stroke(255);
		rect(275, 155, 20, 10, 50,50,0,0);	
  	rect(320, 155, 20, 10, 50,50,0,0);
  	fill(11,122,117);
  	stroke(11,122,117);
  	ellipse(280,160,7,7);
  	stroke(194,197,198);
		fill(194,197,198);
		ellipse(280,160,2,2);
  
    stroke(11,122,117);
    ellipse(325,160,7,7);
    stroke(194,197,198);
    fill(194,197,198);
    ellipse(325,160,2,2);
  	
  	fill(25,83,95);	
  	stroke(249,158,144);
  	strokeWeight(2.5);
  	line(303,170,302,190);
		line(314,170,315,190);
  	strokeWeight(4);
  	line(295,255,285,290);
  	line(315,255,320,275);
  
  	//glasses
  	strokeWeight(2.5);
		noFill();
  	stroke(0);
  	ellipse(285,160,33,28);
		ellipse(331,160,33,28);
  	line(269,160,250,140);
  	line(347,160,365,140);
  	line(300,160,315,160);

  	//eyebrows
  	fill(183,72,42);
  	stroke(183,72,42);
		rect(271, 138, 25, 5, 20,20,20,20);	
		rect(320, 138, 25, 5, 20,20,20,20);	
  

}function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0,255,255); //background color
  
  fill(255,0,0); //fill color of rectangle
  stroke(0,0,0);
  rotate(PI/5);
  rect(0,-20, 1000,50);
  rotate(-PI/5);



  stroke(0,218,97); //stroke color of the ellipse
  fill(0,200,0); //fill color of the ellipse
  ellipse(400, 300, 350, 280); //ellipse
  
  fill(0,0,128);
  rect(535,250, 40,40);
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	fill(8, 232, 222);
	ellipse(200, 200, 100, 100);
}
function setup() { 
	createCanvas(500,500);
} 

function draw() { 
  background(220);
}
function setup() { 
	createCanvas(500,500);
} 

function draw() { 
  background(220);
}