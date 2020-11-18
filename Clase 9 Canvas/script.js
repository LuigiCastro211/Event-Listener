let canvas = document.querySelector("#canvas1");
let ctx = canvas.getContext("2d");
function circulo(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, true);
  ctx.fill();
  ctx.stroke();
}
function rectangulo(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fill();
  ctx.stroke();
}
// Eventos en javascript
// event listener
// Event listener para cuando se haga click en el canvas
// el evento se puede pasar como un argumento a la función que se ejecuta al hacer click
canvas.onclick = function (evento) {
  ctx.fillStyle = "rgba(255,100,100,0.7)";
  circulo(evento.offsetX - 10, evento.offsetY, 15);
  circulo(evento.offsetX + 10, evento.offsetY, 15);
  circulo(evento.offsetX, evento.offsetY - 10, 15);
  circulo(evento.offsetX, evento.offsetY + 10, 15);
  ctx.fillStyle = "yellow";
  circulo(evento.offsetX, evento.offsetY, 8);

  //   console.log(evento);
  //   console.log(
  //     `Se hizo click en el canvas en las coordenadas ${evento.clientX}, ${evento.clientY} con respecto a la esquina superior izquierda de la pagina`
  //   );
  //   console.log(
  //     `Se hizo click en el canvas en las coordenadas ${evento.offsetX}, ${evento.offsetY} con respecto a la esquina superior izquierda del canvas`
  //   );
};

// Para borrar todo:
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// eventos al presionar una tecla
// al inicio creo un circulo en el centro
let x = 200;
let y = 200;
let puntaje = 0;
circulo(x, y, 15);
document.onkeydown = function (evento) {
  if (evento.key == "w") {
    clear();
    y = y - 10;
    circulo(x, y, 15);
  }
  if (evento.key == "s") {
    clear();
    y = y + 10;
    circulo(x, y, 15);
  }
  
  if (evento.key == "a") {
    clear();
    x = x - 10;
    circulo(x, y, 15);
  }
  if (evento.key == "d") {
    clear();
    x = x + 10;
    circulo(x, y, 15);
  }
  if ((y < 15 && y > 0) || (y > 385 && y < 400) || (x < 15 && x > 0) || (x > 385 && y < 400)) {
    puntaje += 1;
    document.querySelector("#puntaje").innerHTML = puntaje;
  }
  
};