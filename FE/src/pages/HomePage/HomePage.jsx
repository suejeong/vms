import React, { useState, useEffect } from "react";
import { getList } from "../../api";
import styles from "./HomePage.module.css";
import HomePageBoardSearch from "./HomePageBoardSearch";
import HomePageBoardFilter from "./HomePageBoardFilter";
import HomePageBoardTitle from "./HomePageBoardTitle";
import HomePageBoardList from "./HomePageBoardList";

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
          <h2>전체 기업 리스트</h2>
          <HomePageBoardSearch
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setSearchKeyword={setSearchKeyword}
          />
          <HomePageBoardFilter />
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
