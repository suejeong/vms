import React, { useState } from "react";
import style from "./MyCompany.module.scss";
import deleteIc from "../../assets/ic_delete.png";
import smallDeleteIc from "../../assets/ic_delete_circle_small.png";
import searchIc from "../../assets/ic_search.png";
import companyIc from "../../assets/ic_company.png";

export default function MyCompanyModal({
  isOpen,
  onClose,
  onSelect,
  companyData,
  recentCompanies,
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setFilteredCompanies([]);
    } else {
      const filtered = companyData.filter((company) =>
        company.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

  const handleSelect = (company) => {
    onSelect(company);
    setInputValue("");
    setFilteredCompanies([]);
  };

  const handleSubmit = () => {
    const filtered = companyData.filter((company) =>
      company.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const handleDelete = () => {
    setInputValue("");
    setFilteredCompanies([]);
  };

  return (
    <div className={style.overlay}>
      <div className={style.content}>
        <div className={style.header}>
          <h1>나의 기업 선택하기</h1>
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
            <button className={style.deleteButton} onClick={handleDelete}>
              <img src={smallDeleteIc} alt="delete" />
            </button>
            <button className={style.submitButton} onClick={handleSubmit}>
              <img src={searchIc} alt="search" />
            </button>
          </div>
        </div>
        {inputValue ? (
          <div className={style.filteredCompanies}>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <div key={company.id} className={style.companyItem}>
                  <div className={style.companyInfo}>
                    <img src={companyIc} alt="company" />
                    <p className={style.companyName}>{company.name}</p>
                    <p className={style.companyCategory}>{company.category}</p>
                  </div>
                  <button
                    className={style.selectButton}
                    onClick={() => handleSelect(company)}
                  >
                    선택하기
                  </button>
                </div>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
        ) : (
          <div className={style.recentCompanies}>
            <p>최근 선택된 기업 ({recentCompanies.length})</p>
            {recentCompanies.map((company) => (
              <div key={company.id} className={style.companyItem}>
                <div className={style.companyInfo}>
                  <img src={companyIc} alt="company" />
                  <p className={style.companyName}>{company.name}</p>
                  <p className={style.companyCategory}>{company.category}</p>
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
        )}
      </div>
    </div>
  );
}
