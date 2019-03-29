function createPauseMenu() {
    var geom = new THREE.PlaneGeometry(250,200,1,1);
    var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "textures/pause.jpg" ) } );
    planePause = new THREE.Mesh( geom, material );

    planePause.position.set(0,100,0);

    planePause.rotateX(-Math.PI/2);
    planePause.rotateZ(-Math.PI/2);    
}

function createRestartMenu() {
    var geom = new THREE.PlaneGeometry(250,200,1,1);
    var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "textures/Game_Over.jpg" ) } );
    planeGO = new THREE.Mesh( geom, material );

    planeGO.position.set(0,100,0);

    planeGO.rotateX(-Math.PI/2);
    planeGO.rotateZ(-Math.PI/2);
}

function createStartMenu() {
    var geom = new THREE.PlaneGeometry(250,200,1,1);
    var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "textures/start.jpg" ) } );
    planeStart = new THREE.Mesh( geom, material );

    planeStart.position.set(0,100,0);

    planeStart.rotateX(-Math.PI/2);
    planeStart.rotateZ(-Math.PI/2);    
}

function gameRestart() {
    elements.forEach(function(el) {
        scene.remove(el);
    });
    elements=[];
    gameInit();
    car.lives = 3;
    hud.resetLives();
    begin = true;
}

class HUD {
    constructor(){
        this.camera = createCamera("orto", 0, 150, 2000, 40, 1, 1200);
        this.carLives = [];
        this.carLives.push(createCar(50,0,2000));
        this.carLives.push(createCar(0,0,2000));
        this.carLives.push(createCar(-50,0,2000));
        this.camera.lookAt(this.carLives[1].position);
        this.camera.rotateZ(Math.PI);
    }

    carDied(){
        this.carLives[car.lives].visible = false;
    }

    resetLives() {
        this.carLives.forEach(function(el) {
            el.visible = true;
        });
    }
}
