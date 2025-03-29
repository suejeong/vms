import React, { useState, useEffect } from "react";
import { getList } from "../../api";
import styles from "./HomePage.module.scss";
import HomePageBoardSearch from "../../components/HomePage/HomePageBoardSearch/HomePageBoardSearch";
import HomePageBoardFilter from "../../components/HomePage/HomePageBoardFilter/HomePageBoardFilter";
import HomePageBoardTitle from "../../components/HomePage/HomPageBoardTitle/HomePageBoardTitle";
import HomePageBoardList from "../../components/HomePage/HomePageBoardList/HomePageBoardList";

export const HomePage = () => {
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredCompany = (list || []).filter((company) =>
    company.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await getList();
        console.log(data);
        setList(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchList();
  }, []);

  return (
    <section>
      <div className={styles.companyBoard}>
        <div className={styles.pageTopComponent}>
          <h2 className={styles.totalListHead}>전체 스타트업 목록</h2>
          <div className={styles.searchAndFilter}>
            <HomePageBoardSearch 
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setSearchKeyword={setSearchKeyword}
            />
            <HomePageBoardFilter />
          </div>
        </div>
        <div className={styles.companyList}>
          <HomePageBoardTitle />
          <HomePageBoardList companyList={filteredCompany} />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
