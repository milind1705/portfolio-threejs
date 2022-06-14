import './style.css'

import * as THREE from 'three';
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const gui = new dat.GUI();
const world = {
  plane:{
    width:10,
    height:10
  }
}

//for custome width
gui.add(world.plane, 'width', 1,20 ).onChange(()=>{
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry( world.plane.width,5,5,10);
  const {array} = planeMesh?.geometry?.attributes?.position

for(let i=0; i < array.length; i += 3 ){
  const x = array[i];
  const y = array[i +1];
  const z = array[i + 2];

  array[i + 2] = z + Math.random()
  console.log(z)
}
})
//for custome height
gui.add(world.plane, 'height', 1,20 ).onChange(()=>{
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry( world.plane.width,world.plane.height,5,10);
  const {array} = planeMesh?.geometry?.attributes?.position

for(let i=0; i < array.length; i += 3 ){
  const x = array[i];
  const y = array[i +1];
  const z = array[i + 2];

  array[i + 2] = z + Math.random()
  
}


})

const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGL1Renderer();

renderer.setSize(innerWidth,innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement )

// const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const boxMaterial = new THREE.MeshBasicMaterial({color: 0x004400});

// const mesh = new THREE.Mesh(boxGeometry, boxMaterial);

// scene.add(mesh);
// camera.position.z = 5
//for plane

const planeGeometry = new THREE.PlaneGeometry(5,5,5,10)
const planeMaterial = new THREE.MeshPhongMaterial({ color:0xff0000, side:THREE.DoubleSide, flatShading:THREE.FlatShading, vertexColor: true});

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(0,0,1)
scene.add(light)

const backLight = new THREE.DirectionalLight(0xffffff,1)
backLight.position.set(0,0, -1)
scene.add(backLight)


const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
camera.position.z = 5


scene.add(planeMesh);
const {array} = planeMesh?.geometry?.attributes?.position

for(let i=0; i < array.length; i += 3 ){
  const x = array[i];
  const y = array[i +1];
  const z = array[i + 2];

  array[i + 2] = z + Math.random()
}
console.log(planeMesh?.geometry?.attributes)

const colors =[];
for (let i = 0; i < planeMesh?.geometry?.attributes?.position.count; i++) {
  colors.push(0,1,0)
  
}

planeMesh?.geometry?.setAttribute('color',new THREE.BufferAttribute(new Float32Array(colors), 3))
const mouse = {
  x: undefined,
  y: undefined
}

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera)
  raycaster.setFromCamera(mouse,camera)
  const intersect = raycaster.intersectObject(planeMesh);
  // console.log(intersect)
  // mesh.rotation.x +=0.01;
  // mesh.rotation.z +=0.01
  // planeMesh.rotation.x +=0.01
  // planeMesh.rotation.z +=0.01
}
animate()

//hover effect


addEventListener('mousemove', (event)=>{
mouse.x = (event.clientX /innerWidth) * 2 -1
mouse.y = -(event.clientY/ innerHeight) *2 + 1;

})