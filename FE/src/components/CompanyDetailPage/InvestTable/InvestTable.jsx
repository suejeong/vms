import styles from "./InvestTable.module.scss";
import ChangeToNumber from "../ChangeToNumber/ChangeToNumber";
import DeleteAndChangeModal from "../DeleteAndChangeModal/DeleteAndChangeModal";
import InvestDeleteModal from "../InvestDeleteModal/InvestDeleteModal";
import InvestChangeModal from "../InvestChangeModal/InvestChangeModal";
import InvestChangeCompleteModal from "../InvestChangeModal/InvestChangeCompleteModal";
import MakeTableRow from "../MakeTableRow/MakeTableRow";
import MakeTableHeader from "../MakeTableRow/MakeTableHeader";
import { useState, useRef } from "react";

export function InvestTable({ investData }) {
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
  const headers = [
    {
      text: "투자자 이름",
      value: "name",
    },
    {
      text: "순위",
      value: "investRank",
    },
    {
      text: "투자 금액",
      value: "investAmount",
    },
    {
      text: "투자 코멘트",
      value: "investComnet",
    },
    {
      text: "",
      value: "button",
    },
  ];
  const items = [
    {
      name: investData[0].username,
      investRank: "1위",
      investAmount: ChangeToNumber(investData[0].invest_amount),
      investComnet: "111",
      button: (
        <button
          className={styles.investDeleteButton}
          onClick={(e) => handleButtonClick(e)}
        />
      ),
    },
    {
      name: investData[1].username,
      investRank: "2위",
      investAmount: ChangeToNumber(investData[1].invest_amount),
      investComnet: "222",
      button: (
        <button
          className={styles.investDeleteButton}
          onClick={(e) => handleButtonClick(e)}
        />
      ),
    },
    {
      name: investData[2].username,
      investRank: "3위",
      investAmount: ChangeToNumber(investData[2].invest_amount),
      investComnet: "333",
      button: (
        <button
          className={styles.investDeleteButton}
          onClick={(e) => handleButtonClick(e)}
        />
      ),
    },
    {
      name: investData[3].username,
      investRank: "4위",
      investAmount: ChangeToNumber(investData[3].invest_amount),
      investComnet: "444",
      button: (
        <button
          className={styles.investDeleteButton}
          onClick={(e) => handleButtonClick(e)}
        />
      ),
    },

    {
      name: investData[4].username,
      investRank: "5위",
      investAmount: ChangeToNumber(investData[4].invest_amount),
      investComnet: "555",
      button: (
        <button
          className={styles.investDeleteButton}
          onClick={(e) => handleButtonClick(e)}
        />
      ),
    },
  ];
  const headerKey = headers.map((header) => header.value);
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

      <div className={styles.investTableBody}>
        <MakeTableRow
          Name={items[0].name}
          Rank={items[0].investRank}
          InvestAmount={items[0].investAmount}
          Coment={items[0].investComnet}
          button={items[0].button}
        ></MakeTableRow>
        <MakeTableRow
          Name={items[1].name}
          Rank={items[1].investRank}
          InvestAmount={items[1].investAmount}
          Coment={items[1].investComnet}
          button={items[1].button}
        ></MakeTableRow>
        <MakeTableRow
          Name={items[2].name}
          Rank={items[2].investRank}
          InvestAmount={items[2].investAmount}
          Coment={items[2].investComnet}
          button={items[2].button}
        ></MakeTableRow>
        <MakeTableRow
          Name={items[3].name}
          Rank={items[3].investRank}
          InvestAmount={items[3].investAmount}
          Coment={items[3].investComnet}
          button={items[3].button}
        ></MakeTableRow>
        <MakeTableRow
          Name={items[4].name}
          Rank={items[4].investRank}
          InvestAmount={items[4].investAmount}
          Coment={items[4].investComnet}
          button={items[4].button}
          style={{
            border: "0",
          }}
        ></MakeTableRow>
      </div>

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
