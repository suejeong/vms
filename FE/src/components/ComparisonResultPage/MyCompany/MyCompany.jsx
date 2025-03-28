import React from "react";
import styles from "./MyCompany.module.css";

export const MyCompany = () => {
  return (
    <>
      <section className={styles.titleArea}>
        <p className={styles.titleText}>내가 선택한 기업</p>
        <button className={styles.compareButton}>다른 기업 비교하기</button>
      </section>
      <section className={styles.myCompanySection}>
        <img className={styles.myCompanyImage} />
        <p className={styles.myCompanyName}>기업명</p>
        <p className={styles.myCompanyCategory}>카테고리</p>
      </section>
    </>
  );
};
