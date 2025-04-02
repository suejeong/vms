import styles from "./InvestChangeModal.module.scss";
import React, { useState } from "react";

export function InvestChangeModal({
  modalChangeState,
  modalChangeCompleteStates,
}) {
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handlePreviewPassword = () => {
    setShowPassword(!showPassword);
  };

  const InvestmentChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 후 서버 전송 🔥
    // 검사 후 form에 UUID 추가
    console.log(form); // 내용확인
    modalChangeCompleteStates();
  };
  return (
    <div className={styles.panelContainer}>
      <div className={styles.panelHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>수정 권한 인증</h2>
          <button onClick={modalChangeState} className={styles.closeButton}>
            <img
              src="/images/icons/ic_delete.png"
              alt="close"
              className={styles.closeButton}
            />
          </button>
        </div>
      </div>

      <form method="post" onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="Password" className={styles.label}>
            비밀번호
          </label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              id="Password"
              value={form.Password || ""}
              onChange={InvestmentChange}
              placeholder="비밀번호를 입력해주세요"
              required
              className={styles.input}
            />
            <img
              src={
                showPassword
                  ? "/images/icons/btn_visibility_on.png"
                  : "/images/icons/btn_visibility_off.png"
              }
              alt="엿보기"
              onClick={() => handlePreviewPassword()}
              className={styles.previewIcon}
            />
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={`${styles.button} ${styles.submitButton}`}
          >
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default InvestChangeModal;
