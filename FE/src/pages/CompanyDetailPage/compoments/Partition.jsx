import styles from "../CompanyDetailPage.module.css";

export function Patition({ colum, value, className }) {
  return (
    <>
      <div className={className}>
        <p className={styles.detialPageWeight400}>{colum}</p>
        <p className={styles.detialPageWeight600}> {value}</p>
      </div>
    </>
  );
}

export default Patition;
