import React, { useState, useEffect } from "react";
import Title from "../../components/Title/Title";
import BoardTitleBar from "../../components/BoardTitleBar/BoardTitleBar";
import BoardList from "../../components/BoardList/BoardList";
import MiddleGroupLayout from "../../components/MiddleGroupLayout/MiddleGroupLayout";
import Filter from "../../components/Filter/Filter";
import BottomGroupLayout from "../../components/BottomGroupLayout/BottomGroupLayout";
import Pagination from "../../components/Pagination/Pagination";
import TopGroupLayout from "../../components/TopGroupLayout/TopGroupLayout";
import { searchCompanies } from "../../api/Company";
import SearchBar from "../../components/ComparePage/SearchBar/SearchBar";
import IsLoading from "../../common/IsLoading/IsLoading";
import Error from "../../common/Error/Error";

// 테이블 타이틀 (flex 비율 포함)
const titleList = [
  { title: "순위", flex: "flex-[2]" },
  { title: "기업명", flex: "flex-[6]" },
  { title: "기업 소개", flex: "flex-[9]" },
  { title: "카테고리", flex: "flex-[5]" },
  { title: "누적 투자 금액", flex: "flex-[5]" },
  { title: "매출액", flex: "flex-[5]" },
  { title: "고용인원", flex: "flex-[5]" },
];

// 정렬 필터 옵션들
const filters = [
  {
    label: "누적 투자 금액 높은 순",
    sort: "totalInvestment_desc",
  },
  {
    label: "누적 투자 금액 낮은 순",
    sort: "totalInvestment_asc",
  },
  {
    label: "매출액 높은 순",
    sort: "totalProfit_desc",
  },
  {
    label: "매출액 낮은 순",
    sort: "totalProfit_asc",
  },
  {
    label: "고용 인원 많은 순",
    sort: "employeeCount_desc",
  },
  {
    label: "고용 인원 낮은 순",
    sort: "employeeCount_asc",
  },
];

export const HomePage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalCompanies: 0,
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const itemsPerPage = 10;
  const currentOffset = (pagination.currentPage - 1) * itemsPerPage;

  // 검색 및 필터 변경 시 API 호출
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const data = await searchCompanies(
          searchKeyword,
          pagination.currentPage,
          itemsPerPage,
          selectedFilter.sort
        );
        setFilteredCompanies(data.data);
        setPagination(data.pagination);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [searchKeyword, pagination.currentPage, selectedFilter]);

  const handlePageChange = (pageNumber) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: pageNumber,
    }));
  };

  // 필터 변경 시 페이지 번호 초기화
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };

  const handleDelete = () => {
    setSearchInput("");
    setSearchKeyword("");
    setPagination({
      currentPage: 1,
      totalPages: 0,
      totalCompanies: 0,
    });
    setIsSearchSubmitted(false);
  };

  // 페이지에 해당하는 기업만 자르고 순위 부여했어용!
  const pagedCompanies = filteredCompanies.map((company, index) => ({
    ...company,
    rank: currentOffset + index + 1,
  }));

  if (isLoading) return <IsLoading />;
  if (error) return <Error />;

  return (
    <section>
      <TopGroupLayout>
        <Title text={"전체 스타트업 목록"} />
        <div>
          <SearchBar
            inputValue={searchInput}
            setInputValue={setSearchInput}
            setInputKeyword={setSearchKeyword}
            handleDelete={handleDelete}
            setPagination={setPagination}
            setIsSearchSubmitted={setIsSearchSubmitted}
          />
          <Filter
            filterOptions={filters}
            showFilterOptions={showFilterOptions}
            setShowFilterOptions={setShowFilterOptions}
            selectedFilter={selectedFilter}
            onSelectFilter={handleFilterChange}
          />
        </div>
      </TopGroupLayout>

      <MiddleGroupLayout>
        <BoardTitleBar titleList={titleList} />
        <BoardList
          flex={titleList.map((list) => list.flex)}
          companies={pagedCompanies}
          fields={[
            "name",
            "description",
            "category",
            "totalInvestment",
            "totalProfit",
            "employeeCount",
          ]}
          unitSuffixes={["", "", "", "", "", "명"]}
        />
      </MiddleGroupLayout>

      <BottomGroupLayout>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </BottomGroupLayout>
    </section>
  );
};

export default HomePage;
