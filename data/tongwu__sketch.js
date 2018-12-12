var contents = "";
var r,g,b;
var x,y;
var bell
var ding
var a,b
 
function setup() {
  createCanvas(600,400);

  x = 50;
  y = 50;

}
 
function draw() {
  background(255);
  textSize(50);
  text(contents, x, y, 400, 600);
    if(textWidth>400){
    y = 100;
  }
 
//   x = x + random(-1, 1);
//   y = y - 1;
 
//   Reset to the bottom
//   if (y < 0) {
//   y = height;
// }
}
 
function myBox(k) {
 var txt = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
 var i = txt.indexOf(k);
 var next;
 
  if (i+1 < txt.length) {
   next = txt[i];
 }
  else {
  next = txt[0];
 }
  return next;
}
 
function keyTyped() {
  contents += myBox(key);
  
}
 
function keyPressed() {
  if (keyCode === ENTER) {
   return;
  }
  if (keyCode === Backspace){
  clear();
  }
}//Google Quick-draw Key: AIzaSyC1_soqtXV1mTyetVpJ4GglGD5RtXuFp4o
//https://quickdrawfiles.appspot.com/drawing/cat?&key=AIzaSyC1_soqtXV1mTyetVpJ4GglGD5RtXuFp4o&isAnimated={isAnimated}&format=JSON
const url1 = 'https://quickdrawfiles.appspot.com/drawing/'
const url2 = '?&key=AIzaSyC1_soqtXV1mTyetVpJ4GglGD5RtXuFp4o&isAnimated=false&format=JSON'

let thingname;
let drawingthing;

let strokeIndex = 0;
let index = 0;
let datadg;
let prevx, prevy;
let url;
let pick;

let input;
let button;

function setup() {
  createCanvas(600, 600);
  //newDraw();
  
  //输入框
  input = createInput();
  input.position(20, 400);
  button = createButton('submit');
  button.position(input.x + 10 + input.width, input.y);
  button.mousePressed(compareName)
}

function compareName() {
  let comparedata = input.value().toLowerCase()
  let cataIndex = datatype.indexOf(comparedata)
  if(cataIndex >= 0) {
    thingname = comparedata;
    newDraw();
  } else {
    findNearest();
  }
}

function findNearest(){
 console.log("sucks tobe you!");
}
// function pickathing() { //艰难选词
//   pick = datatype[floor(random(344))];
//   //console.log(pick[0]);
//   thingname = pick;
// }

function newDraw() {
  //pickathing();
  let url = url1 + thingname + url2;
  console.log(url);
  loadJSON(url, gotDraw);
}

function gotDraw(data) {
  background(250);
  datadg = data.drawing;

  textSize(32);
  text(thingname, 10, 300);

  //console.log(datadg);

}


function draw() {
  if (datadg) {
    let x = datadg[strokeIndex][0][index];
    let y = datadg[strokeIndex][1][index];
    stroke(0);
    strokeWeight(3);
    if (prevx !== undefined) {
      line(prevx, prevy, x, y);
    }
    index++;
    if (index === datadg[strokeIndex][0].length) {
      strokeIndex++;
      prevx = undefined;
      prevy = undefined;
      index = 0;
      if (strokeIndex === datadg.length) {
        //console.log(strokeIndex);
        datadg = undefined;
        strokeIndex = 0;
        //setTimeout(newCat, 250);
      }
    } else {
      prevx = x;
      prevy = y;
    }
  }
}//Google Quick-draw Key: AIzaSyC1_soqtXV1mTyetVpJ4GglGD5RtXuFp4o
//https://quickdrawfiles.appspot.com/drawing/cat?&key=AIzaSyC1_soqtXV1mTyetVpJ4GglGD5RtXuFp4o&isAnimated={isAnimated}&format=JSON
const url1 = 'https://quickdrawfiles.appspot.com/drawing/'
const url2 = '?&key=AIzaSyC1_soqtXV1mTyetVpJ4GglGD5RtXuFp4o&isAnimated=false&format=JSON'

let thingname;
let drawingthing;

let strokeIndex = 0;
let index = 0;
let cat;
let prevx, prevy;
let url; 
let pick;

function setup() {
  createCanvas(600,600);
  newDraw();
}
function pickathing(){ //艰难选词
  pick = datatype[floor(random(344))];
  thingname = JSON.stringify(url1+pick.join()+url2);
  //alert(typeof thingname); 
}
function newDraw() {
  pickathing();
  alert(thingname);
  //alert(typeof thingname);
  //let url = url1+thingname+url2;
  let url = url1+'cat'+url2;
  //console.log(url);
  loadJSON(url, gotDraw);
}

function gotDraw(data) {
  background(250);
  cat = data.drawing;
  //console.log(cat);
  
}


function draw() {
  if (cat) {
    let x = cat[strokeIndex][0][index];
    let y = cat[strokeIndex][1][index];
    stroke(0);
    strokeWeight(3);
    if (prevx !== undefined) {
      line(prevx, prevy, x, y);
    }
    index++;
    if (index === cat[strokeIndex][0].length) {
      strokeIndex++;
      prevx = undefined;
      prevy = undefined;
      index = 0;
      if (strokeIndex === cat.length) {
        //console.log(strokeIndex);
        cat = undefined;
        strokeIndex = 0;
        //setTimeout(newCat, 250);
      }
    } else {
      prevx = x;
      prevy = y;
    }
  }
}


// drawing ttf fonts with opentype.js and p5js commands.
// note that this ONLY works with ttf fonts, which provide
// the shapes of counters (i.e., the hole in 'O') in
// counter-clockwise order. I use this in the code below
// with the beginContour()/endContour() functions in p5js
// to draw the shapes accordingly.

let font;
let fontData;

// groups a list of opentype.js vector commands by contour
function groupByContour(cmds) {
  contours = [];
  current = [];
  for (let cmd of cmds) {
    current.push(cmd);
    if (cmd.type == 'Z') {
      contours.push(current);
      current = [];
    }
  }
  return contours;
}

// determines if a list of commands specify a path in clockwise
// or counter-clockwise order
function clockwise(cmds) {
  let sum = 0;
  for (let i = 0; i < cmds.length - 1; i++) {
    let a = cmds[i];
    let b = cmds[i+1];
    if (!(a.hasOwnProperty('x') && b.hasOwnProperty('x'))) {
      continue;
    }
    sum += (b.x - a.x) * (b.y + a.y);
  }
  return sum < 0;
}

// draws contours grouped by groupByContour(). uses clockwise()
// to determine if this contour should be a p5js shape or a p5js
// contour (i.e., cutout of a shape)
function drawContours(contours) {
  let inShape = false;
  for (let i = 0; i < contours.length; i++) {
    if (clockwise(contours[i])) {
      if (inShape) {
        endShape(CLOSE);
      }
      beginShape();
      inShape = true;
      drawContour(contours[i]);
    }
    else {
      beginContour();
      drawContour(contours[i]);
      endContour();
    }
  }
  if (inShape) {
    endShape(CLOSE);
  }
}

