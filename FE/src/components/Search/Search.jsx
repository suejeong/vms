import React from 'react'
import styles from './Search.module.scss'

// 검색 컴포넌트: 검색어 입력을 받아 엔터 키로 검색 실행
const Search = ({
    searchInput,        // 현재 입력된 검색어 상태값
    setSearchInput,     // 입력값 변경 시 상태 업데이트 함수
    setSearchKeyword,   // 실제로 검색할 키워드를 설정하는 함수
    setCurrentPage,     // 검색 시 페이지를 1페이지로 초기화하는 함수
  }) => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        console.log("엔터 감지");
        setSearchKeyword(searchInput);  // 입력된 값으로 검색 키워드 설정
        setCurrentPage(1);              // 페이지를 1로 초기화
      }
    };


  return (
    <div className={styles.searchContainer}>
        <input
        type="text"
        placeholder="검색어를 입력해주세요"            // 안내 텍스트
          value={searchInput}                           // 현재 입력값 표시
          onChange={(e) => setSearchInput(e.target.value)} // 입력값이 바뀔 때마다 상태 업데이트
          onKeyDown={handleKeyDown}                     // 엔터 키 눌렀을 때 실행
          className={styles.searchKeyword}              // 스타일 적용
        />
    </div>
  )
}

export default Search