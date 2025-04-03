import React, { useEffect, useState } from "react";
import IsLoading from "../../common/IsLoading/IsLoading";
import Error from "../../common/Error/Error";
import Title from "../../components/Title/Title";
import BoardTitleBar from "../../components/BoardTitleBar/BoardTitleBar";
import MiddleGroupLayout from "../../components/MiddleGroupLayout/MiddleGroupLayout";
import BoardList from "../../components/BoardList/BoardList";
import Filter from "../../components/Filter/Filter";
import BottomGroupLayout from "../../components/BottomGroupLayout/BottomGroupLayout";
import Pagination from "../../components/Pagination/Pagination";
import { useCompanies } from "../../api/useCompanies";
import TopGroupLayout from "../../components/TopGroupLayout/TopGroupLayout";

// 테이블 타이틀 정의
const titleList = [
  { title: '순위', flex: 'flex-[2]' },
  { title: '기업명', flex: 'flex-[6]' },
  { title: '기업 소개', flex: 'flex-[9]' },
  { title: '카테고리', flex: 'flex-[5]' },
  { title: '나의 기업 선택 횟수', flex: 'flex-[5]' },
  { title: '비교 기업 선택 횟수', flex: 'flex-[5]' },
];

// 필터 옵션
const filters = [
  {
    label: "나의 기업 선택 횟수 높은 순",
    sortFn: (a, b) => b.countMyPicked - a.countMyPicked,
  },
  {
    label: "나의 기업 선택 횟수 낮은 순",
    sortFn: (a, b) => a.countMyPicked - b.countMyPicked,
  },
  {
    label: "비교 기업 선택 횟수 높은 순",
    sortFn: (a, b) => b.countYourPicked - a.countYourPicked,
  },
  {
    label: "비교 기업 선택 횟수 낮은 순",
    sortFn: (a, b) => a.countYourPicked - b.countYourPicked,
  },
];

export default function StatusPage() {
  const { data: companies = [], error, isLoading } = useCompanies();

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1); // 필터 변경 시 페이지 초기화
  }, [selectedFilter]);

  if (isLoading) return <IsLoading />;
  if (error) return <Error />;

  const sortedCompanies = [...companies].sort(selectedFilter.sortFn);
  const currentOffset = (currentPage - 1) * itemsPerPage;

  const pagedCompanies = sortedCompanies
    .slice(currentOffset, currentOffset + itemsPerPage)
    .map((company, index) => ({
      ...company,
      rank: currentOffset + index + 1,
    }));

  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage);

  return (
    <section>
      <TopGroupLayout>
        <Title text={"비교 현황"} />
        <Filter
          filterOptions={filters}
          showFilterOptions={showFilterOptions}
          setShowFilterOptions={setShowFilterOptions}
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
        />
      </TopGroupLayout>

      <MiddleGroupLayout>
        <BoardTitleBar titleList={titleList} />
        <BoardList
          flex={titleList.map((list) => list.flex)}
          companies={pagedCompanies}
          fields={['name', 'description', 'category', 'countMyPicked', 'countYourPicked']}
          itemsPerPage={itemsPerPage}
        />
      </MiddleGroupLayout>

      <BottomGroupLayout>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </BottomGroupLayout>
    </section>
  );
}
