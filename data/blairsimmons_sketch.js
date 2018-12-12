var oil;
var pic;
var firstClick = 0;

function preload() {
  oil = loadImage('joil.jpg');
  pic = loadImage('jpic.jpg');
  opening = loadSound('opening.m4a');
  turtle = loadSound('turtle.m4a');
	wind = loadSound('window.m4a');
	bracelet = loadSound('bracelet.m4a');
	couch = loadSound('couch.m4a');
	dog = loadSound('dog.m4a');
	vase = loadSound('vase.m4a');
  hair = loadSound('hair.m4a');
  house = loadSound('house.m4a');

}
function setup() {
  createCanvas(860,720);
  printOil();
  info();
}

function info(){
  noStroke();
  fill(255,255,255);
  ellipseMode(CORNER);
	ellipse(10,10,10,10); 

  textSize(30);
  text("↖",20,50);
}

function printOil(){
  image(oil, 0, 0);
}

function drawDots(){
  textSize(40);
	text("JANE + JUNIOR",10,35);
	
  ellipse(500,50,10,10); //window
  ellipse(400,200,10,10); //vase
  ellipse(790,420,10,10); //dog
  ellipse(120,560,10,10); //bracelet
  ellipse(220,620,10,10); //couch
  ellipse(200,400,10,10); //turtleneck
  ellipse(220,200,10,10); //hair
  ellipse(750,150,10,10); //house


  firstClick = 1;
}

function allpause(){
  opening.pause();
  turtle.pause();
	wind.pause();
	bracelet.pause();
	couch.pause();
	dog.pause();
	vase.pause();
  hair.pause();
  house.pause();
}

function mousePressed() {
  if(mouseX >= 10 && mouseX <= 20 && mouseY >= 10 && mouseY <= 20){
    opening.play();
    printOil();
    drawDots();
  }
	if(firstClick == 1){
    if(mouseX >= 500 && mouseX <= 510 && mouseY >= 50 && mouseY <= 60){ 
      //play window recording
    	allpause();
      wind.play();
    } else if(mouseX >= 750 && mouseX <= 760 && mouseY >= 150 && mouseY <= 160){
    	//play house recording
      allpause();
      house.play();
    } else if(mouseX >= 220 && mouseX <= 230 && mouseY >= 200 && mouseY <= 210){
    	//play hair recording
      allpause();
      hair.play();
    } else if(mouseX >= 200 && mouseX <= 210 && mouseY >= 400 && mouseY <= 410){
    	//play turtleneck recording
      allpause();
      turtle.play();
    } else if(mouseX >= 220 && mouseX <= 230 && mouseY >= 620 && mouseY <= 630){
    	//play couch recording
    	allpause();
      couch.play();
    } else if(mouseX >= 400 && mouseX <= 410 && mouseY >= 200 && mouseY <= 210){
    	//play vase recording
    	allpause();
      vase.play();
    } else if(mouseX >= 790 && mouseX <= 800 && mouseY >= 420 && mouseY <= 430){
    	//play dog recording
    	allpause();
      dog.play();
    } else if(mouseX >= 120 && mouseX <= 130 && mouseY >= 560 && mouseY <= 570){
    	//play bracelet recording
    	allpause();
      bracelet.play();
    }
	}
  
  // image(pic, 0, 0); //THIS IS THE PHOTO
}

//a cute little lemon, that is actually a button, 
//when you press it, it shakes like it is being tickled
//and it says something hopeful

var counter = 0;

var lemonX = 70;
var lemonY = 70;

function preload() {
  img = loadImage('lemon.jpg');
  img2 = loadImage('feather.png');
  sound = loadSound('giggle.wav');

}

function setup() { 
  createCanvas(800, 600);
  
} 

function draw() { 
  background(255);
  
  fill(237, 166, 158);
  noStroke();
  imageMode(CORNER);
  image(img,lemonX,lemonY);
  imageMode(CENTER);
  image(img2,mouseX-40,mouseY+40);
  


  if (counter >= 1){
    textSize(16);
    if(counter == 1){
  		text("when life gives you lemons, make lemonade",30,30);
    } if(counter == 2){
      text("We must accept finite disappointment, but never lose infinite hope.",30,30);
    }	if(counter == 3){
      text("Try to be a rainbow in someone's cloud.",30,30);
    }	if(counter >= 4){
      text("Out of advice, see you tomorrow.",30,30);

    }
  }

}

function mouseClicked() {
	tickled();
}

function tickled(){
  // rect(90,80,180,150);
	if(mouseX >= 90 && mouseX <= 270 && 
     mouseY >= 80 && mouseY <= 230){
		sound.play();
    counter++;
	}
}class Dot {
  
  //black screen: rect(x,y,32,25); 
  //stroke(113, 244, 66);
  constructor() {
    this.dotX = x-16;
    this.dotY = random((height/2)-11.5, (height/2)+11.5);
  }

  drawDot() {
    // ellipseMode(CENTER);
    // fill(113, 244, 66);
    stroke(113, 244, 66);
    point(this.dotX,this.dotY);

  }

  dotCrawl() {
    this.dotX++;
  }

  dotLocationX() {
    return this.dotX;
  }

  dotLocationY() {
    return this.dotY;
  }
}

var dotColony = [];
var s;
var currentS;

//origin points
var x;
var y;

function setup() { 
  createCanvas(400, 400);
  drawComp();
} 

function draw() { 
  loadingComp();
  dotTimer();
}

function drawComp(){
  x = width/2;
  y = height/2;
  
  rectMode(CENTER);
  
  fill(150);
  // noStroke();
  rect(x,y+10,7,30); //post
  rect(x,y,40,32,3); //silver frame
	quad(x-20,y+23,x+21,y+23,x+23,y+30,x-22,y+30);
  line(x-18,y+26,x+19,y+26);

  fill(0);
  rect(x,y,32,25); //black screen

}

function loadingComp(){
//dot drawing
  for (var i = 0; i < dotColony.length; i++) {
    dotColony[i].drawDot();
    dotColony[i].dotCrawl();

    if (dotColony[i].dotLocationX() > x + 16) {
      dotColony.shift();
    }
    
  }

}

function dotTimer() {
  //generate a dot every 5 seconds
  s = second();

  if (s != currentS) { //modulo operator
    if (s % 2 == 1) {
      var dot = new Dot();
      dotColony.push(dot);
      currentS = s;
    }
  }
}var nina, zeniba, juliana, amelia, 
    daun, jessica, jae, ellie,
    sally, miguel, cheyenne, xinxin;
var linesN, linesB, linesZ, linesJu, 
    linesD, linesA, linesE, linesJa,
    linesJe, linesS, linesM, linesC, linesX;
var markov;
var currentText, dialogue, stageDirections;
var myFont;

function preload() {
  
  juliana = loadStrings('Juliana.txt');
  nina = loadStrings('Nina.txt');
  zeniba = loadStrings('Zeniba.txt');
  daun = loadStrings('Daun.txt');
  amelia = loadStrings('Amelia.txt');
  ellie = loadStrings('Ellie.txt');
  jae = loadStrings('Jae.txt');
  jessica = loadStrings('Jessica.txt');
  sally = loadStrings('Sally.txt');
  miguel = loadStrings('Miguel.txt');
  cheyenne = loadStrings('Cheyenne.txt');
  xinxin = loadStrings('Xinxin.txt');

}

function requestData(url, selector, host){
  var currentURL = 'http://localhost:' + host + '/scrape?url=' + url + '&selector=' + selector;
  return loadJSON(currentURL);
}

function setup() {

  createCanvas(600, 3200);

  linesN = iterate(nina);
  linesZ = iterate(zeniba);
  linesJu = iterate(juliana);
  linesD = iterate(daun);
  linesA = iterate(amelia);
  linesE = iterate(ellie);
  linesJa = iterate(jae);
  linesJe = iterate(jessica);
  linesS = iterate(sally);
  linesM = iterate(miguel);
  linesC = iterate(cheyenne);
  linesX = iterate(xinxin);

  drawText();
}

function iterate(object) {
  markov = new RiMarkov(2);
  for (var key in object) {
    currentText = object[key].toString();
  	markov.loadText(currentText);
  }
  lines = markov.generateSentences(3);
  return lines;
}

function drawText() {
  background(255);
  textFont('COURIER NEW');
  textSize(13);
  textAlign(CENTER);
  text('Decontextualized Web Text in Conversation: a Play', 50, 30, 500, 500);
  textSize(10);
  text('by Blair Simmons', 50, 45, 500, 500);

  textAlign(LEFT);
  textStyle(BOLD);
  textSize(27);
  text('[A FEW SCENES]', 45, 80, 500, 500);

  textStyle(NORMAL);
  
  dialogue = createDialogue();
  
  textSize(17);
  text(dialogue, 50, 90, 500, 3100);
}

