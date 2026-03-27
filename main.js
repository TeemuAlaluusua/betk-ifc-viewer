import * as THREE from "https://unpkg.com/three@0.158.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js";
import { IFCLoader } from "https://unpkg.com/web-ifc-three@0.0.126/IFCLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);
camera.position.set(8, 13, 15);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,10,5);
scene.add(light);

const loader = new IFCLoader();
loader.ifcManager.setWasmPath("https://unpkg.com/web-ifc/");

document.getElementById("file-input").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);

  const model = await loader.loadAsync(url);
  scene.add(model);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();