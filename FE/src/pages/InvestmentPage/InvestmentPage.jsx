import React, { useState } from "react";
import styles from "./InvestmentPage.module.scss";
import InvestmentPanel from "../../components/InvestmentPanel/InvestmentPanel";
import InvestmentPageBoardList from "../../components/InvestmentPage/InvestmentPageBoardList/InvestmentPageBoardList";
import InvestmentPageBoardPagination from "../../components/InvestmentPage/InvestmentPageBoardPagination/InvestmentPageBoardPagination";
import InvestmentPageBoardTitle from "../../components/InvestmentPage/InvestmentPageBoardTitle/InvestmentPageBoardTitle";
import InvestmentPageBoardFilter from "../../components/InvestmentPage/InvestmentPageBoardFilter/InvestmentPageBoardFilter";

export default function InvestmentPage() {
  const [isInvested, setIsInvested] = useState(false);

  const handleInvest = () => {
    setIsInvested((prev) => !prev);
  };

  return (
    <>
      <div className={styles.companyBoard}>
        <div className={styles.pageTopComponent}>
          <h2 className={styles.totalListHead}>투자 현황</h2>
          <div className={styles.searchAndFilter}>
            <InvestmentPageBoardFilter />
          </div>
        </div>
        <div className={styles.companyList}>
          <InvestmentPageBoardTitle />
          {/* <InvestmentPageBoardList />
        <InvestmentPageBoardPagination /> */}
        </div>

        {/* 해당 코드들은 나중에 기업 투자하기 완성된 후 삭제하도록 하겠습니다. 감사합니다!!!, (황수정) 일단 아래로 내려둘께요! */}
        <button onClick={handleInvest} style={{ color: "white" }}>
          기업에 투자하기(이거 나중에 삭제할게요!!)
        </button>
        {isInvested && <InvestmentPanel handleInvest={handleInvest} />}
      </div>
    </>
  );
}
