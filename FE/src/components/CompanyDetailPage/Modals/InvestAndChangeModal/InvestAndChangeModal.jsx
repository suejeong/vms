import React, { useState, useEffect } from "react";
import styles from "./InvestAndChangeModal.module.scss";
import { createInvest, updateInvest, getInvest } from "../../../../api/Invest";
import { useModal } from "../ModalContext/ModalContext";
import CompleteAndFailModal from "../CompleteAndFailModal/CompleteAndFailModal.jsx";
import getCompanyImage from "../../../GetCompanyImage/GetCompanyImage.jsx";

// 이미지 import 추가
import closeIcon from "/src/assets/images/icons/ic_delete.png";
import visibilityOnIcon from "/src/assets/images/icons/btn_visibility_on.png";
import visibilityOffIcon from "/src/assets/images/icons/btn_visibility_off.png";

export default function InvestAndChangeModal({
  type, //투자인지 투자수정인지
  companyDataState, //모두 사용
  investId, //투자수정에만 사용
  refetchCompanyInvest, //투자내역 실시간 변동 감지를 위한 리패치함수
}) {
  const { openModal, closeModal } = useModal();
  const [investData, setInvestData] = useState(null);
  const [form, setForm] = useState({});

  async function fetchData() {
    const data = await getInvest(investId);
    setInvestData(data);
    setForm({
      companyId: companyDataState.id,
      id: data.id,
      username: data.username,
      investAmount: data.investAmount,
      comment: data.comment,
      password: "",
      secondPassword: "",
    });
  }

  useEffect(() => {
    if (type === "수정") {
      fetchData();
    } else {
      setForm({
        companyId: companyDataState.id,
        id: "",
        username: "",
        investAmount: "",
        comment: "",
        password: "",
        secondPassword: "",
      });
    }
  }, [type, companyDataState?.id]);

  const [showPassword, setShowPassword] = useState({
    first: false,
    second: false,
  });

  const handlePreviewPassword = (type) => {
    setShowPassword((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const InvestmentChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "투자") {
      if (form.password === form.secondPassword) {
        const { secondPassword, id, ...newdata } = form;
        newdata.investAmount = Number(newdata.investAmount);
        await createInvest(newdata);
        refetchCompanyInvest();
        closeModal();
        openModal(<CompleteAndFailModal type={type} result={"성공"} />);
      } else {
        openModal(<CompleteAndFailModal type={type} result={"실패"} />);
      }
    } else {
      if (form.password === form.secondPassword) {
        const { secondPassword, ...newdata } = form;
        newdata.investAmount = Number(newdata.investAmount);
        await updateInvest(investId, newdata);
        refetchCompanyInvest();
        closeModal();
        openModal(<CompleteAndFailModal type={type} result={"성공"} />);
      } else {
        openModal(<CompleteAndFailModal type={type} result={"실패"} />);
      }
    }
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div
        className={styles.panelContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.panelHeader}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>
              {type === "투자" ? "기업에 투자하기" : "기업 투자 수정하기"}
            </h2>
            <button onClick={closeModal} className={styles.closeButton}>
              <img
                src={closeIcon}
                alt="close"
                className={styles.closeButton}
              />
            </button>
          </div>
          <div className={styles.companyInfo}>
            <h3 className={styles.infoTitle}>투자 기업 정보</h3>
            <div className={styles.companyDetails}>
              <img
                src={getCompanyImage(companyDataState.name)}
                alt="기업이미지"
                className={styles.companyImage}
              />
              <p className={styles.companyName}>{companyDataState.name}</p>
              <span className={styles.companyCategory}>
                {companyDataState.category}
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
              name="username"
              id="investorName"
              value={form.username || ""}
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
              name="investAmount"
              id="investmentAmount"
              value={form.investAmount || ""}
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
              name="comment"
              id="investmentComment"
              value={form.comment || ""}
              onChange={InvestmentChange}
              placeholder="투자에 대한 코멘트를 입력해 주세요"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="firstPassword" className={styles.label}>
              {type === "투자" ? "비밀번호" : "새로운 비밀번호"}
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword.first ? "text" : "password"}
                name="password"
                id="firstPassword"
                value={form.password || ""}
                onChange={InvestmentChange}
                placeholder={
                  type === "투자"
                    ? "비밀번호를 입력해 주세요"
                    : "새로운 비밀번호를 입력해 주세요"
                }
                required
                className={styles.input}
              />
              <img
                src={
                  showPassword.first ? visibilityOnIcon : visibilityOffIcon
                }
                alt="엿보기"
                onClick={() => handlePreviewPassword("first")}
                className={styles.previewIcon}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="secondPassword" className={styles.label}>
              {type === "투자" ? "비밀번호 확인" : "새로운 비밀번호 확인"}
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword.second ? "text" : "password"}
                name="secondPassword"
                id="secondPassword"
                value={form.secondPassword || ""}
                onChange={InvestmentChange}
                placeholder={
                  type === "투자"
                    ? "비밀번호를 다시 한 번 입력해 주세요"
                    : "새로운 비밀번호를 다시 한 번 입력해 주세요"
                }
                required
                className={styles.input}
              />
              <img
                src={
                  showPassword.second ? visibilityOnIcon : visibilityOffIcon
                }
                alt="엿보기"
                onClick={() => handlePreviewPassword("second")}
                className={styles.previewIcon}
              />
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button
              onClick={closeModal}
              className={`${styles.button} ${styles.cancelButton}`}
            >
              취소
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.submitButton}`}
            >
              {type === "투자" ? "투자하기" : "수정하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
