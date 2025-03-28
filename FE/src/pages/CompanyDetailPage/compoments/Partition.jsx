import styles from "../CompanyDetailPage.module.css";
import ChangeToNumber from "./ChangeToNumber";
export function Patition({ colum, value, className }) {
  return (
    <>
      <div className={className}>
        <p className={styles.detialPageWeight400}>{colum}</p>
        <p className={styles.detialPageWeight600}> {ChangeToNumber(value)}</p>
      </div>
    </>
  );
}

export default Patition;
