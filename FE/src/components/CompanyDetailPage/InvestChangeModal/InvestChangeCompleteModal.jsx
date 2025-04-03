import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./InvestChangeCompleteModal.module.scss";

export default function InvestChangeCompleteModal({
  modalChangeState,
  companyData,
  investData,
}) {
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    first: false,
    second: false,
  });
  const companyName = companyData.name;
  const imgsrc = `/images/companies/${companyName}.png`;

  const handlePreviewPassword = (type) => {
    setShowPassword((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const InvestmentChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form); // 내용확인
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 후 서버 전송 🔥
    // 검사 후 form에 UUID 추가
    setSuccess(true);
  };

  return (
    <div className={styles.panelContainer}>
      {!success ? (
        <>
          <div className={styles.panelHeader}>
            <div className={styles.headerContent}>
              <h2 className={styles.title}>기업에 투자 수정하기</h2>
              <button onClick={modalChangeState} className={styles.closeButton}>
                <img
                  src="/images/icons/ic_delete.png"
                  alt="close"
                  className={styles.closeButton}
                />
              </button>
            </div>
            <div className={styles.companyInfo}>
              <h3 className={styles.infoTitle}>투자 기업 정보</h3>
              <div className={styles.companyDetails}>
                <img
                  src={imgsrc}
                  alt="기업이미지"
                  className={styles.companyImage}
                />
                <p className={styles.companyName}>{companyName}</p>
                <span className={styles.companyCategory}>
                  {companyData.category}
                </span>
              </div>
            </div>
          </div>
          <form method="post" onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="investorName" className={styles.label}>
                투자자 이름
              </label>
              <input
                type="text"
                name="name"
                id="investorName"
                value={form.name || ""}
                onChange={InvestmentChange}
                placeholder="투자자 이름을 입력해 주세요"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="investmentAmount" className={styles.label}>
                투자 금액
              </label>
              <input
                type="text"
                name="price"
                id="investmentAmount"
                value={form.price || ""}
                onChange={InvestmentChange}
                placeholder="투자 금액을 입력해 주세요"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="investmentComment" className={styles.label}>
                투자 코멘트
              </label>
              <input
                type="text"
                name="desc"
                id="investmentComment"
                value={form.desc || ""}
                onChange={InvestmentChange}
                placeholder="투자에 대한 코멘트를 입력해 주세요"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="firstPassword" className={styles.label}>
                비밀번호
              </label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword.first ? "text" : "password"}
                  name="firstPassword"
                  id="firstPassword"
                  value={form.firstPassword || ""}
                  onChange={InvestmentChange}
                  placeholder="비밀번호를 입력해주세요"
                  required
                  className={styles.input}
                />
                <img
                  src={
                    showPassword.first
                      ? "/images/icons/btn_visibility_on.png"
                      : "/images/icons/btn_visibility_off.png"
                  }
                  alt="엿보기"
                  onClick={() => handlePreviewPassword("first")}
                  className={styles.previewIcon}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="secondPassword" className={styles.label}>
                비밀번호 확인
              </label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword.second ? "text" : "password"}
                  name="secondPassword"
                  id="secondPassword"
                  value={form.secondPassword || ""}
                  onChange={InvestmentChange}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  required
                  className={styles.input}
                />
                <img
                  src={
                    showPassword.second
                      ? "/images/icons/btn_visibility_on.png"
                      : "/images/icons/btn_visibility_off.png"
                  }
                  alt="엿보기"
                  onClick={() => handlePreviewPassword("second")}
                  className={styles.previewIcon}
                />
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button
                onClick={modalChangeState}
                className={`${styles.button} ${styles.cancelButton}`}
              >
                취소
              </button>
              <button
                type="submit"
                className={`${styles.button} ${styles.submitButton}`}
              >
                수정하기
              </button>
            </div>
          </form>
        </>
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
          <h2 className={styles.successTitle}>수정이 완료되었어요!</h2>
          <button
            onClick={modalChangeState}
            className={`${styles.successCancleButton} ${styles.button} ${styles.cancelButton}`}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
}
