import './style.css';

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );

// Torus

// const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
// const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
// const torus = new THREE.Mesh( geometry, material );

// scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

// stars
const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200 ) );

  star.position.set(x, y, z);
  scene.add(star);
};

Array(200).fill().forEach(addStar);

// background
// const backgroundTexture = new THREE.TextureLoader().load('FILE HERE');
// scene.background = backgroundTexture;

// avatar
const mikeTexture = new THREE.TextureLoader().load('mike.png');

const mike = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: mikeTexture } )
);

scene.add(mike);

mike.position.z = -5;
mike.position.x = 2;

// Icosahedron

// const icoGeometry = new THREE.TetrahedronGeometry(4, 2);
// const icoMaterial = new THREE.MeshDepthMaterial( { color: 0xFF6347 } );
// const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);

// scene.add(icosahedron);

// floppydisk?
const diskGeometry = new THREE.BoxGeometry( 3, 3, .1 );
const diskMaterial = new THREE.MeshNormalMaterial( {color: 0x0000a6} );
const disk = new THREE.Mesh( diskGeometry, diskMaterial );
scene.add( disk );

disk.position.z = 20;
disk.position.x = 2;

// moving camera on scroll
const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;
  console.log(t);
  mike.rotation.y += 0.01;
  mike.rotation.z += 0.01;

  disk.rotation.y += 0.01;
  disk.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// animation loop
const animate = () => {
  requestAnimationFrame( animate );

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // controls.update();

  renderer.render( scene, camera );
};

animate();
