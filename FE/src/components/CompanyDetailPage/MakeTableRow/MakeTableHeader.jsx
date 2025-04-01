import styles from "./MakeTableHeader.module.scss";

export function MakeTableHeader({ Name, Rank, InvestAmount, Coment, button }) {
  return (
    <div className={styles.boardHeader}>
      <div className={styles.sizeMd}>{Name}</div>
      <div className={styles.sizeMd}>{Rank}</div>
      <div className={styles.sizeMd}>{InvestAmount}</div>
      <div className={styles.sizeLg}>{Coment}</div>
      <div className={styles.sizeSm}>{button}</div>
    </div>
  );
}

export default MakeTableHeader;
