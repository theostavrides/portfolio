"use client"

import * as THREE from 'three';
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvasParams = {
    width: 300,
    height: 300,
}

interface IParams {
    id: string;
}

export default function ModelViewer ({ id }: IParams) {
    const canvasId = `${id}-canvas3d`

    useEffect(() => {
        const load = async () => {
            const scene = new THREE.Scene()
    
            const setupModel = (data: any) => {
                const model = data.scene.children[0]
              
                return model
            }
              
            const loadModels = async () => {
                const loader = new GLTFLoader();
                const modelData = await loader.loadAsync('models/building.gltf')
                const building = setupModel(modelData)
    
                return { building }
            }
    
            const camera = new THREE.PerspectiveCamera(50, 1, 1, 1000)
            camera.position.z = 35
    
            const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    
            // Set up renderer
            const renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                // alpha: true
            })
            renderer.setClearColor( 0x000000, 0 );
    
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
            ambientLight.castShadow = true
            scene.add(ambientLight)

            const light = new THREE.PointLight( 0xff0000, 20, 100 );
            light.position.set( 50, 50, 50 );
            scene.add( light );
    
            renderer.setSize(canvasParams.width, canvasParams.height)
    
            const models = await loadModels()
            
            scene.add(models.building)
    
    
    
    
            const animate = () => {
                models.building.rotation.x += .005
                models.building.rotation.y += .005
                renderer.render(scene, camera)
                window.requestAnimationFrame(animate)
            }
    
            animate()
        }

        load()
    }, [canvasId])

    return (
        <div>
            <canvas id={canvasId} width={canvasParams.width} height={canvasParams.height}/>
        </div>
    )
}