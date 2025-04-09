import { useState } from "react";
import { OrderByCompareResultList } from "../OrderByCompareResultList/OrderByCompareResultList";
import styles from "./CompareResult.module.scss";
import ChangeToNumber from "../../CompanyDetailPage/ChangeToNumber/ChangeToNumber";
import getCompanyImage from "../../GetCompanyImage/GetCompanyImage";

export const CompareResult = ({
  myCompanyState,
  compareResultListState,
  setCompareResultListState,
  handleNavigateDetailPage,
}) => {
  const [orderByState, setOrderByState] = useState("누적 투자금액 높은순");

  const handleOrderChange = (order) => {
    setOrderByState(order);
  };

  return (
    <>
      <section className={styles.titleArea}>
        <p className={styles.titleText}>비교 결과 확인하기</p>
        <OrderByCompareResultList
          listState={compareResultListState}
          setListState={setCompareResultListState}
          currentState={orderByState}
          handleOrderChange={handleOrderChange}
        />
      </section>

      <section className={styles.CompareResultTableWrapper}>
        <table className={styles.CompareResultTable}>
          <thead>
            <tr>
              <th>기업 명</th>
              <th>기업 소개</th>
              <th>카테고리</th>
              <th>누적 투자 금액</th>
              <th>매출액</th>
              <th>고용 인원</th>
            </tr>
          </thead>
          <tbody>
            {compareResultListState.map((company) => (
              <tr
                key={company.id}
                className={`
                  hover:cursor-pointer hover:bg-[#2a2a2a]
                  ${company.name === myCompanyState.name ? styles.highlight : ""}
                  `
              }
                onClick={() => handleNavigateDetailPage(company.id)}
              >
                <td>
                  <img src={getCompanyImage(company.name)} alt={company.name} />
                  {company.name}
                </td>
                <td>
                  <p>{company.description}</p>
                </td>
                <td>{company.category}</td>
                <td>{ChangeToNumber(company.totalInvestment)}</td>
                <td>{ChangeToNumber(company.totalProfit)}</td>
                <td>{company.employeeCount}명</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