// draws an individual contour
function drawContour(cmds) {
  for (let i = 0; i < cmds.length; i++) {
    cmd = cmds[i];
    switch (cmd.type) {
      case 'M':
      case 'Z':
        break;
      case 'L':
        vertex(cmd.x, cmd.y);
        break;
      case 'C':
        bezierVertex(
          cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        break;
      case 'Q':
        quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        break;
		}    
  }
}

function preload() {
  fontData = loadBytes('Roboto-Black.ttf');
}

let path;

function setup() {
	createCanvas(400, 400);
  font = opentype.parse(fontData.bytes.buffer);
  path = font.getPath("Comptypo", 0, 0, 72);
}

// applies a transformation to the x/y coordinates of each opentypejs
// command you pass to it, according to the callback, which will be
// given the x/y coordinates as parameters and should return an array
// in the form of [x, y]
function commandTransform(cmds, callback) {
  let transformed = [];
	for (let cmd of cmds) {
    let newCmd = {type: cmd.type}
    for (let pair of [['x', 'y'], ['x1', 'y1'], ['x2', 'y2']]) {
      if (cmd.hasOwnProperty(pair[0]) && cmd.hasOwnProperty(pair[1])) {
        let result = callback(cmd[pair[0]], cmd[pair[1]]);
        newCmd[pair[0]] = result[0];
        newCmd[pair[1]] = result[1];
      }
    }
    transformed.push(newCmd);
  }
  return transformed;
}

function draw() {
  background(255);
  fill(40);
  stroke(128);
  push();
  translate(25, 150);
  drawContours(
    groupByContour(
      commandTransform(path.commands, function(x, y) {
        let newX = x + sin((x*0.15) + (frameCount*0.11));
        let newY = y + cos((y*0.35) + (frameCount*0.17));
        return [newX, newY];
      })
    )
  );
  pop();
  
  push();
  translate(25, 250);
  drawContours(
    groupByContour(
      commandTransform(path.commands, function(x, y) {
        let newX, newY;
        newX = x;
        if (y < map(sin(frameCount*0.04), -1, 1, 0, -100)) {
          newY = y - 50;
        }
        else {
          newY = y;
        }
        return [newX, newY];
      })
    )
  );
  pop();
  
  push();
  translate(25, 350);
  drawContours(
    groupByContour(
      commandTransform(path.commands, function(x, y) {
        let newX, newY;
        newY = y;
        newX = x * map(cos(map(x, 0, 550, 0, TWO_PI)), -1, 1, 1,
          map(sin(frameCount*0.07), -1, 1, 0.1, 2));
        return [newX, newY];
      })
    )
  );
  pop();


}//lyrics!
var listen2Me = ["Everybody in the dance club listen to me",
"Everybody at this party better listen to me",
"Everybody having sex stop and listen to me",
"Everybody buying groceries listen to me",
"Everybody at Esalen listen to me",
"Everybody on The Bachelorette listen to me",
"Everybody on this Twitter thread listen to me",
"Everybody at Versace stop and listen to me",
"Everybody in this drum circle listen to me",
"Everybody at the cineplex listen to me",
"Everybody using fleshlights listen to me",
"Everybody reading Pitchfork listen to me",
"Everybody up in Times Square listen to me",
"Everybody buying healthcare listen to me",
"Everybody doing Molly try to listen to me",
"Everybody on my Insta Stories listen to me",
"Everybody at this B of A listen to me",
"Everybody at this CPK listen to me",
"Everybody at this DMV listen to me",
"Everybody that I BCC’d listen to me",
"Everybody at the Phish concert listen to me",
"Everybody watching Riverdale listen to me",
"Everybody at the Dress Barn listen to me",
"Everyone at Knott’s Berry Farm listen to me",
"Everyone in Scientology listen to me",
"Everybody in the Proud Boys listen to me",
"Everybody in my timeline listen to me",
"Everybody at Berghain listen to me",
"Everybody drinking Hennessy listen to me",
"Everybody in the NSA listen to me",
"Everybody with a trust fund listen to me",
"Everybody in this fuck dungeon listen to me",
"Everybody seeing Hamilton listen to me",
"Everybody in the Vatican listen to me",
"Everybody at this Radisson listen to me",
"Everyone on Ashley Madison listen to me",
"Everybody at this golf course listen to me",
"Everybody in this college course listen to me",
"Everybody at this house show listen to me",
"Everyone at the Bellagio listen to me",
"Everybody in the deep state listen to me",
"Everybody on the dark web listen to me",
"Everybody at the Spotted Pig listen to me",
"Everybody in this jury better listen to me",
"Everybody in this household listen to me",
"Everybody in this family listen to me",
"Everybody in the White House listen to me",
"Everybody in America listen to me",
"Everybody on the Internet listen to me",
"Everybody on the Internet listen to me",
"Everybody on the Internet listen to me",
"Everybody on the Internet listen to me",
"Everybody on the Internet listen to me",
"Everybody on the Internet listen to me",
"Everybody on the Internet listen to me",
"Everybody on the Internet listen to me"
]
var myVoice = new p5.Speech();
myVoice.setRate(0.9);
var counter = 0;

//beat!
kickDelay = new Tone.PingPongDelay("4n", 0.2).toMaster();
var kick = new Tone.MembraneSynth().connect(kickDelay).toMaster();
bassDelay = new Tone.PingPongDelay("4t", 0.2).toMaster();
var bass = new Tone.FMSynth().connect(bassDelay).toMaster();

// kick.volume.value = -5;
// bass.volume.value = -5;

var drumLoop = new Tone.Part(function(time, note){
	//the notes given as the second element in the array
	//will be passed in as the second argument
	kick.triggerAttackRelease(note, "8n", time);
}, [[0, "G1"], ["0:1", "C3"], ["0:2:2", "G1"], ["0:3", "C3"]]);
 
var bassLoop = new Tone.Sequence(function(time, note){
	bass.triggerAttackRelease(note, "8n", time);
//straight quater notes
}, ["F1", "F1", "F1", "G1", "A1", "A1", "A1", "G1"], "2n");

drumLoop.start(0);
drumLoop.loop = true;

bassLoop.start(0);
bassLoop.loop = true;


Tone.Transport.bpm.value = 90;
Tone.Transport.start();

 
function setup(){
  createCanvas(windowWidth,windowHeight);
}

function draw(){
  textAlign(CENTER, CENTER);
  
	if (counter == 0) {
  fill(random(127, 255),0,0);
  textSize(18);
  text("'listen2Me' mi@mi, 2018", width/2, height/2)
  }
  
  if (keyIsPressed) {
    background(255);
  	text(listen2Me[counter-1], random(width/4, width*3/4), random(height/4, height*3/4));
    myVoice.speak(listen2Me[counter-1]);

  };

}

function keyPressed(){
	if (counter < listen2Me.length) {
  	counter++;
  } else {
  	counter = 0;
    drumLoop.loop = false;
    bassLoop.loop = false;
  }
}

//TYPE TO PLAY
// function keyPressed() {
//       	switch (keyCode) {
      
//     case 13: //RETURN
//       // synth.triggerAttackRelease(["A3", "A4", "C4", "E5"], "2m");
//       break;
//     case 32: //space bar
//       // kick.triggerAttackRelease("A1", "1n");
//       break;
//     case 8: //backspace
//       // synth.triggerAttackRelease(["D#2", "D#3", "D#4", "D#5"], "1n");
//       break;
//     case 46: //delete
//       // synth.triggerAttackRelease(["D#2", "D#3", "D#4", "D#5"], "1n");
//       break;

//     case 192: //`
//       //   	text(listen2Me[counter-1], width/2, height/2);
//     myVoice.speak(listen2Me[0]);

//       break;
//     case 49: //1
//       // kick.triggerAttackRelease("E3", "1n");
//       break;
//     case 50: //2
//       // kick.triggerAttackRelease("A3", "1n");
//       break;
//     case 51: //3
//       // kick.triggerAttackRelease("C3", "1n");
//       break;
//     case 52: //4
//       // kick.triggerAttackRelease("D3", "1n");
//       break;
//     case 53: //5
//       // kick.triggerAttackRelease("E4", "1n");
//       break;
//     case 54: //6
//       // kick.triggerAttackRelease("G4", "1n");
//       break;
//     case 55: //7
//       // kick.triggerAttackRelease("A4", "1n");
//       break;
//     case 56: //8
//       // kick.triggerAttackRelease("C4", "1n");
//       break;
//     case 57: //9
//       // kick.triggerAttackRelease("D4", "1n");
//       break;
//     case 48: //0
//       // kick.triggerAttackRelease("E5", "1n");
//       break;
//     case 189: //-
//       // synth.triggerAttackRelease(["A3", "C3", "E4", "A4"], "2m");
//       break;
//     case 187: //=
//       // synth.triggerAttackRelease(["A3", "E3", "E4", "A4"], "2m");
//       break;

//     case 219: // [
//       // synth.triggerAttackRelease(["B3", "D3", "F4", "A4", "B4"], "2m");

//       break;
//     case 221: // ]
//       // synth.triggerAttackRelease(["A3", "D3", "F4", "A4", "D4"], "2m");
//       break;
//     case 220: // \
//       // synth.triggerAttackRelease(["F4", "A4", "C4", "F5", "A5"], "2m");
//       break;
//     case 186: //;
//       // synth.triggerAttackRelease(["A3", "A4", "C4", "F4"], "2m");
//       break;
//     case 222: //'
//       // synth.triggerAttackRelease(["C3", "E4", "A4", "C4", "E4", "A5"], "2m");
//       break;
//     case 188: //,
//       // synth.triggerAttackRelease(["F3", "A4", "C4", "F4"], "2m");
//       break;
//     case 190: //.
//       // synth.triggerAttackRelease(["A3", "C3", "E4", "A4", "C4", "E5", "A5"], "2m");
//       break;
//     case 191: // /
//       // synth.triggerAttackRelease(["E2", "A3", "C3", "F4", "A4", "C4", "F4"], "2m");
//       break;

//     case 65: //a
//       // synth.triggerAttackRelease("A1", "1n");
//       break;
//     case 66: //b
//       // synth2.triggerAttackRelease("B2", "1n");
//       break;
//     case 67: //c
//       // synth2.triggerAttackRelease("C1", "1n");
//       break;
//     case 68: //d
//       // synth.triggerAttackRelease("C2", "1n");
//       break;
//     case 69: //e
//       // synth3.triggerAttackRelease("A2", "1n");
//       break;
//     case 70: //f  
//       // synth.triggerAttackRelease("C3", "1n");
//       break;
//     case 71: //g
//       // synth.triggerAttackRelease("G2", "1n");
//       break;
//     case 72: //h
//       // synth.triggerAttackRelease("E1", "1n");
//       break;
//     case 73: //i
//       // synth3.triggerAttackRelease("A3", "1n");
//       break;
//     case 74: //j
//       // synth.triggerAttackRelease("D3", "1n");
//       break;
//     case 75: //k
//       // synth.triggerAttackRelease("B3", "1n");
//       break;
//     case 76: //l
//       // synth.triggerAttackRelease("E2", "1n");
//       break;
//     case 77: //m
//       // synth2.triggerAttackRelease("C4", "1n");
//       break;
//     case 78: //n
//       // synth2.triggerAttackRelease("E3", "1n");
//       break;
//     case 79: //o
//       // synth3.triggerAttackRelease("A4", "1n");
//       break;
//     case 80: //p
//       // synth3.triggerAttackRelease("G3", "1n");
//       break;
//     case 81: //q
//       // synth3.triggerAttackRelease("F3", "1n");
//       break;
//     case 82: //r
//       // synth3.triggerAttackRelease("E4", "1n");
//       break;
//     case 83: //s
//       // synth.triggerAttackRelease("E5", "1n");
//       break;
//     case 84: //t
//       // synth3.triggerAttackRelease("A5", "1n");
//       break;
//     case 85: //u
//       // synth3.triggerAttackRelease("C5", "1n");
//       break;
//     case 86: //v
//       // synth2.triggerAttackRelease("B4", "1n");
//       break;
//     case 87: //w
//       // synth3.triggerAttackRelease("G4", "1n");
//       break;
//     case 88: //x
//       // synth2.triggerAttackRelease("D4", "1n");
//       break;
//     case 89: //y
//       // synth3.triggerAttackRelease("G5", "1n");
//       break;
//     case 90: //z
//       // synth2.triggerAttackRelease("F4", "1n");
//       break;
//     default:
//       break;
//   			}
// }let outputP;
let outputP01;
let outputP02;

function setup() { 
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(24);
  output = createP("Read Carefully the text below, and answer questions.")
  outputP01 = createP(" ");
} 

function draw() { 
}

// function keyPressed() {
//   mousePressed();
// }

function mousePressed() {
  var grammar01 = tracery.createGrammar(grammarSource01);
  grammar01.addModifiers(tracery.baseEngModifiers);
  var output01 = grammar01.flatten("#origin#");
  outputP01.html(output01);
}

// cut and paste your grammar below (as the value for variable "grammarSource")
var grammarSource01 = 
		{
  "origin": "#[name:#common chinese name#][agesmall:#agenumbersmall#][agebig:#agenumberbig#][nurse:#protector#][lion:#monster#][value:#social core value#]story#",

  "story":"<center><h2>Cautionary Tales for Chinese</h2><h4>Designed for the Admonition of Chinese between the ages<br/>of #agesmall# and #agebig# </h4><p></p><h3><i>#name#</i>,</h3><h4>Who ran away from his #nurse#, and was eaten by #lion.a#.</h4><p></p>#intro##second# #third# #fourth# #fifth# #sixth#</center> ",

  "agenumbersmall" :[
    "one", "two","three","four","five","six","seven","eight","nine","ten"
  ],
  "agenumberbig" :[
    "fifty-and-two-days",
    "sixty-five",
    "eighty-eight",
    "forty-nine",
    "fifty-two",
    "sixty-four and two months",
    "one month before eighty",
    "somewhere around seventy",
    "right before death"
  ],

  "common chinese name":[
    "Zhang Wei",
    "Wang Wei",
    "Wang Fang",
    "Li Wei",
    "Wang Xiuying",
    "Li Xiuying",
    "Li Na",
    "Zhang Min",
    "Zhang Zixuan",
    "Li Haoran",
    "Wang Haoran",
    "Chen Haoran",
    "Zhang Jiaxuan",
    "Wang Jiaxuan",
    "Wang Zihan",
    "Li Zihan",
    "Zhang Zihan"
  ],


  "protector":[
    "government jobs",
    "Social insurance fund",
    "family get-together",
    "belief in socialism with Chinese characteristics",
    "house with 50-year real estate loan",
    "duty to get married",
    "duty to have two kids",
    "Alipay account",
    "68-year-old professional square dancer Aunty Lifen" 


  ],
 "monster":[
   "Hollywood movie",
   "Korean soap opera",
   "Japanese anime",
   "LGBT group",
   "DINK couple",
   "K-pop star",
   "McDonald's Mac N Cheese",
   "book about capitalism",
   "Chanel Caviar Quilted Jumbo Double Flap Black bag"


 ],

 "food":[
   "Yi Dian Dian milk tea",
   "HEYTEA milk tea",
   "Chinese spicy crayfish",
   "spicy hot pot",
   "a cat",
   "wifi",
   "free shipping in Alibaba",
   "Weibo",
   "anti-Japan dramas",
   "Wechat red pocket"

 ],

 "social core value": [
   "prosperity and democracy",
   "civility and harmony",
   "freedom and equality",
   "justice and the rule of law",
   "patriotism and dedication",
   "integrity and friendship"
 ],


"intro": ["<p>There was a Boy whose name was #name#,<br/> his friends were very good to him.<br/>They gave him #food#, #food#, and #food#,<br/>and read him stories through and through.<br/>But there it was the dreadful fate befell him, which I now relate.</p>" ],

"second":[
  "<p>You know—at least you ought to know. <br/>For I have often told you so — <br/>That Chinese people never are allowed to leave their #nurse# in a crowd;<br/>Now this was #name#’s especial Foible, <br/>he ran away when he was able,<br/>And on this inauspicious day，<br/>he slipped his hand and ran away!<br/>He hadn’t gone a yard when— <br/>With open Jaws, #lion.a# sprang,<br/>and hungrily began to eat the Boy - beginning at his feet,<br/>Now just imagine how it feels:When first your toes and then your heels,<br/>and then by gradual degrees <br/> your shins and ankles, calves and knees,<br/>are slowly eaten, bit by bit.</p>"
],

"third":["<p>No wonder #name# detested it!<br/>No wonder that he shouted “<b><i>#value#</i></b>” <br/>The #nurse# heard his cry, <br/>almost ran to help the little gentleman.<br/>“<b><i>#value#</i></b>!” <br/>he ordered as he came, <br/>“<b><i>#value#</i></b>!” <br/>he cried, with angry Frown</p>"],

"fourth":["<p>The #lion# made a sudden stop,<br/>He let the dainty morsel drop,<br/> and slunk reluctant to his cage,<br/>snarling with disappointed rage,<br/>But when the #lion# bent him over #name#,<br/>The eyes of #nurse# were dim. </p>"],

"fifth":["<p>The Lion having reached his head.<br/>The Miserable #name# was dead!</p>"],

"sixth":["<p>When #nurse# informed his Parents,<br/> they were more concerned than I can say: <br/>His Mother, as She dried her eyes, said, <br/>“Well—it gives me no surprise,<br/>He would not do as he was told!”<br/>His Father, who was self-controlled,<br/>bade all the children round attend <br/>to #name#'s miserable end, <br/>And always keep a-hold of #nurse#,<br/>for fear of finding something worse.</p>"]






















}
function setup() {
  noCanvas();
  createP("Click to step through the simulation.");
}

function draw() {
  background(220);
}

function keyPressed() {
  mousePressed();
}

function mousePressed() {
  let storyEvents = n.stepAndRender();
  if (storyEvents.length > 0) {
    for (let ev of storyEvents) {
      createP(ev);
    }
  }
}

let n = new seaduck.Narrative({
  "nouns": [
    {
      "name": "Chris",
      "properties": {
        "sleepiness": 0
      },
      "tags": ["person"]
    },
    {
      "name": "king-size bed",
      "properties": {
        "occupied": false
      },
      "tags": ["bed"]
    },
  ],
  "actions": [
    {
      "match": ["Chris"],
      "when": function(a) {
        return a.properties.sleepiness < 10;
      },
      "action": function*(a) {
        a.properties.sleepiness++;
        yield new seaduck.StoryEvent("moreSleepy", a);
      }
    },
    {
      "match": ["Chris"],
      "when": function(a) {
        return a.properties.sleepiness == 7;
      },
      "action": function*(a) {c
        yield new seaduck.StoryEvent("reallySleepy", a);
      }
    },
    {
      "match": ["Chris", "king-size bed"],
      "when": function(a, b) {
        return a.properties.sleepiness >= 10 
          && !this.isRelated("sleepingIn", a, b)
          && !b.properties.occupied;
      },
      "action": function*(a, b) {
        this.relate("sleepingIn", a, b);
        b.properties.occupied = true;
        yield new seaduck.StoryEvent("getsInto", a, b);
      }
    },
    {
      "match": ["Chris", "king-size bed"],
      "when": function(a, b) {
        return this.isRelated("sleepingIn", a, b);
      },
      "action": function*(a, b) {
        yield new seaduck.StoryEvent("asleep", a, b);
      }
    }
  ],
  "traceryDiscourse": {
    "moreSleepy": [
      "#nounA# yawns.",
      "#nounA#'s eyelids droop.",
      "#nounA# nods off for a second, then perks up.",
      "#nounA# says, 'I could use a cup of coffee.'",
      "'I don't think I can stay awake a minute longer,' says #nounA# to no one in particular.",
      "#nounA# checks their watch."
    ],
    "adverb": ["at last", "finally", "not a moment too soon"],
    "getsInto": [
      "#adverb.capitalize#, #nounA# gets into the #nounB#.",
      "#adverb.capitalize#, #nounA# climbs into the #nounB#."
    ],
    "asleep": [
      "#nounA# is asleep in the #nounB#.",
      "#nounA# snores beneath the covers of the #nounB#.",
      "#nounA# sleep-mumbles peacefully in the #nounB#."
    ],
    "reallySleepy": [
      "#nounA# is really sleepy.",
      "'I'm just about ready to hit the hay,' says #nounA#.",
      "You can tell just by looking at them that #nounA# really needs some rest."
    ],
    "_end": [
      "Good night."
    ]
  }
});



function setup() {
  noCanvas();
  createP("Click to step through the simulation.");
}

function draw() {
  background(220);
}

function keyPressed() {
  mousePressed();
}

function mousePressed() {
  let storyEvents = n.stepAndRender();
  if (storyEvents.length > 0) {
    for (let ev of storyEvents) {
      createP(ev);
    }
  }
  window.scrollTo(0,document.body.scrollHeight);
}

let n = new seaduck.Narrative({
  "nouns": [
    {
      "name": "Chris",
      "properties": {
        "sleepiness": 0
      },
      "tags": ["person"]
    },
    {
      "name": "Finn",
      "properties": {
        "sleepiness": 5
      },
      "tags": ["person"]
    },
    {
      "name": "top bunk",
      "properties": {
        "occupied": false
      },
      "tags": ["bed"]
    },
    {
      "name": "bottom bunk",
      "properties": {
        "occupied": false
      },
      "tags": ["bed"]
    }
  ],
  "actions": [
    {
      "match": ["#person"],
      "when": function(a) {
        return a.properties.sleepiness < 10;
      },
      "action": function*(a) {
        a.properties.sleepiness++;
        yield new seaduck.StoryEvent("moreSleepy", a);
      }
    },
    {
      "match": ["#person"],
      "when": function(a) {
        return a.properties.sleepiness == 7;
      },
      "action": function*(a) {
        yield new seaduck.StoryEvent("reallySleepy", a);
      }
    },
    {
      "match": ["#person", "#bed"],
      "when": function(a, b) {
        return a.properties.sleepiness >= 10 
          && !this.relatedByTag("sleepingIn", a, "bed")
          && !b.properties.occupied;
      },
      "action": function*(a, b) {
        this.relate("sleepingIn", a, b);
        b.properties.occupied = true;
        yield new seaduck.StoryEvent("getsInto", a, b);
      }
    },
    {
      "match": ["#person", "#bed"],
      "when": function(a, b) {
        return this.isRelated("sleepingIn", a, b);
      },
      "action": function*(a, b) {
        yield new seaduck.StoryEvent("asleep", a, b);
      }
    }
  ],
  "traceryDiscourse": {
    "moreSleepy": [
      "#nounA# yawns.",
      "#nounA#'s eyelids droop.",
      "#nounA# nods off for a second, then perks up.",
      "#nounA# says, 'I could use a cup of coffee.'",
      "'I don't think I can stay awake a minute longer,' says #nounA# to no one in particular.",
      "#nounA# checks their watch."
    ],
    "adverb": ["at last", "finally", "not a moment too soon"],
    "getsInto": [
      "#adverb.capitalize#, #nounA# gets into the #nounB#.",
      "#adverb.capitalize#, #nounA# climbs into the #nounB#."
    ],
    "asleep": [
      "#nounA# is asleep in the #nounB#.",
      "#nounA# snores beneath the covers of the #nounB#.",
      "#nounA# sleep-mumbles peacefully in the #nounB#."
    ],
    "reallySleepy": [
      "#nounA# is really sleepy.",
      "'I'm just about ready to hit the hay,' says #nounA#.",
      "You can tell just by looking at them that #nounA# really needs some rest."
    ],
    "_end": [
      "Good night."
    ]
  }
});





var d;


var maxWidth = 400;
var lineHeight = 30;
var x = 100;
var y = 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
   background(220);
}


