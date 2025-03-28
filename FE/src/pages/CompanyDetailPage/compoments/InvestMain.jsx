import styles from "../CompanyDetailPage.module.css";
import InvestTable from "./InvestTable";

export function InvestMain({ className, investAmount, investData }) {
  return (
    <div className={className}>
      <p className={styles.detialPageWeight700}>{investAmount}</p>
      <InvestTable investData={investData}></InvestTable>
    </div>
  );
}

export default InvestMain;
