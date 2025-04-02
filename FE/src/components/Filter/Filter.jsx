import React, { useState, useEffect } from 'react'
import styles from './Filter.module.scss'
import ic_arrow_top from "../../assets/arrow_top.png";
import ic_arrow_arrow_bottom from "../../assets/arrow_bottom.png";

const Filter = ({
  listState,
  setListState,
  currentState,
  handleOrderChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value) => {
    handleOrderChange(value);
    setIsOpen(false);
  };

  const sortCompanies = (orderBy) => {
    let sortedList = [...listState];

    switch (orderBy) {
      case "누적 투자금액 높은순":
        sortedList.sort((a, b) => b.totalInvestment - a.totalInvestment);
        break;
      case "누적 투자금액 낮은순":
        sortedList.sort((a, b) => a.totalInvestment - b.totalInvestment);
        break;
      case "매출액 높은순":
        sortedList.sort((a, b) => b.totalProfit - a.totalProfit);
        break;
      case "매출액 낮은순":
        sortedList.sort((a, b) => a.totalProfit - b.totalProfit);
        break;
      case "고용 인원 많은순":
        sortedList.sort((a, b) => b.employeeCount - a.employeeCount);
        break;
      case "고용 인원 적은순":
        sortedList.sort((a, b) => a.employeeCount - b.employeeCount);
        break;
      default:
        break;
    }

    setListState(sortedList);
  };

  useEffect(() => {
    if (currentState) {
      sortCompanies(currentState);
    }
  }, [currentState]);

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownButton}>
        <p>{currentState}</p>
        <img
          src={isOpen ? ic_arrow_top : ic_arrow_arrow_bottom}
          className={styles.dropdownArrowImg}
          onClick={toggleDropdown}
        />
      </div>   
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li onClick={() => handleSelect("누적 투자금액 높은순")}>
            누적 투자금액 높은순
          </li>
          <li onClick={() => handleSelect("누적 투자금액 낮은순")}>
            누적 투자금액 낮은순
          </li>
          <li onClick={() => handleSelect("매출액 높은순")}>매출액 높은순</li>
          <li onClick={() => handleSelect("매출액 낮은순")}>매출액 낮은순</li>
          <li onClick={() => handleSelect("고용 인원 많은순")}>
            고용 인원 많은순
          </li>
          <li onClick={() => handleSelect("고용 인원 적은순")}>
            고용 인원 적은순
          </li>
        </ul>
      )}
    </div>
  );
};

export default Filter;
