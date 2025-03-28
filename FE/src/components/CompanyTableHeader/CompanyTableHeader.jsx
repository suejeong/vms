import React from "react";
import styles from "./CompanyTableHeader.module.scss";

function CompanyTableHeader() {
  return (
    <div className={styles.header}>
      <ul className={styles.headerList}>
        <li className={`${styles.headerItem} ${styles.rank}`}>순위</li>
        <li className={`${styles.headerItem} ${styles.name}`}>기업 명</li>
        <li className={`${styles.headerItem} ${styles.description}`}>
          기업 소개
        </li>
        <li className={`${styles.headerItem} ${styles.category}`}>카테고리</li>
        <li className={`${styles.headerItem} ${styles.mySelectCount}`}>
          나의 기업 선택 횟수
        </li>
        <li className={`${styles.headerItem} ${styles.compareSelectCount}`}>
          비교 기업 선택 횟수
        </li>
      </ul>
    </div>
  );
}

export default CompanyTableHeader;
