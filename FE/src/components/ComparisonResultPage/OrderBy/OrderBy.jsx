import { useState } from "react";
import styles from "./OrderBy.module.css";
import ic_arrow_top from "../../../assets/arrow_top.png";
import ic_arrow_arrow_bottom from "../../../assets/arrow_bottom.png";

export const OrderBy = ({ currentState, handleOrderChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value) => {
    handleOrderChange(value);
    setIsOpen(false);
  };

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
          <li onClick={() => handleSelect("total_investment_desc")}>
            누적 투자금액 높은순
          </li>
          <li onClick={() => handleSelect("total_investment_asc")}>
            누적 투자금액 낮은순
          </li>
          <li onClick={() => handleSelect("total_profit_desc")}>
            매출액 높은순
          </li>
          <li onClick={() => handleSelect("total_profit_asc")}>
            매출액 낮은순
          </li>
          <li onClick={() => handleSelect("employee_count_desc")}>
            고용 인원 많은순
          </li>
          <li onClick={() => handleSelect("employee_count_asc")}>
            고용 인원 적은순
          </li>
        </ul>
      )}
    </div>
  );
};
