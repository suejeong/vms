import styles from "./CompanyMain.module.scss";
import LogoAndName from "./LogoAndName/LogoAndName";
import Patition from "./Partition/Partition";
import Description from "./Description/Description";

export function CompanyMain({ companyDataState }) {
  return (
    <div className={styles.CompanyDetailDiv}>
      <LogoAndName
        imgSrc={`/images/companies/${companyDataState.name}.png`}
        companyName={companyDataState.name}
        companyCategory={companyDataState.category}
      />

      <div className={styles.companyDetailThreePart}>
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
