import styles from "../CompanyDetailPage.module.scss";
import { useState, useRef } from "react";
import InvestModal from "./InvestModal";

export function InvestHeader({ className }) {
  const modalBackground = useRef();
  const investState = () => {
    setInvestModalState(false);
  };
  const [investModalState, setInvestModalState] = useState(false);
  return (
    <div className={className}>
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
          className={styles.modalOverlay} // 추가된 스타일
          onClick={(e) => {
            if (
              modalBackground.current &&
              e.target === modalBackground.current
            ) {
              setInvestModalState(false);
            }
          }}
        >
          <InvestModal
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
