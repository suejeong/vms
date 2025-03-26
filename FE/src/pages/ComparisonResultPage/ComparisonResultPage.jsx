import React from "react";

import { CompareResult } from "../../components/ComparisonResultPage/CompareResult/CompareResult";
import { CompanyRanking } from "../../components/ComparisonResultPage/CompanyRanking/CompanyRanking";
import { MyCompany } from "../../components/ComparisonResultPage/MyCompany/MyCompany";
import styles from "./ComparisonResultPage.module.css";

export const ComparisonResultPage = () => {
  return (
    <>
      <MyCompany />
      <CompareResult />
      <CompanyRanking />
      <div className={styles.buttonDiv}>
        <button className={styles.investButton}>나의 기업에 투자하기</button>
      </div>
    </>
  );
};
