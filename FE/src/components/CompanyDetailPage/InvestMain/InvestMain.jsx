import styles from "./InvestMain.module.scss";

import ChangeToNumber from "../ChangeToNumber/ChangeToNumber";
import InvestTable from "../InvestTable/InvestTable";

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
  );
}

export default InvestMain;
