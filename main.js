import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/*
 * Grab from html
 */
const canvas = document.querySelector("canvas.webgl");
const gltfLoader = new GLTFLoader();

/*
 * scene setup
 */
const marimi = {
  width: window.innerWidth,
  height: window.innerHeight,
  scaleForOne: window.innerWidth / 2,
  scaleForThree: window.innerWidth / 2.8,
};
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  35,
  marimi.width / marimi.height,
  0.1,
  100
);
const cameraGroup = new THREE.Group();
cameraGroup.add(camera);
camera.position.z = -6;
camera.lookAt(0, 0, 0);

scene.add(cameraGroup);

/**
 * OBjects
 */
const objectPosition = 4;
let cup = undefined;
gltfLoader.load("/onlinePahar.glb", (gltf) => {
  cup = gltf.scene;
  console.log(cup);
  cup.rotation.y = Math.PI + 0.5;
  cup.rotation.x = -0.3;
  cup.position.y = -1;
  cup.position.x = -marimi.width / marimi.scaleForOne;

  scene.add(cup);
});
let beansPackage,
  beansPackage1 = undefined,
  beansPackage2 = undefined,
  beansPackage3 = undefined;

gltfLoader.load("/package.glb", (gltf) => {
  beansPackage = gltf.scene;
  beansPackage.position.y = -objectPosition - 0.5;

  beansPackage1 = beansPackage.clone();
  beansPackage2 = beansPackage.clone();
  beansPackage3 = beansPackage.clone();
  beansPackage1.position.x = marimi.width / marimi.scaleForThree;
  beansPackage3.position.x = -marimi.width / marimi.scaleForThree;

  scene.add(beansPackage1, beansPackage2, beansPackage3);
});

//lights
const light1 = new THREE.AmbientLight("white", 1);
scene.add(light1);
const light2 = new THREE.PointLight("white", 100);
light2.position.y = 0;
light2.position.x = 10;
scene.add(light2);

/**
 * render & animation
 */

window.addEventListener("resize", () => {
  // Update sizes
  marimi.width = window.innerWidth;
  marimi.height = window.innerHeight;

  cup.position.x = -marimi.width / marimi.scaleForOne;
  beansPackage1.position.x = marimi.width / marimi.scaleForThree;
  beansPackage3.position.x = -marimi.width / marimi.scaleForThree;
  console.log(marimi.width / marimi.scaleForThree);

  // Update camera
  camera.aspect = marimi.width / marimi.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(marimi.width, marimi.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(marimi.width, marimi.height);
renderer.render(scene, camera);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

const clock = new THREE.Clock();
let previousTime = 0;

/**
 * cursos
 */
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / marimi.width - 0.5;
  cursor.y = e.clientY / marimi.height - 0.5;
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;

  cup && (cup.rotation.y += 0.01);
  camera.position.y = (-scrollY / marimi.height) * objectPosition;

  const parallaxX = cursor.x,
    parallaxY = cursor.y;
  cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * deltaTime;
  cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * deltaTime;
  // controls.update();
  previousTime = elapsedTime;
  requestAnimationFrame(tick);
  renderer.render(scene, camera);
};
tick();
