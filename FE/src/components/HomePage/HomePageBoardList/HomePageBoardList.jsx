import styles from "./HomePageBoardList.module.scss";
import { Link } from "react-router-dom";
import compnayIcon01 from "../../../../public/images/companies/codeit.png"

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
            <div className={`${styles.boardCell} ${styles.sizeSm}`}>{index + 1}위</div>
            <div className={`${styles.boardCell} ${styles.sizeLg} ${styles.txtLeft} ${styles.companyIcon}`}>
              <img src={compnayIcon01} className={styles.img} />{company.name}
            </div>
            <div className={`${styles.boardCell} ${styles.sizeXlg} ${styles.txtLeft}`}>
            {company.description + " 이건 아주아주 긴 설명 텍스트입니다. 이건 아주아주 긴 설명"}
            </div>
            <div className={`${styles.boardCell} ${styles.sizeMd}`}>{company.category}</div>
            <div className={`${styles.boardCell} ${styles.sizeMd}`}>{company.totalInvestment}억 원</div>
            <div className={`${styles.boardCell} ${styles.sizeMd}`}>{company.totalProfit}억 원</div>
            <div className={`${styles.boardCell} ${styles.sizeMd}`}>{company.employeeCount}명</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePageBoardList;
