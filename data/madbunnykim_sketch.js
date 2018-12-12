let WIDTH = 10240;
let HEIGHT = 922;
let scl = 0.1875;
function setup() {
createCanvas(WIDTH*scl, HEIGHT*scl);
}
function draw() {
background(255);
push();
scale(scl, scl);
strokeWeight(50);
rect(400, 100, 1000, 600);
pop();  
push();
scale(1, 1);
strokeWeight(50*scl);
ellipse(mouseX, mouseY, 50*scl, 50*scl);
pop();
}let dude = []; 
let keywords = ['dog', 'six pack', 'nice eyes', 'fish','scooter','clothes on','gym selfie','better six pack','coffee','cook','outdoor','hipster'];
let amp;
let myRec = new p5.SpeechRec(); 
myRec.continuous = true;
function preload() {
dude[00] = loadImage('assets/dude01.jpg');
dude[01] = loadImage('assets/dude02.jpg');
dude[02] = loadImage('assets/dude03.jpg');
dude[03] = loadImage('assets/dude04.jpg');
dude[04] = loadImage('assets/dude05.jpg');
dude[05] = loadImage('assets/dude06.jpg');
dude[06] = loadImage('assets/dude07.jpg');
dude[07] = loadImage('assets/dude08.jpg');
dude[08] = loadImage('assets/dude09.jpg');
dude[09] = loadImage('assets/dude10.jpg');
dude[10] = loadImage('assets/dude11.jpg');
dude[11] = loadImage('assets/dude12.jpg');
}
function setup() { 
createCanvas(windowWidth, windowHeight);
amp = new p5.Amplitude();
myRec.onResult = showResult;
} 
function showResult()
{
if(myRec.resultValue==true) {
for(let i=0; i<keywords.length; i++) {
if(myRec.resultString == keywords[i]) {
imageMode(CENTER);
image(dude[i],windowWidth/2, windowHeight*(1/3),400,530);
}
}
}
console.log(myRec.resultString);
}
document.querySelector('#my-button').onclick = () => {
console.log('clickity');
myRec.start();
};let timeEvent;
let buttonState = 0;
let trigger;
let outro;
let tarot1, tarot2, tarot3;
let death, devil, fool, hangedman, hermit, moon, hierophant, emperpr, empress, judgement, magician, strength, highpriestess, sun, temperance, lovers, tower, star, chariot, world, wheeloffortune;
let covered1 = true;
let covered2 = true;
let covered3 = true;
let vidsound = [];
let counter = 0;
function preload() {
death = loadSound('voiceover/death.mp3');
devil = loadSound('voiceover/devil.mp3');
fool = loadSound('voiceover/fool.mp3');
hangedman = loadSound('voiceover/hangedman.mp3');
hermit = loadSound('voiceover/hermit.mp3');
moon = loadSound('voiceover/moon.mp3');
hierophant = loadSound('voiceover/hierophant.mp3');
emperor = loadSound('voiceover/emperor.mp3');
empress = loadSound('voiceover/empress.mp3');
judgement = loadSound('voiceover/judgement.mp3');
magician = loadSound('voiceover/magician.mp3');
strength = loadSound('voiceover/strength.mp3');
highpriestess = loadSound('voiceover/highpriestess.mp3');
sun = loadSound('voiceover/sun.mp3');
temperance = loadSound('voiceover/temperance.mp3');
lovers = loadSound('voiceover/lovers.mp3');
tower = loadSound('voiceover/tower.mp3');
star = loadSound('voiceover/star.mp3');
chariot = loadSound('voiceover/chariot.mp3');
world = loadSound('voiceover/world.mp3');
wheeloffortune = loadSound('voiceover/wheeloffortune.mp3');
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
counter = 0;
tarot1 = createImg('somatarot.png');
tarot2 = createImg('somatarot.png');
tarot3 = createImg('somatarot.png');
vidsound[0] = {
'video': createVideo('devil.mp4'),
'sound': devil
};
vidsound[0].video.loop();
vidsound[0].video.hide();
vidsound[1] = {
'video': createVideo('hangedman.mp4'),
'sound': hangedman
};
vidsound[1].video.loop();
vidsound[1].video.hide();
vidsound[2] = {
'video': createVideo('fool.mp4'),
'sound': fool
};
vidsound[2].video.loop();
vidsound[2].video.hide();
vidsound[3] = {
'video': createVideo('death.mp4'),
'sound': death
};
vidsound[3].video.loop();
vidsound[3].video.hide();
vidsound[4] = {
'video': createVideo('hermit.mp4'),
'sound': hermit
};
vidsound[4].video.loop();
vidsound[4].video.hide();
vidsound[5] = {
'video': createVideo('moon.mp4'),
'sound': moon
};
vidsound[5].video.loop();
vidsound[5].video.hide();
vidsound[6] = {
'video': createVideo('hierophant.mp4'),
'sound': hierophant
};
vidsound[6].video.loop();
vidsound[6].video.hide();
vidsound[7] = {
'video': createVideo('emperor.mp4'),
'sound': emperor
};
vidsound[7].video.loop();
vidsound[7].video.hide();
vidsound[8] = {
'video': createVideo('empress.mp4'),
'sound': empress
};
vidsound[8].video.loop();
vidsound[8].video.hide();
vidsound[9] = {
'video': createVideo('judgement.mp4'),
'sound': judgement
};
vidsound[9].video.loop();
vidsound[9].video.hide();
vidsound[10] = {
'video': createVideo('magician.mp4'),
'sound': magician
};
vidsound[10].video.loop();
vidsound[10].video.hide();
vidsound[11] = {
'video': createVideo('strength.mp4'),
'sound': strength
};
vidsound[11].video.loop();
vidsound[11].video.hide();
vidsound[12] = {
'video': createVideo('highpriestess.mp4'),
'sound': highpriestess
};
vidsound[12].video.loop();
vidsound[12].video.hide();
vidsound[13] = {
'video': createVideo('sun.mp4'),
'sound': sun
};
vidsound[13].video.loop();
vidsound[13].video.hide();
vidsound[14] = {
'video': createVideo('temperance.mp4'),
'sound': temperance
};
vidsound[14].video.loop();
vidsound[14].video.hide();
vidsound[15] = {
'video': createVideo('lovers.mp4'),
'sound': lovers
};
vidsound[15].video.loop();
vidsound[15].video.hide();
vidsound[16] = {
'video': createVideo('tower.mp4'),
'sound': tower
};
vidsound[16].video.loop();
vidsound[16].video.hide();
vidsound[17] = {
'video': createVideo('star.mp4'),
'sound': star
};
vidsound[17].video.loop();
vidsound[17].video.hide();
vidsound[18] = {
'video': createVideo('chariot.mp4'),
'sound': chariot
};
vidsound[18].video.loop();
vidsound[18].video.hide();
vidsound[19] = {
'video': createVideo('world.mp4'),
'sound': world
};
vidsound[19].video.loop();
vidsound[19].video.hide();
vidsound[20] = {
'video': createVideo('wheeloffortune.mp4'),
'sound': wheeloffortune
};
vidsound[20].video.loop();
vidsound[20].video.hide();
shuffle(vidsound, true);
outro = createVideo('outro.mp4');
outro.hide();
}
function draw() {
imageMode(CENTER);
if (counter == 0) {
let v_width = min(width / 3, 300);
let v_height = v_width * 1.666;
image(vidsound[0].video, width / 6 + (0 * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered1) {
tarot1.show();
} else {
tarot1.hide();
}
tarot1.size(min(width / 3, 300) + 33, v_height + 33);
tarot1.position(width / 6 - v_width / 2 - 13, 0 + 133);
image(vidsound[1].video, width / 6 + (1 * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered2) {
tarot2.show();
} else {
tarot2.hide();
}
tarot2.size(min(width / 3, 300) + 33, v_height + 33);
tarot2.position(3 * width / 6 - v_width / 2 - 12, 0 + 133);
image(vidsound[2].video, width / 6 + (2 * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered3) {
tarot3.show();
} else {
tarot3.hide();
}
tarot3.size(min(width / 3, 300) + 33, v_height + 33);
tarot3.position(5 * width / 6 - v_width / 2 - 12, 0 + 133);
if (buttonState == 1) {
trigger = millis();
}
if (trigger >= timeEvent + 10000) {
counter = 1;
}
} else if (counter == 1) {
loopend();
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 3 && covered1 == true) {
buttonState = 1;
vidsound[0].sound.play();
covered1 = false;
vidsound[0].sound.onended(beginPlay2);
}
}
function beginPlay2() {
vidsound[1].sound.play();
covered2 = false;
vidsound[1].sound.onended(beginPlay3);
}
function beginPlay3() {
vidsound[2].sound.play();
covered3 = false;
vidsound[2].sound.onended(sessionComplete);
}
function sessionComplete() {
timeEvent = millis();
}
function loopend(){
image(outro, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
outro.loop();
}let timeEvent;
let buttonState = 0;
let trigger;
let outro;
let tarot1, tarot2, tarot3;
let death, devil, fool, hangedman, hermit, moon, hierophant, emperpr, empress, judgement, magician, strength, highpriestess, sun, temperance, lovers, tower, star, chariot, world, wheeloffortune;
let covered1 = true;
let covered2 = true;
let covered3 = true;
let vidsound = [];
function preload() {
death = loadSound('voiceover/death.mp3');
devil = loadSound('voiceover/devil.mp3');
fool = loadSound('voiceover/fool.mp3');
hangedman = loadSound('voiceover/hangedman.mp3');
hermit = loadSound('voiceover/hermit.mp3');
moon = loadSound('voiceover/moon.mp3');
hierophant = loadSound('voiceover/hierophant.mp3');
emperor = loadSound('voiceover/emperor.mp3');
empress = loadSound('voiceover/empress.mp3');
judgement = loadSound('voiceover/judgement.mp3');
magician = loadSound('voiceover/magician.mp3');
strength = loadSound('voiceover/strength.mp3');
highpriestess = loadSound('voiceover/highpriestess.mp3');
sun = loadSound('voiceover/sun.mp3');
temperance = loadSound('voiceover/temperance.mp3');
lovers = loadSound('voiceover/lovers.mp3');
tower = loadSound('voiceover/tower.mp3');
star = loadSound('voiceover/star.mp3');
chariot = loadSound('voiceover/chariot.mp3');
world = loadSound('voiceover/world.mp3'); 
wheeloffortune = loadSound('voiceover/wheeloffortune.mp3');
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
tarot1 = createImg('somatarot.png');
tarot2 = createImg('somatarot.png');
tarot3 = createImg('somatarot.png');
vidsound[0] = {
'video': createVideo('devil.mp4'),
'sound': devil
};
vidsound[0].video.loop();
vidsound[0].video.hide();
vidsound[1] = {
'video': createVideo('hangedman.mp4'),
'sound': hangedman
};
vidsound[1].video.loop();
vidsound[1].video.hide();
vidsound[2] = {
'video': createVideo('fool.mp4'),
'sound': fool
};
vidsound[2].video.loop();
vidsound[2].video.hide();
vidsound[3] = {
'video': createVideo('death.mp4'),
'sound': death
};
vidsound[3].video.loop();
vidsound[3].video.hide();
vidsound[4] = {
'video': createVideo('hermit.mp4'),
'sound': hermit
};
vidsound[4].video.loop();
vidsound[4].video.hide();
vidsound[5] = {
'video': createVideo('moon.mp4'),
'sound': moon
};
vidsound[5].video.loop();
vidsound[5].video.hide();
vidsound[6] = {
'video': createVideo('hierophant.mp4'),
'sound': hierophant
};
vidsound[6].video.loop();
vidsound[6].video.hide();
vidsound[7] = {
'video': createVideo('emperor.mp4'),
'sound': emperor
};
vidsound[7].video.loop();
vidsound[7].video.hide();
vidsound[8] = {
'video': createVideo('empress.mp4'),
'sound': empress
};
vidsound[8].video.loop();
vidsound[8].video.hide();
vidsound[9] = {
'video': createVideo('judgement.mp4'),
'sound': judgement
};
vidsound[9].video.loop();
vidsound[9].video.hide();
vidsound[10] = {
'video': createVideo('magician.mp4'),
'sound': magician
};
vidsound[10].video.loop();
vidsound[10].video.hide();
vidsound[11] = {
'video': createVideo('strength.mp4'),
'sound': strength
};
vidsound[11].video.loop();
vidsound[11].video.hide();
vidsound[12] = {
'video': createVideo('highpriestess.mp4'),
'sound': highpriestess
};
vidsound[12].video.loop();
vidsound[12].video.hide();
vidsound[13] = {
'video': createVideo('sun.mp4'),
'sound': sun
};
vidsound[13].video.loop();
vidsound[13].video.hide();
vidsound[14] = {
'video': createVideo('temperance.mp4'),
'sound': temperance
};
vidsound[14].video.loop();
vidsound[14].video.hide();
vidsound[15] = {
'video': createVideo('lovers.mp4'),
'sound': lovers
};
vidsound[15].video.loop();
vidsound[15].video.hide();
vidsound[16] = {
'video': createVideo('tower.mp4'),
'sound': tower
};
vidsound[16].video.loop();
vidsound[16].video.hide();
vidsound[17] = {
'video': createVideo('star.mp4'),
'sound': star
};
vidsound[17].video.loop();
vidsound[17].video.hide();
vidsound[18] = {
'video': createVideo('chariot.mp4'),
'sound': chariot
};
vidsound[18].video.loop();
vidsound[18].video.hide();
vidsound[19] = {
'video': createVideo('world.mp4'),
'sound': world
};
vidsound[19].video.loop();
vidsound[19].video.hide();
vidsound[20] = {
'video': createVideo('wheeloffortune.mp4'),
'sound': wheeloffortune
};
vidsound[20].video.loop();
vidsound[20].video.hide();
shuffle(vidsound, true);
outro = createVideo('outro.mp4');
outro.hide();
}
function draw() {
imageMode(CENTER);
let v_width = min(width / 3, 300);
let v_height = v_width * 1.666;
image(vidsound[0].video, width / 6 + (0 * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered1) {
tarot1.show();
} else {
tarot1.hide();
}
tarot1.size(min(width / 3, 300) + 33, v_height + 33);
tarot1.position(width / 6 - v_width / 2 - 13, 0 + 133);
image(vidsound[1].video, width / 6 + (1 * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered2) {
tarot2.show();
} else {
tarot2.hide();
}
tarot2.size(min(width / 3, 300) + 33, v_height + 33);
tarot2.position(3 * width / 6 - v_width / 2 - 12, 0 + 133);
image(vidsound[2].video, width / 6 + (2 * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered3) {
tarot3.show();
} else {
tarot3.hide();
}
tarot3.size(min(width / 3, 300) + 33, v_height + 33);
tarot3.position(5 * width / 6 - v_width / 2 - 12, 0 + 133);
if (buttonState == 1) {
trigger = millis();
}
if (trigger >= timeEvent + (vidsound[0].sound.duration() * 1000) + 10000) {
image(outro, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
outro.play();
outro.loop();
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 3 && covered1 == true) {
timeEvent = millis();
console.log(timeEvent);
console.log("time " + timeEvent + vidsound[0].sound.duration());
buttonState = 1;
vidsound[0].sound.play();
covered1 = false;
} else if (mouseX > width / 3 && mouseX < 2 * width / 3 && covered2 == true) {
vidsound[1].sound.play();
covered2 = false;
} else if (mouseX > width / 3 && mouseX < 3 * width / 3 && covered3 == true) {
vidsound[2].sound.play();
covered3 = false;
}
}let fruit1, fruit2, fruit3, fruit4, fruit5, fruit6;
let vid1, vid2, vid3, vid4, vid5, vid6;
function preload() {
fruit1 = loadSound('onepercent.wav');
fruit2 = loadSound('hypergendered.wav');
fruit3 = loadSound('void.wav');
fruit4 = loadSound('caterpillar.wav');
fruit5 = loadSound('waterbirth.wav');
fruit6 = loadSound('commune.wav');
}
var seed = 987654;
function myRandom() {
seed = (seed * seed).toString();
while (seed.length < 10) {
seed = '0' + seed;
}
seed = seed.substr(2, 6);
seed = parseInt(seed);
return seed / 1000000;
}
function setup() {
createCanvas(windowWidth, windowHeight);
vid1 = createVideo('fruit1.mp4', vidLoad);
vid1.hide();
vid2 = createVideo('fruit2.mp4', vidLoad);
vid2.hide();
vid3 = createVideo('fruit3.mp4', vidLoad);
vid3.hide();
vid4 = createVideo('fruit4.mp4', vidLoad);
vid4.hide();
vid5 = createVideo('fruit5.mp4', vidLoad);
vid5.hide();
vid6 = createVideo('fruit6.mp4', vidLoad);
vid6.hide();
}
function vidLoad() {
vid1.play();
vid1.loop();
vid2.play();
vid2.loop();
vid3.play();
vid3.loop();
vid4.play();
vid4.loop();
vid5.play();
vid5.loop();
vid6.play();
vid6.loop();
}
function draw() {
background(0);
image(vid1, 0, 0, windowWidth / 3, windowHeight / 2);
image(vid2, windowWidth / 3, 0, windowWidth / 3, windowHeight / 2);
image(vid3, 2 * windowWidth / 3, 0, windowWidth / 3, windowHeight / 2);
image(vid4, 0, windowHeight / 2, windowWidth / 3, windowHeight / 2);
image(vid5, windowWidth / 3, windowHeight / 2, windowWidth / 3, windowHeight / 2);
image(vid6, 2 * windowWidth / 3, windowHeight / 2, windowWidth / 3, windowHeight / 2);
}
function mousePressed() {
let sound = int(5 * myRandom());
let messages = [fruit1, fruit2, fruit3, fruit4, fruit5, fruit6];
if (mouseX > 0 && mouseX < windowWidth / 3 && mouseY > 0 && mouseY < windowHeight / 2) {
messages[sound].play();
} else if (mouseX > windowWidth / 3 && mouseX < 2 * windowWidth / 3 && mouseY > 0 && mouseY < windowHeight / 2) {
messages[sound].play();
} else if (mouseX > 2 * windowWidth / 3 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight / 2) {
messages[sound].play();
} else if (mouseX > 0 && mouseX < windowWidth / 3 && mouseY > windowHeight / 2 && mouseY < windowHeight) {
messages[sound].play();
} else if (mouseX > windowWidth / 3 && mouseX < 2 * windowWidth / 3 && mouseY > windowHeight / 2 && mouseY < windowHeight) {
messages[sound].play();
} else if (mouseX > 2 * windowWidth / 3 && mouseX < windowWidth && mouseY > windowHeight / 2 && mouseY < windowHeight) {
messages[sound].play();
}
}let fruit1, fruit2, fruit3, fruit4, fruit5, fruit6;
let vid1, vid2, vid3, vid4, vid5, vid6;
function preload() {
fruit1 = loadSound('onepercent.wav');
fruit2 = loadSound('hypergendered.wav');
fruit3 = loadSound('void.wav');
fruit4 = loadSound('caterpillar.wav');
fruit5 = loadSound('waterbirth.wav');
fruit6 = loadSound('commune.wav');
}
var seed = 987654;
function myRandom() {
seed = (seed * seed).toString();
while (seed.length < 10) {
seed = '0' + seed;
}
seed = seed.substr(2, 6);
seed = parseInt(seed);
return seed / 1000000;
}
function setup() {
createCanvas(windowWidth, windowHeight);
vid1 = createVideo('fruit1.mp4', vidLoad);
vid1.hide();
vid2 = createVideo('fruit2.mp4', vidLoad);
vid2.hide();
vid3 = createVideo('fruit3.mp4', vidLoad);
vid3.hide();
vid4 = createVideo('fruit4.mp4', vidLoad);
vid4.hide();
vid5 = createVideo('fruit5.mp4', vidLoad);
vid5.hide();
vid6 = createVideo('fruit6.mp4', vidLoad);
vid6.hide();
}
function vidLoad() {
vid1.play();
vid1.loop();
vid2.play();
vid2.loop();
vid3.play();
vid3.loop();
vid4.play();
vid4.loop();
vid5.play();
vid5.loop();
vid6.play();
vid6.loop();
}
function draw() {
let thing = int(5 * myRandom());
let vids = [vid1, vid2, vid3, vid4, vid5, vid6];
background(0);
image(vids[thing], 0, 0, windowWidth / 3, windowHeight / 2);
image(vids[thing], windowWidth / 3, 0, windowWidth / 3, windowHeight / 2);
image(vids[thing], 2 * windowWidth / 3, 0, windowWidth / 3, windowHeight / 2);
image(vids[thing], 0, windowHeight / 2, windowWidth / 3, windowHeight / 2);
image(vids[thing], windowWidth / 3, windowHeight / 2, windowWidth / 3, windowHeight / 2);
image(vids[thing], 2 * windowWidth / 3, windowHeight / 2, windowWidth / 3, windowHeight / 2);
}
function mousePressed() {
let sound = int(5 * myRandom());
let messages = [fruit1, fruit2, fruit3, fruit4, fruit5, fruit6];
if (mouseX > 0 && mouseX < windowWidth / 3 && mouseY > 0 && mouseY < windowHeight / 2) {
messages[sound].play();
} else if (mouseX > windowWidth / 3 && mouseX < 2 * windowWidth / 3 && mouseY > 0 && mouseY < windowHeight / 2) {
messages[sound].play();
} else if (mouseX > 2 * windowWidth / 3 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight / 2) {
messages[sound].play();
} else if (mouseX > 0 && mouseX < windowWidth / 3 && mouseY > windowHeight / 2 && mouseY < windowHeight) {
messages[sound].play();
} else if (mouseX > windowWidth / 3 && mouseX < 2 * windowWidth / 3 && mouseY > windowHeight / 2 && mouseY < windowHeight) {
messages[sound].play();
} else if (mouseX > 2 * windowWidth / 3 && mouseX < windowWidth && mouseY > windowHeight / 2 && mouseY < windowHeight) {
messages[sound].play();
}
}let fruit1, fruit2, fruit3, fruit4, fruit5, fruit6; 
let vid1, vid2, vid3, vid4, vid5, vid6; 
let fruit = []; 
function preload() {
fruit1 = loadSound('onepercent.wav');
fruit2 = loadSound('hypergendered.wav');
fruit3 = loadSound('void.wav');
fruit4 = loadSound('caterpillar.wav');
fruit5 = loadSound('waterbirth.wav');
fruit6 = loadSound('commune.wav');
}
function setup() {
createCanvas(windowWidth, windowHeight);
vid1=createVideo('fruit1.mp4',vidLoad); 
vid1.hide(); 
vid2=createVideo('fruit2.mp4',vidLoad);
vid2.hide(); 
vid3=createVideo('fruit3.mp4',vidLoad);
vid3.hide();
vid4=createVideo('fruit4.mp4',vidLoad);
vid4.hide();
vid5=createVideo('fruit5.mp4',vidLoad);
vid5.hide();
vid6=createVideo('fruit6.mp4',vidLoad);
vid6.hide();
}
function vidLoad() {	
vid1.play(); 
vid1.loop(); 
vid2.play(); 
vid2.loop(); 
vid3.play(); 
vid3.loop(); 
vid4.play(); 
vid4.loop(); 
vid5.play(); 
vid5.loop(); 
vid6.play(); 
vid6.loop(); 
}
function draw() {
background(0);
image(vid1,0,0,windowWidth/3,windowHeight/2); 
image(vid2,windowWidth/3,0,windowWidth/3,windowHeight/2); 
image(vid3,2*windowWidth/3,0,windowWidth/3,windowHeight/2); 
image(vid4,0,windowHeight/2,windowWidth/3,windowHeight/2); 
image(vid5,windowWidth/3,windowHeight/2,windowWidth/3,windowHeight/2); 
image(vid6,2*windowWidth/3,windowHeight/2,windowWidth/3,windowHeight/2); 
}
function mousePressed() {
if (mouseX > 0 && mouseX < windowWidth/3 && mouseY > 0 && mouseY <windowHeight/2) {
fruit1.play();
} else if (mouseX > windowWidth/3 && mouseX < 2*windowWidth/3 && mouseY > 0 && mouseY <windowHeight/2 ) {
fruit2.play();
} else if (mouseX > 2*windowWidth/3 && mouseX < windowWidth && mouseY > 0 && mouseY <windowHeight/2) {
fruit3.play();
} else if (mouseX > 0 && mouseX < windowWidth/3 && mouseY > windowHeight/2 && mouseY < windowHeight) {
fruit4.play();
} else if (mouseX > windowWidth/3 && mouseX < 2*windowWidth/3 && mouseY > windowHeight/2 && mouseY < windowHeight) {
fruit5.play();
} else if (mouseX > 2*windowWidth/3 && mouseX < windowWidth && mouseY > windowHeight/2 && mouseY < windowHeight) {
fruit6.play();
}
var seed = 9876;
function myRandom() {
seed = (seed * seed).toString();
while (seed.length < 10) {
seed = '0'+seed;
}
seed = seed.substr(2, 6);
seed = parseInt(seed);
return seed / 1000000;
}
function draw() {
let whatever = int(27*myRandom()); 
console.log(whatever); 
background(0);
}
var seed = 98760;
function myRandom() {
seed = (seed * seed).toString();
while (seed.length < 10) {
seed = '0'+seed;
}
seed = seed.substr(2, 6);
seed = parseInt(seed);
return seed / 1000000;
}
function normal() {
let count = 10;
let sum = 0;
for (let i = 0; i < count; i++) {
sum += myRandom();
}
return sum / count;
}
function setup() {
createCanvas(400, 400);
background(0);
fill(255, 16);
noStroke();
console.log(normal());
}
function draw() {
background(0, 16);
fill(255, 0, 0);
ellipse(normal()*width, normal()*height, normal()*100, normal()*100);
fill(0, 0, 255);
ellipse(myRandom()*width, myRandom()*height, myRandom()*100, myRandom()*100);
var seed = 9876;
function myRandom() {
seed = (seed * seed).toString();
while (seed.length < 10) {
seed = '0'+seed;
}
seed = seed.substr(2, 6);
seed = parseInt(seed);
return seed / 1000000;
}
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
var p = 0.1;
var r = 3.5;
function myRandom() {
p = r * p * (1 - p);
if (r < 3.96995) {
r += 0.00005;
}
return p;
}
var pos = 0;
var step = 8;
var randomCanvas;
function setup() {
pixelDensity(1);
createCanvas(400, 400);
randomCanvas = createVideo('dragonfruit.mp4');
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
var oscillator = new Tone.Oscillator();
let kinectron; 
function setup() {
myCanvas = createCanvas(400, 400);
kinectron = new Kinectron("172.22.151.79"); 
kinectron.makeConnection(); 
kinectron.startTrackedBodies(drawBody); 
}
function draw() {
background(0);
}
function drawBody(body){
for (let i=0; i<body.joints.length; i++){
fill(100); 
ellipse(body.joints[i].depthX * myCanvas.width, body.joints[i].depthY * myCanvas.height, 10, 10);
}
}
let fruit1, fruit2, fruit3, fruit4, fruit5, fruit6; 
let vid1, vid2, vid3, vid4, vid5, vid6; 
function preload() {
fruit1 = loadSound('onepercent.wav');
fruit2 = loadSound('hypergendered.wav');
fruit3 = loadSound('void.wav');
fruit4 = loadSound('caterpillar.wav');
fruit5 = loadSound('waterbirth.wav');
fruit6 = loadSound('commune.wav');
}
function setup() {
createCanvas(windowWidth, windowHeight);
vid1=createVideo('fruit1.mp4',vidLoad); 
vid1.hide(); 
vid2=createVideo('fruit2.mp4',vidLoad);
vid2.hide(); 
vid3=createVideo('fruit3.mp4',vidLoad);
vid3.hide();
vid4=createVideo('fruit4.mp4',vidLoad);
vid4.hide();
vid5=createVideo('fruit5.mp4',vidLoad);
vid5.hide();
vid6=createVideo('fruit6.mp4',vidLoad);
vid6.hide();
}
function vidLoad() {	
vid1.play(); 
vid1.loop(); 
vid2.play(); 
vid2.loop(); 
vid3.play(); 
vid3.loop(); 
vid4.play(); 
vid4.loop(); 
vid5.play(); 
vid5.loop(); 
vid6.play(); 
vid6.loop(); 
}
function draw() {
background(0);
image(vid1,0,0,windowWidth/3,windowHeight/2); 
image(vid2,windowWidth/3,0,windowWidth/3,windowHeight/2); 
image(vid3,2*windowWidth/3,0,windowWidth/3,windowHeight/2); 
image(vid4,0,windowHeight/2,windowWidth/3,windowHeight/2); 
image(vid5,windowWidth/3,windowHeight/2,windowWidth/3,windowHeight/2); 
image(vid6,2*windowWidth/3,windowHeight/2,windowWidth/3,windowHeight/2); 
}
function mousePressed() {
if (mouseX > 0 && mouseX < windowWidth/3 && mouseY > 0 && mouseY <windowHeight/2) {
fruit1.play();
} else if (mouseX > windowWidth/3 && mouseX < 2*windowWidth/3 && mouseY > 0 && mouseY <windowHeight/2 ) {
fruit2.play();
} else if (mouseX > 2*windowWidth/3 && mouseX < windowWidth && mouseY > 0 && mouseY <windowHeight/2) {
fruit3.play();
} else if (mouseX > 0 && mouseX < windowWidth/3 && mouseY > windowHeight/2 && mouseY < windowHeight) {
fruit4.play();
} else if (mouseX > windowWidth/3 && mouseX < 2*windowWidth/3 && mouseY > windowHeight/2 && mouseY < windowHeight) {
fruit5.play();
} else if (mouseX > 2*windowWidth/3 && mouseX < windowWidth && mouseY > windowHeight/2 && mouseY < windowHeight) {
fruit6.play();
}
}let tarot1, tarot2, tarot3;
let death, devil, fool, hangedman, hermit, moon;
let covered1 = true;
let covered2 = true;
let covered3 = true;
let vidsound = [];
function preload() {
death = loadSound('voiceover/death.mp3');
devil = loadSound('voiceover/devil.mp3');
fool = loadSound('voiceover/fool.mp3');
hangedman = loadSound('voiceover/hangedman.mp3');
hermit = loadSound('voiceover/hermit.mp3');
moon = loadSound('voiceover/moon.mp3');
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(255);
tarot1 = createImg('somatarot.png');
tarot2 = createImg('somatarot.png');
tarot3 = createImg('somatarot.png');
vidsound[0] = {
'video': createVideo('devil.mp4'),
'sound': devil
};
vidsound[0].video.loop();
vidsound[0].video.hide();
vidsound[1] = {
'video': createVideo('hangedman.mp4'),
'sound': hangedman
};
vidsound[1].video.loop();
vidsound[1].video.hide();
vidsound[2] = {
'video': createVideo('fool.mp4'),
'sound': fool
};
vidsound[2].video.loop();
vidsound[2].video.hide();
vidsound[3] = {
'video': createVideo('death.mp4'),
'sound': death
};
vidsound[3].video.loop();
vidsound[3].video.hide();
vidsound[4] = {
'video': createVideo('hermit.mp4'),
'sound': hermit
};
vidsound[4].video.loop();
vidsound[4].video.hide();
vidsound[5] = {
'video': createVideo('moon.mp4'),
'sound': moon
};
vidsound[5].video.loop();
vidsound[5].video.hide();
shuffle(vidsound, true);
}
function draw() {
imageMode(CENTER);
let v_width = min(width / 3, 300);
let v_height = v_width * 1.666;
image(vidsound[0].video, width / 6 + (0 * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered1) {
tarot1.show();
} else {
tarot1.hide();
}
tarot1.size(min(width / 3, 300) + 33, v_height + 33);
tarot1.position(width / 6 - v_width / 2 - 13, 0 + 133);
image(vidsound[1].video, width / 6 + (1 * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered2) {
tarot2.show();
} else {
tarot2.hide();
}
tarot2.size(min(width / 3, 300) + 33, v_height + 33);
tarot2.position(3 * width / 6 - v_width / 2 - 12, 0 + 133);
image(vidsound[2].video, width / 6 + (2 * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered3) {
tarot3.show();
} else {
tarot3.hide();
}
tarot3.size(min(width / 3, 300) + 33, v_height + 33);
tarot3.position(5 * width / 6 - v_width / 2 - 12, 0 + 133);
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 3 && covered1 == true) {
vidsound[0].sound.play();
covered1 = false;
} else if (mouseX > width / 3 && mouseX < 2 * width / 3 && covered2 == true) {
vidsound[1].sound.play();
covered2 = false;
} else if (mouseX > width / 3 && mouseX < 3 * width / 3 && covered3 == true) {
vidsound[2].sound.play();
covered3 = false;
}
}let tarot1, tarot2, tarot3;
let videoXrandomizer = [0, 1, 2];
let covered1 = true;
let covered2 = true;
let covered3 = true;
let videos = [];
let selection = [];
let death, devil, fool, hangedman, hermit, moon; 
function preload() {
death = loadSound('voiceover/death.mp3'); 
devil = loadSound('voiceover/devil.mp3'); 
fool = loadSound('voiceover/fool.mp3'); 
hangedman = loadSound('voiceover/hangedman.mp3'); 
hermit = loadSound('voiceover/hermit.mp3');
moon = loadSound('voiceover/moon.mp3'); 
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(255);
tarot1 = createImg('somatarot.png');
tarot2 = createImg('somatarot.png');
tarot3 = createImg('somatarot.png');
videos[0] = createVideo('devil.mp4');
videos[0].loop();
videos[0].hide();
videos[1] = createVideo('hangedman.mp4');
videos[1].loop();
videos[1].hide();
videos[2] = createVideo('fool.mp4');
videos[2].loop();
videos[2].hide();
videos[3] = createVideo('death.mp4');
videos[3].loop();
videos[3].hide();
videos[4] = createVideo('hermit.mp4');
videos[4].loop();
videos[4].hide();
videos[5] = createVideo('moon.mp4');
videos[5].loop();
videos[5].hide();
shuffle(videos, true);
shuffle(videoXrandomizer, true);
}
function draw() {
imageMode(CENTER);
let v_width = min(width / 3, 300);
let v_height = v_width * 1.666;
image(videos[0], width / 6 + (videoXrandomizer[0] * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered1) {
tarot1.show();
} else {
tarot1.hide();
}
tarot1.size(min(width / 3, 300) + 33, v_height + 33);
tarot1.position(width / 6 - v_width / 2 - 13, 0 + 133);
image(videos[1], width / 6 + (videoXrandomizer[1] * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered2) {
tarot2.show();
} else {
tarot2.hide();
}
tarot2.size(min(width / 3, 300) + 33, v_height + 33);
tarot2.position(3 * width / 6 - v_width / 2 - 12, 0 + 133);
image(videos[2], width / 6 + (videoXrandomizer[2] * width / 3), v_height / 2 + 150, min(width / 3, 300), v_height);
if (covered3) {
tarot3.show();
} else {
tarot3.hide();
}
tarot3.size(min(width / 3, 300) + 33, v_height + 33);
tarot3.position(5 * width / 6 - v_width / 2 - 12, 0 + 133);
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 3 && covered1 == true) {
covered1 = false;
} else if (mouseX > width / 3 && mouseX < 2 * width / 3 && covered2 == true) {
covered2 = false;
} else if (mouseX > width / 3 && mouseX < 3 * width / 3 && covered3 == true) {
covered3 = false;
}
}let floorplan; 
let lake;
let bathtub; 
let house; 
let house2; 
let house3; 
let house4; 
let door; 
let enter; 
let elevator; 
let kitchen; 
let diningroom; 
let livingroom; 
let stair; 
let hallway; 
let bathroom; 
let balcony;
let balcony2;
let balcony3;
let balcony4;
let closet;  
let bedroom; 
let bedroom2; 
let housekeeper; 
let swimmingpool; 
let kindergarten; 
let backyard; 
let dinner; 
let fungsui; 
let accident;
let hide; 
let intruder; 
let jealous; 
let repeat; 
let moon; 
let secret; 
let speak; 
let stories; 
let sunset; 
let ours; 
let breathe;
let laugh; 
let down; 
let walk; 
let ghost; 
let bathe; 
let up; 
let underwater; 
let kettle; 
let iron; 
let flap; 
function preload() {
floorplan = loadImage("assets/floorplan.png"); 
enter = loadSound('assets/door.wav'); 
dinner = loadSound('assets/dinner.WAV');
fungsui = loadSound('assets/fungsui.WAV');
accident = loadSound('assets/accident.wav');
hide = loadSound('assets/hide.WAV');
intruder = loadSound('assets/intruder.wav');
jealous = loadSound('assets/jealous.WAV');
repeat = loadSound('assets/repeat.wav');
moon = loadSound('assets/moon.WAV');
secret = loadSound('assets/secret.WAV');
speak = loadSound('assets/speak.WAV');
stories = loadSound('assets/stories.WAV');
sunset = loadSound('assets/sunset.WAV');
ours = loadSound('assets/ours.wav');
breathe = loadSound('assets/breathe.wav'); 
laugh = loadSound('assets/laugh.wav');
down = loadSound('assets/down.wav'); 
walk = loadSound('assets/walk.wav'); 
ghost = loadSound('assets/ghost.wav'); 
bathe = loadSound('assets/bathe.wav');
up = loadSound('assets/up.wav');
underwater = loadSound('assets/underwater.wav');
kettle = loadSound('assets/kettle.wav');
iron = loadSound('assets/iron.wav');
flap = loadSound('assets/flap.wav');
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(255);
imageMode(CENTER); 
image(floorplan,windowWidth*0.5,windowHeight*0.5, windowWidth*0.35, windowHeight*0.85); 
lake = createButton('lake');
lake.position(windowWidth*0.15, windowHeight*0.3);
lake.mousePressed(playAccident);
house = createButton('house'); 
house.position(windowWidth*0.05, windowHeight*0.9); 
house.mousePressed(playStories); 
house2 = createButton('house'); 
house2.position(windowWidth*0.1, windowHeight*0.9); 
house2.mousePressed(playGhost);
house3 = createButton('house'); 
house3.position(windowWidth*0.15, windowHeight*0.9);
house3.mousePressed(playOurs);
house4 = createButton('house'); 
house4.position(windowWidth*0.2, windowHeight*0.9); 
house4.mousePressed(playIntruder);
swimmingpool = createButton('swimming pool'); 
swimmingpool.position(windowWidth*0.75, windowHeight*0.37); 
swimmingpool.mousePressed(playUnderwater); 
kindergarten = createButton('kindergarten'); 
kindergarten.position(windowWidth*0.9, windowHeight*0.1); 
kindergarten.mousePressed(playSpeak); 
backyard = createButton('backyard'); 
backyard.position(windowWidth*0.76, windowHeight*0.65); 
backyard.mousePressed(playHide); 
elevator = createButton('elevator'); 
elevator.position(windowWidth*0.38, windowHeight*0.05); 
elevator.mousePressed(playUp); 
door = createButton('door'); 
door.position(windowWidth*0.485, windowHeight*0.09); 
door.mousePressed(playEnter); 
kitchen = createButton('kitchen'); 
kitchen.position(windowWidth*0.57, windowHeight*0.16); 
kitchen.mousePressed(playKettle);
diningroom = createButton('dining room'); 
diningroom.position(windowWidth*0.56, windowHeight*0.32); 
diningroom.mousePressed(playDinner); 
balcony3 = createButton('balcony'); 
balcony3.position(windowWidth*0.64, windowHeight*0.32);
balcony3.mousePressed(playLaugh); 
livingroom = createButton('living room'); 
livingroom.position(windowWidth*0.4, windowHeight*0.3);
livingroom.mousePressed(playSunset); 
balcony = createButton('balcony'); 
balcony.position(windowWidth*0.33, windowHeight*0.29); 
balcony.mousePressed(playMoon); 
stair = createButton('stair'); 
stair.position(windowWidth*0.41, windowHeight*0.48); 
stair.mousePressed(playDown);
hallway = createButton('hallway'); 
hallway.position(windowWidth*0.5, windowHeight*0.54); 
hallway.mousePressed(playWalk); 
bathroom = createButton('bathroom'); 
bathroom.position(windowWidth*0.43, windowHeight*0.6);
bathroom.mousePressed(playFungsui); 
housekeeper = createButton('housekeepers room'); 
housekeeper.position(windowWidth*0.56, windowHeight*0.47);  
housekeeper.mousePressed(playIron);
bedroom2 = createButton('bedroom'); 
bedroom2.position(windowWidth*0.57, windowHeight*0.61);
bedroom2.mousePressed(playJealous); 
balcony2 = createButton('balcony'); 
balcony2.position(windowWidth*0.64, windowHeight*0.63);
balcony2.mousePressed(playFlap);
bedroom = createButton('bedroom'); 
bedroom.position(windowWidth*0.42, windowHeight*0.8); 
bedroom.mousePressed(playSecret); 
tub = createButton('bathtub'); 
tub.position(windowWidth*0.58, windowHeight*0.87); 
tub.mousePressed(playBathe);
closet = createButton('closet'); 
closet.position(windowWidth*0.38, windowHeight*0.6); 
closet.mousePressed(playBreathe); 
balcony4 = createButton('balcony'); 
balcony4.position(windowWidth*0.332, windowHeight*0.8);
balcony4.mousePressed(playRepeat);
}
function playEnter(){
if ( enter.isPlaying() ) { 
enter.stop();
} else {
enter.play();
}   
}
function playDinner(){
if ( dinner.isPlaying() ) { 
dinner.stop();
} else {
dinner.play();
}  
}
function playFungsui(){
if ( fungsui.isPlaying() ) { 
fungsui.stop();
} else {
fungsui.play();
}
}
function playAccident(){
if ( accident.isPlaying() ) { 
accident.stop();
} else {
accident.play();
}
}
function playHide(){
if ( hide.isPlaying() ) { 
hide.stop();
} else {
hide.play();
}
}
function playIntruder(){
if ( intruder.isPlaying() ) { 
intruder.stop();
} else {
intruder.play();
}
}
function playJealous(){
if ( jealous.isPlaying() ) { 
jealous.stop();
} else {
jealous.play();
}
}
function playRepeat(){
if ( repeat.isPlaying() ) { 
repeat.stop();
} else {
repeat.play();
}
}
function playMoon(){
if ( moon.isPlaying() ) { 
moon.stop();
} else {
moon.play();
}
}
function playSecret(){
if ( secret.isPlaying() ) { 
secret.stop();
} else {
secret.play();
}
}
function playSpeak(){
if ( speak.isPlaying() ) { 
speak.stop();
} else {
speak.play();
}
}
function playStories(){
if ( stories.isPlaying() ) { 
stories.stop();
} else {
stories.play();
}
}
function playSunset(){
if ( sunset.isPlaying() ) { 
sunset.stop();
} else {
sunset.play();
}
}
function playOurs(){
if ( ours.isPlaying() ) { 
ours.stop();
} else {
ours.play();
}
}
function playBreathe(){
if ( breathe.isPlaying() ) { 
breathe.stop();
} else {
breathe.play();
}   
}
function playLaugh(){
if ( laugh.isPlaying() ) { 
laugh.stop();
} else {
laugh.play();
}  
}
function playDown(){
if ( down.isPlaying() ) { 
down.stop();
} else {
down.play();
}  
}
function playWalk(){
if ( walk.isPlaying() ) { 
walk.stop();
} else {
walk.play();
}  
}
function playGhost(){
if ( ghost.isPlaying() ) { 
ghost.stop();
} else {
ghost.play();
}
}
function playBathe(){
if ( bathe.isPlaying() ) { 
bathe.stop();
} else {
bathe.play();
}  
}
function playUp(){
if ( up.isPlaying() ) { 
up.stop();
} else {
up.play();
}
}
function playUnderwater(){
if ( underwater.isPlaying() ) { 
underwater.stop();
} else {
underwater.play();
}
}
function playKettle(){
if ( kettle.isPlaying() ) { 
kettle.stop();
} else {
kettle.play();
}
}
function playIron(){
if ( iron.isPlaying() ) { 
iron.stop();
} else {
iron.play();
}
}
function playFlap(){
if ( flap.isPlaying() ) { 
flap.stop();
} else {
flap.play();
}
}
let mic;
let ripple;
function preload() {
ripple = loadImage("ripple.png");
}
function setup() {
createCanvas(800, 800);
mic = new p5.AudioIn()
mic.start();
}
function draw() {
background(255);
let vol = mic.getLevel();
let x = random(width / 2 - vol*30, width / 2 + vol*30);
let y = constrain(height - vol * height * 5, 0, height);
ripple.loadPixels();
for (var i = 0; i < ripple.pixels.length; i++) {
ripple.pixels[i] *= 1.0;
}
ripple.updatePixels();
imageMode(CENTER);
image(ripple, width / 2, height / 2, 800, 800);
let mic;
let ghost; 
function preload() {
}
function setup() {
createCanvas(windowWidth, windowHeight);
mic = new p5.AudioIn()
mic.start();
}
function draw() {
background(255);
let vol = mic.getLevel();
let x = random(width / 2 - vol*100, width / 2 + vol*100);
let y = constrain(height - vol * height * 5, 0, height);
tint(201, 232, 149, vol*1000);
}var mic;
function setup(){
mic = new p5.AudioIn()
mic.start();
}
function draw(){
background(0);
micLevel = mic.getLevel();
ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);
}var mic;
function setup(){
mic = new p5.AudioIn()
mic.start();
}
function draw(){
background(0);
micLevel = mic.getLevel();
ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);
}let keywords = ['it was painted', 'I heard stories about my neighborhood', 'perhaps they were occupied by the ghosts of the people'];
let audio = [];
let justPlayed = false;
let currentSong = -1;
let myRec = new p5.SpeechRec();
myRec.continuous = true;
function preload() {
audio[0] = loadSound('drowning.wav');
audio[1] = loadSound('noise.wav');
audio[2] = loadSound('lake.wav');
}
function setup() {
noCanvas();
myRec.onResult = showResult;
myRec.start();
}
function showResult() {
if (myRec.resultValue == true) {
for (let i = 0; i < keywords.length; i++) {
if (myRec.resultString == keywords[i]) {
audio[i].play();
justPlayed = true;
}
}
}
console.log(myRec.resultString);
}let diamondRing;
let spk;
let keywords = ['she', 'shine', 'love', 'Diamond'];
let songs = [];
let justPlayed = false;
let amp;
let currentSong = -1;
let myRec = new p5.SpeechRec(); 
myRec.continuous = true;
function preload() {
diamondRing = loadImage('assets/diamondring.png');
songs[0] = loadSound('assets/She.mp3');
songs[1] = loadSound('assets/shine.mp3');
songs[2] = loadSound('assets/love.mp3');
songs[3] = loadSound('assets/Diamond.mp3');
}
function setup() { 
createCanvas(600, 600);
amp = new p5.Amplitude();
myRec.onResult = showResult;
myRec.start();
} 
function draw() { 
background(255, 255, 255);
imageMode(CENTER);
image(diamondRing, width/2, height*0.45);
fill(0);
noStroke();
ellipse(width*0.4, height/2, 20, 20);
ellipse(width*0.6, height/2, 20, 20);
textSize(20);
textAlign(CENTER);
text("Say \'She\', \'Shine\', \'Love\', or \'Diamond\'", width/2, height*0.9);
let vol = amp.getLevel();
fill(255, 0, 0);
noStroke();
ellipse(width/2, height*0.65, 200, vol*300); 
}
function showResult()
{
if(myRec.resultValue==true) {
for(let i=0; i<keywords.length; i++) {
if(myRec.resultString == keywords[i]) {
songs[i].play();
justPlayed = true;
}
}
}
console.log(myRec.resultString);
}var mic;
function setup() {
createCanvas(200, 200);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(0);
var vol = mic.getLevel();
ellipse(100, 100, 200, vol * 200);
}let vid1; 
let vid2; 
function setup() {
createCanvas(800, 500);
vid1 = createVideo('videos/pool2.mp4');
vid2 = createVideo('videos/pool3.mp4');
vid1.play();
vid2.play();
vid1.hide();
vid2.hide();
}
function draw() {
background(0);
image(vid1, 0, 0, width, height);
image(vid2, 50, 50, 200, 100);
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
let latestData; 
let lefteye; 
let righteye; 
let nose; 
let mouth; 
let song;
function setup() { 
createCanvas(700, 700);
} 
function preload() {
lefteye = loadImage('images/lefteye.png');
righteye = loadImage('images/righteye.png');
nose = loadImage('images/nose.png');
mouth = loadImage('images/mouth.png');
}
function gotData() {
trim(currentString);
console.log(");
latestData = currentString;
}
function draw() { 
background(0);   
imageMode(CENTER);
let mappedVar = map(latestData,300,500,0,150);
let v = mappedVar;
image(lefteye,width/2-150+(v/8),height/2-150,v,v);
image(righteye,width/2+150-(v/8),height/2-150,v,v); 
image(nose,width/2,height/2-40,v+50,v+50);
translate(10); 
rotate(radians(frameCount%10)); 
image(mouth,width/2-v/2,height/2+100,400,200);
}
let latestData; 
let lefteye; 
let righteye; 
let nose; 
let mouth; 
let song;
function setup() { 
createCanvas(700, 700);
} 
function preload() {
lefteye = loadImage('images/lefteye.png');
righteye = loadImage('images/righteye.png');
nose = loadImage('images/nose.png');
mouth = loadImage('images/mouth.png');
}
function gotData() {
trim(currentString);
console.log(");
latestData = currentString;
}
function draw() { 
background(0);   
imageMode(CENTER);
let mappedVar = map(latestData,300,500,0,150);
let v = mappedVar;
image(lefteye,width/2-150+(v/8),height/2-150,v,v);
image(righteye,width/2+150-(v/8),height/2-150,v,v); 
image(nose,width/2,height/2-40,v+50,v+50);
translate(10); 
rotate(radians(frameCount%10)); 
image(mouth,width/2-v/2,height/2+100,400,200);
}
function preload() {
data = loadJSON("artists.json");
}
function setup() {
createCanvas(400,400); 
}
function draw(){
fill(0); 
text(data.DisplayName, random(width), random(height));
}let data;
function preload() {
data = loadJSON("herbsnspices.json");
}
function setup() {
createCanvas(700, 700);
background(0);
let herbs = data.herbs;
for (let i = 0; i < herbs.length; i++) {
text(herbs[i], random(width), random(height));
textSize(16);
fill(162, 241, 126);
}
let spices = data.spices;
for (let i = 0; i < spices.length; i++) {
text(spices[i], random(width), random(height));
textSize(16);
fill(241, 129, 41);
}
}
function setup() {
loadJSON("Artists.json", gotData);
createCanvas(800,800); 
}
function gotData(data) {
background(255); 
for (let i=0; i<data.length; i++){ 
text(data[i].DisplayName, 30, random(height)); 
}
}
let latestData; 
let lefteye; 
let righteye; 
let nose; 
let mouth; 
let song;
let playing = 0; 
function setup() { 
createCanvas(700, 700);
song.loop(); 
if (latestData < 70) { 
song.pause(); 
playing = 0; 
}
else {
if (playing == 0){
song.play(); 
playing = 1; 
}
}
} 
function preload() {
lefteye = loadImage('images/lefteye.png');
righteye = loadImage('images/righteye.png');
nose = loadImage('images/nose.png');
mouth = loadImage('images/mouth.png');
song = loadSound('pumpkinsong.mp3');
}
function gotData() {
trim(currentString);
if (!currentString) return;
latestData = currentString;
}
function draw() { 
background(0);   
imageMode(CENTER);
let mappedVar = map(latestData,30,150,100,0);
let v = mappedVar;
image(lefteye,width/2-150+(v/8),height/2-150,v,v);
image(righteye,width/2+150-(v/8),height/2-150,v,v); 
image(nose,width/2,height/2-40,v+50,v+50);
translate(10); 
rotate(radians(frameCount%10)); 
image(mouth,width/2+v/2,height/2+100,400,200);
}
function setup() {
}
function draw() {
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
if (inString.length > 0 ) {
}
}
}
Introduction to Physical Computing
ITP
This sketch will send 2 values as ascii from P5 to arduino
See arduino code in bottom, have LED connected to pin 3 and 5
function setup() {
createCanvas(255, 255);
}
function draw() {
background(0,0,255);
var firstValueToSend = mouseX;
var secondValueToSend = mouseY;
}
for (var i = 0; i < portList.length; i++) {
}
}
}
void setup() {
}
void loop() {
analogWrite(3, firstValue);
analogWrite(5, secondValue);   
}
}
Introduction to Physical Computing
ITP
This sketch will send 2 values in ascii from arduino to P5
function setup() {
createCanvas(320, 240);
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
}
}
}
}
void setup() {
}
void loop() {
int valueToSend = analogRead(A0)/4;
valueToSend = analogRead(A1)/4;
delay (10);
}
Introduction to Physical Computing
ITP
This sketch will send one value as ascii from P5 to arduino
See arduino code in bottom, have LED connected to pin 3
function setup() {
createCanvas(255, 255);
}
function draw() {
background(0,0,255);
var valueToSend = mouseX;
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
Introduction to Physical Computing
ITP
This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3
var Capture;
function setup() {
createCanvas(320, 240);
Capture= createCapture(VIDEO);
Capture.size(320, 240);
Capture.hide();
}
function draw() {
image(Capture,0,0);
var c = get(mouseX, mouseY);
var b = int(  brightness(c)   );
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
Introduction to Physical Computing
ITP
This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3
function setup() {
createCanvas(255, 255);
}
function draw() {
background(255,0,0);
let byToSend = map (mouseX,0,255); 
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
Introduction to Physical Computing
ITP
This sketch will send one value in ascii from arduino to P5
function setup() {
createCanvas(320, 240);
}
function draw() {
background(255);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
}
void setup() {
}
void loop() {
int analogValue = analogRead(A0);
delay(50);
}
Introduction to Physical Computing
ITP
This sketch will send one binary byte from arduino to P5
var posX = 0,
posY = 0,
step = 10;
function setup() {
createCanvas(320, 240);
}
function draw() {
posX += step;
if (posX > width) {
posX = 0;
posY += step;
if (posY > height) posY = 0;
}
rect(posX, posY, step, step);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
void setup() {
}
void loop() {
int analogValue = analogRead(A0);
byte byteToSend = map (analogValue, 0, 1023, 0, 255);
delay(50);
}
let latestData;
let paws = [];
let img;
function preload() {
img = loadImage('images/preppedfish.png');
}
function setup() {
createCanvas(600, 300);
for (let i = 0; i < 2; i++) {
paws.push(new Paw(random(0, width), random(height - 20, height), random(0, 0), random(-5, 5)));
}
}
function gotData() {
trim(currentString);
console.log(currentString);
latestData = currentString;
}
function draw() {
background(120, 189, 226);
let mappedVar = map(latestData, 400, 950, 0, width);
let v = latestData;
if (v > width / 3) {
fill(0);
textSize(30);
text("Gimme your food hooman!", 10, 50);
}
image(img, v, 40, 400, 150);
table();
for (let i = 0; i < 2; i++) {
paws[i].displayOrange();
paws[i].displayGrey();
paws[i].move();
}
}
function reach(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function table() {
rectMode(CENTER);
fill(225, 153, 81);
rect(width / 2, height / 2 + 40, width, 30);
rectMode(CENTER);
fill(150, 98, 54);
rect(width / 2, height - 90, width, 30);
fill(68, 44, 24);
rect(width / 2, height - 40, width, 80);
}function setup() { 
createCanvas(400, 400);
let a = 10; 
let b = 20; 
let c = calculator (a,b); 
console.log (a + "+" + b + "=" + c); 
} 
function draw() { 
background(220);
}
function calculator(a,b) {
return a+b; 
let latestData = "waiting for data";
function setup() { 
createCanvas(600, 600);
noFill();
strokeWeight(10);
} 
function gotData() {
}
function draw() { 
background(127, 0, 127);
let mappedVar = map(latestData,400,950,0,width); 
let v = latestData; 
let origV = v;
ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
v+=random(-5, 5);
bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
function setup() {
createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
background(255, 255, 255);
fill(0, 0, 0);
var mappedVar = map(latestData, 400, 950, 0, width);
ellipse(mappedVar, 100, 50, 50);
text(latestData, 10, 10);
let img; 
let slider; 
let button; 
let bgcolor; 
function setup() { 
canvas = createCanvas(800, 700);
slider = createSlider(290,320,305); 
bgcolor = color(255, 240, 60); 
canvas.mouseOver(changeColor); 
canvas.mouseOut(reverseColor);
button = createButton("snap"); 
button.mousePressed(newFile); 
} 
function draw() { 
background(bgcolor);
slider.position(width/2-50,7*height/8-20); 
button.position(width/2-5, 7*height/8+20); 
noStroke(); 
fill(0); 
rectMode(CENTER); 
rect(width/2,height/2,600,400,20); 
noStroke(); 
fill(255,255,255); 
rectMode(CENTER); 
rect(width-190,height/3-30,70,52,10);
noStroke(); 
fill(0); 
rect(width/2,height/4-20,150,80,20); 
noStroke(); 
fill(0); 
rect(width/2-230,height/4-25,40,40,5); 
imageMode(CENTER); 
image(img,width/2,height/2,270,270); 
strokeWeight(80); 
stroke(0); 
noFill(); 
ellipse(width/2,height/2,slider.value());
strokeWeight(10); 
stroke(255,255,255); 
noFill(); 
ellipse(width/2,height/2,320); 
}
function newFile(){
let r = random (0,500); 
createP("LeoTheExtraLongCorgi_" + floor(r,r,0,500) + ".jpg"); 
}
function changeColor() {
bgcolor = color(255, 153, 60); 
}
function reverseColor() {
bgcolor = color(255, 240, 60); 
}
function preload() {
img = loadImage('leo.jpg');
}let img; 
let slider; 
function setup() { 
createCanvas(800, 700);
slider = createSlider(0,100,50); 
} 
function draw() { 
background(220);
image(img,sliderV\alue(),0, 1300, 800); 
}
function preload() {
img = loadImage('watergate.jpg');
function setup() {
createCanvas(500,500); 
background(0);
}
function draw(){
fill(255,10); 
noStroke();
}
function serverConnected() {
}
function portOpen() {
}
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}let paws = [];
let img;
function preload() {
img = loadImage('images/preppedfish.png');
}
function setup() {
createCanvas(600, 300);
for (let i = 0; i < 2; i++) {
paws.push(new Paw(random(0, width), random(height - 20, height), random(0, 0), random(-3, 5)));
}
}
function draw() {
background(120, 189, 226);
image(img, 100, 40, 400, 150);
table();
for (let i = 0; i < 2; i++) {
paws[i].displayOrange();
paws[i].displayGrey();
paws[i].move();
if (paws[i].touch) {
paws[i].isBad();
}
}
}
function reach(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function table() {
rectMode(CENTER);
fill(225, 153, 81);
rect(width / 2, height / 2 + 40, width, 30);
rectMode(CENTER);
fill(150, 98, 54);
rect(width / 2, height - 90, width, 30);
fill(68, 44, 24);
rect(width / 2, height - 40, width, 80);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}let balls = [];
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 10; i++) {
balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
}
}
function draw() {
background(0);
for (let b = 0; b < balls.length; b++) {
balls[b].run();
for (let c = 0; c < balls.length; c++) {
if (b==c) continue; 
if (b!=c && balls[b].isNear(balls[c])) {
balls[b].turnRed();
}
}
}
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}let ball = []; 
function setup() { 
createCanvas(400, 400);
for (let i = 0; i < 2; i++) {
ball.push(new Ball(random(width), random(height), 3,2)); 
}
} 
function draw() { 
background(0);
for (let i = 0; i < ball.length; i++) {
ball[i].run();
}
}
function bounce(pos, speed, low, high) {
if (pos < low || pos > high) {
speed *= -1;
}
return speed;
}let ball = []; 
function setup() { 
createCanvas(400, 400);
for (let i = 0; i < 2; i++) {
ball.push(new Ball(random(width), random(height), 3,2)); 
}
} 
function draw() { 
background(0);
for (let i = 0; i < ball.length; i++) {
ball[i].run();
}
}
function bounce(pos, speed, low, high) {
if (pos < low || pos > high) {
speed *= -1;
}
return speed;
}let balls = [];
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 20; i++) {
balls.push(new Ball(random(width), random(height), random(-3, 3), random(-3, 3)));
}
}
function draw() {
background(0);
for (let b = balls.length-1; b>=0 ; b--) {
if(!balls[b]) continue; 
balls[b].run();
for (let c = balls.length-1; c>=0; c--) {
if (b==c) continue; 
if (balls[b].isNear(balls[c])) {
balls.splice(b,1);
balls.splice(c,1);
break; 
}
}
}
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}let bubbles = [];
function setup() {
createCanvas(600, 400);
for (var i = 0; i < 5; i++) {
bubbles[i] = new Bubble(random(width), random(height));
}
}
function draw() {
background(0);
for (var i = 0; i < bubbles.length; i++) {
bubbles[i].update();
bubbles[i].display();
for (var j = 0; j < bubbles.length; j++) {
if (i != j && bubbles[i].intersects(bubbles[j])) {
bubbles[i].changeColor();
bubbles[j].changeColor();
}
}
}
}let bubbles = [];
function setup() {
createCanvas(600, 400);
}
function mouseDragged() {
bubbles.push(new Bubble(mouseX, mouseY));
}
function draw() {
background(0);
for (var i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].display();
if (bubbles.length > 50) {
bubbles.splice(0, 1);
}
}
}
function Bubble(x, y) {
this.x = x;
this.y = y;
this.display = function() {
stroke(255);
fill(255, 0, 150, 50);
ellipse(this.x, this.y, 24, 24);
}
this.move = function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}let ball = []; 
function setup() { 
createCanvas(400, 400);
for (let i = 0; i < 10; i++) {
ball.push(new Ball(random(width), random(height), 3,2)); 
}
} 
function draw() { 
background(0);
for (let i = 0; i < ball.length; i++) {
ball[i].run();
}
}
function bounce(pos, speed, low, high) {
if (pos < low || pos > high) {
speed *= -1;
}
return speed;
}let positions = [];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
positions.push({x:mouseX, y:mouseY});
if(positions.length>500) positions.shift(); 
for (let i = 0; i < frameCount; i++) {
let x = positions[i].x; 
let y = positions[i].y; 
ellipse(x, y, 50, 50);
}
}let ball1; 
let ball2; 
function setup() { 
createCanvas(400, 400);
ball1=new Ball(random(width),random(height),3,2); 
ball2=new Ball(random(width),random(height),3,2);
} 
function draw() { 
background(220);
ball1.run(); 
ball2.run(); 
}
function bounce(pos, speed, low, high) {
if (pos < low || pos > high) {
speed *= -1;
}
return speed;
}let x,y,xspeed,yspeed;
let x1,y1,x2,y2; 
function setup() { 
createCanvas(400, 400);
x = width/2;
y = height/2;
xspeed = 3;
yspeed = 2;
x1=width/2; 
y1=height/2; 
x2=width/4; 
y2=height/4;
} 
function draw() { 
background(220);
update(x1,y1,xspeed,yspeed); 
update(x2,y,xspeed,yspeed);
display(x1,y1); 
display(x2,y2); 
}
function update(x,xspeed,y,yspeed){
xspeed=bounce(x,xspeed,0,width); 
x += xspeed;
yspeed=bounce(y,yspeed,0,height);
y += yspeed;
}
function display(x,y){
ellipse (x,y, 50, 50); 
}
function bounce(pos, speed, low, high) {
if (pos < low || pos > high) {
speed *= -1;
}
return speed;
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}let x; 
let y; 
let xspeed;
let yspeed; 
function setup() {
createCanvas(400, 400);
y = height / 2;
x = width / 2;
xspeed = 5;
yspeed = -3;
}
function draw() {
background(0);
xspeed = bounce(xspeed, x, 0, width);
yspeed = bounce(yspeed, y, 0, height);
y += yspeed;
x += xspeed;
fill(255,0,0); 
ellipse(x, y, 40, 40);
}
function bounce(speed, x, min, max) {
if (x < min || x > max) {
speed *= -1;
}
return speed;
}
let 
let xspeed, \\yspeed, x, y;
function setup() {
createCanvas(400, 400);
y = height / 2;
x = width / 2;
xspeed = 1;
yspeed = -2;
}
function draw() {
background(220);
xspeed = bounce(xspeed, x, 0, width);
yspeed = bounce(yspeed, y, 0, height);
y += yspeed;
x += xspeed;
ellipse(x, y, 50, 50);
}
function bounce(speed, x, min, max) {
if (x < min || x > max) {
speed *= -1;
}
return speed;
}
let x;
let y;
function setup() {
createCanvas(400, 400);
x = width / 2;
y = height / 2;
xspeed = 5;
yspeed = -1;
}
function draw() {
background(0);
xspeed = bounce(xspeed, x, 0, width);
yspeed = bounce(yspeed, y, 0, height);
y += yspeed;
x += xspeed;
fill(255,0,0); 
ellipse(x, y, 30, 30);
fill(0,0,255); 
ellipse(x+1, y*2, 50, 50);
}
function bounce(speed, x, min, max) {
if (x < min || x > max) {
speed *= -1; 
}
return speed;
}let ch;
let cw; 
let numCol = 10;
let numRow = 5;
function setup() { 
createCanvas(400, 600);
ch = height/numRow;
cw = width/numCol;
} 
function draw() { 
background(220);
for(let i = 0; i < numCol; i++) {
x = i * cw;
for(let j = 0; j < numRow; j++) {
y = j * ch;
rect(x, y, cw, ch);
}
}
}let bubbles = [];
let fishcolor = [236, 136, 173];
function Bubble() {
this.x = random(0, width);
this.y = random(height, 0);
this.i = random(0, width);
this.j = random(height, 0);
this.display = function() {
noStroke();
fill(260);
ellipse(this.x, this.y, 20);
noStroke();
fill(260, 60);
ellipse(this.i, this.j, 28);
}
this.move = function() {
this.x = this.x;
this.y = this.y - 1;
this.i = this.i;
this.j = this.j - 1;
}
}
function fish(x, y, d) {
fill(fishcolor);
noStroke();
ellipse(x, y, d * 10, d * 6);
fill(fishcolor);
noStroke();
triangle(x + 50, y, x + 90, y - 30, x + 90, y + 30);
fill(0, 0, 0);
noStroke();
ellipse(x - 30, y - 5, d, d);
}
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 25; i++) {
bubbles[i] = new Bubble();
}
}
function draw() {
background(116, 187, 227);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].display();
}
for (let x = 0; x < width; x += 20) {
for (let y = 0; y < height; y += 20) {
triangle(x, y + 400, x + 10, y + 330, x + 20, y + 400);
fill(55, 143, 80);
noStroke();
}
}
fish(mouseX, mouseY, 10);
}
function mousePressed() {
fishcolor = random(255, 0, 0);
}let bubbles = [];
function setup() {
createCanvas(600, 400);
for (let i = 0; i < 400; i++) {
bubbles[i] = new Bubble();
}
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].display();
}
}
function Bubble() {
this.x = random(0, width);
this.y = random(0, height);
this.display = function() {
stroke(255);
strokeWeight(4);
noFill();
ellipse(this.x, this.y, 24, 24)
}
this.move = function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
function setup() {
createCanvas(600, 400);
for (let i = 0; i < 400; i++) {
bubbles[i] = {
x: random(0, width),
y: random(0, height),
display: function() {
stroke(255);
strokeWeight(4);
noFill();
ellipse(this.x, this.y, 24, 24);
},
move: function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
}
}
function draw() {
background(0);
for (let i = 0; i < 400; i++){
bubbles[i].move();
bubbles[i].display();
}
} let nums = [100, 25, 46, 72];
function setup() {
createCanvas(500, 400);
}
function draw() {
background(0);
for (let i = 0; i < 4; i++) {
stroke(255); 
fill(51); 
ellipse(i*100+100, 200, nums[i], nums[i]);
}
}let words = ["techno", "house", "disco", "soul"]; 
let index = 0; 
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
fill(255); 
textSize(32); 
text(words[index], 150, 200); 
}
function mousePressed() {
index = index + 1; 
if (index == words.length){
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
ellipse(200, 200, nums[2], nums[2]);  
}let x;
let y;
let xspeed;
let yspeed;
function setup() {
createCanvas(400, 400);
x = width / 2;
y = height / 2;
xspeed = 1;
yspeed = 1;
}
function draw() {
background(220);
xspeed = bounce(x, xspeed, 0, width);
yspeed = bounce(y, yspeed, 0, height);
y += yspeed;
x += xspeed;
ellipse(x, y, 20, 20);
}
function bounce(loc, speed, bottom, top) {
if (loc < bottom || loc > top) {
}
return speed;
}let x; 
let y; 
let w; 
let h; 
numCols = 10; 
function setup() { 
createCanvas(400, 400);
x=width/numCols;
y=0
w=width/numCols; 
h=height
} 
function draw() { 
background(220);
for (i
}let h;
let w;
let cw;
let rh;
let numCols = 10;
let numRows = 5;
function setup() {
createCanvas(400, 400);
cw = width / numCols;
rh = height / numRows;
for (let cn = 0; cn < numCols; cn++) {
for (let rn = 0; rn < numRows; rn++) {
let y = rn * rh;
fill(0, 0, 255);
rect(x, y, cw, rh);
}
}
}
let w; 
let cw; 
let ch; 
let numCols = 200; 
function setup() { 
createCanvas(400, 400);
cw=width/numCols; 
ch=height; 
for (let x =0; x<width; x+=cw){
rect(x, 0, cw, ch); 
} 
}
\
function draw() { 
background(220);
}let h; 
let w; 
let cw; 
let ch; 
let numCols = 200; 
function setup() { 
createCanvas(400, 400);
cw=width/numCols; 
ch=height; 
for (let x =0; x<width; x+=cw){
rect(x, 0, cw, ch); 
} 
}
\
function draw() { 
background(220);
}let bubble = {
x: 200,
y: 150,
display: function() {
stroke(255);
strokeWeight(4);
noFill();
ellipse(this.x, this.y, 24, 24);
},
move: function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
bubble.move();
bubble.display();
}function setup() { 
let km =milesToKm(26.3);
let km2 = milesToKm(100); 
} 
function milesToKm(miles) { 
let km = miles*1.6;
return km; 
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
lollipop(100, 100, 50); 
lollipop(200, 50, 50); 
}
function lollipop (x, y, diameter){
fill (0, 200, 255); 
rect(x-10, y, 20, 150); 
fill(255, 0, 200); 
ellipse(x,y,diameter, diameter); 
} let ball = {
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
function move(){
ball.x = ball.x + ball.xspeed;
ball.y = ball.y + ball.yspeed;
} 
function bounce(){
if (ball.x > width || ball.x < 0) {
ball.xspeed = ball.xspeed * -1;
}
if (ball.y > height || ball.y < 0) {
ball.yspeed = ball.yspeed * -1; 
}
}
function display(){
stroke(255);
strokeWeight(4);
noFill();
ellipse(ball.x, ball.y, 24, 24);
}
let bright0;
let bright1;
let bright2;
let bright3;
let bright4;
let bright5;
let bright6;
let bright7;
let bright8;
let bright9;
let bright10;
let alpha0;
let alpha1;
let alpha2;
let alpha3;
let alpha4;
let alpha5;
let alpha6;
let alpha7;
let alpha8;
let alpha9;
let alpha10;
function setup() {
createCanvas(500, 360);
d = 25;
alpha0 = 0;
alpha1 = 0;
alpha2 = 0;
alpha3 = 0;
alpha4 = 0;
alpha5 = 0;
alpha6 = 0;
alpha7 = 0;
alpha8 = 0;
alpha9 = 0;
alpha10 = 0;
}
function draw() {
bright0 = color(247, 105, 128, alpha0);
bright1 = color(255, 0, 0, alpha1);
bright2 = color(247, 105, 64, alpha2);
bright3 = color(247, 164, 41, alpha3);
bright4 = color(247, 215, 80, alpha4);
bright5 = color(159, 219, 41, alpha5);
bright6 = color(53, 172, 55, alpha6);
bright7 = color(53, 172, 157, alpha7);
bright8 = color(67, 156, 206, alpha8);
bright9 = color(51, 110, 212, alpha9);
bright10 = color(105, 89, 212, alpha10);
background(255);
if (mouseY <= height / 10) {
alpha0 = 200;
} else if (mouseY > height / 10 && mouseY <= 2 * height / 10) {
alpha1 = 200;
} else if (mouseY > 2 * height / 10 && mouseY <= 3 * height / 10) {
alpha2 = 200;
} else if (mouseY > 3 * height / 10 && mouseY <= 4 * height / 10) {
alpha3 = 200;
} else if (mouseY > 4 * height / 10 && mouseY <= 5 * height / 10) {
alpha4 = 200;
} else if (mouseY > 5 * height / 10 && mouseY <= 6 * height / 10) {
alpha5 = 200;
} else if (mouseY > 6 * height / 10 && mouseY <= 7 * height / 10) {
alpha6 = 200;
} else if (mouseY > 7 * height / 10 && mouseY <= 8 * height / 10) {
alpha7 = 200;
} else if (mouseY > 8 * height / 10 && mouseY <= 9 * height / 10) {
alpha8 = 200;
} else if (mouseY > 9 * height / 10 && mouseY <= 10 * height / 10) {
alpha9 = 200;
} else if (mouseY > 10 * height / 10 && mouseY <= 11 * height / 10) {
alpha10 = 200;
}
alpha0 = alpha0 - 2;
alpha1 = alpha1 - 2;
alpha2 = alpha2 - 2;
alpha3 = alpha3 - 2;
alpha4 = alpha4 - 2;
alpha5 = alpha5 - 2;
alpha6 = alpha6 - 2;
alpha7 = alpha7 - 2;
alpha8 = alpha8 - 2;
alpha9 = alpha9 - 2;
alpha10 = alpha10 - 2;
for (let i = 0; i <= 14; i++) {
noStroke();
fill(bright0);
ellipse(i * 40, 0, d);
fill(bright1);
ellipse(i * 40, 36, d);
fill(bright2);
ellipse(i * 40, 72, d);
fill(bright3);
ellipse(i * 40, 108, d, d);
fill(bright4);
ellipse(i * 40, 144, d, d);
fill(bright5);
ellipse(i * 40, 180, d, d);
fill(bright6);
ellipse(i * 40, 216, d, d);
fill(bright7);
ellipse(i * 40, 252, d, d);
fill(bright8);
ellipse(i * 40, 288, d, d);
fill(bright9);
ellipse(i * 40, 324, d, d);
fill(bright10);
ellipse(i * 40, 360, d, d);
}
}let isOn = false;
let isEntered = false;
function setup() {
createCanvas(600, 400);
}
function draw() {
background(255);
noStroke();
if (isOn) {
fill(255, 0, 0);
rect(0, 0, width / 7, height);
}
if (mouseX < width / 7) {
if (pmouseX > width / 7) {
isOn = !isOn;
}
} else if (mouseX <= 2 * width / 7) {
fill(255, 134, 42)
rect(width / 7, 0, width / 7, height);
hasLeft = true;
} else if (mouseX <= 3 * width / 7) {
fill(255, 242, 42)
rect(2 * width / 7, 0, width / 7, height);
hasLeft = true;
} else if (mouseX <= 4 * width / 7) {
fill(72, 203, 47)
rect(3 * width / 7, 0, width / 7, height);
hasLeft = true;
} else if (mouseX <= 5 * width / 7) {
fill(70, 168, 211)
rect(4 * width / 7, 0, width / 7, height);
hasLeft = true;
} else if (mouseX <= 6 * width / 7) {
fill(53, 84, 218)
rect(5 * width / 7, 0, width / 7, height);
hasLeft = true;
} else if (mouseX <= width) {
fill(134, 28, 255)
rect(6 * width / 7, 0, width / 7, height);
hasLeft = true;
}
}function setup() { 
createCanvas(600, 600);
fill(255); 
stroke(102); 
} 
function draw() { 
background(0);
for (let x=0; x<=width; x+=10){
for (let y=0; y<=height; y+=10){
ellipse(x,y,4,4); 
line(x,y,300, 300); 
}
}
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
strokeWeight(4);
stroke(255);
for (let x = 0; x <= mouseX; x += 50) {
for (let y = 0; y <= height; y += 50) {
fill(random(255), 0, random(255));
ellipse(x, y, 25, 25);
}
}
}let a = 0; 
function setup() { 
createCanvas(400, 400);
angleMode(DEGREES); 
} 
function draw() { 
background(220);
push(); 
translate(150, 150); 
scale(1, 5); 
rotate(a+=2); 
rect(0, 0, 100, 100); 
pop(0); 
}let isOn = false; 
let isEntered = false; 
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
fill(255, 0, 0); 
noStroke()
if (isOn) {
rect(0, 0, width, height); 
}
if (mouseX < width/3) {
if(pmousex > width/3) {
isEntered = true; 
isOn=|isOn; 
console.log("ENTERED
}
isOn = true; 
}
else {
rect(2*width/3, 0, width/3, height); 
}
}let x;
let xspeed;
let JustHitRightWall;
function setup() {
createCanvas(400, 400);
x = width / 2
}
function draw() {
background(220);
if (x > width || x < 0) {
xspeed += -1;
}
x += xspeed;
console.log(x)
ellipse(x, height / 2, 50, 50)
}let x; 
let JustHitRightWall; 
function setup() { 
createCanvas(400, 400);
x = width/2
} 
function draw() { 
background(220);
if(x>width) JustHitRightWall = true; 
else if(x<0) JustHitRightWall = false; 
if (JustHitRightWall){
x--; 
}
else{
x++; 
}
console.log(x) 
ellipse (x, height/2, 50, 50)
}let x; 
let y;  
let r = 116; 
let g = 187;  
let b = 277; 
function setup() { 
createCanvas(400, 400) 
} 
function draw() { 
let fr = frameRate (10)
background (r, g, b); 
r = random (116, 200); 
g = random (187, 200); 
b = random (250, 280); 
fill(55, 143, 80); 
noStroke(); 
triangle(0, 400, 10, 330, 20, 400);
triangle(20, 400, 30, 330, 40, 400);
triangle(40, 400, 50, 330, 60, 400);
triangle(60, 400, 70, 330, 80, 400);
triangle(80, 400, 90, 330, 100, 400);
triangle(100, 400, 110, 330, 120, 400);
triangle(120, 400, 130, 330, 140, 400);
triangle(140, 400, 150, 330, 160, 400);
triangle(160, 400, 170, 330, 180, 400);
triangle(180, 400, 190, 330, 200, 400);
triangle(200, 400, 210, 330, 220, 400);
triangle(220, 400, 230, 330, 240, 400);
triangle(240, 400, 250, 330, 260, 400);
triangle(260, 400, 270, 330, 280, 400);
triangle(280, 400, 290, 330, 300, 400);
triangle(300, 400, 310, 330, 320, 400);
triangle(320, 400, 330, 330, 340, 400);
triangle(340, 400, 350, 330, 360, 400);
triangle(360, 400, 370, 330, 380, 400);
triangle(380, 400, 390, 330, 400, 400);
fill(236, 136, 173);
noStroke(); 
ellipse(x+200, y+200, 100, 60); 
fill(236, 136, 173); 
noStroke(); 
triangle(x+250, y+200, x+290, y+170, x+290, y+230); 
fill(0,0,0);
noStroke(); 
ellipse(x+170, y+195, 10, 10); 
x=map(mouseX,0, 400, -400, 400); 
y=map(mouseY, 0, 400, -400, 400); 
if (mouseIsPressed) {
fill(260);
noStroke(); 
ellipse(x+140, y+190, 15, 15,); 
fill(260);
noStroke(); 
ellipse(x+125, y+160, 18, 18); 
fill(260);
noStroke(); 
ellipse(x+120, y+130, 22, 22); 
fill(260);
noStroke(); 
ellipse(x+100, y+110, 25, 25); 
fill(260);
noStroke(); 
ellipse(x+90, y+70, 33, 33);   
fill(260);
noStroke(); 
ellipse(x+97, y+30, 38, 38); 
} 
}let x; 
let y; 
let xspeed; 
let yspeed; 
function setup() { 
createCanvas(400, 400);
x = width/2
y = height/2
xspeed = -1; 
yspeed = 0.5*xspeed; 
} 
function draw() { 
background(220);
ellipse(x, y, 50, 50); 
x+=xspeed; 
y+=yspeed; 
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
let speed = dist (mouseX, mouseY, pmouseX, pmouseY); 
let sw = map(speed, 0, 500, 10, 0); 
strokeWeight(sw); 
stroke(0, 255, 255, 50); 
line(mouseX, mouseY, pmouseX, pmouseY); 
}
function mousePressed() { 
background(255); 
} function setup() { 
createCanvas(400, 400); 
rectMode(CENTER); 
} 
function draw() { 
background(220); 
line(width/4, height/4, 3*width/4, height/4); 
line(3*width/4, height/4, 3*width/4, 3*height/4); 
line(3*width/4, 3*height/4, width/4, 3*height/4); 
line(width/4, 3*height/4, width/4, height/4); 
}function setup() {
createCanvas(480, 120);
noStroke();
}
function draw() {
background(0);
for (var y = 0; y <= height; y += 40) {
for (var x = 0; x <= width; x += 40) {
fill(255, 140);
ellipse(x, y, 40, 40);
}
}
}function setup() {
createCanvas(480, 120);
strokeWeight(2);
}
function draw() {
background(204);
for (var i = 20; i < 400; i += 20) {
line(i, 0, i + i/2, 80);
line(i + i/2, 80, i*1.2, 120);
}
}function setup() {
createCanvas(480, 120);
}
function draw() {
background(204);
beginShape();
vertex(180, 82);
vertex(207, 36);
vertex(214, 63);
vertex(407, 11);
vertex(412, 30);
vertex(219, 82);
vertex(226, 109);
endShape(CLOSE);
}function setup() {
createCanvas(480, 120);
noStroke();
}
function draw() {
}function setup() {
createCanvas(480, 120);
strokeWeight(12);
}
function draw() {
background(204);
rect(40, 25, 70, 70);
rect(140, 25, 70, 70);
line(270, 25, 340, 95);
line(350, 25, 420, 95);
}function setup() {
createCanvas(480, 120);
}
function draw() {
background(204);
arc(90, 60, 80, 80, 0, 90);
arc(190, 60, 80, 80, 0, 270);
arc(290, 60, 80, 80, 180, 450);
arc(390, 60, 80, 80, 45, 225);
}var y = 60;
var d = 80;
function setup() {
createCanvas(480, 120);
background(0); 
}
function draw() {
ellipse(75, y, d, d);   
ellipse(175, y, d, d);  
ellipse(275, y, d, d);  
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(0);
quad(158, 55, 199, 14, 392, 66, 351, 107);
triangle(347, 54, 392, 9, 392, 66);
triangle(158, 55, 290, 91, 290, 112);
}function setup() {
createCanvas(600, 600);
background (0); 
}
function draw() {
if (mouseIsPressed) {
fill(225, 0, 0);
} else {
fill(255);
}
rect(mouseX, mouseY, 50, 50);
}var circle = {
x: 0, 
y: 200, 
diameter: 50
}; 
var circle2 = {
x: 0, 
y: 200, 
diameter: 50
}; 
var r = 218; 
var g = 160; 
var b = 221; 
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(250, 250, 100);
fill(250, 200, 200); 
ellipse(circle.x, circle.y, circle.diameter, circle.diameter); 
circle.x = circle.x + 1; 
}function setup() { 
createCanvas(400, 400);
background(116, 187, 227); 
} 
function draw() { 
fill(55, 143, 80); 
noStroke(); 
triangle(0, 400, 10, 330, 20, 400);
triangle(20, 400, 30, 330, 40, 400);
triangle(40, 400, 50, 330, 60, 400);
triangle(60, 400, 70, 330, 80, 400);
triangle(80, 400, 90, 330, 100, 400);
triangle(100, 400, 110, 330, 120, 400);
triangle(120, 400, 130, 330, 140, 400);
triangle(140, 400, 150, 330, 160, 400);
triangle(160, 400, 170, 330, 180, 400);
triangle(180, 400, 190, 330, 200, 400);
triangle(200, 400, 210, 330, 220, 400);
triangle(220, 400, 230, 330, 240, 400);
triangle(240, 400, 250, 330, 260, 400);
triangle(260, 400, 270, 330, 280, 400);
triangle(280, 400, 290, 330, 300, 400);
triangle(300, 400, 310, 330, 320, 400);
triangle(320, 400, 330, 330, 340, 400);
triangle(340, 400, 350, 330, 360, 400);
triangle(360, 400, 370, 330, 380, 400);
triangle(380, 400, 390, 330, 400, 400);
fill(236, 136, 173);
noStroke(); 
ellipse(200, 200, 100, 60); 
fill(236, 136, 173); 
noStroke(); 
triangle(250, 200, 290, 170, 290, 230); 
fill(0,0,0);
noStroke(); 
ellipse(170, 195, 10, 10); 
fill(260);
noStroke(); 
ellipse(140, 190, 15, 15); 
fill(260);
noStroke(); 
ellipse(125, 160, 18, 18); 
fill(260);
noStroke(); 
ellipse(120, 130, 22, 22); 
fill(260);
noStroke(); 
ellipse(100, 110, 25, 25); 
fill(260);
noStroke(); 
ellipse(90, 70, 33, 33);   
fill(260);
noStroke(); 
ellipse(97, 30, 38, 38);  
}
function setup() { 
createCanvas(600, 450);
background(51, 242, 245); 
} 
function draw() { 
stroke(255,0,0); 
strokeWeight(40); 
line(0, 0, 600, 450); 
fill(0, 186, 0); 
noStroke(); 
ellipse(300, 225, 300, 215);  
fill(19, 44, 130); 
noStroke(); 
rect(410, 195, 40, 40);  
}function setup() { 
createCanvas(600, 600);
} 
function draw() { 
background(260);
fill(84, 218, 227);
noStroke(); 
ellipse (300, 300, 300, 300); 
}let isOn=false; 
function setup() { 
createCanvas(600, 600);
}
function draw() { 
background(255); 
fill(0);
textSize(14);
text("Kleines Emblem",60,80);
line1();
line2(); 
line3(); 
line4(); 
line5(); 
line6(); 
line7(); 
}
function mousePressed(){
if (mouseX == line1){
isOn = true; 
background(140, 145, 171); 
} 
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}