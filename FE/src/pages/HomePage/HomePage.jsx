import React, { useState, useEffect } from "react";
import { getList } from "../../api";
import styles from "./HomePage.module.scss";
import TopGroupLayout from "../../components/TopGroupLayout/TopGroupLayout";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import Filter from "../../components/Filter/Filter";

export const HomePage = () => {
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentState, setCurrentState] = useState("누적 투자금액 높은순");
  const [filteredList, setFilteredList] = useState([]);
  const itemsPerPage = 10;

  const handleOrderChange = (orderBy) => {
    setCurrentState(orderBy);
  };

  const filteredCompany = (list || []).filter((company) =>
    company.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCompany.length / itemsPerPage);

  const paginatedList = filteredCompany.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
      <div className={styles.companyBoard} >
        <TopGroupLayout >
          <Title text={"전체 스타트업 목록"}/>
          <Search
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setSearchKeyword={setSearchKeyword}
              setCurrentPage={setCurrentPage}
          />
          <Filter />
        </TopGroupLayout>
        <div>board-header</div>
        <div>board-list</div>
      </div>
    </section>
  );
};

export default HomePage;
