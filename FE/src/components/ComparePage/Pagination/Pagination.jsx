import React from "react";
import style from "./Pagination.module.scss";
import ic_arrow_left from "../../../assets/images/icons/ic_arrow_left.png";
import ic_arrow_right from "../../../assets/images/icons/ic_arrow_right.png";

export const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  if (totalPages === 0) return null;

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
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={ic_arrow_left} alt="previous" />
      </button>
      <div className={style.navigationBar}>
        {getPageNumbers().map((number) => (
          <button
            key={number}
            className={style.paginationButton}
            onClick={() => handlePageChange(number)}
            disabled={currentPage === number}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        className={style.arrow}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={ic_arrow_right} alt="next" />
      </button>
    </div>
  );
};
