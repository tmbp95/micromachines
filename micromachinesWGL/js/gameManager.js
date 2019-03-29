var stats;



const FIELD_TOP = -325;
const FIELD_BOTTOM = 300;
const FIELD_SIDES = 300;
const BULLET_SPEED = 70;
const ORANGE_SPEED = 20;

var camera, scene, renderer, controls;
var camera1, camera2, camera3;
var cameraAux, cameraPause;
var camGameOver, camYouWin;

var fog = false;
var hud;

var clock;

var car;
var orange1, orange2;
var elements = [];
var score = 0;

var theSun;
var ambLight;
var candles = [];
var spotLight;
var flare;
var night = false;
var firework = false;
var particleGroup;
var particleAttributes;

var mirrorCube, mirrorCubeCamera; // for mirror material
var mirrorSphere, mirrorSphereCamera; // for mirror material

var matManager;

var pause = false;


var front = false;
var back  = false;
var left  = false;
var right = false;

var knife = createKnife();

var fogColorDay = new THREE.Color(0x81abef);
var fogColorNight = new THREE.Color(0x394668);

var cheerios_x = [2.0, 6.0, 4.0, 6.0, 6.0, 6.0, 8.0, 8.0, 10.0, 10.0, 12.0, 12.0, 14.0, 14.0, 16.0, 16.0, 18.0, 18.0, 20.0, 20.0,22.0, 22.0, 24.0, 24.0, 26.0, 26.0, 28.0, 28.0, 30.0, 30.0, 32.0, 32.0, 34.0, 34.0, 36.0, 36.0, 38.0, 38.0, 40.0, 40.0,42.0, 42.0, 44.0, 44.0, 46.0, 46.0, 48.0, 48.0, 50.0, 50.0, 52.0, 54.0, 56.0,  52.0, 58.0, 52.0, 58.0, 52.0, 58.0,57.0, 51.0, 55.0, 49.0, 53.0, 47.0, 51.0, 45.0, 49.0, 43.0, 47.0, 41.0, 45.0, 39.0, 43.0, 37.0, 41.0, 35.0, 39.0, 33.0, 37.0, 31.0, 35.0, 29.0, 33.0, 27.0, 31.0, 25.0, 29.0, 23.0, 27.0, 21.0, 25.0, 19.0, 23.0, 17.0, 21.0, 15.0, 19.0, 12.0, 16.0, 12.0, 10.0, 12.0, 10.0, 8.0, 8.0, 6.0, 6.0, 6.0, 4.0, 6.0, 2.0, 6.0, 1.0, 1.0, 1.0, 6.0, 1.0, 6.0, 1.0,6.0, 1.0,6.0, 1.0, 6.0, 1.0, 6.0, 1.0, 6.0, 1.0, 6.0, 1.0, 6.0, 1.0, 6.0, 1.0, 6.0, 1.0, 6.0, 1.0, 6.0, 1.0, 6.0, 1.0, 6.0, 1.0,6.0, 1.0, 6.0, 1.0, 6.0, 1.0 , 6.0, 1.0, 1.0, 1.0, 1.0];
var cheerios_z = [0.5, 6.5, 0.5, 6.5, 0.5, 4.5, 0.5, 4.5, 0.5, 4.5, 0.5, 4.5, 0.5, 4.5, 0.5, 4.5, 0.5, 4.5, 0.5, 4.5, 0.5, 4.5, 0.5, 4.5, 0.5, 4.5, 0.5, 4.5, 0.5, 4.5, 1.5, 5.5, 2.5, 6.5, 3.5, 7.5, 4.5, 8.5, 5.5, 9.5,6.5, 10.5, 7.5, 11.5, 8.5, 12.5, 9.5, 13.5, 10.5, 14.5, 11.5, 12.5, 13.5,  15.5, 15.5, 17.5, 17.5, 19.5, 19.5,21.5, 21.5, 23.5, 23.5, 25.5, 25.5, 27.5, 27.5, 29.5, 29.5, 31.5, 31.5, 33.5,  33.5, 35.5, 35.5, 37.5, 37.5, 39.5, 39.5, 41.5,41.5, 43.5, 43.5, 45.5, 45.5, 47.5, 47.5, 49.5, 49.5, 51.5, 51.5, 53.5, 53.5,  55.5, 55.5, 57.5, 57.5, 59.5, 57.5, 61.5,61.5, 56.5, 61.5, 60.5, 54.5, 58.5, 52.5, 56.5, 50.5, 54.5, 48.5, 52.5, 46.5, 50.5, 48.5, 46.5, 44.5, 44.5, 42.5, 42.5, 40.5, 40.5,38.5, 38.5, 36.5, 36.5, 34.5, 34.5, 32.5, 32.5, 30.5, 30.5, 28.5, 28.5, 26.5, 26.5, 24.5, 24.5, 22.5, 22.5, 20.5, 20.5, 18.5, 18.5, 16.5, 16.5,14.5, 14.5, 12.5, 12.5, 10.5, 10.5, 8.5, 8.5, 6.5, 4.5, 2.5];
   
