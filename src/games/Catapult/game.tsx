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


        // const axesHelper = new THREE.AxesHelper( 5 );
        // this.scene.add( axesHelper );
        // const gridHelper = new THREE.GridHelper( 10, 10 );
        // this.scene.add( gridHelper );

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
        camera.position.x = 0
        camera.position.y = 20
        camera.position.z = 40
        return camera
    }

    initRenderer() {
        const renderer = new THREE.WebGLRenderer({ canvas:this.canvas, antialias: true })
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

    async initCastle ({position, dimensions} : { position: THREE.Vector3, dimensions: THREE.Vector3 }){
        const length = dimensions.x
        const height = dimensions.y
        const width = dimensions.z

        const blocks: StoneBlock[] = []

        // Front Wall
        for (let x = 0; x < length; x++) {
            for (let y = 0; y < height; y++) {
                const isOddLayer = y % 2 !== 0
                const xOffset = isOddLayer ? 1 : 0 
                const sb = new StoneBlock({ 
                    game: this, 
                    position: new THREE.Vector3(
                        position.x + (x * 2) + xOffset, 
                        position.y + y + .5, 
                        position.z + 0
                    ) })
                sb.body.sleep()
                blocks.push(sb)
            }
        }

        // Back Wall
        for (let x = 0; x < length; x++) {
            for (let y = 0; y < height; y++) {
                const isOddLayer = y % 2 !== 0
                const xOffset = isOddLayer ? 0 : 1 
                const sb = new StoneBlock({ 
                    game: this, 
                    position: new THREE.Vector3(
                        position.x + (x * 2) + xOffset,
                        position.y + y + .5, 
                        position.z + (-width*2)
                    ) 
                })
                sb.body.sleep()
                blocks.push(sb)
            }
        }
        

        // Left Wall
        for (let z = 0; z < width; z++) {
            for (let y = 0; y < height; y++) {
                const isOddLayer = y % 2 !== 0
                const zOffset = isOddLayer ? 1 : 0 
                const pos = new THREE.Vector3(
                    position.x + - .5, 
                    position.y + y + .5, 
                    position.z - 1.5 - (z*2) + zOffset
                )
                const sb = new StoneBlock({ game: this, position: pos })
                sb.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), Math.PI/2)
                sb.body.sleep()
                blocks.push(sb)

            }
        }

        // Rright Wall
        for (let z = 0; z < width; z++) {
            for (let y = 0; y < height; y++) {
                const isOddLayer = y % 2 !== 0
                const zOffset = isOddLayer ? 0 : 1 
                const pos = new THREE.Vector3(
                    position.x + -.5 + (length*2), 
                    position.y + y + .5 , 
                    position.z - 1.5 - (z*2) + zOffset
                )
                const sb = new StoneBlock({ game: this, position: pos })
                sb.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), Math.PI/2)
                sb.body.sleep()
                blocks.push(sb)

            }
        }


        setTimeout(() => {
            blocks.forEach(b => b.body.wakeUp())
        }, 1000)

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

        const groundBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
        })

        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
        this.world.addBody(groundBody)

        this.initCastle({position: new THREE.Vector3(-4,0,3), dimensions: new THREE.Vector3(3,12,3)})
        this.initCastle({position: new THREE.Vector3(-3,0,2), dimensions: new THREE.Vector3(2,13,2)})
        this.initCastle({position: new THREE.Vector3(-2,0,1), dimensions: new THREE.Vector3(1,14,1)})


        const initProjectile = () => {
            const position = new THREE.Vector3(2,3,80)
            const sb = new StoneBlock({ game: this, position, mass: 3200 })
            const vx = (Math.random() - 0.5) * 2 - 4
            const vy = 6 + ((Math.random() - 0.5) * 5)
            const vz = -70 + ((Math.random() - 0.5) * 4)
    
            setTimeout(() => {
                sb.body.velocity.set(vx, vy, vz)
            }, 100)
        }

        setTimeout(() => {
            setInterval(() => {
                initProjectile()
            }, 1500)
        }, 2000)


        window.requestAnimationFrame(this.animate)
    }
}

