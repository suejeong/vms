import styles from "../CompanyDetailPage.module.scss";

export function DeleteAndChangeModal({
  modalPosition,
  modalDeleteStates,
  modalChangeStates,
}) {
  return (
    <div
      className={styles.DeleteAndChangeModal}
      style={{
        position: "absolute",
        top: `${modalPosition.top}px`,
        left: `${modalPosition.left}px`,
        zIndex: 1000,
      }}
    >
      <button
        className={styles.DeleteAndChangeModalButton1}
        onClick={modalChangeStates}
      >
        수정하기
      </button>
      <br />
      <button
        className={styles.DeleteAndChangeModalButton2}
        onClick={modalDeleteStates}
      >
        삭제하기
      </button>
    </div>
  );
}
export default DeleteAndChangeModal;
