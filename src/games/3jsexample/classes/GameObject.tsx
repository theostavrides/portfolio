import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CatapultGame from "../game"

interface IGameObjectConfig {
    game: CatapultGame
    object3D: THREE.Object3D
    body: CANNON.Body
    position: THREE.Vector3
}

export class GameObject {
    public game: CatapultGame
    public object3D: THREE.Object3D
    public body: CANNON.Body

    constructor({ game, object3D, body, position } : IGameObjectConfig){
        this.object3D = object3D
        this.body = body
        this.game = game

        this.game = game
        this.object3D = object3D
        this.body = body        

        body.position.set(position.x, position.y, position.z)
        object3D.position.set(position.x, position.y, position.z)

        this.game.scene.add(this.object3D)
        this.game.world.addBody(this.body)
        this.game.gameObjects.push(this)
    }

    tick() {
        const {x,y,z} = this.body.position
        this.object3D.position.copy(new THREE.Vector3(x,y,z))

        const { x: x0, y: y0, z: z0, w: w0 } = this.body.quaternion
        this.object3D.quaternion.copy(new THREE.Quaternion(x0,y0,z0,w0))
    }
}