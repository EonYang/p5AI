function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let centerData;

// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');
let detaineeMap;
let canvas;
let centerLatlng;

let ppl = 10;

let data = [];

// All our map options in a single object
const options = {
  lat: 40.731156,
  lng: -90,
  zoom: 4,
  // style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  
   style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"


  // style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}


function preload() {
  //centerData = loadTable('ERO_list_32.csv', 'csv', 'header');
  // centerLatlng = loadTable('ERO_32_latlng1.csv', 'csv', 'header');
  //centerLatlng = loadTable('ERO_32_latlng2.csv', 'csv', 'header');
  centerLatlng = loadTable('ERO_32_latlng3.csv', 'csv', 'header');

}

function setup() {
  canvas = createCanvas(800, 600);
  createElement('h1', '42,000 DETAINED PEOPLE')
  
  // Create a tile map with lat 0, lng 0, zoom 4
  detaineeMap = mappa.tileMap(options);
  detaineeMap.overlay(canvas);

  let maxDets = 0;
  let minDets = Infinity;

  //Dan's EXAMPLE
  //for (let row of subscriberData.rows) {
  // let country = row.get('country_id').toLowerCase();
  // let latlon = countries[country];
  //if(latlon) {
  // let lat = latlon[0];
  // let lon = latlon[1];

  //DELETED
  // const pixCoord = trainMap.latLngtoPixel(lat, lon);
  //let detCount = row.get('FY18 APP');
  //data.push({
  //lat,
  //lon,
  //detCount
  //})

  //if (detCount > maxDets) {
  //   maxDets = detCount;
  // }

  //if (detCount > minDets) {
  //   minDets = detCount;
  // }

  //DELETED
  //let diameter = sqrt(subCount) * trainMap.zoom();
  //fill(255, 0, 200, 100);
  // ellipse(pix.x, pix.y, diameter, diameter);
  //}
  //}

  // Only redraw the centers when the map change and not every frame.
  detaineeMap.onChange(drawDCenters);

  //fill(70, 203, 31);
  //stroke(100);
}

function draw() {
  //drawCenters();

  for (let i = 1; i < centerLatlng.getRowCount(); i++) {
    // Get the lat/lng of each center 
    const latitude = Number(centerLatlng.getString(i, 'LATITUDE'));
    const longitude = Number(centerLatlng.getString(i, 'LONGITUDE'));


    // Only draw them if the position is inside the current map bounds. We use a
    // Leaflet method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (detaineeMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      // Transform lat/lng to pixel position
      const pos = detaineeMap.latLngToPixel(latitude, longitude);



    }
  }

  //   clear();

  //   for (let row of centerData.rows) {
  //     console.log(row.get('CITY'));
  //     //   console.log(row.get('NAME'));
  //     //   console.log(row.get('CITY'));
  //     //   console.log(row.get('STATE'));
  //     //   console.log(row.get('FY18 ADP'));

  //   }
  //   for (let row of centerLatlng.rows) {
  //     let lat = row.get('LATITUDE');



  //   }



  // Every Frame, get the canvas position 
  // for the latitude and longitude of Adelanto,CA
  //34.5828° N, 117.4092° W
  // const adelanto = detaineeMap.latLngToPixel(34.5828, -117.4092);
  // Using that position, draw an ellipse
  // ellipse(adelanto.x, adelanto.y, 20, 20);
}

function drawDCenters() {
  // Clear the canvas
  clear();

  for (let i = 1; i < centerLatlng.getRowCount(); i++) {

    // Get the lat/lng of each center 

    const latitude = Number(centerLatlng.getString(i, 'LATITUDE'));
    const longitude = Number(centerLatlng.getString(i, 'LONGITUDE'));
    const people = Number(centerLatlng.getString(i, 'POPULATION'));

    // Only draw them if the position is inside the current map bounds. We use a
    // Leaflet method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (detaineeMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      // Transform lat/lng to pixel position
      const pos = detaineeMap.latLngToPixel(latitude, longitude);
      // Get the size of the center and map it. 60000000 is the mass of the largest
      // center (https://en.wikipedia.org/wiki/Hoba_meteorite)


      //COLOR KEY
      var from = color(218, 165, 32, 100);
      var to = color(220, 32, 32, 200);
      // var to = color(72, 61, 139);
      colorMode(RGB);
      var interA = lerpColor(from, to, 0.33);
      var interB = lerpColor(from, to, 0.66);
      textSize(15);
      fill(0);
      text('TIME DETAINED(DAYS)', 10, 480);

      textSize(15);
      fill(from);
      noStroke();
      rect(20, 500, 20, 50);
      text('>30', 10, 495);

      fill(interA);
      rect(60, 500, 20, 50);
      text('>60', 50, 495);

      fill(interB);
      rect(100, 500, 20, 50);
      text('>90', 90, 495);

      fill(to);
      rect(140, 500, 20, 50);
      text('>120', 130, 495);

      //CENTERS
      var ppl = Number(centerLatlng.getString(i, 'POPULATION'));
      var days = Number(centerLatlng.getString(i, 'DAYS'));
      //console.log(popl);

      var dotwidth = map(ppl, 30, 1500, 5, 40);

      var redness = map(days, 20, 400, from, to);
      fill(redness, 0, 50, 150);
      noStroke();
      //fill(255, 0, 100);
      ellipse(pos.x, pos.y, dotwidth, dotwidth);
      
      }
    }
  }
      // console.log(pos.x, pos.y, mouseX, mouseY);
      // var disttodot = dist(pos.x, pos.y, mouseX, mouseY);
      // if (disttodot < 2) {
      //   var city = Number(centerLatlng.getString(i, 'Hi'));;
      //   text(city, pos.x + 10, pox.y + 10);
        
     // }   
        
  
  
           //NEXT STEP
    //      if (mouseX > pos.x - 20 && mouseX < width + 20 && mouseY > pos.y - 20 && mouseY < pos.y + 20) {

    //     fill(255, 220);
    //     rect(pos.x, pos.y, 200, 200);
    //     textSize(20);
    //     fill(0);
    //     text(cities[0], pos.x, ypos,y + 50);
    //     text(detainees[0], pos.x, pos,y + 70);
    //     textSize(20);
 
// OTHER OPTION?
//         ellipse.mouseOver(centerInfo);  
//       function centerInfo() {
//              fill(255, 220);
//         rect(pos.x, pos.y, 200, 200);
//         textSize(20);
//         fill(0);
//         text(cities[0], pos.x, ypos,y + 50);
//         text(detainees[0], pos.x, pos,y + 70);
//         textSize(20);
        
//       }

 
let state=1;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (state == 1){
  background(220);
    text("question?", 10, 10);
  } else if (state == 2){
  background(220);
  text("map", 10, 10);
  
  }
}

function mousePressed(){
  if (state == 1){
    state = 2;
  }
}var map;
var ppl = 20;

var cities = ["Adelanto", "Elizabeth", "Eloy"];
var detainees = [1716, 291, 1422];
var xPos = [120, 225, 170];
var yPos = [180, 180, 195];


function preload() {
  map = loadImage('map.png');
}


function setup() {
  createCanvas(800, 500);
}


function draw() {
  background(255);
  image(map, 0, 0, width, height);

  print(mouseX, mouseY);

  noStroke();

  //Adelanto
  fill(255, 0, 255);
  ellipse(xPos[0], yPos[0], ppl * 2, ppl * 2);

  //Elizabeth
  fill(10, 100, 80);
  ellipse(xPos[1], yPos[1], ppl, ppl );

  //Eloy
  fill(100, 200, 30);
  ellipse(xPos[2], yPos[2], ppl * 1.5, ppl * 1.5);
  // ellipse(119,170,ppl*2,ppl*2);
  
  
  //   print(cities[0],detainees[0],xPos[0],yPos[0]); 

  if (mouseX > xPos[0] - 50 && mouseX < xPos[0] + 50 && mouseY > yPos[0] - 50 && mouseY < yPos[0] + 50) {
    // popUpNJ();
    // print("in");

    fill(255, 220);
    rect(xPos[0], yPos[0], 200, 200);
    textSize(20);
    fill(0);
    text(cities[0], xPos[0], yPos[0] + 50);
    text(detainees[0], xPos[0], yPos[0] + 70);
    textSize(20);
    
  }
    
      if (mouseX > xPos[1] - 50 && mouseX < xPos[1] + 50 && mouseY > yPos[1] - 50 && mouseY < yPos[1] + 50) {
    // popUpNJ();
    // print("in");

    fill(255, 220);
    rect(xPos[0], yPos[0], 200, 200);
    textSize(20);
    fill(0);
    text(cities[1], xPos[1], yPos[1] + 50);
    text(detainees[1], xPos[1], yPos[1] + 70);
    textSize(20);

  }
  
        if (mouseX > xPos[2] - 50 && mouseX < xPos[2] + 50 && mouseY > yPos[2] - 50 && mouseY < yPos[2] + 50) {
    // popUpNJ();
    // print("in");

    fill(255, 220);
    rect(xPos[2], yPos[2], 200, 200);
    textSize(20);
    fill(0);
    text(cities[2], xPos[2], yPos[2] + 50);
    text(detainees[2], xPos[2], yPos[2] + 70);
    textSize(20);

  }



  //   if ( mouseX > 190 && mouseX < 260 && mouseY > 140 && mouseY < 208) {
  //   popUpNJ();
  // }

  //     if ( mouseX > 70 && mouseX < 168 && mouseY > 127 && mouseY < 218) {
  //   popUpCali();
  // }

  //       if ( mouseX > 180 && mouseX < 230 && mouseY > 207 && mouseY < 241) {
  //   popUpFL();
  // }
}


function popUpCali() {
  fill(255, 220);

  rect(50, 50, 200, 200);
  textSize(20);

  fill(0);
  text("1716 detained", 60, 80);


}


function popUpNJ() {
  fill(255, 220);

  rect(160, 170, 200, 200);
  textSize(20);

  fill(0);
  text("291 Detained", 186, 192);
  textSize(20);


}

// function popUpFL() {
//   fill(255, 220);

//   rect(160, 170, 200, 200);
//   textSize(20);

//   fill(0);
//   text("661 Detained", 185, 211);
//   textSize(20);


// }



function popUpTX() {
  fill(255, 220);

  rect(160, 170, 200, 200);
  textSize(20);

  fill(0);
  text("1422 Detained", 162, 189);
  textSize(20);


}let centerData;

// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');
let detaineeMap;
let canvas;
let centerLatlng;

let data = [];

