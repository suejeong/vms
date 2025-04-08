import { useState } from "react";
import styles from "./OrderByRanking.module.scss";
import ic_arrow_top from "../../../assets/images/icons/arrow_top.png";
import ic_arrow_arrow_bottom from "../../../assets/images/icons/arrow_bottom.png";

export const OrderByRanking = ({ currentState, handleOrderChange }) => {
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
