import React, { useEffect, useState } from "react";
import style from "./SearchBar.module.scss";

function SearchBar({
  inputValue, // 인풋값
  setInputValue, // 인풋값 설정
  setInputKeyword,
  handleDelete,
  setPagination, // {currentPage: page, totalPages, totalCompanies, limit}
  setIsSearchSubmitted,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    setInputKeyword(inputValue);
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
    setIsSearchSubmitted(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("엔터 감지");
      handleSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      e.target.className.trim().includes("input-selected")
        ? setIsFocused(true)
        : setIsFocused(false);
    });
  }, []);

  return (
    <>
      <div
        className={style.search}
        style={{ backgroundColor: isFocused ? "#212121" : "" }}
      >
        {!isFocused && (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleSubmit}
          >
            <img src="/images/icons/ic_search.png" alt="search" />
          </button>
        )}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="검색어를 입력해주세요"
          className={`${style.input} input-selected`}
          onKeyDown={handleKeyDown}
          onClick={(e) => setIsFocused(e.target.value)}
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

        {isFocused && (
          <button
            className={style.submitButton}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleSubmit}
          >
            <img src="/images/icons/ic_search.png" alt="search" />
          </button>
        )}
      </div>
    </>
  );
}

export default SearchBar;
