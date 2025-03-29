import styles from "./HomePageBoardList.module.scss";
import { Link } from "react-router-dom";

const HomePageBoardList = ({ companyList }) => {
  if (!companyList.length) return <p className={styles.noSearchResult}>검색 결과가 없습니다</p>;
  return (
    <div>
      {companyList.map((company, index) => (
        <Link
          to={`/companyDetail/${company.id}`}
          key={company.id}
          className={styles.borderRowLink}
        >
          <div className={styles.boardRow}>
            <span className={styles.sizeSm}>{index + 1}위</span>
            <span className={`${styles.sizeLg} ${styles.txtLeft}`}>
              {company.name}
            </span>
            <span className={`${styles.sizeXlg} ${styles.txtLeft}`}>
              {company.description}
            </span>
            <span className={styles.sizeMd}>{company.category}</span>
            <span className={styles.sizeMd}>{company.totalInvestment}억 원</span>
            <span className={styles.sizeMd}>{company.totalProfit}억 원</span>
            <span className={styles.sizeMd}>{company.employeeCount}명</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePageBoardList;