function draw() {


};

function mouseClicked() {
   background(220);
  var slot = document.getElementById('defaultCanvas0');
  var context = slot.getContext('2d');
  context.fillStyle = '#ffffff';
  d = Math.floor(Math.random() * 41);
  list = slogan[d];

  noStroke();
  rect(0, 0, width, height);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(70);

  text(list, width / 2, height / 2);
}





// Serial commands to send data to Arduino
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem641'; // fill in your serial port name here
var options = {
    baudrate: 9600
};

function serialCommands() {
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.open(portName); // open a serial port
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('open', portOpen); // callback for the port opening

}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

var inData;

function serialEvent() {
  var inByte = serial.read();
  // store it in a global variable:
  // inData = inByte;
}

// to check if the serial port is reading properly
// function keyPressed() {
//     console.log("press");
//     serial.write(5);
// }

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}//create a new P5.SpeechRec object
let myRec = new p5.SpeechRec;
//disable continuous recognition so the myRec.onEnd callback function work
myRec.continuous = false;
// allow partial recognition (faster, less accurate)
myRec.interimResults = true;

//create a new P5.Speech object so the computer can talk to you
let myVoice = new p5.Speech();

let capture;


function setup() {
  //create a canvas the size of your window
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();
  //start recognition
  myRec.start();
  //set up recognition callback, what happens when there is a word recognized
  myRec.onResult = parseResult;
  //set up a callback function to keep recognition going
  myRec.onEnd = restartRec;

  //say hello
  myVoice.speak('Hi. Tong can be anyone today. ');
  // myVoice.onEnd = restartVoice;

  background(0, 0, 0);


}

function draw() {

fill(255);
textSize(50);
text('Please say: "Who are you?', width/2, height/6);
}



function parseResult() {

  myVoice.setPitch(random(-2, 1.5));
  myVoice.setRate(random(0.6, 1.5));
  //convert all results to lowercase
  let lowStr = myRec.resultString.toLowerCase();
  // recognition system will often append words into phrases. 
  // so the hack here is to only use the last word:
  let mostrecentword = lowStr.split(' ').pop();

  // identify a few keywords and set up some responses
  // respond with a color by drawing a red rectangle the size of the canvas
  if (mostrecentword.indexOf("who") !== -1  ) {
    myVoice.speak('I\am a');
    
    

    //respond with color and text
  } else if (mostrecentword.indexOf("specific") !== -1) {
    myVoice.speak('I can\'t. It is up to you to decide who I am.');
    fill(0, 0, random(100, 255));
    noStroke();
    rect(0, 0, width, height);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(30);
    text('You made me.', width / 2, height / 2);

    //respond by color and speech
  } else if (mostrecentword.indexOf("inspirational") !== -1) {
    myVoice.speak('I have a whole database of Oprah quotes, but I just don\'t feel like saying any.');
    fill(0, 0, random(100, 255));
    noStroke();
    rect(0, 0, width, height);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(30);
    text('I\'m a system with some personality.', width / 2, height / 2);

    //to stop the voice from repeating
  } else if (mostrecentword.indexOf("stop") !== -1) {
    myVoice.stop();
  } else if (mostrecentword.indexOf("friends") !== -1) {
    myVoice.speak('Fine. What do you want to do?');
    fill(0, 0, random(100, 255));
    noStroke();
    rect(0, 0, width, height);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(30);
    text('Talking to machines is cool isn\'t it?', width / 2, height / 2);

  }

  console.log(mostrecentword);
}

//to make sure recognition restarts when it ends
function restartRec() {
  print("end");
  myRec.start();
}

// function restartVoice() {
// 	  print("end");
// 	  myVoice = new p5.Speech();
// 	}let outputP;
let outputP01;
let outputP02;

function setup() { 
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(24);
  output = createP("Read Carefully the text below, and answer questions.")
  outputP01 = createP(" ");
} 

function draw() { 
}

function keyPressed() {
  mousePressed();
}

function mousePressed() {
  var grammar01 = tracery.createGrammar(grammarSource01);
  grammar01.addModifiers(tracery.baseEngModifiers);
  var output01 = grammar01.flatten("#origin#");
  outputP01.html(output01);
}

