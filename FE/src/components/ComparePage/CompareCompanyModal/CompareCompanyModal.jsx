import React from "react";
import style from "./CompareCompanyModal.module.scss";
import FilteredCompanies from "../FilteredCompanies/FilteredCompanies";
import CompanyInfo from "../CompanyInfo/CompanyInfo";
import Button from "../Button/Button";

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
            <Button
              shape="square"
              color="borderGray200"
              onClick={() => handleDeselect(company.id)}
              text="선택 해제"
            />
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