// All our map options in a single object
const options = {
  lat: 40.731156,
  lng: -90,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"

  //style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}


//   
// }

function preload() {
  //centerData = loadTable('ERO_list_32.csv', 'csv', 'header');
  centerLatlng = loadTable('ERO_32_latlng.csv', 'csv', 'header');
}

function setup() {
  canvas = createCanvas(800, 600);
  createElement('h1','42,000 DETAINED PEOPLE')
  // Create a tile map with lat 0, lng 0, zoom 4
  detaineeMap = mappa.tileMap(options);
  detaineeMap.overlay(canvas);

  let maxDets = 0;
  let minDets = Infinity;

  //Dan's EXAMPLE
  //for (let row of subscriberData.rows) {
  // let country = row.get('country_id').toLowerCase();
  // let latlon = countries[country];
  //if(latlon) {
  // let lat = latlon[0];
  // let lon = latlon[1];

  //DELETED
  // const pixCoord = trainMap.latLngtoPixel(lat, lon);

  //let detCount = row.get('FY18 APP');
  //data.push({
  //lat,
  //lon,
  //detCount
  //})

  //if (detCount > maxDets) {
  //   maxDets = detCount;
  // }

  //if (detCount > minDets) {
  //   minDets = detCount;
  // }

  //DELETED
  //let diameter = sqrt(subCount) * trainMap.zoom();
  //fill(255, 0, 200, 100);
  // ellipse(pix.x, pix.y, diameter, diameter);
  //}
  //}

  // Only redraw the meteorites when the map change and not every frame.
  detaineeMap.onChange(drawDCenters);

  //fill(70, 203, 31);
  //stroke(100);
}

function draw() {
  //   clear();

  //   for (let row of centerData.rows) {
  //     console.log(row.get('CITY'));
  //     //   console.log(row.get('NAME'));
  //     //   console.log(row.get('CITY'));
  //     //   console.log(row.get('STATE'));
  //     //   console.log(row.get('FY18 ADP'));

  //   }
  //   for (let row of centerLatlng.rows) {
  //     let lat = row.get('LATITUDE');



  //   }



  // Every Frame, get the canvas position 
  // for the latitude and longitude of Adelanto,CA
  //34.5828° N, 117.4092° W
  // const adelanto = detaineeMap.latLngToPixel(34.5828, -117.4092);
  // Using that position, draw an ellipse
  // ellipse(adelanto.x, adelanto.y, 20, 20);
}

function drawDCenters() {
  // Clear the canvas
  clear();

  for (let i = 0; i < centerLatlng.getRowCount(); i++) {
    // Get the lat/lng of each center 
    const latitude = Number(centerLatlng.getString(i, 'LATITUDE'));
    const longitude = Number(centerLatlng.getString(i, 'LONGITUDE'));
    
//       const popl = Number(centerLatlng.getString(i, 'POPULATION'));
//       console.log(popl);
    // Only draw them if the position is inside the current map bounds. We use a
    // Leaflet method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (detaineeMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      // Transform lat/lng to pixel position
      const pos = detaineeMap.latLngToPixel(latitude, longitude);
      // Get the size of the center and map it. 60000000 is the mass of the largest
      // center (https://en.wikipedia.org/wiki/Hoba_meteorite)

//COLOR KEY
      var from = color(218, 165, 32);
      var to = color(220, 32, 32);
      // var to = color(72, 61, 139);
      colorMode(RGB);
      var interA = lerpColor(from, to, 0.33);
      var interB = lerpColor(from, to, 0.66);
      textSize(15);
      fill(0);
      text('Time Detained(days)', 10, 480);

      textSize(10);
      fill(from);
      noStroke();
      rect(10, 500, 20, 60);
      text('>30', 10, 495);

      fill(interA);
      rect(40, 500, 20, 60);
      text('>60', 40, 495);

      fill(interB);
      rect(70, 500, 20, 60);
      text('>90', 70, 495);

      fill(to);
      rect(100, 500, 20, 60);
      text('>120', 100, 495);
      
   
      noStroke();
      ellipse(pos.x, pos.y, 15, 15);
    }

    //NEXT STEP
    //      if (mouseX > pos.x - 20 && mouseX < width + 20 && mouseY > pos.y - 20 && mouseY < pos.y + 20) {
    //     // popUpNJ();
    //     // print("in");

    //     fill(255, 220);
    //     rect(xPos[0], yPos[0], 200, 200);
    //     textSize(20);
    //     fill(0);
    //     text(cities[0], xPos[0], yPos[0] + 50);
    //     text(detainees[0], xPos[0], yPos[0] + 70);
    //     textSize(20);
  }
}// Create a variable to hold our map
var myMap;
// Create a variable to hold our canvas
var canvas;
// Create a new Mappa instance using Leaflet.
var mappa = new Mappa('Leaflet');

// Lets put all our map options in a single object
var options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


function setup(){
  canvas = createCanvas(640,640);
  // background(100); let's uncomment this, we don't need it for now

  // Create a tile map with the options declared
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);
  
    // Add a color to our ellipse
  fill(200, 100, 100);
}
}

function draw(){

}


// function setup(){
//   canvas = createCanvas(640,640); 
//  // background(100);

//   // Create a tile map with lat 0, lng 0, zoom 4
//   myMap = mappa.tileMap(0,0,4); 
//   // Overlay the tilemap on top of the canvas
//   myMap.overlay(canvas);
// }

// function draw(){

// }





// var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 4,
//           center: {lat: -33, lng: 151}
//         });

// var image = 'icon.png';
// var beachMarker = new google.maps.Marker({
//           position: {lat: -33.890, lng: 151.274},
//           map: map,
//           icon: image
//       });var url1 = "https://api.wordnik.com/v4/word.json/";
var word = "rainbow";
var url2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=YOURAPIKEY";

//something on screen when you click makes API call
var link;

function setup() {
  noCanvas();
  link = createA('#', word);
  link.mousePressed(askWordnik);
}

function askWordnik() {
  loadJSON(url1 + word + url2, gotData);
  
}
  function gotData(data) {
    //random and use floor function to get rid of decimal
    var index1 = floor(random(0, data.length));
     var index2 = floor(random(0, data[index1].words.length));
    word = data[index1].words[index2];
    link.html(word);

}

//rainbow/sea bow
//   function gotData(data) {
//     //update the word variable so that it now queries "sea bow"
//     word = data[0].words[0];
//     link.html(word);
//     //get rainbow, then getting sea bow, then what?

// }


//the word is rainbow
// var url1 = "https://api.wordnik.com/v4/word.json/";
// var word = "rainbow";
// var url2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=YOURAPIKEY";

// //something on screen when you click makes API call
// var link;

// function setup() {
//   noCanvas();
//   link = createA('#', word);
//   link.mousePressed(askWordnik);
// }

// function askWordnik() {
//   loadJSON(url1 + word + url2, gotData);
  
// }
//   function gotData(data) {
//     link.html(data[0].words[0]);
//   }


//look into data and pull out a related word

//PULL OUT FIRST RELATED WORD
//DATA array, index 0 object, index 0 word
 // function gotData(data) {
 //    println(data[0].words[0]);
 //  }

//createA = creates an anchor linkvar lineX = 0;
var url = 'http://api.open-notify.org/iss-now.json';
var issX = 0;
var issY = 0;

function setup() {
  createCanvas(600, 400);

  setInterval(askISS, 1000);

}

function askISS() {
  loadJSON(url, gotData, 'jsonp');
}

function gotData(data) {
  var lat = data.iss_position.latitude;
  var lon = data.iss_position.longitude;
  issX = map(lat, -40, -60, 0, width);
  issY = map(lon, 95, 115, 0, height)

  // issX = map(lat, 45, 50, 0, width);
  // issY = map(lon, -55, 50, 0, height);

  // issX = map(lat, -90, 90, 0, width);
  // issY = map(lon, -90, 90, 0, height);

}

function draw() {
  background(80);

  fill(255);
  ellipse(issX, issY, 24, 24);

  stroke(255);
  line(lineX, 0, lineX, height);
  lineX = lineX + 5;
  if (lineX > width) {
    lineX = 0;

  }
}

//setTimeout = trigger an event once at ____ milliseconds
//setInterval = trigger an event over and over every ____ mil
//setInterval(DO THIS, EVERY __ MILLISECONDS)

//http://api.open-notify.org/iss-now.jsonlet subscriberData;

// Create a new Mappa instance pulling from Leaflet API
const mappa = new Mappa('Leaflet');
let trainMap;

function preload() {
  subscriberData = loadTable('subscribers_geo.csv', 'header');

}


function setup() {
  canvas = createCanvas(400, 400);
  // console.log(subscriberData);
  trainMap = mappa.tileMap(0,0,4); 

  //for of loop?
  console.log();
  for (let row of subscriberData.rows) {
    let row = subscriberData.getRow(i);
    console.log(row.get('country_id'));
    console.log(row.get('subscribers'));

  }
}




//loadTable -  loading tabular data
//Tile map -  you can move around and zoom in and out
// Create a tile map with lat 0, lng 0, zoom 4
//myMap = mappa.tileMap(0,0,4); var mapimg;

var clat = 0;
var clon = 0;

var zoom = 1;

var earthquakes;

//shanghai lat, lon
//31.2304° N, 121.4737° E
// var lat = 31.2304;
// var lon = 121.4737;

//Vancouver lat, lon
//49.2827° N, 123.1207° W
var lat = 49.2827;
var lon = -123.1207;

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoibXRhbGF2ZXJhIiwiYSI6ImNqb3l2djFjMjAyOTYzcW81cGFpbHpkdzgifQ.UmLuyvacG2mH284eVj4JTw');
  //last day
  // earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');

  //last 30 days
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');

}

function mercX(lon) {
  //128 divided by PI times 2 to the zoom level
  // λ is  longitude in radians & φ is geodetic latitude in radians
  //have to convert the degrees into radians
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
  //moves the origin point form top left to center
  translate(width / 2, height / 2);
  imageMode(CENTER);

  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);

  for (var i = 0; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/, /);
    lat = data[1];
    lon = data[2];

    var mag = data[4];
    var d = map(mag, 0, magmax, 0, 180);
    
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;

    //magnitude equals itself to the 10th power
    mag = pow(10, mag);
    //get the square root of it in order to represent the mag as circles
    mag = sqrt(mag);
    
    var magmax = sqrt(pow(10,10));
    
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, d, d);
  }


}



// y values are lat
//x values are lon
//https://en.wikipedia.org/wiki/Web_Mercator_projection
//magnitude of earthquake measured in logorithimic scale
//area of a circle is PIr2
//map square root of population to diameter

var weather;

var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';

var input;

function setup() {
  createCanvas(400, 200);

  var button = select('#submit');
  button.mousePressed(weatherAsk);

  input = select('#city');
}

function weatherAsk() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
}

function gotData(data) {
  weather = data;
}

function draw() {
  background(0);
  if (weather) {
    var temp = weather.main.temp;
    var humidity = weather.main.humidity;
    ellipse(100, 100, temp, temp);
    ellipse(300, 100, humidity, humidity);
  }
}


//MINE DID NOT WORK, USED HIS EXAMPLE
// var weather;

// var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
// var apiKey = '&APPID=137224719b48c349b3d7c888c726c931';
// var units = '&units=metric';


// var input;

// function setup() {
//   createCanvas(400, 200);
  
//   var button = select ('#submit');
//   button.mousePressed(weatherAsk);
  
//   input = select('#city');
// } 
//  function weatherAsk() { 
//   var url = api + input.value() + apiKey + units;
//   loadJSON(url, gotData);
//  }

// function gotData(data) {
//   weather = data;
// }

// function draw() {
//   background(0);
//   if (weather) {
//     var temp = weather.main.temp;
//     var humidity = weather.main.humidity;
  
//     ellipse(100, 100, temp, temp)
//     ellipse(300, 100, humidity, humidity);
//   }
// }

//CITY IS HARD-CODED
// var weather;

// var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
// var city = 'London';
// var apiKey = '&APPID=137224719b48c349b3d7c888c726c931';
// var units = '&units=metric';

// function setup() {
//   createCanvas(400, 200);
  
//   var button = select ('#submit');
//   button.mousePressed(weatherAsk);
// } 
//  function weatherAsk() { 
//   var url = api + city + apiKey + units;
//   loadJSON(url, gotData);
//  }

// function gotData(data) {
//   weather = data;
// }

// function draw() {
//   background(0);
//   if (weather) {
//     var temp = weather.main.temp;
//     var humidity = weather.main.humidity;
  
//     ellipse(100, 100, temp, temp)
//     ellipse(300, 100, humidity, humidity);
//   }
// }



//137224719b48c349b3d7c888c726c931
//openweathermap api

//http://api.openweathermap.org/data/2.5/weather?q=London&APPID=137224719b48c349b3d7c888c726c931&units=metricvar weather;

function setup() {
  createCanvas(600, 400);
  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=137224719b48c349b3d7c888c726c931&units=metric', gotData);
   
}

function gotData(data) {
  // println(data);
  weather = data;
}

function draw() {
  background(0);
  //draw a circle for temp and one for humidity
  if (weather) {
    ellipse(100, 100, weather.main.temp, weather.main.temp);
    ellipse(300, 100, weather.main.humidity, weather.main.humidity);
  }
}
//137224719b48c349b3d7c888c726c931
//openweathermap api