// cut and paste your grammar below (as the value for variable "grammarSource")
var grammarSource01 = 
		{
  "origin": "#[name:#common chinese name#][agesmall:#agenumbersmall#][agebig:#agenumberbig#][nurse:#protector#][lion:#monster#][value:#social core value#]story#",

  "story":"<center><h2>Cautionary Tales for Chinese</h2><h4>Designed for the Admonition of Chinese between the ages<br/>of #agesmall# and #agebig# </h4><p></p><h3><i>#name#</i>,</h3><h4>Who ran away from his #nurse#, and was eaten by #lion.a#.</h4><p></p>#intro##second# #third# #fourth# #fifth# #sixth#</center> ",

  "agenumbersmall" :[
    "one", "two","three","four","five","six","seven","eight","nine","ten"
  ],
  "agenumberbig" :[
    "fifty-and-two-days",
    "sixty-five",
    "eighty-eight",
    "forty-nine",
    "fifty-two",
    "sixty-four and two months",
    "one month before eighty",
    "somewhere around seventy",
    "right before death"
  ],

  "common chinese name":[
    "Zhang Wei",
    "Wang Wei",
    "Wang Fang",
    "Li Wei",
    "Wang Xiuying",
    "Li Xiuying",
    "Li Na",
    "Zhang Min",
    "Zhang Zixuan",
    "Li Haoran",
    "Wang Haoran",
    "Chen Haoran",
    "Zhang Jiaxuan",
    "Wang Jiaxuan",
    "Wang Zihan",
    "Li Zihan",
    "Zhang Zihan"
  ],


  "protector":[
    "government jobs",
    "Social insurance fund",
    "family get-together",
    "belief in socialism with Chinese characteristics",
    "real estate loan",
    "duty to get married",
    "duty for two kids"


  ],
 "monster":[
   "Hollywood movie",
   "Korean soap opera",
   "Japanese anime",
   "LGBT group",
   "DINK couple",
   "K-pop star",
   "McDonald's Mac N Cheese",
   "book about capitalism",
   "luxury bag"


 ],

 "food":[
   "Yi Dian Dian milk tea",
   "HEYTEA milk tea",
   "Chinese spicy crayfish",
   "spicy hot pot",
   "a cat",
   "wifi",
   "free shipping in Alibaba",
   "Weibo",
   "anti-Japan dramas",
   "Wechat red pocket"

 ],

 "social core value": [
   "prosperity and democracy",
   "civility and harmony",
   "freedom and equality",
   "justice and the rule of law",
   "patriotism and dedication",
   "integrity and friendship"
 ],


"intro": ["<p>There was a Boy whose name was #name#,<br/> his friends were very good to him.<br/>They gave him #food#, #food#, and #food#,<br/>and read him stories through and through.<br/>But there it was the dreadful fate befell him, which I now relate.</p>" ],

"second":[
  "<p>You know—at least you ought to know. <br/>For I have often told you so — <br/>That Chinese people never are allowed to leave their #nurse# in a crowd;<br/>Now this was #name#’s especial Foible, <br/>he ran away when he was able,<br/>And on this inauspicious day，<br/>he slipped his hand and ran away!<br/>He hadn’t gone a yard when— <br/>With open Jaws, #lion.a# sprang,<br/>and hungrily began to eat the Boy - beginning at his feet,<br/>Now just imagine how it feels:When first your toes and then your heels,<br/>and then by gradual degrees <br/> your shins and ankles, calves and knees,<br/>are slowly eaten, bit by bit.</p>"
],

"third":["<p>No wonder #name# detested it!<br/>No wonder that he shouted “<b><i>#value#</i></b>” <br/>The #nurse# heard his cry, <br/>almost ran to help the little gentleman.<br/>“<b><i>#value#</i></b>!” <br/>he ordered as he came, <br/>“<b><i>#value#</i></b>!” <br/>he cried, with angry Frown</p>"],

"fourth":["<p>The #lion# made a sudden stop,<br/>He let the dainty morsel drop,<br/> and slunk reluctant to his cage,<br/>snarling with disappointed rage,<br/>But when the #lion# bent him over #name#,<br/>The eyes of #nurse# were dim. </p>"],

"fifth":["<p>The Lion having reached his head.<br/>The Miserable #name# was dead!</p>"],

"sixth":["<p>When #nurse# informed his Parents,<br/> they were more concerned than I can say: <br/>His Mother, as She dried her eyes, said, <br/>“Well—it gives me no surprise,<br/>He would not do as he was told!”<br/>His Father, who was self-controlled,<br/>bade all the children round attend <br/>to #name#'s miserable end, <br/>And always keep a-hold of #nurse#,<br/>for fear of finding something worse.</p>"]






















}
// ---
// your mission: change the definition of the myRandom() function
// to return a random number---without using random() or
// Math.random(). The random number should be between 0 and 1.
//
// this function will be called to determine the brightness of
// pixels on the screen (continually displayed in order from
// left to right, top to bottom, several pixels per frame.)
//
// define other variables if you need to.
var seed = 987654;
function myRandom() {
  //console.log("start", seed);
	seed = (seed * seed).toString();
  //console.log("after squaring/string", seed);
  while (seed.length < 10) {
    seed = '0'+seed;
  }
  //console.log("after zero padding", seed);
  seed = seed.substr(2, 6);
  //console.log("after substr", seed);
  seed = parseInt(seed);
  //console.log("after parseint", seed);
  return seed / 1000000;
  console.log(seed);
}

// ---
// try to keep the code below unchanged (unless you have a really
// clever idea).
// ---
var pos = 0;
var step = 8;
var randomCanvas;
function setup() { 
  pixelDensity(1);
  createCanvas(200, 200);
  randomCanvas = createGraphics(40, 40);
  //console.log(myRandom(), ",", myRandom(), ",", myRandom());
} 

function draw() {
  background(0);
  noSmooth();
  randomCanvas.loadPixels();
  for (var i = 0; i < step; i++) {
  	var pxval = myRandom() * 255;
  	for (var j = 0; j < 4; j++) {
    	randomCanvas.pixels[pos+j] = pxval;
  	}
  	pos += 4;
	}

  if (pos > randomCanvas.width * randomCanvas.height * 4) {
    pos = 0;
  }
  randomCanvas.updatePixels();
  scale(5);
  image(randomCanvas, 0, 0);
}

var mean = 0.5;
var std_dev = 1;


// function getNumberInNormalDistribution(mean,std_dev){
//     return mean+(randomNormalDistribution()*std_dev);
// }
function myRandom(mean, std_dev) {
  return mean + (randomNormalDistribution() * std_dev);
}


function randomNormalDistribution() {

  var d = new Date();
  var n = d.getTime();
  n = n.toString();
  n = n.substr(9, 4);

  var t = n % (second() + 1) * 60;
  var ran = map(t, 0, 10000, -1, 1);

  var q = ran * ran / (second() + 1) * 10 - 0.8;
   q = q.toString();
   q = q.substr(4, 4);
   q = (q*q/(second()*hour())%millis())
   q = q.toString();
   q = q.substr(3,3)/10;
  console.log(q);


  var u = 0.0,
    v = 0.0,
    w = 0.0,
    c = 0.0;
  if (w == 0.0 || w >= 1.0) {

    u = q * 2 - 1.0;
    v = q * 2 - 1.0;
    w = u * u + v * v;
  };

  //这里就是 Box-Muller转换
  c = Math.sqrt((-2 * Math.log(w)) / w);

  var something = u * c;
  var other = v * c;
  //uniformly distributed 
  var outputMess = Math.atan(something / other) / (2 * Math.PI) + 0.5;
  return outputMess;

}



// ---
// try to keep the code below unchanged (unless you have a really
// clever idea).
// ---
var pos = 0;
var step = 8;
var randomCanvas;
var mic;

function setup() {
  pixelDensity(1);
  createCanvas(200, 200);
  randomCanvas = createGraphics(40, 40);
}

function draw() {
  background(0);
  noSmooth();
  randomCanvas.loadPixels();
  for (var i = 0; i < step; i++) {
    var pxval = myRandom(mean, std_dev) * 255;
    for (var j = 0; j < 4; j++) {
      randomCanvas.pixels[pos + j] = pxval;
    }
    pos += 4;
  }

  if (pos > randomCanvas.width * randomCanvas.height * 4) {
    pos = 0;
  }
  randomCanvas.updatePixels();
  scale(5);
  image(randomCanvas, 0, 0);

}



//millis()%((i+1) * ts * 10// ---
// your mission: change the definition of the myRandom() function
// to return a random number---without using random() or
// Math.random(). The random number should be between 0 and 1.
//
// this function will be called to determine the brightness of
// pixels on the screen (continually displayed in order from
// left to right, top to bottom, several pixels per frame.)
//
// define other variables if you need to.
var mean = 1;
var std_dev = 0.01;

function myRandom(mean,std_dev) {
  return mean+(randomNormalDistribution()*std_dev);
}
function randomNormalDistribution(){
    var u=0.0, v=0.0, w=0.0, c=0.0;
    if (w ==0.0|| w >=1.0) {
      u = Math.random()*2-1.0;
      v = Math.random()*2-1.0;
      w=u*u+v*v;
    };
    
    //这里就是 Box-Muller转换
    c=Math.sqrt((-2*Math.log(w))/w);

    var something = u*c; 
    var other = v*c; 
    //uniformly distributed 
    var outputMess = Math.atan(something/other)/(2*Math.PI)+0.5;
    return outputMess;

}

// ---
// try to keep the code below unchanged (unless you have a really
// clever idea).
// ---
var pos = 0;
var step = 8;
var randomCanvas;
var mic;
function setup() {
  pixelDensity(1);
  createCanvas(200, 200);
  randomCanvas = createGraphics(40, 40);
} 

function draw() {
  background(0);
  noSmooth();
  randomCanvas.loadPixels();
  for (var i = 0; i < step; i++) {
  	var pxval = myRandom() * 255;
  	for (var j = 0; j < 4; j++) {
    	randomCanvas.pixels[pos+j] = pxval;
  	}
  	pos += 4;
	}

  if (pos > randomCanvas.width * randomCanvas.height * 4) {
    pos = 0;
  }
  randomCanvas.updatePixels();
  scale(5);
  image(randomCanvas, 0, 0);
}

// ---
// your mission: change the definition of the myRandom() function
// to return a random number---without using random() or
// Math.random(). The random number should be between 0 and 1.
//
// this function will be called to determine the brightness of
// pixels on the screen (continually displayed in order from
// left to right, top to bottom, several pixels per frame.)
//
// define other variables if you need to.
var seed = 9385;
function myRandom() {
  //console.log("start", seed);
	seed = (seed * seed).toString();
  //console.log("after squaring/string", seed);
  while (seed.length < 8) {
    seed = '0'+seed;
  }
  console.log("after zero padding ", seed);
  seed = seed.substr(2, 4);
  //console.log("after substr", seed);
  seed = parseInt(seed);
  //console.log("after parseint", seed);
  return seed / 10000;
}

// ---
// try to keep the code below unchanged (unless you have a really
// clever idea).
// ---
var pos = 0;
var step = 8;
var randomCanvas;
function setup() { 
  pixelDensity(1);
  createCanvas(200, 200);
  randomCanvas = createGraphics(40, 40);
  console.log(myRandom(), ",", myRandom(), ",", myRandom());
} 

function draw() {
  background(0);
  noSmooth();
  randomCanvas.loadPixels();
  for (var i = 0; i < step; i++) {
  	var pxval = myRandom() * 255;
  	for (var j = 0; j < 4; j++) {
    	randomCanvas.pixels[pos+j] = pxval;
  	}
  	pos += 4;
	}

  if (pos > randomCanvas.width * randomCanvas.height * 4) {
    pos = 0;
  }
  randomCanvas.updatePixels();
  scale(5);
  image(randomCanvas, 0, 0);
}

let x = 250;
let y = 250;
let nx = 250;
let ny = 250;
let s = 10;

function setup() {
	createCanvas(windowWidth, windowHeight);
	mic = new p5.AudioIn();
	mic.start();
	background(255);
}

function draw() {
	var vol = mic.getLevel();
  var h = map(vol, 0, 1, 0,windowHeight);
	console.log(h);
	
	
	if (h>10) {
		stroke(0, 225 - (s * 20));
		strokeWeight(10 / s);
		curve(x + random(h * 2) - h, y + random(h * 2) - h, x, y, nx, ny, nx + random(h * 2) - h, ny + random(h * 2) - h);
		x = nx;
		y = ny;
		nx = nx + random(s * 4) - s * 2;
		ny = ny + random(s * 4) - s * 2;
		if (dist(x, y, nx, ny) > s / .6) {
			s++;
		} else {
			s--;
		}
		if (s < 1) {
			s = 1;
		}
		if (s > 10) {
			s = 10;
		}
	} else {
		return;
	}
}
var startTime;
var currentTime = 0 ;


function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return min + 'm' + ' ' + nf(sec, 2) + 's';
}


function setup() {
  createCanvas(400,400);
  starTime = millis();
  var params = getURLParams();
  if (params.minute) {
    var min = params.minute;
    currentTime = min * 60;
  }
  var interval =  setInterval(timeIt, 1000);

  var timer = select('#timer');
    timer.html(convertSeconds(currentTime));

  function timeIt() {
    currentTime = floor((millis()/1000));
    timer.html(convertSeconds(currentTime));
  }
}

