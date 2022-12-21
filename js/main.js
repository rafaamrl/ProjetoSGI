var cena = new THREE.Scene();
var camera =  new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000)
var meuCanvas = document.getElementById('meuCanvas')
var renderer = new THREE.WebGLRenderer( { canvas: meuCanvas })
renderer.setSize( meuCanvas.offsetWidth, meuCanvas.offsetHeight )

cena.background = new THREE.Color(0xffffff);

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 4;
renderer.shadowMap.enabled = true
//document.body.appendChild( renderer.domElement )

camera.position.set(0,2,15)
camera.lookAt(0,0,0)

var controlos = new THREE.OrbitControls( camera, renderer.domElement )

var carregador = new THREE.GLTFLoader()
carregador.load(
    'models/TV.gltf',
 function ( gltf ) {     
    cena.add( gltf.scene )
    cena.traverse(function(x) {
        if(x.isMesh){
            x.castShadow = true
            x.receiveShadow = true
        }
        portas = cena.getObjectByName('Cube009');
        if(x.name == 'rack'){
            movel = x
        }
    })
    corOriginal=movel.material.color;
 } 
)

//Variaveis
let btn_luz = document.getElementById('btn_luz')
let btn_cor = document.getElementById('btn_cor')
let btn_contraste = document.getElementById('btn_contraste')
let btn_material = document.getElementById('btn_material')
let btn_visualizacao = document.getElementById('visualizacao')
let btn_transparencia = document.getElementById('btn_transparencia')
let btn_repor = document.getElementById('btn_repor')
var corMovel = new THREE.Color( 0xcc9900 );
let isLightOn = true;
let isCorDifferent = true;
let isContrastOn = false;
let isTransparencyOn = true;
const luzFrontal = new THREE.PointLight(0xffffff, 1);
const luzTraseira = new THREE.PointLight(0xffffff, 1);
const luzDireita = new THREE.PointLight(0xffffff, 1);
const luzEsquerda = new THREE.PointLight(0xffffff, 1);

//Adicionar luzes
function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    ambientLight.name = 'ambientLight';
    cena.add(ambientLight);
  
    luzFrontal.position.set(0, 0, 15);
    luzFrontal.name = 'luzFrontal';
    cena.add(luzFrontal);
  
    luzTraseira.position.set(15, 0, -15);
    luzTraseira.name = 'luzTraseira';
    cena.add(luzTraseira);

    luzEsquerda.position.set(-15, 0, 0);
    luzEsquerda.name = 'luzEsquerda';
    cena.add(luzEsquerda);
  
    luzDireita.position.set(15, 0, 0);
    luzDireita.name = 'luzDireita';
    cena.add(luzDireita);  
}

//Função para Ligar e desligar as luzes
function toggleLights() {
    isLightOn = !isLightOn;
    luzFrontal.intensity = isLightOn;
    luzTraseira.intensity = isLightOn;
    luzDireita.intensity = isLightOn;
    luzEsquerda.intensity = isLightOn;
  }
  
//Liga e Desliga as luzes
 btn_luz.addEventListener('click',function(){
    toggleLights();
});

//Alterar cor movel
btn_cor.addEventListener('click',function(){
    isCorDifferent = !isCorDifferent; 
    if(isCorDifferent) return (movel.material.color = corOriginal);
    return (movel.material.color = corMovel);

});

//Alterar o contraste escuro/branco
document.getElementById('btn_contraste').onclick = () => {
    isContrastOn = !isContrastOn;
    if (isContrastOn) return (cena.background = new THREE.Color(0x000000));
    return (cena.background = new THREE.Color(0xffffff));
};

//Alterar o material das portas
btn_material.onchange = () => {
    if (btn_material.value === 'vime') {
        portas.material.map = new THREE.TextureLoader().load('/models/textures/Wicker001_1K_Color.png');
      return;
    }
    portas.material.map = new THREE.TextureLoader().load('/models/textures/Wood028_2K_Color.png');
};

//Alterar modo de visualização

btn_visualizacao.onchange= () => {
    if (btn_visualizacao.value === 'tras') {
        camera.position.set(0,2,-15)
        camera.lookAt(0,0,0)
        return;
    }
    else if(btn_visualizacao.value === 'direita'){
        camera.position.set(15,5,3)
        camera.lookAt(0,0,0)
        return;
    }
    else if(btn_visualizacao.value === 'esquerda'){
        camera.position.set(-15,5,3)
        camera.lookAt(0,0,0)
        return;
    }
    camera.position.set(0,2,15)
    camera.lookAt(0,0,0)

};
//Alterar transparecia
btn_transparencia.addEventListener('click',function(){
    isTransparencyOn = !isTransparencyOn
    if (isTransparencyOn){
        movel.material.opacity = 1
        movel.material.transparent = false;
        return;
    } 
    movel.material.opacity = 0.0
    movel.material.transparent = true;
});


//Repor Cena
btn_repor.addEventListener('click',function(){
    
    //repor luzes
    if (!isLightOn) toggleLights();

    //repor cor
    isCorDifferent = true;
    movel.material.color = corOriginal

    //repor contraste
    if (isContrastOn) {
        isContrastOn = false;
        cena.background = new THREE.Color(0xffffff);
    }
    
    //repor material
    btn_material.value = 'vime';
    portas.material.map = new THREE.TextureLoader().load('/models/textures/Wicker001_1K_Color.png');

    //repor transparência
    movel.material.opacity = 1
    movel.material.transparent = false;

    //repor camera
    camera.position.set(0,2,15)
    camera.lookAt(0,0,0)

});


function animar() {
    requestAnimationFrame( animar )
    renderer.render( cena, camera )
}
animar()
addLights()

