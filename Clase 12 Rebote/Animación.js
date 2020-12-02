let canvas = document.querySelector("#miCanvas");
let ctx = canvas.getContext("2d");

function loadImages(sources, callback) {
  let images = {};
  let loadedImages = 0;

  let numImages = Object.keys(sources).length;

  for (let src in sources) {
    images[src] = new Image();
    images[src].onload = function () {
      loadedImages++;
      if (loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}
var sources = {
  darthVader:
    "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg",
  yoda: "http://www.html5canvastutorials.com/demos/assets/yoda.jpg",
  soccerBall:
    "https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg",
};
let x = 50;
let y = 60;
let vX = 50;
let vY = 75;
let dT = 0.03;

function draw(images) {
  
  x = x + vX * dT; // 50 + 10*0.03 = 50.3
  y = y + vY * dT; // 50 + 10*0.03 = 50.3
  
  if (300 - y < 15) vY = -vY;
  
  if (600 - x < 15) vX = -vX;
  
  if (y - 0 < 15) vY = -vY;
  ctx.clearRect(0, 0, 600, 300);
  
  if (x - 0 < 15) vX = -vX;
  ctx.drawImage(images.soccerBall, x - 15, y - 15, 30, 30);

}
// La variable images contiene las imagenes cargadas
function run(images) {
  
  window.setInterval(function () {
    draw(images);
  }, 20);
  
}

loadImages(sources, run);