function createDialogue(){
	var d = '';
  for (var i = 0; i < 3; i++) {
    d = d + 
      '\n\nCharacter 1: (from a chair) ' + linesN[i] + 	//Nina
      '\n\nCharacter 2: (amused) ' + linesZ[i]; 				//Zeniba
  }
  
  d = d + '\n\n\t\t\t\t(they exit)';
  
  for (var j = 0; j < 3; j++) {
    d = d +
      '\n\nCharacter 3: (melting into the fetal position, then relaxing again) ' + linesJu[j] + 	//Juliana
      '\n\nCharacter 4: (yelling) ' + linesD[j] +  			//Daun
      '\n\nCharacter 5: (laughing) ' + linesA[j]; 			//Amelia
  }
  
  d = d + '\n\n\t\t\t\t(they exit)';

  for (var k = 0; k < 2; k++) {
		d = d +
      '\n\nCharacter 6: (deeply) ' + linesE[k] +  		//Ellie
      '\n\nCharacter 7: (taking a step) ' + linesJa[k] +  			//Jae
      '\n\nCharacter 8: (in a resigned fashion) ' + linesJe[k] + 	//Jessica
      '\n\nCharacter 9: (taking a seat, and then standing up indignantly after speaking) ' + linesC[k];//Cheyenne
  }
  
  d = d + '\n\n\t\t\t\t(they exit)';

  for (var m = 0; m < 3; m++) {
    d = d + 
      '\n\nCharacter 10: (from the floor) ' + linesM[m] +		//Miguel
      '\n\nCharacter 11: (jumping about) ' + linesX[m] +		//Xinxin
      '\n\nCharacter 12: (shaking) ' + linesS[m];	 			//Sally
  }
  
  d = d + '\n\n\t\t\t\t(they exit)\n';
  
  return d;
}


var y = 90;

function setup() { 
  createCanvas(600, 650);
  drawLines();
} 

function drawLines() { 
  background(240);
  stroke(242, 130, 136);
  line(70, 0, 70, height);
  
  for(var i = 0; i < height/29; i++){
  	line(0, y, width, y);
    stroke(131, 177, 252);
    y = y + 25;
  }
  
  y = 90;
  stroke(196, 194, 194);
  fill(196, 194, 194);
  for(var j = 0; j < 3; j++){
  	ellipse(35, y, 20, 20);
    y = y + (height/3);
	}
}class Dot {
  
  constructor() {
    this.dotX = x-16;
    this.dotY = random((height/2)-11.5, (height/2)+11.5);
  }

  drawDot() {
    stroke(113, 244, 66);
    point(this.dotX,this.dotY);

  }

  dotCrawl() {
    this.dotX++;
  }

  dotLocationX() {
    return this.dotX;
  }

  dotLocationY() {
    return this.dotY;
  }
}

var dotColony = [];
var s;
var currentS;

//origin points
var x;
var y;

var bioLines, tweetLines,tweet2Lines, 
markov, currentText, bio, 
tweets2, tweets, dialogue = "", myFont, counter = 0;

function preload() {

  //load in Sam's tweets
  tweets = requestData('https://twitter.com/SamuelChasan','.tweet-text','8000');

  //load in Dan's ITP bio
  bio = requestData('https://tisch.nyu.edu/about/directory/itp/95379870','.columns :nth-child(1)','8080');
  
  //load in Blair's Twitter
  tweets2 = requestData('https://twitter.com/stagingwitt','.tweet-text','8081');
  
}

function requestData(url, selector, host){
  currentURL = 'http://localhost:'+ host +'/scrape?url=' + url + '&selector=' + selector;
  return loadJSON(currentURL);
}

function setup() {

  createCanvas(600, 750);
	drawComp();

  tweetLines = iterate(tweets);
  bioLines = iterate(bio);
  tweetLines2 = iterate(tweets2);
  
}

function draw() { 
  if(counter >= 5){
    drawText();
    return;
  }
  
  loadingComp();
  dotTimer();
  
}

function drawComp(){

  x = width/2;
  y = height/2;
  
  rectMode(CENTER);
  
  fill(150);
  // noStroke();
  rect(x,y+10,7,30); //post
  rect(x,y,40,32,3); //silver frame
	quad(x-20,y+23,x+21,y+23,x+23,y+30,x-22,y+30);
  line(x-18,y+26,x+19,y+26);

  fill(0);
  rect(x,y,32,25); //black screen

}

function loadingComp(){

//dot drawing
  for (var i = 0; i < dotColony.length; i++) {
    dotColony[i].drawDot();
    dotColony[i].dotCrawl();
    if (dotColony[i].dotLocationX() > x + 16) {
      dotColony.shift();
    }
  }

}

function dotTimer() {

  //generate a dot every 5 seconds
  s = second();

  if (s != currentS) { //modulo operator
    if (s % 2 == 1) {
      var dot = new Dot();
      dotColony.push(dot);
      currentS = s;
      counter++;
    }
  }

}

function iterate(object) {
  markov = new RiMarkov(2);
  for (var key in object) {
    currentText = object[key].toString();
    markov.loadText(currentText);
  }
  lines = markov.generateSentences(4);
  return lines;
}

function drawText() {

  background(222);
  noStroke();
  
  rectMode(CORNER);
  
  textFont('COURIER NEW');
  textSize(13);
  textAlign(CENTER);
  text('Decontextualized Web Text in Conversation: a Play', 50, 30, 500, 500);
  textSize(10);
  text('by Blair Simmons', 50, 45, 500, 500);

  textAlign(LEFT);
  textStyle(BOLD);
  textSize(27);
  text('[PROLOGUE]', 50, 80, 500, 500);
  
  textSize(10);
  textStyle(ITALIC);
  text('to a larger project', 210, 95, 500, 500);


  textStyle(NORMAL);
  for (var i = 0; i < 3; i++) {
    dialogue = dialogue + '\nCharacter1:\t\t' + bioLines[i] + '\n\nCharacter2:\t\t' + tweetLines[i] + '\n\nCharacter3:\t\t' + tweetLines2[i] +'\n';
  }
  
  textSize(17);
  
  text(dialogue, 50, 90, 500, 500);

}
var stuff = "sup sup sup";

// function preload() {

// }


function setup() {
  //loads in text file as lines of text


var url = "http://www.whateverorigin.org/get?url=" + encodeURIComponent("https://en.wikipedia.org/wiki/Web_scraping") + "&callback=?";
$.get(url, function(response) {
  console.log(response);
});

//   console.log("i am loading data");
//   //get the raw HTML source into an array of strings
//   //each line is one element in the array
//   var lines = []
//   lines = stuff;

//   console.log(lines);
//   //turn array into one long string
//   var html = join(lines, "");

//   //Searching for __________
//   var start = "<p>";
//   var end = "</p>";
//   var language = giveMeTextBetween(html, start, end);
//   console.log(language + "hiiiiii");

}



//a function that returns a substring between two substrings
function giveMeTextBetween(s, before, after) {
  console.log("i am running giveMeTextBetween");

  var found = "";
  var start = s.indexOf(before); //find the index of the beginning tag 
  console.log(start);
  if (start == -1) {
    print("sup");
    return ""; //if we don't find anything, send back a blank String
  }
  start += before.length(); //move to the end of the beginning tag
  var end = s.indexOf(after, start); // find the index of the end tag
  if (end == -1) {
    return ""; //if we dont find the end tag, send back a blank string
  }
  return s.substring(start, end); //return the text in between
}

function setup() {
  //loads in text file as lines of text
  // txt = loadStrings('text.txt');
	// txt = loadStrings('text.txt');
  
  
  
  
  console.log("i am loading data");
	//get the raw HTML source into an array of strings
	//each line is one element in the array
	var url = "http://www.imdb.com/title/tt0158552/";
	var lines = []
	lines = loadStrings(url);

  console.log(lines);
	//turn array into one long string
	var html = join(lines,"");

	//Searching for __________
	var start = "<p>";
	var end = "</p>";
	var language = giveMeTextBetween(html,start,end);
	console.log(language + "hiiiiii");

	// loadData();
}

// function loadData(){
// 	console.log("i am loading data");
// 	//get the raw HTML source into an array of strings
// 	//each line is one element in the array
// 	var url = "http://www.imdb.com/title/tt0158552/";
// 	var lines = []
// 	lines = loadStrings(url);

// 	//turn array into one long string
// 	var html = join(lines,"");

