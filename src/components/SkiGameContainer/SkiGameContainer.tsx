"use client"

import { useEffect, useRef } from 'react';
import { initSkiGame } from '../SkiGame/SkiGame'

const canvasParams = {
    width: 500,
    height: 720,
}

export default function SkiGameContainer () {
    const canvasRef = useRef<HTMLCanvasElement|null>(null)

    useEffect(() => {
        if (canvasRef.current !== null) {
            const skiGame = initSkiGame(canvasRef.current)
        }
    }, [canvasRef])

    return (
        <div>
            <canvas ref={canvasRef} width={canvasParams.width} height={canvasParams.height}/>
        </div>
    )
}