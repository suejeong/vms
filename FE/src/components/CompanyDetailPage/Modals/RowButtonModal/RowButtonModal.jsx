import { useEffect, useRef } from "react";
import DeleteAndChangeModal from "../DeleteAndChangeModal/DeleteAndChangeModal";
import { useModal } from "../ModalContext/ModalContext";

export function RowButtonModal({
  RowModalClose,
  investId,
  companyDataState,
  refetchCompanyInvest,
  triggerRef,
}) {
  const modalRef = useRef(null);
  const { openModal } = useModal();

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedInsideModal = modalRef.current?.contains(e.target);
      const clickedTriggerButton = triggerRef?.current?.contains(e.target);

      if (!clickedInsideModal && !clickedTriggerButton) {
        RowModalClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [RowModalClose, triggerRef]);

  return (
    <div
      ref={modalRef}
      className="absolute right-[8px] top-[50px] z-50 flex flex-col border border-gray200 rounded-[10px] w-[127px] bg-black400 [&>button]:h-10"
    >
      <button
        style={{ borderBottom: "1px solid #747474" }}
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