// 	//Searching for __________
// 	var start = "<p>";
// 	var end = "</p>";
// 	var language = giveMeTextBetween(html,start,end);
// 	console.log(language);
// }

//a function that returns a substring between two substrings
function giveMeTextBetween(s, before, after){
	console.log("i am running giveMeTextBetween");

	var found = "";
	var start = s.indexOf(before); //find the index of the beginning tag 
  console.log(start);
  if (start == -1){
    print("sup");
		return ""; //if we don't find anything, send back a blank String
	}
	start += before.length(); //move to the end of the beginning tag
	var end = s.indexOf(after,start); // find the index of the end tag
	if (end == -1){
		return ""; //if we dont find the end tag, send back a blank string
	}
	return s.substring(start, end); //return the text in between
}

// function setup() {
//   noCanvas();
//
//   // //allWords array holds every character as a symbol
//   // var allWords = txt.join("/n");
//   // //tokens array now contains individual words
//   // var tokens = allWords.toLowerCase().split(/\W+/);
//   //
//   // for (var i = 0; i < allWords.length; i++) {
//   //   currentWord = tokens[i];
//   //   print(currentWord);
//   // }
// }
var currentWord;
var url;
var data;

var txt;

var nouns;
var articles;
var adjectives;
var adverbs;
var prepositions;
var pronouns;
var verbs;

var tags;

function preload() {
  //loads in text file as lines of text
  // txt = loadStrings('text.txt');
	txt = loadStrings('text.txt');

}

function setup() {
  noCanvas();

  //allWords array holds every character as a symbol
  var allWords = txt.join("/n");
  //tokens array now contains individual words
  var tokens = allWords.toLowerCase().split(/\W+/);

  for (var i = 0; i < allWords.length; i++) {

    currentWord = tokens[i];
    print(currentWord);

    tags = RiTa.getPosTags(currentWord);
    
    print(tags);
    print(tags[0]);

    // var tagStr = tags.join(" ");

      if (tags[0] == 'nn') {
        nouns.push(currentWord);
        print("found" + nouns.length + "noun(s)");
      } 

  }


}var currentWord;
var url;
var data;

var txt;

var nouns;
var articles;
var adjectives;
var adverbs;
var prepositions;
var pronouns;
var verbs;

var tags;

function preload() {
  //loads in text file as lines of text
  // txt = loadStrings('text.txt');
	txt = loadStrings('text.txt');

}

function setup() {
  noCanvas();

  //allWords array holds every character as a symbol
  var allWords = txt.join("/n");
  //tokens array now contains individual words
  var tokens = allWords.toLowerCase().split(/\W+/);

  for (var i = 0; i < allWords.length; i++) {

    currentWord = tokens[i];
    print(currentWord);

    tags = RiTa.getPosTags(currentWord);
    
    print(tags);
    print(tags[0]);

    // var tagStr = tags.join(" ");

      if (tags[0] == 'nn') {
        nouns.push(currentWord);
        print("found" + nouns.length + "noun(s)");
      } 

  }


}var lines, markov, data1, data2, x = 160, y = 240;

function preload() {

  data1 = loadStrings('caryl.txt');
  data2 = loadStrings('FAact2.txt');
 
}

function setup() {

  createCanvas(500, 500);
  textFont('times', 16);
  textAlign(LEFT);

  lines = ["click to (re)generate!"];

  // create a markov model w' n=4
  markov = new RiMarkov(4);

  
  // load text into the model
  markov.loadText(data1.join(' '));
  markov.loadText(data2.join(' '));
  

  drawText();
}

function drawText() {

  background(250);
  text(lines.join(' '), x, y, 400, 400);
}

function mouseClicked() {

  x = y = 50;
  lines = markov.generateSentences(2);
  
  
  drawText();
}var capture;
var button;
var filterButton;
var blackWhite;

function setup() {
  createCanvas(320, 240);
  background(51);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  
  button = createButton('PIC');
  filterButton = createButton('INVERT');
  blackWhite = createButton('B&W');

  
	button.mousePressed(takesnap);
  filterButton.mousePressed(changeFilter);
  blackWhite.mousePressed(blackAndWhite);
}



function takesnap(){
  image(capture, 0, 0, width, width * capture.height / capture.width);

}

function changeFilter(){
  filter(INVERT);
}

function blackAndWhite(){
  filter("gray");
}

var field;
var button;
function setup() {
  createCanvas(400, 300);
  field = createInput();
  button = createButton("Tag, you're it!");
  button.mousePressed(tagText);
  background(50);
  textSize(24);
  fill(255);
  noStroke();
}
function draw() {
}
function tagText() {
  background(50);
  // getPosTags returns an array of tags
  var tags = RiTa.getPosTags(field.value());
  var tagStr = tags.join(" ");
  text(tagStr, 10, 10, width-20, height-20);
  print(tagStr);
}var data;
function preload() {
  data = loadJSON('http://api.wordnik.com:80/v4/word.json/unicorn/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5');
}

function setup() { 
  noCanvas();
	print(data[1].partOfSpeech)
  createP(data[1].text);
  
} var currentWord;
var url;
var data;

var txt;

var nouns;
var articles;
var adjectives;
var adverbs;
var prepositions;
var pronouns;
var verbs;

var tags;

function preload() {
  //loads in text file as lines of text
  txt = loadStrings('text.txt');
}

function setup() {
  noCanvas();

  //allWords array holds every character as a symbol
  var allWords = txt.join("/n");
  //tokens array now contains individual words
  var tokens = allWords.toLowerCase().split(/\W+/);

  for (var i = 0; i < allWords.length; i++) {

    currentWord = tokens[i];
    // print(currentWord);

    tags = RiTa.getPosTags(currentWord);
    
    print(tags);
    print(tags[0]);

    // var tagStr = tags.join(" ");

      if (tags[0] == 'nn') {
        nouns.push(currentWord);
        print("found" + nouns.length + "noun(s)");
      } 
    //		else if (data[1].partOfSpeech == 'definite-article') {
    //     articles.push(currentWord);
    //   } else if (data[1].partOfSpeech == 'adjective') { //add something about null
    //     adjectives.push(currentWord);
    //   } else if (data[1].partOfSpeech == 'adverb') {
    //     adverbs.push(currentWord);
    //   } else if (data[1].partOfSpeech == 'preposition') {
    //     prepositions.push(currentWord);
    //   } else if (data[1].partOfSpeech == 'pronoun') {
    //     pronouns.push(currentWord);
    //   } else if (data[1].partOfSpeech == 'verb') {
    //     verbs.push(currentWord);
    //   }
  }


}var txt;

var nouns;
var articles;
var adjectives;
var adverbs;
var prepositions;
var pronouns;
var verbs;

var currentWord;

function preload() {
  //loads in text file as lines of text
  txt = loadStrings('roastbeef.txt');
}

function setup() {
  //allWords array holds every character as a symbol
  var allWords = txt.join("/n");
  //tokens array now contains individual words
  var tokens = allWords.toLowerCase().split(/\W+/);

  print(tokens[0]);

  var url = 'https://od-api.oxforddictionaries.com:443/api/v1/lexicalcategories/en/' + 'roastbeef';

  httpDo(url, {
      method: 'GET',
      // Other Request options, like special headers for apis
      headers: {
        "Accept": "application/json",
        "app_id": "bf762b18",
        "app_key": "8a3b432f042a3bb30f6b7de2e22b1c78"}
      },
      function(res){
    		currentWord = res;
  		});

  // var url = 'http://api.wordnik.com:80/v4/word.json/roastbeef/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
  // var response = loadJSON(url);
  // console.log(response[0]);

//     for (var i = 0; i < allWords.length; i++) {
//       var word = tokens[i];

//       if (isNoun(word)) {
//         nouns.push(word);
//       } else if (isArticles(word)) {
//         articles.push(word);
//       } else if (isAdjectives(word)) { //add something about null
//         adjectives.push(word);
//       } else if (isAdverbs(word)) {
//         adverbs.push(word);
//       } else if (isPrepositions(word)) {
//         prepositions.push(word);
//       }else if (isPronouns(word)) {
//         pronouns.push(word);
//       }else if (isVerbs(word)) {
//         verbs.push(word);
//       } 
//     }

  // print(tokens[i]);

  noCanvas();
}

var txt = [];
var counts = {};
var keys = [];

var files = ['ROOMS.txt', 'OBJECTS.txt', 'FOOD.txt'];

var allWords = [];

function preload() {
  for (var i = 0; i < files.length; i++) {
    txt[i] = loadStrings(files[i]);
    print("printing: " + i);

  }

}

