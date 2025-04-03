import styles from "./InvestTable.module.scss";
import ChangeToNumber from "../ChangeToNumber/ChangeToNumber";
import DeleteAndChangeModal from "../DeleteAndChangeModal/DeleteAndChangeModal";
import InvestDeleteModal from "../InvestDeleteModal/InvestDeleteModal";
import InvestChangeModal from "../InvestChangeModal/InvestChangeModal";
import InvestChangeCompleteModal from "../InvestChangeModal/InvestChangeCompleteModal";
import MakeTableRow from "../MakeTableRow/MakeTableRow";
import MakeTableHeader from "../MakeTableRow/MakeTableHeader";
import { useState, useRef } from "react";

export function InvestTable({ investData, companyData }) {
  const [modalState, setModalState] = useState(false);
  const [investDeleteModalState, setInvestDeleteModalState] = useState(false);
  const [investChangeModalState, setInvestChangeModalState] = useState(false);
  const [investChangeCompleteModalState, setInvestChangeCompleteModalState] =
    useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalBackground = useRef();

  const modalDeleteState = () => {
    setInvestDeleteModalState(false);
  };

  const modalChangeState = () => {
    setInvestChangeModalState(false);
  };

  const modalChangeCompleteState = () => {
    setInvestChangeCompleteModalState(false);
  };
  const modalDeleteStates = () => {
    setModalState(false);
    setInvestDeleteModalState(true);
  };
  const modalChangeStates = () => {
    setModalState(false);
    setInvestChangeModalState(true);
  };
  const modalChangeCompleteStates = () => {
    setInvestChangeModalState(false);
    setInvestChangeCompleteModalState(true);
  };
  const handleButtonClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setModalPosition({
      top: rect.bottom + 10,
      left: rect.left - 115,
    });
    setModalState(true);
  };

  const sortedInvestData = [...investData].sort(
    (a, b) => b.investAmount - a.investAmount
  );
  // const sortedInvestData = [];

  const Button = (
    <button
      className={styles.investDeleteButton}
      onClick={(e) => handleButtonClick(e)}
    />
  );

  const makeRow = (sortedInvestData) => {
    return sortedInvestData.map((data, index) => (
      <MakeTableRow
        key={data.id}
        Name={data.username}
        Rank={index + 1}
        InvestAmount={data.investAmount}
        Coment={data.comment}
        button={Button}
      />
    ));
  };

  return (
    <div>
      <div className={styles.investTableHeader}>
        <MakeTableHeader
          Name={"투자자 이름"}
          Rank={"순위"}
          InvestAmount={"투자 금액"}
          Coment={"투자 코멘트"}
          button={""}
        ></MakeTableHeader>
      </div>
      {sortedInvestData.length != 0 ? (
        <div className={styles.investTableBody}>
          {makeRow(sortedInvestData)}
        </div>
      ) : (
        <div className={styles.investNoData}>
          아직 투자한 기업이 없어요.
          <br />
          버튼을 눌러 기업에 투자해보세요!
        </div>
      )}
      {modalState && (
        <div
          ref={modalBackground}
          className={styles.modalOverlay}
          onClick={(e) => {
            if (
              modalBackground.current &&
              e.target === modalBackground.current
            ) {
              setModalState(false);
            }
          }}
        >
          <DeleteAndChangeModal
            modalPosition={modalPosition}
            modalDeleteStates={() => {
              modalDeleteStates();
            }}
            modalChangeStates={() => {
              modalChangeStates();
            }}
          />
        </div>
      )}
      <div>
        {investDeleteModalState && (
          <div
            ref={modalBackground}
            className={styles.modalOverlay} // 추가된 스타일
            onClick={(e) => {
              if (
                modalBackground.current &&
                e.target === modalBackground.current
              ) {
                setInvestDeleteModalState(false);
              }
            }}
          >
            <InvestDeleteModal
              modalDeleteState={() => {
                modalDeleteState();
              }}
            />
          </div>
        )}

        {investChangeModalState && (
          <div
            ref={modalBackground}
            className={styles.modalOverlay} //
            onClick={(e) => {
              if (
                modalBackground.current &&
                e.target === modalBackground.current
              ) {
                setInvestChangeModalState(false);
              }
            }}
          >
            <InvestChangeModal
              modalChangeState={() => {
                modalChangeState();
              }}
              modalChangeCompleteStates={() => {
                modalChangeCompleteStates();
              }}
            />
          </div>
        )}

        {investChangeCompleteModalState && (
          <div
            ref={modalBackground}
            className={styles.modalOverlay} //
            onClick={(e) => {
              if (
                modalBackground.current &&
                e.target === modalBackground.current
              ) {
                modalChangeCompleteState(false);
              }
            }}
          >
            <InvestChangeCompleteModal
              modalChangeState={() => {
                modalChangeCompleteState();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default InvestTable;
