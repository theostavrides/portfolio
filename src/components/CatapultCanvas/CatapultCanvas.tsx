"use client"

import { useEffect, useRef } from 'react';
import { initCatapult } from '@/components/Catapult/Catapult'; 
import styles from './CatapultCanvas.module.css'

const canvasParams = {
  width: 500,
  height: 720,
}
  
const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement|null>(null)

  useEffect(() => {
    if (canvasRef.current !== null) {
      const game = initCatapult(canvasRef.current)
    }
  }, [canvasRef])

  return (
    <canvas 
      ref={canvasRef} 
      className={styles.canvas}
      width={canvasParams.width} 
      height={canvasParams.height}
    />
  )
}

export default Canvas