import React from "react";
import styles from "./MyCompany.module.scss";
import CompanyInfo from "../../ComparePage/CompanyInfo/CompanyInfo";

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
        <div className={styles.selectedCompany}>
          <CompanyInfo company={myCompanyState} direction="column" />
        </div>
      </section>
    </>
  );
};
