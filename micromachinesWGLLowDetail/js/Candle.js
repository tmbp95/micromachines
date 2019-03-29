class Candle extends GameElement {
    constructor() {
        'use strict';
        super();
        this.speed = new MyVector(0,0,0);
        this.volumeRadius = 0;
    }

    collisionDealer() {
        'use strict';
        if(this.collidedSides) this.KIA = false;
        if(this.collidedTB) this.KIA = false;
    }

}

function createCandleStick(posx,posz) {
    'use strict';
    var b_material = matManager.getCurrentMaterial(B_YELLOW);
    var candle_aux = new Candle();
    var geometry = new THREE.CylinderGeometry( 1, 1, 15, 15 );

    createPart(candle_aux, 0, 0, 0, false, false, 1, b_material, geometry,  "textures/car.jpg" );
    
    candle_aux.position.x = posx;
    candle_aux.position.y = 0;
    candle_aux.position.z = posz;

    scene.add(candle_aux);

    return candle_aux;
}
