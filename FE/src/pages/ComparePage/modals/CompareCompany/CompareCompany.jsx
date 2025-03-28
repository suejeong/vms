import React, { useEffect, useState } from "react";
import style from "./CompareCompany.module.css";
import deleteIc from "../../assets/ic_delete.png";
import searchIc from "../../assets/ic_search.png";
import companyIc from "../../assets/ic_company.png";
import checkIc from "../../assets/ic_check.png";
import { Pagination } from "./Pasination";

export default function CompareCompanyModal({
  isOpen,
  onClose,
  companyData,
  selectedCompanies,
  setSelectedCompanies,
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(companyData);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 5;

  if (!isOpen) return null;

  const filterCompanies = (value) => {
    if (value.trim() === "") {
      setFilteredCompanies(companyData);
    } else {
      const filtered = companyData.filter((company) =>
        company.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    filterCompanies(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  const handleSubmit = () => {
    const filtered = companyData.filter((company) =>
      company.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const handleSelect = (company) => {
    if (
      selectedCompanies.length < 5 &&
      !selectedCompanies.find((c) => c.id === company.id)
    ) {
      setSelectedCompanies((prev) => [...prev, company]);
    }
  };

  const handleDeselect = (companyId) => {
    setSelectedCompanies((prev) =>
      prev.filter((company) => company.id !== companyId)
    );
  };

  return (
    <div className={style.overlay}>
      <div className={style.content}>
        <div className={style.header}>
          <h1>비교할 기업 선택하기</h1>
          <button className={style.closeButton} onClick={onClose}>
            <img src={deleteIc} alt="delete" />
          </button>
        </div>
        <div className={style.search}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="기업 이름을 입력하세요"
            className={style.input}
          />
          <div className={style.inputButton}>
            <button className={style.submitButton} onClick={handleSubmit}>
              <img src={searchIc} alt="search" />
            </button>
          </div>
          <div className={style.selectedCompanies}>
            <h2>선택한 기업 ({selectedCompanies.length})</h2>
            {selectedCompanies.map((company) => (
              <div key={company.id} className={style.companyItem}>
                <div className={style.companyInfo}>
                  <img src={companyIc} alt="company" />
                  <p className={style.companyName}>{company.name}</p>
                  <p className={style.companyCategory}>{company.category}</p>
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
          <div className={style.searchCompany}>
            <div className={style.filteredCompanies}>
              <h2>검색 결과 ({filteredCompanies.length})</h2>
              {currentCompanies.length > 0 ? (
                currentCompanies.map((company) => (
                  <div key={company.id} className={style.companyItem}>
                    <div className={style.companyInfo}>
                      <img src={companyIc} alt="company" />
                      <p className={style.companyName}>{company.name}</p>
                      <p className={style.companyCategory}>
                        {company.category}
                      </p>
                    </div>
                    {selectedCompanies.find((c) => c.id === company.id) ? (
                      <button
                        className={`${style.selectButton} ${style.selected}`}
                        disabled
                      >
                        <img src={checkIc} alt="check" />
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
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
