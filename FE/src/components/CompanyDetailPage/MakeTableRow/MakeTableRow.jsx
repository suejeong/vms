import styles from "./MakeTableRow.module.scss";

export function MakeTableRow({className,Name,Rank,InvestAmount,Coment}){

return (

<div className={className}>
      <div className={styles.sizeSm}>{Name}</div>
      <div className={styles.sizeLg}>{Rank}</div>
      <div className={styles.sizeXlg}>{InvestAmount}</div>
      <div className={styles.sizeMd}>{Coment}</div>
      <div className={styles.sizeMd}><button></button></div>
    </div>


)

}

export default MakeTableRow;


