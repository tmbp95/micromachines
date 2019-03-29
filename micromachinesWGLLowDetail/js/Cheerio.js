class Cheerio extends GameElement {
    constructor() {
        'use strict';
        super();
        this.speed = new MyVector(0,0,0);
        this.speedmodule = 0;
        this.volumeRadius = 2.5;
    }

    collisionDealer() {
        'use strict';
        if(this.collidedSides) this.KIA = true;
        if(this.collidedTB) this.KIA = true;
    }
}

function createCheerio(posx,posz) {

    var cheerio_aux = new Cheerio();
    var s_material_cheerio ;
    var geometry = cheerioDraw(cheerio_aux, 5, 2, 10,10, s_material_cheerio, 4, 7, 0, Math.PI/2);

    cheerio_aux.position.x = posx;
    cheerio_aux.position.y = -3.0;
    cheerio_aux.position.z = posz;

    scene.add(cheerio_aux);

    return cheerio_aux;
}

var cheerioDraw  = function(obj, beg, wid, len, top, mat, xpos, zpos, ypos, rotY, rotz=0) {
      var geometry = new THREE.TorusGeometry( beg, wid, len, top );
      
      var cheerio = new THREE.Mesh( geometry, materialcheerio );
      cheerio.castShadow = true;
      cheerio.position.x = xpos;
      cheerio.position.y = ypos;
      cheerio.position.z = zpos;
      cheerio.rotateX(Math.PI/2);
      obj.add( cheerio );
}
