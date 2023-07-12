import Image from 'next/image'
import styles from './page.module.css'
import ModelViewer from '@/components/ModelViewer'
import { Card, CardList } from '@/components/Card/Card'
import Link from 'next/link'
import Divider from '@/components/Divider/Divider'

export default function Home() {
  const techList = ["Javascript", "Typescript", "React", "NextJS", "Node + Express",  "PostgreSQL", "MongoDB", "Python", "GLSL"]

  return (
    <main className={styles.main}>
      <div className={styles.column}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Theo Stavrides</h1>
            <p>Full-stack web developer <br/>Based in Vancouver, BC.</p>
          </div>

          <div className={styles.selfieWrapper}>
            <Image src="/images/selfie.jpeg" alt="selfie" width="170" height="170" className={styles.selfie}/>
          </div>
        </header>

        <hr/>

        <section className={styles.workExperience}>
          <h3>Work Experience</h3>
          
          <p>
            I most recently worked for <a href='https://ceo.ca' target="_blank">CEO.CA</a>, a stock market and social media app.
            Before that I worked at <a href='https://aidynamics.com/' target="_blank">AIDynamics</a>, creating tools for their end-to-end AI platform. 
            I also spent two years as the main web developer of <a href='https://casca.com/' target="_blank">Casca</a>, a shoe company. 
          </p>
          
          <p>Tech I've used recently includes:</p>
          <ul className={styles.techList}>
            {techList.map((tech: string) => {
              return <li key={tech}>{"◦ "}{tech}</li>
            })}
          </ul>

          <div style={{marginTop: 30}}>
            <Link href="/cv" className={styles.cvLink}>
              <Image src="/images/pdf-icons/1.png" alt="cv download" width="36" height="36"/>
              CV
            </Link>
          </div>

        </section>

        {/* <hr /> */}
          
        {/* <ModelViewer/> */}

        {/* <Image src="/images/mask.png" alt="mask 3d render" width="600" height="600"/> */}

        {/* <Divider /> */}


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