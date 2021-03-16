import {canvas, IMAGES as images} from './initialize.js'
import {ctx, drawObj, run, start, dT} from './initialize.js'
import {GAME} from './initialize.js'
// CREACIón del objeto balón
// PROPIEDADES> x, y, vX, vY, r, imagen
// METODOS> dibujarse, moverse

// Creo un array para almacenar todas las particulas
let balones = []

// console.log(images)
let puntaje = 0 

let Balon = {
    //PROPIEDADES
    x:200,
    y:200,
    r:15,
    vX: 50,// px por segundo
    vY: -50,
    // imagen: undefined,
    //METODOS
    dibujarse:function(){
        // ctx.drawImage(this.imagen, this.x-this.r, this.y-this.r, 2*this.r, 2*this.r);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 2*Math.PI, 0);
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.stroke();
        ctx.fill();
    },
    moverse:function(){
        this.x = this.x + this.vX * dT/1000;
        this.y = this.y + this.vY * dT/1000;
        
        if ( 0 - this.y < 5) this.vY = -this.vY
        if ( 400 - this.x < 5) this.vX = -this.vX
        if (this.y - 0 ) this.vY = -this.vY
        if ( 400 - this.y < 5) this.vY = -this.vY
        if (this.x - 0 ) this.vX = -this.vX
        if ( 0 - this.x < 5) this.vX = -this.vX

    }

}
let player = {
        //PROPIEDADES
        x:200,
        y:200,
        r:15,
        vX: 50,// px por segundo
        vY: -50,
        enMovimiento : false,
        direccion : "derecha", 

        // imagen: undefined,

        //METODOS
        dibujarse:function(){
            // ctx.drawImage(this.imagen, this.x-this.r, this.y-this.r, 2*this.r, 2*this.r);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 2*Math.PI, 0);
            ctx.fillStyle = "rgba(100,0,0,1)"
            ctx.stroke();
            ctx.fill();
        },
        moverse(){
            if (this.enMovimiento)
            {
                if(this.direccion == "izquierda"){
                    this.x -= 50 * 30/1000;
                    this.y -= 0 * 30/1000;
                }
                if(this.direccion == "derecha"){
                    this.x += 50 * 30/1000;
                    this.y -= 0 * 30/1000;
                }
                if(this.direccion == "abajo"){
                    this.x -= 0 * 30/1000;
                    this.y += 50 * 30/1000;
                }
                if(this.direccion == "arriba"){
                    this.x -= 0 * 30/1000;
                    this.y -= 50 * 30/1000;
                }
            }
        }
    }
    
drawObj.draw =  function(){
    ctx.clearRect(0, 0, 400, 400);
    for (let balon of balones){
        // console.log(particula)
        balon.dibujarse()
        balon.moverse()
    }
    player.dibujarse()
    // balon.dibujarse();
    // balon2.dibujarse()
    // balon.moverse();
    // balon2.moverse();
    player.moverse ()
    let colisiones = []
    for (let i=0; i < balones.length; i++){
        if(colisionConBalon(balones[i])) colisiones.push(i);
    }
    if (colisiones.length > 0)  {
        GAME.pause();
        // muestrar el mensaje de que perdio
        ctx.font = "50px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(`PERDISTE`, 80, 180);
    }
}
run()

function crearParticula(evento){
    let nuevoBalon = Object.create(Balon)
    console.log(evento)
    nuevoBalon.x = evento.offsetX
    nuevoBalon.y = evento.offsetY
    // Genero el angulo de manera aleatoria
    // Math.random genera un numero aleatorio entre 0 y 1
    let ang = 2 * Math.PI * Math.random()
    let v = Math.random() * 100
    nuevoBalon.vX = v * Math.cos(ang)
    nuevoBalon.vY = v * Math.sin(ang)

    // añado el nuevo balón al array de balones
    balones.push(nuevoBalon)
    console.log(balones) 
    GAME.score += 100

    puntaje = puntaje + 100 
    {
    ctx.font = "30px Arial";
    ctx.fillStyle = "black"
    ctx.fillText(`Puntaje: ${GAME.puntaje}`, 10, 50);
    }
}

// Al hacer click se va a ejecutar la función crear partícula
canvas.onclick = crearParticula 
// Ejecutar una función cuando se presione una tecla, esa función debe mirar cual tewcla se presionó
// Dependiendo de la tecla pone que la dirección de movimiento del jugador es diferente,
// Cuando mantenda presionada la tecla enmovimiento sea true
// Ejecutar una funcion cuando se levante una tecla. Si la tecla que se levanto es "w" "a" "s" "d" que enMovimiento = false

function teclaPresionada(e){
    // console.log(e.code)
    // if (e.code =='Space')
    // {
    //     console.log(e.shiftKey)
    //     if(e.shiftKey) GAME.reset();
    //     else{
    //         if (GAME.running) GAME.pause();
    //         else GAME.play();
    //     }
 
    // }
    if (e.code == 'KeyW')
    {
        player.enMovimiento = true;
        player.direccion = "arriba";
    }
    if (e.code == 'KeyD')
    {
        player.enMovimiento = true;
        player.direccion = "derecha";
    }
    if (e.code == 'KeyS')
    {
        player.enMovimiento = true;
        player.direccion = "abajo";
    }
    if (e.code == 'KeyA')
    {
        player.enMovimiento = true;
        player.direccion = "izquierda";
    }
}
function teclaLevantada(e)
{
    if (e.code == 'KeyW')
    {
        player.enMovimiento = false;
    }
    if (e.code == 'KeyD')
    {
        player.enMovimiento = false;
    }
    if (e.code == 'KeyS')
    {
        player.enMovimiento = false;
    }
    if (e.code == 'KeyA')
    {
        player.enMovimiento = false;
    }
}
window.onkeydown = teclaPresionada; 
window.onkeyup = teclaLevantada; 


function colisionConBalon(balon)
{
    // console.log(balon.r, player.r, balon.x, player.x, balon.y, player.y )
    let distancia = Math.sqrt(Math.pow(balon.x - player.x, 2) + Math.pow(balon.y - player.y, 2));
    if (distancia < balon.r + player.r) {
       console.log ("choque")
        return true;  
    } 
    else return  false;
}




