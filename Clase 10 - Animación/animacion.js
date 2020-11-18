let terza = document.querySelector("#terza");

function cambiarColor() {
  terza.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
}
// setInterval> ejecuta una función cada cierto tiempo. El tiempo se debe escribir en milisegundos
let x = 0;
let dX = 10;
let angle = 0;
let dAngle = 5;
function mover() {
  x = x + dX;
  angle = angle + dAngle;
  terza.style.transform = `translate(${x}px) rotate(${angle}deg)`;
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