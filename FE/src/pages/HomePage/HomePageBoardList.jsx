import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePageBoardList = ( {companyList} ) => {
  if (!companyList.length) return <p>검색 결과가 없습니다.</p>;
  return (
    <div>
     {companyList.map((company, index) =>(
      <Link 
        to={`/companyDetail/${company.id}`} 
        key={company.id}
        className={styles.borderRowLink}
      >
        <div className={styles.boardRow}>
          <span className={styles.sizeSm}>{index + 1}위</span>
          <span className={`${styles.sizeLg} ${styles.txtLeft}`}>{company.name}</span>
          <span className={`${styles.sizeXlg} ${styles.txtLeft}`}>{company.description}</span>
          <span className={styles.sizeMd}>{company.category}</span>
          <span className={styles.sizeMd}>{company.total_investment}</span>
          <span className={styles.sizeMd}>{company.total_profit}</span>
          <span className={styles.sizeMd}>{company.employee_count}</span>
        </div>
      </Link>
      ))}
    </div>
  )
}

export default HomePageBoardList