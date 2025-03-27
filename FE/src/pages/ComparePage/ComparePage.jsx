import React, { useState } from "react";
import style from "./ComparePage.module.css";
import MyCompanyModal from "./modals/MyCompany/MyCompany.jsx";
import CompareCompanyModal from "./modals/CompareCompany/CompareCompany.jsx";
import companyData from "./company.json";
import restartIc from "./assets/ic_restart.png";
import companyIc from "./assets/ic_company.png";
import plusIc from "./assets/btn_plus.png";
import minusIc from "./assets/ic_minus.png";

export default function Compare() {
  const [isMyModalOpen, setIsMyModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [myCompany, setMyCompany] = useState(null);
  const [compareCompanies, setCompareCompanies] = useState([]);
  const [recentCompanies, setRecentCompanies] = useState([]);

  const openMyModal = () => setIsMyModalOpen(true);
  const closeMyModal = () => setIsMyModalOpen(false);
  const openCompareModal = () => setIsCompareModalOpen(true);
  const closeCompareModal = () => setIsCompareModalOpen(false);

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
    closeMyModal();
  };

  return (
    <section className={style.section}>
      <div className={style.resetMyCompany}>
        <h1>나의 기업을 선택해 주세요!</h1>
        {myCompany && (
          <button
            className={style.resetMyCompanyButton}
            onClick={() => {
              setMyCompany(null);
              setCompareCompanies([]);
            }}
          >
            <img src={restartIc} alt="Restart" />
            전체 초기화
          </button>
        )}
      </div>
      <div className={style.dash}>
        <div
          className={
            myCompany ? style.myCompanyContainer : style.NotMyCompanyContainer
          }
        >
          {myCompany ? (
            <>
              <a onClick={() => setMyCompany(null)}>선택 취소</a>
              <div className={style.selectedCompany}>
                <img src={companyIc} alt="company" />
                <p className={style.companyName}>{myCompany.name}</p>
                <p className={style.companyCategory}>{myCompany.category}</p>
              </div>
            </>
          ) : (
            <div className={style.addMyCompany}>
              <button className={style.addButton} onClick={openMyModal}>
                <img src={plusIc} alt="Add" />
              </button>
              <MyCompanyModal
                isOpen={isMyModalOpen}
                onClose={closeMyModal}
                onSelect={handleSelectCompany}
                companyData={companyData}
                recentCompanies={recentCompanies}
              />
              <p>기업 추가</p>
            </div>
          )}
        </div>
      </div>
      {myCompany && (
        <>
          <div className={style.addCompareCompany}>
            <div className={style.compareCompanyLetter}>
              <h1>어떤 기업이 궁금하세요?</h1>
              {compareCompanies.length > 0 && <p>(최대 5개)</p>}
            </div>
            <button
              className={style.addCompareCompanyButton}
              onClick={openCompareModal}
              disabled={compareCompanies.length === 5}
            >
              기업 추가하기
            </button>
            <CompareCompanyModal
              isOpen={isCompareModalOpen}
              onClose={closeCompareModal}
              companyData={companyData}
              selectedCompanies={compareCompanies}
              setSelectedCompanies={setCompareCompanies}
            />
          </div>
          <div className={style.compareCompaanyContainer}>
            {compareCompanies.length > 0 ? (
              compareCompanies.map((company) => (
                <div key={company.id} className={style.companyCard}>
                  <button
                    onClick={() => removeCompareCompany(company.id)}
                    className={style.minusButton}
                  >
                    <img src={minusIc} alt="minus" />
                  </button>
                  <img
                    src={companyIc}
                    alt="company"
                    className={style.companyImg}
                  />
                  <p className={style.companyName}>{company.name}</p>
                  <p className={style.companyCategory}>{company.category}</p>
                </div>
              ))
            ) : (
              <p className={style.noAddCompany}>
                아직 추가한 기업이 없어요,
                <br />
                버튼을 눌러 기업을 추가해보세요!
              </p>
            )}
          </div>
        </>
      )}
      <button
        className={style.compareButton}
        disabled={compareCompanies.length === 0}
      >
        기업 비교하기
      </button>
    </section>
  );
}
