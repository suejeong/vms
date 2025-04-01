import React from "react";
import styles from "./MyCompany.module.scss";

export const MyCompany = ({ myCompanyState }) => {
  return (
    <>
      <section className={styles.titleArea}>
        <p className={styles.titleText}>내가 선택한 기업</p>
        <button className={styles.compareButton}>다른 기업 비교하기</button>
      </section>
      <section className={styles.myCompanySection}>
        <img className={styles.myCompanyImage} />
        <p className={styles.myCompanyName}>{myCompanyState.name}</p>
        <p className={styles.myCompanyCategory}>{myCompanyState.category}</p>
      </section>
    </>
  );
};
