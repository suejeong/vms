import React, { useState, useEffect } from "react";
import { getList } from "../../api";
import styles from "./HomePage.module.scss";
import HomePageBoardSearch from "../../components/HomePage/HomePageBoardSearch/HomePageBoardSearch";
import HomePageBoardTitle from "../../components/HomePage/HomePageBoardTitle/HomePageBoardTitle";
import HomePageBoardList from "../../components/HomePage/HomePageBoardList/HomePageBoardList";
import HomePageBoardFilter from "../../components/HomePage/HomePageBoardFilter/HomePageBoardFilter";

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