//http://api.openweathermap.org/data/2.5/weather?q=London&APPID=137224719b48c349b3d7c888c726c931&units=metricvar x = 0;
var spaceData;

function setup() {
  createCanvas(200, 200);
   loadJSON("http://api.open-notify.org/astros.json", gotData, 'jsonp');
}

function gotData(data) {
  spaceData = data;

  }

function draw() {
   background(0);
  if (spaceData) {
    randomSeed(4);
  }  
    for (var i = 0; i < spaceData.number; i++) {
    fill(255);
    ellipse(random(width), random(height), 16, 16);
      
  }
  stroke(255);
  line(x, 0, x, height);
  x = x + 1;
  if (x > width) {
    x = 0; 
  }
 
}

   //HOW TO ADD NAMES OF PEOPLE? 
    // var people = people[i].people;
    // createDiv(people[i]);
  

//CIRCLE TO REPRESENT EACH PERSON IN SPACE
// function setup() {
//   createCanvas(200, 200);
//    loadJSON("http://api.open-notify.org/astros.json", gotData, 'jsonp');
// }

// function gotData(data) {
//  background(0);
//   for (var i = 0; i < data.number; i++) {
//     fill(255);
//     ellipse(random(width), random(height), 16, 16);
    
//   }


// http://api.open-notify.org/astros.jsonvar data;

function preload() {
  data = loadJSON("birds.json");

}

function setup() {
  noCanvas();
  //accesses every element of array birds and looking 
  //for the families
  var birds = data.birds;
  for (var i = 0; i < birds.length; i++) {
    createElement('h1', birds[i].family);
    
  //inside that loop, look for all the members of the 
  //family names
  //need another loop to say each member of each loop
    var members = birds[i].members;
    for (var j = 0; j < members.length; j++) {
      createDiv(members[j]);
    }
  }

}


//SHOW ALL THE BIRD FAMILIES
// var data;

// function preload() {
//   data = loadJSON("birds.json");

// }

// function setup() {
//   noCanvas();
//   //accesses every element of array birds and looking 
//   //for the families
//   var birds = data.birds;
//   for (var i = 0; i < birds.length; i++)  {
//   createElement('h1', birds[i].family); 
//   }

// }



//SHOW 1 BIRD, CROZET SHAG
// var data;

// function preload() {
//   data = loadJSON("birds.json");

// }

// function setup() {
//   noCanvas();
//   var bird = data.birds[1].members[2];
//   createP(bird);

// }

//github repository
//https://github.com/dariusk/corporavar flower;

function preload() {
  flower = loadJSON("flower.json");
  
}

function setup() {
  createCanvas(400,400);

}

function draw() {
  background(0);
  
  fill(flower.r, flower.g, flower.b);
  text(flower.name, 10, 50);
}


//github repository
//https://github.com/dariusk/corpora
//FLOWER OBJECT THROUGH CODE
// var flower;

// function setup() {
//   createCanvas(400,400);
// //flower object
//   flower = { 
//     name: "sunflower",
//     col: color(200, 220, 0)
//   }
// }

// function draw() {
//   background(0);
  
//   fill(flower.col);
//   text(flower.name, 10, 50);
// }var sliders = [];
var angle = 0;

function setup() {
 noCanvas();
  for (var i = 0; i < 100; i++) {
  sliders[i] = createSlider(0, 255, 50);
}
  //handle just the first slider input event
  sliders[0].input(adjustSliders);
}

function adjustSliders() {
  //start from slider 1
  //anytime you change slider 0(first element in array)
  //call function adjustSliders, loop through all the other ones 
  //starting with 1 and change their value to the value of the first oen
  for (var i = 1; i < sliders.length; i++) {
  sliders[i].value(sliders[0].value()); 
 
}
}



//ADD AN OFFSET SO THEY MOVE SLIGHTLY DIFFERENTLY 
// var sliders = [];
// var angle = 0;

// function setup() {
//  noCanvas();
//   for (var i = 0; i < 100; i++) {
//   sliders[i] = createSlider(0, 255, 50);
// }
// }

// function draw() {
//   //use offset to make one slider .025 offset from another one
//   var offset = 0;
//   for (var i = 0; i < sliders.length; i++) {
//   var x = map(sin(angle+offset), -1, 1, 0, 255);
//   sliders[i].value(x); 
//     offset += 0.025;
//   angle += 0.001;
// }
// }




//SLIDER DANCE
// var slider;
// var angle = 0;

// function setup() {
//   createCanvas(200, 200);
//   slider = createSlider(0, 255, 50);
// }

// function draw() {
//   var x = map(sin(angle), -1, 1, 0, 255);
//   //map result of sin function which is between -1, 1
//   //to 0, 255
//   slider.value(x);

//   background(slider.value());
  
//   angle += 0.1;
// }






 //ZOMBIE SLIDER
// var slider;
// var x = 151;

// function setup() {
//   createCanvas(200, 200);
//   slider = createSlider(0, 255, 50);
// }

//function draw() {
 
  // slider.value(x);
  // x = x + random(-5, 5);
//   background(slider.value());
// }
function setup() {
  var canvas = createCanvas(200, 200);
  background(0);
  
  canvas.dragOver(highlight);
  canvas.dragLeave(unhighlight);
  canvas.drop(gotFile, unhighlight);
    
}

function gotFile(file) {
  createP(file.name + " " + file.size);
  var img = createImg(file.data);
  img.hide();
  
  image(img, 0, 0, 200, 200);
}

function highlight() {
  canvas.style('background-color', '#ccc');
  
}

function unhighlight() {
  canvas.style('background-color', '#fff');
  
}

function setup() {
  var canvas = createCanvas(200, 200);
  background(0);
  
  canvas.dragOver(highlight);
  canvas.dragLeave(unhighlight);
  canvas.drop(gotFile, unhighlight);
    
}

function gotFile(file) {
  createP(file.name + " " + file.size);
  var img = createImg(file.data);
  img.hide();
  
  image(img, 0, 0, 200, 200);
}

function highlight() {
  canvas.style('background-color', '#ccc');
  
}

function unhighlight() {
  canvas.style('background-color', '#fff');
  
}
var dropzone;

function setup() {
  createCanvas(200, 200);
  background(0);
  
  dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(gotFile, unhighlight);
    
}

function gotFile(file) {
  createP(file.name + " " + file.size);
  var img = createImg(file.data);
  img.size(100, 100);
}

function highlight() {
  dropzone.style('background-color', '#ccc');
  
}

function unhighlight() {
  dropzone.style('background-color', '#fff');
  
}
var p;

function setup() {
  noCanvas();
  //make a lot of those

  for (var i = 0; i < 5; i++) {
    p = createP('This is a link:');

    p.style('background-color', '#CCC');
    p.style('padding', '24px');


    //link with anchor tag with the word babies
    //If you click on that tag with event called
    //addPhoto
    //addPhoto function adds an image element
    var a = createA('#', 'babies');

    a.mousePressed(addPhoto);

    a.parent(p);

  }
}

function addPhoto() {

  var img = createImg('baby.png');
  img.size(100, 100);
  img.parent(p);

}
//you want to link to babies clicking thing
//and image in grey boxvar images = [];
//removed the global variable (var p)

function setup() {
  noCanvas();
  //make a lot of those

  for (var i = 0; i < 5; i++) {
  var  p = createP('This is a link:');

    p.style('background-color', '#CCC');
    p.style('padding', '24px');


    //link with anchor tag with the word babies
    //If you click on that tag with event called
    //addPhoto
    //addPhoto function adds an image element
    var a = createA('#', 'babies');

    a.mousePressed(addPhoto);
    a.parent(p);

  }
  var button = select('#clear');
  button.mousePressed(clearStuff);
}
}

function clearStuff() {
  for (var i = 0; i < images.length; i++) {
    images[i].remove();
    //hide() the element would still actually be there
}

function addPhoto() {

  var img = createImg('baby.png');
  img.size(100, 100);
  images.push(img);
  //what do you put inside img.parent(____); ?
  //img.parent(this); "this" refers to the dom element 
  //that triggered the callback photo a
  // ___.parent(____)  assign this elements parent to this other element
  // parent(); -  asking p5 to tell me who the current parent is
  
  var paragraph = this.parent();
  img.parent(this);

}
function setup() {
  noCanvas();
  
  var p = createP('This is a link:');

  p.style('background-color', '#CCC');
  p.style('padding', '24px');

  
//link with anchor tag with the word babies
  //If you click on that tag with event called
//addPhoto
  //addPhoto function adds an image element
  var a = createA('#', 'babies');
 
  a.mousePressed(addPhoto);
  
  a.parent(p);
  
}

function addPhoto() {
  //img createImg is different from load, makes and image 
  //dom element like in html
  //<img src"_____">  file or url that would go in there
  var img = createImg('baby.png');
  img.size(100, 100);
  img.parent(p);
  
  //problem p is not a global variable, it's in setup
}

//you want to link to babies clicking thing
//and image in grey box

function setup() {
  for (var i = 0; i < 10; i++) {
    var p = createP('apples');
    var x = floor(random(windowWidth));
    var y = floor(random(windowHeight));
    p.position(x, y);
    //make this paragraph a member of the class apple
    p.class('apple');
  }

  for (var i = 0; i < 10; i++) {
    //var p = createP('blueberries');
    //createA - create anchor
    //var p = createA('http://google.com', 'blueberries');
     var p = createA('#, 'blueberries');
    //instead you could use # to say don't go anywhere you will handle in JS
   
    var x = floor(random(windowWidth));
    var y = floor(random(windowHeight));
    p.position(x, y);
    //make this paragraph a member of the class blueberry
    p.class('blueberry');
    p.mousePressed(becomeApple);

  }

  function becomeApple() {
    console.log("this is happening");
    this.class('apple');
    this.removeClass('blueberry');
    //changing blueberry dom elements to apples.  

  }

  function draw() {


  }

}

//class overrides tag, id overrides class// Daniel Shiffman
// http://codingtra.in
// Earthquake Data Viz
// Video: https://youtu.be/ZiYdOwOrGyc

var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 3;
var earthquakes;

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
  // earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
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
  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);

  for (var i = 1; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    //console.log(data);
    var lat = data[1];
    var lon = data[2];
    var mag = data[4];
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
    // This addition fixes the case where the longitude is non-zero and
    // points can go off the screen.
    if(x < - width/2) {
      x += width;
    } else if(x > width / 2) {
      x -= width;
    }
    mag = pow(10, mag);
    mag = sqrt(mag);
    var magmax = sqrt(pow(10, 10));
    var d = map(mag, 0, magmax, 0, 180);
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, d, d);
  }

}var map;
var ppl = 20;

function preload() {
  map = loadImage('map.png');
}


function setup() {
  createCanvas(800, 500);
}


function draw() {
  background(255);
  image(map,0,0, width,height);
  
  print(mouseX, mouseY);
  
  noStroke();
  fill(100,200,30);
  ellipse(208,219,ppl,ppl);
  
  ellipse(119,170,ppl*2,ppl*2);
  
  fill(10, 100, 80);
  ellipse(225,172,ppl*1.5,ppl*1.5);
  
  
  
  if ( mouseX > 190 && mouseX < 260 && mouseY > 140 && mouseY < 208) {
  popUpNJ();
}
  
    if ( mouseX > 70 && mouseX < 168 && mouseY > 127 && mouseY < 218) {
  popUpCali();
}

      if ( mouseX > 180 && mouseX < 230 && mouseY > 207 && mouseY < 241) {
  popUpFL();
}
}


function popUpCali( ) {
  fill(255,220);
  
  rect(50,50,200,200);
  textSize(20);
  
  fill(0);
  text("1716 detained",60,80);
  
  
}


function popUpNJ( ) {
  fill(255,220);
  
  rect(160,170,200,200);
  textSize(20);
  
  fill(0);
  text("291 Detained",186,192);
  textSize(20);
  
  
}

