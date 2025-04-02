import React from "react";
import style from "./MyCompanyModal.module.scss";
import FilteredCompanies from "../../components/FilteredCompanies/FilteredCompanies";
import CompanyInfo from "../../components/CompanyInfo/CompanyInfo";

export default function MyCompanyModal({
  filteredCompanies,
  recentCompanies,
  handleSelect,
  currentCompanies,
  inputValue,
  selectedCompanies,
}) {
  return (
    <>
      <div className={style.recentCompanies}>
        <p>최근 선택된 기업 ({recentCompanies.length})</p>
        {recentCompanies.map((company) => (
          <div key={company.id} className={style.companyItem}>
            <div className={style.companyInfo}>
              <CompanyInfo company={company} />
            </div>

            <button
              className={style.selectButton}
              onClick={() => handleSelect(company)}
            >
              선택하기
            </button>
          </div>
        ))}
      </div>
      <FilteredCompanies
        inputValue={inputValue}
        filteredCompanies={filteredCompanies}
        currentCompanies={currentCompanies}
        selectedCompanies={selectedCompanies}
        handleSelect={handleSelect}
      />
    </>
  );
}
