import { useState } from "react";
import style from "./ComparePage.module.scss";
import CompareCompanyModal from "./modals/CompareCompanyModal/CompareCompanyModal.jsx";
import { Link } from "react-router-dom";
import { getCompanyList } from "../../api/Company.js";
import CompanyContainer from "./components/CompanyContainer/CompanyContainer.jsx";
import DashContainer from "./components/DashContainer/DashContainer.jsx";

export default function ComparePage() {
  const [isMyModalOpen, setIsMyModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [myCompany, setMyCompany] = useState(null);
  const [compareCompanies, setCompareCompanies] = useState([]);
  const [recentCompanies, setRecentCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);

  const getAllCompanies = async () => {
    try {
      const data = await getCompanyList();
      setCompanies(data);
    } catch (e) {
      console.log(e);
    }
  };

  const openMyModal = () => {
    getAllCompanies();
    setIsMyModalOpen(true);
  };
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
            <img src="/images/icons/ic_restart.png" alt="Restart" />
            전체 초기화
          </button>
        )}
      </div>
      {myCompany ? (
        <CompanyContainer setMyCompany={setMyCompany} myCompany={myCompany} />
      ) : (
        <DashContainer
          isMyModalOpen={isMyModalOpen}
          closeMyModal={closeMyModal}
          handleSelectCompany={handleSelectCompany}
          companies={companies}
          recentCompanies={recentCompanies}
          openMyModal={openMyModal}
        />
      )}
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
              companies={companies}
              selectedCompanies={compareCompanies}
              setSelectedCompanies={setCompareCompanies}
            />
          </div>
          <CompanyContainer
            compareCompanies={compareCompanies}
            removeCompareCompny={removeCompareCompany}
          />
        </>
      )}
      <Link
        to={`/comparisonResult/:${myCompany}?compareCompanies=${compareCompanies}`}
      >
        <button
          className={style.compareButton}
          disabled={compareCompanies.length === 0}
        >
          기업 비교하기
        </button>
      </Link>
    </section>
  );
}
