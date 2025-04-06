import RowButtonModal from "../../Modals/RowButtonModal/RowButtonModal";
import styles from "./MakeTableRow.module.scss";
import { useState } from "react";

export function MakeTableRow({
  id,
  Name,
  Rank,
  InvestAmount,
  Coment,
  companyDataState,
  refetchCompanyInvest,
}) {
  const [buttonModalState, setButtonModalState] = useState(false);
  const [selectedInvest, setSelectedInvest] = useState(null);
  const selectedInvestState = (now) => {
    setSelectedInvest(now);
  };
  return (
    <div id={id} className={styles.tableRow}>
      <div className={styles.sizeMd}>{Name}</div>
      <div className={styles.sizeMd}>{Rank}</div>
      <div className={styles.sizeMd}>{InvestAmount}</div>
      <div className={styles.sizeLg}>{Coment}</div>
      <div className={styles.sizeSm}>
        <div style={{ position: "relative" }}>
          <button
            className={styles.investDeleteButton}
            onClick={(e) => {
              const tmp = e.target.parentNode.parentNode.parentNode;
              setSelectedInvest(tmp.id);
              setButtonModalState(true);
            }}
          />
          {buttonModalState ? (
            <RowButtonModal
              RowModalClose={() => setButtonModalState(false)}
              investId={selectedInvest}
              companyDataState={companyDataState}
              refetchCompanyInvest={refetchCompanyInvest}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MakeTableRow;
