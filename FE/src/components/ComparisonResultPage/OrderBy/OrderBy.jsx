import { useEffect, useState } from "react";
import styles from "./OrderBy.module.css";
import ic_arrow_top from "../../../assets/arrow_top.png";
import ic_arrow_arrow_bottom from "../../../assets/arrow_bottom.png";

export const OrderBy = ({
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
        sortedList.sort((a, b) => b.total_investment - a.total_investment);
        break;
      case "누적 투자금액 낮은순":
        sortedList.sort((a, b) => a.total_investment - b.total_investment);
        break;
      case "매출액 높은순":
        sortedList.sort((a, b) => b.total_profit - a.total_profit);
        break;
      case "매출액 낮은순":
        sortedList.sort((a, b) => a.total_profit - b.total_profit);
        break;
      case "고용 인원 많은순":
        sortedList.sort((a, b) => b.employee_count - a.employee_count);
        break;
      case "고용 인원 적은순":
        sortedList.sort((a, b) => a.employee_count - b.employee_count);
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