function setup() {

  for (var n = 0; n < txt.length; n++) {
    print("printing: " + n);

    allWords[n] = txt[n].join("\n");
  }
  
  //the BELOW IS THE PROBLEM
  var tokens = allWords.split(/\W+/);
	print("sup");

  console.log(tokens);


  for (var m = 0; m <= tokens.length; m++) {
    print("printing: " + m);

    var word = tokens[m];
    if (!/\d+/.test(word)) {
      if (counts[word] === undefined) {
        counts[word] = 1;
        keys.push(word);
      } else {
        counts[word]++;
      }
    }
  }

  keys.sort();

  for (var k = 0; k <= keys.length; k++) { // noprotect
    var key = keys[k]; // noprotect
    createDiv(key + " " + counts[key]); // noprotect
    // createDiv(keys[k]); // noprotect
  }
  noCanvas();

  console.log(counts);
  print("printing");
}


/*PROBLEMS/QUESTIONS: 
1 .toLowerCase()
2 longer texts won't process - "// noprotect" -  infinite loop
*/function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}// Declare a "SerialPort" object
var serial;
var currentString;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
   serial.on('data', gotData);

}

// There is data available to work with from the serial port
function gotData() {
	currentString = Number(serial.read());
  console.log(currentString);
}

function draw() {
  background(0);
  fill(255);
  textSize(10);

  // text("value: " + currentString, 30, 30);
  
  if (currentString == 1){
    	textSize(60);
    	textAlign(CENTER);
      text("LANGUAGE",windowWidth/2, windowHeight/2);
  }
}

// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("dev/cu.usbmodem1421");

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
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}class Ant {

  constructor() {
    this.antX = 0;
    this.antY = random(0, height);
    this.antC = 6; //change this variable to scale ant
    this.antL = this.antC * (2 / 3);
    this.whichLeg = 0;
  }

  drawAnt() {
    ellipseMode(CENTER);
    fill(0);
    stroke(0);

    //body
    ellipse(this.antX - (this.antC * 2), this.antY, this.antC, this.antC); //butt
    ellipse(this.antX - this.antC, this.antY, this.antC, this.antC); //middle
    ellipse(this.antX, this.antY, this.antC, this.antC); //head

    //legs
    line(this.antX - (this.antC * 2), this.antY + this.antC, this.antX - (this.antC * 2), this.antY - this.antC);
    line(this.antX - this.antC, this.antY + this.antC, this.antX - this.antC, this.antY - this.antC);

    //antenna
    noFill();
    arc(this.antX, this.antY - (this.antC / 2), this.antC * 1.5, this.antC, 5.5, 1);
    arc(this.antX, this.antY + (this.antC / 2), this.antC * 1.5, this.antC, 5.5, 0.6);

  }

  antCrawl() {
    this.antX++;
  }

  antLocationX() {
    return this.antX;
  }

  antLocationY() {
    return this.antY;
  }


  // alternatingLegs() {
  //   if (this.whichLeg == 0) {
  //     //straight legs
  //     line(this.antX - (this.antC * 2), this.antY + this.antC, this.antX - (this.antC * 2), this.antY - this.antC);
  //     line(this.antX - this.antC, this.antY + this.antC, this.antX - this.antC, this.antY - this.antC); //middle leg
  //     this.whichLeg++;
  //   }
  //   if (this.whichLeg == 1) {
  //     //forward slash legs
  //     line(this.antX - (this.antC * 2) + (this.antC / 2), this.antY + this.antC, this.antX - this.antC + (this.antC / 2), this.antY - this.antC);
  //     line(this.antX - (this.antC * 2) - (this.antC / 2), this.antY + this.antC, this.antX - (this.antC * 2) + (this.antC / 2), this.antY - this.antC);
  //     this.whichLeg++;
  //   }
  //   if (this.whichLeg == 2) {
  //     //straight legs
  //     line(this.antX - (this.antC * 2), this.antY + this.antC, this.antX - (this.antC * 2), this.antY - this.antC);
  //     line(this.antX - this.antC, this.antY + this.antC, this.antX - this.antC, this.antY - this.antC); //middle leg
  //     this.whichLeg++;
  //   }
  //   if (this.whichLeg == 3) {
  //     //back slash legs
  //     line(this.antX - (this.antC * 2) - (this.antC / 2), this.antY - this.antC, this.antX - (this.antC * 2) + (this.antC / 2), this.antY + this.antC);
  //     line(this.antX - (this.antC / 2), this.antY + this.antC, this.antX - (this.antC * 2) + (this.antC / 2), this.antY - this.antC);
  //     this.whichLeg++;
  //   }
  //   if (this.whichLeg == 4) {
  //     //straight legs
  //     line(this.antX - (this.antC * 2), this.antY + this.antC, this.antX - (this.antC * 2), this.antY - this.antC);
  //     line(this.antX - this.antC, this.antY + this.antC, this.antX - this.antC, this.antY - this.antC); //middle leg
  //     this.whichLeg = 0;
  //   }
  // }


}

class Bite {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.c = 4;
  }

  drawBite() {
    ellipseMode(CENTER);
    fill(255);
    stroke(255);
    ellipse(this.x, this.y, this.c, this.c);
  }

}

var antColony = [];
var bites = [];
var s;
var currentS;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  creamsicle();
  drawAllAnts();
  antTimer();
  
  print("ant array length: "+ antColony.length);
  print("bites array length: "+ bites.length);


}


function creamsicle() {
  //orange
  fill(255, 181, 63);
  noStroke();
  ellipseMode(CENTER);
  rectMode(CENTER);
  ellipse(200, 150, 100, 100);
  rect(200, 200, 100, 100);

  //highlight
  fill(255, 211, 145);
  ellipse(240, 150, 5, 5);

  //cream
  fill(255);
  rect(200, 240, 80, 10);

  //stick
  fill(204, 167, 110);
  rect(200, 275, 20, 70);
  ellipse(200, 310, 20, 20);
}

function antTimer() {
  //generate an ant every 5 seconds
  s = second();

  if (s != currentS) { //modulo operator
    if (s == 0 || s == 4 || s == 5 || s == 8 || s == 10 || s == 13 || s == 15 || s == 20 || s == 25 || s == 27 || s == 30 || s == 33 || s == 35 || s == 40 || s == 45 || s == 50 || s == 55) {
      var ant = new Ant();
      antColony.push(ant);
      currentS = s;
    }
  }
}

function onCreamsicle(x, y) {

  if (x >= 150 && x <= 250 && y >= 100 && y <= 250) {
    var bite = new Bite(x, y);
    bites.push(bite);
  }
}

function drawAllAnts() {
  // translate(width/2, height/2);
  // rotate(PI/3.0);

  //bite drawing
  for (var j = 0; j < bites.length; j++) {
    bites[j].drawBite();
  }

  //ant drawing
  for (var i = 0; i < antColony.length; i++) {
    antColony[i].drawAnt();
    antColony[i].antCrawl();
    onCreamsicle(antColony[i].antLocationX(), antColony[i].antLocationY());
    // if(antColony[i].antLocationX() ){
    // }
    // antColony[i].alternatingLegs()
    if (antColony[i].antLocationX() > width + 100) {
      antColony.shift();
    }
  }



}

function mousePressed() {
  var ant = new Ant();
  antColony.push(ant);

  for (var i =antColony.length-1; i >-1; i--) {

    var x = antColony[i].antLocationX();
    var y = antColony[i].antLocationY();
    if (mouseX <= x + 5 && mouseX >= x - 20 && mouseY <= y + 5 && mouseY >= y - 5) {
      print("removed");
      antColony.splice(i, 1);
      // antColony[i].remove();
    }
  }

}var antX = 300;
var antY = 200;
var antC =10; //change this variable to scale ant
var antL = antC * (2/3);


function setup() { 
  createCanvas(400, 400);
  
} 

