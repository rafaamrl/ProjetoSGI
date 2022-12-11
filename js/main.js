let scene = new THREE.Scene()
scene.background = new THREE.Color(0xE5E5DA)
let camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 )
let renderer = new THREE.WebGLRenderer()
let controls = new THREE.OrbitControls(camera, renderer.domElement)

let axes = new THREE.AxesHelper(10)
scene.add(axes)
let grid = new THREE.GridHelper()
scene.add(grid)

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 4;
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.shadowMap.enabled = true
document.body.appendChild( renderer.domElement )

camera.position.x = -5
camera.position.y = 8
camera.position.z = 13
camera.lookAt(0,2,0)

new THREE.GLTFLoader().load(
    'models/TV.gltf',
    function ( gltf ) {
    scene.add( gltf.scene )

    scene.traverse( function(x) {
        if (x.isMesh) {
            x.castShadow = true
            x.receiveShadow = true			
        }

    })
}
)

addLights()
animate()

function animate() {
    requestAnimationFrame( animate )
    renderer.render( scene, camera )
}

function addLights(){
    const lightAmb = new THREE.AmbientLight( 0xffffff, 0.5); 
    scene.add( lightAmb );

    const lightDir = new THREE.DirectionalLight( 0xE5E5DA, 1 );
    lightDir.position.set(2,8,10)
    const dlHelper = new THREE.DirectionalLightHelper(lightDir, 1, 0xFF0000);
    scene.add(dlHelper);
    scene.add( lightDir );
}

