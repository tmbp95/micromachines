class GameElement extends THREE.Object3D {

    constructor() {
    	'use strict';
        super();
        this.accel = new MyVector(0,0,0);
        this.posAttempt = new MyVector(-100,-4.95,-260);
        this.collidedSides = false;
        this.collidedTB = false;
        this.KIA = false;
        this.volumeCenter = this.posAttempt;
        this.direction = new MyVector(1,0,0);
        this.steer_angle = 1;
        this._angle = 0;
        this.speedmodule = 0;
        this.backwards_friction = 0;
        this.score = 0;
        this.sum_steer_angle = 0;
    }

    tryToMoveIt(deltaT) {
    	'use strict';
        if(this instanceof Car){
            this.speed = new MyVector(0,0,0);
            var acceleration = 0;
            var acceleration_factor = 3.0;
            var acceleration_input = 0;
            var steer_input = 0;
            var steer_factor = Math.PI/4;
            var backwards_friction_factor = 3.0;
            var _lastposition;
            var max_speed = 20;
            if(front == true) {
                acceleration_input = 3.0;
                if(right == true){steer_input = 2.0;}
                else if(left == true){steer_input = -2.0;}
                else{steer_input = 0;}
                this.score += 2;
                document.getElementById("info").innerHTML = "Points: " + this.score;
                //console.log(this.score);
            }
            else if(back == true) {
                acceleration_input = -1;
                if(right == true){steer_input = 2.0;}
                else if(left == true){steer_input = -2.0;}
                else{steer_input = 0;}
            }
            else {
                acceleration_input = 0;
                if(right == true){steer_input = 2.0;}
                else if(left == true){steer_input = -2.0;}
                else{steer_input = 0;}
            }

            acceleration = acceleration_input * acceleration_factor;
            
            if(this.speedmodule >= 0){
                this.steer_angle = steer_input * 0.0174532925;
                this._angle = this._angle - steer_input;
            }
            else {
                this.steer_angle = -steer_input * 0.0174532925;
                this._angle = this._angle + steer_input;
            }
            this.sum_steer_angle += this.steer_angle;
            var x = this.direction.x;
            var z = this.direction.z;

            this.direction.x = x*Math.cos(this.steer_angle) - z*Math.sin(this.steer_angle);
            this.direction.z = x*Math.sin(this.steer_angle) + z* Math.cos(this.steer_angle);
            this.backwards_friction = -this.speedmodule * backwards_friction_factor;
            this.speedmodule = this.speedmodule + this.backwards_friction * deltaT;
            if (this.speedmodule <= max_speed) {
                this.speedmodule += acceleration*deltaT;
            }
            var position = this.position;
            this.speed.x = this.speedmodule * this.direction.x;
            this.speed.z = this.speedmodule* this.direction.z;
            this.posAttempt.x += this.speed.x;
            this.posAttempt.y += 0;
            this.posAttempt.z += this.speed.z;
            this.volumeCenter = this.posAttempt;
            this.rotateY(-this.steer_angle);
        }else if(this instanceof Butter){
            var acceleration = 0;
            var backwards_friction_factor = 3;
            this.posAttempt.x = this.position.x;
            this.posAttempt.y = this.position.y;
            this.posAttempt.z = this.position.z;

            this.backwards_friction = -this.speedmodule * backwards_friction_factor;
            this.speedmodule = this.speedmodule + this.backwards_friction * deltaT;
            this.speedmodule += acceleration*deltaT;

            this.speed.x = this.speedmodule * this.direction.x;
            this.speed.z = this.speedmodule* this.direction.z;

            this.posAttempt.x += this.speed.x;
            this.posAttempt.y += 0;
            this.posAttempt.z += this.speed.z;

            this.volumeCenter = this.posAttempt;
        }else if(this instanceof Cheerio){
            var acceleration = 0;
            var backwards_friction_factor = 3;
            this.posAttempt.x = this.position.x;
            this.posAttempt.y = this.position.y;
            this.posAttempt.z = this.position.z;

            this.backwards_friction = -this.speedmodule * backwards_friction_factor;
            this.speedmodule = this.speedmodule + this.backwards_friction * deltaT;
            this.speedmodule += acceleration*deltaT;

            this.speed.x = this.speedmodule * this.direction.x;
            this.speed.z = this.speedmodule* this.direction.z;

            this.posAttempt.x += this.speed.x;
            this.posAttempt.y += 0;
            this.posAttempt.z += this.speed.z;

            this.volumeCenter = this.posAttempt;
        }else{
            this.posAttempt.x = this.position.x;
            this.posAttempt.y = this.position.y;
            this.posAttempt.z = this.position.z;

            this.speed.x += this.accel.x*deltaT;
            this.speed.y += this.accel.y*deltaT;
            this.speed.z += this.accel.z*deltaT;

            this.posAttempt.x += this.speed.x*deltaT;
            this.posAttempt.y += this.speed.y*deltaT;
            this.posAttempt.z += this.speed.z*deltaT;

            this.volumeCenter = this.posAttempt;
        }
    }

    setDirection(xDir,yDir,zDir){
        this.direction.x = xDir;
        this.direction.z = zDir;   
        return true;
    }

    collidedLimits() {
        'use strict';
        if ((Math.abs(this.volumeCenter.x-2) + this.volumeRadius) >= FIELD_SIDES) {
            this.collidedSides = true;
            return true;
        }
        else if ((this.volumeCenter.z-7 + this.volumeRadius) >= FIELD_BOTTOM ||
                    (this.volumeCenter.z-7 - this.volumeRadius) <= FIELD_TOP) {
            this.collidedTB = true;
            return true;
        }
        return false;
    }

    collidedElement(elem) {
        var myPos = this.volumeCenter;
        var iPos = elem.volumeCenter;
        if(this instanceof Cheerio && elem instanceof Car){
            if(myPos.x<iPos.x + 3 &&
                myPos.x + 2.0>iPos.x &&
                myPos.y<iPos.y + 3 &&
                myPos.y + 2.0>iPos.y){
                return true;
            }else{
                return false;
            }
        }else{
            var distance = Math.sqrt(Math.pow(myPos.x-iPos.x,2) + Math.pow(myPos.z-iPos.z,2));
            if (distance <= (this.volumeRadius + elem.volumeRadius)) return true;
            else return false;  
        }
        
    }



    moveItmoveIt(deltaT) {
    	'use strict';

        this.position.x = this.posAttempt.x;
        this.position.y = this.posAttempt.y;
        this.position.z = this.posAttempt.z;

        this.resetCollisions();

    }

    resetCollisions() {
        this.collidedSides = false;
        this.collidedTB = false;
    }
}

