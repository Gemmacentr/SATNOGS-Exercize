import * as Three from 'https://cdn.skypack.dev/three@0.134.0';

import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js";

document.addEventListener('DOMContentLoaded', function () {

  var textureURL = "./icon/lroc_color_poles_1k.jpg";
  var displacementURL = "icon/ldem_3_8bit.jpg";


  const scene = new Three.Scene();
  const geometry = new Three.SphereGeometry(3, 64, 64);
  const textureLoader = new Three.TextureLoader();
  const texture = textureLoader.load(textureURL);
  const displacementMap = textureLoader.load(displacementURL);


  const material = new Three.MeshStandardMaterial({
    color: 0xffffff,
    map: texture,
    displacementMap: displacementMap,
    displacementScale: 0.09,
    bumpMap: displacementMap,
    bumpScale: 0.10,
  });
  const mesh = new Three.Mesh(geometry, material);
  scene.add(mesh);
  //width
  let w;
  if (window.innerWidth < 800) {
    w = window.innerWidth;
  }
  else {
    w = window.innerWidth / 2;
  }
  let h = window.innerHeight;
  //light 
  const light = new Three.DirectionalLight(0xffffff, 1);
  light.position.set(100, 10, 5);
  scene.add(light);

  //camera
  const camera = new Three.PerspectiveCamera(25, w / h);
  camera.position.z = 20;
  scene.add(camera);

  //render
  const canvas = document.querySelector('#webgl');
  const renderer = new Three.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });

  renderer.setSize(w, h);
  renderer.render(scene, camera);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;



  window.addEventListener("resize", () => {
    const newWidth = window.innerWidth < 800 ? window.innerWidth : window.innerWidth / 2;
    const newHeight = window.innerHeight;

    if (newWidth !== w || newHeight !== h) {
      w = newWidth;
      h = newHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  });
  const loop = () => {
    controls.update();
    mesh.rotation.y += 0.001;
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
  }
  loop();






  const titleElement = document.getElementById('title');
  // Animazione di apparizione dall'alto
  setTimeout(() => {
    titleElement.classList.add('appear-from-top');
  }, 500); // Ritardo prima che inizi l'animazione



  document.getElementById("ctaButton").addEventListener("click", function () {
    // Reindirizza alla pagina "gestisci.html"
    window.location.href = "./Home.html";
  });

});