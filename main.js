import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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
};
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  marimi.width,
  marimi.height,
  0.1,
  100
);
scene.add(camera);

/**
 * OBjects
 */
let cup = undefined;
// gltfLoader.load("./public/onlinePahar.glb", (gltf) => {
//   cup = gltf.scene;

//   console.log(cup);
// });

/**
 * render & animation
 */

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.render(scene, camera);
