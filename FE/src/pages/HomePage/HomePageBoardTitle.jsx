import styles from "./HomePage.module.css";

const HomePageBoardTitle = () => {
  return (
   <div className={styles.boardHeader}>
        <span className={styles.sizeSm}>순위</span>
        <span className={styles.sizeLg}>기업 명</span>
        <span className={styles.sizeXlg}>기업 소개</span>
        <span className={styles.sizeMd}>카테고리</span>
        <span className={styles.sizeMd}>누적 투자 금액</span>
        <span className={styles.sizeMd}>매출액</span>
        <span className={styles.sizeMd}>고용 인원</span>
    </div>
  )
}

export default HomePageBoardTitle