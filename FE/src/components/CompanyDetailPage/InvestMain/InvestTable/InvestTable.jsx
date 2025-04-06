import styles from "./InvestTable.module.scss";
import ChangeToNumber from "../../ChangeToNumber/ChangeToNumber";
import RowButtonModal from "../../Modals/RowButtonModal/RowButtonModal";
import MakeTableRow from "../MakeTableRow/MakeTableRow";
import MakeTableHeader from "../MakeTableRow/MakeTableHeader";
import { useModal } from "../../Modals/ModalContext/ModalContext";
import { useState } from "react";

export function InvestTable({
  investDataState,
  nowPageState,
  companyDataState,
  refetchCompanyInvest,
}) {
  const { openModal, closeModal } = useModal();

  const sortedInvestData = [...investDataState].sort(
    (a, b) => b.investAmount - a.investAmount
  );

  const makeRow = (sortedInvestData, nowPageState) => {
    const start = (nowPageState - 1) * 5;
    const end = start + 5;
    return sortedInvestData
      .slice(start, end)
      .map((data, index) => (
        <MakeTableRow
          key={data.id}
          id={data.id}
          Name={data.username}
          Rank={index + 1}
          InvestAmount={ChangeToNumber(data.investAmount)}
          Coment={data.comment}
          companyDataState={companyDataState}
          refetchCompanyInvest={refetchCompanyInvest}
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
        ></MakeTableHeader>
      </div>
      {sortedInvestData.length != 0 ? (
        <div className={styles.investTableBody}>
          {makeRow(sortedInvestData, nowPageState)}
        </div>
      ) : (
        <div className={styles.investNoData}>
          아직 투자한 기업이 없어요.
          <br />
          버튼을 눌러 기업에 투자해보세요!
        </div>
      )}
    </div>
  );
}

export default InvestTable;