function createPart(obj, x, y, z, rotX, rotY, minus, mat, geometry, tex) {
    'use strict';

    var texture =  new THREE.TextureLoader().load( tex );
    texture.repeat.set(1, 1);
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;

    var material = new THREE.MeshPhongMaterial( { map: texture} );
    var mesh = new THREE.Mesh(geometry, material);
    mesh.castShadows = true;

    mesh.position.set(x, y, z);
    if(rotX==true) {
      mesh.rotateX(minus*Math.PI/2);
    }
    if(rotY==true) {
      mesh.rotateY(minus*Math.PI/2);
    }
    obj.add(mesh);
}

function createCubeGeometry(x, y, z) {
    var geom = new THREE.Geometry();

    geom.vertices.push(new THREE.Vector3(0,0,0));
    geom.vertices.push(new THREE.Vector3(0,y,0));
    geom.vertices.push(new THREE.Vector3(x,0,0));
    geom.vertices.push(new THREE.Vector3(x,y,0));

    geom.vertices.push(new THREE.Vector3(0,0,z));
    geom.vertices.push(new THREE.Vector3(0,y,z));
    geom.vertices.push(new THREE.Vector3(x,0,z));
    geom.vertices.push(new THREE.Vector3(x,y,z));

    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 1, 3, 2 ) );

    geom.faces.push( new THREE.Face3( 0, 4, 1 ) );
    geom.faces.push( new THREE.Face3( 4, 5, 1 ) );

    geom.faces.push( new THREE.Face3( 3, 6, 2 ) );
    geom.faces.push( new THREE.Face3( 3, 7, 6 ) );

    geom.faces.push( new THREE.Face3( 1, 7, 3 ) );
    geom.faces.push( new THREE.Face3( 1, 5, 7 ) );

    geom.faces.push( new THREE.Face3( 0, 2, 6 ) );
    geom.faces.push( new THREE.Face3( 0, 6, 4 ) );

    geom.faces.push( new THREE.Face3( 5, 6, 7 ) );
    geom.faces.push( new THREE.Face3( 5, 4, 6 ) );

    geom.computeFaceNormals();

    return geom;
}

function createPrismGeometry(x, y, z) {

    var geom = new THREE.Geometry();

    geom.vertices.push(new THREE.Vector3(0,0,0));
    geom.vertices.push(new THREE.Vector3(0,0,-z));
    geom.vertices.push(new THREE.Vector3(x,0,0));

    geom.vertices.push(new THREE.Vector3(0,y,0));
    geom.vertices.push(new THREE.Vector3(0,y,-z));
    geom.vertices.push(new THREE.Vector3(x,y,0));

    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );

    geom.faces.push( new THREE.Face3( 3, 5, 4 ) );

    geom.faces.push( new THREE.Face3( 0, 2, 3 ) );
    geom.faces.push( new THREE.Face3( 3, 2, 5 ) );

    geom.faces.push( new THREE.Face3( 0, 4, 1 ) );
    geom.faces.push( new THREE.Face3( 0, 3, 4 ) );

    geom.faces.push( new THREE.Face3( 1, 4, 2 ) );
    geom.faces.push( new THREE.Face3( 2, 4, 5 ) );

    geom.computeFaceNormals();

    return geom;
}

function createPyramidGeometry(x, y, z) {
    var geom = new THREE.Geometry();

    geom.vertices.push(new THREE.Vector3(0,0,0));
    geom.vertices.push(new THREE.Vector3(0,y,0));
    geom.vertices.push(new THREE.Vector3(x,0,0));
    geom.vertices.push(new THREE.Vector3(x,y,0));

    geom.vertices.push(new THREE.Vector3(x/2,y/2,z));

    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 1, 3, 2 ) );

    geom.faces.push( new THREE.Face3( 0, 4, 1 ) );

    geom.faces.push( new THREE.Face3( 1, 4, 3 ) );

    geom.faces.push( new THREE.Face3( 3, 4, 2 ) );

    geom.faces.push( new THREE.Face3( 0, 2, 4 ) );

    geom.computeFaceNormals();

    return geom;
}
