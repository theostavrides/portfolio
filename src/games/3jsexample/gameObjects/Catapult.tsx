import * as THREE from 'three'
import CatapultGame from "../game"

interface IConfig {
    game: CatapultGame
    position?: THREE.Vector3
}

export class Catapult {
    game: CatapultGame
    object3D: THREE.Object3D

    constructor({ game, position = new THREE.Vector3(0,0,0)} : IConfig) {
        this.game = game

        this.object3D = this.game.models.Catapult.clone(true)
        this.object3D.position.set(position.x, position.y, position.z)
        this.game.scene.add(this.object3D)
    }

    
}