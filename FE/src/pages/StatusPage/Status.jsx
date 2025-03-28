import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import styles from './Status.module.css';
import CompanyTableHeader from '../../components/CompanyTableHeader/CompanyTableHeader';
import CompanyCard from '../../components/CompanyCard/CompanyCard';
import Section from '../../common/Section/Section';
import IsLoading from '../../common/IsLoading/IsLoading';
import Error from '../../common/Error/Error';
import TitleWithSelect from '../../components/TitleWithSelect/TitleWithSelect';
import Pagination from '../../components/Pagination/Pagination';

const options = ['나의 기업 선택 횟수 높은순', '나의 기업 선택 횟수 낮은순', '실제 누적 투자 금액 높은순', '실제 누적 투자 금액 낮은순'];

export default function Status() {
  const [filter, setFilter] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;

  useEffect(() => {
    console.log("선택된 필터:", filter);
  }, [filter]);

  const { data: companies = [], error, isLoading } = useQuery({
    queryKey: ['companies', filter],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/companies');
      if (!res.ok) throw new Error('데이터를 불러오는 중 오류 발생');
      const result = await res.json();
      const sortedCompanies = [...result];

      switch(filter) {
        case options[0]:
          sortedCompanies.sort((a, b) => b.countMyPicked - a.countMyPicked);
          break;
        case options[1]:
          sortedCompanies.sort((a, b) => a.countMyPicked - b.countMyPicked);
          break;
        case options[2]:
          sortedCompanies.sort((a, b) => b.totalInvestment - a.totalInvestment);
          break;
        case options[3]:
          sortedCompanies.sort((a, b) => a.totalInvestment - b.totalInvestment);
          break;
        default:
          break;
      }
      return sortedCompanies;
    }
  });

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
    setCurrentPage(1); 
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <IsLoading />;
  if (error) return <Error />;

  // 페이지 내부에 페이지를 계산한다.
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const pagedCompanies = companies.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  return (
    <Section>
      <TitleWithSelect title="비교 현황" options={options} handleFilter={handleFilter} selectedFilter={filter} />
      <div className={styles.tableContainer}>
        <CompanyTableHeader />
        {
          pagedCompanies.length === 0 ? (
            <p>아직 데이터가 없음...</p>
          ) : (
            <ul className={styles.companyList}>
              {pagedCompanies.map((company, index) => (
                <li key={company.id} className={styles.companyItem}>
                  <CompanyCard company={company} rank={index + 1 + (currentPage - 1) * itemsPerPage} />
                </li>
              ))}
            </ul>
          )
        }
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Section>
  );
}
