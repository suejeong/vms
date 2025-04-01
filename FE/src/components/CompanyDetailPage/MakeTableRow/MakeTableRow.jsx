import styles from "./MakeTableRow.module.scss";

export function MakeTableRow({ Name, Rank, InvestAmount, Coment, button }) {
  return (
    <div className={styles.boardRow}>
      <div className={styles.sizeMd}>{Name}</div>
      <div className={styles.sizeMd}>{Rank}</div>
      <div className={styles.sizeMd}>{InvestAmount}</div>
      <div className={styles.sizeLg}>{Coment}</div>
      <div className={styles.sizeSm}>{button}</div>
    </div>
  );
}

export default MakeTableRow;
