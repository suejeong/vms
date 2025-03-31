import styles from "./Partition.module.scss";
import ChangeToNumber from "../ChangeToNumber/ChangeToNumber";
export function Patition({ colum, value }) {
  return (
    <>
      <div className={styles.detailPart}>
        <p className={styles.detialPageWeight400}>{colum}</p>
        <p className={styles.detialPageWeight600}> {ChangeToNumber(value)}</p>
      </div>
    </>
  );
}

export default Patition;
