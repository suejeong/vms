import React from "react";
import style from "./MyCompanyModal.module.scss";
import FilteredCompanies from "../../components/FilteredCompanies/FilteredCompanies";
import CompanyInfo from "../../components/CompanyInfo/CompanyInfo";
import Button from "../../components/Button/Button";

export default function MyCompanyModal({
  filteredCompanies,
  recentCompanies,
  handleSelect,
  currentCompanies,
  inputValue,
  selectedCompanies,
  myCompany,
  handleDeselect,
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
        inputValue={inputValue}
        filteredCompanies={filteredCompanies}
        currentCompanies={currentCompanies}
        selectedCompanies={selectedCompanies}
        handleSelect={handleSelect}
        myCompany={myCompany}
        handleDeselect={handleDeselect}
      />
    </>
  );
}
