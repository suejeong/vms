import styles from "./HomePageBoardTitle.module.scss";

const HomePageBoardTitle = () => {
  return (
    <div className={styles.boardHeader}>
      <div className={styles.sizeSm}>순위</div>
      <div className={styles.sizeLg}>기업 명</div>
      <div className={styles.sizeXlg}>기업 소개</div>
      <div className={styles.sizeMd}>카테고리</div>
      <div className={styles.sizeMd}>누적 투자 금액</div>
      <div className={styles.sizeMd}>매출액</div>
      <div className={styles.sizeMd}>고용 인원</div>
    </div>
  );
};

export default HomePageBoardTitle;