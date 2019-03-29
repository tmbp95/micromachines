function createLights() {
    theSun = createSun(0,400,0);
    var intensity = 2;
    var Yposition = 15;
    candles.push(createCandle(-200,Yposition,-230,intensity));
    candles.push(createCandle(-200,Yposition,0,intensity));
    candles.push(createCandle(-150,Yposition,230,intensity));
    candles.push(createCandle(10,Yposition,-230,intensity));
    candles.push(createCandle(190,Yposition,-120,intensity));
    candles.push(createCandle(0,Yposition,95,intensity));

    ambLight = createAmbientLight();
    spotLight = createSpotLight();
}

function createAmbientLight(intensity){
    if(intensity==null){
        intensity = 1.5;
    }
    ambLight = new THREE.AmbientLight( 0x404040,intensity ); // soft white light  
    scene.add( ambLight );
    return ambLight;
}

function createSun(x,y,z) {
    var textureFlare0 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" );
    var textureFlare2 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare2.png" );
    var textureFlare3 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare3.png" );
    var sunLight = new THREE.DirectionalLight( 0xFFFFF0, 0.5 );
    sunLight.position.set( x, y, z );
    scene.add(sunLight);

    var flareColor = new THREE.Color( 0xffff00 );
    flareColor.copy( sunLight.color );

    lensFlare = new THREE.LensFlare( textureFlare0, 200, 0.0, THREE.AdditiveBlending, flareColor );
    lensFlare.position.set( x, 30, z );
    lensFlare.add( textureFlare2, 200, 0.0, THREE.AdditiveBlending );
    lensFlare.add( textureFlare2, 200, 0.0, THREE.AdditiveBlending );
    lensFlare.add( textureFlare2, 200, 0.0, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 50, 0.05, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 160, 0.1, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 75, 0.18, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 135, 0.25, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 90, 0.31, THREE.AdditiveBlending );
    lensFlare.customUpdateCallback = lensFlareUpdateCallback;
    scene.add( lensFlare );
    return sunLight;
}

function createCandle(x,y,z,intensity) {
    var candle = new THREE.PointLight( 0xffffff, intensity, 50, 2);
    candle.castShadow = true;
    //Set up shadow properties for the light
    candle.shadow.bias = 0.001;
    candle.shadow.mapSize.width = 50;  // default
    candle.shadow.mapSize.height = 50; // default
    candle.shadow.camera.near = 0.5;       // default
    candle.shadow.camera.far = 35;      // default
    // color, intensity, distance (range of the light), decay (1)
    candle.position.set( x, y, z );
    scene.add(candle);
    return candle;
}

//https://github.com/timoxley/threejs/blob/master/examples/webgl_lensflares.html
function lensFlareUpdateCallback( object ) {
    var f, fl = object.lensFlares.length;
    var flare;
    var vecX = -object.positionScreen.x * 2;
    var vecY = -object.positionScreen.y * 2;
    for( f = 0; f < fl; f++ ) {
        flare = object.lensFlares[ f ];
        flare.x = object.positionScreen.x + vecX * flare.distance;
        flare.y = object.positionScreen.y + vecY * flare.distance;
        flare.rotation = 0;
    }
    object.lensFlares[ 2 ].y += 0.025;
    object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + 45 * Math.PI / 180;
}

function toggleCandles() {
    candles.forEach(function(st) {
        st.visible = !st.visible;
    });
}

function createSpotLight() {
    var spotL = new THREE.SpotLight(0xffffff,3);
    spotL.distance = 90;


    spotL.angle = Math.PI/4;
    //0,profundidade,frente
    spotL.position.set(0,1.8,5);

    spotL.penumbra = 0.3;
    spotL.decay = 2;
    spotL.target.position.set(0,0,70);    

    return spotL;
}
