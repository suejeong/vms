import React, { useState, useEffect } from "react";
import { getList } from "../../api";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const [ list, setList ] = useState([]);

  useEffect(() => {
    const fetchList = async() => {
      try{
        const data = await getList();
        console.log(data);
        setList(data);
      } catch(e) {
        console.log(e);
      }
    }

    fetchList();
  },[])


  return (
    <section>
      <div className={styles.companyBoard}>
        <div className={styles.pageTopComponent}>
          <h2>전체 기업 리스트</h2>
          <div>
            <input type="search"  placeholder="검색어를 입력해주세요"></input>
            <select>
              <option value="revenue-high">매출액 높은순</option>
              <option value="revenue-low">매출액 낮은순</option>
            </select>
          </div>
        </div>
        <div className={styles.companyList}>
          <div className={styles.boardHeader}>
            <span className={styles.sizeSm}>순위</span>
            <span className={styles.sizeLg}>기업 명</span>
            <span className={styles.sizeXlg}>기업 소개</span>
            <span className={styles.sizeMd}>카테고리</span>
            <span className={styles.sizeMd}>누적 투자 금액</span>
            <span className={styles.sizeMd}>매출액</span>
            <span className={styles.sizeMd}>고용 인원</span>
          </div>
         {list.map((company, index) =>(
          <div className={styles.boardRow} key={index}>
            <span className={styles.sizeSm}>{index + 1}위</span>
            <span className={`${styles.sizeLg} ${styles.txtLeft}`}>{company.name}</span>
            <span className={`${styles.sizeXlg} ${styles.txtLeft}`}>{company.description}</span>
            <span className={styles.sizeMd}>{company.category}</span>
            <span className={styles.sizeMd}>{company.total_investment}</span>
            <span className={styles.sizeMd}>{company.total_profit}</span>
            <span className={styles.sizeMd}>{company.employee_count}</span>
          </div>
         ))}
        </div>
      </div>
    </section>
  )

};

export default HomePage;

