import React, { useEffect, useRef, useState } from "react";
import style from "./Modal.module.scss";
import MyCompanyModal from "../MyCompanyModal/MyCompanyModal";
import CompareCompanyModal from "../CompareCompanyModal/CompareCompanyModal";
import { Pagination } from "../Pasination/Pasination";
import SearchBar from "../SearchBar/SearchBar";
import Title from "../../Title/Title";
import { searchCompanies } from "../../../api/Company";

function Modal({
  isOpen,
  onClose,
  onSelect,
  recentCompanies,
  selectedCompanies,
  setSelectedCompanies,
  myCompany,
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const modalBackground = useRef();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalCompanies: 0,
  });
  const companiesPerPage = 5;

  const handleSearch = async () => {
    try {
      const data = await searchCompanies(
        inputValue,
        pagination.currentPage,
        companiesPerPage,
        "orderByName_asc",
        myCompany?.id
      );

      setFilteredCompanies(data.data);
      setPagination(data.pagination);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [pagination.currentPage]);

  if (!isOpen) return null;

  const handleSelect = (company) => {
    onSelect(company);
    setInputValue("");
    setFilteredCompanies([]);
    setIsSearchSubmitted(false);
    setPagination({
      currentPage: 1,
      totalPages: 0,
      totalCompanies: 0,
    });
  };

  const handleDeselect = (companyId) => {
    setSelectedCompanies((prev) =>
      prev.filter((company) => company.id !== companyId)
    );
  };

  const handlePageChange = (pageNumber) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: pageNumber,
    }));
  };

  return (
    <div
      className={style.overlay}
      ref={modalBackground}
      onClick={(e) => {
        if (modalBackground.current && e.target === modalBackground.current) {
          onClose();
        }
      }}
    >
      <div className={style.content}>
        <div className={style.header}>
          {!myCompany ? (
            <Title text="나의 기업 선택하기" />
          ) : (
            <Title text="비교할 기업 선택하기" />
          )}
          <button className={style.closeButton} onClick={onClose}>
            <img src="/images/icons/ic_delete.png" alt="delete" />
          </button>
        </div>
        <SearchBar
          inputValue={inputValue}
          setInputValue={setInputValue}
          setFilteredCompanies={setFilteredCompanies}
          handleSearch={handleSearch}
          setPagination={setPagination}
          setIsSearchSubmitted={setIsSearchSubmitted}
        />
        {!myCompany ? (
          <MyCompanyModal
            filteredCompanies={filteredCompanies}
            recentCompanies={recentCompanies}
            handleSelect={handleSelect}
            totalCompanies={pagination.totalCompanies}
            inputValue={inputValue}
            selectedCompanies={selectedCompanies}
            myCompany={myCompany}
            handleDeselect={handleDeselect}
            isSearchSubmitted={isSearchSubmitted}
          />
        ) : (
          <CompareCompanyModal
            filteredCompanies={filteredCompanies}
            selectedCompanies={selectedCompanies}
            setSelectedCompanies={setSelectedCompanies}
            totalCompanies={pagination.totalCompanies}
            inputValue={inputValue}
            handleDeselect={handleDeselect}
            myCompany={myCompany}
            isSearchSubmitted={isSearchSubmitted}
          />
        )}
        <div className={style.searchCompany}>
          {pagination.totalPages > 1 && inputValue && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
