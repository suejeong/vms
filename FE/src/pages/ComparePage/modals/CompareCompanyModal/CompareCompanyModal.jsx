import React from "react";
import style from "./CompareCompanyModal.module.scss";
import FilteredCompanies from "../../components/FilteredCompanies/FilteredCompanies";
import CompanyInfo from "../../components/CompanyInfo/CompanyInfo";

export default function CompareCompanyModal({
  filteredCompanies,
  selectedCompanies,
  setSelectedCompanies,
  currentCompanies,
  inputValue,
  handleDeselect,
  myCompany,
}) {
  const handleCompareCompanySelect = (company) => {
    if (
      selectedCompanies.length < 5 &&
      !selectedCompanies.find((c) => c.id === company.id)
    ) {
      setSelectedCompanies((prev) => [...prev, company]);
    }
  };

  return (
    <>
      <div className={style.selectedCompanies}>
        <p>선택한 기업 ({selectedCompanies.length})</p>
        {selectedCompanies.map((company) => (
          <div key={company.id} className={style.companyItem}>
            <div className={style.companyInfo}>
              <CompanyInfo company={company} />
            </div>
            <button
              className={style.deselectButton}
              onClick={() => handleDeselect(company.id)}
            >
              선택 해제
            </button>
          </div>
        ))}
      </div>
      <FilteredCompanies
        inputValue={inputValue}
        filteredCompanies={filteredCompanies}
        currentCompanies={currentCompanies}
        selectedCompanies={selectedCompanies}
        handleSelect={handleCompareCompanySelect}
        handleDeselect={handleDeselect}
        myCompany={myCompany}
      />
    </>
  );
}
