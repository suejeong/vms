import { useEffect, useState } from "react";
import { OrderBy } from "../OrderBy/OrderBy";
import styles from "./CompanyRanking.module.css";

const companyRankingList = [
  {
    id: "1",
    name: "기업 A",
    description: "기업 A 소개",
    category: "edu",
    total_investment: 100,
    total_profit: 50,
    employee_count: 200,
    view_invest_amount: 30,
    count_my_picked: 5,
    count_your_picked: 10,
    changed_ad: "2025-03-01",
  },
  {
    id: "2",
    name: "기업 B",
    description: "기업 B 소개",
    category: "shopping",
    total_investment: 80,
    total_profit: 60,
    employee_count: 180,
    view_invest_amount: 20,
    count_my_picked: 4,
    count_your_picked: 9,
    changed_ad: "2025-03-02",
  },
  {
    id: "3",
    name: "기업 C",
    description: "기업 C 소개",
    category: "etc",
    total_investment: 120,
    total_profit: 70,
    employee_count: 300,
    view_invest_amount: 40,
    count_my_picked: 3,
    count_your_picked: 8,
    changed_ad: "2025-03-03",
  },
];

export const CompanyRanking = () => {
  const [companyRankingListState, setCompanyRankingListState] =
    useState(companyRankingList);
  const [orderByState, setOrderByState] = useState("누적 투자금액 높은순");

  const handleOrderChange = (order) => {
    setOrderByState(order);
  };

  const sortCompanies = (orderBy) => {
    let sortedList = [...companyRankingListState];

    switch (orderBy) {
      case "total_investment_asc":
        sortedList.sort((a, b) => a.total_investment - b.total_investment);
        break;
      case "total_investment_desc":
        sortedList.sort((a, b) => b.total_investment - a.total_investment);
        break;
      case "total_profit_asc":
        sortedList.sort((a, b) => a.total_profit - b.total_profit);
        break;
      case "total_profit_desc":
        sortedList.sort((a, b) => b.total_profit - a.total_profit);
        break;
      case "employee_count_asc":
        sortedList.sort((a, b) => a.employee_count - b.employee_count);
        break;
      case "employee_count_desc":
        sortedList.sort((a, b) => b.employee_count - a.employee_count);
        break;
      default:
        break;
    }

    setCompanyRankingListState(sortedList);
  };

  useEffect(() => {
    if (orderByState) {
      sortCompanies(orderByState);
    }
  }, [orderByState]);

  return (
    <>
      <section className={styles.titleArea}>
        <p className={styles.titleText}>기업 순위 확인하기</p>
        <OrderBy
          currentState={orderByState}
          handleOrderChange={handleOrderChange}
        />
      </section>

      <section>
        <table className={styles.CompanyRankingTable}>
          <thead>
            <tr>
              <th>순위</th>
              <th>기업 명</th>
              <th>기업 소개</th>
              <th>카테고리</th>
              <th>누적 투자 금액</th>
              <th>매출액</th>
              <th>고용 인원</th>
            </tr>
          </thead>
          <tbody>
            {companyRankingListState.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
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
