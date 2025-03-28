import React from "react";
import leftArrow from "../../assets/ic_arrow_left.png";
import rightArrow from "../../assets/ic_arrow_right.png";
import style from "./Pasination.module.css";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage, endPage;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

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
        {getPageNumbers().map((number) => (
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
