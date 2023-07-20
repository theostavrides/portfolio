"use client"

import { useEffect, useRef } from 'react';
import CatapultGame from '../games/catapult/game'
import { constants } from '../games/catapult/constants'

export default function GameContainer () {
    const canvasRef = useRef<HTMLCanvasElement|null>(null)

    useEffect(() => {
        if (canvasRef.current !== null) {
            const catapult = new CatapultGame(canvasRef.current)
        }
    }, [canvasRef])

    return (
        <canvas 
            ref={canvasRef} 
            width={constants.canvasParams.width} 
            height={constants.canvasParams.height}
        />
    )
}