function draw(){
background(0);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}var components = [];

function setup() {
  createCanvas(300, 600);
  pixelDensity(1);
  //img = loadImage("Bagua.svg");
  //reset the sketch for a new run of divination 
  var button1 = createButton('reset');
  button1.mousePressed(resetSketch);
  //take the sketch and calculate the porpotion of each section, generate a number from 0-8
  var button2 = createButton('divine');
  button2.mousePressed(CalcPic);
  //generate the reading results 
  var button3 = createButton('tell');
  button3.mousePressed(ShowResult);
  //

  background(25, 118, 210);

  //

};

function draw() {
  //内置的长方形框
  strokeWeight(8);
  stroke(29, 64, 139);
  noFill();
  rect(20, 20, 260, 560);
};

//create the button to reset 
function resetSketch() {
  clear();
  background(25, 118, 210);
};
//Let the querent draw the sketch 
function touchMoved() {
  strokeWeight(10);
  stroke(253, 255, 0);
  line(mouseX, mouseY, pmouseX, pmouseY);
  return false;
};

function CalcPic() {
  loadPixels();

  var sumIndex = 0
  var sumSecond = 0
  var sumThird = 0;
  var off;
  
  for (var y = 0; y < height / 3; y++) {
    for (var x = 0; x < width; x++) {
       off = (y * width + x) * 4;
      sumIndex += 0.2126 * pixels[off + 0] + 0.7152 * pixels[off + 1] + 0.0722 * pixels[off + 2];
    }
  };
  for (var y = 0; y < height / 3 * 2 && y >= height / 3; y++) {
    for (var x = 0; x < width; x++) {
      off = (y * width + x) * 4;
      sumSecond = [pixels[off], pixels[off + 1], pixels[off + 2], pixels[off + 3]];
    }
  };
  for (var y = 0; y < height && y >= height / 3 * 2; y++) {
    for (var x = 0; x < width; x++) {
       off = (y * width + x) * 4;
      sumThird= [pixels[off], pixels[off + 1], pixels[off + 2], pixels[off + 3]];
    }
  };
  
  console.log(sumIndex);
  console.log(sumSecond);
  console.log(sumThird);

  updatePixels();

};

function ShowResult() {};var head, body, leftWing, rightWing, wingWidth;
var flap, wingWidthL, wingWidthR;
var turnAngle = 50;
var flightSpeed = 10;
var flightMax = 20;
var test;


function preload() {
  head = loadImage('bird-head.png');
  body = loadImage('bird-body.png');
  leftWing = loadImage('bird-left-wing.png');
  rightWing = loadImage('bird-right-wing.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  flap = 0;

}

function draw() {
  background(0);
  // Calculate turn angle
  turnAngle = atan2(windowHeight / 2, windowWidth / 2) - atan2(mouseY, mouseX - windowHeight / 6);
  flightMax = (windowHeight - mouseY) / 20;
  flightSpeed = ((windowHeight * 3 / 4 - mouseY) / windowHeight) * flightMax;

  // Draw bird
  drawBird(mouseX, mouseY + 140, turnAngle, flightSpeed);
}


function drawBird(x, y, d, s) {
  var birdPosition = [x, y];
  wingWidthL = sin(flap) * 125 + 75;
  wingWidthR = sin(-flap) * 125 + 75;
  flap = flap + s;

  angleMode(DEGREES);
  translate(x, y);
  rotate(d);

  imageMode(CENTER);

  var leftWingP2X = 5;
  var leftWingP2Y = 65;
  var leftWingP1X = leftWingP2X - 250 + wingWidthL;
  var leftWingP1Y = leftWingP2Y - 250;

  var rightWingP1X = 5;
  var rightWingP1Y = -185;
  var rightWingP2X = rightWingP1X + 250 + wingWidthR - 145;
  var rightWingP2Y = rightWingP1Y + 250;

  image(body, 0, 0, 250, 250);
  image(head, 0, -140, 250, 250);

  imageMode(CORNERS);
  image(leftWing, leftWingP1X, leftWingP1Y, leftWingP2X, leftWingP2Y);
  image(rightWing, rightWingP1X, rightWingP1Y, rightWingP2X, rightWingP2Y);

}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}// From http://natureofcode.com/

var particleSystem;

var separationWeight = 1.5;
var cohesionWeight = 0.2;
var alignmentWeight = 1.3;
var maxSpeed = 3.0;
var maxForce = 0.05;

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke('#e4eefd');
    strokeWeight(0.5);

    particleSystem = new ParticleSystem();
    var startPosition = createVector(windowWidth/2, windowHeight/2)

    for (var i = 0; i < 100; i++) {
        particleSystem.addParticle(new Particle(startPosition));
    }
}

function draw() {
    background("black");
    particleSystem.run();
}

var Particle = function(position) {
    this.position = position.copy();
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.r = 10;
}

Particle.prototype.run = function(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.display();
}

Particle.prototype.flock = function(boids) {
    var separation = this.aggregateSeparation(boids);
    var alignment = this.aggregateAlignment(boids);
    var cohesion = this.aggregateCohesion(boids);

    separation.mult(separationWeight);
    alignment.mult(alignmentWeight);
    cohesion.mult(cohesionWeight);

    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
}

Particle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
}

Particle.prototype.borders = function() {
    if (this.position.x < -this.r) this.position.x = windowWidth + this.r;
    if (this.position.y < -this.r) this.position.y = windowHeight + this.r;
    if (this.position.x > windowWidth + this.r) this.position.x = -this.r;
    if (this.position.y > windowHeight + this.r) this.position.y = -this.r;
}

Particle.prototype.display = function() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading() + radians(180));
    beginShape();
    fill(175);
    stroke(255);
    strokeWeight(1);
    vertex(0, 0);
    vertex(16, -6);
    vertex(13, 0);
    vertex(16, 6);
    scale(0.75);
    endShape(CLOSE);
    pop();
}

Particle.prototype.aggregateSeparation = function(boids) {
    var neighbourDistance = 25.0;
    var steer = createVector(0, 0);

    var count = 0.0;
    var numberOfBoids = boids.length;
    var currentPosition = this.position.copy();

    for (var i = 0; i < numberOfBoids; i++) {
        var distance = currentPosition.dist(boids[i].position);
        if (distance > 0 && distance < neighbourDistance) {
            var diff = currentPosition.sub(boids[i].position);
            diff.normalize();
            diff.div(distance);
            steer.add(diff);
            count++;
        }
    }

    if (count > 0) {
        steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(maxSpeed);
      steer.sub(this.velocity);
      steer.limit(maxForce);
    }
    return steer;
}

Particle.prototype.aggregateAlignment = function(boids) {
    var neighbourDistance = 25;
    var sum = new createVector(0, 0);

    var count = 0;
    var numberOfBoids = boids.length;
    var currentPosition = this.position.copy();

    for (var i = 0; i < numberOfBoids; i++) {
        var distance = currentPosition.dist(boids[i].position);
        if (distance > 0 && distance < neighbourDistance) {
            sum.add(boids[i].velocity);
            count++;
        }
    }

    if (count > 0) {
        sum.div(count);
        sum.normalize();
        sum.mult(maxSpeed);
        var steer = sum.sub(this.velocity);
        steer.limit(maxForce);
        return steer;
    }
    return createVector(0,0);
}

Particle.prototype.aggregateCohesion = function(boids) {
    var neighbourDistance = 100;
    var sum = createVector(0, 0);

    var count = 0;
    var numberOfBoids = boids.length;
    var currentPosition = this.position.copy();

    for (var i = 0; i < numberOfBoids; i++) {
        var distance = currentPosition.dist(boids[i].position);
        if (distance > 0 && distance < neighbourDistance) {
            sum.add(boids[i].position);
            count++;
        }
    }

    if (count > 0) {
        sum.div(count);
        return this.seek(sum);
    }
    return createVector(0,0);
}

Particle.prototype.seek = function(target) {
    // A vector pointing from the location to the target
    var desired = target.sub(location);

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(maxSpeed);

    // Steering = Desired minus Velocity
    var steer = desired.sub(this.velocity);
    steer.limit(maxForce);
    return steer;
}

var ParticleSystem = function() {
    this.particles = [];
}

ParticleSystem.prototype.addParticle = function(b) {
    this.particles.push(b);
}

ParticleSystem.prototype.run = function() {
    var numberOfBoids = this.particles.length;
    for (var i = 0; i < numberOfBoids; i++) {
        this.particles[i].run(this.particles);
    }
}
function setup() { 
  createCanvas(windowWidth, windowHeight);
} 

function touchMoved() { 
  //background(220);
  ellipse(mouseX, mouseY,20,20);

  return false;
}var video;
var vScale = 16;
var particle;

function setup() {
  createCanvas(640, 480);

  // Initialize columns and rows
  cols = width / vScale;
  rows = height / vScale;

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
  //video.hide();
  particle = new Particle(320, 240)

}

function draw() {
  background(51);
  video.loadPixels();
  particle.update();
  particle.show();

}var video;
var vScale = 10;
var bright;
var lBright;
var rBright;


function setup() {
  createCanvas(640, 480);
  song1 = loadSound("Music.m4a", loaded);
  song2 = loadSound("Jingle Bell Rock.mp3", loaded)

  // Initialize columns and rows
  cols = width / vScale;
  rows = height / vScale;

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
  video.hide();
}

function draw() {
  background(50);
  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width / 2; x++) {
      var index = (x + y * video.width) * 4;
      //video window 
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      fill(r, g, b);
      rect(x * vScale, y * vScale, vScale, vScale);
      //
      var index2 = (x + y * video.width) * 4;
      //leftHalf
      var r2 = video.pixels[index2 + 0];
      var g2 = video.pixels[index2 + 1];
      var b2 = video.pixels[index2 + 2];
      lBright = (r2 + g2 + b2) / 3;
    }
  }

  for (var j = 0; j < video.height; j++) {
    for (var i = video.width / 2; i < video.width; i++) {
      var index3 = (i + j * video.width) * 4;
      //rightHalf
      var r3 = video.pixels[index3 + 0];
      var g3 = video.pixels[index3 + 1];
      var b3 = video.pixels[index3 + 2];
      fill(r3, g3, b3);
      rect(i * vScale, j * vScale, vScale, vScale);
      rBright = (r3 + g3 + b3) / 3;
    }
  }

  //bright = (r + g + b) / 3;
  //leftvideo
  fill("red");
  noStroke();
  if (lBright > 150) {
    ellipse(width / 4, height / 2, lBright, lBright);
    if ((!song1.isPlaying())) {
      song1.play();

    }
  } else if (lBright <= 140) {
    song1.stop();

  }
  //rightvideo
  fill("green");
  noStroke();
  if (rBright > 150) {
    ellipse(width / 4 * 3, height / 2, rBright, rBright);
    if ((!song2.isPlaying())) {
      song2.play();
    }
  } else if (rBright <= 140) {
    song2.stop();

  }

  //   if (bright > 150) {
  //     ellipse(width / 2, height / 2, bright, bright);
  //     if ((!song.isPlaying())) {
  //       song.play();

  //     }
  //   } else if (bright <= 150) {
  //     song.stop();

  //   }
  console.log(lBright);
  console.log(rBright);
}

function loaded() {
  console.log("loaded");
}var video;
var button;
var snapshots = [];
function setup() {
  createCanvas(600, 400);
background(51);
  video = createCapture(VIDEO);
  video.size(400, 400);
  //video.hide();
  button = createButton("snap");
button.mousePressed (takesnap);
}

function takesnap(){
   snapshots.push(video.get());
}
function draw() {
  //background(50);
  //tint(255, 0, 10);
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;
  for (i=0; i<snapshots.length; i++){
  image(snapshots [i],x,y,w,h);
  x= x+w;
  if x > 400 {
    x=0;
    y=y+h;
  }
  }
  //image(video, 0, 0, mouseX, height);
}
var video;
var button;
var snapshots = [];
function setup() {
  createCanvas(600, 400);
background(51);
  video = createCapture(VIDEO);
  video.size(400, 400);
  //video.hide();
  button = createButton("snap");
  button.mousePressed (takesnap);
}

