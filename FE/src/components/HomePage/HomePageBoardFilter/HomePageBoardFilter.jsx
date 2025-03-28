import React from "react";
import styles from "./HomePageBoardFilter.module.scss"

const HomePageBoardFilter = () => {
  return (
    <div>
      <select className={styles.filter}>
        <option value="revenue-high">매출액 높은순</option>
        <option value="revenue-low">매출액 낮은순</option>
      </select>
    </div>
  );
};

export default HomePageBoardFilter;
