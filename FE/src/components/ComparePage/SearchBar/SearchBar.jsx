import React, { useState } from "react";
import style from "./SearchBar.module.scss";
import { searchCompanies } from "../../../api/Company";

function SearchBar({
  inputValue, // 인풋값
  setInputValue, // 인풋값 설정
  setFilteredCompanies, //검색된 기업들
  setPagination, // {currentPage: page, totalPages, totalCompanies, limit}
  companiesPerPage, //페이지당 기업 수
  myCompany, //내 기업 (다른곳에서 사용할 필요 X)
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleSearch = async (pase = 1) => {
    try {
      const data = await searchCompanies(inputValue, pase, companiesPerPage);
      const filteredData = myCompany
        ? data.data.filter((company) => company.name !== myCompany.name)
        : data.data;

      setFilteredCompanies(filteredData);
      setPagination(data.pagination);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === "") {
      setFilteredCompanies([]);
    }
  };

  const handleSubmit = () => {
    handleSearch(1);
  };

  const handleDelete = () => {
    setInputValue("");
    setFilteredCompanies([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("엔터 감지");
      handleSubmit();
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
