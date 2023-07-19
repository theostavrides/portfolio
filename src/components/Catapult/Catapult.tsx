import { 
    Engine, 
    Scene, 
    ArcRotateCamera,
    HemisphericLight,
    Vector3,
    Mesh,
    MeshBuilder
} from 'babylonjs';

export const initCatapult = (canvas: HTMLCanvasElement) => {
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);


    const initCamera = () => {
        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        return camera
    }

    const initLights = () => {
        const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        return light1
    }

    const initEnvironment = () => {
        const sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        return sphere
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

    
    initDebugger()
    initCamera()
    initLights()
    initEnvironment()

    engine.runRenderLoop(() => {
        scene.render();
    });
}