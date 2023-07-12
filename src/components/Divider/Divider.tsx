import styles from './Divider.module.css'



export const Divider: React.FC<{}> = () => {
    const numDots = 5
    return (
        <div className={styles.divider}>
            {Array.from({length: numDots}, (v, i) => i).map(i => {
                return '*'
            })}
        </div>
    )
}

export default Divider