import LogoAndName from "./LogoAndName/LogoAndName";
import Patition from "./Partition/Partition";
import Description from "./Description/Description";
import getCompanyImage from "../../GetCompanyImage/GetCompanyImage";

export function CompanyMain({ companyDataState }) {
  return (
    <div >
      <LogoAndName
        imgSrc={getCompanyImage(companyDataState.name)}
        companyName={companyDataState.name}
        companyCategory={companyDataState.category}
      />

      <div className="flex items-center gap-4 mt-4 md:mt-8">
        <Patition
          colum={"누적 투자 금액"}
          value={companyDataState.totalInvestment}
        />
        <Patition colum={"매출액"} value={companyDataState.totalProfit} />
        <Patition
          colum={"고용 인원"}
          value={companyDataState.employeeCount + " 명"}
        />
      </div>

      <Description text={companyDataState.description} />
    </div>
  );
}
export default CompanyMain;
