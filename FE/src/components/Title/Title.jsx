import React from 'react'
import styles from './Title.module.scss'

// 기업리스트, 투자현황, 나의 기업 비교 등 페이지의 타이틀 메시지를 받아오는 컴포넌트입니다.
function Title({ text }) {
  return (
    <h2 className={styles.h2Title}>{text}</h2>
  )
}

export default Title