function draw() { 
  background(220);
  
  ellipseMode(CENTER);
  fill(0);
  
  //body
  ellipse(antX-(antC*2),antY,antC,antC); //butt
  ellipse(antX-antC,antY,antC,antC); //middle
  ellipse(antX,antY,antC,antC); //head

  //antenna
  noFill();
  arc(antX,antY-(antC/2),antC*1.5,antC,5.5,1);
  arc(antX,antY+(antC/2),antC*1.5,antC,5.5,0.6);

  
  //straight butt leg
  line(antX-(antC*2),antY+antC,antX-(antC*2),antY-antC);

  //moving butt leg - forward slash
  line(antX-(antC*2)-(antC/2),antY+antC,antX-(antC*2)+(antC/2),antY-antC);

  //moving butt leg - back slash
  line(antX-(antC*2)-(antC/2),antY-antC,antX-(antC*2)+(antC/2),antY+antC);

  //straight middle leg
  line(antX-antC,antY+antC,antX-antC,antY-antC);//middle leg
	
  //moving middle - back slash
  line(antX-(antC/2),antY+antC,antX-(antC*2)+(antC/2),antY-antC);

  //moving middle - forward slash
  line(antX-(antC*2)+(antC/2),antY+antC,antX-antC+(antC/2),antY-antC);

  // antX++;
  // antY--;
  
  
}let allRays = [];
let angle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for (var i = 0; i < allRays.length; i++) {
    allRays[i].move();
    allRays[i].check();
    allRays[i].show();
  }
	push(); //remember what it was like before translate, rotate
  translate(width / 2, height / 2);
  rotate(angle);
  ellipse(0, 0, 40, 20);
  pop(); //restore what translate and rotate messed up
  //push and pop not really neccessary if last thing draw
}

class Ray {
  constructor(x, y, startAngle) {
    this.origin = x;
    this.origin = y;
    this.distance = 0;
    this.angle = startAngle;
    this.stillOnScreen = true;
    this.speed = 1;
  }
  move() {
    this.distance = this.distance + this.speed;
    this.speed = this.speed + this.distance / 100;
  }
  check() {
    this.stillOnScreen = (this.distance < width / 2);
  }
  show() {
    push();// remember the fill and stroke before
    fill(255, 0, 0, 255 - this.distance * 2);
    stroke(255, 0, 0, 255 - this.distance * 2);
    if (this.stillOnScreen) {
      for (var i = 0; i < 10; i++) {
        var x = this.origin + (this.distance + i * 10) * cos(this.angle);
        var y = this.origin + (this.distance + i * 10) * sin(this.angle);
        ellipse(x, y, 2 + i * 2, 2 + i * 2);
      }
    }
    pop();  //restore fill and stroke
  }
}


function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    angle = angle + 0.1;
  } else if (keyCode == RIGHT_ARROW) {
    angle = angle - 0.1;
  } else if (keyCode == UP_ARROW) {
    allRays.push(new Ray(width / 2, height / 2, angle));
  }
}let allRays = [];
let angle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for (var i = 0; i < allRays.length; i++) {
    allRays[i].move();
    allRays[i].check();
    allRays[i].show();
  }
	push(); //remember what it was like before translate, rotate
  translate(width / 2, height / 2);
  rotate(angle);
  ellipse(0, 0, 40, 20);
  pop(); //restore what translate and rotate messed up
  //push and pop not really neccessary if last thing draw
}

class Ray {
  constructor(x, y, startAngle) {
    this.origin = x;
    this.origin = y;
    this.distance = 0;
    this.angle = startAngle;
    this.stillOnScreen = true;
    this.speed = 1;
  }
  move() {
    this.distance = this.distance + this.speed;
    this.speed = this.speed + this.distance / 100;
  }
  check() {
    this.stillOnScreen = (this.distance < width / 2);
  }
  show() {
    push();// remember the fill and stroke before
    fill(255, 0, 0, 255 - this.distance * 2);
    stroke(255, 0, 0, 255 - this.distance * 2);
    if (this.stillOnScreen) {
      for (var i = 0; i < 10; i++) {
        var x = this.origin + (this.distance + i * 10) * cos(this.angle);
        var y = this.origin + (this.distance + i * 10) * sin(this.angle);
        ellipse(x, y, 2 + i * 2, 2 + i * 2);
      }
    }
    pop();  //restore fill and stroke
  }
}


function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    angle = angle + 0.1;
  } else if (keyCode == RIGHT_ARROW) {
    angle = angle - 0.1;
  } else if (keyCode == UP_ARROW) {
    allRays.push(new Ray(width / 2, height / 2, angle));
  }
}//keeps track of where the chicken is on the screen
var chicken = {
  x: -30,
  y: (Math.random() * 200) + 70,
}

var tinyChicken = {
  x: chicken.x - 100,
  y: chicken.y + 60,
}

//keeps the egg in place & onscreen once it has been laid
var eggX;
var eggY;

var eggW;
var eggH;

// function egg(){
//   this.x = 0;
//   this.y = 0;
//   this.fall = {
//     this.y++
//   }

//}




var isEgg; //keeps track of whether or not an egg has been laid
var hatchedEgg; //keeps track of hatched or unhatched egg
var isChickHatched;

//counts how many eggs the chicken has laid that have hit the nest
var eggCounter;

//the speed of the chicken
var chickenSpeed;

//where nest appears is dictated by this var
var randomNestPos;

function preload() {
  plopSound = loadSound('plop.mp3');
  chickSound = loadSound('chicken.wav');
  chickSoundShort = loadSound('chickenshort.wav');
  grass = loadImage("grass.jpg");

}

function setup() {
  createCanvas(400, 400);

  chickSound.setVolume(0.2);
  chickSound.play();

  chicken.x = -30;
  chicken.y = (Math.random() * 200) + 70;
  isEgg = 0;
  hatchedEgg = 0;
  isChickHatched = 0;
  eggCounter = 0;
  chickenSpeed = 8;
  randomNestPos = (Math.random() * 200) + 70;

  eggW = 20;
  eggH = 30;

}

function draw() {
  frameRate(chickenSpeed);
  background(26, 148, 49);

  drawTinyChicken();
  laidEgg();
  nest();
  drawChicken();
  chickenWalking();
  checkIfEggHitNest();
}

function nest() {
  //nest
  fill(170, 107, 51);
  // ellipse(200,360,100,30);
  // point(150, 370);
  ellipseMode(CENTER);

  ellipse(randomNestPos, 385, 50, 30); //brown nest


  fill(255, 215, 0);
  ellipse(randomNestPos, 360, 40, 60); //egg in nest

  fill(0);
  strokeWeight(0);
  textSize(20);
  textAlign(CENTER);
  text(eggCounter, randomNestPos, 365);
}

function checkIfEggHitNest() {
  //egg count increases
  if ((eggX < randomNestPos + 25) && (eggX > randomNestPos - 25)) {
    if (eggY > 420) {
      eggCounter++;
      randomNestPos = (Math.random() * 200) + 70;
      chickenSpeed = chickenSpeed + 1;
    }
  }
  //chicken speeds up
}

//drops most recently laid egg down the screen
function laidEgg() {


  //so the egg won't fall infinitely
  if (eggY >= 430) {
    isEgg = 0;
    hatchedEgg = 0;
  }

  //is there an egg at all?
  if (isEgg == 1) {
    //the egg has not been hatched
    if (hatchedEgg == 0) {
      drawEgg();
      eggY = eggY + 8;
    }
    //the egg was hatched
    else if (hatchedEgg == 1) {
      drawEgg();
      eggY = eggY + 8;
    }


  }

}


function drawEgg() {
  if (hatchedEgg == 0) {
    fill(255, 215, 0);
    ellipse(eggX, eggY, eggW, eggH);
  } else if (hatchedEgg == 1) {
    strokeWeight(2);
    fill(255, 215, 0);
    arc(eggX, eggY, eggW, eggH, 6.3, 3.1, CLOSE);
    line(eggX - (eggW / 2), eggY, eggX - eggW / 5, eggY + (eggH / 6));
    line(eggX - eggW / 5, eggY + (eggH / 6), eggX, eggY);
    line(eggX, eggY, eggX + eggW / 5, eggY + (eggH / 6));
    line(eggX + eggW / 5, eggY + (eggH / 6), eggX + (eggW / 2) - 1, eggY);
    noStroke();
    fill(26, 148, 49);
    triangle(eggX - (eggW / 2) + 2, eggY, eggX - (eggW / 5), eggY + (eggH / 6), eggX - 2, eggY);
    triangle(eggX + 2, eggY, eggX + eggW / 5, eggY + (eggH / 6), eggX + (eggW / 2) - 2, eggY);
    stroke(0);
    //strokeWeight(2);
    //fill(0);

  }

}


function mousePressed() {

  if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chicken.y + 40 && mouseY >= chicken.y - 40) {

    //noise of egg being laid plays
    plopSound.setVolume(0.5);
    plopSound.play();
    
    hatchedEgg = 0;

    //the egg appears once
    drawEgg();

    //egg position is initialized
    eggX = chicken.x;
    eggY = chicken.y + 80;

    //there is now an egg on screen
    isEgg = 1;

    //this makes it looks like a tiny jump when you touch the chicken
    chicken.x += 15;

    //chicken makes a startled noise
    chickSoundShort.setVolume(0.5);
    chickSoundShort.play();
  } else if (mouseX <= eggX + 10 && mouseX >= eggX - 10 && mouseY <= eggY + 15 && mouseY >= eggY - 15) {
    hatchedEgg = 1;
    isChickHatched = 1;
    drawTinyChicken();
  }
}


