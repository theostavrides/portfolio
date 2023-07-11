import Image from 'next/image'
import styles from './page.module.css'
import ModelViewer from '@/components/ModelViewer'
import { Card, CardList } from '@/components/Card/Card'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.description}>
          <h1 className={styles.title}>Theo Stavrides</h1>
        
        <p>Hello! I'm Theo, a full-stack web developer based in Vancouver, BC.</p>
        
        <p>
          I most recently worked for <a href='https://ceo.ca' target="_blank">CEO.CA</a>, a stock market and social media app.
          Before that I worked at <a href='https://aidynamics.com/' target="_blank">AIDynamics</a>, creating tools for their end-to-end AI platform. 
          I also worked for the shoe company <a href='https://casca.com/' target="_blank">Casca</a>, where I was their primary web developer for two years. 
        </p>

        <p>I have recent experience using the following techologies:  </p>
        
        <ul className={styles.techList}>
          <li>Javascript</li>
          <li>Typescript</li>
          <li>React</li>
          <li>NextJS</li>
          <li>Node + Express</li>
          <li>PostgreSQL</li>
          <li>MongoDB</li>
          <li>C++</li>
          <li>GLSL</li>
        </ul>
      </section>
    </main>
  )
}

/* 
        <section>
          <h3>Clients</h3>
          
          <br />
          <br />
          <br />

          <CardList>
            <Card>
              <Image className={styles.ceoLogo} src="/images/ceo_logo.png" alt="ceo.ca logo" width="900" height="200"/>
            </Card>

            <Card>
              <Image className={styles.aidLogo} src="/images/aid_logo.png" alt="ai dynamics logo" width="700" height="100"/>
            </Card>

            <Card>
              <div >
                <Image style={{ backgroundColor: "#5e5e5e" }} className={styles.anvardaLogo} src="/images/anvarda_logo.png" alt="anvarda logo" width="200" height="50"/>

              </div>
            </Card>

            <Card>
              <Image className={styles.cascaLogo} src="/images/casca_logo.svg" alt="casca logo" width="125" height="25"/>              
            </Card>

          </CardList>
        </section>

        <hr />
        <section>
          <h3>Projects</h3>
        </section> */