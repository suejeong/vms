import styles from "./CompanyDetailPage.module.scss";
import CompanyMain from "../../components/CompanyDetailPage/CompanyMain/CompanyMain";
import InvestMain from "../../components/CompanyDetailPage/InvestMain/InvestMain";
import PageNationButton from "../../components/CompanyDetailPage/PaseNationButton/PaseNationButton";
import { ModalProvider } from "../../components/CompanyDetailPage/Modals/ModalContext/ModalContext";
import { getCompany } from "../../api/Company";
import { getCompanyInvest, getCompanyPageInvest } from "../../api/Invest";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import IsLoading from "../../common/IsLoading/IsLoading";

export function CompanyDetailPage() {
  // 가져올 회사 ID (예제, 실제로는 props나 params에서 가져올 수도 있음)
  const { companyId } = useParams();
  // 기업 상세 페이지에 필요한 하나의 기업 정보 state
  const [companyDataState, setCompanyDataState] = useState("");
  // 기업 상세 페이지에 필요한 기업 하나의 투자 정보 state
  const [investDataState, setInvestDataState] = useState("");
  //로딩 상태 데이터를 다 가져오면 화면을 그리기 위한 state
  const [loading, setLoading] = useState(true);
  //페이지네이션을 위한 데이터 state
  const [nowPageState, setNowPageState] = useState(1);

  //리페치 컴페니인베스트 함수 만들어서 이걸 투자 행위마다 연결
  const refetchCompanyInvest = async () => {
    const investData = await getCompanyInvest(companyId);
    setInvestDataState(investData);
  };

  const fetchData = async () => {
    try {
      const companyData = await getCompany(companyId);

      let investData = [];
      try {
        investData = await getCompanyInvest(companyId);
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn("투자 정보가 없음. 빈 배열로 처리.");
        } else {
          throw error;
        }
      }

      setCompanyDataState(companyData);
      setInvestDataState(investData || []);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 처음 마운트될 때 API 호출
  useEffect(() => {
    fetchData();
  }, []);

  // 로딩 중이면 "로딩 중..." 표시
  if (loading) {
    return <IsLoading />
  }
  // 투자내역 개수에 맞게 페이지네이션 버튼 생성
  const makePageNationButton = (investDataState) => {
    const count = Math.ceil((investDataState?.length || 0) / 5); // 5개씩 나눈 총 페이지 수
    const buttons = [];

    // 이전 페이지 버튼 추가
    buttons.push(
      <PageNationButton
        key="prev"
        value={<GrFormPrevious />}
        onClick={() => {
          if (nowPageState > 1) setNowPageState(nowPageState - 1);
        }}
        isActive={false}
      />
    );

    // 페이지 번호 버튼
    for (let i = 1; i <= count; i++) {
      buttons.push(
        <PageNationButton
          key={i}
          value={i}
          onClick={() => setNowPageState(i)}
          isActive={nowPageState === i}
        />
      );
    }

    // 다음 버튼
    buttons.push(
      <PageNationButton
        key="next"
        value={<GrFormNext />}
        onClick={() => {
          if (nowPageState < count) setNowPageState(nowPageState + 1);
        }}
        isActive={false}
      />
    );

    return <div className={`
      flex items-center justify-center 
      my-4 gap-[10px] 
      [&>button]:w-8 [&>button]:h-8 [&>button]:rounded-lg
      [&>button]:flex [&>button]:items-center [&>button]:justify-center 
    [&>button]:text-gray200
      md:my-8 md:gap-1
      md:[&>button]:w-12 md:[&>button]:h-12
      md:text-lg
    `}>{buttons}</div>;
  };

  return (
    <div>
      <CompanyMain companyDataState={companyDataState} />

      <InvestMain
        nowPageState={nowPageState}
        investDataState={investDataState}
        companyDataState={companyDataState}
        refetchCompanyInvest={refetchCompanyInvest}
      />

      {makePageNationButton(investDataState)}
    </div>
  );
}

export default CompanyDetailPage;
