import styles from "../CompanyDetailPage.module.scss";
import InvestTable from "./InvestTable";
import ChangeToNumber from "./ChangeToNumber";

export function InvestMain({ className, investAmount, investData }) {
  return (
    <div className={className}>
      <p className={styles.detialPageWeight700}>
        {ChangeToNumber(investAmount)}
      </p>
      <InvestTable investData={investData}></InvestTable>
    </div>
  );
}

export default InvestMain;
