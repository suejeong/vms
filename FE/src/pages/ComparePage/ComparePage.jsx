import { useState } from "react";
import style from "./ComparePage.module.scss";
import { getComparedcompany } from "../../api/Company.js";
import { MyCompany } from "../../components/ComparisonResultPage/MyCompany/MyCompany.jsx";
import { CompareResult } from "../../components/ComparisonResultPage/CompareResult/CompareResult.jsx";
import { CompanyRanking } from "../../components/ComparisonResultPage/CompanyRanking/CompanyRanking.jsx";
import Modal from "../../components/ComparePage/Modal/Modal.jsx";
import Title from "../../components/Title/Title.jsx";
import CompanyContainer from "../../components/ComparePage/CompanyContainer/CompanyContainer.jsx";
import DashContainer from "../../components/ComparePage/DashContainer/DashContainer.jsx";
import Button from "../../components/ComparePage/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

//투자하기 모달  임포트.
import InvestAndChangeModal from "../../components/CompanyDetailPage/Modals/InvestAndChangeModal/InvestAndChangeModal.jsx";
import { getCompany } from "../../api/Company.js";
import { getCompanyInvest } from "../../api/Invest.js";
import { useModal } from "../../components/CompanyDetailPage/Modals/ModalContext/ModalContext.jsx";
export default function ComparePage() {
  // 모달 오픈 유무 스테이트
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 내 기업 스테이트
  const [myCompany, setMyCompany] = useState(null);
  // 선택한 기업 리스트 스테이트
  const [compareCompanies, setCompareCompanies] = useState([]);
  // 최근 선택 리스트 스테이트
  const [recentCompanies, setRecentCompanies] = useState([]);
  // 비교 결과 스테이트
  const [compareResultListState, setCompareResultListState] = useState([]);
  // 비교 유무 스테이트
  const [compareResultState, setCompareResultState] = useState(false);
  // 디테일 페이지 이동 네비게이트
  const navigate = useNavigate();
  //투자모달에 필요한 하나의 기업 정보 state
  const [companyDataState, setCompanyDataState] = useState(null);
  // 리패치함수에 필요한 기업 하나의 투자 정보 state
  const [investDataState, setInvestDataState] = useState([]);
  //컨텍스트 api 모달 호출
  const { openModal, closeModal } = useModal();

  const handleNavigateDetailPage = (companyId) => {
    navigate(`/detail/${companyId}`);
  };

  const removeCompareCompany = (companyId) => {
    setCompareCompanies((prev) =>
      prev.filter((company) => company.id !== companyId)
    );
  };

  const handleSelectCompany = (company) => {
    setMyCompany(company);

    if (!recentCompanies.find((c) => c.id === company.id)) {
      setRecentCompanies((prev) => [...prev, company]);
    }
    setIsModalOpen(false);
  };

  // 비교 유무 스테이트 changer
  const handleChangeCompareResultState = () => {
    setCompareResultState((pre) => !pre);
  };

  // 비교하기 함수.
  const handleClickCompareButton = async () => {
    const companyNames = compareCompanies.map((company) => company.name);
    companyNames.push(myCompany.name);

    const compareResultListData = await getComparedcompany(companyNames);
    setCompareResultListState(compareResultListData);

    handleChangeCompareResultState();
  };

  // 투자하기 버튼 클릭 핸들러. 모달 on, 비교하기 on.
  const handleOnClickInvestment = () => {
    setIsModalOpen(true); //모달 on
    setCompareResultState(true); // 비교하기 on
    openModal(
      <InvestAndChangeModal
        type={"투자"}
        companyDataState={myCompany}
        investId={investDataState}
        refetchCompanyInvest={refetchCompanyInvest}
      />
    );
  };

  //투자 최신화를 위한 리패치함수
  const refetchCompanyInvest = async () => {
    const investData = await getCompanyInvest(myCompany.id);
    setInvestDataState(investData);
  };

  return (
    <>
      {!compareResultState ? (
        <section className={style.section}>
          <div className={style.resetMyCompany}>
            <Title text="나의 기업을 선택해 주세요!" />
            {myCompany && compareCompanies.length > 0 && (
              <Button
                shape="oval"
                size="medium"
                color="orange"
                onClick={() => {
                  setMyCompany(null);
                  setCompareCompanies([]);
                }}
                text="전체 초기화"
                image={<img src="/images/icons/ic_restart.png" alt="Restart" />}
              />
            )}
          </div>
          {myCompany ? (
            <CompanyContainer
              setMyCompany={setMyCompany}
              myCompany={myCompany}
            />
          ) : (
            <DashContainer openModal={setIsModalOpen(true)} />
          )}
          {myCompany && (
            <>
              <div className={style.addCompareCompany}>
                <div className={style.compareCompanyLetter}>
                  <Title text="어떤 기업이 궁금하세요?" />
                  {compareCompanies.length > 0 && <p>(최대 5개)</p>}
                </div>
                <Button
                  shape="oval"
                  size="medium"
                  color="orange"
                  onClick={setIsModalOpen(true)}
                  text="기업 추가하기"
                  disabled={compareCompanies.length === 5}
                />
              </div>
              <CompanyContainer
                compareCompanies={compareCompanies}
                removeCompareCompny={removeCompareCompany}
              />
            </>
          )}

          <Modal
            isOpen={!compareResultState && isModalOpen}
            onClose={setIsModalOpen(false)}
            onSelect={handleSelectCompany}
            recentCompanies={recentCompanies}
            selectedCompanies={compareCompanies}
            setSelectedCompanies={setCompareCompanies}
            myCompany={myCompany}
          />

          <Button
            shape="oval"
            size="big"
            color="orange"
            onClick={() => handleClickCompareButton()}
            text="기업 비교하기"
            disabled={compareCompanies.length === 0}
          />
        </section>
      ) : (
        <>
          <MyCompany
            myCompanyState={myCompany}
            handleChangeCompareResultState={handleChangeCompareResultState}
          />
          <CompareResult
            myCompanyState={myCompany}
            compareResultListState={compareResultListState}
            setCompareResultListState={setCompareResultListState}
            handleNavigateDetailPage={handleNavigateDetailPage}
          />
          <CompanyRanking
            myCompanyState={myCompany}
            handleNavigateDetailPage={handleNavigateDetailPage}
          />
          <div className={style.buttonDiv}>
            <button
              className={style.investButton}
              onClick={handleOnClickInvestment}
            >
              나의 기업에 투자하기
            </button>
          </div>

          <></>
        </>
      )}
    </>
  );
}