var planePause, planeGO, planeStart;  
var lensFlare;

var fullTime = 0;
var begin = false;

var vx, vy, vz;

var normVertShader = document.getElementById('norm-vert-shader');
var normFragShader = document.getElementById('norm-frag-shader');

function render(cam) {
    'use strict';
    mirrorSphere.visible = false;
    mirrorSphereCamera.updateCubeMap( renderer, scene );
    mirrorSphere.visible = true;

    /*mirrorCube.visible = false;
    mirrorCubeCamera.updateCubeMap( renderer, scene );
    mirrorCube.visible = true;*/

    renderer.render(scene, cam);
}

function loadAssets(options) {
        var paths = options.paths;
        var onBegin = options.onBegin;
        var onComplete = options.onComplete;
        var onProgress = options.onProgress;
        var total = 0;
        var completed = 0;
        var textures = { };
        var key;

        for (key in paths)
            if (paths.hasOwnProperty(key)) total++;

        onBegin({
            total: total,
            completed: completed
        });

        for (key in paths) {
            if (paths.hasOwnProperty(key)) {
                var path = paths[key];
                if (typeof path === 'string')
                    THREE.ImageUtils.loadTexture(path, null, getOnLoad(path, key));
                else if (typeof path === 'object')
                    THREE.ImageUtils.loadTextureCube(path, null, getOnLoad(path, key));
            }
        }

        function getOnLoad(path, name) {
            return function (tex) {
                textures[name] = tex;
                completed++;
                if (typeof onProgress === 'function') {
                    onProgress({
                        path: path,
                        name: name,
                        total: total,
                        completed: completed
                    });
                }
                if (completed === total && typeof onComplete === 'function') {
                    onComplete({
                        textures: textures
                    });
                }
            };
        }
    }

