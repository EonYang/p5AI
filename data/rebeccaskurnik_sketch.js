var count = 0;
var state = false;
var value = 10;
var gif2;
function setup() {
createCanvas(900,900);
gif2 = createVideo(['gif2.gif']);
}
function draw(){
noStroke();
fill('yellow');
rect(0,50.2,value,50);
fill('mediumpurple'); 
rect(0,0,value,50);
fill('pink');
rect(0,100.4,value,50);
fill('lightgreen'); 
rect(0,150.6,value,50);
fill('lightblue'); 
rect(0,200.8,value,50);
fill('mediumpurple'); 
rect(0,251,value,40);
fill('yellow');
rect(50.2,0,50,value);
fill('mediumpurple'); 
rect(0,0,50,value);
fill('pink');
rect(100,0,50,value);
fill('lightgreen'); 
rect(150,0,50,value);
fill('lightblue');
rect(200,0,50,value);
fill('mediumpurple'); 
rect(250,0,40,value);
fill('yellow');
rect(300,50.2,-value,50);
fill('mediumpurple');
rect(300,0,-value,50); 
fill('pink');
rect(300,100.4,-value,50);
fill('lightgreen'); 
rect(300,150.6,-value,50);
fill('lightblue');
rect(300,200.8,-value,50);
fill('mediumpurple'); 
rect(300,251,-value,49);
fill('yellow'); 
rect(50.2,300,50,-value);
fill('mediumpurple'); 
rect(0,300,50,-value);
fill('pink');
rect(100,300,50,-value);
fill('lightgreen'); 
rect(150,300,50,-value);
fill('lightblue');
rect(200,300,50,-value);
fill('mediumpurple'); 
rect(250,300,40,-value);
fill('gold');
rect(310,50.2,value,50);
fill('orchid'); 
rect(310,0,value,50);
fill('lightsalmon');
rect(310,100.4,value,50);
fill('palegreen'); 
rect(310,150.6,value,50);
rect(310,200.8,value,50);
fill('orchid'); 
rect(310,251,value,49);
fill('gold');
rect(360.2,300,50,-value);
fill('orchid');
rect(310,300,50,-value);
fill('lightsalmon');
rect(410,300,50,-value);
fill('palegreen'); 
rect(460,300,50,-value);
fill('aquamarine');
rect(510,300,50,-value);
rect(560,300,50,-value);
fill('gold');
rect(610,50.2,-value,50);
fill('orchid');
rect(610,0,-value,50);
fill('lightsalmon');
rect(610,100.4,-value,50);
fill('palegreen'); 
rect(610,150.6,-value,50);
fill('aquamarine');
rect(610,200.8,-value,50);
fill('orchid'); 
rect(610,251,-value,49);
fill('gold'); 
rect(360.2,0,50,value);
rect(310,0,50, value);
fill('lightsalmon');
rect(410,0,50,value);
fill('palegreen'); 
rect(460,0,50,value);
fill('aquamarine');
rect(510,0,50,value);
fill('orchid'); 
rect(560,0,50,value);
}
function keyTyped() {
if (key === 'a') {
value++;
} else if (key === 'b') {
value--;
} else if (key === 'r'){
background(random(255), random(255), random(255));
}
}
var img;
var peopleSlider;
var speedSlider;
var button;
var buttonXPos;
var feet =[];
var linearSound;
function preload() {
img = loadImage('feet.png');
linearSound = loadSound('linear.ogg');
randomSound = loadSound('fart.wav');
}
function setup() {
createCanvas(windowWidth, windowHeight);
buttonXPos = width - width/1.2;
controls();
buttonRandom.mouseClicked(randomDance);
buttonLinear.mouseClicked(linearDance);
buttonSalsa.mouseClicked(salsaDance);
buttonBreakdance.mouseClicked(breakDance);
}
function draw() {
text('Number of People',width - width/1.5, height - 100);
text('Speed',width - width/1.5, height - 150);
}
function keyTyped() {
if (key === 'r') {
linearSound.stop();
randomDance();
randomSound.play();
randomSound.loop();
} else if (key === 'l') {
randomSound.stop();
linearDance();
linearSound.play();
linearSound.loop();
}
}
function controls(){
peopleSlider = createSlider(2, 14, 6, 1);
peopleSlider.position(width - width/2, height - 100);
peopleSlider.style('width', '250px');
speedSlider = createSlider(1, 10, 4, 1);
speedSlider.position(width - width/2, height - 150);
speedSlider.style('width', '250px');
linearSound.rate(speedSlider.value());
randomSound.rate(speedSlider.value());
buttonRandom = createButton('RANDOM');
buttonRandom.position(buttonXPos + 300, height - 50);
buttonRandom.style('background-color', '#F6483A');
buttonRandom.size(100,50);
buttonLinear = createButton('LINEAR');
buttonLinear.position(buttonXPos + 200, height - 50);
buttonLinear.style('background-color', '#F6483A');
buttonLinear.size(100,50);
buttonSalsa = createButton('SALSA');
buttonSalsa.position(buttonXPos, height - 50);
buttonSalsa.style('background-color', '#F6483A');
buttonSalsa.size(100,50);
buttonBreakdance = createButton('BREAK DANCE');
buttonBreakdance.position(buttonXPos + 100, height - 50);
buttonBreakdance.style('background-color', '#F6483A');
buttonBreakdance.size(100,50);
}
function randomDance(){
feet = [];
clear();
for (var i = 0; i < peopleSlider.value() ; i++){
var x = random(width);
var y = random(height - 250);
var foot = new Feet(x, y);
feet.push(foot);
}
for (var j=0; j<feet.length; j++){
feet[j].display();
feet[j].randomDance();
}
}
function linearDance(){
feet =[];
clear();
for (var i = 0; i < peopleSlider.value() ; i++){
var x = 1.2*i * width/4;
var y = (height - 290)/2;
var foot = new Feet(x, y);
feet.push(foot);
}
for (var j=0; j<feet.length; j++){
feet[j].display();
feet[j].linearDance();
}
}
function salsaDance(){
feet =[];
clear();
for (var i = 0; i < peopleSlider.value() ; i++){
var x = this.x;
var y = this.y; 
var foot = new Feet(x, y);
feet.push(foot);
}
for (var j=0; j<feet.length; j++){
feet[j].display();
feet[j].salsaDance();
}
}
function breakDance(){
feet =[];
clear();
slice = 360 * type / numberOfElements;
for (var i = 0; i < feet.length ; i++){ 
var $self = $(this),
rotate = slice * i + start,
rotateReverse = rotate * -1;
$self.css({
'transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)'
});
}
}
var img;
function preload() {
img = loadImage('feet.png');
}
function setup() {
createCanvas(400, 400);
image(img, 0, 0);
}
function draw() {
background(220);
}var attackLevel = 1.0;
var releaseLevel = 0;
var attackTime = 0.001;
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;
var env, triOsc, player;
var x = 0;
var y= 0;
var sounds = [];
var f = 220;
function setup() {
var cnv = createCanvas(512, 512);
env = new p5.Envelope();
env.setADSR(attackTime, decayTime, susPercent, releaseTime);
env.setRange(attackLevel, releaseLevel);
triOsc = new p5.Oscillator('triangle');
triOsc.amp(env);
triOsc.start();
triOsc.freq(f);
player = new Player(width/2, height);
for (var i = 0; i<5; i++){
var x = random(width);
var y = 0;
var col = col;
var sound = new Sounds(x, y);
sounds.push(sound);
f = f * i;
}
}
function draw() {  
if (keyIsDown(LEFT_ARROW)) {
player.x -= 5;
}
if (keyIsDown(RIGHT_ARROW)) {
player.x += 5;
}
if (keyIsDown(UP_ARROW)) {
player.y -= 5;
}
if (keyIsDown(DOWN_ARROW)) {
player.y += 5;
}
clear();
player.display();
for (var i = 0; i<sounds.length; i++){
sounds[i].display();
sounds[i].update();
if (sounds[i].x > width) {
sounds[i].x = random(width);
sounds[i].y = 0;
}
if (sounds[i].y > height) {
sounds[i].x = random(width);
sounds[i].y = 0;
sounds[i].col = color(0, random(255), random(255));
}
var d = dist(sounds[i].x, sounds[i].y, player.x, player.y);
if (d < (player.r + sounds[i].r)){
sounds[i].changeColor();
env.play();
}
}
}
function setup() {
createCanvas(1080, 1000);
}
function draw() {
clear();
noFill();
var x = 6;
var diameter = 25;
noStroke();
fill (252, 20, 202);
ellipse(85 * x, 12 * x,diameter);
fill (255, 63, 114);
ellipse(70 * x, 14 * x, diameter);
fill (249, 24, 47);
ellipse(58 * x, 21 * x, diameter);
fill (255, 83, 35);
ellipse(52 * x, 32 * x, diameter);
fill (255, 235, 56);
ellipse(48 * x, 44 * x, diameter);
fill (144, 255, 71);
ellipse(46 * x, 57 * x, diameter);
fill (0, 229, 152);
ellipse(42 * x, 69 * x, diameter);
fill (0, 255, 242);
ellipse(36 * x, 79 * x, diameter);
fill (59, 152, 247);
ellipse(25 * x, 85 * x, diameter);
fill (186, 76, 255);
ellipse(12 * x, 83 * x, diameter);
save('canvas.png');
noLoop();
}
function setup() {
createCanvas(1080, 1000);
}
function draw() {
clear();
noFill();
var x = 6;
var diameter = 25;
noStroke();
fill (252, 20, 202);
ellipse(85 * x, 12 * x,diameter);
fill (255, 63, 114);
ellipse(70 * x, 14 * x, diameter);
fill (249, 24, 47);
ellipse(58 * x, 21 * x, diameter);
fill (255, 83, 35);
ellipse(52 * x, 32 * x, diameter);
fill (255, 235, 56);
ellipse(48 * x, 44 * x, diameter);
fill (144, 255, 71);
ellipse(46 * x, 57 * x, diameter);
fill (0, 229, 152);
ellipse(42 * x, 69 * x, diameter);
fill (0, 255, 242);
ellipse(36 * x, 79 * x, diameter);
fill (59, 152, 247);
ellipse(25 * x, 85 * x, diameter);
fill (186, 76, 255);
ellipse(12 * x, 83 * x, diameter);
save('canvas.png');
noLoop();
}
var mic;
function setup() {
createCanvas(710, 200);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(200);
var vol = mic.getLevel();
fill(127);
stroke(0);                                                      
var h = map(vol, 0, 1, height, 0);
ellipse(width/2, h - 25, 50, 50);
text("incoming value: " + inData, 30, 30);
}
inData = inByte;
}
}
let outputP;
function setup() { 
noCanvas();
background(255);
textAlign(LEFT, TOP);
textSize(24);
outputP = createP("Click to generate: Fifty Shades of Grey");
} 
function draw() { 
}
function keyPressed() {
mousePressed();
}
function mousePressed() {
var grammar = tracery.createGrammar(grammarSource);
grammar.addModifiers(tracery.baseEngModifiers);
var output = grammar.flatten("#origin#");
outputP.html(output);
}
var grammarSource = {
"origin": ["#[names: #name#]story#"],
"story": ["Once upon a time there was a 21-year-old college senior named #names#. She had #hair# hair, #eyes# eyes, and looked pretty #personality#. She had a love for books, and was quite #personality2#, innocent, and naïve. Her best friend, Kate wrote for the #publishing#. Because she was #feeling#, Kate was unable to interview 27-year-old Christian Grey, #Christian.a# and wealthy Seattle #profession#. She asked #names# if she could take her place. #names# agreed, and when she went to interview Christian, she found him very #Christian# as well as intimidating. As a result, she was nervous and #action# throughout the interview and left Christian's office believing it went #went#. #names# did not expect to meet Christian again, but he appeared at the #store#. While he was there, #names# informed Christian that Kate would like some #photos# of himself to illustrate her article about him. Christian then #gave# #names# his phone number. Later, Kate urged #names# to call Christian and arrange a photo shoot with their photographer friend, José. The next day José, Kate, and #names# came for Christian's photo shoot. Christian asked #names# out for coffee, and if she is dating anyone, specifically José. #names# replied that she was not dating anyone. During the conversation, #names# learned that Christian is also single, but he said that he is not romantic. #names# was intrigued but believed she was not attractive or #ana# for Christian. Later, #names# received a package from Christian containing first edition copies of #book#, which stunned her and made her #happy#. Later that night, #names# went out drinking with her friends and ended up drunk dialling Christian, who informed her that he will be coming to pick her up because of her #inebriated# state. #names# went outside to get some fresh air, and José attempted to #kiss# her, but he is stopped by Christian's arrival and jealousy. #names# left with Christian. Later, #names# woke up to find herself in Christian's hotel room, where he scolded her for not taking proper care of herself. Christian then reveals that he would like to have #sex# with her. He initially said that #names# would first have to fill out paperwork, but later went back on this statement after making out with her in the #elevator#. #names# felt weird about the paperwork situation. #names# went on a date with Christian, and he took her in his #helicopter# to his apartment. Once there, Christian insisted that she sign a non-disclosure agreement forbidding her from discussing anything #sexy# they do together, which #names# was confused about but agreed to sign. He also mentioned other paperwork, but first took her to his playroom full of #BDSM# toys and gear. There, Christian informed her that the second contract will be one of dominance and submission, and there will be no romantic relationship, only a #sexual# one. The contract even forbade #names# from touching Christian or making eye contact with him. #names# was not happy about this but was really starting to #fancy# Christian. At this point, Christian realized that #names# was a virgin and took her virginity without making her sign the contract. The following morning, she and Christian had #vanilla# sex again. His #mother# arrived moments after their sexual encounter and was surprised by the meeting, having previously thought Christian was homosexual, because he was never seen with a woman. Christian later took #names# out to eat, and he revealed that he lost his virginity at age 15 to one of his mother's friends, Elena, and that his previous dominant/submissive relationships failed due to #incompatibility#. Christian also revealed that in his first dominant/submissive relationship he was the #submissive#. Christian and #names# planned to meet again, and he took her home, where she discovered several job offers and admitted to Kate that she and Christian had #sex#. Over the next few days, #names# received several packages from Christian including a laptop to enable her to research the #different# lifestyle in consideration of the contract and to communicate with him, and to receive a more detailed version of the dominant/submissive contract. She and Christian then emailed each other, and #names# teased him refusing to honor parts of the contract, such as only #foods# from a specific list. #names# later met with Christian to discuss the contract and became #overwhelmed# by the potential BDSM arrangement and the potential of having a #sexual# relationship with Christian without being romantic in nature. Because of these feelings, #names# ran away from Christian and did not see him again until her college graduation, where he was the guest #speaker#. During this time, #names# agreed to sign the dominant/submissive contract. #names# and Christian once again met to further discuss the contract, and they went over #names#'s #hard# limits. Christian spanked #names# for the first time, and the experience left her both enticed and slightly #confused#. This feeling was exacerbated by Christian's lavish gifts and the fact that he brought her to meet his #family#. The two continued with the arrangement without #names#'s having yet signed the contract. After successfully landing a job with Seattle Independent Publishing (SIP), #names# further bristled under the restrictions of the non-disclosure agreement and her #complex# relationship with Christian. The tension between #names# and Christian eventually came to a head after #names# asked Christian to punish her in order to show her how #extreme# a BDSM relationship with him could be. Christian fulfiled #names#'s request, and beat her with #belt.a#. #names# gets upset and realized that they are #incompatible#. Devastated, she broke up with Christian and returned to her apartment. "],
"name" : ["Anastasia 'Ana' Steele", "Candice 'Candy' Copper", "Destiny'Desi' Gold", "Tiffany 'Tiff' Silver"],
"hair" : ["black", "brown", "orange", "green", "blue", "blonde"],
"eyes" :["blue", "brown", "grey", "black", "green"],
"personality": ["plain", "mediocre", "boring"],
"personality2":["nerdy", "geeky", "well-versed", "articulate", "boring","dull", "🤓","🧠"],
"publishing": ["newspaper", "sex-collumn", "alumni dating website", "sugar-Daddy list"],
"feeling" :["sick", "stuffing her face", "riding a horse", "banging a cop", "watering her plants"],
"Christian": ["successful", "sexy", "dominant", "charming", "kinky","sexist", "attractive", "bourgee", "yummy","delicious", "tasty"],
"profession":["pop-star singer", "zoologist", "baker", "entrepreneur", "salesman", "carpenter", "seamless delivery guy", "doctor", "lawyer"],
"action":["stumbled", "spat", "sang", "swayed", "ate", "threw-up", "danced","clapped"],
"went":["poorly", "💩", "smoothly", "perfectly", "horribly","passionately"],
"store": ["store where she worked", "class she was in", "burger joint she was eating lunch at", "African parade she was attending that day", "train station she was at", "gym she was at"],
"photos":["headshots", "nudes", "portraits", "photos", "sexy-pictures"],
"gave":["gave", "slipped", "whispered to", "announced to", "handed"],  
"ana" :["good enough", "sexy enough", "rough enough", "loose enough","curvy enough", "experienced enough", "funny enough", "tasty enough"],
"book" :["Tess of the d'Urbervilles", "50 Shades of Grey", "Pretty Little Liars", "Gossip Girl", "Sex and the city", "The Death of a Salesman", "Cinderella", "Goosebumps"],
"happy":["happy", "angry","cry", "sing", "dance", "horny", "hungry", "laugh"],
"inebriated" :["inebriated", "naughty", "excited", "hangry", "vulnerable", "loose"],
"kiss":["woo", "kiss", "eat", "hump", "touch", "straddle"],
"sex" :["sex", "babies", "dinner", "special time", "soda"],
"elevator" :["elevator", "pool", "sink", "garbage room", "laundry room", "gym", "lobby", "conference room", "janitor's closet"],
"helicopter" :[ "helicopter", "pajamas", "steam boat", "punch buggie", "rocket ship", "motorcycle", "submarine", "pickup-truck"],
"sexy":["sexy", "naughty", "fun", "dirty", "dangerous", "funny", "illegal", "political", "philosophical"],
"BDSM":["BDSM", "kid", "cute", "colorful", "horny", "baby", "plastic", "wooden", "sporty"],
"sexual" :["sexual", "scary", "fun", "terrifying", "funny"],
"fancy" :["fancy", "love", "admire", "yearn for", "cut herself for"],
"vanilla" :["vanilla", "boring", "plain-old", "fresh", "fine"],
"mother":["mother", "ex", "roommate", "butler", "friend", "boyfriend", "sister", "lover"],
"incompatibility":["incompatibility", "his craziness", "his small dick", "her smelly vagina", "old age", "his stomach problems", "the age gap"],
"submissive":["submissive", "pussy", "woman", "push-over"],
"different":["different", "BDSM", "sexual-sadist", "push-over", "exhausting", "fun", "terrifying"],
"foods":[" eating foods", "eating 🥑", "having sex", "swimming in pools", "riding horses"],
"overwhelmed":["overwhelmed", "aroused", "hungry", "frustrated", "bored", "fed-up"],
"speaker":["speaker", "performer", "dancer", "tinder rep"],
"hard":["hard and soft", "tickle", "alcohol", "weight", "bathroom"],
"confused":["confused", "pissed off", "aroused", "annoyed", "worried", "bruised"],
"family":["family", "important people","dogs", "imaginary friends", "exclusive doctors", "mother", "ex", "neighbors"],
"complex":["complex", "delusional", "dysfunctional", "romantic", "sexy", "fun", "awesome", "exciting", "boring"],
"extreme":["extreme", "bad", "fun", "entertaining", "terrible", "loving", "special", "cool"],
"belt":["belt", "baseball bat", "robot", "bag of potato chips", "pogo stick", "🐔", "fluffy pillow", "cotton ball", "shoe"],
"incompatible":["incompatible", "fucked-up", "doomed", "not normal", "embarrassing", "too much", "weird", "exhausted"], 
};var mp3;
var sliderR;
var sliderG;
var sliderB;
function preload() {
img = loadImage("SpongeBob_RockPants.png");
mp3 = loadSound("ARPEGGIO-ChanchinArpSteady.mp3");
}
function setup() {
createCanvas(400, 400, WEBGL);
noStroke();
sliderR = createSlider(0,255,0);
sliderR.position(10, height-60);
sliderR.size(width-40, 20);
sliderG = createSlider(0,255,0);
sliderG.position(10, height-40);
sliderG.size(width-40, 20);
sliderB = createSlider(0,255,0);
sliderB.position(10, height-20);
sliderB.size(width-40, 20);
sliderScale = createSlider(1,5,1);
sliderScale.position(10, 20);
sliderScale.size(width-40, 20);
mp3.loop();
}
function draw() {
background(sliderR.value(),sliderG.value(),sliderB.value());
scale(sliderScale.value());
spinCube();
drawCircle(width/2, 280, 6);
fill(0,0);
texture(img);
plane(90, 90);
}
function drawCircle(x, radius, level) {                    
var tt = 126 * level/4.0;
fill(tt, random(255));
translate(-20, -20, 0);
ellipse(x, height/2, radius*2, radius*2);      
if(level > 1) {
level = level - 1;
drawCircle(x - radius/2, radius/2, level);
drawCircle(x + radius/2, radius/2, level);
}
}
function spinCube() {
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.01);
box(50, 50, 50);
}
var state = 0;
var count = 0;
var cart = [];
var angle = 0;
function setup() {
createElement("h1", "Ferris Wheel Operator");
createCanvas(600, 400);
angleMode(DEGREES);
cart = new Cart();
}
function draw() {
background(120, 200, 255);
push();
noStroke();
fill(50, 200, 50);
rect(0, 270, width, 200);
pop();
push();
noFill();
ellipse(300, 150, 250, 250);
ellipse(300, 150, 200, 200);
line(300, 160, 370, 330);
line(300, 160, 240, 330);
translate(300, 150);
rotate(angle); 
let count = 0;
for (var degs = 0; degs < 360; degs += 45) {
push();
rotate(degs);
line(115, 0, 0, 0);
cart.show();
pop();
}
pop();
if (state) {
angle = angle - 1;
} else {
angle = angle + 1;
}
fill(200, 100, 200);
ellipse(300, 150, 30, 30);
stroke(200, 100, 200);
rect(210, 330, 190, 5);
}
function mousePressed() {
if (dist(mouseX, mouseY, 300, 150) < 20/2) {
state = !state;
count++;
}
}var ppl = [];
var count = 0;
var cart = [];
var dy = 0;
var angle = 0;
var state = false;
function setup() {
createElement("h1", "Carnival of Doom");
createCanvas(600, 400);
angleMode(DEGREES);
cart = new Cart();
for (var i = 0; i < 8; i++) {
ppl[i] = new People();
}
}
function draw() {
background(120, 200, 255);
push();
noStroke();
fill(50, 200, 50);
rect(0, 270, width, 200);
pop();
push();
noFill();
ellipse(300, 150, 250, 250);
ellipse(300, 150, 200, 200);
line(300, 160, 370, 330);
line(300, 160, 240, 330);
translate(300, 150);
rotate(angle); 
let count = 0;
for (var degs = 0; degs < 360; degs += 45) {
push();
rotate(degs);
line(115, 0, 0, 0);
cart.show();
pop();
push();
ppl[count].show(degs, dy);
pop();
}
pop();
if (state) {
angle = angle - 1;
} else {
angle = angle + 1;
}
fill(200, 100, 200);
ellipse(300, 150, 30, 30);
stroke(200, 100, 200);
rect(210, 330, 190, 5);
}
function mousePressed() {
if (dist(mouseX, mouseY, 300, 150) < 20/2) {
state = !state;
count++;
if (count >=8){
ppl[0].fall();
}
}
var nameInput;
var nameP;
function setup() {
nameInput = createInput();
nameInput.changed(updateText);
}
function updateText() {
nameP.html(nameInput.value());
}
var sensorVal = [],
letter = "";
function draw() {
fill(255);
assignLetter();
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
if(inString !== 'hello') {
sensorVal = sensors;
}
}
}
function keyPressed() {
}
function assignLetter() {
alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
"M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
"Y", "Z"];
for (i = 0; i < sensorVal.length; i++) {
if (int(sensorVal[i]) > 50) {
letter = alpha[i];    }
}
}function setup() {
createCanvas(800, 800, WEBGL);
}
function draw() {
background(255);
rotateX(frameCount * 0.01);
for (var j = 0; j < 70; j++) {
push();
for (var i = 0; i < 60; i++) {
translate(cos(frameCount * 0.002 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
rotateZ(frameCount * 0.002);
push();
fill(20, 193, 209);
sphere(10, 2, 5);
pop();
}
pop();
}
var potentiometer;
var fsr;
function setup() {
}
function gotOpen() {
}
if (inString.length > 0) {
var d = split(inString, ',');
potentiometer = Number(d[0]);
fsr = Number(d[1]);
var mapped = map(potentiometer, 0, 1023, 0, 255);
var integer = nfc(mapped,0,0);
changeColor(fsr);
}
}
}
var inData;
var potentiometer;
function setup() {
}
function gotOpen() {
}
if (inString.length > 0) {
var d = split(inString, ',');
potentiometer = Number(d[0]);
var mapped = map(potentiometer, 0, 1023, 0, 255);
var integer = nfc(mapped,0,0);
}
}
}
let mySound;
let amp;
let img;
function preload() {
soundFormats('mp3', 'ogg');
mySound = loadSound('Trippy Audio .mp3');
img = loadImage('lips2.png');
}
function setup() {
createCanvas(600, 600, WEBGL);
mySound.setVolume(0.1);
mySound.loop();
amp = new p5.Amplitude();
amp.setInput(mySound);
}
function draw() { 
background(255);
var rms = amp.getLevel();
fill(0, 0, 255);
stroke(0);
ellipse(80, 30, 10+rms*200, 10+rms*200);
ellipse(-80, 30, 10+rms*200, 10+rms*200);
fill(0);
translate(90, 0, 0);
push();
rotateZ(frameCount * 0.01);
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.01);
torus(60, 20);
pop();
translate(-180, 0, 0);
push();
rotateZ(frameCount * 0.01);
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.01);
torus(60, 20);
pop();
fill(100, 230, 100);
translate(80, 200, 20);
fill(0,0);
texture(img);
plane(90, 90);
var locY = (mouseY / height - 0.5) * (-2);
var locX = (mouseX / width - 0.5) * 2;
ambientLight(100, 80, 80);
pointLight(200, 200, 200, locX, locY, 0);
rotateX(frameCount * 0.01);
rotateZ(frameCount * 0.01);
cylinder(200, 200);
}
let canv;
let mySound;
let amp;
let img;
function preload() {
soundFormats('mp3', 'ogg');
mySound = loadSound('Trippy Audio .mp3');
img = loadImage('lips2.png');
}
function setup() {
canv = createCanvas(600, 600, WEBGL);
mySound.setVolume(0.1);
mySound.loop();
amp = new p5.Amplitude();
amp.setInput(mySound);
}
function draw() { 
background(255);
var rms = amp.getLevel();
fill(0, 0, 255);
stroke(0);
ellipse(80, 30, 10+rms*200, 10+rms*200);
ellipse(-80, 30, 10+rms*200, 10+rms*200);
fill(0);
translate(90, 0, 0);
push();
rotateZ(frameCount * 0.01);
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.01);
torus(60, 20);
pop();
translate(-180, 0, 0);
push();
rotateZ(frameCount * 0.01);
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.01);
torus(60, 20);
pop();
fill(100, 230, 100);
translate(80, 200, 20);
fill(0,0);
texture(img);
plane(90, 90);
var locY = (mouseY / height - 0.5) * (-2);
var locX = (mouseX / width - 0.5) * 2;
ambientLight(100, 80, 80);
pointLight(200, 200, 200, locX, locY, 0);
rotateX(frameCount * 0.01);
rotateZ(frameCount * 0.01);
cylinder(200, 200);
}
var menu;
var input;
var venue;
var datalat;
var datalng;
var tmap;
var inputCity;
var submit;
var parsed;
var rest = "&t=This+Weekend";
var apiKey = "&app_key=wtSp78kNzVMKXdjz";
function setup() {   
var menu = select('#menu');77u33w
var button = select('#submit');
button.mousePressed(callData);
button.mousePressed(displayConcerts); 
button.mousePressed(addToMap);  
input = select('#inputCity');
} 
function callData(){
var url = api + input.value() + rest + apiKey
loadJSON( url, callback, 'jsonp');
}
function displayConcerts(){
}
function draw() { 
}
function initMap() {
tmap = new google.maps.Map(document.getElementById('map'), {
zoom: 4,
center: {lat: 79, lng: 100}
});
}
function addToMap() {
var uluru = {lat: datalat, lng: datalng};
var marker = new google.maps.Marker({
position: new google.maps.LatLng(uluru),
map: tmap
}); 
tmap.setCenter(new google.maps.LatLng(uluru));
}
function callback(data) {
venue= data;
if (venue) {	
menu.hide();
for (var i=0; i< 5; i++){
parsed = (venue.events.event[i].venue_name); 
datalat = float(venue.events.event[i].latitude);
datalng = float(venue.events.event[i].longitude); 
addToMap(datalat,datalng);
}
}
}
function preload() {
soundFormats('mp3', 'ogg');
mySound = loadSound('st.mp3');
}
function setup() { 
createCanvas(300, 360, WEBGL);
mySound.setVolume(0.6);
mySound.play();
pixelDensity(1);
} 
function draw() { 
var maxiterations = 100;
texture(loadPixels());
plane(20);
for (var x = 0; x < width; x++) {
for (var y = 0; y < height; y++) {
var a = map(x, 0, width, -2, 2);
var b = map(y, 0, height, -2, 2);
var ca = a;
var cb = b;
var n = 0;
while (n < maxiterations) {
var aa = a * a - b * b;
var bb = 2 * a * b;
a = aa + ca;
b = bb + cb;
if (a * a + b * b > 16) {
break;
}
n++;
}
var bright = map(n, 0, maxiterations, 0, 1);
bright = map(sqrt(bright), 0, 1, 0, 255);
if (n == maxiterations) {
bright = -30;
}
var pix = (x + y * width) * 4;
pixels[pix + 0] = bright;
pixels[pix + 1] = bright;
pixels[pix + 2] = bright;
pixels[pix + 3] = 255;
}
}
updatePixels();
}
function preload() {
soundFormats('mp3', 'ogg');
mySound = loadSound('st.mp3');
}
function setup() { 
createCanvas(300, 360, WEBGL);
mySound.setVolume(0.6);
mySound.play();
pixelDensity(1);
} 
function draw() { 
var maxiterations = 100;
texture(loadPixels());
plane(20);
for (var x = 0; x < width; x++) {
for (var y = 0; y < height; y++) {
var a = map(x, 0, width, -2, 2);
var b = map(y, 0, height, -2, 2);
var ca = a;
var cb = b;
var n = 0;
while (n < maxiterations) {
var aa = a * a - b * b;
var bb = 2 * a * b;
a = aa + ca;
b = bb + cb;
if (a * a + b * b > 16) {
break;
}
n++;
}
var bright = map(n, 0, maxiterations, 0, 1);
bright = map(sqrt(bright), 0, 1, 0, 255);
if (n == maxiterations) {
bright = -30;
}
var pix = (x + y * width) * 4;
pixels[pix + 0] = bright;
pixels[pix + 1] = bright;
pixels[pix + 2] = bright;
pixels[pix + 3] = 255;
}
}
updatePixels();
}
var input;
var venue;
function setup() { 
createCanvas(600, 600);
input = createInput();
input.position(20, 65);
} 
function draw() { 
background(220);
}
function callback(data) {
venue= data;
if (venue) {	
for (var i=0; i< 5; i++){
var parsed = (venue.events.event[i].venue_name); 
}
}
}  var ppl = [];
var count = 0;
var cart = [];
var dy = 0;
var angle = 0;
var state = false;
function setup() {
createElement("h1", "Carnival of Doom");
createCanvas(600, 400);
angleMode(DEGREES);
cart = new Cart();
for (var i = 0; i < 8; i++) {
ppl[i] = new People();
}
}
function draw() {
background(120, 200, 255);
push();
noStroke();
fill(50, 200, 50);
rect(0, 270, width, 200);
pop();
push();
noFill();
ellipse(300, 150, 250, 250);
ellipse(300, 150, 200, 200);
line(300, 160, 370, 330);
line(300, 160, 240, 330);
translate(300, 150);
rotate(angle); 
let count = 0;
for (var degs = 0; degs < 360; degs += 45) {
push();
rotate(degs);
line(115, 0, 0, 0);
cart.show();
pop();
push();
ppl[count].show(degs, dy);
pop();
count++;
}
pop();
if (state) {
angle = angle - 1;
} else {
angle = angle + 1;
}
fill(200, 100, 200);
ellipse(300, 150, 30, 30);
stroke(200, 100, 200);
rect(210, 330, 190, 5);
}
function mousePressed() {
if (dist(mouseX, mouseY, 300, 160) < 20/2) {
state = !state;
count++;
if (count >=8){
}  
}
let mySound;
let amp;
let img;
function preload() {
soundFormats('mp3', 'ogg');
mySound = loadSound('Trippy Audio .mp3');
img = loadImage('lips2.png');
}
function setup() {
createCanvas(600, 1000, WEBGL);
mySound.setVolume(0.1);
mySound.loop();
amp = new p5.Amplitude();
amp.setInput(mySound);
}
function draw() { 
background(255);
var rms = amp.getLevel();
fill(0, 0, 255);
stroke(0);
ellipse(80, 30, 10+rms*200, 10+rms*200);
ellipse(-80, 30, 10+rms*200, 10+rms*200);
fill(0);
translate(90, 0, 0);
push();
rotateZ(frameCount * 0.01);
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.01);
torus(60, 20);
pop();
translate(-180, 0, 0);
push();
rotateZ(frameCount * 0.01);
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.01);
torus(60, 20);
pop();
fill(100, 230, 100);
translate(80, 200, 20);
fill(0,0);
texture(img);
plane(90, 90);
var locY = (mouseY / height - 0.5) * (-2);
var locX = (mouseX / width - 0.5) * 2;
ambientLight(100, 80, 80);
pointLight(200, 200, 200, locX, locY, 0);
rotateX(frameCount * 0.01);
rotateZ(frameCount * 0.01);
cylinder(200, 200);
}
var nameInput;
var nameP;
function setup() {
nameInput = createInput();
nameInput.changed(updateText);
}
function updateText() {
nameP.html(nameInput.value());
}
var sensorVal = [],
letter = "";
function draw() {
fill(255);
assignLetter();
text(letter, 30, 30);
text(nameInput.value(), 130, 140);
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
if(inString !== 'hello') {
sensorVal = sensors;
}
}
}
function keyPressed() {
}
function assignLetter() {
alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
"M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
"Y", "Z"];
for (i = 0; i < sensorVal.length; i++) {
if (int(sensorVal[i]) > 50) {
letter = alpha[i];    }
}
var inData;
var nameInput;
var nameP;
function setup() {
nameP = createP('Type your message slowly below:');
nameInput = createInput(); 
nameInput.changed(updateText); 
}
function updateText() {
nameP.html(nameInput.value());
}
inData = inByte;
}
}
function draw() {
background(0);
fill(255);
text(nameInput.value(), 130, 140);
}
function keyPressed() {
}var bg;
var rSlider, gSlider, bSlider;
function setup() {
bg = loadImage("DSC_0940.jpg");
createCanvas(200, 290);
filters1 = createElement('h4',"Mayfair");
filters1.position(240, 0);
filters2 = createElement('h4',"Valencia");
filters2.position(240, 30);
filters3 = createElement('h4',"Clarendon");
filters3.position(240, 60);
rSlider = createSlider(200, 230, 0);
rSlider.position(320, 20);
gSlider = createSlider(200, 230, 0);
gSlider.position(320, 50);
bSlider = createSlider(200, 230, 0);
bSlider.position(320, 80);
}
function draw() {	
background(bg);
var r = rSlider.value();
var g = gSlider.value();
var b = bSlider.value();
tint (r, g, b);
}
var ppl = [];
var count = 0;
var cart = [];
var inData;
var potentiometer;
var pushbutton = 1;
function setup() {
createElement("h1", "Carnival of Doom");
createCanvas(600, 400);
angleMode(DEGREES);
cart = new Cart();
for (var i = 0; i < 8; i++) {
ppl[i] = new People();
}
}
function draw() {
background(120, 200, 255);
push();
noStroke();
fill(50, 200, 50);
rect(0, 270, width, 200);
pop();
push();
noFill();
ellipse(300, 150, 250, 250);
ellipse(300, 150, 200, 200);
line(300, 160, 370, 330);
line(300, 160, 240, 330);
translate(300, 150);
var mapped = map(potentiometer, 0, 255, 0, 360);
rotate(mapped);
for (var degs = 0; degs < 360; degs += 45) {
rotate(degs);
line(115, 0, 0, 0);
cart.show();
}
let count = 0;
for (degs = 0; degs < 360; degs += 45) {    
rotate(degs);
ppl[count].show();
count++;
}
pop();
fill(200, 100, 200);
ellipse(300, 150, 30, 30);
stroke(200, 100, 200);
rect(210, 330, 190, 5);
}
if (inString.length > 0) {
var d = split(inString, ',');
potentiometer = Number(d[0]);
pushbutton = Number(d[1]);
}
}var x = 0;
var y = 0;
function setup() {
createCanvas(680, 500);
frameRate(18);
background(24, 60, 132);
}
function draw() {
noStroke();
fill(255);  
if (random(1) > 0.5) {
noStroke();
fill(253, 255, 166);
triangle(x, y, x+35, y, x+35, y+35);
noStroke();
fill(197, 203, 246);
ellipse(x+16, y+20, 25, 25);
noStroke();
fill(255);
ellipse(x+16, y+20, 8, 8);
} 
else {
noStroke();
fill(247, 178, 166);
triangle(x, y, x, y+35, x+35, y);
noStroke();
fill(215, 238, 159);
ellipse(x+20, y+20, 25, 25);
noStroke();
fill(255);
ellipse(x+20, y+20, 8, 8);
}
x += 35;
if (x > width) {
x = 0;
y += 35;
}
if (y > height) {
background(24, 60, 132);
x = 0;
y = 0;
}
}var x;
var y;
var f= 2;
var t;
function setup() { 
createCanvas(800, 600);
frameRate(f); 
x= random (0, width);
y= random (0, height);
t= 8;
} 
function draw() { 
background(255);
var colors = [ "white", "blue", "red", "orange", "yellow", "green", "blue", "purple", "brown", "black", "grey"];
for (i=0; i<colors.length; i++){
fill(random(255), random(255), random(255));
text(colors[i],random (x),random(y));
textSize(t++);
}
} 
function mousePressed() {
f = f + 1;
frameRate(f);
}var x, y;
function setup() { 
createCanvas(400, 400);
x= random(width, 0);
y= random(0, height);
frameRate(22);
} 
function draw() { 
background(220);
rect (x, y, 20, 50);
x++;
y++;
}var arm1;
var arm2;
function setup() { 
createCanvas(400, 400);
frameRate(3);
} 
function draw() { 
background(101,123,210);  
fill(246,193,68);
stroke (255);
ellipse(180, 144, 180, 160);
fill(246,193,68);
triangle(195, 90.5, 195, 145, 260, 108);
triangle(165, 145, 165, 90.5, 100, 108);
if (mouseIsPressed) {
fill(random(255), random(255), random(255));
}
else {
fill(255,0,0);
}
fill(246,193,68);
ellipse(195, 158, 15, 10);
ellipse(165, 158, 15, 10);
ellipse(188, 190, 105, 46);
fill(215,52,52);
ellipse(188, 190, 90, 26);
triangle(120, 300, 300, 300, 190, 223); 
fill(246,193,68);
}
function setup() { 
createCanvas(400, 400);
background(255,255,255);
} 
function draw() { 
background(255,255,255);
line(260, 108, 100, 199);
ellipse(210, 170, 55, 55);
rect(140, 90, 55, 55);
triangle(195, 90.5, 195, 145, 260, 108);
}