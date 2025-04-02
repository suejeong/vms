import React from "react";
import style from "./CompanyInfo.module.scss";

function CompanyInfo({ company }) {
  return (
    <>
      <img src={`/images/companies/${company.name}.png`} alt="company" />
      <p className={style.companyName}>{company.name}</p>
      <p className={style.companyCategory}>{company.category}</p>
    </>
  );
}

export default CompanyInfo;
