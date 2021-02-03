import {canvas, IMAGES as images} from './initialize.js'
import {ctx, drawObj, run, start, dT} from './initialize.js'

// CREACIón del objeto balón
// PROPIEDADES> x, y, vX, vY, r, imagen
// METODOS> dibujarse, moverse

// Creo un array para almacenar todas las particulas
let balones = []

// console.log(images)
let puntaje = 0; 

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
    }

}

drawObj.draw =  function(){
    ctx.clearRect(0, 0, 400, 400);
    for (let balon of balones){
        // console.log(particula)
        balon.dibujarse()
        balon.moverse()
    }
    // balon.dibujarse();
    // balon2.dibujarse()
    // balon.moverse();
    // balon2.moverse();
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
}

// Al hacer click se va a ejecutar la función crear partícula
canvas.onclick = crearParticula 

