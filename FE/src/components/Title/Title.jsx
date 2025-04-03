import React from 'react'

// 기업리스트, 투자현황, 나의 기업 비교 등 페이지의 타이틀 메시지를 받아오는 컴포넌트입니다.
function Title({ text, className = '' }) {
  const baseClass = 'text-base md:text-xl md:font-bold';
  return (
    <h2 className={`${baseClass} ${className}`}>{text}</h2>
  )
}

export default Title