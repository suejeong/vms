import styles from "./RowButtonModal.module.scss";
import { useEffect, useRef } from "react";
import DeleteAndChangeModal from "../DeleteAndChangeModal/DeleteAndChangeModal";
import { useModal } from "../ModalContext/ModalContext";
export function RowButtonModal({
  RowModalClose,
  investId,
  companyDataState,
  refetchCompanyInvest,
}) {
  const modalRef = useRef(null);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        RowModalClose(); // 외부 클릭 시 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [RowModalClose]);

  // console.log(investId);

  return (
    <div ref={modalRef} className={styles.RowbuttonModal}>
      <button
        className={styles.RowbuttonModalButton1}
        onClick={() => {
          RowModalClose();
          openModal(
            <DeleteAndChangeModal
              type={"수정"}
              investId={investId}
              companyDataState={companyDataState}
              refetchCompanyInvest={refetchCompanyInvest}
            />
          );
        }}
      >
        수정하기
      </button>
      <button
        className={styles.RowbuttonModalButton2}
        onClick={() => {
          RowModalClose();
          openModal(
            <DeleteAndChangeModal
              type={"삭제"}
              investId={investId}
              companyDataState={companyDataState}
              refetchCompanyInvest={refetchCompanyInvest}
            />
          );
        }}
      >
        삭제하기
      </button>
    </div>
  );
}

export default RowButtonModal;
