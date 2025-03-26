import styles from "../CompanyDetailPage.module.css";

export function InvestHeader({ className }) {
  return (
    <div className={className}>
      <p className={styles.detialPageWeight700}>
        View My Startup에서 받은 투자{" "}
      </p>
      <button className={styles.investButton}> 투자하기 </button>
    </div>
  );
}

export default InvestHeader;
