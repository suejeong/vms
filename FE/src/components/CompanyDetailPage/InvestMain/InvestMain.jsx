import styles from "./InvestMain.module.scss";

import ChangeToNumber from "../ChangeToNumber/ChangeToNumber";
import InvestTable from "../InvestTable/InvestTable";

export function InvestMain({ investAmount, investData }) {
  return (
    <div className={styles.ViewMyStartUpMain}>
      <p className={styles.detialPageWeight700}>
        {ChangeToNumber(investAmount)}
      </p>
      <InvestTable investData={investData}></InvestTable>
    </div>
  );
}

export default InvestMain;
