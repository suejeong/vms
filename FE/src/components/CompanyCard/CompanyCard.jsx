import React from "react";
import styles from './CompanyCard.module.css';

export default function CompanyCard({ company, rank }) {
    const { name, description, category, countMyPicked, countYourPicked } = company;

    // 숫자를 천 단위로 포맷하는 함수작성
    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    return (
        <ul className={styles.cardContainer}>
            <li className={`${styles.cardItem} ${styles.rankItem}`}>
                <span className={styles.rankText}>{rank}위</span>
            </li>
            <li className={`${styles.cardItem} ${styles.imageItem}`}>
                <img 
                    src=""  // 이미지 나중에 처리하겠습니다!!!
                    alt={name} 
                    className={styles.cardImage} 
                />
                <span className={`${styles.nameText} ${styles.cardName}`}>{name}</span>
            </li>
            <li className={`${styles.cardItem} ${styles.descriptionItem}`}>
                <span className={styles.descriptionText}>{description}</span>
            </li>
            <li className={`${styles.cardItem} ${styles.categoryItem}`}>
                <span className={styles.categoryText}>{category}</span>
            </li>
            <li className={`${styles.cardItem} ${styles.myPickedItem}`}>
                <span className={styles.myPickedText}>{formatNumber(countMyPicked)}</span>
            </li>
            <li className={`${styles.cardItem} ${styles.yourPickedItem}`}>
                <span className={styles.yourPickedText}>{formatNumber(countYourPicked)}</span>
            </li>
        </ul>
    );
}
