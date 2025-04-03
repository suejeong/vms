import styles from "./CompanyDetailPage.module.scss";
import Patition from "../../components/CompanyDetailPage/Partition/Partition";
import Description from "../../components/CompanyDetailPage/Description/Description";
import LogoAndName from "../../components/CompanyDetailPage/LogoAndName/LogoAndName";
import InvestHeader from "../../components/CompanyDetailPage/InvestHeader/InvestHeader";
import InvestMain from "../../components/CompanyDetailPage/InvestMain/InvestMain";
import PaseNationButton from "../../components/CompanyDetailPage/PaseNationButton/PaseNationButton";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyD = await getCompany(companyId);
        const investD = await getCompanyInvest(companyId);
        setCompanyData(companyD);
        setInvestData(investD);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // ✅ 모든 데이터가 받아지면 로딩 종료
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
        <InvestHeader investData={investData} companyData={companyData} />
        <InvestMain investData={investData} companyData={companyData} />

        <div className={styles.PaseNationDiv}>
          <PaseNationButton value={"<"} />
          <PaseNationButton value={"1"} />
          <PaseNationButton value={"2"} />
          <PaseNationButton value={"3"} />
          <PaseNationButton value={"4"} />
          <PaseNationButton value={"5"} />
          <PaseNationButton value={">"} />
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailPage;
