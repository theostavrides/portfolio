import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const initSkiGame = async(canvas: HTMLCanvasElement) => {
    const scene = new THREE.Scene()
          
    const loadModels = async () => {
        const loader = new GLTFLoader();
        const modelData = await loader.loadAsync('models/test.glb')

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
        camera.position.z = 35
        camera.position.y = 3
        return camera
    }

    const initRenderer = () => {
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        })

        renderer.setClearColor( 0x000000, 0 );
        
        renderer.setSize(canvas.width, canvas.height)
        
        return renderer
    }

    const initLights = () => {
        const ambientLight = new THREE.AmbientLight(0xffffff, .2)
        ambientLight.castShadow = true
        scene.add(ambientLight)

        const PointLight1 = new THREE.PointLight( 0xffffff, 1, 1000 );
        PointLight1.position.set( -20, 20, 10 );
        scene.add( PointLight1 );

        const PointLight2 = new THREE.PointLight( 0xeeeeee, 1, 1000 );
        PointLight2.position.set( 10, 10, 40 );
        scene.add( PointLight2 );

        return { ambientLight, PointLight1, PointLight2 }
    }


    const models = await loadModels()
    initLights()
    const camera = initCamera()
    const renderer = initRenderer()

    const animate = () => {
        // models.model.rotation.z = 0.25 * Math.cos(Date.now()/1000)
        // models.model.rotation.y = 0.25 * Math.cos(Date.now()/10000) + (-.05 * Math.PI)
        renderer.render(scene, camera) 
        window.requestAnimationFrame(animate)
    }

    animate()
}

