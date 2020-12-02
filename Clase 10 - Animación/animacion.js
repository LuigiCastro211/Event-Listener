let terza = document.querySelector("#terza");
let nombre = document.querySelector("#Luis");

function cambiarColor() {
  terza.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  nombre.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
}
// setInterval> ejecuta una función cada cierto tiempo. El tiempo se debe escribir en milisegundos
let x = 0;
let y = 0;
let dX = 15;
let dY = 5;
let angle = 0;
let dAngle = 5;
let t = 0;
let x2 = 10;
let y2 = 500;
let y20 = 449;
let vX = 0.1;
let vY = 1;

function mover(){
  {
    x = x + dX;
    y = y +dY;
    angle = angle + dAngle;
    terza.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
  }
  {
  t+= 0.1;
  x2 = x2 + vX*t;
  y2 = y20 + vY*t + (9.8*Math.pow(t,2))/2;
  angle = angle + dAngle;
  nombre.style.transform = `translate(${x2}px, ${y2}px) rotate(${angle}deg)`
  }

}

let idMovimiento;
let idColor;
let corriendo = false;
function start() {
  corriendo = true;
  idMovimiento = window.setInterval(mover, 100);
  idColor = window.setInterval(cambiarColor, 30);
}
function stop() {
  corriendo = false;
  window.clearInterval(idMovimiento);
  window.clearInterval(idColor);
}
window.onkeydown = function (evento) {
  if (evento.key == "w") {
    if (corriendo) stop();
    else start();
  }
};