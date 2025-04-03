import React, { useState } from "react";
import style from "./SearchBar.module.scss";

function SearchBar({
  inputValue,
  handleInputChange,
  handleDelete,
  handleSubmit,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <>
      <div className={style.search}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="기업 이름을 입력하세요"
          className={style.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></input>
        {inputValue && (
          <button className={style.deleteButton} onClick={handleDelete}>
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
