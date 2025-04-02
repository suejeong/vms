import styles from "./CompanyDetailPage.module.scss";
import Patition from "../../components/CompanyDetailPage/Partition/Partition";
import Description from "../../components/CompanyDetailPage/Description/Description";
import LogoAndName from "../../components/CompanyDetailPage/LogoAndName/LogoAndName";
import InvestHeader from "../../components/CompanyDetailPage/InvestHeader/InvestHeader";
import InvestMain from "../../components/CompanyDetailPage/InvestMain/InvestMain";
import PaseNationButton from "../../components/CompanyDetailPage/PaseNationButton/PaseNationButton";
import companydetail from "./data/companydetail.json";
import invest from "./data/invest.json";
import logo from "../../../public/images/companies/네이버.png";
import { getCompany } from "../../api/Company";
import { getCompanyInvest } from "../../api/Invest";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function CompanyDetailPage() {
  // 기업 상세 페이지에 필요한 하나의 기업 정보 state
  const [companyD, setCompanyD] = useState(null);
  // 기업 상세 페이지에 필요한 기업 하나의 투자 정보 state
  const [investD, setInvestD] = useState([]);
  // 가져올 회사 ID (예제, 실제로는 props나 params에서 가져올 수도 있음)
  const companyId = useParams();
  // 컴포넌트가 처음 마운트될 때 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        //기업아이디 확인
        console.log("Company ID:", companyId); //
        // 기업 데이터 가져오기
        const companyData11 = await getCompany(companyId);
        setCompanyD(companyData11);
        //✅ 데이터 확인
        console.log("Company Data:", companyD); //
        // 투자 데이터 가져오기
        const investData11 = await getCompanyInvest(companyId);
        setInvestD(investData11);

        // ✅ 데이터 확인
        console.log("Investment Data:", investDatas);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData(); // 비동기 함수 실행
  }, [companyId]); // ✅ 빈 배열([]) → 컴포넌트 마운트 시 한 번만 실행

  // ✅ 데이터가 아직 없으면 로딩 표시
  if (!companyD) {
    return <div>로딩 중...</div>;
  }

  const companydetaildata = companydetail;
  const investdatas = invest;

  return (
    <div className={styles.CompanyDetailPage}>
      <div className={styles.CompanyDetailDiv}>
        <LogoAndName
          imgSrc={logo}
          companyName={companydetaildata.name}
          companyCategory={companydetaildata.category}
        />

        <div className={styles.companyDetailThreePart}>
          <Patition
            colum={"누적 투자 금액"}
            value={companydetaildata.totalInvestment}
          />
          <Patition colum={"매출액"} value={companydetaildata.totalProfit} />
          <Patition
            colum={"고용 인원"}
            value={companydetaildata.employeeCount + " 명"}
          />
        </div>

        <Description text={companydetaildata.description} />
      </div>

      <div className={styles.ViewMyStartUpDiv}>
        <InvestHeader />
        <InvestMain
          investAmount={companydetaildata.view_invest_amount}
          investData={investdatas}
        />

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
