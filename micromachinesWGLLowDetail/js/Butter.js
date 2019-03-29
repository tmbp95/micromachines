class Butter extends GameElement {
    constructor() {
        'use strict';
        super();
        this.speed = new MyVector(0,0,0);
        this.speedmodule = 0;
        this.volumeRadius = 10;
    }

    collisionDealer() {
    	'use strict';
        if(this.collidedSides) this.KIA = true;
        if(this.collidedTB) this.KIA = true;
    }
}

function createButter(posx,posz) {

    var b_material = matManager.getCurrentMaterial(B_YELLOW);
    var butter_aux = new Butter();
    var geometry = new THREE.CubeGeometry( 20, 10, 20);

    createPart(butter_aux, 0, 0, 0, false, false, 1, b_material, geometry,  "textures/butter.jpg" );
    butter_aux.position.x = posx;
    butter_aux.position.y = -5;
    butter_aux.position.z = posz;

    scene.add(butter_aux);

    return butter_aux;
}
