"use client"

import { useEffect, useRef } from 'react';
import styles from './page.module.css'
import dynamic from 'next/dynamic'
import GameContainer from '@/components/GameContainer';


  
const Catapult = () => {
  return (
    <main className={styles.main}>
      <GameContainer />
    </main>
  )
}

export default Catapult