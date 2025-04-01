import React from "react";
import style from "./MyCompany.module.scss";

function MyCompany({ setMyCompany, myCompany }) {
  return (
    <>
      <a className={style.cancle} onClick={() => setMyCompany(null)}>
        선택 취소
      </a>
      <div className={style.selectedCompany}>
        <img src={`/images/companies/${myCompany.name}.png`} alt="company" />
        <p className={style.companyName}>{myCompany.name}</p>
        <p className={style.companyCategory}>{myCompany.category}</p>
      </div>
    </>
  );
}

export default MyCompany;
