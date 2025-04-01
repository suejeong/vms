import styles from "./HomePageBoardList.module.scss";
import { Link } from "react-router-dom";

const HomePageBoardList = ({ companyList, currentPage, itemsPerPage }) => {
  if (!companyList.length)
    return <p className={styles.noSearchResult}>검색 결과가 없습니다</p>;
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
                <img
                  src={`../../../../public/images/companies/${company.name}.png`}
                  className={styles.img}
                />
                {company.name}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default HomePageBoardList;
