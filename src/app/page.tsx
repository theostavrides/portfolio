import Image from 'next/image'
import styles from './page.module.css'
import ModelViewer from '@/components/ModelViewer'
import { Card, CardList } from '@/components/Card/Card'
import Link from 'next/link'
import Divider from '@/components/Divider/Divider'

export default function Home() {
  const techList = ["Javascript", "Typescript", "React", "NextJS", "Node + Express",  "PostgreSQL", "MongoDB", "C++", "GLSL"]

  return (
    <main className={styles.main}>
      <div className={styles.column}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Theo Stavrides</h1>
            <p>Full-stack web developer <br/>Based in Vancouver, BC.</p>
          </div>

          <div className={styles.selfieWrapper}>
            <Image src="/images/selfie.jpeg" alt="selfie" width="180" height="180" className={styles.selfie}/>
          </div>
        </header>

        <section className={styles.description}>
          
          <p>
            I most recently worked for <a href='https://ceo.ca' target="_blank">CEO.CA</a>, a stock market and social media app.
            Before that I worked at <a href='https://aidynamics.com/' target="_blank">AIDynamics</a>, creating tools for their end-to-end AI platform. 
            I also spent two years as the main web developer of <a href='https://casca.com/' target="_blank">Casca</a>, a shoe company. 
          </p>

          {/* <p>After graduating from UBC in 2013 and then teaching for 5 years, I completed the web development bootcamp at Lighthouse Labs and switched careers.</p> */}

          <Divider />

          {/* <p>Some of the techologies I have used recently include:  </p>
          
          <ul className={styles.techList}>
            {techList.map((tech: string) => {
              return <li key={tech}>{"◦ "}{tech}</li>
            })}
          </ul>
          <p></p> */}

          {/* <div className={styles.divider}>~</div> */}
        </section>

      </div>
      
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