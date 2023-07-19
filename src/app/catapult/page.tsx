"use client"

import { useEffect, useRef } from 'react';
import CatapultCanvas from '@/components/CatapultCanvas/CatapultCanvas'
import styles from './page.module.css'

  
const Catapult = () => {
  return (
    <main className={styles.main}>
      <CatapultCanvas />
    </main>
  )
}

export default Catapult