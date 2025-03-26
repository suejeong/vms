import React, { useState } from "react";
import style from "./CompareCompany.module.css";

export default function CompareCompanyModal({
  isOpen,
  onClose,
  companyData,
  selectedCompanies,
  setSelectedCompanies,
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(companyData);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setFilteredCompanies(companyData);
    } else {
      const filtered = companyData.filter((company) =>
        company.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

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
            <img src="/images/ic_delete.png" alt="delete" />
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
              <img src="/images/ic_search.png" alt="search" />
            </button>
          </div>
          <div className={style.selectedCompanies}>
            <h2>선택한 기업 ({selectedCompanies.length})</h2>
            {selectedCompanies.map((company) => (
              <div key={company.id} className={style.companyItem}>
                <div className={style.companyInfo}>
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
          <div className={style.filteredCompanies}>
            <h2>검색 결과 ({filteredCompanies.length})</h2>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <div key={company.id} className={style.companyItem}>
                  <p className={style.companyName}>{company.name}</p>
                  <p className={style.companyCategory}>{company.category}</p>
                  {selectedCompanies.find((c) => c.id === company.id) ? (
                    <button
                      className={`${style.selectButton} ${style.selected}`}
                      disabled
                    >
                      <img src="/images/ic_check.png" alt="check" />
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
          <div className={style.pagination}>
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
}
