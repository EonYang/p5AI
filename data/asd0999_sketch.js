let workletLoaded = false;
let audioGraphInitialized = false;
let recording = false;
let finishedRecording = false;
let workletSoundRecorder;
let mic;
let bufferSource;
let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();
function loadWorklet() {
const workletSrc = select('#worklet-src').html();
const blob = new Blob([workletSrc], { type: 'application/javascript' });
const objectURL = URL.createObjectURL(blob);
return audioContext.audioWorklet.addModule(objectURL)
.then(function() { workletLoaded = true; })
.catch(function(err) { alert(err.message); });
}
function setup() {
createCanvas(windowWidth, windowHeight);
loadWorklet()
.then(function() {
Tone.setContext(audioContext);
mic = new Tone.UserMedia();
return mic.open();
}).then(function () {
const numInputChannels = 1;
workletSoundRecorder = new ToneWorkletSoundRecorder(numInputChannels);
workletSoundRecorder.setInput(mic);
bufferSource = new Tone.BufferSource().toMaster();
bufferSource.loop = true;
audioGraphInitialized = true;
});
}
function draw() {
if (!workletLoaded || !audioGraphInitialized) {
background(0);
text('Initializing audio graph...', 20, 20);
} else if (!recording && !finishedRecording) {
background(220);
text('Click to record.', 20, 20);
} else if (recording) {
background(255,0,0);
text('Recording now! Click to stop and loop.', 20, 20);
} else if (finishedRecording) {
background(0,255,0);
text('Recording stopped.', 20, 20);
}
}
function mousePressed() {
if (!workletLoaded || !audioGraphInitialized) {
return;
}
if (!recording) {
recording = true;
finishedRecording = false;
if (bufferSource.buffer.loaded) {
bufferSource.stop();
}
workletSoundRecorder.record(bufferSource);
} else {
recording = false;
finishedRecording = true;
workletSoundRecorder.stop().then(function() {
if (bufferSource.buffer.loaded) {
bufferSource.start();
}
});
}
}var synth;
var velocity;
var myScale;
var note;
var pos;
function setup() {
createCanvas(630, 420);
synth = new Tone.Synth().toMaster();
myScale = ["C3", "D3", "E3", "G3", "A3",
"C4", "D4", "E4", "G4", "A4",
"C5", "D5", "E5", "G5", "A5", "C6" ];
}
function draw() {
background(0, 50);
amplitude = ceil(map(velocity,10,-10,120,10));
period = floor(map(pos,0,myScale.length-1,500,100));
}
function mouseMoved(){
pos = floor(map(mouseX,0,width,0,myScale.length-1));
note = myScale[pos];
synth.triggerAttackRelease(note, 0.01);
velocity = floor(map(mouseY,0,height,10,-10));
synth.volume.value = velocity;
}
var video;
var button;
var snapshots = [];
var counter = 0;
var vScale = 4;
var total = 100;
var w = 400;
var h = 300;
var playGIF = false;
function setup() {
createCanvas(800, 300);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
}
function draw() {
if (counter <= total) {
snapshots[counter] = video.get();
counter++;
}
for (var i = 0; i < snapshots.length; i++) {
var index = (i + frameCount) % snapshots.length;
image(snapshots[index], 0, 0, w, h);
}
}
let synth = new Tone.GrainPlayer("/samples/congas.m4a");
synth.loop = true;
synth.autoStart = true;
synth.toMaster();
function setup() {
createCanvas(400,400);
background(200);
}
function draw() {
synth.playbackRate = map(mouseX, 0, width, 0.5, 1);
synth.detune = map(mouseY, 0, height, 100, 0);
}
let player = new Tone.Player("samples/tusharC.mp3");
player.loop = true;
player.retrigger = true;
player.toMaster();
function setup() {
console.log("Play spacebar to start/stop. Mouse left and right to change speed. Click to reverse");
}
function draw() {
player.playbackRate = map(mouseX, 0, width, 0.1, 1);
}
function keyPressed() {
if (key == ' ') {
if (player.state == "stopped") {
player.start();
} else {
player.stop();
}
}
}
function mouseReleased() {
player.reverse = !(player.reverse);
let sampler = new Tone.Sampler({"A1": "samples/casio/A1.mp3"});
sampler.envelope = {
attack: 0.2,
decay: 0,
sustain: 1,
release: 0.1
}
sampler.toMaster();
let s = new Tone.PolySynth(10,Tone.MonoSynth).toMaster();
Tone.Transport.bpm = 80;
Tone.Transport.start();
function keyPressed() {
s.triggerAttack("A2","2n",1);
}
function keyReleased() {
s.triggerRelease("A2");
}
function setup() {
createCanvas(400,400);
background(200);
}
var input;
var button;
function setup(){
noCanvas();
input = select('#mood');
button = select('#submit');
button.mousePressed(generateGiphy);
}
function generateGiphy(word){
var gurl2 = "&limit=3";
var gurl = gurl1 + gword + gurl2;
loadJSON(gurl, showGiphy);
}
function showGiphy(giphy){
console.log(giphy);
var index = floor(random(giphy.data.length));
var img = createImg(giphy.data[index].images.original.url);
img.size(400, 400);
}var blockSpacing = {
blockW : 40,
blockH : 40
}
var sizeLimits = {
maxW : 200,
minW : 10,
maxH : 200,
minH : 10
}
var APIKey = "8rd360WUgkDRoghtm59uLtu3k2QBu6N2";
var service = "/v1/gifs/random"
var limit = "&limit=";
var numOfBlocks;
var apiURL;
var img
var imageArray = [];
var count = 0;
function setup() {
createCanvas(400, 400);
background(200);
numOfBlocks = floor(width/blockSpacing.blockW)*floor(width/blockSpacing.blockH);
apiURL = website + service + "?" + "api_key=" + APIKey + limit + numOfBlocks;
loadJSON(apiURL, dataLoaded);
}
function iterate(){
for (var x = 0; x< width; x+= blockSpacing.blockW){
for (var y = 0; y< height; y+= blockSpacing.blockH){
var imageWidth = floor(random(sizeLimits.minW, sizeLimits.maxW));
var imageHeight = floor(random(sizeLimits.minH, sizeLimits.maxH));
image(imageArray[i],x,y,imageWidth,imageHeight);
i++;
}
}
}
function dataLoaded(data){
processData(data);
}
function loaded(){
count++;
if (count == numOfBlocks) {
iterate();
}
}
function processData(data){
for (var j = 0; j< numOfBlocks; j++) {
imageArray[j] = createImg(data.data.images.original.url, loaded).hide();
}
}var blockSpacing = {
blockW : 40,
blockH : 40
}
var sizeLimits = {
maxW : 100,
minW : 20,
maxH : 100,
minH : 20
}
var APIKey = "Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB";
var service = "/v1/gifs/random"
var limit = "&limit=";
var numOfBlocks;
var apiURL;
var img
var imageArray = [];
var count = 0;
function setup() {
createCanvas(400, 400);
background(200);
numOfBlocks = floor(width/blockSpacing.blockW)*floor(width/blockSpacing.blockH);
apiURL = website + service + "?" + "api_key=" + APIKey + limit + numOfBlocks;
loadJSON(apiURL, dataLoaded);
}
function iterate(){
for (var x = 0; x< width; x+= blockSpacing.blockW){
for (var y = 0; y< height; y+= blockSpacing.blockH){
var imageWidth = floor(random(sizeLimits.minW, sizeLimits.maxW));
var imageHeight = floor(random(sizeLimits.minH, sizeLimits.maxH));
image(imageArray[i],x,y,imageWidth,imageHeight);
i++;
}
}
}
function dataLoaded(data){
processData(data);
}
function loaded(){
count++;
if (count == numOfBlocks) {
iterate();
}
}
function processData(data){
for (var j = 0; j< numOfBlocks; j++) {
imageArray[j] = createImg(data.data[j].images.original.url, loaded).hide();
}
}var blockSpacing = {
blockW : 40,
blockH : 40
}
var sizeLimits = {
maxW : 100,
minW : 20,
maxH : 100,
minH : 20
}
var APIKey = "Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB";
var service = "/v1/gifs/trending"
var limit = "&limit=";
var numOfBlocks;
var apiURL;
var img
var imageArray = [];
var count = 0;
function setup() {
createCanvas(400, 400);
background(200);
numOfBlocks = floor(width/blockSpacing.blockW)*floor(width/blockSpacing.blockH);
apiURL = website + service + "?" + "api_key=" + APIKey + limit + numOfBlocks;
loadJSON(apiURL, dataLoaded);
}
function iterate(){
for (var x = 0; x< (width/blockSpacing.blockW); x+= blockSpacing.blockW){
for (var y = 0; y< (width/blockSpacing.blockH); y+= blockSpacing.blockH){
var imageWidth = floor(random(sizeLimits.minW, sizeLimits.maxW));
var imageHeight = floor(random(sizeLimits.minH, sizeLimits.maxH));
image(imageArray[i],x,y,imageWidth,imageHeight);
i++;
}
}
}
function dataLoaded(data){
processData(data);
}
function loaded(){
count++;
if (count == 100) {
iterate();
}
}
function processData(data){
for (var j = 0; j< numOfBlocks; j++){
imageArray[j] = createImg(data.data[j].images.original.url, loaded).hide();
}
var gurl2 = "&limit=3";
var url = gurl1 + gurl2;
function setup() {
noCanvas();
var button = createButton('GENERATE')
button.mousePressed(getGiph);
}
function draw() {
}
function getGiph(){
loadJSON(url, gotData);
}
function gotData(data){
console.log(data);
}
function setup() {
noCanvas();
var button = createButton('GENERATE YOUR ALBUM')
button.mousePressed(randomNoun);
}
function randomNoun() {
wordnik('nouns', randomNounURL);
}
function wordnik(where, url) {
loadJSON(url, wordLoaded);
function wordLoaded(data) {
createP();
createSpan("Your album name: The ")
createSpan(data.word);
createP();
createSpan("Your album cover:")
createP();
var gword = data.word;
var gurl2 = "&limit=3";
var gurl = gurl1 + gword + gurl2;
loadJSON(gurl, gotData);
function gotData(giphy) {
var img = createImg(giphy.data[0].images.original.url);
img.size(400, 400);
}
}
var word = "rain"
var url2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
var link;
function setup(){
noCanvas();
link = createA("#", word);
link.mousePressed(askWordnik);
}
function askWordnik(){
loadJSON(url1+word+url2, gotData), 'jsonp';
}
function gotData(data){
console.lof("hi");
function setup() {
createCanvas(400, 400);
let data = {
apiKey: 'hlJPz47XFXryF7Mo8Iq3n1rZtNBLEgJRkYmhb8hwlnh2',
data: 'This is the text I want to evaluate personality'
};
httpPost(path, data, gotData, gotError);
function gotData(data) {
console.log(data); 
}
function gotError(error) {
console.error(error); 
}
}
var mic;
var synthScale = [];
var synth;
var sampler;
var note1 = "";
var note2 = "";
var note3 = "";
var note5 = "";
var buttonCstate = true;
var buttonDstate = false;
var buttonEstate = false;
var buttonFstate = false;
var buttonGstate = false;
var buttonAstate = false;
var buttonBstate = false;
var minArrayLength = 3;
var playButton;
var soundFile;
Tone.Transport.bpm.value = 65;
synthScale = ["C2","C3","C4"];
voiceScale = ["C1"];
synth = new Tone.PolySynth({
"envelope": {
"attack": 1,
"decay": 0,
"sustain": 0.3,
"release": 0,
}
}).toMaster();
synth.set({"oscillator": {
"type": "sine"
}
});
sampler = new Tone.Sampler({
"C1": "./tusharC.mp3",
"F1": "./tusharF.mp3"
});
sampler.envelope = {
"attack": 1,
"decay": 0,
"sustain": 1,
"release": 0.5
}
var chorus = new Tone.Chorus(4, 2.5, 0.1).toMaster();
var freeverb = new Tone.Freeverb();
freeverb.dampening.value = 1000;
var pingPong = new Tone.PingPongDelay("2n", 0.2);
sampler.connect(pingPong).connect(freeverb).connect(chorus);
var melody = new Tone.Pattern(function(time, note){
note1 = note;
var timey1 = ["2t", "4t", "8t", "4t"][floor(random(4))];
sampler.triggerAttackRelease(note, "2t", time, 0.5);
melody.interval = timey1;
}, voiceScale, "randomOnce");
melody.loop = true;
var arpeggio = new Tone.Pattern(function(time, note){
note2 = note;
synth.triggerAttackRelease(note, ["4t","8t"][floor(random(2))], time, 1);
}, synthScale, "upDown");
arpeggio.loop = true;
arpeggio.interval = "8t";
var chord = new Tone.Pattern(function(time, note){
note3 = note;
var fifth = Tone.Frequency(note).transpose(7);
note5 = fifth.toNote();
var chordDuration = "8n";
}, synthScale, "random");
chord.loop = true;
chord.interval = "4n";
function setup(){
createCanvas(400,400);
textSize(30);
playButton = createButton("Master");
playButton.position(330, 80);
playButton.mousePressed(togglePlay);
melodyButton = createButton("Melody");
melodyButton.position(40, 80);
melodyButton.mousePressed(toggleMelody);
apreggioButton = createButton("Arpeggio");
apreggioButton.position(40, 180);
apreggioButton.mousePressed(toggleApreggio);
chordButton = createButton("Chord");
chordButton.position(40, 280);
chordButton.mousePressed(toggleChord);
buttonC = createButton("C");
buttonC.position(40, 20);
buttonC.mousePressed(addCtoArray);
buttonD = createButton("D");
buttonD.position(90, 20);
buttonD.mousePressed(addDtoArray);
buttonE = createButton("E");
buttonE.position(140, 20);
buttonE.mousePressed(addEtoArray);
buttonF = createButton("F");
buttonF.position(190, 20);
buttonF.mousePressed(addFtoArray);
buttonG = createButton("G");
buttonG.position(240, 20);
buttonG.mousePressed(addGtoArray);
buttonA = createButton("A");
buttonA.position(290, 20);
buttonA.mousePressed(addAtoArray);
buttonB = createButton("B");
buttonB.position(340, 20);
buttonB.mousePressed(addBtoArray);
}
function draw(){
background(150);
text(note1,120,100);
text(note2,120,200);
text(note3,120,300);
text(note5,220,300);
for(var s=0;s<synthScale.length;s+=3){
push();
textSize(10);
text(synthScale[s],s*50/3+40, 375);
pop();
}
}
function togglePlay(){
if(Tone.Transport.state == "started"){
Tone.Transport.stop();
playButton.html('Master');
} else {
Tone.Transport.start();
playButton.html('Stop');
}
}
function toggleMelody(){
if(melody.state == "started"){
melody.stop();
melodyButton.html("Melody");
} else {
melody.start("2t");
melodyButton.html("Stop");
}
}
function toggleApreggio(){
if(arpeggio.state == "started"){
arpeggio.stop();
apreggioButton.html("Arpeggio");
} else {
arpeggio.start("4t");
apreggioButton.html("Stop");
}
}
function toggleChord(){
if(chord.state == "started"){
chord.stop();
chordButton.html("Chord");
} else {
chord.start("4t");
chordButton.html("Stop");
}
}
function addCtoArray(){
if(buttonCstate==false){
voiceScale.push("C1");
synthScale.push("C2");
synthScale.push("C3");
synthScale.push("C4");
buttonCstate = true;
} else if(buttonCstate==true && synthScale.length>minArrayLength && voiceScale.length>1){
let i = synthScale.indexOf("C2");
let j = synthScale.indexOf("C3");
let k = synthScale.indexOf("C4");
let v = voiceScale.indexOf("C1");
voiceScale.splice(v,1);
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonCstate = false;
}
}
function addDtoArray(){
if(buttonDstate==false){
voiceScale.push("D1");
synthScale.push("D2");
synthScale.push("D3");
synthScale.push("D4");
buttonDstate = true;
} else if(buttonDstate==true && synthScale.length>minArrayLength && voiceScale.length>1){
let i = synthScale.indexOf("D2");
let j = synthScale.indexOf("D3");
let k = synthScale.indexOf("D4");
let v = voiceScale.indexOf("D1");
voiceScale.splice(v,1);
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonDstate = false;
}
}
function addEtoArray(){
if(buttonEstate==false){
voiceScale.push("E1");
synthScale.push("E2");
synthScale.push("E3");
synthScale.push("E4");
buttonEstate = true;
} else if(buttonEstate==true && synthScale.length>minArrayLength && voiceScale.length>1){
let i = synthScale.indexOf("E2");
let j = synthScale.indexOf("E3");
let k = synthScale.indexOf("E4");
let v = voiceScale.indexOf("E1");
voiceScale.splice(v,1);
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonEstate = false;
}
}
function addFtoArray(){
if(buttonFstate==false){
voiceScale.push("F1");
synthScale.push("F2");
synthScale.push("F3");
synthScale.push("F4");
buttonFstate = true;
} else if(buttonFstate==true && synthScale.length>minArrayLength && voiceScale.length>1){
let i = synthScale.indexOf("F2");
let j = synthScale.indexOf("F3");
let k = synthScale.indexOf("F4");
let v = voiceScale.indexOf("F1");
voiceScale.splice(v,1);
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonFstate = false;
}
}
function addGtoArray(){
if(buttonGstate==false){
voiceScale.push("G1");
synthScale.push("G2");
synthScale.push("G3");
synthScale.push("G4");
buttonGstate = true;
} else if(buttonGstate==true && synthScale.length>minArrayLength && voiceScale.length>1){
let i = synthScale.indexOf("G2");
let j = synthScale.indexOf("G3");
let k = synthScale.indexOf("G4");
let v = voiceScale.indexOf("G1");
voiceScale.splice(v,1);
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonGstate = false;
}
}
function addAtoArray(){
if(buttonAstate==false){
voiceScale.push("A1");
synthScale.push("A2");
synthScale.push("A3");
synthScale.push("A4");
buttonAstate = true;
} else if(buttonAstate==true && synthScale.length>minArrayLength && voiceScale.length>1){
let i = synthScale.indexOf("A2");
let j = synthScale.indexOf("A3");
let k = synthScale.indexOf("A4");
let v = voiceScale.indexOf("A1");
voiceScale.splice(v,1);
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonAstate = false;
}
}
function addBtoArray(){
if(buttonBstate==false){
voiceScale.push("B1");
synthScale.push("B2");
synthScale.push("B3");
synthScale.push("B4");
buttonBstate = true;
} else if(buttonBstate==true && synthScale.length>minArrayLength && voiceScale.length>1){
let i = synthScale.indexOf("B2");
let j = synthScale.indexOf("B3");
let k = synthScale.indexOf("B4");
let v = voiceScale.indexOf("B1");
voiceScale.splice(v,1);
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonBstate = false;
}
let synth = new Tone.GrainPlayer("/samples/tushar.mp3");
synth.loop = true;
synth.autoStart = true;
synth.toMaster();
function setup() {
createCanvas(400,400);
background(200);
synth.start(0);
}
function draw() {
synth.playbackRate = map(mouseX, 0, width, 0.1, 2);
synth.detune = map(mouseY, 0, height, 100, 0);
}
var synthScale = [];
var synth;
var note1 = "";
var note2 = "";
var note3 = "";
var note5 = "";
var buttonCstate = true;
var buttonDstate = false;
var buttonEstate = false;
var buttonFstate = false;
var buttonGstate = false;
var buttonAstate = false;
var buttonBstate = false;
var minArrayLength = 3;
Tone.Transport.bpm.value = 65;
synthScale = ["C2","C3","C4"];
let sampler = new Tone.Sampler({
"A1": "samples/casio/A1.mp3",
"D2": "samples/casio/D2.mp3"
});
sampler.envelope = {
attack: 0.2,
decay: 0,
sustain: 1,
release: 0.1
}
sampler.toMaster();
var melody = new Tone.Pattern(function(time, note){
var topNote = Tone.Frequency(note).transpose(0);
note1 = topNote.toNote();
sampler.triggerAttackRelease(topNote, ["2n", "", "", "4n"][floor(random(4))], time, 0.6);
}, synthScale, "random");
melody.loop = true;
melody.interval = "4t";
var arpeggio = new Tone.Pattern(function(time, note){
note2 = note;
sampler.triggerAttackRelease(note, ["4t","8n"][floor(random(2))], time, 0.3);
}, synthScale, "upDown");
arpeggio.loop = true;
arpeggio.interval = "8t";
var chord = new Tone.Pattern(function(time, note){
note3 = note;
var fifth = Tone.Frequency(note).transpose(7);
note5 = fifth.toNote();
var chordDuration = ["4n", "8n", "4n"][floor(random(3))];
}, synthScale, "randomOnce");
chord.loop = true;
chord.interval = "4n";
function setup(){
createCanvas(400,400);
Tone.Transport.start();
if(sampler.loaded){
melody.start(0);
arpeggio.start(0);
chord.start(0);
}
textSize(30);
buttonC = createButton("C");
buttonC.position(40, 20);
buttonC.mousePressed(addCtoArray);
buttonD = createButton("D");
buttonD.position(90, 20);
buttonD.mousePressed(addDtoArray);
buttonE = createButton("E");
buttonE.position(140, 20);
buttonE.mousePressed(addEtoArray);
buttonF = createButton("F");
buttonF.position(190, 20);
buttonF.mousePressed(addFtoArray);
buttonG = createButton("G");
buttonG.position(240, 20);
buttonG.mousePressed(addGtoArray);
buttonA = createButton("A");
buttonA.position(290, 20);
buttonA.mousePressed(addAtoArray);
buttonB = createButton("B");
buttonB.position(340, 20);
buttonB.mousePressed(addBtoArray);
}
function draw(){
background(150);
text(note1,100,100);
text(note2,100,200);
text(note3,100,300);
text(note5,200,300);
for(var s=0;s<synthScale.length;s+=3){
push();
textSize(10);
text(synthScale[s],s*50/3+40, 375);
pop();
}
console.log(synthScale);
}
function addCtoArray(){
if(buttonCstate==false){
synthScale.push("C2");
synthScale.push("C3");
synthScale.push("C4");
buttonCstate = true;
} else if(buttonCstate==true && synthScale.length>minArrayLength){
let i = synthScale.indexOf("C2");
let j = synthScale.indexOf("C3");
let k = synthScale.indexOf("C4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonCstate = false;
}
}
function addDtoArray(){
if(buttonDstate==false){
synthScale.push("D2");
synthScale.push("D3");
synthScale.push("D4");
buttonDstate = true;
} else if(buttonDstate==true && synthScale.length>minArrayLength){
let i = synthScale.indexOf("D2");
let j = synthScale.indexOf("D3");
let k = synthScale.indexOf("D4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonDstate = false;
}
}
function addEtoArray(){
if(buttonEstate==false){
synthScale.push("E2");
synthScale.push("E3");
synthScale.push("E4");
buttonEstate = true;
} else if(buttonEstate==true && synthScale.length>minArrayLength){
let i = synthScale.indexOf("E2");
let j = synthScale.indexOf("E3");
let k = synthScale.indexOf("E4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonEstate = false;
}
}
function addFtoArray(){
if(buttonFstate==false){
synthScale.push("F2");
synthScale.push("F3");
synthScale.push("F4");
buttonFstate = true;
} else if(buttonFstate==true && synthScale.length>minArrayLength){
let i = synthScale.indexOf("F2");
let j = synthScale.indexOf("F3");
let k = synthScale.indexOf("F4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonFstate = false;
}
}
function addGtoArray(){
if(buttonGstate==false){
synthScale.push("G2");
synthScale.push("G3");
synthScale.push("G4");
buttonGstate = true;
} else if(buttonGstate==true && synthScale.length>minArrayLength){
let i = synthScale.indexOf("G2");
let j = synthScale.indexOf("G3");
let k = synthScale.indexOf("G4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonGstate = false;
}
}
function addAtoArray(){
if(buttonAstate==false){
synthScale.push("A2");
synthScale.push("A3");
synthScale.push("A4");
buttonAstate = true;
} else if(buttonAstate==true && synthScale.length>minArrayLength){
let i = synthScale.indexOf("A2");
let j = synthScale.indexOf("A3");
let k = synthScale.indexOf("A4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonAstate = false;
}
}
function addBtoArray(){
if(buttonBstate==false){
synthScale.push("B2");
synthScale.push("B3");
synthScale.push("B4");
buttonBstate = true;
} else if(buttonBstate==true && synthScale.length>minArrayLength){
let i = synthScale.indexOf("B2");
let j = synthScale.indexOf("B3");
let k = synthScale.indexOf("B4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonBstate = false;
}
}
var previousData = 0;
var breathe, ambient, scream, static;
function preload(){
}
function setup() {
createCanvas(400, 400);  
breathe.loop();
scream.setVolume(2);
}
function gotData() {
previousData = latestData;
}
let staticPlayed = false;
let screamPlayed = false;
let ambientPlayed = false;
function draw() {
background(255);
if(latestData == 1 && !staticPlayed){
staticPlayed = true;
static.loop();
} else if(latestData == 2 && !screamPlayed){
staticPlayed = false;
screamPlayed = true;
scream.play();
static.stop();
} else if(latestData == 3 && !staticPlayed){
screamPlayed = false;
staticPlayed = true;
static.loop();
} else if(latestData == 0){
staticPlayed = false;
static.stop();
}
}
var data; 
function preload(){
data = loadJSON("birds.json");
}
function setup(){
var bird = data.birds[1].members[2];
createP(bird);
}
function draw(){
}
var synth;
var note1 = "";
var note2 = "";
var note3 = "";
var note5 = "";
var buttonCstate = true;
var buttonDstate = false;
var buttonEstate = false;
var buttonFstate = false;
var buttonGstate = false;
var buttonAstate = false;
var buttonBstate = false;
Tone.Transport.bpm.value = 100;
synthScale = ["C2","C3","C4"];
synth = new Tone.PolySynth({
"envelope": {
"attack": 0.5,
"decay": 0,
"sustain": 0.3,
"release": 0,
}
}).toMaster();
synth.set({"oscillator": {
"type": "sine"
}
});
var melody = new Tone.Pattern(function(time, note){
note1 = note;
synth.triggerAttackRelease(note, ["16n", "", "4n", "4n"][floor(random(4))], time, 0.7);
}, synthScale, "random");
melody.loop = true;
melody.interval = "4t";
var arpeggio = new Tone.Pattern(function(time, note){
note2 = note;
synth.triggerAttackRelease(note, ["4t","8n"][floor(random(2))], time, 0.3);
}, synthScale, "upDown");
arpeggio.loop = true;
arpeggio.interval = "8t";
var chord = new Tone.Pattern(function(time, note){
note3 = note;
var fifth = Tone.Frequency(note).transpose(7);
note5 = fifth.toNote();
var chordDuration = ["32n", "32n", "4n"][floor(random(3))];
}, synthScale, "randomOnce");
chord.loop = true;
chord.interval = "4n";
function setup(){
createCanvas(400,400);
Tone.Transport.start();
melody.start(0);
arpeggio.start(0);
chord.start(0);
textSize(30);
buttonC = createButton("C");
buttonC.position(40, 20);
buttonC.mousePressed(addCtoArray);
buttonD = createButton("D");
buttonD.position(90, 20);
buttonD.mousePressed(addDtoArray);
buttonE = createButton("E");
buttonE.position(140, 20);
buttonE.mousePressed(addEtoArray);
buttonF = createButton("F");
buttonF.position(190, 20);
buttonF.mousePressed(addFtoArray);
buttonG = createButton("G");
buttonG.position(240, 20);
buttonG.mousePressed(addGtoArray);
buttonA = createButton("A");
buttonA.position(290, 20);
buttonA.mousePressed(addAtoArray);
buttonB = createButton("B");
buttonB.position(340, 20);
buttonB.mousePressed(addBtoArray);
}
function draw(){
background(150);
text(note1,100,100);
text(note2,100,200);
text(note3,100,300);
text(note5,200,300);
for(var s=0;s<synthScale.length;s+=3){
push();
textSize(10);
text(synthScale[s],s*50/3+40, 375);
pop();
}
console.log(synthScale);
}
function addCtoArray(){
if(buttonCstate==false){
synthScale.push("C2");
synthScale.push("C3");
synthScale.push("C4");
buttonCstate = true;
} else if(buttonCstate==true && synthScale.length>6){
let i = synthScale.indexOf("C2");
let j = synthScale.indexOf("C3");
let k = synthScale.indexOf("C4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonCstate = false;
}
}
function addDtoArray(){
if(buttonDstate==false){
synthScale.push("D2");
synthScale.push("D3");
synthScale.push("D4");
buttonDstate = true;
} else if(buttonDstate==true && synthScale.length>6){
let i = synthScale.indexOf("D2");
let j = synthScale.indexOf("D3");
let k = synthScale.indexOf("D4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonDstate = false;
}
}
function addEtoArray(){
if(buttonEstate==false){
synthScale.push("E2");
synthScale.push("E3");
synthScale.push("E4");
buttonEstate = true;
} else if(buttonEstate==true && synthScale.length>6){
let i = synthScale.indexOf("E2");
let j = synthScale.indexOf("E3");
let k = synthScale.indexOf("E4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonEstate = false;
}
}
function addFtoArray(){
if(buttonFstate==false){
synthScale.push("F2");
synthScale.push("F3");
synthScale.push("F4");
buttonFstate = true;
} else if(buttonFstate==true && synthScale.length>6){
let i = synthScale.indexOf("F2");
let j = synthScale.indexOf("F3");
let k = synthScale.indexOf("F4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonFstate = false;
}
}
function addGtoArray(){
if(buttonGstate==false){
synthScale.push("G2");
synthScale.push("G3");
synthScale.push("G4");
buttonGstate = true;
} else if(buttonGstate==true && synthScale.length>6){
let i = synthScale.indexOf("G2");
let j = synthScale.indexOf("G3");
let k = synthScale.indexOf("G4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonGstate = false;
}
}
function addAtoArray(){
if(buttonAstate==false){
synthScale.push("A2");
synthScale.push("A3");
synthScale.push("A4");
buttonAstate = true;
} else if(buttonAstate==true && synthScale.length>6){
let i = synthScale.indexOf("A2");
let j = synthScale.indexOf("A3");
let k = synthScale.indexOf("A4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonAstate = false;
}
}
function addBtoArray(){
if(buttonBstate==false){
synthScale.push("B2");
synthScale.push("B3");
synthScale.push("B4");
buttonBstate = true;
} else if(buttonBstate==true && synthScale.length>6){
let i = synthScale.indexOf("B2");
let j = synthScale.indexOf("B3");
let k = synthScale.indexOf("B4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonBstate = false;
}
}
var synth;
synth = new Tone.PolySynth({
"envelope": {
"attack": 0.5,
"decay": 0,
"sustain": 0.3,
"release": 0,
}
}).toMaster();
synth.set({"oscillator": {
"type": "sine" 
}
});
var pattern = new Tone.Pattern(function(time, note){
synth.triggerAttackRelease(note, "4n");
}, ["C4", "D4", "E4", "A3"], "upDown");
pattern.loop = true;
pattern.interval = "8n";
function setup(){
Tone.Transport.start();
pattern.start(0);
}var synth;
synth = new Tone.PolySynth({
"volume": -10,
"envelope": {
"attack": 0.5,
"decay": 0,
"sustain": 0.3,
"release": 0.5,
}
}).toMaster();
synth.set({"oscillator": {
"type": "sine" 
}
});
var synthLoop1 = new Tone.Event(loopCallback1);
synthLoop1.loop = true;
synthLoop1.loopEnd = "4t";
function loopCallback1(time){
var pattern = new Tone.Pattern(function(time, note){
synth.triggerAttackRelease(note, time, 1.5);
}, ["C2", "D4", "E5", "A6"], "upDown");
}
function setup(){
Tone.Transport.start();
synthLoop1.start(0);
}let player = new Tone.Player("samples/congas.m4a");
player.loop = true;
player.retrigger = true;
player.toMaster();
function setup() {
console.log("Play spacebar to start/stop. Mouse left and right to change speed. Click to reverse");
}
function draw() {
player.playbackRate = map(mouseX, 0, width, 0.1, 1);
}
function keyPressed() {
if (key == ' ') {
if (player.state == "stopped") {
player.start();
} else {
player.stop();
}
}
}
function mouseReleased() {
player.reverse = !(player.reverse);
var portName = '/dev/cu.usbmodem1411';
var inData = 0; 
function setup() {
createCanvas(400, 400);
}
for (var i=0; i<portList.length; i++){
var p = portList[i];
if(p.indexOf('usbmodem') > -1){
serverConnected();
}
}
}
if(input.length > 0){
if(parts.length == 3){
}
}
}
function serverConnected(){
}
function draw() {
background(255,255,255);
}
var synthScale = [];
var synth;
var note1 = "";
var note2 = "";
var note3 = "";
var note5 = "";
var buttonCstate = true;
var buttonDstate = false;
var buttonEstate = false;
var buttonFstate = false;
var buttonGstate = false;
var buttonAstate = false;
var buttonBstate = false;
synth = new Tone.PolySynth({
"volume": -10,
"envelope": {
"attack": 0.5,
"decay": 0,
"sustain": 0.3,
"release": 0.5,
}
}).toMaster();
synth.set({"oscillator": {
"type": "sine" 
}
})
Tone.Transport.bpm.value = 100;
synthScale = ["","","","C2","C3","C4"];
var synthLoop1 = new Tone.Event(loopCallback1);
synthLoop1.loop = true;
synthLoop1.loopEnd = "4t";
function loopCallback1(time){
pos = floor(random(synthScale.length));
note = synthScale[pos];
var timey1 = ["16n", "8n", "16n", "4n"][floor(random(4))];
synth.triggerAttackRelease(note, timey1, time, 1.5);
note1 = note;
}
var synthLoop2 = new Tone.Event(loopCallback2);
synthLoop2.loop = true;
synthLoop2.loopEnd = "8t";
function loopCallback2(time){
pos = floor(random(3,synthScale.length));
note = synthScale[pos];
synth.triggerAttackRelease(note, "8n", time, 0.4);
note2 = note;
}
var synthLoop3 = new Tone.Event(loopCallback3);
synthLoop3.loop = true;
synthLoop3.loopEnd = "4n";
function loopCallback3(time){
pos = floor(random(0,synthScale.length-3));
note = synthScale[pos];
var fifth = Tone.Frequency(note).transpose(7);
var timey2 = ["32n", "32n", "4n"][floor(random(3))];
synth.triggerAttackRelease(note, timey2, time, 0.4);
synth.triggerAttackRelease(fifth, timey2, time, 0.2);
note3 = note;
note5 = fifth.toNote();
}
function setup(){
createCanvas(400,400);
Tone.Transport.start();
textSize(30);
buttonC = createButton("C");    
buttonC.position(40, 20);
buttonC.mousePressed(addCtoArray);
buttonD = createButton("D");    
buttonD.position(90, 20);
buttonD.mousePressed(addDtoArray);
buttonE = createButton("E");    
buttonE.position(140, 20);
buttonE.mousePressed(addEtoArray);
buttonF = createButton("F");    
buttonF.position(190, 20);
buttonF.mousePressed(addFtoArray);
buttonG = createButton("G");    
buttonG.position(240, 20);
buttonG.mousePressed(addGtoArray);
buttonA = createButton("A");    
buttonA.position(290, 20);
buttonA.mousePressed(addAtoArray);
buttonB = createButton("B");    
buttonB.position(340, 20);
buttonB.mousePressed(addBtoArray);
}
function draw(){
background(150);
text(note1,100,100);
text(note2,100,200);
text(note3,100,300);
text(note5,200,300);
for(var s=3;s<synthScale.length;s+=3){
push();
textSize(10);
text(synthScale[s],s*50/3-15, 375);
pop();
}
console.log(synthScale);
}
function addCtoArray(){
if(buttonCstate==false){
synthScale.push("C2");
synthScale.push("C3");
synthScale.push("C4");
buttonCstate = true;
} else if(buttonCstate==true && synthScale.length>6){
let i = synthScale.indexOf("C2");
let j = synthScale.indexOf("C3");
let k = synthScale.indexOf("C4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonCstate = false;
}
}
function addDtoArray(){
if(buttonDstate==false){
synthScale.push("D2");
synthScale.push("D3");
synthScale.push("D4");
buttonDstate = true;
} else if(buttonDstate==true && synthScale.length>6){
let i = synthScale.indexOf("D2");
let j = synthScale.indexOf("D3");
let k = synthScale.indexOf("D4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonDstate = false;
}
}
function addEtoArray(){
if(buttonEstate==false){
synthScale.push("E2");
synthScale.push("E3");
synthScale.push("E4");
buttonEstate = true;
} else if(buttonEstate==true && synthScale.length>6){
let i = synthScale.indexOf("E2");
let j = synthScale.indexOf("E3");
let k = synthScale.indexOf("E4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonEstate = false;
}
}
function addFtoArray(){
if(buttonFstate==false){
synthScale.push("F2");
synthScale.push("F3");
synthScale.push("F4");
buttonFstate = true;
} else if(buttonFstate==true && synthScale.length>6){
let i = synthScale.indexOf("F2");
let j = synthScale.indexOf("F3");
let k = synthScale.indexOf("F4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonFstate = false;
}
}
function addGtoArray(){
if(buttonGstate==false){
synthScale.push("G2");
synthScale.push("G3");
synthScale.push("G4");
buttonGstate = true;
} else if(buttonGstate==true && synthScale.length>6){
let i = synthScale.indexOf("G2");
let j = synthScale.indexOf("G3");
let k = synthScale.indexOf("G4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonGstate = false;
}
}
function addAtoArray(){
if(buttonAstate==false){
synthScale.push("A2");
synthScale.push("A3");
synthScale.push("A4");
buttonAstate = true;
} else if(buttonAstate==true && synthScale.length>6){
let i = synthScale.indexOf("A2");
let j = synthScale.indexOf("A3");
let k = synthScale.indexOf("A4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonAstate = false;
}
}
function addBtoArray(){
if(buttonBstate==false){
synthScale.push("B2");
synthScale.push("B3");
synthScale.push("B4");
buttonBstate = true;
} else if(buttonBstate==true && synthScale.length>6){
let i = synthScale.indexOf("B2");
let j = synthScale.indexOf("B3");
let k = synthScale.indexOf("B4");
synthScale.splice(k,1);
synthScale.splice(j,1);
synthScale.splice(i,1);
buttonBstate = false;
}
}
var synthScale = [];
var synth;
synth = new Tone.PolySynth({
"volume": -10,
"envelope": {
"attack": 0.5,
"decay": 0,
"sustain": 0.3,
"release": 0.5,
}
}).toMaster();
synth.set({"oscillator": {
"type": "sine" 
}
})
Tone.Transport.bpm.value = 100;
synthScale = ["C2", "E2", "G2", "A2",
"C3", "D3", "E3", "G3", "A3", "B3",
"C4", "D4", "E4", "G4", "A4", "B4","","",""
];
var synthLoop1 = new Tone.Event(loopCallback1);
synthLoop1.loop = true;
function loopCallback1(time){
pos = floor(random(4,synthScale.length));
note = synthScale[pos];
synth.triggerAttackRelease(note, timey1, time, 0.7);
}
var synthLoop2 = new Tone.Event(loopCallback2);
synthLoop2.loop = true;
function loopCallback2(time){
pos = floor(random(0,synthScale.length));
note = synthScale[pos];
}
var synthLoop3 = new Tone.Event(loopCallback3);
synthLoop3.loop = true;
synthLoop3.loopEnd = "4n";
function loopCallback3(time){
pos = floor(random(0,synthScale.length-3));
note = synthScale[pos];
var fifth = Tone.Frequency(note).transpose(7);
var timey2 = ["32n", "32n", "4t"][floor(random(3))];
synth.triggerAttackRelease(note, timey2, time, 0.4);
synth.triggerAttackRelease(fifth, timey2, time, 0.2);
}
function setup(){
createCanvas(400,400);
bpmValue = createSlider(60,140,120,5);
Tone.Transport.start();
synthLoop3.start(0);
}
function draw(){
background(150);
}
var germs = [];
var currentTime = 0;
var startTime = 0;
var germPop;
var success;
var scream;
var timerAlpha = 250;
var score = 0;
var timer;
var hands;
var play = true;
var resetTime = 10000;
function preload(){
hands = loadImage('images/backgroundgame.png');
germ = loadImage('images/CUTEGERM.png');
germPop = loadSound('sounds/pop.wav');
success = loadSound('sounds/success.wav');
scream = loadSound('sounds/scream.wav');
}
function setup() {
createCanvas(600, 400);
textSize(60);
textAlign(CENTER);
germPop.setVolume(2);
success.setVolume(0.2);
scream.setVolume(0.8);
for(var i=0; i<num; i++){
germs[i] = new Germ();
}
startTime = millis();
}
function draw() {
background(255);
image(hands,0,0);
scream.rate(random(4,8));
for(var i=germs.length-1; i>=0; i--){
germs[i].display();
germs[i].move();
if(germs[i].disappear()){
germs.splice(i,1);
continue;
}
for(var j=germs.length-1; j>=0; j--){
if(i != j && germs[i].intersects(germs[j])){
germs[i].newGerm();
}
}
if(currentTime-startTime >= resetTime){
for(var t=germs.length; t<num; t++){
germs[t] = new Germ();
germPop.play();
} 
startTime = millis();
score = 0;
}
}
if(germs.length === 0){
fill(10, 32, 240,150);
text("GOOD JOB!", 300, 300);
playSuccess(); 
}
push();
timer = (resetTime-(currentTime-startTime))/1000;
textSize(30);
fill(255, 0, 200,timerAlpha);
text(floor(timer), 20, 30);
text("sec left", 92, 30);
pop();
push();
textSize(30);
fill(255, 0, 200,255);
text("Score:",width-80, 30);
text(score,width-20, 30);
pop();
}
function mousePressed(){
for(var i=germs.length-1; i>=0; i--){
germs[i].explode();
}
}
function playSuccess(){
if(play == true){
success.play();
timerAlpha = 0;
}
play = false;
}var bubbles = [];
var a = 10;
function setup() {
createCanvas(600, 600);
for (var i = 0; i < a; i++) {
bubbles[i] = new Bubble(random(width), random(height));
}
}
function draw() {
background(0);
for (var i = bubbles.length - 1; i >= 0; i--) {
bubbles[i].display();
bubbles[i].update();
if (bubbles[i].finish()) {
bubbles.splice(i, 1);
}
for (var j = 0; j < bubbles.length; j++) {
if (i != j && bubbles[i].intersects(bubbles[j])) {
bubbles[i].energy();
bubbles[j].energy();
bubbles[i].changeColor();
bubbles[j].changeColor();
}
}
}
a = a + 0.08;
}
function mousePressed() {
let b = new Bubble(mouseX, mouseY);
bubbles.push(b);
}
function Bubble(x, y) {
this.x = x;
this.y = y;
this.d = 20;
this.lifespan = 255;
this.r = 255;
this.g = 255;
this.b = 255;
this.display = function() {
noStroke();
fill(this.r, this.g, this.b, this.lifespan);
ellipse(this.x, this.y, this.d, this.d);
}
this.update = function() {
this.x = this.x + random(-2, 2);
this.y = this.y + random(-2, 2);
this.lifespan = this.lifespan - 0.5;
}
this.energy = function() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
this.intersects = function(other) {
var d = dist(this.x, this.y, other.x, other.y);
if (d <= this.d + other.d) {
for (var t = bubbles.length; t < a + 1; t++) {
bubbles.push(new Bubble(random(width), random(height)));
}
return true;
} else {
return false;
}
}
this.changeColor = function() {
this.r = 125;
this.g = 87;
this.b = 220;
}
this.finish = function() {
if (this.lifespan < 10) {
return true;
} else {
return false;
}
}
}var bubbles = [];
var a = 10;
function setup() {
createCanvas(600, 600);
for (var i = 0; i < a; i++) {
bubbles[i] = new Bubble(random(width), random(height));
}
}
function draw() {
background(0);
for (var i = bubbles.length - 1; i >= 0; i--) {
bubbles[i].display();
bubbles[i].update();
if (bubbles[i].finish()) {
bubbles.splice(i, 1);
}
for (var j = 0; j < bubbles.length; j++) {
if (i != j && bubbles[i].intersects(bubbles[j])) {
bubbles[i].energy();
bubbles[j].energy();
bubbles[i].changeColor();
bubbles[j].changeColor();
}
}
}
a = a + 0.08;
}
function mousePressed() {
let b = new Bubble(mouseX, mouseY);
bubbles.push(b);
}
function Bubble(x, y) {
this.x = x;
this.y = y;
this.d = 20;
this.lifespan = 255;
this.r = 255;
this.g = 255;
this.b = 255;
this.display = function() {
noStroke();
fill(this.r, this.g, this.b, this.lifespan);
ellipse(this.x, this.y, this.d, this.d);
}
this.update = function() {
this.x = this.x + random(-2, 2);
this.y = this.y + random(-2, 2);
this.lifespan = this.lifespan - 0.5;
}
this.energy = function() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
this.intersects = function(other) {
var d = dist(this.x, this.y, other.x, other.y);
if (d <= this.d + other.d) {
for (var t = bubbles.length; t < a + 1; t++) {
bubbles.push(new Bubble(random(width), random(height)));
}
return true;
} else {
return false;
}
}
this.changeColor = function() {
this.r = 125;
this.g = 87;
this.b = 220;
}
this.finish = function() {
if (this.lifespan < 10) {
return true;
} else {
return false;
}
}
}var circles = [];
function setup() {
createCanvas(640, 360);
background(220);
for (var i = 0; i < 25; i++) {
var circle = {
x: random(width),
y: random(width),
r: 36
};
var overlapping = false;
for (var j = 0; j < circles.length; j++) {
var other = circles[j];
var d = dist(circle.x, circle.y, other.x, other.y);
if (d <= (circles.r + other.r)) {
overlapping = true;
break;
}
}
if (overlapping == false) {
circles.push(circle);
}
}
for (var t = 0; t < circles.length; t++) {
noStroke();
fill(150, 0, 255, 100);
ellipse(circles[t].x, circles[t].y, circles[t].r * 2);
}
}
function draw() {
}var synth = new Tone.PolySynth(4, Tone.Synth).toMaster()
var e_chord = ["E3", "G3", "B3"];
var C_chord = ["C3", "E3", "G3"];
var G_chord = ["G3", "B3", "D3"];
var D_chord = ["D3", "F#3", "A3"];
var pianoPart = new Tone.Part(function(time, chord) {
synth.triggerAttackRelease(chord, "8n", time);
}, [
["0:0", e_chord],
["0:2", C_chord],
["0:4", G_chord],
["0:6", D_chord]
]).start();
pianoPart.loop = true;
pianoPart.loopEnd = "2m";
function setup() {
pianoPart.start();
Tone.Transport.start();
}
function draw() {
}
const c_width = 600;
const c_height = 400;
let active = false;
let oscillators;
let num_oscillators = 7;
let tremolo = new Tone.Tremolo(7, 0.95).start();
tremolo.type = 'triangle';
tremolo.spread = 100;
let reverb = new Tone.JCReverb(0.1);
let reverb_vol = new Tone.Volume(-8);
let master_vol = new Tone.Volume(0);
let c0 = ['A2', 'D#3', 'A3', 'C#4', 'F#4', 'C#5', 'F#5'];
let c1 = ['G#2', 'F#3', 'C#4', 'E4', 'A4', 'E5', 'A5'];
let c2 = ['B2', 'A3', 'D#4', 'F#4', 'B4', 'F#5', 'B5'];
let c3 = ['G#2', 'E3', 'G#3', 'B3', 'E4', 'B4', 'E5'];
let c4 = ['G#2', 'G#3', 'B3', 'D#4', 'G4', 'D#5', 'G5'];
let c5 = ['A2', 'D#3', 'A3', 'C#4', 'G#4', 'C#5', 'G#5'];
let line_one = [c0, c1, c2, c3, c4, c5];
let score = [];
function setup() {
createCanvas(c_width, c_height);
oscillators = build_oscillators(num_oscillators, tremolo, reverb, reverb_vol, master_vol);
cursor = new Cursor();
}
function draw() {
map_cursor_position(cursor.getPos());
}
function mousePressed() {
active = true;
tremolo.start();
let new_chord = get_new_chord();
for (let i=0; i<oscillators.length; i++) {
oscillators[i].pitch = new_chord[i];
oscillators[i].oscillator.triggerAttack(oscillators[i].pitch);
}
return false;
}
function mouseReleased() {
active = false;
oscillators.forEach(function(o) {
o.oscillator.triggerRelease();
});
return false;
}
function map_cursor_position(pos) {
let ramp_val = 0.1;
let t_control = map(pos, 0, height, 0.1, 1.0, true)
tremolo.depth.rampTo(t_control, ramp_val);
let m_vol_control = map(pos, 0, height, -20, 0, true);
master_vol.volume.rampTo(m_vol_control, ramp_val);
let r_control = map(pos, 0, height, 0.95, 0.1, true);
reverb.roomSize.rampTo(r_control, ramp_val);
let o_vol_control = map(pos, 0, height, -40, -12, true)
oscillators[0].panner.volume.rampTo(o_vol_control, ramp_val);
oscillators[oscillators.length-1].panner.volume.rampTo(o_vol_control, ramp_val);
}
function build_oscillators(num_oscillators, tremolo, reverb, reverb_vol, master_vol) {
let new_oscillators = [];
let pan_max = 0.8;
for (i=0; i<num_oscillators; i++) {
let new_oscillator = build_oscillator();
let new_panner = new Tone.PanVol(map(i, 0, num_oscillators, -0.8, 0.8), -12);
new_oscillator.chain(new_panner, tremolo, reverb, reverb_vol, master_vol, Tone.Master);
new_oscillator.chain(new_panner, tremolo, master_vol, Tone.Master);
new_oscillators.push({
oscillator: new_oscillator,
panner: new_panner,
});
}
return new_oscillators;
}
function build_oscillator() {
return new Tone.Synth({
'oscillator': {
type: ['sine', 'triangle'][floor(random(2))]
},
'envelope': {
attack: 1,
decay: 0.0,
sustain: 1,
release: 1
}
});
}
function get_new_chord() {
if (!(score.length)) {
score = shuffle_array(line_one);
}
return score.shift();
}
function shuffle_array(arr) {
let cpy = arr.slice(0);
for (var i = cpy.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1));
var temp = cpy[i];
cpy[i] = cpy[j];
cpy[j] = temp;
}
return cpy;
}
function Cursor() {
this.y = mouseY;
this.getPos = function() {
return (height - this.y)
}
const c_height = 400;
let bcg_col = {
true: {r: 220, g: 220, b: 220},
false: {r: 40, g: 40, b: 40},
curr: {r: 220,g: 220,b: 220}
}
let active = false;
const trigger_height = c_height/10;
let blocks;
let oscillators;
let num_oscillators = 7;
let tremolo = new Tone.Tremolo(7, 0.95).start();
tremolo.type = 'triangle';
tremolo.spread = 100;
let reverb = new Tone.JCReverb(0.1);
let reverb_vol = new Tone.Volume(-8);
let master_vol = new Tone.Volume(0);
let c0 = ['A2', 'D#3', 'A3', 'C#4', 'F#4', 'C#5', 'F#5'];
let c1 = ['G#2', 'F#3', 'C#4', 'E4', 'A4', 'E5', 'A5'];
let c2 = ['B2', 'A3', 'D#4', 'F#4', 'B4', 'F#5', 'B5'];
let c3 = ['G#2', 'E3', 'G#3', 'B3', 'E4', 'B4', 'E5'];
let c4 = ['G#2', 'G#3', 'B3', 'D#4', 'G4', 'D#5', 'G5'];
let c5 = ['A2', 'D#3', 'A3', 'C#4', 'G#4', 'C#5', 'G#5'];
let line_one = [c0, c1, c2, c3, c4, c5];
let score = [];
function setup() {
createCanvas(c_width, c_height);
set_background();
oscillators = build_oscillators(num_oscillators, tremolo, reverb, reverb_vol, master_vol);
blocks = new Blocks(60, trigger_height);
cursor = new Cursor();
}
function draw() {
set_background();
cursor.update(active);
cursor.show(active);
blocks.update(active);
blocks.show();
map_cursor_position(cursor.getPos());
}
function set_background() {
let lerper = 0.05;
bcg_col.curr.r = lerp(bcg_col.curr.r, bcg_col[active].r, lerper);
bcg_col.curr.g = lerp(bcg_col.curr.g, bcg_col[active].g, lerper);
bcg_col.curr.b = lerp(bcg_col.curr.b, bcg_col[active].b, lerper);
background(bcg_col.curr.r, bcg_col.curr.g, bcg_col.curr.b);
}
function mousePressed() {
active = true;
tremolo.start();
let new_chord = get_new_chord();
for (let i=0; i<oscillators.length; i++) {
oscillators[i].pitch = new_chord[i];
oscillators[i].oscillator.triggerAttack(oscillators[i].pitch);
}
return false;
}
function mouseReleased() {
active = false;
oscillators.forEach(function(o) {
o.oscillator.triggerRelease();
});
return false;
}
function map_cursor_position(pos) {
let ramp_val = 0.1;
let t_control = map(pos, 0, height, 0.1, 1.0, true)
tremolo.depth.rampTo(t_control, ramp_val);
let m_vol_control = map(pos, 0, height, -20, 0, true);
master_vol.volume.rampTo(m_vol_control, ramp_val);
let r_control = map(pos, 0, height, 0.95, 0.1, true);
reverb.roomSize.rampTo(r_control, ramp_val);
let o_vol_control = map(pos, 0, height, -40, -12, true)
oscillators[0].panner.volume.rampTo(o_vol_control, ramp_val);
oscillators[oscillators.length-1].panner.volume.rampTo(o_vol_control, ramp_val);
}
function inverted_y() {
return height - mouseY;
}
function build_oscillators(num_oscillators, tremolo, reverb, reverb_vol, master_vol) {
let new_oscillators = [];
let pan_max = 0.8;
for (i=0; i<num_oscillators; i++) {
let new_oscillator = build_oscillator();
let new_panner = new Tone.PanVol(map(i, 0, num_oscillators, -0.8, 0.8), -12);
new_oscillator.chain(new_panner, tremolo, reverb, reverb_vol, master_vol, Tone.Master);
new_oscillator.chain(new_panner, tremolo, master_vol, Tone.Master);
new_oscillators.push({
oscillator: new_oscillator,
panner: new_panner,
});
}
return new_oscillators;
}
function build_oscillator() {
return new Tone.Synth({
'oscillator': {
type: ['sine', 'triangle'][floor(random(2))]
},
'envelope': {
attack: 1,
decay: 0.0,
sustain: 1,
release: 1
}
});
}
function get_new_chord() {
if (!(score.length)) {
score = shuffle_array(line_one);
}
return score.shift();
}
function shuffle_array(arr) {
let cpy = arr.slice(0);
for (var i = cpy.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1));
var temp = cpy[i];
cpy[i] = cpy[j];
cpy[j] = temp;
}
return cpy;
}var synthScale = [];
var synth;
var note1 = "";
var note2 = "";
var note3 = "";
var note5 = "";
synth = new Tone.PolySynth({
"volume": -10,
"envelope": {
"attack": 0.5,
"decay": 0,
"sustain": 0.3,
"release": 0.5,
}
}).toMaster();
synth.set({"oscillator": {
"type": "triangle" 
}
})
Tone.Transport.bpm.value = 100;
synthScale = ["C2", "E2", "G2", "A2",
"C3", "D3", "E3", "G3", "A3", "B3",
"C4", "D4", "E4", "G4", "A4", "B4","","",""
];
var synthLoop1 = new Tone.Event(loopCallback1);
synthLoop1.loop = true;
synthLoop1.loopEnd = "4t";
function loopCallback1(time){
pos = floor(random(4,synthScale.length));
note = synthScale[pos];
var timey1 = ["16n", "8n", "16n", "4n"][floor(random(4))];
synth.triggerAttackRelease(note, timey1, time, 1.5);
note1 = note;
}
var synthLoop2 = new Tone.Event(loopCallback2);
synthLoop2.loop = true;
synthLoop2.loopEnd = "8t";
function loopCallback2(time){
pos = floor(random(0,synthScale.length));
note = synthScale[pos];
synth.triggerAttackRelease(note, "8n", time, 0.4);
note2 = note;
}
var synthLoop3 = new Tone.Event(loopCallback3);
synthLoop3.loop = true;
synthLoop3.loopEnd = "4n";
function loopCallback3(time){
pos = floor(random(0,synthScale.length-3));
note = synthScale[pos];
var fifth = Tone.Frequency(note).transpose(7);
var timey2 = ["32n", "32n", "4n"][floor(random(3))];
synth.triggerAttackRelease(note, timey2, time, 0.4);
synth.triggerAttackRelease(fifth, timey2, time, 0.2);
note3 = note;
note5 = fifth.toNote();
}
function setup(){
createCanvas(400,400);
Tone.Transport.start();
synthLoop1.start(6);
synthLoop2.start(2);
synthLoop3.start(0);
textSize(30);
}
function draw(){
background(150);
text(note1,100,100);
text(note2,100,200);
text(note3,100,300);
text(note5,200,300);
}
var portName = '/dev/cu.usbmodem1411';
var inData = 0; 
function setup() {
createCanvas(400, 400);
}
for (var i=0; i<portList.length; i++){
}
}
}
function draw() {
background(255,255,255);
var size = map(inData,0,255,255,0);
fill(size,size/3,size/2);
ellipse(width/2, height/2, size);
}
let stripes = [];
function setup(){
createCanvas(600,400);
for(var i=0; i<15; i++){
stripes.push(new Stripe());
}
}
function draw(){
background(100,100);
for(var i=0; i<stripes.length; i++){
stripes[i].show();
stripes[i].move();
stripes[i].rollover(mouseX);
}
var tree = [];
function setup(){
createCanvas(400,400);
var a = createVector(width/2, height);
var b = createVector(width/2, height-100);
var root = new Branch(a,b);
tree[0] = root;
}
function draw(){
background(0);
for(var i=0; i<tree.length; i++){
tree[i].show();
}
}
function branch(len){
line(0,0,0,-len);
if(len>4){
push();
translate(0,-len);
rotate(angle);
branch(len*0.67);
pop();
push();
translate(0,-len);
rotate(-angle);
branch(len*0.67);
pop();
}
}
function setup() {
createCanvas(400, 400);  
var angle = PI/4;
}
function gotData() {
}
function draw() {
background(0);
fill(0,0,0);
stroke(255);
strokeWeight(2);
translate(200,height);
angle = map(latestData, 0, 1023, PI/4, 0);
branch(100);
}
function branch(len){
line(0,0,0,-len);
if(len>4){
push();
translate(0,-len);
rotate(angle);
branch(len*0.67);
pop();
push();
translate(0,-len);
rotate(-angle);
branch(len*0.67);
pop();
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
}var points = [];
var xvalue = 200;
var offset = 16;
var col = 80;
function setup() {
createCanvas(710, 400);
for (var i = 0; i < 3; i++) {
points[i] = new Wave(xvalue,offset*(i*1.7),col+(i*100));
}
}
function draw() {
background(0);
for(var i=0; i<points.length; i++){
points[i].calcWave();
points[i].renderWave();
}
}
class Wave {
constructor(xvalue, offset, col){
this.xvalue = xvalue;
this.offset = offset;
this.col = col;
this.x = 0;
}
calcWave() {
this.w = width+16;
this.dx = (TWO_PI / this.period) * this.xspacing;
this.yvalues = new Array(floor(this.w/this.xspacing));
this.x = this.theta;
for (var i = 0; i < this.yvalues.length; i++) {
this.yvalues[i] = sin(this.x)*this.amplitude;
this.x+=this.dx;
}
}
renderWave() {
noStroke();
fill(this.col,this.col, this.col);
for (var x = 0; x < this.yvalues.length; x++) {
ellipse(x*(this.xspacing), this.xvalue+this.yvalues[x], 16, 16);
}		
}
function setup(){
createCanvas(400,400);
slider = createSlider(0, PI/4, 0,0.1);
var angle = PI/8;
}
function draw(){
background(0);
angle = slider.value();
stroke(255);
strokeWeight(2);
translate(200,height);
branch(100);
}
function branch(len){
line(0,0,0,-len);
if(len>4){
push();
translate(0,-len);
rotate(angle);
branch(len*0.67);
pop();
push();
translate(0,-len);
rotate(-angle);
branch(len*0.67);
pop();
}
}
var hands = [];
function setup() {
createCanvas(600, 600);
rectMode(CENTER);
for(var i=0; i<width; i+=15){
for(var j=0; j<height; j+=15){
hands.push(new Hand(i,j));
}
}
}
function draw() {
background(40);
stroke(255);
strokeWeight(2);
for(var i=0; i<hands.length; i++){
hands[i].show();
}
}
class Hand{
constructor(x,y){
this.x = x;
this.y = y;
this.r = 1;
this.d = 0
}
show(){
this.d = dist(mouseX,mouseY,this.x,this.y);
push();
translate(this.x+5,this.y+5);
rotate(this.r);
line(0, 0, 10, 10);
this.r = map(this.d,0,width/3,0,PI);
pop();
}
}var r = 0;
function setup() {
createCanvas(400, 400);
background(20);
graphics = createGraphics(400,400);
graphics.rectMode(CENTER);
}
function draw() {
graphics.background(200);
graphics.push();
graphics.translate(200, 200);
graphics.rotate(r);
graphics.fill(200, 0, 100);
graphics.stroke(2);
graphics.rect(0, 0, 50, 50);
r += 0.1;
image(graphics, 0, 0);
graphics.pop();
}
var gravity = 0.1;
var particles = [];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(250);
for(let particle of particles){
particle.show();
particle.update();
}
}
function mousePressed(){
var col = random(10,100);
var diameter = random(10,100);
particles.push(new Particle(mouseX, mouseY, diameter, col));
}
class Particle{
constructor(x, y, d, c){
this.x = x;
this.y = y;
this.d = d;
this.c = c;
this.yspeed = 0;
this.yspeedacc = 1;
this.mass = map(this.d,10,100,0.0001,0.001);
}
update(){
this.y += this.yspeed;
this.yspeed += gravity;
if(this.y > height-this.d/2){
this.y = height-this.d/2;
this.yspeed *= -0.9 * this.yspeedacc;
}
if(this.yspeedacc>0){
this.yspeedacc -= this.mass;
}
}
show(){
fill(this.c, this.c, this.c,180);
noStroke();
ellipse(this.x, this.y, this.d, this.d);
}
}var osc1, osc2;
var ampEnv1, ampEnv2;
ampEnv1 = new Tone.AmplitudeEnvelope({
"attack": 0.01,
"decay": 0.6,
"sustain": 1.0,
"release": 0.9
})
osc1 = new Tone.Oscillator('C2', "triangle")
osc1.connect(ampEnv1).toMaster();
osc1.start();
osc1.volume = 1;
ampEnv2 = new Tone.AmplitudeEnvelope({
"attack": 0.01,
"decay": 1,
"sustain": 1.0,
"release": 0.9
});
osc2 = new Tone.Oscillator("B3", "sine");
osc2.connect(ampEnv2).toMaster();
osc2.start();
osc2.volume = 1;
var synth = new Tone.Synth({
"oscillator": {
"type": "sine"
},
"envelope": {
"attack": 0.2,
"decay": 0,
"sustain": 1,
"release": 0.2
}
});
var synth2 = new Tone.MonoSynth({
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0,
"decay": 0,
"sustain": 1,
"release": 0
},
"filter": {
"type": "lowpass",
"frequency": 100,
"rolloff": -12,
"Q": 0.2,
"gain": 1
}
});
var chorus = new Tone.Chorus(4, 2.5, 1);
var delay = new Tone.PingPongDelay("16n", 10);
var feedback = new Tone.FeedbackEffect(0.001);
var effect = new Tone.Effect(0.5);
var gain = new Tone.Gain(1);
var gain2 = new Tone.Gain(0.5);
var phaser = new Tone.Phaser({
"frequency" : 5,
"octaves" : 2,
"baseFrequency" : 400
});
synth.connect(phaser).connect(chorus).connect(effect).connect(gain);
gain.toMaster();
synth2.connect(phaser).connect(gain2);
gain2.toMaster();
var lfo = new Tone.LFO("16t", 1, 10);
lfo.connect(synth.volume);
lfo.connect(osc1.volume);
lfo.start();
var lfo2 = new Tone.LFO("64n",5, 10);
lfo2.connect(osc2.volume);
lfo2.connect(synth2.volume);
lfo2.start();
const notes = [
'C4', 'E4', 'G4', 'B4', 'C5', 'B4', 'G4', 'E4'
];
var index = 0;
Tone.Transport.scheduleRepeat(repeat, "8n");
function repeat(time) {
let note = notes[index % notes.length];
synth.triggerAttackRelease(note, "8n", time);
index++;
}
Tone.Transport.bpm.value = 140;
Tone.Transport.start();
function setup() {
createCanvas(400, 400);
console.log("use keys A S D F to play synth2");
var osc1Button = createButton("OSC1");
osc1Button.position(10,100);
osc1Button.mouseClicked(toggleOSC1);
var osc2Button = createButton("OSC2");
osc2Button.position(10+50,100);
osc2Button.mouseClicked(toggleOSC2);
var synth1Button = createButton('Bassline');
synth1Button.position(10+100,100);
synth1Button.mouseClicked(toggleSynth1);
}
function draw() {
background(220);
}
function toggleOSC1(){
if(osc1.state == "started"){
osc1.stop();
} else {
osc1.start();
}
}
function toggleOSC2(){
if(osc2.state == "started"){
osc2.stop();
} else {
osc2.start();
}
}
function toggleSynth1(){
if(Tone.Transport.state == "started"){
Tone.Transport.stop();
synth1Button.html('Bassline');
} else {
Tone.Transport.start();
synth1Button.html('Stop');
}
}
function keyPressed(){
synth2.triggerAttackRelease("B1");
synth2.triggerAttackRelease("C2");
synth2.triggerAttackRelease("D2");
synth2.triggerAttackRelease("E2");
}
}
var offset;
var angle;
var scalar;
var X;
var Y;
var side;
var grey;
let circles = [];
let num = 800;
let  r = 0;
function setup() {
createCanvas(500, 500);
background(220);
offset = width / 2;
angle = 1;
scalar = 5;
side = 20;
grey = 255;
for(let i=0; i<num;i++){
X = offset + sin(angle)*scalar - width/2;
Y = offset + cos(angle)*scalar - height/2;
circles[i] = new Circle(X, Y, side, grey);
angle += 1;
scalar += 1/2;
side += 0.05;
grey -= 0.6;
}
}
function draw() {
background(220);
push();
translate(width/2,height/2);
rotate(r);
r++;
for(let i=0; i<circles.length;i++){
circles[i].makeCircle();
}
pop();
}
class Circle {
constructor(X,Y,side,grey) {
this.x = X;
this.y = Y;
this.side = side;
this.grey = grey;
}
makeCircle() {
fill(this.grey);
stroke(this.grey);
ellipse(this.x, this.y, this.side, this.side);
}
}let points = [];
let num = 5;
let r;
function setup(){
createCanvas(400,400);
for(let i=0; i<num; i++){
points[i] = new Point((75*i+50)-200, 200-200, 40);
}
}
function draw(){
background(240);
stroke(0);
line(width/2,0, width/2, height);
line(0,height/2, width, height/2);
push();
translate(200,200);
r = map(mouseX, 0, width, 0, PI);
rotate(-r);
for(let i=0; i<num; i++){
points[i].display();
}
pop();
}
class Point{
constructor(x, y, r){
this.x = x;
this.y = y;
this.r = r;
}
display() {
noStroke();
fill(100);
ellipse(this.x, this.y, this.r);
}
}
var num = 3;
var globalBackgroundClicked = false;
function setup() {
createCanvas(600, 400);
for(let i=0; i<num; i++){
bubbles[i] = new Bubble();
}
}
function draw() {
background(255);  
for (let i=0; i<bubbles.length; i++) {
bubbles[i].createBubble();
bubbles[i].moveBubble();
let d = dist(mouseX, mouseY, bubbles[i].x,bubbles[i].y);
if(d<=bubbles[i].r){
bubbles[i].c =200;
} else {
bubbles[i].c = 100;
}
}
for (let i=0; i<bubbles.length; i++) {
if(bubbles[i].dead){
bubbles.splice(i,1);
bubbles.pop();
} 
}
}
function mousePressed() {
for (let i=0; i<bubbles.length;i++) {
bubbles[i].clicked();
}
bubbles.push(new Bubble(mouseX, mouseY));
}var offset;
var angle;
var scale;
var X;
var Y;
var side;
var grey;
var r, c;
let graphics;
function setup() {
createCanvas(400, 400);
graphics = createGraphics(400,400);
graphics.background(220);
colorMode(HSB, height, height, height);  
rectMode(CENTER);
offset = width/2;
angle = 1;
scale = 5;
side = 20;
grey = 255;
}
function draw() {
push();
r = map(mouseX, 0, 255, 0, PI);
rotate(r);
X = offset + sin(angle)*scale;
Y = offset + cos(angle)*scale;
graphics.fill(grey);
graphics.stroke(grey);
graphics.ellipse(X, Y, side, side);
angle += 1;
scale += 1/2;
side += 0.05;
grey -= 0.8;
if(X>width-5 && Y>height-5){
}
image(graphics, 0, 0);
pop();
}var slider = []; 
var x;
var angle = 0;
var offset = 0;
function setup() {
for(let i=0; i<60; i++){
slider[i] = createSlider(0,255,200);
}
}
function draw() {
for(let i=0; i<slider.length; i++){
x = map(sin(angle+offset)*i/100,-1,1,0,255);
slider[i].value(x);
offset += 0.025;
}
angle+=0.01;
}var germs = [];
var num = 12;      
var currentTime = 0;
var startTime = 0;
var germPop;
var success;
var scream;
var timerAlpha = 250;
var score = 0;
var timer;
var hands;
var play = true;
var resetTime = 10000;
function preload(){
hands = loadImage('images/backgroundgame.png');
germ = loadImage('images/CUTEGERM.png');
germPop = loadSound('sounds/pop.wav');
success = loadSound('sounds/success.wav');
scream = loadSound('sounds/scream.wav');
}
function setup() {
createCanvas(600, 400);
textSize(60);
textAlign(CENTER);
germPop.setVolume(2);
success.setVolume(0.2);
scream.setVolume(0.8);
imageMode(CENTER);
for(var i=0; i<num; i++){
germs[i] = new Germ();
}
console.log("Kill the germs in under "+resetTime/1000+" seconds before they repoduce!");
startTime = millis();
}
function draw() {
background(255);
scream.rate(random(4,8));
push();
imageMode(CORNER);
image(hands,0,0);
pop();
for(var i=0; i<germs.length;i++){
germs[i].display();
germs[i].move();
if(germs[i].disappear()){
germs.splice(i,1);
console.log(germs.length + " germs left!");
}
if(currentTime-startTime >= resetTime){
for(var t=germs.length; t<num; t++){
germs[t] = new Germ();
console.log("Oops! Time ran out! The germs reproduced!");
germPop.play();
} 
startTime = millis();
score = score - 5;
}
}
if(germs.length === 0){
fill(10, 32, 240,150);
text("GOOD JOB!", 300, 300);
playSuccess(); 
}
push();
timer = (resetTime-(currentTime-startTime))/1000;
textSize(30);
fill(255, 0, 200,timerAlpha);
text(floor(timer), 20, 30);
text("sec left", 92, 30);
pop();
push();
textSize(30);
fill(255, 0, 200,255);
text("Score:",width-80, 30);
text(score,width-20, 30);
pop();
}
function mousePressed(){
for(var i=0; i<germs.length; i++){
germs[i].explode();
}
}
function playSuccess(){
if(play == true){
success.play();
timerAlpha = 0;
}
play = false;
}var synth;
var velocity;
var myScale;
var note;
var pos;
var cellWidth;
function setup() {
createCanvas(630, 420);
synth = new Tone.Synth().toMaster();
myScale = ["C3", "D3", "E3", "G3", "A3",
"C4", "D4", "E4", "G4", "A4",
"C5", "D5", "E5", "G5", "A5", "C6" ];
w = width*3;
dx = (TWO_PI / period) * xspacing;
yvalues = new Array(floor(w/xspacing));
}
function draw() {
background(0, 50);
amplitude = ceil(map(velocity,10,-10,120,10));
period = floor(map(pos,0,myScale.length-1,500,100));
xspacing = map(period,100,500,10,20);
calcWave();
renderWave();
}
function calcWave() {
theta += 0.02;
var x = this.theta;
for (var i = 0; i < yvalues.length; i++) {
yvalues[i] = sin(x)*amplitude;
x+=dx;
}
}
function renderWave() {
stroke(255);
strokeWeight(15-pos);
for (var x = 0; x < yvalues.length; x++) {
line(x*xspacing, height/2+yvalues[x]-20, x*xspacing,height);
}
}
function mouseMoved(){
pos = floor(map(mouseX,0,width,0,myScale.length-1));
note = myScale[pos];
synth.triggerAttackRelease(note, 0.01);
console.log(pos, velocity);
velocity = floor(map(mouseY,0,height,10,-10));
synth.volume.value = velocity;
}
var germs = [];
var num = 12;      
var currentTime = 0;
var startTime = 0;
var germPop;
var success;
var scream;
var timerAlpha = 250;
var score = 0;
var timer;
var hands;
var play = true;
var resetTime = 10000;
function preload(){
hands = loadImage('images/backgroundgame.png');
germ = loadImage('images/CUTEGERM.png');
germPop = loadSound('sounds/pop.wav');
success = loadSound('sounds/success.wav');
scream = loadSound('sounds/scream.wav');
}
function setup() {
createCanvas(600, 400);
textSize(60);
textAlign(CENTER);
germPop.setVolume(2);
success.setVolume(0.2);
scream.setVolume(0.8);
for(var i=0; i<num; i++){
germs[i] = new Germ();
}
console.log("Kill the germs in under "+resetTime/1000+" seconds before they repoduce!");
startTime = millis();
}
function draw() {
background(255);
image(hands,0,0);
scream.rate(random(4,8));
for(var i=0; i<germs.length;i++){
germs[i].display();
germs[i].move();
if(germs[i].disappear()){
germs.splice(i,1);
console.log(germs.length + " germs left!");
}
if(currentTime-startTime >= resetTime){
for(var t=germs.length; t<num; t++){
germs[t] = new Germ();
console.log("Oops! Time ran out! The germs reproduced!");
germPop.play();
} 
startTime = millis();
score = score - 5;
}
}
if(germs.length === 0){
fill(10, 32, 240,150);
text("GOOD JOB!", 300, 300);
playSuccess(); 
}
push();
timer = (resetTime-(currentTime-startTime))/1000;
textSize(30);
fill(255, 0, 200,timerAlpha);
text(floor(timer), 20, 30);
text("sec left", 92, 30);
pop();
push();
textSize(30);
fill(255, 0, 200,255);
text("Score:",width-80, 30);
text(score,width-20, 30);
pop();
}
function mousePressed(){
for(var i=0; i<germs.length; i++){
germs[i].explode();
}
}
function playSuccess(){
if(play == true){
success.play();
timerAlpha = 0;
}
play = false;
var synth;
function setup() {
createCanvas(620, 200);
synth = new Tone.Synth().toMaster();
}
function draw() {
background(0);
}
function mousePressed(){
var myScale = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", 
"C4", "D4", "E4", "F4", "G4", "A4", "B4", 
"C5", "D5", "E5", "F5", "G5", "A5", "B5" ];
var pos = int(random(0, myScale.length));
var note = myScale[pos];
synth.triggerAttackRelease(note, 0.1);  
}var nSteps = 8;
var nTracks = 4;
var kit;
var cellWidth, cellHeight;
var beats = 0;
var cells = [];
var currentStep = 0;
var playButton;
var drumNames = ["hho", "hh", "snare", "kick"];
kit = new Tone.Players(
{"hho" : "/samples/505/hho.mp3",
"hh" : "/samples/505/hh.mp3",
"snare" : "/samples/505/snare.mp3",
"kick" : "/samples/505/kick.mp3"
});
kit.toMaster();
Tone.Transport.bpm.value = 180;
Tone.Transport.scheduleRepeat(onBeat, "8n");
function setup(){
createCanvas(600,300);
cellWidth = width/nSteps;
cellHeight = height/nTracks;
for(var track=0; track<nTracks; track++){
cells[track] = [];
for(var step=0; step<nSteps; step++){
cells[track][step] = -1;
}
}  
playButton = createButton('Play');
playButton.position(550, 300);
playButton.mouseClicked(togglePlay);
}
function onBeat(time){
for(var track=0; track<nTracks; track++){
if(cells[track][currentStep] == 1){
var drum = kit.get(drumNames[track]);
drum.start(time);
}
}
beats++;
currentStep = (beats) % nSteps;
console.log(beats, currentStep);
}
function draw(){
background(255);
stroke(0);
for(var track=0; track<nTracks; track++){
for(var step=0; step<nSteps; step++){
if(cells[track][step] == 1){
fill(150 - track*30);
rect(step*cellWidth,track*cellHeight,cellWidth, cellHeight);
}
}
}
for(var i=0; i<nSteps; i++){
line(i*cellWidth,0,i*cellWidth,height);
}
for(var j=0; j<nTracks; j++){
line(0,j*cellHeight,width,j*cellHeight);
}
highlight = (beats-1) % nSteps;
fill(200, 60);
noStroke();
rect(highlight*cellWidth, 0, cellWidth, height);
}
function mousePressed(){
if(0<mouseX && mouseX<width && 
0<mouseY && mouseY<height){
var i = floor(mouseX/cellWidth);
var j = floor(mouseY/cellHeight);
cells[j][i] = -cells[j][i];
}
}
function togglePlay(){
if(Tone.Transport.state == "started"){
Tone.Transport.stop();
playButton.html('Play');
} else {
Tone.Transport.start();
playButton.html('Stop');
}
}
function setup() {
createCanvas(600, 600);
rectMode(CENTER);
}
function draw() {
background(0);
fill(255);
noFill();
translate(300, 300);
for (let x = 420; x >= 1; x = x / 1.1) {
rotate(radians(frameCount/6));
noStroke();
fill(0, 150, 220, 22);
rect(0, 0, x, x);
}
}
let ball = [];
let xspeed;
let a = 70;
let color;
let t;
function setup() {
createCanvas(400, 400);
for(var i=0; i<a; i++){
let j = random(40, 360);
color = random(0,255);
ball[i] = new Ball(j, random(20,60),color);
}
}
function draw() {
background(220);
xspeed = random(-2,2);
t=0;
release();
}
function release(){
ball[t].display();
ball[t].move();  
if(ball[t].y<350){
t++;
if(t<ball.length){
release();
}
}
}
class Ball {
constructor(x, d, c){
this.x = x;
this.y = height-20;
this.diameter = d;
this.rise = random(0.1, 2);
this.c = c;
}
display(){
fill(this.c);
noStroke();
ellipse(this.x, this.y, this.diameter);
}
move(){
this.x += xspeed;
this.y -= this.rise;
} 
}var offset;
var angle; 
var scale;
var X;
var Y;
var side;
var grey;
var r, c;
function setup() {
createCanvas(400, 400);
background(220);
colorMode(HSB, height, height, height);  
rectMode(CENTER);
offset = width/2;
angle = 1;
scale = 5;
side = 20;
grey = 255;
}
function draw() {
X = offset + sin(angle)*scale;
Y = offset + cos(angle)*scale;
fill(grey);
noStroke();
ellipse(X, Y, side, side);
angle += 1;
scale += 1/2;
side += 0.05;
grey -= 0.8;
if(X>width-5 && Y>height-5){
noLoop();
}
}var kick = new Tone.Player("sounds/kick.wav").toMaster();
var synth = new Tone.Player("sounds/synth.wav").toMaster();
var hihat = new Tone.Player("sounds/hihat.wav").toMaster();
Tone.Transport.bpm.value = 120;
Tone.Transport.scheduleRepeat(playkick, "4n");
Tone.Transport.scheduleRepeat(playhihat, "16n");
Tone.Transport.start();
function setup() {
createCanvas(400,400);
background(0);
frameRate(60);
}
function draw() {
textSize(30);
fill(255);
text('YESSSSSSS!',width/4,height/2);
}
function playkick() {
if (kick.loaded) {
kick.start();
}
}
function playsynth() {
if (synth.loaded) {
var beat = Tone.Transport.position.split(":")[1];
var sixteenth = Tone.Transport.position.split(":")[2] | 0;
if (beat == 0 || beat == 2) {
if (sixteenth == 1 || sixteenth == 3) {
synth.start();
}
} else {
if (sixteenth == 2) {
synth.start();
}
}
}
}
function playhihat() {
if (hihat.loaded) {
var beat = Tone.Transport.position.split(":")[1];
var sixteenth = Tone.Transport.position.split(":")[2] | 0;
if (beat == 0) {
if (sixteenth == 2) {
hihat.start();
}
} else if (beat == 1 || beat == 3) {
if (sixteenth == 1 || sixteenth == 2) {
hihat.start();
}
} else {
if (sixteenth == 2 || sixteenth == 3) {
hihat.start();
}
}
}
var ambient;
var signal;
var fft, noise, filter;
var aPressed = false;
ambient = loadSound('sounds/ambient.wav');
signal = loadSound('sounds/signal.wav');
}
function setup() {
createCanvas(640, 360);
background(220);
frameRate(30);
filter = new p5.BandPass();
fft = new p5.FFT();
noise = new p5.Noise();
noise.disconnect();
noise.connect(filter);
noise.start();
}
function draw() {
var freq = map(mouseX, 0, width, 20, 10000);
filter.freq(freq);
filter.res(50);
if (aPressed === true) {
for (x = 0; x < width; x = x + res) {
for (y = 0; y < height; y = y + res) {
noStroke();
if (mouseIsPressed) {
fill(random(0, 255), random(0, 255), random(0, 255));
} else {
fill(random(0, 255));
}
rect(x, y, res, res);
}
}
}
for (i = 0; i < width; i = i + res) {
var distance = abs(map(mouseX - i, 0, 640, 0, 255));
noStroke();
if (mouseX > 0 && mouseX < width && mouseY < height && mouseY > 0) {
fill(distance, 150);
} else {
fill(distance, 0);
}
rect(i, 0, res, height);
}
isMouseOverCanvas();
}
function keyPressed() {
if (key === 'a') {
if (!ambient.isPlaying()) {
ambient.loop();
console.log(key)
} else if (ambient.isPlaying()) {
ambient.stop();
console.log(key)
}
}
aPressed = !aPressed;
}
function mousePressed() {
if (aPressed === true) {
signal.setVolume(0.5);
signal.loop();
console.log("mousepressed");
}
}
function mouseReleased() {
if (aPressed === true) {
signal.stop();
}
}
function isMouseOverCanvas() {
if (mouseX > 0 && mouseX < width && mouseY < height && mouseY > 0) {
noise.amp(0.5, 0.2);
} else {
noise.amp(0, 0.2);
}
let c_height = 700;
let txt = 'click'
let particles = [];
function preload() {
bell = loadSound('bell.wav')
}
function setup() {
createCanvas(c_width, c_height);
background(220);
for (var i = 0; i < width; i++) {
particles.push(new Particle(i, height));
}
delay = new p5.Delay();
delay.setType('pingPong');
delay.process(bell, 0.9, 0.8, 3000);
reverb = new p5.Reverb();
reverb.process(delay, 3, 2);
}
function draw() {
background(220);
textSize(32);
fill(50);
text(txt, 10, 30);
for (var i = 0; i < particles.length; i++) {
particles[i].update();
particles[i].show();
}
}
function keyReleased() {
playSound();
}
function mouseClicked() {
txt = 'press any button';
}
function playSound() {
let start_time = 0;
let playback_speed = int(random(-20, 20)) / 2;
let choose_sound = int(random(10));
let amp = random(0.2, 0.8);
bell.play(start_time, playback_speed, amp);
for (var i = 0; i < particles.length; i++) {
particles[i].launch();
}
txt = '';
return bell;
var sound;
var pan = {}
var speed = {}
var loop1;
var lb1;
var particlesQuantity = 22222;
var positionX = new Array(particlesQuantity);
var positionY = new Array(particlesQuantity);
var velocityX = new Array(particlesQuantity).fill(0);
var velocityY = new Array(particlesQuantity).fill(0);
function setup() {
createCanvas(windowWidth, windowHeight);
sound = loadSound('waves.mp3', loaded);
loop1 = loadSound('lonely.wav');
lb1 = new lb(width/2, height/2, 64);
for (var particle = 1; particle < particlesQuantity; particle++) {
positionX[particle] = random(0, width);
positionY[particle] = random(0, height);
}
positionX[0] = 0;
positionY[0] = 0;
}
function loaded() {
console.log("loaded");
sound.play();
sound.setVolume(1);
}
function draw() {
background(0, 128);
pan.x = constrain(mouseX, 0, width); 
var panning = map(pan.x, 0, width,-1.0, 1.0);
sound.pan(panning);
speed.y = constrain(mouseY, 0, height); 
var rate = map(speed.y, 0, height ,0.5, 1.5);
sound.rate(rate);
lb1.display(mouseX, mouseY);
velocityX[0] = velocityX[0] *0.5 + (mouseX - positionX[0]) * 0.1;
velocityY[0] = velocityY[0] *0.5 + (mouseY - positionY[0]) * 0.1;
positionX[0] += velocityX[0];
positionY[0] += velocityY[0];
for (var particle = 1; particle < particlesQuantity; particle++) {
var whatever = 1024 / (sq(positionX[0] - positionX[particle]) + sq(positionY[0] - positionY[particle]));
velocityX[particle] = velocityX[particle] + (velocityX[0] - velocityX[particle]) * whatever ;
velocityY[particle] = velocityY[particle] + (velocityY[0] - velocityY[particle]) * whatever ;
positionX[particle] += velocityX[particle];
positionY[particle] += velocityY[particle];
if ((positionX[particle] < 0 && velocityX[particle] < 0) || (positionX[particle] > width && velocityX[particle] > 0)) {
velocityX[particle] = -velocityX[particle];
}
point(positionX[particle], positionY[particle]);
}
}
function mouseMoved(){
if (lb1.contains(mouseX, mouseY)) {
loop1.play();
loop1.setVolume(0.5);}
else{
loop1.pause();
}
}
var lb = function(x_, y_, r_) {
var x = x_;
var y = y_;
var r = r_;
this.contains = function(mx, my) {
if (dist(mx, my, x, y) < r) {
return true;
} else {
return false;
}
};
this.display = function(mx, my) {
if (this.contains(mx, my)) {
blendMode(ADD)
stroke(random(0,255), random(0,255), random(0,255))
}
else {
blendMode(BLEND)
background(0, 128);
stroke(64, 255, 255);
}
};
};
function mousePressed() {
for (var particle = 1; particle < particlesQuantity; particle++) {
positionX[particle] = random(0, width);
positionY[particle] = random(0, height);
}
}
var r;
var x, y;
var b, s, e;
function setup() {
createCanvas(400, 400);
background(255);
rectMode(CENTER);
b = 100;
s = b * 2;
e = 3;
}
function draw() {
x = mouseX
y = mouseY;
smooth();
}
function mouseDragged() {
noStroke();
fill(0);
rect(x, y, width / b, height / b, e);
rect(width - x, height - y, width / b, height / b, e);
}
function mousePressed(){
noStroke();
fill(0);
rect(x, y, width / b, height / b, e);
rect(width - x, height - y, width / b, height / b, e);
}var r;
var x, y;
var b, s;
function setup() {
createCanvas(400, 400);
background(250);
rectMode(CENTER);
x = 0;
y = 0;
b = 4;
s = b*2;
}
function draw() {
noStroke();
r = random(0, 1);
if (r < 0.15) {
fill(250);
rect(x, y, width/b, height/b);
fill(0);
rect(width-x, height-y, width/b, height/b);
} else {
fill(0);
rect(x, y, width/b, height/b);
fill(250);
rect(width-x, height-y, width/b, height/b);
}
y = y + height/s;
if(y>=height/2){
y = 0;
x = x + width/b;
}
}var r;
var x, y;
var b, s;
function setup() {
createCanvas(400, 400);
background(220);
x = 0;
y = 0;
b = 20;
s = b*2;
}
function draw() {
noStroke();
r = random(0, 1);
if (r < 0.5) {
fill(255);
rect(x, y, width/b, height/b);
fill(0)
rect(x + width/s, y + height/s, width/s, height/s);
} else {
fill(255);
rect(x, y, width/b, height/b);
fill(0);
rect(x, y + height/s, width/s, height/s);
}
x = x + width/s;
if(x>width){
x = 0;
y = y + height/b;
}
var kit = new Tone.Players({
"kick": "samples/505/kick.mp3",
"snare":"samples/505/snare.mp3"
});
kit.toMaster();
Tone.Transport.bpm.value = 60;
Tone.Transport.scheduleRepeat(playRhythm1, 1/3);
Tone.Transport.scheduleRepeat(playRhythm2, 1/2);
Tone.Transport.start();
function playRhythm1() {
if (kit.loaded) {
kit.get("kick").start();
}
}
function playRhythm2() {
if (kit.loaded) {
kit.get("snare").start();
}
}
function setup() {
}
function draw() {
var kit = new Tone.Players({
"kick": "samples/505/kick.mp3",
"snare":"samples/505/snare.mp3",
});
var randomNumber = 0;
var tempo;
var mic, amp, scale;
kit.toMaster();
Tone.Transport.timeSignature = [4,4];
Tone.Transport.scheduleRepeat(playBeat, "4n");
Tone.Transport.start();
function setup() {
createCanvas(400,400);
tempo = createSlider(200, 350, 280, 20);
Tone.Transport.bpm.value = tempo.value();
mic = new p5.AudioIn();
mic.start();
amp = new p5.Amplitude();
amp.setInput(mic);
scale = 1.0
}
function draw() {
background(220);
scale = map(amp.getLevel(), 0, 1.0, 10, width);
fill(255,100);
ellipse(width/2, height/2, scale*20, scale*20);
}
function playBeat() {
randomNumber = int(random(0,3));
if (kit.loaded) {
let beat = Tone.Transport.position.split(":")[1];
console.log(beat, randomNumber);
console.log(tempo.value(), Tone.Transport.bpm.value = tempo.value());
if(beat >= randomNumber-1){
kit.get("kick").start();
}
if (beat == 2){
kit.get("snare").start();
}
}
}
var lastTime;
function preload(){
kick = loadSound('sounds/kick.mp3');
}
function setup() {
createCanvas(600, 400);
background(100, 233, 100);
setInterval(audioLoop, 1000);
}
function draw(){
for(let i = 0; i < 10; i++){
ellipse(random()*width, random()*height, 100, 100);
}
}
function audioLoop(){
kick.play();
}
var video;
var size;
var dimensionX = 640;
var dimensionY = 480;
var direction = 1;
var block = {
x: 0,
y:0,
sizeX:0,
sizeY: 0
}
var rotations = [];
function setup() {
createCanvas(dimensionX, dimensionY);
background(0);
frameRate(1);
block.sizeX = width/8;
block.sizeY = height/6;
}
function draw() {
if ((block.x == width) || ((block.x == -80)&&direction<0)) {
direction = -direction;
block.x = block.x + direction*block.sizeX;
block.y += block.sizeY;
}
rect(block.x,block.y,block.sizeX,block.sizeY);
block.x =block.x + direction*block.sizeX;
if(mouseX>block.x --- how do i reference a rect? 
neither are we using for loop nor are we using an array 
i think we should use an array
another idea could be to use a virtual 'window'
}
let kick, snare, hh;
let lastTime;
let count;
let temp;
function preload(){
kick = loadSound('sounds/kick.mp3');
snare2 = loadSound('sounds/snare-pop.wav');
hh = loadSound('sounds/hats-open.wav');
}
function setup() {
createCanvas(600, 400);
background(100, 233, 100);
lastTime = 0;
randomNumber = random(0,1);
count = 1;
snare2.setVolume(0.6);
hh.setVolume(0.2);
temp = createSlider(100,400,300,20);
}
function draw(){
if((millis() - lastTime) > temp.value()){
randomNumber = random(0,1);
if(randomNumber<0.4){
kick.setVolume(random(0.1,0.3));
} else {kick.setVolume(1.2);
}
kick.play();
if(count%4==0){
snare2.play();
}
lastTime = millis();
count = count+1;
ellipse(width/2,height/2,100,100);
} 
}
let video;
function setup() {
createCanvas(400, 400);
background(220);
video = createCapture(VIDEO);
video.size(320, 240);
}
function draw() {
}var x = 0;
var y = 0;
function setup() {
createCanvas(640, 360);
background(255);
}
function draw() {
if (random(1) > 0.5) {
line(x, y, x+20, y+20);
} 
else {
line(x, y+20, x+20, y);
}
x += 20;
if (x > width) {
x = 0;
y += 20;
}
if (y > height) {
background(255);
x = 0;
y = 0;
}
}
let Ydir = 2;
let expand = 1;
let increasing = true;
let d = 40;
let x = d/2;
let y = d/2
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for(var i=0; i<width; i=i+50){
for(var j=0; j<height; j+=50){
if(x>i && x<i+50 && y>j && y<j+50){
fill(55,0,155,100);
} else {
fill(255);
}
rect(i, j, 100, 100);
}
}
fill(0);
ellipse(x, y, d, d);
x += Xdir;
y += Ydir;
if(x > 400 || x < 0){
Xdir *= -1;
}
if(y > 400 || y < 0){
Ydir *= -1;
}
}function setup() {
createCanvas(600, 400);
background(220);
pointX = random(width/2-100,width/2+100);
pointY = random(height/2-100,height/2+100);
numberOfPoints = 2;
rand = random(-1.5,0.5);
frameRate(30);
}
function draw() {
strokeWeight(1);
for(var j=0; j<height; j+=height/numberOfPoints){
stroke(random(255), random(255), random(255),50);
line((j*rand)+pointX, (j*rand)+pointY, mouseX, mouseY);
strokeWeight(2);
stroke(5,255);
line(mouseX, mouseY, pmouseX, pmouseY);
}
}
function mousePressed(){
background(220);
pointX = random(width/2-100,width/2+100);
pointY = random(height/2-100,height/2+100);
}let targetXleft, targetYleft;
let targetXright,targetYright;
let Xleft, Yleft;
let Xright, Yright;
var r, g, b;
function setup() {
createCanvas(400, 400);
frameRate(2);
x = width/2-50;
y = 200;
r = random(0,255);
g = random(0,255);
b = random(0,255);
}
function draw() {
background(240);
var i = 0;
for (i = 0; i<250; i++){
noFill();
stroke(0, random(0,255), random(0,255),100);
strokeWeight(random(2,6));
arc(random(width/2-75, width/2+75),random(height/2-75,height/2+85),random(50,100), random(50,150), random(0,PI),random(0,PI));
}
fill(255);
strokeWeight(4);
ellipse(width/2-50, 200, 50, 50);
ellipse(width/2+50, 200, 50, 50);
fill(0);
targetXleft = map(mouseX, 0, 400, width/2-50-20,width/2-50+20 );
targetYleft = map(mouseY, 0, 400, 200-20, 200+20);
ellipse(targetXleft, targetYleft, 20, 20);
targetXright = map(mouseX, 0, 400, width/2+50-20,width/2+50+20 );
targetYright = map(mouseY, 0, 400, 200-20, 200+20);
ellipse(targetXright, targetYright, 20, 20);
stroke(0, random(0,255), random(0,255),100);
strokeWeight(20);
var a;
a = random(1,10);
if(round(a)%2){
fill(0);
} else {
fill(255);
}
ellipse(200,280,random(20,100),random(30,80));
push();
rectMode(CENTER);
fill(255,0,0);
stroke(1);
strokeWeight(2);
rect(mouseX, mouseY, 40, 20, 20);
fill(r, g, b);
noStroke();
rect(mouseX+10, mouseY, 5, 18);
rect(mouseX-10, mouseY, 5, 18);
rect(mouseX, mouseY, 5, 18);
stroke(1);
triangle(mouseX+20, mouseY, mouseX+20+10,mouseY+10, mouseX+20+10,mouseY-10);
triangle(mouseX-20, mouseY, mouseX-20-10,mouseY+10, mouseX-20-10,mouseY-10);
pop();
}let g, r, thickness;
let sound;
let mapRate;
function preload() {
sound = loadSound('sounds/wrong.wav');
}
function setup() {
createCanvas(400, 400);
r = 0;
g = 0;
thinkness = 10;
}
function draw() {
background(220);  
fill(0);
text("bring the mouse over here if you want the sound to stop", 50,height-8);  
noStroke();
fill(0,255,255,80);
rect(0,380,width,height);
strokeWeight(thickness);
stroke(r,g,0);
line(0,mouseX,width, mouseY);
if (mouseY<380) {
if(abs(mouseX-mouseY)<5) {
r = 0;
g = 255;
} else {
strokeWeight(1+random(0.5,-0.5));
stroke(255,0,0,40);
line(0,0,width,height);
r = 255;
g = 0;
thickness = 10+random(-1,4);
sound.play();
}
}
}let r, g, b;
let rectX, rectY, Xloc;
let change, angle;
function setup() {
createCanvas(400, 400);
background(240);
r = 0;
g = 0;
b = 0;
rectX = 20;
rectY = 20;
Xloc = 100;
change = 20;
angle = PI;
}
function draw() {
ellipse(100+20*sin(angle),100, Xloc,Xloc);
Xloc -= 0.1;
angle += 0.1;
}
function mousePressed() {
r = random(255);
g = random(255);
b = random(255);
rectMode(CENTER);
noStroke();
fill(r,g,b);
rect(width/2, height/2,rectX, rectY);
rectX = rectX + change;
rectY = rectY + change;
if (rectX>400 || rectX<20) {
change = change * -1;
}
}
let bubble1, clunk, ping, zoom, flutter, wood, popp, error, increase; 
var bubbleswitch=false;
let bubble1angle, clunkangle, a, b, c, d, e, f, g, h, value;
function preload(){
bubble1 = loadSound('sounds/bubble1.wav');
clunk = loadSound('sounds/clunk.mp3');
ping = loadSound('sounds/ping.wav');
zoom = loadSound('sounds/space boom.flac');
flutter = loadSound('flutter.wav');
error = loadSound('error.wav');
increase = loadSound('sounds/increase.wav');
wood = loadSound('sounds/wood.wav');
popp = loadSound('sounds/pop.wav');
}
function setup() {
createCanvas(400, 400);
value = 1;
}
function draw() {
background(220);
noStroke();
bubble1.rate(value);
clunk.rate(-0.2);
bubble1angle = map(bubble1.currentTime(), 0, bubble1.duration(), 0, PI/2);
clunkangle = map(clunk.currentTime(), 0, clunk.duration(), 0, 1.5*TWO_PI);
a = map(clunk.currentTime(), 0, clunk.duration(), 255, 20);
b = map(ping.currentTime(), 0, ping.duration(), 255, 0);
c = map(zoom.currentTime(), 0, zoom.duration(), 255, 0);
d = map(error.currentTime(), 0, error.duration(), 0, 200);
e = map(flutter.currentTime(), 0, flutter.duration(), 0, 255); 
f = map(increase.currentTime(), 0, increase.duration(), 0, 255);
g = map(wood.currentTime(), 0, wood.duration(), 0, 255);
h = map(popp.currentTime(), 0, popp.duration(), 0, 255);
stroke(20);
strokeWeight(5);
fill(255,25,180,50);
rect(50+random(-e/10,e/10), 50+random(-e/10,e/10), 300, 300);
push();
strokeWeight(5);
fill(255);
rectMode(CENTER);
fill(255, b);
fill(100,150,b, b);
fill(255, c);
fill(c, 100, 100, c);
push();
translate(150,150);
rotate(bubble1angle);
fill(0);
fill(255,255,0,h);
noStroke();
pop();
push();
translate(250,250);
rotate(-clunkangle);
fill(5,150,117);
fill(220,40,90,g);
rect(0,0,100,100);
pop();
pop();
fill(170,0,10,d);
stroke(20);
strokeWeight(0);
fill(255,255,0,f);
noStroke();
}
function keyPressed(){
if (keyCode === 65) {
bubbleswitch = !bubbleswitch;
if (bubbleswitch==true){
bubble1.loop();
} else {bubble1.stop();}
} else if (keyCode === 71) {
flutter.play();
} else if (keyCode === 74) {
zoom.rate(1);
zoom.play();
} else if (keyCode === 75) {
ping.play();
} else if (keyCode === 70) {
clunk.play();
} else if (keyCode === 76) {
error.play();
} else if (keyCode === 72) {
increase.play();
} else if (keyCode === 40) {
value -= 0.2;
} else if (keyCode === 38) {
value += 0.2;
} else if (keyCode === 68) {
popp.play();
} else if (keyCode === 83) {
wood.play();
}
}
let blip, bubble1, clunk, ping, popp, wood; 
var bubbleswitch=false;
function preload(){
bubble1 = loadSound('sounds/bubble1.wav');
blip = loadSound('sounds/blip.wav');
popp = loadSound('sounds/pop.wav');
clunk = loadSound('sounds/clunk.mp3');
ping = loadSound('sounds/ping.wav');
wood = loadSound('sounds/wood.wav');
}
function setup() {
createCanvas(400, 400);
sliderVolume = createSlider(0,1,0.2,0.01);
sliderRate = createSlider(0,8,1,0.01);
}
function draw() {
background(220);
noStroke();
blip.setVolume(sliderVolume.value());
bubble1.rate(sliderRate.value());
push();
fill(255);
rectMode(CENTER);
rect(250,150,100,100);
rect(150,250,100,100);
let bubble1angle = map(bubble1.currentTime(), 0, bubble1.duration(), 0, PI);
let blipangle = map(blip.currentTime(), 0, blip.duration(), 0, PI);
push();
translate(150,150);
rotate(bubble1angle);
fill(0);
rect(0, 0, 100, 100);
pop();
push();
translate(250,250);
rotate(-blipangle);
fill(5,125,73);
rect(0, 0, 100, 100);
pop();
pop();
}
function keyPressed(){
if (keyCode === 65) {
bubbleswitch = !bubbleswitch;
fill(0);
if (bubbleswitch==true){
bubble1.loop();
} else {bubble1.stop();}
} else if (keyCode === 83) {
fill(5,125,73);
wood.play();
} else if (keyCode === 76) {
fill(5,125,73);
blip.play();
} else if (keyCode === 68) {
fill(5,125,73);
popp.play();
} else if (keyCode === 75) {
fill(5,125,73);
clunk.play();
} else if (keyCode === 74) {
fill(5,125,73);
ping.play();
}
}
let sound, takerimba; 
var shape = {
x : 200,
y : 200,
display : function() {
ellipse(this.x, this.y, 100, 100)		
}
}
function preload(){
bubble1 = loadSound('sounds/bubble1.wav');
blip = loadSound('sounds/blip.wav');
}
function setup() {
createCanvas(400, 400);
slider = createSlider(0,1,0.2,0.01);
}
function draw() {
background(220);
noStroke();
blip.setVolume(slider.value());
push();
translate(width/2,height/2);
let bubble1angle = map(bubble1.currentTime(), 0, bubble1.duration(), 0, PI);
rotate(-bubble1angle);
let blipangle = map(blip.currentTime(), 0, blip.duration(), 0, PI);
rotate(blipangle);
rect(0, 0, 100, 100);
rect(-100, -100, 100, 100);
pop();
}
function keyPressed(){
if (keyCode === 65) {
fill(0);
shape.display();
bubble1.play();
} else if (keyCode === 83) {
fill(5,125,73);
shape.display();
blip.play();
}
}
function shape(){
}
let sound;
function preload(){
sound = loadSound('sounds/ping.aiff');
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}
function keyReleased(){
sound.play();
}function setup() {
createCanvas(400, 400);
frameRate(2);
}
function draw() {
background(220);
var i = 0;
for (i = 0; i<250; i++){
noFill();
stroke(0, random(0,255), random(0,255),100);
strokeWeight(random(2,6));
arc(random(width/2-75, width/2+75),random(height/2-75,height/2+85),random(50,100), random(50,150), random(0,PI),random(0,PI));
}
fill(255);
strokeWeight(4);
ellipse(width/2-50, 200, 50, 50);
ellipse(width/2+50, 200, 50, 50);
fill(0);
ellipse(random(width/2-50-10,width/2-50+10), random(200-20,200+10), 20, 20);
ellipse(random(width/2+50-10,width/2+50+10), random(200-20,200+10), 20, 20);
stroke(0, random(0,255), random(0,255),100);
strokeWeight(20);
var a;
a = random(1,10);
if(round(a)%2){
fill(0);
} else {
fill(255);
}
ellipse(200,280,random(20,100),random(30,80));
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(0,0,255);
fill(80,200,50);
noStroke();
ellipse(200,200,170,200);
fill(220, 200);
rect(0, 0, 400,150);
rect(0, 190, 400, 400-190);
fill(200, 20, 20);
ellipse(200, 250, 40, 10);
fill(80,190,50);
triangle(185, 225, 215, 225, 200, 180);
fill(0);
ellipse(192, 220, 5, 5);
ellipse(208, 220, 5, 5);
fill(0);
ellipse(170, 170, 40, 20);
ellipse(230, 170, 40, 20);
fill(255);
ellipse(170, 170, 5, 10);
ellipse(230, 170, 5, 10);
fill(80,190,50, 150);
ellipse(100,350,50,50);
fill(80,190,50, 150);
ellipse(350,350,150,150);
}function setup() {
createCanvas(400, 500);
}
function draw() {
background(255);
noStroke();
fill(125, 72, 180, 120);
rect(220, 0, 310,500);
fill(255,230,10,90);
ellipse(0, 420, 100, 100);
fill(125, 12, 10, 50);
ellipse(400, 0, 800,800);
fill(125, 112, 90, 50);
ellipse(130, 380, 50, 50);
strokeWeight(4);
strokeJoin(ROUND);
stroke(0);
fill(17, 125, 122, 130);
line(60, 50, 60, 140);
line(60, 140, 100, 180);
curve(100, 180, 70, 290, 100, 180, 50, 300);
line(70, 290, 120, 305);
bezier(50, 160, 40, 280, 80, 230, 80, 180);
bezier(130, 190, 120, 305, 160, 305, 180, 200);
point(80,390);
noFill();
bezier(110, 310, 150, 350, 120, 420, 180, 420);
line(200, 415, 300, 350);
}function setup() {
createCanvas(400, 400);
frameRate(2);
}
function draw() {
background(220);
noFill();
stroke(255);
strokeWeight(2);
rect(100,100,200,200);
noStroke();
fill(255);
rect(100,100,100,100);
rect(200,200,100,100);
fill(0);
for(var i=0; i<200; i+=map(mouseX,0,width,2,20)){
rect(i*2,i*2, mouseY/10,mouseY/10); 
}
}var col;
function setup() {
createCanvas(400, 400);
col = 255;
}
function draw() {
background(220);
fill(col);
rect(100,200,200,250);
if(mouseX>100 && mouseX<300 && mouseY>200){
col = 0;
} else {
col = 255;
}
}function setup() {
createCanvas(400, 400);
background(255);
rect(0,0,width-1,height-1);
fill(255,0,120);
}
function draw() {
noStroke();
if(mouseIsPressed){
ellipse(mouseX,mouseY,50,50);
}
}
function mousePressed(){
fill(random(255),random(255),random(255));
}var x;
var y;
var xspeed;
var yspeed;
var d;
var r, g, b;
function setup() {
createCanvas(400, 400);
x = random(width);
y = random(height);
xspeed = 5 / 1.5;
yspeed = 3 / 1.5;
d = 30;
r = random(255);
g = random(255);
b = random(255);
}
function draw() {
stroke(0);
fill(255);
rect(0, 0, width - 1, height - 1);
fill(r, g, b);
ellipse(x, y, d, d);
x += xspeed;
y += yspeed;
if (!mouseIsPressed) {
if (x + d / 2 >= width || x - d / 2 <= 0) {
xspeed *= -1;
r = random(255);
g = random(255);
b = random(255);
}
if (y + d / 2 >= height || y - d / 2 <= 0) {
yspeed *= -1;
r = random(255);
g = random(255);
b = random(255);
}
} else {
if (x > width) {
x = 0;
}
if (x < 0) {
x = width;
}
if (y > height) {
y = 0;
}
if (y < 0) {
y = height;
}
r = random(255);
g = random(255);
b = random(255);
}
}var spot = {
x : 100,
y : 100
};
var col = {
r : 255,
g : 0,
b : 255
};
var d = 0;
var a = 0;
var bg = true;
function setup() { 
createCanvas(600, 400);
background(255);
} 
function draw() { 
spot.x=random(0,width);
spot.y=random(0,height);
col.r=random(0,255);
col.b=random(100,255);
d=random(20,60);
a=random(40,120);
noStroke ();
fill(col.r,0,col.b,a);
ellipse(spot.x,spot.y,d,d);
}
function mousePressed() {
bg=!bg;
if (bg == false) {
background(0); 
} else { 
background(255);
}
}
var a=18;
function setup() {
createCanvas(800, 400);
}
function draw() {
background(0);
fill(255);
strokeWeight(1);
ellipse(50,0,1600,600);
for(var i=0; i<width; i+=a){
line(i, 0, i, 50);
line(i, 50, i*4,height);
}
fill(127);
ellipse(700, 300, 20,20);
rect(685,310,30,40);
rect(685,352,30,48);
rect(680,312,4,45);
rect(716,312,4,45);
strokeWeight(2);
line(700,360, 700, height);
}var d = 80;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(0);
fill(252, 108, 133, 120);
for (var i=0; i<width+d; i+=d){
for (var j=0; j<height+d; j+=d){
ellipse(i, j, d, d);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(105, 109, 125);
strokeWeight(10);
stroke(111, 146, 131);
fill(141, 159, 135);
rect(50, 50, 100, 100);
strokeWeight(5);
stroke(141, 159, 135);
fill(205, 198, 165);
ellipse(200, 200, 250, 250);
strokeWeight(10);
stroke(205, 198, 165);
fill(240, 220, 202);
rect(250, 250, 100, 100);
}function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
}
function draw() {
noStroke();
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(0,255,0);
strokeWeight(10);	
fill(150);
stroke(0,0,255);
rect(100,100,200,200);
fill(50);
stroke(255,255,0);
ellipse(200,100,100,120);
stroke(0);
strokeWeight(20);
line(10,250,390,250);
}var letter = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
function setup() {
createCanvas(400, 400);
frameRate(10);
}
function draw() {
fill(255, 240);
rect(0, 0, width, height);
for (var x = 0; x<(xoff+1); x++) {
for (var y = 0; y<(yoff+1); y++) {
var d = dist(mouseX, mouseY, x*xoff, y*yoff)
if (d<70) {
fill(0);
text(letter[floor(random(0,letter.length))],x*xoff,y*yoff);
}
}
}
}var stars = [];
var speed;
function setup() {
createCanvas(1425, 730);
for (var i = 0; i < 1000; i++) {
stars[i] = new Star();
}
}
function draw() {
speed = map(mouseY, 0, height, 70,0);
background(0);
translate(mouseX, height / 2);
for (var i = 0; i < stars.length; i++) {
stars[i].update();
stars[i].show();
}
}
function Star() {
this.x = random(-width, width);
this.y = random(-height, height);
this.z = random(width);
this.pz = this.z;
this.update = function() {
this.z = this.z - speed;
if (this.z < 1) {
this.z = width;
this.x = random(-width, width);
this.y = random(-height, height);
this.pz = this.z;
}
}
this.show = function() {
fill(255);
noStroke();
var sx = map(this.x / this.z, 0, 1, 0, width);
var sy = map(this.y / this.z, 0, 1, 0, height);
var r = map(this.z, 0, width, 16, 0);
var px = map(this.x / this.pz, 0, 1, 0, width);
var py = map(this.y / this.pz, 0, 1, 0, height);
this.pz = this.z;
stroke(255);
strokeWeight(r / 2);
line(px, py, sx, sy);
}
}var bubbles = [];
var a = 10;
function setup() {
createCanvas(600, 600);
for (var i = 0; i < a; i++) {
bubbles[i] = new Bubble(random(width), random(height));
}
}
function draw() {
background(0);
for (var i = bubbles.length - 1; i >= 0; i--) {
bubbles[i].display();
bubbles[i].update();
if (bubbles[i].finish()) {
bubbles.splice(i, 1);
}
for (var j = 0; j < bubbles.length; j++) {
if (i != j && bubbles[i].intersects(bubbles[j])) {
bubbles[i].energy();
bubbles[j].energy();
bubbles[i].changeColor();
bubbles[j].changeColor();
}
}
}
a = a + 0.08;
}
function mousePressed() {
let b = new Bubble(mouseX, mouseY);
bubbles.push(b);
}
function Bubble(x, y) {
this.x = x;
this.y = y;
this.d = 20;
this.lifespan = 255;
this.r = 255;
this.g = 255;
this.b = 255;
this.display = function() {
noStroke();
fill(this.r, this.g, this.b, this.lifespan);
ellipse(this.x, this.y, this.d, this.d);
}
this.update = function() {
this.x = this.x + random(-2, 2);
this.y = this.y + random(-2, 2);
this.lifespan = this.lifespan - 0.5;
}
this.energy = function() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
this.intersects = function(other) {
var d = dist(this.x, this.y, other.x, other.y);
if (d <= this.d + other.d) {
for (var t = bubbles.length; t < a + 1; t++) {
bubbles.push(new Bubble(random(width), random(height)));
}
return true;
} else {
return false;
}
}
this.changeColor = function() {
this.r = 125;
this.g = 87;
this.b = 220;
}
this.finish = function() {
if (this.lifespan < 10) {
return true;
} else {
return false;
}
}
}var lines = [];
function setup() { 
createCanvas(400, 400);
background(100);
}
function draw() { 
if(mouseX<400 && mouseY<400){
let b = new Line(mouseX,0,mouseX,400); 
lines.push(b);
}
for(i=0; i<lines.length; i++){
lines[i].display();
}
}
function Line(x,a,y,b){
this.x=mouseX;
this.a=0;
this.y=mouseX;
this.b=400;
this.display = function(){
stroke(220);
line(this.x,this.a,this.y,this.b);
}
}var bubbles = [];
function setup() { 
createCanvas(400, 400);
for (var i=0; i<10; i++) {
bubbles[i] = new Bubble(random(20,380),random(20,380));
} 
}
function draw() { 
background(75,150,220);
for (var i=0; i<bubbles.length; i++) {
bubbles[i].display();
bubbles[i].update();
for (var j=0; j<bubbles.length; j++){
if (i != j && bubbles[i].intersects(bubbles[j])){
bubbles[i].energy();
bubbles[j].energy();
} 
}
}
}
function mousePressed() {
let b = new Bubble(mouseX, mouseY);
bubbles.push(b);
}
function Bubble (x,y) {
this.x = x;
this.y = y;
this.r = 20;
this.col = color(255);
this.display = function() {
noStroke();
fill (this.col);
ellipse (this.x,this.y,this.r*2,this.r*2);
}
this.update = function() {
this.x = this.x + random(-2,2);
this.y = this.y + random(-2,2);
}
this.energy = function() {
this.x = this.x + random(-5,5);
this.y = this.y + random(-5,5);
}
this.intersects = function(other){
var d = dist(this.x,this.y,other.x,other.y);
if (d<=this.r+other.r+2) {
return true;
} else {
return false;
}
}
this.changeColor = function() {      	
this.col = color(255,0,0);
}
}var balls = [];
function setup() { 
createCanvas(1330, 650);
background(220);
}
function draw() { 
background(244);
if(mouseX<width && mouseY<height){
balls.push(new Balls(mouseX,0,mouseX,width));
}
for (i=0; i<balls.length; i++) {
balls[i].make();
balls[i].move();
}
if(balls.length>100){
balls.splice(0, 1)
}
}
function Balls(x,a,y,b) {
this.x = mouseX;
this.a = 0;
this.y = mouseX;
this.b = width;
this.make = function(){
fill(200,0,150,50);
line(this.x,this.a,this.y,this.b);
}
this.move = function(){
this.x = this.x + random(-0.5,0.5);
this.y = this.y + random(-0.5,0.5);
}
}
var words = ["freedom","joy","growth","love","peace"];
var dir = true;
var i = 0;
var pos = {
x : 150,
y : 200
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
textSize(45);
text(words[i],pos.x,pos.y)
}
function mousePressed() {
i = round(random(0,4));
pos.x = random(50,270);   
pos.y = random(50,300);
}
var i = 0;
var t = 0;
function setup() {
createCanvas(400, 400);
for (i = 0; i < 1110; i++) {
bubbles[i] = new Bubble();
}
}
function draw() {
background(240, 160, 170);
t=0;
release();
cup();
}
function release() {
bubbles[t].display();
bubbles[t].move();
if (bubbles[t].y < 370) {
t++;  
release();
}
}
function cup() {
noStroke();
fill(220);
rect(140, 300, 120, 100);
fill(50, 50, 40, 200);
ellipse(200, 300, 120, 5);
}
class Bubble {
constructor(){
this.x = random(180,220);
this.y = 400;
this.a = 20 + random(-10,10);
this.speed = random (-1,-0.5);
this.r = random(255);
this.g = random(255);
this.b = random(255);
this.col = random(255)   
}
display() {
fill(this.r,this.g,this.b,90);
ellipse(this.x, this.y, this.a, this.a);
}
move() {
this.x = this.x + random(-1.5, 1.5);
this.y = this.y + this.speed;
}
}var bubbles = [];
function setup() { 
createCanvas(600, 400);
for (var i=0; i<10; i++) {
bubbles[i] = new Bubble(random(0,width),random(0,height));
}
}
function draw() { 
background(0);
for (var i=bubbles.length-1; i>=0; i--) {
bubbles[i].display();
bubbles[i].move();
if(bubbles[i].isFinished()){
bubbles.splice(i,1);
}
}
if (bubbles.length<=3) {
for (var t=3; t<11; t++) {
bubbles[t] = new Bubble(random(0,width),random(0,height));
}
}
}
function mousePressed() {
for (var i=0; i<bubbles.length; i++) {
bubbles[i].clikk();
}
}
function Bubble (x,y) {
this.x = x;
this.y = y;
this.r = 30;
this.col_r = 255;
this.col_g = 150;
this.col_b = 100;
this.lifespan = 255;
this.fade = 0;
this.display = function() {
noStroke();
fill(this.col_r,this.col_g,this.col_b,this.lifespan);
ellipse (this.x,this.y,this.r*2,this.r*2);
};
this.move = function() {
this.x = this.x + random(-1,1);
this.y = this.y + random(-1,1);
this.lifespan = this.lifespan - this.fade;
};
this.clikk = function() {
var d = dist(mouseX, mouseY, this.x, this.y);
if (d<this.r) {
this.r = this.r+10; 
this.col_r = 100;
this.col_g = 150;
this.col_b = 255;
this.fade = 3;
}
};
this.isFinished = function(){
if (this.lifespan<0) {
return true;
} else {
return false;
}
}
}var speed = true;
var position = true;
var x=10;
var y=10;
var r=125;
var g=200;
var b=200;
function setup() { 
createCanvas(400, 400);
background (0);
} 
function draw() { 
ball ();
move (2,5);
bounce ();
}
function ball () {
noStroke();
fill(r,g,b);
ellipse (x,y,20,20);
}
function move(xspeed,yspeed) {  
if (speed == true) {
x=x+xspeed;
} else {
x=x-xspeed;
}
if (position == true) {
y=y+yspeed;
} else {
y=y-yspeed;
}
}
function bounce () {
if (x+10>width || x-10<0) {
speed=!speed;
}  	 
if (y+10>height || y-10<0) {
position=!position;
} 
}
var on = false;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
if (on) {
background(255);
} else {
background(0);
}
noStroke();
fill(0,190,190);
if (mouseX>100 && mouseX <300 && mouseY>100 && mouseY<200) {
fill(0,255,255);
}
rect(100,100,200,100);
}
function mousePressed() {
if (mouseX>100 && mouseX <300 && mouseY>100 && mouseY<200) {
on=!on;
}
col = map(x,-1,1,0,255);
if (mouseX>100 && mouseX <300 && mouseY>100 && mouseY<200) {
background(col);
x=x*-1;
}var d = 0;
var a = 0;
var bg = true;
function setup() { 
createCanvas(600, 400);
background(255);
} 
function draw() { 
d=random(20,60);
a = map(mouseX,0,width,40,120);
noStroke ();
fill(random(0,255),0,random(100,255),a);
ellipse(random(width),random(height),d,d);
}
function mousePressed() {
bg=!bg;
if (bg == false) {
background(0); 
} else { 
background(255);
}
}
var r;
var g;
var b;
function setup() { 
createCanvas(600, 400);
background(r,0,b);
} 
function draw() { 
r = map(mouseX,0,600,0,255);
g = map(mouseY,0,400,0,255);
b = map(mouseX,0,600,255,0);
background(r,g,b);
noStroke();
fill(0);
ellipse(mouseX,200,40,40);
}var paint = {
r : 130,
g : 200,
b : 200,
pen : function () {
noStroke();
noFill();
if (mouseIsPressed){
fill(this.r,this.g,this.b);
}
ellipse(mouseX,mouseY,25,25);
}
}
function setup() { 
createCanvas(600, 500);
background(255);
} 
function draw() { 
paint.pen ();
}
function mousePressed() {
paint.r = random(0,255);
paint.g = random(0,255);
paint.b = random(0,255);	
}
function setup() { 
createCanvas(400, 400);
background(255);
ellipse(200,200,width, height)
count=0;
z=0;
} 
function draw() { 
frameRate(5000)
x=width/2+random(-width/2,width/2);
y=height/2+random(-height/2,height/2);
strokeWeight(0);
fill(random(255),random(255),255);
ellipse(x,y,5,5);
x_t = x - width/2
y_t = y - height/2
if (x_t*x_t+y_t*y_t<=width/2*height/2){
z=z+1;
}
count=count+1;
}
var speed = 2;
var x = 200;
var y = 200;
function setup() { 
createCanvas(400, 400);
background(200);
} 
function draw() { 
frameRate(50);	  
fill(random(0,255),0,255)
ellipse(x,y,10,10);
var z = random(0,4)
if (z>0 && z<=1){
x=x+10;
if( x > 400 )
x = 400 - 10
}
if (z>1 && z<=2){
x=x-10;
if( x < 0 )
x = 0 + 10
}
if (z>2 && z<=3){
y=y+10;
if( y > 400 )
y = 400 - 10
}
if (z>3){
y=y-10;
if( y < 0 )
y = 0 + 10
}
}var position = 25;
var speed = 2;
function setup() { 
createCanvas(400, 400);
background(220);
} 
function draw() { 
background(255);
noStroke();
fill(30,position,255,255);
ellipse(position,height/2,50,50);
position = position+speed;  
if (position+25>width){
speed=-2;
}
else if(position-25<0){
speed=2;
}
}var position1 = 0;
var position2 = 0;
x=5;
y=5;  
function setup() { 
createCanvas(400, 400);
background(200);
} 
function draw() { 
ellipse(position1,position2,x,y);
position1 = position1+random(20);  
position2 = position2+random(20);
x=x+3;
y=y+3;
if (position1>width){
position1=0;
position2=0;
x=5;
y=5;
}
}function setup() { 
createCanvas(400, 400);
background(255);
} 
function draw() { 
strokeWeight(0);
var redValue = map(mouseX,0,width,0,255)
var greenValue = map(mouseY,0,height,0,255)
fill(random(255),random(255),255);
ellipse(random(width),random(height),5,5);
}function setup() { 
createCanvas(400, 400);
background(139,100,14);	
line(0,10,400,10);
line(0,20,400,20);
line(0,30,400,30);
line(0,40,400,40);
line(0,50,400,50);
line(0,60,400,60); 
line(0,70,400,70);
line(0,80,400,80);  
line(0,90,400,90);
line(0,100,400,100);
line(0,110,400,110);
line(0,120,400,120);
line(0,130,400,130);
line(0,140,400,140);
line(0,150,400,150);
fill(139,80,14);
triangle(200,-80,600,400,-200,400);  
fill(220);
triangle(200,-100,500,400,-100,400);  
fill(0,255,255,255);  
stroke(0,0,0);
strokeWeight(2);
ellipse(200,300,100,100);
fill(0,0,0);
ellipse(width/2+20,height/2+100,4,4);
ellipse(width/2-20,height/2+100,4,4);
ellipse(width/2,height/2+75,4,4);
}
function setup() { 
createCanvas(400, 400);
background(255,255,0);
ellipse(400,200,100,100);
ellipse(0,200,100,100);
ellipse(200,0,100,100);
ellipse(200,400,100,100);
fill(0,0,255,255);  
stroke(0,0,0);
strokeWeight(2);
ellipse(width/2, height/2,200,200);
fill(0,255,255);
strokeWeight(5);
rect(width/2-50,height/2-50,100,100);
triangle(width/2,height/2-25,width/2-25,height/2+25,
width/2+25,height/2+25);
line(160,240,240,240);
} 