function takesnap(){
   snapshots.push(video.get());
}
function draw() {
  //background(50);
  //tint(255, 0, 10);
  for (i=0; i<snapshots.length; i++){
  image(snapshots [i],0,0);
  }
  //image(video, 0, 0, mouseX, height);
}let forest;
let area;
let country = "Armenia";

function preload() {
  forest = loadTable("Graph.csv", "csv", "header");
}

function setup() {
  createCanvas(400, 400);
  area = forest.getColumn("Country Name");
  //aruba = forest.getRow("aruba");
  //

  for (var r = 0; r < forest.getRowCount(); r++) {
    let row = forest.getRow(r);
    let name = tr.get("Country Name")
    if (name == country) {
      // Another loop to look at all years
      let val1 = row.get("1990");
      let val2 = row.get("2000")
    }

    //for (var c = 0; c < table.getColumnCount(); c++) {
    //print(table.getString(r, c));
    //}
  }

}

function draw() {
  background(220);
  text(area, 0, 100);
}var Graph;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  Graph = loadTable("Graph.csv", "csv");
 
}

function setup() {
  createCanvas(400,400);

  // print(Graph.getRowCount() + " total rows in table");
  // print(Graph.getColumnCount() + " total columns in table");

  //cycle through the table
  for (var r = 0; r < Graph.getRowCount(); r++)
    for (var c = 0; c < Graph.getColumnCount(); c++) {
      print(Graph.getString(r, c));
    }
}let data;

function preload() {
  data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/materials/gemstones.json');
}

function setup() {
  createCanvas(400, 400);
  background(0);
  createP(data.description);
  createA(data.source, 'source');
  for (let i = 0; i < data.gemstones.length; i++) {
    fill(255);
    textAlign(CENTER);
    text(data.gemstones[i], random(width), random(height));
  }
  console.log(data);
}let img;
let x, y;

function setup() {
  createCanvas(640, 480);
  x = width / 2;
  y = height / 2;
  background(0);
  img = createCapture(VIDEO);
  //img.hide();
}

function draw() {
  //image(img,0,0);

  let col = img.get(x, y);
  col[3] = 100;
  //console.log(col);
  fill(col);
  noStroke();
  ellipse(x, y, 60);

  x += random(-50, 50);
  y += random(-50, 50);
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);



}let img;

// function preload() {
//    img = loadImage('turtle.jpg');
// }
function setup() { 
  createCanvas(600, 400);
  img = createCapture(VIDEO);
   background(0);
}

function draw() {
  //image(img,0,0);
  let col = img.get(mouseX, mouseY);
  fill(col, 100);
  noStroke();
  ellipse(mouseX,mouseY,24);
  
}
// Input from user
let input;

function setup() {
  noCanvas();

  // Grab the input and button from HTML
  input = createInput('computer');
  button = createButton('submit');
  // Attach a callback to button press
  button.mousePressed(search);
}

// Run the API call
function search() {
  let term = input.value();

  // URL for querying the times
  let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?'
          + 'api-key=99cfea65a5bb30650b3d31eb1713233e:15:73386102'
          + '&q=' + term;

  // Query the URL, set a callback
  // 'jsonp' is needed for security
  console.log(url);
  loadJSON(url, gotData,'jasonp');
}

// Request is completed
function gotData(data) {
  console.log(data);
  // Go through and show some results
  docs = data.response.docs;

  // Iterate through the articles in "docs"
  for (let i = 0; i < docs.length; i++) {

    // Make each headline a link to the article
    let headline = createElement('h3', '');
    let link = createA(docs[i].web_url, docs[i].headline.main);
    // Make a <p> for "lead paragraph"
    let par = createP(docs[i].snippet);
  }
}let data; 
function preload() {
  data=loadData('')

}
functiion setup() {
  createCanvas(600, 600);
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';
var xPos = 15;
var yPos = 385;
var circleSize = 30;

let bouncer
let gravity = 0.1;
var balls = [];

function setup() {
  createCanvas(255, 400);
  bouncer = new Ball(xPos, yPos);
  
  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.list();
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  //serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

function draw() {
  background("#004488");
  fill("#233D3B");
  noStroke();
  ellipse(xPos, yPos, circleSize, circleSize);
  background(220);
  for (let i = 0; i < balls.length; i++) {
    balls[i].render();
    balls[i].update();
  }

};

function mousePressed() {
  balls.push(new Ball(mouseX, mouseY));

}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }

}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  var data = serial.read()
  console.log(data);
  r = data;

}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // STEP 1 Instantiate our SerialPort object
  serial = new p5.SerialPort();
  // STEP 2 Set port
  serial.open("/dev/cu.usbmodem1411");

  // STEP 3 Set callback
  serial.onData(gotData);

}

// There is data available to work with from the serial port

//STEP 4 Read the Data in the Callback
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // println the string
  latestData = currentString; // save it for the draw method
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
  background(255, 255, 255);
  fill(0, 0, 0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}/* version 1 bouncing ball
let bouncers = [];

let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  bouncers[0] = new Ball(100, 100);
  bouncers[1] = new Ball(225, 125);

  for (let i = 0; i < 50; i++) {
  bouncers[i] = new Ball (random(width), random(height));
  }
}

function draw() {
  background(220);
  for (let i = 0; i < 50; i++) {
    bouncers[i].render();
    bouncers[i].update();
  }
}

*/
/*
DOM: 
*/
let bouncers = [];
let gravity = 0.1;


function setup() {
  createElement('h1', 'Hell Yeah!');
  //
  createCanvas(400, 400);
  bouncers[0] = new Ball(100, 100);
  bouncers[1] = new Ball(225, 125);

  for (let i = 0; i < 50; i++) {
    bouncers[i] = new Ball(random(width), random(height));
  }
  //
  createElement("br");
  createP(floor(random(100)));
  createButton("submit");
  createP('Hello this is P');

  let button = createButton("Yes");
}

function draw() {
  background(220);
  text ('Hello', 100,100)
  for (let i = 0; i < 50; i++) {
    bouncers[i].render();
    bouncers[i].update();
  }
  
}/*
		Serial input in ASCII example
    Reads a serial input line, terminated by a newline, using serial.readLine()
    
    To be used with the Arduino AnalogReadSerial example 
    (Arduino File Menu -> Examples -> Basics -> AnalogReadSerial)
    created 9 Oct 2017
    by Tom Igoe
*/
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var circleSize = 10; // size of the circle

function setup() {
  createCanvas(320, 240);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
  }
}

function draw() {
  background("#2277A3");			// set the background color
  fill("#55CAFE");						// set the circle fill color
  noStroke();									// don't use a stroke around the circle
  // draw the circle:
  ellipse(width / 2, height / 2, circleSize, circleSize);
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  var data = serial.read();
  console.log(data);
  if (data > 0) {
    circleSize = data;
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}/*
		Serial input in ASCII example
    Reads a serial input line, terminated by a newline, using serial.readLine()
    
    To be used with the Arduino AnalogReadSerial example 
    (Arduino File Menu -> Examples -> Basics -> AnalogReadSerial)
    created 9 Oct 2017
    by Tom Igoe
*/
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var circleSize = 10; // size of the circle

function setup() {
  createCanvas(320, 240);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  //serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
  }
}

function draw() {
  background("#2277A3"); // set the background color
  fill("#55CAFE"); // set the circle fill color
  noStroke(); // don't use a stroke around the circle
  // draw the circle:
  ellipse(width / 2, height / 2, circleSize, circleSize);
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  var data = serial.read();
  console.log(data);
  if (data > 0) {
    circleSize = data;
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}let bouncer;
let gravity = 0.1;
var balls = [];
var count = 0;
var temp = 0;


function setup() {
  createCanvas(600, 400);
  bouncer = new Ball(mouseX, mouseY); //bouncer --> "Instance" 
}



function draw() {
  background(0);
  background(0);
  //center line
  stroke(255, 255, 255);
  line(width / 2, 10, width / 2, height - 10);
  //floating balls
  for (let i = 0; i < balls.length; i++) {
    balls[i].render();
    balls[i].update();
  }
}

function mousePressed() {
  balls.push(new Ball(mouseX, mouseY));
  print(frameCount - temp);
  temp = frameCount;

}let bouncer;
let gravity = 0.1;
var balls = [];
var count = 0;
var temp = 0;
var br = 0.1


function setup() {
  createCanvas(windowWidth, windowHeight);
  bouncer = new Ball(mouseX, mouseY); //bouncer --> "Instance" 
  
}



function draw() {
  background(0);
  background(0);
  stroke(255, 255, 255,80);
  line(width / 2, 10, width / 2, height - 10);

  for (let i = 0; i < balls.length; i++) {
    balls[i].render();
    balls[i].update();
  }
  if (balls.length >15) {
    balls.splice(0,1);//splice
  }
}

function mousePressed() {
  balls.push(new Ball(mouseX, mouseY));
  print(frameCount - temp);
  

}// Bouncing ball -Using [ Class ]  function 

//Elements needed for bouncing ball demonstration
/*
(1) let ball = ...
x=20
y=20.... One time, not good for duplication and flexibility 
(2) function Ball90{

} Called "Construction function" - complicated 

*/

let bouncer
let gravity = 0.1;
var balls = [];


function setup() {
  createCanvas(400, 400);
  bouncer = new Ball(mouseX, mouseY); //bouncer --> "Instance" 
}



function draw() {
  background(220);
  for (let i = 0; i < balls.length; i++) {
    balls[i].render();
    balls[i].update();
  }
}

function mousePressed() {
  balls.push(new Ball(mouseX, mouseY));

}
// function mousePressed {
//   balls.push(
// }



// function draw() {
//   background(220);
//   fill(0);
//   ellipse(x, y, 24, 24);
//   y = y + speed;
//   speed = speed + gravity;
//   if (y > height) {
//     y = height;
//     speed = -0.95 * speed;
//   }
// }let bouncer;
let gravity = 0.1;
var balls = [];


function setup() {

  createCanvas(600, 400);
  bouncer = new Ball(mouseX, mouseY); //bouncer --> "Instance" 
}



function draw() {
  background(0);
  stroke(255, 255, 255);
  line(width / 2, 10, width / 2, height - 10);


  for (let i = 0; i < balls.length; i++) {
    balls[i].render();
    balls[i].update();
  }
}

function mousePressed() {
  balls.push(new Ball(mouseX, mouseY));

}// Bouncing ball -Using [ Class ]  function 

//Elements needed for bouncing ball demonstration
/*
(1) let ball = ...
x=20
y=20.... One time, not good for duplication and flexibility 
(2) function Ball90{

} Called "Construction function" - complicated 

*/
let balls = [];
let bouncer;
let gravity = 0.1;
let r;


function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {


    balls.push(new Ball(10,20));//生成10个,same position 
  }
}



function draw() {
  background(220);
  for (let i = 0; i < 10; i++) {
    balls[i].render();
    balls[i].update();
  }
}


// function draw() {
//   background(220);
//   fill(0);
//   ellipse(x, y, 24, 24);
//   y = y + speed;
//   speed = speed + gravity;
//   if (y > height) {
//     y = height;
//     speed = -0.95 * speed;
//   }
// }let bouncer;
let gravity = 0.1;
var balls = [];
var count=0;
var temp = 0;


function setup() {
  createCanvas(600, 400);
  bouncer = new Ball(mouseX, mouseY); //bouncer --> "Instance" 
}



function draw() {
  background(0);
  background(0);
  stroke(255, 255, 255);
  line(width / 2, 10, width / 2, height - 10);
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].render();
    balls[i].update();
  }
}

function mousePressed() {
  balls.push(new Ball(mouseX, mouseY));
  print(frameCount - temp);
  temp = frameCount;
  if (temp>100){
  color(this.color)}
}



