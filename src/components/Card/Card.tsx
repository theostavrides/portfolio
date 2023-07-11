import React from 'react';
import styles from './Card.module.css'


interface IProps {
    children?: React.ReactNode;
}

export const CardList: React.FC<IProps> = ({ children }) => {
    return (
        <div className={styles.cardList}>
            {children}
        </div>
    )
}

export const Card: React.FC<IProps> = ({ children }) => {
    return (
        <div className={styles.card}>
            {children}
        </div>
    )
}

export default Card