//advances the cute chicken across the screen
function chickenWalking() {
  if (chicken.x == -30) {
    chicken.x = chicken.x + chickenSpeed;
    //chicken.y++;
  } else if (chicken.x > 450 || chicken.y > 300) {
    chicken.x = -30;
    chicken.y = (Math.random() * 200) + 70;
  } else if (chicken.x >= -29) {
    chicken.x = chicken.x + chickenSpeed;
    //chicken.y++;
  }
}


//the cute chicken drawing
function drawChicken() {
  ellipseMode(CENTER);
  strokeWeight(2);

  //chicken hat
  fill(255, 40, 0);
  ellipse(chicken.x + 20, chicken.y - 35, 10, 15);
  arc(chicken.x + 15, chicken.y - 40, 8, 25, 2, 6.5, OPEN);

  //beak
  fill(255, 255, 0);
  arc(chicken.x + 32, chicken.y - 12, 8, 15, 6.3, 2);
  line(chicken.x + 32, chicken.y - 12, chicken.x + 36, chicken.y - 12);

  //chicken body
  fill(255);
  ellipse(chicken.x, chicken.y, 66, 80);
  //arc(mouseX,mouseY,66,80,3.5,3,OPEN);

  //chicken wing
  line(chicken.x, chicken.y, chicken.x - 10, chicken.y - 10);
  line(chicken.x - 10, chicken.y - 10, chicken.x - 10, chicken.y);

  //chicken eye
  fill(0);
  ellipse(chicken.x + 10, chicken.y - 10, 5, 10);

  //middle foot
  line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
  line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);

  //right foot
  line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
  line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);
}

function drawTinyChicken() {

  if (isChickHatched == 1) {

    ellipseMode(CENTER);
    strokeWeight(2);

    //chicken hat
    fill(255, 40, 0);
    ellipse(tinyChicken.x + 3, tinyChicken.y - 8, 8, 15);

    //beak
    fill(255, 255, 0);
    arc(tinyChicken.x + 8, tinyChicken.y - 1, 6, 10, 6.3, 2);
    line(tinyChicken.x + 8, tinyChicken.y - 1, tinyChicken.x + 11, tinyChicken.y - 1);

    //chicken body
    fill(255);
    ellipse(tinyChicken.x, tinyChicken.y, 15, 20);
    //arc(mouseX,mouseY,66,80,3.5,3,OPEN);

    //chicken wing
    line(tinyChicken.x, tinyChicken.y, tinyChicken.x - 3, tinyChicken.y - 3);
    line(tinyChicken.x - 3, tinyChicken.y - 3, tinyChicken.x - 3, tinyChicken.y);

    //chicken eye
    fill(0);
    ellipse(tinyChicken.x + 3, tinyChicken.y - 3, 2, 4);

    //leg
    line(tinyChicken.x, tinyChicken.y + 10, tinyChicken.x, tinyChicken.y + 15);

    //foot
    line(tinyChicken.x, tinyChicken.y + 15, tinyChicken.x + 2, tinyChicken.y + 15)

    //advance chick
    tinyChicken.x = chicken.x - 40;
    tinyChicken.y = chicken.y + 30;
  }
}



//this is a different version of the game
// function layEgg() {

//   if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chickenY + 40 && mouseY >= chickenY - 40) {



//     fill(255);
//     ellipse(chicken.x, chickenY, 20, 30);
//     eggX = chicken.x;
//     eggY = chickenY;
//     isEgg = 1;
//     eggCounter++;

//   }
// }class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.len = random(10, 100);
    this.wid = random(10, 100);
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
  }

  drawSquare() {
    rectMode(CENTER);
    fill(this.r, this.g, this.b);
    noStroke();
    rect(this.x, this.y, this.len, this.wid);
  }
}

var squares = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  drawAllSquares();
}

function drawAllSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].drawSquare();
  }
}

function mousePressed() {
  var square = new Square(mouseX, mouseY);
  squares.push(square);
}var count = 0;
var posY = [];
var faders = 3;
var Red, Green, Blue;
var colour = [];

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  generate(faders);
}

function draw() {
	background(posYMap(25), posYMap(75), posYMap(125));
  
  colorPicker(posYMap(25), posYMap(75), posYMap(125)); //Blair's addition
  for (i = 25; i < faders ; i += 50) {
    Fader(i, 50, 350);
  }
  
}

function colorPicker(r,g,b){
  rect(280,85,110,60);
  textAlign(CENTER);
  textStyle(BOLD);
  text("Color Picker",335,100);
  textStyle(NORMAL);
  text("R: " + Math.round(r),335,112); 
  text("G: " + Math.round(g),335,125);
  text("B: " + Math.round(b),335,138);
}

function Fader(x, y1, y2, colour) {
  strokeWeight(4);
  line(x, y1, x, y2);
  var flagX, flagY;

  if (mouseX > x - 22 && mouseX < x + 22) {
    flagX = true;
  }

  if (mouseY > y1 - 1  && mouseY < y2 + 1) {
    flagY = true;
  }

  if (flagY && flagX && mouseIsPressed) {
    posY[i] = mouseY;
    count = i;
  }

  ellipse(x, posY[i], 40, 40);
  
}

function generate(x){
  	faders = x * 50;
    for (i = 25; i < faders; i += 50) {
    posY[i]=350;
  }
}

function posYMap(i){
  var pos_y = posY[i];
	return map(pos_y, 350, 50, 0, 255);

	}

// function mousePressed(){
// 	if (mouseX)
// }
/*
class slider{
  constructor(x,,,){
    this.x = x;
  }
  slide(){

  }
  
}
*//*
Slide the circle back and forth until the game is over
Object of the game? Slide until the slider disapears
into the background....
The fact that the slider is a slider is a 'red herring' 
of sorts
*/


var slideX;
var fixedSlideY;

//background color
var col = {
  r: 59,
  g: 99,
  b: 122
}

//is equal to 0 if the game is still being played
//is equal to 1 if the game is no longer being played
var isEnd;


function setup() {
  createCanvas(400, 400);
  slideX = random(100, 300); //arbitrary starting point
  fixedSlideY = 200; //line will be centered consistently
  isEnd = 0;
}

function draw() {

  drawSlider(100, 300);
  isItTheEnd();

}


function drawSlider(x, y) {
  background(col.r, col.g, col.b);

  ellipseMode(CENTER);
  strokeWeight(2);
  stroke(255);
  fill(255);

  line(x, 200, y, 200);
  ellipse(slideX, fixedSlideY, 30, 30);

}

function isItTheEnd() {
  if (isEnd == 1) {
    fill(0);
    textSize(40);
    text("THE END", 110, 220);
  }
}


function mouseDragged() {

  if (mouseX <= (slideX + 15) && mouseX >= (slideX - 15) && mouseY <= (fixedSlideY + 15) && mouseY >= (fixedSlideY - 15)) {
    slideX = mouseX;
    col.r += 0.5;
    col.g += 0.5;
    col.b += 0.5;
    if (slideX <= 100) {
      slideX = 100;
    } else if (slideX >= 300) {
      slideX = 300;
    }


  }

  if (col.r >= 255 && col.r >= 255 && col.b >= 255) {
    isEnd = 1;

  }
}function setup() {
  createCanvas(400, 400);
  // frameRate(200);
}

function draw() {
  background(255);
  ellipseMode(CENTER);

  var mouseXdraw = mouseX;
  var mouseYdraw = mouseY;
  
  noStroke();
  
  
  
  
  
  
  
  
  
	
  fill(66, 134, 244,100); 
  
  // var colorR = random(0, 255);
  // var colorG = random(0, 255);
  // var colorB = random(0, 255);


  //x dots --->
  for (let i = 0; i <= width; i += 40) {
    // fill(colorR,colorG,colorB,10);
    
    ellipse(mouseXdraw, i, 30, 30);
		    mouseXdraw += 40;


      for (let j = 0; j <= width; j += 40) {
        ellipse(mouseXdraw-40, j, 30, 30);

    }
  }

	fill(244, 65, 163,100);

  //y dots running down the screen
  for (let i = 0; i <= height; i += 40) {
    ellipse(i, mouseYdraw, 30, 30);

    mouseYdraw += 40;


      for (let j = 0; j <= height; j += 40) {
        ellipse(j, mouseYdraw-40, 30, 30);
    }
  }

}var eggW = 20;
var eggH = 30;

var eggX = 300;
var eggY = 300;

function setup() {
  createCanvas(400, 400);



}

