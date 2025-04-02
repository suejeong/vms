import React from "react";
import style from "./FilteredCompanies.module.scss";
import CompanyInfo from "../CompanyInfo/CompanyInfo";

function FilteredCompanies({
  inputValue,
  filteredCompanies,
  currentCompanies,
  selectedCompanies,
  handleSelect,
}) {
  return (
    <>
      {inputValue && (
        <div className={style.filteredCompanies}>
          {filteredCompanies.length > 0 && (
            <p>검색 결과 ({filteredCompanies.length})</p>
          )}
          {currentCompanies.length > 0 ? (
            currentCompanies.map((company) => (
              <div key={company.id} className={style.companyItem}>
                <div className={style.companyInfo}>
                  <CompanyInfo company={company} />
                </div>
                {selectedCompanies.find((c) => c.id === company.id) ? (
                  <button className={style.selectButton} disabled>
                    <img src="/images/icons/ic_check.png" alt="check" />
                    선택 완료
                  </button>
                ) : (
                  <button
                    className={style.selectButton}
                    onClick={() => handleSelect(company)}
                  >
                    선택하기
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
          {selectedCompanies.length === 5 && (
            <span>*비교할 기업은 최대 5개까지 선택 가능합니다.</span>
          )}
        </div>
      )}
    </>
  );
}

export default FilteredCompanies;
