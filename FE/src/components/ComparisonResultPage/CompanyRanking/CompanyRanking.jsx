import { useEffect, useState } from "react";
import { OrderByRanking } from "../OrderByRanking/OrderByRanking";
import styles from "./CompanyRanking.module.scss";
import { getCompanyRankingList } from "../../../api/Company.js";
import ChangeToNumber from "../../CompanyDetailPage/ChangeToNumber/ChangeToNumber.jsx";
import getCompanyImage from "../../GetCompanyImage/GetCompanyImage";

export const CompanyRanking = ({
  myCompanyState,
  handleNavigateDetailPage,
}) => {
  const [companyRankingListState, setCompanyRankingListState] = useState([]);
  const [orderByState, setOrderByState] = useState("누적 투자금액 높은순");

  const handleOrderChange = (order) => {
    setOrderByState(order);
  };

  const fetchData = async () => {
    const rankingListData = await getCompanyRankingList(
      myCompanyState.name,
      orderByState
    );
    setCompanyRankingListState(rankingListData);
  };

  useEffect(() => {
    fetchData();
  }, [orderByState]);

  return (
    <>
      <section className={styles.titleArea}>
        <p className={styles.titleText}>기업 순위 확인하기</p>
        <OrderByRanking
          currentState={orderByState}
          handleOrderChange={handleOrderChange}
        />
      </section>

      <section className={styles.CompanyRankingTableWrapper}>
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
              <tr
                key={company.id}
                className={`
                  hover:cursor-pointer hover:bg-[#2a2a2a]
                   ${company.name === myCompanyState.name ? styles.highlight : ""}
                  `
                }
                onClick={() => handleNavigateDetailPage(company.id)}
              >
                <td>{company.ranking}</td>
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
