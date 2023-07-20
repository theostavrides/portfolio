import * as THREE from 'three'; 
import { OrbitControls } from 'three/examples/jsm//controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class CatapultGame {
    public canvas: HTMLCanvasElement
    public scene: THREE.Scene
    public lights: { [key: string]: THREE.Light }
    public camera: THREE.PerspectiveCamera
    public renderer: THREE.WebGLRenderer
    public controls: OrbitControls
    public modelsLoaded: boolean
    public models: { [key: string]: THREE.Object3D }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.lights = this.initLights()
        this.camera = this.initCamera()
        this.renderer = this.initRenderer()
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.modelsLoaded = false
        this.models = {}
        this.start()

        this.animate = this.animate.bind(this)
    }

    initLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, .2)
        this.scene.add(ambientLight)
    
        const pointLight1 = new THREE.PointLight( 0xffffff, 1, 10000 );
        pointLight1.position.set( 140, 500, 120 );
        pointLight1.castShadow = true
        this.scene.add( pointLight1 );
    
        return { ambientLight, pointLight1 }
    }

    initCamera() {
        const camera = new THREE.PerspectiveCamera(50, this.canvas.width / this.canvas.height, 1, 1000)
        camera.rotateY(-.8)
        camera.rotateX(-.3)
        camera.position.z = 10
        camera.position.y = 5
        camera.position.x = -10
        return camera
    }

    initRenderer() {
        const renderer = new THREE.WebGLRenderer({ canvas:this.canvas, antialias: true })
        renderer.setClearColor( 0xdddddd, 1 );
        renderer.setSize(this.canvas.width, this.canvas.height)
        renderer.shadowMap.enabled = true
    
        return renderer
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

    animate(){
        window.requestAnimationFrame(this.animate)
        this.controls.update();
        this.renderer.render(this.scene, this.camera) 
    }

    async start() {
        if (this.modelsLoaded === false) {
            this.models = await this.initModels()
        }

        this.animate()
    }
}

