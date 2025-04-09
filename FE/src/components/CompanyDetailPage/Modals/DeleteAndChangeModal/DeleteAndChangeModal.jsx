import React, { useState, useEffect } from "react";
import styles from "./DeleteAndChangeModal.module.scss";
import { deleteInvest, getInvest } from "../../../../api/Invest";
import { useModal } from "../ModalContext/ModalContext";
import InvestAndChangeModal from "../InvestAndChangeModal/InvestAndChangeModal";
import CompleteAndFailModal from "../CompleteAndFailModal/CompleteAndFailModal.jsx";

// 이미지 import 추가
import deleteIcon from "/src/assets/images/icons/ic_delete.png";
import visibilityOnIcon from "/src/assets/images/icons/btn_visibility_on.png";
import visibilityOffIcon from "/src/assets/images/icons/btn_visibility_off.png";

export function DeleteAndChangeModal({
  type,
  investId,
  refetchCompanyInvest,
  companyDataState,
}) {
  const { openModal, closeModal } = useModal();
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [investData, setInvestData] = useState(null);

  async function fetchData() {
    const data = await getInvest(investId);
    setInvestData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handlePreviewPassword = () => {
    setShowPassword(!showPassword);
  };

  const InvestmentChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "삭제") {
      if (form.password === investData.password) {
        await deleteInvest(investId);
        refetchCompanyInvest();
        closeModal();
        openModal(<CompleteAndFailModal type={type} result={"성공"} />);
      } else {
        openModal(<CompleteAndFailModal type={type} result={"실패"} />);
      }
    } else {
      if (form.password === investData.password) {
        closeModal();
        openModal(
          <InvestAndChangeModal
            type={"수정"}
            companyDataState={companyDataState}
            investId={investId}
            refetchCompanyInvest={refetchCompanyInvest}
          />
        );
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
              {type === "삭제" ? "삭제 권한 인증" : "수정 권한 인증"}
            </h2>
            <button onClick={closeModal} className={styles.closeButton}>
              <img
                src={deleteIcon}
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
                src={showPassword ? visibilityOnIcon : visibilityOffIcon}
                alt="엿보기"
                onClick={() => handlePreviewPassword()}
                className={styles.previewIcon}
              />
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={`${styles.button} ${styles.submitButton} ${styles.marginR0}`}
            >
              {type === "삭제" ? "삭제하기" : "수정하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteAndChangeModal;
