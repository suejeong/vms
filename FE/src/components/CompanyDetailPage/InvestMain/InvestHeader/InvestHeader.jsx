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
    <div className="flex items-center justify-between mt-4 mb-4 md:mt-8 md:mb-6">
      <p className="text-base font-bold md:text-xl">View My Startup에서 받은 투자 </p>
      <button onClick={handleClick} className="py-1 px-3 text-sm font-semibold rounded-[50px] bg-brand-orange md:py-2 md:px-6 md:text-base">
        {" "}
        기업투자하기{" "}
      </button>
    </div>
  );
}

export default InvestHeader;
