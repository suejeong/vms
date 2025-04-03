import React, { useState, useEffect } from "react";
import styles from "./InvestDeleteModal.module.scss";
import { deleteInvest, getInvest } from "../../../api/Invest";

export function InvestDeleteModal({
  modalDeleteState,
  investId,
  refetchCompanyInvest,
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
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCoreect, setPasswordCoreect] = useState(false);

  const handlePreviewPassword = () => {
    setShowPassword(!showPassword);
  };

  const InvestmentChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password === investData.password) {
      setPasswordCoreect(true);
      deleteInvest(investId);
    } else {
      setPasswordCoreect(false);
    }

    setSuccess(true);
  };

  return (
    <div className={styles.panelContainer}>
      {!success ? (
        <>
          <div className={styles.panelHeader}>
            <div className={styles.headerContent}>
              <h2 className={styles.title}>삭제 권한 인증</h2>
              <button onClick={modalDeleteState} className={styles.closeButton}>
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
                삭제하기
              </button>
            </div>
          </form>
        </>
      ) : passwordCoreect ? (
        <div className={styles.successPanelContainer}>
          <div className={styles.successPanelHeader}>
            <button
              onClick={() => {
                console.log(form.password);
                console.log(investData.password);
                modalDeleteState;
              }}
              className={`${styles.successCloseButton} ${styles.closeButton}`}
            >
              <img
                src="/images/icons/ic_delete.png"
                alt="close"
                className={styles.closeButton}
              />
            </button>
          </div>
          <h2 className={styles.successTitle}>삭제가 완료되었어요!</h2>
          <button
            onClick={modalDeleteState}
            className={`${styles.successCancleButton} ${styles.button} ${styles.cancelButton}`}
          >
            확인
          </button>
        </div>
      ) : (
        <div className={styles.successPanelContainer}>
          <div className={styles.successPanelHeader}>
            <button
              onClick={modalDeleteState}
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
            onClick={modalDeleteState}
            className={`${styles.successCancleButton} ${styles.button} ${styles.cancelButton}`}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
}

export default InvestDeleteModal;
