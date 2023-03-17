import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Lights
const hlight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(hlight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 1, 1)
directionalLight.castShadow = true
scene.add(directionalLight)

const directionalLight2 = new THREE.DirectionalLight(0xffffff, .5)
directionalLight2.position.set(0, -1, -1)
directionalLight2.castShadow = true
scene.add(directionalLight2)

// Load 3d model
const loader = new GLTFLoader()

let model;

loader.load('/models/model.glb', function (gltf) {
    model = gltf.scene.children[0]
    model.material.color.set(0xffffff)
    model.scale.set(1, 1, 1)
    scene.add(model)

}, undefined, function (err) {
    console.error(err)
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.rotateSpeed = 0.5
controls.zoomSpeed = 0.5
controls.panSpeed = 0.5
controls.target.set(0, 0, 0)
// Add click event listener to the canvas
// Handle click event
canvas.addEventListener('click', () => {
// Change model's color to red
    model.material.color.set(0xff0000);
// Rotate model on the x-axis
    model.rotation.set(Math.PI/8,0,0);
});

// Animate
const tick = () => {
// Render
    renderer.render(scene, camera)
// Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()