function draw() {
 
  strokeWeight(1);
  fill(255, 215, 0);
  arc(eggX, eggY, eggW, eggH,6.3,3.1,CLOSE);
  line(eggX-(eggW/2),eggY,eggX-eggW/5,eggY+(eggH/6));   
  line(eggX-eggW/5,eggY+(eggH/6),eggX,eggY);
  line(eggX,eggY,eggX+eggW/5,eggY+(eggH/6));
  line(eggX+eggW/5,eggY+(eggH/6),eggX+(eggW/2)-1,eggY);
  noStroke();
  fill(255);
  triangle(eggX-(eggW/2),eggY,eggX-eggW/5,eggY+(eggH/6),eggX,eggY);
  triangle(eggX,eggY,eggX+eggW/5,eggY+(eggH/6),eggX+(eggW/2),eggY);
  stroke();
  strokeWeight(2);
  fill(0);
  

  
//   //reference points
//   point(eggX-(eggW/2),eggY);
  
//   point(eggX-eggW/5,eggY+(eggH/6));
      
//   point(eggX,eggY);
  
//   point(eggX+eggW/5,eggY+(eggH/6));
  
//   point(eggX+(eggW/2),eggY);



//   strokeWeight(4);

//   point(eggX - (ellipseW / 2), eggY-116);

//   point(eggX + (ellipseW/2), eggY);
//   point(eggX - (ellipseW/2), eggY);

//   point(eggX + (ellipseW / 2), eggY-116);
  
//   point(eggX,eggY);


//   strokeWeight(1);
//   noFill();

//   beginShape();
  
//   curveVertex(eggX - (ellipseW / 2), eggY-116);

//   curveVertex(eggX + (ellipseW/2), eggY);
//   curveVertex(eggX - (ellipseW/2), eggY);

//   curveVertex(eggX + (ellipseW / 2), eggY-116);
  
//   endShape();


}var col;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  col = map(mouseX,0,400,0,255);
  //background(col+50,col,col-50);
  fill(col);
  ellipse(mouseX-20,mouseY+20,50,50);
}//keeps track of where the chicken is on the screen
var chicken = {
  x: -30,
  y: (Math.random() * 200) + 70,
}

//keeps the egg in place & onscreen once it has been laid
var eggX;
var eggY;
//DAN DID THIS:
// function egg(){
//   this.x = 0;
//   this.y = 0;
//   this.fall = {
//     this.y++
//   }

//}



// var chickenX;
// var chickenY;

var isEgg; //keeps track of whether or not an egg has been laid



//counts how many eggs the chicken has laid
var eggCounter;

//the speed of the chicken
var chickenSpeed;


function preload() {
  plopSound = loadSound('plop.mp3');
  chickSound = loadSound('chicken.wav');
  chickSoundShort = loadSound('chickenshort.wav');
  grass = loadImage("grass.jpg");

}

function setup() {
  createCanvas(400, 400);

  chickSound.setVolume(0.2);
  chickSound.play();

  chicken.x = -30;
  chicken.y = (Math.random() * 200) + 70;
  isEgg = 0;
  eggCounter = 0;
  chickenSpeed = 10;

}

function draw() {
  frameRate(chickenSpeed);
  background(26, 148, 49);
  //background(grass);


  nest();

  laidEgg();

  //below is another version of the game where you can simply run the mouse over the chicken 
  //layEgg(); 

  drawChicken();

  chickenWalking();



}

function nest() {
  //nest
  fill(170, 107, 51);
  // ellipse(200,360,100,30);
  // point(150, 370);
  ellipseMode(CENTER);

  ellipse(200, 385, 70, 30);


  fill(255, 215, 0);
  ellipse(200, 360, 40, 60);

  //arc(200, 360,40,20,6.2,3);



  fill(0);
  textSize(20);
  textAlign(CENTER);
  text(eggCounter, 200, 365);
}


//drops most recently laid egg down the screen
function laidEgg() {
  if (isEgg == 1) {
    fill(255, 215, 0);
    ellipse(eggX, eggY, 20, 30);
    eggY++;
    //     for(eggY; eggY <=  430; eggY++){

    //     }
  }
  //DAN DID THIS:
  //eggs.add(new Egg());
}





function mousePressed() {

  if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chicken.y + 40 && mouseY >= chicken.y - 40) {

    //noise of egg being laid plays
    plopSound.setVolume(0.5);
    plopSound.play();

    //the egg appears once
    fill(255, 215, 0);
    ellipse(chicken.x, chicken.y + 35, 20, 30);

    //egg position is initialized
    eggX = chicken.x;
    eggY = chicken.y + 35;

    //there is now an egg on screen
    isEgg = 1;

    //egg count increases
    eggCounter++;

    //chicken speeds up
    chickenSpeed = chickenSpeed + 10;

    //this makes it looks like a tiny jump when you touch the chicken
    //chickenX+=15;
    chicken.x += 15;

    //chicken makes a startled noise
    chickSoundShort.setVolume(0.5);
    chickSoundShort.play();
  }

}


//advances the cute chicken across the screen
function chickenWalking() {
  if (chicken.x == -30) {
    chicken.x++;
    //chicken.y++;
  } else if (chicken.x == 450 || chicken.y == 300) {
    chicken.x = -30;
    chicken.y = (Math.random() * 200) + 70;
  } else if (chicken.x >= -29) {
    chicken.x++;
    //chicken.y++;
  }
}


//the cute chicken drawing
function drawChicken() {
  ellipseMode(CENTER);
  strokeWeight(2);

  //chicken hat
  fill(255, 40, 0);
  ellipse(chicken.x + 20, chicken.y - 35, 10, 15);
  arc(chicken.x + 15, chicken.y - 40, 8, 25, 2, 6.5, OPEN);

  //beak
  fill(255, 255, 0);
  arc(chicken.x + 32, chicken.y - 12, 8, 15, 6.3, 2);
  line(chicken.x + 32, chicken.y - 12, chicken.x + 36, chicken.y - 12);

  //chicken body
  fill(255);
  ellipse(chicken.x, chicken.y, 66, 80);
  //arc(mouseX,mouseY,66,80,3.5,3,OPEN);

  //chicken wing
  line(chicken.x, chicken.y, chicken.x - 10, chicken.y - 10);
  line(chicken.x - 10, chicken.y - 10, chicken.x - 10, chicken.y);

  //chicken eye
  fill(0);
  ellipse(chicken.x + 10, chicken.y - 10, 5, 10);

  //middle foot
  line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
  line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);

  //right foot
  line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
  line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);
}




//this is a different version of the game
// function layEgg() {

//   if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chickenY + 40 && mouseY >= chickenY - 40) {



//     fill(255);
//     ellipse(chicken.x, chickenY, 20, 30);
//     eggX = chicken.x;
//     eggY = chickenY;
//     isEgg = 1;
//     eggCounter++;

//   }
// }//keeps track of where the chicken is on the screen
var chicken = {
  x: -30,
  y: (Math.random() * 200) + 70,
}

var tinyChicken = {
  x: chicken.x - 100,
  y: chicken.y + 60,
}

//keeps the egg in place & onscreen once it has been laid
var eggX;
var eggY;

var eggW;
var eggH;

// function egg(){
//   this.x = 0;
//   this.y = 0;
//   this.fall = {
//     this.y++
//   }

//}




var isEgg; //keeps track of whether or not an egg has been laid
var hatchedEgg; //keeps track of hatched or unhatched egg
var isChickHatched;

//counts how many eggs the chicken has laid that have hit the nest
var eggCounter;

//the speed of the chicken
var chickenSpeed;

//where nest appears is dictated by this var
var randomNestPos;

function preload() {
  plopSound = loadSound('plop.mp3');
  chickSound = loadSound('chicken.wav');
  chickSoundShort = loadSound('chickenshort.wav');
  grass = loadImage("grass.jpg");

}

function setup() {
  createCanvas(400, 400);

  chickSound.setVolume(0.2);
  chickSound.play();

  chicken.x = -30;
  chicken.y = (Math.random() * 200) + 70;
  isEgg = 0;
  hatchedEgg = 0;
  isChickHatched = 0;
  eggCounter = 0;
  chickenSpeed = 8;
  randomNestPos = (Math.random() * 200) + 70;

  eggW = 20;
  eggH = 30;

}

function draw() {
  frameRate(chickenSpeed);
  background(26, 148, 49);

  drawTinyChicken();
  laidEgg();
  nest();
  drawChicken();
  chickenWalking();
  checkIfEggHitNest();
}

