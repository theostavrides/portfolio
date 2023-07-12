import Image from 'next/image'
import styles from './page.module.css'
import ModelViewer from '@/components/ModelViewer'
import { Card, CardList } from '@/components/Card/Card'
import Link from 'next/link'
import Divider from '@/components/Divider/Divider'

export default function Home() {
  return (
    <main className={styles.main}>
      
      {/* Column Left */}
      <div className={styles.column}>
        
        {/* Profile Card */}
        <section className={styles.card}>
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>Theo Stavrides</h1>
              <p>Web Developer + Designer <br/>Based in Vancouver, BC.</p>
            </div>

            <div className={styles.selfieWrapper}>
              <Image src="/images/selfie.jpeg" alt="selfie" width="170" height="170" className={styles.selfie}/>
            </div>
          </header>

          <hr className={styles.divider}/>

          <div className={styles.workExperience}>
            <h3>Work Experience</h3>
            
            <p>
              I am currently working as a front-end developer for <a href='https://ceo.ca' target="_blank">CEO.CA</a>, a stock market and social media app.
              Before that I worked at <a href='https://aidynamics.com/' target="_blank">AIDynamics</a>, creating tools for their end-to-end AI platform. 
              I also spent two years as the main web developer of <a href='https://casca.com/' target="_blank">Casca</a>, a shoe company. 
            </p>
            
            <p>Tech I've used recently includes:</p>
            <ul className={styles.techList}>
              {["Javascript", "Typescript", "React", "NextJS", "Node", "Express",  "PostgreSQL", "MongoDB", "GLSL"].map((tech: string) => {
                return <li key={tech}>{"‣ "}{tech}</li>
              })}
            </ul>

            <div style={{ marginTop: 30 }}>
              <Link href="/cv" className={styles.cvLink}>
                <Image src="/images/pdf-icons/1.png" alt="cv download" width="36" height="36"/>
                cv
              </Link>
            </div>
          </div>

        </section>
      </div>

      <div className={styles.column}>
        <section className={styles.card}>
          <h3>doooo</h3>
          <p>fwwefwef  fwwefweffwwefweffwwefweffwwefweffwwefw effwwefweffwwefweffwwefweffwwefweffwwefwef fwwefweffwwefwef</p>
        </section>
      </div>

      {/* Projects Card */}
      

      {/* <ModelViewer/> */}
      
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