/* 一
// with image or other outside stuff
let cat; //Step 1: use image step
let catR = 1

function preload() { //preload for larger outside files
  cat = loadImage('petmd-cat-happy-13.jpg') //Step 2: load the image 
}

function setup() {
  createCanvas(400, 400);
}



function draw() {
  background(220);
  // imageMode(CENTER);
  // tint("yellow");
  image(cat, mouseX, mouseY, catR, catR); //Step 3: draw the image 
  // catR++;
   
}
*/


/* 二
function setup() {}

function draw() {
  for (let i = 0; i < 10; i++) {
    //something(random(width), b, random(100),random(0,10);
    //or you could play with i number 
  }
}

function something(a, b, c, d){
   

}
*/ 


//三 Class Hand function 
////规范：var variable; class Classname
//(1) 
var hand1 = new Hand();
var hand2 = new Hand();

function draw(){
background(220);
  hand1.move(){};
  hand1.(){}
  hand2.move(){};
}







// Robot 6: Functions from "Getting Started with Processing"
// by Reas & Fry. O'Reilly / Make 2010

function setup() {
  createCanvas(720, 480);
  strokeWeight(2);
  ellipseMode(RADIUS);
}

function draw() {
  background(204);
  ellipse(200, 200, 500, 500);
  drawRobot(120, 420, 110, 140);
  drawRobot(270, 460, 260, 95);
  drawRobot(420, 310, 80, 10);
  drawRobot(570, 390, 180, 40);
}

function drawRobot(x, y, bodyHeight, neckHeight) {

  let radius = 45;
  let ny = y - bodyHeight - neckHeight - radius; // neckHeight Y

  // Neck
  stroke(102);
  line(x + 2, y - bodyHeight, x + 2, ny);
  line(x + 12, y - bodyHeight, x + 12, ny);
  line(x + 22, y - bodyHeight, x + 22, ny);

  // Antennae
  line(x + 12, ny, x - 18, ny - 43);
  line(x + 12, ny, x + 42, ny - 99);
  line(x + 12, ny, x + 78, ny + 15);

  // Body
  noStroke();
  fill(102);
  ellipse(x, y - 33, 33, 33);
  fill(0);
  rect(x - 45, y - bodyHeight, 90, bodyHeight - 33);
  fill(102);
  rect(x - 45, y - bodyHeight + 17, 90, 6);

  // Head
  fill(0);
  ellipse(x + 12, ny, radius, radius);
  fill(255);
  ellipse(x + 24, ny - 6, 14, 14);
  fill(0);
  ellipse(x + 24, ny - 6, 3, 3);
  fill(153);
  ellipse(x, ny - 8, 5, 5);
  ellipse(x + 30, ny - 26, 4, 4);
  ellipse(x + 41, ny + 6, 3, 3);
}//define canvas
var w = 800
var h = 500
// define beginning point of the balllet
var x = w / 5
var y = h / 5

var mouseP = false;

var xspeed = 1
var yspeed = 5
var r = 20
//define brightness
var br
var bright

var count = 0;

function setup() {
  createCanvas(w, h);
}

function draw() {
  background(0);
  stroke(255, 255, 255);
  line(w / 2, 10, w / 2, h - 10);
  
    for(var j = 0; j < count;j++)
    {
  
      if(mouseP)
        {
  	    	push();
  		    translate(40+j*40,40+j*40);
  		    noStroke();
    	    ellipse(x, y, r * 2, r * 2);
			    pop();
        }
    }
  
    //define the circle
  fill(255, 255, 255, br);
  noStroke();
  ellipse(x, y, r * 2, r * 2);
  
  
  x += xspeed;
  if (x >= w / 5 && x <= w / 2) {
    xspeed = xspeed + 0.1;

  } else if (x > w / 5 && x < w / 4 * 5) {
    xspeed = xspeed - 0.1;

  } else if (x > w * 4 / 5 - r || x < w / 5) {
    xspeed = -xspeed;

  }
   //control brightness 
   //bright = 0.5*abs(w/2-x);
   //br = 100 - abs(bright)+30;
   

  br = map(x, w/5, w/2, 10,100);
}


function mousePressed()
{
  mouseP = true;
  count++;
  print(count);
}

    
  
                 
  

  
                 
  
//define canvas
let w = 900
let h = 600
// define beginning point of the balllet
let x = -w/4
let y = -h/4
let xspeed = 0;
let yspeed = 0;
let r = 20

function setup() { 

  createCanvas(w,h);

} 

function draw() { 
  background(0);
  stroke("white");
  line(w/2,10,w/2,h-10);
  
  push();
  //move the beginning point to the middle
  translate (w/2, h/2);
  //define the circle
  fill(117, 117, 117,100);
  noStroke();
  ellipse (x,y,r,r);
  
  x = x + xspeed;
  //xspeed= 0.1* [-abs(x)+w/4]+0.1;
  xspeed = xspeed + 5;

  if (x > width - r || x < r) {
    xspeed = -xspeed;
  }
  if (y > height - r || y < r) {
    yspeed = -yspeed;
  }
  

  pop();
 }     

let canvas = {
x:400,
y:400
};
let hourHandRotate; 
let minuteHandRotate; 
let hourHandColor;
let minuteHandColor;

function setup() { 
  createCanvas(canvas.x, canvas.y);
  colorMode(HSB);
} 

function draw() { 
  push();
	background(frameCount%360,40,70);
	hourHandRotate = map(mouseX,0,canvas.x,0,2*PI);
	minuteHandRotate = map(mouseX,0,canvas.x,0,24*PI);
  hourHandColor = map(mouseY,0,canvas.y,0,360);
  minuteHandColor = 360 - map(mouseY,0,canvas.y,0,360);
	
	translate (canvas.x/2+100, canvas.y/2+100);
	fill("white")	
	ellipse(0,0,200,200);
	
	//hour hand
	rotate(hourHandRotate);
  stroke(hourHandColor,100,100);
	strokeWeight(3);
	line(0,0,0,50);
	
	//minute hand
	rotate(minuteHandRotate-hourHandRotate);
  stroke(minuteHandColor,100,100);
	strokeWeight(1);
	line(0,0,0,75);
	
	pop();
}// 
let y = 0;
let speed = 0;
let bouncing = false; 

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  //bouncing = true;
  bouncing = !bouncing
  // (开关）
  //superlong 
  //if (bouncing == true) {
    //bouncing = false
  //}


}

function draw() {
  background(0);
  fill(255);
  ellipse(200, y, 20, 20);

  if (bouncing) {
    y = y + speed;
    speed = speed + 0.2;

  }
  if (y > height) {
    y = height;
    speed = -0.8 * speed;
    if (abs(speed) < 1) {
      speed = 0;
    }
  }
}let canvas = {
  x: 400,
  y: 400
};
let hourHandRotate;
let minuteHandRotate;
let hourHandColor;
let minuteHandColor;
let word;
let size;
let sizeNumber;
let calendar;
let calendarDate

function setup() {
  createCanvas(canvas.x, canvas.y);
  colorMode(HSB);

}

function draw() {
  background(219, 8, 94);



  //table
  stroke("black");
  strokeWeight(3);
  stroke("black");
  fill(212, 78, 31);
  rect(0, 280, 400, 200);

  //laptop
  strokeWeight(1);
  stroke("silver");
  fill("black");
  rect(65, 123, 259, 180, 5);
  fill(frameCount % 360, 40, 70);
  rect(75, 130, 240, 168);
  //line (323,302,270,400);

  //size = random (30);
  textSize(12);
  word = "  All work and no play makes Jack a dull boy";
  fill(05);
  sizeNumber = random(0, 150);
  text(word, 75, 145 + sizeNumber, 240, 155);



  //calendar

  stroke("black");
  rect(20, 40, 105, 50, 5);
  strokeWeight(5);
  line(10, 60, 135, 60);

  calendarDate = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  calendar = random(calendarDate);
  
  stroke(351, 73, 89);
  strokeWeight(4);
  fill(351, 73, 89);
  textSize(40);
  text(calendar, 30, 80);


  //coffee mug Handle
  p1 = {
    x: 240,
    y: 338
  }, p2 = {
    x: 208,
    y: 338
  }
  p3 = {
    x: 212,
    y: 366
  }, p4 = {
    x: 238,
    y: 353
  }
  noFill();
  stroke(0);
  strokeWeight(5);
  curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
  curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
  curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y)
  //coffee mug
  stroke("black");
  strokeWeight(5);
  fill(44, 62, 100);
  rect(230, 320, 55, 40, 0, 0, 15, 15);
  fill(30, 96, 36);
  ellipse(260, 340, 15, 20);


  //Duck-begin
  stroke("black");
  strokeWeight(7);
  fill("white");
  //body
  bezier(153, 286, 201, 212, 284, 319, 169, 330);
  //cheek
  bezier(10, 422, -112, 174, 278, 126, 181, 422);

  //Duck-end


  //hand
  bezier(167, 358, 249, 338, 231, 361, 173, 383);
  fill("black");
  ellipse(155, 255, 5, 5);

  //Clock
  push();

  hourHandRotate = map(mouseX, 0, canvas.x, 0, 2 * PI);
  minuteHandRotate = map(mouseX, 0, canvas.x, 0, 24 * PI);
  hourHandColor = map(mouseY, 0, canvas.y, 0, 360);
  minuteHandColor = 360 - map(mouseY, 0, canvas.y, 0, 360);

  translate(canvas.x / 2 + 70, canvas.y / 2 - 140);
  fill("white")
  ellipse(0, 0, 100, 100);

  //hour hand
  rotate(hourHandRotate);
  stroke(hourHandColor, 100, 100);
  strokeWeight(3);
  line(0, 0, 0, -30);

  //minute hand
  rotate(minuteHandRotate - hourHandRotate);
  stroke(minuteHandColor, 100, 100);
  strokeWeight(1);
  line(0, 0, 0, -40);
  pop();
  
}  let r ;
  let g ;
  let b ;

  let squareX = 0;

function setup() { 
  createCanvas(400, 400);
  background(220);
  //createSlider();
  //createButton();
  

} 

function draw() { 
   if (squareX > 200) {
      let x = random(100,width);
      let y = random (height);
     fill (r,g,b);
      ellipse(x,y,16,16);
   
   }
   
 
  
}

function mousePressed() {
  background(220);
  r = random(255);
  g = random(255);
  b = random(255); 
}

//thoughts: how to make sure every click generate one different kind of color? 

let canvas = {
  x: 400,
  y: 400
};
let hourHandRotate;
let minuteHandRotate;
let hourHandColor;
let minuteHandColor;
let word;
let size;
let sizeNumber = 0;
let calendar = "MON";
let calendarDate;

function setup() {
  createCanvas(canvas.x, canvas.y);
  colorMode(HSB);

}

