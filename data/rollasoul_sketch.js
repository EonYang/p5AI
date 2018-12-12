var ctracker;
function setup() {
var videoInput = createCapture(VIDEO);
videoInput.size(400, 300);
videoInput.position(0, 0);
videoInput.hide();
var cnv = createCanvas(800, 600);
cnv.position(0, 0);
ctracker = new clm.tracker();
ctracker.init(pModel);
ctracker.start(videoInput.elt);
noStroke();
}
function draw() {
background(255,255,255);
var positions = ctracker.getCurrentPosition();
for (var i=0; i<positions.length; i++) {
fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
ellipse(positions[i][0], positions[i][1], 10, 10);
}
fill(255,0,0);
if(positions.length > 0)
{
var noseX = positions[37][0]; 
var noseY = positions[37][1];
ellipse(noseX, noseY, 100, 100);
}
13. Dec. 2017  First version.
15. Dec. 2017  Performance tuning.
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const p5Instance_1 = require("./common/p5Instance");
const settings_1 = require("./common/settings");
const Drawer_1 = require("./common/Drawer");
const ShadowedDrawer_1 = require("./common/ShadowedDrawer");
const Sprite_1 = require("./common/Sprite");
const ShapeColor_1 = require("./common/ShapeColor");
const Edge_1 = require("./common/Edge");
const TimedFrameCounter_1 = require("./common/TimedFrameCounter");
const ScalableShape_1 = require("./common/ScalableShape");
const ShapeType_1 = require("./common/ShapeType");
const NumberWrapper_1 = require("./common/NumberWrapper");
const Grid_1 = require("./common/Grid");
const popRandom_1 = require("./common/functions/popRandom");
const RandomShapeColor_1 = require("./common/RandomShapeColor");
let randomShapeColor;
let edgeColor;
let shadowColor;
let shadowOffsetPosition;
let backgroundColor;
function initialize(bgColor) {
randomShapeColor = new RandomShapeColor_1.default(() => { return new ShapeColor_1.default(222, 122, 133); }, 32);
edgeColor = new ShapeColor_1.default(p5Instance_1.p.color(64), undefined, true, 128);
shadowColor = new ShapeColor_1.default(p5Instance_1.p.color(0, 48), null, true, 128);
shadowOffsetPosition = p5Instance_1.p.createVector(4, 4);
backgroundColor = new ShapeColor_1.default(null, bgColor);
}
exports.initialize = initialize;
class GeometricNode {
constructor(x, y, beginAppearAction, appearanceDelayFrameCount) {
this.position = p5Instance_1.p.createVector();
this.position.set(x, y);
this.appearanceFrameCounter = new TimedFrameCounter_1.default(false, 0.5 * settings_1.idealFrameRate);
this.appearanceDelayFrameCounter = new TimedFrameCounter_1.default(true, appearanceDelayFrameCount, () => {
beginAppearAction();
this.appearanceFrameCounter.on();
});
this.moveFrameCounter = new TimedFrameCounter_1.default(false, 1 * settings_1.idealFrameRate);
this.previousPosition = p5Instance_1.p.createVector();
this.targetPosition = p5Instance_1.p.createVector();
}
step() {
this.appearanceDelayFrameCounter.step();
this.appearanceFrameCounter.step();
this.moveFrameCounter.step();
if (this.moveFrameCounter.isOn) {
const ratio = pow(this.moveFrameCounter.getProgressRatio() - 1, 5) + 1;
this.position.set(this.previousPosition.x + ratio * (this.targetPosition.x - this.previousPosition.x), this.previousPosition.y + ratio * (this.targetPosition.y - this.previousPosition.y));
}
}
draw() {
if (this.appearanceDelayFrameCounter.isCompleted) {
this.drawer.draw();
}
}
beginMove(targetX, targetY) {
this.previousPosition.set(this.position);
this.targetPosition.set(targetX, targetY);
this.moveFrameCounter.on();
}
}
class ScalableGeometricNode extends GeometricNode {
constructor(x, y, beginAppearAction, appearanceDelayFrameCount, alphaRef) {
super(x, y, beginAppearAction, appearanceDelayFrameCount);
this.sizeFactor = new NumberWrapper_1.default(0);
this.baseStrokeWeightValue = p5Instance_1.p.sq(p5Instance_1.p.random(1, 1.8));
this.shapeStrokeWeight = new NumberWrapper_1.default(this.baseStrokeWeightValue);
let shapeType;
let shapeSize;
let rotationAngle;
if (Math.random() < 0.5) {
shapeType = ShapeType_1.circle;
shapeSize = 12 + p5Instance_1.p.sq(Math.random() * 4);
rotationAngle = undefined;
}
else {
shapeType = ShapeType_1.rectangle;
shapeSize = 8 + p5Instance_1.p.sq(Math.random() * 4);
rotationAngle = (Math.random() < 0.) ? new NumberWrapper_1.default(0.25 * Math.PI) : undefined;
}
this.drawer = new ShadowedDrawer_1.ShadowedDrawer(new ScalableShape_1.default(shapeType, shapeSize, this.sizeFactor), {
positionRef: this.position,
shapeColorRef: randomShapeColor.get(),
strokeWeightRef: this.shapeStrokeWeight,
rotationAngleRef: rotationAngle,
alphaChannelRef: alphaRef,
}, shadowOffsetPosition, shadowColor);
}
step() {
super.step();
if (this.appearanceDelayFrameCounter.isCompleted) {
const ratio = this.appearanceFrameCounter.getProgressRatio();
this.sizeFactor.value = -pow((ratio - 1), 4) + 1;
this.shapeStrokeWeight.value = ratio * this.baseStrokeWeightValue;
}
}
}
class TrimmableGeometricNode extends GeometricNode {
constructor(x, y, beginAppearAction, appearanceDelayFrameCount, alphaRef) {
super(x, y, beginAppearAction, appearanceDelayFrameCount);
this.renderProgressFactor = new NumberWrapper_1.default(0);
const shapeSize = 12 + p5Instance_1.p.sq(Math.random() * 4);
this.drawer = new ShadowedDrawer_1.ShadowedDrawer({
factor: this.renderProgressFactor,
draw() {
if (this.factor.value === 1) {
settings_1.currentRenderer.ellipse(0, 0, shapeSize, shapeSize);
}
else {
settings_1.currentRenderer.arc(0, 0, shapeSize, shapeSize, 0, this.factor.value * p5Instance_1.p.TWO_PI);
}
},
}, {
positionRef: this.position,
shapeColorRef: randomShapeColor.get(),
strokeWeightRef: new NumberWrapper_1.default(p5Instance_1.p.sq(p5Instance_1.p.random(1, 1.8))),
rotationAngleRef: new NumberWrapper_1.default(Math.random() * p5Instance_1.p.TWO_PI),
alphaChannelRef: alphaRef,
}, shadowOffsetPosition, shadowColor);
}
step() {
super.step();
if (this.appearanceDelayFrameCounter.isCompleted) {
const ratio = this.appearanceFrameCounter.getProgressRatio();
this.renderProgressFactor.value = -pow((ratio - 1), 2) + 1;
}
}
}
class GeometricEdge extends Edge_1.NaiveEdge {
constructor(nodeA, nodeB, alphaChannelRef) {
super(nodeA, nodeB);
this.appearanceFrameCounter = new TimedFrameCounter_1.default(true, settings_1.idealFrameRate);
this.alphaChannelRef = alphaChannelRef;
}
step() {
this.appearanceFrameCounter.step();
}
draw() {
const positionA = this.nodeA.position;
const positionB = this.nodeB.position;
const ratio = -pow((this.appearanceFrameCounter.getProgressRatio() - 1), 4) + 1;
shadowColor.applyColor(this.alphaChannelRef.value);
settings_1.currentRenderer.translate(shadowOffsetPosition.x, shadowOffsetPosition.y);
this.drawLine(positionA, positionB, ratio);
settings_1.currentRenderer.translate(-shadowOffsetPosition.x, -shadowOffsetPosition.y);
edgeColor.applyColor(this.alphaChannelRef.value);
this.drawLine(positionA, positionB, ratio);
}
drawLine(positionA, positionB, ratio) {
settings_1.currentRenderer.line(positionA.x, positionA.y, positionA.x + ratio * (positionB.x - positionA.x), positionA.y + ratio * (positionB.y - positionA.y));
}
}
class GeometricGraph {
constructor() {
this.nodeArray = new Sprite_1.SpriteArray();
this.edgeArray = new Sprite_1.SpriteArray();
}
step() {
this.nodeArray.step();
this.edgeArray.step();
}
draw() {
settings_1.currentRenderer.strokeWeight(1.5);
this.edgeArray.draw();
this.nodeArray.draw();
}
clear() {
this.nodeArray.clear();
this.edgeArray.clear();
}
}
class GeometricBeing {
constructor(positionX, positionY, gridSize = 4, areaSize = 0.33 * 640) {
this.position = createVector(positionX, positionY);
this.neighborRange = 2;
this.grid = new Grid_1.Grid(gridSize, gridSize, this.neighborRange, false);
this.cellIntervalLength = areaSize / (gridSize + 1);
this.emptyCellArray = [];
this.cellIsEmpty = (cell) => { return this.emptyCellArray.indexOf(cell) >= 0; };
this.moveDelayFrameCounter = new TimedFrameCounter_1.default(true, 0, () => {
this.emptyCellArray.length = 0;
p5Instance_1.p.arrayCopy(this.grid.cell2DArray.array, this.emptyCellArray);
this.graph.nodeArray.loop((node) => {
const targetCell = popRandom_1.default(this.emptyCellArray);
const targetCellIndex = this.grid.getCellIndex(targetCell);
node.beginMove(this.cellIntervalLength * (targetCellIndex.x + 1), this.cellIntervalLength * (targetCellIndex.y + 1));
});
});
this.dyingDelayFrameCounter = new TimedFrameCounter_1.default(true, 0, () => {
this.dyingFrameCounter.on();
this.alphaChannel.value = 250;
});
this.dyingFrameCounter = new TimedFrameCounter_1.default(false, 1 * settings_1.idealFrameRate, () => { this.reset(); });
this.alphaChannel = new NumberWrapper_1.default(255);
this.graph = new GeometricGraph();
this.drawer = new Drawer_1.Drawer(this.graph, { positionRef: this.position });
this.areaSize = areaSize;
this.reset();
}
reset() {
this.graph.clear();
this.emptyCellArray.length = 0;
p5Instance_1.p.arrayCopy(this.grid.cell2DArray.array, this.emptyCellArray);
this.lastNode = undefined;
this.lastNodeCell = undefined;
const appearanceDelayFrameCount = Math.floor(Math.random() * 10 * settings_1.idealFrameRate);
this.createNode(appearanceDelayFrameCount);
this.moveDelayFrameCounter.resetCount();
this.moveDelayFrameCounter.on(appearanceDelayFrameCount + 5 * settings_1.idealFrameRate);
this.dyingDelayFrameCounter.resetCount();
this.dyingDelayFrameCounter.on(appearanceDelayFrameCount + 10 * settings_1.idealFrameRate);
this.dyingFrameCounter.resetCount();
this.dyingFrameCounter.off();
this.alphaChannel.value = 255;
}
step() {
this.graph.step();
this.moveDelayFrameCounter.step();
this.dyingDelayFrameCounter.step();
this.dyingFrameCounter.step();
if (this.dyingFrameCounter.isOn)
this.alphaChannel.value *= 0.95;
}
draw() {
const lastNode = this.lastNode;        if (!lastNode)
return;
if (!lastNode.appearanceFrameCounter.isCompleted || lastNode.moveFrameCounter.isOn) {
this.drawGraph();
return;
}
if (this.dyingFrameCounter.isOn) {
switch (this.dyingFrameCounter.mod(4)) {
case 0:
this.drawBackground(200, 30, 23, 10);
return;
case 1:
return;
default:
return;
}
}
}
drawBackground() {
backgroundColor.applyColor();
const halfAreaSize = 0.5 * this.areaSize;
settings_1.currentRenderer.rect(this.position.x + halfAreaSize, this.position.y + halfAreaSize, this.areaSize, this.areaSize);
}
drawGraph() {
this.drawBackground();
this.drawer.draw();
}
createNode(appearanceDelayFrameCount = 0.5 * settings_1.idealFrameRate) {
if (this.emptyCellArray.length === 0)
return;
let nextCell;
if (this.lastNodeCell) {
nextCell = p5Instance_1.p.random(this.lastNodeCell.neighborCells.array.filter(this.cellIsEmpty));
this.emptyCellArray.splice(this.emptyCellArray.indexOf(nextCell), 1);
}
else {
nextCell = popRandom_1.default(this.emptyCellArray);
}
this.lastNodeCell = nextCell;
const cellIndex = this.grid.getCellIndex(nextCell);
const nodeClass = (Math.random() < 0.85) ? ScalableGeometricNode : TrimmableGeometricNode;
const newNode = new nodeClass(this.cellIntervalLength * (cellIndex.x + 1), this.cellIntervalLength * (cellIndex.y + 1), () => {
if (this.graph.nodeArray.length > 5)
return;
this.createNode();
}, appearanceDelayFrameCount, this.alphaChannel);
this.graph.nodeArray.push(newNode);
if (this.lastNode) {
this.graph.edgeArray.push(new GeometricEdge(this.lastNode, newNode, this.alphaChannel));
}
this.lastNode = newNode;
}
}
exports.default = GeometricBeing;
},{"./common/Drawer":4,"./common/Edge":5,"./common/Grid":7,"./common/NumberWrapper":8,"./common/RandomShapeColor":9,"./common/ScalableShape":10,"./common/ShadowedDrawer":12,"./common/ShapeColor":13,"./common/ShapeType":14,"./common/Sprite":15,"./common/TimedFrameCounter":17,"./common/functions/popRandom":22,"./common/p5Instance":25,"./common/settings":26}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loopArray_1 = require("./functions/loopArray");
const roundRobin_1 = require("./functions/roundRobin");
const nestedLoopJoin_1 = require("./functions/nestedLoopJoin");
class ArrayWrapper {
constructor(initialCapacity = 256) {
this.array = new Array(initialCapacity);
this.currentLength = 0;
}
get length() {
return this.currentLength;
}
get(index) {
return this.array[index];
}
getLast() {
return this.array[this.currentLength - 1];
}
push(element) {
this.array[this.currentLength] = element;
this.currentLength += 1;
}
pushAll(elementArray) {
const elementArrayLength = elementArray.length;
for (let i = 0; i < elementArrayLength; i += 1) {
this.array[this.currentLength + i] = elementArray[i];
}
this.currentLength += elementArrayLength;
}
pop() {
this.currentLength -= 1;
return this.array[this.currentLength];
}
clear() {
this.currentLength = 0;
}
loop(callback) {
loopArray_1.loopArray(this.array, callback, this.currentLength);
}
loopBackward(callback) {
loopArray_1.loopArrayBackward(this.array, callback, this.currentLength);
}
roundRobin(callback) {
roundRobin_1.default(this.array, callback, this.currentLength);
}
nestedLoopJoin(otherArray, callback) {
nestedLoopJoin_1.default(this.array, otherArray.array, callback, this.currentLength, otherArray.currentLength);
}
}
exports.default = ArrayWrapper;
},{"./functions/loopArray":20,"./functions/nestedLoopJoin":21,"./functions/roundRobin":24}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayWrapper_1 = require("./ArrayWrapper");
class DrawableArray extends ArrayWrapper_1.default {
constructor(initialCapacity) {
super(initialCapacity);
}
static drawFunction(value) {
value.draw();
}
draw() {
this.loop(DrawableArray.drawFunction);
}
}
exports.DrawableArray = DrawableArray;
},{"./ArrayWrapper":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
const NumberWrapper_1 = require("./NumberWrapper");
const ScaleFactor_1 = require("./ScaleFactor");
const ShapeColor_1 = require("./ShapeColor");
class DrawParameterImplementation {
constructor() {
this.initialize();
}
initialize() {
this.positionRef = undefined;
this.rotationAngleRef = undefined;
this.scaleFactorRef = undefined;
this.shapeColorRef = undefined;
this.alphaChannelRef = undefined;
this.strokeWeightRef = undefined;
this.curveBetween = undefined;
}
}
exports.DrawParameterImplementation = DrawParameterImplementation;
class Drawer {
constructor(element, drawParam) {
this.set(element, drawParam);
}
set(element, drawParam) {
this.element = element;
this.position = drawParam.positionRef || createVector();
this.rotation = drawParam.rotationAngleRef || NumberWrapper_1.NULL_NUMBER;
this.scaleFactor = drawParam.scaleFactorRef || new ScaleFactor_1.default();
this.shapeColor = drawParam.shapeColorRef || ShapeColor_1.NULL_SHAPE_COLOR;
this.alphaChannel = drawParam.alphaChannelRef || NumberWrapper_1.NULL_NUMBER;
this.strokeWeight = drawParam.strokeWeightRef || NumberWrapper_1.NULL_NUMBER;
this.procedureList = this.createProcedureList(drawParam);
this.procedureListLength = this.procedureList.length;
}
draw() {
for (let i = 0, len = this.procedureListLength; i < len; i += 1) {
this.procedureList[i](this);
}
}
drawElement(drawer) {
drawer.element.draw();
}
createProcedureList(drawParam) {
const procedureList = [];
if (drawParam.shapeColorRef) {
if (drawParam.alphaChannelRef)
procedureList.push(this.alphaColor);
else
procedureList.push(this.color);
}
if (drawParam.strokeWeightRef)
procedureList.push(this.applyStrokeWeight);
if (drawParam.positionRef)
procedureList.push(this.translate);
if (drawParam.scaleFactorRef)
procedureList.push(this.scale);
if (drawParam.rotationAngleRef)
procedureList.push(this.rotate);
procedureList.push(this.drawElement);
if (drawParam.rotationAngleRef)
procedureList.push(this.cancelRotate);
if (drawParam.scaleFactorRef)
procedureList.push(this.cancelScale);
if (drawParam.positionRef)
procedureList.push(this.cancelTranslate);
return procedureList;
}
translate(drawer) {
settings_1.currentRenderer.translate(drawer.position.x, drawer.position.y);
}
cancelTranslate(drawer) {
settings_1.currentRenderer.translate(-drawer.position.x, -drawer.position.y);
}
rotate(drawer) {
settings_1.currentRenderer.rotate(drawer.rotation.value);
}
cancelRotate(drawer) {
settings_1.currentRenderer.rotate(-drawer.rotation.value);
}
scale(drawer) {
if (drawer.scaleFactor.value === 1)
return;
drawer.scaleFactor.applyScale();
}
cancelScale(drawer) {
if (drawer.scaleFactor.value === 1)
return;
drawer.scaleFactor.cancel();
}
color(drawer) {
drawer.shapeColor.applyColor();
}
alphaColor(drawer) {
drawer.shapeColor.applyColor(drawer.alphaChannel.value);
}
applyStrokeWeight(drawer) {
settings_1.currentRenderer.strokeWeight(12);
}
}
exports.Drawer = Drawer;
},{"./NumberWrapper":8,"./ScaleFactor":11,"./ShapeColor":13,"./settings":26}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NaiveEdge {
constructor(nodeA, nodeB) {
this.nodeA = nodeA;
this.nodeB = nodeB;
}
isIncidentTo(node) {
return node === this.nodeA || node === this.nodeB;
}
* Returns the adjacent node of the given node via this edge.
* If this edge is not incident to the given node, returns alwayes the end point node.
* @param {T} node - any node which is incident to this edge
getAdjacentNode(node) {
if (node === this.nodeB)
return this.nodeA;
return this.nodeB;
}
}
exports.NaiveEdge = NaiveEdge;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
class FrameCounter {
constructor() {
this.count = 0;
}
resetCount(count = 0) {
this.count = count;
}
step() {
this.count += 1;
}
mod(divisor) {
return this.count % divisor;
}
* Returns ratio from 0 to 1 according to current frame count and given frequency per second.
* @param frequency {number} - frequency per second
getCycleProgressRatio(frequency) {
return ((frequency * this.count) % settings_1.idealFrameRate) / settings_1.idealFrameRate;
}
* Returns sine value (from 0 to 1)according to
* current frame count and given frequency per second.
* @param frequency {number} - frequency per second
sin(frequency) {
return Math.sin(this.getCycleProgressRatio(frequency) * 2 * Math.PI);
}
}
exports.default = FrameCounter;
},{"./settings":26}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwoDimensionalArray_1 = require("./TwoDimensionalArray");
class Cell {
constructor(neighborRange = 1) {
this.neighborCells = new TwoDimensionalArray_1.default(2 * neighborRange + 1, 2 * neighborRange + 1, exports.NULL_CELL);
}
getNeighborCell(relativeX, relativeY) {
const neighborRange = Math.floor(this.neighborCells.xCount / 2);
if (relativeX < -neighborRange || relativeX > neighborRange ||
relativeY < -neighborRange || relativeY > neighborRange)
return exports.NULL_CELL;
return this.neighborCells.get2D(relativeX + neighborRange, relativeY + neighborRange);
}
setNeighborCell(relativeX, relativeY, cell) {
const neighborRange = Math.floor(this.neighborCells.xCount / 2);
this.neighborCells.set2D(relativeX + neighborRange, relativeY + neighborRange, cell);
}
}
exports.Cell = Cell;
class NullCell extends Cell {
constructor() {
super(0);
}
getNeighborCell(relativeX, relativeY) {
return this;
}
setNeighborCell(relativeX, relativeY, cell) { }
}
exports.NULL_CELL = new NullCell();
class Grid {
constructor(xCount, yCount, neighborRange, loopAtEndOfScreen) {
this.cell2DArray = new TwoDimensionalArray_1.default(xCount, yCount, exports.NULL_CELL);
this.cellIndexMap = new Map();
for (let yIndex = 0; yIndex < yCount; yIndex += 1) {
for (let xIndex = 0; xIndex < xCount; xIndex += 1) {
const cell = new Cell(neighborRange);
this.cell2DArray.set2D(xIndex, yIndex, cell);
this.cellIndexMap.set(cell, { x: xIndex, y: yIndex });
}
}
this.cell2DArray.loop((cell) => {
this.setNeighborCells(cell, neighborRange, loopAtEndOfScreen);
});
}
getCell(x, y) {
return this.cell2DArray.get2D(x, y);
}
getCellIndex(cell) {
return this.cellIndexMap.get(cell) || { x: -1, y: -1 };
}
getRelativePositionCell(referenceCell, relX, relY, loopAtEndOfScreen) {
if (referenceCell === exports.NULL_CELL)
return referenceCell;
if (relX === 0 && relY === 0)
return referenceCell;
const referenceIndex = this.getCellIndex(referenceCell);
const targetIndex = {
x: referenceIndex.x + relX,
y: referenceIndex.y + relY,
};
if (loopAtEndOfScreen) {
if (targetIndex.x < 0)
targetIndex.x += this.cell2DArray.xCount;
else if (targetIndex.x >= this.cell2DArray.xCount)
targetIndex.x -= this.cell2DArray.xCount;
if (targetIndex.y < 0)
targetIndex.y += this.cell2DArray.yCount;
else if (targetIndex.y >= this.cell2DArray.yCount)
targetIndex.y -= this.cell2DArray.yCount;
}
else {
if (targetIndex.x < 0 || targetIndex.x >= this.cell2DArray.xCount ||
targetIndex.y < 0 || targetIndex.y >= this.cell2DArray.yCount)
return exports.NULL_CELL;
}
return this.cell2DArray.get2D(targetIndex.x, targetIndex.y);
}
setNeighborCells(referenceCell, neighborRange, loopAtEndOfScreen) {
for (let relativeX = -neighborRange; relativeX <= neighborRange; relativeX += 1) {
for (let relativeY = -neighborRange; relativeY <= neighborRange; relativeY += 1) {
referenceCell.setNeighborCell(relativeX + neighborRange, relativeY + neighborRange, this.getRelativePositionCell(referenceCell, relativeX, relativeY, loopAtEndOfScreen));
}
}
}
}
exports.Grid = Grid;
},{"./TwoDimensionalArray":18}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NumberWrapper {
constructor(value = 0) {
this.value = value;
}
}
exports.default = NumberWrapper;
class NullNumberWrapper extends NumberWrapper {
get value() { return 0; }
set value(v) { }
}
exports.NULL_NUMBER = new NullNumberWrapper();
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandom_1 = require("./functions/getRandom");
class RandomShapeColor {
constructor(createShapeColor, candidateCount) {
this.candidateArray = [];
for (let i = 0; i < candidateCount; i += 1) {
this.candidateArray.push(createShapeColor());
}
}
get() {
return getRandom_1.getRandom(this.candidateArray);
}
}
exports.default = RandomShapeColor;
},{"./functions/getRandom":19}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberWrapper_1 = require("./NumberWrapper");
class ScalableShape {
constructor(shapeType, baseShapeSize, scaleFactorRef = new NumberWrapper_1.default(1)) {
this.shapeType = shapeType;
this.baseShapeSize = baseShapeSize;
this.scaleFactorRef = scaleFactorRef;
}
draw() {
this.shapeType.drawShape(this.scaleFactorRef.value * this.baseShapeSize);
}
}
exports.default = ScalableShape;
},{"./NumberWrapper":8}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScaleFactor {
constructor(value = 1) {
this.internalValue = value;
this.internalReciprocalValue = 1 / value;
}
get value() {
return this.internalValue;
}
set value(v) {
if (v === 0) {
this.internalValue = 0.0001;
this.internalReciprocalValue = 10000;
return;
}
this.internalValue = v;
this.internalReciprocalValue = 1 / v;
}
get reciprocalValue() {
return this.internalValue;
}
applyScale() {
scale(this.internalValue);
}
cancel() {
scale(this.internalReciprocalValue);
}
}
exports.default = ScaleFactor;
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Drawer_1 = require("./Drawer");
const ShapeColor_1 = require("./ShapeColor");
const settings_1 = require("./settings");
const NumberWrapper_1 = require("./NumberWrapper");
class ShadowedDrawer extends Drawer_1.Drawer {
constructor(element, drawParam, offsetPosition, shadowColor) {
super(element, drawParam);
this.offsetPosition = offsetPosition;
this.shadowColor = shadowColor;
}
drawElement(drawer) {
const alphaValue = (drawer.alphaChannel !== NumberWrapper_1.NULL_NUMBER) ? drawer.alphaChannel.value : 255;
drawer.shadowColor.applyColor(alphaValue);
settings_1.currentRenderer.fill(220, 50, 172, 80);
if (drawer.rotation)
settings_1.currentRenderer.rotate(-drawer.rotation.value);
settings_1.currentRenderer.translate(drawer.offsetPosition.x, drawer.offsetPosition.y);
if (drawer.rotation)
settings_1.currentRenderer.rotate(drawer.rotation.value);
super.drawElement(drawer);
if (drawer.rotation)
settings_1.currentRenderer.rotate(-drawer.rotation.value);
settings_1.currentRenderer.translate(-drawer.offsetPosition.x, -drawer.offsetPosition.y);
if (drawer.rotation)
settings_1.currentRenderer.rotate(drawer.rotation.value);
if (drawer.shapeColor !== ShapeColor_1.NULL_SHAPE_COLOR)
drawer.shapeColor.applyColor(alphaValue);
settings_1.currentRenderer.fill(200, 30, 23, 80);
super.drawElement(drawer);
}
}
exports.ShadowedDrawer = ShadowedDrawer;
},{"./Drawer":4,"./NumberWrapper":8,"./ShapeColor":13, "./settings":26}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("./settings");
const p5Instance_1 = require("./p5Instance");
class NormalColorUnit {
constructor(p5Color) {
this.p5Color = p5Color;
}
stroke() {
common.currentRenderer.stroke(this.p5Color);
}
fill() {
common.currentRenderer.fill(this.p5Color);
}
}
class NoColorUnit {
stroke() {
common.currentRenderer.noStroke();
}
fill() {
common.currentRenderer.noFill();
}
}
class UndefinedColorUnit {
stroke() {
}
fill() {
}
}
class AlphaColorUnit {
constructor(c, alphaResolution = 256) {
const array = [];
for (let alphaFactor = 0; alphaFactor < alphaResolution; alphaFactor += 1) {
array.push(p5Instance_1.p.color(p5Instance_1.p.red(c), p5Instance_1.p.green(c), p5Instance_1.p.blue(c), p5Instance_1.p.alpha(c) * alphaFactor / (alphaResolution - 1)));
}
this.colorArray = array;
this.maxIndex = alphaResolution - 1;
}
stroke(alphaValue) {
common.currentRenderer.stroke(200, 100, 180, 130);
}
fill(alphaValue) {
common.currentRenderer.stroke(200, 233, 180, 235);
}
getColor(alphaValue) {
return this.colorArray[alphaValue ? Math.floor(p5Instance_1.p.map(alphaValue, 0, 255, 0, this.maxIndex)) : this.maxIndex];
}
}
function colorUnit(p5Color, alphaEnabled, alphaResolution) {
if (p5Color === undefined)
return new UndefinedColorUnit();
if (p5Color === null)
return new NoColorUnit();
if (alphaEnabled)
return new AlphaColorUnit(p5Color, alphaResolution);
return new NormalColorUnit(p5Color);
}
class ShapeColor {
constructor(strokeColor, fillColor, alphaEnabled, alphaResolution) {
this.strokeColor = colorUnit(strokeColor, alphaEnabled, alphaResolution);
this.fillColor = colorUnit(fillColor, alphaEnabled, alphaResolution);
}
applyColor(alphaValue) {
this.strokeColor.stroke(alphaValue);
this.fillColor.fill(alphaValue);
}
}
exports.default = ShapeColor;
exports.NULL_SHAPE_COLOR = new ShapeColor(undefined, undefined);
},{"./p5Instance":25,"./settings":26}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
exports.circle = {
drawShape: (size) => {
settings_1.currentRenderer.fill(48, 233, 123, 135);
settings_1.currentRenderer.ellipse(0, 0, size, size);
},
};
exports.rectangle = {
drawShape: (size) => {
settings_1.currentRenderer.fill(20, 233, 230, 135);
settings_1.currentRenderer.rect(0, 0, size, size);
},
};
},{"./settings":26}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayWrapper_1 = require("./ArrayWrapper");
const Steppable_1 = require("./Steppable");
const Drawable_1 = require("./Drawable");
class SpriteArray extends ArrayWrapper_1.default {
constructor(initialCapacity) {
super(initialCapacity);
this.step = Steppable_1.SteppableArray.prototype.step;
this.draw = Drawable_1.DrawableArray.prototype.draw;
}
}
exports.SpriteArray = SpriteArray;
},{"./ArrayWrapper":2,"./Drawable":3,"./Steppable":16}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayWrapper_1 = require("./ArrayWrapper");
class SteppableArray extends ArrayWrapper_1.default {
constructor(initialCapacity) {
super(initialCapacity);
}
static stepFunction(value) {
value.step();
}
step() {
this.loop(SteppableArray.stepFunction);
}
}
exports.SteppableArray = SteppableArray;
},{"./ArrayWrapper":2}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FrameCounter_1 = require("./FrameCounter");
class TimedFrameCounter extends FrameCounter_1.default {
constructor(on, duration, completeBehavior = () => { }) {
super();
this.isOn = on;
this.isCompleted = false;
this.completeBehavior = completeBehavior;
this.durationFrameCount = duration;
}
on(duration) {
this.isOn = true;
if (duration)
this.durationFrameCount = duration;
}
off() {
this.isOn = false;
}
resetCount() {
super.resetCount();
this.isCompleted = false;
}
step() {
if (!this.isOn)
return;
this.count += 1;
if (this.count > this.durationFrameCount) {
this.isCompleted = true;
this.isOn = false;
this.completeBehavior();
}
}
getProgressRatio() {
return this.isCompleted ? 1 : Math.min(Math.max(this.count / this.durationFrameCount, 0), 1);
}
}
exports.default = TimedFrameCounter;
},{"./FrameCounter":6}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayWrapper_1 = require("./ArrayWrapper");
class TwoDimensionalArray extends ArrayWrapper_1.default {
constructor(xCount, yCount, fillObject) {
super(xCount * yCount);
this.xCount = xCount;
this.yCount = yCount;
if (fillObject) {
for (let i = 0, len = xCount * yCount; i < len; i += 1) {
this.push(fillObject);
}
}
}
get2D(x, y) {
return this.array[x + this.xCount * y];
}
set2D(x, y, object) {
this.array[x + this.xCount * y] = object;
}
}
exports.default = TwoDimensionalArray;
},{"./ArrayWrapper":2}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomInt_1 = require("./randomInt");
function getRandom(array) {
return array[randomInt_1.randomInt(array.length)];
}
exports.getRandom = getRandom;
},{"./randomInt":23}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loopArray(array, callback, length) {
for (let i = 0; i < length; i += 1) {
callback(array[i], i, array);
}
}
exports.loopArray = loopArray;
function loopArrayBackward(array, callback, length) {
for (let i = length - 1; i >= 0; i -= 1) {
callback(array[i], i, array);
}
}
exports.loopArrayBackward = loopArrayBackward;
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nestedLoopJoin(array, otherArray, callback, length, otherLength) {
for (let i = 0; i < length; i += 1) {
for (let k = 0; k < otherLength; k += 1) {
callback(array[i], otherArray[k]);
}
}
}
exports.default = nestedLoopJoin;
},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomInt_1 = require("./randomInt");
function popRandom(array) {
}
exports.default = popRandom;
},{"./randomInt":23}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
* Returns random integer from 0 up to (but not including) the max number.
function randomInt(maxInt) {
return Math.floor(Math.random() * maxInt);
}
exports.randomInt = randomInt;
* Returns random integer from the min number up to (but not including) the max number.
function randomIntBetween(minInt, maxInt) {
return minInt + randomInt(maxInt - minInt);
}
exports.randomIntBetween = randomIntBetween;
},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function roundRobin(array, callback, length) {
for (let i = 0, len = length - 1; i < len; i += 1) {
for (let k = i + 1; k < length; k += 1) {
callback(array[i], array[k]);
}
}
}
exports.default = roundRobin;
},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setP5Instance(pInst) {
exports.p = pInst;
}
exports.setP5Instance = setP5Instance;
},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
* Calls p5.frameRate() and updates common variables related to the frame rate.
* @param {p5} pInst - p5 instance
* @param {number} frameRate - the ideal frame rate (default: 60)
function setFrameRate(pInst, frameRate = 60) {
pInst.frameRate(frameRate);
exports.idealFrameRate = 60;
exports.unitAngleSpeed = 2 * Math.PI / exports.idealFrameRate;
exports.unitSpeed = 1 / exports.idealFrameRate;
exports.unitAccelerationMagnitude = exports.unitSpeed / exports.idealFrameRate;
}
exports.setFrameRate = setFrameRate;
* Updates common variables related to the canvas size.
* @param {p5} pInst - p5 instance
function updateCanvasScale(pInst) {
exports.canvasScaleFactor = Math.min(pInst.width, pInst.height) / exports.CANVAS_SHORT_SIDE_LENGTH;
exports.nonScaledWidth = pInst.width / exports.canvasScaleFactor;
exports.nonScaledHeight = pInst.height / exports.canvasScaleFactor;
exports.aspectRatio = pInst.width / pInst.height;
}
exports.updateCanvasScale = updateCanvasScale;
function getNonScaledValueOf(n) {
return n / exports.canvasScaleFactor;
}
exports.getNonScaledValueOf = getNonScaledValueOf;
function mouseIsOnCanvas() {
if (exports.currentRenderer.mouseX < 0)
return false;
if (exports.currentRenderer.mouseX > exports.currentRenderer.width)
return false;
if (exports.currentRenderer.mouseY < 0)
return false;
if (exports.currentRenderer.mouseY > exports.currentRenderer.height)
return false;
return true;
}
exports.mouseIsOnCanvas = mouseIsOnCanvas;
function setRenderer(renderer) {
exports.currentRenderer = renderer;
}
exports.setRenderer = setRenderer;
function getMaxRegionSize(pInst, sketchContainerId) {
const region = {
width: pInst.windowWidth,
height: pInst.windowHeight,
};
if (document) {
const sketchContainer = document.getElementById(sketchContainerId);
if (sketchContainer) {
region.width = sketchContainer.getBoundingClientRect().width;
region.height = sketchContainer.getBoundingClientRect().height;
}
}
return region;
}
exports.getMaxRegionSize = getMaxRegionSize;
function initialize(pInst, frameRate = 60) {
window.noCanvas();
updateCanvasScale(pInst);
setFrameRate(pInst, frameRate);
setRenderer(pInst);
}
exports.initialize = initialize;
},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("./common/settings");
const p5Instance_1 = require("./common/p5Instance");
const GeometricBeing_1 = require("./GeometricBeing");
const Sprite_1 = require("./common/Sprite");
p5.disableFriendlyErrors = true;
const SKETCH_NAME = 'GeometricBeings20171213';
new p5();
const sketch = (p) => {
let geometricBeingArray;
let backgroundColor;
p.setup = () => {
const maxRegion = common.getMaxRegionSize(p, SKETCH_NAME);
const canvasSize = Math.min(maxRegion.width, maxRegion.height);
p.createCanvas(canvasSize, canvasSize);
p5Instance_1.setP5Instance(p);
common.initialize(p);
common.currentRenderer.rectMode(p.CENTER);
common.currentRenderer.noFill();
backgroundColor = p.color(248, 233, 123);
GeometricBeing_1.initialize(backgroundColor);
geometricBeingArray = new Sprite_1.SpriteArray();
const interval = 0.33 * common.CANVAS_SHORT_SIDE_LENGTH;
for (let y = 0; y < 3; y += interval) {
for (let x = 0; x < common.nonScaledWidth - interval; x += interval) {
geometricBeingArray.push(new GeometricBeing_1.default(x, y + common.CANVAS_SHORT_SIDE_LENGTH*0.33, 4));
}
}
};
p.draw = () => {
common.currentRenderer.scale(common.canvasScaleFactor);
geometricBeingArray.step();
geometricBeingArray.draw();
};
p.mousePressed = () => {
p.noLoop();
};
p.mouseReleased = () => {
p.loop();
};
};
new p5(sketch, SKETCH_NAME);
let myImage;
let pix;
let brightness;
let fortune_array = [];
function preload() {
myImage = loadImage("coffee1.jpg");
title = loadImage("etch.png");
}
function setup() {
createCanvas(windowWidth, windowHeight);
push();
imageMode(CENTER);
translate(windowWidth / 2, windowHeight / 2);
scale(0.8);
image(title, 0, 0);
pop();
textAlign(CENTER);
textSize(25);
textFont("Cutive Mono");
text("NY COFFEE GROUNDS TAROT", windowWidth/4, windowHeight/2 - myImage.height*0.1/2 - 45);
imageMode(CENTER);
translate(windowWidth / 2, windowHeight / 2);
scale(0.15);
myImage.loadPixels();
image(myImage, 0, 0);
getImageLightness("coffee1.jpg",function(brightness){
if (rank > 21){
extra_ranks = ['page', 'knight', 'queen', 'knight'];
rank = extra_ranks[rank - 22];
console.log(rank);
find_ranks(rank);
}
else{
find_ranks(rank);
}
let fortunes = data.tarot_interpretations[rank].fortune_telling[round(random(data.tarot_interpretations[rank].fortune_telling.length -1),0)];
console.log(fortunes);
textAlign(CENTER);
textSize(16);
textFont("Cutive Mono")
text(fortunes + ".", windowWidth/2 + 500, windowHeight/2 + myImage.height*0.1/2 + 50)
});
let fortunes = data.tarot_interpretations[0].fortune_telling[0];
}
function getImageLightness(imageSrc,callback) {
img = document.createElement("img");
img.src = imageSrc;
img.style.display = "none";
document.body.appendChild(img);
let colorSum = 0;
img.onload = function() {
let canvas = document.createElement("canvas");
canvas.width = this.width;
canvas.height = this.height;
let ctx = canvas.getContext("2d");
ctx.drawImage(this,0,0);
let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
let data = imageData.data;
let r,g,b,avg;
r = data[x];
g = data[x+1];
b = data[x+2];
avg = Math.floor((r+g+b)/3);
colorSum += avg;
}
brightness = Math.floor(colorSum / (this.width*this.height));
brightness = round(brightness.map(0, 255, 0, 25), 0);
console.log(brightness)
rank = brightness;
callback(brightness, rank);
}
}
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function round(value, decimals) {
return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
function find_ranks(key){
for(i = 0; i < data.tarot_interpretations.length; i++) {
if (data.tarot_interpretations[i].rank == key){
console.log('found matching rank in array ' + i);
fortune_array.push(i);
}
}
console.log('found matching rank in arrays ' + fortune_array)
rank = fortune_array[round((random(fortune_array.length -1)),0)];
console.log('selected rank in array ' + rank)
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
Mimi Yin NYU-ITP
Polar Roses
let x, y;
let px, py;
let i = 0;
let count = 0;
let t=0;
let drop = 0;
let particles = [];
let a;
let aspeed;
let yfreq;
let range;
let yscl;
let centerX, centerY;
function setup() {
createCanvas(windowWidth, windowHeight);
angle = 0;
aspeed = 0.002;
yfreq = 1;
range = width/4;
yscl = 1;
centerX = width/2;
centerY = height/2;
background(0);
}
function draw() {
background(0, 2);
angle += aspeed;
if (aspeed >= 0.027 ||count==1){
aspeed -=0.00004;
count = 1;
}
else if (count == 0){
aspeed +=0.00001;}
if(count == 1 && aspeed <= 0){
aspeed=0;
background(0,50);
}
x = cos(angle)*range + centerX;
y = sin(angle*yfreq)*range*yscl + centerY;
x = cos(sin(angle)*angle)*range*sin(angle)+ centerX;
y = sin(cos(angle)*angle*yfreq)*range*yscl*cos(angle)+ centerY;
stroke(255);
strokeWeight(1);
i++;
if (aspeed >= 0.01){
if (i > random(-aspeed*4000, aspeed*4000)) { 
if(px) line(px, py, x, y);
i = 0;
}
}
else {
if(px) line(px, py, x, y);
background(0, 3);
}
px = x;
py = y;
drop++;
particles.push(new Particle());
for(i=0;i<particles.length;i++){
particles[i].display();
}
if(particles.length>=50){
particles.pop();
}
console.log(particles.length);
}
function Particle() {  
let e1;
this.display = function(){
noStroke();
fill(255,random(1,100));
let radius=random(1,10);
fill(255,random(1,40));
ellipse (cos(noise(t)*3*PI)*width/5*1.3+width/2,sin(noise(t)*3*PI)*height/5*1.3+height/2,radius/2,radius);
t++;  
};
}
Mimi Yin NYU-ITP
Polar Roses
let x, y;
let px, py;
let sop = 0;
let i = 0;
let t = 0;
let count = 0;
let a;
let aspeed;
let yfreq;
let range;
let yscl;
let centerX, centerY;
function setup() {
createCanvas(windowWidth, windowHeight);
angle = 0;
aspeed = 0.5;
yfreq = 1;
range = width/4;
yscl = 1;
centerX = width/2;
centerY = height/2;
background(0);
}
function draw() {
background(0, 1.5);
angle += aspeed;
x = cos(angle)*range + centerX;
y = sin(angle*yfreq)*range*yscl + centerY;
sop += cos(0.01*angle)*range;
stroke(sop, cos);
aspeed += 0.001;
if (aspeed > 4){
aspeed = 0}
yfreq += 0.00001;
range += 0.001;
x = cos(0.01*angle)*range*0.01 + centerX;
y = sin(0.01*angle*yfreq)*range*yscl + centerY;
i++;
strokeWeight(1);
if (i > random(-40, 10)) { 
if(px) line(px, py, x, y);
i = 0;
}
px = x;
py = y;
}
Mimi Yin NYU-ITP
Visualizing relationship between circle
sine, cosine and tan waves.
let circle, speed;
let d, r, theta, tSpeed, n;
let drawSin = false;
let drawCos = false;
let drawTan = false;
function setup() {
createCanvas(TWO_PI * 100, window.innerHeight);
circle = createVector(0, height / 2);
speed = createVector((width / TWO_PI) * .0075, 0);
d = 200;
r = d / 2;
theta = 0;
n = 0;
tSpeed = (width / TWO_PI) * .000075;
}
function draw() {
background(0);
noStroke();
if (drawSin) {
fill(255, 0, 0);
for (let t = 0; t < theta; t += abs(tSpeed)) {
ellipse(t * 100, circle.y + r * sin(t), 1, 1);
}
}
if (drawCos) {
n +=0.1;
for (let t = 0; t < theta; t += abs(tSpeed)) {
fill(0, noise(n+10) *10 + 1000, 230, 60);
ellipse(t * 100, circle.y + r * cos(t), 20, 0.1);
fill(noise(n+10) *10 + 1000, 0, 230, 80);
ellipse(t * 100 + 20, circle.y + r * cos(t) + 20, 20, 0.1);
}
}
if (drawTan) {
fill(0);
for (let t = 0; t < theta; t += abs(tSpeed)) {
ellipse(t * 100, circle.y + r * tan(t), 1, 1);
}
}
stroke(225);
let circum = createVector(circle.x + r * cos(theta), circle.y + r * sin(theta));
noStroke();
noFill();
strokeWeight(1);
stroke(255);
ellipse(circle.x, circle.y, d, d);
if (circle.x > width || circle.x < 0) {
speed.mult(-1);
tSpeed *= -1;
}
circle.add(speed);
theta += tSpeed;
}
function keyPressed() {
switch (key) {
case 'C':
drawCos = !drawCos;
break;
case 'S':
drawSin = !drawSin;
break;
case 'T':
drawTan = !drawTan;
break;
}
Random pathways with controls.
- mouseX controls range (speed) of motion
- mouseY controls interval (how often there is a random change in direction)
When mouse is pressed:
- mouse position relative to center controls direction and extent of drift
When key is pressed:
- mouseY controls yscl (verticality)
let x, y;
let px, py;
let xspeed, yspeed;
let interval;
let range, yscl;
let xshift, yshift;
let i = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
x = width / 2;
y = (height / 2) + 120;
px = x;
py = y;
xspeed = 0;
yspeed = 0;
interval = 1;
range = 4;
yscl = 1;
xshift = 1;
yshift = 1;
background(0);
noStroke();
}
function draw() {
background(0, 5);
if (frameCount % interval == 0) {
}
x += xspeed;
y += yspeed;
strokeWeight(2);
stroke(random(0, 255), 255, random(80, 100));
line(px, py, x, y);
px = x;
py = y;
if (x < 0 || x > width || y < 0 || y > height) {
if (x < 0) x = width;
else if (x > width) x = 0;
if (y < 0) y = height;
else if (y > height) y = 0;
px = x;
py = y;
}
else if (keyIsPressed) {
i++;
fill(random(0, 255), 255, random(80, 100), i);
noStroke();
rect(width / 2 - random(100), height / 2 -random(100), 100, 100);
background(0, i);
}
else {
range = 100 * mouseX / width;
interval = int(120*mouseY/height);
i = 0;
}
var inData_last;
var wait;
var frame_count = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function draw() {
frame_count ++;
background(0);
fill(255);
textSize(60);
inData_last = inData;
if (inData !== inData_last){
text(inData);
frame_count = 0;
}
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
* @name ki_small (Japanese for "spirit")
* @description super quick growing bonsai tree
* based on brownian motion example from the Processing examples page
var init_tree = 0;
var init_leaf = 0;
var system;
var rain = 0;
var growth = 0;
var grow = 0;
var cell_cycle = 0;
var tree_g = 0;
var rate = 1;
var water_up = 0;
var water_up_counter = 0;
var dry = 0;
branch1 = 0;
branch2 = 0;
var num = 4000;
var num2 = 4000;
var range = 8;
var range2 = 8; 
var ax = [];
var ay = [];
var ax2 = [];
var ay2 = [];
var e = 0;
var timeout = 0;
var time = [];
var sec = 0;
var myVar;
function setup() {
createCanvas(1300, 700);
system = new ParticleSystem(createVector(width/2 - 135, 404));
frameRate(120);
e = random (-1, 1)
e = e * random(30, 50)
for ( var i = 0; i < num; i++ ) {
ax[i] = width/2 - 40 + (13/2 * e/15) + e/5  + (14/2*e/15) - e/3;
ay[i] = height/2 + 10 + (100-29*2 - e/5) - 14;
ax2[i] = width/2 - 40 + (13/2 * e/15) - e/5;
ay2[i] = height/2 + 70 - 13*2 - e/5;
width/2  - 40 + ((14/2 * e/15) - e/5) - (i/2*e/15) - e/3, height/2 + 40 + (100-29*2 - e/5) - i
}
}
function draw() {
timeout = timeout + 1;
if (timeout == 1)
{
fill(255);
textSize(32);
strokeWeight(3);
stroke(200, 230,230)
text("気", width / 2 - 30, 150)
timeout = 0;
background(255, 70);
fill(255)
strokeWeight(0.5);
stroke(180, 230, 255, 80);
ellipse(width / 2, height / 2 + 100, 300, - 35);
if (water_up > 1){
waterLevel();
}
dry = dry + 1
if (dry == 400){
water_up = water_up - 1
dry = 0;
}
for (var i = 1; i < 50; i++){
strokeWeight(0.3)
noFill();
stroke(180, 230, 255, random (70,80));
ellipse(width / 2, height / 2 + 150 - i, 250 + i*1.3, 44);
}
if (water_up > 4){
init_tree = 1;
}
if (init_tree == 1){
rate = rate + 0.1
tree_g = 80/exp(rate)
strokeWeight(0.3)
stroke(255, 80);
fill(153, 247, 200, 90);
if (branch2 == 1){
for (var i = 1; i < 15 - tree_g*4; i++){
ellipse(width/2  - 40 + ((14/2 * e/15) - e/5) + (i/2*e/15) + e/3, height/2  + 20 + (100-30*2 - e/5) - i, (10 - 29/5) + i/5, 6)
}
}
for (var i = 1; i < 30 - tree_g; i++){
ellipse(width/2 - 40 + (i/2 * e/15) - e/5, height/2 + 100 - i*2 - e/5, 10 - i/5, 6);
if (i > 15.1){
branch1 = 1;
}
if (i > 24.9){
branch2 = 1;
}
}
if (branch1 == 1){
for (var i = 1; i < 15 - tree_g*2; i++){
ellipse(width/2  - 40 + ((14/2 * e/15) - e/5) - (i/2*e/15) - e/3, height/2 + 40 + (100-29*2 - e/5) - i, (10 - 29/5) + i/5, 6)
}
}
if (tree_g < 0.1){
init_leaf = 1;
}
}
fill(150);
stroke(255, 80);
strokeWeight(0.6);
arc(width / 2 + 80, height / 2 + 96, 40, 79, PI, TWO_PI);
arc(width / 2 + 80, height / 2 + 96, 40, 6, 0,PI);
fill(98);
arc(width / 2 + 60, height / 2 + 100, 20, 28, PI, TWO_PI);
arc(width / 2 + 60, height / 2 + 100, 20, 6, 0, PI);
fill(120);
arc(width / 2 + 85, height / 2 + 102, 40, 39, PI, TWO_PI);
arc(width / 2 + 85, height / 2 + 102, 40, 6, 0,PI);
if(rain == 1) {
mousePressed();
if (grow == 1){ 
water_up_counter = water_up_counter + 1;
if (water_up_counter > 10){
water_up = water_up + 1;
waterLevel();
}
}
}
if (water_up > 0 && init_leaf ==1){
growth = 0.5;
}
else {
growth = 0;
}
cell_cycle = cell_cycle + 1;
if (cell_cycle == 10) {
cell_cycle = 0;
for ( var i = 1; i < num; i++ ) {
ax[i - 1] = ax[i];
ay[i - 1] = ay[i];
ax2[i - 1] = ax2[i];
ay2[i - 1] = ay2[i];
}
ax[num - 1] += random(-range*growth, range*growth);
ay[num - 1] += random(-range*growth, range*growth);
ax2[num2 - 1] += random(-range*growth, range*growth);
ay2[num2 - 1] += random(-range*growth, range*growth);
ax[num - 1] = constrain(ax[num - 1], 0, width / 2 + 300);
ay[num - 1] = constrain(ay[num - 1], 0, height / 2 + 80);
ax2[num2 - 1] = constrain(ax2[num2 - 1], 0, width / 2 + 300);
ay2[num2 - 1] = constrain(ay2[num2 - 1], 0, height / 2 + 80);
}
}
for ( var j = 1; j < num; j++ ) {
var val = j / num * 204.0 + 51;
stroke(val, 230,230);
strokeWeight (random(1,3))
strokeWeight(random(1,30));
line(ax[j - 1], ay[j - 1], ax[j], ay[j]);
line(ax[j - 2], ay[j - 2], ax[j-1], ay[j-1]);
}
for ( var h = 1; h < num2; h++ ) {
var val2 = h / num2 * 204.0 + 51;
stroke(val2, 230,230);
strokeWeight(random(1,30));
line(ax2[h - 1], ay2[h - 1], ax2[h], ay2[h]);
line(ax2[h - 2], ay2[h - 2], ax2[h-1], ay2[h-1]);
}
}
var Particle = function(position) {
this.acceleration = createVector(0, 1.5);
this.velocity = createVector(random(-1, 1), random(-1, 1));
this.position = position.copy();
this.lifespan = 220.0;
};
Particle.prototype.run = function() {
this.update();
this.display();
};
Particle.prototype.update = function(){
this.velocity.add(this.acceleration);
this.position.add(this.velocity);
this.lifespan -= 30;
};
Particle.prototype.display = function() {
stroke(random(170, 200), random(220,230), 255, this.lifespan);
strokeWeight(random(5));
line(this.position.x, this.position.y, this.position.x + random (-2,1), this.position.y + random (- 2, 1));
stroke(255, this.lifespan);
strokeWeight(random(3));
line(this.position.x +random(-2,3), this.position.y +random(-2,1), this.position.x + random (-4,10), this.position.y + random (-2, 10));
};
Particle.prototype.isDead = function(){
if (this.lifespan < 0) {
return true;
} else {
return false;
}
};
var ParticleSystem = function(position) {
this.origin = position.copy();
this.particles = [];
};
ParticleSystem.prototype.addParticle = function() {
this.particles.push(new Particle(this.origin));
};
ParticleSystem.prototype.run = function() {
for (var i = this.particles.length-1; i >= 0; i--) {
var p = this.particles[i];
p.run();
if (p.isDead()) {
this.particles.splice(i, 1);
}
}
};
function mousePressed() {
waterPlant();
}
function mouseReleased() {
for (i = 1; i <= 1000; i++){
system.run();
}
rain = 0;
grow = 0;
}
function waterPlant(){
rain = 1;
grow = 1;
noFill();
stroke(255,255,153, 80);
strokeWeight(10);
arc(width/2 - 176, 398, 80, 60, PI+QUARTER_PI, TWO_PI);
stroke(230, 30, 230)
r = random (-1, 1);
if (r < 0) {
system.addParticle();
}
system.run();
if (rain == 1){
for (i = 1; i < 10; i++){
stroke(random(170, 200), random(220,230), 255, 60/(i*2))
strokeWeight(8)
point(width/2 - 135,400 + i*4)
} 
}
stroke(230, 30, 230)
r = random (-1, 1);
if (r < 0) {
system.addParticle();
}
system.run();
}
function waterLevel() {
if (water_up < 8) {
strokeWeight(0.5)
fill (180, 243, 250, 95)
stroke(255, 99);
ellipse(width / 2, height / 2 +  150 - water_up, 250 + water_up, 44 - water_up/2);
}
else {
water_up = 8;
strokeWeight(0.5)
fill (180, 243, 250, 95)
stroke(255, 99);
ellipse(width / 2, height / 2 +  150 - water_up, 250 + water_up, 44 - water_up/2);
}
}let video;
let button;
let snapshot;
let text_counter = 0;
let brightness;
let fortune_array = [];
let data;
let fortunes;
function preload() {
title = loadImage("etch.png");
}
function setup(){
video = createCapture(VIDEO);
video.position(windowWidth/2 - video.width/2, windowHeight/2  - video.height/2);
video.size(320, 240); 
button = createButton('snap !');
button.position(windowWidth/2 - 20, windowHeight/2 + 35);
button.mousePressed(takesnap);
}
function takesnap() {
snapshot = video.get();
text_counter = 0;
createCanvas(windowWidth, windowHeight);
push();
imageMode(CENTER);
translate(windowWidth / 2, windowHeight / 2 - title.height/64 - 30);
scale(0.4);
image(title, 0, 0);
pop();
}
function getBrightness() {
snapshot.loadPixels();
let r, g, b;
let colorSum = 0;
r = snapshot.pixels[x];
g = snapshot.pixels[x + 1];
b = snapshot.pixels[x + 2];
avg = Math.floor((r + g + b) / 3);
colorSum += avg;
}
brightness = Math.floor(colorSum / (snapshot.width * snapshot.height));
brightness = round(map(brightness, 0, 255, 0, 25), 0);
rank = brightness;
}
function find_ranks(key) {
for (i = 0; i < data.tarot_interpretations.length; i++) {
if (data.tarot_interpretations[i].rank == key) {
console.log('found matching rank in array ' + i);
fortune_array.push(i);
}
}
console.log('found matching rank in arrays ' + fortune_array)
rank = fortune_array[round((random(fortune_array.length - 1)), 0)];
console.log('selected rank in array ' + rank)
}
function draw() {
if (snapshot && text_counter == 0) {
video.hide();
button.hide();
imageMode(CENTER);
translate(windowWidth / 2, windowHeight / 2);
scale(0.6);
image(snapshot, 0, 0);
snapshot.loadPixels();
getBrightness();
if (rank > 21) {
extra_ranks = ['page', 'knight', 'queen', 'knight'];
rank = extra_ranks[rank - 22];
console.log(rank);
find_ranks(rank);
fortunes = data.tarot_interpretations[rank].fortune_telling[data.tarot_interpretations[rank].fortune_telling.length - 1];
} 
else {
find_ranks(rank);
fortunes = data.tarot_interpretations[rank].fortune_telling[data.tarot_interpretations[rank].fortune_telling.length - 1];
}
console.log(fortunes);
push();
textAlign(CENTER);
textSize(22);
textFont("Cutive Mono")
text(fortunes + ".", 0, windowHeight / 3 + snapshot.height * 0.1 / 2 + 100);
pop();
fortunes = data.tarot_interpretations[0].fortune_telling[0];
text_counter = 1;
}
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}var img;
let imheight;
let imwidth;
function preload() {
img = loadImage("cunei_p5.png");
imheight = img.height;
}
function setup() {
createCanvas(500, 500)
background(255);
image(img, 0, 0);
}
function draw() {
background(255);
img.loadPixels();
var stepSize = round(constrain(img.width/ 8, 6, 32));
for (var y=0; y< img.height; y ++) {
for (var x=0; x< img.width; x++) {
var i = y * width + x;
var darkness = (255 - img.pixels[i*4]) / 255;
stroke(darkness/100, darkness*100);
line(x, y, x+ darkness, y * darkness );
}
}
}var img;
let imheight;
let imwidth;
function preload() {
img = loadImage("cunei_p5.png");
imheight = img.height;
}
function setup() {
createCanvas(500, 500)
background(255);
image(img, 0, 0);
}
function draw() {
background(255);
img.loadPixels();
var stepSize = round(constrain(img.width/ 8, 6, 32));
for (var y=0; y< img.height; y ++) {
for (var x=0; x< img.width; x++) {
var i = y * width + x;
var darkness = (255 - img.pixels[i*4]) / 255;
stroke(darkness/100, darkness*100);
line(x, y, x+ darkness, y * darkness );
}
}
}var img;
let imheight;
let imwidth;
function preload() {
img = loadImage("cunei_p5.png");
imheight = img.height;
}
function setup() {
createCanvas(500, 500)
background(255);
image(img, 0, 0);
}
function draw() {
background(255);
img.loadPixels();
var stepSize = round(constrain(img.width/ 8, 6, 32));
for (var y=0; y< img.height; y ++) {
for (var x=0; x< img.width; x++) {
var i = y * width + x;
var darkness = (255 - img.pixels[i*4]) / 255;
stroke(darkness/100, darkness*100);
line(x, y, x+ darkness, y * darkness );
}
}
}var img;
let imheight;
let imwidth;
function preload() {
img = loadImage("cunei_p5.png");
imheight = img.height;
}
function setup() {
createCanvas(500, 500)
background(255);
image(img, 0, 0);
}
function draw() {
background(255);
img.loadPixels();
var stepSize = round(constrain(img.width/ 8, 6, 32));
for (var y=0; y< img.height; y ++) {
for (var x=0; x< img.width; x++) {
var i = y * width + x;
var darkness = (255 - img.pixels[i*4]) / 255;
stroke(darkness/100, darkness*100);
line(x, y, x+ darkness, y * darkness );
}
}
}var img;
let imheight;
let imwidth;
function preload() {
img = loadImage("cunei_p5.png");
imheight = img.height;
}
function setup() {
createCanvas(500, 500)
background(255);
image(img, 0, 0);
}
function draw() {
background(255);
img.loadPixels();
var stepSize = round(constrain(img.width/ 8, 6, 32));
for (var y=0; y< img.height; y ++) {
for (var x=0; x< img.width; x++) {
var i = y * width + x;
var darkness = (255 - img.pixels[i*4]) / 255;
stroke(darkness/100, darkness*100);
line(x, y, x+ darkness, y * darkness );
}
}
}var img;
let imheight;
let imwidth;
function preload() {
img = loadImage("cunei_p5.png");
imheight = im.height;
}
function setup() {
createCanvas(500, 500)
background(255);
image(img, 0, 0);
}
function draw() {
background(255);
img.loadPixels();
var stepSize = round(constrain(img.width/ 8, 6, 32));
for (var y=0; y< img.height; y ++) {
for (var x=0; x< img.width; x++) {
var i = y * width + x;
var darkness = (255 - img.pixels[i*4]) / 255;
stroke(darkness/100, darkness*100);
line(x, y, x+ darkness, y * darkness );
}
}
}var img;
let imheight;
let imwidth;
function preload() {
img = loadImage("cunei_p5.png");
imheight = im.height;
}
function setup() {
createCanvas(500, 500)
background(255);
image(img, 0, 0);
}
function draw() {
background(255);
img.loadPixels();
var stepSize = round(constrain(img.width/ 8, 6, 32));
for (var y=0; y< img.height; y ++) {
for (var x=0; x< img.width; x++) {
var i = y * width + x;
var darkness = (255 - img.pixels[i*4]) / 255;
stroke(darkness/100, darkness*100);
line(x, y, x+ darkness, y * darkness );
}
}
}var img;
let imheight;
let imwidth;
function preload() {
img = loadImage("cunei_p5.png");
imheight = im.height;
}
function setup() {
createCanvas(500, 500)
background(255);
image(img, 0, 0);
}
function draw() {
background(255);
img.loadPixels();
var stepSize = round(constrain(img.width/ 8, 6, 32));
for (var y=0; y< img.height; y ++) {
for (var x=0; x< img.width; x++) {
var i = y * width + x;
var darkness = (255 - img.pixels[i*4]) / 255;
stroke(darkness/100, darkness*100);
line(x, y, x+ darkness, y * darkness );
}
}
let video;
let button;
let snapshot;
function preload() {
}
function setup() {
createCanvas(320, 240);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
button = createButton('snap');
button.mousePressed(takesnap);
}
function takesnap() {
snapshot = video.get();
}
function draw() {
if (snapshot) {
image(snapshot,0,0);
}
}let myImage;
let pix;
function preload() {
myImage = loadImage("pics/coffee.jpg");
}
function setup() {
createCanvas(1000, 1000);
scale(0.1);
myImage.loadPixels();
pix = myImage.pixels.length;
image(myImage, 0, 0);
getImageLightness("coffee.jpg",function(brightness){
console.log(brightness);
});
}
function draw() {
}
function getImageLightness(imageSrc,callback) {
var img = document.createElement("img");
img.src = imageSrc;
img.style.display = "none";
document.body.appendChild(img);
var colorSum = 0;
img.onload = function() {
var canvas = document.createElement("canvas");
canvas.width = this.width;
canvas.height = this.height;
var ctx = canvas.getContext("2d");
ctx.drawImage(this,0,0);
var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
var data = imageData.data;
var r,g,b,avg;
for(var x = 0, len = data.length; x < len; x+=4) {
r = data[x];
g = data[x+1];
b = data[x+2];
avg = Math.floor((r+g+b)/3);
colorSum += avg;
}
var brightness = Math.floor(colorSum / (this.width*this.height));
callback(brightness);
}
var star = 8;
let star_select;
var sample;
var inData_last;
var wait;
var frame_count = 0;
var plays = 0;
let john;
let amy;
let david;
let minnie;
function preload(){
soundFormats('mp3', 'ogg');
sample0 = loadSound('barack_vocal.mp3');
sample1 = loadSound('sounds/minnie_vocal.mp3');
sample2 = loadSound('sounds/john_vocal.mp3');
sample3 = loadSound('sounds/amy_vocal.mp3');
sample4 = loadSound('sounds/bowie_vocal.mp3');
sample5 = loadSound('barack_vocal2.mp3');
}
function setup() {
imageMode(CENTER);
john = loadImage('pics/johncoltrane.png');
amy = loadImage('pics/amyw.png');
david = loadImage('pics/davidbowie.png');
minnie = loadImage('pics/minnier.png');
title = loadImage('pics/title.png');
createCanvas(windowWidth, windowHeight);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function draw() {
frame_count ++;
background(0);
fill(255);
if (star == 8){
push();
translate(windowWidth / 2, windowHeight / 2);
scale(0.23);
image(title, 0, 0)
pop();
}
inData_last = inData;
if (inData == 1){
star = 1;
star_select = "minnie";
frame_count = 0;
}
if (inData == 2){
star = 2;
star_select = "john";
frame_count = 0;
}
if  (inData == 3){
star = 3;
star_select = "amy";
frame_count = 0;
}
if (inData == 4){
star = 4;
star_select = "david";
frame_count = 0;
}
if (inData == 5){
}
if (inData == 6){
star = inData;
inData = "none"
if (star == 6){
sample0.play(6);
star = "none";
plays = 1;
}
}
if (inData_last == inData){
if (frame_count > 20){
if (star == 1){
sample1.play();
star = "none";
}
if (star == 2){
sample2.play();
star = "none";
}
if (star == 3){
sample3.play();
star = "none";
}
if (star == 4){
sample4.play();
star = "none";
}
if (star_select == "minnie" && sample1.isPlaying()){
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(minnie, 0, 0);
}
if (star_select == "john" && sample2.isPlaying()){
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(john, 0, 0);
}
if (star_select == "amy" && sample3.isPlaying()){
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(amy, 0, 0);
}
if (star_select == "david" && sample4.isPlaying()){
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(david, 0, 0);
}
if (sample1.isPlaying() != true && sample2.isPlaying() != true){
if (sample3.isPlaying() != true && sample4.isPlaying() != true){
push();
translate(windowWidth / 2, windowHeight / 2);
scale(0.23);
image(title, 0, 0);
pop();
}
}
}
}
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
var star;
let star_select;
var sample;
var inData_last;
var wait;
var frame_count = 0;
var plays = 0;
let john;
let amy;
let david;
let minnie;
function preload(){
soundFormats('mp3', 'ogg');
sample0 = loadSound('barack_vocal.mp3');
sample1 = loadSound('sounds/minnie_vocal.mp3');
sample2 = loadSound('sounds/john_vocal.mp3');
sample3 = loadSound('sounds/amy_vocal.mp3');
sample4 = loadSound('sounds/bowie_vocal.mp3');
sample5 = loadSound('barack_vocal2.mp3');
}
function setup() {
imageMode(CENTER);
john = loadImage('pics/johncoltrane.png');
amy = loadImage('pics/amyw.png');
david = loadImage('pics/davidbowie.png');
minnie = loadImage('pics/minnier.png');
createCanvas(windowWidth, windowHeight);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function draw() {
frame_count ++;
background(0);
fill(255);
textSize(60);
inData_last = inData;
if (inData == 1){
star = 1;
star_select = "minnie";
frame_count = 0;
}
if (inData == 2){
star = 2;
star_select = "john";
frame_count = 0;
}
if  (inData == 3){
star = 3;
star_select = "amy";
frame_count = 0;
}
if (inData == 4){
star = 4;
star_select = "david";
frame_count = 0;
}
if (inData == 5){
}
if (inData == 6){
star = inData;
inData = "none"
if (star == 6){
sample0.play(6);
star = "none";
plays = 1;
}
}
if (inData_last == inData){
if (frame_count > 20){
if (star == 1){
sample1.play();
sample5.play(sample1.duration() + 2);
star = "none";
}
if (star == 2){
sample2.play();
sample5.play(sample2.duration() + 2);
star = "none";
}
if (star == 3){
sample3.play();
sample5.play(sample3.duration() + 2);
star = "none";
}
if (star == 4){
sample4.play();
sample5.play(sample4.duration() + 2);
star = "none";
}
if (star_select == "minnie" && sample1.isPlaying()){
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(minnie, 0, 0);
}
if (star_select == "john" && sample2.isPlaying()){
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(john, 0, 0);
}
if (star_select == "amy" && sample3.isPlaying()){
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(amy, 0, 0);
}
if (star_select == "david" && sample4.isPlaying()){
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(david, 0, 0);
}
}
}
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
var star;
var sample;
var inData_last;
var wait;
var frame_count = 0;
function preload(){
soundFormats('mp3', 'ogg');
sample1 = loadSound('sounds/bowie_vocal.mp3');
sample1.setVolume(1.0);
}
function setup() {
createCanvas(600, 600);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function draw() {
frame_count ++;
background(0);
fill(255);
textSize(60);
inData_last = inData;
if (inData == 1){
text("Star: Minnie", 30, 100);
star = 1;
frame_count = 0;
}
if (inData == 2){
text("Star: John", 30, 100);
star = 2;
frame_count = 0;
}
if  (inData == 3){
text("Star: Amy", 30, 100);
star = 3;
frame_count = 0;
}
if (inData == 4){
text("Star: David", 30, 100);
star = 4;
frame_count = 0;
}
if (inData == 5){
text("drop", 30, 100);
}
if (inData_last == inData){
if (frame_count > 100){
if (star == 4){
sample1.play();
star = "none";
}
}
}
}
var star;
let star_select;
var sample;
var inData_last;
var wait;
var frame_count = 0;
let john;
let amy;
let david;
let minnie;
function preload(){
soundFormats('mp3', 'ogg');
sample1 = loadSound('sounds/minnie_vocal.mp3');
sample2 = loadSound('sounds/john_vocal.mp3');
sample3 = loadSound('sounds/amy_vocal.mp3');
sample4 = loadSound('sounds/bowie_vocal.mp3');
}
function setup() {
imageMode(CENTER);
john = loadImage('pics/johncoltrane.png');
amy = loadImage('pics/amyw.png');
david = loadImage('pics/davidbowie.png');
minnie = loadImage('pics/minnier.png');
createCanvas(windowWidth, windowHeight);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function draw() {
frame_count ++;
background(0);
fill(255);
textSize(60);
inData_last = inData;
if (inData == 1){
star = 1;
star_select = "minnie";
frame_count = 0;
}
if (inData == 2){
star = 2;
star_select = "john";
frame_count = 0;
}
if  (inData == 3){
star = 3;
star_select = "amy";
frame_count = 0;
}
if (inData == 4){
star = 4;
star_select = "david";
frame_count = 0;
}
if (inData == 5){
}
if (inData_last == inData){
if (frame_count > 20){
if (star == 1){
sample1.play();
star = "none";
}
if (star == 2){
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(john, 0, 0);
pop();
sample2.play();
star = "none";
}
if (star == 3){
push();
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(amy, 0, 0);
pop();
sample3.play();
star = "none";
}
if (star == 4){
push();
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(david, 0, 0);
pop();
sample4.play();
star = "none";
}
if (star_select == "minnie"){
push();
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(minnie, 0, 0);
pop();
}
if (star_select == "john"){
push();
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(john, 0, 0);
pop();
}
if (star_select == "amy"){
push();
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(amy, 0, 0);
pop();
}
if (star_select == "david"){
push();
translate(windowWidth / 2, windowHeight / 2);
scale(0.4);
rotate(radians(frameCount));
image(david, 0, 0);
pop();
}
}
}
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
* @name Play Mode
* @description
* <p>In 'sustain' mode, the sound will overlap with itself.
* In 'restart' mode it will stop and then start again.
* Click mouse to play a sound file.
* Trigger lots of sounds at once! Press any key to change playmode.</p>
* <p><em><span class="small"> To run this example locally, you will need the
var sample;
var star = 1;
function preload(){
soundFormats('mp3', 'ogg');
sample1 = loadSound('assets/bowie_vocal.mp3');
}
function setup() {
createCanvas(710,50);
}
function draw() {
if (star == 1){
sample1.play();
star = "none";
}
background(255,255,0);
}
function preload(){
}
let fish1;
let fish2;
let gravity;
let mov_speed;
let random_pos;
let fish = [2, 3, 4];
function setup() {
console.log(data);
img = createImg(data.hdurl);
img.hide();
image(img, 0, 0);
createCanvas(1000, 800);
gravity = 0;
mov_speed = 0;
var size = 1
fish1 = new Fish(width/2, height/2, width/2 + 30, height/2);
}
function draw() {
image(img,0,0);
mov_speed = mov_speed + 01;
gravity = gravity + random(-0.1, 0.1);
fish1.show();
fish1.move();
}
class Fish {
constructor(temp_x1, temp_y1, temp_x2, temp_y2){
this.x2_org = temp_x2;
this.y2_org = temp_y2;
this.x1 = temp_x1 + 20;
this.y1 = temp_y1;
this.x2 = temp_x2 + 10;
this.y2 = temp_y2;
this.rot_speed_r = random(0,1);
this.x3 = temp_x1 - 20;
this.y3 = temp_y1;
this.x4 = temp_x2 - 70;
this.y4 = temp_y2;
this.rot_speed_l = random(0,1);
this.x5 = temp_x1;
this.y5 = temp_y1 - 20;
this.x6 = temp_x2 - 30;
this.y6 = temp_y2 + 60;
this.rot_speed_b = 1;
this.x7 = temp_x1;
this.y7 = temp_y1 + 45;
this.x8 = temp_x2 - 20;
this.y8 = temp_y2 + 80;
this.rot_speed_bf = 1;		
}
move() {
this.x1 = this.x1 + this.rot_speed_r/random(10,14);
this.y1 = this.y1 + this.rot_speed_r/random(10,14);
this.x2 = this.x2 + this.rot_speed_r/random(3,4);
this.y2 = this.y2 + this.rot_speed_r/random(3,4);
this.x3 = this.x3 - this.rot_speed_l/random(10,14);
this.y3 = this.y3 + this.rot_speed_l/random(10,14);
this.x4 = this.x4 - this.rot_speed_l/random(3,4);
this.y4 = this.y4 + this.rot_speed_l/random(3,4);
this.x5 = this.x5 - this.rot_speed_b/random(20,25);
this.y5 = this.y5 + this.rot_speed_b/random(20,25);
this.x6 = this.x6 - this.rot_speed_b/random(3,4);
this.x7 = this.x6;
this.y7 = this.y6;
this.x8 = this.x8 - this.rot_speed_bf/random(3,4);
if (this.y2 > this.y2_org + 10){
this.rot_speed_r = this.rot_speed_r * -1;
}
else if (this.y2 <= this.y2_org -5){
this.rot_speed_r = this.rot_speed_r * -1;
}
if (this.y4 > this.y2_org + 10){
this.rot_speed_l = this.rot_speed_l * -1;
}
else if (this.y4 <= this.y2_org -5){
this.rot_speed_l = this.rot_speed_l * -1;
}
if (this.x6 > this.x2_org - 30 + 20){
this.rot_speed_b = this.rot_speed_b * -1;
}
else if (this.x6 <= this.x2_org -20 -20){
this.rot_speed_b = this.rot_speed_b * -1;
}
if (this.x8 > this.x2_org - 20 + 10){
this.rot_speed_bf = this.rot_speed_b * -1;
}
else if (this.x8 < this.x2_org -10 -10){
this.rot_speed_bf = this.rot_speed_b* -1;
}
}
show(){
push();
translate(mov_speed/100 + gravity + noise(millis() / 10000.0) * 10,-1*(mov_speed/50 + gravity) + noise(millis() / 10000.0) * 100);
pop();
push();
angleMode(DEGREES);
translate(width/4*gravity/1000, height/4*gravity/100);
pop();
rotate(-1*(mov_speed/40));
noStroke();
for(let i = 0; i < 40; i++){
stroke(255);
fill(255);
triangle(this.x5, this.y5 - 10 + i, this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20);
fill(255);
triangle(this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20, this.x6, this.y6-i);
}
for (let i = 0; i < 20; i++){
stroke(255);
strokeWeight(random (0.2, 0.3));
line(this.x1, this.y1, this.x2 - i/2, this.y2 + i);
line(this.x3, this.y3, this.x4 + i/2, this.y4 + i);
stroke(255)
line(this.x7, this.y7, this.x8 + i/2, this.y8);
strokeWeight(0.1);
stroke(255)
line(this.x5, this.y1+5, this.x6 - i/4, this.y2/100 + this.y8 -55);
}
for(let i = 0; i < 40; i++){
stroke(255, 0, 0, 255/i*10);
fill(255, 0, 0, i*5);
triangle(this.x5, this.y5 - 10 + i, this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20);
fill(255, 0, 0, i);
triangle(this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20, this.x6, this.y6-i);
}
for (let i = 0; i < 20; i++){
stroke(255, 0, 0, 255/i*4);
strokeWeight(random (0.2, 0.3));
line(this.x1, this.y1, this.x2 - i/2, this.y2 + i);
line(this.x3, this.y3, this.x4 + i/2, this.y4 + i);
stroke(255, 0, 0, 50)
line(this.x7, this.y7, this.x8 + i/2, this.y8);
strokeWeight(0.1);
stroke(255,i*100)
line(this.x5, this.y1+5, this.x6 - i/4, this.y2/100 + this.y8 -55);
}
}
}function preload(){
');
}
function setup() { 
createCanvas(400, 400);
console.log(data);
} 
function draw() { 
background(220);
}function preload(){
');
}
function setup() { 
createCanvas(400, 400);
console.log(data);
} 
function draw() { 
background(220);
}function preload(){
}
function setup() { 
createCanvas(400, 400);
console.log(data);
} 
function draw() { 
background(220);
}let canvas;
let h1;
let x = 100;
let y = 100;
let z = 1;
let t = 1;
let button;
let slider;
let counter = 0;
function setup() { 
canvas = createCanvas(200, 200);
canvas.position(100, 100);
button = createButton("anti-cubist button");
button.position(400, 400);
button.mousePressed(count_users);
slider = createSlider(0, 100, 50);
slider.position(200, 300)
h1 = createElement("h1", "cubist thinking?");} 
function count_users () {
h1.html("ha, no cubist thinking but DADA");
createP(random (1,1000) + " cubists are connected to THE INTERNET");
}
function draw() { 
background(255, 20);
h1.position(x, y);
counter ++;
if (counter > 2*t){
background(80, 130, 230, random(1))
}
fill(255, 100)
let y1 = map(slider.value(), 0, slider.value(), 45, height-100);
noFill();
if (x == width/4 || y == height/4){
z = random(1);
t = random(1);
}
if (x <= width && y > height/2){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
triangle(x + 20, y*z, y, x*z, x/2, x);
triangle(width -x*t, y/z, height, x*t, x/2*t,x/t);
triangle(width - x, height - y*z, height - y, width - x*z, width - x/2, width - x);
triangle(0 + x*t, height-y/z, 0, width - x*t, width - x/2*t,width - x/t);
x+= 1*y1/100
}
else if (x <= width && y <= height){
x += x*t;
y += 100
}
else{
background(255, 10);
x = 0;
y = 0;
}
var options = { baudrate: 9600};
function setup() {
}
inData = inByte;
}
}
function draw() {
background(0);
fill(255);
text("incoming value: " + inData, 30, 30);
}
function mouseDragged() {
outByte = int(map(mouseY, 0, height, 0, 255));
}
function keyPressed() {
}
var options = {baudrate: 115200};
var inData;
function setup() {
createCanvas(400, 300);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
function draw() {
background(0);
fill(255);
text("sensor value: " + inData, 30, 30);
}function setup(){
createCanvas(400, 400);
img = loadImage("john_coltrane.png");
}
function draw(){
background(0);
scale(0.05);
translate(0, 700); 
rotate(radians(frameCount));
image(img, 0, 0)
}
function windowResized(){
resizeCanvas(windowWidth, windowHeight);
var star;
function setup() {
createCanvas(600, 600);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function draw() {
background(0);
fill(255);
textSize(60);
if (inData == 1){
text("Star: Minnie", 30, 100);
}
if (inData == 2){
text("Star: David", 30, 100);
}
if (inData == 3){
text("Star: Amy", 30, 100);
}
if (inData == 4){
text("Star: John", 30, 100);
}
}
var star;
function setup() {
createCanvas(600, 600);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function draw() {
background(0);
fill(255);
textSize(60);
if (inData == 1){
text("Star: Minnie", 30, 100);
}
if (inData == 2){
text("Star: David", 30, 100);
}
if (inData == 3){
text("Star: Amy", 30, 100);
}
if (inData == 4){
text("Star: John", 30, 100);
}
}
function preload() {
soundFormats('mp3', 'ogg');
mySound1 = loadSound('/sounds/test_voiceover_hand.wav');
mySound2 = loadSound('/sounds/test_voiceover_hand.wav');
}
function setup() {
mySound.setVolume(0.1);
mySound1.play();
delay(1000);
mySound2.play();
}let fish1;
let fish2;
let gravity;
let mov_speed;
let random_pos;
let fish = [2, 3, 4];
var size;
function setup() {
createCanvas(600, 400);
gravity = 0;
mov_speed = 0;
size = 2
fish1 = new Fish(50, 50, 50 + 30, 50, size);
}
function draw() {
mov_speed = mov_speed + 01;
gravity = gravity + random(-0.1, 0.1);
background(255);
fish1.show();
fish1.move();
}
class Fish {
constructor(temp_x1, temp_y1, temp_x2, temp_y2, size){
this.x2_org = temp_x2*size;
this.y2_org = temp_y2*size;
this.x1 = (temp_x1 + 20)*size;
this.y1 = temp_y1*size;
this.x2 = (temp_x2 + 10)*size;
this.y2 = temp_y2*size;
this.rot_speed_r = random(0,1.5);
this.x3 = (temp_x1 - 20)*size;
this.y3 = temp_y1*size;
this.x4 = (temp_x2 - 70)*size;
this.y4 = temp_y2*size;
this.rot_speed_l = random(0,1.5);
this.x5 = temp_x1*size;
this.y5 = (temp_y1 - 20)*size;
this.x6 = (temp_x2 - 30)*size;
this.y6 = (temp_y2 + 60)*size;
this.rot_speed_b = 1;
this.x7 = temp_x1*size;
this.y7 = (temp_y1 + 45)*size;
this.x8 = (temp_x2 - 20)*size;
this.y8 = (temp_y2 + 80)*size;
this.rot_speed_bf = 1;		
}
move() {
this.x1 = this.x1 + this.rot_speed_r/random(10,14);
this.y1 = this.y1 + this.rot_speed_r/random(10,14);
this.x2 = this.x2 + this.rot_speed_r/random(3,4);
this.y2 = this.y2 + this.rot_speed_r/random(3,4);
this.x3 = this.x3 - this.rot_speed_l/random(10,14);
this.y3 = this.y3 + this.rot_speed_l/random(10,14);
this.x4 = this.x4 - this.rot_speed_l/random(3,4);
this.y4 = this.y4 + this.rot_speed_l/random(3,4);
this.x5 = this.x5 - this.rot_speed_b/random(20,25);
this.y5 = this.y5 + this.rot_speed_b/random(20,25);
this.x6 = this.x6 - this.rot_speed_b/random(3,4);
this.y6 = this.y6 + this.rot_speed_b/random(20,25);
this.x7 = this.x6;
this.y7 = this.y6;
this.x8 = this.x8 - this.rot_speed_bf/random(3,4);
if (this.y2 > this.y2_org + 10){
this.rot_speed_r = this.rot_speed_r * -1;
}
else if (this.y2 <= this.y2_org -5){
this.rot_speed_r = this.rot_speed_r * -1;
}
if (this.y4 > this.y2_org + 10){
this.rot_speed_l = this.rot_speed_l * -1;
}
else if (this.y4 <= this.y2_org -5){
this.rot_speed_l = this.rot_speed_l * -1;
}
if (this.x6> this.x2_org - 30 + 20){
this.rot_speed_b = this.rot_speed_b * -1;
}
else if (this.x6 <= this.x2_org -20 -20){
this.rot_speed_b = this.rot_speed_b * -1;
}
if (this.x8 > this.x2_org - 20 + 10){
this.rot_speed_bf = this.rot_speed_b * -1;
}
else if (this.x8 < this.x2_org -10 -10){
this.rot_speed_bf = this.rot_speed_b* -1;
}
}
show(){
push();
translate(mov_speed/100 + gravity + noise(millis() / 10000.0) * 10,-1*(mov_speed/50 + gravity) + noise(millis() / 10000.0) * 100);
pop();
push();
angleMode(DEGREES);
translate(width/4*gravity/1000, height/4*gravity/100);
pop();
rotate(-1*(mov_speed/40));
noStroke();
for(let i = 0; i < 40*size; i++){
stroke(255);
fill(255);
triangle(this.x5, this.y5 - 10 + i, this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20);
fill(255);
triangle(this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20, this.x6, this.y6-i);
}
for (let i = 0; i < 20*size; i++){
stroke(255);
strokeWeight(random (0.2, 0.3));
line(this.x1, this.y1, this.x2 - i/2*size, this.y2 + i);
line(this.x3, this.y3, this.x4 + i/2*size, this.y4 + i);
stroke(255)
line(this.x7, this.y7, this.x8 + i/2*size, this.y8);
strokeWeight(0.1);
stroke(255)
line(this.x5, this.y1+5*size, this.x6 - i/4*size, this.y2/100*size + this.y8 -55*size);
}
for(let i = 0; i < 40*size; i++){
stroke(255, 0, 0, 255/i*10);
fill(255, 0, 0, i*5);
triangle(this.x5, this.y5 - 10*size + i, this.x5 - 20*size, this.y5 + 20*size, this.x5 + 20*size, this.y5 +20*size);
fill(255, 0, 0, i);
triangle(this.x5 - 20*size, this.y5 + 20*size, this.x5 + 20*size, this.y5 +20*size, this.x6, this.y6-i);
}
for (let i = 0; i < 20*size; i++){
stroke(255, 0, 0, 255/i*4);
strokeWeight(random (0.2, 0.3));
line(this.x1, this.y1, this.x2 - i/2*size, this.y2 + i);
line(this.x3, this.y3, this.x4 + i/2*size, this.y4 + i);
stroke(255, 0, 0, 50)
line(this.x7, this.y7, this.x8 + i/2*size, this.y8);
strokeWeight(0.1);
stroke(255,i*100)
line(this.x5, this.y1+5*size, this.x6 - i/4*size, this.y2/100*size + this.y8 -55*size);
}
}
}let fish1;
let fish2;
let gravity;
let mov_speed;
let random_pos;
let fish = [2, 3, 4]
function setup() {
createCanvas(600, 400);
gravity = 0;
mov_speed = 0;
fish1 = new Fish(width/2, height/2, width/2 + 30, height/2);
for (let i = 0; i <2; i++){
random_pos = random(-200, 200);
fish[i] = new Fish(width/2 + random_pos, height/2 + random_pos, width/2 + 30 + random_pos, height/2 + random_pos);
}
}
function draw() {
mov_speed = mov_speed + 01;
gravity = gravity + random(-0.1, 0.1);
background(255);
fish1.show();
fish1.move();
for (let i = 0; i <2; i++){
fish[i].show();
fish[i].move();
}	
}
class Fish {
constructor(temp_x1, temp_y1, temp_x2, temp_y2){
this.x2_org = temp_x2;
this.y2_org = temp_y2;
this.x1 = temp_x1 + 20;
this.y1 = temp_y1;
this.x2 = temp_x2 + 10;
this.y2 = temp_y2;
this.rot_speed_r = random(0,1);
this.x3 = temp_x1 - 20;
this.y3 = temp_y1;
this.x4 = temp_x2 - 70;
this.y4 = temp_y2;
this.rot_speed_l = random(0,1);
this.x5 = temp_x1;
this.y5 = temp_y1 - 20;
this.x6 = temp_x2 - 30;
this.y6 = temp_y2 + 60;
this.rot_speed_b = 1;
this.x7 = temp_x1;
this.y7 = temp_y1 + 45;
this.x8 = temp_x2 - 20;
this.y8 = temp_y2 + 80;
this.rot_speed_bf = 1;		
}
move() {
this.x1 = this.x1 + this.rot_speed_r/random(10,14);
this.y1 = this.y1 + this.rot_speed_r/random(10,14);
this.x2 = this.x2 + this.rot_speed_r/random(3,4);
this.y2 = this.y2 + this.rot_speed_r/random(3,4);
this.x3 = this.x3 - this.rot_speed_l/random(10,14);
this.y3 = this.y3 + this.rot_speed_l/random(10,14);
this.x4 = this.x4 - this.rot_speed_l/random(3,4);
this.y4 = this.y4 + this.rot_speed_l/random(3,4);
this.x5 = this.x5 - this.rot_speed_b/random(20,25);
this.y5 = this.y5 + this.rot_speed_b/random(20,25);
this.x6 = this.x6 - this.rot_speed_b/random(3,4);
this.x7 = this.x6;
this.y7 = this.y6;
this.x8 = this.x8 - this.rot_speed_bf/random(3,4);
if (this.y2 > this.y2_org + 10){
this.rot_speed_r = this.rot_speed_r * -1;
}
else if (this.y2 <= this.y2_org -5){
this.rot_speed_r = this.rot_speed_r * -1;
}
if (this.y4 > this.y2_org + 10){
this.rot_speed_l = this.rot_speed_l * -1;
}
else if (this.y4 <= this.y2_org -5){
this.rot_speed_l = this.rot_speed_l * -1;
}
if (this.x6 > this.x2_org - 30 + 20){
this.rot_speed_b = this.rot_speed_b * -1;
}
else if (this.x6 <= this.x2_org -20 -20){
this.rot_speed_b = this.rot_speed_b * -1;
}
if (this.x8 > this.x2_org - 20 + 10){
this.rot_speed_bf = this.rot_speed_b * -1;
}
else if (this.x8 < this.x2_org -10 -10){
this.rot_speed_bf = this.rot_speed_b* -1;
}
}
show(){
push();
translate(mov_speed/100 + gravity + noise(millis() / 10000.0) * 10,-1*(mov_speed/50 + gravity) + noise(millis() / 10000.0) * 100);
pop();
push();
angleMode(DEGREES);
translate(width/4*gravity/1000, height/4*gravity/100);
pop();
rotate(-1*(mov_speed/40));
noStroke();
for(let i = 0; i < 40; i++){
stroke(255);
fill(255);
triangle(this.x5, this.y5 - 10 + i, this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20);
fill(255);
triangle(this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20, this.x6, this.y6-i);
}
for (let i = 0; i < 20; i++){
stroke(255);
strokeWeight(random (0.2, 0.3));
line(this.x1, this.y1, this.x2 - i/2, this.y2 + i);
line(this.x3, this.y3, this.x4 + i/2, this.y4 + i);
stroke(255)
line(this.x7, this.y7, this.x8 + i/2, this.y8);
strokeWeight(0.1);
stroke(255)
line(this.x5, this.y1+5, this.x6 - i/4, this.y2/100 + this.y8 -55);
}
for(let i = 0; i < 40; i++){
stroke(255, 0, 0, 255/i*10);
fill(255, 0, 0, i*5);
triangle(this.x5, this.y5 - 10 + i, this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20);
fill(255, 0, 0, i);
triangle(this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20, this.x6, this.y6-i);
}
for (let i = 0; i < 20; i++){
stroke(255, 0, 0, 255/i*4);
strokeWeight(random (0.2, 0.3));
line(this.x1, this.y1, this.x2 - i/2, this.y2 + i);
line(this.x3, this.y3, this.x4 + i/2, this.y4 + i);
stroke(255, 0, 0, 50)
line(this.x7, this.y7, this.x8 + i/2, this.y8);
strokeWeight(0.1);
stroke(255,i*100)
line(this.x5, this.y1+5, this.x6 - i/4, this.y2/100 + this.y8 -55);
}
}
}let fish1;
let fish2;
let gravity;
let mov_speed;
let random_pos;
let fish = [2, 3, 4]
function setup() {
createCanvas(600, 400);
gravity = 0;
mov_speed = 0;
fish1 = new Fish(width/2, height/2, width/2 + 30, height/2);
}
function draw() {
mov_speed = mov_speed + 01;
gravity = gravity + random(-0.1, 0.1);
background(255);
fish1.show();
fish1.move();
}
class Fish {
constructor(temp_x1, temp_y1, temp_x2, temp_y2){
this.x2_org = temp_x2;
this.y2_org = temp_y2;
this.x1 = temp_x1 + 20;
this.y1 = temp_y1;
this.x2 = temp_x2 + 10;
this.y2 = temp_y2;
this.rot_speed_r = random(0,1);
this.x3 = temp_x1 - 20;
this.y3 = temp_y1;
this.x4 = temp_x2 - 70;
this.y4 = temp_y2;
this.rot_speed_l = random(0,1);
this.x5 = temp_x1;
this.y5 = temp_y1 - 20;
this.x6 = temp_x2 - 30;
this.y6 = temp_y2 + 60;
this.rot_speed_b = 1;
this.x7 = temp_x1;
this.y7 = temp_y1 + 45;
this.x8 = temp_x2 - 20;
this.y8 = temp_y2 + 80;
this.rot_speed_bf = 1;		
}
move() {
this.x1 = this.x1 + this.rot_speed_r/random(10,14);
this.y1 = this.y1 + this.rot_speed_r/random(10,14);
this.x2 = this.x2 + this.rot_speed_r/random(3,4);
this.y2 = this.y2 + this.rot_speed_r/random(3,4);
this.x3 = this.x3 - this.rot_speed_l/random(10,14);
this.y3 = this.y3 + this.rot_speed_l/random(10,14);
this.x4 = this.x4 - this.rot_speed_l/random(3,4);
this.y4 = this.y4 + this.rot_speed_l/random(3,4);
this.x5 = this.x5 - this.rot_speed_b/random(20,25);
this.y5 = this.y5 + this.rot_speed_b/random(20,25);
this.x6 = this.x6 - this.rot_speed_b/random(3,4);
this.x7 = this.x6;
this.y7 = this.y6;
this.x8 = this.x8 - this.rot_speed_bf/random(3,4);
if (this.y2 > this.y2_org + 10){
this.rot_speed_r = this.rot_speed_r * -1;
}
else if (this.y2 <= this.y2_org -5){
this.rot_speed_r = this.rot_speed_r * -1;
}
if (this.y4 > this.y2_org + 10){
this.rot_speed_l = this.rot_speed_l * -1;
}
else if (this.y4 <= this.y2_org -5){
this.rot_speed_l = this.rot_speed_l * -1;
}
if (this.x6 > this.x2_org - 30 + 20){
this.rot_speed_b = this.rot_speed_b * -1;
}
else if (this.x6 <= this.x2_org -20 -20){
this.rot_speed_b = this.rot_speed_b * -1;
}
if (this.x8 > this.x2_org - 20 + 10){
this.rot_speed_bf = this.rot_speed_b * -1;
}
else if (this.x8 < this.x2_org -10 -10){
this.rot_speed_bf = this.rot_speed_b* -1;
}
}
show(){
push();
translate(mov_speed/100 + gravity + noise(millis() / 10000.0) * 10,-1*(mov_speed/50 + gravity) + noise(millis() / 10000.0) * 100);
pop();
push();
angleMode(DEGREES);
translate(width/4*gravity/1000, height/4*gravity/100);
pop();
rotate(-1*(mov_speed/40));
noStroke();
for(let i = 0; i < 40; i++){
stroke(255);
fill(255);
triangle(this.x5, this.y5 - 10 + i, this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20);
fill(255);
triangle(this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20, this.x6, this.y6-i);
}
for (let i = 0; i < 20; i++){
stroke(255);
strokeWeight(random (0.2, 0.3));
line(this.x1, this.y1, this.x2 - i/2, this.y2 + i);
line(this.x3, this.y3, this.x4 + i/2, this.y4 + i);
stroke(255)
line(this.x7, this.y7, this.x8 + i/2, this.y8);
strokeWeight(0.1);
stroke(255)
line(this.x5, this.y1+5, this.x6 - i/4, this.y2/100 + this.y8 -55);
}
for(let i = 0; i < 40; i++){
stroke(255, 0, 0, 255/i*10);
fill(255, 0, 0, i*5);
triangle(this.x5, this.y5 - 10 + i, this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20);
fill(255, 0, 0, i);
triangle(this.x5 - 20, this.y5 + 20, this.x5 + 20, this.y5 +20, this.x6, this.y6-i);
}
for (let i = 0; i < 20; i++){
stroke(255, 0, 0, 255/i*4);
strokeWeight(random (0.2, 0.3));
line(this.x1, this.y1, this.x2 - i/2, this.y2 + i);
line(this.x3, this.y3, this.x4 + i/2, this.y4 + i);
stroke(255, 0, 0, 50)
line(this.x7, this.y7, this.x8 + i/2, this.y8);
strokeWeight(0.1);
stroke(255,i*100)
line(this.x5, this.y1+5, this.x6 - i/4, this.y2/100 + this.y8 -55);
}
}
let gravity = 0.1;
let bouncer1;
let bouncer2;
function setup() { 
createCanvas(400, 400);
bouncer1 = new Ball ();
} 
function draw(){
background(220);
bouncer1.move();
bouncer1.show();
bouncer1.color_fill();
}
let gravity = 0.1;
let bouncer1;
let bouncer2;
function setup() { 
createCanvas(400, 400);
bouncer1 = new Ball ();
} 
function draw(){
background(220);
bouncer1.move();
bouncer1.show();
bouncer1.color_fill();
}
let counter = 0;
let speed = 0;
let gravity = 0.1;
let x = 200;
let y = 20;
function preload(){
img = loadImage('tumblr_md8rghh2YZ1qmb6d8o1_500.jpg');
}
function setup() { 
createCanvas(1000, 1000);
image(img, 40, 200);
} 
function draw() {
background(255);
fill(0);
for (i == 0; i < 200; i++){
shapes(i + counter, i + 30);
shapes(i*2, i-40);
}
y = y + speed;
speed = speed + gravity;
if (y > height) {
y = height;
speed = -0.95*speed;
}
counter++;
}
function shapes(x, y) {
stroke(random(0, 255), random(20, 200), 300);
line(x, y, x + 200, y - 100);
line(x +300, y*2, x + 200, y - 200);
}
function mesh() {
for (i = 0; i < width; i++){
stroke(234, 100, 24, 80);
line(i + 10, 0, i + 20, height);
}
function setup() {
createCanvas(400, 300);
}
function draw() {
background(0);
fill(255);
text("sensor value: " + inData, 30, 30);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}let x;
let y;
let z;
var pg;
function setup() { 
createCanvas(400, 400);
pg = createGraphics(70, 35);
} 
function draw() { 
let y1 = map(mouseY, 0, height, 45, height-100);
if (x < width && y > height /2 ){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
triangle(x + 20, y, y, x, x/2, x);
triangle(width, 0, height, x, x/2,x);
triangle(width - (x + 20), height - y, height - y, width - x, width - x/2, width - x);
triangle(0, height, 0, width - x, width - x/2,width - x);
x+= 1*y1/100
}
else if (y < height){
x = 0;
y += 10;
}
else{
background(255, 10);
x = -20;
y = 0;
}
pg.stroke(120, 180, 230, 20)
pg.rect(370, 50, 15, 300);
pg.fill(0,100,220,40);
pg.fill(0);
pg.rect(0,y1,15,10);
image(pg, 70, 35)
image(pg, 0, 0, 50, 50)
}let x;
let y;
let z = 1;
let t = 1;
let counter = 0;
function setup() { 
createCanvas(400, 400);
background(0)
} 
function draw() {
counter ++;
if (counter > 10000){
background(0,10);
}
push();
noStroke();
fill(255, 20)
rect(width/2 - 7.5, 50, 15, 300);
fill(mouseY, 200, 230, 10)
rect(width/2 - 7.5, 50, 15, 300);
let y1 = map(mouseY, 0, height, 45, height-100);
noFill();
if (x == width/4 || y == height/4){
console.log("yo");
z = random(10);
t = random(1);
}
if (x <= width && y > height/2){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
fill( 255, 220/ x*(y), 255/ x*(y), 6)
triangle(x + 20, y*z, y, x*z, x/2, x);
triangle(width -x*t, y/z, height, x*t, x/2*t,x/t);
triangle(width - x, height - y*z, height - y, width - x*z, width - x/2, width - x);
triangle(0 + x*t, height-y/z, 0, width - x*t, width - x/2*t,width - x/t);
x+= 1*y1/100
}
else if (x <= width && y <= height){
x += x*t;
y += 100
}
else{
background(255, 10);
x = 10;
y = 0;
}
}var x;
var y;
var z = 1;
var t = 1;
var counter = 0;
function setup() { 
createCanvas(400, 400);
background(0)
} 
function draw() {
counter ++;
if (counter > 10000){
background(0,10);
}
push();
noStroke();
fill(255, 50)
rect(width/2 - 7.5, 50, 15, 300);
fill(mouseY, 200, 230, 20)
rect(width/2 - 7.5, 50, 15, 300);
var y1 = map(mouseY, 0, height, 45, height-100);
noFill();
if (x == width/4 || y == height/4){
console.log("yo");
z = random(10);
t = random(1);
}
if (x <= width && y > height/2){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
fill( 255, 220/ x*(y), 255/ x*(y), 6)
triangle(x + 20, y*z, y, x*z, x/2, x);
triangle(width -x*t, y/z, height, x*t, x/2*t,x/t);
triangle(width - x, height - y*z, height - y, width - x*z, width - x/2, width - x);
triangle(0 + x*t, height-y/z, 0, width - x*t, width - x/2*t,width - x/t);
x+= 1*y1/100
}
else if (x <= width && y <= height){
x += x*t;
y += 100
}
else{
background(255, 10);
x = 10;
y = 0;
}
}let x;
let y;
let z = 1;
let t = 1;
let counter = 0;
function setup() { 
createCanvas(400, 400);
background(255)
} 
function draw() {
counter ++;
if (counter > random(100)){
background(80, 130, 230, random(1))
background(0,10);
}
noStroke();
fill(255, 50)
rect(width/2 - 7.5, 50, 15, 300);
fill(mouseY / 0.7, 25)
rect(width/2 - 7.5, 50, 15, 300);
let y1 = map(mouseY, 0, height, 45, height-100);
noFill();
if (x == width/4 || y == height/4){
console.log("yo");
z = random(10);
t = random(1);
}
if (x <= width && y > height/2){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30/2)
fill( 255, 220/ x*(y), 255/ x*(y), 6)
triangle(x + 20, y*z, y, x*z, x/2, x);
triangle(width -x*t, y/z, height, x*t, x/2*t,x/t);
triangle(width - x, height - y*z, height - y, width - x*z, width - x/2, width - x);
triangle(0 + x*t, height-y/z, 0, width - x*t, width - x/2*t,width - x/t);
x+= 1*y1/100
}
else if (x <= width && y <= height){
x += x*t;
y += 100
}
else{
background(255, 10);
x = 10;
y = 0;
}
}var x;
var y;
var z;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
stroke(120, 180, 230, 20)
rect(370, 50, 15, 300);
var y1 = map(mouseY, 0, height, 45, height-100);
fill(0,100,220,40);
rect(370,y1,15,10);
if (x < width && y > height /2 ){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
triangle(x + 20, y, y, x, x/2, x);
triangle(width, 0, height, x, x/2,x);
triangle(width - (x + 20), height - y, height - y, width - x, width - x/2, width - x);
triangle(0, height, 0, width - x, width - x/2,width - x);
x+= 1*y1/100
}
else if (y < height){
x = 0;
y += 10;
}
else{
background(255, 10);
x = -20;
y = 0;
}
}var x;
var y;
var z = 1;
var t = 1;
var counter = 0;
function setup() {
createCanvas(400, 400);
background(255)
} 
function draw() {
counter ++;
if (counter > 100){
/background(80, 130, 230, random(1))
background(0,10);
counter = 0;
}
push();
noStroke();
fill(255, 50)
rect(width/2 - 7.5, 50, 15, 300);
rect(width/2 - 7.5, 50, 15, 300);
fill(mouseY / 0.7, 25)
rect(width/2 - 7.5, 50, 15, 300);
var y1 = map(mouseY, 0, height, 45, height-100);
noFill();
if (x == width/4 || y == height/4){
console.log("yo");
z = random(10);
t = random(1);
}
if (x <= width && y > height/2){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
fill( 255, 220/ x*(y), 255/ x*(y), 6)
triangle(x + 20, y*z, y, x*z, x/2, x);
triangle(width -x*t, y/z, height, x*t, x/2*t,x/t);
triangle(width - x, height - y*z, height - y, width - x*z, width - x/2, width - x);
triangle(0 + x*t, height-y/z, 0, width - x*t, width - x/2*t,width - x/t);
x+= 1*y1/100
}
else if (x <= width && y <= height){
x += x*t;
y += 100
}
else{
background(255, 10);
x = 10;
y = 0;
}
}let x;
let y;
let z = 1;
let t = 1;
let counter = 0;
function setup() { 
createCanvas(400, 400);
background(0)
} 
function draw() {
counter ++;
if (counter > 10000){
background(0,10);
}
push();
noStroke();
fill(255, 20)
rect(width/2 - 7.5, 50, 15, 300);
fill(mouseY, 200, 230, 10)
rect(width/2 - 7.5, 50, 15, 300);
let y1 = map(mouseY, 0, height, 45, height-100);
noFill();
if (x == width/4 || y == height/4){
console.log("yo");
z = random(10);
t = random(1);
}
if (x <= width && y > height/2){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
fill( 255, 220/ x*(y), 255/ x*(y), 6)
triangle(x + 20, y*z, y, x*z, x/2, x);
triangle(width -x*t, y/z, height, x*t, x/2*t,x/t);
triangle(width - x, height - y*z, height - y, width - x*z, width - x/2, width - x);
triangle(0 + x*t, height-y/z, 0, width - x*t, width - x/2*t,width - x/t);
x+= 1*y1/100
}
else if (x <= width && y <= height){
x += x*t;
y += 100
}
else{
background(255, 10);
x = 10;
y = 0;
}
}var x;
var y;
var z = 1;
var t = 1;
var counter = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() {
counter ++;
if (counter > 2*t){
background(80, 130, 230, random(1))
}
push();
noStroke();
fill(255, 100)
fill(mouseY / 0.7, 25)
var y1 = map(mouseY, 0, height, 45, height-100);
noFill();
if (x == width/4 || y == height/4){
console.log("yo");
z = random(1);
t = random(1);
}
if (x <= width && y > height/2){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
triangle(x + 20, y*z, y, x*z, x/2, x);
triangle(width -x*t, y/z, height, x*t, x/2*t,x/t);
triangle(width - x, height - y*z, height - y, width - x*z, width - x/2, width - x);
triangle(0 + x*t, height-y/z, 0, width - x*t, width - x/2*t,width - x/t);
x+= 1*y1/100
}
else if (x <= width && y <= height){
x += x*t;
y += 100
}
else{
background(255, 10);
x = 0;
y = 0;
}
}var x;
var y;
var z = 1;
var t = 1;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
push();
noStroke();
fill(255, 100)
fill(mouseY / 0.7, 25)
var y1 = map(mouseY, 0, height, 45, height-100);
noFill();
stroke(255)
if (x == width/4 || y == height/4){
console.log("yo");
z = random(1);
t = random(1);
}
if (x <= width && y > height/2){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
triangle(x + 20, y*z, y, x*z, x/2, x);
triangle(width -x*t, y/z, height, x*t, x/2*t,x/t);
triangle(width - x, height - y*z, height - y, width - x*z, width - x/2, width - x);
triangle(0 + x*t, height-y/z, 0, width - x*t, width - x/2*t,width - x/t);
x+= 1*y1/100
}
else if (x <= width && y <= height){
x += 0;
y += 20
}
else{
background(255, 10);
x = 0;
y = 0;
}
}var x;
var y;
var z = 1;
var t = 1;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
push();
noStroke();
fill(255, 100)
fill(mouseY / 0.7, 25)
var y1 = map(mouseY, 0, height, 45, height-100);
noFill();
stroke(255)
if (x == width/4 || y == height/4){
console.log("yo");
z = random(1);
t = random(1);
}
if (x <= width && y > height/2){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
triangle(x + 20, y*z, y, x*z, x/2, x);
triangle(width -x*t, y/z, height, x*t, x/2*t,x/t);
triangle(width - x, height - y*z, height - y, width - x*z, width - x/2, width - x);
triangle(0 + x*t, height-y/z, 0, width - x*t, width - x/2*t,width - x/t);
x+= 1*y1/100
}
else if (x <= width && y <= height){
x += 0;
y += 20
}
else{
background(255, 10);
x = 0;
y = 0;
}
}var x;
var y;
var z = 1;
var t = 1;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
push();
noStroke();
fill(255, 100)
fill(mouseY / 0.7, 25)
var y1 = map(mouseY, 0, height, 45, height-100);
noFill();
stroke(255)
if (x == width/4 || y == height/4){
console.log("yo");
z = random(1);
t = random(1);
}
if (x <= width && y > height/2){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
triangle(x + 20, y*z, y, x*z, x/2, x);
triangle(width -x*t, y/z, height, x*t, x/2*t,x/t);
triangle(width - x, height - y*z, height - y, width - x*z, width - x/2, width - x);
triangle(0 + x*t, height-y/z, 0, width - x*t, width - x/2*t,width - x/t);
x+= 1*y1/100
}
else if (x <= width && y <= height){
x += 0;
y += 20
}
else{
background(255, 10);
x = 0;
y = 0;
}
}var x;
var y;
var z;
var fac;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
noStroke();
fill( 10)
fill(mouseY / 0.7, 25)
var y1 = map(mouseY, 0, height, 45, height-50);
var x1 = map(mouseX, 0, width, 45, width-50);
fill(255, 20);
noFill();
if (random(1) > 0.5){
}
else{
}
if (x < width && y < height ){
var fac = random(0,10);
stroke(120, 180, 230, 30)
fill( 255, 220, 200/ x*(y), 20)
if (y > random(350)){
z = 100;
noFill();
}
else if (x > width ){
fill(255,20);
background(255, 20)
x = 0;
}
else if (x > height){
fill(255,20);
background(255, 20)
y = 0;
}
triangle(x + 20, y1, y1, x, x/2, x);
triangle(width, 0, height, x1, x1/2,x1);
triangle(width - (x + 20/z), height - y1, height - y1, width - x, width - x/2, width - x);
triangle(0, height, 0, width - x, width - x1/2,width - x1);
x+= 1
}
else if (y < height){
x = +10;
y += 10;
}
else{
background(255, 10);
x = 0;
y = 0;
z = 0;
}
}var x;
var y;
var z;
var fac;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
noStroke();
fill( 10)
fill(mouseY / 0.7, 25)
var y1 = map(mouseY, 0, height, 45, height-100);
var x1 = map(mouseX, width, 50, width-100);
if (x < width && y < height ){
stroke(120, 180, 230, 30)
fill( 255, 220, 200/ x*(y), 20)
triangle(x + 20, y1, y1, x, x/2, x);
triangle(width, 0, height, x1, x1/2,x1);
triangle(width - (x + 20/z), height - y1, height - y1, width - x, width - x/2, width - x);
triangle(0, height, 0, width - x, width - x1/2,width - x1);
x+= 1
y+= 1
}
else if (x > width){
fill(255,20);
background(255, 20)
x = 0;
}
else if (y > height){
fill(255,20);
background(255, 20)
y = 0;
}
}var x;
var y;
var z;
var fac;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
noStroke();
fill( 10)
fill(mouseY / 0.7, 25)
var y1 = map(mouseY, 0, height, 45, height-100);
var x1 = map(mouseX, width, 50, width-100);
noFill();
if (random(1) > 0.5){
}
else{
}
if (x < width && y < height ){
var fac = random(0,10);
stroke(120, 180, 230, 30)
fill( 255, 220, 200/ x*(y), 20)
if (y > random(350)){
z = 100;
noFill();
}
else if (x > width ){
fill(255,20);
background(255, 20)
x = 0;
}
else if (x > height){
fill(255,20);
background(255, 20)
y = 0;
}
triangle(x + 20, y1, y1, x, x/2, x);
triangle(width, 0, height, x1, x1/2,x1);
triangle(width - (x + 20/z), height - y1, height - y1, width - x, width - x/2, width - x);
triangle(0, height, 0, width - x, width - x1/2,width - x1);
x+= 1
}
else if (y < height){
x = +10;
y += 10;
}
else{
background(255, 10);
x = 0;
y = 0;
z = 0;
}
}var x;
var y;
var z;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
push();
noStroke();
fill(255, 100)
rect(width/2 - 7.5, 50, 15, 300);
fill(mouseY / 0.7, 25)
rect(width/2 - 7.5, 50, 15, 300);
var y1 = map(mouseY, 0, height, 45, height-100);
noFill();
stroke(255)
pop();
if (random(1) > 0.){
if (x < width && y > height /2 ){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
triangle(x + 20, y, y, x, x/2, x);
triangle(width, 0, height, x, x/2,x);
triangle(width - (x + 20), height - y, height - y, width - x, width - x/2, width - x);
triangle(0, height, 0, width - x, width - x/2,width - x);
x+= 1*y1/100
}
else if (y < height){
x = 0;
y += 10;
}
else{
background(255, 10);
x = -20;
y = 0;
}
}
}var x;
var y;
var z;
function setup() { 
background(255);
createCanvas(500, 501);
} 
function draw() { 
if (random(1) > 0.3){
if (x < width && y > height /2 ){
stroke(120, 180, 230, 30)
fill( 255, 255/x+30)
triangle(x + 20, y, y, x, x/2, x);
triangle(width, 0, height, x, x/2,x);
triangle(width - (x + 20), height - y, height - y, width - x, width - x/2, width - x);
triangle(0, height, 0, width - x, width - x/2,width - x);
x+= 1;
}
else if (y < height){
x = 0;
y += 10;
}
else{
background(255, 10);
x = -20;
y = 0;
}
}
}var x;
var y;
var z;
function setup() { 
createCanvas(500, 501);
} 
function draw() { 
if (random(1) > 0.1){
if (x < width && y > height / 2){
stroke(100, 180, 230, 30)
fill( 255, 255/x+30)
triangle(x + 20, y, y, x, x/2, x);
triangle(width, 0, height, x, x/2,x);
triangle(width - (x + 20), height - y, height - y, width - x, width - x/2, width - x);
triangle(0, height, 0, width - x, width - x/2,width - x);
x+= 1;
}
else if (y < height){
x = 0;
y += 20;
}
else{
background(255, 10);
x = -20;
y = 0;
}
}
}var x;
var y;
var z;
function setup() { 
createCanvas(500, 501);
} 
function draw() { 
if (random(1) > 0.1){
if (x < width && y > height / 2){
stroke(200 / mouseX*10, 230 / mouseY*10, 255, 30)
fill( 255, 255/x+30)
triangle(x + 20, y, y, x, x/2, x);
triangle(width, 0, height, x, x/2,x);
triangle(width - (x + 20), height - y, height - y, width - x, width - x/2, width - x);
triangle(0, height, 0, width - x, width - x/2,width - x);
x+= 1;
}
else if (y < height){
x = 0;
y += 20;
}
else{
background(255, 10);
x = -20;
y = 0;
}
}
}var x;
var y;
var z;
function setup() { 
createCanvas(400, 401);
} 
function draw() { 
if (random(1) > 0.1){
if (x < width - 20 && y > height / 2){
stroke(255, 35)
fill( 200, 255/x+30)
triangle(x + 20, y, y, x, x/2, x);
triangle(width, 0, height, x, x/2,x);
triangle(width - (x + 20), height - y, height - y, width - x, width - x/2, width - x);
triangle(0, height, 0, width - x, width - x/2,width - x);
x+= 2;
}
else if (y < height){
x = 0;
y += 20;
}
else{
background(100);
x = -20;
y = 0;
}
}
}var x;
var y;
var z;
function setup() { 
createCanvas(400, 401);
} 
function draw() { 
if (random(1) > 0.1){
if (x < width - 20 && y > height / 2){
stroke(255, 35)
fill( 200)
triangle(x + 20, y, y, x, x/2, x);
triangle(width, 0, height, x, x/2,x);
triangle(width - (x + 20), height - y, height - y, width - x, width - x/2, width - x);
triangle(0, height, 0, width - x, width - x/2,width - x);
x+= 2;
}
else if (y < height){
x = 0;
y += 20;
}
else{
background(255);
x = -20;
y = 0;
}
}
}var x;
var y;
var z;
function setup() { 
createCanvas(400, 401);
} 
function draw() { 
if (random(1) > 0.1){
if (x < width - 20 && y > height / 20){
stroke(255 + x);
fill( 255, 220, 200/ x*(y))
triangle(x + 20, y, y, x, x/2, x);
triangle(width/x*y, x, height, x, x/2,x);
triangle(width/2*y, y/2*30, y, x, height/2,x);
x+= 2;
}
else if (y < height){
x =  0;
y += 20;
}
else{
background(225, 20);
x = -20;
y = 0;
}
}
}var x;
var y;
var z;
function setup() { 
createCanvas(400, 401);
} 
function draw() { 
if (random(1) > 0.1){
if (x < width && y > height / 20){
stroke(255 + x);
fill( 255, 220, 200/ x*(y))
triangle(x + 20, y, y, x, x/2, x);
triangle(width/x*y, x, height, x, x/2,x);
x+= 2;
}
else if (y < height){
x =  0;
y += 20;
}
else{
background(235);
x = -20;
y = 0;
}
}
}var x;
var y;
var z;
function setup() { 
createCanvas(400, 401);
} 
function draw() { 
if (random(1) > 0.1){
if (x < width - 20 && y > height / 2){
stroke(255)
fill( 255, 220, 200/ x*(y))
triangle(x + 20, y, y, x, x/2, x);
triangle(width, 0, height, x, x/2,x);
x+= 2;
}
else if (y < height){
x = 0;
y += 20;
}
else{
background(255);
x = -20;
y = 0;
}
}
}var x;
var y;
var z;
function setup() { 
createCanvas(400, 401);
} 
function draw() { 
if (random(1) > 0.1){
if (x < width - 20 && y > height / 2){
stroke(255)
fill( 255, 220, 200/ x*(y))
triangle(x + 20, y, 0, x, x/2, x);
x+= 2;
}
else if (y < height){
x = 0;
y += 20;
}
else{
background(255);
x = -20;
y = 0;
}
}
}var x;
var y;
var z;
function setup() { 
createCanvas(400, 401);
} 
function draw() { 
if (random(1) > 0.1){
if (x < width - 20 && y > height / 2){
stroke(220/y*x)
fill( 180/ x*(y))
triangle(x + 20, y, 0, x, x/2, x);
x+= 2;
}
else if (y < height){
x = 0;
y += 20;
}
else{
background(255);
x = -20;
y = 0;
}
}
}var x;
var y;
function setup() { 
createCanvas(400, 401);
} 
function draw() { 
if (random(1) > 0.5){
if (x < width && y > height / 2){
fill(180 / x*y)
triangle(x + 20, y, 20, x*20, x/2, x);
x+= 20;
}
else if (y < height - 20){
x = -20;
y += 20;
}
else{
background(255);
x = -20;
y = 0;
}
}
}var set;
var rythm  = 0;
function setup() { 
createCanvas(400, 400);
background(255)
} 
function draw() {
rythm ++;
var rand = random(1);
if (rythm > 20){
set++;
if (set > 20){
background(200);
set = 0;
}
for (var z = 0; z < 200; z++){
stroke(220)
strokeWeight(0.5)
noFill();
ellipse(20 + z*20, 20 + z*10, 30 + z*z);
rythm = 0;
}
}
else{
fill(200);
arc(z+40, z* - 100, z*50, z*50, PI+QUARTER_PI, TWO_PI);
}
}function setup() { 
createCanvas(500, 500);
} 
function draw() {
var rand = random(0, 1);
background(255);
for (var i = 0; i < mouseY*20/100; i++){
stroke(120)
strokeWeight(1);
line(500 / i, 20*i, 200, 500 / i);
line(500i, 20*i, 200, 500 / i);
noStroke();
fill(120*i/10, 130/i, 46/i, 255/i);
noFill();
stroke(0);
arc(i, mouseY + i*20 - 100, i*50, i*50, PI+QUARTER_PI, TWO_PI);
strokeWeight(4)
stroke(220, 220);
arc(i+40, mouseY + i*20 - 100, i*50, i*50, PI+QUARTER_PI, TWO_PI);
}
}let y = 0;
let speed = 0.2;
let gravity = 2;
let bouncing = true;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
ellipse(200, y, 20, 20);
if (bouncing){
y = y + speed
speed = speed + gravity;
}
if (y > 400) {
speed = -0.9 * speed
}
}
function mousePressed(){
let r  = random(255);
background(r, 0, 34)
var rand_val = [];
var count;
var num = 800;
var range = 100;
function setup() {
createCanvas(windowWidth, windowHeight)
noCursor();
}
function draw() {
background(230, 50);
strokeWeight(10);
stroke(255, random(0, 10));
fill(random(250), 230, 180, random(0, 40))
ellipse(mouseX, mouseY, random(20, 100), random(20, 100))
strokeWeight(10);
stroke(255, random(0, 10));
fill(random(280), 230, 180, random(0, 40))
ellipse(mouseX + 10, mouseY + 10, random(20, 100), random(20, 100))
var x1 = mouseX + 10;
var y1 = mouseY + 10;
rand_val.push(x1);
rand_val.push(y1);
f = rand_val;
for (var c = 0; c < f.length; c++) {
noStroke();
fill(255 / c * 10, 1 / c)
noStroke();
ellipse(f[c] - mouseX, f[c + 1] - mouseX, 1, 1);
}
for (var j = 1; j < num; j++) {
fill(random(200), random(200), random(200), 2)
var val = j / num * random(204.0 + 51);
stroke(random(val) * random(300), random(30));
strokeWeight(random(1), random(8))
bezier(random(mouseX), random(mouseY), random(width/2), random(mouseY), random(mouseX), random(width/2), random(mouseX), random(mouseY))
}
s = "The quick brown fox jumped over the lazy dog.";
fill(230, 50);
text(s, windowWidth/2, windowHeight/2, 70, 80);
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
var rand_val = [];
var count;
var fixed_color;
var num = 100;
var range = 1000;
function setup() {
createCanvas(windowWidth, windowHeight);
background(random(200), 80);
noCursor();
fixed_color = random(200, 245)
}
function draw() {
fill(120);
ellipse (1240, 200, 5, 5);
ellipse (1250, 180, 5, 5);
ellipse (1250, 190, 5, 5);
ellipse (1270, 190, 5, 5);
ellipse (1270, 200, 5, 5);
ellipse (1280, 200, 5, 5);
ellipse (1290, 190, 5, 5);
ellipse (1290, 180, 5, 5);
fill(253);
triangle(150, 120, 420, 60, 310, 300);
fill(250);
triangle(150, 120, 420, 60, 89, 30);
fill(204);
triangle(150, 120, 320, 100, 310, 300);
fill(200);
triangle(150, 120, 320, 100, 89, 30);
fill(253);
triangle(550, 520, 820, 460, 710, 700);
fill(250);
triangle(550, 520, 820, 460, 489, 430);
fill(204);
triangle(550, 520, 720, 500, 710, 700);
fill(210);
triangle(550, 320, 720, 500, 489, 430);
background(255, 170, 170, 1);
stroke(240, 40);
for (c = 0; c < windowWidth / 100; c ++){
for (i = 0; i < windowWidth; i++){
line(85 + 2*i, 700 + random(2 *c), 85 * c, 75/c);
}
}
fill(fixed_color, 10);
rect(windowWidth/2, windowHeight/2 + 20, windowWidth/2 + 20, windowHeight/2 + 40)
strokeWeight(10);
stroke(255, random(0, 10));
fill(random(2), 230, 180, random(0, 40))
ellipse(mouseX, mouseY, random(20, 100), random(20, 100))
strokeWeight(10);
stroke(255, random(0, 10));
fill(random(280), 230, 180, random(0, 40))
ellipse(mouseX + 10, mouseY + 10, random(20, 100), random(20, 100))
var x1 = mouseX + 10;
var y1 = mouseY + 10;
rand_val.push(x1);
rand_val.push(y1);
f = rand_val;
for (var c = 0; c < f.length; c++) {
noStroke();
fill(255 / c * 10, 1 / c)
noStroke();
ellipse(f[c] - mouseX, f[c + 1] - mouseX, 1, 1);
fill(255, 80)
strokeWeight(1)
stroke(255, 50)
line(f[c], f[c + 1], mouseX, mouseY);
ellipse(random(f[c]), random(f[c + 1]), 1, 1);
stroke(215, random(60, 70))
line(f[c] + 5, f[c + 1] + 5, mouseX, mouseY);
stroke(255, random(20, 40))
strokeWeight(random(0, 2));
noFill();
bezier(f[c], f[(c - 2)], f[(c - 3)], f[(c - 4)], f[c - 5], f[c - 6], f[c - 7], f[c - 8]);
}
for (var j = 1; j < num; j++) {
fill(random(200), random(200), random(200), 2)
var val = j / num * random(204.0 + 51);
stroke(random(val) * random(300), random(30));
strokeWeight(random(1), random(8))
bezier(random(mouseX), random(mouseY), random(410), random(mouseY), random(mouseX), random(300), random(mouseX / random(100)), random(mouseY / random(100)))
bezier(mouseX,mouseY, 40 / j + j / 20, 30 / j + j / 20, random(100), random(800, j), 400 + j / 20, 100 + j / 20, 800 + j / 20, 300 + j / 20)
bezier(mouseX + 10, mouseY + 10, 40 / j + j / 20, 30 / j + j / 20, 100, 800, 400 + j / 20, 100 + j / 20, 800 + j / 20, 300 + j / 20)
bezier(mouseX -  10, mouseY - 10, 40 / j + j / 20, 30 / j + j / 20, -100, -800, 400 + j / 20, 100 + j / 20, 800 + j / 20, 300 + j / 20)
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
}function setup() {
createCanvas(1400, 20200);
background(255, 170, 170);
noStroke();
fill(240)
rect(1200, 0, 130, 20200)
fill(120);
ellipse (1240, 200, 5, 5);
ellipse (1250, 180, 5, 5);
ellipse (1250, 190, 5, 5);
ellipse (1270, 190, 5, 5);
ellipse (1270, 200, 5, 5);
ellipse (1280, 200, 5, 5);
ellipse (1290, 190, 5, 5);
ellipse (1290, 180, 5, 5);
fill(253);
triangle(150, 120, 420, 60, 310, 300);
fill(250);
triangle(150, 120, 420, 60, 89, 30);
fill(204);
triangle(150, 120, 320, 100, 310, 300);
fill(200);
triangle(150, 120, 320, 100, 89, 30);
fill(253);
triangle(550, 520, 820, 460, 710, 700);
fill(250);
triangle(550, 520, 820, 460, 489, 430);
fill(204);
triangle(550, 520, 720, 500, 710, 700);
fill(210);
triangle(550, 320, 720, 500, 489, 430);
noFill();
stroke(230);
line(100, 100, 100, 380);
ellipse(100, 95, 5, 5);
line(120, 400, 480, 400);
ellipse(485, 400, 5, 5);
stroke(230);
curve(120, 250,  101, 380, 120, 401, 120, 400);
fill(255);
ellipse (110, 410, 5, 5);
ellipse (110, 420, 5, 5);
ellipse (120, 420, 5,5);
ellipse (130, 420, 5,5);
ellipse (150, 410, 5,5);
ellipse (180, 410, 5,5);
ellipse (180, 420, 5,5);
ellipse (190, 420, 5,5);
ellipse (180, 430, 5,5);
fill(255, 96);
fill(191, 255, 249, 98)
noStroke();
rect(580, 515, 10, 9700);
rect(590, 514, 10, 300);
rect(600, 513, 10, 100);
stroke(220, 80);
fill(253);
triangle(450, 10120, 720, 10060, 610, 10300);
fill(250);
triangle(450, 10120, 720, 10060, 389, 10030);
fill(204);
triangle(450, 10120, 620, 10100, 510, 10280);
fill(200);
triangle(450, 10120, 620, 10100, 389, 10030);
fill(191, 255, 249, 98)
noStroke();
quad(580, 10048, 590, 10048, 575, 10085, 560, 10081);
fill(191, 255, 249, 98)
triangle(520, 10079, 520, 10070, 550, 10079);
rect(520, 10079, 10, 9700);
rect(530, 10079, 10, 300);
rect(540, 10079, 10, 200);
stroke(230);
noFill();
line(140, 10000, 540, 10000); 
ellipse(545, 10000, 5, 5);
curve(140, 10160,  120, 10020, 140, 10000, 140, 10000);
line(120, 10020, 120, 10160);
curve(120, 10200,  120, 10160, 140, 10180, 280, 10150);
line(140, 10180, 430, 10180);
ellipse(435, 10180, 5, 5);
fill(255);
ellipse (140, 10190, 5, 5);
ellipse (150, 10190, 5, 5);
ellipse (160, 10190, 5, 5);
ellipse (180, 10200, 5, 5);
ellipse (190, 10200, 5, 5);
ellipse (180, 10210, 5, 5);
ellipse (200, 10200, 5, 5);
ellipse (220, 10190, 5, 5);
stroke(220, 80);
fill(204);
triangle(650, 19820, 270, 19860, 489, 19630);
fill(220);
triangle(650, 19820, 620, 19620, 489, 19630);
fill(146, 252, 242, 150)
ellipse(382, 19900, 200, 80);
fill(191, 255, 249, 98)
ellipse(382, 19900, 120, 40);
fill(250)
triangle(550, 19924, 220, 19860, 489, 19630);
noStroke();
fill(146, 252, 242, 98)
quad(380, 19890, 424, 19900, 390, 19716, 370, 19732)
fill(240, 96)
arc(390, 19900, 70, 24, 0, PI+QUARTER_PI, CHORD);
stroke(230);
noFill(0);
line(390,19980, 390, 20000)
line(400, 20010, 800, 20010); 
ellipse(390, 19975, 5, 5);
curve(400, 19950, 390, 19980, 400, 20010, 470, 19950 )
fill(255);
ellipse (792, 20020, 5, 5);
}function setup() {
background(230, 230, 230)
createCanvas(1000, 20000)
background(230, 200, 230)
noStroke();
fill(120)
ellipse (740, 200, 5, 5)
ellipse (750, 180, 5, 5)
ellipse (750, 190, 5, 5)
ellipse (770, 190, 5, 5)
ellipse (770, 200, 5, 5)
ellipse (780, 200, 5, 5)
ellipse (800, 190, 5, 5)
ellipse (800, 180, 5, 5)
fill(253)
triangle(150, 120, 420, 60, 310, 300);
fill(250)
triangle(150, 120, 420, 60, 89, 30);
fill(204)
triangle(150, 120, 320, 100, 310, 300);
fill(200)
triangle(150, 120, 320, 100, 89, 30);
fill(253)
triangle(550, 520, 820, 460, 710, 700);
fill(250)
triangle(550, 520, 820, 460, 489, 430);
fill(204)
triangle(550, 520, 720, 500, 710, 700);
fill(210)
triangle(550, 320, 720, 500, 489, 430);
stroke(230)
line(100, 100, 100, 400)
ellipse(100, 100, 5, 5)
line(100, 400, 480, 400) 
ellipse(480, 400, 5, 5)
fill(255)
ellipse (110, 410, 5, 5)
ellipse (110, 420, 5, 5)
ellipse (120, 420, 5,5)
ellipse (130, 420, 5,5)
ellipse (150, 410, 5,5)
ellipse (180, 410, 5,5)
ellipse (180, 420, 5,5)
ellipse (190, 420, 5,5)
ellipse (180, 430, 5,5)
fill(255, 96)
noStroke();
rect(580, 515, 10, 9700)
rect(590, 514, 10, 300)
rect(600, 513, 10, 100)
stroke(220, 80)
fill(253)
triangle(450, 10120, 720, 10060, 610, 10300);
fill(250)
triangle(450, 10120, 720, 10060, 389, 10030);
fill(204)
triangle(450, 10120, 620, 10100, 510, 10280);
fill(200)
triangle(450, 10120, 620, 10100, 389, 10030);
fill(230, 93)
noStroke();
quad(580, 10048, 590, 10048, 575, 10085, 560, 10081)
triangle(520, 10079, 520, 10070, 550, 10079)
rect(520, 10079, 10, 9700)
rect(530, 10079, 10, 300)
rect(540, 10079, 10, 200)
stroke(230)
line(130, 10000, 540, 10000) 
ellipse(540, 10000, 5, 5)
line(130, 10000, 130, 10180)
line(130, 10180, 430, 10180)
ellipse(430, 10180, 5, 5)
fill(255)
ellipse (140, 10190, 5, 5)
ellipse (150, 10190, 5, 5)
ellipse (160, 10190, 5, 5)
ellipse (180, 10200, 5, 5)
ellipse (190, 10200, 5, 5)
ellipse (180, 10210, 5, 5)
ellipse (200, 10200, 5, 5)
ellipse (220, 10190, 5, 5)
stroke(230)
noFill(0);
line(130, 19800, 525, 19800) 
ellipse(525, 19800, 5, 5)
fill(255)
ellipse (136, 19810, 5, 5)
}function setup() {
background(230, 230, 230)
createCanvas(1000, 700)
background(230, 200, 230)
noStroke();
fill(253)
triangle(150, 120, 420, 60, 310, 300);
fill(250)
triangle(150, 120, 420, 60, 89, 30);
fill(204)
triangle(150, 120, 320, 100, 310, 300);
fill(200)
triangle(150, 120, 320, 100, 89, 30);
fill(253)
triangle(550, 520, 820, 460, 710, 700);
fill(250)
triangle(550, 520, 820, 460, 489, 430);
fill(204)
triangle(550, 520, 720, 500, 710, 700);
fill(210)
triangle(550, 320, 720, 500, 489, 430);
stroke(230)
line(130, 80, 120, 400)
ellipse(130, 80, 5, 5)
line(120, 400, 520, 400) 
ellipse(520, 400, 5, 5)
}function setup() {
createCanvas(windowWidth, windowHeight);
}
function draw() {
background(255)
var output = document.getElementById("ti2");
var input = document.getElementById("ti1").value;
var str_binary = [];
var binary = [];
var line_counter = 0;
output.value = "";
for (var i = 0; i < input.length; i++) {
output.value += input[i].charCodeAt(0).toString(2) + " ";
if (input[i].charCodeAt(0) < 128) {
output.value = '0' + input[i].charCodeAt(0).toString(2) + " ";
}
str_binary[i] = output.value
for (var j = 0; j < str_binary[i].length; j++) {
binary = str_binary[i];
var u = (i+i*170 + j*20);
if (u + 50 < windowWidth){
line_counter = i;
if (binary[j] === '0') { 
fill(0);
rect(u + 10, 40, 20, 20);
fill(255)
rect( u + 10, 40, 20, 20); 
fill(100);
rect(u + 10, 40, 20, 20);
textSize(20);
text("0", u + 15, 30);
}
else if (binary[j] ==='1'){
fill(0)
rect( u + 10, 40, 20, 20);
fill(255)
rect(u + 10, 40, 20, 20);
fill(100);
textSize(20);
text("1", u + 15, 30);
}
}
else if (u + 50 > windowWidth){
u = u - (line_counter + line_counter*170);
l_o = i / line_counter;   
l = 2;
if (Number.isInteger(l_o)){
l = l_o;
}
if (binary[j] === '0') { 
fill(0);
rect(u + 10, l*40, 20, 20);
fill(255)
rect( u + 10, l*40, 20, 20); 
fill(100);
rect(u + 10, l*40, 20, 20);
textSize(20);
text("0", u + 15, l*30);
}
else if (binary[j] ==='1'){
fill(0)
rect( u + 10, l*40, 20, 20);
fill(255)
rect(u + 10, l*40, 20, 20);
fill(100);
textSize(20);
text("1", u + 15, l*30);
}
}
}
}
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}