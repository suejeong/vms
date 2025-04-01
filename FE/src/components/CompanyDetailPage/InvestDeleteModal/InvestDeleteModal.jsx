import styles from "./InvestDeleteModal.module.scss";

export function InvestDeleteModal({ modalDeleteState }) {
  return (
    <div className={styles.deleteInestModalDiv}>
      <div className={styles.deleteInestModalCloseDiv}>
        <p className={styles.detialPageWeight700}>삭제 권한 인증</p>

        <button
          className={styles.deleteInestModalDeleteButton}
          onClick={modalDeleteState}
        ></button>
      </div>
      <div className={styles.deleteInestModalPasswordDiv}>
        <p
          className={styles.detialPageWeight700}
          style={{ marginRight: "auto" }}
        >
          비밀번호
        </p>
        <input
          type={"password"}
          className={styles.deleteInestModalPasswordInput}
          placeholder={"비밀번호를 입력해주세요."}
        />

        <button
          className={styles.investDeleteCompleteButton}
          onClick={modalDeleteState} //데이터 삭제하는거 추가
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}
export default InvestDeleteModal;
