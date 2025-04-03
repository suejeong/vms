import styles from "./InvestHeader.module.scss";
import { useState, useRef, useEffect } from "react";
import InvestModal from "../InvestModal/InvestModal";

export function InvestHeader({
  investData,
  companyData,
  refetchCompanyInvest,
}) {
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
      <button
        className={styles.investButton}
        onClick={() => setInvestModalState(true)}
      >
        {" "}
        투자하기{" "}
      </button>

      {investModalState && (
        <div
          ref={modalBackground}
          className={styles.modalOverlay}
          onClick={(e) => {
            console.log("Clicked element:", e.target);
            console.log("Modal background element:", modalBackground.current);
            if (
              modalBackground.current &&
              e.target === modalBackground.current
            ) {
              setInvestModalState(false);
            }
          }}
        >
          <InvestModal
            refetchCompanyInvest={refetchCompanyInvest}
            investData={investData}
            companyData={companyData}
            investState={() => {
              investState();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default InvestHeader;