function draw() {
  background(219, 8, 94);



  //table
  stroke("black");
  strokeWeight(3);
  stroke("black");
  fill(212, 78, 31);
  rect(0, 280, 400, 200);

  //laptop
  strokeWeight(1);
  stroke("silver");
  fill("black");
  rect(65, 123, 259, 180, 5);
  fill(frameCount%360, 40, 70);
  rect(75, 130, 240, 168);
  //line (323,302,270,400);

  //size = random (30);
  textSize(12);
  word = "  All work and no play makes Jack a dull boy";
  fill(05);
  if (frameCount%20==0) {
  sizeNumber = random(0, 150)
  };
  text(word, 75, 145 + sizeNumber, 240, 155);



  //calendar

  stroke("black");
  rect(20, 40, 105, 50, 5);
  strokeWeight(5);
  line(10, 60, 135, 60);
  
  calendarDate = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  if (frameCount % 30 ==0) {
    calendar = random(calendarDate);  
  };
  
  stroke(351, 73, 89);
  strokeWeight(4);
  fill(351, 73, 89);
  textSize(40);
  text(calendar, 30, 80);


  //coffee mug Handle
  p1 = {
    x: 240,
    y: 338
  }, p2 = {
    x: 208,
    y: 338
  }
  p3 = {
    x: 212,
    y: 366
  }, p4 = {
    x: 238,
    y: 353
  }
  noFill();
  stroke(0);
  strokeWeight(5);
  curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
  curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
  curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y)
  //coffee mug
  stroke("black");
  strokeWeight(5);
  fill(44, 62, 100);
  rect(230, 320, 55, 40, 0, 0, 15, 15);
  fill(30, 96, 36);
  ellipse(260, 340, 15, 20);


  //Duck-begin
  stroke("black");
  strokeWeight(7);
  fill("white");
  //body
  bezier(153, 286, 201, 212, 284, 319, 169, 330);
  //cheek
  bezier(10, 422, -112, 174, 278, 126, 181, 422);

  //Duck-end


  //hand
  bezier(167, 358, 249, 338, 231, 361, 173, 383);
  fill("black");
  ellipse(155, 255, 5, 5);

  //Clock
  push();

  hourHandRotate = map(mouseX, 0, canvas.x, 0, 2 * PI);
  minuteHandRotate = map(mouseX, 0, canvas.x, 0, 24 * PI);
  hourHandColor = map(mouseY, 0, canvas.y, 0, 360);
  minuteHandColor = 360 - map(mouseY, 0, canvas.y, 0, 360);

  translate(canvas.x / 2 + 70, canvas.y / 2 - 140);
  fill("white")
  ellipse(0, 0, 100, 100);

  //hour hand
  rotate(hourHandRotate);
  stroke(hourHandColor, 100, 100);
  strokeWeight(3);
  line(0, 0, 0, -30);

  //minute hand
  rotate(minuteHandRotate - hourHandRotate);
  stroke(minuteHandColor, 100, 100);
  strokeWeight(1);
  line(0, 0, 0, -40);

  pop();

} let canvas = {
x:400,
y:400
};
let hourHandRotate; 
let minuteHandRotate; 
let hourHandColor;
let minuteHandColor;

function setup() { 
  createCanvas(canvas.x, canvas.y);
  colorMode(HSB);
} 

function draw() { 
  push();
	background(frameCount%360,40,70);
	hourHandRotate = map(mouseX,0,canvas.x,0,2*PI);
	minuteHandRotate = map(mouseX,0,canvas.x,0,24*PI);
  hourHandColor = map(mouseY,0,canvas.y,0,360);
  minuteHandColor = 360 - map(mouseY,0,canvas.y,0,360);
	
	translate (canvas.x/2, canvas.y/2);
	fill("white")	
	ellipse(0,0,200,200);
	
	//hour hand
	rotate(hourHandRotate);
  stroke(hourHandColor,100,100);
	strokeWeight(3);
	line(0,0,0,-50);
	
	//minute hand
	rotate(minuteHandRotate-hourHandRotate);
  stroke(minuteHandColor,100,100);
	strokeWeight(1);
	line(0,0,0,-75);
	
	pop();
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}let canvas = {
x:400,
y:400
};
let hourHandRotate; 
let minuteHandRotate; 
let hourHandColor;
let minuteHandColor;

function setup() { 
  createCanvas(canvas.x, canvas.y);
  colorMode(HSB);
} 

function draw() { 
  push();
	background(frameCount%360,40,70);
	hourHandRotate = map(mouseX,0,canvas.x,0,2*PI);
	minuteHandRotate = map(mouseX,0,canvas.x,0,24*PI);
  hourHandColor = map(mouseY,0,canvas.y,0,360);
  minuteHandColor = 360 - map(mouseY,0,canvas.y,0,360);
	
	translate (canvas.x/2, canvas.y/2);
	fill("white")	
	ellipse(0,0,200,200);
	
	//hour hand
	rotate(hourHandRotate);
  stroke(hourHandColor,100,100);
	strokeWeight(3);
	line(0,0,0,-50);
	
	//minute hand
	rotate(minuteHandRotate-hourHandRotate);
  stroke(minuteHandColor,100,100);
	strokeWeight(1);
	line(0,0,0,-75);
	
	pop();
}let canvas = {
x:400,
y:400
};
let hourHandRotate; 
let minuteHandRotate; 
let hourHandColor;
let minuteHandColor;
let minuteCount =0; 

function setup() { 
  createCanvas(canvas.x, canvas.y);
  colorMode(HSB);
} 

function draw() { 
  minuteCount = minuteCount +0.2;
  push();
	background(frameCount%360,40,70);
	hourHandRotate = map(mouseX,0,canvas.x,0,2*PI);
	minuteHandRotate = map(mouseX,0,canvas.x,0,24*PI);
  hourHandColor = map(mouseY,0,canvas.y,0,360);
  minuteHandColor = 360 - map(mouseY,0,canvas.y,0,360);
	
	translate (canvas.x/2, canvas.y/2);
	fill("white")	
	ellipse(0,0,200,200);
	
	//hour hand
	rotate(hourHandRotate);
  stroke(hourHandColor,100,100);
	strokeWeight(3);
	line(0,0,0,-50);
	
	//minute hand
	rotate(minuteCount);
  stroke(minuteHandColor,100,100);
	strokeWeight(1);
	line(0,0,0,-75);
	
	pop();
}let canvas = {
x:400,
y:400
};
let hourHandRotate; 
let minuteHandRotate; 
let hourHandColor;
let minuteHandColor;

function setup() { 
  createCanvas(canvas.x, canvas.y);
	background(20);
  colorMode(HSB);
} 

function draw() { 
  push();
	
	hourHandRotate = map(mouseX,0,canvas.x,0,2*PI);
	minuteHandRotate = map(mouseX,0,canvas.x,0,24*PI);
  hourHandColor = map(mouseY,0,canvas.y,0,360);
  minuteHandColor = 360 - map(mouseY,0,canvas.y,0,360);
	
	translate (canvas.x/2, canvas.y/2);
	fill("yellow")	
	ellipse(0,0,200,200);
	
	//hour hand
	rotate(hourHandRotate);
  stroke(hourHandColor,100,100);
	strokeWeight(3);
	line(0,0,0,-50);
	
	//minute hand
	rotate(minuteHandRotate-hourHandRotate);
  stroke(minuteHandColor,100,100);
	strokeWeight(1);
	line(0,0,0,-75);
	
	pop();
}function setup() { 
  createCanvas(500, 500);

  background(120, 177, 163);
  strokeWeight(10);  // Beastly
  fill (147, 81, 22);
  
  //ear left
  arc(250, 150, 50, 50, 2,6.5, HALF_PI);
   //left-arm
strokeWeight(10)
  fill(147, 81, 22);   
 triangle(210, 350, 230, 350, 230, 295);   
  //body
  rect(230, 245, 150, 155, 60,60,20,20);
  //right-arm
   line(340,370,340,300);   
  //head
  ellipse(300, 215, 170, 140);
  //ear right
  arc(350, 150, 50, 50, 3,8, HALF_PI);
    
    //glasses-left
  fill(0);
  rect(300,200,40,25,10);
    //glasses-right
  rect(230,200,40,25,10);
  
    //glasses-connection
  line(300,210,270,210);
  line(220,195,230,210);
  line(340,210,370,190); 
  
 
  //mouth   
    
  strokeWeight(2);
  stroke(0);
  fill(255);
  rect(277,240,30,10,20); 
  rect(277,248,30,10,20);
    

    

  //Curve for face
    strokeWeight(5);
//p1 = {x: 455, y: 236}, p2 = {x: 340, y: 240};
//p3 = {x: 320, y: 270}, p4 = {x: 415, y: 365};
//noFill();
//stroke(255, 102, 0);
//curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
//stroke(0);
//curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
//stroke(255, 102, 0);
//curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y)
    
    
//Sun
    strokeWeight(10);
    fill(231,87,87);
    ellipse(0,0,400,400);
    line (10,220,40,340);
    line (100,220,160,290);
    line (250,30,450,100);
    
//sea 
    
    


//bar
fill(249,221,198);    
rect (-10,350,480,350,30);  
    
//drink 
    
  
  
  
  
  
}  function setup() { 
  createCanvas(500, 500);

  background(120, 177, 163);
  strokeWeight(10);  // Beastly
  fill (147, 81, 22);
  
  //ear left
  arc(250, 150, 50, 50, 2,6.5, HALF_PI);
   //left-arm
strokeWeight(10)
  fill(147, 81, 22);   
 triangle(210, 350, 230, 350, 230, 295);   
  //body
  rect(230, 245, 150, 155, 60,60,20,20);
  //right-arm
   line(340,370,340,300);   
  //head
  ellipse(300, 215, 170, 140);
  //ear right
  arc(350, 150, 50, 50, 3,8, HALF_PI);
    
    //glasses-left
  fill(0);
  rect(300,200,40,25,10);
    //glasses-right
  rect(230,200,40,25,10);
  
    //glasses-connection
  line(300,210,270,210);
  line(220,195,230,210);
  line(340,210,370,190); 
  
 
  //mouth   
    
  strokeWeight(2);
  stroke(0);
  fill(0);
  rect(277,240,30,10,20); 
  rect(277,248,30,10,20);
    

    

  //Curve for face
    strokeWeight(5);
//p1 = {x: 455, y: 236}, p2 = {x: 340, y: 240};
//p3 = {x: 320, y: 270}, p4 = {x: 415, y: 365};
//noFill();
//stroke(255, 102, 0);
//curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
//stroke(0);
//curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
//stroke(255, 102, 0);
//curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y)
    
    
//Sun
    strokeWeight(10);
    fill(231,87,87);
    ellipse(0,0,400,400);
    line (10,220,40,340);
    line (100,220,160,290);
    line (250,30,450,100);
    
//sea 
    
    


//bar
fill(249,221,198);    
rect (-10,350,480,350,30);  
    
//drink 
    
  
  
  
  
  
}  function setup() { 
  createCanvas(500, 500);

  background(120, 177, 163);
  strokeWeight(10);  // Beastly
  fill (147, 81, 22);

  //ear left
  arc(250, 150, 50, 50, 2,6.5, HALF_PI);
  //body
  rect(230, 245, 150, 155, 60,60,20,20);
  //head
  ellipse(300, 215, 170, 140);
  //ear right
  arc(350, 150, 50, 50, 3,8, HALF_PI);
  //glasses-left
  fill(0);
  rect(300,200,40,25,10);
  //glasses-right
  rect(230,200,40,25,10);
  //glasses-connection
  line(300,210,270,210);
    
  strokeWeight(2);
    stroke(0);
  fill(255);
  rect(277,240,30,10,20); 
  rect(277,248,30,10,20);
    

  //Curve for face
    strokeWeight(5);
 p1 = {x: 455, y: 236}, p2 = {x: 340, y: 240};
p3 = {x: 320, y: 270}, p4 = {x: 415, y: 365};
noFill();
//stroke(255, 102, 0);
//curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
stroke(0);
curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
//stroke(255, 102, 0);
//curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y)
    
    
//Sun
    strokeWeight(10);
    fill(231,87,87);
    ellipse(0,0,400,400);
    line (10,220,40,340);
    line(40,210,120,34\0);
    
 //arm-part 1   

p1 = {x: 234, y: 280}, p2 = {x: 200, y: 330};
p3 = {x: 180, y: 350}, p4 = {x: 180, y: 360};  
noFill();
stroke(0);
curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
stroke(0);
curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
stroke(0);
curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y)

//arm-part 2
    
p1 = {x: 180, y: 360}, p2 = {x: 185, y: 365};
p3 = {x: 220, y: 330}, p4 = {x: 230, y: 310};  
noFill();
stroke(0);
curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
stroke(0);
curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
stroke(0);
curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y)    

//bar
fill(249,221,198);    
rect (0,350,500,350);  
  
  
  
  
  
}  function setup() { 
  createCanvas(500, 500);
} 

function draw() { 
  background(217, 136, 128);
  arc(250, 150, 50, 50, 2,6, HALF_PI);
  
  rect(230, 270, 150, 155, 60,60,20,20);
  
  ellipse(300, 215, 170, 145);
  arc(350, 150, 50, 50, 3,8, HALF_PI);
  rect(300,200,40,25,10);
  rect(230,200,40,25,10);
  line(300,210,270,210);
  rect(200, 215, 30, 20,10);


  
  
  
  
}