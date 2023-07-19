"use client"

import { useEffect, useRef } from 'react';
import styles from './page.module.css'
import dynamic from 'next/dynamic'

const DynamicCatapultCanvas = dynamic(() => import('@/components/CatapultCanvas/CatapultCanvas'), {
  ssr: false,
  loading: () => <p>loading</p>
})
  
const Catapult = () => {
  return (
    <main className={styles.main}>
      <DynamicCatapultCanvas />
    </main>
  )
}

export default Catapult