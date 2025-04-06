import styles from "./InvestHeader.module.scss";
import { useState, useRef, useEffect } from "react";
import { useModal } from "../../Modals/ModalContext/ModalContext";
import InvestAndChangeModal from "../../Modals/InvestAndChangeModal/InvestAndChangeModal";

export function InvestHeader({
  investDataState,
  companyDataState,
  refetchCompanyInvest,
}) {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal(
      <InvestAndChangeModal
        type={"투자"}
        refetchCompanyInvest={refetchCompanyInvest}
        investDataState={investDataState}
        companyDataState={companyDataState}
      />
    );
  };

  const modalBackground = useRef();

  const investState = () => {
    setInvestModalState(false);
  };
  const [investModalState, setInvestModalState] = useState(false);

  return (
    <div className={styles.ViewMyStartUpHeader}>
      <p className={styles.detialPageWeight700}>
        View My Startup에서 받은 투자{" "}
      </p>
      <button className={styles.investButton} onClick={handleClick}>
        {" "}
        기업투자하기{" "}
      </button>
    </div>
  );
}

export default InvestHeader;
