import {IMAGES as images} from './initialize.js'
import {ctx, drawObj, run, start, dT} from './initialize.js'

// CREACIón del objeto balón
// PROPIEDADES> x, y, vX, vY, r, imagen
// METODOS> dibujarse

// console.log(images)
let balon = {
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
        ctx.stroke();
        ctx.fill();
    },
    moverse:function(){
        this.x = this.x + this.vX * dT/1000;
        this.y = this.y + this.vY * dT/1000;
    }

}

// Puedo crear un objeto apartir del objeto balon
let balon2 = Object.create(balon)
balon2.x = 0;
balon2.y = 0;
balon2.vX = 10;
balon2.vY = 10;
drawObj.draw =  function(){
    ctx.clearRect(0, 0, 400, 400);
    balon.dibujarse();
    balon2.dibujarse()
    balon.moverse();
    balon2.moverse();
}
run()