function nest() {
  //nest
  fill(170, 107, 51);
  // ellipse(200,360,100,30);
  // point(150, 370);
  ellipseMode(CENTER);

  ellipse(randomNestPos, 385, 50, 30); //brown nest


  fill(255, 215, 0);
  ellipse(randomNestPos, 360, 40, 60); //egg in nest

  fill(0);
  strokeWeight(0);
  textSize(20);
  textAlign(CENTER);
  text(eggCounter, randomNestPos, 365);
}

function checkIfEggHitNest() {
  //egg count increases
  if ((eggX < randomNestPos + 25) && (eggX > randomNestPos - 25)) {
    if (eggY > 420) {
      eggCounter++;
      randomNestPos = (Math.random() * 200) + 70;
      chickenSpeed = chickenSpeed + 1;
    }
  }
  //chicken speeds up
}

//drops most recently laid egg down the screen
function laidEgg() {


  //so the egg won't fall infinitely
  if (eggY >= 430) {
    isEgg = 0;
    hatchedEgg = 0;
  }

  //is there an egg at all?
  if (isEgg == 1) {
    //the egg has not been hatched
    if (hatchedEgg == 0) {
      drawEgg();
      eggY = eggY + 8;
    }
    //the egg was hatched
    else if (hatchedEgg == 1) {
      drawEgg();
      eggY = eggY + 8;
    }


  }

}


function drawEgg() {
  if (hatchedEgg == 0) {
    fill(255, 215, 0);
    ellipse(eggX, eggY, eggW, eggH);
  } else if (hatchedEgg == 1) {
    strokeWeight(2);
    fill(255, 215, 0);
    arc(eggX, eggY, eggW, eggH, 6.3, 3.1, CLOSE);
    line(eggX - (eggW / 2), eggY, eggX - eggW / 5, eggY + (eggH / 6));
    line(eggX - eggW / 5, eggY + (eggH / 6), eggX, eggY);
    line(eggX, eggY, eggX + eggW / 5, eggY + (eggH / 6));
    line(eggX + eggW / 5, eggY + (eggH / 6), eggX + (eggW / 2) - 1, eggY);
    noStroke();
    fill(26, 148, 49);
    triangle(eggX - (eggW / 2) + 2, eggY, eggX - (eggW / 5), eggY + (eggH / 6), eggX - 2, eggY);
    triangle(eggX + 2, eggY, eggX + eggW / 5, eggY + (eggH / 6), eggX + (eggW / 2) - 2, eggY);
    stroke(0);
    //strokeWeight(2);
    //fill(0);

  }

}


function mousePressed() {

  if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chicken.y + 40 && mouseY >= chicken.y - 40) {

    //noise of egg being laid plays
    plopSound.setVolume(0.5);
    plopSound.play();
    
    hatchedEgg = 0;

    //the egg appears once
    drawEgg();

    //egg position is initialized
    eggX = chicken.x;
    eggY = chicken.y + 80;

    //there is now an egg on screen
    isEgg = 1;

    //this makes it looks like a tiny jump when you touch the chicken
    chicken.x += 15;

    //chicken makes a startled noise
    chickSoundShort.setVolume(0.5);
    chickSoundShort.play();
  } else if (mouseX <= eggX + 10 && mouseX >= eggX - 10 && mouseY <= eggY + 15 && mouseY >= eggY - 15) {
    hatchedEgg = 1;
    isChickHatched = 1;
    drawTinyChicken();
  }
}


//advances the cute chicken across the screen
function chickenWalking() {
  if (chicken.x == -30) {
    chicken.x = chicken.x + chickenSpeed;
    //chicken.y++;
  } else if (chicken.x > 450 || chicken.y > 300) {
    chicken.x = -30;
    chicken.y = (Math.random() * 200) + 70;
  } else if (chicken.x >= -29) {
    chicken.x = chicken.x + chickenSpeed;
    //chicken.y++;
  }
}


//the cute chicken drawing
function drawChicken() {
  ellipseMode(CENTER);
  strokeWeight(2);

  //chicken hat
  fill(255, 40, 0);
  ellipse(chicken.x + 20, chicken.y - 35, 10, 15);
  arc(chicken.x + 15, chicken.y - 40, 8, 25, 2, 6.5, OPEN);

  //beak
  fill(255, 255, 0);
  arc(chicken.x + 32, chicken.y - 12, 8, 15, 6.3, 2);
  line(chicken.x + 32, chicken.y - 12, chicken.x + 36, chicken.y - 12);

  //chicken body
  fill(255);
  ellipse(chicken.x, chicken.y, 66, 80);
  //arc(mouseX,mouseY,66,80,3.5,3,OPEN);

  //chicken wing
  line(chicken.x, chicken.y, chicken.x - 10, chicken.y - 10);
  line(chicken.x - 10, chicken.y - 10, chicken.x - 10, chicken.y);

  //chicken eye
  fill(0);
  ellipse(chicken.x + 10, chicken.y - 10, 5, 10);

  //middle foot
  line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
  line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);

  //right foot
  line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
  line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);
}

function drawTinyChicken() {

  if (isChickHatched == 1) {

    ellipseMode(CENTER);
    strokeWeight(2);

    //chicken hat
    fill(255, 40, 0);
    ellipse(tinyChicken.x + 3, tinyChicken.y - 8, 8, 15);

    //beak
    fill(255, 255, 0);
    arc(tinyChicken.x + 8, tinyChicken.y - 1, 6, 10, 6.3, 2);
    line(tinyChicken.x + 8, tinyChicken.y - 1, tinyChicken.x + 11, tinyChicken.y - 1);

    //chicken body
    fill(255);
    ellipse(tinyChicken.x, tinyChicken.y, 15, 20);
    //arc(mouseX,mouseY,66,80,3.5,3,OPEN);

    //chicken wing
    line(tinyChicken.x, tinyChicken.y, tinyChicken.x - 3, tinyChicken.y - 3);
    line(tinyChicken.x - 3, tinyChicken.y - 3, tinyChicken.x - 3, tinyChicken.y);

    //chicken eye
    fill(0);
    ellipse(tinyChicken.x + 3, tinyChicken.y - 3, 2, 4);

    //leg
    line(tinyChicken.x, tinyChicken.y + 10, tinyChicken.x, tinyChicken.y + 15);

    //foot
    line(tinyChicken.x, tinyChicken.y + 15, tinyChicken.x + 2, tinyChicken.y + 15)

    //advance chick
    tinyChicken.x = chicken.x - 40;
    tinyChicken.y = chicken.y + 30;
  }
}



//this is a different version of the game
// function layEgg() {

//   if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chickenY + 40 && mouseY >= chickenY - 40) {



//     fill(255);
//     ellipse(chicken.x, chickenY, 20, 30);
//     eggX = chicken.x;
//     eggY = chickenY;
//     isEgg = 1;
//     eggCounter++;

//   }
// }var myColor;

function setup() { 
  createCanvas(400, 400);
  myColor = 0;
} 

function draw() { 
  //frameRate(5);
  //background(220);
  //fill(mouseX,0,0);
  fill(myColor);
  ellipse(mouseX,mouseY,mouseX,mouseY);
  myColor = myColor + 1; 
  if(mouseX == 300){
    myColor = 0;
    }
  
}function setup() {
  createCanvas(400, 400);
  smooth();
}

function draw() {
  background(91, 219, 153);
  noFill();
  stroke(230);
  strokeWeight(1);

  //waist lines
  line(180, 100, 196, 160);
  line(196, 160, 197, 170);
  line(197, 170, 199, 180);
  line(199, 180, 209, 205);
  line(209, 205, 219, 235);

  //top right hip
  arc(202, 289, 50, 150, 5, 6.7);

  //right leg line(i.e. arc)
  arc(203, 320, 50, 150, 5.6, 7.5);

  //left cheek arc
  arc(59, 250, 150, 195, 1, 1.75);

  //right cheek arc
  arc(180, 300, 170, 100, 2, 3.14159);

  //left leg line
  line(106, 325, 108, 370);

  //top line
  line(92, 250, 94, 300);

  //signature
  //letter P
  arc(310, 330, 10, 5, 3.5, 1);
  line(309, 330, 307, 340);
  //letter I
  line(313, 334, 312, 339);
  //letter C
  arc(319, 337.5, 5, 6, 1, 5);
  //letter A
  triangle(323, 340, 324.5, 335, 326, 340);
  //letter S
  arc(331, 336, 6, 3.5, 1, 6);
  arc(331, 339, 6, 3.5, 5.5, 3);
  //letter S
  arc(338, 336, 6, 3.5, 1, 6);
  arc(338, 339, 6, 3.5, 5.5, 3);
  //letter O
  ellipse(346, 337.5, 6, 6);



}