function popUpFL( ) {
  fill(255,220);
  
  rect(160,170,200,200);
  textSize(20);
  
  fill(0);
  text("661 Detained",185,211);
  textSize(20);
  
  
}



function popUpTX( ) {
  fill(255,220);
  
  rect(160,170,200,200);
  textSize(20);
  
  fill(0);
  text("1422 Detained",162,189);
  textSize(20);
  
  
}


function setup() {
  for (var i = 0; i < 10; i++) {
    var p = createP('apples');
    var x = floor(random(windowWidth));
    var y = floor(random(windowHeight));
    p.position(x, y);
    //make this paragraph a member of the class apple
    p.class('apple');
  }

  for (var i = 0; i < 10; i++) {
    //var p = createP('blueberries');
    //createA - create anchor
    //var p = createA('http://google.com', 'blueberries');
     var p = createA('#, 'blueberries');
    //instead you could use # to say don't go anywhere you will handle in JS
   
    var x = floor(random(windowWidth));
    var y = floor(random(windowHeight));
    p.position(x, y);
    //make this paragraph a member of the class blueberry
    p.class('blueberry');
    p.mousePressed(becomeApple);

  }

  function becomeApple() {
    console.log("this is happening");
    this.class('apple');
    this.removeClass('blueberry');
    //changing blueberry dom elements to apples.  

  }

  function draw() {


  }

}

//class overrides tag, id overrides classfunction setup() {
  createCanvas(600, 400);

}

function draw() {
  background(220);
}

// Initialize and add the map
function initMap() {
  console.log ("init");
  
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}
function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(0);
}var paragraphs;

var paragraph;


function setup() {
  createCanvas(100, 100);
  background(0);

  paragraph = select('unicorn');
  // paragraph.mouseOver(highlight);
  // paragraph.mouseOut(unhighlight);

  for (var i =0; i< 100; i++)  {
    var par = createP('rainbow!');
    par.position(random(500), random(500));
  }
  
  
  paragraphs = selectAll('p');
  for (var i = 0; i < paragraphs.length; i++) {

    paragraphs[i].mouseOver(highlight);
    paragraphs[i].mouseOut(unhighlight);

    //     paragraphs[i].style('font-size', '24pt');
  }
}


function highlight() {
  this.style('padding', '16pt');
  this.style('background-color', '#F0F');

}

function unhighlight() {
  this.style('padding', '0pt');
  this.style('background-color', '#FFF');

}

//class overrides tag, id overrides classvar textbox;
var slider
var paragraph;


function setup() {
noCanvas();
  
  textbox = createInput('enter text');
  slider = createSlider(10, 64, 16);
  
  paragraph = createP('starting text');
  
  // textbox.changed(updateText);
  textbox.input(updateText);
  slider.input(updateSize);
  
}

function updateSize() {
  paragraph.style("font-size", slider.value() + "pt");
  
}

function updateText(){
  paragraph.html(textbox.value());
  
}

//class overrides tag, id overrides class
var textbox;
var slider
var paragraph;


function setup() {
noCanvas();
  
  textbox = createInput('enter text');
  slider = createSlider(10, 64, 16);
  
  paragraph = createP('starting text');
  
  // textbox.changed(updateText);
  textbox.input(updateText);
  slider.input(updateSize);
  
}

function updateSize() {
  paragraph.style("font-size", slider.value() + "pt");
  
}

function updateText(){
  paragraph.html(textbox.value());
  
}

//class overrides tag, id overrides class
var textbox;
var slider
var paragraph;


function setup() {
noCanvas();
  
  textbox = createInput('enter text');
  slider = createSlider(10, 64, 16);
  
  paragraph = createP('starting text');
  
  // textbox.changed(updateText);
  textbox.input(updateText);
  slider.input(updateSize);
  
}

function updateSize() {
  paragraph.style("font-size", slider.value() + "pt");
  
}

function updateText(){
  paragraph.html(textbox.value());
  
}


var bgcolor;
var button;
var txt;


function setup() {
  createCanvas(200, 200);
  bgcolor = color(100);
  txt = createP('some text');
  txt.mouseOver(changeStyle);
  //txt.style (name of style property, value of style property);
  txt.mouseOut(revertStyle);
  button = createButton("go");
 // button.mousePressed(changeStyle);

}

function changeStyle() {
  txt.style("background-color", "pink");
  txt.style("padding", "24px");
}

function revertStyle() {
  txt.style("background-color", "purple");
  txt.style("padding", "8px");
}

function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  noStroke();
  ellipse(100, 100, 50, 50);

}var bgcolor;
var button;
var slider;
var nameInput;
var nameP;

function setup() {
  canvas = createCanvas(200, 200);
  canvas.mouseOver(overpara);
  canvas.mouseOut(outpara);
  canvas.mousePressed(changeColor);
  
  bgcolor = color(200);
  nameP = createP('Your Name!');
  button = createButton("go");
  button.mousePressed(changeColor);
  slider = createSlider(10, 100, 86);
  nameInput = createInput('type your name');

  nameP.mouseOver(overpara);
  nameP.mouseOut(outpara);
  
  nameInput.input(updateText); //also changing when hit enter or tab when "changed"

}

function updateText(){
  nameP.html(nameInput.value());
  
}
function overpara() {
  nameP.html('your mouse is over me!');
}

function outpara() {
  nameP.html('your mouse is out');
}

function changeColor() {
  bgcolor = color(random(255));
}


function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  noStroke();
  ellipse(100, 100, slider.value(), slider.value());
  //nameP.html(input.value());  
  text(nameInput.value(), 10, 20);
}var bgcolor;
var button;
var slider;
var nameInput;
var nameP;

function setup() {
  canvas = createCanvas(200, 200);
  canvas.mouseOver(overpara);
  canvas.mouseOut(outpara);
  canvas.mousePressed(changeColor);
  
  bgcolor = color(200);
  nameP = createP('Your Name!');
  button = createButton("go");
  button.mousePressed(changeColor);
  slider = createSlider(10, 100, 86);
  nameInput = createInput('type your name');

  nameP.mouseOver(overpara);
  nameP.mouseOut(outpara);
  
  input.changed(updateText); //also changing when hit enter or tab

}

function updateText(){
  nameP.html(nameInput.value());
  
}
function overpara() {
  nameP.html('your mouse is over me!');
}

function outpara() {
  nameP.html('your mouse is out');
}

function changeColor() {
  bgcolor = color(random(255));
}


function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  ellipse(100, 100, slider.value(), slider.value());
  //nameP.html(input.value());  
  text(input.value(), 10, 20);
}//change bgcolor when you click on a button
var bgcolor;
var button;
var slider;
var input;
var nameP;

function setup() {
  canvas = createCanvas(200, 200);
  bgcolor = color(200);
  nameP = createP('Your Name!'); //empty pargraph for slider to show up to the right of the button
  button = createButton("go");
  button.mousePressed(changeColor);
  
  slider = createSlider(10, 100, 86);
  input = createInput('type your name');
  
}

function changeColor(){
 bgcolor = color(random(255));  
}

// function mousePressed() {
//  changeColor();
// }

function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  ellipse(100, 100, slider.value(), slider.value());
  nameP.html(input.value());  //changes text of html elemeent to that value
  
  text(input.value(), 10, 20); //change what appears in the canvas depending on the text input
  //draws text to the canvas
}//change bgcolor when you click on a button
var bgcolor;
var button;

function setup() {
  canvas = createCanvas(200, 200);
  bgcolor = color(200);
  button = createButton("go go go");
  button.mousePressed(changeColor);
}

function changeColor(){
 bgcolor = color(random(255));  
}

// function mousePressed() {
//  changeColor();
// }

function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  rect(100, 100, 50, 50);
}let angry, crying, happy, heart, hug, poop, gif_loadSad, gif_sad;

function preload() {
  // gif_sad = loadImage("lana.gif");
  soundFormats('mp3');
  poopSong = loadSound('poop1.mp3');
  loveSong = loadSound('bestlove1.mp3');
  happySong = loadSound('happy1.mp3');
  cryingSong = loadSound('summertimesadness1.mp3');
  angrySong = loadSound('loseyourself1.mp3');
}

function setup() {

  angry = select('#angry');
  crying = select('#crying');
  happy = select('#happy');
  heart = select('#heart');
  poop = select('#poop');
  poop.mousePressed(function() {
    poopSong.play();
    cryingSong.stop();
    loveSong.stop();
    happySong.stop();
    angrySong.stop();
  });
  crying.mousePressed(function() {
    cryingSong.play();
    loveSong.stop();
    happySong.stop();
    angrySong.stop();
    poopSong.stop();
    gif_sad = createImg("lana.gif");
    // gif_sad.hide();
  });
  heart.mousePressed(function() {
    loveSong.play();
    happySong.stop();
    cryingSong.stop();
    angrySong.stop();
    poopSong.stop();
  });
  happy.mousePressed(function() {
    happySong.play();
    angrySong.stop();
    poopSong.stop();
    loveSong.stop();
    cryingSong.stop();
  });
  angry.mousePressed(function() {
    angrySong.play();
    poopSong.stop();
    happySong.stop();
    loveSong.stop();
    cryingSong.stop();
  });
  createCanvas(1000, 1000);



}


function draw() {
  //   if (angry) {

  //   }

  // if (crying) {
  //   // image(gif_sad,0,0);
  //   // cryingSong.play();
  //   // happySong.stop();
  //   // loveSong.stop();
  //   // poopSong.stop();
  // }
  //   if (happy) {
  //     happySong.play();
  //     cryingSong.stop();
  //     loveSong.stop();
  //     poopSong.stop();
  //   }
  //   if (heart) {
  //     loveSong.play();
  //      cryingSong.stop();
  //     happySong.stop();
  //     poopSong.stop();
  //   }
  //   if (hug) {

  //   }
  // if (poop.value()) {
  //   if (!poopSong.isPlaying()) {
  //   	poopSong.play();
  //   }
  //   // loveSong.stop();
  //   // cryingSong.stop();
  //   // happySong.stop();
  // }
  // console.log(poop.value());
}var video;
var targetColor = [255, 0, 0];
var threshold;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() {
  background(220);
  image(video,0, 0);
  
  // for all the pixels,
  // for every row
  // 	for every column
  var worldRecord = 5000000;
  for(var y = 0; y < video.height; y++){
  for (var x = 0; x < video.width; x++) {
    var thisPixel = video.get(x,y);
    var diffBetweenColros = dist(thisPixel[0], thisPixel[1], thisPixel[2],
    if(thisPixel close to target pixel)
      
      //dist -  pythagorean theorem
    
    //if that pixel's red value is 
    
//  Don't use this
    //r =  video.pixels [0]
    
//     g =  video.pixels [1]
//     b =  video.pixels [2]
//     r  =  video.pixels [4]
       
       }
  }
}//how to check if every bubble is intersecting every other bubbles


let bubbles = [];
let unicorn;

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 50);
    bubbles[i] = new Bubble(x, y, r);
  }
  unicorn = new Bubble (400, 200, 10);
}

  function draw() {
    background(0);



    // if (bubble1.intersects(bubble2)) {
    //   background(200, 0, 100);
    // }
//     for (let i = 0; i < bubbles.length; i++) {
//       bubbles[i].show();
//       bubbles[i].move();

//     }
  //for every element in bubbles put that element in variable and do something?  
  unicorn.x = mouseX;
    unicorn.y = mouseY;
    unicorn.show();
    unicorn.move();
    
    for (b of bubbles) {
      b.show();
      b.move();
      if (unicorn.intersects(b)) {
        
        
      }
    }
  }

  class Bubble {
    constructor(x, y, r = 50) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.brightness = 0;
    }

    intersects(other) {
      let d = dist(this.x, this.y, other.x, other.y);
      return (d < this.r + other.r);
      // if (d < this.r + other.r) {
      //   return true;
      // } else {
      //   return false;
      // }
    }
  }
    changeColor(bright) {
      this.brightness = bright;
      b.changeColor(100);
    } else { 
      b.changeColo(0);
    }

    contains(px, py) {
      let d = dist(px, py, this.x, this.y);
      if (d < this.r) {
        return true;
      } else {
        return false;
      }
    }

    move() {
      this.x = this.x + random(-2, 2);
      this.y = this.y + random(-2, 2);
    }

    show() {
      stroke(255);
      strokeWeight(4);
      fill(this.brightness, 125);
      ellipse(this.x, this.y, this.r * 2);
    }
  }let bubble1;
