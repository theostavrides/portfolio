import * as THREE from 'three'; 
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm//controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Catapult } from './gameObjects/Catapult';
import { StoneBlock } from './gameObjects/StoneBlock';
import { GameObject } from './classes/GameObject';

interface IModels {
    Catapult: THREE.Object3D,
}

let lastFrameTime = 0

export default class CatapultGame {
    public canvas: HTMLCanvasElement
    public scene: THREE.Scene
    public lights: { [key: string]: THREE.Light }
    public camera: THREE.PerspectiveCamera
    public renderer: THREE.WebGLRenderer
    public controls: OrbitControls
    public models: { [key: string]: THREE.Object3D }
    public world: CANNON.World
    public clock: THREE.Clock
    public gameObjects: GameObject[]

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.lights = this.initLights()
        this.camera = this.initCamera()
        this.renderer = this.initRenderer()
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.models = {}
        this.world = this.initPhysicsWorld()
        this.clock = new THREE.Clock()
        this.gameObjects = []


        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
        const gridHelper = new THREE.GridHelper( 10, 10 );
        this.scene.add( gridHelper );

        this.start()

        this.animate = this.animate.bind(this)
    }

    initLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, .2)
        this.scene.add(ambientLight)
    
        const pointLight1 = new THREE.PointLight( 0xffffff, 1, 1000 );
        pointLight1.position.set( 14, 50, 12 );
        pointLight1.castShadow = true
        this.scene.add( pointLight1 );
    
        return { ambientLight, pointLight1 }
    }

    initCamera() {
        const camera = new THREE.PerspectiveCamera(50, this.canvas.width / this.canvas.height, 1, 1000)
        camera.position.z = 15
        camera.position.y = 5
        camera.position.x = 0
        return camera
    }

    initRenderer() {
        const renderer = new THREE.WebGLRenderer({ canvas:this.canvas, antialias: false })
        renderer.setClearColor( 0xdddddd, 1 );
        renderer.setSize(this.canvas.width, this.canvas.height)
        renderer.shadowMap.enabled = true
    
        return renderer
    }

    initPhysicsWorld(){
        const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) })
        return world
    }

    async initModels () {
        const loader = new GLTFLoader();
        const modelData = await loader.loadAsync('models/catapult.glb')
        const models: {[key: string]: THREE.Object3D} = {} 
    
        modelData.scene.children.forEach(model => {
            const modelName = model.userData.name as string
            models[modelName] = model
        })

        return models
    }

    async initGameObjects (){
        const lim = 6
        for (let x = 0; x < lim; x++) {
            for (let y = 0; y < lim; y++) {
                for (let z = 0; z < lim; z++) {
                    const x0 = x * 3 - 10
                    const y0 = y * 3 + 4
                    const z0 = z * 3 - 10
                    const sb = new StoneBlock({ game: this, position: new THREE.Vector3(x0, y0, z0) })
                    sb.body.applyTorque(new CANNON.Vec3(Math.random(),Math.random(), Math.random()))
                }
            }
        }



        const groundBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
        })
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
        this.world.addBody(groundBody)



    }

    animate(){
        window.requestAnimationFrame(this.animate)
        
        const delta = this.clock.getDelta()
        
        this.gameObjects.forEach(gomj => gomj.tick())
        this.controls.update()
        this.world.fixedStep(delta)
        this.renderer.render(this.scene, this.camera) 
    }

    async start() {
        this.models = await this.initModels()

        this.initGameObjects()

        window.requestAnimationFrame(this.animate)
    }
}

