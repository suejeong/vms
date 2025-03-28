import styles from "./CompanyDetailPage.module.css";
import Patition from "./compoments/Partition";
import Description from "./compoments/Description";
import LogoAndName from "./compoments/LogoAndName";
import InvestHeader from "./compoments/InvestHeader";
import logo from "./photo/logo.png";
import InvestMain from "./compoments/InvestMain";
import PaseNationButton from "./compoments/PaseNationButton";
import companydetail from "./data/companydetail.json";
import invest from "./data/invest.json";
import react from "react";
import useState from "react";
import useRef from "react";

export function CompanyDetailPage() {
  const companydetaildata = companydetail;
  const investdatas = invest;

  return (
    <div className={styles.CompanyDetailPage}>
      <div className={styles.CompanyDetailDiv}>
        <LogoAndName
          imgSrc={logo}
          companyName={companydetaildata.name}
          companyCategory={companydetaildata.category}
        />

        <div className={styles.companyDetailThreePart}>
          <Patition
            colum={"누적 투자 금액"}
            value={companydetaildata.total_investment}
            className={styles.detailPart}
          />
          <Patition
            colum={"매출액"}
            value={companydetaildata.total_profit}
            className={styles.detailPart}
          />
          <Patition
            colum={"고용 인원"}
            value={companydetaildata.employee_count + " 명"}
            className={styles.detailPart}
          />
        </div>

        <Description
          className={styles.companyDetailDescription}
          text={companydetaildata.description}
        />
      </div>

      <div className={styles.ViewMyStartUpDiv}>
        <InvestHeader className={styles.ViewMyStartUpHeader} />
        <InvestMain
          className={styles.ViewMyStartUpMain}
          investAmount={companydetaildata.view_invest_amount}
          investData={investdatas}
        />

        <div className={styles.PaseNationDiv}>
          <PaseNationButton value={"<"} />
          <PaseNationButton value={"1"} />
          <PaseNationButton value={"2"} />
          <PaseNationButton value={"3"} />
          <PaseNationButton value={"4"} />
          <PaseNationButton value={"5"} />
          <PaseNationButton value={">"} />
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailPage;
