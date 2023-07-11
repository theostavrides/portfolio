"use client"

import * as THREE from 'three';
import { useEffect } from 'react';

const canvasParams = {
    width: 100,
    height: 100,
}

export default function ModelViewer () {
    useEffect(() => {
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(50, 1, 1, 1000)
        camera.position.z = 35

        const canvas = document.getElementById('canvas3d') as HTMLCanvasElement

        // Set up renderer
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            // alpha: true
        })
        renderer.setClearColor( 0x000000, 0 );

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        ambientLight.castShadow = true
        scene.add(ambientLight)

        renderer.setSize(canvasParams.width, canvasParams.height)

        const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
        const boxMaterial = new THREE.MeshNormalMaterial();
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    
        scene.add(boxMesh);


        const animate = () => {
            boxMesh.rotation.x += 0.01
            boxMesh.rotation.z += 0.005

            renderer.render(scene, camera)
            window.requestAnimationFrame(animate)
        }

        animate()
    }, [])

    return (
        <div>
            <canvas id="canvas3d" width={canvasParams.width} height={canvasParams.height}/>
        </div>
    )
}