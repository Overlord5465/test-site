const scene = new THREE.Scene();
const canvas5465 = document.querySelector('#WebGL-start')

const camera = new THREE.PerspectiveCamera(75, (main.offsetWidth * 0.9) / (window.innerHeight / 2), 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize((main.offsetWidth * 0.9), (window.innerHeight / 2));
const canvasCube = canvas5465.appendChild(renderer.domElement);
canvasCube.setAttribute("class", "canvas_center");

let cube;

const loader = new THREE.TextureLoader();

loader.load('images/metal003.png', texture => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  const geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
  const material = new THREE.MeshLambertMaterial({ map: texture, shading: THREE.FlatShading });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  draw1();
});

const light = new THREE.AmbientLight('rgb(255,255,255)'); // soft white light
scene.add(light);

const spotLight = new THREE.SpotLight('rgb(255,255,255)');
spotLight.position.set(100, 1000, 1000);
spotLight.castShadow = true;
scene.add(spotLight);

function draw1() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(draw1);
}