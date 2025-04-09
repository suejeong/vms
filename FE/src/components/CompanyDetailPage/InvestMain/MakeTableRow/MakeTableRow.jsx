import RowButtonModal from "../../Modals/RowButtonModal/RowButtonModal";
import { MdMoreVert } from "react-icons/md";
import { useState, useRef } from "react";

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
  const buttonRef = useRef(null); // 버튼 참조용

  const handleButtonClick = (e) => {
    e.stopPropagation();
    const investId = id;

    // 같은 버튼 다시 누르면 닫기
    if (selectedInvest === investId && buttonModalState) {
      setButtonModalState(false);
      setSelectedInvest(null);
    } else {
      setSelectedInvest(investId);
      setButtonModalState(true);
    }
  };

  const closeModal = () => {
    setButtonModalState(false);
    setSelectedInvest(null);
  };

  return (
    <div
      id={id}
      className="flex items-center border-b border-gray300 bg-black300 [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:text-center [&>div]:h-16 [&>div]:text-sm [&>div]:text-gray100"
    >
      <div className="flex-[2] md:flex-[2]">{Name}</div>
      <div className="flex-1">{Rank}</div>
      <div className="flex-[2] md:flex-[2]">{InvestAmount}</div>

      <div className="relative flex-[4] md:flex-[8] flex items-center gap-2">
        <div className="flex-1 text-left">
          <p className="line-clamp-2 text-sm text-gray100 break-words">
            {Coment}
          </p>
        </div>

        <div className="flex-shrink-0">
          <div className="flex justify-center items-center">
            <button ref={buttonRef} type="button" onClick={handleButtonClick}>
              <MdMoreVert className="w-6 h-6 text-gray300 mx-2" />
            </button>

            {buttonModalState && selectedInvest === id && (
              <RowButtonModal
                RowModalClose={closeModal}
                investId={selectedInvest}
                companyDataState={companyDataState}
                refetchCompanyInvest={refetchCompanyInvest}
                triggerRef={buttonRef} // 버튼 참조 전달
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeTableRow;