function init() {
    'use strict';
    stats = new Stats();
    stats.showPanel( 0 );
    document.body.appendChild( stats.dom );


    renderer = new THREE.WebGLRenderer( {
    	antialias : true,
        alpha: true
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    renderer.setClearColor( 0x0095ff, 0 );
    renderer.autoClear = false;

    matManager = new MaterialsManager();


    //para alterar distância ao tabuleiro, alterar valor 200 (5o argumento)
    camera1 = createCamera("orto", 0, 200, 0, 300, 1, 600);
    //camera2 = createCamera("pres", -900, 100, FIELD_BOTTOM + 120, 45, 1, 12000);
    camera2 = createCamera("pres", -120, 420, 0, 80, 1, 2000);
    camera3 = createCamera("pres", 0, 4, -25, 25, 1, 500);

    scene = new THREE.Scene();
    scene.rotateY(1*Math.PI/2);

    // hud = new HUD();

    camera1.lookAt(scene.position);
    camera2.lookAt(scene.position);
    camera3.lookAt(new THREE.Vector3(0,0,0));

    clock = new THREE.Clock();
    clock.start();

    createRestartMenu();
    createPauseMenu();
    createStartMenu();   
    //FOG
   
    scene.background = fogColorDay;
    scene.fog = new THREE.FogExp2( fogColorDay, 0 );

    createLights();
    // createParticles();

    gameInit();

    // var cubeGeom = new THREE.CubeGeometry(20, 100, 10, 1, 1, 1);
    // mirrorCubeCamera = new THREE.CubeCamera( 0.1, 1000, 1024 );
    // // mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
    // scene.add( mirrorCubeCamera );
    // var mirrorCubeMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorCubeCamera.renderTarget } );
    // mirrorCube = new THREE.Mesh( cubeGeom, mirrorCubeMaterial );
    // mirrorCube.position.set(-75,39,0);
    // mirrorCubeCamera.position.set(mirrorCube.position.x,-1,mirrorCube.position.z);
    // mirrorCubeCamera.rotateY(-Math.PI/2);
    // scene.add(mirrorCube);  

    var sphereGeom =  new THREE.SphereGeometry( 10, 10, 10 ); // radius, segmentsWidth, segmentsHeight
    mirrorSphereCamera = new THREE.CubeCamera( 0.1, 5000, 512/4 );
    // mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
    scene.add( mirrorSphereCamera );
    var mirrorSphereMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorSphereCamera.renderTarget, opacity: 0.5, transparent: true } );
    mirrorSphere = new THREE.Mesh( sphereGeom, mirrorSphereMaterial );
    mirrorSphere.position.set(-80,0,-260);
    mirrorSphereCamera.position.set(-80,-2,-260);
    mirrorSphereCamera.rotateY(-Math.PI/2);
    scene.add(mirrorSphere);

    


    render(camera);



    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function createParticles(){
var particleTexture = THREE.ImageUtils.loadTexture( 'textures/particle.png' );
    particleGroup = new THREE.Object3D();
    particleAttributes = { startSize: [], startPosition: [], randomness: [] };
    
    var totalParticles = 800;
    var radiusRange = 60;
    for( var i = 0; i < totalParticles; i++ ) 
    {
        var spriteMaterial = new THREE.SpriteMaterial( { map: particleTexture, useScreenCoordinates: false, color: 0x000000 } );
        
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set( 10, 10, 1.0 ); // imageWidth, imageHeight
        sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );

        var v, phi, theta;
        
        var frand = Math.random() / 50;
        v = 0.8*frand + 0.2;
        frand = Math.random() / 50;
        phi = frand*Math.PI;
        frand = Math.random() / 50;
        theta = 2.0*frand*Math.PI;

        vx = v * Math.cos(theta) * Math.sin(phi);
        vy = v * Math.cos(phi);
        vz = v * Math.sin(theta) * Math.sin(phi);
        // for a cube:
        // sprite.position.multiplyScalar( radiusRange );
        // for a solid sphere:
        // sprite.position.setLength( radiusRange * Math.random() );
        // for a spherical shell:
        sprite.position.setLength( radiusRange * (Math.random() * 0.1 + 0.9) );
        
        sprite.material.color.setRGB( Math.random(),  Math.random(),  Math.random() ); 
        //sprite.material.color.setHSL( Math.random(), 0.5, 0.5 ); 
        
        // sprite.opacity = 0.80; // translucent particles
        sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles
        
        particleGroup.add( sprite );
        // add variable qualities to arrays, if they need to be accessed later
        particleAttributes.startPosition.push( sprite.position.clone() );
        particleAttributes.randomness.push( Math.random() );
    }
    particleGroup.position.y = 50;
    scene.add( particleGroup );
}

function gameInit() {
    createGameElements();
    car.add(camera3); //Adicionamos a camara 3 ao carro
    if(camera == null){
        camera = camera1;   
    }
    begin = true;
    score = 0;
    car.lives = 3;
    car.add( spotLight );
    car.add(spotLight.target);
}

function drawLives(){
    var toShow = "<div class='life-wrapper'>";
    for(var i = 0; i < car.lives; i++){
        toShow += "<div id='car-life'></div>";
    }
    toShow += "</div>";
    var elementLives = document.getElementById("live");
    if(elementLives != null) elementLives.innerHTML = toShow;
}

