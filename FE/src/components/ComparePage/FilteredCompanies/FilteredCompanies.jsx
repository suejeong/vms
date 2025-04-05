import React from "react";
import style from "./FilteredCompanies.module.scss";
import CompanyInfo from "../CompanyInfo/CompanyInfo";
import Button from "../Button/Button";

function FilteredCompanies({
  inputValue,
  filteredCompanies,
  currentCompanies,
  selectedCompanies,
  handleSelect,
  myCompany,
  handleDeselect,
}) {
  return (
    <>
      {inputValue && (
        <div className={style.filteredCompanies}>
          {filteredCompanies.length > 0 && (
            <p className={style.title}>검색 결과 ({filteredCompanies.length})</p>
          )}
          {currentCompanies.length > 0 ? (
            currentCompanies.map((company) => (
              <div key={company.id} className={style.companyItem}>
                <div className={style.companyInfo}>
                  <CompanyInfo company={company} />
                </div>
                {selectedCompanies.find((c) => c.id === company.id) ? (
                  <>
                    {myCompany ? (
                      <Button
                        shape="square"
                        color="borderGray100"
                        text="선택완료"
                        image={
                          <img src="/images/icons/ic_check.png" alt="check" />
                        }
                        disabled={true}
                      />
                    ) : (
                      <Button
                        shape="square"
                        color="borderGray200"
                        onClick={() => handleDeselect(company.id)}
                        text="선택 해제"
                      />
                    )}
                  </>
                ) : (
                  <Button
                    shape="square"
                    color="borderOrange"
                    onClick={() => handleSelect(company)}
                    text="선택하기"
                  />
                )}
              </div>
            ))
          ) : (
            <div>
              <p className={style.title}>검색 결과 ({filteredCompanies.length})</p>
              <p class={style.noSearchResult}>검색 결과가 없습니다</p>
            </div>
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