let bubble2;

function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble(200, 200);
  bubble2 = new Bubble(400, 200, 100);
}

function draw() {
  background(0);



  if (bubble1.intersects(bubble2)) {
    background(200, 0, 100);
  }

  bubble1.show();
  bubble2.show();
  bubble1.move();
  //bubble2.move();
  bubble2.x = mouseX;
  bubble2.y = mouseY;

}

class Bubble {
  constructor(x, y, r = 50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return (d < this.r + other.r);
    // if (d < this.r + other.r) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r * 2);
  }
}let bubbles = [];
//have an array of bubbles

function setup() {
  createCanvas(600, 400);
}

function mouseDragged() {
  let r = random (10, 50);
  let b = new Bubble (mouseX, mouseY, r);
  bubbles.push(b);

  //   bubbles[i] = new Bubble(x, 200, 40);
  // }
}

function draw() {
  background(0);
  //bubbles.length so you have more
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    stroke(255);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
    //ellipse(this.x, this.y, this.r, this.r);
  }

}var words = ["love", "friend", "adventure", "laugh"];

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  
  for (var i = 0; i < 4; i++) {
    stroke(255);
    text (200, 300, words [i]);
  }
}var forestImage;
var images = [];
var eggs = [];
var cracked;

function preload() {
  forestImage = loadImage('assets/forest.png');
  images.push(loadImage('assets/dog.png'));
  images.push(loadImage('assets/bear.png'));
  images.push(loadImage('assets/raccoon.png'));

  soundFormats('wav');
  eggCrack = loadSound('assets/eggcrack.wav');
}

function setup() {
  createCanvas(600, 400);


  for (var i = 0; i < 7; i++) { //
    var wichAnimal = int(random(0, 3)); //put inside the for loop it happens multiple times
    eggs.push(new Egg(random(0, 200), random(0, 300), images[wichAnimal]));

  }
}

function draw() {
  background(forestImage);
  for (var i = 0; i < 5; i++) {
    eggs[i].checkForCrack();
    eggs[i].display();
  }
}

class Egg {
  constructor(x, y, img) {
    print(img);
    this.x = x;
    this.y = y;
    this.img = img
    this.cracked = false;
  }

  checkForCrack() {
    if (mouseIsPressed && dist(this.x, this.y, mouseX, mouseY) < 100) {
      if (this.cracked == false) {
        eggCrack.play();
      }
      this.cracked = true;
    }
  }

  display() {
 
    if (this.y < height - this.img.height) {
      this.x = this.x + 1;
      this.y = this.y + 1;
    }

    if (this.cracked) {
      image(this.img, this.x, this.y);
    } else {
      stroke(200, 30, 50);
      strokeWeight(5);
      fill(255, 0, 180);
      ellipse(this.x, this.y, 100, 120);
    }
  }
}


   // stroke(240, 0, 220);
    // strokeWeight(3);
    // fill(0, 200, 100);
    // ellipse(this.x, this.y, 250, 270);
// var Animals = [dogImage, bearImage, raccoonImage];

// function mousePressed(){
// 	for(var i=0; i<egg.length; i++){
//   	//eggs[i].disappear();  //how to make the egg 
// //disappear and have the animal appear?
//   }
// var eggCrack;
//  eggCrack: 
//  eggCrack.setVolume(0.1);
//  eggCrack.play();
// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
}


// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  //same as readStringUntil(‘\r\n’)
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  latestData = int(currentString);            // save it for the draw method
  console.log(latestData);             // println the string
  var output = map(mouseX,0,width,0,255);
  serial.write(output);
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(mouseX, data, 50, 50);
  text(data, 10, 10);
  
}var myButton;

function setup() {
  createCanvas(400, 400);
  myButton = createButton("Press");
  myButton.position(100, 100);
  myButton.mousePressed(HeHitMe);
  //anonymous function (often used by JavaScript programers)
  // myButton.mousePressed( function(){  ellipse(random(width), random(height), 20, 20);}
  
  //or
  //myButton.mousePressed(function()_
  //background(220);
  //ellispse(random(width), random(height), 20, 20);
//});
}

function draw() {
// background(0);
}

function HeHitMe() {
  fill(255, 0, 200);
  ellipse(random(width), random(height), 20, 20);
}
var forestImage;
// var dogImage;
// 	dogImage.x: 315,
//   dogImage.y: 200
//     display: function() {
      
//     }
// var = Animals [];      
// var bearImage;

//var raccoonImage;

var Eggs = [];
var egg;
function display() {
  stroke (240, 0, 220);
  strokeWeight(3);
  fill (0, 200, 100);
  ellipse(this.x, this.y, 250, 270);
}
// function mousePressed(){
// 	for(var i=0; i<egg.length; i++){
//   	//eggs[i].disappear();  //how to make the egg 
// //disappear and have the animal appear?
//   }
  // var eggCrack;
  //  eggCrack: 
  //  eggCrack.setVolume(0.1);
  //  eggCrack.play();


function preload() {
  forestImage = loadImage('assets/forest.png');
  dogImage = loadImage('assets/dog.png');
  bearImage = loadImage('assets/bear.png');

  soundFormats('wav');
  eggCrack = loadSound('assets/eggcrack.wav');
  //raccoonImage = loadImage('assets/raccoon.png');
  
}
function setup() {
  createCanvas(600, 400);
   background(forestImage);

  
}

function draw() {
  //image(dogImage, 315, 200);
  //image(bearImage, 80, 135);
  //image(raccoonImage, 400, 200);
  display(egg);
 
}
class Eggs() {
	constructor(x,y) {
		this.x = 200;
		this.y = 100;
  
    //this.direction = random(-1,1);
  }
}
  
  eggDrop(){
    ellipse
    this.x = this.x + 10;
    this.y = this.y + 5;
    if(this.x > width || this.y < 0){let bubbles = [];
//have an array of bubbles

function setup() {
  createCanvas(600, 400);

  // bubble[0] = new Bubble (200, 200, 40);

  //for loop to create the bubble
  //init, test, incrementalization
  for (let i = 0; i < 10; i++) {
    let x = 10 + 30 * i; 
    // let x = 10 + 30 * i;   why these numbers
    //start bubble on first number, space them 
    //out by second number
    //if i is zero, x will equal 10
    //if i is 1, x will equal 30
    //if i is 2, x will equal 70
    //spacing the bubbles out
    
    // let x = random(width);
    // let y = random (height);
    // let r = random (10, 40);
    bubbles[i] = new Bubble(x, 200, 40);
  }
}

function draw() {
  background(0);
  //bubbles.length so you have more
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = random(width);
    this.y = random (height);
    this.r = random (10, 100);
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    stroke(255);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
    //ellipse(this.x, this.y, this.r, this.r);
  }

}let nums = [100, 25, 46, 72];




function setup() {
  createCanvas(500, 400);

}

function draw() {
  background(0);
  for (var i = 0; i < 4; i++) {
    ellipse ( i * 100 + 100, 200, nums[i], nums[i]);
    
    
  // ellipse(100, 200, nums[0], nums[0]);
  // ellipse(200, 200, nums[1], nums[1]);
  // ellipse(300, 200, nums[2], nums[2]);
  // ellipse(400, 200, nums[3], nums[3]);
  }

}let words = ["rainbow", "heart", "purple", "friendship", "love"];

let index = 0;


function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(0);

  fill(255);
  textSize(32);
  text(words[index], 12, 200);

}


function mousePressed() {
  index = index + 1;

  if (index == words.length) {
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
  
  ellipse (200, 200, nums[2], nums[2]);
  //nums[2] refers to index number 2 in the nums array which is 12 
   
  }let bubble1;
let bubble2;

function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble(200, 200, 40);
   bubble2 = new Bubble(400, 200, 20);
  //print(bubble.x, bubble.y);
}

function draw() {
  background(0);
  bubble1.move();
  bubble1.show();
    bubble2.move();
  bubble2.show();
  // }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
    move() {
      this.x = this.x + random(-5, 5);
      this.y = this.y + random(-5, 5);
    }
  
    show() {
      stroke(255);
      strokeWeight(4);
      noFill();
      ellipse(this.x, this.y, this.r * 2);
    }
  }let bubble1;
let bubble2;

function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble();
   bubble2 = new Bubble();
  //print(bubble.x, bubble.y);
}

function draw() {
  background(0);
  bubble1.move();
  bubble1.show();
    bubble2.move();
  bubble2.show();
  // }
}

class Bubble {
  constructor() {
    this.x = 200;
    this.y = 150;
  }
    move() {
      this.x, this.y + random(-5, 5);
      this.x, this.y + random(-5, 5);
    }
  
    show() {
      stroke(255);
      strokeWeight(4);
      noFill();
      ellipse(this.x, this.y, 24, 24);
    }
  }function setup() {
var i, x, y;
  for ( i = 0; i < 100; i++) {
//some stuff will happen here

}
  
   x = mouseX + 100;
  if (x > 50) {
     y = 20;
    ellipse(x, y, 100, 100);
  }
}
var bluefishImage; 
var sharkImage;
var fish;
var shark;
//var bluefish;
function preload() {
  bluefishImage = loadImage('bluefish.png');
  sharkImage = loadImage('shark.png');
}

function setup() {
  createCanvas(1000, 800);
  deepblue = background(0, 50, 200);
  teal = background(0, 150, 180)
  bluegreen = background(0, 100, 140);
  frameRate(30);
  xtime = 1;
  GREEN = 50;
  //image(bluefish, this.x, this.y);
  
    //bluefish
  fish = new Fish (bluefishImage, 400, 300, .5);
  //this.img (this.x > 450 && this.x < 350)
  //bluefish placeholder
  //fill(255, 0, 200)
  //ellipse(fish1.x, fish1.y, 50, 50)
  
  shark = new Fish(sharkImage, 200, 100, 1);
}

//bluefish;
// var fish;
class Fish {
  constructor (fishImage, posX, posY, fishspeed) {
    // this.img = bluefishImage;
    // this.x = 400;
    // this.y = 300;
    // this.speed = .5
    this.img = fishImage;
    this.x = posX;
    this.y = posY;
    this.speed = fishspeed;
    //or do  this.x = random(800);
    //       this.y = random(800);
    //      
  }
  moveFish() {
   this.x = this.x + this.speed;
    // console.log(this.img);
    // console.log(this.x, this.y);
    image(this.img, this.x, this.y);
  //this.speed = this.speed + -.5
}

changeDirection() {
  if (this.x > 450) {
    this.speed = -.5
  } else if (this.x < 350) {
    this.speed = .5
  }
}
 //run from shark
// if mouseY is within fish Y range
//if mouseX is within 60 pixels to the left or right of fishX
//move fishX 12 pixels (-12 or +12 pixels on x axis)

runAway() {
  // console.log(this);
  // console.log(mouseX);
  // console.log(mouseY);
  if (dist(this.x, this.y, mouseX, mouseY) < 60) {
    this.x = this.x + 5;
  }
}
}



