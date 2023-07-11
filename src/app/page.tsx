import Image from 'next/image'
import styles from './page.module.css'
import ModelViewer from '@/components/ModelViewer'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.column}>
        <section>
          <h1 className={styles.title}>Theo Stavrides</h1>
          <h3>Web Developer / Digital Artist / Musician </h3>
        </section>

        <section>
          <ModelViewer />
        </section>

        <hr />

        <section>
          <h3>Clients</h3>
          
          <br />
          <br />
          <br />

          <ul className={styles.clientList}>

            <li>
              <Image className={styles.ceoLogo} src="/images/ceo_logo.png" alt="ceo.ca logo" width="900" height="200"/>
            </li>

            <li>
              <Image className={styles.aidLogo} src="/images/aid_logo.png" alt="ai dynamics logo" width="700" height="100"/>
            </li>

            <li>
              <Image className={styles.anvardaLogo} src="/images/anvarda_logo.png" alt="anvarda logo" width="200" height="50"/>
            </li>
            
            <li>
              <Image className={styles.cascaLogo} src="/images/casca_logo.svg" alt="casca logo" width="125" height="25"/>
            </li>

          </ul>
        </section>

        <hr />
        <section>

        </section>
      </div>
    </main>
  )
}
