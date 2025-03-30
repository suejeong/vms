import styles from "../CompanyDetailPage.module.scss";

export function InvestChangeModal({ modalChangeState }) {
  return (
    <div className={styles.deleteInestModalDiv}>
      <div className={styles.deleteInestModalCloseDiv}>
        <p className={styles.detialPageWeight700}>투자수정정하기 모달은 </p>

        <button
          className={styles.deleteInestModalDeleteButton}
          onClick={modalChangeState}
        ></button>
      </div>
      <div className={styles.deleteInestModalPasswordDiv}>
        <p
          className={styles.detialPageWeight700}
          style={{ marginRight: "auto" }}
        >
          투자모달 가져와서 만들예정
        </p>
        <input
          type={"password"}
          className={styles.deleteInestModalPasswordInput}
          placeholder={"비밀번호를 입력해주세요."}
        />

        <button
          className={styles.investDeleteCompleteButton}
          onClick={modalChangeState} //데이터 삭제하는거 추가
        >
          수정하기
        </button>
      </div>
    </div>
  );
}
export default InvestChangeModal;
