import styles from './Button.module.css'

interface IProps {
    children: React.ReactNode
}

export default function Button({ children } : IProps) {
    return (
        <button className={styles.button}>
            <span>
                {children}

            </span>
        </button>
    )
}