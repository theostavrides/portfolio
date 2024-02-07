import styles from './Button.module.css'

interface IProps {
    children: React.ReactNode
    backgroundColor?: string
    color?: string
}

export default function Button({ children, backgroundColor, color } : IProps) {
    return (
        <button className={styles.button}
            style={{
                backgroundColor,
                color
            }}
        >
            <span>
                {children}

            </span>
        </button>
    )
}