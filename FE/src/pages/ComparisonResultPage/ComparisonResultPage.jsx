import { useEffect, useState } from "react";
import { CompareResult } from "../../components/ComparisonResultPage/CompareResult/CompareResult";
import { CompanyRanking } from "../../components/ComparisonResultPage/CompanyRanking/CompanyRanking";
import { MyCompany } from "../../components/ComparisonResultPage/MyCompany/MyCompany";
import styles from "./ComparisonResultPage.module.scss";
import { useParams, useSearchParams } from "react-router-dom";
import { getComparedcompany } from "../../api/Company.js";

export const ComparisonResultPage = () => {
  // 파일 합치기 전 임시 방안.
  const myCompany = useParams();
  // 내 기업 스테이트
  // eslint-disable-next-line no-unused-vars
  const [myCompanyState, setMyCompanyState] = useState(myCompany);

  // 파일 합치기 전 임시 방안.
  // 비교할 기업 스테이트
  const [searchParams] = useSearchParams();
  const compareCompanies = searchParams.get("compareCompanies");

  //비교할 기업 스테이트
  // const [selectedCompanyState, setSelectedCompanyState] =
  //   useState(compareCompanies);

  // 비교 결과 스테이트
  const [compareResultListState, setCompareResultListState] = useState([]);

  useEffect(() => {
    const compareData = [myCompanyState, ...compareCompanies];
    const compareResultListData = getComparedcompany(compareData);
    setCompareResultListState(compareResultListData);
  }, []);
  return (
    <>
      <MyCompany myCompanyState={myCompanyState} />
      <CompareResult
        myCompanyState={myCompanyState}
        compareResultListState={compareResultListState}
        setCompareResultListState={setCompareResultListState}
      />
      <CompanyRanking myCompanyState={myCompanyState} />
      <div className={styles.buttonDiv}>
        <button className={styles.investButton}>나의 기업에 투자하기</button>
      </div>
    </>
  );
};
