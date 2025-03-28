import React from 'react'
import styles from "./HomePage.module.css";

const HomePageBoardFilter= () => {
  return (
    <div>
        <select>
            <option value="revenue-high">매출액 높은순</option>
            <option value="revenue-low">매출액 낮은순</option>
        </select>
    </div>
  )
}

export default HomePageBoardFilter