import { useState } from "react";
import styles from "./OrderByRanking.module.scss";

// 이미지 import 추가
import arrowBottomIcon from "/src/assets/images/icons/arrow_bottom.png";

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
    <div
      className={`${styles.dropdownContainer} rounded-[10px] cursor-pointer`}
      onClick={toggleDropdown}
    >
      <div className={styles.dropdownButton}>
        <p>{currentState}</p>
        <img
          src={arrowBottomIcon}
          className={`${styles.dropdownArrowImg} transition-transform duration-200 ease-in-out ${isOpen ? "-rotate-180" : "rotate-0"}`}
        />
      </div>
      {isOpen && (
        <ul className={`${styles.dropdownMenu} [&>li:hover]:bg-black300 overflow-hidden`}>
          <li onClick={() => handleSelect("누적 투자금액 높은순")}>
            누적 투자금액 높은순
          </li>
          <li onClick={() => handleSelect("누적 투자금액 낮은순")}>
            누적 투자금액 낮은순
          </li>
          <li onClick={() => handleSelect("매출액 높은순")}>
            매출액 높은순
          </li>
          <li onClick={() => handleSelect("매출액 낮은순")}>
            매출액 낮은순
          </li>
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
