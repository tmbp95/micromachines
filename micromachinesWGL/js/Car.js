class Car extends GameElement {

    constructor() {
    	'use strict';
        super();
        this.accelM = 0.0005;
        this.speed = new MyVector(0,0,0);
        this.speedmodule = 0;
        this.direction = new MyVector(1,0,0);
        this.volumeRadius = 5;
        this.lives = 3;
    }


    collisionDealer(obj) {
    	'use strict';
        if (obj instanceof Butter) {
            obj.speedmodule = this.speedmodule;
            obj.direction.x = this.direction.x;
            obj.direction.y = this.direction.y;
            obj.direction.z = this.direction.z;
            this.speedmodule = 0;
        }else if(obj instanceof Cheerio){
            obj.speedmodule = this.speedmodule;
            obj.direction.x = this.direction.x;
            obj.direction.y = this.direction.y;
            obj.direction.z = this.direction.z;
            this.speedmodule = 0;
        }else{
            if (obj instanceof ORANGE) {
                this.lives--;
                // hud.carDied();
                this.speed = new MyVector(0,0,0);
                front = false;
                back = false;
                this.posAttempt = new MyVector(-100,-4.95,-260);
                this.direction = new MyVector(1,0,0);
                this.speedmodule = 0;
                var atualAngle = this.sum_steer_angle;
                this.sum_steer_angle = 0;
                this.rotateY(atualAngle);
                this.speedmodule = 0;
                front = false;
                back = false;
                left = false;
                right = false;
                if (this.lives == 0) this.KIA = true;
            }
        	else if (this.collidedSides) {
                this.lives--;
                // hud.carDied();
                this.speed = new MyVector(0,0,0);
                front = false;
                back = false;
                this.posAttempt = new MyVector(-100,-4.95,-260);
                this.direction = new MyVector(1,0,0);
                var atualAngle = this.sum_steer_angle;
                this.sum_steer_angle = 0;
                this.rotateY(atualAngle);
                this.speedmodule = 0;
                front = false;
                back = false;
                left = false;
                right = false;
                if (this.lives == 0) this.KIA = true;
                this.collidedSides = false;
                this.collidedTB = false;
        	}
            else if (this.collidedTB) {
                this.lives--;
                // hud.carDied();
                this.speed = new MyVector(0,0,0);
                front = false;
                back = false;
                this.posAttempt = new MyVector(-100,-4.95,-260);
                this.direction = new MyVector(1,0,0);
                var atualAngle = this.sum_steer_angle;
                this.sum_steer_angle = 0;
                this.rotateY(atualAngle);
                this.speedmodule = 0;
                front = false;
                back = false;
                left = false;
                right = false;
                if (this.lives == 0) this.KIA = true;
                this.collidedTB = false;
                this.collidedSides = false;
        	}
            this.resetCollisions();
        }
    }

    getLives(){
        return this.lives;
    }

}

function createMainBody(obj){
    var objectLoader = new THREE.ObjectLoader();
    objectLoader.load("textures/car/car.json", 
        function ( object ) { //onload
            obj.add( object );
        }
    );
}


    function createCar(xi, yi, zi) {
        'use strict';

        var car_aux = new Car();

        var x=0, y=0, z=0;
        createMainBody(car_aux);
        car_aux.position.x = xi;
        car_aux.position.y = yi;
        car_aux.position.z = zi;

        car_aux.scale.set(2.0,1.5,1.5)
        car_aux.rotateY(Math.PI/2);

        scene.add(car_aux);
        car_aux.carReady = true;

        return car_aux;
    }

/*
    function poligon_createWindow(obj, mat){
        var geom = new THREE.CylinderGeometry( 1.8, 1.8, 4, 30 );
        mat = new THREE.MeshLambertMaterial({color: 0x66CCCC, transparent: true, opacity: 0.5});
        var part = new THREE.Mesh( geom, mat );
        part.position.x = 0;
        part.position.y = 1.5;
        part.position.z = -3;
        part.rotateZ(Math.PI/2);
        obj.add(part);
    }
    function poligon_createMainBody(obj, mat){
        var texture =  new THREE.TextureLoader().load( "textures/car2.jpeg" );
        texture.repeat.set(0.5, 0.5);
        texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;

        var geom = new THREE.CubeGeometry(4,2, 8);
        var material = new THREE.MeshPhongMaterial( { map: texture, ambient: 0x050505, color: mat.color, specular: 0x555555, shininess: 30 } );
        var part = new THREE.Mesh( geom, material );

        part.position.x = 0;
        part.position.y = 1;
        part.position.z = -3.0;

        obj.add(part);
    }
    function createCar(xi, yi, zi) {
        'use strict';
        var car_aux = new Car();
        var x=0, y=0, z=0;
        var s_material_bluegreen = matManager.getCurrentMaterial(S_BGREEN);
        var s_material_orange = matManager.getCurrentMaterial(S_ORANGE);
        var s_material_darkgrey = matManager.getCurrentMaterial(S_DARKGREY);
        var s_material_grey = matManager.getCurrentMaterial(S_GREY);
        poligon_createMainBody(car_aux, s_material_orange);
        torusDraw(car_aux, 0.5, 0.25, 30 ,30, s_material_darkgrey, 2, 0, 0, Math.PI/2);
        torusDraw(car_aux, 0.5, 0.25, 30 ,30, s_material_darkgrey, 2, -6, 0, Math.PI/2);
        torusDraw(car_aux, 0.5, 0.25, 30 ,30, s_material_darkgrey, -2, 0, 0, Math.PI/2);
        torusDraw(car_aux, 0.5, 0.25, 30 ,30, s_material_darkgrey, -2, -6, 0, Math.PI/2);
        poligon_createWindow(car_aux,s_material_bluegreen);
        car_aux.position.x = xi;
        car_aux.position.y = yi;
        car_aux.position.z = zi;
        car_aux.scale.set(1.5,1.5,1.5)
        car_aux.rotateY(Math.PI/2);
        scene.add(car_aux);
        return car_aux;
    }
    var torusDraw  = function(obj, beg, wid, len, top, mat, xpos, zpos, ypos, rotY, rotz=0) {
      var geometry = new THREE.TorusGeometry( beg, wid, len, top );
      var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: mat.color, specular: 0x555555, shininess: 30 } );
      var torus = new THREE.Mesh( geometry, material );
      torus.position.x = xpos;
      torus.position.y = ypos;
      torus.position.z = zpos;
      torus.rotateY(rotY);
      torus.rotateZ(rotz);
      obj.add( torus );
    }
*/
