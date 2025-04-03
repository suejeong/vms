import { getInvest } from "../../../api/Invest";
import styles from "./InvestChangeModal.module.scss";
import React, { useState, useEffect } from "react";

export function InvestChangeModal({
  modalChangeState,
  investId,
  refetchCompanyInvest,
  modalChangeCompleteStates,
}) {
  const [investData, setInvestData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getInvest(investId);
      setInvestData(data);
    }
    fetchData();
  }, [investId]);

  console.log(investData);

  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCoreect, setPasswordCoreect] = useState(true);

  const handlePreviewPassword = () => {
    setShowPassword(!showPassword);
  };

  const InvestmentChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 후 서버 전송 🔥
    if (form.password == investData.password) {
      modalChangeCompleteStates();
    } else {
      setPasswordCoreect(false);
    }
  };

  return passwordCoreect ? (
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
              name="password"
              id="Password"
              value={form.password || ""}
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
            onClick={() => {
              console.log(form.password);
              console.log(investData.password);
            }}
          >
            수정하기
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className={styles.successPanelContainer}>
      <div className={styles.successPanelHeader}>
        <button
          onClick={modalChangeState}
          className={`${styles.successCloseButton} ${styles.closeButton}`}
        >
          <img
            src="/images/icons/ic_delete.png"
            alt="close"
            className={styles.closeButton}
          />
        </button>
      </div>
      <h2 className={styles.successTitle}>비밀번호가 일치하지 않아요!</h2>
      <button
        onClick={modalChangeState}
        className={`${styles.successCancleButton} ${styles.button} ${styles.cancelButton}`}
      >
        확인
      </button>
    </div>
  );
}
export default InvestChangeModal;