function draw() {
  background(0, 50, 200);
   xtime++

  if (xtime > 0 && xtime <= 90) {
    background(0, 50, 200)
  } else if (xtime > 90 && xtime <= 180) {
    background(0, 100, 100)
  } else if (xtime > 180 && xtime <= 270) {
    background(0, 50, 200)
  } else {
    xtime = 1;
  }

  //seaweed 1
  noFill();
  strokeWeight(50)
  stroke(0, 200, 50);
  stroke(0, 200, 50);
  bezier(200, 150, 05, 120, 250, 400, 80, 999); //(, 85, 150, 05, 120, 90, 90, bottom x, y bottom 
  bezier(300, 250, 35, 220, 350, 500, 180, 999);
  bezier(590, 150, 424, 254, 673, 487, 512, 999);
  bezier(800, 150, 450, 254, 673, 487, 512, 999);
  bezier(950, 150, 600, 254, 900, 487, 500, 999);

  //sand
  fill(139, 90, 40);
  noStroke();
  ellipse(200, 800, 800, 100);
  ellipse(800, 800, 800, 100);

  
  fish.moveFish();
  fish.changeDirection();
  fish.runAway();
  
  // shark.moveFish();
  // shark.changeDirection();
  // shark.runAway();



  //shark
   // image(shark, mouseX, mouseY);
  //shark placeholder
  // fill(255, 0, 0)
  //ellipse(mouseX, mouseY, 50, 50)



  // console.log(xtime);

}


  
  
//moveFish: function() {
//   fish1.x = fish1.x + fish1.speed;
//   //fish1.speed = fish1.speed + -.5
// }

// let ocean = {
//   deepblue: {r: 0, g: 50, b:200}, 
//   teal: { r: 0, g: 150, b: 180},
//   bluegreen:{r: 0, g: 100, b: 140}

// }

// }

// // function preload() {
// //   // shark = loadImage('Assets/Fish/shark.png');
// //   bluefish = loadImage('Assets/Fish/bluefish.png');
// }


  
// }




//bluefish;
var fish;
class Fish {
  constructor () {
    this.img = bluefish;
    this.x = 400;
    this.y = 300;
    this.speed = .5
    //or do  this.x = random(800);
    //       this.y = random(800);
    //      
  }
  moveFish() {
  this.x = this.x + this.speed;
    image(this.img, this.x, this.y);
  //this.speed = this.speed + -.5
}

changeDirection() {
  if (this.x > 450) {
    this.speed = -.5
  } else if (this.x < 350) {
    this.speed = .5
  }
}
 //run from shark
// if mouseY is within fish Y range
//if mouseX is within 60 pixels to the left or right of fishX
//move fishX 12 pixels (-12 or +12 pixels on x axis)

runAway() {
  if (dist(this.x, this.y, mouseX, mouseY) < 60) {
    this.x = this.x + 5;
  }
}
}
function setup() {
  createCanvas(1000, 800);
  deepblue = background(0, 50, 200);
  teal = background(0, 150, 180)
  bluegreen = background(0, 100, 140);
  frameRate(30);
  xtime = 1;
  GREEN = 50;
  image(bluefish, this.x, this.y);
  
    //bluefish
  fish = new Fish ()
  //this.img (this.x > 450 && this.x < 350)
  //bluefish placeholder
  //fill(255, 0, 200)
  //ellipse(fish1.x, fish1.y, 50, 50)
}
var bluefish; 
function preload() {
  bluefish = loadImage('bluefish.png');
}

function draw() {
  background(0, 50, 200);
   xtime++

  if (xtime > 0 && xtime <= 90) {
    background(0, 50, 200)
  } else if (xtime > 90 && xtime <= 180) {
    background(0, 100, 100)
  } else if (xtime > 180 && xtime <= 270) {
    background(0, 50, 200)
  } else {
    xtime = 1;
  }

  //seaweed 1
  noFill();
  strokeWeight(50)
  stroke(0, 200, 50);
  stroke(0, 200, 50);
  bezier(200, 150, 05, 120, 250, 400, 80, 999); //(, 85, 150, 05, 120, 90, 90, bottom x, y bottom 
  bezier(300, 250, 35, 220, 350, 500, 180, 999);
  bezier(590, 150, 424, 254, 673, 487, 512, 999);
  bezier(800, 150, 450, 254, 673, 487, 512, 999);
  bezier(950, 150, 600, 254, 900, 487, 500, 999);

  //sand
  fill(139, 90, 40);
  noStroke();
  ellipse(200, 800, 800, 100);
  ellipse(800, 800, 800, 100);
  
  //add some rocks



  
  fish.moveFish();
 fish.changeDirection();
  fish.runAway();


  //shark
   // image(shark, mouseX, mouseY);
  //shark placeholder
  // fill(255, 0, 0)
  //ellipse(mouseX, mouseY, 50, 50)



  console.log(xtime);

}


  
  
//moveFish: function() {
//   fish1.x = fish1.x + fish1.speed;
//   //fish1.speed = fish1.speed + -.5
// }

// let ocean = {
//   deepblue: {r: 0, g: 50, b:200}, 
//   teal: { r: 0, g: 150, b: 180},
//   bluegreen:{r: 0, g: 100, b: 140}

// }

// }

// // function preload() {
// //   // shark = loadImage('Assets/Fish/shark.png');
// //   bluefish = loadImage('Assets/Fish/bluefish.png');
// }


  
// }




var myFishes = [];

function setup() {
  createCanvas(600, 400);
  for(var i = 0; i < 100; i++) {
  myFishes.push (new Fish(i*20, i*20));
  }
}

function draw() {
  background(0);
  for (var i = 0; i < 100; i++) {
  myFishes[i].swim();
 
  } 
}

function mousePressed(){
    for (var i = 0; i < 100; i++) {
  if (myFishes[i].amINear(); < 10){
    print("Clicked on One");
    }
}
 }
class Circle {
  
constructor(){
    this.radius = random(30);
    this.x = random(width);
    this.y = random(height);
    
  }
    
 displayIt(){
   ellipse (this.x, this.y, this.radius, this.radius);
   this.x += random (-2,2);
   this.y += random (-2,2);
     
 }
  
}var myCircles = [];

function setup() {
  createCanvas(600, 400);
  for(var i = 0; i < 1000; i++) {
  myCircles.push (new Circle());
  }
}

function draw() {
  background(0);
  for (var i = 0; i < 400; i++) {
  myCircles[i].displayIt();
 
  } 
}

class Circle {
  
constructor(){
    this.radius = random(30);
    this.x = random(width);
    this.y = random(height);
    
  }
    
 displayIt(){
   ellipse (this.x, this.y, this.radius, this.radius);
   this.x += random (-2,2);
   this.y += random (-2,2);
     
 }
  
}// var shark;
class Fish {
  constructor () {
    this.img = bluefish;
    this.x random(800);
    this.y random(800);
    //or do this.x (400);
    //      this.y (300);
  }
	
}

var bluefish;


// move function under object
//moveFish: function() {
//   fish1.x = fish1.x + fish1.speed;
//   //fish1.speed = fish1.speed + -.5
// }

//bring runAway function here

// let ocean = {
//   deepblue: {r: 0, g: 50, b:200}, 
//   teal: { r: 0, g: 150, b: 180},
//   bluegreen:{r: 0, g: 100, b: 140}

}


var x = 0;
var xtime;
let fish1 = {
  x: 400,
  y: 300,
  speed: .5
}

function preload() {
  // shark = loadImage('Assets/Fish/shark.png');
  bluefish = loadImage('Assets/Fish/bluefish.png');
}

function setup() {
  createCanvas(1000, 800);
  deepblue = background(0, 50, 200);
  teal = (0, 150, 180)
  bluegreen = (0, 100, 140);
  frameRate(30);
  xtime = 1;
  GREEN = 50;
  
}

function draw() {
  background(0, 50, 200);
  
  xtime++

  // if (xtime > 0 && xtime <= 90) {
  //   background(deepblue)
  // } else if (xtime > 90 && xtime <= 180) {
  //   background(0, 100, 100)
  // } else if (xtime > 180 && xtime <= 270) {
  //   background(0, 50, 200)
  // } else {
  //   xtime = 1;
  // }

  //seaweed 1
  noFill();
  strokeWeight(50)
  stroke(0, 200, 50);
  stroke(0, 200, 50);
  bezier(200, 150, 05, 120, 250, 400, 80, 999); //(, 85, 150, 05, 120, 90, 90, bottom x, y bottom 
  bezier(300, 250, 35, 220, 350, 500, 180, 999);
  bezier(590, 150, 424, 254, 673, 487, 512, 999);
  bezier(800, 150, 450, 254, 673, 487, 512, 999);
  bezier(950, 150, 600, 254, 900, 487, 500, 999);

  //sand
  fill(139, 90, 40);
  noStroke();
  ellipse(200, 800, 800, 100);
  ellipse(800, 800, 800, 100);


  //fish1
  fill(255, 0, 200)
  //ellipse(fish1.x, fish1.y, 50, 50)
  image(bluefish, fish1.x, fish1.y)
  //(fish1.x > 450 && fish1.x < 350)

  moveFish();
  changeDirection();
  runAway();


  //shark
  fill(255, 0, 0)
  //ellipse(mouseX, mouseY, 50, 50)
  image(shark, mouseX, mouseY);


  console.log(xtime);

}

function moveFish() {
  fish1.x = fish1.x + fish1.speed;
  //fish1.speed = fish1.speed + -.5
}

function changeDirection() {
  if (fish1.x > 450) {
    fish1.speed = -.5
  } else if (fish1.x < 350) {
    fish1.speed = .5
  }
}
//run from shark
// if mouseY is within fish Y range
//if mouseX is within 60 pixels to the left or right of fishX
//move fishX 12 pixels (-12 or +12 pixels on x axis)

function runAway() {
  if (dist(fish1.x, fish1.y, mouseX, mouseY) < 60) {
    fish1.x = fish1.x + 5;
  }
}//grid 10 columns, 5 rows, mouseover fill with shade of grey
function setup() {
  createCanvas(1000, 500);
}

function draw() {
  background(0);
}var bubble = {
	x: 300,
	y:200, 
	display: function () {
	strokeWeight(4);
	stroke(255);
	noFill();
	ellipse(this.x, this.y, 24, 24);
		
},
	move: function() {
	this.x = this.x + random(-1,1);
	this.y = this.y + random(-1,1);
	}
	
	var bubble2 = {
	x: 400,
	y:100, 
	display: function () {
	strokeWeight(4);
	stroke(255);
	fill (255, 0, 200);
	ellipse(this.x, this.y, 30, 30);
},
	move: function() {
	this.x = this.x + random(-1,1);
	this.y = this.y + random(-1,1);
	}
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
	bubble.move();
	bubble.display();
	
	bubble2.move();
	bubble2.display();
	
}
	function setup() {
	//find the degrees of this angle 
	//var angle = degrees (PI/2);
	// print(angle);
	
	var km = milesToKm (26.3);
	print(km);
	var km2 = milesToKm(100);
	print(km2);
	

function milesToKm(miles) {
	var km = miles * 1.6;
	return km; 
	
}
}var ball = {
  x: 300,
  y: 200,
  xspeed: 4,
  yspeed: -3
}

function setup() {
  createCanvas(600, 400);
}
//draws ellipse
function draw() {
  background(0);
  move();
  bounce();
  display();

}

function move() {
    //moves it, changes its x by it's x speed
  //changes y by yspeed
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;
}

function bounce() {
  // inverts speed if it hits edges
  if (ball.x > width || ball.x < 0) {
    ball.xspeed = ball.xspeed * -1;
  }
  if (ball.y > height || ball.y < 0) {
    ball.yspeed = ball.yspeed * -1;
  }
}

function display() {
  strokeWeight(4);
  stroke(255);
  fill(255, 0, 200);
  ellipse(ball.x, ball.y, 24, 24);
}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  strokeWeight(2);
  stroke(255);

// for every x, make every y
// for (var x = 0; x <= width; x += 50) {
//  for (var y = 0; y <= height; y += 50) {
//     fill(random(255), 0, random(255));
//     ellipse(x, y, 25, 25);

//for x at 200 make every y, and for y at 200 make every x
for (var x = 0; x <= width; x += 50) {
    fill(random(255), 0, random(255));
    ellipse(x, 200, 25, 25);
  
   for (var y = 0; y <= height; y += 50) {
    fill(random(255), 0, random(255));
    ellipse(200, y, 25, 25);
 }
}
}//Move your rectangle from Question 1 
//towards the mouse. 
//Hint: Use mouseX + mouseY and 
//the dist() function.