function onUpdate(delta) {
    drawLives();

    
    
    'use strict';
    scene.add(knife);
    if (camera != camera3){
        scene.remove(knife);
    }
    
    // Tentativa de movimento
    if(fullTime>=20){
        if(begin){
            scene.add( planeStart );
            pause = true;
        }
        elements.forEach(function(el) {
            el.tryToMoveIt(delta);
        });


    //  knife.rotation.setFromRotationMatrix( camera.matrix );

    // Testa colisoes com posicao tentativa e caso existam, trata a colisao
    for (var j=0; j<elements.length; j++){
        var jElm = elements[j];
        if(!jElm.KIA){
            if (jElm.collidedLimits()){
                jElm.collisionDealer();
            }
            for(var i=j+1; i<elements.length; i++){
                var iElm = elements[i];
                if(!iElm.KIA && jElm.collidedElement(iElm)){
                    jElm.collisionDealer(iElm);
                    iElm.collisionDealer(jElm);
                    break;
                }
            }
        }
    }

    // Removem-se os elementos que ja morreram ou entao atualiza-se a posicao
    elements.forEach(function(el,index) {
        if(el.KIA) {
            scene.remove(el);
            elements.splice(index,1);
        }
        else
            el.moveItmoveIt(delta);
    });

    //SpotLight

    spotLight.target.updateMatrixWorld();
    spotLight.shadow.update(spotLight);

        // PARTICLE SYSTEM UPDATE

    if(firework){
        var time = 40 * clock.getElapsedTime();

    var h = 0.2;

    var vento = 0.1;

    var g = -0.2;

    // var v, phi, theta;
    
    for ( var c = 0; c < particleGroup.children.length; c ++ ) 
    {
        // var frand = Math.random() / 100;
        // v = 0.8*frand + 0.2;
        // phi = frand*Math.PI;
        // theta = 2.0*frand*Math.PI;


        var sprite = particleGroup.children[ c ];
        console.log(sprite.position.x);
        sprite.position.x = sprite.position.x + h * vx;
        sprite.position.y = sprite.position.y + h * vy;
        sprite.position.z = sprite.position.z + h * vz;
        vx +=  h * vento;
        vy +=  h * g;
        vz +=  h * 0;

        if(sprite.position.y <= -5 ) particleGroup.remove(sprite);
        

        //particle wiggle
        // var wiggleScale = 2;
        // sprite.position.x += wiggleScale * (Math.random() - 0.5);
        // sprite.position.y -= wiggleScale * (Math.random() - 0.5);
        // sprite.position.z -= wiggleScale * (Math.random() - 0.5);

        // if(sprite.position.y <= -50 ) particleGroup.remove(sprite);
        
        // pulse away/towards center
        // individual rates of movement
        // var a = particleAttributes.randomness[c] + 1;
        // var pulseFactor = Math.sin(a * time) * 0.1 + 0.9;
        // sprite.position.x = particleAttributes.startPosition[c].x * pulseFactor;
        // sprite.position.y = particleAttributes.startPosition[c].y * pulseFactor;
        // sprite.position.z = particleAttributes.startPosition[c].z * pulseFactor;    
    }
    // rotate the entire group
    // particleGroup.rotation.x = time * 0.5;
    // particleGroup.rotation.y = time * 0.75;
    // particleGroup.rotation.z = time * 1.0;
    }
    if(car.KIA){
        scene.add( planeGO );
    }else{
        scene.remove( planeGO ); 
    }
    }

}

