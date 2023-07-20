import * as THREE from 'three'; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const initModels = async () => {
    const loader = new GLTFLoader();
    const modelData = await loader.loadAsync('models/catapult.glb')
    const models: {[key: string]: THREE.Object3D} = {} 

    modelData.scene.children.forEach(model => {
        const modelName = model.userData.name as string
        models[modelName] = model
    })

    return models
}