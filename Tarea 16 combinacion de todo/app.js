'use strict'
import {GAME} from './initialize.js'

// CREACIón del objeto balón
// PROPIEDADES> x, y, vX, vY, r, imagen
// METODOS> dibujarse, moverse

class Balon {
    constructor(x, y, vX, vY, r, angle, w)
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vX = vX;
        this.vY = vY;
        this.angle = angle;
        this.w = w;//angular velocity
        this.imagen = GAME.images.soccerBall;
    }

    dibujarse(){
        // console.log(this.imagen)
        
        GAME.drawRotatedImage(this.imagen, this.x, this.y,this.angle, 2*this.r, 2*this.r);
    }
    moverse(){
        this.x = this.x + this.vX * GAME.dT/1000;
        this.y = this.y + this.vY * GAME.dT/1000;
        this.angle = this.angle + this.w * GAME.dT/1000;
    }
}

class Nave{
    constructor(x, y,speed, width, height, angle)
    {
        this.x = x;
        this.y = y;
        this.vX;
        this.vY;
        this.speed = speed
        this.angle = angle;
        this.width = width;
        this.height = height;
        this.imagen = GAME.images.spaceShip;
        this.enMovimiento = false;
        this.enReversa = false;
    }

    dibujarse(){
        
        GAME.drawRotatedImage(this.imagen, this.x, this.y,this.angle+90, this.width, this.height);
    }
    moverse(){
        this.vX = this.speed*Math.cos(this.angle*Math.PI/180);
        this.vY = this.speed*Math.sin(this.angle*Math.PI/180);
        if (this.enMovimiento)
        {
            if(this.enReversa){
                this.x -= this.vX * GAME.dT/1000;
                this.y -= this.vY * GAME.dT/1000;
            }
            else{
                this.x += this.vX * GAME.dT/1000;
                this.y += this.vY * GAME.dT/1000;
            }
        }
    }
}

GAME.setup = function(){
    GAME.objects ={balones:[], player:new Nave(200, 200, 30, 30,50,0)}
    GAME.score = 0;
    GAME.nitros = 4;
    GAME.tiempoTotal = 20000;// 20 seconds
    GAME.tiempoRestante = GAME.tiempoTotal;// 20 seconds
    GAME.initialTime = window.performance.now();
}

function mostrarPuntaje(){
    GAME.ctx.font = "30px Arial";
    GAME.ctx.fillStyle = "black"
    GAME.ctx.fillText(`Puntaje: ${GAME.score}`, 10, 50);
    GAME.ctx.font = "20px Arial";
    GAME.ctx.fillText(`Nitro: ${GAME.nitros}`, 10, 80);
}
function mostrarTiempo() {
    // console.log(GAME.initialTime)
    // console.log(window.performance.now())
    GAME.ctx.font = "20px Arial";
    GAME.ctx.fillStyle = "black"
    GAME.ctx.fillText(`Tiempo: ${Math.round(GAME.tiempoRestante/1000)}`, 10, 100);
}
function colisionConNave(balon)
{
    // console.log(balon.r, GAME.objects.player.width, balon.x,GAME.objects.player.x, balon.y,GAME.objects.player.y )
    let distancia = Math.sqrt(Math.pow(balon.x - GAME.objects.player.x, 2) + Math.pow(balon.y - GAME.objects.player.y, 2));
    if (distancia < balon.r + GAME.objects.player.width/2) return true;
    else return  false;
}
function buscarColisiones()
{
    let colisiones = []
    for (let i=0; i < GAME.objects.balones.length; i++){
        if(colisionConNave(GAME.objects.balones[i])) colisiones.push(i);
    }
    return colisiones;
}


