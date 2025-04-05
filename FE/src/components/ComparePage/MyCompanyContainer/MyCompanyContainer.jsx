import React from "react";
import style from "./MyCompanyContainer.module.scss";
import CompanyInfo from "../CompanyInfo/CompanyInfo";

function MyCompany({ setMyCompany, myCompany }) {
  return (
    <>
      <a className={style.cancle} onClick={() => setMyCompany(null)}>
        선택 취소
      </a>
      <div className={style.selectedCompany}>
        <CompanyInfo company={myCompany} direction="column" />
      </div>
    </>
  );
}

export default MyCompany;
