import styles from "./Partition.module.scss";
import ChangeToNumber from "../../ChangeToNumber/ChangeToNumber";
export function Patition({ colum, value }) {
  return (
    <>
      <div className={styles.detailPart}>
        <p className={styles.detailPageColumn}>{colum}</p>
        <p className={styles.detailPageValue}> {ChangeToNumber(value)}</p>
      </div>
    </>
  );
}

export default Patition;
