import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CatapultGame from "../game"
import { GameObject } from '../classes/GameObject'

interface IConfig {
    game: CatapultGame
    position: THREE.Vector3
    quaternion?: CANNON.Vec3
    mass?: number
}

export class StoneBlock extends GameObject {
    constructor({ game, position, quaternion, mass } : IConfig) {
        const object3D = game.models.StoneBlock.clone(true)
        
        const body = new CANNON.Body({ 
            mass: mass||3200, 
            shape: new CANNON.Box(new CANNON.Vec3(.99999, .49999, .49999))
        })

        // Super
        super({ game, object3D, body, position })
    }
}