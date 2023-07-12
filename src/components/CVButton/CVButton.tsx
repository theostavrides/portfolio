import Image from "next/image";
import Link from "next/link";
import styles from './CVButton.module.css'

export default function CVButton (){
    return (
        <Link href="/cv" className={styles.cvLink}>
            <button>
                <Image src="/images/pdf-icons/1.png" alt="cv download" width="45" height="45"/>
                <span>CV</span>
            </button>
        </Link>
    )
}