function animate() {
    'use strict';

    stats.begin();
    var delta = clock.getDelta();
    fullTime += delta;

    if (!pause) onUpdate(delta);

    renderer.setSize(window.innerWidth, window.innerHeight);

    render(camera);
    if(camera == camera3){
        controls = new THREE.OrbitControls( camera, renderer.domElement );
                    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
                    controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
                    controls.dampingFactor = 0.15;
                    controls.screenSpacePanning = false;
                    controls.minDistance = 20;
                    controls.maxDistance = 50;
                    controls.maxPolarAngle = Math.PI / 2;
                    controls.rotateSpeed = 0.009;
                    controls.enableZoom = true;
    }
    stats.end();

    //renderer.setViewport(0,0,300,170);

    // render(hud.camera);

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


function createGameElements() {
    'use strict';

    createBackground();

    scene.add( knife );

        
        car = createCar(-100,-4.95,-260);
        elements.push(car);

        orange1 = createORANGE(-160,0,-50);
        orange2 = createORANGE(-20,0,-150);
        elements.push(orange1);  
        elements.push(orange2);
        //elements.push(createORANGE(-160,0,-15)); 
        //elements.push(createORANGE(-20,0,-15));

        var butter1 = createButter(30,10);
        var butter2 = createButter(105,60);
        butter2.rotateY(Math.PI/1.5);
        var butter3 = createButter(40,-180);
        butter3.rotateY(Math.PI/0.5);
        var butter4 = createButter(-200,-200);
        butter4.rotateY(Math.PI/4.5);
        elements.push(butter1);
        elements.push(butter2);
        elements.push(butter3);
        elements.push(butter4);

        var nCheerios = 157;
        for (var i = 0; i < nCheerios; i++) {
            var cheerioX = (cheerios_x[i]-30.0)*9;
            var cheerioZ = (cheerios_z[i]-32.0)*9;
            elements.push(createCheerio(cheerioX,cheerioZ,0));
        }

        var candle1 = createCandleStick(-200,-230);    elements.push(candle1);
        var candle2 = createCandleStick(-200,0);    elements.push(candle2);
        var candle3 = createCandleStick(-150,230);    elements.push(candle3);
        var candle4 = createCandleStick(10,-230);    elements.push(candle4);
        var candle5 = createCandleStick(190,-120);    elements.push(candle5);
        var candle6 = createCandleStick(-150,230);    elements.push(candle6);
}


function createBackground() {
  var geom = new THREE.PlaneGeometry(600,600,1,1);
  var material = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load( "textures/table.jpg" ), specular: 0x555555, shininess: 1 } );
  var plane = new THREE.Mesh( geom, material );
  plane.position.y = -5;
  plane.position.z =  0;
  plane.rotateX(-2*Math.PI/4);
  scene.add( plane );

    var planeGeometry = new THREE.PlaneGeometry( 600, 600 );
    planeGeometry.rotateX( - Math.PI / 2 );

    var planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.2;

    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.y = -4.9;
    plane.position.x =  0;
    plane.position.z =  0;
    plane.receiveShadow = true;
    scene.add( plane );

  /*var geom = new THREE.PlaneGeometry(25,25,1,1);
  var material = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load( "textures/water.png" ), opacity: 0.8, transparent: true, ambient: 0x050505, specular: 0x555555, shininess: 1 } );
  var plane = new THREE.Mesh( geom, material );
  plane.position.x = -70;
  plane.position.y = -4.99;
  plane.position.z =  -260;
  plane.rotateX(-2*Math.PI/4);
  plane.rotateZ(Math.PI/2);
  scene.add( plane );*/

  return 1;
}
function createKnife() {
    var spriteMap = new THREE.TextureLoader().load( "textures/knife.png" );
    var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    var sprite = new THREE.Sprite( spriteMaterial );

    sprite.scale.set(20,20,1);

    sprite.position.y = 10;
    sprite.position.z =  0;
    sprite.position.x =  0;

  return sprite;
}
function createCamera(type, x, y, z, camArg, n, f) {
    'use strict';
    var cc;
    var aspectRatio = window.innerWidth / window.innerHeight;
    if (type == "orto") {
        if (aspectRatio >= 1) {
            cc = new THREE.OrthographicCamera( - camArg * aspectRatio, camArg * aspectRatio, camArg, -camArg, n, f );
            //left, right, top, bottom, near, far
        }
        else{
            cc = new THREE.OrthographicCamera( - camArg, camArg, camArg / aspectRatio, -camArg / aspectRatio, n, f );
        }
        cc.viewSize = camArg;
    }
    if (type == "pres")
         cc = new THREE.PerspectiveCamera(camArg, aspectRatio, n, f);
         // fov, aspect, near, far
    cc.position.x = x;
    cc.position.y = y;
    cc.position.z = z;

    cc.zoom = 1;

    cc.camType = type;

    return cc;
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    var aspectRatio = window.innerWidth / window.innerHeight;

    if (camera.camType == "orto") {

        var viewSize = camera.viewSize;

        if (aspectRatio >= 1) {
            camera.left = - viewSize * aspectRatio;
            camera.right = viewSize * aspectRatio;
            camera.top = viewSize;
            camera.bottom = -viewSize;
        }

        else {
            camera.left = - viewSize;
            camera.right = viewSize;
            camera.top = viewSize / aspectRatio;
            camera.bottom = -viewSize / aspectRatio;
        }
    }

    else if (camera.camType == "pres"){
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            camera.aspect = aspectRatio;
        }
    }

    camera.updateProjectionMatrix();
}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {
        case 79: // <-
            left = false;
        case 80: // ->
            right = false;
            break;
        case 81: //   <-
            front = false;
            break;
        case 65: //   ->
            back = false;
            break;

    }
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

        case 79: //   <-
            left = true;
            break;
        case 80: //   ->
            right = true;
            break;

        case 81: //   <-
            front = true;
            break;
        case 65: //   ->
            back = true;
            break;
        case 49: //1
            if(!pause){
                if(camera == camera2){
                    scene.rotateY(-3*Math.PI/2);
                }
                camera = camera1;
                scene.fog.density = 0;
                onResize();
            }
            break;
        case 50: //2
            if(!pause && camera != camera2){
                camera = camera2;
                onResize();
                scene.rotateY(3*Math.PI/2);
                scene.fog.density = 0;
            }
            break;
        case 51: //3
            if(!pause){
                if(camera == camera2){
                    scene.rotateY(-3*Math.PI/2);
                }
                camera3 = createCamera("pres", 0, 4, -25, 25, 1, 500);
                car.add(camera3);
                camera = camera3;
                if(!fog){
                    scene.fog.density = 0;
                }else{
                    if(camera == camera3){
                        scene.fog.density = 0.02;
                    }  
                }
                onResize();
            }
            break;
        case 67: //C
            if(!pause) toggleCandles();
            break;
        case 72: //H
            if(!pause) spotLight.visible = !spotLight.visible;
            break;

        case 78: //N
            if(!pause){
                night = !night;
                if (night){
                    theSun.intensity = 0;
                    ambLight.intensity = 0.5;
                    scene.background = fogColorNight;
                    scene.fog.color = fogColorNight;
                    scene.remove(lensFlare);
                }else{
                    theSun.intensity = 0.5;
                    ambLight.intensity = 1.5;
                    scene.background = fogColorDay;
                    scene.fog.color = fogColorDay;
                    scene.add(lensFlare);
                }
            }
            break;
        case 82: //R
            pause = false;
            scene.remove( planePause ); 
            scene.remove( planeStart ); 
            gameRestart();
            break;
        case 83: //S
            pause = !pause;
            if(begin){
                begin = false;
                scene.remove( planeStart ); 
            }else{
                if(pause){
                    scene.add( planePause );
                }else{
                    scene.remove( planePause ); 
                }
            }
            break;

        case 73: //I
            fog = !fog
            if(!fog){
                scene.fog.density = 0;
            }else{
                if(camera == camera3){
                    scene.fog.density = 0.02;
                }  
            }
            break;

        case 70: //F
            //scene.addChild(particleSystem);
            firework = !firework;
            if(firework) createParticles();
            else{
                scene.remove( particleGroup );
            }
            break;
    }
}

function createORANGEbodyAux(obj, mesh, x, y, z) {
    'use strict';
    obj.remove(mesh);
    var TextureLoader = new THREE.TextureLoader();
    var orangeTexture = TextureLoader.load("textures/orange.jpg");
    var orangeBumpMap = TextureLoader.load("textures/orangbump.png");
    var orangeNormalMap = TextureLoader.load("textures/orangenormal.jpg");

    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry( 17, 10, 10, 0, Math.PI * 2, 5,5),
        new THREE.MeshPhongMaterial({
            color:0xffffff,
            map:orangeTexture,
            bumpMap:orangeBumpMap,
            normalMap: orangeNormalMap
        })
    );

    mesh.position.set(x, y+12, z);
    //mesh.castShadow = true;
    obj.add(mesh);
}