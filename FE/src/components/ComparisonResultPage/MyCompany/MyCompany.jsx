import React from "react";
import styles from "./MyCompany.module.scss";
import getCompanyImage from "../../GetCompanyImage/GetCompanyImage";

export const MyCompany = ({
  myCompanyState,
  handleChangeCompareResultState,
}) => {
  return (
    <>
      <section className={styles.titleArea}>
        <p className={styles.titleText}>내가 선택한 기업</p>
        <button
          className={styles.compareButton}
          onClick={() => handleChangeCompareResultState()}
        >
          다른 기업 비교하기
        </button>
      </section>
      <section className={styles.myCompanySection}>
        <img
          className={styles.myCompanyImage}
          src={getCompanyImage(myCompanyState.name)}
          alt={myCompanyState.name}
        />
        <p className={styles.myCompanyName}>{myCompanyState.name}</p>
        <p className={styles.myCompanyCategory}>{myCompanyState.category}</p>
      </section>
    </>
  );
};
