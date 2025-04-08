import React from "react";
import style from "./MyCompanyModal.module.scss";
import FilteredCompanies from "../FilteredCompanies/FilteredCompanies";
import CompanyInfo from "../CompanyInfo/CompanyInfo";
import Button from "../Button/Button";

export default function MyCompanyModal({
  filteredCompanies,
  recentCompanies,
  handleSelect,
  totalCompanies,
  selectedCompanies,
  myCompany,
  handleDeselect,
  isSearchSubmitted,
}) {
  return (
    <>
      <div className={style.recentCompanies}>
        <p className={style.title}>
          최근 선택된 기업 ({recentCompanies.length})
        </p>
        {recentCompanies.map((company) => (
          <div key={company.id} className={style.companyItem}>
            <div className={style.companyInfo}>
              <CompanyInfo company={company} />
            </div>
            <Button
              shape="square"
              color="borderOrange"
              onClick={() => handleSelect(company)}
              text="선택하기"
            />
          </div>
        ))}
      </div>
      <FilteredCompanies
        filteredCompanies={filteredCompanies}
        totalCompanies={totalCompanies}
        selectedCompanies={selectedCompanies}
        handleSelect={handleSelect}
        myCompany={myCompany}
        handleDeselect={handleDeselect}
        isSearchSubmitted={isSearchSubmitted}
      />
    </>
  );
}