function algunaSeSalio(){
    for (let balon of GAME.objects.balones){
        // se salió?
        if(balon.x >= 400 + balon.r || balon.x <= -balon.r ||
            balon.y >= 400 + balon.r || balon.y <= -balon.r )
        {
            return true;
        }
    }
    return false;
}
function quitarBalones(colisiones) {
    for(let pos of colisiones){
        // splice quita elementos de un array.
        GAME.objects.balones.splice(pos, 1);
    }
}
function resetSpeed() {
    GAME.objects.player.speed = 15;
}
GAME.draw =  function(){
    GAME.ctx.clearRect(0,0,400,400);
    let elapsedT = window.performance.now() - GAME.initialTime;
    GAME.tiempoRestante = GAME.tiempoTotal - elapsedT;
    // console.log(GAME.objects)
    if (GAME.score >= 10){
        // detener el juego
        GAME.pause();
        // muestre el mensaje de que ganó
        GAME.ctx.font = "50px Arial";
        GAME.ctx.fillStyle = "green";
        GAME.ctx.fillText(`GANASTE`, 80, 180);
    }
    // Si alguna de las particulas se salió, y aún no tiene 10 puntos
    // pierde
    if ( algunaSeSalio() || GAME.tiempoRestante < 0 ){
        // detener el juego
        GAME.pause();
        // muestrar el mensaje de que perdio
        GAME.ctx.font = "50px Arial";
        GAME.ctx.fillStyle = "red";
        GAME.ctx.fillText(`PERDISTE`, 80, 180);
    }
    mostrarPuntaje();
    mostrarTiempo();
    for (let balon of GAME.objects.balones){
        // console.log(balon);
        balon.dibujarse();
        balon.moverse();
    }
    // console.log(player)
    GAME.objects.player.dibujarse();
    GAME.objects.player.moverse();
    // buscar colisiones devuelve una lista con los índices de los balónes con los cuales la nave chocó
    let colisiones = buscarColisiones();
    // Se quitan los balones de la lista de balones cuando la nave los toca
    quitarBalones(colisiones);
    // Se suman los puntos correspondientes
    GAME.score += colisiones.length;
}

GAME.start();

function crearParticula(){

    let ang = 2 * Math.PI * Math.random();
    let newX = 50 + 300 *Math.random()
    let newY = 50 + 300 *Math.random()
    let nuevoBalon = new Balon(newX, newY,10 * Math.cos(ang), 10 * Math.sin(ang), 15, 0, 360);

    // añado el nuevo balón al array de balones
    GAME.objects.balones.push(nuevoBalon);
}

// Al hacer click se va a ejecutar la función crear partícula
GAME.canvas.onclick = crearParticula


function teclaPresionada(e){
    console.log(e.code)
    if (e.code =='Space')
    {
        console.log(e.shiftKey)
        if(e.shiftKey) GAME.reset();
        else{
            if (GAME.running) GAME.pause();
            else GAME.play();
        }

    }
    if (e.code == 'KeyW')
    {
        GAME.objects.player.enMovimiento = true
        // console.log('arrancar')
    }
    if (e.code == 'KeyS')
    {
        GAME.objects.player.enMovimiento = true;
        GAME.objects.player.enReversa = true;
        // console.log('moverse hacia atras')
    }
    if (e.code == 'KeyE')
    {
        if (GAME.nitros > 0)
        {
            console.log("increasing speed")
            GAME.objects.player.speed = 80;
            GAME.nitros -= 1;
            window.setTimeout(resetSpeed, 1000);
        }
        // console.log('arrancar')
    }
    // console.log(e.code)
}
function teclaLevantada(e)
{
    if (e.code == 'KeyW')
    {
        GAME.objects.player.enMovimiento = false;
        // console.log('detenerse')
    }
    if (e.code == 'KeyS')
    {
        GAME.objects.player.enMovimiento = false;
        GAME.objects.player.enReversa = false;
        // console.log('detener el movimiento hacia atrás')
    }
}
document.onkeydown = teclaPresionada;
document.onkeyup = teclaLevantada;

function mouseMovido(e){
    let newAng = Math.atan((e.offsetY - GAME.objects.player.y)/(e.offsetX - GAME.objects.player.x))* 180/Math.PI;
    if (e.offsetX < GAME.objects.player.x) newAng += 180
    GAME.objects.player.angle = newAng;
    // console.log(newAng)w
}
document.onmousemove = mouseMovido;
