import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CatapultGame from "../game"
import { GameObject } from '../classes/GameObject'

interface IConfig {
    game: CatapultGame
    position?: THREE.Vector3
}

export class StoneBlock extends GameObject {
    constructor({ game, position = new THREE.Vector3(0,0,0) } : IConfig) {
        const object3D = game.models.StoneBlock.clone(true)
        
        const body = new CANNON.Body({ 
            mass: 3200, 
            shape: new CANNON.Box(new CANNON.Vec3(2, 1, 1)) 
        })

        // Super
        super({ game, object3D, body, position })
    }
}