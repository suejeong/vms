import styles from "./InvestMain.module.scss";

import ChangeToNumber from "../ChangeToNumber/ChangeToNumber";
import InvestTable from "./InvestTable/InvestTable";
import InvestHeader from "./InvestHeader/InvestHeader";
export function InvestMain({
  companyDataState,
  nowPageState,
  investDataState,
  refetchCompanyInvest,
}) {
  const totalInvestAmount = investDataState.reduce(
    (sum, data) => sum + data.investAmount,
    0
  );

  return (
    <div className={styles.ViewMyStartUpDiv}>
      <InvestHeader
        investDataState={investDataState}
        companyDataState={companyDataState}
        refetchCompanyInvest={refetchCompanyInvest}
      />
      <div className={styles.ViewMyStartUpMain}>
        <p className={styles.detialPageWeight700}>
          총 {ChangeToNumber(totalInvestAmount)}
        </p>
        <InvestTable
          refetchCompanyInvest={refetchCompanyInvest}
          investDataState={investDataState}
          companyDataState={companyDataState}
          nowPageState={nowPageState}
        ></InvestTable>
      </div>
    </div>
  );
}

export default InvestMain;