//var d = int(dist(x1, y1, x2, y2));

function setup() {
  createCanvas(400, 400);
   rectMode(CENTER);
 
}

function draw() {
  background(0);
  strokeWeight(2);
  stroke(255);
  fill(255,0,0);
  rect(200,200,width/2,height/2);
  
}//3.  10 times faster?
function setup() {
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
  speed = 1;
}

function draw() {
  background(0);
  fill(255, 0, 200);
  //circle to the right
  ellipseMode(CENTER);
  ellipse(x, y , 100, 100);
  x = x + 1;
  
//OR you could do 
//  ellipse(x + speed, y , 100, 100);
//speed = speed + 10

  //circle to the left
  // ellipseMode(CENTER);
  // ellipse(x, y , 100, 100);
  // x = x - 1;

  //circle to top left
  // ellipseMode(CENTER);
  // ellipse(x, y, 100, 100);
  // x = x - 1;
  // y = y - 1;
  
      //circle to top right
  // ellipseMode(CENTER);
  // ellipse(x, y, 100, 100);
  // x = x + 1;
  // y = y - 1;
  
    //circle to bottom right
  // ellipseMode(CENTER);
  // ellipse(x, y, 100, 100);
  // x = x + 1;
  // y = y + 1;
  
        //circle to bottom left
  // ellipseMode(CENTER);
  // ellipse(x, y, 100, 100);
  // x = x - 1;
  // y = y + 1;
  
    //10 times faster on X
  // ellipseMode(CENTER);
  // ellipse(x, y , 100, 100);
  // x = x + 10;

     //10 times faster on Y
  // ellipseMode(CENTER);
  // ellipse(x, y , 100, 100);
  // y = y + 10;
}function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
}

function draw() {
  background(0);
  strokeWeight(2);
  stroke(255);
  fill(255,0,0);
  //first rectangle
  //rect(200,200,width/2,height/2);
  
  //second rectangle using vertex()
  beginShape(QUADS);
vertex(width/4, height/4);
vertex(width/4, height*3/4);
vertex(width*3/4,height*3/4);
vertex(width*3/4,height/4);
endShape();
  
}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  stroke(200);
  strokeWeight(4);
  noFill();

  if (mouseX > 300) {

    fill(255, 0, 200);
    ellipse(300, 200, 100, 100);
  } else if (mouseX > 150); {
    line(0, 0, width, height);
  } else if (mouseX > 350); {
  rect(300, 200, 25, 25);
  } else { 
  point(100, 100);
}
}var slider;
var x = 0;
var y = 0;

function setup() {
  createCanvas(600, 400);
  slider =  createSlider(0, 100, 50, 1);
  slider.position(20,20);
 slider.changed(ICantBelieveYouAlteredIt);
}

function draw() {
  background(220);
}
  function ICantBelieveYouAlteredIt (){
    print ("Yes they changed it" + slider.value());
}function setup() {
    createCanvas(800, 400);
    //colorMode(HSB);
    color = createSlider(0, 255, 0, 20);
    //slider = createSlider(0, 360, 60, 40);
    //slider.position(10, 10);
    //slider.style('width', '80px');

  }

  function draw() {
    clr = color.value();
    background(clr, 200);
    fill(128, 30, 100);
    ellipse(100, 200);
    //var val = slider.value();
    //background(val, 100, 100, 1);
  }function setup() {
  createCanvas(400, 400);
  var km = milesToKM(26.3)
  print(km);
  var km2 = milesToKm(100);
  print(km2);
}

function milesToKm(miles) {
  var km = miles * 1.6;
  return km;
}

function draw() {
  background(220);
}

//WHY is there an error?function setup() {
	createCanvas(600, 400);
}

function draw() {
	background(0);
	strokeWeight(4);
	stroke(255);

	var x = 0
	while ( x <= width) {
	fill(0, 200, 255);
	ellipse (x, 100, 25, 25);
	x = x +50;
		//x += 50
		//x = x + 1  is the same as x++
	}
	for (var x = 0; x <= width; x = x + 50) {
		fill(255, 0, 200);
		ellipse (x, 300, 25, 25);
	}
	

// initialization x= 0;
	// while (x <+ width){
	//x = x + 50;
}function setup() {
	createCanvas(600, 400);
}

function draw() {
	background(0);
	strokeWeight(4);
	stroke(255);

	var x = 0
	while ( x <= width) {
		
	ellipse (x, 200, 25, 25);
	x = x +50;
	}
	


}var on = false;

function setup() {
	createCanvas(600, 400);
}

function draw() {
	if (on) {
		background(2, 255, 0);
	} else {
		background(0);
	}

	stroke(255)
	strokeWeight(4);
	noFill();

		if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
		fill(255, 0, 200);
			}
	rectMode(CENTER);
	rect(300, 200, 100, 100);
}

function mousePressed() {
	if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250)
		on = !on;
	
}var on = false;

function setup() {
	createCanvas(600, 400);
}

function draw() {
	if (on) {
		background(2, 255, 0);
	} else {
		background(0);
	}

	stroke(255)
	strokeWeight(4);
	noFill();

	rectMode(CENTER);
	rect(300, 200, 100, 100);
}

function mousePressed() {
	if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250)
		if (on) {
			on = false;
		} else {
			on = true;
		}
}

// 	if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
// 			if (mouseIsPressed) {
// 		background(0, 255, 0);
// 	}
// 		fill(255, 0, 200);function setup() {
	createCanvas(600, 400);
}

function draw() {
	background(0);
	
stroke(255)
	strokeWeight(4);
	noFill();
	if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
			if (mouseIsPressed) {
		background(0, 255, 0);
	}
		fill(255, 0, 200);
	}

	rectMode(CENTER);
	rect(300, 200, 100, 100);

}function setup() {
	createCanvas(600, 400);
}

function draw() {
	background(0);
	stroke(255)
	strokeWeight(4);
	noFill();

	if (mouseX > 300 && mouseX < 400) {
		fill (255, 0, 200);
	}
	rect(300, 200, 100, 100);

}function setup() {
	createCanvas(600, 400);
}

function draw() {
	background(0);
	stroke(255)
	strokeWeight(4);
	noFill();

	if (mouseX > 250) {
		ellipse(300, 200, 100, 100);
			} else if (mouseX > 150) {
				rect(300, 200, 100, 100);
					} else if (mouseX > 50) {
						line(0,0, width, height);
	} else { 
		point(300, 200);
	}

} var x = 0;
 var speed = 3

function setup() {
	createCanvas(600, 400);
}

function draw() {
	background(0);
stroke(255)
	strokeWeight(4);
	noFill();
	ellipse(x, 200,100,100);
	if ( x > width || x < 0) {
	speed = speed * -1;
	}
	x = x + speed;

}//true is 1, false is 0
//if (boolean expression is true ) {
// this code should be executed
//} 
function setup() {
	createCanvas(600, 400);
}

function draw() {
	background(0);

	stroke(255)
	strokeWeight(4);
	noFill();

if (mouseX > 300) {
	fill(255, 0, 200);
}
	ellipse(300, 200,100,100);
}var spot = {
  x:100,
  y: 50,
};

var col = {
  r: 255,
  g: 0,
  b: 0
}

//NOTES
//var x = random(0, 50);
// random (min, max) range of floating point or decimal numbers
function setup() {
  createCanvas(600, 400);
  background(0);
}

function draw() {
  col.r = random(100, 255);
  col.g = 0;
  col.b = random(100, 190);
  spot.x = random(0,width);
  spot.y = random(0, height);
  noStroke();
  fill(col.r, col.g, col.b, 100);
  ellipse(spot.x, spot.y, 24, 24);
  //how do I make the circles pink when they reach 
//x=0 and green x=600
}var mouseX
var mouseY
var col = 0;
var r = 0;
var b = 255;
var g = 255

//mouseX has a range that goes between 0-600
function setup() {
  createCanvas(600, 400);
}

function draw() {
  r = map(mouseX, 0, 600, 0, 255);
  b = map(mouseX, 0, 600, 255, 0);
  background(r, 0, b);
  //range for background between 0-255 mapped to when mouse moves left 
  //to right where mouseX has a range of 0-600(canvas width)
  //ellipse

 
  fill(g, 0, b);
  g = map(mouseY, 0, 400, 0, 255)
  //r = map(mouseY, 0, 400, 0, 255);
  //b = map(mouseY, 0, 400, 255, 0);
  //fill = map(mouseY, 0, 400, 0, 255);
  //fill = map(mouseY, 0, 400, 255, 0);
  ellipse(mouseX, mouseY, 64, 64)


  //map(takes 5 arguments:  0-600 to map mouseX
  //0-255 col
  // map(value they have in common, min of current range, max of current range, 
  //min of new range, max of new range
  //map(mouseX, 0, 600, 0, 255);
  //assign result to variable col

  //print ("How can I change the ellipse color as the y changes?")
  //1answer -  I changed the fill from pink to  fill(b, 0, r);
}//javascript object notation for a circle
var circle1 = {
  x: 0,
  y: 200,
  diameter: 50
};

var circle2 = {
  x: 200,
  y: 50,
  diameter: 70
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

  //circle1
  fill(250, 200, 200);
  //dot notation circle.x instead of just x
  ellipse(circle1.x, circle1.y, circle1.diameter, circle1.diameter);
  circle1.x = circle1.x + 1;
  
    //circle2
  fill(200, 250, 200);
  ellipse(circle2.x, circle2.y, circle2.diameter, circle2.diameter);
  circle2.y = circle2.y + 1;
}var deepblue;
var teal
var bluegreen
var x = 0;
var xtime;
let fish1 = {
  x: 400,
  y: 300,
  speed: .5
}


function setup() {
  createCanvas(1000, 800);
  deepblue = background(0, 50, 200);
  teal = (0, 150, 180)
  bluegreen = (0, 100, 140);
  frameRate(30);
  xtime = 1;
  GREEN = 50;
}

function draw() {
  background(0, 50, 200);
  xtime++

  if (xtime > 0 && xtime <= 90) {
    background(0, 150, 180)
  } else if (xtime > 90 && xtime <= 180) {
    background(0, 100, 100)
  } else if (xtime > 180 && xtime <= 270) {
    background(0, 50, 200)
  } else {
    xtime = 1;
  }

  //seaweed 1
  noFill();
  strokeWeight(50)
  stroke(0, 200, 50);
  stroke(0, 200, 50);
  bezier(200, 150, 05, 120, 250, 400, 80, 999); //(, 85, 150, 05, 120, 90, 90, bottom x, y bottom 
  bezier(300, 250, 35, 220, 350, 500, 180, 999);
  bezier(590, 150, 424, 254, 673, 487, 512, 999);
  bezier(800, 150, 450, 254, 673, 487, 512, 999);
  bezier(950, 150, 600, 254, 900, 487, 500, 999);

  //sand
  fill(139, 90, 40);
  noStroke();
  ellipse(200, 800, 800, 100);
  ellipse(800, 800, 800, 100);


  //fish1
  fill(255, 0, 200)
  ellipse(fish1.x, fish1.y, 50, 50)
  //(fish1.x > 450 && fish1.x < 350)

  moveFish();
  changeDirection();
  runAway();


  //shark
  fill(255, 0, 0)
  ellipse(mouseX, mouseY, 50, 50)


  console.log(xtime);

}

function moveFish() {
  fish1.x = fish1.x + fish1.speed;
  //fish1.speed = fish1.speed + -.5
}

function changeDirection() {
  if (fish1.x > 450) {
    fish1.speed = -.5
  } else if (fish1.x < 350) {
    fish1.speed = .5
  }
}
//run from shark
// if mouseY is within fish Y range
//if mouseX is within 60 pixels to the left or right of fishX
//move fishX 12 pixels (-12 or +12 pixels on x axis)

