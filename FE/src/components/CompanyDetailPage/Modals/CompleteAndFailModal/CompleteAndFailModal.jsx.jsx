import styles from "./CompleteAndFailModal.module.scss";
import React from "react";
import { useModal } from "../ModalContext/ModalContext";

// 이미지 import 추가
import deleteIcon from "/src/assets/images/icons/ic_delete.png";

export function CompleteAndFailModal({ type, result }) {
  const { closeModal } = useModal();
  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div
        className={styles.panelContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {result === "성공" ? (
          <div className={styles.successPanelContainer}>
            <div className={styles.successPanelHeader}>
              <button
                onClick={closeModal}
                className={`${styles.successCloseButton} ${styles.closeButton}`}
              >
                <img
                  src={deleteIcon}
                  alt="close"
                  className={styles.closeButton}
                />
              </button>
            </div>
            <h2 className={styles.successTitle}>
              {type === "투자"
                ? "투자가 완료되었어요!"
                : type === "수정"
                ? "수정이 완료되었어요!"
                : type === "삭제"
                ? "삭제가 완료되었어요!"
                : ""}
            </h2>
            <button
              onClick={closeModal}
              className={`${styles.successCancleButton} ${styles.button} ${styles.cancelButton}`}
            >
              확인
            </button>
          </div>
        ) : (
          <div className={styles.successPanelContainer}>
            <div className={styles.successPanelHeader}>
              <button
                onClick={closeModal}
                className={`${styles.successCloseButton} ${styles.closeButton}`}
              >
                <img
                  src={deleteIcon}
                  alt="close"
                  className={styles.closeButton}
                />
              </button>
            </div>
            <h2 className={styles.successTitle}>
              {type === "투자"
                ? "비밀번호가 일치하지 않아 투자에 실패했어요!"
                : type === "수정"
                ? "비밀번호가 일치하지 않아 수정을 실패했어요!"
                : type === "삭제"
                ? "비밀번호가 일치하지 않아 삭제를 실패했어요!"
                : ""}
            </h2>
            <button
              onClick={closeModal}
              className={`${styles.successCancleButton} ${styles.button} ${styles.cancelButton}`}
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompleteAndFailModal;
