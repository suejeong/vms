import React, { useRef, useState } from "react";
import style from "./Modal.module.scss";
import MyCompanyModal from "../MyCompanyModal/MyCompanyModal";
import CompareCompanyModal from "../CompareCompanyModal/CompareCompanyModal";
import { Pagination } from "../../components/Pasination/Pasination";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getChoseong } from "es-hangul";
import Title from "../../../../components/Title/Title";

function Modal({
  isOpen,
  onClose,
  onSelect,
  companies,
  recentCompanies,
  selectedCompanies,
  setSelectedCompanies,
  myCompany,
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const modalBackground = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 5;

  if (!isOpen) return null;

  const filterCompanies = (value) => {
    if (value.trim() === "") {
      setFilteredCompanies([]);
      return;
    }

    const inputChoseong = getChoseong(value);
    const isValidChoseong = /^[ㄱ-ㅎ]+$/.test(inputChoseong);

    if (!isValidChoseong) {
      setFilteredCompanies([]);
      return;
    }

    const filteredCompanies = companies.filter(
      (company) => !myCompany || company.id !== myCompany.id
    );

    const filtered = filteredCompanies.filter((company) => {
      const companyName = company.name;
      const companyChoseong = getChoseong(companyName);

      return (
        companyName.includes(value) || companyChoseong.includes(inputChoseong)
      );
    });

    setFilteredCompanies(filtered);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    filterCompanies(value);
  };

  const handleSelect = (company) => {
    onSelect(company);
    setInputValue("");
    setFilteredCompanies([]);
  };

  const handleSubmit = () => {
    const filteredCompanies = companies.filter(
      (company) => !myCompany || company.id !== myCompany.id
    );

    const filtered = filteredCompanies.filter((company) =>
      company.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const handleDelete = () => {
    setInputValue("");
    setFilteredCompanies([]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeselect = (companyId) => {
    setSelectedCompanies((prev) =>
      prev.filter((company) => company.id !== companyId)
    );
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

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
          handleInputChange={handleInputChange}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
        />
        {!myCompany ? (
          <MyCompanyModal
            filteredCompanies={filteredCompanies}
            recentCompanies={recentCompanies}
            handleSelect={handleSelect}
            currentCompanies={currentCompanies}
            inputValue={inputValue}
            selectedCompanies={selectedCompanies}
            myCompany={myCompany}
            handleDeselect={handleDeselect}
          />
        ) : (
          <CompareCompanyModal
            filteredCompanies={filteredCompanies}
            selectedCompanies={selectedCompanies}
            setSelectedCompanies={setSelectedCompanies}
            currentCompanies={currentCompanies}
            inputValue={inputValue}
            handleDeselect={handleDeselect}
            myCompany={myCompany}
          />
        )}
        <div className={style.searchCompany}>
          {totalPages > 1 && inputValue && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
