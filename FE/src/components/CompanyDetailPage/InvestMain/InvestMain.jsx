import ChangeToNumber from "../ChangeToNumber/ChangeToNumber";
import InvestTable from "./InvestTable/InvestTable";
import InvestHeader from "./InvestHeader/InvestHeader";
export function InvestMain({
  companyDataState,
  nowPageState,
  investDataState,
  refetchCompanyInvest,
}) {
  const totalInvestAmount = investDataState.reduce(
    (sum, data) => sum + data.investAmount,
    0
  );

  return (
    <div>
      <InvestHeader
        investDataState={investDataState}
        companyDataState={companyDataState}
        refetchCompanyInvest={refetchCompanyInvest}
      />
      <div>
        <p className="py-4 border-t border-black100 text-base font-bold md:text-xl">
          총 {ChangeToNumber(totalInvestAmount)}
        </p>
        <InvestTable
          refetchCompanyInvest={refetchCompanyInvest}
          investDataState={investDataState}
          companyDataState={companyDataState}
          nowPageState={nowPageState}
        ></InvestTable>
      </div>
    </div>
  );
}

export default InvestMain;
