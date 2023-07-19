import { 
    Engine, 
    Scene, 
    ArcRotateCamera,
    HemisphericLight,
    Vector3,
    SceneLoader
} from '@babylonjs/core'

import "@babylonjs/loaders/glTF"
import "@babylonjs/inspector"


export const initCatapult = async (canvas: HTMLCanvasElement) => {
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const initCamera = () => {
        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new Vector3(0,3,6), scene);
        camera.attachControl(canvas, true);
        return camera
    }

    const initLights = () => {
        const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        return light1
    }

    const initEnvironment = () => {
        // const sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        // return sphere
    }
    
    const initDebugger = () => {
        window.addEventListener("keydown", (ev) => {
            if (ev.shiftKey && ev.key === 'I') {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });
    }
    
     
    const importModels = async () => {
        const result = await SceneLoader.ImportMeshAsync(["Catapult"], "models/", "catapult.glb", scene);
        console.log(scene.getNodeByName("Catapult"))
    }
    
    initDebugger()
    initCamera()
    initLights()
    initEnvironment()
    importModels()

    engine.runRenderLoop(() => {
        scene.render();
    });
}