function runAway() {
  if (dist(fish1.x, fish1.y, mouseX, mouseY) < 60) {
    fish1.x = fish1.x + 5;
  }
}var 
function setup() {
  createCanvas(600, 400);
   background(250, 250, 100);
}
//background
function draw() {
 

  //ellipse
  noStroke();
  fill(250, 200, 250, 50)
  ellipse(mouseX, mouseY, 25, 25);

  //rectangle
  // fill(200, 250, 200);
  // rect(400, 100, 50, 50);
} 
  //an event
  function mousePressed(){
 background(250, 250, 100);

}function setup() {
  createCanvas(600, 400);
   background(250, 250, 100);
}
//background
function draw() {
 

  //ellipse
  noStroke();
  fill(250, 200, 250, 50)
  ellipse(mouseX, mouseY, 25, 25);

  //rectangle
  // fill(200, 250, 200);
  // rect(400, 100, 50, 50);
} 
  //an event
  function mousePressed(){
 background(250, 250, 100);

}var x;
var y;
var directionX;
var directionY;
var speed;

function setup() {
	createCanvas(400, 400);
	x = width / 2
	y = 100;
	directionX = 1;
	directionY = 1;
	speed = 1;
	rectMode(CENTER);
}

function draw() {
	background(220);
	
	//ellipse(100, y, 20, 20);
	x = x + directionX * speed;

	if (x >= width) {
		directionX = -1;
		//speed++;
	}
	if (x <= 0) {
		directionX = 1;
		//speed++;
	}

	y = y + directionY * speed;
	if (y >= height) {
		directionY = -1;
		//speed++;
	}
	if (y <= 0) {
		directionY = 1;
		//speed++;
	}

	if (x >0 && x < 100 && y >0, y <100) {
		fill(255);
	} else {
		fill(0, 225, 0);
		}
		for( var i = 0; i < width; i = i + 150){
			if (x > i && x < i+10 && y > i && y < i+10) {
			}

	rect(i,i, 10, 10);
		}
	fill(255, 10, 20);
	ellipse(x, y, 20, 20);
	}var x;
var y;
var directionX;
var directionY;
var speed;

function setup() {
	createCanvas(400, 400);
	x = width / 2
	y = height/2
	//y = 100;
	directionX = 1;
	directionY = 1;
	speed = 10;
}

function draw() {
	background(220);
	ellipse(x, y, 20, 20);
	//ellipse(100, y, 20, 20);
	x = x + directionX*speed;

	if (x >= 400) {
		directionX = -1;
		speed++;
	}
		if (x <= 0) {
			directionX = 1;
			speed++;
		}
	
		y = y + directionY*speed;
		if (y >= 400) {
		directionY = -1;
		speed++;
	}
		if (y <= 0) {
			directionY = 1;
			speed++;
		}
	}var x;
var y;
var directionX;
var directionY;
var speed;

function setup() {
	createCanvas(400, 400);
	x = width / 2
	y = height/2
	//y = 100;
	directionX = 1;
	directionY = 1;
	speed = 10;
}

function draw() {
	background(220);
	ellipse(x, y, 20, 20);
	//ellipse(100, y, 20, 20);
	x = x + directionX*speed;

	if (x >= 400) {
		directionX = -1;
		speed++;
	}
		if (x <= 0) {
			directionX = 1;
			speed++;
		}
	
		y = y + directionY*speed;
		if (y >= 400) {
		directionY = -1;
		speed++;
	}
		if (y <= 0) {
			directionY = 1;
			speed++;
		}
	}var deepblue;
var teal
var bluegreen

function setup() {
  createCanvas(1000, 800);
  deepblue = background(0, 50, 200);
  teal = (0, 150, 180)
  bluegreen = (0, 100, 100);
  frameRate(30);
  xtime = 1
}

function draw() {
  background(0, 50, 200);
  xtime++

  if (xtime > 0 && xtime <= 90) {
    background(0, 150, 180)
  } else if (xtime > 90 && xtime <= 180) {
    background(0, 100, 100)
  } else if (xtime > 180 && xtime <= 270) {
    background(0, 50, 200)
} else {
  xtime = 1;
}
  //seaweed 1
noFill();
strokeWeight(50)
stroke(0, 200, 50);
stroke(0, 200, 50);
bezier(200, 150, 05, 120, 250, 400, 80, 999); //(, 85, 150, 05, 120, 90, 90, bottom x, y bottom 
bezier(300, 250, 35, 220, 350, 500, 180, 999);
  
console.log(xtime);  


//background (0, 50, 220);
//teal = (0, 150, 180, 80)
//bluegreen = (0, 100, 100)
//background(255);

//   from = color(0, 50, 200);

//   to = color(0, 150, 180);
//   c1 = lerpColor(from, to, .33);
//   c2 = lerpColor(from, to, .66);
//   for (var i = 0; i < 15; i++) {



}function setup() {
	createCanvas(900, 700);
	background(200);
}

function mousePressed() {
	print(mouseX,mouseY);
}

function draw() {

	beginShape();
	vertex(180, 82);
	vertex(207, 36);
	vertex(214, 63);
	vertex(407, 11)
	vertex(412, 30);
	vertex(219, 82);
	vertex(226, 109);
	endShape(CLOSE);

	// beginShape();
	// vertex(300, 150);
	// vertex(310, 75);
	// vertex(315, 95);
	// vertex(600, 20);
	// vertex(605, 50);
	// vertex(325, 150);
	// vertex(330, 130);
	// endShape(CLOSE);
}let positionX;
function setup() {
	createCanvas(400, 400);
	background(200, 10, 100);
	positionX = 50;
}

function draw() {
	fill(0, 100, 100, 60);
	//Makes the color black with the previous one slightly grey
	//fill(mouseX - pmouseX);
	//Makes the circle get bigger as you move it

	ellipse(positionX, 100, 20, 20);
	positionX = positionX + 20

function mousePressed() {
saveFrames('out', "jpg")
}
//function mouseDragged(){
}let xLocOfCircle;

function setup() {
	createCanvas(400, 400);
	background(200, 20, 150);
	xLocOfCircle = 100;
}

function draw() {
	ellipse(100, 100, xLocOfCircle, xLocOfCircle);
	//function mousePressed() {
	//xLocOfCircle = xLocOfCircle + 1;
	xLocOfCircle -= random(-10,10);
	//xLocOfCircle = xLocOfCircle + 300;

}let x_loc_of_circle

function setup() {
createCanvas(400,400);
}

function draw() {
//background(200);
ellipse(mouseX, 100,20,20);
//print(mouseX, mouseY);
}
function setup() {
	createCanvas(400, 400);
	background(200, 10, 100);
}

function draw() {
	fill(0, 100, 100, 60);
	//Makes the color black with the previous one slightly grey
	//fill(mouseX - pmouseX);
	//Makes the circle get bigger as you move it

	ellipse(mouseX, mouseY, mouseX, mouseY);

function mousePressed() {
saveFrames('out', "jpg")
}
//function mouseDragged(){
}//First code example
// by MaryAnn Talavera
//For ICM 
function setup() {
	createCanvas(800, 500);
	print("Sel-Portrait");
}

function draw() {
	background(255, 255, 255);

	//line(0, 50, 400, 300);

	//DR Flag top blue left
	fill(20, 0, 100);
	stroke(255, 255, 255);
	noStroke();
	rect(150, 100, 300, 200);

	//DR Flag bottom red left
	fill(150, 0, 15);
	stroke(255, 255, 255);
	noStroke();
	rect(150, 350, 300, 200);

	//DR Flag top red right
	fill(150, 0, 15);
	stroke(255, 255, 255);
	noStroke();
	rect(500, 100, 300, 200);

	//DR Flag bottom blue right
	fill(20, 0, 100);
	stroke(255, 255, 255);
	noStroke();
	rect(500, 350, 300, 200);


	//Face
	fill(130, 90, 80);
	stroke(255, 255, 255);
	noStroke();
	rect(345, 130, 250, 270, 120);

	//Eyebrows
	// noFill();
	// stroke(0);
	// bezier(250, 250, 0, 100, 100, 0, 100, 0, 0, 0, 100, 0);

	//Left Eye
	fill(92, 60, 51);
	stroke(255, 255, 255);
	noStroke();
	//strokeWeight(5);
	rect(400, 200, 50, 40, 20);

	//Left Iris
	fill(0);
	stroke(255, 255, 255);
	strokeWeight(1);
	rect(420, 213, 20, 15, 20);

	//Right Eye
	fill(92, 60, 51);
	stroke(255, 255, 255);
	noStroke();
	rect(500, 200, 50, 40, 20);

	//Right Iris
	fill(0);
	stroke(255, 255, 255);
	strokeWeight(1);
	rect(509, 213, 20, 15, 20);

	//Alternate mouth, couldn't figure out how to rotate
	// fill(255, 255, 255);
	// stroke(0);
	// arc(475210, 50, 80, 70, 0, PI + QUARTER_PI, CHORD);

	//lips by ziyu
	// top lip
	push();
	translate(0, 100);
	fill(222, 0, 100);
	noStroke();
	arc(450, 210, 50, 20, PI, 0);
	arc(500, 210, 50, 20, PI, 0);

	// bottom lip
	fill(190, 0, 120);
	noStroke();
	arc(475, 210, 100, 40, 0, PI);
	pop();

	//Nose
	fill(92, 60, 51);
	//stroke(255, 255, 255);
	//strokeWeight(1);
	noStroke();
	triangle(455, 250, 475, 260, 500, 250);

	//Hair Curl 1
	fill(0);
	stroke(0);
	strokeWeight();
	ellipse(320, 320, 80, 80);
	
		//Hair Curl 2
	stroke(0);
	strokeWeight();
	ellipse(300, 300, 80, 80);
	
			//Hair Curl 3
	stroke(0);
	strokeWeight();
	ellipse(315, 280, 80, 80);
	
				//Hair Curl 4
	stroke(0);
	strokeWeight();
	ellipse(317, 270, 80, 80);
	
				//Hair Curl 5
	stroke(0);
	strokeWeight();
	ellipse(321, 250, 80, 80);
	
	
				//Hair Curl 6
	stroke(0);
	strokeWeight();
	ellipse(330, 230, 70, 70);

	
		push();
	translate(0, 100);
	fill(0);
	noStroke();
	arc(475, 75, 200, 120, PI, 0);
	
			//push();
	// translate(0, 100);
	// fill(92, 60, 51);
	// noStroke();
	// arc(400, 25, 200, 80, PI, 100);
	
	
				//Hair Curl 6
	stroke(0);
	strokeWeight();
	ellipse(350, 100, 70, 70);
	
	
				//Hair Curl 7
	stroke(0);
	strokeWeight();
	ellipse(360, 80, 70, 90);
	
	
				//Hair Curl 6
	stroke(0);
	strokeWeight();
	ellipse(380, 65, 70, 70);
}

//First code example
// by MaryAnn Talavera
//For ICM 
function setup() {
	createCanvas(400, 300);
	print("Hello");
}

function draw() {
	background(220, 150, 220);

	line(0, 50, 400, 300);

	//pink box
	rectMode(CENTER);
	fill(200, 0, 100);
	stroke(255, 255, 255);
	strokeWeight(10);
	rect(175, 200, 150, 150);

	//first circle
	fill(0, 0, 100, 175);
	stroke(255, 255, 255);
	strokeWeight(5);
	ellipse(100, 100, 50, 50);

	//circle with no stroke
	// You can comment out a function name like the stroke to use later
	//stroke(255, 255, 255);
	fill(0, 0, 100, 175);
	stroke(255, 255, 255);
	noStroke();
	ellipse(245, 100, 50, 50);
}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(150);
	fill(255, 0, 0);
	stroke(0, 240, 100);
	strokeWeight(4);
	ellipse(200, 150, 40, 40);
	fill(255, 0, 255);
	stroke(0, 0, 255);
	strokeWeight(2);
	triangle(50, 75, 58, 20, 86, 75);
}