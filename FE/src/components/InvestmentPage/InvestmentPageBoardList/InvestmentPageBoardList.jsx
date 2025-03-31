import styles from "./InvestmentPageBoardList.module.scss";
import { Link } from "react-router-dom";
import compnayIcon01 from "../../../../public/images/companies/네이버.png";

const InvestmentPageBoardList = ({
  companyList,
  currentPage,
  itemsPerPage,
}) => {
  // if (!companyList.length) return <p className={styles.noSearchResult}>검색 결과가 없습니다</p>;
  return (
    <div>
      {companyList.map((company, index) => {
        const rank = (currentPage - 1) * itemsPerPage + index + 1;
        const isFirst = index === 0;
        const isLast = index === companyList.length - 1;

        return (
          <Link
            to={`/companyDetail/${company.id}`}
            key={company.id}
            className={styles.borderRowLink}
          >
            <div
              className={`${styles.boardRow} ${isFirst ? styles.first : ""} ${
                isLast ? styles.last : ""
              }`}
            >
              <div className={`${styles.boardCell} ${styles.sizeSm}`}>
                {rank}위
              </div>
              <div
                className={`${styles.boardCell} ${styles.sizeLg} ${styles.txtLeft} ${styles.companyIcon}`}
              >
                <img src={compnayIcon01} className={styles.img} />
                {company.name}
              </div>
              <div
                className={`${styles.boardCell} ${styles.sizeXlg} ${styles.txtLeft}`}
              >
                {company.description +
                  " 이건 아주아주 긴 설명 텍스트입니다. 이건 아주아주 긴 설명"}
              </div>
              <div className={`${styles.boardCell} ${styles.sizeMd}`}>
                {company.category}
              </div>
              <div className={`${styles.boardCell} ${styles.sizeMd}`}>
                {company.totalInvestment}억 원
              </div>
              <div className={`${styles.boardCell} ${styles.sizeMd}`}>
                {company.totalProfit}억 원
              </div>
              <div className={`${styles.boardCell} ${styles.sizeMd}`}>
                {company.employeeCount}명
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default InvestmentPageBoardList;
