"use client"

import * as THREE from 'three';
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvasParams = {
    width: 500,
    height: 720,
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
                return data.scene.children[0]
            }
              
            const loadModels = async () => {
                const loader = new GLTFLoader();
                const modelData = await loader.loadAsync('models/head.glb')
                const model = setupModel(modelData) as THREE.Object3D

                model.scale.x = 70
                model.scale.y = 70
                model.scale.z = 70
    
                return { model }
            }
    
            const camera = new THREE.PerspectiveCamera(50, canvasParams.width / canvasParams.height, 1, 1000)
            camera.position.z = 35
            camera.position.y = 3
    
            const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    
            // Set up renderer
            const renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                // alpha: true
            })

            // renderer.setClearColor( 0x000000, 0 );
            // 
    
            // const ambientLight = new THREE.AmbientLight(0xffffff, .2)
            // ambientLight.castShadow = true
            // scene.add(ambientLight)

            const light = new THREE.PointLight( 0xffffff, 1, 1000 );
            light.position.set( -20, 20, 10 );
            scene.add( light );

            const light2 = new THREE.PointLight( 0xeeeeee, 1, 1000 );
            light2.position.set( 10, 10, 40 );
            scene.add( light2 );
    
            renderer.setSize(canvasParams.width, canvasParams.height)
    
            const models = await loadModels()
            
            scene.add(models.model)
        
            const animate = () => {
                models.model.rotation.z = 0.25 * Math.cos(Date.now()/1000)
                models.model.rotation.y = 0.25 * Math.cos(Date.now()/10000) + (-.05 * Math.PI)
                renderer.render(scene, camera) 
                console.log('r')
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