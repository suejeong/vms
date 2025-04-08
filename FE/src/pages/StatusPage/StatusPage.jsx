import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import BoardTitleBar from "../../components/BoardTitleBar/BoardTitleBar";
import MiddleGroupLayout from "../../components/MiddleGroupLayout/MiddleGroupLayout";
import BoardList from "../../components/BoardList/BoardList";
import Filter from "../../components/Filter/Filter";
import BottomGroupLayout from "../../components/BottomGroupLayout/BottomGroupLayout";
import Pagination from "../../components/Pagination/Pagination";
import TopGroupLayout from "../../components/TopGroupLayout/TopGroupLayout";
import { searchCompanies } from "../../api/Company";
import IsLoading from "../../common/IsLoading/IsLoading";

// 테이블 타이틀 정의
const titleList = [
  { title: "순위", flex: "flex-[2]" },
  { title: "기업명", flex: "flex-[6]" },
  { title: "기업 소개", flex: "flex-[9]" },
  { title: "카테고리", flex: "flex-[5]" },
  { title: "나의 기업 선택 횟수", flex: "flex-[5]" },
  { title: "비교 기업 선택 횟수", flex: "flex-[5]" },
];

// 필터 옵션
const filters = [
  {
    label: "나의 기업 선택 횟수 높은 순",
    sort: "countMyPicked_desc",
  },
  {
    label: "나의 기업 선택 횟수 낮은 순",
    sort: "countMyPicked_asc",
  },
  {
    label: "비교 기업 선택 횟수 높은 순",
    sort: "countYourPicked_desc",
  },
  {
    label: "비교 기업 선택 횟수 낮은 순",
    sort: "countYourPicked_asc",
  },
];

export default function StatusPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalCompanies: 0,
  });
  const itemsPerPage = 10;

  // 검색 및 필터 변경 시 API 호출
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const data = await searchCompanies(
          "",
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
  }, [pagination.currentPage, selectedFilter]);

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

  if (isLoading) return <IsLoading />;
  if (error) return <Error />;

  const currentOffset = (pagination.currentPage - 1) * itemsPerPage;

  const pagedCompanies = filteredCompanies.map((company, index) => ({
    ...company,
    rank: currentOffset + index + 1,
  }));

  return (
    <section>
      <TopGroupLayout>
        <Title text={"비교 현황"} />
        <Filter
          filterOptions={filters}
          showFilterOptions={showFilterOptions}
          setShowFilterOptions={setShowFilterOptions}
          selectedFilter={selectedFilter}
          onSelectFilter={handleFilterChange}
        />
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
            "countMyPicked",
            "countYourPicked",
          ]}
          itemsPerPage={itemsPerPage}
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
}
