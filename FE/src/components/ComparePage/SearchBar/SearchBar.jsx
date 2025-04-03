import React, { useState } from "react";
import style from "./SearchBar.module.scss";
import { getChoseong } from "es-hangul";

function SearchBar({
  inputValue, // 인풋값
  setInputValue, // 인풋값 설정
  setFilteredCompanies, // 검색된 기업 설정
  myCompany, // 선택한 내 기업
  companies, // 전체 기업 리스트
  setCurrentPage, // 현재 페이지
  isOpen, //모달 오픈 유무
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const filterCompanies = (value) => {
    if (value.trim() === "") {
      setFilteredCompanies([]);
      return;
    }

    const inputChoseong = getChoseong(value);
    const isValidChoseong = /^[ㄱ-ㅎ]+$/.test(inputChoseong); //카테고리가 영어라 오류날수도
    const isValidEnglish = /^[a-zA-Z]+$/.test(value);

    if (isOpen) {
      if (!isValidChoseong) {
        setFilteredCompanies([]);
        return;
      }
    } else {
      if (!isValidChoseong && !isValidEnglish) {
        setFilteredCompanies([]);
        return;
      }
    }

    const filteredCompanies = companies.filter((company) => {
      if (isOpen) {
        return !myCompany || company.id !== myCompany.id;
      } else {
        return true;
      }
    });

    const filtered = filteredCompanies.filter((company) => {
      if (isOpen) {
        const companyNameChoseong = getChoseong(company.name);

        return companyNameChoseong.includes(inputChoseong);
      } else {
        const companyNameChoseong = getChoseong(company.name);
        // const companyCategoryChoseong = getChoseong(company.category); // 카테고리가 한글일 경우

        return (
          companyNameChoseong.includes(inputChoseong) ||
          // companyCategoryChoseong.includes(inputChoseong) //카테고리가 한글일 경우
          company.category.toLowerCase().includes(inputValue.toLowerCase()) //카테고리가 영어일 경우
        );
      }
    });

    setFilteredCompanies(filtered);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    filterCompanies(value);
  };

  const handleSubmit = () => {
    const filteredCompanies = companies.filter(
      (company) => !myCompany || company.id !== myCompany.id
    );

    const filtered = filteredCompanies.filter((company) =>
      company.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const handleDelete = () => {
    setInputValue("");
    setFilteredCompanies([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("엔터 감지");
      handleSubmit();
      setCurrentPage(1);
    }
  };

  return (
    <>
      <div className={style.search}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="검색어를 입력해주세요"
          className={style.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        ></input>
        {inputValue && (
          <button
            className={`${style.deleteButton} ${!isFocused && style.right}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleDelete}
          >
            <img src="/images/icons/ic_delete_circle_small.png" alt="delete" />
          </button>
        )}
        <div
          className={`${style.inputButton} ${
            isFocused ? style.right : style.left
          }`}
        >
          <button
            className={style.submitButton}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleSubmit}
          >
            <img src="/images/icons/ic_search.png" alt="search" />
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
