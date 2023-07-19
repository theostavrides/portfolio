import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const initSkiGame = async(canvas: HTMLCanvasElement) => {
    const scene = new THREE.Scene()
          
    const loadModels = async () => {
        const loader = new GLTFLoader();
        const modelData = await loader.loadAsync('models/catapult.glb')
        const models: {[key: string]: THREE.Object3D} = {} 

        modelData.scene.children.forEach(model => {
            const modelName = model.userData.name as string
            models[modelName] = model
        })

        scene.add(...modelData.scene.children)

        return models
    }

    const initCamera = () => {
        const camera = new THREE.PerspectiveCamera(50, canvas.width / canvas.height, 1, 1000)
        camera.rotateY(-.8)
        camera.rotateX(-.3)
        camera.position.z = 10
        camera.position.y = 5
        camera.position.x = -10
        return camera
    }

    const initRenderer = () => {
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        })

        renderer.setClearColor( 0xdddddd, 1 );
        
        renderer.setSize(canvas.width, canvas.height)
        renderer.shadowMap.enabled = true

        return renderer
    }

    const initLights = () => {
        const ambientLight = new THREE.AmbientLight(0xffffff, .2)
        scene.add(ambientLight)

        const pointLight1 = new THREE.PointLight( 0xffffff, 1, 10000 );
        pointLight1.position.set( 140, 500, 120 );
        scene.add( pointLight1 );

        pointLight1.castShadow = true

        // const PointLight2 = new THREE.PointLight( 0xeeeeee, 1, 1000 );
        // PointLight2.position.set( 20, 10, 20 );
        // scene.add( PointLight2 );

        return { ambientLight, pointLight1 }
    }


    const models = await loadModels()
    initLights()
    const camera = initCamera()
    const renderer = initRenderer()
    
    console.log(models)
    renderer.render(scene, camera) 
    // const animate = () => {
    //     window.requestAnimationFrame(animate)
    // }

    // animate()
}

