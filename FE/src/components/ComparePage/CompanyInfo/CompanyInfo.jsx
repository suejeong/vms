import React from "react";
import style from "./CompanyInfo.module.scss";

function CompanyInfo({ company, direction = "row"  }) {
  return (
    <div  className={`${style.companyWrapper} ${style[direction]}`}>
      <img 
        src={`/images/companies/${company.name}.png`} 
        alt="company" 
        className={style.companyLogo}
      />
      <div className={style.companyText}>
        <p className={style.companyName}>{company.name}</p>
        <p className={style.companyCategory}>{company.category}</p>
      </div>
    </div>
  );
}

export default CompanyInfo;
