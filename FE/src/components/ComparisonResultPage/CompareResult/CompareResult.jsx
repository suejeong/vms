import { useState } from "react";
import { OrderBy } from "../OrderBy/OrderBy";
import styles from "./CompareResult.module.css";
import mockData from "../../../api/mockData.json";

export const CompareResult = () => {
  const [compareResultListState, setCompareResultListState] =
    useState(mockData);
  const [orderByState, setOrderByState] = useState("누적 투자금액 높은순");

  const handleOrderChange = (order) => {
    setOrderByState(order);
  };

  return (
    <>
      <section className={styles.titleArea}>
        <p className={styles.titleText}>기업 순위 확인하기</p>
        <OrderBy
          listState={compareResultListState}
          setListState={setCompareResultListState}
          currentState={orderByState}
          handleOrderChange={handleOrderChange}
        />
      </section>

      <section>
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
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.description}</td>
                <td>{company.category}</td>
                <td>{company.total_investment}</td>
                <td>{company.total_profit}</td>
                <td>{company.employee_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
