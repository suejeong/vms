import styles from "./CompanyDetailPage.module.scss";
import Patition from "../../components/CompanyDetailPage/Partition/Partition";
import Description from "../../components/CompanyDetailPage/Description/Description";
import LogoAndName from "../../components/CompanyDetailPage/LogoAndName/LogoAndName";
import InvestHeader from "../../components/CompanyDetailPage/InvestHeader/InvestHeader";
import InvestMain from "../../components/CompanyDetailPage/InvestMain/InvestMain";
import PageNationButton from "../../components/CompanyDetailPage/PaseNationButton/PaseNationButton";
import { getCompany } from "../../api/Company";
import { getCompanyInvest } from "../../api/Invest";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function CompanyDetailPage() {
  // 기업 상세 페이지에 필요한 하나의 기업 정보 state
  const [companyData, setCompanyData] = useState(null);
  // 기업 상세 페이지에 필요한 기업 하나의 투자 정보 state
  const [investData, setInvestData] = useState([]);
  //로딩 상태 데이터를 다 가져오면 화면을 그리기 위한 state
  const [loading, setLoading] = useState(true);
  // 가져올 회사 ID (예제, 실제로는 props나 params에서 가져올 수도 있음)
  const { companyId } = useParams();
  // 컴포넌트가 처음 마운트될 때 API 호출

  //리페치 컴페니인베스트 함수 만들어서 이걸 프롭스로 테이블에...
  const refetchCompanyInvest = async () => {
    const investD = await getCompanyInvest(companyId);
    setInvestData(investD);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyD = await getCompany(companyId);

        let investD = [];
        try {
          investD = await getCompanyInvest(companyId);
        } catch (error) {
          if (error.response?.status === 404) {
            console.warn("투자 정보가 없음. 빈 배열로 처리.");
          } else {
            throw error;
          }
        }

        setCompanyData(companyD);
        setInvestData(investD || []);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId]);

  // ✅ 로딩 중이면 "로딩 중..." 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }
  const companyName = companyData.name;
  const imgsrc = `/images/companies/${companyName}.png`;

  const handlePageChange = () => {
    console.log(만드는중);
  };
  console.log(investData);
  console.log(investData.length);

  // const MakePageNationButton = ({ investData, handlePageChange }) => {
  //   const count = Math.ceil(investData.length / 5); // 5개씩 나눈 총 페이지 수
  //   const buttons = [];

  //   // 이전 페이지 버튼 추가
  //   buttons.push(
  //     <PageNationButton
  //       key="prev"
  //       value="<"
  //       onClick={() => handlePageChange("prev")}
  //     />
  //   );

  //   // 페이지 번호 버튼 추가
  //   for (let i = 1; i <= count; i++) {
  //     buttons.push(
  //       <PageNationButton key={i} onClick={() => handlePageChange(i)}>
  //         {i}
  //       </PageNationButton>
  //     );
  //   }

  //   // 다음 페이지 버튼 추가
  //   buttons.push(
  //     <PageNationButton
  //       key="next"
  //       value=">"
  //       onClick={() => handlePageChange("next")}
  //     />
  //   );

  //   return <div>{buttons}</div>;
  // };

  return (
    <div className={styles.CompanyDetailPage}>
      <div className={styles.CompanyDetailDiv}>
        <LogoAndName
          imgSrc={imgsrc}
          companyName={companyData.name}
          companyCategory={companyData.category}
        />

        <div className={styles.companyDetailThreePart}>
          <Patition
            colum={"누적 투자 금액"}
            value={companyData.totalInvestment}
          />
          <Patition colum={"매출액"} value={companyData.totalProfit} />
          <Patition
            colum={"고용 인원"}
            value={companyData.employeeCount + " 명"}
          />
        </div>

        <Description text={companyData.description} />
      </div>

      <div className={styles.ViewMyStartUpDiv}>
        <InvestHeader
          investData={investData}
          companyData={companyData}
          refetchCompanyInvest={refetchCompanyInvest}
        />
        <InvestMain
          investData={investData}
          companyData={companyData}
          refetchCompanyInvest={refetchCompanyInvest}
        />

        <div className={styles.PaseNationDiv}>
          <PageNationButton value={"<"} />
          <PageNationButton value={"1"} />
          <PageNationButton value={"2"} />
          <PageNationButton value={"3"} />
          <PageNationButton value={"4"} />
          <PageNationButton value={"5"} />
          <PageNationButton value={">"} />
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailPage;
