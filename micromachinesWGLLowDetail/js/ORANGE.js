class ORANGE extends GameElement {

    constructor() {
    	'use strict';
        super();
        this.calcSpeed(ORANGE_SPEED); // Alterar modulo da velocidade aqui
        this.volumeRadius = 15;
    }

    calcSpeed(factor) {
    	'use strict';
        var sinal = [1,-1]
        var sX = sinal[Math.round(Math.random())] * Math.random();
        var sY = 0;
        var sZ = sinal[Math.round(Math.random())] * Math.random();
        var value = Math.sqrt(sX*sX+sZ*sZ);
        this.speed = new MyVector((sX/value) * factor, sY, (sZ/value) * factor);
    }

    collisionDealer(obj=null) {
    	if (obj instanceof Car) {
            this.KIA = true;
            score++;
        }
      if (obj instanceof Butter) {
        this.speed.x = -this.speed.x;
        this.speed.z = -this.speed.z;
        this.posAttempt.x = this.position.x;
        this.posAttempt.z = this.position.z;
        }
        else if (this.collidedSides) {
    		this.KIA = true;
    	}
    	else if (this.collidedTB) {
    		this.KIA = true;
    	}
        else if (obj instanceof ORANGE) {
            this.speed.x = -this.speed.x;
    		this.speed.z = -this.speed.z;
            this.posAttempt.x = this.position.x;
            this.posAttempt.z = this.position.z;
        }
        this.resetCollisions();
    }
}

var normVertShader = document.getElementById('norm-vert-shader');
var normFragShader = document.getElementById('norm-frag-shader');

function createORANGEbody(obj, x, y, z, mat) {
    'use strict';
    var orangeTexture = THREE.ImageUtils.loadTexture('textures/orange.jpg');
    var orangeTexture2 = THREE.ImageUtils.loadTexture('textures/orangenormal.jpg');

    var geo =  new THREE.SphereGeometry( 18, 10, 10, 0, Math.PI * 2, 5,5);
    var mat = new THREE.ShaderMaterial({
            uniforms: {
                lightPosition: {
                    type: 'v3',
                    value: new THREE.Vector3(251.95154359372464,251.95154359372464,251.95154359372464)
                },
                textureMap: {
                    type: 't',
                    value: orangeTexture
                },
                normalMap: {
                    type: 't',
                    value: orangeTexture2
                },
                uvScale: {
                    type: 'v2',
                    value: new THREE.Vector2(1.0, 1.0)
                }
            },
            vertexShader: normVertShader.innerText,
            fragmentShader: normFragShader.innerText
        });
    var mesh = new THREE.Mesh(geo,mat);
    mesh.geometry.computeTangents();
    mesh.position.set(x, y+12, z);
    //mesh.castShadow = true;
    obj.add(mesh);
    createORANGEbodyAux(obj,mesh, 0, 0, 0);
}

function createORANGE(x, y, z) {
    'use strict';

    var orange_aux = new ORANGE();

    createORANGEbody(orange_aux, 0, 0, 0);

    orange_aux.position.x = x;
    orange_aux.position.y = y;
    orange_aux.position.z = z;

    scene.add(orange_aux);

    return orange_aux;
}