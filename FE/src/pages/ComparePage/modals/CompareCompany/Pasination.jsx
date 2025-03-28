import React from "react";
import leftArrow from "../../assets/ic_arrow_left.png";
import rightArrow from "../../assets/ic_arrow_right.png";
import style from "./Pasination.module.css";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.pagination}>
      <button
        className={style.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={leftArrow} alt="previous" />
      </button>
      <div className={style.navigationBar}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={style.paginationButton}
            onClick={() => onPageChange(number)}
            disabled={currentPage === number}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        className={style.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={rightArrow} alt="next" />
      </button>
    </div>
  );
};
