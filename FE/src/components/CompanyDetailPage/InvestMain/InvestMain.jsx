import styles from "./InvestMain.module.scss";

import ChangeToNumber from "../ChangeToNumber/ChangeToNumber";
import InvestTable from "../InvestTable/InvestTable";

export function InvestMain({ companyData, investData }) {
  const totalInvestAmount = investData.reduce(
    (sum, data) => sum + data.investAmount,
    0
  );
  return (
    <div className={styles.ViewMyStartUpMain}>
      <p className={styles.detialPageWeight700}>
        총 {ChangeToNumber(totalInvestAmount)}
      </p>
      <InvestTable
        investData={investData}
        companyData={companyData}
      ></InvestTable>
    </div>
  );
}

export default InvestMain;
