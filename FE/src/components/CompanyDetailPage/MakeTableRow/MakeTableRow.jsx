import styles from "./MakeTableRow.module.scss";

export function MakeTableRow({
  id,
  Name,
  Rank,
  InvestAmount,
  Coment,
  style,
  button,
}) {
  return (
    <div id={id} className={styles.tableRow} style={style}>
      <div className={styles.sizeMd}>{Name}</div>
      <div className={styles.sizeMd}>{Rank}</div>
      <div className={styles.sizeMd}>{InvestAmount}</div>
      <div className={styles.sizeLg}>{Coment}</div>
      <div className={styles.sizeSm}> {button}</div>
    </div>
  );
}

export default MakeTableRow;
