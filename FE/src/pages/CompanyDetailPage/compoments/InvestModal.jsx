import styles from "../CompanyDetailPage.module.scss";

export function InvestModal({ investState }) {
  return (
    <div className={styles.deleteInestModalDiv}>
      <div className={styles.deleteInestModalCloseDiv}>
        <p className={styles.detialPageWeight700}>투자하기 모달은 </p>

        <button
          className={styles.deleteInestModalDeleteButton}
          onClick={investState}
        ></button>
      </div>
      <div className={styles.deleteInestModalPasswordDiv}>
        <p
          className={styles.detialPageWeight700}
          style={{ marginRight: "auto" }}
        >
          투자모달 그대로 가져오면 됌
        </p>
        <input
          type={"password"}
          className={styles.deleteInestModalPasswordInput}
          placeholder={"비밀번호를 입력해주세요."}
        />

        <button
          className={styles.investDeleteCompleteButton}
          onClick={investState} //데이터 삭제하는거 추가
        >
          투자하기
        </button>
      </div>
    </div>
  );
}
export default InvestModal;
