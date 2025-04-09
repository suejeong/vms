import React, { useEffect, useState } from "react";
import style from "./SearchBar.module.scss";

// 이미지 import 추가
import searchIcon from "/src/assets/images/icons/ic_search.png";
import deleteIcon from "/src/assets/images/icons/ic_delete_circle_small.png";

function SearchBar({
  inputValue,
  setInputValue,
  setInputKeyword,
  handleDelete,
  setPagination,
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
            <img src={searchIcon} alt="search" className="min-w-[22px]" />
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
            <img src={deleteIcon} alt="delete" className="min-w-4" />
          </button>
        )}

        {isFocused && (
          <button
            className={style.submitButton}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleSubmit}
          >
            <img src={searchIcon} alt="search" className="min-w-[22px]" />
          </button>
        )}
      </div>
    </>
  );
}

export default SearchBar;
