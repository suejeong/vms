import React from "react";
import style from "./CompareCompanyContainer.module.scss";
import CompanyInfo from "../CompanyInfo/CompanyInfo";
import ic_minus from "../../../assets/images/icons/ic_minus.png";

function CompareCompany({ compareCompanies, removeCompareCompany }) {
  return (
    <>
      {compareCompanies.length > 0 ? (
        compareCompanies.map((company) => (
          <div key={company.id} className={style.companyCard}>
            <button
              onClick={() => removeCompareCompany(company.id)}
              className={style.minusButton}
            >
              <img src={ic_minus} alt="minus" />
            </button>
            <CompanyInfo company={company} direction="column" />
          </div>
        ))
      ) : (
        <p className={style.noAddCompany}>
          아직 추가한 기업이 없어요,
          <br />
          버튼을 눌러 기업을 추가해보세요!
        </p>
      )}
    </>
  );
}

export default CompareCompany;
