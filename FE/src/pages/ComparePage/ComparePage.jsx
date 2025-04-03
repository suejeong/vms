import { useState } from "react";
import style from "./ComparePage.module.scss";
import { getCompanyList, getComparedcompany } from "../../api/Company.js";
import CompanyContainer from "./components/CompanyContainer/CompanyContainer.jsx";
import DashContainer from "./components/DashContainer/DashContainer.jsx";
import { MyCompany } from "../../components/ComparisonResultPage/MyCompany/MyCompany.jsx";
import { CompareResult } from "../../components/ComparisonResultPage/CompareResult/CompareResult.jsx";
import { CompanyRanking } from "../../components/ComparisonResultPage/CompanyRanking/CompanyRanking.jsx";
import Modal from "./modals/Modal/Modal.jsx";
import Title from "../../components/Title/Title.jsx";
import Button from "./components/Button/Button.jsx";

export default function ComparePage() {
  // 모달 오픈 유무 스테이트
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 내 기업 스테이트
  const [myCompany, setMyCompany] = useState(null);
  // 선택한 기업 리스트 스테이트
  const [compareCompanies, setCompareCompanies] = useState([]);
  // 최근 선택 리스트 스테이트
  const [recentCompanies, setRecentCompanies] = useState([]);
  // 전체 기업 리스트 스테이트
  const [companies, setCompanies] = useState([]);
  // 비교 결과 스테이트
  const [compareResultListState, setCompareResultListState] = useState([]);
  // 비교 유무 스테이트
  const [compareResultState, setCompareResultState] = useState(false);

  const getAllCompanies = async () => {
    try {
      const data = await getCompanyList();
      setCompanies(data);
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = () => {
    getAllCompanies();
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

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
    closeModal();
  };

  const handleChangeCompareResultState = () => {
    setCompareResultState((pre) => !pre);
  };

  const handleClickCompareButton = async () => {
    const companyNames = compareCompanies.map((company) => company.name);
    companyNames.push(myCompany.name);

    const compareResultListData = await getComparedcompany(companyNames);
    setCompareResultListState(compareResultListData);

    handleChangeCompareResultState();
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
            <DashContainer openModal={openModal} />
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
                  onClick={openModal}
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
            isOpen={isModalOpen}
            onClose={closeModal}
            onSelect={handleSelectCompany}
            companies={companies}
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
          />
          <CompanyRanking myCompanyState={myCompany} />
          <div className={style.buttonDiv}>
            <button className={style.investButton}>나의 기업에 투자하기</button>
          </div>
        </>
      )}
    </>
  );
}
