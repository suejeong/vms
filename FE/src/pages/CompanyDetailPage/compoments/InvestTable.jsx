import styles from "../CompanyDetailPage.module.css";
import ChangeToNumber from "./ChangeToNumber";
import DeleteAndChangeModal from "./DeleteAndChangeModal";
import { useState, useRef } from "react";
import InvestDeleteModal from "./InvestDeleteModal";
import InvestChangeModal from "./InvestChangeModal";

export function InvestTable({ investData }) {
  const [modalState, setModalState] = useState(false);
  const [investDeleteModalState, setInvestDeleteModalState] = useState(false);
  const [investChangeModalState, setInvestChangeModalState] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalBackground = useRef();

  const modalDeleteState = () => {
    setInvestDeleteModalState(false);
  };

  const modalChangeState = () => {
    setInvestChangeModalState(false);
  };
  const modalChangeStates = () => {
    setModalState(false);
    setInvestChangeModalState(true);
  };
  const modalDeleteStates = () => {
    setModalState(false);
    setInvestDeleteModalState(true);
  };
  const handleButtonClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    console.log(rect);
    setModalPosition({
      top: rect.bottom + 10, // 버튼 아래에 배치
      left: rect.left - 115,
    });
    setModalState(true);
    console.log(modalPosition.top);
    console.log(modalPosition.left);
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
        {headers.map((header) => (
          <div
            key={header.text}
            className={styles.detialPageWeight500}
            style={{ fontSize: "14px" }}
          >
            {header.text}
          </div>
        ))}
      </div>

      <div className={styles.investTableBody} style={{ marginTop: "16px" }}>
        {items.map((item, index) => (
          <div
            key={index}
            id={`rowdiv${index}`}
            className={styles.investTableRow}
          >
            {headerKey.map((key) => (
              <div key={key + index} className={styles.detialPageWeight400}>
                {item[key]}
              </div>
            ))}
          </div>
        ))}
      </div>

      {modalState && (
        <div
          ref={modalBackground}
          className={styles.modalOverlay} // 추가된 스타일
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
            className={styles.modalOverlay} // 추가된 스타일
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
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default InvestTable;
